"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "../lib/analytics";

export interface DspSettings {
  echoCancellation: boolean;
  noiseSuppression: boolean;
  autoGainControl: boolean;
}

export type MicStatus = "idle" | "requesting" | "ready" | "error";

function friendlyMicError(err: unknown): string {
  if (err instanceof DOMException) {
    switch (err.name) {
      case "NotAllowedError":
      case "SecurityError":
        return "Microphone access was denied. Allow it in your browser's site settings and try again.";
      case "NotFoundError":
      case "OverconstrainedError":
        return "No microphone found. Connect one, or check your system input settings.";
      case "NotReadableError":
      case "AbortError":
        return "The microphone is busy in another app. Close it and try again.";
    }
  }
  return "Couldn't start the microphone. Please try again.";
}

/**
 * Owns the audio graph:
 *   MediaStreamAudioSourceNode → effectsBus (pass-through GainNode)
 *     → AnalyserNode (visualizer)
 *     → MediaStreamAudioDestinationNode (recorder)
 * The source is never connected to ctx.destination — that would feed the mic
 * straight back out of the speakers.
 */
const DEFAULT_DSP: DspSettings = {
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
};

export function useMicAnalyser() {
  const [status, setStatus] = useState<MicStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState("");
  const [dsp, setDsp] = useState<DspSettings>(DEFAULT_DSP);

  const ctxRef = useRef<AudioContext | null>(null);
  const busRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const destRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Ref mirrors are written only inside handlers/async code (never in render)
  // so callbacks always see the latest values.
  const dspRef = useRef<DspSettings>(DEFAULT_DSP);
  const deviceIdRef = useRef("");
  const statusRef = useRef<MicStatus>("idle");

  const changeStatus = useCallback((next: MicStatus) => {
    statusRef.current = next;
    setStatus(next);
  }, []);

  const refreshDevices = useCallback(async () => {
    try {
      const all = await navigator.mediaDevices.enumerateDevices();
      setDevices(all.filter((d) => d.kind === "audioinput"));
    } catch {
      // Enumeration is best-effort; the default device still works.
    }
  }, []);

  const acquire = useCallback(
    async (wantedDeviceId?: string) => {
      const wanted = wantedDeviceId ?? deviceIdRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          ...(wanted ? { deviceId: { exact: wanted } } : {}),
          echoCancellation: dspRef.current.echoCancellation,
          noiseSuppression: dspRef.current.noiseSuppression,
          autoGainControl: dspRef.current.autoGainControl,
        },
      });
      const ctx = ctxRef.current;
      const bus = busRef.current;
      if (!ctx || !bus) {
        stream.getTracks().forEach((t) => t.stop());
        throw new Error("Audio graph not initialized");
      }
      // Swap only the source node; the analyser and record destination stay
      // wired, so device/DSP changes are seamless even mid-recording.
      sourceRef.current?.disconnect();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      const source = ctx.createMediaStreamSource(stream);
      // PHASE 2: insert voice-effect chain here (source → effects → effectsBus).
      source.connect(bus);
      sourceRef.current = source;
      streamRef.current = stream;
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        const settledId = audioTrack.getSettings().deviceId ?? "";
        deviceIdRef.current = settledId;
        setDeviceId(settledId);
        audioTrack.onended = () => {
          setError("The microphone was disconnected. Pick another input or plug it back in.");
          changeStatus("error");
        };
      }
      void refreshDevices();
    },
    [refreshDevices, changeStatus]
  );

  const start = useCallback(async (): Promise<boolean> => {
    if (statusRef.current === "requesting") return false;
    changeStatus("requesting");
    setError(null);
    try {
      if (!ctxRef.current) {
        // Created inside the user's tap — autoplay policy requires it.
        const Ctor =
          window.AudioContext ??
          (window as Window & { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (!Ctor) throw new Error("Web Audio is not supported in this browser");
        const ctx = new Ctor();
        const bus = ctx.createGain(); // effectsBus — pass-through until Phase 2
        bus.gain.value = 1;
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.85;
        const dest = ctx.createMediaStreamDestination();
        bus.connect(analyser);
        bus.connect(dest);
        ctxRef.current = ctx;
        busRef.current = bus;
        analyserRef.current = analyser;
        destRef.current = dest;
      }
      await ctxRef.current.resume();
      await acquire();
      changeStatus("ready");
      track("mic_granted");
      return true;
    } catch (err) {
      setError(friendlyMicError(err));
      changeStatus("error");
      return false;
    }
  }, [acquire, changeStatus]);

  const selectDevice = useCallback(
    async (id: string) => {
      if (!ctxRef.current) return;
      try {
        await acquire(id);
        setError(null);
        changeStatus("ready");
      } catch (err) {
        setError(friendlyMicError(err));
        changeStatus("error");
      }
    },
    [acquire, changeStatus]
  );

  const setDspOption = useCallback(
    async (patch: Partial<DspSettings>) => {
      const next = { ...dspRef.current, ...patch };
      dspRef.current = next;
      setDsp(next);
      if (!ctxRef.current || statusRef.current !== "ready") return;
      try {
        await acquire();
      } catch (err) {
        setError(friendlyMicError(err));
        changeStatus("error");
      }
    },
    [acquire, changeStatus]
  );

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    sourceRef.current?.disconnect();
    sourceRef.current = null;
    if (ctxRef.current && ctxRef.current.state !== "closed") {
      void ctxRef.current.close().catch(() => {});
    }
    ctxRef.current = null;
    busRef.current = null;
    analyserRef.current = null;
    destRef.current = null;
    changeStatus("idle");
  }, [changeStatus]);

  // Keep the device list fresh while live (labels only appear post-permission).
  useEffect(() => {
    if (status !== "ready") return;
    const media = navigator.mediaDevices;
    if (!media?.addEventListener) return;
    media.addEventListener("devicechange", refreshDevices);
    return () => media.removeEventListener("devicechange", refreshDevices);
  }, [status, refreshDevices]);

  return {
    status,
    error,
    devices,
    deviceId,
    dsp,
    start,
    stop,
    selectDevice,
    setDspOption,
    analyserRef,
    destRef,
  };
}

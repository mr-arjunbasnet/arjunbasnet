"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "../lib/analytics";

export const MAX_SECONDS = 180;

export type RecorderPhase = "idle" | "countdown" | "recording";

export interface Recording {
  blob: Blob;
  mime: string;
  duration: number;
}

const MIME_CANDIDATES = [
  "video/mp4",
  "video/webm;codecs=vp9,opus",
  "video/webm",
];

export function useRecorder(opts: {
  getCanvas: () => HTMLCanvasElement | null;
  getAudioStream: () => MediaStream | null;
  onComplete: (rec: Recording) => void;
}) {
  const [phase, setPhase] = useState<RecorderPhase>("idle");
  const [countdown, setCountdown] = useState(3);
  const [elapsed, setElapsed] = useState(0);

  // Latest-ref pattern: synced after every render so recorder callbacks
  // always see fresh getters without re-wiring the MediaRecorder.
  const optsRef = useRef(opts);
  useEffect(() => {
    optsRef.current = opts;
  });

  const phaseRef = useRef<RecorderPhase>("idle");
  const changePhase = useCallback((next: RecorderPhase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const captureStreamRef = useRef<MediaStream | null>(null);
  const startedAtRef = useRef(0);
  const timerRef = useRef(0);
  const countdownTimerRef = useRef(0);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  const releaseWakeLock = useCallback(() => {
    void wakeLockRef.current?.release().catch(() => {});
    wakeLockRef.current = null;
  }, []);

  const requestWakeLock = useCallback(async () => {
    try {
      if ("wakeLock" in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request("screen");
      }
    } catch {
      // Unsupported or denied — recording works regardless.
    }
  }, []);

  const stopRecorder = useCallback(() => {
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== "inactive") recorder.stop();
  }, []);

  const startRecording = useCallback(() => {
    const canvas = optsRef.current.getCanvas();
    const audio = optsRef.current.getAudioStream();
    if (!canvas || !audio) {
      changePhase("idle");
      return;
    }
    const canvasStream = canvas.captureStream(30);
    const merged = new MediaStream([
      ...canvasStream.getVideoTracks(),
      ...audio.getAudioTracks(),
    ]);
    const mimeType = MIME_CANDIDATES.find((m) =>
      MediaRecorder.isTypeSupported(m)
    );
    const recorder = new MediaRecorder(merged, {
      ...(mimeType ? { mimeType } : {}),
      videoBitsPerSecond: 6_000_000,
    });
    chunksRef.current = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      window.clearInterval(timerRef.current);
      releaseWakeLock();
      captureStreamRef.current?.getTracks().forEach((t) => t.stop());
      captureStreamRef.current = null;
      recorderRef.current = null;
      const mime = recorder.mimeType || mimeType || "video/webm";
      const blob = new Blob(chunksRef.current, { type: mime });
      chunksRef.current = [];
      const duration = Math.min(
        MAX_SECONDS,
        Math.round((performance.now() - startedAtRef.current) / 1000)
      );
      changePhase("idle");
      setElapsed(0);
      track("record_complete", { duration, mime });
      optsRef.current.onComplete({ blob, mime, duration });
    };
    captureStreamRef.current = canvasStream;
    recorderRef.current = recorder;
    startedAtRef.current = performance.now();
    setElapsed(0);
    recorder.start(1000); // 1 s timeslices keep memory flat on long takes
    changePhase("recording");
    track("record_start");
    void requestWakeLock();
    timerRef.current = window.setInterval(() => {
      const seconds = (performance.now() - startedAtRef.current) / 1000;
      setElapsed(Math.min(MAX_SECONDS, Math.floor(seconds)));
      if (seconds >= MAX_SECONDS) stopRecorder();
    }, 250);
  }, [releaseWakeLock, requestWakeLock, stopRecorder, changePhase]);

  const begin = useCallback(() => {
    if (phaseRef.current !== "idle") return;
    setCountdown(3);
    changePhase("countdown");
    let n = 3;
    countdownTimerRef.current = window.setInterval(() => {
      n -= 1;
      if (n <= 0) {
        window.clearInterval(countdownTimerRef.current);
        startRecording();
      } else {
        setCountdown(n);
      }
    }, 1000);
  }, [startRecording, changePhase]);

  const stop = useCallback(() => {
    if (phaseRef.current === "countdown") {
      window.clearInterval(countdownTimerRef.current);
      changePhase("idle");
      return;
    }
    stopRecorder();
  }, [stopRecorder, changePhase]);

  // The browser silently drops the wake lock when the tab is hidden;
  // re-grab it when the user comes back mid-recording.
  useEffect(() => {
    const onVisibility = () => {
      if (
        document.visibilityState === "visible" &&
        phaseRef.current === "recording"
      ) {
        void requestWakeLock();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [requestWakeLock]);

  useEffect(
    () => () => {
      window.clearInterval(timerRef.current);
      window.clearInterval(countdownTimerRef.current);
      releaseWakeLock();
      const recorder = recorderRef.current;
      if (recorder && recorder.state !== "inactive") recorder.stop();
      captureStreamRef.current?.getTracks().forEach((t) => t.stop());
    },
    [releaseWakeLock]
  );

  return { phase, countdown, elapsed, begin, stop };
}

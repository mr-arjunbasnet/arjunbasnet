"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, Camera, CameraOff, Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import ExportPanel from "./components/ExportPanel";
import LivingWordmark from "./components/LivingWordmark";
import MicControls from "./components/MicControls";
import ThemePicker from "./components/ThemePicker";
import { useCameraFeed } from "./hooks/useCameraFeed";
import { useMicAnalyser } from "./hooks/useMicAnalyser";
import { MAX_SECONDS, useRecorder, type Recording } from "./hooks/useRecorder";
import { track } from "./lib/analytics";
import { Compositor, FRAME_H, FRAME_W } from "./lib/compositor";
import { getTheme, type ThemeId } from "./lib/themes";
import { focusRing, formatTime } from "./lib/ui";

const PRIVACY_NOTE =
  "Everything happens on your device — your audio and video are never uploaded or stored.";

export default function MelosStudio() {
  const reduced = useReducedMotion() ?? false;
  const mic = useMicAnalyser();
  const camVideoRef = useRef<HTMLVideoElement | null>(null);
  const cam = useCameraFeed(camVideoRef);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [mode, setMode] = useState<"landing" | "live" | "review">("landing");
  const [themeId, setThemeId] = useState<ThemeId>("melos");
  const [recording, setRecording] = useState<Recording | null>(null);

  // The compositor reads through refs so it never needs re-creating.
  // Synced in effects (post-commit) — the next drawn frame picks them up.
  const themeRef = useRef(getTheme("melos"));
  const camOnRef = useRef(false);
  const fontFamilyRef = useRef("");

  useEffect(() => {
    themeRef.current = getTheme(themeId);
  }, [themeId]);

  useEffect(() => {
    camOnRef.current = cam.status === "on";
  }, [cam.status]);

  const { analyserRef, destRef } = mic;

  const recorder = useRecorder({
    getCanvas: () => canvasRef.current,
    getAudioStream: () => destRef.current?.stream ?? null,
    onComplete: (rec) => {
      setRecording(rec);
      setMode("review");
    },
  });

  useEffect(() => {
    track("studio_open");
  }, []);

  // Resolve next/font's hashed family name so the canvas watermark can use it.
  useEffect(() => {
    const el = rootRef.current;
    if (el) {
      fontFamilyRef.current = getComputedStyle(el)
        .getPropertyValue("--font-space-grotesk")
        .trim();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const compositor = new Compositor({
      canvas,
      getAnalyser: () => analyserRef.current,
      getVideo: () => camVideoRef.current,
      isCameraOn: () => camOnRef.current,
      getTheme: () => themeRef.current,
      getWordmarkFamily: () => fontFamilyRef.current,
    });
    compositor.start();
    return () => compositor.stop();
  }, [analyserRef]);

  // Calmer meter under prefers-reduced-motion.
  useEffect(() => {
    const analyser = analyserRef.current;
    if (analyser) analyser.smoothingTimeConstant = reduced ? 0.95 : 0.85;
  }, [reduced, mic.status, analyserRef]);

  // Release everything when the visitor navigates away.
  const { stop: stopMic } = mic;
  const { turnOff: stopCam } = cam;
  useEffect(
    () => () => {
      stopMic();
      stopCam();
    },
    [stopMic, stopCam]
  );

  const micReady = mic.status === "ready";
  const isRecording = recorder.phase === "recording";
  const isCountdown = recorder.phase === "countdown";

  const { start: startMic } = mic;
  const handleStartMic = useCallback(async () => {
    const ok = await startMic();
    if (ok) setMode("live");
  }, [startMic]);

  const toggleRecord = useCallback(() => {
    if (recorder.phase === "idle") recorder.begin();
    else recorder.stop();
  }, [recorder]);

  const toggleCamera = useCallback(() => {
    if (cam.status === "on") cam.turnOff();
    else if (cam.status !== "requesting") void cam.turnOn();
  }, [cam]);

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#0A0A14] text-[#E8E9F2] selection:bg-[#A24BFF] selection:text-white"
      style={{
        backgroundImage:
          "radial-gradient(1100px 700px at 15% -5%, rgba(162,75,255,0.10), transparent), radial-gradient(900px 650px at 95% 110%, rgba(51,224,255,0.07), transparent)",
      }}
    >
      {/* Hidden camera feed for the compositor */}
      <video
        ref={camVideoRef}
        muted
        playsInline
        autoPlay
        aria-hidden
        className="pointer-events-none fixed -left-full h-px w-px opacity-0"
      />

      <header className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-5">
        <div className="flex items-center gap-3">
          <LivingWordmark
            getAnalyser={() => analyserRef.current}
            reduced={reduced}
            className="text-3xl font-semibold text-[#E8E9F2]"
          />
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8A8CA3]">
            Studio
          </span>
        </div>
        <div className="flex items-center gap-4">
          <p
            className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8A8CA3]"
            aria-live="polite"
          >
            {isRecording ? (
              <>
                <span
                  className={cn(
                    "h-2 w-2 rounded-full bg-[#FF3DBE]",
                    !reduced && "animate-pulse"
                  )}
                  aria-hidden
                />
                <span className="text-[#E8E9F2]">
                  Rec {formatTime(recorder.elapsed)}
                </span>
              </>
            ) : micReady ? (
              <>
                <span className="h-2 w-2 rounded-full bg-[#33E0FF]" aria-hidden />
                Live
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-white/20" aria-hidden />
                Offline
              </>
            )}
          </p>
          <Link
            href="/"
            className={cn(
              "hidden items-center gap-1.5 rounded-full text-xs text-[#8A8CA3] transition-colors hover:text-[#E8E9F2] sm:flex",
              focusRing
            )}
          >
            <ArrowLeft size={12} aria-hidden /> arjun-basnet.com.np
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 px-5 pb-16 lg:grid-cols-[minmax(0,420px)_1fr]">
        {/* ─── Preview ─── */}
        <div className="mx-auto w-full max-w-[400px]">
          <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_90px_rgba(162,75,255,0.14)]">
            <canvas
              ref={canvasRef}
              width={FRAME_W}
              height={FRAME_H}
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label="Live studio preview: your camera or a brand background with a sound-reactive equalizer. This is exactly what gets recorded."
            />

            {isRecording && (
              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full bg-[#FF3DBE]",
                    !reduced && "animate-pulse"
                  )}
                  aria-hidden
                />
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
                  Rec
                </span>
              </div>
            )}

            {isCountdown && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50"
                aria-live="assertive"
              >
                <span
                  className="bg-gradient-to-b from-[#A24BFF] via-[#33E0FF] to-[#FF3DBE] bg-clip-text text-9xl font-bold text-transparent"
                  style={{
                    fontFamily:
                      "var(--font-space-grotesk), var(--font-geist-sans), sans-serif",
                  }}
                >
                  {recorder.countdown}
                </span>
              </div>
            )}

            {mode === "landing" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[#0A0A14]/85 p-6 text-center backdrop-blur-sm">
                <h1
                  className="text-2xl font-semibold leading-snug"
                  style={{
                    fontFamily:
                      "var(--font-space-grotesk), var(--font-geist-sans), sans-serif",
                  }}
                >
                  Your voice, visualized.
                </h1>
                <p className="max-w-[26ch] text-sm leading-relaxed text-[#8A8CA3]">
                  Light up the equalizer with your mic, then record a vertical
                  video ready for TikTok or Reels.
                </p>
                <button
                  type="button"
                  onClick={() => void handleStartMic()}
                  disabled={mic.status === "requesting"}
                  className={cn(
                    "flex items-center gap-2 rounded-full bg-gradient-to-r from-[#A24BFF] via-[#33E0FF] to-[#FF3DBE] px-6 py-3 text-sm font-semibold text-[#0A0A14] transition-opacity hover:opacity-90 disabled:opacity-60",
                    focusRing
                  )}
                >
                  <Mic size={15} aria-hidden />
                  {mic.status === "requesting"
                    ? "Waking the mic…"
                    : "Start the studio"}
                </button>
                <p className="max-w-[30ch] text-[11px] leading-relaxed text-[#8A8CA3]">
                  Uses your microphone to draw the meters. Camera is separate —
                  and optional.
                </p>
                {mic.status === "error" && mic.error && (
                  <p className="max-w-[32ch] text-xs leading-relaxed text-[#FF3DBE]">
                    {mic.error}
                  </p>
                )}
                <p className="max-w-[32ch] text-[10px] leading-relaxed text-[#8A8CA3]/80">
                  {PRIVACY_NOTE}
                </p>
              </div>
            )}
          </div>

          {/* Transport */}
          <div className="mt-5 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={toggleRecord}
              disabled={!micReady || isCountdown}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
              className={cn(
                "group relative h-16 w-16 rounded-full bg-gradient-to-br from-[#A24BFF] via-[#33E0FF] to-[#FF3DBE] p-[3px] transition-opacity disabled:opacity-30",
                focusRing
              )}
            >
              <span className="flex h-full w-full items-center justify-center rounded-full bg-[#0A0A14]">
                {isRecording ? (
                  <Square
                    size={20}
                    className="fill-[#FF3DBE] text-[#FF3DBE]"
                    aria-hidden
                  />
                ) : (
                  <span
                    className="h-6 w-6 rounded-full bg-[#FF3DBE] transition-transform group-hover:scale-110"
                    aria-hidden
                  />
                )}
              </span>
            </button>
            <p
              className="text-sm tabular-nums text-[#8A8CA3]"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              {formatTime(recorder.elapsed)} / {formatTime(MAX_SECONDS)}
            </p>
          </div>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-[#8A8CA3]">
            Keep this tab in the foreground while recording — mobile browsers
            pause hidden tabs.
          </p>
        </div>

        {/* ─── Controls ─── */}
        <div className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          {mic.status === "error" && mic.error && mode !== "landing" && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#FF3DBE]/40 bg-[#FF3DBE]/10 px-4 py-3">
              <p className="text-xs leading-relaxed text-[#E8E9F2]">
                {mic.error}
              </p>
              <button
                type="button"
                onClick={() => void handleStartMic()}
                className={cn(
                  "rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium hover:border-white/40",
                  focusRing
                )}
              >
                Reconnect mic
              </button>
            </div>
          )}

          <MicControls
            devices={mic.devices}
            deviceId={mic.deviceId}
            onSelectDevice={(id) => void mic.selectDevice(id)}
            dsp={mic.dsp}
            onDsp={(patch) => void mic.setDspOption(patch)}
            disabled={!micReady}
          />

          <div className="h-px bg-white/10" />

          <ThemePicker value={themeId} onChange={setThemeId} disabled={!micReady} />

          <div className="h-px bg-white/10" />

          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A8CA3]">
              Camera
            </p>
            <button
              type="button"
              onClick={toggleCamera}
              disabled={mode === "landing" || cam.status === "requesting"}
              aria-pressed={cam.status === "on"}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-40",
                cam.status === "on"
                  ? "border-[#33E0FF]/60 bg-[#33E0FF]/10 text-[#E8E9F2]"
                  : "border-white/15 text-[#E8E9F2] hover:border-white/35",
                focusRing
              )}
            >
              {cam.status === "on" ? (
                <>
                  <CameraOff size={15} aria-hidden /> Turn camera off
                </>
              ) : (
                <>
                  <Camera size={15} aria-hidden />
                  {cam.status === "requesting" ? "Asking…" : "Turn camera on"}
                </>
              )}
            </button>
            <p className="mt-2 text-[11px] leading-relaxed text-[#8A8CA3]">
              Optional — puts your selfie camera behind the equalizer. It asks
              for permission separately, only when you tap. Flip it mid-take
              and the recording keeps rolling on the brand background.
            </p>
            {cam.error && (
              <p className="mt-2 text-xs text-[#FF3DBE]">{cam.error}</p>
            )}
          </div>

          <div className="h-px bg-white/10" />

          <div>
            <label
              htmlFor="melos-voice"
              className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8A8CA3]"
            >
              Voice
            </label>
            <select
              id="melos-voice"
              disabled
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#E8E9F2] opacity-40"
            >
              <option>Normal</option>
            </select>
            <p className="mt-1.5 text-[11px] text-[#8A8CA3]">
              Voice effects arrive in a future phase.
            </p>
          </div>

          <p className="border-t border-white/10 pt-4 text-[11px] leading-relaxed text-[#8A8CA3]">
            {PRIVACY_NOTE}
          </p>
        </div>
      </main>

      {/* ─── Review ─── */}
      {mode === "review" && recording && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A14]/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Review your recording"
        >
          <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl border border-white/10 bg-[#10101E] p-5">
            <ExportPanel
              rec={recording}
              onRerecord={() => {
                setRecording(null);
                setMode("live");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

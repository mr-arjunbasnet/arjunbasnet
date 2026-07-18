"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  Camera,
  CameraOff,
  Mic,
  Palette,
  SlidersHorizontal,
  Square,
  X,
} from "lucide-react";
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

const overlayButton =
  "flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/85 text-[#16181D] shadow-sm backdrop-blur-md transition-colors hover:bg-white disabled:opacity-40";

export default function MelosStudio() {
  const reduced = useReducedMotion() ?? false;
  const mic = useMicAnalyser();
  const camVideoRef = useRef<HTMLVideoElement | null>(null);
  const cam = useCameraFeed(camVideoRef);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [mode, setMode] = useState<"landing" | "live" | "review">("landing");
  const [themeId, setThemeId] = useState<ThemeId>("rainbow");
  const [recording, setRecording] = useState<Recording | null>(null);
  const [panel, setPanel] = useState<"mic" | "theme" | null>(null);

  // The compositor reads through refs so it never needs re-creating.
  // Synced in effects (post-commit) — the next drawn frame picks them up.
  const themeRef = useRef(getTheme("rainbow"));
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

  const togglePanel = useCallback((which: "mic" | "theme") => {
    setPanel((p) => (p === which ? null : which));
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#FAFAFF] text-[#16181D] selection:bg-[#A24BFF] selection:text-white"
      style={{
        backgroundImage:
          "radial-gradient(1100px 700px at 12% -8%, rgba(162,75,255,0.10), transparent), radial-gradient(900px 650px at 100% 0%, rgba(51,224,255,0.10), transparent), radial-gradient(900px 700px at 50% 115%, rgba(255,61,190,0.08), transparent)",
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

      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-3">
          <LivingWordmark
            getAnalyser={() => analyserRef.current}
            reduced={reduced}
            className="text-3xl font-semibold text-[#16181D]"
          />
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#667085]">
            Studio
          </span>
        </div>
        <Link
          href="/"
          className={cn(
            "flex items-center gap-1.5 rounded-full text-xs text-[#667085] transition-colors hover:text-[#16181D]",
            focusRing
          )}
        >
          <ArrowLeft size={12} aria-hidden /> arjun-basnet.com.np
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-10">
        {/* ─── The stage ─── */}
        <div
          className="relative mx-auto aspect-[9/16] w-auto overflow-hidden rounded-3xl border border-[#E9E6F5] bg-white shadow-[0_24px_80px_rgba(140,120,255,0.22)]"
          style={{ height: "min(82vh, 160vw)" }}
        >
          <canvas
            ref={canvasRef}
            width={FRAME_W}
            height={FRAME_H}
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="Live studio preview: your camera or a light brand background with a sound-reactive equalizer. This is exactly what gets recorded."
          />

          {/* Status chip */}
          <div
            className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full border border-black/10 bg-white/85 px-3 py-1.5 shadow-sm backdrop-blur-md"
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
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#16181D] tabular-nums"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  Rec {formatTime(recorder.elapsed)} / {formatTime(MAX_SECONDS)}
                </span>
              </>
            ) : micReady ? (
              <>
                <span className="h-2 w-2 rounded-full bg-[#00B8D9]" aria-hidden />
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#16181D]">
                  Live
                </span>
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-black/20" aria-hidden />
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#667085]">
                  Offline
                </span>
              </>
            )}
          </div>

          {/* Mic settings (top-right) */}
          <button
            type="button"
            onClick={() => togglePanel("mic")}
            disabled={mode === "landing"}
            aria-label="Microphone settings"
            aria-expanded={panel === "mic"}
            className={cn("absolute right-3 top-3 z-10", overlayButton, focusRing)}
          >
            <SlidersHorizontal size={17} aria-hidden />
          </button>

          {/* Transport bar (bottom, in-frame) */}
          <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-7">
            <button
              type="button"
              onClick={toggleCamera}
              disabled={mode === "landing" || cam.status === "requesting"}
              aria-pressed={cam.status === "on"}
              aria-label={
                cam.status === "on" ? "Turn camera off" : "Turn camera on"
              }
              title={cam.status === "on" ? "Turn camera off" : "Turn camera on"}
              className={cn(
                overlayButton,
                cam.status === "on" &&
                  "border-[#00B8D9]/50 bg-[#E6FAFE]/90 text-[#007A99]",
                focusRing
              )}
            >
              {cam.status === "on" ? (
                <CameraOff size={18} aria-hidden />
              ) : (
                <Camera size={18} aria-hidden />
              )}
            </button>

            <button
              type="button"
              onClick={toggleRecord}
              disabled={!micReady || isCountdown}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
              className={cn(
                "group relative h-[72px] w-[72px] rounded-full bg-gradient-to-br from-[#A24BFF] via-[#33E0FF] to-[#FF3DBE] p-[3px] shadow-lg transition-opacity disabled:opacity-30",
                focusRing
              )}
            >
              <span className="flex h-full w-full items-center justify-center rounded-full bg-white">
                {isRecording ? (
                  <Square
                    size={22}
                    className="fill-[#FF3DBE] text-[#FF3DBE]"
                    aria-hidden
                  />
                ) : (
                  <span
                    className="h-7 w-7 rounded-full bg-[#FF3DBE] transition-transform group-hover:scale-110"
                    aria-hidden
                  />
                )}
              </span>
            </button>

            <button
              type="button"
              onClick={() => togglePanel("theme")}
              disabled={mode === "landing"}
              aria-label="Visualizer theme"
              aria-expanded={panel === "theme"}
              className={cn(overlayButton, focusRing)}
            >
              <Palette size={18} aria-hidden />
            </button>
          </div>

          {/* In-frame settings panels */}
          {panel !== null && mode !== "landing" && (
            <div className="absolute inset-x-3 bottom-28 z-20 max-h-[62%] overflow-y-auto rounded-2xl border border-black/10 bg-white/95 p-4 shadow-xl backdrop-blur-md">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#667085]">
                  {panel === "mic" ? "Microphone" : "Visualizer theme"}
                </p>
                <button
                  type="button"
                  onClick={() => setPanel(null)}
                  aria-label="Close panel"
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-[#667085] transition-colors hover:bg-black/5 hover:text-[#16181D]",
                    focusRing
                  )}
                >
                  <X size={15} aria-hidden />
                </button>
              </div>

              {panel === "mic" ? (
                <div className="space-y-4">
                  {mic.status === "error" && mic.error && (
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#FF3DBE]/40 bg-[#FF3DBE]/10 px-3 py-2.5">
                      <p className="text-xs leading-relaxed text-[#16181D]">
                        {mic.error}
                      </p>
                      <button
                        type="button"
                        onClick={() => void handleStartMic()}
                        className={cn(
                          "rounded-full border border-black/15 px-3 py-1.5 text-xs font-medium hover:border-black/40",
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
                  <div className="border-t border-black/10 pt-3">
                    <label
                      htmlFor="melos-voice"
                      className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#667085]"
                    >
                      Voice
                    </label>
                    <select
                      id="melos-voice"
                      disabled
                      className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-[#16181D] opacity-40"
                    >
                      <option>Normal</option>
                    </select>
                    <p className="mt-1.5 text-[11px] text-[#667085]">
                      Voice effects arrive in a future phase.
                    </p>
                  </div>
                </div>
              ) : (
                <ThemePicker
                  value={themeId}
                  onChange={setThemeId}
                  disabled={!micReady}
                />
              )}
            </div>
          )}

          {/* Camera hint / errors, floating above transport */}
          {cam.error && mode !== "landing" && panel === null && (
            <p className="absolute inset-x-6 bottom-24 z-10 rounded-xl border border-[#FF3DBE]/30 bg-white/90 px-3 py-2 text-center text-xs text-[#B01D7E] shadow-sm backdrop-blur-md">
              {cam.error}
            </p>
          )}

          {isCountdown && (
            <div
              className="absolute inset-0 z-20 flex items-center justify-center bg-white/55 backdrop-blur-[2px]"
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
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-white/85 p-6 text-center backdrop-blur-sm">
              <h1
                className="text-3xl font-semibold leading-snug text-[#16181D]"
                style={{
                  fontFamily:
                    "var(--font-space-grotesk), var(--font-geist-sans), sans-serif",
                }}
              >
                Your voice,{" "}
                <span className="bg-gradient-to-r from-[#A24BFF] via-[#33E0FF] to-[#FF3DBE] bg-clip-text text-transparent">
                  visualized.
                </span>
              </h1>
              <p className="max-w-[28ch] text-sm leading-relaxed text-[#667085]">
                Light up the equalizer with your mic, then record a vertical
                video ready for TikTok or Reels.
              </p>
              <button
                type="button"
                onClick={() => void handleStartMic()}
                disabled={mic.status === "requesting"}
                className={cn(
                  "flex items-center gap-2 rounded-full bg-gradient-to-r from-[#A24BFF] via-[#33E0FF] to-[#FF3DBE] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-60",
                  focusRing
                )}
              >
                <Mic size={15} aria-hidden />
                {mic.status === "requesting"
                  ? "Waking the mic…"
                  : "Start the studio"}
              </button>
              <p className="max-w-[30ch] text-[11px] leading-relaxed text-[#667085]">
                Uses your microphone to draw the meters. Camera is separate —
                and optional.
              </p>
              {mic.status === "error" && mic.error && (
                <p className="max-w-[32ch] text-xs leading-relaxed text-[#B01D7E]">
                  {mic.error}
                </p>
              )}
              <p className="max-w-[34ch] text-[10px] leading-relaxed text-[#98A2B3]">
                {PRIVACY_NOTE}
              </p>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-[#98A2B3]">
          {PRIVACY_NOTE}
          <span className="hidden sm:inline"> · </span>
          <br className="sm:hidden" />
          Keep this tab in the foreground while recording.
        </p>
      </main>

      {/* ─── Review ─── */}
      {mode === "review" && recording && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Review your recording"
        >
          <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl border border-[#E9E6F5] bg-white p-5 shadow-2xl">
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

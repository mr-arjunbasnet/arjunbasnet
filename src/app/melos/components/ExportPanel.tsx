"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, RotateCcw, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Recording } from "../hooks/useRecorder";
import { optimizeForExport, type ExportResult } from "../lib/ffmpeg";
import { track } from "../lib/analytics";
import { focusRing, formatTime } from "../lib/ui";

function baseMime(mime: string): string {
  return mime.split(";")[0].trim();
}

function fileNameFor(mime: string): string {
  return baseMime(mime) === "video/mp4" ? "melos-studio.mp4" : "melos-studio.webm";
}

function saveBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export default function ExportPanel({
  rec,
  onRerecord,
}: {
  rec: Recording;
  onRerecord: () => void;
}) {
  // The panel unmounts on re-record, so per-recording state resets naturally.
  const [progress, setProgress] = useState<number | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const optimizedRef = useRef<ExportResult | null>(null);
  const skipOptimizeRef = useRef(false);

  const url = useMemo(() => URL.createObjectURL(rec.blob), [rec.blob]);
  useEffect(() => () => URL.revokeObjectURL(url), [url]);

  // Only rendered client-side, after a recording exists — navigator is safe.
  const [canShare] = useState(() => {
    try {
      const file = new File([rec.blob], fileNameFor(rec.mime), {
        type: baseMime(rec.mime),
      });
      return Boolean(navigator.canShare?.({ files: [file] }));
    } catch {
      return false;
    }
  });

  const isMp4 = baseMime(rec.mime) === "video/mp4";
  const busy = progress !== null;

  async function onDownload() {
    track("export_download");
    if (optimizedRef.current) {
      saveBlob(optimizedRef.current.blob, fileNameFor(optimizedRef.current.mime));
      return;
    }
    if (skipOptimizeRef.current) {
      saveBlob(rec.blob, fileNameFor(rec.mime));
      return;
    }
    setProgress(0);
    const result = await optimizeForExport(rec.blob, baseMime(rec.mime), (p) =>
      setProgress(p)
    );
    setProgress(null);
    if (skipOptimizeRef.current) return; // user already took the original
    optimizedRef.current = result;
    saveBlob(result.blob, fileNameFor(result.mime));
  }

  function onSkipOptimize() {
    skipOptimizeRef.current = true;
    setProgress(null);
    saveBlob(rec.blob, fileNameFor(rec.mime));
  }

  async function onShare() {
    track("export_share");
    // Use whatever is ready right now — awaiting a long transcode here would
    // break the user-gesture chain that navigator.share() requires.
    const ready = optimizedRef.current ?? {
      blob: rec.blob,
      mime: baseMime(rec.mime),
    };
    const file = new File([ready.blob], fileNameFor(ready.mime), {
      type: ready.mime,
    });
    try {
      await navigator.share({ files: [file], title: "Made with Melos Studio" });
    } catch (err) {
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        setNote("Sharing didn't work here — download the file and post it manually.");
      }
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2
          className="text-xl font-semibold text-[#16181D]"
          style={{
            fontFamily:
              "var(--font-space-grotesk), var(--font-geist-sans), sans-serif",
          }}
        >
          Your take
        </h2>
        <p className="text-xs text-[#667085]">
          {isMp4 ? "MP4" : "WebM"} · {formatTime(rec.duration)} · 1080×1920
        </p>
      </div>

      <video
        controls
        playsInline
        src={url}
        className="mx-auto max-h-[46vh] w-auto rounded-xl border border-black/10 bg-black"
      />

      {busy && (
        <div className="mt-4">
          <div className="h-1.5 overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#A24BFF] via-[#33E0FF] to-[#FF3DBE] transition-all"
              style={{ width: `${Math.round((progress ?? 0) * 100)}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-[11px] text-[#667085]">
              {isMp4 ? "Fixing MP4 metadata" : "Converting to MP4"} in your
              browser… {Math.round((progress ?? 0) * 100)}%
            </p>
            <button
              type="button"
              onClick={onSkipOptimize}
              className={cn(
                "shrink-0 text-[11px] font-medium text-[#7C3AED] hover:underline",
                focusRing
              )}
            >
              Use original instead
            </button>
          </div>
        </div>
      )}

      {note && <p className="mt-3 text-xs text-[#B01D7E]">{note}</p>}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onRerecord}
          disabled={busy}
          className={cn(
            "flex items-center gap-2 rounded-full border border-black/15 px-4 py-2.5 text-sm font-medium text-[#16181D] transition-colors hover:border-black/40 disabled:opacity-40",
            focusRing
          )}
        >
          <RotateCcw size={14} aria-hidden /> Re-record
        </button>
        <button
          type="button"
          onClick={onDownload}
          disabled={busy}
          className={cn(
            "flex items-center gap-2 rounded-full bg-[#16181D] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black disabled:opacity-40",
            focusRing
          )}
        >
          <Download size={14} aria-hidden /> Download
        </button>
        {canShare && (
          <button
            type="button"
            onClick={onShare}
            disabled={busy}
            className={cn(
              "flex items-center gap-2 rounded-full bg-gradient-to-r from-[#A24BFF] via-[#33E0FF] to-[#FF3DBE] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40",
              focusRing
            )}
          >
            <Share2 size={14} aria-hidden /> Share
          </button>
        )}
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-[#667085]">
        On phones, Share opens the native sheet with TikTok, Instagram and
        WhatsApp as targets. Nothing ever leaves your device until you post it.
      </p>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * The Melos signature: "melos" with the "l" replaced by a slim equalizer bar
 * driven by the live AnalyserNode. Holds still under prefers-reduced-motion
 * (or before the mic starts).
 */
export default function LivingWordmark({
  getAnalyser,
  reduced,
  className,
}: {
  getAnalyser?: () => AnalyserNode | null;
  reduced: boolean;
  className?: string;
}) {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced || !getAnalyser) return;
    const data = new Uint8Array(256);
    let rafId = 0;
    const loop = () => {
      rafId = requestAnimationFrame(loop);
      const analyser = getAnalyser();
      const el = barRef.current;
      if (!el) return;
      if (!analyser) {
        el.style.transform = "";
        return;
      }
      analyser.getByteTimeDomainData(data);
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
        const d = (data[i] - 128) / 128;
        sum += d * d;
      }
      const level = Math.min(1, Math.sqrt(sum / data.length) * 3.2);
      el.style.transform = `scaleY(${0.45 + level * 0.75})`;
    };
    rafId = requestAnimationFrame(loop);
    const el = barRef.current;
    return () => {
      cancelAnimationFrame(rafId);
      if (el) el.style.transform = "";
    };
  }, [getAnalyser, reduced]);

  return (
    <span
      className={cn(
        "inline-flex select-none items-baseline lowercase tracking-tight",
        className
      )}
      style={{
        fontFamily:
          "var(--font-space-grotesk), var(--font-geist-sans), sans-serif",
      }}
      role="img"
      aria-label="melos"
    >
      <span aria-hidden>me</span>
      <span
        ref={barRef}
        aria-hidden
        className="mx-[0.06em] inline-block w-[0.13em] origin-bottom rounded-full bg-gradient-to-b from-[#A24BFF] via-[#33E0FF] to-[#FF3DBE]"
        style={{ height: "0.74em", transition: "transform 60ms linear" }}
      />
      <span aria-hidden>os</span>
    </span>
  );
}

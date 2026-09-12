"use client";

import { useEffect, useRef } from "react";

/**
 * The ARJUN voice orb, ported from docs/Updated Branding/ARJUN_Voice_Orb.html
 * with the drawing loop kept as written. Three inputs drive it:
 *   - `level` / `bands` from the page (microphone analyser or synthesis), or
 *   - its own demo signal when `mode` is "demo",
 * and the mark is drawn from the kit's exact paths on top. transform-free
 * canvas work; respects prefers-reduced-motion by damping motion, exactly as
 * the source does.
 */
const PAL = ["#4F7BFF", "#8B5CF6", "#D946EF", "#FF7A8B", "#5B4BDB", "#C9BEFF", "#F8C9E7"];
const LAMBDA_D = "M68,694 L258,388 C270,368.7 289,361 306,361 C323,361 341,370 352,388 C400,468 470,588 531,694 C470,694 420,684 388,650 L313,535 C307,526 295,526 289,535 L226,630 C206,664 168,694 100,694 Z";
const BAND_D = "M737,694 L467,250 C458,232 450,214 440,203 C432,191 414,189 402,199 L360,240 C344,256 340,286 354,310 L557,630 C580,662 625,694 690,694 Z";
const SPARK_D = "M588 42 C596 96 618 126 664 138 C618 150 596 180 588 228 C580 180 558 150 512 138 C558 126 580 96 588 42 Z";
const MB = [66, 40] as const, MW = 674, MH = 656, SPC = [588, 138] as const;

export type OrbSignal = { level: number; bands: [number, number, number] };
export type OrbMode = "idle" | "live" | "demo";

const hexA = (h: string, a: number) => {
  const n = parseInt(h.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

export default function VoiceOrb({
  mode,
  signal,
  className,
  onActivate,
}: {
  mode: OrbMode;
  /** Live analyser reading, updated by the parent each frame it has one. */
  signal: React.MutableRefObject<OrbSignal>;
  className?: string;
  onActivate?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef(mode);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const cv = canvasRef.current!;
    const ctx = cv.getContext("2d")!;
    const stage = cv.parentElement!;
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LAMBDA = new Path2D(LAMBDA_D), BAND = new Path2D(BAND_D), SPARK = new Path2D(SPARK_D);
    let W = 0, H = 0, raf = 0, visible = true;
    let level = 0, prevLevel = 0, t = 0, last = performance.now();
    const bands = [0, 0, 0];
    const rings: { r: number; a: number; c: string }[] = [];

    const resize = () => {
      const r = stage.getBoundingClientRect();
      const DPR = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height; cv.width = W * DPR; cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    const ro = new ResizeObserver(resize); ro.observe(stage); resize();
    const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); });
    io.observe(stage);

    const blob = (x: number, y: number, r: number, col: string, a: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, hexA(col, a)); g.addColorStop(1, hexA(col, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    };

    function read() {
      const m = modeRef.current;
      let target = 0, tb: number[] = [0, 0, 0];
      if (m === "live") {
        target = signal.current.level; tb = signal.current.bands;
      } else if (m === "demo") {
        const syl = Math.max(0, Math.sin(t * 7.3) * Math.sin(t * 2.1 + 1) + 0.25 * Math.sin(t * 13.7));
        const phrase = Math.sin(t * 0.45) > -0.35 ? 1 : 0.15;
        target = Math.min(1, Math.max(0, syl * 0.95 * phrase));
        tb = [0.5 + 0.5 * Math.sin(t * 1.9), 0.5 + 0.5 * Math.sin(t * 3.1 + 2), 0.5 + 0.5 * Math.sin(t * 5.3 + 4)].map((v) => v * target);
      }
      level += (target - level) * (target > level ? 0.35 : 0.07);
      for (let i = 0; i < 3; i++) bands[i] += (tb[i] - bands[i]) * (tb[i] > bands[i] ? 0.3 : 0.08);
      if (!RM && m !== "idle" && level - prevLevel > 0.045 && level > 0.2 && rings.length < 6) rings.push({ r: 0, a: 0.6, c: PAL[Math.floor(Math.random() * 5)] });
      prevLevel = level * 0.98 + prevLevel * 0.02;
    }

    function frame(now: number) {
      raf = 0; if (!visible) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const idle = modeRef.current === "idle", calm = RM ? 0.35 : 1;
      t += dt * (0.6 + level * 1.6 * calm);
      read();
      const lv = idle ? 0.05 + 0.03 * Math.sin(t * 1.6) : level;
      const cx = W / 2, cy = H * 0.45, R = Math.min(W, H) * 0.2 * (1 + lv * 0.16 * calm);
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      blob(W * 0.5, H * 1.08, Math.max(W, H) * (0.55 + lv * 0.35), PAL[1], 0.22 + lv * 0.45);
      blob(W * 0.12, H * 1.0, Math.max(W, H) * (0.35 + lv * 0.25), PAL[0], 0.16 + lv * 0.4);
      blob(W * 0.88, H * 1.0, Math.max(W, H) * (0.35 + lv * 0.25), PAL[2], 0.14 + lv * 0.4);
      blob(W * (0.5 + 0.3 * Math.sin(t * 0.3)), -H * 0.1, Math.max(W, H) * 0.35, PAL[4], 0.1 + lv * 0.18);
      blob(W * (0.5 + 0.42 * Math.cos(t * 0.23)), H * (0.25 + 0.1 * Math.sin(t * 0.4)), Math.max(W, H) * 0.26, PAL[3], 0.05 + lv * 0.28);
      blob(cx, cy, R * (2.1 + lv * 1.3), PAL[1], 0.28 + lv * 0.35);
      ctx.globalCompositeOperation = "source-over";
      for (let i = rings.length - 1; i >= 0; i--) {
        const g = rings[i]; g.r += dt * (220 + level * 260); g.a *= Math.pow(0.2, dt);
        ctx.strokeStyle = hexA(g.c, g.a); ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(cx, cy, R * 1.04 + g.r, 0, 7); ctx.stroke();
        if (g.a < 0.02) rings.splice(i, 1);
      }
      const N = 144, amp = R * lv * 0.11 * calm, pts: [number, number][] = [];
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2;
        const d = amp * (Math.sin(3 * a + t * 1.3) * (0.4 + bands[0]) + 0.7 * Math.sin(5 * a - t * 1.7) * (0.3 + bands[1]) + 0.5 * Math.sin(8 * a + t * 2.4) * bands[2]) + R * 0.012 * Math.sin(2 * a + t * 0.8);
        pts.push([cx + Math.cos(a) * (R + d), cy + Math.sin(a) * (R + d)]);
      }
      const path = new Path2D();
      for (let i = 0; i <= N; i++) { const p = pts[i % N], q = pts[(i + 1) % N], m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; if (i) path.quadraticCurveTo(p[0], p[1], m[0], m[1]); else path.moveTo(m[0], m[1]); }
      path.closePath();
      ctx.save(); ctx.clip(path);
      const ga = t * 0.25, lg = ctx.createLinearGradient(cx - Math.cos(ga) * R, cy - Math.sin(ga) * R, cx + Math.cos(ga) * R, cy + Math.sin(ga) * R);
      lg.addColorStop(0, PAL[0]); lg.addColorStop(0.38, PAL[1]); lg.addColorStop(0.72, PAL[2]); lg.addColorStop(1, PAL[3]);
      ctx.fillStyle = lg; ctx.fillRect(cx - R * 1.3, cy - R * 1.3, R * 2.6, R * 2.6);
      ctx.globalCompositeOperation = "screen";
      const sp = (0.35 + level * 1.4) * calm;
      ([[0, PAL[0], 1], [1, PAL[2], 1], [2, PAL[3], 0.9], [3, PAL[1], 1], [4, PAL[4], 0.85], [5, PAL[6], 0.6], [6, PAL[5], 0.5]] as [number, string, number][]).forEach(([i, col, a]) => {
        const ang = t * sp * (i % 2 ? 1 : -1) * (0.6 + i * 0.13) + i * 1.05, rr = R * (0.42 + 0.18 * Math.sin(t * 0.7 + i));
        blob(cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr, R * (0.55 + 0.16 * Math.sin(t + i) + lv * 0.22), col, a);
      });
      ctx.globalCompositeOperation = "source-over";
      const sh = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R * 1.05);
      sh.addColorStop(0, "rgba(255,255,255,.28)"); sh.addColorStop(0.45, "rgba(255,255,255,0)"); sh.addColorStop(1, "rgba(18,15,46,.22)");
      ctx.fillStyle = sh; ctx.fillRect(cx - R * 1.3, cy - R * 1.3, R * 2.6, R * 2.6);
      ctx.restore();
      ctx.strokeStyle = "rgba(255,255,255,.22)"; ctx.lineWidth = 1.5; ctx.stroke(path);
      const s = ((R * 1.0) / MH) * (1 + lv * 0.05 * calm), mx = cx - (MW * s) / 2, my = cy - (MH * s) / 2 + R * 0.02;
      ctx.save(); ctx.translate(mx, my); ctx.scale(s, s); ctx.translate(-MB[0], -MB[1]);
      ctx.shadowColor = "rgba(18,15,46,.35)"; ctx.shadowBlur = 18; ctx.shadowOffsetY = 4;
      ctx.fillStyle = "#fff"; ctx.fill(LAMBDA); ctx.fill(BAND);
      const k = 1 + bands[2] * 0.35 * calm + (idle ? 0.04 * Math.sin(t * 2.4) : 0);
      ctx.translate(SPC[0], SPC[1]); ctx.scale(k, k); ctx.translate(-SPC[0], -SPC[1]);
      ctx.shadowColor = hexA("#F8C9E7", 0.6 + bands[2] * 0.4); ctx.shadowBlur = 10 + bands[2] * 40; ctx.shadowOffsetY = 0;
      ctx.fill(SPARK); ctx.restore();
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [signal]);

  return (
    <div className={className} style={{ position: "relative", background: "#0B0920", isolation: "isolate" }}>
      <canvas
        ref={canvasRef}
        role="button"
        tabIndex={0}
        aria-label="ARJUN voice orb. Activate to start or stop listening."
        onClick={onActivate}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onActivate?.(); } }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", cursor: "pointer" }}
      />
    </div>
  );
}

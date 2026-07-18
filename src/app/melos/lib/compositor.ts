import type { StudioTheme } from "./themes";

export const FRAME_W = 1080;
export const FRAME_H = 1920;

// mictests.com's auto-gain reference: a bin value at/above this hits full
// height (visually amplifying quiet input); anything louder is normalized
// down so the meter never clips. 150 is their canvas-height threshold.
const AUTOGAIN_REF = 150;

// Bar geometry: inset 12% per side, baseline at 78% of frame height so the
// equalizer clears TikTok's bottom-20% UI safe zone.
const BARS_X0 = FRAME_W * 0.12;
const BARS_X1 = FRAME_W * 0.88;
const BARS_BASE_Y = FRAME_H * 0.78;
const BARS_MAX_H = FRAME_H * 0.16;
const WAVE_Y = FRAME_H * 0.815;
const WAVE_AMP = FRAME_H * 0.018;

// Watermark wordmark, top-center.
const WM_SIZE = 58;
const WM_BASELINE_Y = 128;

export interface CompositorSources {
  canvas: HTMLCanvasElement;
  getAnalyser: () => AnalyserNode | null;
  getVideo: () => HTMLVideoElement | null;
  isCameraOn: () => boolean;
  getTheme: () => StudioTheme;
  getWordmarkFamily: () => string;
}

/**
 * Draws the 1080×1920 composition every frame. The same canvas is both the
 * on-screen preview (scaled down with CSS) and the MediaRecorder source, so
 * what the user sees is exactly what gets recorded.
 */
export class Compositor {
  private rafId = 0;
  private freq = new Uint8Array(512);
  private wave = new Uint8Array(1024);
  private ctx: CanvasRenderingContext2D | null = null;
  private cameraLive = false;
  private barRanges = new Map<number, Array<[number, number]>>();
  private directColors = new Map<string, (string | CanvasGradient)[]>();
  private glowTop: CanvasGradient | null = null;
  private glowBottom: CanvasGradient | null = null;
  private brandGlow: CanvasGradient | null = null;
  private cameraScrim: CanvasGradient | null = null;
  private wordmarkBar: CanvasGradient | null = null;

  constructor(private readonly src: CompositorSources) {}

  start() {
    if (this.rafId) return;
    // Full-rate rAF: throttling the draw loop reads as input lag.
    const loop = () => {
      this.rafId = requestAnimationFrame(loop);
      this.draw();
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }

  private ensureCtx(): CanvasRenderingContext2D | null {
    if (this.ctx) return this.ctx;
    this.ctx = this.src.canvas.getContext("2d");
    const ctx = this.ctx;
    if (!ctx) return null;

    this.glowTop = ctx.createRadialGradient(
      FRAME_W * 0.2, FRAME_H * 0.12, 0,
      FRAME_W * 0.2, FRAME_H * 0.12, FRAME_H * 0.55
    );
    this.glowTop.addColorStop(0, "rgba(162,75,255,0.10)");
    this.glowTop.addColorStop(1, "rgba(162,75,255,0)");

    this.glowBottom = ctx.createRadialGradient(
      FRAME_W * 0.85, FRAME_H * 0.92, 0,
      FRAME_W * 0.85, FRAME_H * 0.92, FRAME_H * 0.5
    );
    this.glowBottom.addColorStop(0, "rgba(51,224,255,0.10)");
    this.glowBottom.addColorStop(1, "rgba(51,224,255,0)");

    this.brandGlow = ctx.createRadialGradient(
      FRAME_W / 2, FRAME_H * 0.42, 0,
      FRAME_W / 2, FRAME_H * 0.42, FRAME_W * 0.85
    );
    this.brandGlow.addColorStop(0, "rgba(162,75,255,0.12)");
    this.brandGlow.addColorStop(0.55, "rgba(51,224,255,0.07)");
    this.brandGlow.addColorStop(1, "rgba(255,61,190,0)");

    this.cameraScrim = ctx.createLinearGradient(0, FRAME_H * 0.5, 0, FRAME_H);
    this.cameraScrim.addColorStop(0, "rgba(10,10,20,0)");
    this.cameraScrim.addColorStop(1, "rgba(10,10,20,0.65)");

    const barH = WM_SIZE * 0.78;
    this.wordmarkBar = ctx.createLinearGradient(
      0, WM_BASELINE_Y - barH, 0, WM_BASELINE_Y
    );
    this.wordmarkBar.addColorStop(0, "#A24BFF");
    this.wordmarkBar.addColorStop(0.5, "#33E0FF");
    this.wordmarkBar.addColorStop(1, "#FF3DBE");

    return ctx;
  }

  private draw() {
    const ctx = this.ensureCtx();
    if (!ctx) return;

    const analyser = this.src.getAnalyser();
    if (analyser) {
      if (this.freq.length !== analyser.frequencyBinCount) {
        this.freq = new Uint8Array(analyser.frequencyBinCount);
        this.wave = new Uint8Array(analyser.fftSize);
        this.barRanges.clear();
      }
      analyser.getByteFrequencyData(this.freq);
      analyser.getByteTimeDomainData(this.wave);
    } else {
      this.freq.fill(0);
      this.wave.fill(128);
    }

    this.drawBackdrop(ctx);
    this.drawSubject(ctx);
    this.drawBars(ctx);
    this.drawWave(ctx);
    this.drawWordmark(ctx);
  }

  private drawBackdrop(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, FRAME_W, FRAME_H);
    if (this.glowTop) {
      ctx.fillStyle = this.glowTop;
      ctx.fillRect(0, 0, FRAME_W, FRAME_H);
    }
    if (this.glowBottom) {
      ctx.fillStyle = this.glowBottom;
      ctx.fillRect(0, 0, FRAME_W, FRAME_H);
    }
  }

  // Subject layer: camera when available, brand background otherwise.
  // PHASE 2/3: insert an avatar renderer as a third branch here.
  private drawSubject(ctx: CanvasRenderingContext2D) {
    const video = this.src.getVideo();
    const cameraLive =
      this.src.isCameraOn() &&
      video !== null &&
      video.readyState >= 2 &&
      video.videoWidth > 0;
    this.cameraLive = cameraLive;

    if (cameraLive) {
      // Cover-fit crop: fill the 9:16 frame without stretching.
      const scale = Math.max(
        FRAME_W / video.videoWidth,
        FRAME_H / video.videoHeight
      );
      const sw = FRAME_W / scale;
      const sh = FRAME_H / scale;
      const sx = (video.videoWidth - sw) / 2;
      const sy = (video.videoHeight - sh) / 2;
      ctx.save();
      // Mirror the selfie feed so the preview feels like a mirror; the
      // recording matches the preview (WYSIWYG).
      ctx.translate(FRAME_W, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, FRAME_W, FRAME_H);
      ctx.restore();
      if (this.cameraScrim) {
        // Keep the bars legible over bright footage.
        ctx.fillStyle = this.cameraScrim;
        ctx.fillRect(0, FRAME_H * 0.5, FRAME_W, FRAME_H * 0.5);
      }
    } else if (this.brandGlow) {
      ctx.fillStyle = this.brandGlow;
      ctx.fillRect(0, 0, FRAME_W, FRAME_H);
    }
  }

  // Log-spaced bin ranges: voice energy lives in the low bins, so a linear
  // split leaves the right half of the meter dead. Log spacing gives every
  // bar across the width something to say.
  private rangesFor(n: number): Array<[number, number]> {
    const cached = this.barRanges.get(n);
    if (cached) return cached;
    const minBin = 1; // skip DC
    const maxBin = Math.min(this.freq.length - 8, 120); // drop the empty top
    const ranges: Array<[number, number]> = [];
    for (let i = 0; i < n; i++) {
      const a = Math.floor(minBin * Math.pow(maxBin / minBin, i / n));
      const b = Math.max(
        a + 1,
        Math.floor(minBin * Math.pow(maxBin / minBin, (i + 1) / n))
      );
      ranges.push([Math.min(a, maxBin - 1), Math.min(b, maxBin)]);
    }
    this.barRanges.set(n, ranges);
    return ranges;
  }

  // Faithful port of mictests.com's meter: bar i IS FFT bin i (~47 Hz each,
  // so ~100 bars cover the voice band), heights auto-gain-normalized, drawn
  // as plain 1:3 width:slot rects with fixed-hue colors.
  private drawBarsDirect(ctx: CanvasRenderingContext2D) {
    const theme = this.src.getTheme();
    const n = theme.bars;
    const slot = (BARS_X1 - BARS_X0) / n;
    const barW = slot * theme.barWidth;

    let colors = this.directColors.get(theme.id);
    if (!colors || colors.length !== n) {
      colors = [];
      for (let i = 0; i < n; i++) {
        colors.push(
          theme.barFill({
            ctx,
            i,
            n,
            amp: 1,
            baseY: BARS_BASE_Y,
            maxH: BARS_MAX_H,
          })
        );
      }
      this.directColors.set(theme.id, colors);
    }

    let max = 0;
    for (let j = 0; j < this.freq.length; j++) {
      if (this.freq[j] > max) max = this.freq[j];
    }
    const scale =
      (max > AUTOGAIN_REF ? AUTOGAIN_REF / max : 1) *
      (BARS_MAX_H / AUTOGAIN_REF);

    for (let i = 0; i < n; i++) {
      const h = this.freq[i] * scale;
      if (h <= 0) continue;
      ctx.fillStyle = colors[i];
      ctx.fillRect(BARS_X0 + i * slot, BARS_BASE_Y - h, barW, h);
    }
  }

  private drawBars(ctx: CanvasRenderingContext2D) {
    const theme = this.src.getTheme();
    if (theme.binMapping === "direct") {
      this.drawBarsDirect(ctx);
      return;
    }
    const n = theme.bars;
    const ranges = this.rangesFor(n);
    const slot = (BARS_X1 - BARS_X0) / n;
    const barW = slot * theme.barWidth;

    for (let i = 0; i < n; i++) {
      const [a, b] = ranges[i];
      let sum = 0;
      for (let j = a; j < b; j++) sum += this.freq[j];
      const amp = Math.pow(sum / ((b - a) * 255), 1.15);
      const h = Math.max(barW / 2, amp * BARS_MAX_H);
      const x = BARS_X0 + i * slot + (slot - barW) / 2;
      ctx.fillStyle = theme.barFill({
        ctx,
        i,
        n,
        amp,
        baseY: BARS_BASE_Y,
        maxH: BARS_MAX_H,
      });
      ctx.beginPath();
      ctx.roundRect(x, BARS_BASE_Y - h, barW, h, barW / 2);
      ctx.fill();
    }
  }

  private drawWave(ctx: CanvasRenderingContext2D) {
    const theme = this.src.getTheme();
    if (!theme.waveform) return;
    ctx.beginPath();
    const span = BARS_X1 - BARS_X0;
    const step = Math.max(1, Math.floor(this.wave.length / 256));
    const last = this.wave.length - 1;
    for (let i = 0; i <= last; i += step) {
      const x = BARS_X0 + (i / last) * span;
      const y = WAVE_Y + ((this.wave[i] - 128) / 128) * WAVE_AMP;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = theme.waveform;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  private drawWordmark(ctx: CanvasRenderingContext2D) {
    const family = this.src.getWordmarkFamily() || "sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.font = `600 ${WM_SIZE}px ${family}`;

    const gap = WM_SIZE * 0.1;
    const barW = WM_SIZE * 0.14;
    const barH = WM_SIZE * 0.78;
    const meW = ctx.measureText("me").width;
    const osW = ctx.measureText("os").width;
    const total = meW + gap + barW + gap + osW;
    const x = (FRAME_W - total) / 2;
    const y = WM_BASELINE_Y;

    // Dark ink on the light brand background, light over camera footage.
    ctx.fillStyle = this.cameraLive
      ? "rgba(255,255,255,0.92)"
      : "rgba(22,24,29,0.88)";
    ctx.fillText("me", x, y);
    ctx.fillText("os", x + meW + gap + barW + gap, y);

    if (this.wordmarkBar) {
      // Static version of the living wordmark's "l" bar.
      ctx.fillStyle = this.wordmarkBar;
      ctx.beginPath();
      ctx.roundRect(x + meW + gap, y - barH, barW, barH, barW / 2);
      ctx.fill();
    }

    ctx.font = `500 26px ${family}`;
    ctx.fillStyle = this.cameraLive
      ? "rgba(255,255,255,0.75)"
      : "rgba(102,112,128,0.85)";
    ctx.textAlign = "center";
    ctx.fillText("arjun-basnet.com.np", FRAME_W / 2, y + 44);
    ctx.textAlign = "left";
  }
}

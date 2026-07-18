import type { StudioTheme } from "./themes";

export const FRAME_W = 1080;
export const FRAME_H = 1920;

const BAR_COUNT = 24;
const DRAW_FPS = 30;

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
  private lastDraw = 0;
  private freq = new Uint8Array(128);
  private wave = new Uint8Array(256);
  private ctx: CanvasRenderingContext2D | null = null;
  private glowTop: CanvasGradient | null = null;
  private glowBottom: CanvasGradient | null = null;
  private brandGlow: CanvasGradient | null = null;
  private cameraScrim: CanvasGradient | null = null;
  private wordmarkBar: CanvasGradient | null = null;

  constructor(private readonly src: CompositorSources) {}

  start() {
    if (this.rafId) return;
    const loop = (t: number) => {
      this.rafId = requestAnimationFrame(loop);
      if (t - this.lastDraw < 1000 / DRAW_FPS) return;
      this.lastDraw = t;
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
    this.glowTop.addColorStop(0, "rgba(162,75,255,0.12)");
    this.glowTop.addColorStop(1, "rgba(162,75,255,0)");

    this.glowBottom = ctx.createRadialGradient(
      FRAME_W * 0.85, FRAME_H * 0.92, 0,
      FRAME_W * 0.85, FRAME_H * 0.92, FRAME_H * 0.5
    );
    this.glowBottom.addColorStop(0, "rgba(51,224,255,0.08)");
    this.glowBottom.addColorStop(1, "rgba(51,224,255,0)");

    this.brandGlow = ctx.createRadialGradient(
      FRAME_W / 2, FRAME_H * 0.42, 0,
      FRAME_W / 2, FRAME_H * 0.42, FRAME_W * 0.85
    );
    this.brandGlow.addColorStop(0, "rgba(162,75,255,0.18)");
    this.brandGlow.addColorStop(0.55, "rgba(51,224,255,0.06)");
    this.brandGlow.addColorStop(1, "rgba(51,224,255,0)");

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
    ctx.fillStyle = "#0A0A14";
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

  private drawBars(ctx: CanvasRenderingContext2D) {
    const theme = this.src.getTheme();
    const slot = (BARS_X1 - BARS_X0) / BAR_COUNT;
    const barW = slot * 0.62;
    const perBar = Math.floor(this.freq.length / BAR_COUNT);

    for (let i = 0; i < BAR_COUNT; i++) {
      let sum = 0;
      for (let j = i * perBar; j < (i + 1) * perBar; j++) sum += this.freq[j];
      const amp = Math.pow(sum / (perBar * 255), 1.15);
      const h = Math.max(barW / 2, amp * BARS_MAX_H);
      const x = BARS_X0 + i * slot + (slot - barW) / 2;
      ctx.fillStyle = theme.barFill({
        ctx,
        i,
        n: BAR_COUNT,
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
    ctx.beginPath();
    const span = BARS_X1 - BARS_X0;
    for (let i = 0; i < this.wave.length; i++) {
      const x = BARS_X0 + (i / (this.wave.length - 1)) * span;
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

    ctx.fillStyle = "rgba(232,233,242,0.92)";
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
    ctx.fillStyle = "rgba(138,140,163,0.8)";
    ctx.textAlign = "center";
    ctx.fillText("arjun-basnet.com.np", FRAME_W / 2, y + 44);
    ctx.textAlign = "left";
  }
}

export type ThemeId = "rainbow" | "melos" | "vu" | "mono";

export interface BarPaintArgs {
  ctx: CanvasRenderingContext2D;
  i: number;
  n: number;
  /** 0..1 amplitude of this bar, post-curve */
  amp: number;
  /** baseline y of the bars, in frame pixels */
  baseY: number;
  /** max bar height, in frame pixels */
  maxH: number;
}

export interface StudioTheme {
  id: ThemeId;
  name: string;
  tagline: string;
  /** CSS background for the picker swatch */
  chip: string;
  /** stroke style for the time-domain waveform line; empty string = no line */
  waveform: string;
  /** number of bars drawn across the meter area */
  bars: number;
  /** bar width as a fraction of its slot (rest is gap) */
  barWidth: number;
  /**
   * "direct": one FFT bin per bar with auto-gain normalization
   * (the mictests.com behavior). "log": log-spaced bin grouping.
   */
  binMapping: "direct" | "log";
  barFill(args: BarPaintArgs): string | CanvasGradient;
}

type Rgb = [number, number, number];

const MELOS_VIOLET: Rgb = [162, 75, 255]; // #A24BFF
const SIGNAL_CYAN: Rgb = [51, 224, 255]; // #33E0FF
const HOT_MAGENTA: Rgb = [255, 61, 190]; // #FF3DBE

function mix(a: Rgb, b: Rgb, t: number): Rgb {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

// Lift toward white — amplitude brightens the bar without shifting its hue.
function lift(c: Rgb, t: number): string {
  return `rgb(${Math.round(c[0] + (255 - c[0]) * t)},${Math.round(
    c[1] + (255 - c[1]) * t
  )},${Math.round(c[2] + (255 - c[2]) * t)})`;
}

// The VU gradient is fixed in frame coordinates, so cache one per context.
const vuGradients = new WeakMap<CanvasRenderingContext2D, CanvasGradient>();

export const THEMES: StudioTheme[] = [
  {
    id: "rainbow",
    name: "Rainbow",
    tagline: "One bar per frequency, instant response",
    chip: "linear-gradient(90deg, #FF3B30, #FF9500, #FFCC00, #34C759, #00C7BE, #007AFF, #AF52DE, #FF2D95)",
    waveform: "",
    bars: 64,
    barWidth: 0.5,
    binMapping: "direct",
    barFill({ i, n }) {
      // mictests.com's palette: full hue sweep, fixed saturation/lightness.
      return `hsl(${Math.round((i / n) * 360)}, 100%, 50%)`;
    },
  },
  {
    id: "melos",
    name: "Melos Spectrum",
    tagline: "The brand gradient, lit by your voice",
    chip: "linear-gradient(135deg, #A24BFF, #33E0FF 55%, #FF3DBE)",
    waveform: "rgba(51,224,255,0.75)",
    bars: 32,
    barWidth: 0.62,
    binMapping: "log",
    barFill({ i, n, amp }) {
      const t = n <= 1 ? 0 : i / (n - 1);
      const base =
        t < 0.5
          ? mix(MELOS_VIOLET, SIGNAL_CYAN, t * 2)
          : mix(SIGNAL_CYAN, HOT_MAGENTA, (t - 0.5) * 2);
      // Small lift only — the composition background is white now.
      return lift(base, amp * 0.15);
    },
  },
  {
    id: "vu",
    name: "VU Classic",
    tagline: "Green to red, like the old meters",
    chip: "linear-gradient(0deg, #2BE86B, #FFD23F 60%, #FF3B3B)",
    waveform: "rgba(255,210,63,0.7)",
    bars: 32,
    barWidth: 0.62,
    binMapping: "log",
    barFill({ ctx, baseY, maxH }) {
      let g = vuGradients.get(ctx);
      if (!g) {
        g = ctx.createLinearGradient(0, baseY, 0, baseY - maxH);
        g.addColorStop(0, "#2BE86B");
        g.addColorStop(0.55, "#FFD23F");
        g.addColorStop(0.8, "#FF7A3D");
        g.addColorStop(1, "#FF3B3B");
        vuGradients.set(ctx, g);
      }
      return g;
    },
  },
  {
    id: "mono",
    name: "Mono",
    tagline: "Signal Cyan, minimal",
    chip: "#33E0FF",
    waveform: "rgba(51,224,255,0.8)",
    bars: 32,
    barWidth: 0.62,
    binMapping: "log",
    barFill({ amp }) {
      return lift(SIGNAL_CYAN, amp * 0.1);
    },
  },
];

export function getTheme(id: ThemeId): StudioTheme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

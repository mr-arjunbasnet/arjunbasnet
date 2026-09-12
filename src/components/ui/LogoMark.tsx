import { cn } from "@/lib/utils";

/**
 * The ARJUN mark — Variant Aurora, generated from the kit's own file
 * (public/brand/mark/ARJUN_mark_full.svg): gradient definitions and paths
 * verbatim. Guidelines §04/§10 — never redraw, re-space, recolour or move
 * the spark — so nothing here is hand-drawn. Three gradients, not one: the
 * A, the ribbon (with its coral tail) and the spark each carry their own.
 *
 * `tone`: `full` renders the kit gradients; `white` and `indigo` are the §05
 * one-colour colourways for Aurora/photographic and formal grounds.
 */
export default function LogoMark({
  size = 32,
  tone = "full",
  className,
}: {
  size?: number;
  tone?: "full" | "white" | "indigo";
  className?: string;
}) {
  const flat = tone === "white" ? "#FFFFFF" : tone === "indigo" ? "#221A5C" : null;
  if (flat) {
    return (
      <svg width={size} height={size} viewBox="0 0 702.0 684.0" aria-hidden className={cn("shrink-0", className)} fill={flat}>
        <g transform="translate(14.00 14.00) scale(1.00000) translate(-66 -40)">
      <path d="M68,694 L258,388 C272,368 289,361 306,361 C323,361 340,370 352,388 C400,468 470,588 531,694 C470,694 420,684 388,650 L301,520 L226,630 C206,664 168,694 100,694 Z"/>
      <path d="M737,694 L467,250 C458,232 450,214 440,203 C432,191 414,189 402,199 L360,240 C344,256 340,286 354,310 L557,630 C580,662 625,694 690,694 Z"/>
      <path d="M588,42 Q596,130 664,138 Q596,146 588,228 Q580,146 512,138 Q580,130 588,42 Z"/>
        </g>
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 702.0 684.0" aria-hidden className={cn("shrink-0", className)}>
      <defs>
        <linearGradient id="ls4l" gradientUnits="userSpaceOnUse" x1="68" y1="694" x2="531" y2="694"><stop offset="0" stopColor="#3E86FF"/><stop offset=".36" stopColor="#6C63F7"/><stop offset=".58" stopColor="#7C4DF4"/><stop offset=".8" stopColor="#9D4EF0"/><stop offset="1" stopColor="#C451E8"/></linearGradient><linearGradient id="ls4b" gradientUnits="userSpaceOnUse" x1="350" y1="220" x2="690" y2="690"><stop offset="0" stopColor="#8A5CF6"/><stop offset=".5" stopColor="#D23FEA"/><stop offset=".78" stopColor="#E04BD0"/><stop offset="1" stopColor="#FF7A8B"/></linearGradient><linearGradient id="ls4s" gradientUnits="userSpaceOnUse" x1="512" y1="200" x2="664" y2="80"><stop offset="0" stopColor="#4F7BFF"/><stop offset=".5" stopColor="#9B5CF4"/><stop offset="1" stopColor="#E545D6"/></linearGradient>
      </defs>
      <g transform="translate(14.00 14.00) scale(1.00000) translate(-66 -40)">
      <path d="M68,694 L258,388 C272,368 289,361 306,361 C323,361 340,370 352,388 C400,468 470,588 531,694 C470,694 420,684 388,650 L301,520 L226,630 C206,664 168,694 100,694 Z" fill="url(#ls4l)"/>
      <path d="M737,694 L467,250 C458,232 450,214 440,203 C432,191 414,189 402,199 L360,240 C344,256 340,286 354,310 L557,630 C580,662 625,694 690,694 Z" fill="url(#ls4b)"/>
      <path d="M588,42 Q596,130 664,138 Q596,146 588,228 Q580,146 512,138 Q580,130 588,42 Z" fill="url(#ls4s)"/>
      </g>
    </svg>
  );
}

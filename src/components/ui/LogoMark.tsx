import { cn } from "@/lib/utils";

/**
 * The mark — redrawn as vector from the owner's brand sheet (2026-09-08).
 *
 * A ring on a blue→violet gradient, a bow with its string drawn taut through
 * the centre, a four-point star at the centre, and a node at each pole. The
 * sheet reads it as: arrow (direction), bow (discipline), star (guidance),
 * circle (wholeness), the centre (focus).
 *
 * The gradient stops are literal hex on purpose. A logo is the one thing on
 * the site that must NOT re-theme with the palette — it is the fixed point
 * the palette is derived from — so this is a deliberate exemption from the
 * tokens-only rule, like WhatsApp's brand green. The string and star are
 * `currentColor`, so the mark sits on light chrome (dark internals) and on the
 * gradient bands (white internals) without a second asset.
 *
 * Standalone files for use off-site live in public/brand/.
 */
export default function LogoMark({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="arjun-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="0.55" stopColor="#6366F1" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="22.5" stroke="url(#arjun-ring)" strokeWidth="3" />
      <circle cx="32" cy="7" r="3" fill="#3B82F6" />
      <circle cx="32" cy="57" r="3" fill="#8B5CF6" />
      <path
        d="M32 15.5 C 23.5 24, 23.5 40, 32 48.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path d="M32 15.5 V48.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="32" cy="32" r="7.5" fill="url(#arjun-ring)" opacity="0.22" />
      <path
        d="M32 25.5 L33.7 30.3 L38.5 32 L33.7 33.7 L32 38.5 L30.3 33.7 L25.5 32 L30.3 30.3 Z"
        fill="currentColor"
      />
    </svg>
  );
}

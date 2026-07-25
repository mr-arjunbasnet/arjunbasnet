import { cn } from "@/lib/utils";

/**
 * The "A" mark.
 *
 * Drawn as inline SVG rather than a raster file so it stays crisp at any size,
 * needs no network request, and inherits currentColor — which lets it sit on
 * the light chrome and the blue CTA band without a second asset.
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
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <rect width="32" height="32" rx="7" className="fill-primary" />
      {/* Apex, two legs, and a crossbar — a geometric A rather than a glyph,
          so it renders identically regardless of available fonts. */}
      <path
        d="M9 23L16 9l7 14"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.1 18.2h7.8"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

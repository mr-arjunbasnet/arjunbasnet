import { cn } from "@/lib/utils";

interface EyebrowProps {
  tone?: "muted" | "primary" | "accent";
  className?: string;
  children: React.ReactNode;
}

const tones = {
  muted: "text-muted",
  primary: "text-primary",
  accent: "text-primary",
} as const;

/** The small uppercase kicker above section headings, used ~15 times. */
export default function Eyebrow({
  tone = "muted",
  className,
  children,
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "glass-soft inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </p>
  );
}

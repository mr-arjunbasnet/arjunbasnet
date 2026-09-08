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
        "text-xs font-semibold uppercase tracking-label",
        tones[tone],
        className,
      )}
    >
      {children}
    </p>
  );
}

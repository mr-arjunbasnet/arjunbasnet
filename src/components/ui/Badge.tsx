import { cn } from "@/lib/utils";

type Tone = "neutral" | "primary" | "accent" | "surface";

interface BadgeProps {
  tone?: Tone;
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
}

const tones: Record<Tone, string> = {
  neutral: "border-border text-muted",
  primary: "border-primary/30 text-primary bg-primary/5",
  accent: "border-primary/30 text-primary bg-primary/5",
  surface: "border-transparent bg-surface text-fg",
};

export default function Badge({
  tone = "neutral",
  size = "sm",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border font-medium",
        size === "sm" ? "text-xs px-2.5 py-0.5" : "text-sm px-3 py-1",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

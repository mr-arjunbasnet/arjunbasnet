import { cn } from "@/lib/utils";
import Container from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
  bg?: "default" | "surface" | "surface-2" | "primary";
  border?: "none" | "top" | "bottom" | "y";
  /** Set false when the section needs to bleed full-width. */
  contained?: boolean;
  width?: "site" | "reading" | "narrow";
  /**
   * Renders the sticky-label two-column layout used throughout the original
   * pages: a short label pinned left, content right. Collapses on mobile.
   */
  label?: string;
}

const sizes = {
  sm: "py-10 md:py-14",
  md: "py-14 md:py-20",
  lg: "py-20 md:py-28",
} as const;

const backgrounds = {
  default: "bg-bg",
  surface: "bg-surface",
  "surface-2": "bg-surface-2",
  primary: "bg-primary text-primary-fg",
} as const;

const borders = {
  none: "",
  top: "border-t border-border",
  bottom: "border-b border-border",
  y: "border-y border-border",
} as const;

export default function Section({
  size = "md",
  bg = "default",
  border = "none",
  contained = true,
  width = "site",
  label,
  className,
  children,
  ...rest
}: SectionProps) {
  const body = label ? (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr] lg:gap-12">
      <div>
        <p className="text-xs font-semibold uppercase tracking-label text-muted lg:sticky lg:top-24">
          {label}
        </p>
      </div>
      <div>{children}</div>
    </div>
  ) : (
    children
  );

  return (
    <section
      className={cn(sizes[size], backgrounds[bg], borders[border], className)}
      {...rest}
    >
      {contained ? <Container width={width}>{body}</Container> : body}
    </section>
  );
}

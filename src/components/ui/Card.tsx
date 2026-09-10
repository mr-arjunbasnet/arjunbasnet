import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/lib/utils";

interface CardProps {
  href?: Route | (string & {});
  padding?: "none" | "sm" | "md" | "lg";
  /** Adds hover lift + border colour change. Implied when `href` is set. */
  interactive?: boolean;
  /** Left accent rule, for grouping cards by category. */
  accent?: boolean;
  className?: string;
  children: React.ReactNode;
  /** Analytics attributes for the site ClickTracker (link cards only). */
  track?: string;
  trackLabel?: string;
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-7",
} as const;

/**
 * Replaces the `border border-border rounded-xl p-5 hover:shadow-md`
 * markup that was re-declared inline in eight-plus places.
 */
export default function Card({
  href,
  padding = "md",
  interactive,
  accent,
  className,
  children,
  track,
  trackLabel,
}: CardProps) {
  const isInteractive = interactive ?? href !== undefined;

  const classes = cn(
    // Glass: the site-wide material since 2026-09-10 (see globals.css).
    "glass block rounded-[20px]",
    paddings[padding],
    accent && "border-l-2 border-l-primary",
    isInteractive &&
      "transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-white/75 active:scale-[0.995] active:translate-y-0",
    className,
  );

  if (href) {
    return (
      <Link href={href as Route} className={cn(classes, "group")}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}

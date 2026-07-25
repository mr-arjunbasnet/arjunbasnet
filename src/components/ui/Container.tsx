import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `site` (72rem) matches the max-w-6xl used across the original pages. */
  width?: "site" | "reading" | "narrow";
  as?: "div" | "section" | "header" | "footer" | "article";
}

const widths = {
  site: "max-w-site",
  reading: "max-w-reading",
  narrow: "max-w-2xl",
} as const;

/** Replaces the `max-w-6xl mx-auto px-6` incantation repeated ~20 times. */
export default function Container({
  width = "site",
  as: Tag = "div",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag className={cn(widths[width], "mx-auto px-6", className)} {...rest}>
      {children}
    </Tag>
  );
}

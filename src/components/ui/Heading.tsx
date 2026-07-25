import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  /** Serif display face. Defaults on for h1/h2, off below. */
  serif?: boolean;
  /** Renders at a different visual size than the semantic level. */
  size?: "display" | "xl" | "lg" | "md" | "sm";
}

const defaultSizes = {
  1: "display",
  2: "xl",
  3: "md",
  4: "sm",
} as const;

const sizeClasses = {
  display: "text-4xl md:text-5xl lg:text-display leading-[1.05]",
  xl: "text-3xl md:text-4xl leading-[1.1]",
  lg: "text-2xl md:text-3xl leading-tight",
  md: "text-lg md:text-xl leading-snug",
  sm: "text-base leading-snug",
} as const;

/**
 * Replaces the twelve inline `style={{ fontFamily: "var(--font-dm-serif)" }}`
 * attributes with the `font-display` token utility.
 */
export default function Heading({
  level = 2,
  serif,
  size,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  const useSerif = serif ?? level <= 2;

  return (
    <Tag
      className={cn(
        sizeClasses[size ?? defaultSizes[level]],
        useSerif ? "font-display font-normal" : "font-semibold",
        "text-fg text-balance",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

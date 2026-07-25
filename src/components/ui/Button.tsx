import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: Route | (string & {});
  /** Renders a plain <a> with rel/target set, for off-site destinations. */
  external?: boolean;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-fg hover:bg-primary-light border border-transparent",
  secondary:
    "bg-transparent text-fg border border-border hover:border-primary hover:text-primary",
  ghost:
    "bg-transparent text-muted border border-transparent hover:text-fg hover:bg-surface",
  accent:
    "bg-accent text-primary-fg hover:opacity-90 border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-3.5 py-1.5 gap-1.5",
  md: "text-sm px-5 py-2.5 gap-2",
  lg: "text-base px-6 py-3 gap-2",
};

/**
 * One API for every call to action, rendering as <button>, <Link>, or <a>.
 *
 * Deliberately a server component — the interactive variant lives in
 * SubmitButton, so putting a CTA on a static page never drags a client
 * boundary along with it.
 */
export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth,
    icon,
    iconPosition = "right",
    className,
    children,
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center rounded-pill font-medium transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    if (props.external) {
      return (
        <a
          href={props.href as string}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={props.href as Route} className={classes}>
        {content}
      </Link>
    );
  }

  const { variant: _v, size: _s, fullWidth: _f, icon: _i, iconPosition: _ip,
    className: _c, children: _ch, ...buttonRest } = props as ButtonAsButton;

  return (
    <button className={classes} {...buttonRest}>
      {content}
    </button>
  );
}

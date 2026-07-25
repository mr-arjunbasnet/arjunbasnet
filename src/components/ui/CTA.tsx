import type { Route } from "next";
import { ArrowRight, MessageCircle, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE, whatsappUrl } from "@/content/site";
import Container from "./Container";
import Button from "./Button";
import Heading from "./Heading";
import TrackedLink from "@/components/lead/TrackedLink";

interface CTAProps {
  title?: string;
  body?: string;
  primary?: { label: string; href: Route | (string & {}) };
  /** Adds a WhatsApp button alongside the primary action. */
  whatsapp?: boolean;
  /** `band` is the full-bleed blue block; `card` sits inline within a page. */
  variant?: "band" | "card";
  /** Appended to the pre-filled WhatsApp message for attribution. */
  context?: string;
  className?: string;
}

/**
 * The closing call to action, previously re-declared inline on the home and
 * work pages. Ends every service page and blog post.
 */
export default function CTA({
  title = "Let's talk about your project.",
  body = "Tell me what you're trying to build or fix. I'll tell you honestly whether I'm the right person for it, and what it would take.",
  primary = { label: "Start a conversation", href: "/contact" },
  whatsapp = true,
  variant = "band",
  context,
  className,
}: CTAProps) {
  const inner = (
    <div
      className={cn(
        variant === "card" &&
          "rounded-card border border-border bg-surface p-8 md:p-10",
      )}
    >
      <Heading
        level={2}
        size="lg"
        className={cn("mb-3", variant === "band" && "text-primary-fg")}
      >
        {title}
      </Heading>
      <p
        className={cn(
          "max-w-xl leading-relaxed mb-7",
          variant === "band" ? "text-primary-fg/80" : "text-muted",
        )}
      >
        {body}
      </p>
      <div className="flex flex-wrap gap-3">
        <Button
          href={primary.href}
          variant={variant === "band" ? "accent" : "primary"}
          size="lg"
          icon={<ArrowRight size={16} />}
        >
          {primary.label}
        </Button>
        <TrackedLink
          href={SITE.calendarUrl}
          event="calendar_click"
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-pill border px-6 py-3 text-base font-medium transition-colors",
            variant === "band"
              ? "border-primary-fg/30 text-primary-fg hover:bg-primary-light"
              : "border-border text-fg hover:border-primary hover:text-primary",
          )}
        >
          <CalendarDays size={16} aria-hidden />
          Book a call
        </TrackedLink>
        {whatsapp && (
          <TrackedLink
            href={whatsappUrl(context)}
            event="whatsapp_click"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-pill border px-6 py-3 text-base font-medium transition-colors",
              variant === "band"
                ? "border-primary-fg/30 text-primary-fg hover:bg-primary-light"
                : "border-border text-fg hover:border-primary hover:text-primary",
            )}
          >
            <MessageCircle size={16} aria-hidden />
            WhatsApp
          </TrackedLink>
        )}
      </div>
      {variant === "band" && (
        <p className="text-primary-fg/60 text-sm mt-6">
          {SITE.address.locality}, Nepal · {SITE.timezone} · Typically replies
          within 24 hours
        </p>
      )}
    </div>
  );

  if (variant === "card") {
    return <div className={className}>{inner}</div>;
  }

  return (
    <section className={cn("bg-primary py-16 md:py-20", className)}>
      <Container>{inner}</Container>
    </section>
  );
}

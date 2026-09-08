import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * §27 — the compact sticky CTA on mobile.
 *
 * Server component, no state: a fixed bar with one link. It sits below the
 * WhatsApp FAB in stacking order (z-30 against the FAB's z-40) and leaves the
 * FAB's column clear on the right, so the two never fight for the thumb.
 * Hidden from md up, where the hero CTAs are always within a scroll.
 *
 * The page adds a matching spacer at its end so the bar never covers the
 * footer's last line.
 */
export default function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 px-4 py-3 pr-[5.5rem] backdrop-blur-sm md:hidden print:hidden">
      <Link
        href="/contact"
        className="flex h-11 w-full items-center justify-center gap-2 rounded-pill bg-brand text-sm font-medium text-primary-fg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Book AI training
        <ArrowRight size={15} aria-hidden />
      </Link>
    </div>
  );
}

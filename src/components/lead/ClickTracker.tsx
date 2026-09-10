"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * One delegated click listener for the whole site.
 *
 * Any element — in a server component, with no client boundary — opts into
 * analytics by carrying `data-track="<event>"` and optionally
 * `data-track-label="<label>"`. The listener resolves the nearest such
 * ancestor of the click target and sends the event with the label and the
 * href. Server components therefore never import the analytics module, and
 * adding tracking to a button is an attribute, not a refactor.
 *
 * TrackedLink still exists for the WhatsApp and calendar links; both paths
 * end in the same `track()`.
 */
export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const event = el.dataset.track as AnalyticsEvent;
      track(event, {
        label: el.dataset.trackLabel ?? el.textContent?.trim().slice(0, 60) ?? "",
        href: (el as HTMLAnchorElement).getAttribute?.("href") ?? "",
        path: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

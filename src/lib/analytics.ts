import { sendGAEvent } from "@next/third-parties/google";

/**
 * The single analytics seam.
 *
 * This is the ONLY module allowed to import @next/third-parties or reference
 * gtag. Everything else imports `track()`. Swapping providers is then a
 * one-file change rather than a hunt through components — which is exactly the
 * seam the original Melos stub was built to provide.
 */

/** Events from the Melos recording studio. Preserved from the original stub. */
type StudioEvent =
  | "studio_open"
  | "mic_granted"
  | "camera_granted"
  | "record_start"
  | "record_complete"
  | "export_download"
  | "export_share";

/** Commercial funnel events. */
type FunnelEvent =
  | "service_view"
  | "cta_click"
  | "lead_form_start"
  | "lead_form_submit"
  | "lead_form_success"
  | "lead_form_error"
  | "whatsapp_click"
  | "calendar_click"
  | "phone_click"
  | "email_click"
  | "case_study_view"
  | "faq_expand"
  | "outbound_click";

export type AnalyticsEvent = StudioEvent | FunnelEvent;

/**
 * Mark these as key events in GA4. The funnel worth building is
 * service_view -> cta_click -> lead_form_start -> lead_form_success, which
 * answers the only question that matters: which of the nine services converts.
 */
export const KEY_EVENTS: AnalyticsEvent[] = [
  "lead_form_success",
  "whatsapp_click",
  "calendar_click",
];

export function track(
  event: AnalyticsEvent,
  props?: Record<string, string | number | boolean>,
) {
  if (process.env.NODE_ENV !== "production") {
    console.debug(`[analytics] ${event}`, props ?? {});
    return;
  }
  // No-ops safely if the gtag script has not loaded (ad blocker, consent tool).
  try {
    sendGAEvent("event", event, props ?? {});
  } catch {
    // Measurement must never break the page.
  }
}

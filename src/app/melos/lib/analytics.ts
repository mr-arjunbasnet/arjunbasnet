type StudioEvent =
  | "studio_open"
  | "mic_granted"
  | "camera_granted"
  | "record_start"
  | "record_complete"
  | "export_download"
  | "export_share";

// The site has no analytics provider wired in yet. This stub keeps every
// event visible in dev and gives a single seam to route to a real provider.
export function track(
  event: StudioEvent,
  props?: Record<string, string | number | boolean>
) {
  if (process.env.NODE_ENV !== "production") {
    console.debug(`[melos] ${event}`, props ?? {});
  }
}

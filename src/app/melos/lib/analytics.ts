// Melos now uses the site-wide analytics seam. Kept as a re-export so nothing
// under src/app/melos/ needed to change when a real provider was wired in.
export { track } from "@/lib/analytics";
export type { AnalyticsEvent } from "@/lib/analytics";

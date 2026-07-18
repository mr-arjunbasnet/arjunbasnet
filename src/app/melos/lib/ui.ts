// Shared UI atoms for the Melos studio.

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#33E0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A14]";

export function formatTime(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

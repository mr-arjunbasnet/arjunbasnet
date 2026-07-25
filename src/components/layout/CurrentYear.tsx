"use client";

/**
 * Renders the current year, correctly.
 *
 * Calling `new Date().getFullYear()` directly in the Footer froze the year at
 * build time — every page here is statically prerendered, so the copyright
 * would have silently read 2026 forever.
 *
 * Computing it during render means the prerendered HTML carries the build year
 * and the client carries the real one. `suppressHydrationWarning` is the
 * intended escape hatch for exactly this case: a value that is legitimately
 * expected to differ between server and client. Doing it with an effect
 * instead would set state synchronously on mount and trigger a second render.
 */
export default function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}

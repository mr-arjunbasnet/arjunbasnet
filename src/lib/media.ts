import fs from "node:fs";
import path from "node:path";

/**
 * Build-time check for whether an optional image has been dropped into public/.
 *
 * The AI trainer page is specified as image-heavy and leads on real
 * photographs of training and speaking. Those files arrive from the owner
 * rather than from the repository, and a next/image pointing at a missing file
 * renders a broken image rather than degrading.
 *
 * Reading the filesystem at build time lets each slot decide for itself: the
 * photograph renders when the file exists, and an editorial fallback renders
 * when it does not. Nothing is ever half-broken, and dropping a file in is the
 * whole of the upgrade — no code change.
 *
 * Safe in a server component only. Every page using it is statically
 * prerendered, so this runs at build and never at request time.
 */
export function publicFileExists(src: string): boolean {
  if (!src.startsWith("/")) return false;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src.slice(1)));
  } catch {
    return false;
  }
}

/**
 * Input sanitisation for outbound email.
 *
 * All escaping lives here rather than inline at the template, so it is
 * auditable in one place and adding a field cannot silently skip it.
 */

/**
 * Escapes HTML special characters.
 *
 * `&` must be replaced FIRST — doing it later would re-escape the ampersands
 * introduced by the other replacements and produce `&amp;lt;`.
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\//g, "&#47;");
}

/**
 * Strips CR and LF.
 *
 * Mandatory for any value that reaches a mail header. A newline inside `name`
 * or `subject` lets a sender inject arbitrary headers — a Bcc, a forged
 * Reply-To, or an entirely separate message body.
 */
export function stripCrlf(input: string): string {
  return input.replace(/[\r\n]+/g, " ").trim();
}

/** Trims, collapses whitespace, strips CRLF, and caps length. */
export function sanitiseField(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  return stripCrlf(input).slice(0, maxLength);
}

/** Body text: newlines are meaningful, so only length and type are enforced. */
export function sanitiseBody(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLength);
}

/** Escapes body text for HTML, then restores newlines as <br>. */
export function bodyToHtml(input: string): string {
  // Escape first, then add markup. Reversed, the <br> tags would be escaped.
  return escapeHtml(input).replace(/\n/g, "<br>");
}

export const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;

/*
 * Names that shouldn't go on a public leaderboard: "test", "test1", keyboard
 * mashes, placeholders. The same rule lives in public/.../assets/session.js
 * (SAG.badName) so the phone can say "Type your correct name" before sending.
 * Single first names ("Karuna", "violet") are fine: real players use them.
 */
const CONTAINS = /test|asdf|qwert|zxcv|dummy/;
const EXACT = new Set([
  "abc", "abcd", "abcde", "xyz", "xxx", "name", "myname", "yourname", "fullname", "user", "username",
  "admin", "demo", "fake", "anonymous", "anon", "unknown", "guest", "student", "player", "hello", "hi",
  "noname", "nobody", "none", "null", "undefined", "sample", "trial", "check", "na",
]);

export function badName(raw: string): boolean {
  const letters = raw.toLowerCase().normalize("NFKD").replace(/[^a-zऀ-ॿ]/g, "");
  if (letters.length < 2) return true; // only digits or symbols
  if (/^(.)\1+$/.test(letters)) return true; // "aaaa"
  if (CONTAINS.test(letters)) return true;
  return EXACT.has(letters);
}

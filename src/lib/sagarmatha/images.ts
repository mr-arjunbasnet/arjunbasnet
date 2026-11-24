/*
 * AI or Not: the image pool for the Sagarmatha College session.
 *
 * SERVER-ONLY. The repo is public, so the answer key (which image is AI, its
 * tell, its credit) is NOT in plaintext here: it lives encrypted in
 * pool.enc.ts and is decrypted at runtime with SAGARMATHA_POOL_KEY (an env
 * var in Vercel and .env.local). Without the key the game simply stays off.
 *
 * The browser receives only an image URL, one image at a time, and learns the
 * truth for an image only after answering it. File names are random hex and
 * every file is re-encoded without EXIF.
 *
 * To change the pool: process new files with scripts/sagarmatha-images.py,
 * edit src/lib/sagarmatha/pool.local.json (gitignored), then run
 * `node scripts/sagarmatha-pool-encrypt.mjs`. A game draws up to five of each kind.
 */
import { createDecipheriv } from "node:crypto";
import { POOL_ENC } from "./pool.enc";

export type Truth = "ai" | "real";

export type PoolImage = {
  id: string;
  file: string;
  truth: Truth;
  /** One sentence shown after answering: what gives it away, or why it's real. */
  tell: string;
  credit: string;
};

const DIR = "/ai-training/sagarmatha-college/aion/";

let cache: PoolImage[] | null = null;

/** The decrypted pool, or [] when SAGARMATHA_POOL_KEY is missing or wrong. */
export function pool(): PoolImage[] {
  if (cache) return cache;
  const raw = process.env.SAGARMATHA_POOL_KEY?.trim();
  if (!raw) return [];
  try {
    const key = Buffer.from(raw, "base64");
    const buf = Buffer.from(POOL_ENC, "base64");
    const d = createDecipheriv("aes-256-gcm", key, buf.subarray(0, 12));
    d.setAuthTag(buf.subarray(12, 28));
    const text = Buffer.concat([d.update(buf.subarray(28)), d.final()]).toString("utf8");
    cache = JSON.parse(text) as PoolImage[];
    return cache;
  } catch (e) {
    console.error("[sagarmatha] SAGARMATHA_POOL_KEY does not decrypt the pool", e instanceof Error ? e.message : e);
    return [];
  }
}

export const poolStatus = () => (!process.env.SAGARMATHA_POOL_KEY ? "key_missing" : pool().length ? "ok" : "key_wrong");

export const imageUrl = (img: PoolImage) => DIR + img.file;

export function byId(id: string): PoolImage | undefined {
  return pool().find((p) => p.id === id);
}

/** Up to five of each kind, shuffled. Ten images when the pool allows. */
export function drawGame(size = 10): PoolImage[] {
  const shuffle = <T,>(a: T[]) => {
    const r = [...a];
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  };
  const all = pool();
  const ai = shuffle(all.filter((p) => p.truth === "ai"));
  const real = shuffle(all.filter((p) => p.truth === "real"));
  const half = Math.floor(size / 2);
  let pick = [...ai.slice(0, half), ...real.slice(0, half)];
  // Short on one kind: top up from the other so the game is still `size` long.
  const rest = shuffle([...ai.slice(half), ...real.slice(half)]);
  while (pick.length < size && rest.length) pick.push(rest.pop()!);
  pick = shuffle(pick);
  return pick.slice(0, size);
}

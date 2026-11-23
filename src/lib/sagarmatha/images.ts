/*
 * AI or Not: the image pool for the Sagarmatha College session.
 *
 * SERVER-ONLY. The browser receives only `file`. Whether an image is real or
 * AI, its tell and its credit are sent back one image at a time, after the
 * player has answered. CSIT students will open DevTools, so the answers must
 * never be in the page.
 *
 * File names are random hex on purpose (no "real-01.jpg"), and every file is
 * re-encoded without EXIF, so camera metadata can't give real photos away.
 *
 * To add images: run scripts/sagarmatha-images.py on a folder of new files,
 * then add one entry per file below. A game draws up to five of each kind.
 */
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

export const POOL: PoolImage[] = [
  // ---- Real photographs (Pexels licence) ----
  { id: "r1", file: "420657a5f05d.jpg", truth: "real", tell: "Real. The Nepali newspaper masthead is crisp and correctly spelled, and every tea glass has its own reflection and fill level.", credit: "Suraj Shakya · Pexels" },
  { id: "r2", file: "34aff4e2a93c.jpg", truth: "real", tell: "Real. Hundreds of tiny people, each different, with shadows all falling the same way. AI crowds usually blur or repeat.", credit: "Mehmet Turgut Kirkgoz · Pexels" },
  { id: "r3", file: "e590b1bc20d9.jpg", truth: "real", tell: "Real. The Devanagari painted on the gate and the 'Sports Week 2070' notice are readable and correct. AI still struggles with lettering.", credit: "Mehmet Turgut Kirkgoz · Pexels" },
  { id: "r4", file: "e3dafa8922a6.jpg", truth: "real", tell: "Real. The printed scripture on the flags is consistent block text, and the blur follows the lens's focus plane.", credit: "Ujen Singh · Pexels" },
  { id: "r5", file: "da3c8bcd3b38.jpg", truth: "real", tell: "Real. Hands, feet and sandals are all anatomically right, and the scene is untidy in ordinary ways nobody would prompt for.", credit: "Mehmet Turgut Kirkgoz · Pexels" },
  { id: "r6", file: "f7112c4b610f.jpg", truth: "real", tell: "Real. Every momo is folded slightly differently, and the fork has the right number of tines.", credit: "bishop tamrakar · Pexels" },
  { id: "r7", file: "9bba74223f98.jpg", truth: "real", tell: "Real. The shop signs and number plates are legible, and every helmet and face is distinct.", credit: "ZHANQUN CAI · Pexels" },
  { id: "r8", file: "5497f17687dd.jpg", truth: "real", tell: "Real. Lens flare, a cropped head in the foreground and dozens of mismatched shop signs: the clutter of an actual moment.", credit: "Roman Saienko · Pexels" },

  // ---- AI-generated (Canva AI, prompted for photorealism) ----
  // Added once the full-resolution files are in public/…/aion/.
];

export const imageUrl = (img: PoolImage) => DIR + img.file;

export function byId(id: string): PoolImage | undefined {
  return POOL.find((p) => p.id === id);
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
  const ai = shuffle(POOL.filter((p) => p.truth === "ai"));
  const real = shuffle(POOL.filter((p) => p.truth === "real"));
  const half = Math.floor(size / 2);
  let pick = [...ai.slice(0, half), ...real.slice(0, half)];
  // Short on one kind: top up from the other so the game is still `size` long.
  const rest = shuffle([...ai.slice(half), ...real.slice(half)]);
  while (pick.length < size && rest.length) pick.push(rest.pop()!);
  pick = shuffle(pick);
  return pick.slice(0, size);
}

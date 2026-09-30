/**
 * Build tooling: download a Pexels photo into public/ and print its ImageRef.
 *
 *   node scripts/fetch-pexels.mjs <pexelsId> <public/path.jpg> ["alt text"]
 *
 * PEXELS_API_KEY is read from .env.local and never leaves this script
 * (AGENTS.md invariant 9). Photos are resized to 1600px wide, written as
 * progressive JPEG, and committed, so builds stay offline-capable. The printed
 * JSON includes the credit block ImageRef carries — paste it into content.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const [id, dest, altArg] = process.argv.slice(2);
if (!id || !dest) {
  console.error('usage: node scripts/fetch-pexels.mjs <id> <public/media/…/name.jpg> ["alt"]');
  process.exit(1);
}

const env = fs.readFileSync(".env.local", "utf8");
const key = env.match(/^PEXELS_API_KEY=(.*)$/m)?.[1]?.trim().replace(/^"|"$/g, "");
if (!key) throw new Error("PEXELS_API_KEY missing from .env.local");

const photo = await (await fetch(`https://api.pexels.com/v1/photos/${id}`, { headers: { Authorization: key } })).json();
const original = Buffer.from(await (await fetch(photo.src.original)).arrayBuffer());

const out = path.resolve(dest);
fs.mkdirSync(path.dirname(out), { recursive: true });
const info = await sharp(original)
  .rotate()
  .resize({ width: 1600, withoutEnlargement: true })
  .jpeg({ quality: 72, progressive: true, mozjpeg: true })
  .toFile(out);
const blur = await sharp(original).resize(16).jpeg({ quality: 40 }).toBuffer();

console.log(
  JSON.stringify(
    {
      src: "/" + path.relative("public", dest).split(path.sep).join("/"),
      alt: altArg ?? photo.alt,
      width: info.width,
      height: info.height,
      blurDataURL: `data:image/jpeg;base64,${blur.toString("base64")}`,
      credit: { provider: "Pexels", author: photo.photographer, authorUrl: photo.photographer_url, sourceUrl: photo.url },
    },
    null,
    2,
  ),
);
console.error(`${dest}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`);

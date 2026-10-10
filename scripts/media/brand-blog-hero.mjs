// Brand a blog hero image: 1600×900 cover crop, bottom scrim, spark pattern
// (the spark from the ARJUN mark) fading from the top-right, Aurora band, the
// kit's white horizontal logo (kit rule: "_white → on photography") and the
// kit's 25% watermark.
//
//   node scripts/media/brand-blog-hero.mjs <source-photo> public/media/blog/<slug>.jpg
//
// Source photos come from Pexels (download at ~2400px wide). Keep the logo's
// corner clear of busy text in the photo. Output should stay under 250 KB.
import fs from "node:fs";
import { createRequire } from "node:module";
const REPO = process.cwd();
const sharp = createRequire(REPO + "/package.json")("sharp");
const W = 1600, H = 900;

const logoSvg = fs.readFileSync(`${REPO}/public/brand/logo/ARJUN_logo_horizontal_white.svg`, "utf8");
const markInner = fs.readFileSync(`${REPO}/docs/Updated Branding/ARJUN_Brand_Assets/09_Watermark/ARJUN_watermark_white_25.svg`, "utf8");
const SPARK = "M588,42 Q596,130 664,138 Q596,146 588,228 Q580,146 512,138 Q580,130 588,42 Z";

function overlaySvg() {
  // Pattern: the spark from the mark on a grid, with dots between, fading out from the top-right corner.
  let cells = "";
  const step = 56;
  for (let gx = 0; gx < 12; gx++) for (let gy = 0; gy < 8; gy++) {
    const x = W - 40 - gx * step, y = 40 + gy * step;
    if ((gx + gy) % 2 === 0) cells += `<path d="${SPARK}" transform="translate(${x} ${y}) scale(0.12) translate(-588 -135)"/>`;
    else cells += `<circle cx="${x}" cy="${y}" r="2.2"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.5" stop-color="#120F2E" stop-opacity="0"/>
      <stop offset="1" stop-color="#120F2E" stop-opacity="0.62"/>
    </linearGradient>
    <linearGradient id="scrimTop" x1="1" y1="0" x2="0.55" y2="0.6">
      <stop offset="0" stop-color="#120F2E" stop-opacity="0.38"/>
      <stop offset="1" stop-color="#120F2E" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="glow" cx="1" cy="0" r="0.55">
      <stop offset="0" stop-color="#8B5CF6" stop-opacity="0.30"/>
      <stop offset="0.6" stop-color="#D946EF" stop-opacity="0.08"/>
      <stop offset="1" stop-color="#D946EF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="fade" cx="1" cy="0" r="0.58" gradientTransform="translate(1 0) scale(0.6 1) translate(-1 0)">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="m"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
    <linearGradient id="aurora" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#4F7BFF"/><stop offset="0.5" stop-color="#8B5CF6"/><stop offset="1" stop-color="#D946EF"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#scrimTop)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#scrim)"/>
  <g mask="url(#m)" fill="#FFFFFF" fill-opacity="0.72">${cells}</g>
  <rect x="0" y="${H - 12}" width="${W}" height="12" fill="url(#aurora)"/>
</svg>`;
}

async function brand(input, out) {
  const base = await sharp(input).resize(W, H, { fit: "cover", position: "attention" }).toBuffer();
  const logoW = 300;
  const logo = await sharp(Buffer.from(logoSvg)).resize({ width: logoW }).png().toBuffer();
  const logoH = (await sharp(logo).metadata()).height;
  const wm = await sharp(Buffer.from(markInner)).resize({ width: 520 }).png().toBuffer();
  await sharp(base)
    .composite([
      { input: Buffer.from(overlaySvg()), top: 0, left: 0 },
      { input: wm, top: H - 420, left: W - 400 },
      { input: logo, top: H - 12 - 48 - logoH, left: 56 },
    ])
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(out);
  return fs.statSync(out).size;
}

const rest = process.argv.slice(2); const mode = "one";
if (mode === "one") { console.log(await brand(rest[0], rest[1])); process.exit(0); }

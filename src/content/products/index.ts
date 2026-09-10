import type { Route } from "next";

/**
 * The /products listing. One shipped product; the rest are placeholders
 * that say so plainly — no invented names, no fake launch dates.
 */
export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  href: Route | (string & {});
  platform: string;
  price: string;
  /** Hex, the product's own identity colour — not the site palette. */
  brand: string;
  /** Which glyph the card draws; resolved through an explicit map in the page. */
  icon: "clipboard" | "waveform";
}

export const PRODUCTS: Product[] = [
  {
    slug: "clipstack",
    name: "ClipStack",
    tagline: "Clipboard history for your Mac.",
    description:
      "macOS remembers one thing you copied. ClipStack remembers all of them — text, links, images, files, colours — searchable, private, and pasted back with ⌘⇧V. Free, no account.",
    href: "/product/clipstack",
    platform: "macOS 14 and later · Apple silicon and Intel",
    price: "Free",
    brand: "#4868E8",
    icon: "clipboard",
  },
  {
    slug: "melos",
    name: "Melos Studio",
    tagline: "Record your voice, visualised.",
    description:
      "A browser-based recording studio: a real-time equalizer that dances to your voice, vertical 1080×1920 video capture, and one-tap sharing to TikTok or Reels. Everything runs on your device — nothing is ever uploaded.",
    href: "/product/melos",
    platform: "Web · runs in your browser, nothing to install",
    price: "Free",
    brand: "#A24BFF",
    icon: "waveform",
  },
];

export const COMING_SOON: { title: string; body: string }[] = [
  {
    title: "Coming soon",
    body: "The next tool is in development. Small, single-purpose, and built from a real daily annoyance — like ClipStack was.",
  },
  {
    title: "Coming soon",
    body: "Tick the update box on the ClipStack page and you will hear when it ships. Nothing else is sent to that address.",
  },
];

export const PRODUCTS_META = {
  title: "Products — Small tools by Arjun Basnet",
  description:
    "Free, single-purpose software built from real daily annoyances. ClipStack, a private clipboard history for Mac, is live; more is in development.",
  heading: "Small tools that fix one daily annoyance.",
  lead: "Each one started as something that slowed me down. Built native, kept private, and given away — because the point is that the problem goes away.",
};

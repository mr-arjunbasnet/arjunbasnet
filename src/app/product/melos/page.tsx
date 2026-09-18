import type { Metadata, Viewport } from "next";
import { buildMetadata } from "@/lib/seo";
import { Space_Grotesk } from "next/font/google";
import MelosStudio from "./MelosStudio";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// Through buildMetadata so og:url matches the canonical. The hand-written
// block this replaced inherited the root layout's openGraph, whose url is the
// homepage — Search Console flagged the page as "Duplicate, Google chose
// different canonical than user" on 2026-09-05 for exactly that conflict.
export const metadata: Metadata = buildMetadata({
  title: "Melos Studio — Record Your Voice, Visualized",
  description:
    "A browser-based recording studio: a real-time equalizer that dances to your voice, vertical 1080×1920 video capture, and one-tap sharing to TikTok or Reels. Everything runs on your device — nothing is ever uploaded.",
  path: "/product/melos",
});

export const viewport: Viewport = {
  themeColor: "#FAFAFF",
};

export default function MelosPage() {
  // -mt-16 cancels the root layout's navbar offset; this route hides the
  // site chrome (see SiteChrome) and owns the full viewport.
  return (
    <div className={`${spaceGrotesk.variable} -mt-16`}>
      <MelosStudio />
    </div>
  );
}

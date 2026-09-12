"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoMark from "@/components/ui/LogoMark";

/**
 * The orb button — sits above the WhatsApp button and opens the full
 * assistant page. A link, not a widget: nothing loads until it is wanted,
 * and the assistant gets the whole viewport, which is what a voice orb needs.
 */
export default function AssistantFab() {
  const pathname = usePathname();
  if (pathname.startsWith("/assistant")) return null;
  return (
    <Link
      href="/assistant"
      data-track="assistant_open"
      data-track-label="fab"
      aria-label="Open the assistant"
      className="group relative grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-[0_10px_30px_rgb(91_75_219/0.45)] transition-transform hover:scale-105 active:scale-95"
    >
      <span aria-hidden className="absolute inset-0 rounded-full bg-brand opacity-40 blur-md transition-opacity group-hover:opacity-70" />
      <LogoMark size={28} tone="white" className="relative" />
    </Link>
  );
}

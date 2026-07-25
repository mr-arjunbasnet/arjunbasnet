"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/content/site";
import { track } from "@/lib/analytics";

/**
 * Floating WhatsApp button.
 *
 * A plain anchor, not the official WhatsApp widget script — that ships roughly
 * 40KB of third-party JavaScript and sets cookies to do the job of a
 * hyperlink. WhatsApp matters disproportionately for Nepali leads, so this
 * needs to be present on every page without costing anything to load.
 *
 * The message is pre-filled with the current path, so an enquiry arrives with
 * its own attribution.
 */
export default function WhatsAppFab() {
  const pathname = usePathname();

  return (
    <a
      href={whatsappUrl(pathname)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Arjun on WhatsApp"
      onClick={() => track("whatsapp_click", { path: pathname, source: "fab" })}
      className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-pill bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none print:hidden"
    >
      <MessageCircle size={22} aria-hidden />
    </a>
  );
}

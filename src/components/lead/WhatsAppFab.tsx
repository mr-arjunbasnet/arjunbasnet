"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { whatsappUrl } from "@/content/site";
import { track } from "@/lib/analytics";

/**
 * Floating WhatsApp button.
 *
 * A plain anchor, not the official WhatsApp widget script — that ships roughly
 * 40KB of third-party JavaScript and sets cookies to do the job of a
 * hyperlink. WhatsApp matters disproportionately for leads in Nepal, so this
 * needs to be on every page without costing anything to load.
 *
 * The prompt appears once per session, is dismissible, and stays dismissed.
 * A chat prompt that reappears on every page view reads as a popup rather than
 * an offer of help.
 */

const PROMPT_DELAY_MS = 7000;
const DISMISS_KEY = "wa-prompt-dismissed";

export default function WhatsAppFab() {
  const pathname = usePathname();
  const [showPrompt, setShowPrompt] = useState(false);
  const dismissedRef = useRef(false);

  useEffect(() => {
    // sessionStorage is unavailable during prerender, so this can only run here.
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") {
        dismissedRef.current = true;
        return;
      }
    } catch {
      // Private mode or storage disabled — fall through and just show it.
    }

    const timer = setTimeout(() => setShowPrompt(true), PROMPT_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setShowPrompt(false);
    dismissedRef.current = true;
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Non-critical: the prompt simply reappears next session.
    }
  }

  const href = whatsappUrl(pathname);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 print:hidden">
      {showPrompt && (
        <div
          role="status"
          className="wa-bubble relative max-w-[15rem] rounded-card border border-border bg-bg px-4 py-3 pr-9 shadow-card-hover"
        >
          <p className="text-sm leading-snug text-fg">
            Question about your project?
          </p>
          <p className="mt-1 text-xs leading-snug text-muted">
            Message me on WhatsApp — I usually reply within a few minutes.
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              track("whatsapp_click", { path: pathname, source: "prompt" });
              dismiss();
            }}
            className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
          >
            Start a chat
          </a>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss WhatsApp prompt"
            className="absolute right-2 top-2 rounded-full p-1 text-muted transition-colors hover:bg-surface hover:text-fg"
          >
            <X size={13} aria-hidden />
          </button>
          {/* Tail pointing at the button below. */}
          <span
            aria-hidden
            className="absolute -bottom-[7px] right-[1.375rem] h-3 w-3 rotate-45 border-b border-r border-border bg-bg"
          />
        </div>
      )}

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Arjun on WhatsApp"
        onClick={() => track("whatsapp_click", { path: pathname, source: "fab" })}
        className="group relative inline-flex h-14 w-14 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        {/* Two rings, offset in time, so the pulse reads as continuous rather
            than a single repeating blink. Pointer-events off so they never
            intercept the click. */}
        <span
          aria-hidden
          className="wa-ripple pointer-events-none absolute inset-0 rounded-full bg-[#25D366]"
        />
        <span
          aria-hidden
          className="wa-ripple pointer-events-none absolute inset-0 rounded-full bg-[#25D366]"
          style={{ animationDelay: "1.3s" }}
        />

        <span className="wa-nudge relative inline-flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-200 group-hover:scale-110 motion-reduce:group-hover:scale-100">
          <Image
            src="/whatsapp.png"
            alt=""
            width={56}
            height={56}
            className="h-14 w-14"
            // Deliberately NOT priority: that injects a preload link which
            // would compete with the real LCP element for bandwidth. At 4.5KB
            // this arrives quickly enough through the normal queue.
          />
        </span>
      </a>
    </div>
  );
}

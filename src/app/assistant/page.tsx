import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import LogoMark from "@/components/ui/LogoMark";
import AssistantPanel from "@/components/assistant/AssistantPanel";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Assistant — ask about Arjun's services and products",
    description: "Ask Arjun Basnet's assistant about SEO, AI automation, websites, apps, AI training, ClipStack and how to get in touch. Voice or text, on your device.",
    path: "/assistant",
    noindex: true,
  }),
};

/**
 * /assistant — the voice orb as the face of a real assistant. Standalone
 * route (no site chrome); the brand's Night ground. noindex: it is a tool,
 * not a landing page, and it would only dilute the pages that should rank.
 */
export default function AssistantPage() {
  return (
    <div className="-mt-16 min-h-[100dvh] bg-night font-display text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 md:px-7">
        <Link href="/" className="pointer-events-auto flex items-center gap-2.5 text-white" aria-label="ARJUN — home">
          <LogoMark size={30} tone="white" />
          <span className="text-[13px] font-semibold uppercase tracking-[0.34em]">Arjun</span>
        </Link>
        <Link href="/" className="pointer-events-auto rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-[13px] text-white hover:bg-white/15">← Back to site</Link>
      </div>
      <AssistantPanel />
    </div>
  );
}

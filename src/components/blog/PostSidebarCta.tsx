import { ArrowRight, MessageCircle } from "lucide-react";
import type { BlogCluster } from "@/content/types";
import { whatsappUrl } from "@/content/site";
import Button from "@/components/ui/Button";

/** One offer per cluster, so the sidebar matches what the reader came for. */
const OFFERS: Record<BlogCluster, { title: string; body: string; label: string; href: string }> = {
  "ai-training": {
    title: "Train your team on AI",
    body: "Hands-on workshops built on your team's real work, in Kathmandu or online.",
    label: "Plan a workshop",
    href: "/ai-trainer-nepal",
  },
  "ai-automation": {
    title: "Automate the busywork",
    body: "Tell me the process that eats your team's week. I will say honestly if it is worth automating.",
    label: "Discuss a process",
    href: "/services/ai-automation",
  },
  "seo-aeo-geo": {
    title: "Get found on Google and in AI answers",
    body: "SEO, answer-engine and generative-engine work for businesses in Nepal.",
    label: "See how I can help",
    href: "/services/generative-engine-optimization",
  },
  "digital-problem-solving": {
    title: "Planning a software project?",
    body: "A second opinion before you commit budget, from someone who has delivered 100+.",
    label: "Talk it through",
    href: "/contact",
  },
};

export default function PostSidebarCta({ cluster, path }: { cluster: BlogCluster; path: string }) {
  const offer = OFFERS[cluster];
  return (
    <div className="relative overflow-hidden rounded-[20px] bg-brand p-6 text-primary-fg">
      <p className="mb-2 text-lg font-bold leading-snug">{offer.title}</p>
      <p className="mb-5 text-sm leading-relaxed text-primary-fg/85">{offer.body}</p>
      <Button
        href={offer.href}
        variant="accent"
        size="md"
        fullWidth
        icon={<ArrowRight size={15} />}
        iconPosition="right"
        track="cta_click"
        trackLabel={`post_sidebar_${cluster}`}
      >
        {offer.label}
      </Button>
      <a
        href={whatsappUrl(path)}
        target="_blank"
        rel="noopener noreferrer"
        data-track="whatsapp_click"
        data-track-label={`post_sidebar_${cluster}`}
        className="mt-3 inline-flex w-full items-center justify-center gap-1.5 text-sm font-medium text-primary-fg/90 hover:text-primary-fg"
      >
        <MessageCircle size={15} aria-hidden />
        Or message on WhatsApp
      </a>
    </div>
  );
}

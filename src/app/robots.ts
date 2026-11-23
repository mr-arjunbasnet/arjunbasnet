import type { MetadataRoute } from "next";
import { SITE, absoluteUrl } from "@/content/site";

/**
 * AI crawlers are explicitly allowed.
 *
 * For a services business whose content exists to generate enquiries, blocking
 * these guarantees absence from answers competitors appear in. A publisher
 * whose product is the content itself would reasonably choose the opposite.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Amazonbot",
  "cohere-ai",
  "YouBot",
  "Diffbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "Googlebot", allow: "/", disallow: ["/api/"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/api/"] },
      // The unlisted Sagarmatha College session pages carry noindex for search
      // engines; AI crawlers don't reliably honour X-Robots-Tag, so they are
      // asked not to fetch them at all.
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/ai-training/sagarmatha-college"] })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE.url,
  };
}

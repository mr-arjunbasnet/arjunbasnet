import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";
import { SERVICES } from "@/content/services/index";
import { getAllPostMeta } from "@/content/blog/index";

/**
 * Generated from the content layer rather than hand-maintained.
 *
 * Adding a service adds its sitemap entry automatically, and `lastModified`
 * comes from the content's own `updatedAt` rather than the build clock — so a
 * rebuild no longer claims every page changed today.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    // Pillar page for the AI training entity. High priority: it is the target
    // the AI-cluster posts link up to.
    { url: absoluteUrl("/ai-trainer-nepal"), lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: absoluteUrl("/work"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/research"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    // Previously missing from the sitemap despite being a real indexable page.
    { url: absoluteUrl("/melos"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: new Date(service.updatedAt),
    changeFrequency: "monthly" as const,
    priority: service.featured ? 0.9 : 0.8,
  }));


  const postRoutes: MetadataRoute.Sitemap = getAllPostMeta().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...serviceRoutes, ...postRoutes];
}

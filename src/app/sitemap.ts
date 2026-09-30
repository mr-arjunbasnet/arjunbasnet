import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";
import { SERVICES } from "@/content/services/index";
import { getAllPostMeta } from "@/content/blog/index";
import { SECTORS } from "@/content/training/sectors/index";
import { COURSES, courseRoute } from "@/content/courses/index";

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
    // AI Training and AI Courses hubs (docs/reference/ai-training-courses-guide.md).
    { url: absoluteUrl("/ai-training-nepal"), lastModified: new Date("2026-09-22"), changeFrequency: "monthly", priority: 0.95 },
    { url: absoluteUrl("/ai-courses-nepal"), lastModified: new Date("2026-09-22"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/products"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/product/clipstack"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/work"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/research"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    // Previously missing from the sitemap despite being a real indexable page.
    { url: absoluteUrl("/product/melos"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
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

  const learningRoutes: MetadataRoute.Sitemap = [
    ...SECTORS.map((s) => ({ url: absoluteUrl(s.route), lastModified: new Date(s.updatedAt), changeFrequency: "monthly" as const, priority: 0.85 })),
    ...COURSES.map((c) => ({ url: absoluteUrl(courseRoute(c.slug)), lastModified: new Date(c.updatedAt), changeFrequency: "monthly" as const, priority: 0.85 })),
  ];

  return [...staticRoutes, ...serviceRoutes, ...learningRoutes, ...postRoutes];
}

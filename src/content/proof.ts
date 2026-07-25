import type { Route } from "next";

/**
 * Proof points, extracted from page.tsx so the homepage, service pages, and
 * llms.txt all cite the same numbers. Every figure here is attributable to
 * delivered work — nothing rounded up for effect.
 */
export const STATS = [
  { value: "100+", label: "Projects delivered" },
  { value: "92%", label: "On-time delivery" },
  { value: "2×", label: "ICC Digital Award" },
  { value: "340%", label: "Social media growth" },
  { value: "50K+", label: "App downloads" },
  { value: "5+", label: "LMS platforms built" },
];

export interface FeaturedWork {
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  href: Route;
  /** Service slugs this work evidences — powers cross-linking. */
  serviceSlugs: string[];
}

export const FEATURED_WORK: FeaturedWork[] = [
  {
    index: "01",
    title: "Cricket Nepal Digital Transformation",
    category: "Digital Transformation",
    year: "2023–2024",
    description:
      "End-to-end digital transformation of Cricket Nepal's fan engagement ecosystem — web platform, mobile application, and social strategy. Earned back-to-back ICC Digital Fan Engagement Awards.",
    tags: ["340% social growth", "180% web traffic", "50K+ app downloads", "2× ICC Award"],
    href: "/work#cricket-nepal",
    serviceSlugs: ["digital-marketing", "web-development", "mobile-app-development"],
  },
  {
    index: "02",
    title: "Learning Management Systems, Nepal",
    category: "Custom Software",
    year: "2023–2025",
    description:
      "Five LMS platforms for K-12 students and PSC/TSC entrance candidates across Nepal. Built for low-bandwidth conditions, with teacher dashboards and adaptive assessment.",
    tags: ["K-12 & PSC/TSC", "Nationwide", "5 platforms", "Adaptive assessment"],
    href: "/work#lms",
    serviceSlugs: ["custom-software-development", "web-development"],
  },
  {
    index: "03",
    title: "AI Automation Workflows",
    category: "AI / Process Automation",
    year: "2024–2025",
    description:
      "Seven automation workflows using n8n and Claude — compressing SEO auditing, quotation generation, and document processing from ten hours to two per cycle.",
    tags: ["7+ workflows", "n8n & Claude", "10h → 2h", "Document processing"],
    href: "/work#ai-automation",
    serviceSlugs: ["ai-automation", "seo-services"],
  },
];

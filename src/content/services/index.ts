import type { Service, ServiceGroup } from "../types.ts";
import { aiAutomation } from "./ai-automation.ts";
import { seoServices } from "./seo-services.ts";
import { answerEngineOptimization } from "./answer-engine-optimization.ts";
import { generativeEngineOptimization } from "./generative-engine-optimization.ts";
import { digitalMarketing } from "./digital-marketing.ts";
import { webDevelopment } from "./web-development.ts";
import { mobileAppDevelopment } from "./mobile-app-development.ts";
import { customSoftwareDevelopment } from "./custom-software-development.ts";
import { itConsulting } from "./it-consulting.ts";

/**
 * The service registry. Adding a service means adding a file and one line
 * here — the index page, detail route, sitemap, OfferCatalog schema, and
 * llms.txt all derive from this array.
 */
export const SERVICES: Service[] = [
  aiAutomation,
  seoServices,
  answerEngineOptimization,
  generativeEngineOptimization,
  digitalMarketing,
  webDevelopment,
  mobileAppDevelopment,
  customSoftwareDevelopment,
  itConsulting,
].sort((a, b) => a.order - b.order);

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getFeaturedServices(): Service[] {
  return SERVICES.filter((s) => s.featured);
}

export const SERVICE_GROUPS: { id: ServiceGroup; label: string }[] = [
  { id: "growth", label: "Growth" },
  { id: "build", label: "Build" },
  { id: "advisory", label: "Intelligence & Advisory" },
];

export function getServicesByGroup(group: ServiceGroup): Service[] {
  return SERVICES.filter((s) => s.group === group);
}

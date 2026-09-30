import type { PlannedSector, TrainingSector } from "../types.ts";
import { SCHOOLS } from "./schools.ts";

/**
 * Sector training pages. Adding one is one file plus one line here; the route
 * file under src/app is a three-line wrapper around SectorTrainingPage.
 * Sitemap, llms.txt, hub cards and the validator all read this list.
 *
 * Order follows the guide's §49 priority.
 */
export const SECTORS: TrainingSector[] = [SCHOOLS];

/**
 * Sectors the hub names before their pages exist. Rendered as plain cards with
 * no link — the hub says training is available for them (it is), without
 * pointing at a page that isn't there. Move an entry into SECTORS when its
 * page is written.
 */
export const PLANNED_SECTORS: PlannedSector[] = [
  { slug: "colleges", name: "Colleges & universities", tagline: "AI for research, projects, faculty and career preparation." },
  { slug: "corporate", name: "Corporate teams", tagline: "From casual experimenting to repeatable, approved AI workflows." },
  { slug: "banks", name: "Banks", tagline: "Productivity with strict handling of customer and financial data." },
  { slug: "small-business", name: "Small businesses", tagline: "The handful of tasks where AI actually saves an owner time." },
  { slug: "it-professionals", name: "IT professionals", tagline: "AI for documentation, debugging, testing and automation." },
  { slug: "developers", name: "Development teams", tagline: "LLM APIs, structured outputs and AI-assisted development." },
  { slug: "consultancy", name: "Consultancy firms", tagline: "Research, proposals and reports without losing professional judgement." },
  { slug: "insurance", name: "Insurance", tagline: "Documentation and communication with sensitive data kept safe." },
  { slug: "healthcare", name: "Healthcare", tagline: "Administrative and research productivity, never clinical decisions." },
];

export function getSector(slug: string): TrainingSector | undefined {
  return SECTORS.find((s) => s.slug === slug);
}

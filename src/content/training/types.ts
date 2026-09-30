import type { AnswerBlock, Faq, ImageRef, ProcessStep, Slug } from "../types.ts";

/**
 * Content model for the AI Training and AI Courses clusters.
 *
 * Built from docs/reference/ai-training-courses-guide.md. Two families:
 *
 *  - A TrainingSector is an organisation-facing page ("we train your team"):
 *    /ai-training-schools-nepal, /corporate-ai-training-nepal, …
 *  - A Course is a learner-facing page ("I want to learn this"):
 *    /ai-courses/ai-fundamentals, …
 *
 * The guide's §41 rules are structural here: there is no testimonial, rating,
 * price, date or certificate field, because none of those exist yet. Adding one
 * should be a deliberate type change made when the real thing exists, not a
 * string someone fills in to complete a template.
 *
 * Imported with `import type` only, so scripts/validate-content.ts can load the
 * content under Node's native TypeScript stripping.
 */

export interface TitledText {
  title: string;
  description: string;
}

/** A named photograph plus the caption shown under it. */
export interface Figure {
  image: ImageRef;
  caption: string;
}

export interface CurriculumModule {
  title: string;
  /** One sentence on what the module is for. */
  summary: string;
  topics: string[];
}

export interface TrainingFormat {
  id: string;
  title: string;
  duration: string;
  description: string;
}

/** Evidence items. Every one links to the page that substantiates it. */
export interface EvidenceItem {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

export interface TrainingSector {
  slug: Slug;
  /** Full path — these pages live at the top level, per the guide's URLs. */
  route: string;
  /** "Schools" — used in cards, breadcrumbs, nav. */
  name: string;
  /** The singular organisation noun, "school" / "bank" — "adapted to your school". */
  unit: string;
  /** One line for the hub card and nav. ≤ 90 chars. */
  tagline: string;
  /** SEO title, rendered without the site suffix. ≤ 60 chars. */
  title: string;
  /** 150–160 chars. */
  description: string;
  heading: string;
  eyebrow: string;
  /** Hero paragraph. */
  intro: string;
  keywords: string[];
  hero: Figure;
  primaryAnswer: AnswerBlock;
  answers: AnswerBlock[];
  faqs: Faq[];
  /** §32 section 01 — why this sector needs training. Paragraphs. */
  why: string[];
  /** Pull-quote beside the "why" section. */
  keyMessage: string;
  /** §32 sections 02–03, grouped by who uses them. */
  useCaseGroups: { audience: string; items: TitledText[] }[];
  /** §32 section 04. */
  outcomes: string[];
  /** §32 section 05. */
  curriculum: CurriculumModule[];
  /** §32 section 06. */
  audiences: TitledText[];
  /** §32 section 07 — sector-specific, never the generic paragraph. */
  responsible: TitledText[];
  /** §32 section 08. */
  formats: TrainingFormat[];
  /** §32 section 09. */
  process: ProcessStep[];
  /** §32 sections 10–11. */
  evidence: EvidenceItem[];
  /** An in-page photo moment between sections. */
  gallery: Figure[];
  relatedCourses: Slug[];
  relatedPosts: Slug[];
  relatedServices: Slug[];
  cta: { title: string; body: string; label: string };
  publishedAt: string;
  updatedAt: string;
}

/** A sector the hub lists before its own page exists. No link, no promise. */
export interface PlannedSector {
  slug: Slug;
  name: string;
  tagline: string;
}

export type CourseLevel = "beginner" | "practical" | "professional" | "technical" | "advanced";

export interface Course {
  slug: Slug;
  name: string;
  level: CourseLevel;
  tagline: string;
  title: string;
  description: string;
  heading: string;
  eyebrow: string;
  intro: string;
  keywords: string[];
  hero: Figure;
  /** Second photograph, beside "Why learn this?". */
  figure: Figure;
  /** Course-specific section headings, so no course inherits another's voice. */
  headings: { audience: string; why: string; answers: string };
  primaryAnswer: AnswerBlock;
  answers: AnswerBlock[];
  faqs: Faq[];
  audience: TitledText[];
  /** "What you will learn" — outcome statements. */
  outcomes: string[];
  whyLearn: string[];
  prerequisites: string[];
  modules: CurriculumModule[];
  exercises: TitledText[];
  project: { title: string; description: string; steps: string[] };
  tools: string[];
  /** Delivery options on offer. Enquiry-based: no dates or fees. */
  delivery: TrainingFormat[];
  materials: string[];
  relatedCourses: Slug[];
  /** Sector training pages this course pairs with. */
  relatedSectors: Slug[];
  relatedPosts: Slug[];
  publishedAt: string;
  updatedAt: string;
}

/** A course listed on the pathway before its own page exists. */
export interface PlannedCourse {
  slug: Slug;
  name: string;
  level: CourseLevel;
  tagline: string;
}

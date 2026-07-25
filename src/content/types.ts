/**
 * Content model for the site.
 *
 * Everything the site renders — pages, JSON-LD, sitemap, llms.txt, internal
 * links — derives from objects typed here. The point of putting services and
 * FAQs in TypeScript rather than markdown is that each one feeds four
 * consumers (renderer, schema builder, sitemap, llms.txt); renaming a field
 * should produce compile errors, not four silently-empty sections.
 */

export type Slug = string;

/**
 * A self-contained answer, written for extraction by answer engines.
 *
 * One object renders three ways: visible HTML, a `FAQPage` JSON-LD entry, and
 * a block in llms-full.txt. Because all three read the same string, the schema
 * text can never drift from the visible text.
 *
 * Authoring rules (enforced by `npm run validate:content`):
 *  - 134–167 words. This is the band that survives extraction into an AI
 *    Overview without being truncated mid-thought.
 *  - Self-contained. Restate the subject noun; never open with "It", "This",
 *    or "That". The paragraph gets lifted out of context and must still stand.
 *  - One hard fact — a number, a named tool, or a named client.
 *  - Plain text only. No markdown, no HTML.
 */
export interface AnswerBlock {
  /** Stable; becomes the heading anchor and the analytics id. */
  id: string;
  /** Phrased the way a person or an LLM would actually ask it. */
  question: string;
  /** 134–167 words. See authoring rules above. */
  answer: string;
  /** Rendered as bullets beneath the answer. Deliberately NOT in the schema text. */
  supporting?: string[];
  /**
   * The one route allowed to emit this block as `FAQPage`. Guards against the
   * same Q/A appearing as structured data on two URLs, which splits the entity.
   */
  primaryRoute: string;
}

/** Short-form Q/A. Renders in an accordion; lighter than an AnswerBlock. */
export interface Faq {
  id: string;
  question: string;
  /** 40–80 words. */
  answer: string;
}

/** Local images only. Remote sources are deliberately unsupported. */
export interface ImageRef {
  /** Public path, e.g. "/media/services/seo-hero.jpg". */
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  credit?: {
    provider: "Pexels";
    author: string;
    authorUrl: string;
    sourceUrl: string;
  };
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration?: string;
}

export type ServiceGroup = "growth" | "build" | "advisory";

export interface Service {
  slug: Slug;
  /** "AI Automation" — the bare noun, no geo modifier. */
  name: string;
  navLabel?: string;
  group: ServiceGroup;
  /** ≤ 90 chars. */
  tagline: string;
  /** 150–160 chars. */
  metaDescription: string;
  /** H1 copy — this is where the geo modifier lives, not the slug. */
  heading: string;
  /** The "what is X" answer, rendered above the fold. */
  primaryAnswer: AnswerBlock;
  /** 3–5 more; each renders as a section and a FAQPage entry. */
  answers: AnswerBlock[];
  faqs: Faq[];
  /** schema.org Service.serviceType */
  serviceType: string;
  deliverables: string[];
  /** Feeds both the visible steps and `HowTo` schema. */
  process: ProcessStep[];
  outcomes: string[];
  tools: string[];
  /** Anchors on the existing /work page, e.g. "cricket-nepal". */
  proof: ProofLink[];
  relatedServices: Slug[];
  relatedPosts?: Slug[];
  keywords: string[];
  /** lucide-react export name, resolved through an explicit map (never dynamic). */
  icon: string;
  heroImage?: ImageRef;
  order: number;
  featured: boolean;
  publishedAt: string;
  /** ISO date — drives sitemap lastModified. */
  updatedAt: string;
}

/**
 * A link into an existing case study on /work. That page keeps its `#id`
 * anchors, so service pages cite proof without /work being modified.
 */
export interface ProofLink {
  /** Matches an existing anchor id on /work. */
  anchor: string;
  label: string;
  /** One-line outcome, quoted on the service page. */
  result: string;
}

export type BlogCluster =
  | "ai-automation"
  | "seo-aeo-geo"
  | "digital-problem-solving";

/** Frontmatter contract for `src/content/blog/posts/*.md`. */
export interface BlogPostMeta {
  slug: Slug;
  title: string;
  /** 150–160 chars; doubles as the meta description. */
  description: string;
  publishedAt: string;
  updatedAt?: string;
  cluster: BlogCluster;
  tags: string[];
  keywords: string[];
  readingMinutes: number;
  /**
   * The block generative engines lift verbatim. Rendered as a summary card at
   * the top of the post, before the body.
   */
  keyTakeaways: string[];
  /** Services this post supports — drives cross-linking. */
  serviceSlugs: Slug[];
  faqs?: Faq[];
  heroImage?: ImageRef;
  draft?: boolean;
}

export interface BlogPost {
  meta: BlogPostMeta;
  /** Rendered HTML of the markdown body. */
  html: string;
  /** Extracted `<h2>`/`<h3>` for the table of contents. */
  toc: { id: string; text: string; level: 2 | 3 }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  org: string;
  orgUrl?: string;
  date: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: string;
  journal: string;
  volume?: string;
  issue?: string;
  pageStart?: string;
  pageEnd?: string;
  url?: string;
  doi?: string;
  abstract: string;
  topics: string[];
}

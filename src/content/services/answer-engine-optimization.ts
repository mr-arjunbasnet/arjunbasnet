import type { Service } from "../types.ts";

export const answerEngineOptimization: Service = {
  slug: "answer-engine-optimization",
  name: "Answer Engine Optimization",
  navLabel: "AEO",
  group: "growth",
  order: 3,
  featured: true,
  icon: "MessageSquareQuote",
  serviceType: "Answer Engine Optimization",
  tagline: "Get quoted in the AI Overview instead of buried beneath it.",
  heading: "Answer Engine Optimization (AEO) Services in Nepal",
  metaDescription:
    "AEO services in Nepal — structure your content so Google AI Overviews and answer boxes quote you directly. Answer blocks, schema, and extraction-ready pages.",
  keywords: [
    "answer engine optimization",
    "AEO services Nepal",
    "AI Overview optimization",
    "featured snippet optimization Nepal",
    "AEO consultant",
    "FAQ schema Nepal",
  ],

  primaryAnswer: {
    id: "what-is-aeo",
    question: "What is answer engine optimization (AEO)?",
    answer:
      "Answer engine optimization is the practice of structuring content so search engines can lift a direct answer out of your page and display it above the normal results. Google's AI Overview, the featured snippet, and the People Also Ask box are all answer surfaces, and they increasingly resolve a query without the user clicking anything. AEO accepts that reality and competes for the citation instead of the click. In practice it means writing self-contained answer blocks of roughly 134 to 167 words, marking them with FAQPage or HowTo structured data, and making sure the visible text and the schema text match exactly. The mechanics are unglamorous and most competitors ignore them entirely, which is why a small business can win an answer box against a far larger one. Position zero is not weighted by domain size the way rank one is.",
    primaryRoute: "/services/answer-engine-optimization",
    supporting: [
      "The answer block: one question, one self-contained paragraph, one hard fact, no pronouns pointing outside it.",
      "Schema and visible text must be identical — divergence between the two is a common cause of lost eligibility.",
    ],
  },

  answers: [
    {
      id: "aeo-worth-it-no-clicks",
      question: "Is AEO worth doing if AI Overviews reduce clicks?",
      answer:
        "The click loss is real, and pretending otherwise would be dishonest. Studies through 2024 and 2025 consistently found that queries returning an AI Overview see materially lower click-through to the pages below it. AEO is the response to that, not a denial of it. Being the source quoted inside the answer keeps your brand name in front of the buyer even when no click occurs, and answer surfaces disproportionately appear on the research-stage questions people ask before a purchase, not the transactional ones. The practical strategy is a split: run AEO on informational questions where the citation is the win, and keep conventional commercial pages for terms where buyers still click through to compare and contact. Treating AEO as a replacement for SEO is a mistake. Treating it as optional in 2026 is a larger one.",
      primaryRoute: "/services/answer-engine-optimization",
    },
    {
      id: "aeo-implementation",
      question: "How do you implement AEO on an existing website?",
      answer:
        "Implementation starts with a question audit: pulling the real queries your buyers type, from Google Search Console, sales-call notes, and the People Also Ask box for your category. Each question that matters gets one answer block of 134 to 167 words, written to stand alone when extracted. Those blocks are placed on the most relevant existing page rather than spun into new thin pages, then marked with FAQPage structured data generated from the same source text so the two can never drift apart. Headings become real questions, each with a stable anchor. On a typical Nepali business site this covers 15 to 25 questions and takes 3 to 5 weeks. No rebuild is needed, because AEO is purely additive to pages that already exist, and the same blocks also feed the llms.txt file that generative engines read.",
      primaryRoute: "/services/answer-engine-optimization",
    },
  ],

  faqs: [
    {
      id: "faq-aeo-vs-seo",
      question: "Does AEO replace SEO?",
      answer:
        "No. AEO sits on top of SEO and depends on it — a page that cannot be crawled or does not rank at all will never be selected as an answer source. The technical foundation is shared. What differs is content shape and structured data.",
    },
    {
      id: "faq-aeo-measure",
      question: "How do you measure AEO results?",
      answer:
        "Through Search Console impressions against zero-click queries, manual tracking of which questions return your page in the answer box, and branded search volume, which tends to rise as your name appears in more answers. It is a less tidy measurement story than rankings, and I will not pretend otherwise.",
    },
    {
      id: "faq-aeo-timeline",
      question: "How quickly does AEO produce results?",
      answer:
        "Faster than conventional SEO in most cases. Answer surfaces re-evaluate frequently, so a well-structured block on an already-indexed page can appear within 4 to 8 weeks. Pages that need to earn indexation first take longer.",
    },
    {
      id: "faq-aeo-word-count",
      question: "Why 134 to 167 words specifically?",
      answer:
        "Shorter blocks get passed over for a competitor with more substance; longer ones get truncated mid-thought when extracted. That band is where an answer stays complete inside the space these surfaces allocate. It is a working heuristic from observation, not a published Google rule.",
    },
  ],

  deliverables: [
    "Question audit drawn from Search Console, sales calls, and People Also Ask",
    "15–25 answer blocks written to the 134–167 word extraction spec",
    "FAQPage and HowTo structured data generated from the same source text",
    "Question-shaped headings with stable anchors on existing pages",
    "llms.txt and llms-full.txt so generative engines can read your expertise directly",
    "Tracking setup for answer-surface appearances",
  ],

  process: [
    {
      step: 1,
      title: "Question audit",
      description:
        "Pull the questions your buyers actually ask from Search Console, sales-call notes, and People Also Ask. Filter to the ones with commercial consequence.",
      duration: "1 week",
    },
    {
      step: 2,
      title: "Answer authoring",
      description:
        "Write each answer to the extraction spec: self-contained, 134–167 words, one hard fact, no pronouns depending on surrounding context.",
      duration: "2–3 weeks",
    },
    {
      step: 3,
      title: "Structure and schema",
      description:
        "Place blocks on the right existing pages, add question-shaped headings with anchors, and generate FAQPage schema from the same text so the two cannot diverge.",
      duration: "1 week",
    },
    {
      step: 4,
      title: "Validate and track",
      description:
        "Run every page through the Rich Results Test, then monitor which questions start returning your page in answer surfaces.",
      duration: "Ongoing",
    },
  ],

  outcomes: [
    "Answer blocks eligible for AI Overview and featured snippet selection",
    "FAQPage schema validating clean on Google's Rich Results Test",
    "Brand visibility retained on queries that no longer produce clicks",
    "Content structured so generative engines can quote it accurately",
  ],

  tools: [
    "Google Search Console",
    "Schema.org structured data",
    "Rich Results Test",
    "llms.txt",
    "Claude API",
  ],

  proof: [
    {
      anchor: "ai-automation",
      label: "Automated content and audit workflows",
      result:
        "Built the automation that makes answer-block production and schema validation repeatable rather than a one-off manual exercise.",
    },
  ],
  relatedServices: [
    "seo-services",
    "generative-engine-optimization",
    "digital-marketing",
  ],
  publishedAt: "2026-07-25",
  updatedAt: "2026-07-25",
};

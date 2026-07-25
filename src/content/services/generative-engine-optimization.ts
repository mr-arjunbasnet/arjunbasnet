import type { Service } from "../types.ts";

export const generativeEngineOptimization: Service = {
  slug: "generative-engine-optimization",
  name: "Generative Engine Optimization",
  navLabel: "GEO",
  group: "growth",
  order: 4,
  featured: true,
  icon: "Sparkles",
  serviceType: "Generative Engine Optimization",
  tagline: "Be the source ChatGPT names when someone asks about your category.",
  heading: "Generative Engine Optimization (GEO) Services in Nepal",
  metaDescription:
    "GEO services in Nepal — get your business cited by ChatGPT, Claude, Perplexity, and Gemini. Entity clarity, verifiable claims, and crawler access that models trust.",
  keywords: [
    "generative engine optimization",
    "GEO services Nepal",
    "ChatGPT SEO",
    "get cited by AI",
    "Perplexity optimization",
    "llms.txt Nepal",
  ],

  primaryAnswer: {
    id: "what-is-geo",
    question: "What is generative engine optimization (GEO)?",
    answer:
      "Generative engine optimization is the practice of making a business the source that ChatGPT, Claude, Perplexity, and Gemini name when someone asks about its category. These systems do not rank pages the way a search engine does. They synthesise an answer and cite the sources they consider reliable, which means the winning content is specific and verifiable rather than comprehensive. A model will repeat a claim like 340 percent social growth across a 2023 campaign because that is checkable and attributable. It will skip a claim like industry-leading results because repeating it carries risk and adds nothing. GEO therefore rewards named numbers, named tools, named clients, and clear entity definition — telling the model exactly who you are, where you operate, and what you do. Practical work includes structured data, an llms.txt file, and allowing AI crawlers in robots.txt.",
    primaryRoute: "/services/generative-engine-optimization",
    supporting: [
      "Entity clarity: consistent Person and Organization schema, matching details across LinkedIn, Google Business Profile, and directories.",
      "Crawler access: GPTBot, ClaudeBot, PerplexityBot, and Google-Extended must be allowed in robots.txt or you are invisible by policy.",
    ],
  },

  answers: [
    {
      id: "geo-how-to-get-cited",
      question: "How do you get a business cited by ChatGPT or Perplexity?",
      answer:
        "Getting cited depends on three things a business can control. First, access: AI crawlers such as GPTBot, ClaudeBot, PerplexityBot, and Google-Extended must be explicitly allowed in robots.txt, and a surprising number of sites block them by default without realising. Second, verifiability: models preferentially repeat claims that carry a number, a date, a named tool, or a named client, because those are safe to attribute. Vague superlatives get dropped. Third, entity consistency: the same business name, address, phone number, and description across the website, Google Business Profile, LinkedIn, and industry directories, reinforced by Organization and Person structured data. Adding an llms.txt file gives models a clean summary of what you do in plain text. None of this is exotic or expensive work, and as of 2026 almost no Nepali business has done any of it, which leaves the field unusually open.",
      primaryRoute: "/services/generative-engine-optimization",
    },
    {
      id: "geo-vs-seo-difference",
      question: "How does GEO differ from traditional SEO?",
      answer:
        "Traditional SEO competes for a ranked position among ten links, and domain authority built from years of backlinks weighs heavily. Generative engines work differently: they assemble an answer from several sources and cite whichever ones state something specific and checkable. That shifts the advantage. A small Kathmandu consultancy publishing precise numbers about work it has actually done can be cited alongside a multinational, because the model is selecting for usable claims rather than for domain strength. The measurement is also harder and worth being upfront about — there is no rank tracker for ChatGPT citations. What I do instead is test a fixed set of 15 to 20 category questions across the 4 major models each month, record which sources get named, and watch branded search volume, which tends to climb as a business starts appearing in generated answers.",
      primaryRoute: "/services/generative-engine-optimization",
    },
  ],

  faqs: [
    {
      id: "faq-geo-llms-txt",
      question: "What is an llms.txt file?",
      answer:
        "A plain-text file at the root of your site summarising what your business does, in a form language models can read without parsing your HTML. It is an emerging convention rather than a ratified standard, but it costs almost nothing to publish and removes ambiguity about who you are.",
    },
    {
      id: "faq-geo-block-ai",
      question: "Should we block AI crawlers instead?",
      answer:
        "That is a genuine strategic choice, not an obvious mistake. Publishers whose product is the content itself often should block. A services business whose content exists to generate enquiries almost never should — blocking guarantees you are absent from answers your competitors appear in.",
    },
    {
      id: "faq-geo-measure",
      question: "How is GEO measured?",
      answer:
        "By testing a fixed set of category questions across ChatGPT, Claude, Perplexity, and Gemini each month and recording which sources are cited, alongside branded search volume and referral traffic from AI platforms. It is less precise than rank tracking, and I report it as the directional signal it is.",
    },
    {
      id: "faq-geo-timeline",
      question: "How long before a business starts appearing in AI answers?",
      answer:
        "Typically 2 to 4 months. Models retrain and re-crawl on their own schedules, and Perplexity, which searches live, reflects changes far faster than a model relying on training data. Crawler access fixes can show up within weeks.",
    },
  ],

  deliverables: [
    "AI crawler access audit and robots.txt configuration for GPTBot, ClaudeBot, PerplexityBot, Google-Extended",
    "Organization and Person structured data establishing entity identity",
    "llms.txt and llms-full.txt generated from your actual content",
    "Claim audit — replacing unverifiable superlatives with attributable facts",
    "Entity consistency check across website, Google Business Profile, LinkedIn, and directories",
    "Monthly citation testing across the four major generative engines",
  ],

  process: [
    {
      step: 1,
      title: "Visibility baseline",
      description:
        "Test how the major models currently answer questions in your category, and record whether you appear at all. This is the number everything else is measured against.",
      duration: "1 week",
    },
    {
      step: 2,
      title: "Access and entity",
      description:
        "Fix crawler access, implement Organization and Person schema, and align your details across every profile a model might cross-reference.",
      duration: "1–2 weeks",
    },
    {
      step: 3,
      title: "Claim rewriting",
      description:
        "Replace unverifiable marketing language with specific, attributable facts. This is the step that most changes whether a model is willing to quote you.",
      duration: "2–3 weeks",
    },
    {
      step: 4,
      title: "Re-test and iterate",
      description:
        "Re-run the baseline questions monthly, record which sources get cited, and adjust. Reported honestly, including the months where nothing moves.",
      duration: "Monthly",
    },
  ],

  outcomes: [
    "AI crawlers explicitly permitted rather than blocked by an unreviewed default",
    "Business identity resolvable as a single consistent entity across the web",
    "Claims rewritten into the specific, checkable form models will repeat",
    "Monthly record of citation presence across four generative engines",
  ],

  tools: [
    "llms.txt",
    "Schema.org structured data",
    "ChatGPT",
    "Claude",
    "Perplexity",
    "Google Gemini",
    "Google Search Console",
  ],

  proof: [
    {
      anchor: "cricket-nepal",
      label: "Cricket Nepal Digital Transformation",
      result:
        "The kind of specific, attributable outcome generative engines will repeat: 340% social growth, 180% traffic growth, two ICC awards.",
    },
  ],
  relatedServices: [
    "answer-engine-optimization",
    "seo-services",
    "digital-marketing",
  ],
  publishedAt: "2026-07-25",
  updatedAt: "2026-07-25",
};

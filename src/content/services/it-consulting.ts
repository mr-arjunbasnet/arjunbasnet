import type { Service } from "../types.ts";

export const itConsulting: Service = {
  slug: "it-consulting",
  name: "IT & Digital Consultation",
  navLabel: "IT Consulting",
  group: "advisory",
  order: 9,
  featured: false,
  icon: "Compass",
  serviceType: "Information Technology Consulting",
  tagline: "An independent read on what to build, buy, or stop paying for.",
  heading: "IT Consulting & Digital Problem Solving in Nepal",
  metaDescription:
    "IT consulting in Nepal — independent advice on systems, vendors, and digital strategy. No reselling, no commissions, no incentive to recommend a bigger build.",
  keywords: [
    "IT consulting Nepal",
    "IT consultant Kathmandu",
    "digital transformation consultant Nepal",
    "technology advisory Nepal",
    "software vendor selection Nepal",
    "digital strategy Nepal",
  ],

  primaryAnswer: {
    id: "what-is-it-consulting",
    question: "What does an IT consultant actually do for a business?",
    answer:
      "An IT consultant helps a business decide what to build, what to buy, and what to stop paying for — before money is committed. The most common engagements in Nepal are vendor selection, where a business has three proposals and no way to compare them; systems assessment, where existing tools half-work and nobody knows whether to fix or replace; and digital strategy, where the goal is clear but the sequence is not. The value is independence. A vendor asked whether you need custom software has an obvious interest in the answer, and so does an agency quoting to build it. I do not resell products, take commissions, or receive referral fees, so recommending an inexpensive off-the-shelf tool rather than a large custom build costs me the larger project every time. That conflict, removed, is precisely what makes the advice worth paying for.",
    primaryRoute: "/services/it-consulting",
    supporting: [
      "Common engagements: vendor and proposal evaluation, systems assessment, digital roadmap, technical due diligence.",
      "No reselling, no commissions, no referral fees — the recommendation is not influenced by what I would be paid to build.",
    ],
  },

  answers: [
    {
      id: "it-consulting-cost",
      question: "How is IT consulting scoped and priced?",
      answer:
        "Consulting engagements are scoped by the decision being made, and the most useful ones are short. Comparing 3 vendor proposals is a few days of work. A systems assessment for a mid-sized organisation runs about a week, and a digital roadmap is similar. Longer retained arrangements, typically a few days a month, suit organisations running a multi-year programme who need a technical voice in the room without hiring for one. The arithmetic that matters is proportion rather than rate: a few days of independent evaluation before committing to a system costing orders of magnitude more is cheap insurance. The most valuable outcome I deliver is often the recommendation not to proceed at all, or to buy something off the shelf instead of building it. That advice routinely saves far more than the engagement itself costs, which is exactly why independence is the thing worth paying for.",
      primaryRoute: "/services/it-consulting",
    },
    {
      id: "evaluate-software-vendor",
      question: "How should a business evaluate a software vendor's proposal?",
      answer:
        "Four questions separate a solid proposal from an expensive mistake. First, who owns the source code and infrastructure when the project ends — if the answer is the vendor, you are buying dependency rather than software. Second, what happens after launch, since proposals that end at delivery are hiding the maintenance cost rather than eliminating it. Third, can they show a comparable system running in production with a reference you may contact directly. Fourth, does the proposal describe your actual process, or is it a generic capability list that would suit any client. Price is the weakest signal of the five. The cheapest proposal frequently costs most in the end, because the gap gets recovered through change requests once you have no practical alternative. I evaluate proposals against all 4 of these tests and deliver the comparison in writing.",
      primaryRoute: "/services/it-consulting",
    },
  ],

  faqs: [
    {
      id: "faq-consult-conflict",
      question: "Do you recommend your own services?",
      answer:
        "Sometimes the honest answer is that I could build it, and I say so explicitly and let you decide. More often the recommendation is an existing product or a different specialist. Where a recommendation would benefit me, that is stated in the report rather than left implicit.",
    },
    {
      id: "faq-consult-deliverable",
      question: "What do you actually deliver?",
      answer:
        "A written assessment with a clear recommendation, the reasoning behind it, and the risks of each option — not a slide deck of observations. Short enough that a busy director reads all of it, specific enough to act on without a follow-up meeting.",
    },
    {
      id: "faq-consult-small-org",
      question: "Is consulting only for large organisations?",
      answer:
        "No. Small organisations often benefit more, because a single wrong system choice is proportionally far more damaging when there is no budget to correct it. A two-day engagement is a legitimate size and I take that work.",
    },
    {
      id: "faq-consult-existing-vendor",
      question: "Can you review work an existing vendor has delivered?",
      answer:
        "Yes — technical due diligence on delivered systems, including code review, architecture assessment, and whether what was delivered matches what was contracted. Findings are reported factually, since the goal is a working outcome rather than assigning blame.",
    },
  ],

  deliverables: [
    "Written assessment with a clear recommendation and stated reasoning",
    "Vendor proposal comparison on ownership, maintenance, references, and fit",
    "Systems audit covering what to keep, fix, replace, or retire",
    "Digital roadmap sequenced by dependency and business impact",
    "Technical due diligence on delivered systems",
    "Any conflict of interest disclosed in writing",
  ],

  process: [
    {
      step: 1,
      title: "Frame the decision",
      description:
        "Establish what is actually being decided and by when. Many engagements start as a technology question and turn out to be a process question.",
      duration: "1 day",
    },
    {
      step: 2,
      title: "Assess",
      description:
        "Review systems, proposals, contracts, and how the work is done today. Talk to the people using the tools, not only those buying them.",
      duration: "2–6 days",
    },
    {
      step: 3,
      title: "Recommend in writing",
      description:
        "A clear recommendation with reasoning, options, and risks — including the option of doing nothing, where that is genuinely the right call.",
      duration: "1–2 days",
    },
    {
      step: 4,
      title: "Support the decision",
      description:
        "Available to answer questions as you act on it, including sitting in on vendor conversations if that helps.",
      duration: "As needed",
    },
  ],

  outcomes: [
    "Independent evaluation with no reselling relationship or commission",
    "100+ delivered projects informing what actually works in the Nepali market",
    "Written recommendations specific enough to act on immediately",
    "Frequently, a smaller and cheaper solution than the one originally proposed",
  ],

  tools: [
    "Technical due diligence",
    "Vendor evaluation frameworks",
    "Architecture review",
    "Process mapping",
    "Agile delivery",
  ],

  proof: [
    {
      anchor: "usef",
      label: "USEF Nepal",
      result:
        "Advisory and delivery for an established institution navigating a platform decision.",
    },
    {
      anchor: "lms",
      label: "Learning Management Systems, Nepal",
      result:
        "Five platforms delivered — direct evidence of which build-versus-buy decisions hold up in the Nepali education market.",
    },
  ],
  relatedServices: ["custom-software-development", "ai-automation", "web-development"],
  publishedAt: "2026-07-25",
  updatedAt: "2026-07-25",
};

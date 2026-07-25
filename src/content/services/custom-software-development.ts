import type { Service } from "../types.ts";

export const customSoftwareDevelopment: Service = {
  slug: "custom-software-development",
  name: "Custom Software Development",
  navLabel: "Custom Software",
  group: "build",
  order: 8,
  featured: true,
  icon: "Code2",
  serviceType: "Custom Software Development",
  tagline: "Systems built around how your organisation actually works.",
  heading: "Custom Software Development in Nepal",
  metaDescription:
    "Custom software development in Nepal — LMS platforms, internal systems, and enterprise tools. Five nationwide learning platforms delivered across K-12 and PSC/TSC.",
  keywords: [
    "custom software development Nepal",
    "software company Kathmandu",
    "LMS development Nepal",
    "enterprise software Nepal",
    "bespoke software Nepal",
    "software developer Kathmandu",
  ],

  primaryAnswer: {
    id: "when-custom-software-is-worth-it",
    question: "When is custom software worth building instead of buying?",
    answer:
      "Custom software is worth building when the process it supports is a genuine competitive advantage, when off-the-shelf products would need so much configuration that the saving disappears, or when licence costs across a large user base exceed what building would cost. It is not worth building for solved problems — accounting, email, payroll, and general project management all have mature products that will beat anything custom on price and reliability. Building five learning management platforms for the Nepali market taught me the pattern clearly: the platforms that worked were designed around how teachers and administrators actually behaved, not how an imported product assumed they would. Nepali institutions need PSC and TSC assessment structures, Nepali-language interfaces, and tolerance for low-bandwidth conditions, and no international LMS handles those without heavy modification. That gap between an imported product and local reality is where custom development earns its cost.",
    primaryRoute: "/services/custom-software-development",
    supporting: [
      "Build when: the process is your advantage, configuration cost approaches build cost, or per-seat licences dominate at your scale.",
      "Buy when: the problem is generic — accounting, email, payroll, CRM, standard project management.",
    ],
  },

  answers: [
    {
      id: "custom-software-cost-nepal",
      question: "What determines the cost of custom software?",
      answer:
        "The single largest cost driver in custom software is not feature count but how many distinct user roles the system must serve. Each role multiplies the interface, the permission model, and the testing surface, so a platform serving students, teachers, and administrators costs far more than one serving a single team even where the feature lists look similar. Integration with existing systems is the second driver, and it depends entirely on whether those systems expose an API. Ongoing cost is the item most often missing from a proposal: hosting, monitoring, and maintenance typically run 15 to 20 percent of the build cost annually, and software that is never maintained becomes unusable within a few years as dependencies and browsers move on. I scope a first phase delivering one working slice, so the approach can be judged on evidence before the full budget is committed.",
      primaryRoute: "/services/custom-software-development",
    },
    {
      id: "software-project-failure",
      question: "Why do custom software projects fail?",
      answer:
        "Custom software projects fail for reasons that are almost never technical. The most common is building against what managers describe rather than what staff actually do, so the finished system encodes a process nobody follows and gets quietly abandoned. The second is scope agreed once at the start and never revisited, so a system designed for 2024 requirements ships in 2026 into a business that changed. The third is treating launch as the finish line, with no budget left for the fixes that only surface under real use. Across roughly 100 projects delivered at Makura Creations, maintaining a 92 percent on-time delivery rate came down to three habits: watching the current process before designing anything, shipping a usable slice within 6 to 8 weeks rather than months, and reserving budget specifically for the corrections that only real usage reveals.",
      primaryRoute: "/services/custom-software-development",
    },
  ],

  faqs: [
    {
      id: "faq-software-ownership",
      question: "Who owns the source code?",
      answer:
        "You do, transferred on final payment along with repository access, deployment configuration, and documentation. Nothing runs on infrastructure only I can access. If you later want a different developer to take over, they can — that is the point.",
    },
    {
      id: "faq-software-timeline",
      question: "How long does custom software take to build?",
      answer:
        "A focused internal tool takes 8 to 16 weeks. A multi-role platform runs 4 to 9 months. I structure delivery so something usable reaches real users within the first 6 to 8 weeks, because feedback from actual use is worth more than any amount of upfront specification.",
    },
    {
      id: "faq-software-integration",
      question: "Can it integrate with our existing systems?",
      answer:
        "Usually. Anything with an API integrates cleanly. Older Nepali systems sometimes have none, in which case options are scheduled file exchange or database-level integration — both workable, both adding cost. This gets assessed during scoping rather than discovered mid-build.",
    },
    {
      id: "faq-software-team-handover",
      question: "What if our team needs to maintain it?",
      answer:
        "The build uses mainstream technologies with documentation written for a developer who was not involved. Deliberately boring choices — TypeScript, PostgreSQL, standard framework patterns — because clever architecture that only its author understands is a liability once handed over.",
    },
  ],

  deliverables: [
    "Process observation and requirements written from watching real users",
    "Working slice delivered within the first 6–8 weeks",
    "Full application with role-based access and reporting",
    "API integrations with existing systems where they support it",
    "Source code, deployment configuration, and documentation transferred to you",
    "Post-launch correction period budgeted from the start",
  ],

  process: [
    {
      step: 1,
      title: "Observe the current process",
      description:
        "Watch how the work is done today, by the people doing it. This consistently reveals a different process from the one described in meetings, and that difference is where systems fail.",
      duration: "1–2 weeks",
    },
    {
      step: 2,
      title: "Scope and architecture",
      description:
        "Define user roles, data model, and integrations. Role count drives cost more than feature count, so this is where budget is genuinely decided.",
      duration: "2 weeks",
    },
    {
      step: 3,
      title: "First usable slice",
      description:
        "One complete workflow, in front of real users, within 6 to 8 weeks. Their reaction reshapes the rest of the build while changing it is still cheap.",
      duration: "6–8 weeks",
    },
    {
      step: 4,
      title: "Build out and harden",
      description:
        "Remaining roles and workflows, then load testing, security review, and data migration.",
      duration: "2–6 months",
    },
    {
      step: 5,
      title: "Handover",
      description:
        "Code, infrastructure, and documentation transferred. Training for your team, and a reserved period for the corrections real usage always surfaces.",
      duration: "2–4 weeks",
    },
  ],

  outcomes: [
    "Five LMS platforms delivered for K-12 and PSC/TSC preparation across Nepal",
    "92% on-time delivery rate across 100+ projects",
    "Systems designed around observed behaviour rather than assumed process",
    "Full source and infrastructure ownership transferred to the client",
  ],

  tools: [
    "TypeScript",
    "Next.js",
    "React",
    "Python",
    "PostgreSQL",
    "Docker",
    "REST APIs",
    "Claude API",
  ],

  proof: [
    {
      anchor: "lms",
      label: "Learning Management Systems, Nepal",
      result:
        "Five LMS platforms for K-12 and PSC/TSC candidates, built for low-bandwidth conditions with teacher dashboards and adaptive assessment.",
    },
    {
      anchor: "usef",
      label: "USEF Nepal",
      result: "Enterprise platform delivery for an established education institution.",
    },
  ],
  relatedServices: ["web-development", "ai-automation", "it-consulting"],
  publishedAt: "2026-07-25",
  updatedAt: "2026-07-25",
};

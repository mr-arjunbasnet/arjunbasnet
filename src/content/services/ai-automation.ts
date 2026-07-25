import type { Service } from "../types.ts";

export const aiAutomation: Service = {
  slug: "ai-automation",
  name: "AI Automation",
  group: "advisory",
  order: 1,
  featured: true,
  icon: "Zap",
  serviceType: "Business Process Automation",
  tagline: "Turn a ten-hour weekly process into a two-hour one.",
  heading: "AI Automation for Businesses in Nepal",
  metaDescription:
    "AI automation services in Nepal using n8n and Claude. Cut repetitive quoting, reporting, and document work from ten hours a week to two. Built by Arjun Basnet.",
  keywords: [
    "AI automation Nepal",
    "n8n automation Nepal",
    "business process automation Kathmandu",
    "Claude API workflows",
    "workflow automation services Nepal",
    "AI consultant Nepal",
  ],

  primaryAnswer: {
    id: "what-is-ai-automation",
    question: "What is AI automation and what does it actually replace?",
    answer:
      "AI automation replaces repetitive manual work — quoting, reporting, data entry, document processing — with workflows that run without a person driving them. For businesses in Nepal, the practical entry point is usually a process that eats a full working day every week. I build these with n8n for orchestration and Claude for the language-heavy steps, connected to the tools a team already uses: Google Workspace, spreadsheets, CRMs, and email. Across seven workflows delivered for clients at Makura Creations, the typical result was a ten-hour weekly cycle compressed to roughly two hours, with the remaining time spent reviewing output rather than producing it. Automation is worth doing when a task is high-frequency, rule-heavy, and low-judgement. It is worth avoiding when the process changes every month, or when the source data is unreliable, because automating a broken process only produces bad output faster.",
    primaryRoute: "/services/ai-automation",
    supporting: [
      "Best candidates: quotation generation, SEO auditing, invoice and receipt processing, report assembly, lead routing, content repurposing.",
      "Poor candidates: anything requiring negotiation, legal judgement, or a process that has not been written down yet.",
    ],
  },

  answers: [
    {
      id: "ai-automation-cost-nepal",
      question: "What determines the cost of an AI automation project?",
      answer:
        "The cost of an AI automation project is driven by three things, in order of impact. First, how many systems the workflow has to connect, because each additional integration carries its own authentication, error handling, and testing. Second, how clean the existing data is, since a process built on inconsistent spreadsheets needs a cleanup stage before automation is even possible. Third, how many exceptions the process carries, because the rules nobody wrote down are where most of the build time actually goes. Ongoing running cost is usually small: n8n can be self-hosted on a modest server, and language model usage for a mid-sized business workflow is typically a minor line item. The useful way to judge any quote is against the salary cost of the hours being replaced. A process consuming 10 hours a week is a substantial annual labour cost before errors and delays are counted.",
      primaryRoute: "/services/ai-automation",
    },
    {
      id: "n8n-vs-zapier-make",
      question: "Should a business use n8n, Zapier, or Make for automation?",
      answer:
        "n8n, Zapier, and Make solve the same problem with different trade-offs. Zapier is the fastest to start and the most expensive to scale, because pricing is charged per task executed — a workflow firing several thousand times a month gets costly quickly, and costs rise exactly as the automation succeeds. Make sits in the middle on both price and capability. n8n is the one I reach for most often in Nepal, because it can be self-hosted on a modest server, which removes per-task pricing entirely and keeps client data inside infrastructure the business controls. That last point matters for organisations handling student records or financial documents. The trade-off is that self-hosting needs someone to maintain it. For a business running under 500 automations a month with no data-residency concerns, Zapier is genuinely the sensible answer and I will say so.",
      primaryRoute: "/services/ai-automation",
    },
    {
      id: "ai-automation-timeline",
      question: "How long does it take to build an AI automation workflow?",
      answer:
        "A single AI automation workflow takes 2 to 4 weeks from first conversation to running in production. The build itself is rarely the slow part. Week one is process mapping — sitting with whoever currently does the task and writing down what they actually do, which is almost never what the documented procedure claims. Week two is building and connecting systems. Weeks three and four are the part teams consistently underestimate: running the automation in parallel with the manual process, comparing outputs case by case, and handling the exceptions nobody mentioned in the first meeting. Skipping that parallel period is the single most common reason automation projects fail, because the exceptions are where the real business logic lives. Larger programmes covering several linked processes run 6 to 12 weeks. I deliver one working workflow before scoping a second.",
      primaryRoute: "/services/ai-automation",
    },
  ],

  faqs: [
    {
      id: "faq-ai-data-security",
      question: "Is company data safe when using AI automation?",
      answer:
        "It depends on the architecture, not the technology. Self-hosted n8n keeps orchestration and stored data on infrastructure you control. Anything sent to a language model leaves that boundary, so I scope which fields are actually needed and strip the rest before the API call. Sensitive records can be processed by reference rather than content.",
    },
    {
      id: "faq-ai-replace-staff",
      question: "Will automation mean cutting staff?",
      answer:
        "In every engagement I have delivered, it meant the same people stopped doing data entry and started doing review, exceptions, and client work. Automation removes tasks, not roles. If the goal is genuinely headcount reduction, say so up front, because that changes which processes are worth automating first.",
    },
    {
      id: "faq-ai-maintenance",
      question: "What happens when an automation breaks?",
      answer:
        "Workflows are built with error handling and failure notifications, so a break surfaces immediately instead of quietly producing wrong output. I include a maintenance window after handover, and full documentation so your team or another developer can take it over. You own the workflow files outright.",
    },
    {
      id: "faq-ai-small-business",
      question: "Is our business too small for AI automation?",
      answer:
        "The test is not company size, it is task frequency. A five-person firm generating forty quotations a month benefits more than a fifty-person firm generating four. If nobody on your team spends several hours a week on a repetitive, rule-based task, automation is not your bottleneck and I will tell you that.",
    },
    {
      id: "faq-ai-existing-software",
      question: "Do we need to replace our existing software?",
      answer:
        "No. Automation sits between the tools you already use rather than replacing them. Most builds connect Google Sheets, email, a CRM, and accounting software that the business has used for years. Replacing working systems is expensive and rarely necessary to get the process gain.",
    },
  ],

  deliverables: [
    "Process map of the current manual workflow, written from observation rather than documentation",
    "Working automation deployed to your infrastructure or a managed n8n instance",
    "Error handling with failure alerts to email or chat",
    "Parallel-run validation report comparing automated against manual output",
    "Handover documentation and a recorded walkthrough",
    "30 days of post-launch support and tuning",
  ],

  process: [
    {
      step: 1,
      title: "Process mapping",
      description:
        "I sit with whoever does the task today and record what actually happens, including the exceptions and workarounds that never made it into any written procedure.",
      duration: "3–5 days",
    },
    {
      step: 2,
      title: "Feasibility and scope",
      description:
        "A written assessment of what can be automated, what should not be, and the expected time saved. If the honest answer is that automation will not pay back, this is where I say so.",
      duration: "2–3 days",
    },
    {
      step: 3,
      title: "Build",
      description:
        "The workflow is built in n8n, with Claude handling language-heavy steps such as extraction, classification, and drafting. Connected to your existing tools.",
      duration: "1–2 weeks",
    },
    {
      step: 4,
      title: "Parallel run",
      description:
        "The automation runs alongside the manual process and outputs are compared case by case. This is where the unstated business rules surface and get handled.",
      duration: "1–2 weeks",
    },
    {
      step: 5,
      title: "Handover",
      description:
        "Documentation, a recorded walkthrough, and ownership of the workflow files. Followed by 30 days of support while the team settles into the new process.",
      duration: "2 days",
    },
  ],

  outcomes: [
    "Ten-hour weekly cycles compressed to roughly two hours across seven delivered workflows",
    "Quotation turnaround reduced from next-day to same-hour",
    "Document processing handled without manual re-keying",
    "Error rates cut by removing repeated human transcription",
  ],

  tools: [
    "n8n",
    "Claude API",
    "Google Workspace",
    "Python",
    "REST APIs",
    "Webhooks",
    "PostgreSQL",
    "Docker",
  ],

  proof: [
    {
      anchor: "ai-automation",
      label: "AI Automation Workflows",
      result:
        "Seven n8n and Claude workflows covering SEO auditing, quotation generation, and document processing — ten-hour cycles cut to two.",
    },
    {
      anchor: "lms",
      label: "Learning Management Systems, Nepal",
      result:
        "Automated assessment and reporting pipelines across five nationwide LMS platforms.",
    },
  ],
  relatedServices: ["custom-software-development", "it-consulting", "seo-services"],
  publishedAt: "2026-07-25",
  updatedAt: "2026-07-25",
};

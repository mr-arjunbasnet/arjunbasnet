import type { AnswerBlock, Faq, ProcessStep } from "../types.ts";
import type { EvidenceItem, TitledText, TrainingFormat } from "./types.ts";

/**
 * /ai-training-nepal — the hub for organisation-facing AI training.
 *
 * Guide §6. Its job is routing: introduce the offer, then send each visitor to
 * the sector page or course that fits. It is deliberately NOT a second copy of
 * /ai-trainer-nepal. That page answers "who is the trainer and what is AI
 * training?"; this one answers "which programme fits my organisation?". Answer
 * questions are chosen so the two never compete for the same query.
 */

export const TRAINING_HUB_ROUTE = "/ai-training-nepal";

export const TRAINING_HUB_META = {
  title: "AI Training in Nepal | Programmes for Schools & Teams",
  description:
    "AI training in Nepal for schools, colleges, companies, banks and small businesses: practical workshops, seminars and programmes built around real work.",
  heading: "AI Training in Nepal",
  eyebrow: "AI training for organisations",
  intro:
    "Practical AI training for schools, colleges, companies and teams across Nepal. Each programme is built around the work your people already do, covers responsible use from the first hour, and ends with workflows they keep using after the session.",
  keywords: [
    "AI training in Nepal",
    "AI training Nepal",
    "artificial intelligence training Nepal",
    "AI workshops Nepal",
    "AI seminar Nepal",
    "practical AI training",
    "generative AI training Nepal",
    "AI training programs Nepal",
  ],
} as const;

export const TRAINING_HUB_PRIMARY_ANSWER: AnswerBlock = {
  id: "ai-training-programmes-nepal",
  question: "What AI training programmes are available for organisations in Nepal?",
  answer:
    "AI training programmes for organisations in Nepal fall into three shapes, and choosing the right one matters more than choosing the tool. A sector programme is built for one kind of organisation, such as a school, a college, a bank or a small business, and uses that sector's own documents, risks and daily tasks as the exercises. A workshop is a short, focused session of 90 minutes to one day, usually for a single team or department. A structured programme spreads fundamentals, generative AI, prompting, productivity and responsible use across 3 to 6 sessions, so people practise between them. All three are delivered in person across Nepal or online, and all three start with a short call to find the two or three tasks worth building the training around. Individual learners who want to study on their own rather than as a team are better served by a course.",
  primaryRoute: TRAINING_HUB_ROUTE,
  supporting: [
    "Sector programmes: schools, colleges, corporate teams, banks, small businesses, and more being added.",
    "Every programme covers data handling, verification and approved tools, not only the productivity wins.",
  ],
};

export const TRAINING_HUB_ANSWERS: AnswerBlock[] = [
  {
    id: "ai-training-vs-course",
    question: "What is the difference between AI training, an AI course and AI consultation?",
    answer:
      "AI training, AI courses and AI consultation solve different problems, and mixing them up is the most common reason an engagement disappoints. Training is for an organisation: a school staff room, a bank department or a company team learns together, using their shared tasks, so the habits spread across the group at once. A course is for an individual, or an open group of individuals, following a fixed curriculum such as AI Fundamentals from the first module to a final project. Consultation comes before either when the question is where AI belongs in the organisation at all, and it ends in a written plan rather than a classroom. Automation is the fourth option, and it is building rather than teaching: a workflow on a tool such as n8n that does a repetitive task without anyone opening a chat window. Many organisations need two of these, typically consultation first and then training.",
    primaryRoute: TRAINING_HUB_ROUTE,
  },
  {
    id: "prepare-organisation-ai-training",
    question: "What should an organisation decide before booking AI training?",
    answer:
      "An organisation should settle four things before booking AI training, because each one changes what the session should contain. First, which tools staff are allowed to use, and on which accounts: a free personal ChatGPT login and a managed company workspace carry very different data risks. Second, what must never be pasted into any AI tool, written as a short list with examples such as student records, customer account numbers or unpublished financial figures. Third, who attends: a session for 25 people from one department beats one for 80 people from everywhere, because the exercises can use real shared work. Fourth, how the result will be measured a month later, for example hours saved on a named weekly report. Where these are not yet decided, the first part of the training can produce them, and the organisation leaves with a draft AI use policy as well as trained staff.",
    primaryRoute: TRAINING_HUB_ROUTE,
  },
];

export const TRAINING_HUB_FAQS: Faq[] = [
  {
    id: "faq-hub-cost",
    question: "How much does AI training cost in Nepal?",
    answer:
      "The price depends on the number of participants, the number of sessions, whether it is in person or online, and how much preparation the sector needs. Every programme is quoted after a short scoping call, so the quote matches what is actually delivered rather than a generic package.",
  },
  {
    id: "faq-hub-outside-kathmandu",
    question: "Can training be delivered outside Kathmandu?",
    answer:
      "Yes. In-person sessions can be arranged across Nepal, and online delivery works for organisations anywhere, including teams in Nepal working with international clients. Hands-on workshops work best in a room; seminars and structured programmes translate well to online delivery.",
  },
  {
    id: "faq-hub-customise",
    question: "Is the training customised for my organisation?",
    answer:
      "Yes, and that is the point of it. The sector pages show a starting curriculum, but the exercises are built from your own tasks, documents and tools. A school works on lesson plans and circulars; a bank works on internal reports and customer letters with sensitive details removed.",
  },
  {
    id: "faq-hub-policy",
    question: "Do you help write an AI use policy?",
    answer:
      "Yes. Many organisations start training without a written AI policy, so the programme can include a working session that drafts one: approved tools, data that must never be shared, when output needs human review, and who staff ask when unsure. The draft stays with the organisation to finalise.",
  },
  {
    id: "faq-hub-after",
    question: "What happens after the training?",
    answer:
      "Participants leave with a set of prompts and workflows built on their own work. A follow-up check a few weeks later looks at what stuck and what did not. Where the training uncovers tasks worth automating, that becomes a separate conversation about AI automation.",
  },
];

/** §6 "Who the training is for". */
export const HUB_AUDIENCES: TitledText[] = [
  { title: "Schools", description: "Teachers, coordinators and administrators learning AI literacy, lesson support and responsible classroom use." },
  { title: "Colleges & universities", description: "Faculty and students using AI for research, projects and career preparation, with academic integrity built in." },
  { title: "Companies & corporate teams", description: "Departments moving from casual experimenting to repeatable, approved AI workflows." },
  { title: "Banks & financial institutions", description: "Productivity and document work with strict handling of customer and financial information." },
  { title: "Small businesses", description: "Owners and small teams finding the handful of tasks where AI actually saves time." },
  { title: "Technical teams", description: "IT professionals and developers using AI for coding, documentation, testing and automation." },
];

/** §6 programmes, workshops and seminars — the delivery shapes. */
export const HUB_FORMATS: TrainingFormat[] = [
  { id: "seminar", title: "AI seminar", duration: "60–90 minutes", description: "An awareness session for a large group: what AI is, what it is good and bad at, and what changes for this audience." },
  { id: "workshop", title: "Hands-on workshop", duration: "Half or full day", description: "Participants work on their own tasks with guidance. The format that changes behaviour most." },
  { id: "programme", title: "Structured programme", duration: "3–6 sessions", description: "Fundamentals, generative AI, prompting, productivity and responsible use, with practice between sessions." },
  { id: "online", title: "Online delivery", duration: "Flexible", description: "For organisations outside Kathmandu or teams spread across locations." },
];

/** §6 "Practical AI use cases" — across sectors, one line each. */
export const HUB_USE_CASES: TitledText[] = [
  { title: "Documents and reports", description: "Drafting, summarising and restructuring the reports and circulars that fill a working week." },
  { title: "Research", description: "Finding, comparing and organising information, then checking it before it is used." },
  { title: "Communication", description: "First drafts of emails, notices and customer replies, reviewed by a person before sending." },
  { title: "Planning", description: "Lesson plans, project plans, meeting agendas and checklists built faster." },
  { title: "Data and spreadsheets", description: "Explaining formulas, cleaning lists and describing what a table actually shows." },
  { title: "Repetitive workflows", description: "Spotting the tasks worth automating, and the ones that are not." },
];

/** §36 — the hub's short version; sector pages carry the specific one. */
export const HUB_RESPONSIBLE: TitledText[] = [
  { title: "Data and confidentiality", description: "What must never go into a public AI tool, with examples from your own sector." },
  { title: "Verification", description: "How to check a confident answer before anyone relies on it. AI tools make mistakes that read like facts." },
  { title: "Approved tools", description: "Which tools and accounts the organisation allows, and why a personal login is a different risk." },
  { title: "Human judgement", description: "AI drafts and suggests; people decide. That line is drawn explicitly for every audience." },
];

export const HUB_PROCESS: ProcessStep[] = [
  { step: 1, title: "Scoping call", description: "Who attends, what they do every week, which tools are allowed, and what should change afterwards." },
  { step: 2, title: "Programme design", description: "The curriculum is adapted and exercises are built from your real tasks, with sensitive details removed." },
  { step: 3, title: "Delivery", description: "Seminar, workshop or programme, in person or online, with hands-on practice in every session." },
  { step: 4, title: "Follow-up", description: "A check a few weeks later on what is being used, plus the prompts and workflows participants keep." },
];

/** §33 — trust evidence. Every item links to where it is substantiated. */
export const HUB_EVIDENCE: EvidenceItem[] = [
  { title: "Computer science", description: "B.Sc. CSIT, Tribhuvan University.", href: "/about", linkLabel: "Background" },
  { title: "Education technology", description: "Led delivery of five LMS platforms for K-12 schools and PSC/TSC exam preparation across Nepal.", href: "/work#lms", linkLabel: "LMS case study" },
  { title: "AI in production", description: "Seven production workflows on n8n and the Claude API, one cutting a ten-hour weekly cycle to about two.", href: "/work#ai-automation", linkLabel: "AI automation case study" },
  { title: "Published research", description: "Peer-reviewed computer vision research on facial detection and recognition.", href: "/research", linkLabel: "Publication" },
  { title: "Delivery record", description: "100+ digital projects delivered at a 92% on-time rate, for clients in Nepal and abroad.", href: "/work", linkLabel: "Case studies" },
];

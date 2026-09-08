import type { Route } from "next";
import type { AnswerBlock, Faq, ProcessStep } from "../types.ts";

/**
 * Content for the /ai-trainer-nepal pillar page.
 *
 * Built from docs/reference/ai-trainer-nepal-ready-to-build.md. Kept here
 * rather than in the page component for the same reason services are: the
 * copy feeds four consumers — the renderer, the JSON-LD builder, the sitemap,
 * and llms.txt — and a renamed field should produce a compile error rather
 * than four silently empty sections.
 *
 * Two places where the spec was not followed literally, both for accuracy:
 *
 * 1. §6 asks for a "30+ digital projects managed" proof point. proof.ts — the
 *    site's single source for figures — carries 100+ delivered at a 92%
 *    on-time rate. The higher verified number is used.
 * 2. §6 also asks for a "Training & Speaking" credential covering workshops
 *    and presentations delivered. Nothing in this repository evidences a past
 *    training or speaking record, and inventing one would be exactly the
 *    inflated claim §28 rules out. That slot instead describes how sessions
 *    are run, which is a statement about the offer rather than a claim about
 *    history. If there is a real record — institutions, dates, audience
 *    sizes — it belongs here and should replace this.
 */

export const AI_TRAINER_ROUTE = "/ai-trainer-nepal";

export const AI_TRAINER_META = {
  title: "AI Trainer in Nepal | AI Training, Workshops & Seminars",
  description:
    "Learn Artificial Intelligence in Nepal through practical AI training, workshops and seminars covering Generative AI, AI tools, automation and real-world applications.",
  heading: "AI Trainer in Nepal",
  eyebrow: "AI Trainer & Educator in Nepal",
  supporting:
    "Learn artificial intelligence through practical training, workshops and seminars designed for students, professionals, educators and businesses. I help people understand AI clearly, use modern AI tools confidently, and apply them to real work.",
  locationLine: "Based in Kathmandu, Nepal · Available across Nepal and online",
  keywords: [
    "AI trainer Nepal",
    "AI training Nepal",
    "AI workshop Nepal",
    "AI seminar Nepal",
    "generative AI training Nepal",
    "corporate AI training Nepal",
    "AI training for students Nepal",
    "artificial intelligence trainer Kathmandu",
    "prompt engineering training Nepal",
    "AI consultant and trainer Nepal",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* §6 — trust strip                                                            */
/* -------------------------------------------------------------------------- */

export const CREDIBILITY: { label: string; detail: string }[] = [
  { label: "Computer science background", detail: "B.Sc. CSIT, Tribhuvan University" },
  { label: "AI & automation", detail: "Production workflows on n8n and the Claude API" },
  { label: "Project experience", detail: "100+ digital projects delivered, 92% on time" },
  { label: "Research", detail: "Peer-reviewed computer vision publication" },
  { label: "How sessions run", detail: "In person across Nepal, or online" },
];

/* -------------------------------------------------------------------------- */
/* §21 — answer-first blocks. 134–167 words, self-contained, plain text.       */
/* Enforced by npm run validate:content.                                       */
/* -------------------------------------------------------------------------- */

export const AI_TRAINER_PRIMARY_ANSWER: AnswerBlock = {
  id: "what-is-ai-training",
  question: "What is AI training, and what does a session actually cover?",
  answer:
    "AI training teaches people how artificial intelligence works and how to apply it to real tasks, rather than handing them a list of tools to memorise. The sessions I run in Nepal move through four layers: what the technology does and where it fails, how generative AI handles writing, research and analysis, how to structure a prompt so output is consistent, and how to verify a result before anyone acts on it. Audience decides the emphasis. A college seminar spends longer on fundamentals and academic honesty; a corporate workshop spends longer on the two or three workflows that team already runs every week. Formats range from a 90 minute awareness seminar to a structured multi session programme, delivered in person or online. Almost none of it requires programming. The part that changes behaviour is not the tool demonstration, it is participants practising on their own real work during the session.",
  primaryRoute: AI_TRAINER_ROUTE,
  supporting: [
    "Typical coverage: AI and machine learning fundamentals, generative AI, prompt engineering, productivity workflows, automation, responsible use and verification.",
    "Not covered: model training from scratch, MLOps infrastructure, or anything requiring a formal accreditation body.",
  ],
};

export const AI_TRAINER_ANSWERS: AnswerBlock[] = [
  {
    id: "who-provides-ai-training-nepal",
    question: "Who provides AI training in Nepal?",
    answer:
      "Arjun Basnet provides AI training in Nepal, working from Kathmandu with students, professionals, educators, corporate teams and institutions. The background behind the training is computer science — a B.Sc. CSIT from Tribhuvan University — followed by delivering more than 100 digital projects and publishing peer reviewed research on facial detection and recognition. The AI side is not theoretical: I build production automation with n8n and the Claude API, including seven workflows that compressed a ten hour weekly cycle to roughly two. That matters for teaching, because the worked examples come from systems that actually run in production, failures included. Worth stating plainly: I am a practitioner who teaches, not a full time training provider, so I take a limited number of sessions and dates depend on availability. For a team that needs a certified curriculum with formal assessment and accreditation, a dedicated training institute is the better fit and I will say so.",
    primaryRoute: AI_TRAINER_ROUTE,
  },
  {
    id: "ai-training-for-non-programmers",
    question: "Is AI training only useful for programmers?",
    answer:
      "Most practical AI training needs no programming at all. In a typical 30 person workshop, fewer than 5 participants write code, and the session is built for the other 25. A teacher preparing lesson material, a marketing executive researching a campaign, an operations manager assembling a monthly report and a student structuring a literature review are all doing language work, which is exactly what current generative AI handles. What those participants need is judgement rather than syntax: how to give a model enough context, how to spot a confident answer that happens to be wrong, and when the manual method is still faster. Programming matters only at the automation layer, where AI is wired into a workflow that runs on a schedule, and even there the useful skill is describing the process precisely rather than writing the connector.",
    primaryRoute: AI_TRAINER_ROUTE,
  },
  {
    id: "choose-ai-training-nepal",
    question: "How do I choose the right AI training for my team or institution?",
    answer:
      "Choosing AI training starts with the outcome, not the syllabus. Write down what people should be able to do differently the week after the session, then work backwards. Three broad cases cover most enquiries. A group new to the technology needs fundamentals plus supervised practice on real tasks, usually a half day. A team already using ChatGPT informally needs prompt structure, verification habits and a policy on what must never be pasted into a model, which is a focused 90 minute to three hour workshop. An organisation trying to cut repetitive work needs workflow analysis first, because the answer is often automation rather than training. Ask any prospective trainer for a worked example from something they have actually built. If the answer is a tool tour with no failure cases, the session will not survive contact with your real work.",
    primaryRoute: AI_TRAINER_ROUTE,
  },
  {
    id: "ai-training-formats-nepal",
    question: "What AI training formats are available in Nepal?",
    answer:
      "AI training in Nepal is delivered here in six formats, chosen by audience size and how much practice time the group needs. An awareness seminar runs 60 to 90 minutes and suits colleges or large staff groups meeting the topic for the first time. A workshop runs a half or full day and is built around participants working on their own tasks. A structured programme spreads fundamentals, generative AI, prompting and applied practice across several sessions. Corporate training is scoped around a specific team's workflows after a short discovery call. One to one sessions suit founders or small teams wanting focused time. Online delivery covers organisations outside Kathmandu and internationally, and works well for everything except the hands on workshop, where a room is genuinely better. Group size drives quality more than duration: beyond roughly 30 participants, practical exercises stop working and the session becomes a lecture.",
    primaryRoute: AI_TRAINER_ROUTE,
  },
];

/* -------------------------------------------------------------------------- */
/* §17 — FAQ. 35–95 words each.                                                */
/* -------------------------------------------------------------------------- */

export const AI_TRAINER_FAQS: Faq[] = [
  {
    id: "faq-ai-training-include",
    question: "What does AI training in Nepal include?",
    answer:
      "Sessions cover artificial intelligence fundamentals, generative AI, prompt engineering, AI productivity, research workflows, automation concepts, and responsible use including verification and privacy. The exact mix is set by the audience. A student seminar and a corporate workshop start from the same fundamentals and then diverge almost entirely in their worked examples.",
  },
  {
    id: "faq-corporate-ai-training",
    question: "Do you provide corporate AI training?",
    answer:
      "Yes. Corporate training is customised around a team's actual workflows, so it begins with a short discovery call to identify the two or three processes worth building the session around. That is usually more valuable than a general overview, because the examples are already familiar to everyone in the room.",
  },
  {
    id: "faq-student-ai-workshops",
    question: "Do you run AI workshops for students?",
    answer:
      "Yes. Student sessions cover AI fundamentals, generative AI, prompting, research support, productivity and coding assistance, alongside responsible use. Academic honesty gets explicit treatment rather than a passing mention, because the line between legitimate assistance and misconduct is the question students actually have.",
  },
  {
    id: "faq-college-seminars",
    question: "Do you conduct AI seminars at colleges and universities?",
    answer:
      "Yes. Seminars can be built around AI awareness, generative AI, AI careers, productivity or emerging applications, and typically run 60 to 90 minutes with time for questions. For institutions, a seminar often works best as an introduction before a smaller hands-on workshop with a specific department.",
  },
  {
    id: "faq-online-ai-training",
    question: "Can AI training be delivered online?",
    answer:
      "Yes, for participants and organisations across Nepal and internationally. Seminars and structured programmes translate well to online delivery. Hands-on workshops work better in a room, because the useful part is watching where people get stuck, which is harder to catch over a video call with cameras off.",
  },
  {
    id: "faq-ai-training-group-size",
    question: "How many people can attend a session?",
    answer:
      "A seminar scales to a large hall without losing much. A practical workshop degrades beyond roughly 30 participants, because there is no longer time to look at individual work. For larger groups the usual approach is one seminar for everyone, then smaller workshops per department or year group.",
  },
  {
    id: "faq-ai-training-prerequisites",
    question: "What do participants need to prepare beforehand?",
    answer:
      "A laptop, an account on whichever AI assistant the group will use, and one real task each that they would normally do by hand. That last item matters most. Sessions where participants bring their own work produce noticeably better retention than sessions run on invented examples.",
  },
  {
    id: "faq-ai-training-tools",
    question: "Which AI tools do sessions cover?",
    answer:
      "Mainly the assistants people already have access to — ChatGPT, Claude and Gemini — plus n8n where automation is relevant. Tools change quickly, so sessions spend more time on transferable judgement than on any single interface. The comparison between assistants is covered honestly, including where each one is weaker.",
  },
];

/* -------------------------------------------------------------------------- */
/* §8 — what I teach                                                           */
/* -------------------------------------------------------------------------- */

export const TEACHING_AREAS: {
  id: string;
  label: string;
  title: string;
  description: string;
  href?: Route | (string & {});
}[] = [
  {
    id: "fundamentals",
    label: "Foundation",
    title: "Artificial intelligence fundamentals",
    description:
      "What AI, machine learning and generative AI actually are, where each is genuinely useful, and where the current generation still fails — without unnecessary technical complexity.",
  },
  {
    id: "generative-ai",
    label: "Core",
    title: "Generative AI",
    description:
      "How modern assistants support writing, research, analysis, brainstorming, coding and content work, and how to tell a good output from a confident wrong one.",
  },
  {
    id: "prompt-engineering",
    label: "Core",
    title: "Prompt engineering",
    description:
      "Structuring instructions, supplying context, and iterating so results are consistent rather than lucky. The single highest-return skill for most non-technical participants.",
  },
  {
    id: "productivity",
    label: "Applied",
    title: "AI productivity",
    description:
      "Researching faster, organising information, summarising long documents and supporting the everyday professional tasks that quietly consume a working week.",
  },
  {
    id: "automation",
    label: "Applied",
    title: "AI automation",
    description:
      "How AI connects to existing workflows to reduce repetitive work — and how to judge which processes are worth automating in the first place.",
    href: "/services/ai-automation",
  },
  {
    id: "for-business",
    label: "Applied",
    title: "AI for business",
    description:
      "Finding realistic opportunities across operations, marketing, customer service and internal workflows, and separating them from the ones that sound good in a slide deck.",
  },
  {
    id: "for-education",
    label: "Sector",
    title: "AI for education",
    description:
      "Practical applications for students, teachers and institutions, including lesson preparation, research support, and where the academic honesty line actually sits.",
  },
  {
    id: "responsible-ai",
    label: "Essential",
    title: "Responsible AI",
    description:
      "Limitations, hallucinations, privacy, data handling and verification. Covered in every session regardless of audience, because it is the part that prevents damage.",
  },
];

/* -------------------------------------------------------------------------- */
/* §9 — audiences                                                              */
/* -------------------------------------------------------------------------- */

export const AUDIENCES: { id: string; title: string; description: string }[] = [
  {
    id: "students",
    title: "Students",
    description:
      "Using AI for research, learning, presentations, projects and coding practice — and understanding where the academic honesty line sits before it becomes a problem.",
  },
  {
    id: "educators",
    title: "Teachers & educators",
    description:
      "Lesson preparation, material development, research and marking support, plus a realistic view of what students are already doing with these tools.",
  },
  {
    id: "professionals",
    title: "Professionals",
    description:
      "Integrating AI into everyday work: communication, analysis, research and documentation, with attention to what should never be pasted into a model.",
  },
  {
    id: "corporate",
    title: "Corporate teams",
    description:
      "Identifying practical use cases across a team's real workflows, and adopting tools in a way that survives after the training day ends.",
  },
  {
    id: "institutions",
    title: "Educational institutions",
    description:
      "Awareness sessions, workshops and structured programmes for schools, colleges and universities, scoped by department or year group.",
  },
  {
    id: "organisations",
    title: "Organisations & agencies",
    description:
      "Customised sessions built around existing workflows, current bottlenecks and the objectives the organisation is actually measured on.",
  },
];

/* -------------------------------------------------------------------------- */
/* §10 — real-world applications                                               */
/* -------------------------------------------------------------------------- */

export const APPLICATIONS: { id: string; title: string; description: string }[] = [
  { id: "education", title: "Education", description: "Research support, learning aids, lesson preparation and content development." },
  { id: "marketing", title: "Marketing", description: "Research, ideation, campaign planning and content workflows." },
  { id: "operations", title: "Business operations", description: "Reporting, documentation, information organisation and repetitive processing." },
  { id: "research", title: "Research", description: "Information discovery, summarisation, structuring and early-stage exploration." },
  { id: "software", title: "Software development", description: "Coding assistance, debugging, documentation and test support." },
  { id: "content", title: "Content creation", description: "Writing, editing, ideation and repurposing across formats." },
];

/* -------------------------------------------------------------------------- */
/* §11 — how training works                                                    */
/* -------------------------------------------------------------------------- */

export const TRAINING_PROCESS: ProcessStep[] = [
  { step: 1, title: "Understand", description: "Start with the fundamentals and the specific problem the group wants AI to help with." },
  { step: 2, title: "Explore", description: "Work through relevant tools and approaches with live demonstrations, including the failures." },
  { step: 3, title: "Practise", description: "Apply the concepts to realistic tasks, using work participants have brought with them." },
  { step: 4, title: "Apply", description: "Leave with a method that transfers back to study, work or the organisation." },
];

/* -------------------------------------------------------------------------- */
/* §12 — formats                                                               */
/* -------------------------------------------------------------------------- */

export const TRAINING_FORMATS: {
  id: string;
  title: string;
  description: string;
  duration: string;
}[] = [
  { id: "workshop", title: "AI workshops", description: "Interactive sessions on a specific topic, tool or use case, built around participants' own tasks.", duration: "Half or full day" },
  { id: "seminar", title: "AI seminars", description: "Awareness sessions introducing AI and its impact on education, business and professional work.", duration: "60–90 minutes" },
  { id: "programme", title: "AI training programmes", description: "Structured coverage of fundamentals, generative AI, prompting, productivity and applied practice.", duration: "Multi-session" },
  { id: "corporate", title: "Corporate AI training", description: "Customised around a team's workflows and objectives, scoped after a short discovery call.", duration: "Scoped per engagement" },
  { id: "one-to-one", title: "One-to-one training", description: "Focused sessions for individuals or very small teams who want to go faster.", duration: "By arrangement" },
  { id: "online", title: "Online AI training", description: "Remote delivery for participants and organisations across Nepal and internationally.", duration: "Flexible" },
];

/* -------------------------------------------------------------------------- */
/* §14 — credentials. Every item links to something that evidences it.         */
/* -------------------------------------------------------------------------- */

export const CREDENTIALS: {
  id: string;
  title: string;
  description: string;
  href: Route | (string & {});
  linkLabel: string;
}[] = [
  {
    id: "computer-science",
    title: "Computer science",
    description:
      "B.Sc. CSIT from Tribhuvan University, followed by hands-on software and technology delivery rather than a move into pure management.",
    href: "/about",
    linkLabel: "Background",
  },
  {
    id: "research",
    title: "Research",
    description:
      "Peer-reviewed published research on facial detection and recognition — the reason the machine learning fundamentals in a session are first-hand rather than summarised.",
    href: "/research",
    linkLabel: "Publication",
  },
  {
    id: "project-management",
    title: "Project delivery",
    description:
      "More than 100 digital projects delivered at a 92% on-time rate, across clients in Nepal, the US, Australia, Japan and the UK.",
    href: "/work",
    linkLabel: "Case studies",
  },
  {
    id: "ai-automation",
    title: "AI automation",
    description:
      "Seven production workflows built on n8n and the Claude API, including a ten-hour weekly cycle compressed to roughly two hours.",
    href: "/services/ai-automation",
    linkLabel: "The service",
  },
  {
    id: "awards",
    title: "Recognised work",
    description:
      "Two-time ICC Digital Fan Engagement Award winner for the Cricket Nepal digital transformation programme.",
    href: "/work#cricket-nepal",
    linkLabel: "Cricket Nepal",
  },
];

/* -------------------------------------------------------------------------- */
/* §15 — topics                                                                */
/* -------------------------------------------------------------------------- */

export const TRAINING_TOPICS: string[] = [
  "Introduction to artificial intelligence",
  "Machine learning fundamentals",
  "Generative AI",
  "Large language models",
  "ChatGPT and AI assistants",
  "Prompt engineering",
  "AI for students",
  "AI for educators",
  "AI for research",
  "AI for productivity",
  "AI for content creation",
  "AI for marketing",
  "AI for business",
  "AI automation",
  "AI workflows",
  "AI-assisted coding",
  "AI research tools",
  "Responsible AI",
  "AI limitations and hallucinations",
  "AI adoption",
  "The future of AI and work",
];

/* -------------------------------------------------------------------------- */
/* §16 — why train with Arjun                                                  */
/* -------------------------------------------------------------------------- */

export const WHY_TRAIN: { title: string; description: string }[] = [
  {
    title: "Understand the technology",
    description:
      "AI concepts explained without jargon, by someone who has read the papers and shipped the systems — including the parts that did not work.",
  },
  {
    title: "Apply it to real problems",
    description:
      "Examples come from delivered projects and the tasks your group actually does, not from invented scenarios designed to make a demo succeed.",
  },
  {
    title: "Learn what outlasts today's tools",
    description:
      "The goal is not memorising a product list. Tools change every few months; the ability to judge where AI creates value does not.",
  },
];

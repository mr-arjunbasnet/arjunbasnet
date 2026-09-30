import type { AnswerBlock, Faq } from "../types.ts";
import type { Course, CourseLevel, PlannedCourse, TitledText } from "../training/types.ts";
import { AI_FUNDAMENTALS } from "./ai-fundamentals.ts";

/**
 * AI Courses — guide §17–§31.
 *
 * COURSES holds the pages that exist. PLANNED_COURSES fills in the learning
 * pathway (§18) so a visitor can see where a course sits, but planned entries
 * render without a link and are labelled as such. Move an entry up when its
 * page is written; the /ai-courses/[slug] route, sitemap and llms.txt follow.
 */

export const COURSES_HUB_ROUTE = "/ai-courses-nepal";
export const courseRoute = (slug: string) => `/ai-courses/${slug}`;

export const COURSES: Course[] = [AI_FUNDAMENTALS];

export const PLANNED_COURSES: PlannedCourse[] = [
  { slug: "generative-ai", name: "Generative AI", level: "practical", tagline: "LLMs, ChatGPT, Claude and Gemini for research, documents and images." },
  { slug: "prompt-engineering", name: "Prompt Engineering", level: "practical", tagline: "Problem framing, context, structured output and verification." },
  { slug: "chatgpt", name: "ChatGPT", level: "practical", tagline: "ChatGPT for productivity, business, education and research." },
  { slug: "ai-productivity", name: "AI Productivity", level: "professional", tagline: "Email, documents, meetings and spreadsheets: workflows you keep using." },
  { slug: "ai-for-business", name: "AI for Business", level: "professional", tagline: "Finding real AI opportunities, setting policy and measuring impact." },
  { slug: "ai-for-developers", name: "AI for Developers", level: "technical", tagline: "LLM APIs, structured outputs, embeddings, RAG and tool calling." },
  { slug: "ai-automation", name: "AI Automation", level: "technical", tagline: "Triggers, APIs, webhooks and n8n, through to production workflows." },
  { slug: "machine-learning", name: "Machine Learning", level: "advanced", tagline: "Python, data preparation, supervised and unsupervised learning." },
  { slug: "computer-vision", name: "Computer Vision", level: "advanced", tagline: "OpenCV, image classification, detection and segmentation." },
  { slug: "ai-agents", name: "AI Agents", level: "advanced", tagline: "Agents that plan, use tools and act, and how to keep them safe." },
];

export const LEVELS: { id: CourseLevel; label: string; description: string }[] = [
  { id: "beginner", label: "Beginner", description: "Start here. No technical background." },
  { id: "practical", label: "Practical", description: "Everyday AI tools, used well." },
  { id: "professional", label: "Professional", description: "AI applied to work and business." },
  { id: "technical", label: "Technical", description: "Building with AI: APIs and automation." },
  { id: "advanced", label: "Advanced", description: "Machine learning, vision and agents." },
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

/** Every course on the pathway, built or planned, with a flag for which. */
export function pathway() {
  const all = [
    ...COURSES.map((c) => ({ slug: c.slug, name: c.name, level: c.level, tagline: c.tagline, live: true })),
    ...PLANNED_COURSES.map((c) => ({ ...c, live: false })),
  ];
  return LEVELS.map((level) => ({ ...level, courses: all.filter((c) => c.level === level.id) }));
}

/** Looks up a name for any slug on the pathway (built or planned). */
export function courseName(slug: string): string | undefined {
  return getCourse(slug)?.name ?? PLANNED_COURSES.find((c) => c.slug === slug)?.name;
}

/* -------------------------------------------------------------------------- */
/* /ai-courses-nepal hub content                                               */
/* -------------------------------------------------------------------------- */

export const COURSES_HUB_META = {
  title: "AI Courses in Nepal | Practical, Project-Based AI Learning",
  description:
    "Practical AI courses in Nepal, from AI Fundamentals for beginners to generative AI, productivity, automation and machine learning. Online or in person.",
  heading: "AI Courses in Nepal",
  eyebrow: "AI courses for individuals",
  intro:
    "Learn artificial intelligence through practical, project-based courses for students, professionals, developers, business owners and educators. Start at the level that fits you, and finish each course with work you have actually built.",
  keywords: [
    "AI courses in Nepal",
    "AI course in Nepal",
    "artificial intelligence course Nepal",
    "AI training course Nepal",
    "generative AI course Nepal",
    "AI course online Nepal",
    "practical AI course Nepal",
    "AI classes in Nepal",
    "learn AI in Nepal",
  ],
} as const;

export const COURSES_HUB_PRIMARY_ANSWER: AnswerBlock = {
  id: "which-ai-course-nepal",
  question: "Which AI course should I take first in Nepal?",
  answer:
    "The right first AI course in Nepal depends on what you want to do with AI, not on how technical the course sounds. Most people should start with AI Fundamentals, a 10 module beginner course that explains how AI works, how to use assistants such as ChatGPT, Claude and Gemini, and how to catch their mistakes. Learners who already use AI every day can skip ahead to the practical level: Generative AI, Prompt Engineering or ChatGPT. Working professionals and business owners usually get the most from the professional level, AI Productivity and AI for Business, because those courses are built around real office tasks. Developers and technical learners move to AI for Developers and AI Automation, which involve APIs and workflow tools such as n8n. Machine Learning, Computer Vision and AI Agents sit at the advanced level and assume Python. When in doubt, start one level lower than you think.",
  primaryRoute: COURSES_HUB_ROUTE,
};

export const COURSES_HUB_ANSWERS: AnswerBlock[] = [
  {
    id: "choose-ai-course-nepal",
    question: "How do I judge whether an AI course in Nepal is worth taking?",
    answer:
      "An AI course in Nepal is worth taking when it shows you what you will be able to do at the end, not only the list of tools it mentions. Check five things before paying. First, the curriculum should be published module by module, so you can see whether it covers limitations and verification as well as features. Second, there should be hands-on exercises and at least 1 practical project on a task of your own, because watching demonstrations does not build skill. Third, the instructor should be able to point to real AI work, such as production systems, research or published writing. Fourth, any certificate should state what it certifies and how learners are assessed. Fifth, the course should be honest about who it is not for. Be wary of courses promising guaranteed jobs or income, and of prompt collections sold as a skill: tools change every few months, and judgement is what lasts.",
    primaryRoute: COURSES_HUB_ROUTE,
  },
];

export const COURSES_HUB_FAQS: Faq[] = [
  {
    id: "faq-courses-online",
    question: "Are the AI courses online or in person?",
    answer:
      "Both. Courses run as small online groups, in-person groups in Kathmandu or at an organisation's premises, or one-to-one. Dates and group sizes are arranged on enquiry, so tell me which course and format interests you and I will reply with the options.",
  },
  {
    id: "faq-courses-fee",
    question: "How much do the AI courses cost?",
    answer:
      "Fees depend on the course, the format and whether you join a group or learn one-to-one. Rather than publish a number that may not match your situation, every enquiry gets a clear quote. There are no hidden extras for materials.",
  },
  {
    id: "faq-courses-certificate",
    question: "Do the courses include a certificate?",
    answer:
      "Not currently. The evidence of learning is the project you complete in each course, which you can show to an employer or client. If a certificate is introduced, each course page will state exactly what it certifies and how it is assessed.",
  },
  {
    id: "faq-courses-team",
    question: "Can my organisation book a course for a team?",
    answer:
      "Yes, though for a team the better fit is usually AI training rather than a course. Training is adapted to the organisation's own tasks and data rules. See the AI training page for schools, companies and other sectors.",
  },
];

/** §31 — audience-based navigation. */
export const COURSE_AUDIENCES: (TitledText & { courses: string[] })[] = [
  { title: "Students", description: "Understand AI and use it for study and projects properly.", courses: ["ai-fundamentals", "generative-ai", "ai-for-developers"] },
  { title: "Professionals", description: "Use AI for everyday work, safely and well.", courses: ["ai-productivity", "generative-ai", "prompt-engineering", "ai-for-business"] },
  { title: "Developers", description: "Build with LLM APIs and automate workflows.", courses: ["ai-for-developers", "ai-automation", "machine-learning"] },
  { title: "Business owners", description: "Find where AI saves time and money in your business.", courses: ["ai-for-business", "ai-productivity", "ai-automation"] },
  { title: "Teachers", description: "Understand the tools your students already use.", courses: ["ai-fundamentals", "generative-ai"] },
];

export const COURSE_PRINCIPLES: TitledText[] = [
  { title: "Project-based", description: "Every course ends with something you have built on a real task of your own." },
  { title: "Honest about limits", description: "Where AI fails is taught as carefully as where it works." },
  { title: "Tool-independent", description: "Judgement and method outlast any single tool, so that is where the time goes." },
  { title: "Taught by a practitioner", description: "Examples come from production AI systems and published research, not slides." },
];

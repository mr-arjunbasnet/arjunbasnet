import type { Course } from "../training/types.ts";
import { FUNDAMENTALS_LEARNER, FUNDAMENTALS_ONLINE } from "../training/images.ts";

const ROUTE = "/ai-courses/ai-fundamentals";

/**
 * AI Fundamentals — guide §19. The beginner entry point of the pathway.
 *
 * Enquiry-based (owner's decision, 2026-09-22): no fees, dates, durations
 * promised as fixed, or certificate. The delivery options describe how the
 * course can run, not a timetable. Replace with real cohort details when they
 * exist, and only then add Course offers / CourseInstance dates to schema.
 */
export const AI_FUNDAMENTALS: Course = {
  slug: "ai-fundamentals",
  name: "AI Fundamentals",
  level: "beginner",
  tagline: "Where to start: what AI is, how to use it, and where it fails.",
  title: "AI Fundamentals Course in Nepal | AI for Beginners",
  description:
    "A practical beginner AI course in Nepal: what AI and generative AI are, how to use AI tools well, prompt basics, limitations and responsible use, with projects.",
  heading: "AI Fundamentals Course in Nepal",
  eyebrow: "AI course · Beginner",
  intro:
    "The course to take first. Understand what artificial intelligence actually is, use modern AI tools with confidence, and learn to spot when an answer is wrong. No programming, no maths background, and the course ends with a project built on a real task of your own.",
  keywords: [
    "AI course for beginners in Nepal",
    "AI fundamentals course",
    "AI course in Nepal",
    "learn AI in Nepal",
    "artificial intelligence course for beginners",
    "AI basics course Nepal",
  ],
  hero: {
    image: FUNDAMENTALS_LEARNER,
    caption: "Built for beginners: no code, no maths, just clear explanations and practice.",
  },
  figure: {
    image: FUNDAMENTALS_ONLINE,
    caption: "Join online from anywhere in Nepal, or in person.",
  },
  headings: {
    audience: "Made for people starting out",
    why: "An accurate picture beats a viral one",
    answers: "Common questions from beginners",
  },
  primaryAnswer: {
    id: "ai-fundamentals-course-cover",
    question: "What does a beginner AI course in Nepal cover?",
    answer:
      "A beginner AI course in Nepal should cover how artificial intelligence works, how to use today's AI tools well, and how to tell when they are wrong, without requiring any programming. The AI Fundamentals course runs through 10 modules in that order. The first four explain the ideas: what AI is, how machine learning differs from traditional software, what generative AI and large language models do, and where computer vision fits. The middle modules are hands-on with tools such as ChatGPT, Claude and Gemini, including the prompt fundamentals that make output consistent rather than lucky. The last part covers limitations, errors and responsible use, then a practical project where each learner applies AI to a real task from their own study or work. Beginners finish able to explain AI in plain language, use an assistant for research, writing and planning, and check an answer before relying on it.",
    primaryRoute: ROUTE,
    supporting: [
      "No programming or maths background needed.",
      "Suitable for students, professionals, teachers, business owners and anyone starting out.",
    ],
  },
  answers: [
    {
      id: "ai-vs-machine-learning-beginners",
      question: "What is the difference between AI and machine learning?",
      answer:
        "Artificial intelligence is the broad goal of making computers do tasks that normally need human judgement, while machine learning is the most common way of achieving it today. Traditional software follows rules a programmer writes by hand: if the amount is over 10,000 rupees, ask for approval. Machine learning instead learns patterns from examples. Show a model thousands of labelled photos and it learns to recognise faces; show it millions of sentences and it learns how language fits together. Generative AI is a branch of machine learning that produces new content, and large language models such as those behind ChatGPT, Claude and Gemini are its best-known example. The practical point for a beginner is that a learned model is only as good as the patterns in its data, which is why AI can be fluent and wrong at the same time. Knowing that one fact changes how carefully people use it.",
      primaryRoute: ROUTE,
    },
    {
      id: "learn-ai-without-coding",
      question: "Can I learn AI without knowing how to code?",
      answer:
        "Most people can learn to use AI well without writing a single line of code, and that is exactly what a fundamentals course is for. Using an AI assistant is mainly a language skill: describing a task clearly, giving the model enough context, reading the result critically and asking for a revision. A teacher, an accountant and a marketing officer all use those skills every day already. Coding becomes relevant later, at the point where AI is connected to other software, and the pathway handles that in separate courses: AI Automation for workflow tools such as n8n, and AI for Developers for building applications on LLM APIs. Starting with the fundamentals first has a practical advantage even for programmers. Developers who understand how models fail write far better AI features than those who start with an API call and learn the limitations from production bugs.",
      primaryRoute: ROUTE,
    },
  ],
  faqs: [
    {
      id: "faq-fundamentals-who",
      question: "Who is the AI Fundamentals course for?",
      answer:
        "Anyone starting with AI: school and college students, working professionals, teachers, business owners and people who have tried ChatGPT a few times but want to use it properly. It assumes no technical background. If you already use AI tools every day, start with Generative AI or AI Productivity instead.",
    },
    {
      id: "faq-fundamentals-format",
      question: "How is the course delivered?",
      answer:
        "The course runs as a small online or in-person group, or one-to-one, depending on demand and what suits you. Dates and group sizes are arranged on enquiry. Every format includes hands-on exercises and a final project rather than lectures alone.",
    },
    {
      id: "faq-fundamentals-device",
      question: "What do I need to take part?",
      answer:
        "A laptop is best, though a phone works for most exercises. You need a free account on at least one AI assistant, such as ChatGPT, Claude or Gemini. Paid subscriptions are not required; the course shows what the free tiers can and cannot do.",
    },
    {
      id: "faq-fundamentals-certificate",
      question: "Do I get a certificate?",
      answer:
        "Not at the moment. The course is about what you can do afterwards, evidenced by the project you complete. If a certificate is introduced, this page will say exactly what it certifies and how it is assessed.",
    },
    {
      id: "faq-fundamentals-next",
      question: "What should I take after AI Fundamentals?",
      answer:
        "It depends on your goal. For everyday work, AI Productivity or Generative AI. For running a business, AI for Business. For technical work, AI for Developers or AI Automation. The learning pathway on the AI courses page shows how they connect.",
    },
  ],
  audience: [
    { title: "Beginners", description: "You have heard a lot about AI and want a clear, honest explanation and a place to start." },
    { title: "Students", description: "You want to use AI for study and projects properly, and understand where the academic line sits." },
    { title: "Professionals", description: "You want AI to help with everyday work without putting your organisation's data at risk." },
    { title: "Teachers", description: "You want to understand the tools your students are already using." },
    { title: "Business owners", description: "You want to judge where AI could help before spending money on it." },
  ],
  outcomes: [
    "Explain AI, machine learning, generative AI and large language models in plain language",
    "Use ChatGPT, Claude or Gemini for research, writing, summarising and planning",
    "Write clear prompts with role, context, task and format",
    "Recognise hallucinations, outdated information and biased output",
    "Verify an AI answer before relying on it",
    "Know what information should never be shared with an AI tool",
    "Apply AI to one real task from your own work or study",
  ],
  whyLearn: [
    "AI tools are now part of most office, study and creative work. People who understand them get more out of them, and make fewer embarrassing mistakes.",
    "Most beginners learn AI from social media clips, which show the impressive results and skip the failures. A structured start gives you an accurate picture, including when not to use AI.",
    "The fundamentals don't go out of date the way tool tutorials do. How models work, why they fail and how to check them transfers to whichever tool comes next.",
  ],
  prerequisites: [
    "No programming knowledge",
    "No maths or statistics background",
    "Basic computer or smartphone use",
    "A free account on one AI assistant",
  ],
  modules: [
    { title: "What is AI?", summary: "A clear definition, a short history, and where AI already shows up in daily life in Nepal.", topics: ["Narrow vs general AI", "AI you already use", "Hype vs reality"] },
    { title: "AI vs machine learning", summary: "How learned models differ from rule-based software.", topics: ["Rules vs patterns", "Training data", "Why data quality matters"] },
    { title: "Generative AI", summary: "How AI produces text, images and audio.", topics: ["Text, image and audio generation", "What \"generative\" really means", "Common tools"] },
    { title: "Large language models", summary: "What is going on inside a chatbot, without the maths.", topics: ["Predicting the next word", "Context windows", "Why fluency isn't accuracy"] },
    { title: "Computer vision", summary: "How machines recognise images, faces and objects.", topics: ["Image classification", "Object detection", "Everyday examples"] },
    { title: "AI tools", summary: "A hands-on tour of the main assistants and what each is good at.", topics: ["ChatGPT, Claude and Gemini", "Free vs paid tiers", "Choosing a tool for a task"] },
    { title: "Prompt fundamentals", summary: "Getting consistent, useful output.", topics: ["Role, context, task, format", "Giving examples", "Iterating on weak answers"] },
    { title: "AI limitations", summary: "Where AI goes wrong, and how to catch it.", topics: ["Hallucinations", "Outdated knowledge", "Weak spots with Nepali content", "Verification habits"] },
    { title: "Responsible AI", summary: "Using AI safely and fairly.", topics: ["Privacy and data", "Bias", "Copyright and attribution", "Academic and workplace integrity"] },
    { title: "Practical projects", summary: "Apply everything to a real task and present the result.", topics: ["Choosing a task", "Building and checking the output", "Reflecting on what worked"] },
  ],
  exercises: [
    { title: "Catch the mistake", description: "Ask an assistant questions with known answers and find where it goes wrong." },
    { title: "Same prompt, three tools", description: "Compare ChatGPT, Claude and Gemini on one task and judge the differences." },
    { title: "Prompt rebuild", description: "Take a vague prompt and improve it step by step until the output is usable." },
    { title: "Summarise and verify", description: "Summarise a long document, then check every claim in the summary against the source." },
  ],
  project: {
    title: "An AI-assisted task from your own life",
    description:
      "Each learner picks a real task, such as a study guide, a monthly report, a lesson plan or a product description, and completes it with AI help, documenting what they asked, what came back, what they changed and what they checked.",
    steps: ["Choose a real task", "Plan the prompts", "Generate and revise", "Verify facts and figures", "Present the result and the lessons learned"],
  },
  tools: ["ChatGPT", "Claude", "Gemini", "Microsoft Copilot", "Google NotebookLM"],
  delivery: [
    { id: "group-online", title: "Small online group", duration: "On enquiry", description: "Live sessions with a small group, with exercises between sessions." },
    { id: "group-in-person", title: "In-person group", duration: "On enquiry", description: "For colleges, organisations or a group of colleagues in Kathmandu or elsewhere in Nepal." },
    { id: "one-to-one", title: "One-to-one", duration: "By arrangement", description: "The same curriculum at your own pace, built around your work." },
  ],
  materials: [
    "Module notes in plain language",
    "A prompt template library",
    "A verification checklist for AI answers",
    "The exercise set, reusable after the course",
  ],
  relatedCourses: ["generative-ai", "prompt-engineering", "ai-productivity"],
  relatedSectors: ["schools"],
  relatedPosts: ["chatgpt-vs-claude-vs-gemini", "ai-tools-for-students-nepal", "ai-training-syllabus-nepal"],
  publishedAt: "2026-09-22",
  updatedAt: "2026-09-22",
};

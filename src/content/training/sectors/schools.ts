import type { TrainingSector } from "../types.ts";
import { SCHOOLS_TEACHER_GUIDING, SCHOOLS_STUDENTS_NEPAL, SCHOOLS_COMPUTER_CLASS } from "../images.ts";

const ROUTE = "/ai-training-schools-nepal";

/**
 * AI Training for Schools — guide §7.
 *
 * Unique angle: responsible, practical AI literacy for teachers, students and
 * school administration. The evidence that makes it more than a template is
 * the K-12 LMS delivery record (/work#lms) — teacher dashboards, Nepali-
 * language content, low-bandwidth constraints — which is where the "what
 * teachers actually adopt" material comes from.
 *
 * No testimonials: none exist yet (guide §34). No claims about NEB or CDC
 * policy on AI: none has been verified.
 */
export const SCHOOLS: TrainingSector = {
  slug: "schools",
  route: ROUTE,
  name: "Schools",
  unit: "school",
  tagline: "AI literacy for teachers, students and school administration.",
  title: "AI Training for Schools in Nepal | Teachers & Students",
  description:
    "Practical AI training for schools in Nepal: AI literacy, lesson planning, academic integrity and responsible use, in workshops for teachers and students.",
  heading: "AI Training for Schools in Nepal",
  eyebrow: "AI training · Schools",
  intro:
    "Your students are already using AI. The question is whether your teachers understand it well enough to guide them. Practical workshops for teachers, students and school leaders, covering what AI can do in a school, where it goes wrong, and where the academic integrity line sits.",
  keywords: [
    "AI training for schools in Nepal",
    "AI training for schools",
    "AI workshop for schools Nepal",
    "AI workshop for teachers Nepal",
    "AI literacy for students",
    "AI education Nepal",
    "artificial intelligence training for teachers",
    "AI seminar for schools",
  ],
  hero: {
    image: SCHOOLS_TEACHER_GUIDING,
    caption: "Teachers guide how students use AI far more than any rule does.",
  },
  primaryAnswer: {
    id: "ai-training-schools-cover",
    question: "What does AI training for schools in Nepal cover?",
    answer:
      "AI training for schools in Nepal covers three groups with different needs: teachers, students and the administration that runs the school. Teachers learn how generative AI tools such as ChatGPT, Gemini and Claude help with lesson plans, worksheets, question banks and differentiated reading material, and how to check that output against the curriculum before it reaches a classroom. Students learn what AI is, how to use it to understand a topic rather than to skip the work, and why a confident answer can still be wrong. Administrators learn to draft circulars, reports and parent communication faster while keeping student records out of public tools. Every group covers academic integrity and responsible use, because a school needs one shared rule rather than 40 teachers each inventing their own. A typical programme is a 90 minute staff seminar followed by half-day hands-on workshops per department or grade band.",
    primaryRoute: ROUTE,
    supporting: [
      "Teacher sessions use each teacher's own subject and grade as the exercise material.",
      "Student sessions are age-appropriate and focus on learning with AI, not outsourcing work to it.",
    ],
  },
  answers: [
    {
      id: "teachers-ai-academic-integrity",
      question: "How can teachers handle AI and academic integrity in a Nepali school?",
      answer:
        "Teachers handle AI and academic integrity best by redesigning a few assignments rather than trying to detect AI use. AI detection tools produce false positives often enough that accusing a student on a detector score alone is unfair, and several detector vendors say as much in their own documentation. A more reliable approach has 3 parts. First, the school publishes one clear rule for each type of work: where AI is allowed, where it must be declared, and where it is not permitted, such as in-class tests. Second, teachers shift some marks toward process, asking for outlines, drafts, sources and a short oral explanation of the work. Third, classes practise using AI openly, for example asking a model to explain a concept and then checking its answer against the textbook. Students who have seen AI make mistakes in front of them are far more careful about copying it.",
      primaryRoute: ROUTE,
    },
    {
      id: "students-ai-age-nepal",
      question: "At what age should school students in Nepal start using AI tools?",
      answer:
        "School students in Nepal should start learning about AI earlier than they start using AI accounts on their own. Most major assistants set a minimum age in their terms: ChatGPT requires users to be at least 13, with parental permission under 18, and similar limits apply to other tools. For younger grades, AI literacy works well without any student accounts, with the teacher demonstrating a tool on a projector and the class discussing what it got right and wrong. From around Grade 8, supervised hands-on use becomes practical, with tasks such as generating quiz questions on a topic and then checking them. By Grades 11 and 12, students preparing projects and applications benefit from explicit training in research, citation and verification. The school sets the policy, and parents should be told what tools are used and why.",
      primaryRoute: ROUTE,
    },
  ],
  faqs: [
    {
      id: "faq-schools-who",
      question: "Is the training for teachers or for students?",
      answer:
        "Both, usually in that order. Teachers go first, because students will ask them questions about AI the next day. Student sessions follow, adapted to age. Many schools also add a short session for coordinators and administration staff, who handle circulars, reports and parent communication.",
    },
    {
      id: "faq-schools-tech",
      question: "Do teachers need technical knowledge?",
      answer:
        "No. The workshops assume no programming and no prior AI experience. Teachers need a phone or laptop, an account on a free AI assistant, and one real task they would normally do by hand, such as a worksheet or a lesson plan for next week.",
    },
    {
      id: "faq-schools-nepali",
      question: "Does the training work in Nepali?",
      answer:
        "Sessions can be delivered in Nepali or English. The exercises also test how well current AI tools handle Nepali-language content, which is uneven, so teachers learn where the tools are reliable for Nepali material and where they need to check more carefully.",
    },
    {
      id: "faq-schools-connectivity",
      question: "What if our school has limited internet or few computers?",
      answer:
        "The training adapts. A seminar needs only a projector and one connection. Workshops can run with participants sharing devices or using phones, and the materials are designed to work on low bandwidth, a constraint learned from building LMS platforms for schools across Nepal.",
    },
    {
      id: "faq-schools-policy",
      question: "Can you help us write a school AI policy?",
      answer:
        "Yes. A school AI policy covers which tools staff and students may use, what counts as misuse, how AI use is declared in assignments, and what student data must never be entered into any tool. The workshop can produce a working draft for the leadership team to finalise.",
    },
  ],
  why: [
    "Students in Nepal already have AI assistants on their phones. Most schools have no shared position on them, so each teacher decides alone, and students get forty different answers to the same question.",
    "Teachers who understand the tools can use them to prepare material faster and, more importantly, can teach students to use them well. Teachers who don't are left guessing whether an assignment was written by a student or by a model.",
    "AI literacy is also a basic skill now. A student who leaves school knowing how to question a confident answer, check a source and declare their use of a tool is better prepared for college and work than one who was simply told not to use it.",
  ],
  keyMessage:
    "A school doesn't need to ban AI or embrace it. It needs one clear, shared rule, and teachers confident enough to explain it.",
  useCaseGroups: [
    {
      audience: "For teachers",
      items: [
        { title: "Lesson planning", description: "Draft lesson plans and activity ideas aligned to the topic, then adjust them to the class." },
        { title: "Teaching materials", description: "Worksheets, reading passages at different levels, and question banks with answer keys, all checked before use." },
        { title: "Explanations and examples", description: "Several ways to explain a hard concept, and local examples students recognise." },
        { title: "Feedback support", description: "Structured feedback comments and rubrics, with the teacher making the final judgement." },
      ],
    },
    {
      audience: "For students",
      items: [
        { title: "Understanding a topic", description: "Asking AI to explain, quiz and test understanding, rather than to write the answer." },
        { title: "Research assistance", description: "Finding starting points and checking every claim against the textbook or a reliable source." },
        { title: "Presentations", description: "Structuring slides and talking points for a project the student has researched." },
        { title: "Checking their own work", description: "Getting feedback on clarity and grammar while keeping the ideas their own." },
      ],
    },
    {
      audience: "For administration",
      items: [
        { title: "Administrative documentation", description: "Circulars, notices, meeting minutes and reports drafted faster." },
        { title: "Parent communication", description: "Clear, polite first drafts in Nepali or English, reviewed before sending." },
      ],
    },
  ],
  outcomes: [
    "Explain what AI and generative AI are, in plain language, to colleagues and students",
    "Use an AI assistant to prepare a lesson plan, worksheet and question set, and check it against the curriculum",
    "Spot the common failure types: invented facts, wrong calculations and outdated information",
    "Apply the school's rule on AI in assignments consistently, and redesign one assignment of their own",
    "Know what student and staff information must never be entered into an AI tool",
    "Teach students a simple habit for verifying AI answers",
  ],
  curriculum: [
    {
      title: "AI in plain language",
      summary: "What AI, machine learning and generative AI are, and why AI tools sound confident even when wrong.",
      topics: ["How a chatbot produces an answer", "What AI is good and bad at", "Demonstration with deliberate mistakes"],
    },
    {
      title: "AI for teaching preparation",
      summary: "Hands-on practice on each teacher's own subject and grade.",
      topics: ["Lesson plans and activities", "Worksheets and question banks", "Reading material at different levels", "Checking output against the curriculum"],
    },
    {
      title: "Prompting that works",
      summary: "Giving AI enough context about grade, subject and learners to get usable output.",
      topics: ["Role, context, task and format", "Iterating on a weak answer", "Reusable prompt templates for the staff room"],
    },
    {
      title: "Academic integrity",
      summary: "What counts as legitimate help, what counts as misconduct, and how to redesign assignments.",
      topics: ["Why detectors are unreliable", "Declaring AI use", "Process-based assessment", "One redesigned assignment per teacher"],
    },
    {
      title: "Responsible AI in a school",
      summary: "Student data, privacy, age limits and bias.",
      topics: ["What never goes into a tool", "Age requirements of common tools", "Bias and representation", "Drafting the school AI policy"],
    },
    {
      title: "Teaching students to use AI",
      summary: "Classroom activities that build AI literacy rather than dependence.",
      topics: ["Spot-the-error exercises", "Verify-against-the-textbook routines", "Age-appropriate activities by grade band"],
    },
  ],
  audiences: [
    { title: "Principals and school leaders", description: "Setting the school's position on AI and a policy staff can apply consistently." },
    { title: "Teachers", description: "All subjects, from primary to Grade 12, with exercises from their own classes." },
    { title: "ICT and computer teachers", description: "A deeper session on how the tools work, to support colleagues afterwards." },
    { title: "Coordinators and administration", description: "Documentation, reports, circulars and parent communication." },
    { title: "Students", description: "Age-appropriate AI literacy sessions, typically from Grade 8 upward." },
  ],
  responsible: [
    { title: "Student data stays out", description: "Names, marks, attendance, health notes and family details are never entered into a public AI tool. Exercises use invented or anonymised examples." },
    { title: "Age limits are respected", description: "Many assistants require users to be 13 or older. Younger grades learn through teacher-led demonstration, not personal accounts." },
    { title: "Accuracy is checked", description: "AI-generated questions, answers and facts are checked against the curriculum and textbook before reaching students." },
    { title: "Integrity is fair", description: "No student is accused of misconduct on an AI detector score alone. The school's rule is published before it is enforced." },
    { title: "Bias is discussed", description: "AI tools reflect their training data. Teachers learn to notice stereotypes and missing local context in generated material." },
  ],
  formats: [
    { id: "staff-seminar", title: "Staff seminar", duration: "90 minutes", description: "The whole staff room together: what AI is, what students are doing with it, and the school's options." },
    { id: "teacher-workshop", title: "Teacher workshop", duration: "Half day", description: "Hands-on, by department or grade band, built on teachers' own lessons." },
    { id: "student-session", title: "Student AI literacy", duration: "60–90 minutes", description: "Age-appropriate sessions for a grade or house, run in class-sized groups." },
    { id: "programme", title: "Term programme", duration: "3–4 sessions", description: "Seminar, workshops and a policy session, spread across a term so practice happens between them." },
  ],
  process: [
    { step: 1, title: "Talk to the leadership team", description: "Grades, subjects, devices, connectivity, and what the school already allows." },
    { step: 2, title: "Adapt the curriculum", description: "Exercises built from your textbooks and timetable, in Nepali or English." },
    { step: 3, title: "Deliver", description: "Staff seminar first, then teacher workshops, then student sessions if wanted." },
    { step: 4, title: "Leave a policy draft", description: "A working AI policy and a set of prompt templates for the staff room." },
  ],
  evidence: [
    {
      title: "Five LMS platforms for Nepali schools",
      description: "Led delivery of five LMS platforms for K-12 schools and PSC/TSC exam candidates, with teacher dashboards, Nepali-language content and low-bandwidth design.",
      href: "/work#lms",
      linkLabel: "LMS case study",
    },
    {
      title: "Education sector clients",
      description: "Digital systems for USEF Nepal, the Fulbright and EducationUSA affiliate, and UWS Nepal.",
      href: "/work#usef",
      linkLabel: "USEF Nepal case study",
    },
    {
      title: "Computer science and research",
      description: "B.Sc. CSIT from Tribhuvan University and peer-reviewed computer vision research.",
      href: "/research",
      linkLabel: "Publication",
    },
    {
      title: "AI in daily practice",
      description: "Production AI workflows on n8n and the Claude API, so the examples come from systems that actually run.",
      href: "/work#ai-automation",
      linkLabel: "AI automation case study",
    },
  ],
  gallery: [
    { image: SCHOOLS_STUDENTS_NEPAL, caption: "AI literacy is for every student, not only the ones in the computer lab." },
    { image: SCHOOLS_COMPUTER_CLASS, caption: "Hands-on practice works with shared devices, even on a slow connection." },
  ],
  relatedCourses: ["ai-fundamentals", "generative-ai"],
  relatedPosts: ["ai-tools-for-students-nepal", "chatgpt-vs-claude-vs-gemini", "introduce-ai-to-your-team"],
  relatedServices: ["it-consulting"],
  cta: {
    title: "Request AI training for your school",
    body: "Tell me the grades, the number of teachers and what you want to change. I'll suggest a format and send a draft outline built around your school.",
    label: "Request AI training for your school",
  },
  publishedAt: "2026-09-22",
  updatedAt: "2026-09-22",
};

import type { Faq } from "../types.ts";

/**
 * Cross-cutting FAQs for /faq — questions about working with Arjun rather than
 * about a specific service. Service-specific questions live on their own
 * service page so the FAQPage schema stays anchored to one URL.
 */
export const FAQS: Faq[] = [
  {
    id: "faq-who-is-arjun",
    question: "Who is Arjun Basnet?",
    answer:
      "Arjun Basnet is a digital and AI consultant based in Kathmandu, Nepal. He has delivered over 100 projects across EdTech, digital transformation, AI automation, and enterprise software at Makura Creations, and holds a B.Sc. CSIT from Tribhuvan University plus a peer-reviewed publication in computer vision.",
  },
  {
    id: "faq-engagement-model",
    question: "Do you work on projects or retainers?",
    answer:
      "Both. Build work — a website, an app, an automation — is scoped and priced as a project. Ongoing work such as SEO or marketing runs monthly. Consulting is available by the day for teams that need direction rather than delivery.",
  },
  {
    id: "faq-remote-clients",
    question: "Do you work with clients outside Nepal?",
    answer:
      "Yes. Past work covers clients in the United States, Australia, Japan, and the United Kingdom alongside Nepal. Kathmandu sits at UTC+5:45, which overlaps comfortably with Asia-Pacific mornings and European afternoons, and gives a few hours of overlap with the US east coast early in the day.",
  },
  {
    id: "faq-getting-started",
    question: "How does an engagement start?",
    answer:
      "A conversation about the problem, not the solution. If I am not the right person for it, I will say so and point you somewhere better. If I am, you get a written scope with fixed deliverables, a timeline, and a price before any work begins.",
  },
  {
    id: "faq-ownership",
    question: "Who owns the work once it is delivered?",
    answer:
      "You do. Source code, workflow files, content, and accounts are transferred on final payment. Nothing is held hostage on infrastructure I control, and there is no lock-in that forces you to keep working with me.",
  },
  {
    id: "faq-why-not-agency",
    question: "Why work with an individual rather than an agency?",
    answer:
      "You deal with the person doing the work. There is no account manager relaying information, and nobody junior quietly assigned to your project. The trade-off is capacity — I take a limited number of engagements at once, so timelines depend on availability.",
  },
];

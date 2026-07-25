import type { Service } from "../types.ts";

export const webDevelopment: Service = {
  slug: "web-development",
  name: "Website Development",
  navLabel: "Web Development",
  group: "build",
  order: 6,
  featured: true,
  icon: "Globe",
  serviceType: "Web Development",
  tagline: "Fast sites that load on Nepali connections and rank from day one.",
  heading: "Website Development Services in Nepal",
  metaDescription:
    "Website development in Nepal — fast, search-ready sites built with Next.js. Engineered for real connection speeds, with SEO and schema built in from the start.",
  keywords: [
    "website development Nepal",
    "web development company Kathmandu",
    "Next.js developer Nepal",
    "website design Nepal",
    "web developer Kathmandu",
    "business website Nepal",
  ],

  primaryAnswer: {
    id: "what-makes-a-good-business-website-nepal",
    question: "What makes a good business website in Nepal?",
    answer:
      "A good business website in Nepal is fast on a mediocre mobile connection, clear about what the business sells, and easy for a visitor to act on. Speed is the constraint most often underestimated. Google treats 2.5 seconds as the threshold for the largest element to paint, and a site loading in 6 seconds on a 4G connection outside Kathmandu loses a meaningful share of visitors before they see anything. That rules out heavyweight page-builder templates carrying scripts nobody needs. I build with Next.js and generate pages statically, so they serve as plain HTML and load quickly regardless of connection quality. Search structure comes with the build rather than being retrofitted later: proper titles, structured data, clean URLs, and a sitemap. Retrofitting those onto a finished site costs more than including them from the beginning.",
    primaryRoute: "/services/web-development",
    supporting: [
      "Non-negotiable: mobile-first, sub-2.5s largest contentful paint, working contact path, structured data.",
      "Usually unnecessary: sliders, autoplay video backgrounds, and page-builder plugins that add scripts to every page.",
    ],
  },

  answers: [
    {
      id: "website-cost-nepal",
      question: "What determines the cost of a website?",
      answer:
        "Website cost in Nepal is driven by 3 variables, and page count matters least of the 3. What actually moves the number is custom functionality — a booking system, a payment integration, a content management workflow — because each carries design, build, and testing effort that a brochure page does not. Payment integration through eSewa, Khalti, or a card gateway adds meaningfully on its own, since it has to be tested against real transactions rather than assumed working. The third variable is content readiness: projects where copy and photography exist at kickoff finish noticeably faster than ones where writing happens alongside development. Ongoing cost is worth asking about before you commit, and it differs by platform. A statically generated Next.js site carries no plugin licences and no recurring security patching, which is not true of a plugin-heavy WordPress build. Each site is scoped and quoted against what it genuinely needs.",
      primaryRoute: "/services/web-development",
    },
    {
      id: "wordpress-vs-nextjs",
      question: "Should a business use WordPress or a custom-built site?",
      answer:
        "WordPress is the right answer for a business that needs non-technical staff publishing content several times a week and does not need unusual functionality. It is genuinely good at that, and I will recommend it when it fits. Its costs show up elsewhere: plugin licences, security updates, and performance that degrades as plugins accumulate. A Next.js site generated statically is faster by default, has essentially no attack surface, and costs less to host — the trade-off is that content changes usually need a developer unless a content management layer is added. My rule of thumb is straightforward. Publishing weekly with several editors, use WordPress. A site that changes a few times a year and must be fast and search-visible, build it statically. Choosing on fashion rather than publishing frequency is how businesses end up with the wrong one.",
      primaryRoute: "/services/web-development",
    },
  ],

  faqs: [
    {
      id: "faq-web-timeline",
      question: "How long does a website take to build?",
      answer:
        "A standard business site takes 4 to 8 weeks. The build is rarely the bottleneck — waiting on content, photography, and approvals usually is. Projects where the client has copy ready at kickoff finish noticeably faster than ones where writing happens alongside development.",
    },
    {
      id: "faq-web-hosting",
      question: "Where will the site be hosted?",
      answer:
        "Usually Vercel or a similar platform with a global edge network, which serves Nepali visitors faster than a single origin server. Hosting is set up under your own account so you retain control, and ongoing cost for a business site is modest.",
    },
    {
      id: "faq-web-maintenance",
      question: "What ongoing maintenance is needed?",
      answer:
        "For a statically generated site, very little — there are no plugins to patch and no database to secure. Content updates, dependency upgrades a few times a year, and monitoring. Maintenance retainers are available but genuinely optional, which is not true of a plugin-heavy WordPress build.",
    },
    {
      id: "faq-web-ecommerce",
      question: "Can you build e-commerce with Nepali payment gateways?",
      answer:
        "Yes — eSewa, Khalti, and card gateways including Stripe for international sales. Payment integration adds meaningfully to timeline and cost because it needs careful testing against real transactions, so it is scoped separately rather than bundled in.",
    },
  ],

  deliverables: [
    "Statically generated site built with Next.js, fast on real Nepali connections",
    "Mobile-first responsive design",
    "SEO structure built in — titles, canonicals, sitemap, robots, structured data",
    "Contact form wired to your inbox with spam protection",
    "Analytics and conversion tracking configured before launch",
    "Hosting set up under your own account, plus handover documentation",
  ],

  process: [
    {
      step: 1,
      title: "Scope and structure",
      description:
        "Agree what the site needs to do commercially, then map the pages that serve that. Sites fail more often from unclear purpose than from bad design.",
      duration: "1 week",
    },
    {
      step: 2,
      title: "Design",
      description:
        "Layouts reviewed on mobile first, because that is where most of your traffic will arrive. Approved before any code is written.",
      duration: "1–2 weeks",
    },
    {
      step: 3,
      title: "Build",
      description:
        "Next.js with static generation, SEO structure and structured data included as part of the build rather than added afterwards.",
      duration: "2–4 weeks",
    },
    {
      step: 4,
      title: "Launch",
      description:
        "Performance testing on throttled connections, Search Console submission, analytics verification, then handover with documentation.",
      duration: "1 week",
    },
  ],

  outcomes: [
    "Sub-2.5 second largest contentful paint on standard mobile connections",
    "Search structure and schema present at launch rather than retrofitted",
    "Low ongoing hosting cost on a global edge network",
    "No plugin licences, and no recurring security patch obligation",
  ],

  tools: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Vercel",
    "eSewa",
    "Khalti",
    "Google Analytics 4",
  ],

  proof: [
    {
      anchor: "cricket-nepal",
      label: "Cricket Nepal Digital Transformation",
      result:
        "Web platform delivery contributing to a 180% increase in traffic and two consecutive ICC Digital Fan Engagement Awards.",
    },
    {
      anchor: "usef",
      label: "USEF Nepal",
      result:
        "Platform delivery for an established education organisation with a nationwide audience.",
    },
  ],
  relatedServices: ["seo-services", "mobile-app-development", "custom-software-development"],
  publishedAt: "2026-07-25",
  updatedAt: "2026-07-25",
};

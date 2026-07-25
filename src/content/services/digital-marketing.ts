import type { Service } from "../types.ts";

export const digitalMarketing: Service = {
  slug: "digital-marketing",
  name: "Digital Marketing",
  group: "growth",
  order: 5,
  featured: true,
  icon: "TrendingUp",
  serviceType: "Digital Marketing",
  tagline: "Campaigns judged on enquiries, not impressions.",
  heading: "Digital Marketing Services in Nepal",
  metaDescription:
    "Digital marketing services in Nepal — social, paid, and content strategy judged on enquiries generated. Work recognised with two ICC Digital Awards.",
  keywords: [
    "digital marketing Nepal",
    "digital marketing agency Kathmandu",
    "social media marketing Nepal",
    "Facebook ads Nepal",
    "digital marketing consultant Nepal",
    "content marketing Nepal",
  ],

  primaryAnswer: {
    id: "what-is-digital-marketing-nepal",
    question: "What does digital marketing involve for a business in Nepal?",
    answer:
      "Digital marketing in Nepal is dominated by three channels, and the right mix depends on how people buy in your category. Facebook and Instagram carry the largest audience by a wide margin, and remain the cheapest route to reach for consumer businesses. Google search captures people already looking to buy, which makes it more expensive per click and usually better per rupee for high-value services. TikTok has grown fast among under-30 audiences and is still cheap relative to attention. Running the Cricket Nepal digital programme, the combination of platform-native content and consistent posting produced 340 percent social growth and 180 percent web traffic growth over two years, work that earned back-to-back ICC Digital Fan Engagement Awards. The measurement discipline matters more than the channel choice: I report on enquiries generated, because reach without enquiries is a vanity number.",
    primaryRoute: "/services/digital-marketing",
    supporting: [
      "Consumer and volume-driven: Facebook, Instagram, TikTok lead on reach per rupee.",
      "High-value services and B2B: Google search and LinkedIn capture existing intent more reliably.",
    ],
  },

  answers: [
    {
      id: "digital-marketing-budget-nepal",
      question: "How should a business decide its digital marketing budget?",
      answer:
        "The right digital marketing budget follows from what a customer is worth, not from a percentage rule. Work out the average value of a closed customer and how many enquiries it takes to close one, and the affordable cost per acquisition falls straight out of that arithmetic. A business selling high-value services can justify a far higher cost per enquiry than one selling low-value products, and the two need fundamentally different approaches rather than different budgets. Below a certain floor of monthly ad spend there is simply not enough data to optimise anything, so the money gets consumed learning rather than selling. That floor is the real minimum, not any headline figure. The split I usually start from is roughly 60 percent to the channel with proven return, 30 percent to content that keeps working after spend stops, and 10 percent to testing something new.",
      primaryRoute: "/services/digital-marketing",
    },
    {
      id: "digital-marketing-organic-vs-paid",
      question: "Should a business invest in organic content or paid ads first?",
      answer:
        "Paid advertising buys immediate reach and stops the moment the budget stops. Organic content compounds slowly and keeps working, but takes months before it produces meaningful volume. For a business that needs enquiries this quarter, paid is the honest answer and organic is the thing to start alongside it. For a business with runway and a category where buyers research before purchasing, organic content plus SEO produces a lower long-run cost per enquiry, often dramatically lower after the first year. The failure mode I see most often in Nepal is running paid ads for two years without ever building anything that persists, so the business is exactly as dependent on ad spend in year three as it was in month one. The right structure funds both from month 1, weighted by how urgently revenue is needed this quarter.",
      primaryRoute: "/services/digital-marketing",
    },
  ],

  faqs: [
    {
      id: "faq-dm-reporting",
      question: "What does reporting cover?",
      answer:
        "Spend, reach, engagement, and — the number that matters — enquiries generated and their cost. If reach rises while enquiries stay flat, that appears in the report as a problem to solve rather than being presented as a win.",
    },
    {
      id: "faq-dm-content-production",
      question: "Do you produce the content as well?",
      answer:
        "Strategy, copy, and campaign structure yes. For heavy video and photography production I bring in specialists rather than pretending otherwise — a phone-shot reel works for some categories and actively damages others, and knowing which is part of the job.",
    },
    {
      id: "faq-dm-contract-length",
      question: "Is there a minimum commitment?",
      answer:
        "Three months, because anything shorter cannot produce a fair read. The first month is setup and baseline, the second gathers data, and the third is the first month where optimisation is based on evidence rather than assumption.",
    },
    {
      id: "faq-dm-account-ownership",
      question: "Who owns the ad accounts?",
      answer:
        "You do. Accounts are created under your business, with access granted to me rather than the reverse. If the engagement ends, your campaign history, audiences, and pixel data stay with you — that accumulated data is often worth more than the campaigns themselves.",
    },
  ],

  deliverables: [
    "Channel strategy based on how buyers in your category actually behave",
    "Campaign setup, targeting, and creative direction",
    "Content calendar with platform-native formats",
    "Conversion tracking wired to enquiries, not just clicks",
    "Monthly reporting on cost per enquiry",
    "Ad accounts created under your ownership from day one",
  ],

  process: [
    {
      step: 1,
      title: "Positioning and audience",
      description:
        "Establish what you sell, to whom, at what value, and what a customer is worth. Budget recommendations follow from that arithmetic rather than a template.",
      duration: "1 week",
    },
    {
      step: 2,
      title: "Channel selection",
      description:
        "Choose channels on evidence of where your buyers are, not on which platform is currently fashionable. Some categories in Nepal genuinely do not need social at all.",
      duration: "3–5 days",
    },
    {
      step: 3,
      title: "Tracking first",
      description:
        "Conversion tracking is installed before spend starts. Running campaigns without it produces two months of numbers nobody can act on.",
      duration: "2–3 days",
    },
    {
      step: 4,
      title: "Launch and optimise",
      description:
        "Campaigns go live, then get adjusted on performance data. Underperforming channels get cut rather than defended.",
      duration: "Ongoing",
    },
  ],

  outcomes: [
    "340% social media growth on the Cricket Nepal programme",
    "180% increase in web traffic over the same period",
    "50,000+ mobile app downloads driven by coordinated campaigns",
    "Back-to-back ICC Digital Fan Engagement Awards, 2023 and 2024",
  ],

  tools: [
    "Meta Ads Manager",
    "Google Ads",
    "Google Analytics 4",
    "TikTok Ads",
    "LinkedIn Campaign Manager",
    "n8n",
  ],

  proof: [
    {
      anchor: "cricket-nepal",
      label: "Cricket Nepal Digital Transformation",
      result:
        "340% social growth, 180% web traffic growth, 50K+ app downloads — recognised with ICC Digital Fan Engagement Awards in 2023 and 2024.",
    },
    {
      anchor: "uws-nepal",
      label: "UWS Nepal",
      result:
        "Digital presence and campaign delivery for a nationwide education organisation.",
    },
  ],
  relatedServices: ["seo-services", "answer-engine-optimization", "web-development"],
  publishedAt: "2026-07-25",
  updatedAt: "2026-07-25",
};

import type { Service } from "../types.ts";

export const seoServices: Service = {
  slug: "seo-services",
  name: "SEO",
  navLabel: "SEO",
  group: "growth",
  order: 2,
  featured: true,
  icon: "Search",
  serviceType: "Search Engine Optimization",
  tagline: "Rank for the searches that actually bring you customers.",
  heading: "SEO Services in Nepal",
  metaDescription:
    "SEO services in Nepal and Kathmandu — technical audits, local search, and content that ranks. Measured on enquiries generated, not keyword position reports.",
  keywords: [
    "SEO services Nepal",
    "SEO company Kathmandu",
    "local SEO Nepal",
    "technical SEO audit Nepal",
    "search engine optimization Nepal",
    "SEO consultant Kathmandu",
  ],

  primaryAnswer: {
    id: "what-is-seo-nepal",
    question: "What does SEO involve for a business in Nepal?",
    answer:
      "SEO for a Nepali business breaks into three distinct jobs. Technical work makes the site crawlable and fast — Google's Core Web Vitals threshold is 2.5 seconds for the largest element to paint, and on the connection speeds common here a page taking 6 seconds loses the visitor before ranking matters at all. Local work covers Google Business Profile, consistent name-address-phone details, and pages built around how people here actually search, which is usually a service plus a place. Content work answers the questions buyers ask before they are ready to buy. The competitive picture in Nepal differs sharply from India or the United States: many commercial terms here have thin competition, so a well-built page can reach page one in 3 to 5 months rather than the two years a saturated market demands. I measure on enquiries generated, not keyword position.",
    primaryRoute: "/services/seo-services",
    supporting: [
      "Technical: crawlability, Core Web Vitals, mobile rendering, structured data, internal linking.",
      "Local: Google Business Profile, NAP consistency, location pages, review generation.",
      "Content: buyer-intent pages, topical clusters, and internal links that route authority to commercial pages.",
    ],
  },

  answers: [
    {
      id: "seo-timeline-results",
      question: "How long does SEO take to produce results?",
      answer:
        "Technical fixes show up fastest. Correcting indexing problems, page speed, and structured data usually moves impressions within 4 to 6 weeks, because the pages already existed and Google simply could not read them properly. New content ranking for competitive commercial terms takes 3 to 6 months in Nepal, and longer in categories where established players hold years of accumulated links. Local search sits in between: a properly configured and actively maintained Google Business Profile can start producing phone calls within 2 months. Anyone promising first-page rankings in 30 days is either targeting terms nobody actually searches for, or planning something that will eventually get the site penalised. I set the expectation at month 3 for early movement and month 6 for meaningful traffic, then report monthly against that whether or not the numbers flatter me.",
      primaryRoute: "/services/seo-services",
    },
    {
      id: "seo-cost-nepal",
      question: "What determines the cost of SEO?",
      answer:
        "SEO pricing is driven by scope rather than by any standard rate. A one-off technical audit is a contained piece of work: crawl the site, assess Core Web Vitals and indexation, and hand back a prioritised fix list you can give to any developer, including one who is not me. Ongoing work costs more or less depending on how much content is produced each month and whether link acquisition is included, and those are genuinely different services. A retainer producing 2 thoroughly researched pages a month is not the same product as one that emails a rankings spreadsheet. Before quoting anything, I check whether SEO is even the right channel. For a business with fewer than 50 relevant monthly searches in its category, paid ads or direct outreach will produce customers faster. I would rather say that in the first meeting than bill for a channel that cannot work.",
      primaryRoute: "/services/seo-services",
    },
    {
      id: "seo-vs-aeo-geo",
      question: "How is SEO different from AEO and GEO?",
      answer:
        "SEO optimises for a ranked list of blue links. AEO, or answer engine optimisation, targets the answer box and AI Overview that now sit above those links and frequently satisfy the query without any click at all. GEO, or generative engine optimisation, targets being cited inside ChatGPT, Claude, Perplexity, and Gemini responses. The technical foundations overlap heavily — a fast, crawlable, well-structured site helps all three — but the content shape differs meaningfully. Traditional SEO rewards long comprehensive pages. AEO rewards self-contained answers of roughly 134 to 167 words that survive extraction intact, without pronouns pointing at surrounding context. GEO rewards specific verifiable claims a model can safely repeat, which in practice means named numbers, named tools, and named sources rather than generalities. Most Nepali businesses currently optimise for none of the three, which leaves the ground unusually open right now.",
      primaryRoute: "/services/seo-services",
    },
  ],

  faqs: [
    {
      id: "faq-seo-guarantee",
      question: "Can you guarantee a first-page ranking?",
      answer:
        "No, and neither can anyone else honestly. Rankings depend on competitors who also act, and on algorithm changes nobody controls. What I commit to is the work, monthly reporting against agreed targets, and telling you early if a term is not winnable so budget moves somewhere it can perform.",
    },
    {
      id: "faq-seo-existing-site",
      question: "Do we need a new website for SEO to work?",
      answer:
        "Usually not. Most sites have fixable technical problems rather than fatal ones. A rebuild only becomes the cheaper option when the platform blocks fundamentals — no control over page titles, unfixable page speed, or URLs that change on every edit. The audit tells you which situation you are in.",
    },
    {
      id: "faq-seo-content-volume",
      question: "How much content does SEO need?",
      answer:
        "Fewer, better pages beat volume. A page that fully answers one buyer question and links sensibly to related pages outperforms ten thin posts covering the same ground. For most Nepali businesses, two well-researched pages a month sustains steady growth without diluting the site.",
    },
    {
      id: "faq-seo-backlinks",
      question: "Do you buy backlinks?",
      answer:
        "No. Paid link networks are the fastest route to a manual penalty, and recovery takes longer than the ranking was ever worth. Links are earned through content worth citing, local partnerships, industry directories, and press — slower, but it does not put the domain at risk.",
    },
    {
      id: "faq-seo-reporting",
      question: "What does monthly SEO reporting cover?",
      answer:
        "Organic traffic, rankings for agreed terms, enquiries attributed to organic search, work completed, and what is planned next. The enquiry number is the one that matters. If traffic rises while enquiries stay flat, that is a problem to address, not a result to celebrate.",
    },
  ],

  deliverables: [
    "Technical SEO audit with issues ranked by traffic impact, not by count",
    "Core Web Vitals and page speed remediation plan",
    "Keyword and intent map matched to your actual services",
    "Google Business Profile setup and optimisation for local search",
    "Structured data implementation for rich results and AI extraction",
    "Monthly reporting against enquiries generated, not just rankings",
  ],

  process: [
    {
      step: 1,
      title: "Audit",
      description:
        "Full technical crawl, Core Web Vitals assessment, indexation check, and a review of what is currently ranking and why. Delivered as a prioritised fix list.",
      duration: "1–2 weeks",
    },
    {
      step: 2,
      title: "Keyword and intent mapping",
      description:
        "Identify the searches your buyers actually run, filter out the ones with no commercial intent, and map each to a page that exists or needs building.",
      duration: "1 week",
    },
    {
      step: 3,
      title: "Technical remediation",
      description:
        "Fix crawlability, speed, mobile rendering, and structured data. This is where the fastest gains sit, because the pages already exist.",
      duration: "2–4 weeks",
    },
    {
      step: 4,
      title: "Content and local",
      description:
        "Build buyer-intent pages, configure Google Business Profile, and establish internal linking that routes authority toward commercial pages.",
      duration: "Ongoing",
    },
    {
      step: 5,
      title: "Measure and adjust",
      description:
        "Monthly reporting on traffic, rankings, and enquiries. Terms that are not moving after a fair trial get dropped rather than defended.",
      duration: "Monthly",
    },
  ],

  outcomes: [
    "180% increase in web traffic across the Cricket Nepal digital platform",
    "Technical fixes typically move impressions within four to six weeks",
    "Local search visibility established for service-plus-location queries",
    "Reporting tied to enquiries generated rather than ranking position alone",
  ],

  tools: [
    "Google Search Console",
    "Google Analytics 4",
    "Screaming Frog",
    "Ahrefs",
    "PageSpeed Insights",
    "Schema.org structured data",
    "n8n",
  ],

  proof: [
    {
      anchor: "cricket-nepal",
      label: "Cricket Nepal Digital Transformation",
      result:
        "180% increase in web traffic and 340% social growth — work recognised with back-to-back ICC Digital Fan Engagement Awards in 2023 and 2024.",
    },
    {
      anchor: "ai-automation",
      label: "Automated SEO auditing",
      result:
        "Built an n8n and Claude workflow that compressed recurring SEO audits from a ten-hour manual cycle to roughly two hours.",
    },
  ],
  relatedServices: [
    "answer-engine-optimization",
    "generative-engine-optimization",
    "digital-marketing",
  ],
  publishedAt: "2026-07-25",
  updatedAt: "2026-07-25",
};

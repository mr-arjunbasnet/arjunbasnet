import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import CountUp from "@/components/ui/CountUp";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Work — Case Studies in EdTech, AI Automation & Digital Transformation",
  description:
    "Selected case studies from 100+ delivered projects: Cricket Nepal's ICC Award-winning digital transformation, five K-12 and PSC/TSC Learning Management System platforms across Nepal, seven AI automation workflows in n8n and Claude, USEF Nepal, UWS Nepal. 92% on-time delivery.",
  keywords: [
    "Arjun Basnet portfolio",
    "Cricket Nepal digital transformation",
    "LMS Nepal case study",
    "PSC TSC LMS platform",
    "K-12 LMS Nepal",
    "n8n workflow case study",
    "Claude API automation",
    "business process automation portfolio",
    "USEF Nepal website",
    "UWS Nepal project",
    "Makura Creations projects",
    "ICC Digital Fan Engagement Award winner",
  ],
  alternates: { canonical: "/work" },
};

const workItemListSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url: "https://www.arjun-basnet.com.np/work",
  name: "Work & Case Studies — Arjun Basnet",
  description:
    "Selected case studies in EdTech, digital transformation, and AI automation by Arjun Basnet.",
  mainEntity: {
    "@type": "ItemList",
    name: "Selected Case Studies",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "CreativeWork",
          name: "Cricket Nepal Digital Transformation",
          description:
            "End-to-end digital transformation including web platform, mobile app, and social media — winner of two consecutive ICC Digital Fan Engagement Awards.",
          url: "https://www.arjun-basnet.com.np/work#cricket-nepal",
          author: { "@id": "https://www.arjun-basnet.com.np/#person" },
          award: [
            "ICC Digital Fan Engagement Award 2023",
            "ICC Digital Fan Engagement Award 2024",
          ],
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "CreativeWork",
          name: "Learning Management Systems, Nepal",
          description:
            "Five LMS platforms for K-12 and PSC/TSC exam preparation candidates across Nepal.",
          url: "https://www.arjun-basnet.com.np/work#lms",
          author: { "@id": "https://www.arjun-basnet.com.np/#person" },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "CreativeWork",
          name: "AI Automation Workflows",
          description:
            "Seven AI automation workflows in n8n and Claude reducing manual task cycle time from ten hours to two.",
          url: "https://www.arjun-basnet.com.np/work#ai-automation",
          author: { "@id": "https://www.arjun-basnet.com.np/#person" },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "CreativeWork",
          name: "USEF Nepal — Fulbright & EducationUSA",
          description:
            "Digital systems for the United States Educational Foundation Nepal.",
          url: "https://www.arjun-basnet.com.np/work#usef",
          author: { "@id": "https://www.arjun-basnet.com.np/#person" },
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "CreativeWork",
          name: "UWS Nepal",
          description:
            "Web and enterprise systems for the University of Western Sydney Nepal.",
          url: "https://www.arjun-basnet.com.np/work#uws-nepal",
          author: { "@id": "https://www.arjun-basnet.com.np/#person" },
        },
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.arjun-basnet.com.np/" },
    { "@type": "ListItem", position: 2, name: "Work", item: "https://www.arjun-basnet.com.np/work" },
  ],
};

const projects = [
  {
    id: "cricket-nepal",
    index: "01",
    title: "Cricket Nepal Digital Transformation",
    client: "Cricket Nepal",
    role: "Associate Project Manager",
    period: "2023–2024",
    category: "Digital Transformation",
    tags: ["Web Platform", "Mobile App", "Social Media", "Fan Engagement"],
    summary:
      "Led the full digital overhaul of Cricket Nepal's fan engagement ecosystem — a new web platform, mobile application, social media strategy, and supporting analytics infrastructure — earning back-to-back ICC Digital Fan Engagement Awards from the International Cricket Council.",
    outcomes: [
      "340% social media growth across platforms",
      "180% increase in website traffic",
      "50,000+ mobile application downloads",
      "ICC Digital Fan Engagement Award — 2023",
      "ICC Digital Fan Engagement Award — 2024 (consecutive)",
    ],
    context:
      "Cricket Nepal needed to grow its digital presence to match its ambitions in a competitive South Asian cricket landscape. The challenge was building a cohesive digital identity across web, mobile, and social — with consistent content pipelines, fan data tracking, and a mobile experience that worked for Nepali users on mid-range devices and variable connectivity.",
  },
  {
    id: "lms",
    index: "02",
    title: "Learning Management Systems, Nepal",
    client: "K-12 Schools & Exam Preparation Institutes",
    role: "Project Manager",
    period: "2023–2025",
    category: "EdTech Platform",
    tags: ["LMS", "K-12", "PSC / TSC Prep", "Adaptive Assessment", "Low-Bandwidth"],
    summary:
      "Led the design and delivery of five LMS platforms serving K-12 students and Public Service Commission (PSC) and Teacher Service Commission (TSC) entrance preparation candidates across Nepal. Each platform was built for Nepal-specific constraints: low-bandwidth reliability, Nepali-language content, teacher-facing dashboards, and offline-capable assessment modules.",
    outcomes: [
      "5 platforms delivered and deployed nationally",
      "Serving K-12 through PSC and TSC exam preparation",
      "Built for low-bandwidth and offline usage scenarios",
      "Custom teacher dashboard and gradebook per platform",
      "Adaptive assessment modules with result analytics",
    ],
    context:
      "Each of Nepal's five LMS projects revealed the same gap: no shared assessment schema, no adoption framework, and no analytics that a teacher or school administrator could actually act on. Building these platforms from the inside made it clear that the bottleneck in Nepali EdTech is not technical sophistication — it is the absence of coherent, standards-driven information-systems thinking that ties data, workflow, pedagogy, and business model into a single platform.",
  },
  {
    id: "ai-automation",
    index: "03",
    title: "AI Automation Workflows",
    client: "Makura Creations — Internal & Client",
    role: "AI Automation Engineer",
    period: "2024–2025",
    category: "AI / Process Automation",
    tags: ["n8n", "Claude", "LLM Workflows", "Document Processing", "SEO Automation"],
    summary:
      "Designed and deployed seven AI automation workflows using n8n and Claude to eliminate manual overhead from repeating, structured tasks — SEO auditing, client quotation generation, and document processing pipelines. Reduced cycle time from approximately ten hours to two hours across key workflows.",
    outcomes: [
      "7+ automation workflows built and deployed",
      "10-hour tasks compressed to approximately 2 hours per cycle",
      "SEO audit pipeline: automatic crawl, analysis, and report generation",
      "Client quotation workflow: brief-to-proposal in structured format",
      "Intelligent document processing with LLM-based extraction",
    ],
    context:
      "As Makura Creations scaled its client base past 100 projects, recurring manual workflows around SEO reporting, proposal generation, and document handling were consuming disproportionate team time. The n8n + Claude stack provided a practical path to high-quality automation without requiring complex infrastructure — each workflow was designed with fallback handling, structured output validation, and audit logging.",
  },
  {
    id: "usef",
    index: "04",
    title: "USEF Nepal — Fulbright & EducationUSA",
    client: "USEF Nepal",
    role: "Project Manager",
    period: "2024",
    category: "Enterprise Systems",
    tags: ["Web Platform", "Enterprise Integration", "Educational Organisation"],
    summary:
      "Managed the digital systems project for the United States Educational Foundation Nepal (USEF), the official U.S. government affiliate managing Fulbright scholarships and EducationUSA advising across Nepal.",
    outcomes: [
      "Web and enterprise systems delivered on schedule",
      "Coordinated cross-functional team across development, design, and content",
      "International client stakeholder management",
    ],
    context:
      "USEF Nepal required a digital presence and backend systems that matched the standards of a U.S. government-affiliated organisation while serving a Nepali audience. The project involved close coordination with international stakeholders and tight scope management.",
  },
  {
    id: "uws-nepal",
    index: "05",
    title: "UWS Nepal",
    client: "University of Western Sydney Nepal",
    role: "Project Manager",
    period: "2024",
    category: "Web & Mobile",
    tags: ["Web Development", "Mobile", "University", "Australia"],
    summary:
      "Led the web and enterprise system delivery for UWS Nepal, the Nepalese affiliate of the University of Western Sydney — a key international higher education partner operating in Nepal.",
    outcomes: [
      "Full project lifecycle management from planning to handover",
      "Cross-border client coordination between Nepal and Australia",
      "On-schedule delivery with 92% team on-time delivery rate maintained",
    ],
    context:
      "UWS Nepal is part of a broader pattern of Australian and international universities establishing Nepali affiliates. This engagement required navigating university procurement processes, international stakeholder expectations, and Nepal-specific technical constraints.",
  },
];

const clientList = [
  "USEF Nepal (Fulbright & EducationUSA)",
  "Cricket Nepal",
  "UWS Nepal",
  "K-12 Schools (Nepal)",
  "PSC Preparation Institutes",
  "TSC Preparation Institutes",
  "Makura Creations",
  "International Clients (US, AU, JP, UK)",
];

export default function Work() {
  return (
    <>
      <JsonLd data={workItemListSchema} id="ld-work" />
      <JsonLd data={breadcrumbSchema} id="ld-breadcrumb-work" />
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-20 md:pb-16">
        <AnimateIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-4">
            Portfolio
          </p>
        </AnimateIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <AnimateIn delay={0.1}>
            <h1
              className="text-5xl md:text-6xl leading-[0.95] text-[#111111]"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              100+ Projects.
              <br />
              <span className="text-[#1A3FA8]">Five Industries.</span>
              <br />
              One Standard.
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2} direction="left">
            <p className="text-sm text-[#737373] leading-relaxed max-w-lg">
              Three years and 100+ delivered products across EdTech, digital transformation,
              AI automation, enterprise systems, and web applications. A 92% on-time delivery
              rate and clients spanning Nepal, the United States, Australia, Japan, and the UK.
            </p>
          </AnimateIn>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-[#E2DDD6]" />
      </div>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "100+", label: "Total Projects" },
            { value: "92%", label: "On-Time Delivery" },
            { value: "3+", label: "Years at Makura" },
            { value: "4", label: "Continents of Clients" },
          ].map((s, i) => (
            <AnimateIn key={s.label} delay={i * 0.08}>
              <div className="text-center py-6 border border-[#E2DDD6] rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <p
                  className="text-3xl md:text-4xl font-bold text-[#1A3FA8] mb-1"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  <CountUp raw={s.value} />
                </p>
                <p className="text-xs font-medium uppercase tracking-wide text-[#737373]">
                  {s.label}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-[#E2DDD6]" />
      </div>

      {/* Projects */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-12">
          Selected Case Studies
        </p>

        <div className="space-y-0">
          {projects.map((p, i) => (
            <AnimateIn key={p.id} delay={i * 0.06}>
            <article
              id={p.id}
              className="border-t border-[#E2DDD6] py-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_280px] gap-6 lg:gap-10">
                {/* Index */}
                <div>
                  <span className="text-sm font-semibold text-[#E05C2A]">{p.index}</span>
                </div>

                {/* Content */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="text-xs font-medium uppercase tracking-wide text-[#737373] bg-[#F2EEE8] px-2.5 py-0.5 rounded-full">
                      {p.category}
                    </span>
                    <span className="text-xs text-[#737373]">{p.period}</span>
                  </div>
                  <h2
                    className="text-2xl md:text-3xl text-[#111111] mb-2 leading-tight"
                    style={{ fontFamily: "var(--font-dm-serif)" }}
                  >
                    {p.title}
                  </h2>
                  <p className="text-xs font-medium text-[#1A3FA8] mb-4">
                    {p.client} · {p.role}
                  </p>
                  <p className="text-sm text-[#737373] leading-relaxed mb-5">{p.summary}</p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-2">
                    Context
                  </p>
                  <p className="text-sm text-[#737373] leading-relaxed mb-6">{p.context}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-[#1A3FA8] bg-[#EEF2FF] px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div className="bg-[#F2EEE8] rounded-xl p-5 h-fit">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-3">
                    Key Outcomes
                  </p>
                  <ul className="space-y-2">
                    {p.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2">
                        <span className="text-[#E05C2A] mt-0.5 flex-shrink-0">→</span>
                        <span className="text-xs text-[#111111] leading-relaxed">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
            </AnimateIn>
          ))}
          <div className="border-t border-[#E2DDD6]" />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-[#E2DDD6]" />
      </div>

      {/* Clients */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-8">
          Selected Clients
        </p>
        <div className="flex flex-wrap gap-3">
          {clientList.map((c) => (
            <span
              key={c}
              className="text-sm text-[#111111] border border-[#E2DDD6] px-4 py-2 rounded-full bg-[#FAFAF8]"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-[#E2DDD6]" />
      </div>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2
              className="text-2xl md:text-3xl text-[#111111] mb-2"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Working on something interesting?
            </h2>
            <p className="text-sm text-[#737373]">
              Open to new projects, research partnerships, and consulting engagements.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-[#1A3FA8] text-white text-sm font-medium rounded-full hover:bg-[#2B52CC] transition-colors"
          >
            Get in touch <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}

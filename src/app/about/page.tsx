import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, Users, Globe2 } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import Timeline from "@/components/about/Timeline";
import ToolOrbit from "@/components/ui/ToolOrbit";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About — Project Manager & AI Engineer in Kathmandu",
  description:
    "Background of Arjun Basnet — three years at Makura Creations delivering 100+ products, B.Sc. CSIT from Tribhuvan University, peer-reviewed computer vision publication, two-time ICC Digital Fan Engagement Award winner. Education and work timeline from 2003 to present.",
  keywords: [
    "Arjun Basnet about",
    "Project Manager biography Nepal",
    "AI Engineer Kathmandu",
    "Makura Creations Project Manager",
    "Tribhuvan University CSIT",
    "Madan Bhandari Memorial College",
    "Toastmasters Lalitpur",
    "Arundaya English Secondary School",
    "Kanchanjunga Higher Secondary School",
  ],
  alternates: { canonical: "/about" },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: "https://arjun-basnet.com.np/about",
  name: "About — Arjun Basnet",
  description:
    "Biography, education, work history, technical skills, and certifications of Arjun Basnet, a Project Manager and AI Automation Engineer based in Kathmandu, Nepal.",
  mainEntity: { "@id": "https://arjun-basnet.com.np/#person" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://arjun-basnet.com.np/" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://arjun-basnet.com.np/about" },
  ],
};

const skills = [
  {
    category: "Engineering & Code",
    items: ["Python", "PHP", "JavaScript", "SQL", "C++", "TensorFlow", "PyTorch", "NumPy", "Pandas", "MATLAB"],
  },
  {
    category: "AI & Automation",
    items: ["n8n", "Claude API", "LLM Workflow Orchestration", "Prompt Engineering", "Playwright MCP", "Agentic Systems"],
  },
  {
    category: "Web & Applications",
    items: ["HTML/CSS", "Laravel", "WordPress", "REST APIs", "Next.js", "React"],
  },
  {
    category: "Project Management",
    items: ["Agile / Scrum", "Kanban", "Waterfall", "JIRA", "ClickUp", "Confluence", "Stakeholder Management"],
  },
  {
    category: "Data & Analytics",
    items: ["Google Analytics", "Microsoft Clarity", "Hotjar", "A/B Testing", "Dashboard Design", "Statistical Analysis"],
  },
  {
    category: "UX & Design",
    items: ["Figma", "User-Centred Design", "Information Architecture", "Usability Testing"],
  },
  {
    category: "Infrastructure & DevOps",
    items: ["Git", "Linux", "WHM / cPanel", "VPS Hosting", "System Monitoring"],
  },
  {
    category: "Research & Documentation",
    items: ["Research Methodology", "Technical Documentation", "Google Workspace", "Microsoft Office"],
  },
];

const certifications = [
  { title: "Claude Code in Action", issuer: "Anthropic", year: "2026" },
  { title: "Claude 101", issuer: "Anthropic", year: "2026" },
  {
    title: "Google Project Management Professional Certificate",
    issuer: "Google (Credly verified)",
    year: "2024",
  },
];

const quickFacts = [
  { icon: Sparkles, label: "Promotions", value: "3 in 18 months", note: "Junior PM → Associate PM → PM & AI Engineer" },
  { icon: Users, label: "Clients Managed", value: "100+", note: "Across 4 continents" },
  { icon: Globe2, label: "Working Across", value: "5 countries", note: "Nepal, US, Australia, Japan, UK" },
];

export default function About() {
  return (
    <>
      <JsonLd data={aboutSchema} id="ld-about" />
      <JsonLd data={breadcrumbSchema} id="ld-breadcrumb-about" />
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-20 md:pb-16">
        <AnimateIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-4">
            About
          </p>
        </AnimateIn>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
          <div>
            <AnimateIn delay={0.1}>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-[#111111] mb-6"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Project Manager.
                <br />
                <span className="text-[#1A3FA8]">Engineer.</span>
                <br />
                Researcher.
              </h1>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <div className="flex items-center gap-1.5 mb-3">
                <MapPin size={13} className="text-[#E05C2A]" />
                <span className="text-sm text-[#737373]">Kathmandu, Nepal</span>
              </div>
              <p className="text-sm text-[#737373] leading-relaxed mb-4 max-w-xl">
                I lead digital product delivery at Makura Creations, where I&apos;ve shipped
                100+ projects across EdTech, enterprise software, and AI automation. B.Sc. CSIT
                from Tribhuvan University, a peer-reviewed publication in computer vision,
                and three years of nationwide LMS, digital transformation, and AI workflow
                experience across Nepal.
              </p>
              <Link
                href="/contact"
                className="group flex items-center gap-1.5 text-sm font-medium text-[#1A3FA8]"
              >
                Get in touch{" "}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </AnimateIn>
          </div>

          {/* Tool orbit */}
          <AnimateIn delay={0.18} direction="left">
            <div className="relative">
              <ToolOrbit />
              <p className="text-center mt-4 text-[10px] font-semibold uppercase tracking-widest text-[#737373]">
                AI · Automation · Project Delivery
              </p>
            </div>
          </AnimateIn>
        </div>

        {/* Quick facts */}
        <AnimateIn delay={0.3}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            {quickFacts.map((f) => (
              <div
                key={f.label}
                className="flex items-start gap-3 border border-[#E2DDD6] rounded-xl p-4 hover:shadow-md hover:border-[#1A3FA8] transition-all"
              >
                <span className="w-9 h-9 flex-shrink-0 rounded-lg bg-[#EEF2FF] flex items-center justify-center">
                  <f.icon size={16} className="text-[#1A3FA8]" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#737373] mb-0.5">
                    {f.label}
                  </p>
                  <p className="text-sm font-semibold text-[#111111] leading-tight mb-0.5">
                    {f.value}
                  </p>
                  <p className="text-xs text-[#737373] leading-snug">{f.note}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-[#E2DDD6]" />
      </div>

      {/* Story */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          <AnimateIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#737373] lg:sticky lg:top-24">
              The Story
            </p>
          </AnimateIn>

          <div className="space-y-16">
            {[
              {
                period: "2018–2023",
                heading: "Starting with computer vision.",
                body: [
                  "I entered Tribhuvan University in 2018 on a 60% merit scholarship and spent five years studying Computer Science and Information Technology at Madan Bhandari Memorial College. In my final year, I co-authored a research paper on automated attendance using facial detection — integrating Haar Cascade and LBPH algorithms to track student presence in real time.",
                  "The algorithms were standard. The hard part was making the system trustworthy enough for a teacher to rely on. That tension — between what's technically possible and what people will actually adopt — became the central question of everything I've done since. The paper was published in the Apex Journal of Business and Management in 2023.",
                ],
              },
              {
                period: "Sep 2023 – Present",
                heading: "Three years in the field.",
                body: [
                  "I joined Makura Creations as a Junior Project Manager in September 2023 and moved to Associate PM in January 2024, then to Project Manager and AI Automation Engineer by January 2025. Over that time I've led 100+ digital products — from K-12 and exam-prep LMS platforms to enterprise applications, mobile apps, and AI workflow systems.",
                  "Clients have included USEF Nepal (the Fulbright and EducationUSA affiliate), Cricket Nepal, UWS Nepal, and more than one hundred national and international organisations spanning the US, Australia, Japan, and the UK. The Cricket Nepal digital transformation earned two consecutive ICC Digital Fan Engagement Awards — 340% social media growth, 180% website traffic, 50,000+ app downloads.",
                ],
              },
              {
                period: "The Insight",
                heading: "The pattern I kept seeing.",
                body: [
                  "Across five LMS deployments, the problem was never the technology. It was the absence of coherent information-systems thinking — no shared assessment schema, no adoption framework designed around teacher behaviour, no analytics that a principal could actually act on. Each school had a different vendor and a different definition of what a gradebook even was.",
                  "Nepal is in the middle of a curriculum overhaul and the country needs a generation of digital infrastructure that simply doesn't exist yet. The bottleneck isn't algorithmic sophistication — it's the absence of standards-driven, pedagogy-aware platform design. That gap is what I want to work on, and what shapes how I approach every project I lead.",
                ],
              },
            ].map((chapter, i) => (
              <AnimateIn key={chapter.period} delay={i * 0.05}>
                <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6">
                  <div className="pt-1">
                    <span className="text-xs font-semibold text-[#E05C2A] uppercase tracking-wide">
                      {chapter.period}
                    </span>
                  </div>
                  <div>
                    <h2
                      className="text-2xl text-[#111111] mb-4"
                      style={{ fontFamily: "var(--font-dm-serif)" }}
                    >
                      {chapter.heading}
                    </h2>
                    {chapter.body.map((p, j) => (
                      <p
                        key={j}
                        className="text-sm text-[#737373] leading-relaxed mb-3 last:mb-0"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-[#E2DDD6]" />
      </div>

      {/* Timeline */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          <AnimateIn>
            <div className="lg:sticky lg:top-24 h-fit">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-2">
                Journey
              </p>
              <p
                className="text-2xl text-[#111111]"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Education &<br />
                Work Timeline
              </p>
              <div className="mt-5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#1A3FA8]" />
                  <span className="text-xs text-[#737373]">Education</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#E05C2A]" />
                  <span className="text-xs text-[#737373]">Work Experience</span>
                </div>
              </div>
            </div>
          </AnimateIn>

          <div>
            <Timeline />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-[#E2DDD6]" />
      </div>

      {/* Skills */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          <AnimateIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#737373] lg:sticky lg:top-24">
              Technical Skills
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {skills.map((s, i) => (
              <AnimateIn key={s.category} delay={i * 0.05}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-3">
                    {s.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs text-[#111111] bg-[#F2EEE8] border border-[#E2DDD6] px-2.5 py-1 rounded-full hover:border-[#1A3FA8] hover:text-[#1A3FA8] transition-colors cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-[#E2DDD6]" />
      </div>

      {/* Education */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          <AnimateIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#737373] lg:sticky lg:top-24">
              Education
            </p>
          </AnimateIn>
          <div className="space-y-6">
            <AnimateIn delay={0.05}>
              <div className="border border-[#E2DDD6] rounded-xl p-6 hover:shadow-md transition-shadow">
                <p className="text-xs font-semibold text-[#E05C2A] uppercase tracking-wide mb-1">
                  Nov 2018 — Jun 2023
                </p>
                <h3 className="font-semibold text-[#111111] mb-0.5">
                  B.Sc. Computer Science and Information Technology
                </h3>
                <p className="text-sm text-[#1A3FA8] font-medium mb-0.5">
                  Madan Bhandari Memorial College, Tribhuvan University
                </p>
                <p className="text-xs text-[#737373] mb-3">Kathmandu, Nepal</p>
                <p className="text-sm text-[#737373] leading-relaxed mb-3">
                  Accredited by University Grants Commission (UGC) Nepal. Awarded a 60%
                  merit scholarship on entrance examination performance.
                </p>
                <p className="text-xs text-[#737373] leading-relaxed">
                  Relevant coursework: Database Management Systems · Software Engineering ·
                  Web Technologies · Data Structures &amp; Algorithms · Artificial Intelligence ·
                  Computer Networks · Object-Oriented Programming · International Business Management
                </p>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.1}>
              <div className="border border-[#E2DDD6] rounded-xl p-6 hover:shadow-md transition-shadow">
                <p className="text-xs font-semibold text-[#E05C2A] uppercase tracking-wide mb-1">
                  Jun 2016 — Jun 2018
                </p>
                <h3 className="font-semibold text-[#111111] mb-0.5">
                  Higher Secondary Education (+2)
                </h3>
                <p className="text-sm text-[#1A3FA8] font-medium mb-0.5">
                  Kanchanjunga Higher Secondary School
                </p>
                <p className="text-xs text-[#737373] mb-3">Nepal</p>
                <p className="text-sm text-[#737373] leading-relaxed">
                  Completed higher secondary education with focus on Science.
                </p>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <div className="border border-[#E2DDD6] rounded-xl p-6 hover:shadow-md transition-shadow">
                <p className="text-xs font-semibold text-[#E05C2A] uppercase tracking-wide mb-1">
                  Apr 2003 — Mar 2016
                </p>
                <h3 className="font-semibold text-[#111111] mb-0.5">
                  School — Class 1 to 10
                </h3>
                <p className="text-sm text-[#1A3FA8] font-medium mb-0.5">
                  Arundaya English Secondary School
                </p>
                <p className="text-xs text-[#737373] mb-3">Jhapa, Nepal</p>
                <p className="text-sm text-[#737373] leading-relaxed">
                  Completed secondary education. Active in extracurriculars including Nepal
                  Scouts and competitive public speaking — district-level winner in Essay
                  Writing (N-PABSON, 2014) and Extempore Speech (N-PABSON, 2013).
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-[#E2DDD6]" />
      </div>

      {/* Certifications */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          <AnimateIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#737373] lg:sticky lg:top-24">
              Certifications
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {certifications.map((c, i) => (
              <AnimateIn key={c.title} delay={i * 0.08}>
                <div className="border border-[#E2DDD6] rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <p className="text-xs font-semibold text-[#E05C2A] uppercase tracking-wide mb-1.5">
                    {c.year}
                  </p>
                  <p className="text-sm font-semibold text-[#111111] mb-1 leading-snug">
                    {c.title}
                  </p>
                  <p className="text-xs text-[#737373]">{c.issuer}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-[#E2DDD6]" />
      </div>

      {/* Leadership */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          <AnimateIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#737373] lg:sticky lg:top-24">
              Leadership & Speaking
            </p>
          </AnimateIn>
          <div className="space-y-5">
            {[
              {
                role: "Active Member & Speaker",
                org: "Lalitpur Toastmasters Club",
                period: "February 2025 — Present",
                detail:
                  "Three-time recipient of Best Table Topics Speaker. Regular speaker at club and area-level events.",
              },
              {
                role: "Professional Event Emcee & Presenter",
                org: "Academic, Corporate & Community Events",
                period: "2015 — Present",
                detail:
                  "Regularly hosts and presents at academic conferences, corporate events, and community programmes across Nepal.",
              },
              {
                role: "Scout Member",
                org: "Nepal Scouts, Jhapa District",
                period: "2012 — 2016",
                detail: "",
              },
            ].map((l, i) => (
              <AnimateIn key={l.role} delay={i * 0.1}>
                <div className="border-l-2 border-[#E2DDD6] pl-5 hover:border-[#1A3FA8] transition-colors">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mb-1">
                    <p className="text-sm font-semibold text-[#111111]">{l.role}</p>
                    <span className="text-xs text-[#737373]">{l.period}</span>
                  </div>
                  <p className="text-xs font-medium text-[#1A3FA8] mb-1">{l.org}</p>
                  {l.detail && (
                    <p className="text-xs text-[#737373] leading-relaxed">{l.detail}</p>
                  )}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

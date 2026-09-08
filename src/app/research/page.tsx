import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Research & Publications — Computer Vision, EdTech, IS Adoption",
  description:
    "Peer-reviewed research by Arjun Basnet — automated attendance using Haar Cascade and LBPH facial detection, published in the Apex Journal of Business and Management (2023). Active research interests across AI in EdTech, adaptive learning analytics, LMS adoption in emerging economies, and responsible educational data governance.",
  keywords: [
    "Arjun Basnet research",
    "facial detection attendance system",
    "Haar Cascade LBPH publication",
    "computer vision Nepal",
    "EdTech research Nepal",
    "adaptive learning analytics",
    "LMS adoption emerging economies",
    "information systems research",
    "Apex Journal of Business and Management",
    "AI in education research",
  ],
  alternates: { canonical: "/research" },
};

const scholarlyArticleSchema = {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  headline:
    "An Automated Attendance System Using Facial Detection and Recognition Technology",
  author: [
    { "@type": "Person", name: "Phul Babu Jha" },
    { "@type": "Person", name: "Arjun Basnet", "@id": "https://arjun-basnet.com.np/#person" },
    { "@type": "Person", name: "Bishal Pokhrel" },
    { "@type": "Person", name: "Bibek Pokhrel" },
    { "@type": "Person", name: "Gokul Kumar Thakur" },
    { "@type": "Person", name: "Sajan Chhetri" },
  ],
  datePublished: "2023",
  isPartOf: {
    "@type": "Periodical",
    name: "Apex Journal of Business and Management",
    volumeNumber: "1",
    issueNumber: "1",
  },
  pageStart: "103",
  pageEnd: "120",
  about: ["Computer Vision", "Facial Detection", "LBPH", "Haar Cascade", "Educational Technology"],
  publisher: { "@type": "Organization", name: "Apex Journal of Business and Management" },
};

const researchPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url: "https://arjun-basnet.com.np/research",
  name: "Research & Publications — Arjun Basnet",
  description:
    "Peer-reviewed publication and active research interests of Arjun Basnet across AI in EdTech, adaptive learning, and information-system adoption in emerging economies.",
  mainEntity: { "@id": "https://arjun-basnet.com.np/#person" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://arjun-basnet.com.np/" },
    { "@type": "ListItem", position: 2, name: "Research", item: "https://arjun-basnet.com.np/research" },
  ],
};

const researchInterests = [
  {
    title: "Artificial Intelligence in Educational Technology",
    description:
      "How AI systems — from adaptive assessment engines to learning analytics dashboards — can be responsibly designed and deployed in classroom environments, particularly in resource-constrained settings.",
  },
  {
    title: "Adaptive Learning Analytics & Standards-Driven LMS",
    description:
      "The design of learning management systems that respond to individual learner behaviour and produce analytics that teachers and administrators can act on — built to shared data standards rather than vendor-specific silos.",
  },
  {
    title: "Information Systems Adoption in Emerging Economies",
    description:
      "Structural and behavioural factors that predict whether an EdTech or enterprise system moves beyond its pilot deployment — drawing on IS diffusion theory and empirical evidence from South Asian contexts.",
  },
  {
    title: "AI-Driven Business Process Automation",
    description:
      "The design of LLM-based workflow orchestration systems for high-value, structured business processes — with emphasis on output reliability, human-in-the-loop design, and measurable efficiency outcomes.",
  },
  {
    title: "Human-Computer Interaction for Low-Resource Contexts",
    description:
      "Interface and interaction design principles for users in environments with limited bandwidth, intermittent connectivity, lower digital literacy, and affordable mid-range hardware.",
  },
  {
    title: "Technology Entrepreneurship & Digital Transformation",
    description:
      "How technology companies in developing economies can build durable, export-capable digital products — and how educational institutions can use digital transformation to improve student and teacher outcomes.",
  },
];

export default function Research() {
  return (
    <>
      <JsonLd data={scholarlyArticleSchema} id="ld-publication" />
      <JsonLd data={researchPageSchema} id="ld-research" />
      <JsonLd data={breadcrumbSchema} id="ld-breadcrumb-research" />
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-20 md:pb-16">
        <AnimateIn>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
            Research
          </p>
        </AnimateIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <AnimateIn delay={0.1}>
            <h1
              className="text-5xl md:text-6xl leading-[0.95] text-fg"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Research &
              <br />
              <span className="text-primary">Publications.</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2} direction="left">
            <p className="text-sm text-muted leading-relaxed max-w-lg">
              Peer-reviewed publication in computer vision and educational systems.
              Active research interests across AI in EdTech, adaptive learning analytics,
              IS adoption in emerging economies, and responsible governance of educational
              data — informed by three years of nationwide LMS and AI workflow deployments.
            </p>
          </AnimateIn>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* Publication */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          <div className="lg:sticky lg:top-24 h-fit">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Publications
            </p>
          </div>
          <div>
            <article className="border border-border rounded-xl overflow-hidden">
              <div className="bg-surface px-6 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-white bg-primary px-2.5 py-1 rounded-full uppercase tracking-wide">
                    Peer-Reviewed
                  </span>
                  <span className="text-xs font-medium text-muted">2023</span>
                  <span className="text-xs text-muted">·</span>
                  <span className="text-xs text-muted">Computer Vision · EdTech</span>
                </div>
              </div>
              <div className="px-6 py-8">
                <h2
                  className="text-xl md:text-2xl text-fg mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  An Automated Attendance System Using Facial Detection and Recognition Technology
                </h2>
                <p className="text-sm text-muted mb-5 leading-relaxed">
                  <span className="text-fg font-medium">
                    Jha, P. B., Basnet, A., Pokhrel, B., Pokhrel, B., Thakur, G. K., & Chhetri, S.
                  </span>
                  <br />
                  Apex Journal of Business and Management, Vol. 1, No. 1, 2023, pp. 103–120.
                </p>

                <div className="bg-surface rounded-lg p-5 mb-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
                    Abstract
                  </p>
                  <p className="text-sm text-muted leading-relaxed">
                    This paper presents the design and implementation of a real-time automated
                    attendance system for educational institutions using facial detection and
                    recognition technology. The system integrates Haar Cascade for face
                    detection and the Local Binary Patterns Histogram (LBPH) algorithm for
                    face recognition, enabling accurate student identification and attendance
                    marking without manual intervention. The study addresses key challenges in
                    deploying computer vision systems in real classroom environments —
                    including lighting variability, occlusion, and teacher adoption — and
                    proposes a practical architecture balancing computational efficiency with
                    recognition accuracy.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Algorithms", value: "Haar Cascade · LBPH" },
                    { label: "Domain", value: "Computer Vision · Education" },
                    { label: "Journal", value: "Apex Journal of Business and Management" },
                  ].map((d) => (
                    <div key={d.label} className="border border-border rounded-lg p-3">
                      <p className="text-xs text-muted uppercase tracking-wide font-semibold mb-1">
                        {d.label}
                      </p>
                      <p className="text-xs text-fg font-medium">{d.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://scholar.google.com/citations?user=UTzpgdYAAAAJ&hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    Google Scholar <ExternalLink size={13} />
                  </a>
                  <a
                    href="https://www.researchgate.net/profile/Arjun-Basnet-11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    ResearchGate <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* Research Interests */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          <div className="lg:sticky lg:top-24 h-fit">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Research Interests
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {researchInterests.map((r, i) => (
              <div key={r.title} className="border border-border rounded-xl p-5">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-xs font-semibold text-primary mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-semibold text-fg leading-snug">
                    {r.title}
                  </h3>
                </div>
                <p className="text-xs text-muted leading-relaxed pl-7">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* Open Research Questions */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          <div className="lg:sticky lg:top-24 h-fit">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Open Questions
            </p>
          </div>
          <div>
            <h2
              className="text-2xl md:text-3xl text-fg mb-6 leading-tight"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              The questions I&apos;m working on.
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-8 max-w-2xl">
              These are the open questions that shape my work in EdTech and AI for emerging
              economies. They came out of three years of LMS deployments, AI workflow design,
              and digital transformation projects in Nepal.
            </p>
            <div className="space-y-5">
              {[
                {
                  q: "How can personalised, adaptive learning be implemented in environments where bandwidth, devices, and teacher training are all limited?",
                  context:
                    "Designing for constraint rather than optimum — the question that shaped every LMS deployment in Nepal.",
                },
                {
                  q: "What structural factors predict whether an LMS deployment in an emerging economy matures beyond its pilot?",
                  context:
                    "Five deployments, five different definitions of a gradebook. The bottleneck is not the technology.",
                },
                {
                  q: "How do we govern educational data responsibly so that AI-driven insight does not quietly amplify the inequities it was meant to close?",
                  context:
                    "As AI enters Nepali classrooms, the governance frameworks need to arrive first — not after.",
                },
                {
                  q: "What does production-grade LLM workflow design look like outside Silicon Valley — when the budget, team, and infrastructure are all constrained?",
                  context:
                    "n8n + Claude is the practical answer for now. The harder question is what becomes the durable abstraction.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="border border-border rounded-xl p-5 bg-bg hover:shadow-md hover:border-primary transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-semibold text-primary mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-fg leading-snug mb-2">
                        {item.q}
                      </p>
                      <p className="text-xs text-muted leading-relaxed">
                        {item.context}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* Academic Profiles */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
              Academic Profiles
            </p>
            <p className="text-sm text-muted">
              Find publications, citations, and research profile on:
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              {
                label: "Google Scholar",
                href: "https://scholar.google.com/citations?user=UTzpgdYAAAAJ&hl=en",
              },
              {
                label: "ResearchGate",
                href: "https://www.researchgate.net/profile/Arjun-Basnet-11",
              },
              {
                label: "LinkedIn",
                href: "https://np.linkedin.com/in/mrarjunbasnet",
              },
            ].map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 border border-border rounded-full text-fg hover:border-primary hover:text-primary transition-colors"
              >
                {p.label} <ExternalLink size={12} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

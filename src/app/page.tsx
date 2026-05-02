import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Award, BookOpen, Zap, Trophy, Briefcase } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import CountUp from "@/components/ui/CountUp";
import Marquee from "@/components/ui/Marquee";
import HeroBackground from "@/components/ui/HeroBackground";
import ToolOrbit from "@/components/ui/ToolOrbit";

export const metadata: Metadata = {
  title: "Arjun Basnet — Project Manager & AI Automation Engineer",
  description:
    "Arjun Basnet is a Project Manager and AI Automation Engineer in Kathmandu, Nepal, leading EdTech platforms and AI workflow projects at Makura Creations.",
};

const stats = [
  { value: "100+", label: "Projects Delivered" },
  { value: "5+", label: "LMS Platforms" },
  { value: "2×", label: "ICC Digital Award" },
  { value: "340%", label: "Social Media Growth" },
  { value: "50K+", label: "App Downloads" },
  { value: "92%", label: "On-Time Delivery" },
];

const work = [
  {
    index: "01",
    title: "Cricket Nepal Digital Transformation",
    category: "Digital Transformation",
    year: "2023–2024",
    description:
      "Led end-to-end digital transformation for Cricket Nepal's fan engagement ecosystem — web platform, mobile application, and social media strategy. Earned back-to-back ICC Digital Fan Engagement Awards.",
    tags: ["340% social growth", "180% web traffic", "50K+ app downloads", "2× ICC Award"],
    href: "/work#cricket-nepal",
  },
  {
    index: "02",
    title: "Learning Management Systems, Nepal",
    category: "EdTech Platform",
    year: "2023–2025",
    description:
      "Designed and delivered five LMS platforms for K-12 students and PSC/TSC entrance preparation candidates across Nepal. Built for low-bandwidth environments with teacher dashboards and adaptive assessment.",
    tags: ["K-12 & PSC/TSC", "Nationwide deployment", "5 platforms", "Adaptive assessment"],
    href: "/work#lms",
  },
  {
    index: "03",
    title: "AI Automation Workflows",
    category: "AI / Process Automation",
    year: "2024–2025",
    description:
      "Seven AI automation workflows using n8n and Claude — compressing SEO auditing, quotation generation, and document processing from ten hours to two per cycle.",
    tags: ["7+ workflows", "n8n & Claude", "10h → 2h per cycle", "Document processing"],
    href: "/work#ai-automation",
  },
];

export default function Home() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-20 overflow-hidden">
        <HeroBackground />

        <div className="relative z-10">
          <AnimateIn direction="down" delay={0}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-8">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-[#E05C2A]" />
                <span className="text-xs font-medium uppercase tracking-widest text-[#737373]">
                  Kathmandu, Nepal
                </span>
              </span>
              <span className="text-[#E2DDD6] hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <Trophy size={13} className="text-[#E05C2A]" />
                <span className="text-xs font-medium uppercase tracking-widest text-[#737373]">
                  ICC Digital Award 2023 & 2024
                </span>
              </span>
              <span className="text-[#E2DDD6] hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <Briefcase size={13} className="text-[#E05C2A]" />
                <span className="text-xs font-medium uppercase tracking-widest text-[#737373]">
                  Makura Creations
                </span>
              </span>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">
            <div>
              <AnimateIn delay={0.1}>
                <h1
                  className="text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 text-[#111111]"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  Arjun
                  <br />
                  Basnet.
                </h1>
              </AnimateIn>

              <AnimateIn delay={0.18}>
                <div className="h-px bg-[#E2DDD6] mb-7" />
              </AnimateIn>

              <AnimateIn delay={0.24}>
                <p className="text-lg text-[#111111] leading-relaxed mb-3 font-medium">
                  Project Manager & AI Automation Engineer
                </p>
                <p className="text-base text-[#737373] leading-relaxed max-w-md mb-6">
                  Three years building educational technology across Nepal — from
                  facial-recognition attendance systems to nationwide LMS platforms,
                  Cricket Nepal&apos;s ICC Award-winning digital transformation, and AI
                  workflows that cut ten-hour tasks to two.
                </p>
              </AnimateIn>

              <AnimateIn delay={0.32}>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/work"
                    className="group flex items-center gap-2 px-5 py-2.5 bg-[#1A3FA8] text-white text-sm font-medium rounded-full hover:bg-[#2B52CC] transition-colors"
                  >
                    View Work
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center gap-2 px-5 py-2.5 border border-[#E2DDD6] text-[#111111] text-sm font-medium rounded-full hover:border-[#1A3FA8] hover:text-[#1A3FA8] transition-colors bg-[#FAFAF8]/80 backdrop-blur-sm"
                  >
                    About Me
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 px-5 py-2.5 border border-[#E2DDD6] text-[#111111] text-sm font-medium rounded-full hover:border-[#E05C2A] hover:text-[#E05C2A] transition-colors bg-[#FAFAF8]/80 backdrop-blur-sm"
                  >
                    Get in touch
                  </Link>
                </div>
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
        </div>
      </section>

      {/* Stats bar */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-16">
        <AnimateIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[#E2DDD6] border border-[#E2DDD6] rounded-xl overflow-hidden">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-[#FAFAF8] px-4 py-6 text-center hover:bg-[#F2EEE8] transition-colors group"
              >
                <p
                  className="text-3xl md:text-4xl font-bold text-[#1A3FA8] mb-1 leading-none group-hover:scale-105 transition-transform"
                  style={{ fontFamily: "var(--font-dm-serif)" }}
                >
                  <CountUp raw={s.value} />
                </p>
                <p className="text-[10px] font-medium uppercase tracking-wide text-[#737373] leading-tight mt-1.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Selected Work */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <AnimateIn>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#737373] mb-2">
                Portfolio
              </p>
              <h2
                className="text-3xl md:text-4xl text-[#111111]"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Selected Work
              </h2>
            </div>
          </AnimateIn>
          <AnimateIn direction="left">
            <Link
              href="/work"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[#1A3FA8] group"
            >
              All Projects{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </AnimateIn>
        </div>

        <div className="space-y-0">
          {work.map((item, i) => (
            <AnimateIn key={item.index} delay={i * 0.1}>
              <Link
                href={item.href}
                className="group block border-t border-[#E2DDD6] py-8 hover:bg-[#F2EEE8] -mx-6 px-6 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-4 md:gap-8 items-start">
                  <span className="text-sm font-semibold text-[#E05C2A] pt-0.5">
                    {item.index}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-[#111111] group-hover:text-[#1A3FA8] transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-xs font-medium uppercase tracking-wide text-[#737373] bg-[#F2EEE8] px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-[#737373] leading-relaxed max-w-2xl mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-[#1A3FA8] bg-[#EEF2FF] px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#737373] md:pt-1">
                    <span>{item.year}</span>
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[#1A3FA8] transition-all"
                    />
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
          <div className="border-t border-[#E2DDD6]" />
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/work"
            className="flex items-center gap-1.5 text-sm font-medium text-[#1A3FA8]"
          >
            All Projects <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-[#E2DDD6]" />
      </div>

      {/* About + Research */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimateIn direction="right">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Zap size={14} className="text-[#E05C2A]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[#737373]">
                  Background
                </p>
              </div>
              <h2
                className="text-2xl md:text-3xl text-[#111111] mb-4 leading-tight"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                From computer vision prototypes to national-scale platforms.
              </h2>
              <p className="text-sm text-[#737373] leading-relaxed mb-4">
                I started in research — a computer vision attendance system at Tribhuvan
                University — and moved quickly into delivery. At Makura Creations, I grew
                from Junior PM to Project Manager and AI Automation Engineer over three years,
                leading 100+ products for clients across Nepal, the US, Australia, Japan,
                and the UK.
              </p>
              <p className="text-sm text-[#737373] leading-relaxed mb-6">
                The systems that worked were the ones designed around how teachers,
                administrators, and students actually behaved — not how a vendor wished
                they would.
              </p>
              <Link
                href="/about"
                className="group flex items-center gap-1.5 text-sm font-medium text-[#1A3FA8]"
              >
                Full story{" "}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </AnimateIn>

          <AnimateIn direction="left">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <BookOpen size={14} className="text-[#E05C2A]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[#737373]">
                  Research
                </p>
              </div>
              <h2
                className="text-2xl md:text-3xl text-[#111111] mb-4 leading-tight"
                style={{ fontFamily: "var(--font-dm-serif)" }}
              >
                Published work in computer vision and educational systems.
              </h2>
              <div className="border border-[#E2DDD6] rounded-xl p-5 mb-6 bg-[#F2EEE8] hover:shadow-md transition-shadow">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#E05C2A] mb-2">
                  Peer-Reviewed Publication · 2023
                </p>
                <p className="text-sm font-semibold text-[#111111] leading-snug mb-2">
                  An Automated Attendance System Using Facial Detection and Recognition Technology
                </p>
                <p className="text-xs text-[#737373]">
                  Jha, P. B., <strong>Basnet, A.</strong>, et al. — Apex Journal of
                  Business and Management, Vol. 1, No. 1, pp. 103–120
                </p>
              </div>
              <p className="text-sm text-[#737373] leading-relaxed mb-6">
                Research interests span AI in EdTech, adaptive learning analytics, LMS
                adoption in emerging economies, and responsible educational data governance.
              </p>
              <Link
                href="/research"
                className="group flex items-center gap-1.5 text-sm font-medium text-[#1A3FA8]"
              >
                Research & Publications{" "}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-[#E2DDD6]" />
      </div>

      {/* Recognition */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <AnimateIn>
          <div className="flex items-center gap-2 mb-10">
            <Award size={14} className="text-[#E05C2A]" />
            <p className="text-xs font-semibold uppercase tracking-widest text-[#737373]">
              Recognition
            </p>
          </div>
        </AnimateIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              org: "International Cricket Council",
              award: "ICC Digital Fan Engagement Award",
              year: "2023 & 2024",
              detail: "Two consecutive years for Cricket Nepal's digital transformation",
            },
            {
              org: "Tribhuvan University",
              award: "60% Merit Scholarship",
              year: "2018",
              detail: "Awarded on entrance examination performance",
            },
            {
              org: "Lalitpur Toastmasters Club",
              award: "Best Table Topics Speaker",
              year: "3× Recipient",
              detail: "Recognised for extemporaneous speech at Toastmasters International",
            },
            {
              org: "N-PABSON Nepal",
              award: "District-Level Competition Winner",
              year: "2013 & 2014",
              detail: "Essay Writing and Extempore Speech — district-level recognition",
            },
          ].map((r, i) => (
            <AnimateIn key={r.award} delay={i * 0.08}>
              <div className="border border-[#E2DDD6] rounded-xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <p className="text-xs font-semibold text-[#E05C2A] mb-1.5 uppercase tracking-wide">
                  {r.year}
                </p>
                <p className="text-sm font-semibold text-[#111111] mb-1 leading-snug">
                  {r.award}
                </p>
                <p className="text-xs text-[#1A3FA8] font-medium mb-2">{r.org}</p>
                <p className="text-xs text-[#737373] leading-relaxed">{r.detail}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A3FA8] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <AnimateIn>
            <h2
              className="text-4xl md:text-5xl mb-5"
              style={{ fontFamily: "var(--font-dm-serif)" }}
            >
              Let&apos;s talk.
            </h2>
            <p className="text-blue-200 max-w-md mx-auto mb-8 text-sm leading-relaxed">
              Whether it&apos;s a project, a research collaboration, or a conversation
              about educational technology in Nepal — I&apos;m always interested to hear
              from people doing interesting work.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1A3FA8] text-sm font-semibold rounded-full hover:bg-[#F2EEE8] transition-colors"
            >
              Get in touch{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}

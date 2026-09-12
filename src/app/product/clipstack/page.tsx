import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";
import fs from "node:fs";
import path from "node:path";
import {
  Command, Lock, RefreshCw, Layers, Search, PanelRight, Pin, RemoveFormatting, ShieldCheck,
  PauseCircle, Power, Feather, ClipboardList, Code, PenLine, Palette, Headphones, BookOpen,
  Check, X, ArrowRight,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE, absoluteUrl } from "@/content/site";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import {
  CLIPSTACK, NAV, HERO, PROBLEM, SOLUTION, FEATURES, HOW, USE_CASES, DOWNLOAD, FAQS, REQUEST, FOOTER,
  SOLUTION_ICONS, FEATURE_ICONS, USE_CASE_ICONS, STATS, COMPARISON, PLAN,
} from "@/content/clipstack/index";
import { btn, btnPrimary } from "@/components/clipstack/ui";
import VersionBadge from "@/components/clipstack/VersionBadge";
import DownloadForm from "@/components/clipstack/DownloadForm";
import RequestForm from "@/components/clipstack/RequestForm";
import CopyPasteScene from "@/components/clipstack/CopyPasteScene";
import AnimateIn from "@/components/ui/AnimateIn";

export const metadata: Metadata = {
  ...buildMetadata({ title: CLIPSTACK.title, description: CLIPSTACK.description, path: CLIPSTACK.route, keywords: [...CLIPSTACK.keywords] }),
  title: { absolute: CLIPSTACK.title },
};

/** The feed the app polls, read at build so the badge is right without JS. */
function readFeed() {
  try {
    const feed = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public", CLIPSTACK.feedPath), "utf8"));
    const r = feed.releases?.[0];
    return {
      version: String(r?.version ?? "1.1.0"),
      publishedAt: (r?.publishedAt as string | undefined) ?? null,
      sizeMB: Math.max(1, Math.round((Number(r?.archive?.length) || 2_000_000) / 1_000_000)),
    };
  } catch {
    return { version: "1.1.0", publishedAt: null, sizeMB: 2 };
  }
}

/* Icons resolved through an explicit map, never dynamically. */
const ICONS = {
  Command, Lock, RefreshCw, Layers, Search, PanelRight, Pin, RemoveFormatting, ShieldCheck,
  PauseCircle, Power, Feather, ClipboardList, Code, PenLine, Palette, Headphones, BookOpen,
} as const;
type IconName = keyof typeof ICONS;

const wrap = "mx-auto w-[min(1120px,calc(100%-40px))]";
const section = "py-20 max-[720px]:py-14";
const tileShadow: CSSProperties = { boxShadow: "var(--cs-shadow-tile)" };

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <AnimateIn className="h-full">
      <div className={`cs-glass rounded-[20px] ${className}`}>
        {children}
      </div>
    </AnimateIn>
  );
}

function Tile({ icon, size = 44 }: { icon: IconName; size?: number }) {
  const Icon = ICONS[icon];
  return (
    <div className="grid place-items-center rounded-xl bg-primary text-primary-fg" style={{ width: size, height: size, ...tileShadow }}>
      <Icon size={Math.round(size * 0.45)} aria-hidden strokeWidth={2} />
    </div>
  );
}

/** Centered section header: eyebrow pill, headline, lead — the reference's rhythm. */
function Head({ eyebrow, h2, lead }: { eyebrow: string; h2: string; lead?: ReactNode }) {
  return (
    <AnimateIn className="mx-auto mb-12 max-w-[720px] text-center">
      <span className="cs-glass-soft mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
        {eyebrow}
      </span>
      <h2 className="text-[clamp(30px,4vw,46px)] font-bold leading-[1.1] tracking-[-0.02em]">{h2}</h2>
      {lead && <p className="mx-auto mt-4 max-w-[60ch] text-[clamp(16px,1.6vw,19px)] leading-relaxed text-muted">{lead}</p>}
    </AnimateIn>
  );
}

/** The mark on the ripple orb. */
function Orb({ size = 96, height = 320, rings = [180, 300, 440, 600] }: { size?: number; height?: number; rings?: number[] }) {
  return (
    <div aria-hidden className="relative mx-auto flex items-center justify-center overflow-visible" style={{ height }}>
      <div className="pointer-events-none absolute inset-0 m-auto rounded-full" style={{ width: rings[rings.length - 1], height: rings[rings.length - 1], background: "radial-gradient(closest-side, var(--color-surface) 0%, transparent 70%)", opacity: 0.9 }} />
      {rings.map((r, i) => (
        <span key={r} className={`cs-ring ${i % 2 ? "cs-ring-pulse" : ""}`} style={{ width: r, height: r, ["--o" as string]: String(1 - i * 0.22), opacity: 1 - i * 0.22, animationDelay: `${i * 0.8}s` }} />
      ))}
      <div className="relative grid place-items-center rounded-[26px] bg-primary" style={{ width: size, height: size, ...tileShadow }}>
        <svg viewBox="0 0 64 64" aria-hidden style={{ width: size * 0.62, height: size * 0.62 }}>
          <rect x="18" y="20" width="24" height="30" rx="4" className="fill-primary-fg" opacity=".4" />
          <rect x="22" y="16" width="24" height="30" rx="4" className="fill-primary-fg" opacity=".7" />
          <rect x="26" y="12" width="24" height="30" rx="4" className="fill-primary-fg" />
          <rect x="33" y="10" width="10" height="4" rx="2" className="fill-primary" />
        </svg>
      </div>
    </div>
  );
}

/**
 * /product/clipstack — the brief's nine sections in the layout of the owner's
 * reference (the "ORB AI" template): monochrome, centered, card-led. Copy is
 * unchanged and lives in src/content/clipstack/. Standalone route; tokens
 * scoped by `.clipstack` in globals.css, with an inverted dark scheme.
 */
export default function ClipStackPage() {
  const feed = readFeed();

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: CLIPSTACK.name,
    url: absoluteUrl(CLIPSTACK.route),
    description: CLIPSTACK.description,
    operatingSystem: "macOS 14.0 or later",
    applicationCategory: "UtilitiesApplication",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    downloadUrl: absoluteUrl(CLIPSTACK.pkg),
    softwareVersion: feed.version,
    ...(feed.publishedAt ? { datePublished: feed.publishedAt } : {}),
    fileSize: `${feed.sizeMB} MB`,
    keywords: CLIPSTACK.keywords.join(", "),
    author: { "@id": `${SITE.url}/#person` },
  };

  const mockRows = [
    { ico: "🔗", t: "https://developer.apple.com/design/human-interface-guidelines", s: "Link · Safari · 2m", sel: true },
    { ico: "Aa", t: "Start with one team and one recurring task, not a company-wide announcement…", s: "Rich Text · Google Chrome · 19m" },
    { ico: "🖼", t: "Image · 2734 × 4026", s: "Image · Preview · 1h" },
    { ico: "📄", t: "Invoice-0142.pdf, Brief.docx", s: "Files · Finder · 3h" },
    { ico: "", t: "#E0533A", s: "Colour · Figma · Yesterday", swatch: "#e0533a" },
  ];

  return (
    <div className="clipstack -mt-16 min-h-screen overflow-x-clip antialiased">
      {/* Soft grey blooms down the canvas — what the glass blurs. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="cs-bloom" style={{ top: "2%", left: "-10%", width: 620, height: 620, background: "rgb(255 255 255 / 0.9)" }} />
        <span className="cs-bloom" style={{ top: "6%", right: "-8%", width: 520, height: 520, background: "rgb(210 210 210 / 0.9)" }} />
        <span className="cs-bloom" style={{ top: "28%", left: "20%", width: 700, height: 500, background: "rgb(225 225 225 / 0.9)" }} />
        <span className="cs-bloom" style={{ top: "46%", right: "-6%", width: 560, height: 560, background: "rgb(255 255 255 / 0.9)" }} />
        <span className="cs-bloom" style={{ top: "64%", left: "-12%", width: 640, height: 640, background: "rgb(214 214 214 / 0.9)" }} />
        <span className="cs-bloom" style={{ top: "84%", right: "10%", width: 600, height: 480, background: "rgb(255 255 255 / 0.9)" }} />
      </div>
      <JsonLd data={software} id="ld-clipstack-app" />
      <JsonLd data={faqPageSchema(FAQS.map((f) => ({ id: f.id, question: f.question, answer: f.answerText })))} id="ld-clipstack-faq" />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "ClipStack", path: CLIPSTACK.route }])} id="ld-clipstack-breadcrumb" />

      {/* ── Nav ── */}
      <header className="sticky top-0 z-10 border-b border-white/70 bg-white/55 backdrop-blur-[20px] backdrop-saturate-150">
        <div className={`${wrap} flex min-h-[64px] items-center justify-between gap-4`}>
          <Link href="/" className="hidden items-center gap-1.5 text-[13px] text-muted no-underline hover:text-fg sm:inline-flex" aria-label="Back to arjun-basnet.com.np">← Arjun Basnet</Link>
          <a href="#top" aria-label="ClipStack home" className="flex items-center gap-2.5 text-[15px] font-semibold text-fg no-underline">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary">
              <svg viewBox="0 0 64 64" aria-hidden className="h-4 w-4"><rect x="22" y="16" width="24" height="30" rx="4" className="fill-primary-fg" opacity=".6" /><rect x="26" y="12" width="24" height="30" rx="4" className="fill-primary-fg" /></svg>
            </span>
            ClipStack
          </a>
          <nav aria-label="Sections" className="hidden gap-6 text-sm md:flex">
            {NAV.map((l) => <a key={l.href} href={l.href} className="text-muted no-underline hover:text-fg">{l.label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/products" className="hidden text-[13px] text-muted no-underline hover:text-fg lg:inline">All products</Link>
            <Link href="/" className="inline-flex text-[13px] text-muted no-underline hover:text-fg sm:hidden" aria-label="Back to arjun-basnet.com.np">← Home</Link>
            <a href="#download" className={btnPrimary} data-track="product_download" data-track-label="clipstack_nav_download">Download</a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ── 1 Hero ── */}
        <section className="pt-10 pb-16 max-[720px]:pt-6">
          <div className={`${wrap} text-center`}>
            <span className="cs-glass-soft inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />{HERO.eyebrow}
            </span>
            <Orb />
            <h1 className="mx-auto -mt-6 max-w-[16ch] text-[clamp(38px,6vw,68px)] font-bold leading-[1.04] tracking-[-0.03em]">
              {HERO.h1[0]} {HERO.h1[1]}
            </h1>
            <p className="mx-auto mt-5 max-w-[58ch] text-[clamp(17px,1.8vw,20px)] leading-relaxed text-muted">{HERO.lead}</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a href="#download" className={btnPrimary} data-track="product_download" data-track-label="clipstack_hero_download">{HERO.primary}<ArrowRight size={16} aria-hidden /></a>
              <a href="#how" className={btn}>{HERO.secondary}</a>
            </div>
            <div className="mt-4 flex justify-center"><VersionBadge version={feed.version} publishedAt={feed.publishedAt} sizeMB={feed.sizeMB} /></div>

            {/* The loop the whole product is: copy, it lands, paste it back. */}
            <div className="mt-10"><CopyPasteScene /></div>

            {/* The panel, drawn in HTML so it is crisp in both schemes. */}
            <div aria-hidden className="cs-glass mx-auto mt-14 max-w-[880px] overflow-hidden rounded-[24px] text-left">
              <div className="flex items-center gap-2.5 border-b border-border px-5 py-3.5 text-[17px] text-muted">
                <span>🔍</span><span>Search clipboard history</span>
                <span className="ml-auto rounded-full bg-surface-2 px-[9px] py-0.5 text-xs text-fg">25</span>
              </div>
              <div className="grid min-h-[260px] grid-cols-1 md:grid-cols-[1.4fr_1fr]">
                <div className="p-2.5">
                  {mockRows.map((r) => (
                    <div key={r.t} className={`flex items-start gap-2.5 rounded-[12px] px-2.5 py-2 ${r.sel ? "bg-primary text-primary-fg" : ""}`}>
                      <div className="grid h-[34px] w-[34px] flex-none place-items-center rounded-lg text-[13px]" style={{ background: r.swatch ?? "rgba(127,127,127,.18)" }}>{r.ico}</div>
                      <div className="min-w-0"><div className="truncate text-[13px] leading-[1.35]">{r.t}</div><div className="text-[11px] opacity-75">{r.s}</div></div>
                    </div>
                  ))}
                </div>
                <div className="hidden border-l border-border/70 bg-white/30 p-4 text-[12.5px] leading-relaxed text-muted md:block">
                  <p className="mb-2.5 break-all text-fg">https://developer.apple.com/design/human-interface-guidelines</p>
                  Type · Link<br />From · Safari<br />Copied · Today at 10:42<br />Size · 58 bytes
                </div>
              </div>
              <div className="flex flex-wrap gap-3.5 border-t border-border px-4 py-2 text-[11px] text-muted">
                <span><kbd>↑↓</kbd> Navigate</span><span><kbd>⏎</kbd> Paste</span><span><kbd>⌘C</kbd> Copy</span><span><kbd>⌘P</kbd> Pin</span><span><kbd>⌘⌫</kbd> Delete</span><span className="ml-auto"><kbd>esc</kbd> Close</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2 The problem ── */}
        <section id="problem" className={`${section} scroll-mt-16`}>
          <div className={wrap}>
            <Head eyebrow={PROBLEM.eyebrow} h2={PROBLEM.h2} lead={PROBLEM.lead} />
            <div className="grid gap-5 min-[820px]:grid-cols-[1.1fr_.9fr]">
              <Card className="p-7">
                <ul className="grid gap-3.5 text-[15px] leading-relaxed text-muted">
                  {PROBLEM.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3"><span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" /><span>{b}</span></li>
                  ))}
                </ul>
              </Card>
              <AnimateIn delay={0.1}><div className="cs-glass-dark h-full rounded-[20px] p-7 text-primary-fg">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] opacity-70">{PROBLEM.calloutTitle}</p>
                <p className="text-[15px] leading-relaxed opacity-90">{PROBLEM.callout}</p>
              </div></AnimateIn>
            </div>
          </div>
        </section>

        {/* ── 3 The solution ── */}
        <section id="solution" className={section}>
          <div className={wrap}>
            <Head eyebrow={SOLUTION.eyebrow} h2={SOLUTION.h2} lead={SOLUTION.lead} />
            <div className="grid gap-5 md:grid-cols-3">
              {SOLUTION.cards.map((c, i) => (
                <Card key={c.title} className="p-7">
                  <div className="mb-5"><Tile icon={SOLUTION_ICONS[i]} /></div>
                  <h3 className="mb-1.5 text-lg font-bold">{c.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{c.body}</p>
                </Card>
              ))}
            </div>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {FEATURES.cards.map((f) => (
                <li key={f.title} className="cs-glass-soft inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] text-muted">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />{f.title}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="pb-4">
          <div className={wrap}>
            <Card className="grid grid-cols-2 divide-white/70 md:grid-cols-4 md:divide-x">
              {STATS.map((s) => (
                <div key={s.value} className="p-7 text-center">
                  <p className="text-[clamp(30px,3.6vw,44px)] font-semibold leading-none tracking-[-0.02em]">{s.value}</p>
                  <p className="mt-2 text-[13px] text-muted">{s.label}</p>
                </div>
              ))}
            </Card>
          </div>
        </section>

        {/* ── 4 Features ── */}
        <section id="features" className={`${section} scroll-mt-16`}>
          <div className={wrap}>
            <Head eyebrow={FEATURES.eyebrow} h2={FEATURES.h2} lead="Nine things it does, none of them optional extras." />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.cards.map((c, i) => (
                <Card key={c.title} className="p-6">
                  <div className="mb-5"><Tile icon={FEATURE_ICONS[i]} size={40} /></div>
                  <h3 className="mb-1.5 text-[17px] font-bold">{c.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{c.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5 How to use ── */}
        <section id="how" className={`${section} scroll-mt-16`}>
          <div className={wrap}>
            <Head eyebrow={HOW.eyebrow} h2={HOW.h2} lead="Five steps. The second one is the only permission it ever asks for." />
            <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {HOW.steps.map((s, i) => (
                <li key={s.title}>
                  <Card className="h-full p-7">
                    <p className="mb-5 text-[13px] font-semibold tracking-[0.1em] text-muted">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mb-2 text-[17px] font-bold">{s.title}</h3>
                    <p className="text-[15px] leading-relaxed text-muted [&_a]:text-primary-light [&_a]:underline [&_a]:underline-offset-2">{s.body}</p>
                  </Card>
                </li>
              ))}
              <li>
                <div className="cs-glass-soft grid h-full place-items-center rounded-[20px] p-7 text-center">
                  <div>
                    <p className="text-[13px] font-semibold tracking-[0.1em] text-muted">THEN</p>
                    <p className="mt-2 text-[17px] font-semibold">Press <kbd>⌘⇧V</kbd>.</p>
                    <p className="mt-1 text-[15px] text-muted">That is the whole workflow.</p>
                  </div>
                </div>
              </li>
            </ol>

            <Card className="mt-8 overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/70 px-6 py-4">
                <h3 className="text-[15px] font-bold">{HOW.keysHeading}</h3>
                <span className="text-[12px] text-muted">inside the panel</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[15px]">
                  <tbody>
                    {HOW.keys.map(([k, does], i) => (
                      <tr key={k} className={i < HOW.keys.length - 1 ? "border-b border-white/70" : ""}>
                        <td className="w-[160px] px-6 py-3 align-top whitespace-nowrap">{k === "type" ? <span className="text-muted">type</span> : k.split(" ").map((p) => <kbd key={p} className="mr-1">{p}</kbd>)}</td>
                        <td className="px-6 py-3 align-top text-muted">{does}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* ── 6 Use cases ── */}
        <section id="uses" className={`${section} scroll-mt-16`}>
          <div className={wrap}>
            <Head eyebrow={USE_CASES.eyebrow} h2={USE_CASES.h2} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {USE_CASES.cards.map((c, i) => (
                <Card key={c.title} className="p-6">
                  <div className="mb-5"><Tile icon={USE_CASE_ICONS[i]} size={40} /></div>
                  <h3 className="mb-1.5 text-[17px] font-bold">{c.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{c.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Comparison ── */}
        <section className={section}>
          <div className={wrap}>
            <Head eyebrow={COMPARISON.eyebrow} h2={COMPARISON.h2} lead={COMPARISON.lead} />
            <div className="mx-auto grid max-w-[900px] gap-5 md:grid-cols-2">
              <AnimateIn><div className="cs-glass-dark h-full rounded-[20px] p-7 text-primary-fg">
                <p className="mb-5 text-lg font-semibold">ClipStack</p>
                <ul className="grid gap-3 text-[15px]">
                  {COMPARISON.us.map((t) => <li key={t} className="flex gap-3"><Check size={18} aria-hidden className="mt-0.5 flex-none" />{t}</li>)}
                </ul>
              </div></AnimateIn>
              <Card className="p-7">
                <p className="mb-5 text-lg font-semibold text-muted">Others</p>
                <ul className="grid gap-3 text-[15px] text-muted">
                  {COMPARISON.others.map((t) => <li key={t} className="flex gap-3"><X size={18} aria-hidden className="mt-0.5 flex-none" />{t}</li>)}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* ── Plan ── */}
        <section className={section}>
          <div className={wrap}>
            <Head eyebrow={PLAN.eyebrow} h2={PLAN.h2} lead={PLAN.lead} />
            <Card className="mx-auto max-w-[520px] p-8 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{PLAN.name}</p>
              <p className="mt-3 text-[56px] font-semibold leading-none tracking-[-0.03em]">{PLAN.price}<span className="ml-2 text-base font-medium text-muted">{PLAN.period}</span></p>
              <ul className="mt-7 grid gap-3 text-left text-[15px]">
                {PLAN.includes.map((t) => <li key={t} className="flex gap-3"><Check size={18} aria-hidden className="mt-0.5 flex-none" /><span className="text-muted">{t}</span></li>)}
              </ul>
              <a href="#download" className={`${btnPrimary} mt-8 w-full`} data-track="product_download" data-track-label="clipstack_plan_download">{PLAN.cta}<ArrowRight size={16} aria-hidden /></a>
              <p className="mt-3 text-[13px] text-muted">{PLAN.note}</p>
            </Card>
          </div>
        </section>

        {/* ── 7 Download ── */}
        <section id="download" className={`${section} scroll-mt-16`}>
          <div className={wrap}>
            <Head eyebrow={DOWNLOAD.eyebrow} h2={DOWNLOAD.h2} lead={DOWNLOAD.lead} />
            <Card className="mx-auto max-w-[680px] p-7">
              <DownloadForm version={feed.version} />
            </Card>
          </div>
        </section>

        {/* ── 8 FAQ ── */}
        <section id="faq" className={`${section} scroll-mt-16`}>
          <div className={wrap}>
            <Head eyebrow="FAQ" h2="Questions people ask." />
            <div className="mx-auto max-w-[760px]">
              {FAQS.map((f, i) => (
                <details key={f.id} id={f.id} open={i === 0} className="cs-glass my-3 scroll-mt-20 rounded-[16px] px-6 py-1 transition-transform active:scale-[0.995]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-semibold">{f.question}</summary>
                  <div className="pb-4 text-[15px] leading-relaxed text-muted [&_ol]:mb-3.5 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_p]:mb-3.5 [&_strong]:text-fg">{f.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9 Have a problem like this? ── */}
        <section id="contact" className={`${section} scroll-mt-16`}>
          <div className={wrap}>
            <Head eyebrow={REQUEST.eyebrow} h2={REQUEST.h2} lead={REQUEST.lead} />
            <Card className="mx-auto max-w-[680px] p-7"><RequestForm /></Card>
          </div>
        </section>

        {/* ── Bookend ── */}
        <section className="pt-8 pb-20 text-center">
          <div className={wrap}>
            <Orb size={80} height={260} rings={[150, 250, 370, 500]} />
            <h2 className="-mt-4 text-[clamp(28px,3.6vw,40px)] font-bold leading-[1.1] tracking-[-0.02em]">Get ClipStack for your Mac.</h2>
            <p className="mx-auto mt-3 max-w-[48ch] text-[16px] text-muted">Free, private, and one shortcut away. Version {feed.version}, about {feed.sizeMB} MB.</p>
            <div className="mt-8"><CopyPasteScene compact /></div>
            <div className="mt-6 flex justify-center"><a href="#download" className={btnPrimary} data-track="product_download" data-track-label="clipstack_bookend_download">Download for Mac<ArrowRight size={16} aria-hidden /></a></div>
          </div>
        </section>
      </main>

      <footer className="cs-glass-soft rounded-t-[24px] py-8 text-[13px] text-muted">
        <div className={`${wrap} flex flex-wrap items-center justify-between gap-x-6 gap-y-3`}>
          <span>{FOOTER}</span>
          <nav aria-label="Footer" className="flex flex-wrap gap-4">
            {NAV.slice(0, 4).map((l) => <a key={l.href} href={l.href} className="no-underline hover:text-fg">{l.label}</a>)}
            <Link href="/products" className="no-underline hover:text-fg">All products</Link>
            <Link href="/" className="no-underline hover:text-fg">← arjun-basnet.com.np</Link>
            <a href="#top" className="no-underline hover:text-fg">Back to top</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

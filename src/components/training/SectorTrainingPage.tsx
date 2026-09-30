import type { Metadata } from "next";
import { Check, ShieldCheck } from "lucide-react";
import type { TrainingSector } from "@/content/training/types";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema, webPageSchema, standaloneServiceSchema } from "@/lib/schema";
import { TRAINING_HUB_ROUTE } from "@/content/training/hub";
import { courseName, courseRoute, getCourse, COURSES_HUB_ROUTE } from "@/content/courses/index";
import { getService } from "@/content/services/index";
import { getAllPostMeta } from "@/content/blog/index";
import JsonLd from "@/components/seo/JsonLd";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import CTA from "@/components/ui/CTA";
import AnimateIn from "@/components/ui/AnimateIn";
import FaqAccordion from "@/components/seo/FaqAccordion";
import AnswerSection from "@/components/seo/AnswerSection";
import LearningHero from "./LearningHero";
import PhotoFigure from "./PhotoFigure";
import { EvidenceBand, RelatedResources, type ResourceLink } from "./Sections";

export const ENQUIRY_HREF = "/contact?service=ai-training";

export function sectorMetadata(sector: TrainingSector): Metadata {
  return buildMetadata({
    title: sector.title,
    description: sector.description,
    path: sector.route,
    keywords: sector.keywords,
    titleAbsolute: true,
  });
}

/**
 * The shared template for every /ai-training-<sector>-nepal page (guide §32).
 *
 * Structure is fixed; every word inside it comes from the sector's content
 * file, so two sectors can never render the same paragraph. Sections the
 * guide lists but which have no real material yet — case studies and
 * testimonials (§12–13) — are omitted rather than filled (§34).
 */
export default function SectorTrainingPage({ sector }: { sector: TrainingSector }) {
  const trail = [
    { name: "Home", path: "/" },
    { name: "AI Training in Nepal", path: TRAINING_HUB_ROUTE },
    { name: sector.name, path: sector.route },
  ];

  const posts = sector.relatedPosts
    .map((slug) => getAllPostMeta().find((p) => p.slug === slug))
    .filter((p) => p !== undefined);

  const links: ResourceLink[] = [
    { kind: "training", href: TRAINING_HUB_ROUTE, title: "AI training in Nepal", description: "All sector programmes, formats and how training is scoped." },
    ...sector.relatedCourses.map((slug): ResourceLink => {
      const live = getCourse(slug);
      return {
        kind: "course",
        href: live ? courseRoute(slug) : COURSES_HUB_ROUTE,
        title: `${courseName(slug)} course`,
        description: live ? live.tagline : "Part of the AI courses pathway for individual learners.",
      };
    }),
    ...sector.relatedServices.map((slug): ResourceLink => ({
      kind: "consultation",
      href: `/services/${slug}`,
      title: getService(slug)?.name ?? slug,
      description: getService(slug)?.tagline ?? "",
    })),
    { kind: "automation", href: "/services/ai-automation", title: "AI automation services", description: "When a task should be automated rather than trained." },
    { kind: "trainer", href: "/ai-trainer-nepal", title: "About the AI trainer", description: "Background, teaching approach and session formats." },
  ];

  return (
    <>
      <JsonLd
        id="ld-sector-page"
        data={webPageSchema({
          name: sector.title,
          description: sector.description,
          path: sector.route,
          datePublished: sector.publishedAt,
          dateModified: sector.updatedAt,
          speakable: [".answer-lead"],
        })}
      />
      <JsonLd
        id="ld-sector-service"
        data={standaloneServiceSchema({
          path: sector.route,
          name: sector.heading,
          serviceType: "AI Training",
          description: sector.description,
          audience: sector.audiences.map((a) => a.title),
        })}
      />
      <JsonLd id="ld-sector-faq" data={faqPageSchema([sector.primaryAnswer, ...sector.answers, ...sector.faqs])} />
      <JsonLd id="ld-sector-breadcrumb" data={breadcrumbSchema(trail)} />

      <LearningHero
        trail={trail}
        eyebrow={sector.eyebrow}
        heading={sector.heading}
        intro={sector.intro}
        image={sector.hero.image}
        primary={{ label: sector.cta.label, href: ENQUIRY_HREF, trackLabel: `sector_${sector.slug}_hero` }}
        secondary={{ label: "See the curriculum", href: "#curriculum" }}
        chips={sector.formats.slice(0, 2).map((f) => `${f.title} · ${f.duration}`)}
        facts={["No technical background needed", "Nepali or English", "Built on your own tasks", "Responsible use in every session"]}
      />

      {/* Answer-first */}
      <Section border="top" size="lg" width="reading">
        <AnswerSection block={sector.primaryAnswer} level={2} />
      </Section>

      {/* 01 — Why */}
      <Section border="top" size="lg" bg="surface">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 [&>*]:min-w-0">
          <AnimateIn>
            <Eyebrow className="mb-4">01 · Why it matters</Eyebrow>
            <Heading level={2} size="lg" className="mb-6">Why {sector.name.toLowerCase()} need AI training now</Heading>
            <div className="space-y-4 leading-relaxed text-muted">
              {sector.why.map((p) => <p key={p}>{p}</p>)}
            </div>
            <blockquote className="mt-8 border-l-4 border-primary pl-5 text-xl font-semibold leading-snug text-fg">
              {sector.keyMessage}
            </blockquote>
          </AnimateIn>
          {sector.gallery[0] && (
            <AnimateIn delay={0.1}>
              <PhotoFigure image={sector.gallery[0].image} caption={sector.gallery[0].caption} sizes="(min-width: 1024px) 30rem, 92vw" aspect="aspect-[4/5] lg:aspect-[4/5]" />
            </AnimateIn>
          )}
        </div>
      </Section>

      {/* 02–03 — Use cases */}
      <Section border="top" size="lg">
        <AnimateIn>
          <Eyebrow className="mb-4">02 · Practical use cases</Eyebrow>
          <Heading level={2} size="lg" className="mb-4 max-w-2xl">How AI is actually used in {sector.name.toLowerCase()}</Heading>
          <p className="mb-12 max-w-2xl leading-relaxed text-muted">Every use case below is practised in the training, on real material, and every one ends with a person checking the result.</p>
        </AnimateIn>
        <div className="space-y-12">
          {sector.useCaseGroups.map((group) => (
            <div key={group.audience}>
              <AnimateIn>
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-label text-primary">{group.audience}</h3>
              </AnimateIn>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {group.items.map((u, i) => (
                  <AnimateIn key={u.title} delay={(i % 4) * 0.05}>
                    <Card padding="lg" className="h-full">
                      <span aria-hidden className="mb-4 block h-1.5 w-10 rounded-full bg-brand" />
                      <h4 className="mb-2 font-bold text-fg">{u.title}</h4>
                      <p className="text-sm leading-relaxed text-muted">{u.description}</p>
                    </Card>
                  </AnimateIn>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 04 — Outcomes, with the second photo */}
      <Section border="top" size="lg" bg="surface">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 [&>*]:min-w-0">
          {sector.gallery[1] && (
            <AnimateIn>
              <PhotoFigure image={sector.gallery[1].image} caption={sector.gallery[1].caption} sizes="(min-width: 1024px) 30rem, 92vw" aspect="aspect-[4/3]" />
            </AnimateIn>
          )}
          <AnimateIn delay={0.1}>
            <Eyebrow className="mb-4">03 · What participants learn</Eyebrow>
            <Heading level={2} size="lg" className="mb-8">By the end of the training, participants can…</Heading>
            <ul className="space-y-4">
              {sector.outcomes.map((o) => (
                <li key={o} className="flex gap-3 leading-relaxed text-fg">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-white"><Check size={14} aria-hidden /></span>
                  {o}
                </li>
              ))}
            </ul>
          </AnimateIn>
        </div>
      </Section>

      {/* 05 — Curriculum */}
      <Section border="top" size="lg" id="curriculum" className="scroll-mt-20">
        <AnimateIn>
          <Eyebrow className="mb-4">04 · Training curriculum</Eyebrow>
          <Heading level={2} size="lg" className="mb-4 max-w-2xl">A starting curriculum, adapted to your {sector.unit}</Heading>
          <p className="mb-12 max-w-2xl leading-relaxed text-muted">Modules are selected and re-ordered after the scoping call. A 90-minute seminar covers the first module well; a full programme covers all of them.</p>
        </AnimateIn>
        <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sector.curriculum.map((m, i) => (
            <li key={m.title}>
              <AnimateIn delay={(i % 3) * 0.05} className="h-full">
              <div className="glass flex h-full flex-col rounded-card p-6">
                <p className="mb-3 bg-brand bg-clip-text font-display text-4xl font-extrabold text-transparent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mb-2 font-bold text-fg">{m.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted">{m.summary}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5">
                  {m.topics.map((t) => (
                    <li key={t} className="rounded-pill border border-border bg-white/70 px-2.5 py-1 text-xs text-muted">{t}</li>
                  ))}
                </ul>
              </div>
              </AnimateIn>
            </li>
          ))}
        </ol>
      </Section>

      {/* 06 — Who it's for */}
      <Section border="top" size="lg" bg="surface">
        <AnimateIn>
          <Eyebrow className="mb-4">05 · Who the training is for</Eyebrow>
          <Heading level={2} size="lg" className="mb-12 max-w-2xl">Built for everyone who shapes how AI is used</Heading>
        </AnimateIn>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sector.audiences.map((a, i) => (
            <AnimateIn key={a.title} delay={(i % 3) * 0.05}>
              <div className="flex h-full flex-col rounded-card border border-border bg-bg p-6">
                <h3 className="mb-1.5 font-bold text-fg">{a.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{a.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Section>

      {/* 07 — Responsible AI */}
      <Section border="top" size="lg">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 [&>*]:min-w-0">
          <AnimateIn>
            <Eyebrow className="mb-4">06 · Responsible AI</Eyebrow>
            <Heading level={2} size="lg" className="mb-4">Responsible AI and data, specific to {sector.name.toLowerCase()}</Heading>
            <p className="leading-relaxed text-muted">Covered in every session, whatever the format. These are the rules that prevent real damage, so they are practised, not just read out.</p>
          </AnimateIn>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sector.responsible.map((r, i) => (
              <AnimateIn key={r.title} delay={(i % 2) * 0.05}>
                <div className="flex h-full gap-4 rounded-card border border-border bg-surface p-5">
                  <ShieldCheck size={22} aria-hidden className="shrink-0 text-primary" />
                  <div>
                    <h3 className="mb-1 font-bold text-fg">{r.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{r.description}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </Section>

      {/* 08 — Formats */}
      <Section border="top" size="lg" bg="surface">
        <AnimateIn>
          <Eyebrow className="mb-4">07 · Training formats</Eyebrow>
          <Heading level={2} size="lg" className="mb-12 max-w-2xl">Choose the format that fits your timetable</Heading>
        </AnimateIn>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sector.formats.map((f, i) => (
            <AnimateIn key={f.id} delay={(i % 4) * 0.05}>
              <Card padding="lg" className="flex h-full flex-col">
                <span className="mb-4 self-start rounded-pill bg-brand px-3 py-1 text-xs font-semibold text-white">{f.duration}</span>
                <h3 className="mb-2 font-bold text-fg">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{f.description}</p>
              </Card>
            </AnimateIn>
          ))}
        </div>
      </Section>

      {/* 09 — How it works */}
      <Section border="top" size="lg">
        <AnimateIn>
          <Eyebrow className="mb-4">08 · How the training works</Eyebrow>
          <Heading level={2} size="lg" className="mb-12 max-w-2xl">From first call to a working policy</Heading>
        </AnimateIn>
        <ol className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {sector.process.map((s) => (
            <li key={s.step}>
              <AnimateIn delay={s.step * 0.04} className="h-full">
              <div className="border-t-2 border-primary pt-4">
                <p className="mb-1 font-display text-2xl font-extrabold text-primary">{String(s.step).padStart(2, "0")}</p>
                <h3 className="mb-1.5 font-bold text-fg">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{s.description}</p>
              </div>
              </AnimateIn>
            </li>
          ))}
        </ol>
      </Section>

      {/* Remaining answers */}
      <Section border="top" size="lg" width="reading" bg="surface">
        <AnimateIn>
          <Eyebrow className="mb-4">Straight answers</Eyebrow>
          <Heading level={2} size="lg" className="mb-12">The questions {sector.name.toLowerCase()} ask first</Heading>
        </AnimateIn>
        <div className="space-y-14">
          {sector.answers.map((b) => <AnswerSection key={b.id} block={b} level={3} />)}
        </div>
      </Section>

      {/* 10–11 — Why Arjun, evidence */}
      <EvidenceBand
        items={sector.evidence}
        heading="Experience in education, technology and AI, not only slides."
        body="Nepali classrooms, Nepali-language content and low-bandwidth schools are not theory here: they are what the platforms below were built for. Every claim links to the page that evidences it."
      />

      <RelatedResources links={links} posts={posts} />

      {/* 15 — FAQ */}
      <Section border="top" size="lg" width="reading">
        <AnimateIn>
          <Eyebrow className="mb-4">FAQ</Eyebrow>
          <Heading level={2} size="lg" className="mb-10">AI training for {sector.name.toLowerCase()}: frequently asked questions</Heading>
        </AnimateIn>
        <FaqAccordion items={sector.faqs} />
      </Section>

      {/* 16 — CTA */}
      <Section border="top" size="lg">
        <CTA variant="card" title={sector.cta.title} body={sector.cta.body} primary={{ label: sector.cta.label, href: ENQUIRY_HREF }} context={sector.route} />
      </Section>
    </>
  );
}

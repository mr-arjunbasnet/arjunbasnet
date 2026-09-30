import type { Route } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Building2, BookOpen, Compass, Workflow } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema, webPageSchema, standaloneServiceSchema, itemListSchema } from "@/lib/schema";
import {
  TRAINING_HUB_ROUTE,
  TRAINING_HUB_META,
  TRAINING_HUB_PRIMARY_ANSWER,
  TRAINING_HUB_ANSWERS,
  TRAINING_HUB_FAQS,
  HUB_AUDIENCES,
  HUB_FORMATS,
  HUB_USE_CASES,
  HUB_RESPONSIBLE,
  HUB_PROCESS,
  HUB_EVIDENCE,
} from "@/content/training/hub";
import { SECTORS, PLANNED_SECTORS } from "@/content/training/sectors/index";
import { COURSES_HUB_ROUTE } from "@/content/courses/index";
import { SEMINAR_NOTES, TEAM_WORKSHOP } from "@/content/training/images";
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
import LearningHero from "@/components/training/LearningHero";
import LearningPath from "@/components/training/LearningPath";
import PhotoFigure from "@/components/training/PhotoFigure";
import { EvidenceBand, RelatedResources } from "@/components/training/Sections";
import { ENQUIRY_HREF } from "@/components/training/SectorTrainingPage";

export const metadata = buildMetadata({
  title: TRAINING_HUB_META.title,
  description: TRAINING_HUB_META.description,
  path: TRAINING_HUB_ROUTE,
  keywords: [...TRAINING_HUB_META.keywords],
  titleAbsolute: true,
});

/** §5 — the four offers, side by side, so a visitor can pick the right door. */
const OFFERS = [
  { icon: Building2, title: "AI training", who: "For organisations and teams", body: "Your people learn together, on your tasks and under your data rules.", href: "#sectors", cta: "Choose a sector" },
  { icon: BookOpen, title: "AI courses", who: "For individual learners", body: "A fixed curriculum from beginner to advanced, finished with a project.", href: COURSES_HUB_ROUTE, cta: "Explore AI courses" },
  { icon: Compass, title: "AI consultation", who: "Before deciding anything", body: "Where AI fits in your organisation, written up as a plan.", href: "/services/it-consulting", cta: "Request an AI consultation" },
  { icon: Workflow, title: "AI automation", who: "When a task should run itself", body: "Workflows built on tools such as n8n that remove repetitive work.", href: "/services/ai-automation", cta: "Discuss AI automation" },
] as const;

/**
 * /ai-training-nepal — hub for organisation-facing AI training (guide §6).
 *
 * Routes visitors to a sector page, a course, consultation or automation.
 * /ai-trainer-nepal stays the page about the trainer; the two cross-link and
 * answer different questions (see src/content/training/hub.ts).
 */
export default function AiTrainingNepal() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "AI Training in Nepal", path: TRAINING_HUB_ROUTE },
  ];
  const posts = ["introduce-ai-to-your-team", "ai-training-syllabus-nepal", "ai-tools-small-business-nepal"]
    .map((slug) => getAllPostMeta().find((p) => p.slug === slug))
    .filter((p) => p !== undefined);

  return (
    <>
      <JsonLd
        id="ld-training-hub-page"
        data={webPageSchema({
          name: TRAINING_HUB_META.title,
          description: TRAINING_HUB_META.description,
          path: TRAINING_HUB_ROUTE,
          datePublished: "2026-09-22",
          dateModified: "2026-09-22",
          speakable: [".answer-lead"],
        })}
      />
      <JsonLd
        id="ld-training-hub-service"
        data={standaloneServiceSchema({
          path: TRAINING_HUB_ROUTE,
          name: "AI Training in Nepal",
          serviceType: "AI Training",
          description: TRAINING_HUB_META.description,
          audience: HUB_AUDIENCES.map((a) => a.title),
        })}
      />
      <JsonLd id="ld-training-hub-sectors" data={itemListSchema(SECTORS.map((s) => ({ name: s.heading, path: s.route, description: s.tagline })))} />
      <JsonLd id="ld-training-hub-faq" data={faqPageSchema([TRAINING_HUB_PRIMARY_ANSWER, ...TRAINING_HUB_ANSWERS, ...TRAINING_HUB_FAQS])} />
      <JsonLd id="ld-training-hub-breadcrumb" data={breadcrumbSchema(trail)} />

      <LearningHero
        trail={trail}
        eyebrow={TRAINING_HUB_META.eyebrow}
        heading={TRAINING_HUB_META.heading}
        intro={TRAINING_HUB_META.intro}
        image={TEAM_WORKSHOP}
        primary={{ label: "Request AI training", href: ENQUIRY_HREF, trackLabel: "training_hub_hero" }}
        secondary={{ label: "Find your sector", href: "#sectors" }}
        chips={["Seminars · workshops · programmes", "Nepali or English"]}
        facts={["Schools, colleges, companies, banks", "In person across Nepal or online", "Built on your own tasks", "Responsible use in every session"]}
      />

      <Section border="top" size="lg" width="reading">
        <AnswerSection block={TRAINING_HUB_PRIMARY_ANSWER} level={2} />
      </Section>

      {/* Industry-specific training */}
      <Section border="top" size="lg" bg="surface" id="sectors" className="scroll-mt-20">
        <AnimateIn>
          <Eyebrow className="mb-4">Industry-specific training</Eyebrow>
          <Heading level={2} size="lg" className="mb-4 max-w-2xl">AI training built for your sector</Heading>
          <p className="mb-12 max-w-2xl leading-relaxed text-muted">
            A school and a bank need very different examples and very different data rules. Each sector programme starts from its own tasks and risks.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {SECTORS.map((s, i) => (
            // An odd last card spans the row rather than leaving half of it empty.
            <AnimateIn key={s.slug} className={SECTORS.length % 2 === 1 && i === SECTORS.length - 1 ? "md:col-span-2" : undefined}>
              <Link href={s.route as Route} className="group glass grid h-full overflow-hidden rounded-[24px] sm:grid-cols-[1fr_1.1fr]">
                <PhotoFigure image={s.hero.image} sizes="(min-width: 768px) 22rem, 92vw" aspect="aspect-[4/3] sm:aspect-auto sm:h-full" className="[&_figcaption]:hidden [&>div]:h-full [&>div]:rounded-none" />
                <span className="flex flex-col justify-center p-6">
                  <span className="mb-2 text-xs font-semibold uppercase tracking-label text-primary">Sector programme</span>
                  <span className="mb-2 text-xl font-extrabold text-fg group-hover:text-primary">{s.heading}</span>
                  <span className="mb-4 text-sm leading-relaxed text-muted">{s.tagline}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    AI training for {s.name.toLowerCase()} <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            </AnimateIn>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PLANNED_SECTORS.map((s, i) => (
            <AnimateIn key={s.slug} delay={(i % 3) * 0.04}>
              <div className="flex h-full flex-col rounded-card border border-border bg-bg p-5">
                <h3 className="mb-1 font-bold text-fg">{s.name}</h3>
                <p className="mb-3 text-sm leading-relaxed text-muted">{s.tagline}</p>
                <p className="mt-auto text-xs font-medium text-primary">Available on request</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Section>

      {/* Who the training is for */}
      <Section border="top" size="lg">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 [&>*]:min-w-0">
          <AnimateIn>
            <PhotoFigure image={SEMINAR_NOTES} caption="A good session is mostly practice, not slides." sizes="(min-width: 1024px) 30rem, 92vw" aspect="aspect-[4/3]" />
          </AnimateIn>
          <div>
            <AnimateIn>
              <Eyebrow className="mb-4">Who the training is for</Eyebrow>
              <Heading level={2} size="lg" className="mb-8">Different teams need different AI training</Heading>
            </AnimateIn>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {HUB_AUDIENCES.map((a, i) => (
                <AnimateIn key={a.title} delay={(i % 2) * 0.05}>
                  <div className="h-full rounded-card border border-border bg-surface p-5">
                    <h3 className="mb-1 font-bold text-fg">{a.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{a.description}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Training vs courses vs consultation vs automation */}
      <Section border="top" size="lg" bg="surface">
        <AnimateIn>
          <Eyebrow className="mb-4">Find the right fit</Eyebrow>
          <Heading level={2} size="lg" className="mb-12 max-w-2xl">Training, courses, consultation or automation?</Heading>
        </AnimateIn>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERS.map((o, i) => (
            <AnimateIn key={o.title} delay={i * 0.05}>
              <Card padding="lg" className="flex h-full flex-col">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-brand text-white"><o.icon size={20} aria-hidden /></span>
                <p className="mb-1 text-xs font-semibold uppercase tracking-label text-primary">{o.who}</p>
                <h3 className="mb-2 text-lg font-bold text-fg">{o.title}</h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">{o.body}</p>
                <Link href={o.href as Route} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  {o.cta} <ArrowRight size={14} aria-hidden />
                </Link>
              </Card>
            </AnimateIn>
          ))}
        </div>
      </Section>

      {/* Formats: programmes, workshops, seminars */}
      <Section border="top" size="lg">
        <AnimateIn>
          <Eyebrow className="mb-4">Programmes, workshops and seminars</Eyebrow>
          <Heading level={2} size="lg" className="mb-12 max-w-2xl">Four ways to run AI training</Heading>
        </AnimateIn>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HUB_FORMATS.map((f, i) => (
            <AnimateIn key={f.id} delay={i * 0.05}>
              <Card padding="lg" className="flex h-full flex-col">
                <span className="mb-4 self-start rounded-pill bg-brand px-3 py-1 text-xs font-semibold text-white">{f.duration}</span>
                <h3 className="mb-2 font-bold text-fg">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{f.description}</p>
              </Card>
            </AnimateIn>
          ))}
        </div>
      </Section>

      {/* Practical use cases */}
      <Section border="top" size="lg" bg="surface">
        <AnimateIn>
          <Eyebrow className="mb-4">Practical AI use cases</Eyebrow>
          <Heading level={2} size="lg" className="mb-12 max-w-2xl">What people actually use AI for at work</Heading>
        </AnimateIn>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HUB_USE_CASES.map((u, i) => (
            <AnimateIn key={u.title} delay={(i % 3) * 0.05}>
              <div className="h-full rounded-card border border-border bg-bg p-6">
                <p className="mb-3 bg-brand bg-clip-text font-display text-3xl font-extrabold text-transparent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mb-1.5 font-bold text-fg">{u.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{u.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Section>

      {/* Responsible AI + process */}
      <Section border="top" size="lg">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16 [&>*]:min-w-0">
          <div>
            <AnimateIn>
              <Eyebrow className="mb-4">Responsible AI</Eyebrow>
              <Heading level={2} size="lg" className="mb-8">Covered in every session</Heading>
            </AnimateIn>
            <div className="space-y-3">
              {HUB_RESPONSIBLE.map((r, i) => (
                <AnimateIn key={r.title} delay={i * 0.04}>
                  <div className="flex gap-4 rounded-card border border-border bg-surface p-5">
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
          <div>
            <AnimateIn>
              <Eyebrow className="mb-4">How it works</Eyebrow>
              <Heading level={2} size="lg" className="mb-8">Four steps, starting with a call</Heading>
            </AnimateIn>
            <ol className="relative space-y-6 border-l-2 border-border pl-8">
              {HUB_PROCESS.map((s) => (
                <li key={s.step} className="relative">
                  <AnimateIn delay={s.step * 0.04}>
                    <span aria-hidden className="absolute top-0 -left-[2.95rem] grid h-7 w-7 place-items-center rounded-full bg-brand text-xs font-bold text-white">{s.step}</span>
                    <h3 className="mb-1 font-bold text-fg">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{s.description}</p>
                  </AnimateIn>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section border="top" size="lg" width="reading" bg="surface">
        <AnimateIn>
          <Eyebrow className="mb-4">Straight answers</Eyebrow>
          <Heading level={2} size="lg" className="mb-12">Before you book</Heading>
        </AnimateIn>
        <div className="space-y-14">
          {TRAINING_HUB_ANSWERS.map((b) => <AnswerSection key={b.id} block={b} level={3} />)}
        </div>
      </Section>

      <EvidenceBand
        items={HUB_EVIDENCE}
        heading="A practitioner who teaches, not a training catalogue."
        body="The examples in every session come from systems that run in production and platforms built for Nepali schools. Every claim below links to its evidence."
      />

      {/* Courses teaser */}
      <Section size="lg">
        <AnimateIn>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow className="mb-4">Learning on your own?</Eyebrow>
              <Heading level={2} size="lg" className="max-w-2xl">AI courses for individual learners</Heading>
            </div>
            <Link href={COURSES_HUB_ROUTE as Route} className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
              Explore AI courses in Nepal <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </AnimateIn>
        <AnimateIn>
          <LearningPath />
        </AnimateIn>
      </Section>

      <RelatedResources
        heading="Related services and reading"
        posts={posts}
        links={[
          { kind: "trainer", href: "/ai-trainer-nepal", title: "About the AI trainer in Nepal", description: "Background, teaching approach and session formats." },
          { kind: "consultation", href: "/services/it-consulting", title: "AI consultation", description: "Where AI belongs in your organisation, before any training." },
          { kind: "automation", href: "/services/ai-automation", title: "AI automation services", description: "When the answer is a workflow rather than a workshop." },
        ]}
      />

      <Section border="top" size="lg" width="reading">
        <AnimateIn>
          <Eyebrow className="mb-4">FAQ</Eyebrow>
          <Heading level={2} size="lg" className="mb-10">AI training in Nepal: frequently asked questions</Heading>
        </AnimateIn>
        <FaqAccordion items={TRAINING_HUB_FAQS} />
      </Section>

      <Section border="top" size="lg">
        <CTA
          variant="card"
          title="Request AI training"
          body="Tell me who the training is for, roughly how many people, and what you want them to be able to do afterwards. I'll reply with a suggested format and a draft outline."
          primary={{ label: "Request AI training", href: ENQUIRY_HREF }}
          context={TRAINING_HUB_ROUTE}
        />
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  Users,
  Presentation,
  Monitor,
  GraduationCap,
  BookOpen,
  Briefcase,
  Building2,
  Landmark,
  Megaphone,
  Layers,
  User,
  ClipboardList,
  Search,
  Code,
  PenLine,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { publicFileExists } from "@/lib/media";
import { SITE } from "@/content/site";
import {
  AI_TRAINER_META,
  AI_TRAINER_ROUTE,
  AI_TRAINER_PRIMARY_ANSWER,
  AI_TRAINER_ANSWERS,
  AI_TRAINER_FAQS,
  CREDIBILITY,
  TEACHING_AREAS,
  AUDIENCES,
  APPLICATIONS,
  TRAINING_PROCESS,
  TRAINING_FORMATS,
  CREDENTIALS,
  TRAINING_TOPICS,
  WHY_TRAIN,
} from "@/content/ai-trainer/index";
import { getAllPostMeta } from "@/content/blog/index";
import { breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CTA from "@/components/ui/CTA";
import AnimateIn from "@/components/ui/AnimateIn";
import FaqAccordion from "@/components/seo/FaqAccordion";
import AnswerSection from "@/components/seo/AnswerSection";
import Headshot from "@/components/ui/Headshot";
import StickyCta from "@/components/ai-trainer/StickyCta";
import {
  HeroSlideCard,
  HeroAudienceCard,
  WorkflowDiagram,
  JourneyDiagram,
  RoomScene,
  TeachingScene,
} from "@/components/ai-trainer/AiTrainerArt";

export const metadata: Metadata = buildMetadata({
  title: AI_TRAINER_META.title,
  description: AI_TRAINER_META.description,
  path: AI_TRAINER_ROUTE,
  keywords: [...AI_TRAINER_META.keywords],
});

const SPEAKING_PHOTO = "/media/ai-trainer/arjun-speaking.jpg";
const PORTRAIT_PHOTO = "/media/ai-trainer/arjun-portrait.jpg";

/* Icon maps — explicit, never dynamic, same rule as ServiceIcon. */
const AUDIENCE_ICON: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  students: GraduationCap,
  educators: BookOpen,
  professionals: Briefcase,
  corporate: Users,
  institutions: Landmark,
  organisations: Building2,
};
const FORMAT_ICON: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  workshop: Presentation,
  seminar: Megaphone,
  programme: Layers,
  corporate: Building2,
  "one-to-one": User,
  online: Monitor,
};
const APPLICATION_ICON: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  education: GraduationCap,
  marketing: Megaphone,
  operations: ClipboardList,
  research: Search,
  software: Code,
  content: PenLine,
};

/**
 * /ai-trainer-nepal — the AI training pillar page.
 *
 * Built from docs/reference/ai-trainer-nepal-ready-to-build.md. Copy lives in
 * src/content/ai-trainer/, never here.
 *
 * Visual approach: §3 wants an image-heavy, editorial page. §23 wants real
 * photographs first and rules out stock imagery and generated portraits. Only
 * one photograph exists in the repo, so every section carries a drawn scene
 * in the grammar /services already ships (AiTrainerArt.tsx), the real
 * headshot is used at full size twice, and each photo slot upgrades itself at
 * build time when its file lands (src/lib/media.ts).
 *
 * The URL carries a geo modifier, which the nine service pages deliberately
 * avoid. This is a top-level pillar and the spec names the URL; followed as
 * written.
 */
export default function AiTrainerNepal() {
  const hasSpeaking = publicFileExists(SPEAKING_PHOTO);
  const hasPortrait = publicFileExists(PORTRAIT_PHOTO);

  const aiPosts = getAllPostMeta()
    .filter((p) => p.cluster === "ai-training" || p.cluster === "ai-automation")
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: AI_TRAINER_META.title,
          description: AI_TRAINER_META.description,
          path: AI_TRAINER_ROUTE,
        })}
        id="ld-ai-trainer-page"
      />
      <JsonLd
        data={faqPageSchema([AI_TRAINER_PRIMARY_ANSWER, ...AI_TRAINER_ANSWERS, ...AI_TRAINER_FAQS])}
        id="ld-ai-trainer-faq"
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "AI Trainer in Nepal", path: AI_TRAINER_ROUTE },
        ])}
        id="ld-ai-trainer-breadcrumb"
      />

      {/* ─── §5 Hero ───
          Nothing above the fold is wrapped in AnimateIn — it starts at
          opacity 0 and waits for hydration, which cost the homepage 4.9s of
          mobile render delay once already. The floating cards animate in CSS
          and paint with the document. */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
            <div>
              <Eyebrow className="mb-5">{AI_TRAINER_META.eyebrow}</Eyebrow>

              {/* §25: 64–80px desktop, 48–60 tablet, 40–48 mobile. */}
              <Heading
                level={1}
                className="mb-6 text-[2.5rem] leading-[1.02] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem]"
              >
                {AI_TRAINER_META.heading}
              </Heading>

              <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted">
                {AI_TRAINER_META.supporting}
              </p>

              <div className="mb-8 flex flex-wrap gap-3">
                <Button href="/contact" size="lg" icon={<ArrowRight size={16} />}>
                  Book AI training
                </Button>
                <Button href="/contact" size="lg" variant="secondary">
                  Invite me for a workshop
                </Button>
              </div>

              <p className="flex items-center gap-2 text-sm text-muted">
                <MapPin size={14} aria-hidden />
                {AI_TRAINER_META.locationLine}
              </p>
            </div>

            {/* Portrait frame with two floating workshop moments (§5's
                "optional smaller floating image"). The cutout's white outline
                was made for a blue ground, which is why the frame is primary. */}
            <div className="relative px-6 pt-8 pb-6 sm:px-10">
              <div className="relative overflow-hidden rounded-[24px] bg-brand">
                {hasSpeaking ? (
                  <Image
                    src={SPEAKING_PHOTO}
                    alt="Arjun Basnet delivering an AI and technology session at the Meet Program 2022 in Nepal"
                    width={2048}
                    height={1365}
                    priority
                    sizes="(min-width: 1024px) 34rem, 92vw"
                    className="h-auto w-full object-cover"
                  />
                ) : (
                  <div className="px-8 pt-10 sm:px-12">
                    <Headshot priority sizes="(min-width: 1024px) 28rem, 70vw" />
                  </div>
                )}
              </div>
              <div className="ab-float absolute bottom-0 left-0 w-44 drop-shadow-lg sm:w-52">
                <HeroSlideCard />
              </div>
              <div className="ab-float ab-d2 absolute top-0 right-0 w-36 drop-shadow-lg sm:w-40">
                <HeroAudienceCard />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── §6 Trust strip ─── */}
      <Section border="y" size="sm" bg="surface">
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
          {CREDIBILITY.map((item) => (
            <div key={item.label}>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-label text-muted">
                {item.label}
              </p>
              <p className="font-display text-lg leading-snug text-fg md:text-xl">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── §21 Answer-first ─── */}
      <Section size="lg" width="reading">
        <AnswerSection block={AI_TRAINER_PRIMARY_ANSWER} level={2} />
      </Section>

      {/* ─── §7 Personal introduction — media left, text right ─── */}
      <Section border="top" size="lg" bg="surface">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <AnimateIn>
            {hasPortrait ? (
              <figure>
                <Image
                  src={PORTRAIT_PHOTO}
                  alt="Arjun Basnet, AI trainer and educator based in Kathmandu, Nepal"
                  width={1512}
                  height={2016}
                  sizes="(min-width: 1024px) 36rem, 90vw"
                  className="h-auto w-full rounded-[24px] object-cover"
                />
                <figcaption className="mt-3 text-sm text-muted">
                  Kathmandu, Nepal. Teaching technology through practical examples.
                </figcaption>
              </figure>
            ) : (
              /* §7 asks for "Arjun speaking, audience visible in background".
                 The drawn room is that composition until the photograph exists. */
              <figure>
                <div className="rounded-[24px] border border-border bg-bg p-4 sm:p-6">
                  <RoomScene />
                </div>
                <figcaption className="mt-3 text-sm text-muted">
                  Teaching technology through practical examples.
                </figcaption>
              </figure>
            )}
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <Eyebrow className="mb-4">Meet your AI trainer</Eyebrow>
            <Heading level={2} size="lg" className="mb-6">
              AI is easier to learn when it is connected to real work.
            </Heading>
            <div className="space-y-4 leading-relaxed text-muted">
              <p>
                I&rsquo;m Arjun Basnet, an AI trainer and educator based in{" "}
                {SITE.address.locality}, Nepal. My background combines computer
                science, project delivery, software development, AI automation
                and published research.
              </p>
              <p>
                I don&rsquo;t treat AI training as a list of tools to memorise.
                Tools change every few months. What lasts is knowing how to
                identify a problem, choose an approach, use the technology
                properly, and check the result before acting on it.
              </p>
            </div>
            <p className="mt-8">
              <Link href="/about" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
                More about Arjun
                <ArrowRight size={15} aria-hidden />
              </Link>
            </p>
          </AnimateIn>
        </div>
      </Section>

      {/* ─── §8 What I teach — the /services card pattern, art above text ─── */}
      <Section border="top" size="lg">
        <AnimateIn>
          <Eyebrow className="mb-4">What I teach</Eyebrow>
          <Heading level={2} size="lg" className="mb-4 max-w-2xl">
            From understanding AI to actually using it.
          </Heading>
          <p className="mb-12 max-w-2xl leading-relaxed text-muted">
            Eight areas, mixed to suit the audience. A half-day workshop does
            three of them properly rather than eight badly.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEACHING_AREAS.map((area, i) => (
            <AnimateIn key={area.id} delay={(i % 4) * 0.05}>
              <Card padding="none" className="flex h-full flex-col overflow-hidden">
                <div className="border-b border-border bg-surface">
                  <TeachingScene id={area.id} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-label text-primary">
                    {area.label}
                  </p>
                  <h3 className="mb-2 font-semibold text-fg">{area.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted">
                    {area.description}
                  </p>
                  {area.href && (
                    <p className="mt-4">
                      <Link href={area.href as Route} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                        Learn more
                        <ArrowRight size={14} aria-hidden />
                      </Link>
                    </p>
                  )}
                </div>
              </Card>
            </AnimateIn>
          ))}
        </div>
      </Section>

      {/* ─── §9 Audiences — icon tiles ─── */}
      <Section border="top" size="lg" bg="surface">
        <AnimateIn>
          <Eyebrow className="mb-4">Who it&rsquo;s for</Eyebrow>
          <Heading level={2} size="lg" className="mb-12 max-w-2xl">
            Different people need different kinds of AI training.
          </Heading>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((a, i) => {
            const Icon = AUDIENCE_ICON[a.id] ?? Users;
            return (
              <AnimateIn key={a.id} delay={(i % 3) * 0.06}>
                <div className="flex h-full gap-5 rounded-card border border-border bg-bg p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={22} aria-hidden />
                  </div>
                  <div>
                    <h3 className="mb-1.5 font-semibold text-fg">{a.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{a.description}</p>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </Section>

      {/* ─── §10 Real-world applications — statement + the named diagram ─── */}
      <Section border="top" size="lg">
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="mb-4">AI in the real world</Eyebrow>
            <Heading level={2} size="xl" className="mb-5">
              The question isn&rsquo;t &ldquo;can AI do it?&rdquo;
            </Heading>
            <p className="text-xl leading-snug text-fg md:text-2xl">
              The better question is: can it do the job{" "}
              <span className="text-primary">reliably enough</span> to be worth
              handing over?
            </p>
          </div>
        </AnimateIn>

        <AnimateIn>
          <div className="mx-auto mt-14 max-w-4xl">
            <WorkflowDiagram />
            <div className="mt-2 grid grid-cols-4 gap-2 text-center">
              {["Prompt", "Model", "Output", "Verify"].map((label, i) => (
                <div key={label}>
                  <p className="text-sm font-semibold text-fg">{label}</p>
                  <p className="text-xs text-muted">
                    {["what you ask", "what it does", "what comes back", "what you check"][i]}
                  </p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-muted">
              Every session comes back to this loop. The fourth step is the one
              most people skip, and it is the one that prevents damage.
            </p>
          </div>
        </AnimateIn>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {APPLICATIONS.map((app, i) => {
            const Icon = APPLICATION_ICON[app.id] ?? Search;
            return (
              <AnimateIn key={app.id} delay={(i % 6) * 0.04}>
                <div className="flex h-full flex-col gap-3 rounded-card border border-border bg-surface p-4">
                  <Icon size={20} aria-hidden className="text-primary" />
                  <h3 className="text-sm font-semibold text-fg">{app.title}</h3>
                  <p className="text-xs leading-relaxed text-muted">{app.description}</p>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </Section>

      {/* ─── §11 How training works — the journey ─── */}
      <Section border="top" size="lg" bg="surface">
        <AnimateIn>
          <Eyebrow className="mb-4">How it runs</Eyebrow>
          <Heading level={2} size="lg" className="mb-12 max-w-2xl">
            Learn by doing, not just listening.
          </Heading>
        </AnimateIn>

        <AnimateIn>
          <div className="hidden md:block">
            <JourneyDiagram />
          </div>
          <div className="grid grid-cols-1 gap-8 md:mt-4 md:grid-cols-4">
            {TRAINING_PROCESS.map((step) => (
              <div key={step.step} className="border-t-2 border-primary pt-4 md:border-t-0 md:pt-0 md:text-center">
                <p className="mb-1 font-display text-2xl text-primary md:hidden">
                  {String(step.step).padStart(2, "0")}
                </p>
                <h3 className="mb-1.5 font-semibold text-fg">
                  <span className="hidden md:inline text-primary">{String(step.step).padStart(2, "0")} · </span>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">
            Sessions can include demonstrations, practical exercises, prompt
            examples, tool comparisons, workflow walkthroughs, business use
            cases and open Q&amp;A.
          </p>
        </AnimateIn>
      </Section>

      {/* ─── §12 Formats — visually distinct cards ─── */}
      <Section border="top" size="lg">
        <AnimateIn>
          <Eyebrow className="mb-4">Formats</Eyebrow>
          <Heading level={2} size="lg" className="mb-12 max-w-2xl">
            Six ways a session can be delivered.
          </Heading>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRAINING_FORMATS.map((f, i) => {
            const Icon = FORMAT_ICON[f.id] ?? Presentation;
            return (
              <AnimateIn key={f.id} delay={(i % 3) * 0.06}>
                <Card padding="lg" className="flex h-full flex-col">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-fg">
                      <Icon size={20} aria-hidden />
                    </div>
                    <span className="rounded-pill border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">
                      {f.duration}
                    </span>
                  </div>
                  <h3 className="mb-2 font-semibold text-fg">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{f.description}</p>
                </Card>
              </AnimateIn>
            );
          })}
        </div>
      </Section>

      {/* ─── §13 Story band — the Apple editorial moment, full-bleed ─── */}
      <section className="overflow-hidden bg-brand">
        <Container>
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="py-16 md:py-24">
              <p className="mb-5 text-xs font-semibold uppercase tracking-label text-primary-fg/70">
                What outlasts the tools
              </p>
              <h2 className="mb-6 font-display text-3xl leading-[1.08] text-primary-fg text-balance md:text-4xl lg:text-5xl">
                Technology changes quickly. Learning how to think with it
                matters more.
              </h2>
              <p className="mb-8 max-w-lg text-lg leading-relaxed text-primary-fg/80">
                The tools taught in any session will look different in two
                years. What stays useful is the ability to look at a problem,
                test whether AI genuinely helps, and decide.
              </p>
              <Button href="/contact" variant="accent" size="lg" icon={<ArrowRight size={16} />}>
                Book AI training
              </Button>
            </div>

            {/* The cutout was made for this ground. When the speaking
                photograph lands it takes the slot instead, framed. */}
            <div className="relative self-end lg:pt-12">
              {hasSpeaking ? (
                <Image
                  src={SPEAKING_PHOTO}
                  alt="Arjun Basnet speaking to an audience during an AI session at the Meet Program 2022"
                  width={2048}
                  height={1365}
                  sizes="(min-width: 1024px) 32rem, 90vw"
                  className="mb-12 h-auto w-full rounded-[24px] object-cover"
                />
              ) : (
                <div className="mx-auto max-w-sm lg:max-w-md">
                  <Headshot sizes="(min-width: 1024px) 28rem, 70vw" />
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── §21 Remaining answers ─── */}
      <Section size="lg" width="reading">
        <AnimateIn>
          <Eyebrow className="mb-4">Straight answers</Eyebrow>
          <Heading level={2} size="lg" className="mb-12">
            The questions people ask first.
          </Heading>
        </AnimateIn>
        <div className="space-y-14">
          {AI_TRAINER_ANSWERS.map((block) => (
            <AnswerSection key={block.id} block={block} level={3} />
          ))}
        </div>
      </Section>

      {/* ─── §14 Credentials — a timeline, every node linked to its evidence ─── */}
      <Section border="top" size="lg" bg="surface">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <AnimateIn>
            <Eyebrow className="mb-4">Credentials</Eyebrow>
            <Heading level={2} size="lg" className="mb-4">
              Built from technology, not just theory.
            </Heading>
            <p className="leading-relaxed text-muted">
              Every claim here links to the page that evidences it. Nothing is
              asserted that cannot be checked.
            </p>
          </AnimateIn>

          <ol className="relative border-l-2 border-border pl-8">
            {CREDENTIALS.map((c, i) => (
              <AnimateIn key={c.id} delay={i * 0.05}>
                <li className="relative pb-10 last:pb-0">
                  <span
                    aria-hidden
                    className="absolute top-1.5 -left-[2.4rem] flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-bg"
                  >
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <h3 className="mb-1.5 font-semibold text-fg">{c.title}</h3>
                  <p className="mb-2 leading-relaxed text-muted">{c.description}</p>
                  <Link href={c.href as Route} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                    {c.linkLabel}
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                </li>
              </AnimateIn>
            ))}
          </ol>
        </div>
      </Section>

      {/* ─── §16 Why train with Arjun ─── */}
      <Section border="top" size="lg">
        <AnimateIn>
          <Heading level={2} size="lg" className="mb-12 max-w-2xl">
            Practical AI. Clear explanations. Real-world context.
          </Heading>
        </AnimateIn>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {WHY_TRAIN.map((w, i) => (
            <AnimateIn key={w.title} delay={i * 0.06}>
              <div className="border-t-2 border-primary pt-5">
                <p className="mb-3 font-display text-3xl text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2 font-semibold text-fg">{w.title}</h3>
                <p className="leading-relaxed text-muted">{w.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Section>

      {/* ─── §15 Topics ─── */}
      <Section border="top" size="md" bg="surface">
        <AnimateIn>
          <Eyebrow className="mb-4">Topics</Eyebrow>
          <Heading level={2} size="lg" className="mb-8 max-w-2xl">
            What a session can cover.
          </Heading>
          <ul className="flex flex-wrap gap-2">
            {TRAINING_TOPICS.map((t) => (
              <li key={t} className="rounded-pill border border-border bg-bg px-3.5 py-1.5 text-sm text-muted">
                {t}
              </li>
            ))}
          </ul>
        </AnimateIn>
      </Section>

      {/* ─── §17 FAQ ─── */}
      <Section border="top" size="lg" width="reading">
        <AnimateIn>
          <Eyebrow className="mb-4">FAQ</Eyebrow>
          <Heading level={2} size="lg" className="mb-10">
            Frequently asked questions
          </Heading>
        </AnimateIn>
        <FaqAccordion items={AI_TRAINER_FAQS} />
      </Section>

      {/* ─── §18 Knowledge hub ─── */}
      {aiPosts.length > 0 && (
        <Section border="top" size="lg" bg="surface">
          <AnimateIn>
            <Eyebrow className="mb-4">AI knowledge hub</Eyebrow>
            <Heading level={2} size="lg" className="mb-4 max-w-2xl">
              Keep learning as AI keeps changing.
            </Heading>
            <p className="mb-10 max-w-2xl leading-relaxed text-muted">
              Practical explainers and tool guides on how AI is actually being
              used in education, business and everyday work.
            </p>
          </AnimateIn>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {aiPosts.map((post, i) => (
              <AnimateIn key={post.slug} delay={i * 0.06}>
                <Card href={`/blog/${post.slug}`} padding="lg" className="h-full">
                  <p className="mb-3 text-xs font-medium text-muted">{post.readingMinutes} min read</p>
                  <h3 className="mb-2 font-semibold text-fg">{post.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{post.description}</p>
                </Card>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn>
            <p className="mt-10">
              <Link href="/blog" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
                All AI training articles
                <ArrowRight size={15} aria-hidden />
              </Link>
            </p>
          </AnimateIn>
        </Section>
      )}

      {/* ─── §32 Final CTA — the site's standard card, since the story band
          already spent the full-bleed blue ─── */}
      <Section border="top" size="lg">
        <CTA
          variant="card"
          title="Ready to make AI practical?"
          body="Whether it's a seminar for students, a workshop for professionals, or a session built around your organisation's workflows — start by telling me what you want people to be able to do afterwards."
          primary={{ label: "Book AI training", href: "/contact" }}
          context={AI_TRAINER_ROUTE}
        />
      </Section>

      {/* Spacer so the sticky mobile bar never covers the footer's last line. */}
      <div aria-hidden className="h-16 md:hidden" />
      <StickyCta />
    </>
  );
}

import type { Metadata } from "next";
import { Check, Circle, Wrench, FileText } from "lucide-react";
import type { Course } from "@/content/training/types";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema, webPageSchema, courseSchema } from "@/lib/schema";
import { COURSES_HUB_ROUTE, LEVELS, courseRoute, getCourse, courseName } from "@/content/courses/index";
import { TRAINING_HUB_ROUTE } from "@/content/training/hub";
import { getSector } from "@/content/training/sectors/index";
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
import LearningPath from "./LearningPath";
import PhotoFigure from "./PhotoFigure";
import { EvidenceBand, RelatedResources, type ResourceLink } from "./Sections";
import { HUB_EVIDENCE } from "@/content/training/hub";

export const COURSE_ENQUIRY_HREF = "/contact?service=ai-course";

export function courseMetadata(course: Course): Metadata {
  return buildMetadata({
    title: course.title,
    description: course.description,
    path: courseRoute(course.slug),
    keywords: course.keywords,
    titleAbsolute: true,
  });
}

/**
 * Shared template for /ai-courses/<slug> (guide §30).
 *
 * Enquiry-based: the CTA is "Request course information", not "Join" or
 * "Enroll" (§48 — enrolment language only when enrolment exists). The §30
 * slots for assessment, certificate and student reviews are omitted because
 * none is offered yet; the certificate question is answered honestly in the
 * FAQ instead.
 */
export default function CoursePage({ course }: { course: Course }) {
  const route = courseRoute(course.slug);
  const level = LEVELS.find((l) => l.id === course.level);
  const trail = [
    { name: "Home", path: "/" },
    { name: "AI Courses in Nepal", path: COURSES_HUB_ROUTE },
    { name: course.name, path: route },
  ];

  const posts = course.relatedPosts
    .map((slug) => getAllPostMeta().find((p) => p.slug === slug))
    .filter((p) => p !== undefined);

  const links: ResourceLink[] = [
    { kind: "course", href: COURSES_HUB_ROUTE, title: "All AI courses in Nepal", description: "The full learning pathway, from beginner to advanced." },
    ...course.relatedCourses.map((slug): ResourceLink => {
      const live = getCourse(slug);
      return {
        kind: "course",
        href: live ? courseRoute(slug) : COURSES_HUB_ROUTE,
        title: `${courseName(slug)} course`,
        description: live ? live.tagline : "Next on the pathway. Details on enquiry.",
      };
    }),
    ...course.relatedSectors.flatMap((slug): ResourceLink[] => {
      const s = getSector(slug);
      return s ? [{ kind: "training", href: s.route, title: `AI training for ${s.name.toLowerCase()}`, description: s.tagline }] : [];
    }),
    { kind: "training", href: TRAINING_HUB_ROUTE, title: "AI training for organisations", description: "The same material, adapted for a whole team." },
    { kind: "consultation", href: "/services/it-consulting", title: "AI consultation", description: "Not sure whether you need a course, training or automation? Start here." },
  ];

  return (
    <>
      <JsonLd
        id="ld-course-page"
        data={webPageSchema({
          name: course.title,
          description: course.description,
          path: route,
          datePublished: course.publishedAt,
          dateModified: course.updatedAt,
          speakable: [".answer-lead"],
        })}
      />
      <JsonLd
        id="ld-course"
        data={courseSchema({
          path: route,
          name: `${course.name} course`,
          description: course.description,
          level: level?.label ?? course.level,
          teaches: course.outcomes,
          prerequisites: course.prerequisites,
          audience: course.audience.map((a) => a.title),
        })}
      />
      <JsonLd id="ld-course-faq" data={faqPageSchema([course.primaryAnswer, ...course.answers, ...course.faqs])} />
      <JsonLd id="ld-course-breadcrumb" data={breadcrumbSchema(trail)} />

      <LearningHero
        trail={trail}
        eyebrow={course.eyebrow}
        heading={course.heading}
        intro={course.intro}
        image={course.hero.image}
        primary={{ label: "Request course information", href: COURSE_ENQUIRY_HREF, trackLabel: `course_${course.slug}_hero` }}
        secondary={{ label: "See the curriculum", href: "#curriculum" }}
        chips={[`${course.modules.length} modules · 1 project`, `${level?.label ?? ""} level`]}
        facts={course.prerequisites.slice(0, 4)}
      />

      <Section border="top" size="lg" width="reading">
        <AnswerSection block={course.primaryAnswer} level={2} />
      </Section>

      {/* Who it's for + why learn */}
      <Section border="top" size="lg" bg="surface">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 [&>*]:min-w-0">
          <AnimateIn>
            <Eyebrow className="mb-4">Who this course is for</Eyebrow>
            <Heading level={2} size="lg" className="mb-8">{course.headings.audience}</Heading>
            <ul className="space-y-4">
              {course.audience.map((a) => (
                <li key={a.title} className="rounded-card border border-border bg-bg p-5">
                  <h3 className="mb-1 font-bold text-fg">{a.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{a.description}</p>
                </li>
              ))}
            </ul>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <Eyebrow className="mb-4">Why learn this?</Eyebrow>
            <Heading level={2} size="lg" className="mb-8">{course.headings.why}</Heading>
            <div className="mb-8 space-y-4 leading-relaxed text-muted">
              {course.whyLearn.map((p) => <p key={p}>{p}</p>)}
            </div>
            <PhotoFigure image={course.figure.image} caption={course.figure.caption} sizes="(min-width: 1024px) 32rem, 92vw" aspect="aspect-[16/10]" />
          </AnimateIn>
        </div>
      </Section>

      {/* What you will learn */}
      <Section border="top" size="lg">
        <AnimateIn>
          <Eyebrow className="mb-4">What you will learn</Eyebrow>
          <Heading level={2} size="lg" className="mb-10 max-w-2xl">By the end of the course you can…</Heading>
        </AnimateIn>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {course.outcomes.map((o, i) => (
            <li key={o}>
              <AnimateIn delay={(i % 3) * 0.05} className="h-full">
              <div className="flex h-full gap-3 rounded-card border border-border bg-surface p-5 leading-relaxed text-fg">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-white"><Check size={14} aria-hidden /></span>
                {o}
              </div>
              </AnimateIn>
            </li>
          ))}
        </ul>
      </Section>

      {/* Curriculum — a numbered timeline */}
      <Section border="top" size="lg" bg="surface" id="curriculum" className="scroll-mt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 [&>*]:min-w-0">
          <AnimateIn>
            <div className="lg:sticky lg:top-28">
              <Eyebrow className="mb-4">Course curriculum</Eyebrow>
              <Heading level={2} size="lg" className="mb-4">{course.modules.length} modules, in the order they make sense</Heading>
              <p className="mb-6 leading-relaxed text-muted">Ideas first, then tools, then limits and responsibility, then a project that uses all of it.</p>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-label text-primary">Prerequisites</h3>
              <ul className="space-y-2">
                {course.prerequisites.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-fg"><Circle size={8} aria-hidden className="fill-primary text-primary" />{p}</li>
                ))}
              </ul>
            </div>
          </AnimateIn>
          <ol className="relative space-y-4 border-l-2 border-border pl-8">
            {course.modules.map((m, i) => (
              <li key={m.title}>
                <AnimateIn delay={0.03} className="h-full">
                <div className="relative">
                  <span aria-hidden className="absolute top-4 -left-[2.95rem] grid h-7 w-7 place-items-center rounded-full bg-brand text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="glass rounded-card p-5">
                    <h3 className="mb-1 font-bold text-fg">Module {i + 1}: {m.title}</h3>
                    <p className="mb-3 text-sm leading-relaxed text-muted">{m.summary}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {m.topics.map((t) => <li key={t} className="rounded-pill border border-border bg-white/70 px-2.5 py-1 text-xs text-muted">{t}</li>)}
                    </ul>
                  </div>
                </div>
                </AnimateIn>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Exercises + project */}
      <Section border="top" size="lg">
        <AnimateIn>
          <Eyebrow className="mb-4">Practical exercises</Eyebrow>
          <Heading level={2} size="lg" className="mb-10 max-w-2xl">Learn by doing, including watching AI fail</Heading>
        </AnimateIn>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {course.exercises.map((e, i) => (
            <AnimateIn key={e.title} delay={(i % 4) * 0.05}>
              <Card padding="lg" className="h-full">
                <span aria-hidden className="mb-4 block h-1.5 w-10 rounded-full bg-brand" />
                <h3 className="mb-2 font-bold text-fg">{e.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{e.description}</p>
              </Card>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn>
          <div className="mt-14 overflow-hidden rounded-[24px] bg-brand p-8 text-white md:p-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-label text-white/75">Sample project</p>
            <h3 className="mb-4 font-display text-2xl font-extrabold md:text-3xl">{course.project.title}</h3>
            <p className="mb-8 max-w-2xl leading-relaxed text-white/85">{course.project.description}</p>
            <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {course.project.steps.map((s, i) => (
                <li key={s} className="rounded-2xl bg-white/12 p-4 text-sm font-medium backdrop-blur-sm">
                  <span className="mb-1 block text-xs text-white/70">Step {i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </AnimateIn>
      </Section>

      {/* Tools, delivery, materials */}
      <Section border="top" size="lg" bg="surface">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 [&>*]:min-w-0">
          <AnimateIn>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-fg"><Wrench size={20} aria-hidden className="text-primary" />Tools covered</h2>
            <ul className="flex flex-wrap gap-2">
              {course.tools.map((t) => <li key={t} className="rounded-pill border border-border bg-bg px-3.5 py-1.5 text-sm text-fg">{t}</li>)}
            </ul>
            <h2 className="mt-10 mb-4 flex items-center gap-2 text-xl font-bold text-fg"><FileText size={20} aria-hidden className="text-primary" />Course materials</h2>
            <ul className="space-y-2">
              {course.materials.map((m) => <li key={m} className="flex gap-2 text-sm text-muted"><Check size={16} aria-hidden className="mt-0.5 shrink-0 text-primary" />{m}</li>)}
            </ul>
          </AnimateIn>
          <div className="lg:col-span-2">
            <AnimateIn>
              <h2 className="mb-2 text-xl font-bold text-fg">Learning format and delivery</h2>
              <p className="mb-6 text-sm leading-relaxed text-muted">Dates, group sizes and fees are arranged on enquiry, so the course runs in the format that suits you.</p>
            </AnimateIn>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {course.delivery.map((d, i) => (
                <AnimateIn key={d.id} delay={i * 0.05}>
                  <Card padding="lg" className="flex h-full flex-col">
                    <span className="mb-4 self-start rounded-pill bg-brand px-3 py-1 text-xs font-semibold text-white">{d.duration}</span>
                    <h3 className="mb-2 font-bold text-fg">{d.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{d.description}</p>
                  </Card>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Where it sits on the pathway */}
      <Section border="top" size="lg">
        <AnimateIn>
          <Eyebrow className="mb-4">Learning pathway</Eyebrow>
          <Heading level={2} size="lg" className="mb-4 max-w-2xl">Where {course.name} fits</Heading>
          <p className="mb-10 max-w-2xl leading-relaxed text-muted">Five levels, from first principles to building with AI. Planned courses are available on enquiry while their pages are written.</p>
        </AnimateIn>
        <AnimateIn>
          <LearningPath current={course.slug} />
        </AnimateIn>
      </Section>

      <Section border="top" size="lg" width="reading" bg="surface">
        <AnimateIn>
          <Eyebrow className="mb-4">Straight answers</Eyebrow>
          <Heading level={2} size="lg" className="mb-12">{course.headings.answers}</Heading>
        </AnimateIn>
        <div className="space-y-14">
          {course.answers.map((b) => <AnswerSection key={b.id} block={b} level={3} />)}
        </div>
      </Section>

      <EvidenceBand
        items={HUB_EVIDENCE}
        heading="Your instructor: a practitioner who teaches."
        body="Arjun Basnet builds production AI systems and has published computer vision research. The examples in this course come from that work. Every claim links to its evidence."
      />

      <RelatedResources links={links} posts={posts} heading="Related courses and training" />

      <Section border="top" size="lg" width="reading">
        <AnimateIn>
          <Eyebrow className="mb-4">FAQ</Eyebrow>
          <Heading level={2} size="lg" className="mb-10">{course.name} course: frequently asked questions</Heading>
        </AnimateIn>
        <FaqAccordion items={course.faqs} />
      </Section>

      <Section border="top" size="lg">
        <CTA
          variant="card"
          title={`Interested in ${course.name}?`}
          body="Tell me how you would like to learn (online, in person or one-to-one) and what you want to use AI for. I'll reply with the next available option and what it involves."
          primary={{ label: "Request course information", href: COURSE_ENQUIRY_HREF }}
          context={route}
        />
      </Section>
    </>
  );
}

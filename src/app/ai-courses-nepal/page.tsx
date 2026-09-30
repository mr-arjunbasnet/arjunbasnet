import type { Route } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema, webPageSchema, collectionPageSchema, itemListSchema } from "@/lib/schema";
import {
  COURSES,
  COURSES_HUB_ROUTE,
  COURSES_HUB_META,
  COURSES_HUB_PRIMARY_ANSWER,
  COURSES_HUB_ANSWERS,
  COURSES_HUB_FAQS,
  COURSE_AUDIENCES,
  COURSE_PRINCIPLES,
  LEVELS,
  courseName,
  courseRoute,
  getCourse,
} from "@/content/courses/index";
import { TRAINING_HUB_ROUTE, HUB_EVIDENCE } from "@/content/training/hub";
import { COURSES_DEVELOPERS, FUNDAMENTALS_ONLINE } from "@/content/training/images";
import { getAllPostMeta } from "@/content/blog/index";
import JsonLd from "@/components/seo/JsonLd";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Eyebrow from "@/components/ui/Eyebrow";
import CTA from "@/components/ui/CTA";
import AnimateIn from "@/components/ui/AnimateIn";
import FaqAccordion from "@/components/seo/FaqAccordion";
import AnswerSection from "@/components/seo/AnswerSection";
import LearningHero from "@/components/training/LearningHero";
import LearningPath from "@/components/training/LearningPath";
import PhotoFigure from "@/components/training/PhotoFigure";
import { EvidenceBand, RelatedResources } from "@/components/training/Sections";
import { COURSE_ENQUIRY_HREF } from "@/components/training/CoursePage";

export const metadata = buildMetadata({
  title: COURSES_HUB_META.title,
  description: COURSES_HUB_META.description,
  path: COURSES_HUB_ROUTE,
  keywords: [...COURSES_HUB_META.keywords],
  titleAbsolute: true,
});

/**
 * /ai-courses-nepal — the AI Courses hub (guide §17, §18, §31).
 *
 * Leads with the learning pathway so a visitor can see where to start, then
 * the audience layer (§31) without separate URLs. Planned courses are shown
 * on the pathway but never linked.
 */
export default function AiCoursesNepal() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "AI Courses in Nepal", path: COURSES_HUB_ROUTE },
  ];
  const posts = ["chatgpt-vs-claude-vs-gemini", "ai-tools-for-students-nepal", "ai-tools-small-business-nepal"]
    .map((slug) => getAllPostMeta().find((p) => p.slug === slug))
    .filter((p) => p !== undefined);

  return (
    <>
      <JsonLd
        id="ld-courses-hub-page"
        data={webPageSchema({
          name: COURSES_HUB_META.title,
          description: COURSES_HUB_META.description,
          path: COURSES_HUB_ROUTE,
          datePublished: "2026-09-22",
          dateModified: "2026-09-22",
          speakable: [".answer-lead"],
        })}
      />
      <JsonLd id="ld-courses-hub-collection" data={collectionPageSchema({ name: COURSES_HUB_META.heading, description: COURSES_HUB_META.description, path: COURSES_HUB_ROUTE })} />
      <JsonLd id="ld-courses-hub-list" data={itemListSchema(COURSES.map((c) => ({ name: `${c.name} course`, path: courseRoute(c.slug), description: c.tagline })))} />
      <JsonLd id="ld-courses-hub-faq" data={faqPageSchema([COURSES_HUB_PRIMARY_ANSWER, ...COURSES_HUB_ANSWERS, ...COURSES_HUB_FAQS])} />
      <JsonLd id="ld-courses-hub-breadcrumb" data={breadcrumbSchema(trail)} />

      <LearningHero
        trail={trail}
        eyebrow={COURSES_HUB_META.eyebrow}
        heading={COURSES_HUB_META.heading}
        intro={COURSES_HUB_META.intro}
        image={COURSES_DEVELOPERS}
        primary={{ label: "Start with AI Fundamentals", href: courseRoute("ai-fundamentals"), trackLabel: "courses_hub_hero" }}
        secondary={{ label: "See the learning pathway", href: "#pathway" }}
        chips={["Beginner to advanced", "Online or in person"]}
        facts={["Project-based, not lecture-only", "No coding needed to start", "Small groups or one-to-one", "Taught by a practitioner"]}
      />

      <Section border="top" size="lg" width="reading">
        <AnswerSection block={COURSES_HUB_PRIMARY_ANSWER} level={2} />
      </Section>

      {/* §18 Learning pathway */}
      <Section border="top" size="lg" bg="surface" id="pathway" className="scroll-mt-20">
        <AnimateIn>
          <Eyebrow className="mb-4">Learning pathway</Eyebrow>
          <Heading level={2} size="lg" className="mb-4 max-w-2xl">Five levels, one clear place to start</Heading>
          <p className="mb-12 max-w-2xl leading-relaxed text-muted">
            Start at the level that matches what you already know. {LEVELS.length} stages take you from understanding AI to building with it. Courses marked &ldquo;Planned&rdquo; can be arranged on enquiry while their pages are written.
          </p>
        </AnimateIn>
        <AnimateIn>
          <LearningPath />
        </AnimateIn>
      </Section>

      {/* Featured live courses */}
      <Section border="top" size="lg">
        <AnimateIn>
          <Eyebrow className="mb-4">Available now</Eyebrow>
          <Heading level={2} size="lg" className="mb-10 max-w-2xl">Course details</Heading>
        </AnimateIn>
        <div className="grid grid-cols-1 gap-5">
          {COURSES.map((c) => (
            <AnimateIn key={c.slug}>
              <Link href={courseRoute(c.slug) as Route} className="group glass grid overflow-hidden rounded-[24px] md:grid-cols-[1fr_1.2fr]">
                <PhotoFigure image={c.hero.image} sizes="(min-width: 768px) 28rem, 92vw" aspect="aspect-[16/10] md:aspect-auto md:h-full" className="[&_figcaption]:hidden [&>div]:h-full [&>div]:rounded-none" />
                <span className="flex flex-col justify-center p-6 md:p-10">
                  <span className="mb-2 text-xs font-semibold uppercase tracking-label text-primary">{LEVELS.find((l) => l.id === c.level)?.label} · {c.modules.length} modules</span>
                  <span className="mb-3 text-2xl font-extrabold text-fg group-hover:text-primary">{c.name}</span>
                  <span className="mb-5 leading-relaxed text-muted">{c.intro}</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                    View the {c.name} course <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </Section>

      {/* §31 Audience navigation */}
      <Section border="top" size="lg" bg="surface">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 [&>*]:min-w-0">
          <div>
            <AnimateIn>
              <Eyebrow className="mb-4">Courses by audience</Eyebrow>
              <Heading level={2} size="lg" className="mb-10">Not sure where to start? Start with who you are.</Heading>
            </AnimateIn>
            <div className="space-y-3">
              {COURSE_AUDIENCES.map((a, i) => (
                <AnimateIn key={a.title} delay={i * 0.04}>
                  <div className="rounded-card border border-border bg-bg p-5">
                    <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="font-bold text-fg">AI courses for {a.title.toLowerCase()}</h3>
                      <p className="text-sm text-muted">{a.description}</p>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {a.courses.map((slug) => (
                        <li key={slug}>
                          {getCourse(slug) ? (
                            <Link href={courseRoute(slug) as Route} className="inline-block rounded-pill bg-primary/10 px-3 py-1 text-sm font-semibold text-primary hover:bg-primary/15">
                              {courseName(slug)}
                            </Link>
                          ) : (
                            <span className="inline-block rounded-pill border border-border px-3 py-1 text-sm text-muted">{courseName(slug)}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
          <AnimateIn delay={0.1}>
            <PhotoFigure image={FUNDAMENTALS_ONLINE} caption="Learn online from anywhere in Nepal." sizes="(min-width: 1024px) 24rem, 92vw" aspect="aspect-[4/5]" className="lg:sticky lg:top-28" />
          </AnimateIn>
        </div>
      </Section>

      {/* How the courses are taught */}
      <Section border="top" size="lg">
        <AnimateIn>
          <Eyebrow className="mb-4">How the courses are taught</Eyebrow>
          <Heading level={2} size="lg" className="mb-12 max-w-2xl">Practical by design</Heading>
        </AnimateIn>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {COURSE_PRINCIPLES.map((p, i) => (
            <AnimateIn key={p.title} delay={i * 0.05}>
              <div className="border-t-2 border-primary pt-5">
                <p className="mb-3 bg-brand bg-clip-text font-display text-3xl font-extrabold text-transparent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mb-2 font-bold text-fg">{p.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{p.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Section>

      <Section border="top" size="lg" width="reading" bg="surface">
        <AnimateIn>
          <Eyebrow className="mb-4">Straight answers</Eyebrow>
          <Heading level={2} size="lg" className="mb-12">Choosing a course</Heading>
        </AnimateIn>
        <div className="space-y-14">
          {COURSES_HUB_ANSWERS.map((b) => <AnswerSection key={b.id} block={b} level={3} />)}
        </div>
      </Section>

      <EvidenceBand
        items={HUB_EVIDENCE}
        heading="Your instructor builds with AI, then teaches it."
        body="Courses are taught by Arjun Basnet, drawing on production AI automation, published computer vision research and platforms built for Nepali learners. Every claim links to its evidence."
      />

      <RelatedResources
        heading="Training for teams, and further reading"
        posts={posts}
        links={[
          { kind: "training", href: TRAINING_HUB_ROUTE, title: "AI training for organisations", description: "Schools, companies and teams learning together." },
          { kind: "consultation", href: "/services/it-consulting", title: "AI consultation", description: "Advice on where AI fits before you invest in it." },
          { kind: "automation", href: "/services/ai-automation", title: "AI automation services", description: "Workflows built for you rather than learned by you." },
        ]}
      />

      <Section border="top" size="lg" width="reading">
        <AnimateIn>
          <Eyebrow className="mb-4">FAQ</Eyebrow>
          <Heading level={2} size="lg" className="mb-10">AI courses in Nepal: frequently asked questions</Heading>
        </AnimateIn>
        <FaqAccordion items={COURSES_HUB_FAQS} />
      </Section>

      <Section border="top" size="lg">
        <CTA
          variant="card"
          title="Explore AI courses"
          body="Tell me which course interests you, how you'd like to learn, and what you want to use AI for. I'll reply with the next available option."
          primary={{ label: "Request course information", href: COURSE_ENQUIRY_HREF }}
          context={COURSES_HUB_ROUTE}
        />
      </Section>
    </>
  );
}

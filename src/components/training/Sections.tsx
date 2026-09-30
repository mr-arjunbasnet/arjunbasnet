import Link from "next/link";
import Image from "next/image";
import type { Route } from "next";
import { ArrowRight, GraduationCap, Workflow, Compass, BookOpen, Building2 } from "lucide-react";
import type { EvidenceItem } from "@/content/training/types";
import type { BlogPostMeta } from "@/content/types";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Eyebrow from "@/components/ui/Eyebrow";
import AnimateIn from "@/components/ui/AnimateIn";
import PostCard from "@/components/blog/PostCard";

const SPEAKING_PHOTO = "/media/ai-trainer/arjun-speaking.jpg";

/**
 * §33 — "Why train with Arjun" + evidence, on the Night ground.
 *
 * The photograph is the only real session photo in the repo (Meet Program
 * 2022, confirmed by the owner as an AI/technology session he delivered). It
 * is the one place on these pages where a photo makes a claim about delivery,
 * so it is the only one captioned as his.
 */
export function EvidenceBand({ items, heading, body }: { items: EvidenceItem[]; heading: string; body: string }) {
  return (
    <Section size="lg" bg="night">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 [&>*]:min-w-0">
        <AnimateIn>
          <Eyebrow className="mb-4">Why train with Arjun</Eyebrow>
          <Heading level={2} size="lg" className="mb-4">{heading}</Heading>
          <p className="mb-8 leading-relaxed text-muted">{body}</p>
          <figure>
            <Image
              src={SPEAKING_PHOTO}
              alt="Arjun Basnet delivering an AI and technology session at the Meet Program 2022 in Nepal"
              width={2048}
              height={1365}
              sizes="(min-width: 1024px) 30rem, 90vw"
              className="h-auto w-full rounded-[24px] object-cover"
            />
            <figcaption className="mt-3 text-sm text-muted">Arjun delivering a technology session at the Meet Program 2022.</figcaption>
          </figure>
        </AnimateIn>

        <ol className="relative self-center border-l-2 border-border pl-8">
          {items.map((c, i) => (
            <li key={c.title} className="pb-10 last:pb-0">
              <AnimateIn delay={i * 0.05}>
              <div className="relative">
                <span aria-hidden className="absolute top-1.5 -left-[2.4rem] flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-bg">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>
                <h3 className="mb-1.5 font-bold text-fg">{c.title}</h3>
                <p className="mb-2 leading-relaxed text-muted">{c.description}</p>
                <Link href={c.href as Route} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                  {c.linkLabel}
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
              </AnimateIn>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

export interface ResourceLink {
  href: string;
  title: string;
  description: string;
  kind: "training" | "course" | "consultation" | "automation" | "trainer";
}

const KIND_ICON = {
  training: Building2,
  course: BookOpen,
  consultation: Compass,
  automation: Workflow,
  trainer: GraduationCap,
} as const;

/** §38 internal links — descriptive anchors (§39), then the supporting posts. */
export function RelatedResources({ links, posts, heading = "Related training, courses and services" }: { links: ResourceLink[]; posts: BlogPostMeta[]; heading?: string }) {
  return (
    <Section border="top" size="lg" bg="surface">
      <AnimateIn>
        <Eyebrow className="mb-4">Related resources</Eyebrow>
        <Heading level={2} size="lg" className="mb-10 max-w-2xl">{heading}</Heading>
      </AnimateIn>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l, i) => {
          const Icon = KIND_ICON[l.kind];
          return (
            <AnimateIn key={l.href} delay={(i % 3) * 0.05}>
              <Link href={l.href as Route} className="group glass flex h-full gap-4 rounded-card p-5 transition-transform hover:-translate-y-0.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-white">
                  <Icon size={18} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="mb-1 block font-bold text-fg group-hover:text-primary">{l.title}</span>
                  <span className="block text-sm leading-relaxed text-muted">{l.description}</span>
                </span>
              </Link>
            </AnimateIn>
          );
        })}
      </div>
      {posts.length > 0 && (
        <>
          <AnimateIn>
            <h3 className="mt-14 mb-6 text-lg font-bold text-fg">From the blog</h3>
          </AnimateIn>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {posts.map((p, i) => (
              <AnimateIn key={p.slug} delay={i * 0.05}>
                <PostCard post={p} sizes="(min-width: 768px) 33vw, 92vw" />
              </AnimateIn>
            ))}
          </div>
        </>
      )}
    </Section>
  );
}

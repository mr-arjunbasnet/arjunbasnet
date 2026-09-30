import type { Route } from "next";
import { ArrowRight, MapPin, Check } from "lucide-react";
import type { ImageRef } from "@/content/types";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Breadcrumbs from "./Breadcrumbs";
import PhotoFigure from "./PhotoFigure";

interface LearningHeroProps {
  trail: { name: string; path: string }[];
  eyebrow: string;
  heading: string;
  intro: string;
  image: ImageRef;
  primary: { label: string; href: string; trackLabel: string };
  secondary?: { label: string; href: string };
  /** Short facts floated over the photo, e.g. "Nepali or English". Max 2. */
  chips?: string[];
  /** Ticked facts under the CTAs. */
  facts?: string[];
}

/**
 * Hero for the AI Training and AI Courses pages.
 *
 * Nothing here is wrapped in AnimateIn (AGENTS.md invariant 5). The photo is
 * the LCP element, so it is the one image on the page with `priority`. The
 * floating chips animate with the CSS `ab-float` keyframes and paint with the
 * document.
 */
export default function LearningHero({
  trail,
  eyebrow,
  heading,
  intro,
  image,
  primary,
  secondary,
  chips = [],
  facts = [],
}: LearningHeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
      <Container>
        <Breadcrumbs trail={trail} />
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-14 [&>*]:min-w-0">
          <div>
            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
            <Heading level={1} className="mb-6 text-[2.5rem] leading-[1.04] md:text-[3.25rem] lg:text-[4rem]">
              {heading}
            </Heading>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted">{intro}</p>
            <div className="mb-8 flex flex-wrap gap-3">
              <Button href={primary.href as Route} size="lg" track="cta_click" trackLabel={primary.trackLabel} icon={<ArrowRight size={16} />}>
                {primary.label}
              </Button>
              {secondary && (
                <Button href={secondary.href as Route} size="lg" variant="secondary">
                  {secondary.label}
                </Button>
              )}
            </div>
            {facts.length > 0 && (
              <ul className="mb-6 grid gap-2 sm:grid-cols-2">
                {facts.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-fg">
                    <Check size={16} aria-hidden className="mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            )}
            <p className="flex items-center gap-2 text-sm text-muted">
              <MapPin size={14} aria-hidden />
              Kathmandu, Nepal · In person across Nepal and online
            </p>
          </div>

          <div className="relative pt-6 pb-8 sm:px-6">
            <PhotoFigure
              image={image}
              priority
              sizes="(min-width: 1024px) 36rem, 92vw"
              aspect="aspect-[4/3]"
            />
            {chips[0] && (
              <p className="ab-float absolute bottom-14 -left-2 max-w-[14rem] rounded-2xl border border-border bg-white px-4 py-3 text-sm font-semibold text-fg shadow-[0_18px_40px_rgb(34_26_92/0.16)]">
                <span className="mb-1 block h-1.5 w-8 rounded-full bg-brand" aria-hidden />
                {chips[0]}
              </p>
            )}
            {chips[1] && (
              <p className="ab-float ab-d2 absolute top-0 right-0 max-w-[12rem] rounded-2xl border border-border bg-white px-4 py-3 text-sm font-semibold text-fg shadow-[0_18px_40px_rgb(34_26_92/0.16)]">
                <span className="mb-1 block h-1.5 w-8 rounded-full bg-brand" aria-hidden />
                {chips[1]}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import { ArrowRight, Award, Clock, Layers, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SERVICES } from "@/content/services/index";
import {
  breadcrumbSchema,
  collectionPageSchema,
  itemListSchema,
} from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CTA from "@/components/ui/CTA";
import { startingFromLabel } from "@/content/site";
import ServiceArt from "@/components/ui/ServiceArt";
import ServicesHeroArt from "@/components/ui/ServicesHeroArt";
import AnimateIn from "@/components/ui/AnimateIn";

const title = "Digital Services in Nepal — SEO, AI Automation, Development";
const description =
  "Digital marketing, SEO, AEO, GEO, web and mobile development, AI automation, custom software, and IT consulting for businesses in Nepal and beyond.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/services",
  keywords: [
    "digital services Nepal",
    "digital agency Kathmandu",
    "SEO services Nepal",
    "AI automation Nepal",
    "web development Nepal",
    "IT consulting Nepal",
  ],
});

/**
 * Every figure here is attributable to delivered work and matches STATS in
 * proof.ts. The design reference carried placeholder numbers ("7+ years",
 * "30+ projects"); the real ones are both true and stronger.
 */
const TRUST = [
  { icon: Layers, value: "100+", label: "Projects delivered" },
  { icon: Award, value: "2×", label: "ICC Digital Award" },
  { icon: Clock, value: "92%", label: "On-time delivery" },
  { icon: MapPin, value: "Kathmandu", label: "Nepal-based" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: title,
          description,
          path: "/services",
        })}
        id="ld-services-collection"
      />
      <JsonLd
        data={itemListSchema(
          SERVICES.map((s) => ({
            name: s.name,
            path: `/services/${s.slug}`,
            description: s.tagline,
          })),
        )}
        id="ld-services-list"
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
        id="ld-services-breadcrumb"
      />

      {/*
        `svc-cool` swaps the warm beige neutrals for cool greys across this
        whole page — see the token override in globals.css. Brand colours are
        unchanged; blue simply leads and orange becomes a highlight.
      */}
      <div className="svc-cool">
      {/*
        Nothing in this hero is wrapped in AnimateIn, and nothing starts at
        opacity 0. The illustration animates from CSS keyframes, which run
        without waiting for hydration — see the `ab-` block in globals.css.
      */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface via-bg to-bg pt-14 pb-16 md:pt-20 md:pb-20">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <Eyebrow tone="primary" className="mb-4">
                Digital solutions that drive growth
              </Eyebrow>
              <Heading level={1} className="mb-6">
                Nine ways I help businesses{" "}
                <span className="text-primary">solve digital problems.</span>
              </Heading>
              <p className="max-w-xl text-lg leading-relaxed text-muted">
                Every engagement starts the same way: a conversation about the
                problem, not the solution. If I am not the right person for it,
                I will say so and point you somewhere better.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href="/contact"
                  size="lg"
                  icon={<ArrowRight size={16} aria-hidden />}
                >
                  Let&rsquo;s talk about your project
                </Button>
                <Button href="/work" variant="secondary" size="lg">
                  View my work
                </Button>
              </div>

              <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:gap-x-4">
                {TRUST.map(({ icon: Icon, value, label }) => (
                  <li key={label} className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-card bg-primary/5 text-primary">
                      <Icon size={15} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-fg">
                        {value}
                      </span>
                      <span className="block text-xs leading-snug text-muted">
                        {label}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/*
              No `order` override: on mobile the heading and CTAs come first and
              the art follows. An earlier revision pulled the art above the H1
              on small screens, which pushes the LCP element down the page for
              no benefit.
            */}
            <div>
              <ServicesHeroArt className="mx-auto max-w-md lg:max-w-none" />
            </div>
          </div>
        </Container>
      </section>

      <Section border="top" size="md">
        <div className="mb-10 max-w-2xl">
          <Eyebrow className="mb-3">Services</Eyebrow>
          <Heading level={2} className="mb-4">
            Solutions for every stage of your{" "}
            <span className="text-primary">growth</span>
          </Heading>
          <p className="leading-relaxed text-muted">
            {startingFromLabel()}. Every engagement is scoped and quoted
            individually — this is where pricing begins, not a package.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <AnimateIn key={service.slug} delay={(i % 3) * 0.06}>
              <Card
                href={`/services/${service.slug}`}
                padding="none"
                className="flex h-full flex-col overflow-hidden"
              >
                <ServiceArt
                  slug={service.slug}
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-lg font-semibold text-fg">
                    {service.name}
                  </h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">
                    {service.tagline}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Learn more
                    <ArrowRight
                      size={15}
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Card>
            </AnimateIn>
          ))}
        </div>
      </Section>

      <CTA
        title="Not sure which of these you need?"
        body="That is a normal place to start. Most problems that arrive described as “we need a website” turn out to be something else once we look at them. A short conversation usually settles it."
        primary={{ label: "Book a free 20-min call", href: "/contact" }}
        context="/services"
      />

      {/*
        The reference ends with a "Trusted by" logo row (makura, revvvy,
        H.N Media, ionio, crevvy). Left out deliberately: a client list is a
        public factual claim, and these need to be names Arjun confirms he can
        cite, with permission. Add once that list exists.
      */}
      </div>
    </>
  );
}

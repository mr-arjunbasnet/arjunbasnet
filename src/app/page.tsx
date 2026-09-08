import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Award, Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { SITE } from "@/content/site";
import { SERVICES, SERVICE_GROUPS, getServicesByGroup } from "@/content/services/index";
import { STATS, FEATURED_WORK } from "@/content/proof";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Eyebrow from "@/components/ui/Eyebrow";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CTA from "@/components/ui/CTA";
import ServiceArt from "@/components/ui/ServiceArt";
import AnimateIn from "@/components/ui/AnimateIn";
import CountUp from "@/components/ui/CountUp";
import HeroBackground from "@/components/ui/HeroBackground";
import ToolOrbit from "@/components/ui/ToolOrbit";
import Headshot from "@/components/ui/Headshot";

const title =
  "Digital & AI Consultant in Nepal — SEO, Automation, Development";
const description =
  "Arjun Basnet builds digital systems for businesses in Nepal — SEO, AEO, GEO, AI automation, web and mobile development, custom software. 100+ projects, 2× ICC Digital Award.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/",
  keywords: [
    "digital consultant Nepal",
    "AI automation Nepal",
    "SEO services Nepal",
    "web development Kathmandu",
    "IT consultant Nepal",
    "digital marketing Nepal",
    "custom software Nepal",
    "Arjun Basnet",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={webPageSchema({ name: title, description, path: "/" })}
        id="ld-homepage"
      />
      <JsonLd
        data={itemListSchema(
          SERVICES.map((s) => ({
            name: s.name,
            path: `/services/${s.slug}`,
            description: s.tagline,
          })),
        )}
        id="ld-home-services"
      />
      <JsonLd
        data={breadcrumbSchema([{ name: "Home", path: "/" }])}
        id="ld-home-breadcrumb"
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-14 pb-14 md:pt-20 md:pb-20">
        <HeroBackground />
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} aria-hidden />
                  {SITE.address.locality}, Nepal
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Award size={13} aria-hidden />
                  ICC Digital Award 2023 &amp; 2024
                </span>
                <span>100+ projects delivered</span>
              </div>

              <Heading level={1} className="mb-6">
                I fix digital
                <br />
                problems for
                <br />
                businesses.
              </Heading>

              <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted">
                Search visibility, AI automation, websites, apps, and custom
                software — built for how businesses in Nepal actually operate.
                Three years and 100+ delivered projects, at a 92% on-time rate.
              </p>

              {/* The one place the primary gets a glow: a soft brand-coloured
                  shadow so the hero's action is unmistakably the brightest
                  thing above the fold. Taller than the standard lg. */}
              <div className="flex flex-wrap gap-3">
                <Button
                  href="/contact"
                  size="lg"
                  icon={<ArrowRight size={18} />}
                  className="h-13 px-7 text-base shadow-[0_12px_32px_-10px_var(--color-primary)] hover:shadow-[0_16px_40px_-10px_var(--color-secondary)] transition-shadow"
                >
                  Start a conversation
                </Button>
                <Button
                  href="/services"
                  size="lg"
                  variant="secondary"
                  icon={<ArrowRight size={16} />}
                  className="h-13 px-7 text-base"
                >
                  See what I do
                </Button>
              </div>
            </div>

            <AnimateIn delay={0.15} className="hidden lg:block">
              <ToolOrbit />
            </AnimateIn>
          </div>
        </Container>
      </section>

      {/* ─── Proof strip ─── */}
      <Section border="y" size="sm" bg="surface">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {STATS.map((stat, i) => (
            <AnimateIn key={stat.label} delay={i * 0.05}>
              <div>
                <p className="mb-1 font-display text-3xl text-primary">
                  <CountUp raw={stat.value} />
                </p>
                <p className="text-xs leading-snug text-muted">{stat.label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Section>

      {/* ─── Services ─── */}
      <Section size="lg">
        <AnimateIn>
          <Eyebrow className="mb-4">Services</Eyebrow>
          <Heading level={2} size="lg" className="mb-4 max-w-2xl">
            Nine services, one question first:
            <br />
            what is actually broken?
          </Heading>
          <p className="mb-10 max-w-2xl leading-relaxed text-muted">
            Most problems that arrive described as &ldquo;we need a
            website&rdquo; turn out to be something else. Every engagement starts
            with working out which one this is.
          </p>
        </AnimateIn>

        {/* Same card anatomy as the /services grid and the AI trainer page:
            the service's own drawn scene on top, group as a chip, name and
            tagline, and a visible affordance. The previous version here was an
            18px icon and two lines of text — nothing for the eye to land on. */}
        <div className="space-y-12">
          {SERVICE_GROUPS.map((group) => {
            const services = getServicesByGroup(group.id);
            if (!services.length) return null;
            return (
              <div key={group.id}>
                <div className="mb-5 flex items-center gap-4">
                  <p className="text-xs font-semibold uppercase tracking-label text-primary">
                    {group.label}
                  </p>
                  <span aria-hidden className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted">
                    {services.length} {services.length === 1 ? "service" : "services"}
                  </span>
                </div>
                {/* Groups are 4 / 3 / 2 services. A fixed column count leaves an
                    orphan on one row and a hole on another, so each row takes
                    its group's size: every row full, the advisory pair wide. */}
                <div
                  className={cn(
                    "grid grid-cols-1 gap-5 sm:grid-cols-2",
                    services.length >= 4 && "lg:grid-cols-4",
                    services.length === 3 && "lg:grid-cols-3",
                    services.length <= 2 && "lg:grid-cols-2",
                  )}
                >
                  {services.map((service, i) => (
                    <AnimateIn key={service.slug} delay={(i % 4) * 0.06}>
                      <Card
                        href={`/services/${service.slug}`}
                        padding="none"
                        className="flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        <div className="relative border-b border-border bg-surface">
                          <ServiceArt
                            slug={service.slug}
                            className="transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                          <span className="absolute top-3 left-3 rounded-pill border border-border bg-bg/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-label text-primary backdrop-blur-sm">
                            {group.label}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="mb-1.5 font-semibold text-fg transition-colors group-hover:text-primary">
                            {service.name}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted">
                            {service.tagline}
                          </p>
                          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-primary">
                            Explore
                            <ArrowRight
                              size={14}
                              aria-hidden
                              className="transition-transform duration-300 group-hover:translate-x-0.5"
                            />
                          </span>
                        </div>
                      </Card>
                    </AnimateIn>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <AnimateIn>
          <p className="mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
            >
              Compare all nine services
              <ArrowRight size={15} aria-hidden />
            </Link>
          </p>
        </AnimateIn>
      </Section>

      {/* ─── Selected work ─── */}
      <Section border="top" size="lg" bg="surface">
        <AnimateIn>
          <Eyebrow className="mb-4">Selected work</Eyebrow>
          <Heading level={2} size="lg" className="mb-10 max-w-2xl">
            Results that can be checked.
          </Heading>
        </AnimateIn>

        <div className="space-y-0">
          {FEATURED_WORK.map((item, i) => (
            <AnimateIn key={item.index} delay={i * 0.08}>
              <Link
                href={item.href}
                className="group -mx-6 block border-t border-border px-6 py-8 transition-colors hover:bg-bg"
              >
                <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[70px_1fr_auto] md:gap-8">
                  <span className="pt-1 font-display text-xl text-primary">
                    {item.index}
                  </span>
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-fg transition-colors group-hover:text-primary">
                        {item.title}
                      </h3>
                      <span className="text-xs text-muted">
                        {item.category} · {item.year}
                      </span>
                    </div>
                    <p className="mb-4 max-w-2xl leading-relaxed text-muted">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <Badge key={tag} tone="primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    aria-hidden
                    className="hidden text-muted transition-colors group-hover:text-primary md:block"
                  />
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn>
          <p className="mt-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
            >
              All case studies
              <ArrowRight size={15} aria-hidden />
            </Link>
          </p>
        </AnimateIn>
      </Section>

      {/* ─── Why me — E-E-A-T, kept short ─── */}
      <Section border="top" size="lg" label="Why work with me">
        <AnimateIn>
          {/* items-start so the photo card hugs the image instead of being
              stretched to the text column's height, which left dead space. */}
          <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-[240px_1fr] sm:gap-12">
            {/* The cutout needs a coloured ground: its white outline is
                invisible against the cream page, and the flat bottom edge only
                reads as intentional when the figure is standing in a frame. */}
            <div className="overflow-hidden rounded-card bg-primary pt-7 max-w-[240px]">
              <Headshot sizes="(min-width: 640px) 240px, 60vw" />
            </div>

            <div>
              <Heading level={2} size="lg" className="mb-5">
                You deal with the person doing the work.
              </Heading>
              <p className="mb-8 leading-relaxed text-muted">
                No account manager relaying messages, nobody junior quietly
                assigned to your project. The trade-off is capacity — I take a
                limited number of engagements at a time, so timelines depend on
                availability.
              </p>
              <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {[
              "100+ projects delivered at a 92% on-time rate",
              "Two-time ICC Digital Fan Engagement Award winner",
              "B.Sc. CSIT, Tribhuvan University, plus a peer-reviewed publication",
              "You own the code, accounts, and infrastructure — no lock-in",
              "Clients across Nepal, the US, Australia, Japan, and the UK",
              "If I am not right for the job, I will tell you and say who is",
            ].map((point) => (
              <li key={point} className="flex gap-3">
                <Check
                  size={17}
                  aria-hidden
                  className="mt-1 shrink-0 text-primary"
                />
                <span className="leading-relaxed text-fg/85">{point}</span>
              </li>
            ))}
              </ul>
              <p className="mt-8 text-sm text-muted">
                More on the background:{" "}
                <Link href="/about" className="text-primary hover:underline">
                  about
                </Link>
                {", "}
                <Link href="/research" className="text-primary hover:underline">
                  research
                </Link>
                {", and "}
                <Link href="/faq" className="text-primary hover:underline">
                  frequently asked questions
                </Link>
                .
              </p>
            </div>
          </div>
        </AnimateIn>
      </Section>

      <CTA context="/" />
    </>
  );
}

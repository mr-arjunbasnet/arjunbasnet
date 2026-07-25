import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SERVICES, getService } from "@/content/services/index";
import { formatNpr, formatUsd } from "@/content/site";
import {
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
  serviceSchema,
} from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Eyebrow from "@/components/ui/Eyebrow";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CTA from "@/components/ui/CTA";
import ServiceIcon from "@/components/ui/ServiceIcon";
import AnimateIn from "@/components/ui/AnimateIn";
import HeroBackground from "@/components/ui/HeroBackground";
import AnswerSection from "@/components/seo/AnswerSection";
import FaqAccordion from "@/components/seo/FaqAccordion";

// Every service is known at build time, so the whole route prerenders.
// dynamicParams = false makes an unknown slug a 404 rather than an
// on-demand render, which keeps the route set closed and predictable.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

// Next 16: params is a Promise in both generateMetadata and the page.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: `${service.heading} | Arjun Basnet`,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
    modifiedTime: service.updatedAt,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const route = `/services/${service.slug}`;
  const allAnswers = [service.primaryAnswer, ...service.answers];
  const related = service.relatedServices
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <JsonLd data={serviceSchema(service)} id="ld-service" />
      {/* Both the visible answer blocks and the accordion feed one FAQPage,
          built from the same objects the page renders. */}
      <JsonLd
        data={faqPageSchema([...allAnswers, ...service.faqs])}
        id="ld-service-faq"
      />
      <JsonLd data={howToSchema(service)} id="ld-service-howto" />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: route },
        ])}
        id="ld-service-breadcrumb"
      />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
        <HeroBackground />
        <Container>
          <AnimateIn>
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-card bg-primary/5 text-primary">
                <ServiceIcon name={service.icon} />
              </span>
              <Eyebrow>{service.name}</Eyebrow>
            </div>
            <Heading level={1} size="xl" className="mb-5 max-w-3xl">
              {service.heading}
            </Heading>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted">
              {service.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                href={`/contact?service=${service.slug}`}
                size="lg"
                icon={<ArrowRight size={16} />}
              >
                Request a quote
              </Button>
              <p className="text-sm text-muted">
                Starting from{" "}
                <span className="font-medium text-fg">
                  {formatNpr()}
                </span>{" "}
                <span className="text-[#BBBBBB]">/</span>{" "}
                <span className="font-medium text-fg">{formatUsd()}</span>
              </p>
            </div>
          </AnimateIn>
        </Container>
      </section>

      {/* ─── Primary answer: the block built to be extracted ─── */}
      <Section border="top" size="md" label="Overview">
        <AnimateIn>
          <AnswerSection block={service.primaryAnswer} level={2} />
        </AnimateIn>
      </Section>

      {/* ─── What you get ─── */}
      <Section border="top" size="md" label="What you get">
        <AnimateIn>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {service.deliverables.map((item) => (
              <li key={item} className="flex gap-3">
                <Check
                  size={18}
                  aria-hidden
                  className="mt-0.5 shrink-0 text-primary"
                />
                <span className="leading-relaxed text-fg/85">{item}</span>
              </li>
            ))}
          </ul>
        </AnimateIn>
      </Section>

      {/* ─── Process → also emitted as HowTo schema ─── */}
      <Section border="top" size="md" label="How it works">
        <ol className="space-y-0">
          {service.process.map((step, i) => (
            <AnimateIn key={step.step} delay={i * 0.05}>
              <li className="grid grid-cols-[2.5rem_1fr] gap-5 border-b border-border py-6 last:border-b-0">
                <span className="font-display text-2xl text-accent">
                  {String(step.step).padStart(2, "0")}
                </span>
                <div>
                  <div className="mb-1.5 flex flex-wrap items-baseline gap-3">
                    <h3 className="font-semibold text-fg">{step.title}</h3>
                    {step.duration && (
                      <span className="text-xs text-muted">{step.duration}</span>
                    )}
                  </div>
                  <p className="leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            </AnimateIn>
          ))}
        </ol>
      </Section>

      {/* ─── The remaining answer blocks ─── */}
      {service.answers.length > 0 && (
        <Section border="top" size="md" label="Common questions">
          <div className="space-y-12">
            {service.answers.map((block, i) => (
              <AnimateIn key={block.id} delay={i * 0.05}>
                <AnswerSection block={block} level={2} />
              </AnimateIn>
            ))}
          </div>
        </Section>
      )}

      {/* ─── Proof: links into the existing /work anchors ─── */}
      {service.proof.length > 0 && (
        <Section border="top" size="md" label="Proof" bg="surface">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {service.proof.map((p, i) => (
              <AnimateIn key={p.anchor} delay={i * 0.06}>
                <Card href={`/work#${p.anchor}`} padding="lg" className="h-full">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-fg">{p.label}</h3>
                    <ArrowUpRight
                      size={15}
                      aria-hidden
                      className="mt-1 shrink-0 text-muted group-hover:text-primary"
                    />
                  </div>
                  <p className="leading-relaxed text-muted">{p.result}</p>
                </Card>
              </AnimateIn>
            ))}
          </div>
        </Section>
      )}

      {/* ─── Outcomes + tools ─── */}
      <Section border="top" size="md" label="Results">
        <AnimateIn>
          <ul className="mb-9 space-y-3">
            {service.outcomes.map((o) => (
              <li key={o} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                <span className="leading-relaxed text-fg/85">{o}</span>
              </li>
            ))}
          </ul>
          <p className="mb-3 text-xs font-semibold uppercase tracking-label text-muted">
            Tools
          </p>
          <div className="flex flex-wrap gap-2">
            {service.tools.map((t) => (
              <Badge key={t} tone="surface" size="md">
                {t}
              </Badge>
            ))}
          </div>
        </AnimateIn>
      </Section>

      {/* ─── FAQ ─── */}
      {service.faqs.length > 0 && (
        <Section border="top" size="md" label="FAQ">
          <FaqAccordion items={service.faqs} />
        </Section>
      )}

      {/* ─── Related ─── */}
      {related.length > 0 && (
        <Section border="top" size="md" label="Related services">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((r) => (
              <Card key={r.slug} href={`/services/${r.slug}`} padding="md">
                <div className="mb-2 flex items-center gap-2.5">
                  <ServiceIcon name={r.icon} size={16} className="text-primary" />
                  <h3 className="font-medium text-fg">{r.name}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted">{r.tagline}</p>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted">
            <Link href="/services" className="text-primary hover:underline">
              See all nine services
            </Link>
          </p>
        </Section>
      )}

      <CTA
        title={`Have a ${service.name.toLowerCase()} problem?`}
        body="Tell me what you are trying to achieve and what has already been tried. I will tell you honestly whether this is the right service for it."
        primary={{
          label: "Start a conversation",
          href: `/contact?service=${service.slug}`,
        }}
        context={route}
      />
    </>
  );
}

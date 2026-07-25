import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import {
  SERVICES,
  SERVICE_GROUPS,
  getServicesByGroup,
} from "@/content/services/index";
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
import Badge from "@/components/ui/Badge";
import CTA from "@/components/ui/CTA";
import { startingFromLabel } from "@/content/site";
import ServiceIcon from "@/components/ui/ServiceIcon";
import AnimateIn from "@/components/ui/AnimateIn";
import HeroBackground from "@/components/ui/HeroBackground";

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

      <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
        <HeroBackground />
        <Container>
          <AnimateIn>
            <Eyebrow className="mb-4">Services</Eyebrow>
            <Heading level={1} className="mb-6 max-w-3xl">
              Nine ways I help businesses
              <br />
              solve digital problems.
            </Heading>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              Every engagement starts the same way: a conversation about the
              problem, not the solution. If I am not the right person for it, I
              will say so and point you somewhere better.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {SERVICE_GROUPS.map((group, gi) => {
        const services = getServicesByGroup(group.id);
        if (!services.length) return null;

        return (
          <Section key={group.id} label={group.label} border="top" size="md">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {services.map((service, i) => (
                <AnimateIn key={service.slug} delay={i * 0.06 + gi * 0.02}>
                  <Card href={`/services/${service.slug}`} padding="lg" className="h-full">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-card bg-primary/5 text-primary">
                        <ServiceIcon name={service.icon} />
                      </span>
                      <ArrowRight
                        size={16}
                        aria-hidden
                        className="mt-1 text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary"
                      />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-fg">
                      {service.name}
                    </h3>
                    <p className="mb-5 leading-relaxed text-muted">
                      {service.tagline}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {service.tools.slice(0, 4).map((tool) => (
                        <Badge key={tool} tone="surface">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                    <p className="border-t border-border pt-3 text-xs font-medium text-muted">
                      {startingFromLabel()}
                    </p>
                  </Card>
                </AnimateIn>
              ))}
            </div>
          </Section>
        );
      })}

      <Section border="top" size="md">
        <AnimateIn>
          <Heading level={2} size="lg" className="mb-4 max-w-2xl">
            Not sure which of these you need?
          </Heading>
          <p className="mb-6 max-w-2xl leading-relaxed text-muted">
            That is a normal place to start. Most problems that arrive described
            as &ldquo;we need a website&rdquo; turn out to be something else
            once we look at them. A short conversation usually settles it.
          </p>
        </AnimateIn>
      </Section>

      <CTA context="/services" />
    </>
  );
}

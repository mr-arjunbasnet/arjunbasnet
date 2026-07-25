import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SERVICES } from "@/content/services/index";
import { FAQS } from "@/content/faq/index";
import { breadcrumbSchema, faqPageSchema, webPageSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Eyebrow from "@/components/ui/Eyebrow";
import CTA from "@/components/ui/CTA";
import AnimateIn from "@/components/ui/AnimateIn";
import FaqAccordion from "@/components/seo/FaqAccordion";

const title = "Frequently Asked Questions";
const description =
  "Straight answers about pricing, timelines, ownership, and how engagements work — digital marketing, SEO, AI automation, development, and IT consulting in Nepal.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/faq",
  keywords: [
    "digital services FAQ Nepal",
    "SEO cost Nepal",
    "website cost Nepal",
    "AI automation cost Nepal",
    "app development cost Nepal",
  ],
});

export default function FaqPage() {
  // Only the general FAQs emit FAQPage schema here. Service-specific questions
  // already emit it on their own service page, and the same Q/A appearing as
  // structured data on two URLs splits the entity across duplicates.
  return (
    <>
      <JsonLd
        data={webPageSchema({ name: title, description, path: "/faq" })}
        id="ld-faq-page"
      />
      <JsonLd data={faqPageSchema(FAQS)} id="ld-faq" />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
        id="ld-faq-breadcrumb"
      />

      <section className="pt-16 pb-10 md:pt-24 md:pb-14">
        <Container>
          <Eyebrow className="mb-4">FAQ</Eyebrow>
          <Heading level={1} size="xl" className="mb-6 max-w-3xl">
            Questions people actually ask
            <br />
            before they hire me.
          </Heading>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            Prices, timelines, and what happens if it goes wrong. Where the
            honest answer is &ldquo;it depends&rdquo;, that is what it says,
            along with what it depends on.
          </p>
        </Container>
      </section>

      <Section border="top" size="md" label="Working together">
        <FaqAccordion items={FAQS} />
      </Section>

      {SERVICES.map((service) => (
        <Section
          key={service.slug}
          border="top"
          size="md"
          label={service.name}
          id={service.slug}
          className="scroll-mt-20"
        >
          <FaqAccordion items={service.faqs} />
          <p className="mt-6 text-sm text-muted">
            <Link
              href={`/services/${service.slug}`}
              className="text-primary hover:underline"
            >
              More on {service.name.toLowerCase()}
            </Link>
          </p>
        </Section>
      ))}

      <CTA
        title="Still have a question?"
        body="If your question is not here, it is probably a good one. Ask it directly — I answer every message myself."
        context="/faq"
      />
    </>
  );
}

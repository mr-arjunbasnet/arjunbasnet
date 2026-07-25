import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE, absoluteUrl } from "@/content/site";
import { getAllPostMeta, getPost, getCluster } from "@/content/blog/index";
import { getService } from "@/content/services/index";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Eyebrow from "@/components/ui/Eyebrow";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import CTA from "@/components/ui/CTA";
import AnimateIn from "@/components/ui/AnimateIn";
import FaqAccordion from "@/components/seo/FaqAccordion";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostMeta().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${slug}`,
    keywords: post.meta.keywords,
    type: "article",
    publishedTime: post.meta.publishedAt,
    modifiedTime: post.meta.updatedAt ?? post.meta.publishedAt,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { meta, html, toc } = post;
  const cluster = getCluster(meta.cluster);
  const services = meta.serviceSlugs
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const url = absoluteUrl(`/blog/${slug}`);

  const postingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: meta.title,
    description: meta.description,
    url,
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt ?? meta.publishedAt,
    author: { "@id": `${SITE.url}/#person` },
    publisher: { "@id": `${SITE.url}/#business` },
    inLanguage: SITE.inLanguage,
    isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
    keywords: meta.keywords.join(", "),
    articleSection: cluster?.label,
    // The key-takeaways block is the part designed to be read aloud or lifted
    // verbatim, so it is the selector worth marking speakable.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".key-takeaways"],
    },
  };

  return (
    <>
      <JsonLd data={postingSchema} id="ld-post" />
      {meta.faqs?.length ? (
        <JsonLd data={faqPageSchema(meta.faqs)} id="ld-post-faq" />
      ) : null}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          ...(cluster
            ? [{ name: cluster.label, path: `/blog/topic/${cluster.id}` }]
            : []),
          { name: meta.title, path: `/blog/${slug}` },
        ])}
        id="ld-post-breadcrumb"
      />

      <article>
        <section className="pt-12 pb-8 md:pt-16 md:pb-10">
          <Container width="reading">
            <Link
              href="/blog"
              className="mb-7 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-primary"
            >
              <ArrowLeft size={14} aria-hidden />
              All posts
            </Link>

            {cluster && (
              <Eyebrow className="mb-4">
                <Link
                  href={`/blog/topic/${cluster.id}`}
                  className="hover:text-primary"
                >
                  {cluster.label}
                </Link>
              </Eyebrow>
            )}

            <Heading level={1} size="xl" className="mb-5">
              {meta.title}
            </Heading>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
              <span>Arjun Basnet</span>
              <span aria-hidden>·</span>
              <time dateTime={meta.publishedAt}>
                {new Date(meta.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} aria-hidden />
                {meta.readingMinutes} min read
              </span>
            </div>
          </Container>
        </section>

        {/* Key takeaways — the block generative engines lift verbatim, placed
            before the body so it is the first thing any extractor encounters. */}
        {meta.keyTakeaways?.length > 0 && (
          <Container width="reading" className="mb-10">
            <AnimateIn>
              <div className="key-takeaways rounded-card border border-border bg-surface p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-label text-accent">
                  Key takeaways
                </p>
                <ul className="space-y-2.5">
                  {meta.keyTakeaways.map((point) => (
                    <li key={point} className="flex gap-3 leading-relaxed">
                      <span
                        aria-hidden
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span className="text-fg/85">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </Container>
        )}

        {/* Table of contents */}
        {toc.filter((t) => t.level === 2).length > 2 && (
          <Container width="reading" className="mb-10">
            <nav aria-label="On this page" className="border-l-2 border-border pl-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-label text-muted">
                On this page
              </p>
              <ul className="space-y-2">
                {toc
                  .filter((t) => t.level === 2)
                  .map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="text-sm text-muted transition-colors hover:text-primary"
                      >
                        {t.text}
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
          </Container>
        )}

        <Container width="reading">
          <div
            className="prose-site"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Container>

        {meta.faqs?.length ? (
          <Container width="reading" className="mt-14">
            <Heading level={2} size="lg" className="mb-6">
              Questions
            </Heading>
            <FaqAccordion items={meta.faqs} />
          </Container>
        ) : null}

        {meta.tags.length > 0 && (
          <Container width="reading" className="mt-12">
            <div className="flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <Badge key={tag} tone="surface" size="md">
                  {tag}
                </Badge>
              ))}
            </div>
          </Container>
        )}
      </article>

      {services.length > 0 && (
        <Section border="top" size="md" label="Related services" className="mt-16">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {services.map((s) => (
              <Card key={s.slug} href={`/services/${s.slug}`} padding="md">
                <h3 className="mb-1.5 font-medium text-fg">{s.name}</h3>
                <p className="text-sm leading-relaxed text-muted">{s.tagline}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      <CTA context={`/blog/${slug}`} />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE, absoluteUrl } from "@/content/site";
import { getAllPostMeta, CLUSTERS, getPostsByCluster } from "@/content/blog/index";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Eyebrow from "@/components/ui/Eyebrow";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import CTA from "@/components/ui/CTA";
import AnimateIn from "@/components/ui/AnimateIn";

const title = "Blog — SEO, AI Automation & Digital Strategy in Nepal";
const description =
  "Practical writing on search visibility, AI automation, and digital problem solving for businesses in Nepal. Written from delivering 100+ projects.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/blog",
  keywords: [
    "SEO blog Nepal",
    "AI automation Nepal",
    "digital marketing blog Nepal",
    "IT consulting Nepal",
  ],
});

export default function BlogIndex() {
  const posts = getAllPostMeta();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog")}#blog`,
    name: title,
    description,
    url: absoluteUrl("/blog"),
    inLanguage: SITE.inLanguage,
    author: { "@id": `${SITE.url}/#person` },
    publisher: { "@id": `${SITE.url}/#business` },
  };

  return (
    <>
      <JsonLd data={blogSchema} id="ld-blog" />
      <JsonLd
        data={itemListSchema(
          posts.map((p) => ({
            name: p.title,
            path: `/blog/${p.slug}`,
            description: p.description,
          })),
        )}
        id="ld-blog-list"
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
        id="ld-blog-breadcrumb"
      />

      <section className="pt-16 pb-10 md:pt-24 md:pb-14">
        <Container>
          <Eyebrow className="mb-4">Blog</Eyebrow>
          <Heading level={1} size="xl" className="mb-6 max-w-3xl">
            Notes from delivering
            <br />
            digital work in Nepal.
          </Heading>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            What actually works, what wastes money, and where the two get
            confused. Written from projects I have delivered, not from a
            content calendar.
          </p>
        </Container>
      </section>

      {posts.length === 0 ? (
        <Section border="top" size="md">
          <p className="text-muted">First posts are on their way.</p>
        </Section>
      ) : (
        CLUSTERS.map((cluster) => {
          const clusterPosts = getPostsByCluster(cluster.id);
          if (!clusterPosts.length) return null;

          return (
            <Section
              key={cluster.id}
              border="top"
              size="md"
              label={cluster.label}
            >
              <p className="mb-7 max-w-2xl leading-relaxed text-muted">
                {cluster.description}
              </p>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {clusterPosts.map((post, i) => (
                  <AnimateIn key={post.slug} delay={i * 0.05}>
                    <Card
                      href={`/blog/${post.slug}`}
                      padding="lg"
                      className="h-full"
                    >
                      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted">
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                        <span>·</span>
                        <span>{post.readingMinutes} min read</span>
                      </div>
                      <h2 className="mb-2 text-lg font-semibold text-fg">
                        {post.title}
                      </h2>
                      <p className="mb-4 leading-relaxed text-muted">
                        {post.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} tone="surface">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </AnimateIn>
                ))}
              </div>
              <p className="mt-6">
                <Link
                  href={`/blog/topic/${cluster.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  All {cluster.label.toLowerCase()} posts
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </p>
            </Section>
          );
        })
      )}

      <CTA context="/blog" />
    </>
  );
}

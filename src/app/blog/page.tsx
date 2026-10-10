import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE, absoluteUrl } from "@/content/site";
import { getAllPostMeta, CLUSTERS } from "@/content/blog/index";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Eyebrow from "@/components/ui/Eyebrow";
import CTA from "@/components/ui/CTA";
import PostCard from "@/components/blog/PostCard";
import BlogBrowser from "@/components/blog/BlogBrowser";

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

  // Archive options: one per month that has posts, newest first.
  const archiveCounts = new Map<string, number>();
  for (const p of posts) {
    const month = p.publishedAt.slice(0, 7);
    archiveCounts.set(month, (archiveCounts.get(month) ?? 0) + 1);
  }
  const archives = [...archiveCounts].map(([id, count]) => ({
    id,
    count,
    label: new Date(`${id}-01T00:00:00Z`).toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }),
  }));

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
        /* Every post, newest first, with Category and Archive filters. The
           filters are client state only (BlogBrowser) — never a searchParams
           filter, which would make /blog dynamic — and the prerendered HTML
           lists every post. There are still no per-cluster hub pages (removed
           2026-09-08 at the owner's request). */
        <Section border="top" size="md">
          <BlogBrowser
            items={posts.map((post) => ({
              slug: post.slug,
              cluster: post.cluster,
              archive: post.publishedAt.slice(0, 7),
              card: (
                <PostCard
                  post={post}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              ),
            }))}
            categories={CLUSTERS.map((c) => ({
              id: c.id,
              label: c.label,
              count: posts.filter((p) => p.cluster === c.id).length,
            })).filter((c) => c.count > 0)}
            archives={archives}
          />
        </Section>
      )}

      <CTA context="/blog" />
    </>
  );
}

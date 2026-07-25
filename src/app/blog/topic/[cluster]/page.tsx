import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import {
  CLUSTERS,
  getCluster,
  getPostsByCluster,
} from "@/content/blog/index";
import type { BlogCluster } from "@/content/types";
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
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import CTA from "@/components/ui/CTA";
import AnimateIn from "@/components/ui/AnimateIn";

// Cluster hubs are path segments, not ?query filters — reading searchParams
// would make the route dynamic and drop it from the static shell.
export const dynamicParams = false;

export function generateStaticParams() {
  return CLUSTERS.map((c) => ({ cluster: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string }>;
}): Promise<Metadata> {
  const { cluster: id } = await params;
  const cluster = getCluster(id);
  if (!cluster) return {};

  return buildMetadata({
    title: `${cluster.label} — Articles`,
    description: cluster.description,
    path: `/blog/topic/${cluster.id}`,
  });
}

export default async function ClusterPage({
  params,
}: {
  params: Promise<{ cluster: string }>;
}) {
  const { cluster: id } = await params;
  const cluster = getCluster(id);
  if (!cluster) notFound();

  const posts = getPostsByCluster(cluster.id as BlogCluster);
  const path = `/blog/topic/${cluster.id}`;

  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: `${cluster.label} — Articles`,
          description: cluster.description,
          path,
        })}
        id="ld-cluster"
      />
      <JsonLd
        data={itemListSchema(
          posts.map((p) => ({
            name: p.title,
            path: `/blog/${p.slug}`,
            description: p.description,
          })),
        )}
        id="ld-cluster-list"
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: cluster.label, path },
        ])}
        id="ld-cluster-breadcrumb"
      />

      <section className="pt-16 pb-10 md:pt-24 md:pb-12">
        <Container>
          <AnimateIn>
            <Eyebrow className="mb-4">Topic</Eyebrow>
            <Heading level={1} size="xl" className="mb-5 max-w-3xl">
              {cluster.label}
            </Heading>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              {cluster.description}
            </p>
          </AnimateIn>
        </Container>
      </section>

      <Section border="top" size="md">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {posts.map((post, i) => (
            <AnimateIn key={post.slug} delay={i * 0.05}>
              <Card href={`/blog/${post.slug}`} padding="lg" className="h-full">
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
      </Section>

      <CTA context={path} />
    </>
  );
}

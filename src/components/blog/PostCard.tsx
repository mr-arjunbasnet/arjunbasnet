import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/content/types";
import { publicFileExists } from "@/lib/media";
import { getCluster } from "@/content/blog/index";
import Card from "@/components/ui/Card";

interface PostCardProps {
  post: BlogPostMeta;
  /** "full" is the /blog listing card; "compact" is for related/from-the-blog rows. */
  variant?: "full" | "compact";
  /** Sizes hint for the thumbnail, matching the grid the card sits in. */
  sizes?: string;
}

/**
 * One card for every place a post is listed — the /blog index, the "Related
 * posts" row on a post, and "From the blog" on a service page — so imagery
 * and metadata stay consistent everywhere.
 *
 * The thumbnail renders only when `heroImage` is set AND the file exists in
 * public/ (checked at build time). A post whose image has not arrived yet
 * degrades to the text card rather than a broken image. Never `priority`:
 * these are below the fold on every page they appear on.
 */
export default function PostCard({ post, variant = "full", sizes }: PostCardProps) {
  const image =
    post.heroImage && publicFileExists(post.heroImage.src) ? post.heroImage : null;
  const compact = variant === "compact";
  const cluster = getCluster(post.cluster);
  // Cards carry one sentence, clamped to two lines: enough to promise what
  // the post answers. The full description stays the meta description.
  const summary = post.description.split(/(?<=[.:?])\s/)[0].replace(/:$/, ".");

  return (
    <Card
      href={`/blog/${post.slug}`}
      padding="none"
      className="flex h-full flex-col overflow-hidden"
      track="post_card_click"
      trackLabel={post.slug}
    >
      {image && (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes ?? (compact ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 768px) 50vw, 100vw")}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            {...(image.blurDataURL ? { placeholder: "blur", blurDataURL: image.blurDataURL } : {})}
          />
          {cluster && !compact && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-label text-primary shadow-sm backdrop-blur-sm">
              {cluster.label}
            </span>
          )}
        </div>
      )}
      <div className={compact ? "flex flex-1 flex-col p-5" : "flex flex-1 flex-col p-6"}>
        <div className="mb-2.5 flex flex-wrap items-center gap-2 text-xs text-muted">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <h3
          className={
            compact
              ? "mb-2 line-clamp-3 font-bold leading-snug text-fg transition-colors group-hover:text-primary"
              : "mb-2.5 line-clamp-3 text-lg font-bold leading-snug text-fg transition-colors group-hover:text-primary"
          }
        >
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{summary}</p>
        {!compact && (
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary">
            Read article
            <ArrowRight
              size={15}
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        )}
      </div>
    </Card>
  );
}

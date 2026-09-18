import Image from "next/image";
import type { BlogPostMeta } from "@/content/types";
import { publicFileExists } from "@/lib/media";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

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
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            {...(image.blurDataURL ? { placeholder: "blur", blurDataURL: image.blurDataURL } : {})}
          />
        </div>
      )}
      <div className={compact ? "flex flex-1 flex-col p-5" : "flex flex-1 flex-col p-7"}>
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted">
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
        <h3 className={compact ? "mb-2 font-bold leading-snug text-fg" : "mb-2 text-lg font-bold text-fg"}>
          {post.title}
        </h3>
        <p className={compact ? "text-sm leading-relaxed text-muted" : "mb-4 leading-relaxed text-muted"}>
          {compact ? post.description.split(". ")[0] + "." : post.description}
        </p>
        {!compact && (
          <div className="mt-auto flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} tone="surface">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

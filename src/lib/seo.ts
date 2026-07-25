import type { Metadata } from "next";
import { SITE, absoluteUrl } from "@/content/site";

export { absoluteUrl };

interface BuildMetadataInput {
  /**
   * WITHOUT the "| Arjun Basnet" suffix — the root layout's title template
   * appends it. Passing the suffix here produces it twice.
   */
  title: string;
  description: string;
  /** Site-relative, e.g. "/services/ai-automation". The canonical derives from this. */
  path: string;
  keywords?: string[];
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  /**
   * Leave undefined in almost every case.
   *
   * Returning `openGraph.images` from `generateMetadata` OVERRIDES the segment's
   * `opengraph-image.tsx` file convention — set this only when a route has no
   * such file and needs an explicit image.
   */
  images?: { url: string; width: number; height: number; alt: string }[];
}

/**
 * Builds a page's Metadata with canonical, OpenGraph, and Twitter tags derived
 * from one input. Replaces the hand-copied metadata block that previously lived
 * in every page file.
 *
 * `alternates.canonical` is intentionally relative — it resolves against
 * `metadataBase` in the root layout, so the domain appears in exactly one place.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex,
  images,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type: type === "profile" ? "profile" : type,
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title,
      description,
      ...(images ? { images } : {}),
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
    ...(noindex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

/**
 * Trims a string to a target length on a word boundary. Useful for deriving a
 * meta description from body copy without cutting mid-word.
 */
export function truncate(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

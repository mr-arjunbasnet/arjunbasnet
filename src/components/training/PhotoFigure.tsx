import Image from "next/image";
import type { ImageRef } from "@/content/types";
import { cn } from "@/lib/utils";

interface PhotoFigureProps {
  image: ImageRef;
  caption?: string;
  sizes: string;
  /** Only for the page's LCP element (the hero photo). Never decorative. */
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  /** Aspect crop, e.g. "aspect-[4/3]". Omit to keep the file's own ratio. */
  aspect?: string;
}

/**
 * A photograph with its caption and stock credit.
 *
 * Credit is shown even though Pexels does not require it: the guide (§41)
 * asks the site to be transparent about what is its own and what is not, and
 * a visible credit stops a stock classroom being read as one of Arjun's
 * sessions.
 */
export default function PhotoFigure({
  image,
  caption,
  sizes,
  priority,
  className,
  imageClassName,
  aspect,
}: PhotoFigureProps) {
  return (
    <figure className={cn("min-w-0", className)}>
      <div className={cn("relative overflow-hidden rounded-[24px] bg-surface-2", aspect)}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          placeholder={image.blurDataURL ? "blur" : "empty"}
          blurDataURL={image.blurDataURL}
          className={cn("h-auto w-full object-cover", aspect && "h-full", imageClassName)}
        />
      </div>
      {(caption || image.credit) && (
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm text-muted">
          {caption && <span>{caption}</span>}
          {image.credit && (
            <span className="text-xs">
              Photo:{" "}
              <a href={image.credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-2 hover:text-fg">
                {image.credit.author} / Pexels
              </a>
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

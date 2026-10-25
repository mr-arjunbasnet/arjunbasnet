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
 * A photograph with an optional caption.
 *
 * Stock credit stays in `ImageRef.credit` but is not rendered (owner's call,
 * 2026-09-22). Captions on stock photos must therefore never describe them as
 * one of Arjun's sessions.
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
      {caption && (
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}

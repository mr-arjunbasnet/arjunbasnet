"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PostTocProps {
  items: { id: string; text: string }[];
}

/**
 * "On this page" for the sticky post sidebar. Highlights the section being
 * read. Rendered statically with no active item; the observer only adds the
 * highlight after hydration, so nothing here affects prerendering.
 */
export default function PostToc({ items }: PostTocProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!headings.length) return;

    // The active section is the last heading that has scrolled past the
    // top quarter of the viewport.
    const update = () => {
      const line = window.innerHeight * 0.25;
      let current: string | null = null;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= line) current = h.id;
        else break;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="mb-3 text-xs font-semibold uppercase tracking-label text-muted">On this page</p>
      <ul className="max-h-[calc(100vh-24rem)] space-y-1 overflow-y-auto border-l-2 border-border pr-1">
        {items.map((t) => (
          <li key={t.id}>
            <a
              href={`#${t.id}`}
              aria-current={active === t.id ? "location" : undefined}
              className={cn(
                "-ml-0.5 block border-l-2 py-1 pl-4 text-sm leading-snug transition-colors",
                active === t.id
                  ? "border-primary font-semibold text-primary"
                  : "border-transparent text-muted hover:text-fg",
              )}
            >
              {t.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

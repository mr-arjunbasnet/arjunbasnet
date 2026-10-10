"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface BlogBrowserItem {
  slug: string;
  cluster: string;
  /** "YYYY-MM" of publishedAt. */
  archive: string;
  /** The server-rendered PostCard. */
  card: React.ReactNode;
}

interface Option {
  id: string;
  label: string;
  count: number;
}

interface BlogBrowserProps {
  /** Newest first — the order is decided on the server and kept here. */
  items: BlogBrowserItem[];
  categories: Option[];
  archives: Option[];
}

const ALL = "all";

/**
 * Category and Archive filters for /blog. Filtering is local state only —
 * never searchParams, which would make /blog dynamic (§14 of
 * PROJECT-CONTEXT). The initial render is "all", so the prerendered HTML
 * lists every post for crawlers; the filters only hide cards after hydration.
 */
export default function BlogBrowser({ items, categories, archives }: BlogBrowserProps) {
  const [category, setCategory] = useState(ALL);
  const [archive, setArchive] = useState(ALL);

  const visible = items.filter(
    (i) => (category === ALL || i.cluster === category) && (archive === ALL || i.archive === archive),
  );
  const filtered = category !== ALL || archive !== ALL;

  const chip = (active: boolean) =>
    cn(
      "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
      active
        ? "border-primary bg-primary text-primary-fg"
        : "glass-soft border-border text-fg hover:border-primary/50 hover:text-primary",
    );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p id="blog-category-label" className="mb-2.5 text-xs font-semibold uppercase tracking-label text-muted">
            Category
          </p>
          <div role="group" aria-labelledby="blog-category-label" className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={category === ALL} onClick={() => setCategory(ALL)} className={chip(category === ALL)}>
              All <span className="opacity-70">{items.length}</span>
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={category === c.id}
                onClick={() => setCategory(c.id)}
                className={chip(category === c.id)}
              >
                {c.label} <span className="opacity-70">{c.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="shrink-0">
          <label htmlFor="blog-archive" className="mb-2.5 block text-xs font-semibold uppercase tracking-label text-muted">
            Archive
          </label>
          <select
            id="blog-archive"
            value={archive}
            onChange={(e) => setArchive(e.target.value)}
            className="w-full min-w-[13rem] rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-fg focus:border-primary focus:outline-none lg:w-auto"
          >
            <option value={ALL}>All time</option>
            {archives.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label} ({a.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between gap-4 text-sm text-muted">
        <p aria-live="polite">
          {visible.length} {visible.length === 1 ? "post" : "posts"}
          {filtered ? "" : ", latest first"}
        </p>
        {filtered && (
          <button
            type="button"
            onClick={() => {
              setCategory(ALL);
              setArchive(ALL);
            }}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {visible.length ? (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((i) => (
            <li key={i.slug} className="h-full">
              {i.card}
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-border p-8 text-center text-muted">
          No posts in this category for that month.{" "}
          <button type="button" onClick={() => setArchive(ALL)} className="font-medium text-primary hover:underline">
            Show all months
          </button>
        </p>
      )}
    </div>
  );
}

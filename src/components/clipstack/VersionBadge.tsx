"use client";

import { useEffect, useState } from "react";
import { CLIPSTACK } from "@/content/clipstack/index";

/**
 * "Version 1.1.0 · 9 Sept 2026 · about 2 MB · …" — brief §4·1 and §9.4.
 *
 * Server-rendered from the feed at build time (no flash, correct without JS),
 * then refreshed from the same feed the app polls, uncached, so the page and
 * installed copies always agree on what "latest" is.
 */
export default function VersionBadge({
  version: initialVersion,
  publishedAt: initialPublished,
  sizeMB,
}: {
  version: string;
  publishedAt: string | null;
  sizeMB: number;
}) {
  const [version, setVersion] = useState(initialVersion);
  const [published, setPublished] = useState(initialPublished);

  useEffect(() => {
    fetch(CLIPSTACK.feedPath, { cache: "no-store" })
      .then((r) => r.json())
      .then((feed) => {
        const r = feed?.releases?.[0];
        if (!r?.version) return;
        setVersion(r.version);
        if (r.publishedAt) setPublished(r.publishedAt);
      })
      .catch(() => {});
  }, []);

  const date = published
    ? new Date(published).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })
    : null;

  return (
    <p className="text-[13px] text-muted">
      Version <span data-version>{version}</span>
      {date && <> · {date}</>} · about {sizeMB} MB · no account, no tracking ·{" "}
      <a href="#faq-open" className="text-primary-light hover:underline">
        first-launch note
      </a>
    </p>
  );
}

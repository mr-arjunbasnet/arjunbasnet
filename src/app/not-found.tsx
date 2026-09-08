import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/content/nav";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-32 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
        404
      </p>
      <h1
        className="text-5xl md:text-6xl text-fg mb-6"
        style={{ fontFamily: "var(--font-dm-serif)" }}
      >
        Page not found.
      </h1>
      <p className="text-sm text-muted mb-10 max-w-sm mx-auto">
        This page doesn&apos;t exist. You might be looking for one of these:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {[{ href: "/" as const, label: "Home" }, ...NAV_LINKS].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex items-center gap-1.5 px-4 py-2 border border-border rounded-full text-sm text-fg hover:border-primary hover:text-primary transition-colors"
          >
            {l.label} <ArrowRight size={13} />
          </Link>
        ))}
      </div>
    </div>
  );
}

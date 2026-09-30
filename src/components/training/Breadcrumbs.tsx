import Link from "next/link";
import type { Route } from "next";
import { ChevronRight } from "lucide-react";

/**
 * Visible breadcrumb trail. The same array feeds breadcrumbSchema(), so the
 * trail a reader sees and the one in JSON-LD cannot drift.
 */
export default function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="text-fg">{item.name}</span>
              ) : (
                <>
                  <Link href={item.path as Route} className="hover:text-primary hover:underline">
                    {item.name}
                  </Link>
                  <ChevronRight size={14} aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

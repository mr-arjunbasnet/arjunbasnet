import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { pathway, courseRoute } from "@/content/courses/index";

/**
 * The §18 learning pathway, drawn as five connected stages.
 *
 * Built courses are links; planned ones are shown muted and labelled
 * "Planned" so the pathway is complete without pointing at pages that do not
 * exist yet. `current` highlights the course being viewed.
 */
export default function LearningPath({ current }: { current?: string }) {
  const stages = pathway();
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
      {stages.map((stage, i) => (
        <li key={stage.id} className="relative flex min-w-0 flex-col">
          <div className="mb-3 flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-fg">{stage.label}</p>
              <p className="text-xs leading-snug text-muted">{stage.description}</p>
            </div>
            {i < stages.length - 1 && (
              <ArrowRight size={16} aria-hidden className="ml-auto hidden shrink-0 text-primary/50 lg:block" />
            )}
          </div>
          <ul className="flex flex-1 flex-col gap-2 rounded-card border border-border bg-white/60 p-3">
            {stage.courses.map((c) => (
              <li key={c.slug}>
                {c.live ? (
                  <Link
                    href={courseRoute(c.slug) as Route}
                    aria-current={c.slug === current ? "page" : undefined}
                    className={cn(
                      "group flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
                      c.slug === current ? "bg-brand text-white" : "bg-primary/10 text-primary hover:bg-primary/15",
                    )}
                  >
                    {c.name}
                    <ArrowRight size={14} aria-hidden className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ) : (
                  <span className="block rounded-xl px-3 py-2 text-sm text-muted">
                    {c.name}
                    <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wide text-muted">Planned · on enquiry</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

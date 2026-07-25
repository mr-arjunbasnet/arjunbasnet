import { ChevronDown } from "lucide-react";
import type { Faq } from "@/content/types";
import { cn } from "@/lib/utils";

interface FaqAccordionProps {
  items: Faq[];
  className?: string;
}

/**
 * Native <details>/<summary>, deliberately.
 *
 * Content inside <details> is indexed reliably; content behind a JS-only
 * toggle is not. Staying native also means zero client JavaScript here, and
 * `onToggle` remains available as a free analytics hook later.
 */
export default function FaqAccordion({ items, className }: FaqAccordionProps) {
  return (
    <div className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((faq) => (
        <details key={faq.id} id={faq.id} className="group scroll-mt-24">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-medium text-fg group-hover:text-primary transition-colors">
              {faq.question}
            </span>
            <ChevronDown
              size={18}
              aria-hidden
              className="mt-0.5 shrink-0 text-muted transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="pb-6 pr-10 leading-relaxed text-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

import type { AnswerBlock } from "@/content/types";
import { cn } from "@/lib/utils";
import Heading from "@/components/ui/Heading";

interface AnswerSectionProps {
  block: AnswerBlock;
  /** Semantic level. Use 2 for top-level sections, 3 when nested. */
  level?: 2 | 3;
  className?: string;
}

/**
 * Renders one AnswerBlock as visible HTML.
 *
 * The same object is passed to `faqPageSchema()` to emit FAQPage JSON-LD, so
 * the structured data is byte-identical to what a reader sees. That equivalence
 * is the entire point of the single-source model — mismatch penalties become
 * structurally impossible rather than something to remember.
 *
 * The `answer-lead` class is also the `speakable` selector referenced in
 * BlogPosting schema, and the paragraph is never hidden or JS-gated: content
 * behind a client-side toggle is a coin flip for indexing.
 */
export default function AnswerSection({
  block,
  level = 2,
  className,
}: AnswerSectionProps) {
  return (
    <div className={cn("scroll-mt-24", className)} id={block.id}>
      <Heading level={level} size={level === 2 ? "lg" : "md"} className="mb-4">
        {block.question}
      </Heading>
      <p
        className="answer-lead text-fg/85 leading-relaxed text-[1.0625rem]"
        data-answer-id={block.id}
      >
        {block.answer}
      </p>
      {block.supporting && block.supporting.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {block.supporting.map((item, i) => (
            <li key={i} className="flex gap-3 text-muted leading-relaxed">
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

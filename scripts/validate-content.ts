/**
 * Content validator. Run with `npm run validate:content`.
 *
 * The AEO answer-block spec (134-167 words, self-contained, plain text) is only
 * worth anything if it is enforced. This script fails the build when copy
 * drifts out of spec, so the constraint is structural rather than a note in a
 * document nobody rereads.
 *
 * Runs under Node's native TypeScript stripping (Node 22.18+). Content modules
 * must import their types with `import type` so the alias never needs resolving
 * at runtime.
 */

import { SERVICES } from "../src/content/services/index.ts";
import { FAQS } from "../src/content/faq/index.ts";
import {
  AI_TRAINER_PRIMARY_ANSWER,
  AI_TRAINER_ANSWERS,
  AI_TRAINER_FAQS,
} from "../src/content/ai-trainer/index.ts";
import type { AnswerBlock, Faq } from "../src/content/types.ts";

const MIN_WORDS = 134;
const MAX_WORDS = 167;
const FAQ_MIN = 35;
const FAQ_MAX = 95;

const errors: string[] = [];
const warnings: string[] = [];

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/** Openers that make an extracted paragraph meaningless out of context. */
const BAD_OPENERS =
  /^(it|this|that|these|those|they|he|she|there|here|such)\b/i;

function checkAnswer(block: AnswerBlock, where: string) {
  const words = wordCount(block.answer);

  if (words < MIN_WORDS || words > MAX_WORDS) {
    errors.push(
      `${where} [${block.id}]: answer is ${words} words, must be ${MIN_WORDS}-${MAX_WORDS}`,
    );
  }
  if (BAD_OPENERS.test(block.answer.trim())) {
    errors.push(
      `${where} [${block.id}]: answer opens with a pronoun — it must stand alone when extracted`,
    );
  }
  if (/[<>]|\*\*|\[.*\]\(/.test(block.answer)) {
    errors.push(
      `${where} [${block.id}]: answer contains markup; it must be plain text (it is rendered into JSON-LD verbatim)`,
    );
  }
  if (!/\d/.test(block.answer)) {
    warnings.push(
      `${where} [${block.id}]: answer contains no number — every block should carry one hard fact`,
    );
  }
  if (!block.primaryRoute.startsWith("/")) {
    errors.push(`${where} [${block.id}]: primaryRoute must be a site-relative path`);
  }
}

function checkFaq(faq: Faq, where: string) {
  const words = wordCount(faq.answer);
  if (words < FAQ_MIN || words > FAQ_MAX) {
    errors.push(
      `${where} [${faq.id}]: FAQ answer is ${words} words, must be ${FAQ_MIN}-${FAQ_MAX}`,
    );
  }
}

/* -------------------------------------------------------------------------- */

const slugs = new Set(SERVICES.map((s) => s.slug));
const seenQuestions = new Map<string, string>();
const seenAnswerIds = new Map<string, string>();
const primaryRoutes = new Map<string, string[]>();

for (const service of SERVICES) {
  const where = `services/${service.slug}`;

  if (service.metaDescription.length < 120 || service.metaDescription.length > 165) {
    warnings.push(
      `${where}: metaDescription is ${service.metaDescription.length} chars, aim for 150-160`,
    );
  }
  if (service.tagline.length > 90) {
    errors.push(`${where}: tagline is ${service.tagline.length} chars, max 90`);
  }

  for (const related of service.relatedServices) {
    if (!slugs.has(related)) {
      errors.push(`${where}: relatedServices references unknown slug "${related}"`);
    }
    if (related === service.slug) {
      errors.push(`${where}: relatedServices includes itself`);
    }
  }

  if (service.process.length < 3) {
    warnings.push(`${where}: only ${service.process.length} process steps`);
  }

  const blocks = [service.primaryAnswer, ...service.answers];
  for (const block of blocks) {
    checkAnswer(block, where);

    const q = block.question.trim().toLowerCase();
    const prior = seenQuestions.get(q);
    if (prior && prior !== where) {
      errors.push(`${where} [${block.id}]: question duplicates one in ${prior}`);
    }
    seenQuestions.set(q, where);

    const priorId = seenAnswerIds.get(block.id);
    if (priorId) {
      errors.push(`${where}: answer id "${block.id}" already used in ${priorId}`);
    }
    seenAnswerIds.set(block.id, where);

    const list = primaryRoutes.get(block.id) ?? [];
    list.push(block.primaryRoute);
    primaryRoutes.set(block.id, list);
  }

  for (const faq of service.faqs) checkFaq(faq, where);
}

for (const faq of FAQS) checkFaq(faq, "faq");

/*
 * The AI trainer pillar page runs the same answer-block spec as the services.
 * Checked through the same functions and against the same shared uniqueness
 * maps, so an answer id or question colliding with a service is an error here
 * too — the page is a separate route, not a separate standard.
 */
{
  const where = "ai-trainer";
  for (const block of [AI_TRAINER_PRIMARY_ANSWER, ...AI_TRAINER_ANSWERS]) {
    checkAnswer(block, where);

    const q = block.question.trim().toLowerCase();
    const prior = seenQuestions.get(q);
    if (prior && prior !== where) {
      errors.push(`${where} [${block.id}]: question duplicates one in ${prior}`);
    }
    seenQuestions.set(q, where);

    const priorId = seenAnswerIds.get(block.id);
    if (priorId) {
      errors.push(`${where}: answer id "${block.id}" already used in ${priorId}`);
    }
    seenAnswerIds.set(block.id, where);

    const list = primaryRoutes.get(block.id) ?? [];
    list.push(block.primaryRoute);
    primaryRoutes.set(block.id, list);
  }
  for (const faq of AI_TRAINER_FAQS) checkFaq(faq, where);
}

// Every AnswerBlock must be claimed by exactly one route, or the same Q/A
// emits FAQPage on two URLs and splits the entity across duplicates.
for (const [id, routes] of primaryRoutes) {
  const unique = new Set(routes);
  if (unique.size > 1) {
    errors.push(
      `answer "${id}" declares multiple primaryRoutes: ${[...unique].join(", ")}`,
    );
  }
}

/* -------------------------------------------------------------------------- */

const answerTotal =
  SERVICES.reduce((n, s) => n + s.answers.length + 1, 0) +
  AI_TRAINER_ANSWERS.length +
  1;
const faqTotal =
  SERVICES.reduce((n, s) => n + s.faqs.length, 0) +
  FAQS.length +
  AI_TRAINER_FAQS.length;

console.log(
  `Checked ${SERVICES.length} services · 1 pillar page · ${answerTotal} answer blocks · ${faqTotal} FAQs`,
);

for (const w of warnings) console.warn(`  warn  ${w}`);
for (const e of errors) console.error(`  FAIL  ${e}`);

if (errors.length) {
  console.error(`\n${errors.length} error(s).`);
  process.exit(1);
}
console.log(
  warnings.length ? `\nOK with ${warnings.length} warning(s).` : "\nAll checks passed.",
);

---
title: "How to Get Your Business Cited by ChatGPT and Perplexity"
description: "Three things decide whether an AI model names your business: crawler access, verifiable claims, and entity consistency. All three are within your control."
publishedAt: "2026-07-24"
cluster: "seo-aeo-geo"
readingMinutes: 6
tags: ["GEO", "AI Search", "Structured Data"]
keywords:
  - "get cited by ChatGPT"
  - "Perplexity SEO"
  - "llms.txt"
  - "GPTBot robots.txt"
  - "AI citation Nepal"
keyTakeaways:
  - "Check robots.txt first — many sites block GPTBot, ClaudeBot, and PerplexityBot by default without anyone deciding to."
  - "Models repeat claims that carry a number, a date, a named tool, or a named client. Vague superlatives get dropped."
  - "Entity consistency matters: the same name, address, phone, and description across your site, Google Business Profile, LinkedIn, and directories."
  - "Perplexity searches live and reflects changes within weeks. Models relying on training data take considerably longer."
serviceSlugs: ["generative-engine-optimization", "answer-engine-optimization"]
faqs:
  - id: "faq-should-block"
    question: "Should we block AI crawlers instead?"
    answer: "It is a genuine strategic choice, not an obvious mistake. A publisher whose product is the content itself often should block. A services business whose content exists to generate enquiries almost never should, because blocking guarantees absence from answers competitors appear in."
  - id: "faq-llms-txt-standard"
    question: "Is llms.txt an official standard?"
    answer: "No. It is an emerging convention rather than a ratified specification, and no model vendor guarantees they read it. It costs almost nothing to publish and removes ambiguity about what your business does, which is why it is worth doing anyway."
---

Ask ChatGPT for a digital consultant in Kathmandu and it will name a handful of sources. Whether you are among them is not random, and it is not primarily about how big your website is.

Three things decide it, and all three are within your control.

## 1. Check whether you are blocked

Start here, because it is binary and frequently wrong. AI crawlers are separate user agents from Googlebot, and a `robots.txt` written before 2023 will not mention them at all — while some CMS platforms and security plugins now block them by default.

The agents worth naming explicitly:

- `GPTBot`, `ChatGPT-User`, `OAI-SearchBot` — OpenAI
- `ClaudeBot`, `Claude-Web`, `anthropic-ai` — Anthropic
- `PerplexityBot` — Perplexity
- `Google-Extended` — controls Gemini training separately from Search
- `Applebot-Extended`, `Meta-ExternalAgent`, `Amazonbot`

Visit `yourdomain.com/robots.txt` and read it. If any of these carry a `Disallow: /`, you have opted out of the answers your competitors appear in.

This is a real decision, not an obvious fix. A news publisher whose product *is* the content has a defensible reason to block. A consultancy whose content exists to generate enquiries almost never does.

## 2. Make your claims repeatable

This is the part most businesses get wrong, and it is the most interesting.

A language model assembling an answer has to decide which statements are safe to repeat and attribute. Specific, checkable claims are safe. Unfalsifiable marketing language is not — repeating it carries risk and adds nothing to the answer.

So this gets quoted:

> Delivered five learning management platforms for K-12 and PSC/TSC candidates across Nepal, built for low-bandwidth conditions.

And this does not:

> A leading provider of world-class educational technology solutions.

The second sentence is longer and says less. It contains nothing a model can verify or a reader can act on.

The practical exercise is a claim audit. Go through your site and, for every assertion, ask whether it carries a number, a date, a named tool, or a named client. If it carries none of those, either add one or delete the sentence.

## 3. Be one resolvable entity

Models cross-reference. If your business name is slightly different on LinkedIn than on your website, your address is formatted three ways across directories, and your Google Business Profile lists a different phone number, you look like several weakly-attested entities rather than one well-attested one.

Fix it in this order:

1. **Structured data.** `Organization` or `ProfessionalService` schema on your site, with `Person` schema for the named individual behind it, linked by `founder` or `employee`. Include `sameAs` pointing at every profile you control.
2. **Name, address, phone.** Identical strings everywhere. Not equivalent — identical.
3. **Description.** One sentence describing what you do, reused verbatim across profiles.

## Add an llms.txt

A plain-text file at your site root summarising what your business does, in a form a model can read without parsing HTML.

It is an emerging convention, not a ratified standard, and no vendor guarantees they read it. But it costs almost nothing and it removes ambiguity. Generate it from your actual content rather than hand-writing it — a hand-maintained file drifts out of date within months, and a stale summary is worse than none.

## How long it takes, and how to tell

Expect two to four months before changes show up meaningfully. Perplexity searches the live web and reflects changes fastest, often within weeks. Models drawing on training data move on their own retraining schedules, which nobody outside those companies controls.

Measurement is genuinely harder than SEO, and it is worth being upfront about that. There is no rank tracker for ChatGPT citations. What works:

- Test a fixed set of 15 to 20 category questions across the four major models each month, and record which sources get named.
- Watch branded search volume in Search Console. It tends to climb as your name appears in more generated answers.
- Watch referral traffic from `chat.openai.com`, `perplexity.ai`, and similar.

It is a directional signal, not a precise one. Anyone selling you a GEO dashboard with a citation score is inventing a number.

## The unusual part about Nepal

Almost none of this is being done here yet. The work is neither exotic nor expensive — it is a robots.txt review, a schema implementation, and a rewrite of vague claims into specific ones. But it requires knowing that generative engines select for verifiability rather than domain authority, and that idea has not travelled far yet.

That gap is the opportunity, and it will close.

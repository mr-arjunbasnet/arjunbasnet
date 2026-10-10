---
title: "Prompting Frameworks That Work: Six Structures for Better AI Answers"
description: "Six prompting frameworks I teach in AI training in Nepal: RTCF, CO-STAR, RISEN, few-shot, ask-first and critique-and-revise, with when to use each and examples."
publishedAt: "2026-10-10"
cluster: "ai-training"
readingMinutes: 8
tags: ["prompting", "prompt engineering", "ChatGPT", "Claude", "AI training", "Nepal"]
keywords:
  - "prompting frameworks"
  - "prompt engineering framework"
  - "CO-STAR prompt framework"
  - "RISEN prompt framework"
  - "how to write a good prompt"
  - "prompt engineering training Nepal"
  - "ChatGPT prompts for business"
keyTakeaways:
  - "A prompting framework is a checklist, not a formula. Its only job is to make you include the four things a model cannot guess: who it is writing as, what the task is, the context it is missing, and the shape of the answer you want."
  - "For most business tasks, a four-part structure (Role, Task, Context, Format) gets 80% of the benefit. CO-STAR adds audience and tone for anything customer-facing; RISEN adds explicit steps for multi-stage work."
  - "One good example in the prompt beats a paragraph of description. Few-shot prompting, showing the model two or three finished samples, is the fastest way to get output in your organisation's own style."
  - "The most underused technique is asking the model to question you first. Ending a prompt with 'Before you start, ask me up to five questions' turns a vague brief into a precise one in a single exchange."
  - "Teams get more from one shared framework, written into a template everyone uses, than from six frameworks each person half-remembers. Pick one and standardise on it."
serviceSlugs: ["ai-automation", "it-consulting"]
heroImage:
  src: "/media/blog/ai-prompting-frameworks.jpg"
  alt: "A notebook page with a prompt drafted in labelled sections beside a laptop showing a chat assistant"
  width: 1600
  height: 900
faqs:
  - id: "faq-best-framework"
    question: "Which prompting framework is the best one?"
    answer: "None of them is best in general. For everyday work, Role, Task, Context, Format is the one I teach first because it is short enough to remember and covers what models most often lack. Use CO-STAR when audience and tone decide whether the output works, such as customer messages, and RISEN when the task has several stages that must happen in order."
  - id: "faq-reasoning-models"
    question: "Do frameworks still matter with the newest reasoning models?"
    answer: "Less for the thinking, as much as ever for the brief. Reasoning models plan their own steps, so instructions like 'think step by step' add little and vendors now advise against over-scripting them. What they still cannot do is guess your audience, your constraints or the format you need. Frameworks supply exactly that, which is why they have not gone out of date."
  - id: "faq-nepali"
    question: "Do these frameworks work for prompts written in Nepali?"
    answer: "Yes. The structure is language-independent, and the leading assistants handle Nepali reasonably well for drafting and summarising. Quality is still lower than in English for nuanced or formal writing, so for official Nepali documents I recommend drafting in Nepali, then asking the model to check grammar and register, and always having a fluent reader review the final text."
  - id: "faq-team-training"
    question: "Can you train our team on prompting?"
    answer: "Yes. Prompting is the core of the hands-on afternoon in my corporate workshops, and the session is built on your team's own tasks rather than invented examples. By the end of the day each participant has a working, saved prompt template for a real job. Sessions run in person across Nepal or online."
---

Most people who are disappointed by ChatGPT or Claude are not using the wrong tool. They are writing prompts the way they would type a Google search: six words, no context, and a hope that the model will guess the rest.

A prompting framework fixes that. Not because it contains magic words, but because it is a checklist that makes you include what the model cannot know. These are the six I teach in [AI training sessions in Nepal](/ai-trainer-nepal), in the order I teach them, with when each one earns its place and when it is overkill.

## What a prompting framework actually does

A language model starts every conversation knowing nothing about you, your organisation, your reader or your standards. Whatever you leave out, it fills with the most generic plausible answer. That is why vague prompts produce text that sounds fine and says nothing.

Every framework below is a different way of covering the same four gaps:

1. **Who** the model should write or think as.
2. **What** exactly the task is, and what "done" looks like.
3. **Context** it is missing: the facts, the situation, the reader.
4. **Shape** of the output: length, format, structure, tone.

If your prompt covers those four, you are already doing better than most users, whatever you call it.

<figure>
<svg viewBox="0 0 640 352" role="img" aria-labelledby="prompt-anatomy-title" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;font-family:inherit"><title id="prompt-anatomy-title">Anatomy of a structured prompt, using a hotel review reply as the example</title><text x="0" y="16" font-size="14" font-weight="600" fill="var(--color-fg)">Anatomy of a structured prompt</text><g font-size="12.5"><rect x="0" y="34" width="112" height="44" rx="8" fill="var(--color-primary)"/><text x="56" y="61" text-anchor="middle" font-weight="700" fill="var(--color-primary-fg)">Role</text><rect x="120" y="34" width="520" height="44" rx="8" fill="var(--color-surface)" stroke="var(--color-border)"/><text x="136" y="61" fill="var(--color-fg)">You are the guest-relations manager of a lakeside hotel in Pokhara.</text><rect x="0" y="86" width="112" height="44" rx="8" fill="var(--color-primary)"/><text x="56" y="113" text-anchor="middle" font-weight="700" fill="var(--color-primary-fg)">Task</text><rect x="120" y="86" width="520" height="44" rx="8" fill="var(--color-surface)" stroke="var(--color-border)"/><text x="136" y="113" fill="var(--color-fg)">Reply to the guest review pasted below.</text><rect x="0" y="138" width="112" height="44" rx="8" fill="var(--color-primary)"/><text x="56" y="165" text-anchor="middle" font-weight="700" fill="var(--color-primary-fg)">Context</text><rect x="120" y="138" width="520" height="44" rx="8" fill="var(--color-surface)" stroke="var(--color-border)"/><text x="136" y="157" fill="var(--color-fg)">Hot water failed on 3 October because of a boiler fault;</text><text x="136" y="173" fill="var(--color-fg)">it was replaced on 5 October. The guest stayed two nights.</text><rect x="0" y="190" width="112" height="44" rx="8" fill="var(--color-primary)"/><text x="56" y="217" text-anchor="middle" font-weight="700" fill="var(--color-primary-fg)">Format</text><rect x="120" y="190" width="520" height="44" rx="8" fill="var(--color-surface)" stroke="var(--color-border)"/><text x="136" y="217" fill="var(--color-fg)">Under 120 words, three short paragraphs, signed "Sita, Guest Relations".</text><rect x="0.75" y="242.75" width="110.5" height="42.5" rx="8" fill="var(--color-surface)" stroke="var(--color-primary)" stroke-width="1.5" stroke-dasharray="4 3"/><text x="56" y="269" text-anchor="middle" font-weight="700" fill="var(--color-primary)">Constraints</text><rect x="120" y="242" width="520" height="44" rx="8" fill="var(--color-surface)" stroke="var(--color-border)"/><text x="136" y="269" fill="var(--color-fg)">Do not offer a refund or discount. Do not blame staff.</text><rect x="0.75" y="294.75" width="110.5" height="42.5" rx="8" fill="var(--color-surface)" stroke="var(--color-primary)" stroke-width="1.5" stroke-dasharray="4 3"/><text x="56" y="321" text-anchor="middle" font-weight="700" fill="var(--color-primary)">Example</text><rect x="120" y="294" width="520" height="44" rx="8" fill="var(--color-surface)" stroke="var(--color-border)"/><text x="136" y="321" fill="var(--color-fg)">Here is a past reply we liked: "…"</text></g></svg>
<figcaption>The four core parts, plus the two optional ones that do the most work for customer-facing text.</figcaption>
</figure>

## Framework 1: RTCF (Role, Task, Context, Format)

This is the one I teach first and the one most teams should standardise on. It is short enough to remember without a cheat sheet and covers all four gaps.

- **Role:** "You are an HR officer at a commercial bank in Kathmandu."
- **Task:** "Draft a notice announcing the new leave policy."
- **Context:** "The change: casual leave rises from 12 to 15 days from Shrawan. Staff have asked about it for a year."
- **Format:** "One page, formal Nepali-English business tone, three bullet points for the changes, a contact line at the end."

**Use it for:** most everyday writing, summarising and analysis. **Skip it for:** genuinely trivial requests. "Convert this table to CSV" needs no role.

## Framework 2: CO-STAR

CO-STAR (Context, Objective, Style, Tone, Audience, Response) became well known after it won a prompt engineering competition run by Singapore's GovTech in 2023. It is RTCF with the reader pulled out into its own two slots, style and tone, and audience.

| Letter | Means | Example for a school |
|---|---|---|
| C | Context | "We are a private school in Lalitpur; the term fee is changing." |
| O | Objective | "Inform parents and pre-empt complaints." |
| S | Style | "Plain and direct, like a respected principal." |
| T | Tone | "Warm, apologetic about the timing, firm about the decision." |
| A | Audience | "Parents, many of whom read English as a second language." |
| R | Response | "A 200-word notice plus a three-line SMS version." |

**Use it for:** anything a customer, parent, patient or member of the public will read, where the wrong tone does real damage. **Skip it for:** internal analysis, where tone and audience are you.

## Framework 3: RISEN

RISEN (Role, Instructions, Steps, End goal, Narrowing) is for tasks with stages that must happen in a specific order.

A worked example from an accounts team:

> **Role:** You are a financial analyst. **Instructions:** Review the attached three months of sales data. **Steps:** 1) Flag any month where returns exceed 5% of sales. 2) Identify the three products with the largest decline. 3) Suggest one likely cause for each, labelled as a hypothesis. **End goal:** a one-page brief for the managing director's Monday meeting. **Narrowing:** Use only the data provided. Do not speculate about competitors. Show every figure you calculate.

The "Narrowing" step is the part people forget and the part that prevents the most errors. Telling a model what it must *not* do is as important as telling it what to do.

**Use it for:** multi-step analysis, reports and anything you would otherwise do over five back-and-forth messages. **Skip it for:** single-step tasks, where it adds ceremony.

## Framework 4: few-shot (show, don't describe)

Instead of describing the output you want, show two or three finished examples and ask for one more in the same pattern.

> Here are three product descriptions from our online store. Write one for the item below in exactly the same style, length and structure.
>
> Example 1: …
> Example 2: …
> Example 3: …
>
> New item: Handwoven dhaka shawl, 180 × 70 cm, cotton, made in Palpa.

This is the single fastest way to get output in your organisation's voice. A paragraph describing your brand voice ("friendly but professional, concise, warm") is interpreted generically. Three real samples are not.

**Use it for:** anything repetitive where consistency matters: product descriptions, social posts, report sections, email replies. **Watch out for:** the model copying your examples too closely. Use examples that differ from each other in content and agree only in style.

## Framework 5: ask-first (reverse prompting)

End any prompt with:

> Before you start, ask me up to five questions that would help you do this well. Wait for my answers.

This is the most underused technique I teach, and the one participants say they keep using months later. The model is good at spotting what is missing from a brief, and answering five questions is far quicker than writing a perfect prompt from scratch. It turns the model from a guesser into an interviewer.

**Use it for:** proposals, plans, strategies, anything where you know roughly what you want but have not thought it through. **Skip it for:** tasks where you already know every detail.

## Framework 6: critique and revise

The first answer is a draft. Treat it like one.

1. Ask for the output.
2. Then: "Critique this as a sceptical [director / customer / examiner] would. List the five weakest points."
3. Then: "Rewrite it fixing those points."

This works because models are often better at evaluating text than at producing it perfectly in one pass. It also forces you to look at the output critically, which is where [verification habits](/blog/introduce-ai-to-your-team) start.

**Use it for:** anything going outside the organisation: proposals, public posts, policy documents. **Skip it for:** low-stakes internal notes.

## Which framework, when

| Situation | Framework | Why |
|---|---|---|
| Everyday writing and summaries | RTCF | Covers the four gaps; easy to remember |
| Customer- or public-facing text | CO-STAR | Audience and tone get their own slots |
| Multi-step analysis | RISEN | Forces order and limits |
| Repetitive content in a house style | Few-shot | Examples beat descriptions |
| Vague or strategic brief | Ask-first | The model interviews you |
| Anything leaving the building | Critique and revise | A second pass catches the weak points |

You can combine them. A good proposal prompt is often RTCF plus two examples plus "ask me questions first", followed by one round of critique.

## What frameworks will not fix

Honesty matters here, because a lot of prompting advice online oversells.

- **Wrong facts in, wrong facts out.** No structure fixes missing or incorrect context. If the model does not have your price list, it will invent one that sounds right.
- **Reasoning models need less scripting.** The newest reasoning models plan their own steps, and both OpenAI and Anthropic now advise against micro-managing how they think. Give them the goal, the context and the constraints, then let them work. The brief still matters; the "think step by step" incantation matters less than it did.
- **Some tasks are not language tasks.** If the job is really "look up the right number in our system", the answer is an [automation](/services/ai-automation), not a better prompt.
- **Formatting tricks date quickly.** Anthropic's documentation recommends XML-style tags such as `<context>` and `<instructions>` to separate parts of a long prompt, and they genuinely help with long inputs. For a short prompt, plain labelled lines work just as well in every major assistant.

## Make it a team habit, not a personal skill

The organisations that get real value from AI do not have one person who is good at prompting. They have a shared folder of prompt templates, written in one framework, for the five or six tasks the team does most. New staff use the templates on day one, and the templates improve every time someone finds a better version.

That is what the hands-on part of my [corporate AI workshop](/blog/ai-training-syllabus-nepal) produces: each participant leaves with a working, saved template for a real task from their own job, written in the framework the team agreed on. For teams that want to go further, the templates become the starting point for [a company AI assistant built on your own documents](/blog/company-ai-assistant-own-documents) or [automated workflows](/blog/ai-automation-examples-nepal) that run without anyone typing a prompt at all.

If your team uses ChatGPT, Claude or Gemini every day and the results are still hit and miss, the problem is almost never the tool. [Book a session](/ai-trainer-nepal) and we will build your team's templates on your own work, or [send me a message](/contact) describing the tasks you want to fix.

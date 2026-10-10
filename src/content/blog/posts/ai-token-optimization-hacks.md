---
title: "Token Optimisation Hacks: Get More From ChatGPT and Claude for Less"
description: "Twelve token optimisation habits for ChatGPT and Claude: markdown files, temporary and incognito chats, Projects, model choice, memory settings and caching."
publishedAt: "2026-10-10"
cluster: "ai-training"
readingMinutes: 8
tags: ["tokens", "token optimization", "ChatGPT", "Claude", "productivity", "AI training"]
keywords:
  - "token optimization"
  - "token optimisation ChatGPT"
  - "reduce Claude usage limit"
  - "save tokens ChatGPT"
  - "ChatGPT temporary chat"
  - "Claude incognito chat"
  - "markdown files for AI"
  - "AI cost optimisation business"
keyTakeaways:
  - "Every message in a chat resends the whole conversation to the model, so a long chat costs more with each reply. Starting a fresh chat for each new task is the single biggest token saving most people can make."
  - "Use temporary chats for one-off tasks: ChatGPT's Temporary Chat and Claude's incognito chat keep the task out of your history and memory, so a quick translation does not bloat or skew future answers."
  - "Keep reusable instructions in a markdown (.md) file or a Project rather than retyping them. Anthropic states that content in Claude Projects is cached and counts less against usage limits when reused."
  - "Convert PDFs and Word files to plain text or markdown before uploading when the layout does not matter. Models process every page of a PDF, including images, which can multiply the tokens for the same words."
  - "For businesses on the API, prompt caching and batch processing are the largest levers: Anthropic charges a tenth of the normal input price or less for cached reads and half price for batch jobs."
serviceSlugs: ["ai-automation", "it-consulting"]
heroImage:
  src: "/media/blog/ai-token-optimization-hacks.jpg"
  alt: "A laptop on a desk showing a chat assistant beside an open notebook with a short checklist written in pen"
  width: 1600
  height: 900
faqs:
  - id: "faq-what-is-token"
    question: "What is a token in ChatGPT or Claude?"
    answer: "A token is the unit a model reads and writes, roughly three-quarters of an English word on average. Everything counts: your message, the earlier conversation the model rereads, uploaded files, instructions and the reply. Subscription plans turn tokens into usage limits; the API charges per million tokens. Nepali text in Devanagari usually takes more tokens per word than English."
  - id: "faq-new-chat"
    question: "Does starting a new chat really save usage?"
    answer: "Yes. A model has no memory of the conversation between messages; the app sends the whole chat back each time. By message forty, every short question carries the weight of the previous thirty-nine. Anthropic lists conversation length as a factor in Claude's usage, and the same mechanics apply to ChatGPT. Summarise what matters, then start fresh."
  - id: "faq-temporary-safe"
    question: "Is a temporary or incognito chat private?"
    answer: "It is more private, not invisible. ChatGPT's Temporary Chat stays out of your history, does not create memories and is not used for training. Claude's incognito chats are not saved to history or memory, though Anthropic retains them for thirty days. Neither makes it acceptable to paste confidential client or personal data into a consumer account."
  - id: "faq-team-help"
    question: "Can you set this up for our team?"
    answer: "Yes. I help teams set up shared Projects, markdown instruction files and prompt templates, choose the right plan and model for each job, and write a short usage guide. For businesses using the API, I review the integration for caching, batching and model choice, which often cuts the monthly bill substantially without changing the output."
---

Two complaints come up in almost every AI training session I run in Nepal. Individuals say "Claude keeps telling me I have hit my limit" or "ChatGPT gets worse the longer I use it". Businesses on the API say "the bill went up faster than usage". Both have the same root cause: tokens, and how carelessly most of us spend them.

You do not need to understand the maths to fix this. These are the twelve habits I teach, grouped by who they help, with what each one actually changes.

## Why tokens matter even on a flat-rate plan

A token is the unit a model reads and writes, roughly three-quarters of an English word. Everything the model processes counts: your message, the uploaded file, any instructions, the reply, and, the part most people miss, **the entire conversation so far**.

A model does not remember your chat between messages. The app sends the whole conversation back with every new message. So message one might cost a few hundred tokens, and message forty costs the sum of everything before it.

<figure>
<svg viewBox="0 0 640 300" role="img" aria-labelledby="token-growth-title" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;font-family:inherit"><title id="token-growth-title">Tokens processed per message in one long chat versus fresh chats, illustrative</title><text x="0" y="16" font-size="14" font-weight="600" fill="var(--color-fg)">Tokens the model reads for each message (illustrative)</text><text x="0" y="34" font-size="11.5" fill="var(--color-muted)">Assumes each question and answer adds 500 tokens</text><line x1="60" y1="250" x2="630" y2="250" stroke="var(--color-border)"/><g font-size="11" fill="var(--color-muted)" text-anchor="end"><text x="52" y="254">0</text><text x="52" y="204">2.5k</text><text x="52" y="154">5k</text><text x="52" y="104">7.5k</text><text x="52" y="54">10k</text></g><g stroke="var(--color-border)" stroke-dasharray="2 4"><line x1="60" y1="200" x2="630" y2="200"/><line x1="60" y1="150" x2="630" y2="150"/><line x1="60" y1="100" x2="630" y2="100"/><line x1="60" y1="50" x2="630" y2="50"/></g><g fill="var(--color-primary)"><rect x="66" y="240" width="20" height="10" rx="2"/><rect x="94" y="230" width="20" height="20" rx="2"/><rect x="122" y="220" width="20" height="30" rx="2"/><rect x="150" y="210" width="20" height="40" rx="2"/><rect x="178" y="200" width="20" height="50" rx="2"/><rect x="206" y="190" width="20" height="60" rx="2"/><rect x="234" y="180" width="20" height="70" rx="2"/><rect x="262" y="170" width="20" height="80" rx="2"/><rect x="290" y="160" width="20" height="90" rx="2"/><rect x="318" y="150" width="20" height="100" rx="2"/><rect x="346" y="140" width="20" height="110" rx="2"/><rect x="374" y="130" width="20" height="120" rx="2"/><rect x="402" y="120" width="20" height="130" rx="2"/><rect x="430" y="110" width="20" height="140" rx="2"/><rect x="458" y="100" width="20" height="150" rx="2"/><rect x="486" y="90" width="20" height="160" rx="2"/><rect x="514" y="80" width="20" height="170" rx="2"/><rect x="542" y="70" width="20" height="180" rx="2"/><rect x="570" y="60" width="20" height="190" rx="2"/><rect x="598" y="50" width="20" height="200" rx="2"/></g><line x1="66" y1="240" x2="618" y2="240" stroke="var(--color-fg)" stroke-width="2" stroke-dasharray="6 4"/><g font-size="11" fill="var(--color-muted)" text-anchor="middle"><text x="76" y="268">1</text><text x="318" y="268">10</text><text x="608" y="268">20</text><text x="342" y="288">Message number</text></g><text x="150" y="78" font-size="12" font-weight="600" fill="var(--color-primary)">One long chat: 105,000 tokens over 20 messages</text><line x1="150" y1="92" x2="176" y2="92" stroke="var(--color-fg)" stroke-width="2" stroke-dasharray="6 4"/><text x="184" y="96" font-size="12" font-weight="600" fill="var(--color-fg)">Fresh chat per task: 10,000 tokens</text></svg>
<figcaption>Same twenty questions. In one long chat the model rereads everything before each answer; in fresh chats it reads only the task at hand.</figcaption>
</figure>

On a subscription, that shows up as hitting your limit by lunchtime. On the API, it shows up on the invoice. And there is a quality cost too: very long chats bury your actual instructions under old, irrelevant text, so answers drift.

## Habits for everyday users

### 1. One task, one chat

When the topic changes, start a new chat. This is the largest single saving most people can make, and it usually improves answers too. If the old chat contains context you need, ask for a summary first ("Summarise the decisions and facts from this chat in ten bullet points"), then paste that summary into the new one.

### 2. Use temporary chats for throwaway tasks

Translating a paragraph, checking a formula, rewording an email: none of these need to be in your history or shape your future answers.

- **ChatGPT: Temporary Chat.** It does not appear in your history, does not create memories and is not used to train models. You can now choose before the first message whether it may read your existing memories or ignore them.
- **Claude: incognito chat.** It is not saved to your chat history, does not use your existing memory and does not add to it. Anthropic retains it for thirty days, and it is not available inside Projects.
- **Gemini: temporary chats**, now on the main screen.

The saving here is less about the single chat and more about keeping your memory and history clean, so that the context the model carries into real work is relevant rather than a pile of one-off requests.

### 3. Edit the prompt instead of arguing with the answer

When an answer misses, most people reply "No, I meant…" and the failed attempt stays in the conversation forever, reread with every later message. Instead, click edit on your original message, fix it, and regenerate. The bad branch drops out of the context.

### 4. Batch related questions

Three questions about the same document in one message cost less than three separate messages, because the document is processed once. Anthropic's own usage guidance recommends exactly this.

### 5. Ask for the length you need

"Answer in five bullet points" or "under 150 words" saves output tokens, which are typically the more expensive kind, and saves you reading time. Models default to thorough. Tell them when you want brief.

### 6. Match the model to the job

Every assistant now offers a fast, light model and a slower, more capable one. Summarising an email does not need the flagship. On Claude, the model you choose, the effort level and the tools switched on all affect how fast you use your allowance. Turn off web search or extended thinking when a task does not need them.

## Habits for people who use AI daily

### 7. Keep your instructions in a markdown file

If you paste the same background into every chat ("I work for a cooperative in Chitwan, our tone is…, our products are…"), write it once as a markdown file: a plain `.md` text file with headings and bullet points.

Markdown is ideal because it is the format models read most efficiently: structure without the overhead of Word formatting or PDF layout. Then either attach the file when you need it, or better, put it in a Project (next habit). Developers already work this way: Claude Code reads a `CLAUDE.md` file of project instructions, and Claude's Skills are built around a `SKILL.md` file.

A useful starter file has five sections: who you are and your organisation; your audience; your house style; words and claims to avoid; and three examples of output you liked.

### 8. Put recurring work in a Project

ChatGPT, Claude and Gemini all let you group chats with shared files and instructions. On Claude, Anthropic states that content in Projects is cached and counts less against your limits when reused, and on paid plans Projects switch automatically to retrieval when the knowledge grows large, which lets them hold up to ten times more. One Project per recurring job (monthly report, proposal writing, customer replies) beats re-uploading the same files every week.

### 9. Convert files before uploading

A forty-page PDF with logos, scanned signatures and charts costs far more to process than the same words as plain text, because the model works through each page's images as well as the text. When layout does not matter, copy the text out or convert to markdown first. Tables survive well as markdown or CSV. Keep the PDF only when the visual layout is the point.

### 10. Manage memory deliberately

Memory is useful, and from late August 2026 Claude turns it on by default for individual plans. But a memory full of stale or irrelevant facts quietly shapes every answer. Review it every month or two in settings, delete what no longer applies, and turn memory off for a chat when you want an answer uninfluenced by your history.

## Habits for businesses on the API

### 11. Turn on prompt caching

If your application sends the same long instructions or documents with every request, caching lets the provider reuse them. Anthropic charges a tenth of the normal input price for cached reads on most models, and a twentieth on Opus 5.5 and Sonnet 5.5. OpenAI applies a similar discount to repeated input automatically. For a support assistant with a long policy document in every request, this alone can cut input costs dramatically.

### 12. Batch what does not need to be instant

Overnight report generation, bulk classification of last month's enquiries, translating a product catalogue: none of it needs an answer in two seconds. Anthropic's Batch API is half price. Pair that with the smallest model that does the job well (Claude Haiku 5.5 is $0.10 per million input tokens, a fortieth of Opus 5.5) and the bill for bulk work becomes almost trivial.

One more API note: token counts are not stable across model generations. Anthropic's release notes for Sonnet 5 flagged that its new tokeniser produces noticeably more tokens for the same text. Re-measure your costs whenever you switch models; do not assume last quarter's numbers hold.

## The quick reference

| Habit | Saves | Effort |
|---|---|---|
| New chat per task | Large | None |
| Temporary or incognito chat for one-offs | Memory and history clutter | None |
| Edit instead of correcting | Medium | None |
| Batch questions | Medium | Low |
| Ask for short answers | Medium | None |
| Right model for the job | Medium to large | Low |
| Instructions in a markdown file | Medium, plus consistency | One hour once |
| Projects for recurring work | Large on Claude | One hour once |
| Convert PDFs to text | Large for heavy files | Low |
| Review memory | Quality more than tokens | Ten minutes a month |
| Prompt caching (API) | Very large | Developer time |
| Batch processing (API) | Half price | Developer time |

## Where these habits do not matter

To be fair: if you use ChatGPT a few times a week for short questions, none of this will change your life, and you should not spend an afternoon optimising it. These habits matter for people who use AI for hours a day, teams sharing a business plan, and anyone paying by the token.

## How I help teams with this

Token habits are part of every [AI training session](/ai-trainer-nepal) I run, because they are where daily users feel the difference within a week. For teams, I set up the shared pieces: a markdown instruction file in the organisation's voice, a Project for each recurring job, [prompt templates in one agreed framework](/blog/ai-prompting-frameworks), and a one-page guide on which model and which chat type to use when.

For businesses building on the API, I review the integration itself: caching, batching, model choice and prompt length. That is usually a short [consulting engagement](/services/it-consulting) that pays for itself in the first month, and it pairs naturally with [automation work](/services/ai-automation) where the same principles apply at scale.

If your team keeps hitting limits or your API bill keeps climbing, [send me a message](/contact) with what you use and roughly how much, and I will tell you where the waste is likely to be.

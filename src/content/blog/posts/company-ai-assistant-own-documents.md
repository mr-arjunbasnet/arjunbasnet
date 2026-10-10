---
title: "Build a Company AI Assistant From Your Own Documents: Projects, GPTs and Custom Builds"
description: "How to build an AI assistant that answers from your company's own documents using Claude Projects, ChatGPT or a custom build: setup, data rules and costs."
publishedAt: "2026-10-10"
cluster: "ai-automation"
readingMinutes: 7
tags: ["AI assistant", "Claude Projects", "ChatGPT", "knowledge base", "RAG", "Nepal"]
keywords:
  - "company AI assistant"
  - "AI assistant trained on company documents"
  - "Claude Projects for business"
  - "custom GPT for company"
  - "internal knowledge base AI"
  - "RAG chatbot Nepal"
  - "AI chatbot development Nepal"
keyTakeaways:
  - "A company AI assistant does not need to be trained on your data. It reads your documents when it answers, a technique called retrieval, so updating it means replacing a file, not retraining a model."
  - "Most organisations can build a working internal assistant in an afternoon inside a business subscription: Claude Projects, ChatGPT Projects or Workspace Agents, or Google's Gemini with NotebookLM. A custom build is only needed for customer-facing use, role-based access or connections to your own systems."
  - "The biggest cause of wrong answers is not the AI but the documents: outdated versions, duplicates and contradictory policies. Cleaning and de-duplicating the source files does more for accuracy than any prompt."
  - "Every company assistant should be instructed to answer only from the provided documents, cite which document it used, and say 'I don't know' rather than guess. Those three rules prevent most embarrassing answers."
  - "Use a business plan, not personal accounts, for company documents. Claude Team and Enterprise and ChatGPT Business and Enterprise do not use your data to train models by default; consumer plans depend on each user's settings."
serviceSlugs: ["ai-automation", "custom-software-development", "it-consulting"]
heroImage:
  src: "/media/blog/company-ai-assistant-own-documents.jpg"
  alt: "An office employee reaching for a labelled ring binder on a shelf of company files"
  width: 1600
  height: 900
  credit:
    provider: "Pexels"
    author: "Andrea Piacquadio"
    authorUrl: "https://www.pexels.com/@olly"
    sourceUrl: "https://www.pexels.com/photo/woman-looking-at-folders-3791159/"
faqs:
  - id: "faq-train-on-data"
    question: "Do we need to train an AI model on our documents?"
    answer: "Almost never. Modern assistants use retrieval: when someone asks a question, the system finds the relevant passages in your documents and gives them to the model along with the question. Nothing is retrained. That makes it cheaper, faster to update and easier to audit, because every answer can point to the document it came from. Fine-tuning is for style and narrow tasks, not company knowledge."
  - id: "faq-cost"
    question: "How much does a company AI assistant cost?"
    answer: "An internal assistant built inside an existing business subscription costs nothing extra beyond the seats, plus a day or two of setup and document clean-up. A custom assistant on your website or WhatsApp is a software project: build cost depends on integrations and access rules, and running costs are usually modest because each answer uses a small amount of model usage."
  - id: "faq-wrong-answers"
    question: "What if the assistant gives a wrong answer?"
    answer: "It will occasionally, so design for it. Require it to cite the source document so staff can check, instruct it to say when the documents do not cover a question, and keep a human in the loop for anything customer-facing or contractual. Review a sample of real questions monthly; most errors trace back to an outdated or contradictory document."
  - id: "faq-nepali-docs"
    question: "Will it work with documents in Nepali?"
    answer: "Typed Unicode Nepali works reasonably well, and staff can ask in Nepali or English. Scanned PDFs, images of documents and old Preeti-font files do not: they need converting to Unicode text first, or the assistant will read garbage. Mixed-language organisations often keep the authoritative version in one language and let the assistant translate answers."
---

Every organisation has the same few questions asked again and again. "What is the leave policy?" "Which form do I use for a refund?" "What is the current price for the three-day package?" The answers exist, somewhere in a shared drive, an old email or one experienced person's head.

A company AI assistant answers those questions from your own documents, with a pointer to where the answer came from. It is one of the most useful first AI projects for an organisation in Nepal, and in many cases it can be built in an afternoon with tools you may already pay for. This post covers the three ways to build one, the steps that decide whether it works, and when you need a custom build.

## How it works (and why you do not need to "train" anything)

A common misconception is that the AI has to be trained on your data. It does not. The approach every serious assistant uses is **retrieval**: when someone asks a question, the system searches your documents for the relevant passages and hands them to the model together with the question. The model writes the answer from those passages.

That has three practical consequences:

- **Updating is easy.** Replace the old price list with the new one and the next answer uses it.
- **Answers can be checked.** The assistant can say which document it used.
- **Nothing leaves your control permanently.** Your documents are read at answer time, not baked into a model.

<figure>
<svg viewBox="0 0 640 226" role="img" aria-labelledby="assistant-flow-title" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;font-family:inherit"><title id="assistant-flow-title">How a company AI assistant answers from your documents</title><defs><marker id="assistant-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--color-primary)"/></marker></defs><text x="0" y="16" font-size="14" font-weight="600" fill="var(--color-fg)">How a company assistant answers a question</text><g font-size="12.5"><rect x="0" y="50" width="130" height="150" rx="10" fill="var(--color-surface)" stroke="var(--color-border)"/><text x="65" y="76" text-anchor="middle" font-weight="700" fill="var(--color-fg)">Your documents</text><text x="65" y="104" text-anchor="middle" fill="var(--color-muted)">Policies</text><text x="65" y="124" text-anchor="middle" fill="var(--color-muted)">Price lists</text><text x="65" y="144" text-anchor="middle" fill="var(--color-muted)">Procedures</text><text x="65" y="164" text-anchor="middle" fill="var(--color-muted)">Product sheets</text><text x="65" y="184" text-anchor="middle" fill="var(--color-muted)">FAQs</text><rect x="170" y="95" width="130" height="60" rx="10" fill="var(--color-surface)" stroke="var(--color-border)"/><text x="235" y="121" text-anchor="middle" font-weight="700" fill="var(--color-fg)">Retrieval</text><text x="235" y="140" text-anchor="middle" font-size="11.5" fill="var(--color-muted)">finds the passages</text><rect x="340" y="95" width="130" height="60" rx="10" fill="var(--color-primary)"/><text x="405" y="121" text-anchor="middle" font-weight="700" fill="var(--color-primary-fg)">AI model</text><text x="405" y="140" text-anchor="middle" font-size="11.5" fill="var(--color-primary-fg)">+ your instructions</text><rect x="510" y="95" width="130" height="60" rx="10" fill="var(--color-surface)" stroke="var(--color-border)"/><text x="575" y="121" text-anchor="middle" font-weight="700" fill="var(--color-fg)">Answer</text><text x="575" y="140" text-anchor="middle" font-size="11.5" fill="var(--color-muted)">source cited</text><text x="405" y="60" text-anchor="middle" font-size="11.5" fill="var(--color-muted)">Staff question</text><text x="405" y="196" text-anchor="middle" font-size="11.5" fill="var(--color-muted)">Not in the documents?</text><text x="405" y="214" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--color-fg)">"I don't know" + who to ask</text></g><g fill="none" stroke="var(--color-primary)" stroke-width="1.6" marker-end="url(#assistant-arrow)"><path d="M130 125 L168 125"/><path d="M300 125 L338 125"/><path d="M470 125 L508 125"/><path d="M405 66 L405 93"/></g></svg>
<figcaption>Retrieval, not retraining: change a document and the next answer changes with it.</figcaption>
</figure>

## Three ways to build one

| Approach | Tools | Good for | Limits |
|---|---|---|---|
| Inside a subscription | Claude Projects; ChatGPT Projects, Custom GPTs or Workspace Agents; Gemini and NotebookLM | Internal staff assistant, quickly, at no extra cost | Staff need seats; limited access control; not for customers |
| Connected to live files | The same tools with connectors to Google Drive, Microsoft 365 or SharePoint | Teams whose documents change often | Only as good as the drive's organisation; permissions need care |
| Custom build | An assistant built on the Claude or OpenAI API with your own retrieval, interface and rules | Customer-facing (website, WhatsApp), role-based access, links to your systems, usage logs | A software project with build and maintenance cost |

### Inside a subscription

**Claude Projects** is where I start most internal assistants. A Project holds documents and standing instructions, and every chat inside it uses them. On paid plans, when the knowledge grows large, Claude switches automatically to retrieval, which lets a Project hold up to ten times more material. On Team and Enterprise plans, Projects can be shared with colleagues. Claude also connects to Google Drive and, since July 2026, to Microsoft 365 with access to mail, calendar and SharePoint files.

**ChatGPT** offers Projects for grouping files and instructions, Custom GPTs for a shareable assistant, and, on Business and Enterprise plans since April 2026, **Workspace Agents**, which OpenAI positions as the successor to Custom GPTs for organisations and which connect to tools like Slack and Salesforce.

**Google** is replacing Gemini Gems with Skills (announced 30 September 2026), and **NotebookLM** remains a strong option for a document-grounded research assistant, especially for teams already on Google Workspace.

All three are good enough for an internal assistant. Choose the platform your organisation already pays for and administers, rather than adding a new subscription for this.

## Building one in an afternoon: the steps that matter

### 1. Pick one job, not "everything"

"HR policy questions" or "product and price questions for the sales team" works. "Everything about the company" does not. A narrow assistant gives better answers and is easier to test. You can add a second one later.

### 2. Gather the source documents, and clean them

This is the step that decides whether the assistant is any good, and the one people skip. Before uploading:

- **Remove outdated versions.** If "Leave Policy 2023" and "Leave Policy 2025 final v2" are both in the folder, the assistant may quote either. Keep one authoritative version of each document.
- **Resolve contradictions.** If two documents disagree, the assistant cannot know which is right. Neither can a new employee.
- **Convert to text where layout does not matter.** Plain text or markdown is read more reliably and costs less than scanned or image-heavy PDFs. I explain why in [token optimisation habits](/blog/ai-token-optimization-hacks).
- **Fix legacy Nepali files.** Preeti-font documents and scans must be converted to Unicode text first.

Ten to thirty clean documents usually beat two hundred messy ones.

### 3. Write the instructions

The standing instructions are a prompt like any other, and the [same frameworks apply](/blog/ai-prompting-frameworks). A starting point I use:

> You are the internal assistant for [organisation]'s [team]. Answer staff questions using only the documents in this project.
>
> Always name the document your answer comes from. If the documents do not answer the question, say "The documents I have do not cover this" and suggest asking [name or role]. Never guess policy, prices or dates.
>
> Keep answers short: the direct answer first, then the detail. Answer in the language the question was asked in, English or Nepali.

The three rules in the middle paragraph (only from the documents, cite the source, say when you do not know) prevent most embarrassing answers.

### 4. Test with twenty real questions

Ask the people who will use it for the twenty questions they actually get asked, including awkward ones. Check every answer against the documents. Where it is wrong, the cause is usually a document, not the AI: fix the document and test again.

### 5. Give it an owner

Assign one person to keep the documents current and review a sample of questions each month. An assistant with no owner drifts out of date within a quarter, and then staff stop trusting it.

## Data rules: what goes in and what stays out

Use a **business plan** for company documents, not employees' personal accounts. Claude Team and Enterprise and ChatGPT Business and Enterprise do not use your data to train models by default. On consumer plans, that depends on each user's settings, which you cannot control.

Even on a business plan, some material does not belong in a general staff assistant: salaries, individual HR cases, customer personal data, unpublished financials. If people with different access rights need different answers, that is the point at which you need a custom build with role-based access, not a shared Project.

## When you need a custom build

An assistant inside a subscription is the right first step for most organisations. A custom build becomes worth it when:

- **Customers will use it.** On your website, in WhatsApp or Messenger, without an account on any AI service.
- **Access must vary by role.** Managers see what staff do not.
- **It needs live data from your systems.** Stock levels, booking availability or order status, not only documents.
- **You need records.** Logs of every question and answer, for quality and compliance.
- **Volume is high.** Hundreds of conversations a day are cheaper on the API than on seats.

That is the kind of assistant I build as part of my [AI automation](/services/ai-automation) and [custom software](/services/custom-software-development) work: grounded in the client's own content, instructed to cite sources and hand off when unsure, and connected to the systems that hold live data. The [assistant on this site](/assistant) follows the same rule: it answers only from this site's own pages and says so when a question falls outside them.

From there, the natural next step is an assistant that does not only answer but acts, such as drafting the reply or updating the record. That is where [AI agents](/blog/ai-agents-for-business-nepal) come in.

## How I can help

- **Afternoon setup.** I build your first internal assistant inside the subscription you already use, including the document clean-up and the instructions, and train the owner to maintain it.
- **Custom assistants.** Customer-facing or system-connected assistants for websites, WhatsApp and internal tools.
- **Team training.** An assistant only helps if people use it well. A [training session](/ai-trainer-nepal) alongside the launch makes the difference between a tool people try once and one they rely on.

[Tell me which questions your team answers again and again](/contact), and I will suggest which of the three approaches fits.

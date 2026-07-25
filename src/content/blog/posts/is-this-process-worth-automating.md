---
title: "How to Tell If a Process Is Worth Automating"
description: "Automation pays off on high-frequency, rule-heavy, low-judgement work with reliable inputs. Here is the test I run before quoting anything."
publishedAt: "2026-07-22"
cluster: "ai-automation"
readingMinutes: 6
tags: ["AI Automation", "n8n", "Process"]
keywords:
  - "is automation worth it"
  - "business process automation Nepal"
  - "what to automate first"
  - "n8n Nepal"
keyTakeaways:
  - "Four tests: is the task frequent, rule-based, low-judgement, and built on reliable data? A no on any one of them usually means do not automate it yet."
  - "Automating a broken process produces bad output faster. Fix the process first, then automate it."
  - "Company size is the wrong measure. A five-person firm producing forty quotations a month benefits more than a fifty-person firm producing four."
  - "Judge cost against the salary value of the hours replaced, not against the tooling."
serviceSlugs: ["ai-automation", "it-consulting"]
faqs:
  - id: "faq-cut-staff"
    question: "Does automation mean cutting staff?"
    answer: "In every engagement I have delivered it meant the same people stopped doing data entry and started doing review, exceptions, and client work. Automation removes tasks, not roles. If headcount reduction is genuinely the goal, say so up front, because it changes which processes are worth automating first."
  - id: "faq-too-small"
    question: "Is our business too small to automate anything?"
    answer: "Size is the wrong test — frequency is the right one. If nobody on your team spends several hours a week on a repetitive, rule-based task, automation is not your bottleneck and something else deserves the budget."
---

Most automation projects that fail were not badly built. They automated the wrong thing.

Before quoting any automation work, I run the same four tests. They take about twenty minutes and they save considerably more than that.

## Test 1: Is it frequent enough?

Automation has a fixed setup cost and a near-zero running cost. That maths only works when the task repeats.

The useful threshold is not company size but hours per week. A five-person firm producing forty quotations a month has a stronger case than a fifty-person firm producing four. If the honest answer is that someone does this twice a quarter, the payback period is measured in years and the budget belongs somewhere else.

Ask the person who actually does the task how long it takes and how often. Not their manager — the answers differ more than you would expect.

## Test 2: Is it rule-based?

Every step needs to be expressible as a rule, even a complicated one. "Match the invoice number to the purchase order, flag anything over 5 percent variance" is a rule. "Use your judgement about whether this client will be difficult" is not.

The revealing question is: *what happens when it is not straightforward?* If the answer involves calling someone, or a decision that depends on relationship history, that part stays human. Often the right shape is automating eighty percent and routing the exceptions to a person — which is a better outcome than either extreme.

## Test 3: Is the underlying data reliable?

This is where most projects quietly die.

If the input is a spreadsheet where three people use different date formats, product names are inconsistently spelled, and some rows have notes in the amount column, automation will faithfully process all of that and produce confident nonsense.

Automating a broken process only makes it produce bad output faster. Sometimes the genuinely valuable engagement is cleaning up the data and standardising the process, and the automation afterwards is almost trivial. That is a less exciting proposal to receive, and it is frequently the correct one.

## Test 4: Is the process stable?

If the workflow changed twice in the last year for good business reasons, it will change again. Automation encodes a process; a process that keeps moving means an automation that keeps needing rework, and the maintenance cost eats the saving.

Wait until it settles. Or automate only the stable parts and leave the volatile steps manual.

## What passes these tests

Across the workflows I have built, the reliable candidates look like this:

- **Quotation generation.** Structured inputs, deterministic pricing rules, high frequency, output that a person reviews before sending.
- **Recurring audits and reports.** Same checks, same format, run on a schedule. Compressing a ten-hour cycle to about two is typical.
- **Document processing.** Extracting fields from invoices, receipts, or forms and writing them somewhere structured, instead of re-keying.
- **Lead routing.** Enquiry arrives, gets classified, gets assigned, gets acknowledged, without anyone watching an inbox.
- **Content repurposing.** One source asset reformatted for several channels.

What consistently fails: anything involving negotiation, anything where the rules live only in one experienced person's head and have never been written down, and anything where the source data has never been cleaned.

## Judging the cost

The comparison that matters is not against the tooling — it is against the salary value of the hours being replaced.

Work out what the process costs today: hours per week, multiplied by the loaded cost of whoever does it, plus the cost of the errors and delays it produces. A process consuming ten hours a week is a substantial annual number before you count anything else.

Against that, most single workflows pay for themselves in months rather than years. If the arithmetic does not work at that level, it will not be rescued by a better tool.

## Start with one

The strongest signal that an automation proposal is honest is that it scopes one workflow rather than a platform.

One workflow, delivered end to end, run in parallel with the manual process for a couple of weeks so the exceptions surface. Then you have evidence rather than a projection, and the second workflow is scoped against something real.

Anyone proposing to automate your whole operation before delivering one working thing is selling a plan, not a result.

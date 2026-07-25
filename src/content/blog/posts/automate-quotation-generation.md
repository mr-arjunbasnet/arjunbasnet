---
title: "Automating Quotation Generation: A Worked Example"
description: "Quotations are the most commonly automated process I build, and the most reliably worthwhile. Here is what the workflow looks like end to end."
publishedAt: "2026-07-18"
cluster: "ai-automation"
readingMinutes: 6
tags: ["AI Automation", "n8n", "Sales Ops"]
keywords:
  - "automate quotations"
  - "quotation automation Nepal"
  - "n8n quotation workflow"
  - "sales automation Nepal"
keyTakeaways:
  - "Quotations pass every automation test: high frequency, rule-based pricing, structured inputs, and a human review step before anything is sent."
  - "The build is the easy part. Extracting the pricing rules that live in someone's head is the actual work."
  - "Always keep a human approval step. Automated pricing sent without review is how a decimal error becomes a contract."
  - "Turnaround typically moves from next-day to same-hour, which changes win rates independently of price."
serviceSlugs: ["ai-automation", "custom-software-development"]
faqs:
  - id: "faq-pricing-secret"
    question: "Does our pricing logic leave our systems?"
    answer: "It does not have to. Pricing rules live in the workflow on your own infrastructure when self-hosted. Only the language-heavy steps — drafting the covering note, for instance — call an external model, and those calls can be scoped to exclude the pricing table entirely."
  - id: "faq-complex-pricing"
    question: "Our pricing is complicated. Can it still work?"
    answer: "Complicated is fine as long as it is expressible as rules, even many of them. What does not automate is pricing that depends on judgement about the client — how much they will tolerate, whether they are likely to be difficult. That part stays with a person, which is why the approval step exists."
---

Of every process I have automated, quotation generation is the one that most reliably pays for itself. It passes every test worth applying: high frequency, rule-based logic, structured inputs, and a natural human checkpoint before anything reaches a client.

Here is what the work actually looks like.

## Why quotations are a good candidate

Most businesses producing quotations do it the same way. Someone receives an enquiry, opens last month's quotation, changes the client name, adjusts line items, recalculates totals by hand, exports a PDF, writes a covering email, and sends it. Then they log it somewhere, or forget to.

That is thirty to ninety minutes per quotation depending on complexity. At forty quotations a month it is a meaningful fraction of someone's working life, and every step is mechanical apart from two: deciding what the client actually needs, and deciding whether the price is right.

Those two steps stay human. Everything between them is automatable.

## Step one: extract the rules

This is the real work, and it takes longer than the build.

Pricing logic almost always lives partly in a document and partly in the head of whoever has been doing it longest. The documented version and the actual version differ. Sitting with that person and working through recent quotations surfaces things like: *we don't charge setup for existing clients*, *anything under a certain size gets a minimum*, *if it's outside the valley we add travel*.

None of that was written down. All of it is a rule.

Expect to spend three to five days here. Any proposal that skips straight to building has not found these rules yet, and they will surface later as bugs.

## Step two: structure the input

Automation needs the enquiry to arrive in a shape it can read.

Usually this means a form — on the website, or internal for the sales team — that captures the fields the pricing rules depend on. Free-text email enquiries can be parsed by a language model, and that works reasonably well, but a structured form is more reliable and cheaper to run.

This step often improves the process on its own, before any automation exists, because it forces clarity about what information is actually needed to quote.

## Step three: build the workflow

In n8n, the shape is roughly:

1. **Trigger** — form submission or a new row in a sheet.
2. **Validate** — required fields present, values in range. Anything failing routes to a person rather than proceeding on bad input.
3. **Calculate** — apply the pricing rules extracted in step one.
4. **Draft** — generate the covering note. This is where a language model earns its place, producing something that reads as written rather than templated, informed by the specific line items.
5. **Render** — produce the PDF from a template.
6. **Hold for approval** — the quotation lands in a review queue, not in the client's inbox.
7. **Send and log** — on approval, email the client and write the record to wherever quotations are tracked.

## The approval step is not optional

I build every quotation workflow with a human approval gate, and I argue for keeping it even when clients ask to remove it for speed.

The reason is asymmetric risk. A quotation is a commercial commitment. A misplaced decimal, a rule that did not anticipate an edge case, or a model producing a confidently wrong sentence becomes a document with your name on it in a client's hands. Reviewing takes thirty seconds. Recovering from a wrong quote takes considerably longer and costs goodwill.

The time saving is in producing the quotation, not in skipping the check.

## What changes afterwards

The obvious gain is time — the mechanical portion largely disappears, and the person's remaining involvement is the two judgement steps plus a review.

The less obvious gain is turnaround. Quotations that took until the next working day go out within the hour. That changes win rates independently of price, because a fast, complete, well-presented quotation arriving while the enquiry is still fresh is a competitive advantage on its own.

The third gain is consistency. Everything goes out in the same format, with the same terms, logged in the same place. The reporting that was previously impossible — what did we quote last quarter, what proportion converted, which service lines are we losing — becomes a query rather than an archaeology project.

## What it costs to run

Once built, very little. Self-hosted n8n runs on a modest server. Language model usage for drafting covering notes on a few dozen quotations a month is a small line item.

The cost that matters is the build, and the way to judge it is against the hours it replaces. If someone spends a full working day each week producing quotations, the annual labour cost of that process is substantial before you count the deals lost to slow turnaround.

Most quotation workflows I have built repaid themselves within months on that arithmetic. If the numbers do not work at that level, the process is probably not frequent enough to be the right first automation — and something else on your list will be.

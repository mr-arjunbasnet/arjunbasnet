---
title: "What Custom Software Actually Costs in Nepal (and the Five Things That Move the Price)"
description: "Quotes for the same system in Nepal can differ five-fold. Here are the five drivers that explain the gap, three worked examples, and what is not worth paying for."
publishedAt: "2026-09-18"
cluster: "digital-problem-solving"
readingMinutes: 8
tags: ["Custom Software", "Pricing", "Nepal", "IT Strategy"]
keywords:
  - "custom software development cost Nepal"
  - "custom software development Nepal"
  - "software development price Nepal"
  - "custom software development company in Nepal"
  - "how much does software cost in Nepal"
keyTakeaways:
  - "Integrations, not screens, are the largest single cost driver in custom software: every external system a build must talk to adds roughly the effort of one more module."
  - "A system that must work offline in the field costs materially more than one used only on office wifi, because sync and conflict handling is a second product. Decide this before asking for quotes."
  - "Custom software from Arjun Basnet starts at NPR 49,999 (USD 499). Almost all of the variation above that floor is explained by five drivers: integrations, user roles, data migration, offline use, and who maintains it."
  - "A quote that is a fifth of the others is usually not a bargain. It has priced a different, smaller system, and the difference arrives later as change requests."
serviceSlugs: ["custom-software-development", "it-consulting"]
heroImage:
  src: "/media/blog/custom-software-cost-nepal.jpg"
  alt: "Three software quotations laid side by side on a desk, with the line items highlighted where they differ"
  width: 1600
  height: 900
faqs:
  - id: "faq-why-quotes-differ"
    question: "Why did I get three quotes that differ by five times for the same brief?"
    answer: "Because they are not quoting the same system. A one-page brief leaves the five drivers undefined, and each vendor fills the gaps differently: one assumes two user roles and manual data entry, another assumes six roles, a migration and an accounting integration. Before comparing prices, write down your answer to each driver and send the same answers to every vendor."
  - id: "faq-hourly-or-fixed"
    question: "Should I ask for an hourly rate or a fixed price?"
    answer: "Fixed price for a scoped first phase, then a rate for changes after launch. A fixed price forces both sides to define the system properly up front, which is where most of the value of the exercise sits. An hourly rate from day one rewards the vendor for slowness and leaves you unable to budget."
  - id: "faq-cheaper-abroad"
    question: "Is it cheaper to build in Nepal than to hire abroad?"
    answer: "Usually, and often by a wide margin, but the useful comparison is total cost over three years, not the build quote. A team that understands Nepali payment gateways, government formats and how your staff actually work will cost less to keep running than a cheaper build that needs explaining every month."
---

Most conversations about custom software in Nepal start with the wrong question. "How much does it cost?" has no honest answer until five other questions have been answered, which is why quotes for what looks like the same system can differ by a factor of five.

This post is the answer I give in person. It covers what actually moves the price, three worked examples, and the things you should refuse to pay for.

## The one number I will commit to

Custom software from me starts at **NPR 49,999**, or USD 499 for clients outside Nepal. That is a floor, not a typical price. It buys a small, well-defined tool: a single-purpose internal system with one or two user types, no integrations, and no data to migrate.

Everything above the floor is explained by the five drivers below. I do not publish per-project price bands, because a band without the drivers behind it is a number that will be wrong for you, and wrong numbers are how projects start badly. If you want to know [when custom software is worth it at all](/blog/build-vs-buy-custom-software), read that first; the answer is sometimes "it is not".

## The five drivers

### 1. Integrations

The number of external systems the software must talk to is the single strongest predictor of cost. Every integration means understanding someone else's API, handling its failures, and testing the combination.

Common ones in Nepal: eSewa, Khalti and Fonepay for payment; Tally or an accounting package; an SMS gateway; Google Workspace or Microsoft 365; a bank's file formats for bulk payments; IRD-compatible invoicing. Each is a known quantity on its own. The cost is in the combination.

A rule of thumb that has held up across [more than 100 projects](/work): each integration adds roughly the effort of one more functional module.

### 2. User roles

A system where everyone sees the same screens is simple. A system where the owner, the accountant, the branch manager and the field agent each see different things, with different permissions, is a different product. Every role multiplies the screens to design, the rules to enforce and the cases to test.

Ask yourself how many genuinely distinct jobs the software serves. Two is common and cheap. Six is common and expensive. The mistake is answering "two" to keep the quote down and discovering four more after launch.

### 3. Data migration

If the new system replaces spreadsheets, an old database or a paper ledger, the existing records have to move. Migration is routinely underestimated because it looks like a one-off task.

It is not. Old data is inconsistent: three spellings of the same customer, dates in two formats, a column that changed meaning in 2023. Cleaning it, mapping it and verifying that nothing was lost is real work, and the person who knows what the old data means is usually you, not the developer.

### 4. Offline use

If the software will be used on a phone in a warehouse, a field office, or anywhere the connection is unreliable, it needs to work without the network and then reconcile when the network returns.

Offline sync is a second product hiding inside the first. Two people editing the same record while offline creates a conflict that someone has to resolve, and the rules for that resolution have to be designed, built and tested. This is the driver most often left out of a brief and most expensive to add later.

### 5. Who maintains it

Software is not finished at launch. Servers need patching, libraries need updating, a payment gateway changes its API, and someone has to respond when it breaks at 9 pm before a deadline.

You can pay for this as a monthly retainer, keep someone in-house, or ignore it. The third option is the most expensive, it just does not look that way for the first year. A build quoted without a maintenance plan is a quote for something that will slowly stop working.

| Driver | What it adds | How to reduce it |
|---|---|---|
| Integrations | Roughly one module of effort per external system | Launch with the one integration that removes the most manual work; add the rest in a second phase |
| User roles | More screens, permission rules and test cases per role | Merge roles that differ only in what they *cannot* see; add roles when a real person needs one |
| Data migration | Cleaning, mapping and verification of old records | Migrate only live records; archive the rest as a read-only export |
| Offline use | A sync and conflict-resolution layer | Confirm the connection is actually unreliable before paying for offline; a 4G dongle is cheaper |
| Maintenance | Ongoing patching, monitoring and response | Decide the plan before launch; a retainer is cheaper than an emergency |

## Three worked examples

These are composites of real projects, described in effort rather than in rupees, because effort is what you can compare across vendors. All three start from the same floor and diverge only through the drivers.

**A retail wholesaler's stock and billing system.** Two roles (owner, counter staff), one integration (Tally export), no migration because the old system was paper, no offline use. This is close to the floor: a few weeks of work, one module, one export. The cost went up later when a third branch was added and stock transfer between branches became a workflow of its own.

**An education consultancy's admissions pipeline.** Four roles (counsellor, document officer, manager, student), three integrations (email, SMS, a document-signing service), migration of roughly 3,000 student records from spreadsheets, no offline use. The migration alone took as long as the first module, because the spreadsheets had been maintained by six people over four years. Roughly two to three times the floor in effort.

**An NGO's field-reporting app.** Three roles, two integrations, no migration, and full offline use across districts with patchy coverage. The offline requirement was the majority of the effort: the forms themselves were simple, but syncing photos and reports from twenty field officers without losing or duplicating anything was the product. Roughly four times the floor, and worth it, because the alternative was a monthly trip to collect paper.

The point of the examples is not the multiples. It is that you could have predicted the order from the drivers alone.

## What not to pay for

Some line items appear on quotes because they are easy to charge for, not because they add value.

- **A native mobile app when a web app will do.** If staff use the system at a desk, or on a phone with a connection, a responsive web app costs less and needs no app-store approval. [Ask whether it needs to be an app at all](/services/mobile-app-development).
- **An admin panel with every feature a framework can generate.** Generated screens for tables nobody looks at are padding.
- **A "scalable architecture" for ten users.** You will not need it, and if you ever do, that is a good problem funded by a working business.
- **Licences for tools the developer prefers.** If a quote includes a paid database, hosting tier or SaaS dependency you do not understand, ask what the free alternative would cost you in practice.

## How to compare quotes

Send every vendor the same one-page answer to the five drivers: the integrations by name, the roles with a sentence each, the records to migrate with a count, whether offline use is required and where, and who will maintain it. Then compare the quotes against each other rather than against your hopes.

A quote that is a fifth of the others is not a bargain. It has priced a smaller system, and you will meet the difference later as change requests. The [questions to ask about a proposal](/blog/evaluate-software-vendor-proposal) cover the rest, and [why projects go wrong](/blog/why-digital-projects-fail-nepal) is mostly a list of drivers that were never written down.

If you want a second opinion on a quote you already have, that is an [IT consulting](/services/it-consulting) conversation, and it is often cheaper than the mistake it prevents.

---
title: "Build vs Buy: When Custom Software Is Actually Worth It"
description: "Custom software is worth building when the process is your advantage, when configuration costs approach build costs, or when licences dominate at your scale."
publishedAt: "2026-07-20"
cluster: "digital-problem-solving"
readingMinutes: 7
tags: ["Custom Software", "Build vs Buy", "IT Strategy"]
keywords:
  - "build vs buy software"
  - "custom software Nepal"
  - "off the shelf vs custom"
  - "LMS Nepal"
keyTakeaways:
  - "Build when the process is a genuine competitive advantage, when configuration cost approaches build cost, or when per-seat licences dominate at your scale."
  - "Buy for solved problems — accounting, email, payroll, CRM. Mature products beat anything custom on price and reliability."
  - "The largest cost driver in custom software is the number of distinct user roles, not the number of features."
  - "Budget 15 to 20 percent of build cost annually for maintenance. Unmaintained software becomes unusable within a few years."
serviceSlugs: ["custom-software-development", "it-consulting"]
faqs:
  - id: "faq-who-owns-code"
    question: "Who owns the source code?"
    answer: "You should, transferred on final payment along with repository access, deployment configuration, and documentation. If a vendor's proposal leaves ownership with them, you are buying dependency rather than software — and that is worth catching before signing rather than after."
  - id: "faq-hybrid"
    question: "Can we buy something and customise it?"
    answer: "Often the best answer. The test is how much configuration is needed: light customisation on a mature product beats building from scratch, but once you are rewriting core behaviour you are paying build costs while inheriting someone else's constraints."
---

The question arrives as a technology decision and is almost always a business one. Here is the framework I use, and the failure modes on both sides.

## Three reasons to build

**The process is your advantage.** If how you do something is genuinely different from competitors, and that difference is why customers choose you, encoding it in software you control makes sense. Buying a product that assumes the standard process erases the thing you were being paid for.

**Configuration cost approaches build cost.** Off-the-shelf products are cheap until they need to fit. When the implementation quote involves months of configuration, custom fields, and consultant time, compare that honestly against building something that fits by design.

**Licences dominate at your scale.** Per-seat pricing across a large user base compounds. At some headcount, the cumulative licence cost exceeds building and running your own — and that crossover arrives sooner than vendors like to discuss.

## Three reasons not to

**The problem is solved.** Accounting, email, payroll, general project management, CRM. These have mature products refined over decades by companies with enormous engineering teams. Anything custom will be worse on price and reliability, and you will spend years discovering edge cases they handled in 2009.

**Nobody has written the process down.** If the workflow exists only in one experienced person's head, building software against it means encoding an interpretation of what they said, which is usually not what they do. Document and stabilise first.

**There is no budget for year two.** Software is not a purchase, it is an ongoing commitment. If the budget covers building it but not maintaining it, you are funding something that will be unusable in three years.

## What the Nepali market taught me

Building five learning management platforms here made the pattern unusually clear.

International LMS products are technically excellent and were built for a different context. Nepali institutions need PSC and TSC assessment structures, Nepali-language interfaces, and tolerance for low-bandwidth conditions where a student may lose connectivity mid-assessment. No imported product handles those without heavy modification — and by the time you have modified it that far, you have paid build costs while inheriting someone else's architecture.

That gap between an imported product and local reality is where custom development genuinely earns its cost. It is also a narrower gap than most proposals imply. For accounting, that gap does not exist and you should buy.

## What actually drives cost

Not the feature list. The number of distinct user roles.

Each role multiplies the interface, the permission model, and the testing surface. A platform serving students, teachers, and administrators costs substantially more than one serving a single team, even when the feature lists look similar. When someone asks why a quote is what it is, this is usually the answer.

The second driver is integration, and it depends entirely on whether your existing systems expose an API. Anything with an API integrates cleanly. Older systems sometimes have none, and the options — scheduled file exchange, or database-level integration — are both workable and both add cost. This should be assessed during scoping, not discovered mid-build.

## Why these projects fail

Almost never for technical reasons.

**Building against what managers describe rather than what staff do.** The finished system encodes a process nobody follows, and gets quietly abandoned while everyone keeps using the spreadsheet.

**Scope agreed once and never revisited.** A system designed against 2024 requirements ships in 2026 into a business that has changed.

**Treating launch as the finish line.** No budget remains for the fixes that only surface under real use — and there are always fixes that only surface under real use.

Across roughly 100 delivered projects, a 92 percent on-time rate came down to three habits: watching the current process before designing anything, shipping a usable slice within six to eight weeks rather than months, and reserving budget specifically for post-launch correction.

## The ongoing number nobody quotes

Budget 15 to 20 percent of build cost annually for hosting, monitoring, and maintenance.

That is not padding. Dependencies get security patches, browsers change, APIs you integrate with deprecate endpoints. Software that is never maintained does not stay still — it degrades until something breaks that cannot be fixed cheaply.

A proposal that ends at delivery is not cheaper. It has moved the cost somewhere you will not see it until later.

## How to decide

Ask four questions and write down the answers:

1. Is this process genuinely different from how competitors do it, in a way customers pay for?
2. What does a realistic off-the-shelf implementation cost, including configuration?
3. How many distinct user roles does the system need?
4. Is there budget for year two and year three?

If you cannot answer the fourth, the decision is already made — and it is not build.

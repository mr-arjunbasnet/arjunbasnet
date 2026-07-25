---
title: "A Technical SEO Checklist for Nepali Business Websites"
description: "Fourteen checks, in priority order, that cover most of what stops a Nepali business site from ranking. Most are fixable in a day without touching the design."
publishedAt: "2026-07-15"
cluster: "seo-aeo-geo"
readingMinutes: 7
tags: ["Technical SEO", "Checklist", "Search Console"]
keywords:
  - "technical SEO checklist"
  - "SEO audit Nepal"
  - "Search Console setup"
  - "structured data Nepal"
keyTakeaways:
  - "Set up Google Search Console first. Everything else is guesswork until you can see what Google actually sees."
  - "Indexation before ranking: a page Google has not indexed cannot rank no matter how good it is."
  - "One canonical version of the site — pick www or non-www, HTTP or HTTPS, and redirect everything else to it."
  - "Structured data is where the fastest remaining gains sit, because most competitors have none at all."
serviceSlugs: ["seo-services", "web-development", "answer-engine-optimization"]
faqs:
  - id: "faq-do-it-ourselves"
    question: "Can we work through this without a developer?"
    answer: "Checks one to six need only a browser and a Search Console account. Fixing what they reveal usually needs someone with access to the site's settings or code. The diagnosis is genuinely DIY; some of the remedies are not."
  - id: "faq-how-often"
    question: "How often should this be repeated?"
    answer: "A full pass twice a year, plus a Search Console check monthly. Most technical problems are introduced by changes — a redesign, a plugin update, a migration — so run it after anything significant rather than only on a calendar."
---

Fourteen checks, ordered so each one makes the next meaningful. Most sites here fail four or five of them, and most of those failures are fixable without touching the design.

## Foundation

**1. Google Search Console is set up and verified.** Everything below is guesswork until you can see what Google actually sees. If you do nothing else on this list, do this.

**2. A sitemap exists and is submitted.** It should list every page you want indexed and nothing you do not. Auto-generated is fine; stale and hand-written is not.

**3. `robots.txt` is not blocking anything important.** Visit `yourdomain.com/robots.txt` and read it. Look particularly for `Disallow` rules left over from a staging environment.

**4. No stray `noindex` tags.** This catches a startling number of sites. A `noindex` added during development, never removed at launch, makes the site invisible indefinitely while everything appears to work fine.

## Indexation

**5. Check the Pages report in Search Console.** Compare pages indexed against pages you expected. Read the exclusion reasons — they are specific and usually accurate.

**6. One canonical version of the site.** Pick `www` or non-`www`, HTTPS always, with or without trailing slashes, and redirect every other variant to the chosen one with a 301. Four accessible variants of the same page split your signals four ways.

**7. Canonical tags point where you intend.** A canonical pointing at the wrong URL tells Google to consolidate the page into a different one, which quietly removes it from results.

## Speed

**8. Largest Contentful Paint under 2.5 seconds on mobile.** Test in PageSpeed Insights, mobile tab, then confirm on a real phone on mobile data. Office wifi tells you nothing about what your customers experience.

**9. Images sized and compressed.** Photos at full camera resolution are the most common cause of a heavy page here. Resize to displayed dimensions and serve WebP or AVIF.

**10. Not more than two font weights.** Each one blocks text from rendering until it loads.

## Structure

**11. One `<h1>` per page, describing that page.** Not the company name on every page. The heading structure below it should be a genuine outline, not styling choices.

**12. Unique title and meta description per page.** Titles around 55 to 60 characters, descriptions 150 to 160. Duplicates across pages tell Google the pages are interchangeable.

**13. Internal links point at commercial pages.** Authority flows through links. If every page links to the blog and nothing links to your services, the blog outranks the pages that make money.

## Structured data

**14. Schema markup implemented and validating.** For a services business in Nepal, the useful set is:

- `ProfessionalService` combined with `LocalBusiness`, including `areaServed`, address, and geo coordinates
- `Person` for the named individual, linked to the business, with `sameAs` pointing at every profile you control
- `Service` on each service page
- `FAQPage` where you have genuine questions and answers
- `BreadcrumbList` on every page

Validate at the Rich Results Test and validator.schema.org. Both are free and both catch different things.

This is where the fastest remaining gains sit, precisely because most competitors here have no structured data at all.

## Two things worth doing beyond the list

**Allow AI crawlers deliberately.** `GPTBot`, `ClaudeBot`, `PerplexityBot`, and `Google-Extended` are separate user agents. Decide whether to allow them rather than inheriting a default nobody chose. For a services business generating enquiries, blocking them means absence from answers competitors appear in.

**Publish an `llms.txt`.** A plain-text summary of what your business does, at the site root. An emerging convention rather than a standard, but it costs almost nothing and removes ambiguity for models reading your site.

## Where the ordering matters

Do not optimise content on pages Google cannot index. Do not chase rankings on a site that takes six seconds to load. Do not add structured data to pages with no clear purpose.

The order above is the order of dependency, not preference. Each check assumes the ones above it pass.

## What this does not cover

This is the technical layer only. It gets a site to the point where good content can rank — it does not substitute for having something worth ranking.

A technically flawless site targeting terms nobody searches for produces exactly as much business as a broken one. Once these fourteen pass, the work moves to keyword intent, content that genuinely answers buyer questions, and local signals. Those are different disciplines, and they only pay off once this layer is sound.

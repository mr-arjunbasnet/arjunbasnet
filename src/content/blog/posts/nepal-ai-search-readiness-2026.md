---
title: "We Tested 100 Nepali Business Websites for AI Search Readiness: Here Is What We Found"
description: "100 Nepali business homepages across ten sectors, tested for AI-crawler access, structured data, and speed on slow 4G. One passed all four basics. The full numbers, by sector."
publishedAt: "2026-09-18"
cluster: "seo-aeo-geo"
readingMinutes: 11
tags: ["GEO", "AI Search", "Research", "Core Web Vitals", "Nepal", "Structured Data"]
keywords:
  - "AI search readiness Nepal"
  - "Nepali business websites study"
  - "website speed optimization Nepal"
  - "SEO trends Nepal 2026"
  - "common SEO mistakes Nepal"
  - "GEO Nepal"
keyTakeaways:
  - "Of 100 Nepali business homepages tested in September 2026, exactly one passed all four AI-search basics: AI crawlers allowed, an Organization schema, a meta description, and a first paint under 2.5 seconds on slow 4G."
  - "12 of the 100 sites block at least one AI crawler in robots.txt, and 9 of those 12 are not a decision anyone made: they carry Cloudflare's managed AI block, which is applied by default and is separate from the bot-blocking toggle."
  - "58% of the sites have no structured data at all, and no hospital or clinic in the sample has any. Only one site in a hundred carries FAQ schema."
  - "The median homepage weighs 3.1 MB and takes 12.2 seconds to paint its largest element on a simulated slow-4G connection. News sites and IT companies are the fastest sectors; banks and NGOs are the slowest."
  - "Sites on WordPress are more likely to have structured data (57%) than custom-built sites (30%), because a plugin adds it. Custom sites are also the slowest group, with a median paint of 16.5 seconds."
serviceSlugs: ["generative-engine-optimization", "seo-services", "answer-engine-optimization", "web-development"]
heroImage:
  src: "/media/blog/nepal-ai-search-readiness-2026.jpg"
  alt: "A phone held against a Kathmandu shopfront, its screen half-loaded with a spinner, illustrating slow mobile page loads"
  width: 1600
  height: 900
faqs:
  - id: "faq-which-sites"
    question: "Which websites did you test, and why are none named?"
    answer: "One hundred public business homepages, ten in each of ten sectors: banks, hospitals, schools and colleges, hotels, travel and airlines, e-commerce and fintech, manufacturing and retail, news and media, NGOs, and IT companies. Results are reported as sector medians and percentages only. Naming businesses would turn a study into a league table, and the point is the pattern, not the individuals."
  - id: "faq-how-measured"
    question: "How was speed measured?"
    answer: "Each homepage was loaded once in a real Chromium browser emulating a mid-range phone on a slow 4G profile: 1.6 Mbps down, 150 ms latency, and a four-times slower CPU, the same profile Lighthouse uses. Largest Contentful Paint was read from the browser's own performance observer. Single runs are noisy for any one site, which is why the post reports medians across ten sites per sector rather than individual scores."
  - id: "faq-check-my-site"
    question: "Can I check my own site against these numbers?"
    answer: "Yes, and the first three checks take five minutes. Open your robots.txt and look for GPTBot, ClaudeBot or a Cloudflare managed block. View your homepage source and search for application/ld+json. Run PageSpeed Insights on the mobile tab and read Largest Contentful Paint. If you would like the same sweep run on your site with the fixes prioritised, that is what the GEO audit is for."
---

Every conversation about AI search in Nepal so far has run on opinion. I wanted a number.

So in September 2026 I tested 100 Nepali business homepages, ten in each of ten sectors, for the things that decide whether a business can be found and cited by Google's AI Overviews, ChatGPT, Perplexity and Claude: whether AI crawlers are allowed in, whether the page describes the business in a form a machine can read, and whether it loads at all on the connection most Nepali visitors actually have.

The short version: **one site in a hundred passes all four basics.** The long version is below, with the numbers by sector, and it is more fixable than it sounds.

## What was tested

Ten sectors, ten public homepages each: banks and finance, hospitals and clinics, schools and colleges, hotels and resorts, travel, trekking and airlines, e-commerce and fintech, manufacturing and retail, news and media, NGOs, and IT companies. Sites that turned out to be parked, under construction, or hidden behind a firewall that rejects anything that is not a browser were replaced with the next candidate in the sector.

Each site was checked for:

- **AI crawler access.** Does `robots.txt` block GPTBot, ClaudeBot, Google-Extended, PerplexityBot, OAI-SearchBot, CCBot or Bytespider? Is the block Cloudflare's managed one?
- **Structured data.** Is there any JSON-LD on the homepage? Does it describe the organisation? Is there FAQ schema?
- **The basics.** Meta description, canonical tag, one H1, `sitemap.xml`, `llms.txt`, and whether the page contains any content at all without JavaScript.
- **Speed.** Largest Contentful Paint, page weight, image weight, request count and third-party scripts, measured in a real Chromium browser emulating a mid-range phone on slow 4G.

Results are reported as sector medians and percentages. No business is named.

## Finding 1: one site in a hundred passes the four basics

The four checks that decide whether an AI system can find, read, trust and actually load a page are: AI crawlers allowed, an Organization-type schema, a meta description, and a largest paint within 2.5 seconds on slow 4G.

**One site passed all four.** A third passed the three that do not involve speed.

<figure>
<svg viewBox="0 0 640 344" role="img" aria-labelledby="share-of-100-nepali-business-homepages-passing-each-check" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;font-family:inherit"><title id="share-of-100-nepali-business-homepages-passing-each-check">Share of 100 Nepali business homepages passing each check</title><text x="0" y="16" font-size="14" font-weight="600" fill="var(--color-fg)">Share of 100 Nepali business homepages passing each check</text><text x="226" y="49" font-size="12.5" text-anchor="end" fill="var(--color-fg)">AI crawlers allowed</text><rect x="236" y="37" width="306.2" height="16" rx="4" fill="var(--color-primary)"><title>AI crawlers allowed: 88%</title></rect><text x="548.2" y="49" font-size="12.5" fill="var(--color-muted)">88%</text><text x="226" y="79" font-size="12.5" text-anchor="end" fill="var(--color-fg)">Meta description present</text><rect x="236" y="67" width="261.0" height="16" rx="4" fill="var(--color-primary)"><title>Meta description present: 75%</title></rect><text x="503.0" y="79" font-size="12.5" fill="var(--color-muted)">75%</text><text x="226" y="109" font-size="12.5" text-anchor="end" fill="var(--color-fg)">sitemap.xml present</text><rect x="236" y="97" width="215.8" height="16" rx="4" fill="var(--color-primary)"><title>sitemap.xml present: 62%</title></rect><text x="457.8" y="109" font-size="12.5" fill="var(--color-muted)">62%</text><text x="226" y="139" font-size="12.5" text-anchor="end" fill="var(--color-fg)">Canonical tag</text><rect x="236" y="127" width="194.9" height="16" rx="4" fill="var(--color-primary)"><title>Canonical tag: 56%</title></rect><text x="436.9" y="139" font-size="12.5" fill="var(--color-muted)">56%</text><text x="226" y="169" font-size="12.5" text-anchor="end" fill="var(--color-fg)">Any structured data (JSON-LD)</text><rect x="236" y="157" width="146.2" height="16" rx="4" fill="var(--color-primary)"><title>Any structured data (JSON-LD): 42%</title></rect><text x="388.2" y="169" font-size="12.5" fill="var(--color-muted)">42%</text><text x="226" y="199" font-size="12.5" text-anchor="end" fill="var(--color-fg)">Exactly one H1</text><rect x="236" y="187" width="135.7" height="16" rx="4" fill="var(--color-primary)"><title>Exactly one H1: 39%</title></rect><text x="377.7" y="199" font-size="12.5" fill="var(--color-muted)">39%</text><text x="226" y="229" font-size="12.5" text-anchor="end" fill="var(--color-fg)">Organization-type schema</text><rect x="236" y="217" width="100.9" height="16" rx="4" fill="var(--color-primary)"><title>Organization-type schema: 29%</title></rect><text x="342.9" y="229" font-size="12.5" fill="var(--color-muted)">29%</text><text x="226" y="259" font-size="12.5" text-anchor="end" fill="var(--color-fg)">Paints in 2.5 s on slow 4G</text><rect x="236" y="247" width="34.8" height="16" rx="4" fill="var(--color-primary)"><title>Paints in 2.5 s on slow 4G: 10%</title></rect><text x="276.8" y="259" font-size="12.5" fill="var(--color-muted)">10%</text><text x="226" y="289" font-size="12.5" text-anchor="end" fill="var(--color-fg)">llms.txt</text><rect x="236" y="277" width="27.8" height="16" rx="4" fill="var(--color-primary)"><title>llms.txt: 8%</title></rect><text x="269.8" y="289" font-size="12.5" fill="var(--color-muted)">8%</text><text x="226" y="319" font-size="12.5" text-anchor="end" fill="var(--color-fg)">FAQ schema</text><rect x="236" y="307" width="3.5" height="16" rx="4" fill="var(--color-primary)"><title>FAQ schema: 1%</title></rect><text x="245.5" y="319" font-size="12.5" fill="var(--color-muted)">1%</text></svg>
<figcaption>Percentage of the 100 sites passing each check. Only one site passed AI access, organisation schema, meta description and the 2.5-second paint together.</figcaption>
</figure>

The order of that chart is the order of difficulty. Most sites let crawlers in (88%), because they never touched `robots.txt`. Three quarters have a meta description, because the CMS asked for one. Beyond that, every check falls below two thirds, and the checks that decide AI citation specifically (structured data, `llms.txt`, FAQ schema) are at the bottom.

## Finding 2: the AI blocks are mostly accidental

Twelve sites block at least one AI crawler. Nine of those twelve are not a decision anyone at the business made. They carry Cloudflare's **managed robots.txt**, which prepends a block for GPTBot, ClaudeBot, Google-Extended, CCBot and Bytespider before the site's own rules, and which is applied by a default setting that is separate from the "block AI bots" toggle.

I know this one personally: [this site had the same block](/blog/get-cited-by-chatgpt-perplexity) until July, and it took a cache-busted fetch of `robots.txt` to prove it, because the Cloudflare dashboard said it was off.

| Crawler | Sites blocking it |
|---|---|
| GPTBot (OpenAI, model training) | 11% |
| ClaudeBot (Anthropic) | 11% |
| Google-Extended (Gemini training) | 11% |
| CCBot (Common Crawl) | 12% |
| Bytespider (ByteDance) | 12% |
| PerplexityBot | 2% |
| OAI-SearchBot (ChatGPT search citations) | 2% |

Manufacturing and retail is the sector most affected, with 4 of 10 sites blocked, all through the Cloudflare default. Banks, hospitals and news sites in the sample block nothing.

The consequence is specific. A site with the Cloudflare block is invisible to the crawlers that build model knowledge, so the business does not exist in the model's memory. Only two sites also block the live search crawlers, so most blocked sites can still be fetched when a user asks a question that names them, but they will not be the answer to a question that does not.

Twelve sites have no `robots.txt` at all, and 36% of the files that exist do not declare a sitemap.

## Finding 3: structured data is rare, and absent where it matters most

**58 of 100 homepages have no structured data at all.** Of the 42 that do, most carry the generic `WebSite` and `WebPage` types a plugin emits automatically. 29 describe the organisation in a type a model can use to confirm what the business is. **One site in a hundred has FAQ schema.** Two have JSON-LD that does not parse.

| Sector | Any JSON-LD | Organisation schema | Meta description | Sitemap |
|---|---|---|---|---|
| Hotels & resorts | 80% | 50% | 90% | 80% |
| Travel, trekking & airlines | 80% | 50% | 90% | 80% |
| News & media | 60% | 50% | 80% | 60% |
| Schools & colleges | 40% | 30% | 70% | 90% |
| E-commerce & fintech | 40% | 40% | 100% | 60% |
| NGOs & non-profits | 40% | 40% | 30% | 70% |
| Banks & finance | 30% | 20% | 70% | 50% |
| IT companies & agencies | 30% | 10% | 100% | 60% |
| Manufacturing & retail | 20% | 0% | 60% | 40% |
| Hospitals & clinics | **0%** | **0%** | 60% | 30% |

Two rows stand out. **Hospitals**, the sector whose customers most often ask an AI assistant a question first ("which hospital in Kathmandu does knee replacement"), have no structured data on any of the ten sites tested. **IT companies**, who build websites for everyone else, have organisation schema on one site in ten.

Hotels and travel lead because their booking and review platforms have trained the sector to care about schema. That is also why 3 of the 10 travel sites have an `llms.txt` file, against 8 in the whole sample.

The CMS matters here. 57% of WordPress sites have structured data, because a plugin adds it. 30% of custom-built sites do, because someone had to decide to.

Six sites in the sample serve an **empty HTML shell**: the page is assembled entirely by JavaScript in the browser, so a crawler that does not run JavaScript, which is most AI crawlers, sees a blank document. Two of those six are hospitals.

## Finding 4: the median homepage takes twelve seconds to paint on 4G

Speed was measured on a simulated slow-4G connection, because that is the connection a large share of Nepali visitors are on outside the valley, and because it is the profile Google's own tools use.

The median homepage weighs **3.1 MB** and takes **12.2 seconds** to paint its largest element. Ten sites in a hundred meet Google's 2.5-second threshold. More than half take longer than ten seconds. Nearly a third take longer than twenty. The heaviest homepage in the sample, a hotel, transfers 87 MB.

<figure>
<svg viewBox="0 0 640 368" role="img" aria-labelledby="median-largest-paint-by-sector-on-slow-4g-seconds-" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;font-family:inherit"><title id="median-largest-paint-by-sector-on-slow-4g-seconds-">Median largest paint by sector on slow 4G (seconds)</title><text x="0" y="16" font-size="14" font-weight="600" fill="var(--color-fg)">Median largest paint by sector on slow 4G (seconds)</text><text x="226" y="49" font-size="12.5" text-anchor="end" fill="var(--color-fg)">News & media</text><rect x="236" y="37" width="46.4" height="16" rx="4" fill="var(--color-primary)"><title>News & media: 3.2 s</title></rect><text x="288.4" y="49" font-size="12.5" fill="var(--color-muted)">3.2 s</text><text x="226" y="79" font-size="12.5" text-anchor="end" fill="var(--color-fg)">IT companies & agencies</text><rect x="236" y="67" width="50.8" height="16" rx="4" fill="var(--color-primary)"><title>IT companies & agencies: 3.5 s</title></rect><text x="292.8" y="79" font-size="12.5" fill="var(--color-muted)">3.5 s</text><text x="226" y="109" font-size="12.5" text-anchor="end" fill="var(--color-fg)">Manufacturing & retail</text><rect x="236" y="97" width="97.1" height="16" rx="4" fill="var(--color-primary)"><title>Manufacturing & retail: 6.7 s</title></rect><text x="339.1" y="109" font-size="12.5" fill="var(--color-muted)">6.7 s</text><text x="226" y="139" font-size="12.5" text-anchor="end" fill="var(--color-fg)">Schools & colleges</text><rect x="236" y="127" width="113.1" height="16" rx="4" fill="var(--color-primary)"><title>Schools & colleges: 7.8 s</title></rect><text x="355.1" y="139" font-size="12.5" fill="var(--color-muted)">7.8 s</text><text x="226" y="169" font-size="12.5" text-anchor="end" fill="var(--color-fg)">E-commerce & fintech</text><rect x="236" y="157" width="147.9" height="16" rx="4" fill="var(--color-primary)"><title>E-commerce & fintech: 10.2 s</title></rect><text x="389.9" y="169" font-size="12.5" fill="var(--color-muted)">10.2 s</text><text x="226" y="199" font-size="12.5" text-anchor="end" fill="var(--color-fg)">Hospitals & clinics</text><rect x="236" y="187" width="169.6" height="16" rx="4" fill="var(--color-primary)"><title>Hospitals & clinics: 11.7 s</title></rect><text x="411.6" y="199" font-size="12.5" fill="var(--color-muted)">11.7 s</text><text x="226" y="229" font-size="12.5" text-anchor="end" fill="var(--color-fg)">Travel, trekking & airlines</text><rect x="236" y="217" width="174.0" height="16" rx="4" fill="var(--color-primary)"><title>Travel, trekking & airlines: 12 s</title></rect><text x="416.0" y="229" font-size="12.5" fill="var(--color-muted)">12 s</text><text x="226" y="259" font-size="12.5" text-anchor="end" fill="var(--color-fg)">Hotels & resorts</text><rect x="236" y="247" width="252.3" height="16" rx="4" fill="var(--color-primary)"><title>Hotels & resorts: 17.4 s</title></rect><text x="494.3" y="259" font-size="12.5" fill="var(--color-muted)">17.4 s</text><text x="226" y="289" font-size="12.5" text-anchor="end" fill="var(--color-fg)">NGOs & non-profits</text><rect x="236" y="277" width="303.0" height="16" rx="4" fill="var(--color-primary)"><title>NGOs & non-profits: 20.9 s</title></rect><text x="545.0" y="289" font-size="12.5" fill="var(--color-muted)">20.9 s</text><text x="226" y="319" font-size="12.5" text-anchor="end" fill="var(--color-fg)">Banks & finance</text><rect x="236" y="307" width="304.5" height="16" rx="4" fill="var(--color-primary)"><title>Banks & finance: 21 s</title></rect><text x="546.5" y="319" font-size="12.5" fill="var(--color-muted)">21 s</text><line x1="272.3" y1="28" x2="272.3" y2="336" stroke="var(--color-fg)" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/><text x="272.3" y="352" font-size="11.5" text-anchor="middle" fill="var(--color-muted)">Google's 2.5 s threshold</text></svg>
<figcaption>Median Largest Contentful Paint across ten homepages per sector, headless Chromium on a slow-4G profile, September 2026.</figcaption>
</figure>

| Sector | Median paint (s) | Under 2.5 s | Median weight (MB) | Median images (MB) | Median requests |
|---|---|---|---|---|---|
| News & media | 3.2 | 30% | 3.5 | 1.5 | 135 |
| IT companies & agencies | 3.5 | 30% | 1.6 | 0.5 | 97 |
| Manufacturing & retail | 6.7 | 11% | 2.0 | 1.5 | 55 |
| Schools & colleges | 7.8 | 10% | 2.2 | 1.0 | 90 |
| E-commerce & fintech | 10.2 | 10% | 3.2 | 1.5 | 72 |
| Hospitals & clinics | 11.7 | 0% | 2.2 | 1.4 | 93 |
| Travel, trekking & airlines | 12.0 | 0% | 5.7 | 1.2 | 96 |
| Hotels & resorts | 17.4 | 0% | 4.2 | 2.3 | 98 |
| NGOs & non-profits | 20.9 | 10% | 4.6 | 2.9 | 95 |
| Banks & finance | 21.0 | 0% | 6.1 | 1.6 | 114 |

The causes are [the ones I keep finding on individual sites](/blog/website-speed-nepal), now with proportions attached:

- **Images.** On 46% of sites, images are more than half of everything downloaded. The median site ships 1.4 MB of images to a phone screen.
- **Third-party scripts.** The median homepage loads 7 scripts from other domains; hotels load 21. Chat widgets, heatmaps, social feeds, and analytics tools that nobody reads.
- **Weight in general.** 52% of homepages are over 3 MB; 36% are over 5 MB. On 1.6 Mbps, 5 MB is 25 seconds of download before anything else goes wrong.
- **Layout shift.** 27% of sites move their content around by more than Google's "poor" threshold while loading, which is the effect of images and adverts without reserved space.

Custom-built sites are the slowest group, with a median paint of 16.5 seconds against 8.3 for WordPress, 7.0 for Laravel and 6.7 for Next.js. Custom does not mean fast; it means nobody imposed defaults.

## What this means for a business in Nepal

The gap between the sample and "ready" is smaller than the numbers suggest, because most failures are defaults nobody changed.

1. **Check `robots.txt` today**, with a cache-busting parameter, not through a dashboard. If a Cloudflare managed block is there, it is one setting. [How to get cited by ChatGPT and Perplexity](/blog/get-cited-by-chatgpt-perplexity) walks through the rest of the entity work.
2. **Add an Organization schema and a meta description.** An afternoon's work on any CMS, and it lifts a site from the bottom half of the sample into the top third.
3. **Fix images first, scripts second.** Resize, convert to WebP or AVIF, and delete every third-party script whose data nobody looked at last month. This is where most of the twelve seconds goes. The [technical SEO checklist](/blog/technical-seo-checklist-nepal) has the order.
4. **If the page is empty without JavaScript, that is a rebuild conversation**, not a tweak. [Why sites do not rank](/blog/why-your-website-isnt-ranking-nepal) covers what a crawler actually sees.
5. **Then, and only then, the AI-specific layer**: self-contained answers to the questions customers ask, FAQ schema on the same text, `llms.txt`. That is the [AEO](/services/answer-engine-optimization) and [GEO](/services/generative-engine-optimization) work, and it is pointless on a site that fails the first four.

[The difference between SEO, AEO and GEO](/blog/aeo-vs-seo-vs-geo-nepal) is the framing for all of this. The study says most Nepali sites have not finished the SEO layer yet, and that the ones which have are mostly in two sectors.

## Method, limits, and the data

- 100 homepages, 10 per sector, tested 14 September 2026 from Kathmandu.
- Checks on `robots.txt`, HTML and `sitemap.xml` used plain HTTP fetches with a desktop browser user agent.
- Speed was measured once per site in headless Chromium on a 412-pixel mobile viewport, emulating 1.6 Mbps down, 150 ms round-trip latency and a four-times CPU slowdown, the same slow-4G profile Lighthouse uses. Largest Contentful Paint and layout shift were read from the browser's performance observer. Twenty-five sites did not fire their load event within the measurement window; their paint times are what had rendered by then.
- Single runs are noisy for any one site. Sector medians across ten sites are the unit of comparison, and no individual site is scored or named.
- Five candidate sites were replaced during the sweep: two parked or under construction, three behind a firewall that rejects non-browser requests.
- The check script is open, and the anonymised sector-level data is available to any journalist or researcher who asks.

I intend to repeat this in September 2027. If the one-in-a-hundred number moves, it will be because the defaults changed, and that is something an agency, a CMS vendor or a hosting company in Nepal could do this year.

If you want the same sweep run on your own site, with the failures ranked by what they cost you, that is the [GEO audit](/services/generative-engine-optimization).

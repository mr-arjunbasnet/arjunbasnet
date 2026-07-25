# Project context

Working knowledge base for arjun-basnet.com.np. Read this before changing
content, SEO, or page structure — it records decisions that are expensive to
re-derive and easy to accidentally undo.

Last updated: 2026-07-25

---

## 1. What this site is for

A lead-generating commercial site for nine digital service lines, replacing an
academic portfolio. Success is **enquiries**, not traffic and not rankings.

**Three surfaces are targeted, and they are not the same thing:**

| | Competes for | Content shape that wins |
|---|---|---|
| **SEO** | A ranked position in the blue links | Comprehensive pages, internal links, technical health |
| **AEO** | The answer box / AI Overview above the links | Self-contained 134–167 word answers + `FAQPage` schema |
| **GEO** | A citation inside ChatGPT / Claude / Perplexity / Gemini | Specific verifiable claims a model can safely repeat |

All three share one foundation: a fast, crawlable, well-structured site. GEO in
particular rewards **named numbers, named tools, named clients** — a model
repeats "340% social growth across a 2023 campaign" and drops "industry-leading
results", because the first is attributable and the second is a risk.

**Market:** Nepal-first, global secondary. Geo modifiers live in titles, H1s,
body copy, and schema `areaServed` — never in slugs.

**Brand:** Personal. `Person` is the primary entity with `ProfessionalService`
attached, not a separate agency identity.

---

## 2. Decisions already made — do not re-litigate

| Decision | Reasoning |
|---|---|
| **Single domain**, no `portfolio.` subdomain | A split halves authority and breaks the entity graph LLMs resolve. Academic credentials are E-E-A-T fuel for a services site, not a liability. |
| **`/work` and `/research` stay untouched** | Owner's call. Service pages link *into* their existing `#anchors` as proof instead. A design pass recommended promoting the 5 case studies to real URLs — good SEO logic, explicitly declined. Revisit separately, never bundled. |
| **Clean slugs** (`/services/ai-automation`) | `ai-automation-nepal` wins marginally on one query and ages badly. Geo intent goes in the title and H1. |
| **No MDX** | Next 16 runs Turbopack; the bundled docs state remark/rehype plugins with function options "cannot be used yet with Turbopack, because JavaScript functions can't be passed to Rust". `@next/mdx` also has no frontmatter support. Using `gray-matter` + `marked` + `github-slugger` instead. |
| **GA4, not Vercel Analytics** | Vercel custom events require the Pro plan, and this entire measurement design is custom events. |
| **Canonical host is the apex**, no `www` | Production 301s `www` → apex. Canonicals must point at the final URL, never a redirect. |
| **Pricing: one global floor** | `STARTING_PRICE` in `site.ts` (NPR 49,999 / USD 499). NPR and USD are *separate anchors*, not conversions of each other. Per-service ranges were deleted — contradictory numbers are a footgun. |
| **No `aggregateRating` / `Review` schema** | Self-authored review markup is the most common cause of a manual action. Add only with real attributable reviews. |
| **Booking is a link, not an embed** | A scheduler iframe is 200–500KB of third-party JS on a page whose entire job is conversion. |
| **WhatsApp is an anchor, not the official widget** | The widget is ~40KB of JS and cookies to do a hyperlink's job. |

---

## 3. Content layer — how to add things

Everything derives from `src/content/`. Pages, JSON-LD, sitemap, `llms.txt`,
and internal links all read from it. There is no CMS and no hardcoded content
in page components.

```
src/content/
  site.ts          Identity, STARTING_PRICE, whatsappUrl(), absoluteUrl().
                   The ONLY place the domain is written.
  nav.ts           Nav links, typed as `Route` so typedRoutes validates them.
  types.ts         Service, AnswerBlock, Faq, BlogPostMeta, ProofLink…
  proof.ts         STATS and FEATURED_WORK shown on the homepage.
  services/
    index.ts       Registry — add one line here per new service
    <slug>.ts      One file per service (9 today)
  faq/index.ts     Cross-cutting FAQs for /faq
  blog/
    index.ts       fs + gray-matter reader, cluster definitions
    posts/*.md     One markdown file per post (12 today)
```

### Adding a service

1. Copy an existing file in `src/content/services/`, e.g. `ai-automation.ts`.
2. Add one import + one array entry in `services/index.ts`.
3. Run `npm run validate:content`.

That is all. The detail page, OG image, sitemap entry, `OfferCatalog` schema,
nav grouping, and `llms.txt` entry appear automatically.

**Required shape** — see `Service` in `types.ts`. The fields that matter most:

- `heading` — the H1, and the only place the geo modifier belongs
- `primaryAnswer` — one `AnswerBlock`, rendered above the fold
- `answers[]` — 2–3 more, each becomes a section *and* a `FAQPage` entry
- `faqs[]` — 4–5 short Q/A for the accordion
- `process[]` — also emitted as `HowTo` schema
- `proof[]` — `anchor` must match a real `id` on `/work`
- `relatedServices[]` — slugs must resolve; the validator enforces it

### Adding a blog post

Drop a `.md` file into `src/content/blog/posts/`. Frontmatter must satisfy
`BlogPostMeta`. Nothing else to register.

```yaml
---
title: "…"
description: "150–160 chars, doubles as the meta description"
publishedAt: "2026-07-25"
cluster: "seo-aeo-geo" | "ai-automation" | "digital-problem-solving"
readingMinutes: 7
tags: ["…"]
keywords: ["…"]
keyTakeaways:            # ← the GEO payload. Lifted verbatim by models.
  - "…"                  #   Rendered first, marked `speakable` in schema,
  - "…"                  #   and copied into llms-full.txt.
serviceSlugs: ["seo-services"]   # cross-links to service pages
faqs:                    # optional; emits FAQPage
  - id: "faq-…"
    question: "…"
    answer: "…"
---
```

Body is plain markdown. `##` and `###` get stable auto-generated IDs (used by
the TOC and as AEO anchors). A post with more than two `##` headings renders a
table of contents automatically.

**Cluster balance matters.** Three clusters, currently 4 posts each. Topical
authority comes from depth in a cluster, not from scattering.

---

## 4. The AEO answer block — the core unit

`AnswerBlock.answer` is written to a hard spec, and the spec is **enforced by
`scripts/validate-content.ts`**, not left to discipline:

- **134–167 words.** Shorter loses to a competitor with more substance; longer
  gets truncated mid-thought when extracted.
- **Self-contained.** Never opens with a pronoun — the extractor lifts the
  paragraph out of context and it must still stand alone.
- **One hard fact** — a number, a named tool, or a named client.
- **Plain text.** No markdown, no HTML: the string goes into JSON-LD verbatim.
- **`primaryRoute`** — the one route allowed to emit it as `FAQPage`. The same
  Q/A on two URLs splits the entity across duplicates.

**The invariant that makes this work:** visible HTML and `FAQPage` schema render
from *the same object*, so they cannot drift. Verified in the build output —
the schema text is byte-identical to the rendered paragraph. Never introduce a
path where schema text is authored separately.

Validator gotcha: the leading-pronoun check is case-insensitive, so an answer
starting "IT consulting…" trips on "it". Reword the opener.

---

## 5. SEO / AEO / GEO implementation map

| File | Role |
|---|---|
| `src/lib/seo.ts` | `buildMetadata()`. Always sets a relative `alternates.canonical`, resolved against `metadataBase`. **Leave `images` undefined** — returning `openGraph.images` overrides the segment's `opengraph-image.tsx`. |
| `src/lib/schema.ts` | All JSON-LD builders. Entities declared once, referenced by `@id`. |
| `src/lib/llms.ts` | Generates `llms.txt` + `llms-full.txt` from the content layer. |
| `src/components/seo/JsonLd.tsx` | Escapes `<` → `<`. Required: a `</script>` inside FAQ text is otherwise stored XSS. |
| `src/components/seo/AnswerSection.tsx` | Renders an `AnswerBlock`. The `.answer-lead` class is also the `speakable` selector. |

**Schema per route:** `Person` + `WebSite` + `ProfessionalService`/`LocalBusiness`
sitewide from the root layout; then `Service` + `Offer` + `FAQPage` + `HowTo` on
service pages, `BlogPosting` + `FAQPage` on posts, `CollectionPage` + `ItemList`
on hubs, `BreadcrumbList` everywhere.

**Entity integrity:** every page must show exactly **one** `#person` `@id`.
`/about`, `/work`, `/research`, `/contact` still hold hardcoded JSON-LD; if the
canonical host ever changes again, those four need updating too or they will
declare a second Person entity. Check with:

```bash
node -e 'const fs=require("fs");for(const f of ["index","work","about","research","contact"]){const h=fs.readFileSync(`.next/server/app/${f}.html`,"utf8");console.log(f,[...new Set([...h.matchAll(/"@id":"(https:\/\/[^"]*#person)"/g)].map(m=>m[1]))])}'
```

---

## 6. Next.js 16 — things that differ from most guides

Docs are bundled at `node_modules/next/dist/docs/`. Read them rather than
relying on memory.

- `middleware.ts` → **`proxy.ts`**, Node runtime only. *Not used here and not needed.*
- `params` / `searchParams` / `cookies()` / `headers()` are **Promise-only**.
- `params` is a Promise in `opengraph-image.tsx` too — but **synchronous** in
  `generateImageMetadata`. Avoid the asymmetry by exporting a static `alt`.
- `next/image` `qualities` defaults to `[75]` alone; `quality={90}` silently
  downgrades unless configured. `images.localPatterns` *restricts* optimisation
  to listed paths.
- **`searchParams` is the staticness trap.** Reading it anywhere makes the route
  dynamic. Blog filtering is `/blog/topic/[cluster]` path segments for this
  reason. `useSearchParams` in a client component needs a Suspense boundary or
  the whole page bails out of prerendering (this bit us on `/contact`).
- `next lint` is removed. `next build` does not lint.
- Tailwind v4, CSS-first. No `tailwind.config.js`. Tokens live in the `@theme`
  block in `globals.css` and generate utilities automatically.

**The invariant to protect:** `/api/contact` must remain the *only* `ƒ` in the
build route table. A second dynamic route means something read `searchParams`,
`cookies()`, or `headers()` in a page tree.

---

## 7. Performance — hard-won lessons

- **Never wrap above-the-fold content in `AnimateIn`.** It starts at
  `opacity: 0` and waits for framer-motion to hydrate. Doing this to the hero
  cost 4.9s of render delay and 14 Lighthouse points on mobile. Below the fold
  it is fine.
- **Never put `priority` on decorative images.** It injects a preload that
  competes with the real LCP element.
- Animate `transform` and `opacity` only — compositor-only, no layout or paint.
- Palette values are **WCAG-checked against the surfaces they sit on**:
  `--color-accent: #C14F24` and `--color-muted: #6C6C6C`. Do not lighten them
  back toward the originals; both previously failed AA.

Baseline (production build, localhost — the controlled measurement):

```
desktop  perf 100  a11y 100  best-practices 100  seo 100  LCP 0.7s  CLS 0.001
mobile   perf  94  a11y 100  best-practices 100  seo 100  LCP 3.1s
```

Remote Lighthouse from a laptop varies wildly (observed 41–75 across runs on
the same build). Use **PageSpeed Insights** for an authoritative number and
Search Console Core Web Vitals for real-user data.

---

## 8. Verification

```bash
npm run build              # route table; /api/contact must be the only ƒ
npx tsc --noEmit
npx eslint src             # `npm run lint` also scans Downloads/ — noisy
npm run validate:content   # answer word counts, uniqueness, slug integrity
npm run check:tokens       # hex literals outside the allowed exemptions
```

`check:tokens` currently fails on `/about`, `/work`, `/research`, `/contact` —
pages never rewritten. Cosmetic, zero visual difference, left deliberately.

---

## 9. Current state

**54 pages, all prerendered.** Live at https://arjun-basnet.com.np (Vercel via
GitHub; pushing to `main` deploys production).

Built: 9 service pages + index, 12 blog posts + index + 3 cluster hubs, `/faq`,
generated `llms.txt` / `llms-full.txt`, contact flow with autoresponder,
WhatsApp FAB with ripple + prompt, GA4, headshot through `next/image`.

Untouched by design: `/about`, `/work`, `/research`, `/melos`.

### Open items

1. **Cloudflare is still blocking AI crawlers** — see §10. Highest priority.
2. **SMTP env vars on Vercel** — `.env.local` is gitignored so they did not
   deploy. Without them `/api/contact` 500s. Untested in production.
3. **Search Console** — submit `https://arjun-basnet.com.np/sitemap.xml` on the
   **apex** property.
4. **GA4 key events** — mark `lead_form_success`, `whatsapp_click`,
   `calendar_click`.
5. **Copy review** — ~25,000 words include policy commitments in Arjun's name
   ("you own the code, no lock-in", "no commissions or referral fees",
   "24-hour response"). Never reviewed by him.
6. `profile.jpg` and the source WhatsApp `.avif` sit in the repo root,
   deliberately uncommitted. `public/PHOTOS_README.txt` is obsolete.

---

## 10. Cloudflare — blocking AI crawlers (unresolved)

`robots.txt` still serves a Cloudflare-managed block **before** our rules:

```
# BEGIN Cloudflare Managed content
User-agent: *
Content-Signal: search=yes,ai-train=no,use=reference
User-agent: ClaudeBot          Disallow: /
User-agent: GPTBot             Disallow: /
User-agent: Google-Extended    Disallow: /
User-agent: Applebot-Extended  Disallow: /
User-agent: Amazonbot / CCBot / Bytespider / meta-externalagent   Disallow: /
```

Our `Allow: /` rules for the same agents come *after*. Two conflicting groups
for one user-agent, restrictive first — most crawlers take the first match.

**This defeats the GEO strategy.** `/services/generative-engine-optimization`,
`llms.txt`, and `llms-full.txt` all assume these bots can read the site.

Verified fresh, not cached: `age: 0`, `cf-cache-status: REVALIDATED`.

The relevant control is Cloudflare's **managed robots.txt / Content Signals
Policy**, which is *separate* from the "Block AI bots" WAF toggle. Turning off
bot blocking does not remove this block. Re-check with:

```bash
curl -s https://arjun-basnet.com.np/robots.txt | grep -A1 "User-agent: ClaudeBot"
```

Expected once fixed: no `Disallow: /`, and no `ai-train=no`.

---

## 11. Next session — planned work

**Goal: humanise the service and blog pages, and add imagery.**

Owner will supply a visual reference. Scope:

1. `/services` listing — warmer layout, imagery
2. `/services/[slug]` detail — break up the long text runs
3. `/blog` listing — post imagery
4. `/blog/[slug]` detail — hero images, in-body imagery

**Constraints to hold while doing it:**

- Hero content stays out of `AnimateIn` (§7)
- Images through `next/image` with explicit `sizes`; no `priority` except a
  genuine LCP element
- Pexels is **build-time only** — `PEXELS_API_KEY` is in `.env.local`, must
  never be `NEXT_PUBLIC_` or imported from `src/`. Download to `public/`,
  commit the files, keep builds offline-capable
- `ImageRef` in `types.ts` already carries `src`/`alt`/`width`/`height`/
  `blurDataURL`/`credit`; `Service.heroImage` and `BlogPostMeta.heroImage`
  already exist and are currently unused
- Do not weaken the AEO answer blocks to make room for visuals — they are the
  reason the pages can be cited
- Re-run Lighthouse after: mobile perf must not fall below ~90

**Image processing recipes that worked** (both used `sharp`, already installed):

- *Headshot* — subject was greyscale on saturated blue, separated on
  `blue − red` with a soft edge band, then largest-connected-component to drop
  stray specks. 228KB source → 22KB AVIF delivered.
- *WhatsApp icon* — flood-fill white **from the border only**, so the enclosed
  white glyph survived. Palette quantisation 27KB → 4.5KB.

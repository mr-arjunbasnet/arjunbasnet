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

1. ~~**Cloudflare is blocking AI crawlers**~~ — **resolved 2026-07-26**, see §10.
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
7. **Citable client list** — the `/services` design calls for a "Trusted by"
   row and it was left out rather than invented. Needs names Arjun confirms he
   can publish, with permission. Note Makura is his *employer*, not a client.

---

## 10. Cloudflare — AI crawler block (RESOLVED 2026-07-26)

**Fixed.** `robots.txt` now serves only our own rules — every AI crawler group
reads `Allow: /`, and both the `Content-Signal: ai-train=no` line and the
`# BEGIN Cloudflare Managed content` header are gone. Confirmed on a
cache-busted fetch (`age: 0`, `cf-cache-status: MISS`, `last-modified:
Sun, 26 Jul 2026 08:06:30 GMT`). The GEO strategy is no longer being defeated.

Re-check any time with:

```bash
curl -s "https://arjun-basnet.com.np/robots.txt?cb=$RANDOM" -H 'Cache-Control: no-cache' \
  | grep -iE "cloudflare|content-signal|disallow: /$"
```

No output means healthy. If it regresses, suspect a Cloudflare-side policy
default being re-applied — `robots.txt` is generated from `src/` and did not
change across the original incident.

<details><summary>What the block looked like (2026-07-25, for reference)</summary>

`robots.txt` served a Cloudflare-managed block **before** our rules:

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

Our `Allow: /` rules for the same agents came *after*. Two conflicting groups
for one user-agent, restrictive first — most crawlers take the first match.

The control was Cloudflare's **managed robots.txt / Content Signals Policy**,
which is *separate* from the "Block AI bots" WAF toggle — turning off bot
blocking did not remove it. The dashboard also read as though the change had
applied a full day before it actually took effect, which is why the lesson is:
**verify at the edge with curl, never trust the dashboard state.**

</details>

---

## 11. `/services` redesign — shipped 2026-07-26

Banner and cards rebuilt from the owner's "Variation 4" reference mockup.
**Still not saved to the repo** — it was pasted into chat both times it was
shared. If another visual reference arrives, save it to `docs/reference/` and
commit it before starting work.

### What was built

- **Hero** — eyebrow, H1 with a coloured highlight span, two CTAs, a four-stat
  trust row, and an animated dashboard illustration
  (`ServicesHeroArt.tsx`).
- **Nine card illustrations** (`ServiceArt.tsx`) — inline SVG, one per service,
  resolved through an explicit slug map like `ServiceIcon` is. Drawn with
  Tailwind fill/stroke utilities, so there is no hex literal and `check:tokens`
  stays clean.
- **Flat 9-card grid**, replacing the growth/build/advisory grouping on this
  page. `SERVICE_GROUPS` still drives nav.
- **Cool palette variant** — see below.

### Decisions worth not re-deriving

| Decision | Reasoning |
|---|---|
| Hero animation is **CSS keyframes, not framer-motion** | The hero is the one place where waiting on hydration costs measurable render delay (§7). The scene paints with the document; motion is an embellishment on top. Nothing starts at `opacity: 0`. |
| **`HeroBackground` dropped from this page** | Its decorative rings collided with the illustration's orbit ring, and removing it took a client component out of the fold. |
| Illustrations are **inline SVG, not image files** | A decorative image must never compete with LCP; the surest way is for it not to be a request. Also scales without `sizes` and recolours from tokens. |
| Price shows **once under the grid heading**, not on all nine cards | Preserves the pre-qualifying signal (§2) without the density the redesign was meant to remove. |
| **Orange demoted to a highlight**, blue leads | Owner's call, 2026-07-26. Large orange masses (the gear, the AEO answer box) became blue, each keeping one accent dot as the focal point. |
| **No "Trusted by" logo row** | The reference shows one (makura, revvvy, H.N Media, ionio, crevvy). A client list is a public factual claim and needs names the owner confirms he can cite, with permission. See open items. |
| Real stats, not the mockup's | The reference carried placeholder "7+ years / 30+ projects". `proof.ts` has better true numbers. |

### The `.svc-cool` palette variant

`/services` runs cool grey neutrals while the rest of the site stays warm. The
override lives in `globals.css` and works **only because the project uses
`@theme`, not `@theme inline`** — utilities compile to `var(--color-…)`, so
redeclaring those properties on an ancestor recolours the subtree. Switching to
`@theme inline` would break this silently.

Brand colours are untouched. Contrast was measured against the live warm
palette and every pair improves; `muted on surface-2` moves from a failing 4.11
to 4.88. Full table is in the CSS comment. **Accent text must not sit on
`surface`** — 4.32 clears the 3.0 non-text bar but not 4.5 for body text.

Nav and footer are in the shared layout, so they stay warm. Lifting this to the
`@theme` block would move the whole site.

### Remaining, same treatment

1. `/services/[slug]` detail — break up the long text runs
2. `/blog` listing — post imagery
3. `/blog/[slug]` detail — hero images, in-body imagery

`ServiceArt.tsx` is the pattern to follow for the detail pages — same stage,
same visual grammar, same `sa-` motion classes.

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

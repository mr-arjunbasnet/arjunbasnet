# Content plan — September 2026

Source: Search Console export, Web, last 28 days (2026-08-16 → 2026-09-12),
supplied 2026-09-14. Read `PROJECT-CONTEXT.md` first; this plan sits inside
its decisions, not beside them.

---

## 1. What the data actually says

**Headline numbers (28 days):** 27 clicks, 3,430 impressions, position 11.4.

Those aggregates are misleading. Three days (09-10 → 09-12) hold 2,652 of the
3,430 impressions, and 2,739 impressions belong to one query: **"ai"**
(position 11.7, 0 clicks, almost all mobile, Nepal). The homepage / trainer
pillar has started appearing on page 2 for the bare word "ai" in Nepal. It
is not a query the site can win or that converts. Strip it out and the real
picture is:

| | Impressions | Clicks | CTR |
|---|---|---|---|
| Everything | 3,430 | 27 | 0.8% |
| Excluding the "ai" query | ~690 | 27 | ~3.9% |

3.9% is healthy for a seven-week-old commercial site. The mobile CTR of 0.2%
is the same artefact (2,935 mobile impressions are the "ai" query), not a
mobile UX problem. In Search Console, add a query filter `-ai` when reading
trends, or the noise will hide every real movement.

**Clicks come from brand.** "arjun basnet" is 7 of 27 clicks at position 1.8.
"arun basnet" gets 9 impressions — a misspelling worth having, not fixing.

**Real commercial demand, ranked by strength:**

| Query family | Impr. | Pos. | Page it lands on | Read |
|---|---|---|---|---|
| custom software development (company / in) nepal | 39 | 15–27 | `/services/custom-software-development` (56 impr, pos 21) | Strongest non-brand commercial family. Page 2–3. **Push.** |
| ai automation (in) nepal, RPA in nepal | 11 | 7–40 | `/services/ai-automation` (58 impr, **5.2% CTR**, pos 8.4) | Best-converting non-brand page. Page 1 already. Support it. |
| ai trainer / training (in) nepal | 9 | 5.6–24 | `/ai-trainer-nepal` (16 impr, pos 6.9, 0 clicks) | Top 10 within 4 days of launch. Needs a click-worthy title and support posts. |
| website speed optimization nepal | 12 | 17.7 | `/blog/website-speed-nepal` (19 impr, 1 click) | Post is page 2. The query says "optimization"; the title does not. |
| seo nepal / technical seo expert / aeo expert / seo trends / common seo mistakes | 12 | 26–65 | `/services/seo-services`, `why-your-website-isnt-ranking` | Scattered, all page 3+. No page owns "SEO in Nepal, this year". |
| it consulting in nepal | 4 | 35 | `/services/it-consulting` (18 impr, pos 19) | Weak; long game. |
| local ai / what is local ai | 3 | 5.5 | (not targeted anywhere) | Ranking top 5 for a topic we never wrote. Cheap win. |
| ai call / call ai / ai phone / call with ai | 6 | 9–13 | homepage (the assistant orb copy) | An emerging category. Candidate, not a priority. |
| app developer in nepal | 1 | 2 | `/services/mobile-app-development` | One impression at position 2. Watch. |

**High-impression, zero-click pages** — the snippet, not the ranking, is the
problem here:

| Page | Impr. | Pos. | Clicks |
|---|---|---|---|
| `/faq` | 50 | 9.4 | 0 |
| `/blog/why-your-website-isnt-ranking-nepal` | 27 | 10.6 | 0 |
| `/services/generative-engine-optimization` | 19 | 12.3 | 0 |
| `/ai-trainer-nepal` | 16 | 6.9 | 0 |
| `/blog/automate-quotation-generation` | 12 | 6.9 | 0 |
| `/services/seo-services` | 12 | 7.9 | 0 |

**Not yet visible:** the three AI-training posts published 09-08 have no
impressions. Normal at four days. The "Search appearance" export is empty —
no rich results of any kind are being shown. Note that Google removed FAQ
rich results for all but government/health sites in August 2023 and HowTo
rich results entirely; the `FAQPage` schema still feeds AI Overviews and
LLM extraction (its real job here) but will not produce a visible SERP
feature. Tables and images are what earn featured snippets and image slots
now — which is why §3 exists.

**Geography:** Nepal 24 clicks / 3,232 impressions. India 3 clicks from 38
impressions (7.9% CTR). United States 66 impressions, 0 clicks. Nepal-first
stands; India is the natural second market and needs no separate work yet.

---

## 2. The five posts

Cluster balance after these five: every cluster at 5 posts.

Each post follows the `write-blog-post` skill: 3–5 `keyTakeaways` that each
carry a number, tool, or decision rule; `faqs` at 35–95 words; `serviceSlugs`
that resolve; British spelling; willing to recommend against itself.

**Every post ships with:** one hero image, at least one table, at least one
in-body figure (chart or diagram), 3–5 contextual links to sibling posts, and
1–2 to service pages. Image briefs below are for the owner to generate.

### Post 1 — What Custom Software Actually Costs in Nepal (and the five things that move the price)

- **Slug:** `custom-software-cost-nepal`
- **Cluster:** `digital-problem-solving`
- **Targets:** custom software development nepal; custom software development company in nepal; custom software cost nepal; software development price nepal
- **Pushes:** `/services/custom-software-development` (pos 21 → page 1 is the goal), `/services/it-consulting`
- **Why:** cost intent is the highest-converting adjacent query to the strongest commercial family in the export, and no Nepali competitor answers it honestly.
- **Constraint (§2 of PROJECT-CONTEXT):** per-service price ranges were deliberately deleted; one global floor exists (`STARTING_PRICE`). This post must give **cost drivers and three worked examples**, anchored to the global "from NPR 49,999" floor — not a price list. Label examples as illustrative.
- **Outline:** why quotes for "the same" system differ 5×; the five drivers (integrations, number of user roles, data migration, offline/mobile, who maintains it); three worked examples (inventory + billing for a retailer; admissions pipeline for a consultancy; field-reporting app for an NGO); what is *not* worth paying for; how to read a proposal → links to `evaluate-software-vendor-proposal`, `build-vs-buy-custom-software`, `why-digital-projects-fail-nepal`.
- **Table:** driver × what it adds × how to reduce it.
- **Figure (owner):** stacked bar, "where the money goes in a typical build" (discovery / build / integrations / testing / first-year support). Hero: a quotation document with three columns being compared.
- **Key takeaways (draft):** "Integrations, not screens, are the largest single cost driver: each external system a build must talk to adds roughly the cost of one more module." / "A build that needs offline use in the field costs materially more than one used only on office wifi — decide this before quoting." / "Custom software from Arjun Basnet starts at NPR 49,999; most of the variation above that is explained by the five drivers in this post."

### Post 2 — AI Automation Examples in Nepal: What Ten Kinds of Business Actually Automate

- **Slug:** `ai-automation-examples-nepal`
- **Cluster:** `ai-automation`
- **Targets:** ai automation in nepal; ai automation examples; robotic process automation in nepal; business automation nepal
- **Pushes:** `/services/ai-automation` (already page 1 with the best CTR — this deepens the cluster around it)
- **Why:** the four existing automation posts are about *method* (is it worth it, which tool, quotation example). Nothing answers "what would this look like for *my* kind of business", which is the question that precedes an enquiry.
- **Outline:** one section per business type — retail/wholesale, travel agency, education consultancy, hospital/clinic, manufacturing, real estate, hotel, NGO, law/accounting firm, e-commerce — each with the process, the trigger, the tool (n8n/Zapier/Make), the human checkpoint, and a realistic monthly running cost. Ends with "the three that are never worth it".
- **Table:** business type × process × tool × human check × running cost/month. This is the featured-snippet candidate.
- **Figure (owner):** one flow diagram of a single automation (enquiry → sheet → WhatsApp reply → CRM), and a small "frequency × rules-heaviness" quadrant. Hero: a whiteboard-style process map.
- **Links:** all four automation posts, `chatgpt-vs-claude-vs-gemini`, `/services/ai-automation`, `/services/custom-software-development`.

### Post 3 — AI Training for Employees in Nepal: A Sample One-Day Workshop Syllabus

- **Slug:** `ai-training-syllabus-nepal`
- **Cluster:** `ai-training`
- **Targets:** ai training nepal; ai training for employees; corporate ai training nepal; ai workshop syllabus
- **Pushes:** `/ai-trainer-nepal` (pos 6.9, 0 clicks — this post and the title fix in §4 work together)
- **Why:** an HR manager or principal searching for training wants to see the programme before enquiring. A concrete syllabus is the thing they forward internally. It deliberately targets "training" intent so it supports the pillar's "trainer" intent rather than competing with it.
- **Outline:** who it is for; what a one-day session can and cannot achieve; the syllabus by hour (module, activity, outcome); the three-day variant; what to send participants beforehand; how to measure it four weeks later; what to skip → links to `introduce-ai-to-your-team`, `chatgpt-vs-claude-vs-gemini`, `ai-tools-for-students-nepal`.
- **Table:** hour × module × activity × outcome. Second table: one-day vs three-day.
- **Figure (owner):** a timeline strip of the day. Hero: a training room, not a robot.
- **Constraint (§12):** no claimed training record beyond what `proof.ts` and the MEET 2022 photo evidence.

### Post 4 — We Tested 100 Nepali Business Websites for AI Search Readiness (shipped 2026-09-14)

- **Slug:** `nepal-ai-search-readiness-2026`
- **Cluster:** `seo-aeo-geo`
- **Targets:** AI search readiness Nepal; website speed optimization nepal; seo trends nepal 2026; common seo mistakes nepal
- **Pushes:** `/services/generative-engine-optimization`, `/services/seo-services`, `/services/answer-engine-optimization`, `/blog/website-speed-nepal`
- **Owner's steer:** "emphasise AI more" — so the study became an AI-search readiness sweep (crawler access, structured data, basics, speed) rather than speed alone.
- **Method:** `scripts/research/ai-search-readiness.mjs` over `scripts/research/sites.json` (10 sectors × 10 live homepages). Phase A is plain fetches; phase B is headless Chromium on Lighthouse's slow-4G profile. PageSpeed's anonymous API quota was exhausted, hence the local browser. Raw rows in `docs/research/ai-search-readiness-2026/` (per-site, for reproducibility — the post reports sector medians only and names nobody).
- **Headline numbers:** 1 of 100 passes all four basics; 12% block an AI crawler, 9 of the 12 via Cloudflare's managed default; 58% no JSON-LD, hospitals 0%; FAQ schema 1%; median LCP 12.2 s on slow 4G, 10% under 2.5 s; median page 3.1 MB.
- **Charts:** two inline SVG bar charts generated from the data (CSS-variable fills, no hex), so nothing to generate. Hero image still wanted (brief in `public/media/blog/README.txt`).
- **Refresh:** re-run September 2027; the post promises it.

### Post 5 — AI Tools for Small Businesses in Nepal: What Is Worth Paying For in 2026 (shipped 2026-09-14)

- **Slug:** `ai-tools-small-business-nepal`
- **Cluster:** `ai-training`
- **Targets:** ai tools for small business nepal; best ai tools nepal; chatgpt for business nepal; ai subscription nepal
- **Pushes:** `/services/ai-automation`, `/services/it-consulting`, `/services/digital-marketing`, `/blog/ai-training-syllabus-nepal`
- **Why this replaced "local AI":** owner's call 2026-09-14. This keeps the AI-training cluster growing and speaks to the buyer directly: one paid assistant for the two heaviest writers, a month of real use, then decide. Includes the Nepal-specific payment obstacle (dollar-card limits) and the Nepali-language caveat.
- **Verify before publishing:** the price column ("roughly USD 20 / month") — vendor pricing moves; the post says so but the numbers should be checked on the day.

**Held in reserve (post 6+):** "What 'Local AI' Means" (declined by the owner 2026-09-14, do not re-propose); "AI Phone Agents for Nepali Businesses: What an AI Receptionist Can and Cannot Do" (ai-automation; the "ai call / ai phone" queries); "How Much Does a Mobile App Cost in Nepal" (digital-problem-solving; after post 1 proves the cost format).

---

## 3. Blog changes — before post 1 is written

The owner's instinct is right, and the repo confirms it: **15 posts, zero
images, zero tables, three in-body internal links in total.** The template
links post → service, but nothing links service → post or post → post.

Do these in order; the first three are template work and unlock everything
else.

1. **Style tables, images and figures in `prose-site`** (`globals.css`). It
   has no rules for `table`, `img`, `figure`, `figcaption`. Tables need a
   horizontal-scroll wrapper on phones (the responsive QA rule: no page-level
   horizontal scroll) — a `marked` renderer override wrapping `<table>` in
   `<div class="table-scroll">` is the clean way.
2. **Wire `heroImage`** (`BlogPostMeta.heroImage` exists, unused) into
   `/blog/[slug]` and the `/blog` listing cards. Through `next/image` with
   `sizes`; the post hero *is* the LCP element so it may take `priority` —
   nothing else on the page may. Not inside `AnimateIn`.
3. **Add "From the blog" to service pages** using `getPostsForService`
   (defined in `blog/index.ts`, never called). Three cards, newest first.
   This is the single largest internal-linking gain available and costs no
   content.
4. **Add "Related posts" to post pages:** same cluster, then shared
   `serviceSlugs`, excluding self, three cards.
5. **Retrofit the 15 existing posts** with 3–5 contextual in-body links each
   (a link map is trivial from the cluster table above) and one table where
   the post already has a list that is really a table (`n8n-vs-zapier`,
   `technical-seo-checklist`, `build-vs-buy`, `chatgpt-vs-claude-vs-gemini`,
   `processes-worth-automating-first`).
6. **Images on old posts:** hero only, generated by the owner from a one-line
   brief per post. In-body figures only where a post gains a table (step 5).
7. **Interactive elements — phase 2, not now.** Markdown cannot host a React
   component. A "worth automating" calculator or a cost estimator would need
   a small widget registry (`<div data-widget="roi">` hydrated by one client
   component). Worth doing once posts 1 and 2 are live and the format is
   proven; do not build it speculatively.

**Image rules already decided:** `next/image` + explicit `sizes`; never
`priority` on decorative images; AVIF/WebP via `sharp`; files committed to
`public/`; alt text describes the content, not the keyword.

---

## 4. Title and snippet rewrites — zero-click pages

Ranking is fine on these; the snippet is losing the click. Titles ≤ 60
characters; descriptions ≤ 160, ending on a reason to click.

| Page | Now | Proposed |
|---|---|---|
| `/faq` | "Frequently Asked Questions" | "Digital, AI & Software FAQ for Nepali Businesses — Prices, Timelines, Process" |
| `/ai-trainer-nepal` | "AI Trainer in Nepal — AI Training, Workshops & Seminars" | "AI Trainer in Nepal: Workshops for Teams, Schools & Institutions" (description should name a duration and an audience: "one-day and three-day programmes…") |
| `/services/seo-services` | "SEO Services in Nepal" | "SEO Services in Nepal — Technical, Local & AI-Search Ready" |
| `/services/generative-engine-optimization` | "…(GEO) Services in Nepal" | "GEO Services in Nepal — Get Cited by ChatGPT & Perplexity" |
| `why-your-website-isnt-ranking-nepal` | "Why Your Nepali Business Website Isn't Ranking on Google" | "Why Your Website Isn't Ranking in Nepal: 6 Common SEO Mistakes" (captures the "common seo mistakes in nepal" family at pos 34–64) |
| `website-speed-nepal` | "Website Speed in Nepal: Why It Matters More Than You Think" | "Website Speed Optimization in Nepal: What Actually Slows Sites Down" (the query says "optimization") |
| `automate-quotation-generation` | "Automating Quotation Generation: A Worked Example" | "Automating Quotations with n8n: A Worked Example (Nepal)" |

Renaming a post title does not change its slug or heading IDs, so no anchors
break. Set `updatedAt` on any post whose body changes.

---

## 5. Link building — what is worth doing from Nepal

Ten years in, the honest summary: for a personal-brand consultancy, links
come from **being citable, being listed, and having one thing worth
linking to.** Buying, exchanging, or mass-outreaching does not survive
contact with a site this size. In order of return on effort:

1. **Entity and citation layer (week 1, free).** Google Business Profile
   (Kathmandu, categories: IT consultant, marketing consultant, training
   provider) with the site URL. ORCID, Google Scholar and ResearchGate
   profiles already exist — confirm every one carries the apex URL. LinkedIn
   "Website" field and Featured section pointing at the pillar and post 4.
   Makura Creations staff/leadership page linking to the site, if they have
   one. Consistent name, role, city everywhere: this is what LLMs resolve.
2. **The data study (post 4) as the asset.** Once live, send it — with the
   sector chart attached — to Nepali tech and business media: TechLekh, ICT
   Frame, TechPana, NepaliTelecom, the tech desks at The Kathmandu Post,
   Republica and The Himalayan Times. Offer the numbers, not the post. Ten
   emails, expect two links. Repeat annually with the refresh.
3. **Product listings that are links (week 2).** ClipStack on GitHub (README
   linking to `/product/clipstack`), AlternativeTo, MacUpdate, Product Hunt,
   Softpedia. Melos on the equivalent audio directories. These are natural,
   editorial links to the same domain, and each takes fifteen minutes.
4. **Directories that a buyer actually visits.** Clutch, GoodFirms, DesignRush
   (individual consultants list), F6S, CAN Federation member listing. Fill
   them completely; a half-empty profile is worse than none.
5. **Speaking and training leave a trail.** Every session delivered should
   produce an event page, a host's post, or a photo caption that links back.
   Ask at booking time, not after. This also builds the training record that
   §12 notes the site cannot yet claim.
6. **Guest expertise, not guest posts.** Offer Nepali outlets a quotable
   paragraph on AI adoption, AI in education, or website speed whenever the
   topic is in the news. A quote with a link is worth more than an article
   with a link, and takes an hour rather than a day.
7. **Do not:** buy links, join Nepali "SEO exchange" groups, submit to
   generic web directories, or comment-spam. All of it is visible, and the
   site is small enough that one penalty is total.

Track it: Search Console → Links → Top linking sites, monthly. The target is
not a number; it is that every link is one a person chose to place.

---

## 6. Sequence

| Week | Work |
|---|---|
| 1 | §3 steps 1–4 (template). §4 title rewrites. §5 items 1 and 3. Add a `-ai` query filter to the GSC saved view. |
| 2 | Post 2 (automation examples) — the cluster is warmest. Post 5 (local AI) — short, already ranking. Hero images for both. |
| 3 | Post 1 (custom software cost). Write and run the PSI sweep script for post 4. §3 step 5 retrofit on the four SEO posts. |
| 4 | Post 4 (speed study) with real charts. Post 3 (training syllabus). §5 item 2 outreach begins the day post 4 goes live. |
| 5+ | §3 step 5 retrofit on the remaining posts, §5 items 4–6, read the next 28-day export against this one. |

**What to measure in the next export:** clicks excluding brand and the "ai"
query; position of the custom-software family; impressions on the three
training posts; whether `/faq` and the pillar gained clicks at the same
position (the title test); Links → Top linking sites.

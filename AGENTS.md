<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# arjun-basnet.com.np

A commercial digital-services site for nine service lines. Success is measured
in **enquiries**, not traffic or rankings. It targets three surfaces at once:
Google results (SEO), answer boxes and AI Overviews (AEO), and citations inside
ChatGPT / Claude / Perplexity / Gemini (GEO).

**Read `docs/PROJECT-CONTEXT.md` before changing content, SEO, or page
structure.** It records decisions, the content model, and mistakes already paid
for. What follows is only the set of invariants that are easy to break by
accident.

## Invariants

1. **`/api/contact` is the only dynamic route.** Check the build route table
   after any page change. A second `ƒ` means something read `searchParams`,
   `cookies()`, or `headers()` in a page tree. `useSearchParams` in a client
   component needs a Suspense boundary or the page drops out of prerendering.

2. **Content lives in `src/content/`, never in page components.** Adding a
   service is one file plus one line in `services/index.ts`. Adding a post is
   one markdown file. Sitemap, schema, `llms.txt`, and nav all follow.

3. **The domain is written in exactly one place** — `SITE.url` in
   `src/content/site.ts`. Canonical is the **apex**, no `www`. Note that
   `/about`, `/work`, `/research`, `/contact` still carry hardcoded JSON-LD
   URLs; if the host changes, they need updating too or the page will declare
   two `Person` entities.

4. **Visible answer text and `FAQPage` schema render from the same object.**
   Never create a path where schema text is authored separately from what a
   reader sees. `AnswerBlock.answer` must be 134–167 words, self-contained,
   plain text — enforced by `npm run validate:content`.

5. **Never wrap above-the-fold content in `AnimateIn`.** It starts at
   `opacity: 0` and waits for hydration; on the hero this cost 4.9s of mobile
   render delay. Below the fold is fine.

6. **Never put `priority` on a decorative image.** It preloads, competing with
   the real LCP element.

7. **`/work` and `/research` are not to be restructured.** Owner's decision.
   Link into their existing `#anchors` instead.

8. **Palette values are WCAG-checked** against the surfaces they sit on. Do not
   lighten `--color-accent` or `--color-muted` back toward their originals.

9. **`PEXELS_API_KEY` is build tooling only.** Never `NEXT_PUBLIC_`, never
   imported from `src/`. Images are downloaded to `public/` and committed so
   builds stay offline-capable.

## Checks

```bash
npm run build              # route table — /api/contact must be the only ƒ
npx tsc --noEmit
npx eslint src             # scope to src/; `npm run lint` also scans Downloads/
npm run validate:content   # AEO word counts, uniqueness, slug integrity
```

## Deploying

`main` auto-deploys to production via Vercel's GitHub integration. There is no
staging branch. Verify the build locally before pushing.

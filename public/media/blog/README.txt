Blog imagery — drop-in slots
============================

Each post's frontmatter may declare `heroImage.src` under /media/blog/. The
build checks whether the file exists (src/lib/media.ts): when it does, the
post shows it as the hero and every card listing the post shows it as a
thumbnail; when it does not, the post renders text-first. Dropping the file
in is the whole upgrade — no code change.

Spec
----
- 1600 × 900 px (16:9). JPG at quality ~80, or WebP. Under 250 KB.
- Landscape, with the subject in the middle 60% so the 16:9 → card crop
  stays safe.
- No text baked into the image (it will not scale, and it is not indexable).
- Brand palette welcome but not required: real-looking scenes beat abstract
  "AI" glows. No robots, no glowing brains, no binary rain.
- Filename = post slug.

Briefs for the September 2026 posts
-----------------------------------
custom-software-cost-nepal.jpg
  Three printed quotations laid side by side on a desk, one line item on
  each circled in pen where they differ. Warm office light. A calculator or a
  phone at the edge.

ai-automation-examples-nepal.jpg
  A whiteboard process map: WhatsApp icon → spreadsheet → automatic reply
  → CRM, drawn in marker with arrows. A hand holding the marker, slightly
  out of focus.

ai-training-syllabus-nepal.jpg
  A training room in Kathmandu: eight to twelve people in pairs on laptops,
  a facilitator at a whiteboard mid-sentence. Daylight, not projector-dark.

ai-tools-small-business-nepal.jpg
  A shop owner at a small counter, laptop open with a chat assistant visible
  (no readable text), a handwritten ledger beside it. Kathmandu shop detail
  in the background.

nepal-ai-search-readiness-2026.jpg
  A phone mid-load on a slow connection (spinner or half-rendered page)
  held against a Kathmandu street or shopfront. Alternative: the bar chart
  from the post, rendered large and clean on a plain ground.

In-body figures
---------------
Write them as raw HTML in the markdown so they get a caption:

  <figure>
    <img src="/media/blog/<slug>-fig1.png" alt="…" width="1400" height="800" loading="lazy">
    <figcaption>What the chart shows, in one sentence.</figcaption>
  </figure>

Charts: 1400 × 800 px PNG, transparent or Warm White ground, brand Indigo
(#221A5C) and Iris (#5B4BDB) for series, muted grey for context bars.

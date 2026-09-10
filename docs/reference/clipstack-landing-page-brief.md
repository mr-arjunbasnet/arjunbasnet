# ClipStack — landing page design & content

For **arjun-basnet.com.np/product/clipstack**. This document is the complete
brief: page structure, visual system, every word of copy, the gated download
form, and how releases and in-app updates flow through the same folder.
Build it in whatever the site uses (Next.js, Astro, MDX…); the static
reference implementation in `site/clipstack/index.html` renders the same
page with no framework and can be used as-is or as a visual check.

---

## 1. Goals and audience

**Goal:** turn a visitor who has lost copied text on a Mac into an installed,
self-updating ClipStack — and capture who they are on the way.

**Audience:** Mac users who copy and paste for a living — developers,
writers, designers, support and sales people, students. They know what
"the clipboard" is; they do not know a clipboard manager exists, or think it
means a subscription and a cloud account.

**One-line promise:** *Everything you copy, one shortcut away — and it never
leaves your Mac.*

**Conversion path:** land → recognise the problem → see the panel → fill the
short form → download `.pkg` → read the first-launch note → install.

**Success metrics** (from the lead form and Vercel analytics if enabled):
form submissions, downloads started, `.pkg` vs `.dmg` ratio, FAQ "first-launch
note" opens (a proxy for Gatekeeper friction), contact-form requests.

---

## 2. Page map

```
/product/clipstack
├── Nav                 brand · The problem · Features · How to use · Use cases · FAQ · Contact · [Download]
├── 1  Hero             promise, download CTA (opens the form), app mock-up
├── 2  The problem      what macOS does today and what it costs
├── 3  The solution     three pillars: one shortcut · private · updates itself
├── 4  Features         9 cards
├── 5  How to use       5 numbered steps + keyboard reference table
├── 6  Use cases        6 cards
├── 7  Download         the gated form (also reached from every CTA)
├── 8  FAQ              8 questions, first one open (Gatekeeper note)
├── 9  Have a problem?  request/contact form
└── Footer
```

Every "Download" button on the page scrolls to §7 and focuses the first
field. Returning visitors who already submitted the form (a `localStorage`
flag) see direct download buttons instead of the form.

---

## 3. Visual system

Native-Mac feel: quiet, precise, lots of air. Nothing that looks like a SaaS
template.

**Colour** (light / dark, follow `prefers-color-scheme`):

| Token | Light | Dark | Use |
|---|---|---|---|
| `bg` | `#f6f7fb` | `#0f1220` | page |
| `surface` | `#ffffff` | `#171b2e` | cards, mock-up, inputs |
| `ink` | `#14182b` | `#eef0f8` | text |
| `muted` | `#5b6178` | `#a0a6bf` | secondary text |
| `line` | `#e3e6f0` | `#272c45` | borders |
| `accent` | `#3355db` | `#6b86ff` | buttons, eyebrows, selected row |
| `soft` | `#e8ecfb` | `#1f2645` | kbd chips, icon tiles |
| `warn` / `warn-bg` | `#b45309` / `#fff4e5` | `#fbbf24` / `#2a2210` | the "what it costs" callout |

**Type:** system stack (`-apple-system, "SF Pro Text", Inter, …`). Scale:
h1 `clamp(34px, 5.2vw, 56px)` / 1.08; h2 `clamp(26px, 3.4vw, 36px)`; lead
`clamp(17px, 2vw, 20px)` muted; body 16/1.6; captions 13–14; eyebrows 12px,
700, `letter-spacing .12em`, uppercase, accent. Keyboard keys always in a
`<kbd>` chip (monospace 13px, `soft` background, 6px radius).

**Layout:** container `min(1080px, 100% − 40px)`; section padding 64px
(48px under 720px); 1px `line` rule between sections; cards 16px radius,
1px border, 22px padding; grids `repeat(auto-fit, minmax(240px, 1fr))`.

**Buttons:** 12px radius, 11×18 padding, 600 weight. Primary = accent fill;
secondary = surface + border. File type as a small muted suffix
("Download installer `.pkg`").

**Motion:** none beyond `scroll-behavior: smooth`, FAQ expand, and a 150 ms
fade when the form swaps to the download buttons. Respect
`prefers-reduced-motion`.

**Imagery:** one illustrative mock-up of the panel in the hero (HTML/CSS, not
a screenshot, so it renders crisp in both schemes). No stock photos. If a real
screenshot is wanted later, use `--render-preview` output from the app
(`popup-light-680-browse.png` / `popup-dark-680-browse.png`) at 2×.

**Responsive:** must produce **no horizontal scroll at 320, 360, 390, 430,
600, 768, 1024, 1280, 1600 px**. Under 720px: nav links collapse (Download
stays), hero mock-up hides its detail pane, tables scroll inside their own
container, two-column forms stack.

**Accessibility:** semantic landmarks, one h1, headings in order, visible
focus rings, form labels bound to inputs, `aria-hidden` on decorative
mock-up, colour contrast ≥ 4.5:1 for text in both schemes.

---

## 4. Copy, section by section

### Nav
Brand: icon + **ClipStack**. Links: The problem · Features · How to use ·
Use cases · FAQ · Contact. Button: **Download**.

### 1 · Hero
- Eyebrow: `FREE · MACOS 14 AND LATER · APPLE SILICON AND INTEL`
- H1: **Everything you copy, one shortcut away.**
- Lead: macOS remembers exactly one thing you copied. ClipStack remembers all
  of them — text, links, images, files, colours — searchable, private, and
  pasted back with `⌘⇧V`.
- CTA: **Download for Mac** (primary, opens the form) · *Version {version} ·
  about 2 MB · no account, no tracking* (version read live from
  `appcast.json`).
- Mock-up: the panel — search bar "Search clipboard history", count pill,
  five rows (link, rich text, image, files, colour) with source app and time,
  detail pane on the right, footer key hints.

### 2 · The problem
- Eyebrow: THE PROBLEM
- H2: **On a Mac, the clipboard forgets the moment you copy again.**
- Lead: Windows has had `Win`+`V` since 2018. macOS still holds a single item —
  copy something else and the previous one is gone for good.
- Bullets:
  - You copy a link, then copy a phrase to search for it, and the link is gone.
  - You cut a paragraph to move it, get distracted, copy something else, and the paragraph is lost.
  - You need three things from one page in another form — so you tab back and forth six times.
  - The colour you copied from Figma an hour ago, the file you copied from Finder, the code snippet from a chat: all overwritten, none retrievable.
  - Nothing in macOS shows you *what* is on the clipboard before you paste it.
- Callout (warn): **What it costs.** Small losses, dozens of times a day:
  re-finding, re-copying, re-typing. Clipboard managers exist, but most are
  paid, subscription-based, sync your clipboard to a cloud you did not ask
  for, or are heavy Electron apps. ClipStack is a native, one-purpose Mac
  utility that keeps everything on your Mac.

### 3 · The solution
- Eyebrow: THE SOLUTION
- H2: **A clipboard that keeps a history — and stays on your Mac.**
- Lead: ClipStack watches the clipboard from the menu bar, records every copy
  with its full formatting, and gives you a Spotlight-style panel to find any
  of it and paste it straight back into the app you were in.
- Three cards:
  - **One shortcut** — Press `⌘⇧V` anywhere. Type to search, `⏎` to paste into the app you came from. Change the shortcut in Settings.
  - **Private by design** — No account, no sync, no analytics. History lives in one file in your Library folder; optional encryption with a key in your keychain.
  - **Updates itself** — Checks once a day and installs new versions with one click. Every download is signature-checked before it replaces anything.

### 4 · Features
- Eyebrow: FEATURES · H2: **Built for the way you actually copy things.**
- Cards (title — body):
  1. **Every type, full fidelity** — Text, rich text, links, images, files and colours. A copied table pastes back as a table; a styled paragraph keeps its styling.
  2. **Instant search** — Full-text and fuzzy search over everything, ranked by relevance and recency. Results appear as you type.
  3. **Detail pane** — See the whole text, the full image, every file in a multi-file copy, or the colour swatch before you paste.
  4. **Pin what matters** — Pinned items stay at the top, never expire, and never count against the history limit.
  5. **Paste as plain text** — `⌘⇧⌥V` strips formatting. Give it its own global shortcut if you use it a lot.
  6. **Password-manager aware** — Copies from 1Password, Bitwarden, KeePassXC, Apple Passwords and others are never recorded. Secrets it detects are badged or discarded.
  7. **Exclusions and pauses** — Never record from chosen apps. Pause recording for 5 minutes, an hour, or until you say so.
  8. **Always on** — Starts at login and keeps recording until you quit it. Menu-bar only — no Dock icon, no window in your way.
  9. **Native and light** — Swift and SwiftUI, Liquid Glass on macOS 26, under 4 MB, no frameworks. Universal for Apple silicon and Intel.

### 5 · How to use
- Eyebrow: HOW TO USE · H2: **Up and running in two minutes.**
- Steps:
  1. **Install** — Download the installer and open it. It puts ClipStack in Applications and starts it. On the first open macOS may say it cannot verify the developer — see the first-launch note in the FAQ.
  2. **Allow it to paste for you** — Press `⌘⇧V`, pick an item and press `⏎`. macOS asks for Accessibility access once: System Settings → Privacy & Security → Accessibility → turn on ClipStack. Without it ClipStack still records and searches; you press `⌘V` yourself.
  3. **Copy as usual** — Nothing changes about `⌘C`. Everything you copy appears in the history, newest first, with the app it came from.
  4. **Find and paste** — `⌘⇧V` opens the panel in the centre of your screen. Type a few letters, arrow to the item, `⏎`. It pastes into the app you were just using.
  5. **Make it yours** — Settings (`⌘,` from the panel, or the menu-bar icon): change the shortcut, history size, retention, appearance, the detail pane, exclusions and encryption.
- Keyboard reference (table): `⌘⇧V` open (configurable) · type = search · `↑` `↓` move (wraps) · `⏎` paste · `⌘C` copy without pasting · `⌘⇧⌥V` paste as plain text · `⌘P` pin/unpin · `⌘⌫` delete · `Space` Quick Look an image · `esc` close.

### 6 · Use cases
- Eyebrow: USE CASES · H2: **Where it earns its keep.**
  1. **Filling forms from a document** — Copy the name, address, ABN and reference number in one pass, then paste each into its field from the panel. No tabbing back.
  2. **Developers** — Commands, tokens, snippets, error messages. Search by a fragment you remember; paste as plain text into the terminal.
  3. **Writers and editors** — Cut a paragraph, keep working, paste it an hour later — with its formatting. Keep boilerplate pinned.
  4. **Designers** — Colours copied from Figma or Sketch show as swatches with their hex values; images and screenshots are previewed at full size.
  5. **Support and sales** — Pin the replies, links and account IDs you send twenty times a day and paste them from anywhere.
  6. **Research** — Collect quotes and links from many tabs, then paste them into your notes in one sitting — each with the app and time it came from.

### 7 · Download (the gated form) — see §5 for behaviour
- Eyebrow: DOWNLOAD · H2: **Get ClipStack for your Mac.**
- Lead: Free. Tell me who you are and what you copy most — it shapes what gets
  built next — and the download starts right away.
- Fields: Name · Email · "What do you copy most?" (select) · [ ] Email me when
  a new version ships (optional) · **Download for Mac**
- Small print: *No account is created. Your address is used only for the
  update note if you tick the box.*
- After submit (same place, replaces the form): **Your download has started.**
  Open `ClipStack-{version}.pkg`. If macOS says it cannot be opened, use
  System Settings → Privacy & Security → **Open Anyway** — once. *Prefer a disk
  image? [Download the .dmg]*. Didn't start? [Download again].

### 8 · FAQ
1. **macOS says ClipStack "can't be opened", "is damaged" or "could not be verified". What now?** *(open by default)* — ClipStack is not yet notarized with an Apple Developer ID, so Gatekeeper refuses it once on first open. One-time, per Mac: (1) Open the .pkg installer; when macOS refuses it, click *Done*. (2) Open System Settings → Privacy & Security, scroll down, click **Open Anyway** beside the ClipStack message, confirm with your password. (3) The installer runs and starts ClipStack. It opens normally from then on, and updates arrive inside the app. If you used the .dmg: drag ClipStack to Applications, then in Terminal run `xattr -dr com.apple.quarantine /Applications/ClipStack.app` and open it.
2. **Is my clipboard sent anywhere?** — No. History is stored in `~/Library/Application Support/ClipStack/` and never leaves your Mac. The only network request ClipStack makes is the daily update check, which fetches one small file and carries nothing about you. You can turn it off in Settings → General.
3. **Why does it need Accessibility access?** — For one thing only: pressing `⌘V` in the app you came from after you choose an item. Reading the clipboard, the global shortcut and search all work without it.
4. **Does it record passwords?** — Copies from known password managers and anything marked "concealed" by the source app are never recorded. Text that looks like a key, token or card number is badged, and can be discarded automatically if you prefer.
5. **How do updates work?** — ClipStack checks this site once a day. When a new version exists it shows the release notes and installs with one click, verifying the download against a signature built into the app first. *Check for Updates…* in the menu-bar icon does it any time.
6. **Can I change the shortcut?** — Yes. Menu-bar icon → *Change Shortcut…*, or Settings → General. Click the shortcut box and press the new combination. It must include ⌘ or ⌃.
7. **How do I stop or remove it?** — Quit from the menu-bar icon. To stop it starting at login, turn it off in Settings → General or in System Settings → General → Login Items. To uninstall, delete ClipStack from Applications; Settings → Advanced → Reset Database removes the history first if you want a clean slate.
8. **Which Macs does it run on?** — macOS 14 Sonoma or later, on Apple silicon and Intel. Liquid Glass appears on macOS 26; earlier versions get the standard vibrant material.

### 9 · Have a problem like this?
- Eyebrow: HAVE A PROBLEM LIKE THIS? · H2: **Tell me what slows you down. I build tools for it.**
- Lead: ClipStack came out of one small daily annoyance. If something in your
  work has the same shape — a repetitive step, a missing utility, an
  integration that should exist — describe it here and I'll come back with a
  proposal.
- Fields: Name · Email · Kind (A problem with ClipStack / A feature I wish
  ClipStack had / A similar tool or automation for my work / Something else) ·
  Describe the problem (textarea) · **Send**
- Note: *Or write directly to {contact email}.*

### Footer
ClipStack · © 2026 Arjun Basnet · Made in Kathmandu · Back to top.

---

## 5. The gated download form — behaviour

**Purpose:** a light lead capture that never blocks someone from getting the
app. The download starts as soon as the form is valid; the network call is
best-effort.

**Fields**

| Field | Type | Rules |
|---|---|---|
| `name` | text | required, 2–80 chars |
| `email` | email | required, RFC-ish check, lowercased on submit |
| `uses` | select | `Text & code` · `Links` · `Images & design` · `Files` · `A bit of everything` (default) |
| `updates` | checkbox | optional, default unchecked, label "Email me when a new version ships" |
| honeypot `website` | hidden text | must be empty (bot filter) |

**Flow**

1. Any "Download" CTA → smooth-scroll to `#download`, focus `name`. If
   `localStorage.clipstack_lead === "1"`, show the *download buttons* state
   directly (returning visitor).
2. Submit → client-side validation → button reads "Starting download…".
3. `POST {LEAD_ENDPOINT}` with JSON `{ type: "download", name, email, uses,
   updates, version, ua, referrer, ts }`, 4 s timeout. **Regardless of the
   result** (success, error, timeout) continue to step 4 — a lead endpoint
   outage must never stop a download.
4. Trigger the download: create `<a href="/product/clipstack/ClipStack.pkg" download>`
   and click it. Set `localStorage.clipstack_lead = "1"`.
5. Swap the form for the "Your download has started" block (§4·7) with the
   `.dmg` alternative and a "Download again" link.

**Where submissions go** — pick one; all three use the same payload:

- **Vercel serverless function** (recommended, stays on your domain):
  `api/clipstack-lead.ts` validates, then either emails you via Resend
  (`RESEND_API_KEY`) or appends to a Google Sheet / Notion database. Example
  in §9.
- **Formspree / Basin:** set `LEAD_ENDPOINT` to the form URL; no code.
- **None yet:** leave `LEAD_ENDPOINT` empty; the form still gates and
  downloads, and submissions are only kept in the browser (`clipstack_lead`).

**Privacy line under the form** (keep it): *No account is created. Your
address is used only for the update note if you tick the box.* If you ever
send anything else to these addresses, change the sentence first.

**Contact form (§9)** posts to the same endpoint with `type: "request"`, and
falls back to a pre-filled `mailto:` if the endpoint is empty or fails.

---

## 6. Files, downloads and the update feed

Everything the page links and everything the app polls lives in **one
folder**, served verbatim at `/product/clipstack/`:

```
public/product/clipstack/
  appcast.json              the update feed (no-cache!)
  ClipStack-1.1.0.zip       what installed apps download (Ed25519-signed)
  ClipStack-1.1.0.dmg
  ClipStack-1.1.0.pkg
  ClipStack.dmg             "latest" copies the page links
  ClipStack.pkg
```

The app is built with `ClipStackUpdateFeedURL = https://arjun-basnet.com.np/product/clipstack/appcast.json`.
Keep that path forever; it is baked into every installed copy.

**Headers** (`vercel.json`, provided in `site/vercel.json`):
`appcast.json` → `Cache-Control: no-cache, max-age=0, must-revalidate`;
`*.zip|dmg|pkg` → `public, max-age=31536000, immutable` +
`Content-Disposition: attachment`. In Cloudflare add a Cache Rule → **Bypass**
for `/product/clipstack/appcast.json` (or purge that URL after each release).

**Release flow**

```bash
scripts/release.sh 1.2.0                    # in the ClipStack project → build/release/
cp build/release/* <site>/public/product/clipstack/
git add public/product/clipstack && git commit -m "ClipStack 1.2.0" && git push
curl -sI https://arjun-basnet.com.np/product/clipstack/appcast.json | grep -iE 'HTTP|cache'
```

Installed copies pick it up within a day, or immediately via *Check for
Updates…*. The page's version badge reads `appcast.json` at load, so it
updates itself too.

---

## 7. SEO and sharing

- `<title>` ClipStack — clipboard history for your Mac
- `meta description` ClipStack keeps everything you copy on your Mac, searchable and one shortcut away. Free, private, updates itself.
- OG title/description as above; OG image 1200×630: dark background, the
  panel mock-up, headline "Everything you copy, one shortcut away."
- Canonical `https://arjun-basnet.com.np/product/clipstack`
- JSON-LD `SoftwareApplication`: name ClipStack, `operatingSystem: macOS 14+`,
  `applicationCategory: UtilitiesApplication`, `offers.price: 0`,
  `downloadUrl` the `.pkg`, `softwareVersion` from the feed.
- Headings carry the search terms naturally: "clipboard history for Mac",
  "clipboard manager macOS", "Win+V for Mac".

---

## 8. QA checklist before publishing

- [ ] No horizontal scroll at 320 / 360 / 390 / 430 / 600 / 768 / 1024 / 1280 / 1600 px (check inside a real narrow viewport — headless Chrome clamps windows below ~500 px; use an iframe or device emulation)
- [ ] Light and dark schemes both read correctly; contrast checked
- [ ] Every "Download" CTA reaches the form; form validates; download starts even with `LEAD_ENDPOINT` unreachable
- [ ] Returning-visitor state (localStorage) shows direct buttons
- [ ] `appcast.json` returns 200 with `cache-control: no-cache`; version badge shows the right number
- [ ] `.pkg` and `.dmg` download with `Content-Disposition: attachment`
- [ ] FAQ 1 open by default; "first-launch note" anchor from the hero lands on it
- [ ] Contact form sends (endpoint or mailto)
- [ ] Keyboard-only navigation works; focus visible; one h1
- [ ] Lighthouse: Performance ≥ 95 (no external fonts/scripts), Accessibility ≥ 95

---

## 9. Code appendix

### 9.1 Gated form — HTML

```html
<section id="download">
  <span class="eyebrow">Download</span>
  <h2>Get ClipStack for your Mac.</h2>
  <p class="lead">Free. Tell me who you are and what you copy most — it shapes what gets built next — and the download starts right away.</p>

  <form id="lead" novalidate>
    <div class="two">
      <label>Name <input name="name" autocomplete="name" required minlength="2" maxlength="80"></label>
      <label>Email <input name="email" type="email" autocomplete="email" required></label>
    </div>
    <label>What do you copy most?
      <select name="uses">
        <option>Text &amp; code</option><option>Links</option><option>Images &amp; design</option>
        <option>Files</option><option selected>A bit of everything</option>
      </select>
    </label>
    <label class="check"><input type="checkbox" name="updates"> Email me when a new version ships</label>
    <input name="website" tabindex="-1" autocomplete="off" class="sr" aria-hidden="true">
    <button class="btn primary" type="submit">Download for Mac</button>
    <p class="note">No account is created. Your address is used only for the update note if you tick the box.</p>
  </form>

  <div id="downloaded" hidden>
    <h3>Your download has started.</h3>
    <p>Open <strong>ClipStack-<span class="v"></span>.pkg</strong>. If macOS says it can't be opened, use System Settings → Privacy &amp; Security → <strong>Open Anyway</strong> — once. <a href="#faq-open">Details</a>.</p>
    <p class="note">Prefer a disk image? <a href="ClipStack.dmg" download>Download the .dmg</a> · Didn't start? <a href="ClipStack.pkg" download>Download again</a></p>
  </div>
</section>
```

### 9.2 Gated form — JavaScript (framework-agnostic)

```js
const LEAD_ENDPOINT = "/api/clipstack-lead";   // "" = gate only, store nothing server-side
const PKG = "ClipStack.pkg";

const form = document.getElementById("lead");
const done = document.getElementById("downloaded");

function startDownload(file) {
  const a = Object.assign(document.createElement("a"), { href: file, download: "" });
  document.body.appendChild(a); a.click(); a.remove();
}
function showDone() { form.hidden = true; done.hidden = false; }

if (localStorage.getItem("clipstack_lead") === "1") showDone();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (form.website.value) return;                       // honeypot
  if (!form.reportValidity()) return;
  const btn = form.querySelector("button"); btn.disabled = true; btn.textContent = "Starting download…";

  const payload = {
    type: "download", name: form.name.value.trim(), email: form.email.value.trim().toLowerCase(),
    uses: form.uses.value, updates: form.updates.checked,
    version: document.getElementById("ver")?.textContent, ua: navigator.userAgent,
    referrer: document.referrer, ts: new Date().toISOString(),
  };
  if (LEAD_ENDPOINT) {
    try {
      await Promise.race([
        fetch(LEAD_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }),
        new Promise((_, rej) => setTimeout(rej, 4000)),
      ]);
    } catch (_) { /* never block the download on the lead call */ }
  }
  localStorage.setItem("clipstack_lead", "1");
  startDownload(PKG);
  showDone();
});
```

### 9.3 Vercel serverless endpoint — `api/clipstack-lead.ts` (Resend example)

```ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const b = req.body ?? {};
  const email = String(b.email ?? "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !b.name) return res.status(400).json({ ok: false });

  const subject = b.type === "request"
    ? `[ClipStack] ${b.kind ?? "Request"} — ${b.name}`
    : `[ClipStack] Download — ${b.name} (${b.uses ?? "?"})`;
  const text = Object.entries(b).map(([k, v]) => `${k}: ${v}`).join("\n");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: "ClipStack <clipstack@arjun-basnet.com.np>", to: [process.env.LEAD_TO!], subject, text }),
  });
  res.status(200).json({ ok: true });
}
```

Environment: `RESEND_API_KEY`, `LEAD_TO` (your inbox). Swap the `fetch` for a
Google Sheets append or a Notion `pages.create` if you would rather have a
table than emails.

### 9.4 Version badge from the feed

```js
fetch("/product/clipstack/appcast.json", { cache: "no-store" })
  .then(r => r.json())
  .then(f => { const r = f.releases?.[0]; if (r) document.querySelectorAll("#ver,.v").forEach(el => el.textContent = r.version); })
  .catch(() => {});
```

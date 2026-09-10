import type { ReactNode } from "react";

/**
 * Copy for /product/clipstack — Clipboard-Landing-page.md §4, verbatim.
 *
 * A .tsx content module because several strings carry inline <kbd> chips and
 * <code> spans that the brief specifies as markup. FAQ answers therefore exist
 * twice: `answer` (ReactNode, rendered) and `answerText` (plain, for the
 * FAQPage JSON-LD). Keep them saying the same thing.
 */

export const CLIPSTACK = {
  route: "/product/clipstack",
  name: "ClipStack",
  /* SEO (brief §7, reworked 2026-09-10): lead with the problem and the
     solution, carry the search terms — clipboard history for Mac, clipboard
     manager macOS, Win+V for Mac — and stay inside the SERP width. */
  title: "ClipStack — Free Clipboard History & Clipboard Manager for Mac",
  description:
    "macOS forgets the moment you copy again. ClipStack keeps a searchable clipboard history on your Mac — text, links, images, files, colours — pasted back with one shortcut. Free, private, no account.",
  ogDescription:
    "Win+V for Mac, done properly. Press ⌘⇧V, find anything you've copied, paste it. Everything stays on your Mac.",
  keywords: [
    "clipboard history Mac",
    "clipboard manager macOS",
    "free clipboard manager Mac",
    "Win+V for Mac",
    "paste history Mac",
    "copy paste history macOS",
    "clipboard app macOS Sonoma",
    "private clipboard manager",
    "ClipStack",
  ],
  /** Baked into every installed copy. Never move it. */
  feedPath: "/product/clipstack/appcast.json",
  pkg: "/product/clipstack/ClipStack.pkg",
  dmg: "/product/clipstack/ClipStack.dmg",
  minimumOS: "macOS 14 Sonoma",
} as const;

export const NAV: { href: string; label: string }[] = [
  { href: "#problem", label: "The problem" },
  { href: "#features", label: "Features" },
  { href: "#how", label: "How to use" },
  { href: "#uses", label: "Use cases" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export const HERO = {
  eyebrow: "Free · macOS 14 and later · Apple silicon and Intel",
  h1: ["Everything you copy,", "one shortcut away."],
  lead: (
    <>
      macOS remembers exactly one thing you copied. ClipStack remembers all of
      them — text, links, images, files, colours — searchable, private, and
      pasted back with <kbd>⌘⇧V</kbd>.
    </>
  ),
  primary: "Download for Mac",
  secondary: "How it works",
};

export const PROBLEM = {
  eyebrow: "The problem",
  h2: "On a Mac, the clipboard forgets the moment you copy again.",
  lead: (
    <>
      Windows has had <kbd>Win</kbd>+<kbd>V</kbd> since 2018. macOS still holds
      a single item — copy something else and the previous one is gone for
      good.
    </>
  ),
  bullets: [
    "You copy a link, then copy a phrase to search for it, and the link is gone.",
    "You cut a paragraph to move it, get distracted, copy something else, and the paragraph is lost.",
    "You need three things from one page in another form — so you tab back and forth six times.",
    "The colour you copied from Figma an hour ago, the file you copied from Finder, the code snippet from a chat: all overwritten, none retrievable.",
    <>
      Nothing in macOS shows you <em>what</em> is on the clipboard before you
      paste it.
    </>,
  ] as ReactNode[],
  calloutTitle: "What it costs.",
  callout:
    "Small losses, dozens of times a day: re-finding, re-copying, re-typing. Clipboard managers exist, but most are paid, subscription-based, sync your clipboard to a cloud you did not ask for, or are heavy Electron apps. ClipStack is a native, one-purpose Mac utility that keeps everything on your Mac.",
};

export const SOLUTION = {
  eyebrow: "The solution",
  h2: "A clipboard that keeps a history — and stays on your Mac.",
  lead: "ClipStack watches the clipboard from the menu bar, records every copy with its full formatting, and gives you a Spotlight-style panel to find any of it and paste it straight back into the app you were in.",
  cards: [
    {
      icon: "⌘",
      title: "One shortcut",
      body: (
        <>
          Press <kbd>⌘⇧V</kbd> anywhere. Type to search, <kbd>⏎</kbd> to paste
          into the app you came from. Change the shortcut in Settings.
        </>
      ),
    },
    {
      icon: "🔒",
      title: "Private by design",
      body: "No account, no sync, no analytics. History lives in one file in your Library folder; optional encryption with a key in your keychain.",
    },
    {
      icon: "↻",
      title: "Updates itself",
      body: "Checks once a day and installs new versions with one click. Every download is signature-checked before it replaces anything.",
    },
  ] as { icon: string; title: string; body: ReactNode }[],
};

export const FEATURES = {
  eyebrow: "Features",
  h2: "Built for the way you actually copy things.",
  cards: [
    { title: "Every type, full fidelity", body: "Text, rich text, links, images, files and colours. A copied table pastes back as a table; a styled paragraph keeps its styling." },
    { title: "Instant search", body: "Full-text and fuzzy search over everything, ranked by relevance and recency. Results appear as you type." },
    { title: "Detail pane", body: "See the whole text, the full image, every file in a multi-file copy, or the colour swatch before you paste." },
    { title: "Pin what matters", body: "Pinned items stay at the top, never expire, and never count against the history limit." },
    { title: "Paste as plain text", body: <><kbd>⌘⇧⌥V</kbd> strips formatting. Give it its own global shortcut if you use it a lot.</> },
    { title: "Password-manager aware", body: "Copies from 1Password, Bitwarden, KeePassXC, Apple Passwords and others are never recorded. Secrets it detects are badged or discarded." },
    { title: "Exclusions and pauses", body: "Never record from chosen apps. Pause recording for 5 minutes, an hour, or until you say so." },
    { title: "Always on", body: "Starts at login and keeps recording until you quit it. Menu-bar only — no Dock icon, no window in your way." },
    { title: "Native and light", body: "Swift and SwiftUI, Liquid Glass on macOS 26, under 4 MB, no frameworks. Universal for Apple silicon and Intel." },
  ] as { title: string; body: ReactNode }[],
};

export const HOW = {
  eyebrow: "How to use",
  h2: "Up and running in two minutes.",
  steps: [
    {
      title: "Install",
      body: (
        <>
          Download the <a href="#download">installer</a> and open it. It puts
          ClipStack in Applications and starts it. On the first open macOS may
          say it cannot verify the developer — see the{" "}
          <a href="#faq-open">first-launch note</a> below.
        </>
      ),
    },
    {
      title: "Allow it to paste for you",
      body: (
        <>
          Press <kbd>⌘⇧V</kbd>, pick an item and press <kbd>⏎</kbd>. macOS asks
          for Accessibility access once: System Settings → Privacy &amp;
          Security → Accessibility → turn on ClipStack. Without it ClipStack
          still records and searches; you press <kbd>⌘V</kbd> yourself.
        </>
      ),
    },
    {
      title: "Copy as usual",
      body: (
        <>
          Nothing changes about <kbd>⌘C</kbd>. Everything you copy appears in
          the history, newest first, with the app it came from.
        </>
      ),
    },
    {
      title: "Find and paste",
      body: (
        <>
          <kbd>⌘⇧V</kbd> opens the panel in the centre of your screen. Type a
          few letters, arrow to the item, <kbd>⏎</kbd>. It pastes into the app
          you were just using.
        </>
      ),
    },
    {
      title: "Make it yours",
      body: (
        <>
          Settings (<kbd>⌘,</kbd> from the panel, or the menu-bar icon): change
          the shortcut, history size, retention, appearance, the detail pane,
          exclusions and encryption.
        </>
      ),
    },
  ] as { title: string; body: ReactNode }[],
  keysHeading: "Keyboard reference",
  keys: [
    ["⌘⇧V", "Open the clipboard panel (configurable in Settings → General)"],
    ["type", "Search — fuzzy, case-insensitive, ranked"],
    ["↑ ↓", "Move the selection (wraps at the ends)"],
    ["⏎", "Paste the selected item into the app you were in"],
    ["⌘C", "Copy the item to the clipboard without pasting"],
    ["⌘⇧⌥V", "Paste as plain text"],
    ["⌘P", "Pin or unpin"],
    ["⌘⌫", "Delete the item"],
    ["Space", "Quick Look an image"],
    ["esc", "Close"],
  ] as [string, string][],
};

export const USE_CASES = {
  eyebrow: "Use cases",
  h2: "Where it earns its keep.",
  cards: [
    { title: "Filling forms from a document", body: "Copy the name, address, ABN and reference number in one pass, then paste each into its field from the panel. No tabbing back." },
    { title: "Developers", body: "Commands, tokens, snippets, error messages. Search by a fragment you remember; paste as plain text into the terminal." },
    { title: "Writers and editors", body: "Cut a paragraph, keep working, paste it an hour later — with its formatting. Keep boilerplate pinned." },
    { title: "Designers", body: "Colours copied from Figma or Sketch show as swatches with their hex values; images and screenshots are previewed at full size." },
    { title: "Support and sales", body: "Pin the replies, links and account IDs you send twenty times a day and paste them from anywhere." },
    { title: "Research", body: "Collect quotes and links from many tabs, then paste them into your notes in one sitting — each with the app and time it came from." },
  ],
};

export const DOWNLOAD = {
  eyebrow: "Download",
  h2: "Get ClipStack for your Mac.",
  lead: "Free. Tell me who you are and what you copy most — it shapes what gets built next — and the download starts right away.",
  uses: ["Text & code", "Links", "Images & design", "Files", "A bit of everything"],
  usesDefault: "A bit of everything",
  updatesLabel: "Email me when a new version ships",
  button: "Download for Mac",
  privacy:
    "No account is created. You'll get one email with your download links and the first-launch note; after that your address is used only for a release note if you tick the box.",
  doneTitle: "Your download has started.",
};

export const FAQS: {
  id: string;
  question: string;
  answerText: string;
  answer: ReactNode;
}[] = [
  {
    id: "faq-open",
    question: 'macOS says ClipStack "can\'t be opened", "is damaged" or "could not be verified". What now?',
    answerText:
      "ClipStack is not yet notarized with an Apple Developer ID, so Gatekeeper refuses it once on first open. One-time, per Mac: (1) Open the .pkg installer; when macOS refuses it, click Done. (2) Open System Settings → Privacy & Security, scroll down, click Open Anyway beside the ClipStack message, confirm with your password. (3) The installer runs and starts ClipStack. It opens normally from then on, and updates arrive inside the app. If you used the .dmg: drag ClipStack to Applications, then in Terminal run xattr -dr com.apple.quarantine /Applications/ClipStack.app and open it.",
    answer: (
      <>
        <p>
          ClipStack is not yet notarized with an Apple Developer ID, so
          Gatekeeper refuses it once on first open. It is a one-time step per
          Mac:
        </p>
        <ol>
          <li>Open the <strong>.pkg</strong> installer. When macOS refuses it, click <em>Done</em>.</li>
          <li>Open <strong>System Settings → Privacy &amp; Security</strong>, scroll down, and click <strong>Open Anyway</strong> next to the ClipStack message. Confirm with your password.</li>
          <li>The installer runs and starts ClipStack. It opens normally from then on, and updates arrive inside the app.</li>
        </ol>
        <p>
          If you used the .dmg instead: drag ClipStack to Applications, then in
          Terminal run <code>xattr -dr com.apple.quarantine /Applications/ClipStack.app</code> and open it.
        </p>
      </>
    ),
  },
  {
    id: "faq-privacy",
    question: "Is my clipboard sent anywhere?",
    answerText: "No. History is stored in ~/Library/Application Support/ClipStack/ and never leaves your Mac. The only network request ClipStack makes is the daily update check, which fetches one small file and carries nothing about you. You can turn it off in Settings → General.",
    answer: <p>No. History is stored in <code>~/Library/Application Support/ClipStack/</code> and never leaves your Mac. The only network request ClipStack makes is the daily update check, which fetches one small file and carries nothing about you. You can turn it off in Settings → General.</p>,
  },
  {
    id: "faq-accessibility",
    question: "Why does it need Accessibility access?",
    answerText: "For one thing only: pressing ⌘V in the app you came from after you choose an item. Reading the clipboard, the global shortcut and search all work without it.",
    answer: <p>For one thing only: pressing <kbd>⌘V</kbd> in the app you came from after you choose an item. Reading the clipboard, the global shortcut and search all work without it.</p>,
  },
  {
    id: "faq-passwords",
    question: "Does it record passwords?",
    answerText: "Copies from known password managers and anything marked \"concealed\" by the source app are never recorded. Text that looks like a key, token or card number is badged, and can be discarded automatically if you prefer.",
    answer: <p>Copies from known password managers and anything marked &ldquo;concealed&rdquo; by the source app are never recorded. Text that looks like a key, token or card number is badged, and can be discarded automatically if you prefer.</p>,
  },
  {
    id: "faq-updates",
    question: "How do updates work?",
    answerText: "ClipStack checks this site once a day. When a new version exists it shows the release notes and installs with one click, verifying the download against a signature built into the app first. Check for Updates… in the menu-bar icon does it any time.",
    answer: <p>ClipStack checks this site once a day. When a new version exists it shows the release notes and installs with one click, verifying the download against a signature built into the app first. You can also use <em>Check for Updates…</em> from the menu-bar icon at any time.</p>,
  },
  {
    id: "faq-shortcut",
    question: "Can I change the shortcut?",
    answerText: "Yes. Menu-bar icon → Change Shortcut…, or Settings → General. Click the shortcut box and press the new combination. It must include ⌘ or ⌃.",
    answer: <p>Yes. Menu-bar icon → <em>Change Shortcut…</em>, or Settings → General. Click the shortcut box and press the new combination. It must include ⌘ or ⌃.</p>,
  },
  {
    id: "faq-remove",
    question: "How do I stop or remove it?",
    answerText: "Quit from the menu-bar icon. To stop it starting at login, turn it off in Settings → General or in System Settings → General → Login Items. To uninstall, delete ClipStack from Applications; Settings → Advanced → Reset Database removes the history first if you want a clean slate.",
    answer: <p>Quit from the menu-bar icon. To stop it starting at login, turn it off in Settings → General or in System Settings → General → Login Items. To uninstall, delete ClipStack from Applications; Settings → Advanced → Reset Database removes the history first if you want a clean slate.</p>,
  },
  {
    id: "faq-macs",
    question: "Which Macs does it run on?",
    answerText: "macOS 14 Sonoma or later, on Apple silicon and Intel. Liquid Glass appears on macOS 26; earlier versions get the standard vibrant material.",
    answer: <p>macOS 14 Sonoma or later, on Apple silicon and Intel. Liquid Glass appears on macOS 26; earlier versions get the standard vibrant material.</p>,
  },
];

export const REQUEST = {
  eyebrow: "Have a problem like this?",
  h2: "Tell me what slows you down. I build tools for it.",
  lead: "ClipStack came out of one small daily annoyance. If something in your work has the same shape — a repetitive step, a missing utility, an integration that should exist — describe it here and I'll come back with a proposal.",
  kinds: [
    "A problem with ClipStack",
    "A feature I wish ClipStack had",
    "A similar tool or automation for my work",
    "Something else",
  ],
  placeholder: "What happens today, how often, and what you wish happened instead.",
  button: "Send",
};

export const FOOTER = "ClipStack · © 2026 Arjun Basnet · Made in Kathmandu";

/* ── Additions for the reference layout. Every claim below is one the brief
   already makes; nothing is asserted about other products beyond §4·2's
   callout. ── */

/** lucide icon names, resolved through an explicit map in the page. */
export const SOLUTION_ICONS = ["Command", "Lock", "RefreshCw"] as const;
export const FEATURE_ICONS = [
  "Layers", "Search", "PanelRight", "Pin", "RemoveFormatting",
  "ShieldCheck", "PauseCircle", "Power", "Feather",
] as const;
export const USE_CASE_ICONS = [
  "ClipboardList", "Code", "PenLine", "Palette", "Headphones", "BookOpen",
] as const;

/** The stats row. Figures from the brief. */
export const STATS: { value: string; label: string }[] = [
  { value: "1", label: "shortcut to everything you copied" },
  { value: "0", label: "accounts, sync or analytics" },
  { value: "< 4 MB", label: "native Swift, no frameworks" },
  { value: "14+", label: "macOS Sonoma and later" },
];

/** ClipStack vs others — the callout in §4·2, itemised. */
export const COMPARISON = {
  eyebrow: "Precision vs basic",
  h2: "A native utility, not another subscription.",
  lead: "Clipboard managers exist. Most ask for money, an account, or your clipboard in their cloud. ClipStack asks for none of them.",
  us: [
    "Free, with no account to create",
    "History never leaves your Mac",
    "Native Swift and SwiftUI, under 4 MB",
    "Every copy type, at full fidelity",
    "Updates itself, signature-checked",
    "Password-manager aware by default",
  ],
  others: [
    "Paid, often as a subscription",
    "Sync your clipboard to a cloud you did not ask for",
    "Heavy Electron apps",
    "An account before you can paste anything",
  ],
};

/** One plan, because there is one. */
export const PLAN = {
  eyebrow: "Pricing",
  h2: "Simple price for all.",
  lead: "There is one version of ClipStack and it costs nothing. No trial, no tiers, no upgrade nag.",
  name: "Free",
  price: "$0",
  period: "forever",
  includes: [
    "Every feature, for every Mac you own",
    "No account, no subscription, no tracking",
    "Updates included, delivered inside the app",
    "macOS 14 Sonoma and later · Apple silicon and Intel",
  ],
  cta: "Download for Mac",
  note: "About 2 MB. Opens in two minutes.",
};

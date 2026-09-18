/**
 * AI-search readiness sweep of Nepali business homepages.
 *
 * Feeds the post `nepal-ai-search-readiness-2026`. Two phases:
 *
 *   A. Plain fetches (no dependencies): homepage status, HTTPS, robots.txt
 *      rules for the AI crawlers, Cloudflare's managed AI block, JSON-LD
 *      presence and types, meta description, viewport, sitemap.xml, llms.txt,
 *      CMS signature.
 *   B. Playwright (optional, PW_ROOT env → a folder with playwright installed
 *      and chromium downloaded): loads each homepage on Lighthouse's slow-4G
 *      profile (1.6 Mbps down, 750 kbps up, 150 ms RTT, 4× CPU) and records
 *      LCP, total transferred bytes, image bytes, request count, and
 *      third-party script count.
 *
 * Usage:
 *   node scripts/research/ai-search-readiness.mjs            # phase A only
 *   PW_ROOT=/path/with/playwright node scripts/research/ai-search-readiness.mjs
 *
 * Output: docs/research/ai-search-readiness-2026/{results.json,results.csv,summary.md}
 * Per-site rows are kept for reproducibility; the post reports sector medians only.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const ROOT = process.cwd();
const OUT = process.env.OUT_DIR || path.join(ROOT, "docs/research/ai-search-readiness-2026");
fs.mkdirSync(OUT, { recursive: true });

const PER_SECTOR = Number(process.env.PER_SECTOR || 10);
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36";
const AI_BOTS = ["GPTBot", "ClaudeBot", "Google-Extended", "PerplexityBot", "CCBot", "Bytespider", "anthropic-ai", "OAI-SearchBot"];

const { sectors } = JSON.parse(fs.readFileSync(process.env.SITES || path.join(ROOT, "scripts/research/sites.json"), "utf8"));

async function get(url, { timeout = 15000, method = "GET" } = {}) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeout);
  try {
    const res = await fetch(url, {
      method,
      redirect: "follow",
      signal: ctl.signal,
      headers: { "user-agent": UA, accept: "text/html,*/*" },
    });
    const text = method === "GET" ? await res.text() : "";
    return { ok: res.ok, status: res.status, url: res.url, text, headers: res.headers };
  } catch (e) {
    return { ok: false, status: 0, url, text: "", error: String(e?.cause?.code || e?.name || e) };
  } finally {
    clearTimeout(t);
  }
}

/** Minimal robots.txt evaluation: is `bot` disallowed from "/"? Falls back to the `*` group. */
function robotsVerdict(txt) {
  const groups = [];
  let cur = null;
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const val = m[2].trim();
    if (key === "user-agent") {
      if (!cur || cur.rules.length) { cur = { agents: [], rules: [] }; groups.push(cur); }
      cur.agents.push(val.toLowerCase());
    } else if ((key === "disallow" || key === "allow") && cur) {
      cur.rules.push({ type: key, path: val });
    }
  }
  const blocksRoot = (g) => {
    // First matching rule wins for "/" in most implementations; if any Disallow: / exists and no Allow: / precedes it, treat as blocked.
    for (const r of g.rules) {
      if (r.path === "/" && r.type === "allow") return false;
      if ((r.path === "/" || r.path === "/*") && r.type === "disallow") return true;
    }
    return false;
  };
  const star = groups.find((g) => g.agents.includes("*"));
  const out = {};
  for (const bot of AI_BOTS) {
    const g = groups.find((x) => x.agents.includes(bot.toLowerCase()));
    out[bot] = g ? (blocksRoot(g) ? "blocked" : "allowed") : star ? (blocksRoot(star) ? "blocked-by-wildcard" : "allowed") : "allowed";
  }
  return {
    perBot: out,
    anyAiBlocked: Object.values(out).some((v) => v.startsWith("blocked")),
    explicitAiBlock: AI_BOTS.some((b) => out[b] === "blocked"),
    cloudflareManaged: /BEGIN Cloudflare Managed content|Content-Signal:/i.test(txt),
    contentSignalAiTrainNo: /Content-Signal:[^\n]*ai-train=no/i.test(txt),
    sitemapDeclared: /^\s*sitemap\s*:/im.test(txt),
  };
}

function inspectHtml(html) {
  const ld = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const types = new Set();
  for (const m of ld) {
    try {
      const j = JSON.parse(m[1].trim());
      const walk = (n) => {
        if (Array.isArray(n)) return n.forEach(walk);
        if (n && typeof n === "object") {
          if (n["@type"]) [].concat(n["@type"]).forEach((t) => types.add(String(t)));
          if (n["@graph"]) walk(n["@graph"]);
        }
      };
      walk(j);
    } catch { types.add("(invalid JSON-LD)"); }
  }
  const meta = (name) => {
    const m = html.match(new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["']`, "i")) ||
      html.match(new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["']`, "i"));
    return m ? m[1].trim() : "";
  };
  const generator = meta("generator");
  let cms = "";
  if (/wp-content|wp-includes/i.test(html) || /wordpress/i.test(generator)) cms = "WordPress";
  else if (/wixstatic|wix\.com/i.test(html)) cms = "Wix";
  else if (/cdn\.shopify\.com/i.test(html)) cms = "Shopify";
  else if (/squarespace/i.test(html)) cms = "Squarespace";
  else if (/joomla/i.test(generator) || /\/media\/jui\//i.test(html)) cms = "Joomla";
  else if (/drupal/i.test(generator) || /sites\/default\/files/i.test(html)) cms = "Drupal";
  else if (/__NEXT_DATA__|\/_next\//i.test(html)) cms = "Next.js";
  else if (/__nuxt|\/_nuxt\//i.test(html)) cms = "Nuxt";
  else if (/laravel|livewire|csrf-token/i.test(html)) cms = "Laravel";
  else if (/webflow/i.test(html)) cms = "Webflow";
  else if (/ng-version=|ng-app/i.test(html)) cms = "Angular";
  else if (/react/i.test(html) && /root/i.test(html)) cms = "React (SPA)";
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ""])[1].replace(/\s+/g, " ").trim();
  const h1s = (html.match(/<h1[\s>]/gi) || []).length;
  const description = meta("description");
  return {
    title,
    titleLength: title.length,
    h1Count: h1s,
    hasDescription: description.length > 0,
    descriptionLength: description.length,
    hasViewport: /<meta[^>]+name=["']viewport["']/i.test(html),
    hasOgTitle: Boolean(meta("og:title")),
    hasCanonical: /<link[^>]+rel=["']canonical["']/i.test(html),
    jsonLdBlocks: ld.length,
    jsonLdTypes: [...types].sort(),
    hasOrgOrLocalBusiness: [...types].some((t) => /Organization|LocalBusiness|Corporation|Hospital|School|Hotel|Airline|Bank|NGO|MedicalOrganization|EducationalOrganization|Store|NewsMediaOrganization/i.test(t)),
    hasFaqSchema: types.has("FAQPage"),
    cms: cms || "Unknown / custom",
    htmlBytes: Buffer.byteLength(html),
    hasLangAttr: /<html[^>]+lang=/i.test(html),
  };
}

async function phaseA(domain, sector) {
  const home = await get(`https://${domain}/`);
  const row = { domain, sector, reachable: home.ok, status: home.status, finalUrl: home.url, error: home.error || "" };
  if (!home.ok) return row;
  row.https = home.url.startsWith("https://");
  const origin = new URL(home.url).origin;
  Object.assign(row, inspectHtml(home.text));
  const robots = await get(`${origin}/robots.txt`);
  row.hasRobots = robots.ok && robots.text.length > 0 && !/<html/i.test(robots.text);
  row.robots = row.hasRobots ? robotsVerdict(robots.text) : { perBot: {}, anyAiBlocked: false, explicitAiBlock: false, cloudflareManaged: false, contentSignalAiTrainNo: false, sitemapDeclared: false };
  const sm = await get(`${origin}/sitemap.xml`, { method: "GET", timeout: 12000 });
  row.hasSitemap = sm.ok && /<(urlset|sitemapindex)/i.test(sm.text);
  const llms = await get(`${origin}/llms.txt`, { timeout: 10000 });
  row.hasLlmsTxt = llms.ok && !/<html/i.test(llms.text) && llms.text.trim().length > 0;
  return row;
}

async function phaseB(rows, onEach = () => {}) {
  const pwRoot = process.env.PW_ROOT;
  if (!pwRoot) { console.log("PW_ROOT not set — skipping phase B (speed)."); return; }
  const require = createRequire(path.join(pwRoot, "package.json"));
  const { chromium } = require("playwright");
  const browser = await chromium.launch();
  const limit = Number(process.env.PW_CONCURRENCY || 3);
  let i = 0;
  async function worker() {
    while (i < rows.length) {
      const row = rows[i++];
      if (!row.reachable) continue;
      const context = await browser.newContext({ userAgent: UA, viewport: { width: 412, height: 915 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
      const page = await context.newPage();
      const cdp = await context.newCDPSession(page);
      await cdp.send("Network.enable");
      await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      const stats = { bytes: 0, imageBytes: 0, requests: 0, thirdPartyScripts: 0 };
      const host = new URL(row.finalUrl).hostname.replace(/^www\./, "");
      page.on("response", async (res) => {
        stats.requests++;
        const type = res.request().resourceType();
        const rHost = new URL(res.url()).hostname.replace(/^www\./, "");
        if (type === "script" && !rHost.endsWith(host)) stats.thirdPartyScripts++;
        try {
          const sizes = await res.request().sizes();
          stats.bytes += sizes.responseBodySize + sizes.responseHeadersSize;
          if (type === "image") stats.imageBytes += sizes.responseBodySize;
        } catch {}
      });
      await page.addInitScript(() => {
        window.__lcp = 0;
        new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
        window.__cls = 0;
        new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true });
      });
      const t0 = Date.now();
      const readMetrics = () => page.evaluate(() => ({
        lcp: window.__lcp,
        cls: window.__cls,
        fcp: performance.getEntriesByName("first-contentful-paint")[0]?.startTime || 0,
        domLoaded: performance.timing.domContentLoadedEventEnd > 0 ? performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart : 0,
        loadEvent: performance.timing.loadEventEnd > 0 ? performance.timing.loadEventEnd - performance.timing.navigationStart : 0,
      }));
      try {
        // DOM-ready rather than `load`: on slow 4G many heavy homepages never
        // fire `load` inside a minute. LCP is observed regardless, and a page
        // whose load event has not fired after the wait is recorded as such.
        await page.goto(row.finalUrl, { waitUntil: "domcontentloaded", timeout: 75000 });
        await page.waitForTimeout(8000);
        const m = await readMetrics();
        row.speed = { ...m, loadTimedOut: m.loadEvent === 0, loadMs: Date.now() - t0, ...stats, measured: true };
      } catch (e) {
        // Navigation itself did not reach DOM-ready in time. Try to salvage a
        // paint metric from whatever rendered; otherwise mark unmeasured.
        let m = null;
        try { m = await readMetrics(); } catch {}
        row.speed = m && (m.lcp || m.fcp)
          ? { ...m, loadTimedOut: true, loadMs: Date.now() - t0, ...stats, measured: true }
          : { measured: false, error: String(e.message || e).split("\n")[0].slice(0, 120), loadMs: Date.now() - t0, ...stats };
      }
      console.log(`  [B] ${row.domain}: LCP ${row.speed.lcp ? (row.speed.lcp / 1000).toFixed(1) + "s" : "n/a"}, ${(stats.bytes / 1024 / 1024).toFixed(2)} MB, ${stats.requests} req`);
      await context.close();
      onEach();
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
  await browser.close();
}

const median = (xs) => { const a = xs.filter((x) => typeof x === "number" && !Number.isNaN(x)).sort((p, q) => p - q); if (!a.length) return null; const m = Math.floor(a.length / 2); return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2; };
const pct = (rows, f) => rows.length ? Math.round((rows.filter(f).length / rows.length) * 100) : null;

function summarise(rows) {
  const live = rows.filter((r) => r.reachable);
  const bySector = {};
  for (const r of live) (bySector[r.sector] ||= []).push(r);
  const block = (rs) => ({
    n: rs.length,
    anyAiBlocked: pct(rs, (r) => r.robots.anyAiBlocked),
    explicitAiBlock: pct(rs, (r) => r.robots.explicitAiBlock),
    cloudflareManaged: pct(rs, (r) => r.robots.cloudflareManaged),
    noRobots: pct(rs, (r) => !r.hasRobots),
    jsonLd: pct(rs, (r) => r.jsonLdBlocks > 0),
    orgSchema: pct(rs, (r) => r.hasOrgOrLocalBusiness),
    faqSchema: pct(rs, (r) => r.hasFaqSchema),
    description: pct(rs, (r) => r.hasDescription),
    canonical: pct(rs, (r) => r.hasCanonical),
    sitemap: pct(rs, (r) => r.hasSitemap),
    llmsTxt: pct(rs, (r) => r.hasLlmsTxt),
    oneH1: pct(rs, (r) => r.h1Count === 1),
    https: pct(rs, (r) => r.https),
    wordpress: pct(rs, (r) => r.cms === "WordPress"),
    medianLcpS: median(rs.map((r) => r.speed?.lcp ? r.speed.lcp / 1000 : NaN)) && Number(median(rs.map((r) => r.speed?.lcp ? r.speed.lcp / 1000 : NaN)).toFixed(1)),
    lcpUnder2_5: pct(rs.filter((r) => r.speed?.lcp), (r) => r.speed.lcp <= 2500),
    lcpOver4: pct(rs.filter((r) => r.speed?.lcp), (r) => r.speed.lcp > 4000),
    medianMb: median(rs.map((r) => r.speed?.measured ? r.speed.bytes / 1048576 : NaN)) && Number(median(rs.map((r) => r.speed?.measured ? r.speed.bytes / 1048576 : NaN)).toFixed(2)),
    medianImageMb: median(rs.map((r) => r.speed?.measured ? r.speed.imageBytes / 1048576 : NaN)) && Number(median(rs.map((r) => r.speed?.measured ? r.speed.imageBytes / 1048576 : NaN)).toFixed(2)),
    medianRequests: median(rs.map((r) => r.speed?.measured ? r.speed.requests : NaN)),
    medianThirdPartyScripts: median(rs.map((r) => r.speed?.measured ? r.speed.thirdPartyScripts : NaN)),
    medianCls: median(rs.map((r) => r.speed?.measured ? r.speed.cls : NaN)) && Number(median(rs.map((r) => r.speed?.measured ? r.speed.cls : NaN)).toFixed(3)),
  });
  const cmsCounts = {};
  for (const r of live) cmsCounts[r.cms] = (cmsCounts[r.cms] || 0) + 1;
  const botCounts = {};
  for (const b of AI_BOTS) botCounts[b] = pct(live, (r) => (r.robots.perBot[b] || "allowed").startsWith("blocked"));
  const typeCounts = {};
  for (const r of live) for (const t of r.jsonLdTypes) typeCounts[t] = (typeCounts[t] || 0) + 1;
  return {
    generatedAt: new Date().toISOString(),
    candidates: rows.length,
    live: live.length,
    all: block(live),
    bySector: Object.fromEntries(Object.entries(bySector).map(([k, v]) => [k, block(v)])),
    cms: cmsCounts,
    aiBotBlockedPct: botCounts,
    jsonLdTypes: Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).slice(0, 20),
  };
}

function toCsv(rows) {
  const cols = ["domain", "sector", "reachable", "status", "https", "cms", "hasRobots", "anyAiBlocked", "explicitAiBlock", "cloudflareManaged", "jsonLdBlocks", "jsonLdTypes", "hasOrgOrLocalBusiness", "hasFaqSchema", "hasDescription", "hasCanonical", "hasSitemap", "hasLlmsTxt", "h1Count", "titleLength", "lcpMs", "cls", "bytes", "imageBytes", "requests", "thirdPartyScripts"];
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [cols.join(",")];
  for (const r of rows) {
    lines.push(cols.map((c) => {
      if (c === "anyAiBlocked" || c === "explicitAiBlock" || c === "cloudflareManaged") return esc(r.robots?.[c] ?? "");
      if (c === "jsonLdTypes") return esc((r.jsonLdTypes || []).join("|"));
      if (c === "lcpMs") return esc(r.speed?.lcp ? Math.round(r.speed.lcp) : "");
      if (["cls", "bytes", "imageBytes", "requests", "thirdPartyScripts"].includes(c)) return esc(r.speed?.measured ? r.speed[c] : "");
      return esc(r[c]);
    }).join(","));
  }
  return lines.join("\n");
}

// PHASE=A runs the fetch checks and saves; PHASE=B resumes from results.json
// and adds speed rows only where missing, saving after every site so a killed
// run loses nothing. Default AB.
const PHASE = (process.env.PHASE || "AB").toUpperCase();
const RESULTS = path.join(OUT, "results.json");

function save(rows) {
  fs.writeFileSync(RESULTS, JSON.stringify(rows, null, 2));
  fs.writeFileSync(path.join(OUT, "results.csv"), toCsv(rows));
  fs.writeFileSync(path.join(OUT, "summary.json"), JSON.stringify(summarise(rows), null, 2));
}

let rows = [];
if (PHASE.includes("A")) {
  // Sectors run concurrently; sites within a sector run in order so the
  // "first ten that respond" rule stays deterministic.
  const perSector = await Promise.all(
    Object.entries(sectors).map(async ([sector, domains]) => {
      const kept = [];
      for (const d of domains) {
        if (kept.length >= PER_SECTOR) break;
        const r = await phaseA(d, sector);
        console.log(`  [A] ${sector} · ${d}: ${r.reachable ? "ok" : `skip (${r.status || r.error})`}${r.reachable ? ` · ${r.cms} · AI blocked: ${r.robots.anyAiBlocked} · JSON-LD: ${r.jsonLdBlocks}` : ""}`);
        if (r.reachable) kept.push(r);
      }
      return kept;
    }),
  );
  rows = perSector.flat();
  save(rows);
  console.log(`\nPhase A done: ${rows.length} live sites. Saved.`);
} else {
  rows = JSON.parse(fs.readFileSync(RESULTS, "utf8"));
}

if (PHASE.includes("B")) {
  const todo = rows.filter((r) => r.reachable && !r.speed?.measured);
  console.log(`\nPhase B: ${todo.length} sites to measure.`);
  await phaseB(todo, () => save(rows));
  save(rows);
}

save(rows); // PHASE=S re-summarises an edited results.json without refetching
const summary = summarise(rows);
console.log("\nSummary:", JSON.stringify(summary.all, null, 2));
console.log(`\nWrote ${OUT}`);

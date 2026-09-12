/**
 * Visual QA sweep — screenshots every URL at phone/tablet/desktop widths and
 * reports horizontal scroll, elements past the viewport edge, clipped text and
 * overlapping text boxes. Playwright is NOT a project dependency; run it from a
 * scratch folder that has it installed:
 *
 *   mkdir -p /tmp/qa && cd /tmp/qa && npm i playwright && npx playwright install chromium
 *   BASE=http://localhost:3001 OUT=/tmp/qa/shots node "<repo>/scripts/qa/visual-sweep.js" $(curl -s $BASE/sitemap.xml | grep -o '<loc>[^<]*' | sed 's#<loc>https://arjun-basnet.com.np##') /assistant /brand
 *
 * Read OUT/report.json (or the console table). Blooms, the WhatsApp ripple and
 * decorative hero blobs always overflow by design — ignore those rows.
 * Known false positives: text inside collapsed accordions, and anything
 * measured mid-AnimateIn; confirm with a targeted screenshot before fixing.
 */
const { chromium } = require("playwright");
const fs = require("fs");
const BASE = process.env.BASE || "http://localhost:3001";
const OUT = process.env.OUT || "shots"; fs.mkdirSync(OUT, { recursive: true });
const VIEWPORTS = [[390, 844], [768, 1024], [1280, 800], [1536, 900]];

const AUDIT = `(() => {
  const vw = document.documentElement.clientWidth;
  const out = { scrollW: document.documentElement.scrollWidth, vw, overflow: [], clipped: [], overlaps: [] };
  const vis = (el) => { const cs = getComputedStyle(el); if (cs.visibility === "hidden" || cs.display === "none" || parseFloat(cs.opacity) <= 0.05) return false; for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) { const acs = getComputedStyle(a); if (a.tagName === "DETAILS" && !a.open && !a.firstElementChild.contains(el)) return false; if ((acs.overflow === "hidden" || acs.overflowY === "hidden" || acs.overflow === "clip") && a.clientHeight < 8) return false; if (acs.display === "grid" && acs.gridTemplateRows === "0px") return false; } return true; };
  const path = (el) => { const parts=[]; let e=el; for (let i=0;i<4 && e && e.nodeType===1;i++){ parts.unshift(e.tagName.toLowerCase()+(e.id?"#"+e.id:"")+(e.className&&typeof e.className==="string"?"."+e.className.trim().split(/\\s+/).slice(0,3).join("."):"")); e=e.parentElement;} return parts.join(">"); };
  const all = [...document.querySelectorAll("body *")];
  for (const el of all) {
    if (!vis(el)) continue;
    const r = el.getBoundingClientRect(); if (r.width===0||r.height===0) continue;
    if (r.right > vw + 1 && !el.closest("[data-qa-scroll],pre,table,.overflow-x-auto")) out.overflow.push({ p: path(el), right: Math.round(r.right), w: Math.round(r.width) });
  }
  // clipped text: element with text, overflow hidden/clip, content wider or taller than box (excluding intended line-clamp/truncate)
  for (const el of all) {
    if (!vis(el)) continue; const cs = getComputedStyle(el);
    const txt = [...el.childNodes].some(n=>n.nodeType===3 && n.textContent.trim().length>2);
    if (!txt) continue;
    const ox = cs.overflowX, oy = cs.overflowY;
    if ((ox==="hidden"||ox==="clip") && el.scrollWidth > el.clientWidth + 2 && cs.textOverflow!=="ellipsis" && cs.whiteSpace!=="nowrap") out.clipped.push({ p: path(el), t: el.textContent.trim().slice(0,50), sw: el.scrollWidth, cw: el.clientWidth });
    if ((oy==="hidden"||oy==="clip") && el.scrollHeight > el.clientHeight + 4 && !cs.webkitLineClamp && cs.webkitLineClamp!=="none" ) out.clipped.push({ p: path(el), t: el.textContent.trim().slice(0,50), sh: el.scrollHeight, ch: el.clientHeight, axis:"y" });
  }
  // overlapping text: leaf-ish text elements whose boxes intersect substantially and are not nested
  const leaves = all.filter(el => vis(el) && [...el.childNodes].some(n=>n.nodeType===3 && n.textContent.trim().length>1) && !["SCRIPT","STYLE","NOSCRIPT","OPTION"].includes(el.tagName)).map(el => ({ el, r: el.getBoundingClientRect() })).filter(x => x.r.width>4 && x.r.height>4 && x.r.bottom > -2000 && x.r.top < 20000);
  for (let i=0;i<leaves.length;i++) for (let j=i+1;j<leaves.length;j++) {
    const a=leaves[i], b=leaves[j]; if (a.el.contains(b.el)||b.el.contains(a.el)) continue;
    const ix = Math.min(a.r.right,b.r.right)-Math.max(a.r.left,b.r.left), iy = Math.min(a.r.bottom,b.r.bottom)-Math.max(a.r.top,b.r.top);
    if (ix>6 && iy>6) {
      const area = ix*iy, min = Math.min(a.r.width*a.r.height, b.r.width*b.r.height);
      if (area/min > 0.25) {
        // skip if one is positioned as an intentional badge/overlay on a non-text parent (opacity checks handled); skip if either is a sibling inline within same block (browser layout can't overlap inline text)
        if (a.el.parentElement===b.el.parentElement && getComputedStyle(a.el).display.startsWith("inline") && getComputedStyle(b.el).display.startsWith("inline")) continue;
        out.overlaps.push({ a: path(a.el)+" «"+a.el.textContent.trim().slice(0,30)+"»", b: path(b.el)+" «"+b.el.textContent.trim().slice(0,30)+"»", ratio: +(area/min).toFixed(2) });
      }
    }
  }
  out.overlaps = out.overlaps.slice(0,12); out.overflow = out.overflow.slice(0,12); out.clipped = out.clipped.slice(0,12);
  return out;
})()`;

(async () => {
  const urls = process.argv.slice(2);
  const browser = await chromium.launch();
  const report = [];
  for (const [w, h] of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: w < 500, hasTouch: w < 500 });
    const page = await ctx.newPage();
    for (const u of urls) {
      const name = (u === "/" ? "home" : u.replace(/^\//, "").replace(/\//g, "_"));
      try {
        await page.goto(BASE + u, { waitUntil: "networkidle", timeout: 45000 });
        await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
        await page.evaluate(async () => { document.querySelectorAll("*").forEach(el=>{}); window.scrollTo(0, document.body.scrollHeight); await new Promise(r=>setTimeout(r,400)); window.scrollTo(0,0); await new Promise(r=>setTimeout(r,300)); });
        // reveal AnimateIn content
        await page.addStyleTag({ content: "*{animation-play-state:paused!important;transition:none!important} [data-animate],[class*='animate-in'],.reveal{opacity:1!important;transform:none!important}" });
        await page.waitForTimeout(300);
        const a = await page.evaluate(AUDIT);
        await page.screenshot({ path: `${OUT}/${name}@${w}.png`, fullPage: true });
        report.push({ u, w, ...a });
        const flag = (a.scrollW > w + 1 ? " HSCROLL" : "") + (a.overflow.length ? ` overflow:${a.overflow.length}` : "") + (a.clipped.length ? ` clipped:${a.clipped.length}` : "") + (a.overlaps.length ? ` overlaps:${a.overlaps.length}` : "");
        console.log(`${String(w).padStart(4)} ${u.padEnd(48)}${flag || " ok"}`);
      } catch (e) { console.log(`${String(w).padStart(4)} ${u.padEnd(48)} ERROR ${e.message.split("\n")[0]}`); }
    }
    await ctx.close();
  }
  fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 1));
  await browser.close();
})();

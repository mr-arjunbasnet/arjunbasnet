"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CLIPSTACK, DOWNLOAD } from "@/content/clipstack/index";
import { track } from "@/lib/analytics";
import { btnPrimary, field, label } from "./ui";

const LEAD_KEY = "clipstack_lead";

/*
 * The returning-visitor flag, read through useSyncExternalStore so the first
 * client render agrees with the server (whose snapshot is always "no") and
 * the value updates the instant the form sets it — with no setState inside
 * an effect, which this codebase's lint rules forbid.
 */
const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}
function readLead(): boolean {
  try {
    return localStorage.getItem(LEAD_KEY) === "1";
  } catch {
    return false; // private mode or blocked storage — the form simply shows
  }
}
function writeLead() {
  try {
    localStorage.setItem(LEAD_KEY, "1");
  } catch {}
  listeners.forEach((cb) => cb());
}

/**
 * The gated download — brief §5.
 *
 * The one rule: the download starts the moment the form is valid, whatever
 * the lead call does. The POST races a 4-second timeout and both outcomes
 * continue to the download. A returning visitor (localStorage flag) sees the
 * direct buttons instead of the form.
 *
 * Posts to /api/contact as `clipstack-download` so the site keeps a single
 * dynamic route. That route's bot checks are honoured: the honeypot field is
 * named `company_website` and `ts` is the form's mount time.
 */
export default function DownloadForm({ version }: { version: string }) {
  const returning = useSyncExternalStore(subscribe, readLead, () => false);
  const [submitted, setSubmitted] = useState(false);
  const done = returning || submitted;
  const [busy, setBusy] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const mountedAt = useRef<number>(0);

  useEffect(() => {
    mountedAt.current = Date.now();
    // Every "Download" CTA on the page is a #download anchor; land on the
    // first field, not just the section.
    const focus = () => {
      if (window.location.hash === "#download") nameRef.current?.focus({ preventScroll: true });
    };
    focus();
    window.addEventListener("hashchange", focus);
    return () => window.removeEventListener("hashchange", focus);
  }, []);

  function startDownload(href: string) {
    const a = Object.assign(document.createElement("a"), { href, download: "" });
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company_website") ?? "")) return; // honeypot
    if (!form.reportValidity()) return;
    setBusy(true);

    const payload = {
      type: "clipstack-download",
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim().toLowerCase(),
      uses: String(data.get("uses") ?? ""),
      updates: data.get("updates") === "on",
      version,
      referrer: document.referrer,
      ts: mountedAt.current,
      company_website: "",
    };

    try {
      await Promise.race([
        fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        new Promise((_, reject) => setTimeout(reject, 4000)),
      ]);
    } catch {
      /* never block the download on the lead call */
    }

    track("product_download", { product: "clipstack", uses: payload.uses, version });
    startDownload(CLIPSTACK.pkg);
    setSubmitted(true);
    setBusy(false);
    writeLead();
  }

  if (done) {
    return (
      <div className="max-w-[640px] rounded-2xl border border-border bg-surface p-[22px]">
        <h3 className="mb-2 text-lg font-semibold">{DOWNLOAD.doneTitle}</h3>
        <p className="mb-3 text-[15px] text-muted">
          Open <strong className="text-fg">ClipStack-{version}.pkg</strong>. If macOS says it can&rsquo;t be
          opened, use System Settings → Privacy &amp; Security →{" "}
          <strong className="text-fg">Open Anyway</strong> — once.{" "}
          <a href="#faq-open" className="text-primary-light hover:underline">Details</a>.
        </p>
        <p className="text-[13px] text-muted">
          Prefer a disk image?{" "}
          <a href={CLIPSTACK.dmg} download className="text-primary-light hover:underline">Download the .dmg</a>
          {" · "}Didn&rsquo;t start?{" "}
          <a href={CLIPSTACK.pkg} download className="text-primary-light hover:underline">Download again</a>
        </p>
      </div>
    );
  }

  return (
    <form id="lead" noValidate onSubmit={onSubmit} className="grid max-w-[640px] gap-3">
      <div className="grid gap-3 min-[560px]:grid-cols-2">
        <label className={label}>
          Name
          <input ref={nameRef} name="name" autoComplete="name" required minLength={2} maxLength={80} className={field} />
        </label>
        <label className={label}>
          Email
          <input name="email" type="email" autoComplete="email" required className={field} />
        </label>
      </div>
      <label className={label}>
        What do you copy most?
        <select name="uses" defaultValue={DOWNLOAD.usesDefault} className={field}>
          {DOWNLOAD.uses.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2.5 text-sm font-medium text-fg">
        <input type="checkbox" name="updates" className="h-4 w-4 accent-primary" />
        {DOWNLOAD.updatesLabel}
      </label>
      <input name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" />
      <div>
        <button type="submit" disabled={busy} className={btnPrimary}>
          {busy ? "Starting download…" : DOWNLOAD.button}
        </button>
      </div>
      <p className="text-[13px] text-muted">{DOWNLOAD.privacy}</p>
    </form>
  );
}

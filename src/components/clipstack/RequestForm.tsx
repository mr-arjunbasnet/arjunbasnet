"use client";

import { useRef, useState, useEffect } from "react";
import { SITE } from "@/content/site";
import { REQUEST } from "@/content/clipstack/index";
import { track } from "@/lib/analytics";
import { btnPrimary, field, label } from "./ui";

/**
 * "Have a problem like this?" — brief §4·9 and §5.
 *
 * Posts to /api/contact as `clipstack-request`. If that fails for any reason
 * it falls back to a pre-filled mailto, exactly as the brief specifies, so a
 * message is never lost to an outage.
 */
export default function RequestForm() {
  const [state, setState] = useState<"idle" | "busy" | "sent">("idle");
  const mountedAt = useRef<number>(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim().toLowerCase();
    const kind = String(data.get("kind") ?? "");
    const details = String(data.get("details") ?? "").trim();
    setState("busy");

    const fallback = () => {
      const subject = `[ClipStack] ${kind} — ${name}`;
      const body = `From: ${name} <${email}>\n\n${details}\n`;
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setState("idle");
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "clipstack-request",
          name,
          email,
          kind,
          message: details,
          ts: mountedAt.current,
          company_website: "",
        }),
      });
      if (!res.ok) return fallback();
      track("product_request", { product: "clipstack", kind });
      setState("sent");
    } catch {
      fallback();
    }
  }

  if (state === "sent") {
    return (
      <div className="max-w-[640px] rounded-2xl border border-border bg-surface p-[22px]">
        <h3 className="mb-2 text-lg font-bold">Sent — thank you.</h3>
        <p className="text-[15px] text-muted">
          I read every one of these myself and reply from {SITE.email}, usually within a day.
        </p>
      </div>
    );
  }

  return (
    <form id="request" noValidate onSubmit={onSubmit} className="grid max-w-[640px] gap-3">
      <div className="grid gap-3 min-[560px]:grid-cols-2">
        <label className={label}>
          Your name
          <input name="name" autoComplete="name" required className={field} />
        </label>
        <label className={label}>
          Email
          <input name="email" type="email" autoComplete="email" required className={field} />
        </label>
      </div>
      <label className={label}>
        What kind of thing is it?
        <select name="kind" className={field}>
          {REQUEST.kinds.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
      </label>
      <label className={label}>
        Describe the problem
        <textarea name="details" required placeholder={REQUEST.placeholder} className={`${field} min-h-[130px] resize-y`} />
      </label>
      <div>
        <button type="submit" disabled={state === "busy"} className={btnPrimary}>
          {state === "busy" ? "Sending…" : REQUEST.button}
        </button>
      </div>
      <p className="text-[13px] text-muted">
        Or write directly to{" "}
        <a href={`mailto:${SITE.email}`} className="text-primary-light hover:underline">{SITE.email}</a>.
      </p>
    </form>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { SERVICES } from "@/content/services/index";
import { track } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";

const BUDGETS = [
  "Under NPR 100,000",
  "NPR 100,000 – 500,000",
  "NPR 500,000 – 2,000,000",
  "Over NPR 2,000,000",
  "Not sure yet",
];

const TIMELINES = [
  "As soon as possible",
  "2–4 weeks",
  "1–3 months",
  "Planning ahead",
];

const field =
  "w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-fg placeholder-muted transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none";
const label =
  "mb-2 block text-xs font-semibold uppercase tracking-label text-muted";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  // Prefilled when arriving from a service page CTA (/contact?service=seo-services).
  const preselected = searchParams.get("service") ?? "";

  // Timestamp for the server-side time trap. Set on mount so a bot that posts
  // instantly, without ever rendering the form, is filtered out.
  const mountedAt = useRef<number>(0);
  // Fires lead_form_start once, on first interaction with any field.
  const startedRef = useRef(false);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    track("lead_form_submit", { service: String(preselected || "unspecified") });

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ts: mountedAt.current }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      track("lead_form_success", { service: String(preselected || "unspecified") });
      form.reset();
    } catch (err) {
      setStatus("error");
      track("lead_form_error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-10">
        <CheckCircle size={36} className="text-green-600" />
        <div>
          <h3 className="mb-2 font-display text-xl text-fg">
            Message received.
          </h3>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            A confirmation is on its way to your inbox. I read every message
            myself and typically reply within 24 hours on a working day.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={() => {
        if (!startedRef.current) {
          startedRef.current = true;
          track("lead_form_start", { path: "/contact" });
        }
      }}
      className="space-y-6"
    >
      {/* Honeypot. Positioned off-screen rather than type="hidden", which bots
          skip more often. Never shown to a real user or a screen reader. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label htmlFor="company_website">Do not fill this in</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name <span className="text-primary">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Your name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="your@email.com"
            className={field}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={label}>
            Company <span className="normal-case text-muted">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            maxLength={120}
            autoComplete="organization"
            placeholder="Your organisation"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone <span className="normal-case text-muted">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={40}
            autoComplete="tel"
            placeholder="+977 …"
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className={label}>
          What do you need?
        </label>
        <select
          id="service"
          name="service"
          defaultValue={preselected}
          className={`${field} cursor-pointer appearance-none`}
        >
          <option value="">Not sure yet — help me work it out</option>
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Budget and timeline are what turn an inbox into a pipeline — they
          allow triage before the first reply. Both optional, so neither
          becomes a reason to abandon the form. */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className={label}>
            Budget <span className="normal-case text-muted">(optional)</span>
          </label>
          <select
            id="budget"
            name="budget"
            defaultValue=""
            className={`${field} cursor-pointer appearance-none`}
          >
            <option value="">Prefer not to say</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className={label}>
            Timeline <span className="normal-case text-muted">(optional)</span>
          </label>
          <select
            id="timeline"
            name="timeline"
            defaultValue=""
            className={`${field} cursor-pointer appearance-none`}
          >
            <option value="">Prefer not to say</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder="What are you trying to achieve, and what has already been tried?"
          className={`${field} resize-none`}
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-red-600"
        >
          <AlertCircle size={15} className="shrink-0" />
          <p className="text-xs">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center gap-2 rounded-pill bg-primary px-6 py-3 text-sm font-medium text-primary-fg transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message <Send size={14} />
          </>
        )}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const subjects = [
  "Project Enquiry",
  "Research Collaboration",
  "Consulting Engagement",
  "EdTech / LMS Discussion",
  "AI Automation",
  "Speaking Invitation",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-10">
        <CheckCircle size={36} className="text-green-600" />
        <div>
          <h3
            className="text-xl text-[#111111] mb-2"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            Message received.
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed max-w-sm">
            Thanks for reaching out. I read every message and typically respond within
            24 hours.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-[#1A3FA8] hover:underline mt-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest text-[#737373] mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#E2DDD6] rounded-lg text-[#111111] placeholder-[#BBBBBB] focus:outline-none focus:border-[#1A3FA8] focus:ring-1 focus:ring-[#1A3FA8] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-[#737373] mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#E2DDD6] rounded-lg text-[#111111] placeholder-[#BBBBBB] focus:outline-none focus:border-[#1A3FA8] focus:ring-1 focus:ring-[#1A3FA8] transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-widest text-[#737373] mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#E2DDD6] rounded-lg text-[#111111] focus:outline-none focus:border-[#1A3FA8] focus:ring-1 focus:ring-[#1A3FA8] transition-colors appearance-none cursor-pointer"
        >
          <option value="" disabled>
            Select a topic
          </option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest text-[#737373] mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="What would you like to discuss?"
          className="w-full px-4 py-3 text-sm bg-[#FAFAF8] border border-[#E2DDD6] rounded-lg text-[#111111] placeholder-[#BBBBBB] focus:outline-none focus:border-[#1A3FA8] focus:ring-1 focus:ring-[#1A3FA8] transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          <AlertCircle size={15} className="flex-shrink-0" />
          <p className="text-xs">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center gap-2 px-6 py-3 bg-[#1A3FA8] text-white text-sm font-medium rounded-full hover:bg-[#2B52CC] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Message <Send size={14} />
          </>
        )}
      </button>
    </form>
  );
}

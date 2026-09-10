import { NextResponse, after } from "next/server";
import { headers } from "next/headers";
import nodemailer from "nodemailer";
import {
  sanitiseField,
  sanitiseBody,
  isValidEmail,
  stripCrlf,
} from "@/lib/escape";
import { renderLeadEmail, renderAutoResponse } from "@/lib/email-templates";
import type { LeadFields } from "@/lib/email-templates";
import {
  renderDownloadConfirmation,
  renderRequestConfirmation,
  renderOwnerNotification,
} from "@/lib/clipstack-email";
import { SERVICE_SLUGS, getService } from "@/content/services/index";

// `after` runs the autoresponder past the response, so the visitor is not kept
// waiting on a second SMTP round trip. It must complete inside maxDuration.
export const maxDuration = 30;

const LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  company: 120,
  budget: 60,
  timeline: 60,
  message: 5000,
} as const;

const BUDGETS = [
  "Under NPR 100,000",
  "NPR 100,000 – 500,000",
  "NPR 500,000 – 2,000,000",
  "Over NPR 2,000,000",
  "Not sure yet",
];

/* The two <select>s on /product/clipstack — validated here, never trusted. */
const CLIPSTACK_USES = ["Text & code", "Links", "Images & design", "Files", "A bit of everything"];
const CLIPSTACK_KINDS = [
  "A problem with ClipStack",
  "A feature I wish ClipStack had",
  "A similar tool or automation for my work",
  "Something else",
];

const TIMELINES = [
  "As soon as possible",
  "2–4 weeks",
  "1–3 months",
  "Planning ahead",
];

/**
 * Best-effort in-memory rate limit.
 *
 * Deliberately not the primary control: serverless instances are ephemeral and
 * concurrent instances do not share this Map, so a determined sender can get
 * around it. The real control is a Vercel WAF rate-limit rule on this path.
 * This exists as cheap defence in depth. If spam becomes a genuine problem,
 * replace it with @upstash/ratelimit, which is correct across instances.
 *
 * Not implemented in proxy.ts: the Next 16 docs are explicit that proxy runs
 * separately from render code and must not rely on shared modules or globals.
 */
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT.windowMs,
  );
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) hits.clear(); // crude unbounded-growth guard
  return recent.length > RATE_LIMIT.max;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot: a real browser leaves this off-screen field empty. Return a
    // success shape rather than an error, so a bot never learns it was caught.
    if (typeof body.company_website === "string" && body.company_website !== "") {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Time trap: a human takes more than three seconds to fill this in.
    // Unsigned and therefore advisory only.
    const elapsed = Number(body.ts) ? Date.now() - Number(body.ts) : null;
    if (elapsed !== null && (elapsed < 3000 || elapsed > 2 * 60 * 60 * 1000)) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // headers() must be awaited in Next 16.
    const hdrs = await headers();
    const ip =
      hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      hdrs.get("x-real-ip") ||
      "unknown";

    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many messages. Please try again shortly, or email directly." },
        { status: 429 },
      );
    }

    /*
     * ClipStack (/product/clipstack) sends its two forms here rather than to
     * a second API route, so /api/contact stays the site's only dynamic
     * route. A download lead has no free-text message, so one is composed
     * from the structured fields; a request carries the visitor's text.
     */
    const product =
      body.type === "clipstack-download"
        ? "download"
        : body.type === "clipstack-request"
          ? "request"
          : null;

    const name = sanitiseField(body.name, LIMITS.name);
    const email = sanitiseField(body.email, LIMITS.email);

    const uses = CLIPSTACK_USES.includes(sanitiseField(body.uses, 40))
      ? sanitiseField(body.uses, 40)
      : undefined;
    const kind = CLIPSTACK_KINDS.includes(sanitiseField(body.kind, 60))
      ? sanitiseField(body.kind, 60)
      : undefined;

    const message =
      product === "download"
        ? [
            `ClipStack download lead.`,
            `Copies most: ${uses ?? "not given"}`,
            `Update emails: ${body.updates === true ? "yes" : "no"}`,
            `Version: ${sanitiseField(body.version, 20) || "unknown"}`,
            `Referrer: ${sanitiseField(body.referrer, 200) || "direct"}`,
          ].join("\n")
        : sanitiseBody(body.message, LIMITS.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "That email address does not look valid." },
        { status: 400 },
      );
    }

    // The service field comes from a <select>, but a request can send anything
    // — validate against the registry rather than trusting the client.
    const serviceSlug = sanitiseField(body.service, 80);
    const service = product
      ? "ClipStack (macOS app)"
      : SERVICE_SLUGS.includes(serviceSlug)
        ? getService(serviceSlug)?.name
        : undefined;

    const budgetRaw = sanitiseField(body.budget, LIMITS.budget);
    const timelineRaw = sanitiseField(body.timeline, LIMITS.timeline);

    const fields: LeadFields = {
      name,
      email,
      message,
      phone: sanitiseField(body.phone, LIMITS.phone) || undefined,
      company: sanitiseField(body.company, LIMITS.company) || undefined,
      service,
      budget: BUDGETS.includes(budgetRaw) ? budgetRaw : undefined,
      timeline: TIMELINES.includes(timelineRaw) ? timelineRaw : undefined,
    };

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const clip = product
      ? {
          name,
          email,
          uses,
          updates: body.updates === true,
          version: sanitiseField(body.version, 20) || "latest",
          referrer: sanitiseField(body.referrer, 200) || undefined,
          kind,
          message,
        }
      : null;

    const lead = clip
      ? renderOwnerNotification(product as "download" | "request", clip)
      : renderLeadEmail(fields);

    await transporter.sendMail({
      // stripCrlf on the display name closes the header-injection path that
      // interpolating `name` here previously left open.
      from: `"${stripCrlf(name)}" <${process.env.SMTP_FROM}>`,
      replyTo: email,
      to: process.env.SMTP_TO || "mr.arjunbasnet@gmail.com",
      subject: stripCrlf(lead.subject),
      text: lead.text,
      html: lead.html,
    });

    // Structured log for reconciliation against analytics — survives ad-blockers.
    console.log(
      JSON.stringify({
        event: "lead_received",
        product: product ?? null,
        service: fields.service ?? null,
        budget: fields.budget ?? null,
        timeline: fields.timeline ?? null,
        at: new Date().toISOString(),
      }),
    );

    // Autoresponder goes out after the response. Only ever to the address the
    // sender typed, and only once the notification itself succeeded.
    //
    //
    // ClipStack gets its own confirmations (the download links plus the
    // first-launch note; or a "got it" for a request) — never the consulting
    // "enquiry received" email. The form's privacy line describes exactly
    // these two messages; change it first if this ever sends anything else.
    after(async () => {
      try {
        const auto = clip
          ? product === "download"
            ? renderDownloadConfirmation(clip)
            : renderRequestConfirmation(clip)
          : renderAutoResponse(fields);
        await transporter.sendMail({
          from: `"${clip ? "ClipStack" : "Arjun Basnet"}" <${process.env.SMTP_FROM}>`,
          replyTo: process.env.SMTP_TO || "mr.arjunbasnet@gmail.com",
          to: email,
          subject: auto.subject,
          text: auto.text,
          html: auto.html,
        });
      } catch (err) {
        // A failed confirmation must not affect the enquiry, which is delivered.
        console.error("Autoresponse failed:", err);
      }
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email directly." },
      { status: 500 },
    );
  }
}

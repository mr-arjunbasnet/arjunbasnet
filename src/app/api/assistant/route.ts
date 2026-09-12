import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { SITE, startingFromLabel } from "@/content/site";
import { SERVICES } from "@/content/services/index";
import { PRODUCTS } from "@/content/products/index";
import { AI_TRAINER_PRIMARY_ANSWER } from "@/content/ai-trainer/index";

export const maxDuration = 30;

/*
 * /api/assistant — the second deliberate dynamic route (with /api/contact).
 *
 * Answers from Claude, grounded ONLY in the site's own content, when
 * ANTHROPIC_API_KEY is set; otherwise from a small rules-based concierge that
 * points at the right page or channel. Either way the visitor gets an answer
 * and a next step. Voice never reaches this route — speech is transcribed on
 * the device; only text arrives here.
 */
type Msg = { role: "user" | "assistant"; text: string };

const RATE = { max: 30, windowMs: 10 * 60 * 1000 };
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE.windowMs);
  recent.push(now); hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE.max;
}

function knowledge(): string {
  const services = SERVICES.map((s) => `- ${s.name} (${SITE.url}/services/${s.slug}): ${s.tagline} ${s.primaryAnswer.answer}`).join("\n");
  const products = PRODUCTS.map((p) => `- ${p.name} (${SITE.url}${p.href}): ${p.tagline} ${p.description} ${p.platform}. ${p.price}.`).join("\n");
  return [
    `You are the assistant on ${SITE.url}, the site of ${SITE.name}, ${SITE.jobTitle} in ${SITE.address.locality}, Nepal.`,
    `Voice: practical, direct, human — plain words, honest limits, specific outcomes. Never hype. Never say "AI-powered" about Arjun. If unsure or asked something outside this material, say so and offer WhatsApp or the contact page.`,
    `Answer in at most 90 words. Use markdown links only of the form [label](/path) to pages on this site.`,
    `Pricing: ${startingFromLabel()}; every quote follows a short conversation. Contact: WhatsApp ${SITE.phone}, email ${SITE.email}, book a call ${SITE.calendarUrl}, contact page /contact. ${SITE.timezone}; typically replies within 24 hours.`,
    `SERVICES:\n${services}`,
    `AI TRAINING (/ai-trainer-nepal): ${AI_TRAINER_PRIMARY_ANSWER.answer}`,
    `PRODUCTS:\n${products}`,
  ].join("\n\n");
}

/* Concierge — used when no model key is configured. Points, never invents. */
function concierge(q: string): string {
  const t = q.toLowerCase();
  const hit = SERVICES.find((s) => [s.name, ...s.keywords].some((k) => t.includes(k.toLowerCase().split(" ")[0])) );
  if (/price|cost|charge|rate|budget|how much/.test(t)) return `${startingFromLabel()} — and every quote follows a short conversation about the actual problem. The fastest way to a number is [WhatsApp](/contact) or [booking a call](/contact).`;
  if (/whatsapp|call|talk|speak|contact|email|reach|human|arjun/.test(t)) return `Easiest is WhatsApp — Arjun usually replies within minutes — or [book a call](/contact). Email works too: ${SITE.email}. Everything is on the [contact page](/contact).`;
  if (/clipstack|clipboard/.test(t)) return `ClipStack is a free clipboard-history app for macOS 14+: everything you copy, searchable and pasted back with ⌘⇧V, and it never leaves your Mac. [Get ClipStack](/product/clipstack).`;
  if (/melos|record|voice/.test(t) && !/orb/.test(t)) return `Melos Studio is a free browser recording studio — record your voice and watch it drawn live. Nothing is uploaded. [Open Melos](/product/melos).`;
  if (/train|workshop|seminar|course|learn|teach|student/.test(t)) return `Arjun runs AI training in Nepal — seminars, workshops and programmes for students, teams and institutions, in person or online. [AI training](/ai-trainer-nepal), or [get in touch](/contact) to scope a session.`;
  if (hit) return `${hit.name}: ${hit.tagline} ${hit.primaryAnswer.answer.split(". ").slice(0, 2).join(". ")}. [Read more](/services/${hit.slug}) or [talk to Arjun](/contact).`;
  if (/automat|n8n|workflow|zapier/.test(t)) return `AI automation replaces repetitive work — quoting, reporting, document processing — with workflows built on n8n and Claude. Typical result: a ten-hour weekly cycle down to about two. [AI automation](/services/ai-automation).`;
  if (/hello|hi\b|hey|help|what do you/.test(t)) return `I can point you to the right place: nine services (SEO, AEO, GEO, digital marketing, web, mobile, custom software, AI automation, consulting), AI training, and two free products. What's the problem you're trying to solve?`;
  return `I'm a simple guide here — for anything specific, Arjun answers fast on WhatsApp. Meanwhile: [services](/services), [AI training](/ai-trainer-nepal), [products](/products), or [contact](/contact).`;
}

async function claude(messages: Msg[]): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: process.env.ASSISTANT_MODEL || "claude-sonnet-5",
      max_tokens: 400,
      system: knowledge(),
      messages: messages.map((m) => ({ role: m.role, content: m.text })),
    }),
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) { console.error("assistant: model call failed", res.status); return null; }
  const data = await res.json();
  const text = Array.isArray(data.content) ? data.content.filter((c: { type: string }) => c.type === "text").map((c: { text: string }) => c.text).join("\n") : "";
  return text.trim() || null;
}

export async function POST(req: Request) {
  try {
    const hdrs = await headers();
    const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || hdrs.get("x-real-ip") || "unknown";
    if (limited(ip)) return NextResponse.json({ reply: "That's a lot of questions in a short time — give it a few minutes, or reach Arjun on WhatsApp." }, { status: 429 });

    const body = await req.json();
    const raw: unknown[] = Array.isArray(body?.messages) ? body.messages : [];
    const messages: Msg[] = raw
      .filter((m): m is Msg => typeof m === "object" && m !== null && (m as Msg).role !== undefined && typeof (m as Msg).text === "string")
      .map((m): Msg => ({ role: m.role === "assistant" ? "assistant" : "user", text: m.text.slice(0, 1500) }))
      .slice(-12);
    const last = [...messages].reverse().find((m) => m.role === "user");
    if (!last?.text.trim()) return NextResponse.json({ error: "Empty message." }, { status: 400 });

    const modelReply = await claude(messages).catch((e) => { console.error("assistant:", e); return null; });
    const reply = modelReply ?? concierge(last.text);
    console.log(JSON.stringify({ event: "assistant_reply", source: modelReply ? "claude" : "concierge", at: new Date().toISOString() }));
    return NextResponse.json({ reply, source: modelReply ? "claude" : "concierge" });
  } catch (err) {
    console.error("assistant error:", err);
    return NextResponse.json({ reply: "Something went wrong on my side. WhatsApp is the fastest way to reach Arjun." }, { status: 500 });
  }
}

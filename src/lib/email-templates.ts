import { SITE } from "@/content/site";
import { escapeHtml, bodyToHtml } from "./escape";

/**
 * Email construction, isolated from the route handler.
 *
 * Every user-supplied value passes through escapeHtml or bodyToHtml on its way
 * into the HTML body. Colours are literal hex because email clients do not
 * support CSS custom properties.
 */

export interface LeadFields {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message: string;
}

const C = {
  bg: "#FAFAF8",
  border: "#E2DDD6",
  surface: "#F2EEE8",
  fg: "#111111",
  muted: "#737373",
  primary: "#1A3FA8",
};

const shell = (inner: string) => `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:${C.bg};border:1px solid ${C.border};border-radius:12px;">
${inner}
<p style="margin:28px 0 0;font-size:11px;color:#BBBBBB;text-align:center;">Sent via ${SITE.url.replace("https://", "")}</p>
</div>`;

const row = (label: string, value: string) => `
<tr>
  <td style="padding:8px 12px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;color:${C.muted};width:110px;vertical-align:top;">${escapeHtml(label)}</td>
  <td style="padding:8px 12px;font-size:14px;color:${C.fg};">${value}</td>
</tr>`;

/** The notification sent to Arjun. */
export function renderLeadEmail(f: LeadFields): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = f.service
    ? `New enquiry: ${f.service} — ${f.name}`
    : `New enquiry from ${f.name}`;

  const text = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    f.phone ? `Phone: ${f.phone}` : "",
    f.company ? `Company: ${f.company}` : "",
    f.service ? `Service: ${f.service}` : "",
    f.budget ? `Budget: ${f.budget}` : "",
    f.timeline ? `Timeline: ${f.timeline}` : "",
    "",
    f.message,
  ]
    .filter(Boolean)
    .join("\n");

  const rows = [
    row("From", `${escapeHtml(f.name)} &lt;${escapeHtml(f.email)}&gt;`),
    f.phone ? row("Phone", escapeHtml(f.phone)) : "",
    f.company ? row("Company", escapeHtml(f.company)) : "",
    f.service ? row("Service", escapeHtml(f.service)) : "",
    f.budget ? row("Budget", escapeHtml(f.budget)) : "",
    f.timeline ? row("Timeline", escapeHtml(f.timeline)) : "",
  ]
    .filter(Boolean)
    .join("");

  const html = shell(`
<p style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${C.muted};margin:0 0 8px;">New enquiry</p>
<h2 style="font-size:20px;color:${C.fg};margin:0 0 24px;font-weight:600;">${escapeHtml(f.service || "General enquiry")}</h2>
<table style="width:100%;border-collapse:collapse;margin-bottom:20px;background:${C.surface};border-radius:8px;">${rows}</table>
<table style="width:100%;border-collapse:collapse;">
  <tr><td style="padding:8px 12px;background:${C.surface};border-radius:6px 6px 0 0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;color:${C.muted};">Message</td></tr>
  <tr><td style="padding:16px;border:1px solid ${C.border};border-top:none;border-radius:0 0 6px 6px;font-size:14px;color:${C.fg};line-height:1.6;">${bodyToHtml(f.message)}</td></tr>
</table>`);

  return { subject, text, html };
}

/** The confirmation sent back to the enquirer. */
export function renderAutoResponse(f: LeadFields): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = `Thanks for getting in touch — ${SITE.name}`;

  const text = [
    `Hi ${f.name},`,
    "",
    "Thanks for reaching out. Your message has arrived and I read every one myself — expect a reply within 24 hours on a working day.",
    "",
    `If it is urgent, WhatsApp is faster: https://wa.me/${SITE.whatsapp}`,
    "",
    "For reference, here is what you sent:",
    "",
    f.message,
    "",
    "— Arjun Basnet",
    `${SITE.jobTitle}, ${SITE.address.locality}`,
    SITE.url,
  ].join("\n");

  const html = shell(`
<p style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${C.muted};margin:0 0 8px;">Message received</p>
<h2 style="font-size:20px;color:${C.fg};margin:0 0 16px;font-weight:600;">Thanks for getting in touch, ${escapeHtml(f.name)}.</h2>
<p style="font-size:14px;color:${C.fg};line-height:1.6;margin:0 0 16px;">Your message has arrived. I read every one myself, so expect a reply within 24 hours on a working day.</p>
<p style="font-size:14px;color:${C.fg};line-height:1.6;margin:0 0 24px;">If it is urgent, <a href="https://wa.me/${SITE.whatsapp}" style="color:${C.primary};">WhatsApp</a> reaches me faster.</p>
<table style="width:100%;border-collapse:collapse;">
  <tr><td style="padding:8px 12px;background:${C.surface};border-radius:6px 6px 0 0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;color:${C.muted};">What you sent</td></tr>
  <tr><td style="padding:16px;border:1px solid ${C.border};border-top:none;border-radius:0 0 6px 6px;font-size:14px;color:${C.muted};line-height:1.6;">${bodyToHtml(f.message)}</td></tr>
</table>
<p style="font-size:14px;color:${C.fg};margin:24px 0 0;">— Arjun Basnet<br><span style="color:${C.muted};font-size:13px;">${SITE.jobTitle}, ${SITE.address.locality}</span></p>`);

  return { subject, text, html };
}

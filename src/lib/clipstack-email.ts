/**
 * Emails for /product/clipstack — the notification to the owner and the
 * confirmation to the visitor, for both forms.
 *
 * Kept apart from email-templates.ts: those are the consulting-enquiry
 * emails, and a ClipStack download is not an enquiry. Everything the visitor
 * typed is escaped before it reaches HTML; the plain-text part carries the
 * same content for clients that prefer it.
 */
import { SITE } from "@/content/site";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const PAGE = `${SITE.url}/product/clipstack`;
const PKG = `${PAGE}/ClipStack.pkg`;
const DMG = `${PAGE}/ClipStack.dmg`;

export interface ClipStackDownload {
  name: string;
  email: string;
  uses?: string;
  updates: boolean;
  version: string;
  referrer?: string;
}

export interface ClipStackRequest {
  name: string;
  email: string;
  kind?: string;
  message: string;
}

/* ── shared shell ── */
function shell(title: string, bodyHtml: string): string {
  return `<!doctype html><html><body style="margin:0;background:#f6f7fb;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text',Inter,Segoe UI,Roboto,sans-serif;color:#14182b">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e3e6f0;border-radius:16px">
<tr><td style="padding:28px 28px 8px;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#3355db">ClipStack</td></tr>
<tr><td style="padding:0 28px 8px;font-size:22px;font-weight:700;line-height:1.25">${esc(title)}</td></tr>
<tr><td style="padding:8px 28px 28px;font-size:16px;line-height:1.6">${bodyHtml}</td></tr>
</table>
<p style="max-width:560px;margin:16px 0 0;font-size:12px;color:#5b6178">ClipStack · ${esc(SITE.name)} · Kathmandu, Nepal · <a href="${PAGE}" style="color:#3355db">${esc(PAGE.replace("https://", ""))}</a></p>
</td></tr></table></body></html>`;
}

const btn = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:#3355db;color:#ffffff;text-decoration:none;font-weight:600;padding:11px 18px;border-radius:12px">${esc(label)}</a>`;

/* ── to the visitor: download ── */
export function renderDownloadConfirmation(d: ClipStackDownload) {
  const first = d.name.split(/\s+/)[0] || d.name;
  const subject = `Your ClipStack ${d.version} download`;

  const text = [
    `Hi ${first},`,
    ``,
    `Here is ClipStack ${d.version} for your Mac.`,
    `Installer (.pkg): ${PKG}`,
    `Disk image (.dmg): ${DMG}`,
    ``,
    `First launch — one-time step per Mac:`,
    `ClipStack is not yet notarized with an Apple Developer ID, so macOS will refuse it once.`,
    `1. Open the .pkg. When macOS says it cannot be opened, click Done.`,
    `2. System Settings → Privacy & Security → scroll down → Open Anyway, next to the ClipStack message. Confirm with your password.`,
    `3. The installer runs and starts ClipStack. It opens normally from then on, and updates arrive inside the app.`,
    ``,
    `Then press ⌘⇧V anywhere. Everything you copy is one shortcut away, and none of it leaves your Mac.`,
    ``,
    d.updates
      ? `You asked to hear when a new version ships — that is the only other email you will get from me about ClipStack.`
      : `You did not tick the update box, so this is the only email you will get about ClipStack. Updates arrive inside the app.`,
    ``,
    `If something does not work, reply to this email.`,
    `— ${SITE.name}`,
  ].join("\n");

  const html = shell(
    `Here is ClipStack ${d.version} for your Mac.`,
    `<p>Hi ${esc(first)},</p>
<p style="margin:16px 0">${btn(PKG, "Download the installer (.pkg)")}</p>
<p style="font-size:14px;color:#5b6178">Prefer a disk image? <a href="${DMG}" style="color:#3355db">Download the .dmg</a></p>
<p style="margin-top:22px"><strong>First launch — one-time step per Mac.</strong> ClipStack is not yet notarized with an Apple Developer ID, so macOS will refuse it once:</p>
<ol style="padding-left:20px;margin:8px 0 16px">
<li>Open the <strong>.pkg</strong>. When macOS says it cannot be opened, click <em>Done</em>.</li>
<li><strong>System Settings → Privacy &amp; Security</strong>, scroll down, click <strong>Open Anyway</strong> next to the ClipStack message. Confirm with your password.</li>
<li>The installer runs and starts ClipStack. It opens normally from then on, and updates arrive inside the app.</li>
</ol>
<p>Then press <code style="background:#e8ecfb;padding:2px 7px;border-radius:6px;font-family:ui-monospace,Menlo,monospace">⌘⇧V</code> anywhere. Everything you copy is one shortcut away, and none of it leaves your Mac.</p>
<p style="font-size:14px;color:#5b6178;margin-top:22px">${
      d.updates
        ? "You asked to hear when a new version ships — that is the only other email you will get from me about ClipStack."
        : "You did not tick the update box, so this is the only email you will get about ClipStack. Updates arrive inside the app."
    }</p>
<p style="font-size:14px;color:#5b6178">If something does not work, reply to this email.<br>— ${esc(SITE.name)}</p>`,
  );

  return { subject, text, html };
}

/* ── to the visitor: request ── */
export function renderRequestConfirmation(r: ClipStackRequest) {
  const first = r.name.split(/\s+/)[0] || r.name;
  const subject = `Got it — ${r.kind ?? "your message"} about ClipStack`;
  const text = [
    `Hi ${first},`,
    ``,
    `Thanks — I have your message and will reply within a day, from this address.`,
    ``,
    `What you sent (${r.kind ?? "message"}):`,
    r.message,
    ``,
    `— ${SITE.name}`,
  ].join("\n");
  const html = shell(
    "Got it. I'll reply within a day.",
    `<p>Hi ${esc(first)},</p>
<p>Thanks — I have your message and will reply within a day, from this address.</p>
<p style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#5b6178;margin:22px 0 6px">What you sent · ${esc(r.kind ?? "message")}</p>
<blockquote style="margin:0;padding:12px 16px;border-left:3px solid #e3e6f0;color:#5b6178;white-space:pre-wrap">${esc(r.message)}</blockquote>
<p style="font-size:14px;color:#5b6178;margin-top:22px">— ${esc(SITE.name)}</p>`,
  );
  return { subject, text, html };
}

/* ── to the owner ── */
export function renderOwnerNotification(
  kind: "download" | "request",
  d: Partial<ClipStackDownload & ClipStackRequest>,
) {
  const rows =
    kind === "download"
      ? [
          ["Name", d.name],
          ["Email", d.email],
          ["Copies most", d.uses ?? "not given"],
          ["Update emails", d.updates ? "yes" : "no"],
          ["Version", d.version],
          ["Referrer", d.referrer || "direct"],
        ]
      : [
          ["Name", d.name],
          ["Email", d.email],
          ["Kind", d.kind ?? "Request"],
        ];
  const subject =
    kind === "download"
      ? `[ClipStack] Download — ${d.name} (${d.uses ?? "?"}) · updates: ${d.updates ? "yes" : "no"}`
      : `[ClipStack] ${d.kind ?? "Request"} — ${d.name}`;

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v ?? ""}`),
    ...(kind === "request" ? ["", d.message ?? ""] : []),
  ].join("\n");

  const html = shell(
    subject,
    `<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:15px">${rows
      .map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#5b6178;white-space:nowrap">${esc(String(k))}</td><td style="padding:4px 0">${esc(String(v ?? ""))}</td></tr>`)
      .join("")}</table>${
      kind === "request"
        ? `<blockquote style="margin:16px 0 0;padding:12px 16px;border-left:3px solid #e3e6f0;white-space:pre-wrap">${esc(d.message ?? "")}</blockquote>`
        : ""
    }`,
  );
  return { subject, text, html };
}

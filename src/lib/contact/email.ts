import type { ContactInput, Service } from "./validation"

// The inquiry email is read by Alex, so it is always in English; the visitor's language is listed.
const SERVICE_LABELS: Record<Service, string> = {
  automation: "Business process automation",
  product: "Digital product development",
  consulting: "Technology consulting & leadership",
  other: "Something else",
}

const LANGUAGE_LABELS = { en: "English", es: "Spanish" } as const

export type InquiryEmail = { subject: string; html: string; text: string; replyTo: string }

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export function buildInquiryEmail(input: ContactInput): InquiryEmail {
  const service = SERVICE_LABELS[input.service]
  const rows: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Company", input.company || "—"],
    ["Service", service],
    ["Language", LANGUAGE_LABELS[input.locale]],
  ]

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f1f2ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0e1213;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e1e3de;border-radius:12px;">
      <tr><td style="padding:28px 28px 8px;">
        <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#0a746c;font-weight:600;">alexsosa.me</p>
        <h1 style="margin:8px 0 0;font-size:20px;line-height:1.3;">New website inquiry</h1>
      </td></tr>
      <tr><td style="padding:16px 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5;">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td style="padding:6px 16px 6px 0;color:#596265;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:6px 0;">${escapeHtml(value)}</td></tr>`,
            )
            .join("\n          ")}
        </table>
      </td></tr>
      <tr><td style="padding:8px 28px 28px;">
        <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#596265;font-weight:600;">Message</p>
        <div style="font-size:15px;line-height:1.6;white-space:pre-wrap;border-left:3px solid #19cdbf;padding-left:14px;">${escapeHtml(input.message)}</div>
        <p style="margin:24px 0 0;font-size:12px;color:#596265;">Reply to this email to respond directly to ${escapeHtml(input.name)}.</p>
      </td></tr>
    </table>
  </body>
</html>`

  const text = [
    "New website inquiry (alexsosa.me)",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    input.message,
  ].join("\n")

  return { subject: `New website inquiry — ${service}`, html, text, replyTo: input.email }
}

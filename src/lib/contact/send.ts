import { Resend } from "resend"
import type { InquiryEmail } from "./email"

export type SendResult = { ok: true; id: string } | { ok: false }
export type InquirySender = (email: InquiryEmail) => Promise<SendResult>

/**
 * Sends through Resend. `from` must be an address on a domain verified in Resend;
 * the visitor's address is only ever used as Reply-To.
 */
export function createResendSender({ apiKey, from, to }: { apiKey: string; from: string; to: string }): InquirySender {
  const resend = new Resend(apiKey)
  return async (email) => {
    try {
      const { data, error } = await resend.emails.send({
        from,
        to,
        replyTo: email.replyTo,
        subject: email.subject,
        html: email.html,
        text: email.text,
      })
      if (error || !data?.id) {
        // Provider error name/code only; never the inquiry contents.
        console.error("[contact] Resend rejected the message:", error?.name ?? "no id returned")
        return { ok: false }
      }
      return { ok: true, id: data.id }
    } catch (error) {
      console.error("[contact] Resend request failed:", error instanceof Error ? error.name : "unknown error")
      return { ok: false }
    }
  }
}

export function senderFromEnv(env: NodeJS.ProcessEnv = process.env, fallbackTo: string): InquirySender | null {
  const apiKey = env.RESEND_API_KEY
  const from = env.CONTACT_FROM_EMAIL
  if (!apiKey || !from) return null
  return createResendSender({ apiKey, from, to: env.CONTACT_TO_EMAIL || fallbackTo })
}

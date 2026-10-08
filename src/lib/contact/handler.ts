import { buildInquiryEmail } from "./email"
import type { InquirySender } from "./send"
import { MAX_BODY_BYTES, validateContact, type FieldErrors } from "./validation"

export type ContactErrorCode =
  | "invalid_request"
  | "forbidden"
  | "payload_too_large"
  | "validation"
  | "unavailable"
  | "delivery_failed"

export type ContactResponse = { ok: true } | { ok: false; error: ContactErrorCode; fields?: FieldErrors }

type Deps = {
  /** Null when email delivery isn't configured. */
  getSender: () => InquirySender | null
}

/** Honeypot field name: hidden from people, often filled in by bots. */
export const HONEYPOT_FIELD = "website"

function json(body: ContactResponse, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } })
}

/** Rejects cross-site submissions: when the browser sends Origin, it must match this host. */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  if (!origin) return true
  try {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? new URL(request.url).host
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export function createContactHandler({ getSender }: Deps) {
  return async function handle(request: Request): Promise<Response> {
    if (!isSameOrigin(request)) return json({ ok: false, error: "forbidden" }, 403)
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return json({ ok: false, error: "invalid_request" }, 415)
    }

    const declaredLength = Number(request.headers.get("content-length") ?? 0)
    if (declaredLength > MAX_BODY_BYTES) return json({ ok: false, error: "payload_too_large" }, 413)

    let raw: string
    try {
      raw = await request.text()
    } catch {
      return json({ ok: false, error: "invalid_request" }, 400)
    }
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
      return json({ ok: false, error: "payload_too_large" }, 413)
    }

    let body: Record<string, unknown>
    try {
      const parsed: unknown = JSON.parse(raw)
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object")
      body = parsed as Record<string, unknown>
    } catch {
      return json({ ok: false, error: "invalid_request" }, 400)
    }

    // Bots that fill the hidden field get a normal-looking success, and nothing is sent.
    if (typeof body[HONEYPOT_FIELD] === "string" && body[HONEYPOT_FIELD].trim() !== "") {
      return json({ ok: true }, 200)
    }

    const result = validateContact(body)
    if (!result.ok) return json({ ok: false, error: "validation", fields: result.errors }, 422)

    const send = getSender()
    if (!send) {
      console.error("[contact] email delivery is not configured (RESEND_API_KEY / CONTACT_FROM_EMAIL)")
      return json({ ok: false, error: "unavailable" }, 503)
    }

    const sent = await send(buildInquiryEmail(result.data))
    if (!sent.ok) return json({ ok: false, error: "delivery_failed" }, 502)
    return json({ ok: true }, 200)
  }
}

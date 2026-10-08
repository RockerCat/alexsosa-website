import { describe, expect, it, vi } from "vitest"
import { buildInquiryEmail, escapeHtml } from "./email"
import { createContactHandler } from "./handler"
import type { InquirySender } from "./send"
import { LIMITS, MAX_BODY_BYTES, validateContact } from "./validation"

const valid = {
  name: "Ana Pérez",
  email: "ana@empresa.co",
  company: "Empresa SAS",
  service: "automation",
  message: "We want to automate our invoicing process.",
  locale: "es",
  website: "",
}

function request(body: unknown, init: { headers?: Record<string, string>; raw?: string } = {}) {
  const payload = init.raw ?? JSON.stringify(body)
  return new Request("https://www.alexsosa.me/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      host: "www.alexsosa.me",
      origin: "https://www.alexsosa.me",
      ...init.headers,
    },
    body: payload,
  })
}

function setup({ sender }: { sender?: InquirySender | null } = {}) {
  const send = sender === undefined ? vi.fn<InquirySender>(async () => ({ ok: true, id: "email_123" })) : sender
  const handle = createContactHandler({ getSender: () => send })
  return { handle, send }
}

describe("validateContact", () => {
  it("accepts a complete inquiry and trims values", () => {
    const result = validateContact({ ...valid, name: "  Ana  " })
    expect(result.ok && result.data.name).toBe("Ana")
    expect(result.ok && result.data.locale).toBe("es")
  })

  it("requires name, email, service, and message; company is optional", () => {
    const result = validateContact({ company: "" })
    expect(result).toEqual({
      ok: false,
      errors: { name: "required", email: "required", service: "required", message: "required" },
    })
  })

  it.each(["not-an-email", "a@b", "a b@c.com", "a@b.com\r\nBcc: x@y.com", "<a@b.com>"])("rejects invalid email %j", (email) => {
    const result = validateContact({ ...valid, email })
    expect(!result.ok && result.errors.email).toBe("invalid")
  })

  it("rejects services outside the whitelist", () => {
    const result = validateContact({ ...valid, service: "free-website" })
    expect(!result.ok && result.errors.service).toBe("invalid")
  })

  it("enforces length limits", () => {
    const result = validateContact({ ...valid, message: "x".repeat(LIMITS.message + 1), name: "n".repeat(LIMITS.name + 1) })
    expect(!result.ok && result.errors).toEqual({ message: "tooLong", name: "tooLong" })
  })

  it("falls back to English for an unknown locale", () => {
    const result = validateContact({ ...valid, locale: "fr" })
    expect(result.ok && result.data.locale).toBe("en")
  })
})

describe("buildInquiryEmail", () => {
  it("escapes user content in the HTML body and uses the visitor only as Reply-To", () => {
    const result = validateContact({ ...valid, name: '<script>alert("x")</script>', message: "<b>hi</b> & bye" })
    if (!result.ok) throw new Error("expected valid input")
    const email = buildInquiryEmail(result.data)
    expect(email.html).not.toContain("<script>")
    expect(email.html).toContain("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;")
    expect(email.html).toContain("&lt;b&gt;hi&lt;/b&gt; &amp; bye")
    expect(email.replyTo).toBe("ana@empresa.co")
    expect(email.subject).toBe("New website inquiry — Business process automation")
    expect(email.text).toContain("Language: Spanish")
    expect(email.text).toContain("Company: Empresa SAS")
  })

  it("escapeHtml covers the five HTML-significant characters", () => {
    expect(escapeHtml(`<>&"'`)).toBe("&lt;&gt;&amp;&quot;&#39;")
  })
})

describe("POST /api/contact handler", () => {
  it("sends a valid inquiry once and reports success only after the provider accepts it", async () => {
    const { handle, send } = setup()
    const response = await handle(request(valid))
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
    expect(send).toHaveBeenCalledTimes(1)
    const email = vi.mocked(send!).mock.calls[0][0]
    expect(email.replyTo).toBe(valid.email)
    expect(email.subject).toContain("Business process automation")
  })

  it("returns field errors for missing required fields without sending", async () => {
    const { handle, send } = setup()
    const response = await handle(request({ ...valid, name: "", message: " " }))
    expect(response.status).toBe(422)
    expect(await response.json()).toEqual({ ok: false, error: "validation", fields: { name: "required", message: "required" } })
    expect(send).not.toHaveBeenCalled()
  })

  it("rejects an invalid email and an invalid service", async () => {
    const { handle } = setup()
    const response = await handle(request({ ...valid, email: "nope", service: "hack" }))
    expect(response.status).toBe(422)
    expect((await response.json()).fields).toEqual({ email: "invalid", service: "invalid" })
  })

  it("rejects oversized bodies by declared and by actual size", async () => {
    const { handle, send } = setup()
    const declared = await handle(request(valid, { headers: { "content-length": String(MAX_BODY_BYTES + 1) } }))
    expect(declared.status).toBe(413)
    const actual = await handle(request({ ...valid, message: "x".repeat(MAX_BODY_BYTES) }))
    expect(actual.status).toBe(413)
    expect(send).not.toHaveBeenCalled()
  })

  it("silently drops honeypot submissions", async () => {
    const { handle, send } = setup()
    const response = await handle(request({ ...valid, website: "https://spam.example" }))
    expect(response.status).toBe(200)
    expect(send).not.toHaveBeenCalled()
  })

  it("reports a delivery failure when the provider rejects the message", async () => {
    const { handle } = setup({ sender: vi.fn<InquirySender>(async () => ({ ok: false })) })
    const response = await handle(request(valid))
    expect(response.status).toBe(502)
    expect(await response.json()).toEqual({ ok: false, error: "delivery_failed" })
  })

  it("returns 503 when email delivery is not configured", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    const { handle } = setup({ sender: null })
    const response = await handle(request(valid))
    expect(response.status).toBe(503)
    expect(await response.json()).toEqual({ ok: false, error: "unavailable" })
  })

  it("rejects cross-origin posts, non-JSON bodies, and malformed JSON", async () => {
    const { handle, send } = setup()
    expect((await handle(request(valid, { headers: { origin: "https://evil.example" } }))).status).toBe(403)
    expect((await handle(request(valid, { headers: { "content-type": "text/plain" } }))).status).toBe(415)
    expect((await handle(request(null, { raw: "{not json" }))).status).toBe(400)
    expect((await handle(request(null, { raw: "[1,2]" }))).status).toBe(400)
    expect(send).not.toHaveBeenCalled()
  })

  it("does not log submitted content", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {})
    const { handle } = setup({ sender: null })
    await handle(request(valid))
    const logged = JSON.stringify(log.mock.calls)
    expect(logged).not.toContain(valid.email)
    expect(logged).not.toContain(valid.message)
  })
})

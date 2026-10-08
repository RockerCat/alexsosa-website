import { isLocale, type Locale } from "@/lib/i18n"

// Shared by the contact form (client) and the /api/contact endpoint (server).

export const SERVICES = ["automation", "product", "consulting", "other"] as const
export type Service = (typeof SERVICES)[number]

export const LIMITS = {
  name: 100,
  company: 120,
  email: 254,
  message: 5000,
} as const

/** Largest request body the endpoint will read (all fields at their limits fit well within this). */
export const MAX_BODY_BYTES = 16 * 1024

export type ContactField = "name" | "email" | "company" | "service" | "message"
export type FieldError = "required" | "invalid" | "tooLong"
export type FieldErrors = Partial<Record<ContactField, FieldError>>

export type ContactInput = {
  name: string
  email: string
  company: string
  service: Service
  message: string
  locale: Locale
}

// Pragmatic address check: one @, no whitespace or header-breaking characters, a dotted domain.
const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:".]+(\.[^\s@<>()[\]\\,;:".]+)+$/

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

export function isService(value: unknown): value is Service {
  return typeof value === "string" && (SERVICES as readonly string[]).includes(value)
}

export function validateContact(
  raw: unknown,
): { ok: true; data: ContactInput } | { ok: false; errors: FieldErrors } {
  const input = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>
  const name = text(input.name)
  const email = text(input.email)
  const company = text(input.company)
  const message = text(input.message)
  const errors: FieldErrors = {}

  if (!name) errors.name = "required"
  else if (name.length > LIMITS.name) errors.name = "tooLong"

  if (!email) errors.email = "required"
  else if (email.length > LIMITS.email) errors.email = "tooLong"
  else if (!EMAIL_PATTERN.test(email)) errors.email = "invalid"

  if (company.length > LIMITS.company) errors.company = "tooLong"

  if (!input.service) errors.service = "required"
  else if (!isService(input.service)) errors.service = "invalid"

  if (!message) errors.message = "required"
  else if (message.length > LIMITS.message) errors.message = "tooLong"

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  const locale = typeof input.locale === "string" && isLocale(input.locale) ? input.locale : "en"
  return { ok: true, data: { name, email, company, service: input.service as Service, message, locale } }
}

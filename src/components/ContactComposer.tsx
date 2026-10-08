"use client"

import { useId, useRef, useState, type FormEvent } from "react"
import type { Dictionary } from "@/content"
import type { ContactErrorCode, ContactResponse } from "@/lib/contact/handler"
import { LIMITS, validateContact, type ContactField, type FieldError, type FieldErrors } from "@/lib/contact/validation"
import type { Locale } from "@/lib/i18n"
import { ArrowRight } from "./Icons"

type Status = { kind: "idle" } | { kind: "pending" } | { kind: "success" } | { kind: "error"; message: string }

const FIELD_ORDER: ContactField[] = ["name", "email", "company", "service", "message"]

/**
 * Inquiry form. Validates in the browser with the same rules the server enforces, then posts to
 * /api/contact, which delivers the inquiry by email. Entered data is kept on failure and cleared only
 * once the email provider has accepted the message.
 */
export function ContactComposer({ email, copy, locale }: { email: string; copy: Dictionary["contact"]; locale: Locale }) {
  const id = useId()
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>({ kind: "idle" })
  const pendingRef = useRef(false)
  const statusRef = useRef<HTMLDivElement>(null)

  function messageFor(fieldName: ContactField, fieldError: FieldError): string {
    if (fieldError === "tooLong") return copy.errors.tooLong
    if (fieldName === "email") return fieldError === "invalid" ? copy.errors.emailInvalid : copy.errors.email
    if (fieldName === "service") return copy.errors.service
    if (fieldName === "name") return copy.errors.name
    if (fieldName === "message") return copy.errors.message
    return copy.errors.tooLong
  }

  function failureMessage(code: ContactErrorCode | "network"): string {
    if (code === "network") return copy.failure.network
    return copy.failure.delivery
  }

  function focusFirstInvalid(form: HTMLFormElement, fieldErrors: FieldErrors) {
    const first = FIELD_ORDER.find((f) => fieldErrors[f])
    if (!first) return
    const selector = first === "service" ? "[name=topic]" : `[name=${first}]`
    form.querySelector<HTMLElement>(selector)?.focus()
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Synchronous guard: blocks a second submit before React re-renders the disabled button.
    if (pendingRef.current) return
    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      service: String(data.get("topic") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
      locale,
    }

    const check = validateContact(payload)
    if (!check.ok) {
      setErrors(check.errors)
      setStatus({ kind: "idle" })
      focusFirstInvalid(form, check.errors)
      return
    }

    setErrors({})
    pendingRef.current = true
    setStatus({ kind: "pending" })

    let next: Status
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const result = (await response.json().catch(() => null)) as ContactResponse | null

      if (response.ok && result?.ok) {
        form.reset()
        next = { kind: "success" }
      } else if (result && !result.ok && result.error === "validation" && result.fields) {
        setErrors(result.fields)
        focusFirstInvalid(form, result.fields)
        next = { kind: "error", message: copy.errors.summary }
      } else {
        next = { kind: "error", message: failureMessage(result && !result.ok ? result.error : "delivery_failed") }
      }
    } catch {
      next = { kind: "error", message: failureMessage("network") }
    }

    pendingRef.current = false
    setStatus(next)
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  const pending = status.kind === "pending"
  const field =
    "mt-2 block w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-accent-ink focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-60 aria-[invalid=true]:border-[#b42318]"
  const label = "text-sm font-medium text-ink"
  const errorClass = "mt-2 text-sm text-[#b42318]"

  function describedBy(name: ContactField, extra?: string) {
    return [errors[name] ? `${id}-${name}-error` : null, extra].filter(Boolean).join(" ") || undefined
  }

  function fieldMessage(name: ContactField) {
    const fieldError = errors[name]
    if (!fieldError) return null
    return (
      <p id={`${id}-${name}-error`} className={errorClass}>
        {messageFor(name, fieldError)}
      </p>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6" aria-describedby={`${id}-note`} aria-busy={pending}>
      {/* Honeypot: invisible to people and assistive tech; bots that fill it are silently ignored. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <fieldset disabled={pending} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-name`} className={label}>
              {copy.fields.name}
            </label>
            <input
              id={`${id}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={LIMITS.name}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy("name")}
              className={field}
            />
            {fieldMessage("name")}
          </div>
          <div>
            <label htmlFor={`${id}-email`} className={label}>
              {copy.fields.email}
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              required
              maxLength={LIMITS.email}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email", `${id}-email-hint`)}
              className={field}
            />
            <p id={`${id}-email-hint`} className="sr-only">
              {copy.fields.emailHint}
            </p>
            {fieldMessage("email")}
          </div>
        </div>

        <div>
          <label htmlFor={`${id}-company`} className={label}>
            {copy.fields.company} <span className="font-normal text-muted">({copy.fields.optional})</span>
          </label>
          <input
            id={`${id}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.company}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={describedBy("company")}
            className={field}
          />
          {fieldMessage("company")}
        </div>

        <fieldset aria-describedby={describedBy("service")}>
          <legend className={label}>{copy.fields.topic}</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {copy.topics.map((topic, i) => (
              <label
                key={topic.value}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-[0.9375rem] transition-colors hover:border-ink/40 has-[:checked]:border-accent-ink has-[:checked]:bg-accent/[0.07] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent-ink"
              >
                <input
                  type="radio"
                  name="topic"
                  value={topic.value}
                  required
                  defaultChecked={i === 0}
                  className="h-4 w-4 accent-[#0a746c] focus:outline-none"
                />
                {topic.label}
              </label>
            ))}
          </div>
          {fieldMessage("service")}
        </fieldset>

        <div>
          <label htmlFor={`${id}-message`} className={label}>
            {copy.fields.message}
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={6}
            required
            maxLength={LIMITS.message}
            placeholder={copy.fields.messagePlaceholder}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message")}
            className={`${field} resize-y`}
          />
          {fieldMessage("message")}
        </div>
      </fieldset>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${id}-note`} className="max-w-sm text-sm leading-relaxed text-muted">
          {copy.formNote}
        </p>
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2.5 rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-paper transition-colors hover:bg-ink-2 disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" aria-hidden />
              {copy.sending}
            </>
          ) : (
            <>
              {copy.submit}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="focus:outline-none">
        {status.kind === "success" && (
          <p className="rounded-xl border border-accent-ink/30 bg-accent/[0.08] px-4 py-3 text-[0.9375rem] leading-relaxed text-ink">
            {copy.success}
          </p>
        )}
        {status.kind === "error" && (
          <p className="rounded-xl border border-[#b42318]/30 bg-[#b42318]/[0.06] px-4 py-3 text-[0.9375rem] leading-relaxed text-ink">
            {status.message}{" "}
            {status.message !== copy.errors.summary && (
              <a href={`mailto:${email}`} className="font-medium text-accent-ink underline underline-offset-2">
                {email}
              </a>
            )}
          </p>
        )}
      </div>
    </form>
  )
}

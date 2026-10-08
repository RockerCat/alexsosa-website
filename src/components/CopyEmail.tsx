"use client"

import { useState } from "react"
import { Check, Copy } from "./Icons"

export function CopyEmail({ email, labels }: { email: string; labels: { copy: string; copied: string; copyFailed: string } }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle")

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setState("copied")
    } catch {
      setState("failed")
    }
    window.setTimeout(() => setState("idle"), 3000)
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-ink/20 px-4 text-sm font-medium transition-colors hover:border-ink"
      >
        {state === "copied" ? <Check size={16} className="text-accent-ink" /> : <Copy size={16} />}
        {state === "copied" ? labels.copied : labels.copy}
      </button>
      <p role="status" aria-live="polite" className="text-sm text-muted">
        {state === "failed" ? labels.copyFailed : ""}
      </p>
    </div>
  )
}

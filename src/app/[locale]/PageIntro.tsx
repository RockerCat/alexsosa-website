import type { ReactNode } from "react"

/** Shared page opener for inner pages: eyebrow, H1, and lead paragraph. */
export function PageIntro({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children?: ReactNode }) {
  return (
    <section className="border-b border-line">
      <div className="container-site pb-16 pt-14 sm:pt-20 lg:pb-24 lg:pt-28">
        <p className="eyebrow rise">{eyebrow}</p>
        <h1 className="display rise mt-6 max-w-[20ch] text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem]" style={{ "--rise-delay": "80ms" } as React.CSSProperties}>
          {title}
        </h1>
        <p className="rise mt-8 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl" style={{ "--rise-delay": "160ms" } as React.CSSProperties}>
          {lead}
        </p>
        {children}
      </div>
    </section>
  )
}

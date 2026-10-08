import type { ReactNode } from "react"

export function SectionHeader({
  eyebrow,
  title,
  intro,
  as: Heading = "h2",
  aside,
  id,
}: {
  eyebrow: string
  title: string
  intro?: string
  as?: "h1" | "h2"
  aside?: ReactNode
  id?: string
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
      <div className="max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <Heading id={id} className="display mt-5 text-[2.25rem] sm:text-5xl lg:text-[3.5rem]">{title}</Heading>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  )
}

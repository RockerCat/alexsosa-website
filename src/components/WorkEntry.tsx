import type { Dictionary } from "@/content"
import { ArrowUpRight } from "./Icons"

type WorkItem = Dictionary["work"]["items"][number]

export function KindBadge({ kind, labels }: { kind: WorkItem["kind"]; labels: Dictionary["work"]["kinds"] }) {
  const label = labels[kind as keyof typeof labels]
  // Alex's own work (products, games, platforms) uses the accent; roles and companies stay neutral.
  const tone =
    kind === "product" || kind === "game" || kind === "platform"
      ? "border-accent-ink/30 bg-accent/10 text-accent-ink"
      : "border-line bg-paper-2 text-ink-2"
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tone}`}>
      {label}
    </span>
  )
}

function ExternalLinks({ item, dict }: { item: WorkItem; dict: Dictionary }) {
  if (!("links" in item) || !item.links?.length) return null
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2">
      {item.links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink"
          >
            <span className="link-underline">{link.label}</span>
            <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only">
              ({item.name}, {dict.common.opensInNewTab})
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

/** Compact row used on the home page. */
export function WorkRow({ item, dict, index }: { item: WorkItem; dict: Dictionary; index: number }) {
  return (
    <li className="grid gap-4 border-t border-line py-8 md:grid-cols-12 md:gap-8 md:py-10" data-reveal style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}>
      <div className="md:col-span-4">
        <KindBadge kind={item.kind} labels={dict.work.kinds} />
        <h3 className="display mt-4 text-[2rem] sm:text-[2.5rem]">{item.name}</h3>
        <p className="mt-1 text-sm text-muted">{item.sector}</p>
      </div>
      <div className="flex flex-col gap-4 md:col-span-7 md:col-start-6">
        <p className="text-[1.0625rem] leading-relaxed text-ink-2">{item.summary}</p>
        <ExternalLinks item={item} dict={dict} />
      </div>
    </li>
  )
}

/** Detailed case entry used on the Work page. */
export function WorkCase({ item, dict }: { item: WorkItem; dict: Dictionary }) {
  return (
    <article id={item.id} className="grid scroll-mt-28 gap-6 border-t border-line py-12 md:grid-cols-12 md:gap-8 md:py-16" data-reveal>
      <header className="md:col-span-4">
        <KindBadge kind={item.kind} labels={dict.work.kinds} />
        <h3 className="display mt-4 text-[2.25rem] sm:text-5xl">{item.name}</h3>
        <p className="mt-2 text-sm text-muted">{item.sector}</p>
      </header>
      <div className="md:col-span-7 md:col-start-6">
        <p className="text-lg leading-relaxed text-ink">{item.summary}</p>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{dict.work.challengeLabel}</dt>
            <dd className="mt-2 leading-relaxed text-ink-2">{item.challenge}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{dict.work.roleLabel}</dt>
            <dd className="mt-2 leading-relaxed text-ink-2">{item.role}</dd>
          </div>
          {"recognition" in item && item.recognition && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{dict.work.recognitionLabel}</dt>
              <dd className="mt-2">
                <ul className="space-y-1.5 text-ink-2">
                  {item.recognition.map((r) => (
                    <li key={r} className="flex gap-3">
                      <span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent-ink" aria-hidden />
                      {r}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
        <div className="mt-8">
          <ExternalLinks item={item} dict={dict} />
        </div>
      </div>
    </article>
  )
}

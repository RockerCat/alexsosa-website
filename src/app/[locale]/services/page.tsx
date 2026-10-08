import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { FinalCta } from "@/components/FinalCta"
import { getDictionary } from "@/content"
import { isLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/metadata"
import { PageIntro } from "../PageIntro"

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? pageMetadata(locale, "services", "/services") : {}
}

function List({ title, items, accent = false }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{title}</h4>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed text-ink-2">
            <span className={`mt-[0.7em] h-px w-3 shrink-0 ${accent ? "bg-accent-ink" : "bg-ink/40"}`} aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const t = dict.services

  return (
    <>
      <PageIntro eyebrow={t.eyebrow} title={t.title} lead={t.lead}>
        <nav aria-label={t.eyebrow} className="rise mt-12" style={{ "--rise-delay": "240ms" } as React.CSSProperties}>
          <ol className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
            {t.items.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="group inline-flex items-baseline gap-3 text-ink">
                  <span className="font-medium tabular-nums text-accent-ink">0{i + 1}</span>
                  <span className="link-underline font-medium">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </PageIntro>

      {t.items.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          aria-labelledby={`${service.id}-title`}
          className={`scroll-mt-20 py-20 lg:py-28 ${i % 2 === 1 ? "bg-paper-2" : ""} ${i > 0 ? "border-t border-line" : ""}`}
        >
          <div className="container-site grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <span className="font-medium tabular-nums text-2xl text-accent-ink" aria-hidden>
                0{i + 1}
              </span>
              <h2 id={`${service.id}-title`} className="display mt-4 text-[2.25rem] sm:text-5xl">
                {service.title}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-2">{service.summary}</p>
              <p className="mt-8 border-l-2 border-accent pl-5 text-lg leading-relaxed text-ink">{service.outcome}</p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7" data-reveal>
              <div className="sm:col-span-2">
                <List title={t.problemsTitle} items={service.problems} />
              </div>
              <List title={t.deliverTitle} items={service.deliver} />
              <List title={t.outcomesTitle} items={service.outcomes} accent />
            </div>
          </div>
        </section>
      ))}

      {/* Process */}
      <section aria-labelledby="process-title" className="border-t border-line py-24 lg:py-32">
        <div className="container-site">
          <div data-reveal>
            <p className="eyebrow">{t.processEyebrow}</p>
            <h2 id="process-title" className="display mt-5 text-[2.25rem] sm:text-5xl lg:text-[3.5rem]">
              {t.processTitle}
            </h2>
          </div>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {t.process.map((step, i) => (
              <li
                key={step.title}
                className="border-t border-ink pt-6"
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <span className="font-medium tabular-nums text-xl text-accent-ink" aria-hidden>
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-2">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Responsible AI */}
      <section aria-labelledby="ai-title" className="border-t border-line bg-paper-2 py-24 lg:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">{t.aiEyebrow}</p>
            <h2 id="ai-title" className="display mt-5 text-[2.25rem] sm:text-5xl lg:text-[3.5rem]">
              {t.aiTitle}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            {t.aiBody.map((p) => (
              <p key={p.slice(0, 24)} className="mb-6 text-lg leading-relaxed text-ink-2">
                {p}
              </p>
            ))}
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {t.aiPrinciples.map((principle) => (
                <li key={principle} className="flex items-center gap-4 py-4 font-medium">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FinalCta locale={locale} dict={dict} title={t.ctaTitle} body={t.ctaBody} />
    </>
  )
}

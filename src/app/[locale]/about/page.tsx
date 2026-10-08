import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Button } from "@/components/Button"
import { FinalCta } from "@/components/FinalCta"
import { Download, LinkedIn } from "@/components/Icons"
import { getDictionary } from "@/content"
import { site } from "@/content/site"
import { isLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/metadata"
import { PageIntro } from "../PageIntro"

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? pageMetadata(locale, "about", "/about") : {}
}

function CredentialList({ id, title, items }: { id: string; title: string; items: { title: string; detail: string }[] }) {
  return (
    <div data-reveal>
      <h2 id={id} className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {title}
      </h2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <li key={item.title} className="py-5">
            <p className="font-medium leading-snug text-ink">{item.title}</p>
            <p className="mt-1 text-sm text-muted">{item.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const t = dict.about

  const secondaryActions = (
    <>
      <Button href={site.cv[locale]} variant="secondary" download icon={<Download size={16} />}>
        {dict.common.downloadCv}
      </Button>
      <Button href={site.linkedin} variant="secondary" external icon={<LinkedIn size={15} />}>
        {dict.common.linkedinProfile}
        <span className="sr-only"> ({dict.common.opensInNewTab})</span>
      </Button>
    </>
  )

  return (
    <>
      <PageIntro eyebrow={t.eyebrow} title={t.title} lead={t.lead}>
        <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ "--rise-delay": "240ms" } as React.CSSProperties}>
          {secondaryActions}
        </div>
      </PageIntro>

      <section aria-label={t.eyebrow} className="py-20 lg:py-28">
        <div className="container-site">
          <ol className="divide-y divide-line border-y border-line">
            {t.sections.map((section) => (
              <li key={section.title} className="grid gap-4 py-10 md:grid-cols-12 md:gap-8 md:py-14" data-reveal>
                <h2 className="display text-3xl sm:text-4xl md:col-span-4">{section.title}</h2>
                <p className="text-lg leading-relaxed text-ink-2 md:col-span-7 md:col-start-6">{section.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="bg-paper-2 py-20 lg:py-28">
        <div className="container-site">
          <h2 id="principles-title" className="display text-[2.25rem] sm:text-5xl" data-reveal>
            {t.principlesTitle}
          </h2>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {t.principles.map((p, i) => (
              <li
                key={p.title}
                className="border-t border-ink pt-6"
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              >
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-2">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-16">
          <CredentialList id="education-title" title={t.educationTitle} items={t.education} />
          <CredentialList id="recognition-title" title={t.recognitionTitle} items={t.recognition} />
        </div>
        <div className="container-site mt-16" data-reveal>
          <div className="flex flex-col gap-6 rounded-2xl border border-line p-7 sm:p-9 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">{t.actionsTitle}</h2>
              <p className="mt-1 text-muted">{t.actionsBody}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">{secondaryActions}</div>
          </div>
        </div>
      </section>

      <FinalCta locale={locale} dict={dict} />
    </>
  )
}

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ContactComposer } from "@/components/ContactComposer"
import { CopyEmail } from "@/components/CopyEmail"
import { LinkedIn, Mail } from "@/components/Icons"
import { getDictionary } from "@/content"
import { site } from "@/content/site"
import { isLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/metadata"

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? pageMetadata(locale, "contact", "/contact") : {}
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const t = dict.contact

  return (
    <section className="pb-24 lg:pb-32">
      <div className="container-site pt-14 sm:pt-20 lg:pt-28">
        <p className="eyebrow rise">{t.eyebrow}</p>
        <h1 className="display rise mt-6 max-w-[18ch] text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem]" style={{ "--rise-delay": "80ms" } as React.CSSProperties}>
          {t.title}
        </h1>
        <p className="rise mt-8 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl" style={{ "--rise-delay": "160ms" } as React.CSSProperties}>
          {t.lead}
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="rise rounded-3xl border border-line bg-paper-2 p-6 sm:p-10 lg:col-span-7" style={{ "--rise-delay": "240ms" } as React.CSSProperties}>
            <h2 className="text-xl font-semibold tracking-tight">{t.formTitle}</h2>
            <div className="mt-8">
              <ContactComposer email={site.email} copy={t} locale={locale} />
            </div>
          </div>

          <aside className="space-y-12 lg:col-span-5" aria-label={t.directTitle}>
            <div>
              <h2 className="text-xl font-semibold tracking-tight">{t.directTitle}</h2>
              <p className="mt-2 text-muted">{t.directBody}</p>
              <a
                href={`mailto:${site.email}`}
                className="group mt-6 flex items-center gap-3 break-all text-[1.375rem] font-semibold leading-tight tracking-tight text-ink sm:text-[1.625rem]"
              >
                <Mail size={22} className="shrink-0 text-accent-ink" />
                <span className="link-underline">{site.email}</span>
              </a>
              <div className="mt-5 flex flex-wrap items-start gap-3">
                <CopyEmail email={site.email} labels={{ copy: t.copy, copied: t.copied, copyFailed: t.copyFailed }} />
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-4 text-sm font-medium transition-colors hover:border-ink"
                >
                  <LinkedIn size={14} />
                  {dict.common.linkedinProfile}
                  <span className="sr-only"> ({dict.common.opensInNewTab})</span>
                </a>
              </div>
            </div>

            <div className="border-t border-line pt-10">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{t.tipsTitle}</h2>
              <ol className="mt-5 space-y-4">
                {t.tips.map((tip, i) => (
                  <li key={tip} className="flex gap-4 leading-relaxed text-ink-2">
                    <span className="font-medium tabular-nums text-lg leading-snug text-accent-ink" aria-hidden>
                      0{i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Button, TextLink } from "@/components/Button"
import { FinalCta } from "@/components/FinalCta"
import { SectionHeader } from "@/components/SectionHeader"
import { WorkRow } from "@/components/WorkEntry"
import { getDictionary } from "@/content"
import { site } from "@/content/site"
import { isLocale, localePath } from "@/lib/i18n"
import { pageMetadata } from "@/lib/metadata"

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? pageMetadata(locale, "home", "/") : {}
}

const featuredWork = ["mi-padel-club", "odentia", "solardesk", "tejo-y-minitejo"]

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const t = dict.home

  // Only verifiable identity facts; no invented claims.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: locale === "es" ? "Consultor tecnológico" : "Technology Consultant",
    sameAs: [site.linkedin, site.github],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-site pb-20 pt-14 sm:pt-20 lg:pb-28 lg:pt-28">
          <p className="eyebrow rise">{t.eyebrow}</p>
          <h1
            className="display rise mt-7 max-w-[20ch] text-[2.5rem] sm:text-[3.5rem] lg:text-[4.75rem]"
            style={{ "--rise-delay": "80ms" } as React.CSSProperties}
          >
            {t.title} <span className="text-accent-ink">{t.titleEmphasis}</span>
          </h1>
          <p
            className="rise mt-9 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl"
            style={{ "--rise-delay": "160ms" } as React.CSSProperties}
          >
            {t.lead}
          </p>
          <div
            className="rise mt-10 flex flex-col gap-3 sm:flex-row"
            style={{ "--rise-delay": "220ms" } as React.CSSProperties}
          >
            <Button href={localePath(locale, "/contact")} arrow>
              {t.ctaPrimary}
            </Button>
            <Button href={localePath(locale, "/work")} variant="secondary">
              {t.ctaSecondary}
            </Button>
          </div>
          <p
            className="rise mt-14 flex items-center gap-3 text-sm text-muted"
            style={{ "--rise-delay": "260ms" } as React.CSSProperties}
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
            {t.location}
          </p>
        </div>
      </section>

      {/* Credibility */}
      <section aria-labelledby="credibility-title" className="border-y border-line bg-paper-2">
        <div className="container-site py-14 lg:py-16">
          <h2 id="credibility-title" className="sr-only">
            {t.credibilityLabel}
          </h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-10">
            {t.facts.map((fact, i) => (
              <div
                key={fact.label}
                className="flex flex-col-reverse justify-end gap-2 border-l border-line pl-5"
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              >
                <dt className="text-sm leading-snug text-muted sm:text-[0.9375rem]">{fact.label}</dt>
                <dd className="display text-5xl tabular-nums text-ink sm:text-6xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-12 flex flex-col gap-3 border-t border-line pt-8 text-sm text-ink-2 md:flex-row md:flex-wrap md:gap-x-10" data-reveal>
            {t.credentials.map((c) => (
              <li key={c} className="flex items-center gap-3">
                <span className="h-px w-4 shrink-0 bg-accent-ink" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services-title" className="py-24 lg:py-32">
        <div className="container-site">
          <SectionHeader
            id="services-title"
            eyebrow={t.servicesEyebrow}
            title={t.servicesTitle}
            intro={t.servicesIntro}
            aside={<TextLink href={localePath(locale, "/services")}>{t.servicesLink}</TextLink>}
          />
          <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {dict.services.items.map((service, i) => (
              <li
                key={service.id}
                className="flex flex-col bg-paper p-7 sm:p-9"
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <span className="font-medium tabular-nums text-xl text-accent-ink" aria-hidden>
                  0{i + 1}
                </span>
                <h3 className="mt-8 text-xl font-semibold tracking-tight">
                  <a href={`${localePath(locale, "/services")}#${service.id}`} className="hover:text-accent-ink">
                    {service.title}
                  </a>
                </h3>
                <p className="mt-4 leading-relaxed text-ink-2">{service.summary}</p>
                <div className="mt-auto pt-8">
                  <p className="border-t border-line pt-5 text-[0.9375rem] leading-relaxed">
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted">{t.outcomeLabel}</span>
                    <span className="mt-2 block text-ink">{service.outcome}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Selected work */}
      <section aria-labelledby="work-title" className="border-t border-line py-24 lg:py-32">
        <div className="container-site">
          <SectionHeader
            id="work-title"
            eyebrow={t.workEyebrow}
            title={t.workTitle}
            intro={t.workIntro}
            aside={<TextLink href={localePath(locale, "/work")}>{t.workLink}</TextLink>}
          />
          <ul className="mt-14 border-b border-line">
            {featuredWork
              .map((id) => dict.work.items.find((item) => item.id === id))
              .filter((item) => item !== undefined)
              .map((item, i) => (
                <WorkRow key={item.id} item={item} dict={dict} index={i} />
              ))}
          </ul>
        </div>
      </section>

      {/* Introduction */}
      <section aria-labelledby="intro-title" className="bg-paper-2 py-24 lg:py-32">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">{t.aboutEyebrow}</p>
            <h2 id="intro-title" className="display mt-5 text-[2.25rem] sm:text-5xl lg:text-[3.5rem]">
              {t.aboutTitle}
            </h2>
          </div>
          <div className="space-y-6 lg:col-span-6 lg:col-start-7 lg:pt-12" data-reveal>
            {t.aboutBody.map((p) => (
              <p key={p.slice(0, 24)} className="text-lg leading-relaxed text-ink-2">
                {p}
              </p>
            ))}
            <div className="pt-2">
              <TextLink href={localePath(locale, "/about")}>{t.aboutLink}</TextLink>
            </div>
          </div>
        </div>
      </section>

      <FinalCta locale={locale} dict={dict} />
    </>
  )
}

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { FinalCta } from "@/components/FinalCta"
import { WorkCase } from "@/components/WorkEntry"
import { getDictionary } from "@/content"
import { isLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/metadata"
import { PageIntro } from "../PageIntro"

export async function generateMetadata({ params }: PageProps<"/[locale]/work">): Promise<Metadata> {
  const { locale } = await params
  return isLocale(locale) ? pageMetadata(locale, "work", "/work") : {}
}

export default async function WorkPage({ params }: PageProps<"/[locale]/work">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const t = dict.work
  const items = t.items.filter((item) => !item.hidden)
  const products = items.filter((item) => item.kind === "product" || item.kind === "game")
  const platforms = items.filter((item) => item.kind === "platform")
  const experience = items.filter((item) => item.kind === "employment" || item.kind === "company")

  return (
    <>
      <PageIntro eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <section aria-labelledby="products-title" className="py-20 lg:py-28">
        <div className="container-site">
          <div className="max-w-3xl" data-reveal>
            <h2 id="products-title" className="display text-[2.25rem] sm:text-5xl">
              {t.productsTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{t.productsIntro}</p>
          </div>
          <div className="mt-12 border-b border-line">
            {products.map((item) => (
              <WorkCase key={item.id} item={item} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="platforms-title" className="border-t border-line bg-paper-2 py-20 lg:py-28">
        <div className="container-site">
          <div className="max-w-3xl" data-reveal>
            <h2 id="platforms-title" className="display text-[2.25rem] sm:text-5xl">
              {t.platformsTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{t.platformsIntro}</p>
          </div>
          <div className="mt-12 border-b border-line">
            {platforms.map((item) => (
              <WorkCase key={item.id} item={item} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="experience-title" className="border-t border-line py-20 lg:py-28">
        <div className="container-site">
          <div className="max-w-3xl" data-reveal>
            <h2 id="experience-title" className="display text-[2.25rem] sm:text-5xl">
              {t.experienceTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{t.experienceIntro}</p>
          </div>
          <div className="mt-12">
            {experience.map((item) => (
              <WorkCase key={item.id} item={item} dict={dict} />
            ))}
          </div>

          <div className="mt-4 border-t border-line pt-12" data-reveal>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{t.earlierTitle}</h3>
            <ul className="mt-6 grid gap-8 md:grid-cols-2">
              {t.earlier.map((role) => (
                <li key={role.name}>
                  <p className="text-lg font-semibold tracking-tight">{role.name}</p>
                  <p className="mt-1 text-sm text-muted">{role.role}</p>
                  <p className="mt-3 leading-relaxed text-ink-2">{role.body}</p>
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

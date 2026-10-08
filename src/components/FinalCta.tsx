import type { Dictionary } from "@/content"
import { site } from "@/content/site"
import { localePath, type Locale } from "@/lib/i18n"
import { Button } from "./Button"
import { Mail } from "./Icons"
import { Logo } from "./Logo"

export function FinalCta({
  locale,
  dict,
  title = dict.finalCta.title,
  body = dict.finalCta.body,
}: {
  locale: Locale
  dict: Dictionary
  title?: string
  body?: string
}) {
  return (
    <section className="on-night bg-night text-on-night" aria-labelledby="final-cta-title">
      <div className="container-site grid items-center gap-10 py-20 md:grid-cols-12 md:py-28" data-reveal>
        <div className="md:col-span-3">
          <Logo size={140} className="rounded-none max-md:h-24 max-md:w-24" />
        </div>
        <div className="md:col-span-9">
          <h2 id="final-cta-title" className="display max-w-3xl text-[2.25rem] sm:text-5xl lg:text-[3.75rem]">
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-night-muted">{body}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={localePath(locale, "/contact")} variant="accent" arrow>
              {dict.common.letsTalk}
            </Button>
            <Button href={`mailto:${site.email}`} variant="ghost-night" icon={<Mail size={16} />}>
              {site.email}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

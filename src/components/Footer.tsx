import Link from "next/link"
import type { Dictionary } from "@/content"
import { site } from "@/content/site"
import { localePath, type Locale } from "@/lib/i18n"
import { GitHub, LinkedIn, Mail } from "./Icons"
import { Logo } from "./Logo"

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const nav = [
    { href: localePath(locale), label: dict.nav.home },
    { href: localePath(locale, "/services"), label: dict.nav.services },
    { href: localePath(locale, "/work"), label: dict.nav.work },
    { href: localePath(locale, "/about"), label: dict.nav.about },
    { href: localePath(locale, "/contact"), label: dict.nav.contact },
  ]
  const newTab = `(${dict.common.opensInNewTab})`

  return (
    <footer className="on-night border-t border-night-line bg-night text-on-night">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link href={localePath(locale)} className="inline-flex items-center gap-3" aria-label={dict.nav.homeLabel}>
            <Logo size={44} />
            <span className="text-lg font-semibold tracking-tight">Alex Sosa</span>
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed text-on-night-muted">{dict.footer.tagline}</p>
        </div>

        <nav aria-label={dict.footer.navTitle} className="md:col-span-3 md:col-start-7">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-on-night-muted">{dict.footer.navTitle}</h2>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-on-night/90 hover:text-on-night">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-on-night-muted">{dict.footer.connectTitle}</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 text-on-night/90 hover:text-on-night">
                <Mail size={16} className="text-accent" />
                <span className="link-underline break-all">{site.email}</span>
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-on-night/90 hover:text-on-night">
                <LinkedIn size={15} className="text-accent" />
                <span className="link-underline">{dict.common.linkedin}</span>
                <span className="sr-only">{newTab}</span>
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-on-night/90 hover:text-on-night">
                <GitHub size={15} className="text-accent" />
                <span className="link-underline">{dict.common.github}</span>
                <span className="sr-only">{newTab}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-night-line">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-on-night-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Alex Sosa. {dict.footer.rights}
          </p>
          <p>alexsosa.me</p>
        </div>
      </div>
    </footer>
  )
}

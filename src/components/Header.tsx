"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import type { Dictionary } from "@/content"
import { localePath, locales, switchLocalePath, type Locale } from "@/lib/i18n"
import { ArrowRight, Close, Menu } from "./Icons"
import { Logo } from "./Logo"

type Props = { locale: Locale; nav: Dictionary["nav"] }

export function Header({ locale, nav }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const links = [
    { href: localePath(locale, "/services"), label: nav.services },
    { href: localePath(locale, "/work"), label: nav.work },
    { href: localePath(locale, "/about"), label: nav.about },
    { href: localePath(locale, "/contact"), label: nav.contact },
  ]
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile menu on navigation.
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  const languageSwitcher = (
    <div className="flex items-center text-[0.8125rem] font-medium" role="group" aria-label={nav.language}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="px-1.5 text-line" aria-hidden>/</span>}
          <Link
            href={switchLocalePath(pathname, l)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            aria-label={l === "en" ? "English" : "Español"}
            className={`rounded px-1 py-1 uppercase tracking-wider transition-colors ${
              l === locale ? "text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  )

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-paper"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {nav.skip}
      </a>
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        <Link href={localePath(locale)} className="flex items-center gap-3" aria-label={nav.homeLabel}>
          <Logo size={38} priority />
          <span className="text-[1.0625rem] font-semibold tracking-tight">Alex Sosa</span>
        </Link>

        <nav aria-label={nav.primary} className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`relative py-2 text-[0.9375rem] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-accent-ink after:transition-transform after:duration-300 ${
                    isActive(link.href)
                      ? "text-ink after:scale-x-100"
                      : "text-muted hover:text-ink after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          {languageSwitcher}
          <Link
            href={localePath(locale, "/contact")}
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-ink-2"
          >
            {nav.cta}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? nav.closeMenu : nav.openMenu}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <Close size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-paper lg:hidden"
      >
        <nav aria-label={nav.primary} className="container-site flex min-h-full flex-col py-8">
          <ul className="flex flex-col">
            {[{ href: localePath(locale), label: nav.home }, ...links].map((link) => (
              <li key={link.href} className="border-b border-line">
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`display flex items-center justify-between py-4 text-[1.75rem] ${
                    pathname === link.href ? "text-accent-ink" : "text-ink"
                  }`}
                >
                  {link.label}
                  <ArrowRight size={20} className="text-muted" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-center justify-between gap-4 pt-10">
            {languageSwitcher}
            <Link
              href={localePath(locale, "/contact")}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-paper"
            >
              {nav.cta}
              <ArrowRight size={16} />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

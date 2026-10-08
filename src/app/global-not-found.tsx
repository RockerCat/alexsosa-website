import type { Metadata } from "next"
import { Geist } from "next/font/google"
import Link from "next/link"
import { Logo } from "@/components/Logo"
import { getDictionary } from "@/content"
import { localePath, locales } from "@/lib/i18n"
import "./globals.css"

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "404 — Alex Sosa",
}

// Rendered outside the locale layout, so it shows both languages.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <main className="container-site flex min-h-dvh flex-col justify-center py-16">
          <Link href={localePath("en")} aria-label="Alex Sosa" className="w-fit">
            <Logo size={48} />
          </Link>
          <p className="eyebrow mt-12">404</p>
          <div className="mt-8 grid gap-12 md:grid-cols-2">
            {locales.map((locale) => {
              const t = getDictionary(locale).notFound
              return (
                <section key={locale} lang={locale}>
                  <h1 className="display text-5xl sm:text-6xl">{t.title}</h1>
                  <p className="mt-5 max-w-md text-lg text-ink-2">{t.body}</p>
                  <Link
                    href={localePath(locale)}
                    className="mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-paper hover:bg-ink-2"
                  >
                    {t.cta}
                  </Link>
                </section>
              )
            })}
          </div>
        </main>
      </body>
    </html>
  )
}

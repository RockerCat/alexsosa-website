import type { Metadata, Viewport } from "next"
import { Geist } from "next/font/google"
import { notFound } from "next/navigation"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { RevealObserver } from "@/components/RevealObserver"
import { getDictionary } from "@/content"
import { site } from "@/content/site"
import { isLocale, locales } from "@/lib/i18n"
import "../globals.css"

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" })

export const viewport: Viewport = {
  themeColor: "#fafaf7",
  colorScheme: "light",
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.home.title, template: `%s — ${dict.meta.siteName}` },
    description: dict.meta.home.description,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    formatDetection: { telephone: false },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)

  return (
    <html lang={locale} className={geist.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <Header locale={locale} nav={dict.nav} />
        <main id="main" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
        <RevealObserver />
        {/* Scroll-reveal starts hidden; without JS nothing would reveal it, so keep all content visible. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </body>
    </html>
  )
}

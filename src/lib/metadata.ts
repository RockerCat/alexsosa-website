import type { Metadata } from "next"
import { getDictionary } from "@/content"
import { site, type Route } from "@/content/site"
import { locales, localePath, type Locale } from "./i18n"

type PageKey = "home" | "services" | "work" | "about" | "contact"

/** Localized metadata with canonical + hreflang alternates and Open Graph using the approved logo. */
export function pageMetadata(locale: Locale, page: PageKey, route: Route): Metadata {
  const dict = getDictionary(locale)
  const { title, description } = dict.meta[page]
  const fullTitle = page === "home" ? title : `${title} — ${dict.meta.siteName}`
  const url = localePath(locale, route)

  return {
    title: page === "home" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, localePath(l, route)])),
        "x-default": localePath("en", route),
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: dict.meta.siteName,
      title: fullTitle,
      description,
      locale: locale === "es" ? "es_CO" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_CO"],
      images: [{ url: site.logo.src, width: site.logo.width, height: site.logo.height, alt: dict.meta.ogAlt }],
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
      images: [site.logo.src],
    },
  }
}

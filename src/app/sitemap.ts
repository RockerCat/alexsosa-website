import type { MetadataRoute } from "next"
import { routes, site } from "@/content/site"
import { localePath, locales } from "@/lib/i18n"

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${site.url}${localePath(locale, route)}`,
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${localePath(l, route)}`])),
      },
    })),
  )
}

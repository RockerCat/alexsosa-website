export const locales = ["en", "es"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Builds an internal href for a locale, e.g. localePath("es", "/work") -> "/es/work". */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path
  return `/${locale}${clean}`
}

/** Swaps the locale segment of a pathname, keeping the rest of the route. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/")
  if (segments[1] && isLocale(segments[1])) {
    segments[1] = target
    return segments.join("/") || `/${target}`
  }
  return localePath(target, pathname)
}

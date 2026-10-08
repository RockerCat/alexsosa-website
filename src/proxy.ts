import { NextResponse, type NextRequest } from "next/server"
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n"

function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? ""
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=")
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 }
    })
    .filter((entry) => entry.lang && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q)

  const match = ranked.find((entry) => isLocale(entry.lang))
  return match ? (match.lang as Locale) : defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split("/")[1]
  if (first && isLocale(first)) return

  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Skip Next internals, API routes, and any request for a file (logo, CV, icons, sitemap, robots).
  matcher: ["/((?!_next|api/|.*\\..*).*)"],
}

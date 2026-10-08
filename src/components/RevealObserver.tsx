"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/** Reveals [data-reveal] elements as they enter the viewport. One observer for the whole page. */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])")
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.setAttribute("data-shown", ""))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-shown", "")
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}

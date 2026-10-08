import Image from "next/image"
import { site } from "@/content/site"

/** The original Alex Sosa logo, displayed unmodified on its own black background. */
export function Logo({ size = 40, className = "", priority = false }: { size?: number; className?: string; priority?: boolean }) {
  return (
    <Image
      src={site.logo.src}
      width={size}
      height={size}
      alt=""
      priority={priority}
      className={`shrink-0 rounded-[10px] ${className}`}
    />
  )
}

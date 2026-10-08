import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight } from "./Icons"

type Variant = "primary" | "secondary" | "accent" | "ghost-night"

const styles: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-2",
  secondary: "border border-ink/20 text-ink hover:border-ink hover:bg-ink/[0.03]",
  accent: "bg-accent text-night hover:bg-[#3ddccf]",
  "ghost-night": "border border-on-night/25 text-on-night hover:border-on-night/70",
}

type Props = {
  href: string
  children: ReactNode
  variant?: Variant
  arrow?: boolean
  external?: boolean
  download?: boolean
  className?: string
  icon?: ReactNode
}

export function Button({ href, children, variant = "primary", arrow = false, external, download, className = "", icon }: Props) {
  const classes = `group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.9375rem] font-medium transition-colors duration-200 ${styles[variant]} ${className}`
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
    </>
  )

  if (external || download || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}

export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-medium text-accent-ink ${className}`}
    >
      <span className="link-underline">{children}</span>
      <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#timeline", label: "Timeline" },
  { href: "#approach", label: "Approach" },
  { href: "#experiments", label: "Experiments" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "rgba(4, 8, 16, 0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(0, 212, 255, 0.07)"
            : "1px solid transparent",
          transition:
            "background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-8 h-[68px] flex items-center justify-between">
          {/* Logo — monogram only */}
          <a href="#" className="group flex items-center" aria-label="Alex Sosa">
            <HeaderMonogram />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] text-[#6b7fa3] hover:text-[#e8f0ff] transition-colors duration-300 tracking-[0.06em] font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:inline-flex text-[13px] px-5 py-2.5 rounded-full font-medium transition-all duration-300"
              style={{
                border: "1px solid rgba(0, 212, 255, 0.28)",
                color: "#00d4ff",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = "rgba(0, 212, 255, 0.08)"
                el.style.borderColor = "rgba(0, 212, 255, 0.5)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = "transparent"
                el.style.borderColor = "rgba(0, 212, 255, 0.28)"
              }}
            >
              Let&apos;s Connect
            </a>

            <button
              className="md:hidden text-[#6b7fa3] hover:text-[#00d4ff] transition-colors p-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
            style={{ background: "rgba(4, 8, 16, 0.97)", backdropFilter: "blur(24px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-4xl font-bold tracking-tight text-[#e8f0ff] hover:text-[#00d4ff] transition-colors"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="mt-4 px-8 py-3.5 rounded-full text-[#00d4ff] text-lg font-medium tracking-wide"
              style={{ border: "1px solid rgba(0, 212, 255, 0.35)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.06 + 0.04 }}
              onClick={() => setMenuOpen(false)}
            >
              Let&apos;s Connect
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function HeaderMonogram() {
  return (
    <motion.div
      aria-hidden
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.2 }}
      style={{
        width: 36,
        height: 36,
        flexShrink: 0,
        position: "relative",
      }}
    >
      {/* Subtle cyan glow behind the mark */}
      <div
        style={{
          position: "absolute",
          inset: -6,
          background: "radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 70%)",
          filter: "blur(6px)",
          pointerEvents: "none",
        }}
      />
      <img
        src="/branding/alex-sosa-monogram-header.png"
        alt="Alex Sosa"
        width={36}
        height={36}
        style={{
          width: 36,
          height: 36,
          objectFit: "contain",
          display: "block",
          filter:
            "brightness(1.5) saturate(1.3) drop-shadow(0 0 7px rgba(0,212,255,0.5))",
          imageRendering: "auto",
        }}
      />
    </motion.div>
  )
}

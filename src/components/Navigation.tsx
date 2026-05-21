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
            <GeometricMark />
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

function GeometricMark() {
  return (
    <motion.svg
      width="34"
      height="40"
      viewBox="0 0 34 40"
      fill="none"
      aria-hidden
      style={{
        filter: "drop-shadow(0 0 8px rgba(0, 212, 255, 0.4))",
      }}
      whileHover={{ scale: 1.06 }}
      transition={{ duration: 0.2 }}
    >
      {/* Left face — primary, lighter fill */}
      <path
        d="M17 1 L1 35 L6.5 35 L17 11.5 Z"
        fill="rgba(0,212,255,0.12)"
        stroke="#00d4ff"
        strokeWidth="0.85"
      />
      {/* Right face — recessed, dimmer */}
      <path
        d="M17 1 L33 35 L27.5 35 L17 11.5 Z"
        fill="rgba(0,212,255,0.05)"
        stroke="rgba(0,212,255,0.45)"
        strokeWidth="0.85"
      />
      {/* Crossbar */}
      <path
        d="M6.5 24 L27.5 24 L26.5 28 L7.5 28 Z"
        fill="rgba(0,212,255,0.08)"
        stroke="rgba(0,212,255,0.75)"
        strokeWidth="0.65"
      />

      {/* ─── Premium edge lighting ─── */}
      {/* Left outer edge — primary light catch (top-left source) */}
      <path
        d="M17 1 L1 35"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="0.55"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right outer edge — secondary, dimmer */}
      <path
        d="M17 1 L33 35"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="0.35"
        fill="none"
        strokeLinecap="round"
      />
      {/* Crossbar top edge — thin highlight */}
      <line
        x1="7" y1="24.2" x2="27" y2="24.2"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="0.4"
        strokeLinecap="round"
      />
      {/* Apex — bright catch light */}
      <circle cx="17" cy="1" r="1.8" fill="#00d4ff" />
      <circle cx="17" cy="1" r="4.5" fill="#00d4ff" opacity="0.14" />
      {/* Apex micro-highlight */}
      <circle cx="16.3" cy="0.6" r="0.7" fill="rgba(255,255,255,0.7)" />
    </motion.svg>
  )
}

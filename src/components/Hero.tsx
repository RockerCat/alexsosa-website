"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"

const tags = [
  "Product Strategy",
  "Technology Leadership",
  "AI Workflows",
  "Gamification",
  "Fintech",
  "Interactive Systems",
]

const particles = [
  { left: "8%",  top: "22%", size: 2,   opacity: 0.45, dur: 7,  delay: 0   },
  { left: "80%", top: "14%", size: 1.5, opacity: 0.28, dur: 9,  delay: 1.5 },
  { left: "94%", top: "67%", size: 2,   opacity: 0.2,  dur: 11, delay: 3   },
  { left: "3%",  top: "73%", size: 1.5, opacity: 0.22, dur: 8,  delay: 2   },
  { left: "52%", top: "91%", size: 1.5, opacity: 0.18, dur: 6,  delay: 0.5 },
  { left: "33%", top: "5%",  size: 1,   opacity: 0.32, dur: 10, delay: 4   },
  { left: "68%", top: "46%", size: 1,   opacity: 0.13, dur: 13, delay: 1.5 },
  { left: "18%", top: "88%", size: 1.5, opacity: 0.16, dur: 8.5,delay: 3.5 },
]

export function Hero() {
  const { scrollY } = useScroll()
  const geometricY       = useTransform(scrollY, [0, 700], [0, -140])
  const geometricOpacity = useTransform(scrollY, [0, 480], [1, 0])
  const contentY         = useTransform(scrollY, [0, 600], [0, -60])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#040810]">

      {/* ── DEPTH LAYER 1: atmospheric glow blobs ── */}

      {/* Main upper atmosphere — deep blue/indigo */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ scale: [1, 1.07, 0.96, 1], opacity: [0.18, 0.26, 0.16, 0.18] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{
          top: "-25%", left: "5%",
          width: "85%", height: "70%",
          background: "radial-gradient(ellipse, rgba(0, 50, 200, 0.28) 0%, transparent 65%)",
          filter: "blur(60px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Cyan right-side accent */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ scale: [1, 1.1, 0.93, 1], opacity: [0.1, 0.17, 0.08, 0.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          top: "0%", right: "-10%",
          width: "60%", height: "60%",
          background: "radial-gradient(ellipse, rgba(0, 212, 255, 0.16) 0%, transparent 65%)",
          filter: "blur(50px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Bottom-left warm accent */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ scale: [1, 1.05, 1], opacity: [0.07, 0.12, 0.07] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        style={{
          bottom: "-20%", left: "-5%",
          width: "50%", height: "55%",
          background: "radial-gradient(ellipse, rgba(0, 70, 210, 0.14) 0%, transparent 65%)",
          filter: "blur(45px)",
          willChange: "transform, opacity",
        }}
      />

      {/* ── DEPTH LAYER 2: grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.032) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.032) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── DEPTH LAYER 3: floating particles ── */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full pointer-events-none"
          animate={{ y: [0, -(p.size * 6 + 12), 0] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          style={{
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            background: "#00d4ff",
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 5}px rgba(0,212,255,0.8)`,
          }}
        />
      ))}

      {/* ── DEPTH LAYER 4: brand monogram with parallax ── */}
      <motion.div
        className="absolute right-[-80px] md:right-[-20px] lg:right-[2%] top-1/2 -translate-y-1/2 pointer-events-none select-none"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      >
        <motion.div style={{ y: geometricY, opacity: geometricOpacity }}>
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Cyan glow halo behind the monogram */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0, 212, 255, 0.12) 0%, transparent 70%)",
                filter: "blur(32px)",
                transform: "scale(1.15)",
              }}
            />
            <img
              src="/branding/alex-sosa-monogram.png"
              alt=""
              aria-hidden="true"
              width={560}
              height={660}
              style={{
                width: 560,
                height: "auto",
                opacity: 0.07,
                filter: "blur(2.5px) brightness(1.35) saturate(1.25) drop-shadow(0 0 22px rgba(0, 212, 255, 0.32))",
                mixBlendMode: "screen",
                display: "block",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── FOREGROUND: content ── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 w-full"
        style={{ y: contentY }}
      >
        <div className="max-w-[680px]">

          {/* ── Brand lockup: monogram left · name + title right ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-7"
          >
            {/* Monogram — hidden on mobile (nav carries the mark there), shown on md+ */}
            <div className="relative flex-shrink-0 hidden md:block" style={{ width: 84, height: 84 }}>
              {/* Radial halo */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: -22,
                  background:
                    "radial-gradient(circle, rgba(0,212,255,0.22) 0%, rgba(0,100,255,0.08) 45%, transparent 70%)",
                  filter: "blur(14px)",
                  pointerEvents: "none",
                }}
              />
              <img
                src="/branding/alex-sosa-monogram-header.png"
                alt="Alex Sosa"
                width={84}
                height={84}
                style={{
                  width: 84,
                  height: 84,
                  objectFit: "contain",
                  display: "block",
                  position: "relative",
                  filter:
                    "brightness(1.6) saturate(1.35) drop-shadow(0 0 14px rgba(0,212,255,0.58)) drop-shadow(0 0 4px rgba(0,212,255,0.9))",
                }}
              />
            </div>

            {/* Name + title */}
            <div className="flex flex-col">
              {/* Name line */}
              <div className="relative pb-[10px]">
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(1.55rem, 3vw, 2.4rem)",
                    letterSpacing: "0.28em",
                    fontWeight: 300,
                    textTransform: "uppercase",
                    color: "rgba(232, 240, 255, 0.92)",
                    lineHeight: 1,
                  }}
                >
                  Alex Sosa
                </span>

                {/* Cyan streak under the name */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: 3,
                    left: 0,
                    width: "88%",
                    height: 1,
                    background:
                      "linear-gradient(to right, rgba(0,212,255,0.85) 0%, rgba(0,212,255,0.35) 55%, transparent 100%)",
                  }}
                />
                {/* Glow bloom below the streak */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    width: "65%",
                    height: 7,
                    background:
                      "linear-gradient(to right, rgba(0,212,255,0.18) 0%, transparent 100%)",
                    filter: "blur(3px)",
                  }}
                />
              </div>

              {/* Subtitle */}
              <span
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "#00d4ff",
                  lineHeight: 1,
                }}
              >
                Product &amp; Technology Leader
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.8rem,6vw,4.5rem)] font-bold leading-[1.04] tracking-tight text-[#e8f0ff] mb-7"
          >
            Building Digital Products
            <br />
            <motion.span
              className="inline text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #00d4ff 0%, #4f8ef7 100%)",
              }}
              animate={{
                filter: [
                  "drop-shadow(0 0 0px rgba(0,212,255,0))",
                  "drop-shadow(0 0 22px rgba(0,212,255,0.35))",
                  "drop-shadow(0 0 0px rgba(0,212,255,0))",
                ],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            >
              & Interactive Experiences.
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.44 }}
            className="leading-relaxed mb-9 max-w-[540px]"
            style={{ fontSize: "1.0625rem", color: "rgba(107, 127, 163, 0.95)", lineHeight: 1.75 }}
          >
            Games, platforms and emerging technology.
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.56 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.05, duration: 0.4 }}
                className="text-xs px-3 py-1.5 rounded-full tracking-wide"
                style={{
                  border: "1px solid rgba(0, 212, 255, 0.16)",
                  background: "rgba(0, 212, 255, 0.045)",
                  color: "rgba(107, 127, 163, 0.9)",
                  letterSpacing: "0.04em",
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="#work"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-[13px] text-[#040810] bg-[#00d4ff]"
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(0,212,255,0.35)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              View Work
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[13px] text-[#e8f0ff] font-medium"
              style={{ border: "1px solid rgba(232, 240, 255, 0.13)" }}
              whileHover={{
                borderColor: "rgba(0, 212, 255, 0.3)",
                color: "#00d4ff",
              }}
              transition={{ duration: 0.25 }}
            >
              Let&apos;s Connect
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <motion.div
          className="w-px h-8"
          style={{
            background: "linear-gradient(to bottom, rgba(0,212,255,0.5), transparent)",
          }}
          animate={{ scaleY: [1, 0.4, 1], originY: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={13} style={{ color: "rgba(107,127,163,0.45)" }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

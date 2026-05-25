"use client"

import { motion } from "framer-motion"
import { Mail, ArrowUpRight } from "lucide-react"

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

const contactLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/alexsosa",
    IconComponent: LinkedInIcon,
    description: "Professional background & updates",
  },
  {
    label: "Email",
    href: "mailto:alexsosa.me@gmail.com",
    IconComponent: ({ size }: { size?: number }) => <Mail size={size} />,
    description: "alexsosa.me@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/RockerCat",
    IconComponent: GitHubIcon,
    description: "Code, prototypes & experiments",
  },
]

export function ContactCTA() {
  return (
    <section id="contact" className="relative pt-28 pb-20 overflow-hidden bg-[#040810]">
      {/* Deep atmosphere — center below */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{ scale: [1, 1.06, 0.97, 1], opacity: [0.12, 0.2, 0.11, 0.12] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        style={{
          bottom: "-20%", left: "50%", transform: "translateX(-50%)",
          width: "80%", height: "70%",
          background: "radial-gradient(ellipse, rgba(0, 212, 255, 0.14) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ghost geometric A — centered, very faint */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <svg
          width="700"
          height="820"
          viewBox="0 0 400 460"
          fill="none"
          style={{ opacity: 0.032 }}
        >
          <path d="M200 15 L22 425 L88 425 L200 130 Z" stroke="#00d4ff" strokeWidth="1" fill="none" />
          <path d="M200 15 L378 425 L312 425 L200 130 Z" stroke="#00d4ff" strokeWidth="1" fill="none" />
          <path d="M88 285 L312 285 L300 316 L100 316 Z" stroke="#00d4ff" strokeWidth="1" fill="none" />
          <circle cx="200" cy="15" r="3" fill="#00d4ff" opacity="0.9" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div
              className="h-px w-10"
              style={{ background: "linear-gradient(to left, #00d4ff, transparent)" }}
            />
            <span className="text-[11px] tracking-[0.28em] text-[#00d4ff] uppercase font-medium">
              Get In Touch
            </span>
            <div
              className="h-px w-10"
              style={{ background: "linear-gradient(to right, #00d4ff, transparent)" }}
            />
          </div>

          {/* Headline */}
          <h2
            className="font-bold text-[#e8f0ff] leading-[1.02] tracking-tight mb-7"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)" }}
          >
            Let&apos;s build something{" "}
            <motion.span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #00d4ff 0%, #4f8ef7 100%)" }}
              animate={{
                filter: [
                  "drop-shadow(0 0 0px rgba(0,212,255,0))",
                  "drop-shadow(0 0 25px rgba(0,212,255,0.4))",
                  "drop-shadow(0 0 0px rgba(0,212,255,0))",
                ],
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              meaningful.
            </motion.span>
          </h2>

          <p
            className="mx-auto mb-16 max-w-lg"
            style={{ fontSize: "1.0625rem", color: "rgba(202,202,202,0.85)", lineHeight: 1.75 }}
          >
            Always interested in meaningful product conversations, ambitious ideas, and teams building things that actually matter.
          </p>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {contactLinks.map((link, i) => {
              const IconComponent = link.IconComponent
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 rounded-xl px-5 py-4 overflow-hidden w-full sm:w-auto min-w-[180px]"
                  style={{
                    background: "rgba(10, 17, 34, 0.75)",
                    border: "1px solid rgba(0, 212, 255, 0.11)",
                    backdropFilter: "blur(12px)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    borderColor: "rgba(0, 212, 255, 0.3)",
                    boxShadow: "0 0 30px rgba(0,212,255,0.08)",
                    y: -3,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.22, delay: i * 0.07 }}
                >
                  {/* Glass reflection */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(148deg, rgba(255,255,255,0.03) 0%, transparent 50%)",
                    }}
                  />
                  {/* Hover sweep */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      background: "radial-gradient(ellipse at 5% 5%, rgba(0,212,255,0.08) 0%, transparent 55%)",
                    }}
                  />

                  <span className="relative z-10" style={{ color: "#00d4ff" }}>
                    <IconComponent size={15} />
                  </span>
                  <div className="relative z-10 text-left flex-1">
                    <div className="text-[13px] font-semibold text-[#e8f0ff]">{link.label}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: "rgba(202,202,202,0.7)" }}>
                      {link.description}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={13}
                    className="relative z-10 ml-auto transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: "rgba(202,202,202,0.4)" }}
                  />
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div
        className="relative z-10 mt-28 pt-8 px-6"
        style={{ borderTop: "1px solid rgba(0,212,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-[11px]"
            style={{ color: "rgba(202,202,202,0.4)", letterSpacing: "0.04em" }}
          >
            © 2025 Alex Sosa. All rights reserved.
          </span>
          <span
            className="text-[10px] font-mono tracking-[0.2em] uppercase"
            style={{ color: "rgba(202,202,202,0.25)" }}
          >
            Building Digital Products. Driving Innovation.
          </span>
        </div>
      </div>
    </section>
  )
}

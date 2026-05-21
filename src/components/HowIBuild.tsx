"use client"

import { motion, type Variants } from "framer-motion"
import { Target, Layers, Code2, Sparkles } from "lucide-react"
import { pillars } from "@/data"

const iconMap = {
  Target,
  Layers,
  Code2,
  Sparkles,
} as const

type IconKey = keyof typeof iconMap

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
}

export function HowIBuild() {
  return (
    <section id="approach" className="pt-20 pb-28 bg-[#040810] relative overflow-hidden">
      {/* Glow — offset right to break symmetry */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%", right: "-5%",
          width: "45%", height: "60%",
          background: "radial-gradient(ellipse, rgba(0, 212, 255, 0.055) 0%, transparent 65%)",
          filter: "blur(55px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header — compact, horizontal, editorial */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:gap-16"
        >
          <div className="shrink-0">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-px w-8"
                style={{ background: "linear-gradient(to right, #00d4ff, rgba(0,212,255,0.3))" }}
              />
              <p className="text-[11px] tracking-[0.26em] text-[#00d4ff] uppercase font-medium">
                Approach
              </p>
            </div>
            <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-[#e8f0ff] tracking-tight leading-none">
              How I Build
            </h2>
          </div>

          {/* Editorial aside */}
          <p
            className="mt-5 md:mt-0 md:max-w-sm"
            style={{ fontSize: "0.875rem", color: "rgba(107,127,163,0.6)", lineHeight: 1.75 }}
          >
            A consistent set of practices developed over two decades —
            across platforms, team sizes and product types.
          </p>
        </motion.div>

        {/* Pillars — 2-column text layout, no card backgrounds */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-12"
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {pillars.map((pillar, i) => {
            const Icon = iconMap[pillar.icon as IconKey]
            return (
              <PillarItem key={pillar.title} pillar={pillar} Icon={Icon} index={i} />
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

type Pillar = (typeof pillars)[number]
type LucideIcon = React.ComponentType<{ size?: number; color?: string }>

function PillarItem({ pillar, Icon, index }: { pillar: Pillar; Icon: LucideIcon; index: number }) {
  return (
    <motion.div
      variants={itemVariants}
      className="group flex flex-col gap-4"
    >
      {/* Number + horizontal rule */}
      <div className="flex items-center gap-4">
        <span
          className="font-mono text-[11px] tracking-[0.1em] shrink-0"
          style={{ color: "rgba(0,212,255,0.45)" }}
        >
          0{index + 1}
        </span>
        <motion.div
          className="h-px flex-1"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.12 + 0.2, ease: "easeOut" }}
          style={{ background: "rgba(0,212,255,0.1)", transformOrigin: "left" }}
        />
      </div>

      {/* Icon + title */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: "rgba(0, 212, 255, 0.08)",
            border: "1px solid rgba(0, 212, 255, 0.14)",
          }}
        >
          <Icon size={14} color="rgba(0, 212, 255, 0.75)" />
        </div>
        <h3
          className="font-semibold text-[#e8f0ff] tracking-tight"
          style={{ fontSize: "1.0625rem" }}
        >
          {pillar.title}
        </h3>
      </div>

      {/* Description — slightly inset */}
      <p
        className="pl-11"
        style={{ fontSize: "0.875rem", color: "rgba(107,127,163,0.82)", lineHeight: 1.75 }}
      >
        {pillar.description}
      </p>
    </motion.div>
  )
}

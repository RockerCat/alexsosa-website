"use client"

import { motion, type Variants } from "framer-motion"
import { projects } from "@/data"
import {
  VirtualTejoVisual,
  WeDrawVisual,
  LendingPointVisual,
  SolarDeskVisual,
} from "@/components/visuals/ProjectVisuals"

const projectVisuals: Record<string, React.ComponentType> = {
  "virtual-tejo": VirtualTejoVisual,
  "wedraw": WeDrawVisual,
  "lendingpoint": LendingPointVisual,
  "solardesk": SolarDeskVisual,
}

const LARGE_BG = "rgba(14, 23, 48, 0.96)"
const COMPACT_BG = "rgba(11, 18, 38, 0.95)"

const wrapperVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
}

const entryVariants: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.78, ease: "easeOut" } },
}

type Project = (typeof projects)[number]

export function FeaturedWork() {
  return (
    <section id="work" className="pt-24 pb-28 bg-[#040810] relative overflow-hidden">
      <div
        className="absolute pointer-events-none"
        style={{
          top: "5%", left: "-8%",
          width: "50%", height: "65%",
          background: "radial-gradient(ellipse, rgba(0, 212, 255, 0.04) 0%, transparent 65%)",
          filter: "blur(65px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "0%", right: "5%",
          width: "38%", height: "45%",
          background: "radial-gradient(ellipse, rgba(0, 60, 200, 0.06) 0%, transparent 65%)",
          filter: "blur(55px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:flex md:items-end md:justify-between md:gap-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-px w-8"
                style={{ background: "linear-gradient(to right, #00d4ff, rgba(0,212,255,0.3))" }}
              />
              <p className="text-[11px] tracking-[0.26em] text-[#00d4ff] uppercase font-medium">
                Selected Projects
              </p>
            </div>
            <h2 className="text-[clamp(2.4rem,5vw,3.75rem)] font-bold text-[#e8f0ff] tracking-tight leading-none">
              Featured Work
            </h2>
          </div>
          <p
            className="mt-5 md:mt-0 md:max-w-xs md:text-right"
            style={{ fontSize: "0.875rem", color: "rgba(107,127,163,0.58)", lineHeight: 1.75 }}
          >
            Products built at scale.<br className="hidden md:block" />
            Some won awards. Some went viral.<br className="hidden md:block" />
            All taught something.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-12 gap-4 lg:gap-5"
          variants={wrapperVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={entryVariants} className="col-span-12 md:col-span-7">
            <LargeCard project={projects[0]} index={0} flip={false} />
          </motion.div>
          <motion.div variants={entryVariants} className="col-span-12 md:col-span-5">
            <CompactCard project={projects[1]} index={1} />
          </motion.div>
          <motion.div variants={entryVariants} className="col-span-12 md:col-span-5">
            <CompactCard project={projects[2]} index={2} />
          </motion.div>
          <motion.div variants={entryVariants} className="col-span-12 md:col-span-7">
            <LargeCard project={projects[3]} index={3} flip={true} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function LargeCard({ project, index, flip }: { project: Project; index: number; flip: boolean }) {
  const Visual = projectVisuals[project.id]

  return (
    <motion.article
      className="relative group rounded-2xl overflow-hidden h-full flex flex-col"
      style={{
        background: `linear-gradient(155deg, ${LARGE_BG} 0%, rgba(7, 12, 26, 0.96) 100%)`,
        border: "1px solid rgba(0, 212, 255, 0.1)",
        minHeight: "540px",
      }}
      whileHover={{
        y: -5,
        borderColor: "rgba(0, 212, 255, 0.22)",
        boxShadow: "0 28px 80px rgba(0,0,0,0.55), 0 0 60px rgba(0,212,255,0.055)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative h-[168px] flex-none overflow-hidden">
        {Visual && <Visual />}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent, ${LARGE_BG})` }}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: flip
            ? "radial-gradient(ellipse at 90% 5%, rgba(0,212,255,0.06) 0%, transparent 50%)"
            : "radial-gradient(ellipse at 10% 5%, rgba(0,212,255,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 px-7 pb-7 md:px-8 md:pb-8 flex flex-col flex-1 gap-5 -mt-2">
        <div className="flex items-start justify-between">
          <span className="text-[10px] tracking-[0.22em] uppercase font-semibold" style={{ color: "rgba(0, 212, 255, 0.58)" }}>
            {project.category}
          </span>
          <span className="font-mono font-black select-none" style={{ fontSize: "2.4rem", color: "rgba(232,240,255,0.038)", lineHeight: 0.85 }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div>
          <div className="font-black leading-none tracking-tight text-[#00d4ff]" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.25rem)" }}>
            {project.metricValue}
          </div>
          <div className="mt-1.5 text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "rgba(107,127,163,0.55)" }}>
            {project.metricLabel}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-[#e8f0ff] leading-tight tracking-tight" style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)" }}>
            {project.title}
          </h3>
          <p className="text-[13px] mt-1.5" style={{ color: "rgba(107,127,163,0.65)" }}>
            {project.subtitle}
          </p>
        </div>

        <div className="h-px" style={{
          background: flip
            ? "linear-gradient(to left, rgba(0,212,255,0.22), transparent)"
            : "linear-gradient(to right, rgba(0,212,255,0.22), transparent)",
        }} />

        <p className="flex-1" style={{ fontSize: "0.875rem", color: "rgba(107,127,163,0.88)", lineHeight: 1.76 }}>
          {project.description}
        </p>

        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full" style={{
                background: "rgba(0, 212, 255, 0.06)",
                color: "rgba(0, 212, 255, 0.54)",
                border: "1px solid rgba(0, 212, 255, 0.1)",
                letterSpacing: "0.03em",
              }}>
                {tag}
              </span>
            ))}
          </div>
          <span className="text-[11px] font-mono ml-3 shrink-0" style={{ color: "rgba(107,127,163,0.32)" }}>
            {project.year}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

function CompactCard({ project, index }: { project: Project; index: number }) {
  const Visual = projectVisuals[project.id]

  return (
    <motion.article
      className="relative group rounded-2xl overflow-hidden h-full flex flex-col"
      style={{
        background: `linear-gradient(165deg, ${COMPACT_BG} 0%, rgba(7, 12, 26, 0.95) 100%)`,
        border: "1px solid rgba(0, 212, 255, 0.09)",
        minHeight: "420px",
      }}
      whileHover={{
        y: -5,
        borderColor: "rgba(0, 212, 255, 0.2)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,212,255,0.04)",
      }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="relative h-[106px] flex-none overflow-hidden">
        {Visual && <Visual />}
        <div
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent, ${COMPACT_BG})` }}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: index % 2 === 0
            ? "radial-gradient(ellipse at 5% 5%, rgba(0,212,255,0.055) 0%, transparent 55%)"
            : "radial-gradient(ellipse at 95% 5%, rgba(0,212,255,0.05) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 px-7 pb-7 flex flex-col flex-1 gap-4 -mt-1">
        <div className="flex items-start justify-between">
          <span className="text-[10px] tracking-[0.22em] uppercase font-semibold" style={{ color: "rgba(0, 212, 255, 0.52)" }}>
            {project.category}
          </span>
          <span className="font-mono font-black select-none" style={{ fontSize: "1.7rem", color: "rgba(232,240,255,0.042)", lineHeight: 0.85 }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div>
          <h3 className="font-bold text-[#e8f0ff] leading-tight tracking-tight" style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.6rem)" }}>
            {project.title}
          </h3>
          <p className="text-[12px] mt-1.5" style={{ color: "rgba(107,127,163,0.62)" }}>
            {project.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <motion.div
            className="w-1 h-1 rounded-full bg-[#00d4ff]"
            animate={{ scale: [1, 1.55, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[0.9rem] font-semibold text-[#00d4ff]">{project.metricValue}</span>
          <span className="text-[11px]" style={{ color: "rgba(107,127,163,0.52)" }}>{project.metricLabel}</span>
        </div>

        <div className="h-px" style={{ background: "linear-gradient(to right, rgba(0,212,255,0.16), transparent)" }} />

        <p className="flex-1" style={{ fontSize: "0.8125rem", color: "rgba(107,127,163,0.84)", lineHeight: 1.74 }}>
          {project.description}
        </p>

        <div className="flex items-center justify-between pt-1.5 border-t" style={{ borderColor: "rgba(0,212,255,0.06)" }}>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full" style={{
                background: "rgba(0, 212, 255, 0.055)",
                color: "rgba(0, 212, 255, 0.48)",
                border: "1px solid rgba(0, 212, 255, 0.09)",
              }}>
                {tag}
              </span>
            ))}
          </div>
          <span className="text-[10px] font-mono ml-2 shrink-0" style={{ color: "rgba(107,127,163,0.28)" }}>
            {project.year}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

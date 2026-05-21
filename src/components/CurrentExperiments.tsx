"use client"

import { motion, type Variants } from "framer-motion"
import { experiments } from "@/data"

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function CurrentExperiments() {
  return (
    <section id="experiments" className="pt-24 pb-28 relative overflow-hidden" style={{ background: "#060c1a" }}>
      {/* Grid — slightly shifted to break symmetry */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.022) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          backgroundPosition: "30px 15px",
        }}
      />

      {/* Background glow — upper left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%", left: "0%",
          width: "45%", height: "55%",
          background: "radial-gradient(ellipse, rgba(0, 212, 255, 0.05) 0%, transparent 65%)",
          filter: "blur(55px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header — asymmetric, content + count */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-end gap-8"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-px w-8"
                style={{ background: "linear-gradient(to right, #00d4ff, rgba(0,212,255,0.3))" }}
              />
              <p className="text-[11px] tracking-[0.26em] text-[#00d4ff] uppercase font-medium">
                Current Focus
              </p>
            </div>
            <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-[#e8f0ff] tracking-tight leading-none mb-4">
              What I&apos;m Building
            </h2>
            <p className="text-[0.9375rem] max-w-md" style={{ color: "rgba(107,127,163,0.8)", lineHeight: 1.72 }}>
              Active experiments at the intersection of product,
              technology and emerging platforms.
            </p>
          </div>
        </motion.div>

        {/* Experiments grid — slightly staggered visually */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {experiments.map((exp, i) => (
            <ExperimentCard key={exp.name} experiment={exp} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

type Experiment = (typeof experiments)[number]

function ExperimentCard({ experiment, index }: { experiment: Experiment; index: number }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative rounded-2xl p-6 overflow-hidden"
      style={{
        background: "rgba(10, 17, 34, 0.7)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(0, 212, 255, 0.08)",
      }}
      whileHover={{
        y: -4,
        borderColor: "rgba(0, 212, 255, 0.2)",
        boxShadow: "0 16px 50px rgba(0,0,0,0.45), 0 0 30px rgba(0,212,255,0.04)",
      }}
      transition={{ duration: 0.25 }}
    >
      {/* Glass reflection — alternating direction */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: index % 2 === 0
            ? "linear-gradient(148deg, rgba(255,255,255,0.025) 0%, transparent 40%)"
            : "linear-gradient(218deg, rgba(255,255,255,0.02) 0%, transparent 40%)",
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at ${index % 2 === 0 ? "5% 5%" : "95% 5%"}, rgba(0,212,255,0.06) 0%, transparent 55%)`,
        }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: experiment.statusColor }}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span
              className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase"
              style={{ color: experiment.statusColor }}
            >
              {experiment.status}
            </span>
          </div>
          <span
            className="text-[10px] font-mono"
            style={{ color: "rgba(107,127,163,0.35)" }}
          >
            0{index + 1}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-[1.1875rem] font-bold text-[#e8f0ff] leading-snug tracking-tight">
          {experiment.name}
        </h3>

        {/* Description */}
        <p
          className="text-[0.8125rem] flex-1"
          style={{ color: "rgba(107,127,163,0.85)", lineHeight: 1.7 }}
        >
          {experiment.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {experiment.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(0, 212, 255, 0.055)",
                color: "rgba(0, 212, 255, 0.55)",
                border: "1px solid rgba(0, 212, 255, 0.1)",
                letterSpacing: "0.04em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

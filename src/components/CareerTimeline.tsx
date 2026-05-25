"use client"

import { motion } from "framer-motion"
import { timeline } from "@/data"

export function CareerTimeline() {
  return (
    <section id="timeline" className="pt-28 pb-24 relative overflow-hidden" style={{ background: "#060c1a" }}>
      {/* Asymmetric background glow — right side this time */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "15%", right: "-5%",
          width: "40%", height: "55%",
          background: "radial-gradient(ellipse, rgba(0, 212, 255, 0.05) 0%, transparent 65%)",
          filter: "blur(55px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%", left: "10%",
          width: "30%", height: "35%",
          background: "radial-gradient(ellipse, rgba(0, 60, 200, 0.07) 0%, transparent 65%)",
          filter: "blur(45px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="h-px w-8"
              style={{ background: "linear-gradient(to right, #00d4ff, rgba(0,212,255,0.3))" }}
            />
            <p className="text-[11px] tracking-[0.26em] text-[#00d4ff] uppercase font-medium">
              Career Journey
            </p>
          </div>
          <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-[#e8f0ff] tracking-tight leading-none">
          Evolution Through<br className="hidden sm:block" />
            <span style={{ color: "rgba(232,240,255,0.55)", fontWeight: 300 }}> Products</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: "20px",
              background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.18) 8%, rgba(0,212,255,0.18) 92%, transparent)",
            }}
          />

          <div className="flex flex-col gap-1">
            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

type TimelineEntry = (typeof timeline)[number]

function TimelineItem({ item, index }: { item: TimelineEntry; index: number }) {
  const isLast = index === timeline.length - 1

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-8 md:gap-0 pb-10 last:pb-0"
    >
      {/* Dot */}
      <div
        className="absolute z-10"
        style={{ left: "16px", top: "6px", width: "8px", height: "8px" }}
      >
        <div
          className="w-2 h-2 rounded-full bg-[#00d4ff]"
          style={{ boxShadow: "0 0 8px rgba(0,212,255,0.6)" }}
        />
        {isLast && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "rgba(0,212,255,0.3)" }}
          />
        )}
      </div>

      {/* Content — pushed right of the line */}
      <div className="ml-12 md:ml-16 flex-1 max-w-2xl">
        {/* Year tag */}
        <div className="mb-2">
          <span
            className="text-[11px] font-mono font-bold tracking-[0.14em] uppercase"
            style={{ color: "#00d4ff" }}
          >
            {item.year}
          </span>
        </div>

        {/* Card */}
        <motion.div
          className="rounded-xl p-5"
          style={{
            background: "rgba(10, 17, 34, 0.6)",
            border: "1px solid rgba(0, 212, 255, 0.08)",
          }}
          whileHover={{
            borderColor: "rgba(0, 212, 255, 0.18)",
            background: "rgba(12, 20, 40, 0.7)",
          }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="text-[0.9375rem] font-semibold text-[#e8f0ff] mb-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-[0.8125rem] leading-relaxed" style={{ color: "rgba(202,202,202,0.85)", lineHeight: 1.7 }}>
            {item.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

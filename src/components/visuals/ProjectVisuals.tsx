"use client"

import { motion } from "framer-motion"

/* ═══════════════════════════════════════════════════════════════════════════
   VIRTUAL TEJO — multiplayer arena, cultural, social, momentum
═══════════════════════════════════════════════════════════════════════════ */

const TEJO_CX = 300
const TEJO_CY = 88

const tejoPlayers = Array.from({ length: 8 }, (_, i) => {
  const a = (i * 45 * Math.PI) / 180
  return { x: TEJO_CX + 74 * Math.cos(a), y: TEJO_CY + 74 * Math.sin(a) }
})

const tejoConnections = [[0, 3], [1, 5], [2, 7], [4, 6]]

export function VirtualTejoVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 55% 85% at 55% 55%, rgba(255,145,40,0.09) 0%, transparent 65%)",
            "radial-gradient(ellipse 45% 70% at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 60%)",
          ].join(","),
        }}
      />
      <svg
        className="absolute inset-0"
        width="100%" height="100%"
        viewBox="0 0 600 175"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Arena rings */}
        {[80, 60, 40, 22].map((r, i) => (
          <circle
            key={r} cx={TEJO_CX} cy={TEJO_CY} r={r}
            fill={i === 3 ? "rgba(0,212,255,0.05)" : "none"}
            stroke={`rgba(0,212,255,${0.07 + i * 0.04})`}
            strokeWidth={i === 3 ? "0.8" : "0.55"}
          />
        ))}
        {/* Pulsing inner ring */}
        <motion.circle
          cx={TEJO_CX} cy={TEJO_CY} r={22}
          fill="none" stroke="rgba(0,212,255,0.35)" strokeWidth="0.6"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        {/* Bullseye */}
        <circle cx={TEJO_CX} cy={TEJO_CY} r={7} fill="rgba(0,212,255,0.65)" />
        <motion.circle
          cx={TEJO_CX} cy={TEJO_CY} r={7}
          fill="rgba(0,212,255,0.4)"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />

        {/* Connection lines */}
        {tejoConnections.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={tejoPlayers[a].x} y1={tejoPlayers[a].y}
            x2={tejoPlayers[b].x} y2={tejoPlayers[b].y}
            stroke="rgba(0,212,255,0.14)" strokeWidth="0.5"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.75 }}
          />
        ))}

        {/* Player dots — mix of cyan + warm amber */}
        {tejoPlayers.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x} cy={p.y} r={3.5}
            fill={i % 3 === 0 ? "rgba(255,165,55,0.88)" : "rgba(0,212,255,0.78)"}
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2 + i * 0.38, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}

        {/* Activity bars — right margin */}
        {[48, 65, 38, 78, 55, 70, 42].map((h, i) => (
          <motion.rect
            key={i}
            x={494 + i * 11} y={125 - h} width={7} height={h} rx={2}
            fill="rgba(0,212,255,0.22)"
            animate={{ opacity: [0.3, 0.85, 0.3] }}
            transition={{ duration: 1.9 + i * 0.35, repeat: Infinity, delay: i * 0.45 }}
          />
        ))}

        {/* Stats panel — left margin */}
        <rect x={18} y={14} width={72} height={10} rx={2} fill="rgba(0,212,255,0.28)" />
        <rect x={18} y={28} width={52} height={6} rx={1} fill="rgba(202,202,202,0.24)" />
        <rect x={18} y={38} width={60} height={4} rx={1} fill="rgba(202,202,202,0.17)" />

        {/* Live indicator */}
        <motion.circle
          cx={22} cy={56} r={3.5}
          fill="#00d4ff"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.3, repeat: Infinity }}
        />
        <rect x={30} y={53} width={36} height={6} rx={1} fill="rgba(0,212,255,0.18)" />
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   WEDRAW — connected screens, synchronized, experimental, real-time
═══════════════════════════════════════════════════════════════════════════ */

const syncPaths = [
  "M 190 78 C 235 42 305 42 350 78",
  "M 190 90 C 235 66 305 66 350 90",
  "M 190 102 C 235 122 305 122 350 102",
]

export function WeDrawVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 85% at 50% 50%, rgba(0,70,210,0.13) 0%, rgba(0,212,255,0.04) 55%, transparent 75%)",
        }}
      />
      <svg
        className="absolute inset-0"
        width="100%" height="100%"
        viewBox="0 0 600 175"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* ── Phone silhouette ── */}
        <rect x={142} y={28} width={46} height={84} rx={7}
          fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.32)" strokeWidth={0.8} />
        <rect x={147} y={34} width={36} height={63} rx={3}
          fill="rgba(0,212,255,0.04)" stroke="rgba(0,212,255,0.14)" strokeWidth={0.4} />
        {/* Notch */}
        <rect x={158} y={31} width={12} height={2.5} rx={1.5} fill="rgba(0,212,255,0.32)" />
        {/* Drawing stroke on phone screen */}
        <path d="M 151 72 C 158 54 168 68 175 50"
          fill="none" stroke="rgba(0,212,255,0.55)" strokeWidth={1.6} strokeLinecap="round" />
        {/* Signal bars above phone */}
        {[0, 1, 2].map(i => (
          <rect key={i} x={151 + i * 9} y={24 - i * 4} width={5} height={4 + i * 4} rx={1}
            fill="rgba(0,212,255,0.4)" />
        ))}

        {/* ── TV / Monitor silhouette ── */}
        <rect x={358} y={34} width={96} height={66} rx={5}
          fill="rgba(0,212,255,0.05)" stroke="rgba(0,212,255,0.26)" strokeWidth={0.8} />
        <rect x={363} y={39} width={86} height={52} rx={2.5}
          fill="rgba(0,212,255,0.03)" stroke="rgba(0,212,255,0.12)" strokeWidth={0.4} />
        {/* Stand */}
        <rect x={397} y={100} width={18} height={9} rx={1.5}
          fill="rgba(0,212,255,0.14)" stroke="rgba(0,212,255,0.2)" strokeWidth={0.5} />
        <rect x={390} y={109} width={32} height={4} rx={2}
          fill="rgba(0,212,255,0.14)" stroke="rgba(0,212,255,0.2)" strokeWidth={0.4} />
        {/* Drawing stroke on TV screen */}
        <path d="M 368 73 C 382 52 400 72 418 50"
          fill="none" stroke="rgba(0,212,255,0.48)" strokeWidth={1.5} strokeLinecap="round" />

        {/* ── Sync connection paths ── */}
        {syncPaths.map((d, i) => (
          <motion.path
            key={i} d={d} fill="none"
            stroke="rgba(0,212,255,0.38)" strokeWidth={0.75}
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -8] }}
            transition={{ duration: 0.85, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
            style={{ opacity: 1 - i * 0.28 }}
          />
        ))}

        {/* ── Center sync node ── */}
        <motion.circle
          cx={270} cy={90} r={16}
          fill="rgba(0,212,255,0.06)" stroke="rgba(0,212,255,0.22)" strokeWidth={0.7}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx={270} cy={90} r={5} fill="rgba(0,212,255,0.55)"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        />
        {/* Sync label */}
        <rect x={249} y={112} width={42} height={9} rx={2} fill="rgba(0,212,255,0.12)" />

        {/* ── Side labels — left ── */}
        <rect x={14} y={22} width={58} height={8} rx={2} fill="rgba(0,212,255,0.2)" />
        <rect x={14} y={34} width={44} height={5} rx={1} fill="rgba(202,202,202,0.2)" />
        <rect x={14} y={43} width={52} height={4} rx={1} fill="rgba(202,202,202,0.15)" />

        {/* Award badge — right edge */}
        <circle cx={572} cy={32} r={24}
          fill="rgba(0,212,255,0.05)" stroke="rgba(0,212,255,0.2)" strokeWidth={0.7} />
        <rect x={557} y={26} width={30} height={5} rx={1} fill="rgba(0,212,255,0.22)" />
        <rect x={562} y={34} width={20} height={4} rx={1} fill="rgba(202,202,202,0.2)" />
        <rect x={564} y={41} width={16} height={3} rx={1} fill="rgba(202,202,202,0.15)" />
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   LENDINGPOINT — operational scale, enterprise fintech, data velocity
═══════════════════════════════════════════════════════════════════════════ */

const lpRows = [
  { bw: 185 }, { bw: 225 }, { bw: 150 }, { bw: 265 }, { bw: 195 }, { bw: 242 },
]
const lpBars = [68, 48, 84, 56, 74, 44, 88, 62]

export function LendingPointVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 85% at 38% 50%, rgba(0,90,180,0.11) 0%, rgba(0,212,255,0.03) 60%, transparent 80%)",
        }}
      />
      <svg
        className="absolute inset-0"
        width="100%" height="100%"
        viewBox="0 0 600 175"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Dashboard header */}
        <rect x={28} y={12} width={355} height={16} rx={3}
          fill="rgba(0,212,255,0.09)" stroke="rgba(0,212,255,0.14)" strokeWidth={0.5} />
        <rect x={34} y={16} width={82} height={8} rx={1.5} fill="rgba(0,212,255,0.24)" />
        <rect x={124} y={16} width={55} height={8} rx={1.5} fill="rgba(202,202,202,0.2)" />
        <rect x={187} y={16} width={40} height={8} rx={1.5} fill="rgba(202,202,202,0.15)" />

        {/* Data rows */}
        {lpRows.map((row, i) => (
          <g key={i} transform={`translate(28, ${34 + i * 19})`}>
            <rect x={0} y={0} width={355} height={15} rx={2}
              fill={i === 3 ? "rgba(0,212,255,0.07)" : "rgba(0,212,255,0.025)"}
              stroke="rgba(0,212,255,0.055)" strokeWidth={0.4} />
            {/* Label pill */}
            <rect x={6} y={4} width={62} height={6} rx={1} fill="rgba(202,202,202,0.22)" />
            {/* Data bar */}
            <rect x={78} y={4} width={row.bw} height={6} rx={1}
              fill={i === 3 ? "rgba(0,212,255,0.42)" : "rgba(0,212,255,0.18)"} />
            {/* Metric */}
            <rect x={326} y={4} width={24} height={6} rx={1} fill="rgba(0,212,255,0.22)" />
          </g>
        ))}

        {/* Scan line — animated */}
        <motion.rect
          x={28} y={34} width={355} height={1.5} rx={1}
          fill="rgba(0,212,255,0.45)"
          animate={{ y: [34, 147, 34] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          style={{ filter: "blur(0.5px)" }}
        />

        {/* Mini bar chart — right */}
        {lpBars.map((h, i) => (
          <motion.rect
            key={i}
            x={418 + i * 19} y={152 - h} width={11} height={h} rx={2.5}
            fill="rgba(0,212,255,0.22)"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2 + i * 0.32, repeat: Infinity, delay: i * 0.42 }}
          />
        ))}
        <rect x={418} y={155} width={152} height={4} rx={1} fill="rgba(202,202,202,0.18)" />

        {/* KPI panels — top right */}
        {[0, 1].map(i => (
          <g key={i} transform={`translate(${420 + i * 72}, 12)`}>
            <rect x={0} y={0} width={64} height={32} rx={3}
              fill="rgba(0,212,255,0.07)" stroke="rgba(0,212,255,0.12)" strokeWidth={0.5} />
            <rect x={6} y={7} width={38} height={9} rx={1.5} fill={`rgba(0,212,255,${0.32 - i * 0.08})`} />
            <rect x={6} y={20} width={26} height={5} rx={1} fill="rgba(202,202,202,0.18)" />
          </g>
        ))}
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SOLARDESK — AI-native, intelligent workflows, modern SaaS
═══════════════════════════════════════════════════════════════════════════ */

const aiNodes = [
  { x: 280, y: 88 },  // hub
  { x: 200, y: 48 },
  { x: 360, y: 48 },
  { x: 198, y: 128 },
  { x: 362, y: 128 },
  { x: 148, y: 88 },
  { x: 412, y: 88 },
]
const aiEdges = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,5],[2,6],[3,4]]

export function SolarDeskVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Solar panel grid — subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.065]"
        style={{
          backgroundImage: [
            "linear-gradient(45deg, rgba(170,215,50,0.7) 1px, transparent 1px)",
            "linear-gradient(-45deg, rgba(170,215,50,0.7) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "22px 22px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 45% 80% at 50% 50%, rgba(0,212,255,0.09) 0%, transparent 58%)",
            "radial-gradient(ellipse 60% 60% at 50% 105%, rgba(165,215,50,0.05) 0%, transparent 55%)",
          ].join(","),
        }}
      />
      <svg
        className="absolute inset-0"
        width="100%" height="100%"
        viewBox="0 0 600 175"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* AI graph — edges */}
        {aiEdges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={aiNodes[a].x} y1={aiNodes[a].y}
            x2={aiNodes[b].x} y2={aiNodes[b].y}
            stroke="rgba(0,212,255,0.22)" strokeWidth={0.9}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}

        {/* Outer pulse ring for hub */}
        <motion.circle
          cx={aiNodes[0].x} cy={aiNodes[0].y} r={30}
          fill="none" stroke="rgba(0,212,255,0.14)" strokeWidth={0.7}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Satellite nodes */}
        {aiNodes.slice(1).map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x} cy={n.y} r={8}
            fill="rgba(0,212,255,0.09)"
            stroke="rgba(0,212,255,0.42)" strokeWidth={0.75}
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2 + i * 0.42, repeat: Infinity, delay: i * 0.52 }}
          />
        ))}

        {/* Hub node */}
        <circle cx={aiNodes[0].x} cy={aiNodes[0].y} r={18}
          fill="rgba(0,212,255,0.12)" stroke="rgba(0,212,255,0.55)" strokeWidth={1} />
        <circle cx={aiNodes[0].x} cy={aiNodes[0].y} r={7} fill="rgba(0,212,255,0.82)" />

        {/* Proposal document — right */}
        <rect x={490} y={22} width={90} height={120} rx={4}
          fill="rgba(0,212,255,0.04)" stroke="rgba(0,212,255,0.2)" strokeWidth={0.65} />
        <rect x={497} y={27} width={76} height={9} rx={1.5} fill="rgba(0,212,255,0.26)" />
        {[0,1,2,3,4,5,6,7].map(i => (
          <rect key={i} x={497} y={40 + i * 11} width={60 - (i % 4) * 8} height={6} rx={1}
            fill="rgba(202,202,202,0.2)" />
        ))}
        {/* Progress bar */}
        <rect x={497} y={130} width={76} height={6} rx={3}
          fill="rgba(0,212,255,0.09)" stroke="rgba(0,212,255,0.14)" strokeWidth={0.4} />
        <motion.rect
          x={497} y={130} width={76} height={6} rx={3}
          fill="rgba(0,212,255,0.52)"
          style={{ originX: "497px", transformOrigin: "497px 133px" }}
          animate={{ scaleX: [0, 1, 0.15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
        />

        {/* Terminal labels — left */}
        <rect x={14} y={16} width={88} height={7} rx={1.5} fill="rgba(0,212,255,0.18)" />
        <rect x={14} y={27} width={68} height={5} rx={1} fill="rgba(0,212,255,0.13)" />
        <rect x={14} y={36} width={78} height={5} rx={1} fill="rgba(0,212,255,0.1)" />

        {/* Status badge — active build */}
        <rect x={14} y={50} width={55} height={12} rx={6}
          fill="rgba(74,222,128,0.12)" stroke="rgba(74,222,128,0.3)" strokeWidth={0.5} />
        <motion.circle
          cx={22} cy={56} r={3.5} fill="rgba(74,222,128,0.85)"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <rect x={29} y={53.5} width={32} height={5} rx={1} fill="rgba(74,222,128,0.28)" />
      </svg>
    </div>
  )
}

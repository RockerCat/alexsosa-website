"use client"

export function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none select-none"
      style={{ zIndex: 9998, opacity: 0.028, mixBlendMode: "soft-light" }}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      >
        <filter id="noise-filter" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.68"
            numOctaves="4"
            stitchTiles="stitch"
            result="noiseOut"
          />
          <feColorMatrix
            type="saturate"
            values="0"
            in="noiseOut"
            result="grayNoise"
          />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" fill="white" />
      </svg>
    </div>
  )
}

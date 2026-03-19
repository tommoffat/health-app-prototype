import React from 'react'

const TEXT = '#FFFFFF'

export default function HatchedRing({ value, max = 100, color, trackColor, label, size = 96, strokeWidth = 9, targetMin = 41, targetMax = 63 }) {
  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const pct = Math.min(value / max, 1)
  const offset = circ * (1 - pct)
  // Hatched zone
  const startAngle = (targetMin / max) * circ
  const zoneLength = ((targetMax - targetMin) / max) * circ
  const zoneGap = circ - zoneLength
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
        {/* Hatched target zone */}
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={strokeWidth}
          strokeDasharray={`${zoneLength} ${zoneGap}`} strokeDashoffset={-startAngle} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={strokeWidth - 2}
          strokeDasharray="3 3" style={{ clipPath: 'none' }}
          strokeDashoffset={0} />
      </svg>
      <div style={{ position: 'relative', marginTop: -size, width: size, height: size, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: size > 100 ? 28 : 20, fontWeight: 700, color: TEXT }}>{value}%</span>
      </div>
      <div style={{ fontSize: 11, color, marginTop: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
    </div>
  )
}

import Icon from './Icon'
import React from 'react'

const TEXT2 = '#8A8FA8'

// Generate fake overnight data
function generateData(avg, spread, count = 40) {
  return Array.from({ length: count }, (_, i) => {
    const noise = (Math.random() - 0.5) * spread * 2
    const trend = Math.sin(i / count * Math.PI) * spread * 0.3
    return avg + noise + trend
  })
}

const PRESETS = {
  hr: { avg: 64.4, spread: 10, color: '#E07BAA', yLabels: [80, 71, 62], unit: 'bpm', label: 'Sleeping Heart Rate' },
  hrv: { avg: 68, spread: 25, color: '#5BC0AA', yLabels: [120, 80, 40], unit: 'ms', label: 'Sleeping HRV' },
  rr: { avg: 15.7, spread: 2, color: '#9B7BF0', yLabels: [20, 16, 12], unit: 'rpm', label: 'Sleeping Respiratory Rate' },
  spo2: { avg: 98, spread: 1.5, color: '#5B8DEF', yLabels: [100, 98, 96], unit: '%', label: 'Sleeping SpO2' },
}

export default function VitalChart({ type = 'hr', width = 350, height = 180, startTime = '11:02 PM', endTime = '6:24 AM' }) {
  const preset = PRESETS[type] || PRESETS.hr
  const { color, yLabels } = preset
  const [data] = React.useState(() => generateData(preset.avg, preset.spread))

  const pad = { top: 15, right: 10, bottom: 28, left: 40 }
  const w = width - pad.left - pad.right
  const h = height - pad.top - pad.bottom
  const minY = yLabels[yLabels.length - 1]
  const maxY = yLabels[0]
  const range = maxY - minY || 1

  const toX = i => pad.left + (i / (data.length - 1)) * w
  const toY = v => pad.top + (1 - (v - minY) / range) * h

  const avgY = toY(preset.avg)
  const pathD = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(Math.max(minY, Math.min(maxY, v)))}`).join(' ')

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {/* Grid */}
      {yLabels.map((v, i) => (
        <g key={i}>
          <line x1={pad.left} y1={toY(v)} x2={pad.left + w} y2={toY(v)} stroke="#2A3040" strokeWidth={0.5} />
          <text x={pad.left - 6} y={toY(v) + 4} fill={TEXT2} fontSize={10} textAnchor="end">{v}</text>
        </g>
      ))}
      {/* Average dashed line */}
      <line x1={pad.left} y1={avgY} x2={pad.left + w} y2={avgY} stroke={color} strokeWidth={1} strokeDasharray="4 3" opacity={0.6} />
      {/* Data dots */}
      {data.map((v, i) => (
        <circle key={i} cx={toX(i)} cy={toY(Math.max(minY, Math.min(maxY, v)))} r={2} fill={color} opacity={0.6} />
      ))}
      {/* Trend line */}
      <path d={pathD} fill="none" stroke={color} strokeWidth={1.5} opacity={0.8} />
      {/* Time axis */}
      <text x={pad.left} y={height - 4} fill={TEXT2} fontSize={10}>{startTime}</text>
      <text x={pad.left + w} y={height - 4} fill={TEXT2} fontSize={10} textAnchor="end">☀️ {endTime}</text>
    </svg>
  )
}

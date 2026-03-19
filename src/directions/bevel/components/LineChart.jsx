import React from 'react'

const TEXT2 = '#8A8FA8'
const SURFACE2 = '#22272F'

export default function LineChart({ data = [], color = '#7B8EF0', width = 350, height = 240 }) {
  if (!data.length) return null
  const pad = { top: 20, right: 20, bottom: 40, left: 45 }
  const w = width - pad.left - pad.right
  const h = height - pad.top - pad.bottom
  const vals = data.map(d => d.y)
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  const range = max - min || 1
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length

  const toX = i => pad.left + (i / (data.length - 1)) * w
  const toY = v => pad.top + (1 - (v - min) / range) * h

  const pathPoints = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(d.y)}`).join(' ')
  const fillPoints = `M${toX(0)},${toY(data[0].y)} ${data.map((d, i) => `L${toX(i)},${toY(d.y)}`).join(' ')} L${toX(data.length - 1)},${pad.top + h} L${toX(0)},${pad.top + h} Z`

  // Y-axis: 4 gridlines
  const yTicks = Array.from({ length: 4 }, (_, i) => min + (range * i) / 3)
  // X-axis: 5 date labels
  const xIdxs = [0, Math.floor(data.length * 0.25), Math.floor(data.length * 0.5), Math.floor(data.length * 0.75), data.length - 1]

  // Normal range band (avg ± 15%)
  const bandTop = toY(avg * 1.15)
  const bandBot = toY(avg * 0.85)

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {/* Normal range band */}
      <rect x={pad.left} y={bandTop} width={w} height={bandBot - bandTop} fill={color} opacity={0.1} rx={4} />
      {/* Grid lines */}
      {yTicks.map((v, i) => (
        <g key={i}>
          <line x1={pad.left} y1={toY(v)} x2={pad.left + w} y2={toY(v)} stroke="#2A3040" strokeWidth={0.5} />
          <text x={pad.left - 8} y={toY(v) + 4} fill={TEXT2} fontSize={10} textAnchor="end">{Math.round(v)}</text>
        </g>
      ))}
      {/* Average line */}
      <line x1={pad.left} y1={toY(avg)} x2={pad.left + w} y2={toY(avg)} stroke={color} strokeWidth={1} strokeDasharray="4 3" />
      <rect x={pad.left + w - 36} y={toY(avg) - 10} width={36} height={18} rx={9} fill={color} />
      <text x={pad.left + w - 18} y={toY(avg) + 3} fill="#fff" fontSize={9} textAnchor="middle" fontWeight={600}>Avg.</text>
      {/* Fill area */}
      <path d={fillPoints} fill={color} opacity={0.15} />
      {/* Line */}
      <path d={pathPoints} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      {/* Dots */}
      {data.map((d, i) => (
        <circle key={i} cx={toX(i)} cy={toY(d.y)} r={2.5} fill={color} />
      ))}
      {/* X-axis labels */}
      {xIdxs.map(i => (
        <text key={i} x={toX(i)} y={height - 8} fill={TEXT2} fontSize={10} textAnchor="middle">{data[i]?.x || ''}</text>
      ))}
    </svg>
  )
}

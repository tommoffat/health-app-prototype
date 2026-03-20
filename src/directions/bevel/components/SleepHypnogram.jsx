import Icon from './Icon'
import React from 'react'

const STAGES = { awake: 0, rem: 1, core: 2, deep: 3 }
const COLORS = { awake: '#F0943A', rem: '#7B8EF0', core: '#5566CC', deep: '#3344AA' }
const LABELS = ['Awake', 'REM', 'Core', 'Deep']
const TEXT2 = '#8A8FA8'

// Default fake sleep stages data
const defaultStages = [
  { stage: 'core', startMin: 0, endMin: 25 },
  { stage: 'deep', startMin: 25, endMin: 55 },
  { stage: 'core', startMin: 55, endMin: 75 },
  { stage: 'rem', startMin: 75, endMin: 110 },
  { stage: 'awake', startMin: 110, endMin: 118 },
  { stage: 'core', startMin: 118, endMin: 150 },
  { stage: 'deep', startMin: 150, endMin: 195 },
  { stage: 'core', startMin: 195, endMin: 225 },
  { stage: 'rem', startMin: 225, endMin: 270 },
  { stage: 'core', startMin: 270, endMin: 295 },
  { stage: 'awake', startMin: 295, endMin: 300 },
  { stage: 'core', startMin: 300, endMin: 330 },
  { stage: 'rem', startMin: 330, endMin: 375 },
  { stage: 'core', startMin: 375, endMin: 400 },
  { stage: 'deep', startMin: 400, endMin: 420 },
  { stage: 'core', startMin: 420, endMin: 442 },
]

export default function SleepHypnogram({ stages = defaultStages, width = 350, height = 120, startTime = '11:02 PM', endTime = '6:24 AM' }) {
  const pad = { top: 10, right: 10, bottom: 28, left: 50 }
  const w = width - pad.left - pad.right
  const h = height - pad.top - pad.bottom
  const totalMin = stages.length ? stages[stages.length - 1].endMin : 442
  const levelH = h / 4

  const toX = min => pad.left + (min / totalMin) * w
  const toY = stage => pad.top + STAGES[stage] * levelH + levelH / 2

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {/* Typical range band */}
      <rect x={pad.left} y={pad.top + levelH} width={w} height={levelH * 2} fill="rgba(255,255,255,0.03)" />
      {/* Stage labels */}
      {LABELS.map((l, i) => (
        <text key={i} x={pad.left - 6} y={pad.top + i * levelH + levelH / 2 + 4} fill={TEXT2} fontSize={9} textAnchor="end">{l}</text>
      ))}
      {/* Step lines */}
      {stages.map((s, i) => {
        const x1 = toX(s.startMin)
        const x2 = toX(s.endMin)
        const y = toY(s.stage)
        const nextY = i < stages.length - 1 ? toY(stages[i + 1].stage) : y
        return (
          <g key={i}>
            <line x1={x1} y1={y} x2={x2} y2={y} stroke={COLORS[s.stage]} strokeWidth={3} strokeLinecap="round" />
            {i < stages.length - 1 && <line x1={x2} y1={y} x2={x2} y2={nextY} stroke={COLORS[stages[i + 1].stage]} strokeWidth={1.5} opacity={0.5} />}
          </g>
        )
      })}
      {/* Time axis */}
      <text x={pad.left} y={height - 4} fill={TEXT2} fontSize={10}>{startTime}</text>
      <text x={pad.left + w} y={height - 4} fill={TEXT2} fontSize={10} textAnchor="end">☀️ {endTime}</text>
    </svg>
  )
}

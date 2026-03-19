import React from 'react'

const BG = '#0F1117'
const SURFACE = '#1A1E25'
const SURFACE2 = '#22272F'
const BORDER = '#2A3040'
const TEXT = '#FFFFFF'
const TEXT2 = '#8A8FA8'
const SLEEP_COLOR = '#7B8EF0'
const STRAIN_COLOR = '#F0943A'
const RECOVERY_COLOR = '#6ECC6E'

const hrPoints = Array.from({ length: 30 }, (_, i) => ({
  x: i,
  y: 100 + Math.random() * 70,
}))

const zones = [
  { zone: 'Zone 5', color: '#E74C3C', pct: 5, time: '0:30', range: '170+ bpm' },
  { zone: 'Zone 4', color: '#F0943A', pct: 10, time: '2:00', range: '155-170 bpm' },
  { zone: 'Zone 3', color: '#F5C842', pct: 25, time: '8:30', range: '140-155 bpm' },
  { zone: 'Zone 2', color: '#6ECC6E', pct: 40, time: '13:36', range: '125-140 bpm' },
  { zone: 'Zone 1', color: '#5B8DEF', pct: 15, time: '5:06', range: '110-125 bpm' },
  { zone: 'Zone 0', color: '#8A8FA8', pct: 5, time: '4:18', range: '<110 bpm' },
]

function HRLineChart() {
  const w = 350
  const h = 150
  const padX = 10
  const padY = 10
  const drawW = w - padX * 2
  const drawH = h - padY * 2

  const minY = 100
  const maxY = 170

  const toX = (i) => padX + (i / (hrPoints.length - 1)) * drawW
  const toY = (v) => padY + drawH - ((Math.min(Math.max(v, minY), maxY) - minY) / (maxY - minY)) * drawH

  const polyline = hrPoints.map((p, i) => `${toX(i)},${toY(p.y)}`).join(' ')

  const zoneBands = [
    { y1: minY, y2: 120, color: 'rgba(138,143,168,0.1)' },
    { y1: 120, y2: 140, color: 'rgba(110,204,110,0.1)' },
    { y1: 140, y2: 160, color: 'rgba(245,200,66,0.1)' },
    { y1: 160, y2: maxY, color: 'rgba(231,76,60,0.1)' },
  ]

  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      {zoneBands.map((band, i) => (
        <rect
          key={i}
          x={padX}
          y={toY(band.y2)}
          width={drawW}
          height={toY(band.y1) - toY(band.y2)}
          fill={band.color}
        />
      ))}
      <polyline
        points={polyline}
        fill="none"
        stroke={STRAIN_COLOR}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function WorkoutDetailModal({ closeModal }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 150, background: BG,
      overflowY: 'auto', maxWidth: 390, margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            onClick={closeModal}
            style={{
              width: 20, height: 20, borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              fontSize: 14, color: TEXT2,
            }}
          >✕</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: TEXT }}>Upper Body Strength</div>
          <div style={{ fontSize: 16, color: TEXT2, cursor: 'pointer' }}>↑ ...</div>
        </div>
        <div style={{ textAlign: 'center', fontSize: 13, color: TEXT2, marginTop: 4 }}>
          March 19, 2026 at 9:00 AM
        </div>
      </div>

      {/* Summary card */}
      <div style={{
        background: SURFACE, borderRadius: 14, padding: 16, margin: '16px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>❤️</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: TEXT }}>134 bpm</span>
          </div>
          <span style={{ fontSize: 13, color: TEXT2 }}>Heart Rate</span>
        </div>
        <div style={{ fontSize: 12, color: TEXT2, marginTop: 8 }}>Tracked with Apple Watch</div>
      </div>

      {/* Cardio Impact */}
      <div style={{ padding: '0 20px', marginTop: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>Cardio Impact</div>

        {/* Cardio Load card */}
        <div style={{ background: SURFACE, borderRadius: 14, padding: 16, marginTop: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: TEXT2 }}>Cardio Load</span>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#5B8DEF' }}>+8</span>
              <div style={{ fontSize: 12, color: '#5B8DEF' }}>Maintaining</div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: TEXT2, width: 40 }}>Before</span>
              <div style={{
                height: 8, borderRadius: 4, background: BORDER,
                width: `${(44 / 60) * 100}%`,
              }} />
              <span style={{ fontSize: 12, color: TEXT2 }}>44</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: TEXT2, width: 40 }}>After</span>
              <div style={{
                height: 8, borderRadius: 4, background: '#5B8DEF',
                width: `${(52 / 60) * 100}%`,
              }} />
              <span style={{ fontSize: 12, color: TEXT2 }}>52</span>
            </div>
          </div>
        </div>

        {/* Cardio Focus card */}
        <div style={{ background: SURFACE, borderRadius: 14, padding: 16, marginTop: 10 }}>
          <div style={{ fontSize: 14, color: TEXT2 }}>Cardio Focus</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            <span style={{ fontSize: 13, color: '#6ECC6E' }}>60% Low Aero</span>
            <span style={{ fontSize: 13, color: '#F5C842' }}>38% High Aero</span>
            <span style={{ fontSize: 13, color: '#E74C3C' }}>2% Anaerobic</span>
          </div>
          <div style={{
            display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', marginTop: 8,
          }}>
            <div style={{ width: '60%', background: '#6ECC6E' }} />
            <div style={{ width: '38%', background: '#F5C842' }} />
            <div style={{ width: '2%', background: '#E74C3C' }} />
          </div>
        </div>
      </div>

      {/* Heart Rate */}
      <div style={{ padding: '0 20px', marginTop: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>Heart Rate</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 8 }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: TEXT }}>134 bpm</span>
          <span style={{ fontSize: 12, color: TEXT2 }}>Average HR</span>
          <span style={{ fontSize: 12, color: '#6ECC6E' }}>Zone 2</span>
        </div>
        <div style={{ marginTop: 12 }}>
          <HRLineChart />
        </div>
      </div>

      {/* Heart Rate Zones */}
      <div style={{ padding: '0 20px', marginTop: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>Heart Rate Zones</div>

        {zones.map((z) => (
          <div key={z.zone} style={{
            background: SURFACE, borderRadius: 10, padding: '10px 14px',
            marginTop: 6, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 13, color: z.color, width: 48, flexShrink: 0 }}>{z.zone}</span>
            <div style={{ width: 120, flexShrink: 0 }}>
              <div style={{
                height: 6, borderRadius: 3, background: z.color,
                width: `${(z.pct / 40) * 100}%`,
              }} />
            </div>
            <span style={{ fontSize: 13, color: TEXT, width: 42, flexShrink: 0 }}>{z.time}</span>
            <span style={{ fontSize: 12, color: TEXT2 }}>{z.range}</span>
          </div>
        ))}
      </div>

      {/* Bottom padding */}
      <div style={{ height: 60 }} />
    </div>
  )
}

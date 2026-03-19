import { useState } from 'react'

const BG = '#0A0A0A'
const CARD = '#1C1C1E'
const TEXT = '#FFFFFF'
const TEXT_SECONDARY = '#888888'
const STRAIN_COLOR = '#F0943A'
const RECOVERY_COLOR = '#8BC34A'
const SLEEP_COLOR = '#7B68EE'

const tabs = ['Strain', 'Recovery', 'Sleep', 'Stress', 'Energy']
const tabColors = { Strain: STRAIN_COLOR, Recovery: RECOVERY_COLOR, Sleep: SLEEP_COLOR, Stress: '#FFC107', Energy: '#E8B830' }

function MiniCellRing({ value, color, size = 24 }) {
  const r = 9, sw = 3, circ = 2 * Math.PI * r
  const filled = circ * Math.min(value / 100, 1)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={12} cy={12} r={r} fill="none" stroke="#333" strokeWidth={sw} />
      <circle cx={12} cy={12} r={r} fill="none" stroke={color} strokeWidth={sw}
        strokeDasharray={`${filled} ${circ - filled}`} strokeLinecap="round"
        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
      />
    </svg>
  )
}

// Generate some fake calendar data
function genDayScore() { return Math.round(40 + Math.random() * 55) }

export default function CalendarView({ onClose }) {
  const [activeTab, setActiveTab] = useState('Strain')
  const [month] = useState({ name: 'March 2026', year: 2026, month: 2 })

  const daysInMonth = 31
  const firstDayOfWeek = 6 // March 2026 starts on Sunday (0), but let's say it starts on Sunday
  // Actually March 1, 2026 is a Sunday → firstDayOfWeek = 0
  const startDay = 0
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const cells = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const color = tabColors[activeTab]

  return (
    <div style={{
      position: 'fixed', inset: 0, background: BG, zIndex: 100,
      display: 'flex', flexDirection: 'column',
      paddingTop: 'env(safe-area-inset-top)',
      overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onClose} style={{
          width: 36, height: 36, borderRadius: 18, border: '1px solid #555',
          background: 'none', color: TEXT, fontSize: 18, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>✕</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 18, color: TEXT_SECONDARY, cursor: 'pointer' }}>◀</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>{month.name}</span>
          <span style={{ fontSize: 18, color: TEXT_SECONDARY, cursor: 'pointer' }}>▶</span>
        </div>
        <div style={{ width: 36 }} />
      </div>

      {/* Tab pills */}
      <div style={{ display: 'flex', gap: 8, padding: '0 16px', overflowX: 'auto', marginBottom: 16, flexShrink: 0 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            padding: '6px 16px', borderRadius: 16, border: 'none', whiteSpace: 'nowrap',
            background: activeTab === t ? tabColors[t] + '22' : 'transparent',
            color: activeTab === t ? tabColors[t] : TEXT_SECONDARY,
            fontSize: 13, fontWeight: 600,
          }}>{t}</button>
        ))}
      </div>

      {/* Day labels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '0 12px', marginBottom: 4 }}>
        {dayLabels.map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 12, color: TEXT_SECONDARY, fontWeight: 600, padding: 4 }}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, padding: '0 12px' }}>
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const isToday = day === 19
          const score = day <= 19 ? genDayScore() : 0
          return (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '6px 2px', borderRadius: 12,
              background: isToday ? '#222' : 'transparent',
            }}>
              {day <= 19 ? (
                <MiniCellRing value={score} color={color} />
              ) : (
                <div style={{ width: 24, height: 24 }} />
              )}
              <span style={{
                fontSize: 11, color: isToday ? TEXT : day <= 19 ? TEXT_SECONDARY : '#444',
                fontWeight: isToday ? 700 : 400, marginTop: 2,
              }}>{day}</span>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 16px', marginTop: 'auto' }}>
        <button style={{
          padding: '8px 20px', borderRadius: 16, border: '1px solid #444',
          background: 'none', color: TEXT, fontSize: 14, fontWeight: 600,
        }}>Today</button>
        <button style={{
          width: 36, height: 36, borderRadius: 18, border: '1px solid #444',
          background: 'none', color: TEXT_SECONDARY, fontSize: 16, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>ⓘ</button>
      </div>
    </div>
  )
}

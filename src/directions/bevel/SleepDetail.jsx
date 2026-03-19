import { useState } from 'react'
import { today } from '../../data/fake'

const BG = '#0A0A0A'
const CARD = '#1C1C1E'
const TEXT = '#FFFFFF'
const TEXT_SECONDARY = '#888888'
const SEPARATOR = '#333333'
const SLEEP_COLOR = '#7B68EE'
const COACHING_LABEL = '#E8B830'

function MiniRing({ value, max, color, size = 52 }) {
  const r = 20 * (size / 52), sw = 5 * (size / 52)
  const circ = 2 * Math.PI * r
  const filled = circ * Math.min(value / max, 1)
  const cx = size / 2, cy = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#333" strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={sw}
        strokeDasharray={`${filled} ${circ - filled}`} strokeLinecap="round"
        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
      />
    </svg>
  )
}

function QualityBar({ label, status, statusColor, pct }) {
  return (
    <div style={{ background: '#222', borderRadius: 10, padding: 12 }}>
      <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: statusColor, marginBottom: 6 }}>{status}</div>
      <div style={{ height: 4, borderRadius: 2, background: '#333' }}>
        <div style={{ height: 4, borderRadius: 2, background: statusColor, width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function SleepDetail({ onClose }) {
  const s = today.sleep
  const [chartTab, setChartTab] = useState('HR')

  const r = 58, sw = 12, size = 150
  const circ = 2 * Math.PI * r
  const filled = circ * (s.score / 100)
  const cx = size / 2, cy = size / 2

  const qualityCards = [
    { label: 'Time Asleep', status: 'Good', statusColor: '#8BC34A', pct: 80 },
    { label: 'HR Dip', status: 'Fair', statusColor: '#FFC107', pct: 55 },
    { label: 'REM Sleep', status: 'Good', statusColor: '#8BC34A', pct: 75 },
    { label: 'Deep Sleep', status: 'Good', statusColor: '#8BC34A', pct: 82 },
    { label: 'Efficiency', status: 'Great', statusColor: '#8BC34A', pct: 94 },
    { label: 'Continuity', status: 'Fair', statusColor: '#FFC107', pct: 60 },
  ]

  const stages = [
    { label: 'Awake', time: '28m', pct: '6%', color: '#FF6B35' },
    { label: 'REM', time: '1h 58m', pct: '27%', color: '#5B8DEF' },
    { label: 'Core', time: '3h 12m', pct: '43%', color: '#7B68EE' },
    { label: 'Deep', time: '1h 44m', pct: '24%', color: '#3F51B5' },
  ]

  const chartTabs = ['HR', 'HRV', 'RR', 'SpO2']

  return (
    <div style={{
      position: 'fixed', inset: 0, background: BG, zIndex: 100,
      display: 'flex', flexDirection: 'column',
      paddingTop: 'env(safe-area-inset-top)',
      overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(to bottom, #1A1A3E, #0A0A0A)',
        padding: '16px 16px 40px', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', left: 16, top: 16,
          width: 36, height: 36, borderRadius: 18, border: '1px solid #555',
          background: 'none', color: TEXT, fontSize: 18, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>←</button>
        <div style={{ fontSize: 20, fontWeight: 700, color: TEXT, marginTop: 4 }}>Sleep</div>
        <div style={{ fontSize: 14, color: TEXT_SECONDARY, marginTop: 4 }}>March 19, 2026 ▾</div>

        <div style={{ marginTop: 24 }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <defs>
              <linearGradient id="sleepGradLg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5B8DEF" />
                <stop offset="100%" stopColor="#7B68EE" />
              </linearGradient>
            </defs>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#333" strokeWidth={sw} />
            <circle cx={cx} cy={cy} r={r} fill="none"
              stroke="url(#sleepGradLg)" strokeWidth={sw}
              strokeDasharray={`${filled} ${circ - filled}`}
              strokeLinecap="round"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            />
          </svg>
        </div>

        <div style={{ fontSize: 48, fontWeight: 800, color: TEXT, marginTop: 8 }}>{s.score}%</div>
        <div style={{ fontSize: 16, color: SLEEP_COLOR, fontWeight: 600 }}>Sleep</div>
        <div style={{ fontSize: 14, color: TEXT_SECONDARY, marginTop: 4 }}>
          {s.total} total · {s.efficiency}% efficiency
        </div>
      </div>

      <div style={{ padding: '0 16px', marginTop: -16 }}>
        {/* Coaching */}
        <div style={{ background: CARD, borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, color: COACHING_LABEL, textTransform: 'uppercase' }}>COACHING</span>
          <p style={{ fontSize: 15, color: TEXT, lineHeight: 1.5, marginTop: 10 }}>
            Excellent sleep quality. Deep sleep was above average, supporting muscle recovery and memory consolidation. Try to maintain this bedtime.
          </p>
        </div>

        {/* Sleep quality cards 2x3 grid */}
        <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, marginBottom: 12 }}>Sleep Quality</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {qualityCards.map((c) => (
            <QualityBar key={c.label} {...c} />
          ))}
        </div>

        {/* Sleep stage breakdown 2x2 */}
        <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, marginBottom: 12 }}>Sleep Stages</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {stages.map((st) => (
            <div key={st.label} style={{ background: CARD, borderRadius: 14, padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
              <MiniRing value={parseInt(st.pct)} max={100} color={st.color} />
              <div>
                <div style={{ fontSize: 13, color: TEXT_SECONDARY }}>{st.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>{st.time}</div>
                <div style={{ fontSize: 12, color: st.color }}>{st.pct}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts section */}
        <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, marginBottom: 12 }}>Charts</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {chartTabs.map((t) => (
            <button key={t} onClick={() => setChartTab(t)} style={{
              padding: '6px 16px', borderRadius: 16, border: 'none',
              background: chartTab === t ? '#333' : 'transparent',
              color: chartTab === t ? TEXT : TEXT_SECONDARY,
              fontSize: 13, fontWeight: 600,
            }}>{t}</button>
          ))}
        </div>

        <div style={{ background: CARD, borderRadius: 16, padding: 16, marginBottom: 32 }}>
          {chartTab === 'HR' && (
            <svg width="100%" height={80} viewBox="0 0 300 80" preserveAspectRatio="none" style={{ display: 'block' }}>
              {/* Scatter plot with trend */}
              {Array.from({ length: 40 }).map((_, i) => {
                const x = (i / 39) * 290 + 5
                const base = 52 + Math.sin(i * 0.3) * 8
                const y = 80 - ((base - 40) / 30) * 70 + (Math.random() * 6 - 3)
                return <circle key={i} cx={x} cy={y} r="2" fill="#E91E63" opacity="0.6" />
              })}
              <path d="M5,50 Q75,35 150,42 T300,38" fill="none" stroke="#7B68EE" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
          {chartTab === 'HRV' && (
            <svg width="100%" height={80} viewBox="0 0 300 80" preserveAspectRatio="none" style={{ display: 'block' }}>
              <defs>
                <linearGradient id="hrvArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8BC34A" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#8BC34A" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M5,60 Q50,30 100,45 T200,35 T300,50 L300,80 L5,80 Z" fill="url(#hrvArea)" />
              <path d="M5,60 Q50,30 100,45 T200,35 T300,50" fill="none" stroke="#8BC34A" strokeWidth="2" />
            </svg>
          )}
          {chartTab === 'RR' && (
            <svg width="100%" height={80} viewBox="0 0 300 80" preserveAspectRatio="none" style={{ display: 'block' }}>
              <path d="M5,40 Q75,35 150,38 T300,42" fill="none" stroke="#5B8DEF" strokeWidth="2" />
            </svg>
          )}
          {chartTab === 'SpO2' && (
            <svg width="100%" height={80} viewBox="0 0 300 80" preserveAspectRatio="none" style={{ display: 'block' }}>
              <defs>
                <linearGradient id="spo2Area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00BCD4" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00BCD4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M5,15 Q75,12 150,14 T300,16 L300,80 L5,80 Z" fill="url(#spo2Area)" />
              <path d="M5,15 Q75,12 150,14 T300,16" fill="none" stroke="#00BCD4" strokeWidth="2" />
            </svg>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 11, color: TEXT_SECONDARY }}>10 PM</span>
            <span style={{ fontSize: 11, color: TEXT_SECONDARY }}>2 AM</span>
            <span style={{ fontSize: 11, color: TEXT_SECONDARY }}>6 AM</span>
          </div>
        </div>
      </div>
    </div>
  )
}

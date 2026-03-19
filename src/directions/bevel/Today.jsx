import { useState } from 'react'
import { user, today } from '../../data/fake'
import StrainDetail from './StrainDetail'
import RecoveryDetail from './RecoveryDetail'
import SleepDetail from './SleepDetail'
import CalendarView from './CalendarView'
import WorkoutDetail from './WorkoutDetail'

const BG = '#0A0A0A'
const CARD = '#1C1C1E'
const CARD2 = '#2A2A2A'
const TEXT = '#FFFFFF'
const TEXT_SECONDARY = '#888888'
const TEXT_MUTED = '#555555'
const SEPARATOR = '#333333'
const STRAIN_COLOR = '#F0943A'
const RECOVERY_COLOR = '#8BC34A'
const SLEEP_COLOR = '#7B68EE'
const COACHING_LABEL = '#E8B830'
const BLUE_STATUS = '#5B8DEF'
const GREEN_STATUS = '#4CAF50'

/* ── Score Ring (full 360°) ──────────────────────────── */
function ScoreRing({ value, max, gradStart, gradEnd, label, size = 100, id }) {
  const r = 44 * (size / 100)
  const sw = 10 * (size / 100)
  const circ = 2 * Math.PI * r
  const pct = Math.min(value / max, 1)
  const filled = circ * pct
  const cx = size / 2, cy = size / 2
  const display = max === 21 ? Math.round(pct * 100) + '%' : value + '%'

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradStart} />
          <stop offset="100%" stopColor={gradEnd} />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#333" strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke={`url(#${id})`} strokeWidth={sw}
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
      />
      <text x={cx} y={cy - 2} textAnchor="middle" fontSize={size * 0.18} fontWeight="800" fill="white" dominantBaseline="central">
        {display}
      </text>
      <text x={cx} y={cy + size * 0.14} textAnchor="middle" fontSize={size * 0.11} fill="#888">
        {label}
      </text>
    </svg>
  )
}

/* ── Strain Ring with hatched target zone ─────────────── */
function StrainRing({ value, max = 21, targetMin = 41, targetMax = 63, size = 100 }) {
  const r = 44 * (size / 100)
  const sw = 10 * (size / 100)
  const circ = 2 * Math.PI * r
  const pct = Math.min(value / max, 1)
  const filled = circ * pct
  const cx = size / 2, cy = size / 2
  const display = Math.round(pct * 100) + '%'

  const targetLen = circ * (targetMax - targetMin) / 100
  const gapLen = circ - targetLen
  const targetOffset = circ * (1 - targetMin / 100 + 0.25)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#F5C84240" strokeWidth="3" />
        </pattern>
        <linearGradient id="strainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F5C842" />
          <stop offset="100%" stopColor="#F0943A" />
        </linearGradient>
      </defs>
      {/* Track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#333" strokeWidth={sw} />
      {/* Target zone hatch */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#hatch)"
        strokeWidth={sw + 4}
        strokeDasharray={`${targetLen} ${gapLen}`}
        strokeDashoffset={targetOffset}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
      />
      {/* Fill arc */}
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke="url(#strainGrad)" strokeWidth={sw}
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
      />
      <text x={cx} y={cy - 2} textAnchor="middle" fontSize={size * 0.18} fontWeight="800" fill="white" dominantBaseline="central">
        {display}
      </text>
      <text x={cx} y={cy + size * 0.14} textAnchor="middle" fontSize={size * 0.11} fill="#888">
        Strain
      </text>
    </svg>
  )
}

/* ── Stress gauge (semicircle dots) ──────────────────── */
function SegmentedStressGauge({ value }) {
  const ticks = 30
  const filled = Math.round((value / 100) * ticks)
  const tickColor = (i) => {
    const p = i / ticks
    if (p < 0.33) return '#4CAF50'
    if (p < 0.55) return '#8BC34A'
    if (p < 0.70) return '#FFC107'
    if (p < 0.85) return '#FF9800'
    return '#F44336'
  }
  return (
    <svg width={90} height={50} viewBox="0 0 90 50">
      {Array.from({ length: ticks }).map((_, i) => {
        const angle = (i / (ticks - 1)) * Math.PI
        const rad = 38
        const x = 45 + rad * Math.cos(Math.PI - angle)
        const y = 48 - rad * Math.sin(angle)
        return <circle key={i} cx={x} cy={y} r={2.2} fill={i < filled ? tickColor(i) : '#444'} />
      })}
      <text x="45" y="38" textAnchor="middle" fontSize="18" fontWeight="700" fill="white">{value}</text>
      <text x="45" y="50" textAnchor="middle" fontSize="10" fill="#E8962F">Med</text>
    </svg>
  )
}

/* ── Vertical Gauge (health monitor cards) ─────────── */
function VerticalGauge({ value, color, max = 100 }) {
  const h = 70
  const fillH = (value / max) * h
  return (
    <div style={{ width: 8, height: h, borderRadius: 4, background: '#333', position: 'relative', alignSelf: 'center' }}>
      <div style={{
        position: 'absolute', bottom: 0, width: '100%', height: fillH,
        borderRadius: 4, background: color,
      }} />
      <div style={{
        position: 'absolute', bottom: fillH - 5, left: '50%', transform: 'translateX(-50%)',
        width: 12, height: 12, borderRadius: 6, background: BG,
        border: `2px solid ${color}`,
      }} />
    </div>
  )
}

/* ── Main Today screen ───────────────────────────────── */
export default function TodayScreen() {
  const [modal, setModal] = useState(null)
  const strainPct = Math.round(today.strain / 21 * 100)

  if (modal === 'strain') return <StrainDetail onClose={() => setModal(null)} />
  if (modal === 'recovery') return <RecoveryDetail onClose={() => setModal(null)} />
  if (modal === 'sleep') return <SleepDetail onClose={() => setModal(null)} />
  if (modal === 'calendar') return <CalendarView onClose={() => setModal(null)} />
  if (modal === 'workout') return <WorkoutDetail onClose={() => setModal(null)} />

  const healthMetrics = [
    { label: 'RR', icon: '🌬', value: 15.7, unit: 'rpm', status: 'Lower', statusColor: BLUE_STATUS, arrow: '↓', gaugeValue: 45, gaugeColor: BLUE_STATUS },
    { label: 'RHR', icon: '❤️', value: 52, unit: 'bpm', status: 'Normal', statusColor: GREEN_STATUS, arrow: '✓', gaugeValue: 52, gaugeColor: GREEN_STATUS },
    { label: 'HRV', icon: '📈', value: 68, unit: 'ms', status: 'Higher', statusColor: BLUE_STATUS, arrow: '↑', gaugeValue: 68, gaugeColor: BLUE_STATUS },
    { label: 'SpO2', icon: '🩸', value: 98, unit: '%', status: 'Normal', statusColor: GREEN_STATUS, arrow: '✓', gaugeValue: 98, gaugeColor: GREEN_STATUS },
    { label: 'Temp', icon: '🌡', value: 97.6, unit: '°F', status: 'Normal', statusColor: GREEN_STATUS, arrow: '✓', gaugeValue: 65, gaugeColor: GREEN_STATUS },
    { label: 'Weight', icon: '⚖️', value: 178.4, unit: 'lbs', status: '', statusColor: TEXT_SECONDARY, arrow: '', gaugeValue: 60, gaugeColor: '#666' },
  ]

  return (
    <div style={{ padding: '0 16px 24px', paddingTop: 'var(--safe-top)' }}>
      {/* Date header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', marginBottom: 12 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: TEXT, cursor: 'pointer' }} onClick={() => setModal('calendar')}>
          March 19, 2026 <span style={{ color: TEXT_SECONDARY, fontSize: 18 }}>▾</span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button style={{ width: 36, height: 36, borderRadius: 18, border: '1px solid #444', background: 'none', color: TEXT, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↗</button>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#CCC' }}>{user.initials}</div>
        </div>
      </div>

      {/* Status pills */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <div style={{ background: CARD, borderRadius: 24, height: 44, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: GREEN_STATUS, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="white">
              <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3A7.28 7.28 0 0018 12.5v-2h-2c-1.86-.64-3.42-1.4-4.5-2.5l-1.2-1.3c-.4-.4-1-.6-1.6-.6-.2 0-.3 0-.5.1L6 8.3V13h2V9.6l1.8-.7" />
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 600, color: TEXT }}>Active</span>
          <svg width={12} height={12} viewBox="0 0 24 24" fill={TEXT_MUTED}><path d="M10 6l6 6-6 6z" /></svg>
        </div>
        <div style={{ background: CARD, borderRadius: 24, height: 44, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="#6888A8">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 500, color: TEXT }}>72°F · SF</span>
        </div>
      </div>

      {/* ── Score Rings Card ────────────────────────── */}
      <div style={{ background: CARD, borderRadius: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '20px 8px 16px' }}>
          <div style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => setModal('strain')}>
            <StrainRing value={today.strain} size={100} />
          </div>
          <div style={{ width: 1, height: 80, background: SEPARATOR }} />
          <div style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => setModal('recovery')}>
            <ScoreRing value={today.readiness.score} max={100} gradStart="#CDDC39" gradEnd="#8BC34A" label="Recovery" size={100} id="recovGrad" />
          </div>
          <div style={{ width: 1, height: 80, background: SEPARATOR }} />
          <div style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => setModal('sleep')}>
            <ScoreRing value={today.sleep.score} max={100} gradStart="#5B8DEF" gradEnd="#7B68EE" label="Sleep" size={100} id="sleepGrad" />
          </div>
        </div>
        {/* Coaching */}
        <div style={{ height: 1, background: SEPARATOR, margin: '0 20px' }} />
        <div style={{ padding: '16px 20px 20px' }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, color: COACHING_LABEL, textTransform: 'uppercase' }}>COACHING</span>
          <p style={{ fontSize: 15, color: TEXT, lineHeight: 1.5, margin: '10px 0 0', fontWeight: 400 }}>
            Your recovery is excellent today! HRV is trending up 12% this week. Focus on Zone 2 training to maximize aerobic gains.
          </p>
        </div>
      </div>

      {/* ── Stress & Energy ─────────────────────────── */}
      <div style={{ fontSize: 20, fontWeight: 700, color: TEXT, marginBottom: 12 }}>Stress & Energy</div>

      {/* Stress card */}
      <div style={{ background: CARD, borderRadius: 16, padding: 20, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: GREEN_STATUS }} />
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: TEXT }}>Today's stress</div>
              <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginTop: 2 }}>Last updated at 10:54 PM</div>
            </div>
          </div>
          <SegmentedStressGauge value={40} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#F44336' }}>100</div>
            <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginTop: 2 }}>Highest</div>
          </div>
          <div style={{ width: 1, height: 36, background: SEPARATOR }} />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: TEXT_SECONDARY }}>2</div>
            <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginTop: 2 }}>Lowest</div>
          </div>
          <div style={{ width: 1, height: 36, background: SEPARATOR }} />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#E8962F' }}>40</div>
            <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginTop: 2 }}>Average</div>
          </div>
        </div>
      </div>

      {/* Energy bar card */}
      <div style={{ background: CARD, borderRadius: 16, padding: 20, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
        <svg width={22} height={22} viewBox="0 0 24 24" fill="#F5C842">
          <path d="M7 2v11h3v9l7-12h-4l4-8z" />
        </svg>
        <div style={{ flex: 1, display: 'flex', gap: 1 }}>
          {Array.from({ length: 40 }, (_, i) => (
            <div key={i} style={{
              width: 3, height: 10, borderRadius: 1,
              background: i < Math.round(0.72 * 40) ? '#E8B830' : '#333',
            }} />
          ))}
        </div>
        <span style={{ fontSize: 16, fontWeight: 600, color: TEXT }}>72%</span>
      </div>

      {/* ── Health Monitor ──────────────────────────── */}
      <div style={{ fontSize: 20, fontWeight: 700, color: TEXT, marginBottom: 12 }}>Health Monitor</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        {healthMetrics.map((m) => (
          <div key={m.label} style={{
            background: CARD, borderRadius: 12, padding: 16, minHeight: 140,
            display: 'flex', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14 }}>{m.icon}</span>
                <span style={{ fontSize: 13, color: TEXT_SECONDARY }}>{m.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                <span style={{ fontSize: 30, fontWeight: 700, color: TEXT }}>{m.value}</span>
                <span style={{ fontSize: 14, color: TEXT_SECONDARY }}>{m.unit}</span>
              </div>
              {m.status ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: m.statusColor }}>{m.arrow}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: m.statusColor }}>{m.status}</span>
                </div>
              ) : <div style={{ height: 20 }} />}
            </div>
            <VerticalGauge value={m.gaugeValue} color={m.gaugeColor} />
          </div>
        ))}
      </div>

      {/* ── Cardio Load card ────────────────────────── */}
      <div style={{ background: CARD, borderRadius: 16, padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#7B68EE" strokeWidth={2}>
            <path d="M2 12c2-4 4-6 6-2s4 4 6 0 4-2 6 2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 15, fontWeight: 600, color: TEXT }}>Cardio Load</span>
        </div>
        {/* Mini area chart */}
        <svg width="100%" height={60} viewBox="0 0 300 60" preserveAspectRatio="none" style={{ display: 'block', marginBottom: 12 }}>
          <defs>
            <linearGradient id="cardioGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7B68EE" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#7B68EE" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,45 Q30,40 60,38 T120,30 T180,25 T240,32 T300,40 L300,60 L0,60 Z" fill="url(#cardioGrad)" />
          <path d="M0,45 Q30,40 60,38 T120,30 T180,25 T240,32 T300,40" fill="none" stroke="#7B68EE" strokeWidth="2" />
        </svg>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 30, fontWeight: 700, color: TEXT }}>28</span>
          <span style={{ fontSize: 14, color: '#FF9800', fontWeight: 500 }}>/ Detraining</span>
        </div>
      </div>

      {/* ── Timeline ────────────────────────────────── */}
      <div style={{ fontSize: 20, fontWeight: 700, color: TEXT, marginBottom: 12 }}>Timeline</div>
      {[
        { name: 'Upper Body Strength', time: '7:30 AM - 8:45 AM', icon: '🏋️' },
        { name: 'Evening Walk', time: '6:00 PM - 6:35 PM', icon: '🚶' },
      ].map((act, i) => (
        <div key={i} onClick={() => setModal('workout')} style={{
          background: CARD, borderRadius: 14, padding: '14px 16px', marginBottom: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: CARD2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
              {act.icon}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: TEXT }}>{act.name}</div>
              <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginTop: 2 }}>{act.time}</div>
            </div>
          </div>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={TEXT_SECONDARY} strokeWidth={2}><polyline points="9 18 15 12 9 6" /></svg>
        </div>
      ))}
    </div>
  )
}

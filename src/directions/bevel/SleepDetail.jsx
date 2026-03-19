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

/* ── Primary Sleep Detailed View ───────────────────── */
function PrimarySleepView({ onClose }) {
  const stageTimeline = [
    { stage: 'Light', pct: 12, color: '#7B68EE' },
    { stage: 'Deep', pct: 8, color: '#3F51B5' },
    { stage: 'Light', pct: 6, color: '#7B68EE' },
    { stage: 'REM', pct: 10, color: '#5B8DEF' },
    { stage: 'Awake', pct: 2, color: '#FF6B35' },
    { stage: 'Light', pct: 10, color: '#7B68EE' },
    { stage: 'Deep', pct: 9, color: '#3F51B5' },
    { stage: 'Light', pct: 8, color: '#7B68EE' },
    { stage: 'REM', pct: 12, color: '#5B8DEF' },
    { stage: 'Awake', pct: 1, color: '#FF6B35' },
    { stage: 'Light', pct: 7, color: '#7B68EE' },
    { stage: 'Deep', pct: 6, color: '#3F51B5' },
    { stage: 'REM', pct: 5, color: '#5B8DEF' },
    { stage: 'Awake', pct: 1, color: '#FF6B35' },
    { stage: 'Light', pct: 3, color: '#7B68EE' },
  ]

  const stats = [
    { label: 'Sleep Score', value: '87%' },
    { label: 'Efficiency', value: '94%' },
    { label: 'Time Asleep', value: '7h 22m' },
    { label: 'Latency', value: '12m' },
    { label: 'REM', value: '1h 58m' },
    { label: 'Deep', value: '1h 44m' },
  ]

  // Simulated HR during sleep: 60 points
  const hrData = Array.from({ length: 60 }, (_, i) => {
    const t = i / 59
    const base = 62 - 14 * Math.sin(t * Math.PI)
    return base + Math.sin(i * 0.8) * 4 + Math.sin(i * 0.3) * 3
  })

  // Simulated HRV during sleep: 60 points
  const hrvData = Array.from({ length: 60 }, (_, i) => {
    const t = i / 59
    const base = 58 + 18 * Math.sin(t * Math.PI * 0.8)
    return base + Math.sin(i * 0.5) * 5
  })

  function LineChart({ data, color, minVal, maxVal, id }) {
    const w = 300, h = 120
    const points = data.map((v, i) => {
      const x = (i / (data.length - 1)) * w
      const y = h - ((v - minVal) / (maxVal - minVal)) * (h - 10) - 5
      return `${x},${y}`
    })
    const pathD = `M${points.join(' L')}`
    const areaD = `${pathD} L${w},${h} L0,${h} Z`
    return (
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#${id})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }

  const stageRows = [
    { label: 'Awake', detail: '4 times, 28 min total', color: '#FF6B35' },
    { label: 'REM', detail: '3 cycles, 1h 58m', color: SLEEP_COLOR },
    { label: 'Light', detail: '3h 12m', color: '#9B8FD8' },
    { label: 'Deep', detail: '1h 44m', color: '#3F51B5' },
  ]

  return (
    <div style={{
      position: 'fixed', inset: 0, background: BG, zIndex: 110,
      display: 'flex', flexDirection: 'column',
      paddingTop: 'env(safe-area-inset-top)',
      overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onClose} style={{
          width: 36, height: 36, borderRadius: 18, border: '1px solid #555',
          background: 'none', color: TEXT, fontSize: 18, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>←</button>
        <div style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>Primary Sleep</div>
      </div>

      {/* Time range */}
      <div style={{ padding: '0 16px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, color: TEXT_SECONDARY }}>🌙</span>
        <span style={{ fontSize: 16, fontWeight: 600, color: TEXT }}>11:02 PM → 6:24 AM</span>
        <span style={{ fontSize: 14, color: TEXT_SECONDARY }}>☀️</span>
      </div>

      <div style={{ padding: '0 16px' }}>
        {/* Sleep stage timeline bar */}
        <div style={{ background: CARD, borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: TEXT_SECONDARY, marginBottom: 8 }}>Sleep Stages Timeline</div>
          <div style={{ display: 'flex', height: 24, borderRadius: 6, overflow: 'hidden' }}>
            {stageTimeline.map((seg, i) => (
              <div key={i} style={{
                flex: seg.pct,
                background: seg.color,
                height: seg.stage === 'Awake' ? 8 : '100%',
                alignSelf: seg.stage === 'Awake' ? 'center' : 'stretch',
                borderRight: i < stageTimeline.length - 1 ? '1px solid rgba(0,0,0,0.3)' : 'none',
              }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 10, color: TEXT_SECONDARY }}>11 PM</span>
            <span style={{ fontSize: 10, color: TEXT_SECONDARY }}>2 AM</span>
            <span style={{ fontSize: 10, color: TEXT_SECONDARY }}>4 AM</span>
            <span style={{ fontSize: 10, color: TEXT_SECONDARY }}>6 AM</span>
          </div>
        </div>

        {/* Key stats grid 2x3 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: CARD, borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* HR during sleep */}
        <div style={{ background: CARD, borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 12 }}>Heart Rate</div>
          <LineChart data={hrData} color={SLEEP_COLOR} minVal={44} maxVal={68} id="pHrGrad" />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 11, color: TEXT_SECONDARY }}>11 PM</span>
            <span style={{ fontSize: 11, color: TEXT_SECONDARY }}>2 AM</span>
            <span style={{ fontSize: 11, color: TEXT_SECONDARY }}>6 AM</span>
          </div>
        </div>

        {/* HRV during sleep */}
        <div style={{ background: CARD, borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 12 }}>HRV</div>
          <LineChart data={hrvData} color="#8BC34A" minVal={50} maxVal={82} id="pHrvGrad" />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 11, color: TEXT_SECONDARY }}>11 PM</span>
            <span style={{ fontSize: 11, color: TEXT_SECONDARY }}>2 AM</span>
            <span style={{ fontSize: 11, color: TEXT_SECONDARY }}>6 AM</span>
          </div>
        </div>

        {/* Sleep stages detail list */}
        <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, marginBottom: 12 }}>Stage Breakdown</div>
        <div style={{ background: CARD, borderRadius: 16, marginBottom: 16 }}>
          {stageRows.map((row, i) => (
            <div key={row.label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px',
              borderBottom: i < stageRows.length - 1 ? `1px solid ${SEPARATOR}` : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: row.color }} />
                <span style={{ fontSize: 15, fontWeight: 600, color: TEXT }}>{row.label}</span>
              </div>
              <span style={{ fontSize: 14, color: TEXT_SECONDARY }}>{row.detail}</span>
            </div>
          ))}
        </div>

        {/* Coaching card */}
        <div style={{ background: CARD, borderRadius: 16, padding: 20, marginBottom: 32 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, color: COACHING_LABEL, textTransform: 'uppercase' }}>COACHING</span>
          <p style={{ fontSize: 15, color: TEXT, lineHeight: 1.5, marginTop: 10 }}>
            Your deep sleep was excellent at 23% of total sleep time, well above the 13-23% optimal range. Keep maintaining consistent bedtime habits.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SleepDetail({ onClose }) {
  const s = today.sleep
  const [chartTab, setChartTab] = useState('HR')
  const [showPrimary, setShowPrimary] = useState(false)

  if (showPrimary) return <PrimarySleepView onClose={() => setShowPrimary(false)} />

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

        {/* Primary sleep row */}
        <div onClick={() => setShowPrimary(true)} style={{
          background: CARD, borderRadius: 14, padding: '14px 16px', marginBottom: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🌙</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: TEXT }}>Primary sleep</div>
              <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginTop: 2 }}>11:02 PM – 6:24 AM · 7h 22m</div>
            </div>
          </div>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={TEXT_SECONDARY} strokeWidth={2}><polyline points="9 18 15 12 9 6" /></svg>
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

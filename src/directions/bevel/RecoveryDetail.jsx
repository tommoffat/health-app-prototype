import { today, weeklyHRV } from '../../data/fake'

const BG = '#0A0A0A'
const CARD = '#1C1C1E'
const TEXT = '#FFFFFF'
const TEXT_SECONDARY = '#888888'
const SEPARATOR = '#333333'
const RECOVERY_COLOR = '#8BC34A'
const COACHING_LABEL = '#E8B830'

export default function RecoveryDetail({ onClose }) {
  const score = today.readiness.score
  const r = 58, sw = 12, size = 150
  const circ = 2 * Math.PI * r
  const filled = circ * (score / 100)
  const cx = size / 2, cy = size / 2

  // Line chart for trends
  const data = weeklyHRV
  const svgW = 300, svgH = 80
  const min = Math.min(...data) - 5, max = Math.max(...data) + 5
  const range = max - min
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (svgW - 16) + 8
    const y = (svgH - 8) - ((v - min) / range) * (svgH - 16)
    return [x, y]
  })
  const lineD = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')

  const trendRows = [
    { period: '3-day', change: '+4%', sparkColor: RECOVERY_COLOR },
    { period: '7-day', change: '+8%', sparkColor: RECOVERY_COLOR },
    { period: '14-day', change: '+12%', sparkColor: RECOVERY_COLOR },
  ]

  return (
    <div style={{
      position: 'fixed', inset: 0, background: BG, zIndex: 100,
      display: 'flex', flexDirection: 'column',
      paddingTop: 'env(safe-area-inset-top)',
      overflowY: 'auto',
    }}>
      {/* Green gradient header */}
      <div style={{
        background: 'linear-gradient(to bottom, #1A2E1A, #0A0A0A)',
        padding: '16px 16px 40px', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', left: 16, top: 16,
          width: 36, height: 36, borderRadius: 18, border: '1px solid #555',
          background: 'none', color: TEXT, fontSize: 18, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>←</button>
        <div style={{ fontSize: 20, fontWeight: 700, color: TEXT, marginTop: 4 }}>Recovery</div>
        <div style={{ fontSize: 14, color: TEXT_SECONDARY, marginTop: 4 }}>March 19, 2026 ▾</div>

        <div style={{ marginTop: 24 }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <defs>
              <linearGradient id="recGradLg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#CDDC39" />
                <stop offset="100%" stopColor="#8BC34A" />
              </linearGradient>
            </defs>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#333" strokeWidth={sw} />
            <circle cx={cx} cy={cy} r={r} fill="none"
              stroke="url(#recGradLg)" strokeWidth={sw}
              strokeDasharray={`${filled} ${circ - filled}`}
              strokeLinecap="round"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            />
          </svg>
        </div>

        <div style={{ fontSize: 48, fontWeight: 800, color: TEXT, marginTop: 8 }}>{score}%</div>
        <div style={{ fontSize: 16, color: RECOVERY_COLOR, fontWeight: 600 }}>Recovery</div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, padding: '0 16px', marginTop: -16 }}>
        {[
          { label: 'HRV', value: `${today.readiness.hrv} ms` },
          { label: 'RHR', value: `${today.readiness.restingHR} bpm` },
          { label: 'SpO2', value: `${today.readiness.spo2}%` },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, background: CARD, borderRadius: 14, padding: 14, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: TEXT_SECONDARY, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Coaching */}
      <div style={{ background: CARD, borderRadius: 16, margin: '16px 16px 0', padding: 20 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, color: COACHING_LABEL, textTransform: 'uppercase' }}>COACHING</span>
        <p style={{ fontSize: 15, color: TEXT, lineHeight: 1.5, marginTop: 10 }}>
          Your recovery is in the green zone. Your body is primed for high-intensity training today. HRV continues trending upward.
        </p>
      </div>

      {/* Trends */}
      <div style={{ padding: '20px 16px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, marginBottom: 12 }}>Trends</div>

        {/* Period selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {['30D', '3M', '6M', '1Y'].map((p, i) => (
            <button key={p} style={{
              padding: '6px 16px', borderRadius: 16, border: 'none',
              background: i === 0 ? '#333' : 'transparent',
              color: i === 0 ? TEXT : TEXT_SECONDARY,
              fontSize: 13, fontWeight: 600,
            }}>{p}</button>
          ))}
        </div>

        {/* Chart */}
        <div style={{ background: CARD, borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <svg width="100%" height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="none" style={{ display: 'block' }}>
            <defs>
              <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={RECOVERY_COLOR} stopOpacity="0.2" />
                <stop offset="100%" stopColor={RECOVERY_COLOR} stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Normal range band */}
            <rect x="0" y={svgH * 0.25} width={svgW} height={svgH * 0.3} fill="rgba(139,195,74,0.08)" />
            <path d={`${lineD} L${svgW - 8},${svgH} L8,${svgH} Z`} fill="url(#trendArea)" />
            <path d={lineD} fill="none" stroke={RECOVERY_COLOR} strokeWidth="2.5" strokeLinecap="round" />
            {points.map(([x, y], i) => (
              i === points.length - 1 ? <circle key={i} cx={x} cy={y} r="4" fill={RECOVERY_COLOR} stroke={BG} strokeWidth="2" /> : null
            ))}
          </svg>
        </div>

        {/* Trend analysis table */}
        <div style={{ background: CARD, borderRadius: 16, padding: 16 }}>
          {trendRows.map((row, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 0',
              borderBottom: i < trendRows.length - 1 ? `1px solid ${SEPARATOR}` : 'none',
            }}>
              <span style={{ fontSize: 14, color: TEXT }}>{row.period}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: RECOVERY_COLOR }}>{row.change}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { today } from '../../data/fake'

const BG = '#0A0A0A'
const CARD = '#1C1C1E'
const TEXT = '#FFFFFF'
const TEXT_SECONDARY = '#888888'
const SEPARATOR = '#333333'
const COACHING_LABEL = '#E8B830'
const STRAIN_COLOR = '#F0943A'

export default function StrainDetail({ onClose }) {
  const pct = Math.round(today.strain / 21 * 100)
  const r = 58, sw = 12, size = 150
  const circ = 2 * Math.PI * r
  const filled = circ * (pct / 100)
  const cx = size / 2, cy = size / 2

  const targetMin = 41, targetMax = 63
  const targetLen = circ * (targetMax - targetMin) / 100
  const gapLen = circ - targetLen
  const targetOffset = circ * (1 - targetMin / 100 + 0.25)

  return (
    <div style={{
      position: 'fixed', inset: 0, background: BG, zIndex: 100,
      display: 'flex', flexDirection: 'column',
      paddingTop: 'env(safe-area-inset-top)',
      overflowY: 'auto',
    }}>
      {/* Gradient header */}
      <div style={{
        background: 'linear-gradient(to bottom, #2D1B4E, #0A0A0A)',
        padding: '16px 16px 40px', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', left: 16, top: 16,
          width: 36, height: 36, borderRadius: 18, border: '1px solid #555',
          background: 'none', color: TEXT, fontSize: 18, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>←</button>
        <div style={{ fontSize: 20, fontWeight: 700, color: TEXT, marginTop: 4 }}>Strain</div>
        <div style={{ fontSize: 14, color: TEXT_SECONDARY, marginTop: 4, cursor: 'pointer' }}>March 19, 2026 ▾</div>

        {/* Large ring */}
        <div style={{ marginTop: 24 }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <defs>
              <pattern id="hatchLg" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="#F5C84240" strokeWidth="3" />
              </pattern>
              <linearGradient id="strainGradLg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F5C842" />
                <stop offset="100%" stopColor="#F0943A" />
              </linearGradient>
            </defs>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#333" strokeWidth={sw} />
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#hatchLg)"
              strokeWidth={sw + 4}
              strokeDasharray={`${targetLen} ${gapLen}`}
              strokeDashoffset={targetOffset}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            />
            <circle cx={cx} cy={cy} r={r} fill="none"
              stroke="url(#strainGradLg)" strokeWidth={sw}
              strokeDasharray={`${filled} ${circ - filled}`}
              strokeLinecap="round"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            />
          </svg>
        </div>

        <div style={{ fontSize: 48, fontWeight: 800, color: TEXT, marginTop: 8 }}>{pct}%</div>
        <div style={{ fontSize: 16, color: STRAIN_COLOR, fontWeight: 600 }}>Strain</div>
        <div style={{ fontSize: 14, color: TEXT_SECONDARY, marginTop: 4 }}>Target Strain: 41–63%</div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12, padding: '0 16px', marginTop: -16 }}>
        <div style={{ flex: 1, background: CARD, borderRadius: 14, padding: 18, textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginBottom: 6 }}>Duration</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: TEXT }}>1h 15m</div>
        </div>
        <div style={{ flex: 1, background: CARD, borderRadius: 14, padding: 18, textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginBottom: 6 }}>Total Energy</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: TEXT }}>487 cal</div>
        </div>
      </div>

      {/* Coaching */}
      <div style={{ background: CARD, borderRadius: 16, margin: '16px 16px 0', padding: 20 }}>
        <div style={{ height: 1, background: SEPARATOR, marginBottom: 16 }} />
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, color: COACHING_LABEL, textTransform: 'uppercase' }}>COACHING</span>
        <p style={{ fontSize: 15, color: TEXT, lineHeight: 1.5, marginTop: 10 }}>
          Your strain is moderate today. Consider adding a Zone 2 session this afternoon to reach your optimal strain target of 41-63%.
        </p>
      </div>

      {/* Timeline */}
      <div style={{ padding: '20px 16px 32px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, marginBottom: 12 }}>Activities</div>
        {[
          { name: 'Upper Body Strength', time: '7:30 AM - 8:45 AM', icon: '🏋️', strain: '8.2' },
          { name: 'Evening Walk', time: '6:00 PM - 6:35 PM', icon: '🚶', strain: '4.2' },
        ].map((act, i) => (
          <div key={i} style={{
            background: CARD, borderRadius: 14, padding: '14px 16px', marginBottom: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 18, background: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                {act.icon}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: TEXT }}>{act.name}</div>
                <div style={{ fontSize: 12, color: TEXT_SECONDARY }}>{act.time}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: STRAIN_COLOR }}>{act.strain}</span>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={TEXT_SECONDARY} strokeWidth={2}><polyline points="9 18 15 12 9 6" /></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

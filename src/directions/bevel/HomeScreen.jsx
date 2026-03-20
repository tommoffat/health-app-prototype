import Icon from './components/Icon'
import React from 'react'
import ScoreRing from './components/ScoreRing'
import HatchedRing from './components/HatchedRing'
import MetricCard from './components/MetricCard'
import Sparkline from './components/Sparkline'

const BG = '#0F1117'
const SURFACE = '#1A1E25'
const SURFACE2 = '#22272F'
const BORDER = '#2A3040'
const TEXT = '#FFFFFF'
const TEXT2 = '#8A8FA8'
const STRAIN_COLOR = '#F0943A'
const STRAIN_TRACK = '#3A2A18'
const RECOVERY_COLOR = '#6ECC6E'
const RECOVERY_TRACK = '#1A301A'
const SLEEP_COLOR = '#7B8EF0'
const SLEEP_TRACK = '#1E2240'
const COACHING_LABEL = '#C9A050'
const SEPARATOR = '#2A3040'

/* ── Inline SVG: Segmented Stress Gauge ──────────────── */
function SegmentedStressGauge({ value = 56 }) {
  const totalTicks = 30
  const startAngle = Math.PI // 180°
  const endAngle = 0 // 0°
  const cx = 60
  const cy = 58
  const r = 44

  const ticks = []
  for (let i = 0; i < totalTicks; i++) {
    const pct = i / (totalTicks - 1)
    const angle = startAngle - pct * Math.PI
    const x1 = cx + (r - 6) * Math.cos(angle)
    const y1 = cy - (r - 6) * Math.sin(angle)
    const x2 = cx + r * Math.cos(angle)
    const y2 = cy - r * Math.sin(angle)

    let color
    if (pct < 0.33) color = '#6ECC6E'
    else if (pct < 0.55) color = '#F5C842'
    else if (pct < 0.75) color = '#F0943A'
    else color = '#E74C3C'

    ticks.push(
      <line
        key={i}
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
    )
  }

  // Needle position
  const needlePct = value / 100
  const needleAngle = startAngle - needlePct * Math.PI
  const nx = cx + (r - 16) * Math.cos(needleAngle)
  const ny = cy - (r - 16) * Math.sin(needleAngle)

  // Label
  let statusLabel = 'Low'
  let statusColor = '#6ECC6E'
  if (value >= 34 && value < 67) { statusLabel = 'Med'; statusColor = '#6ECC6E' }
  else if (value >= 67) { statusLabel = 'High'; statusColor = '#E74C3C' }

  return (
    <svg width={120} height={70} viewBox="0 0 120 70">
      {ticks}
      {/* Needle dot */}
      <circle cx={nx} cy={ny} r={3} fill={TEXT} />
      <line
        x1={cx} y1={cy}
        x2={nx} y2={ny}
        stroke={TEXT}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <text x={cx} y={cy - 4} textAnchor="middle" fill={TEXT} fontSize={16} fontWeight="700">{value}</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill={statusColor} fontSize={10} fontWeight="600">{statusLabel}</text>
    </svg>
  )
}

/* ── HomeScreen ──────────────────────────────────────── */
export default function HomeScreen({ navigate, openModal }) {
  return (
    <div style={{
      background: BG,
      minHeight: '100vh',
      color: TEXT,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      paddingBottom: 100,
      position: 'relative',
    }}>

      {/* ─── 1. Top Nav Bar (sticky) ─────────────────── */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: BG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
      }}>
        {/* Left: calendar icon */}
        <div style={{
          width: 24, height: 24, borderRadius: 12,
          background: '#2A3040',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, cursor: 'pointer',
        }}>
          📅
        </div>

        {/* Center: date */}
        <div style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>
          March 19, 2026 ▾
        </div>

        {/* Right: share + avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            fontSize: 16, cursor: 'pointer', color: TEXT2,
          }}>↑</div>
          <div style={{
            width: 36, height: 36, borderRadius: 18,
            background: '#3A4A5C',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 600, color: TEXT,
          }}>TM</div>
        </div>
      </div>

      {/* ─── 2. Status Pills ────────────────────────── */}
      <div style={{ padding: '8px 20px', display: 'flex', gap: 8 }}>
        {[
          'Active ▾',
          '📍 72°F · San Francisco ▾',
        ].map((label, i) => (
          <div key={i} style={{
            background: SURFACE,
            borderRadius: 24,
            padding: '8px 14px',
            fontSize: 13,
            color: TEXT2,
            whiteSpace: 'nowrap',
          }}>{label}</div>
        ))}
      </div>

      {/* ─── 3. Score Rings Card ─────────────────────── */}
      <div style={{
        background: SURFACE,
        borderRadius: 20,
        padding: 20,
        margin: '12px 20px 0',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          {/* Strain */}
          <div
            onClick={() => navigate('strain-detail')}
            style={{
              flex: 1,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <HatchedRing
              value={59}
              color={STRAIN_COLOR}
              trackColor={STRAIN_TRACK}
              label="Strain"
              size={96}
              targetMin={41}
              targetMax={63}
            />
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 80, background: BORDER }} />

          {/* Recovery */}
          <div
            onClick={() => navigate('recovery-detail')}
            style={{
              flex: 1,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <ScoreRing
              value={84}
              color={RECOVERY_COLOR}
              trackColor={RECOVERY_TRACK}
              label="Recovery"
              size={96}
            />
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 80, background: BORDER }} />

          {/* Sleep */}
          <div
            onClick={() => navigate('sleep-detail')}
            style={{
              flex: 1,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <ScoreRing
              value={87}
              color={SLEEP_COLOR}
              trackColor={SLEEP_TRACK}
              label="Sleep"
              size={96}
            />
          </div>
        </div>

        {/* Coaching */}
        <div style={{
          marginTop: 16,
          borderTop: `1px solid ${BORDER}`,
          paddingTop: 14,
        }}>
          <div style={{
            fontSize: 11,
            color: COACHING_LABEL,
            letterSpacing: 1.5,
            fontWeight: 700,
          }}>COACHING</div>
          <div style={{
            fontSize: 15,
            color: TEXT,
            lineHeight: 1.5,
            marginTop: 8,
          }}>
            Your recovery is excellent! HRV is trending up 12% this week. Consider increasing training intensity today.
          </div>
        </div>
      </div>

      {/* ─── 4. Stress & Energy ──────────────────────── */}
      <div style={{ padding: '20px 20px 0', marginTop: 8 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>Stress &amp; Energy</div>
      </div>

      {/* Stress Card */}
      <div style={{
        background: SURFACE,
        borderRadius: 16,
        padding: 16,
        margin: '12px 20px 12px',
      }}>
        {/* Row 1: header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: '#6ECC6E' }} />
            <span style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>Today's stress</span>
          </div>
          <span style={{ fontSize: 11, color: TEXT2 }}>Last updated at 10:54 PM</span>
        </div>

        {/* Row 2: stats + gauge */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Stats columns */}
          <div style={{ display: 'flex', flex: 1, gap: 0 }}>
            {/* Highest */}
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#E74C3C' }}>85</div>
              <div style={{ fontSize: 10, color: TEXT2, marginTop: 2 }}>Highest</div>
            </div>
            <div style={{ width: 1, background: BORDER, margin: '2px 0' }} />
            {/* Lowest */}
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: TEXT }}>6</div>
              <div style={{ fontSize: 10, color: TEXT2, marginTop: 2 }}>Lowest</div>
            </div>
            <div style={{ width: 1, background: BORDER, margin: '2px 0' }} />
            {/* Average */}
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#F5C842' }}>56</div>
              <div style={{ fontSize: 10, color: TEXT2, marginTop: 2 }}>Average</div>
            </div>
          </div>

          {/* Gauge */}
          <div style={{ marginLeft: 8 }}>
            <SegmentedStressGauge value={56} />
          </div>

          {/* Arrow */}
          <div style={{ fontSize: 20, color: TEXT2, marginLeft: 4 }}>›</div>
        </div>
      </div>

      {/* Energy Bar Card */}
      <div style={{
        background: SURFACE,
        borderRadius: 16,
        padding: 16,
        margin: '0 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <Icon name="zap" size={18} color="#C9A050" strokeWidth={1.75} />
        <span style={{ fontSize: 14, color: TEXT, flex: 1 }}>Body Battery</span>
        {/* Segmented bar */}
        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {Array.from({ length: 40 }, (_, i) => (
            <div key={i} style={{
              width: 3,
              height: 12,
              borderRadius: 1,
              background: i < 14 ? '#F5C842' : '#2A3040',
            }} />
          ))}
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginLeft: 8 }}>35%</span>
      </div>

      {/* ─── 5. Health Monitor ───────────────────────── */}
      <div style={{ padding: '20px 20px 12px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>Health Monitor</div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
        padding: '0 20px',
      }}>
        <MetricCard icon="thermometer" label="Temp" value="97.6" unit="°F" status="→ Normal" statusColor={TEXT2} fillPct={50} fillColor={TEXT2} />
        <MetricCard icon="moon" label="Sleep" value="7h 22m" unit="" status="↑ Higher" statusColor="#6ECC6E" fillPct={75} fillColor="#6ECC6E" />
        <MetricCard icon="heart" label="RHR" value="52" unit="bpm" status="→ Normal" statusColor={TEXT2} fillPct={45} fillColor={TEXT2} />
        <MetricCard icon="activity" label="HRV" value="68" unit="ms" status="↑ Higher" statusColor="#5B8DEF" fillPct={70} fillColor="#5B8DEF" />
        <MetricCard icon="droplets" label="SpO2" value="98" unit="%" status="→ Normal" statusColor={TEXT2} fillPct={85} fillColor={TEXT2} />
        <MetricCard icon="bar-chart" label="Weight" value="178.4" unit="lbs" status="→ Stable" statusColor={TEXT2} fillPct={55} fillColor={TEXT2} />
      </div>

      {/* ─── 6. Cardio Load ──────────────────────────── */}
      <div style={{ padding: '20px 20px 12px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>Cardio Load</div>
      </div>

      <div style={{
        background: SURFACE,
        borderRadius: 20,
        padding: 16,
        margin: '0 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <span style={{ fontSize: 14, color: TEXT2 }}>〰️ Cardio Load</span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontSize: 32, fontWeight: 700, color: TEXT, lineHeight: 1 }}>47</span>
          <span style={{ fontSize: 12, color: '#5B8DEF', marginTop: 2 }}>Maintaining</span>
        </div>
        <div style={{ flex: 1 }} />
        <Sparkline data={[38, 40, 42, 44, 45, 46, 47]} color="#9B7BF0" width={80} height={36} />
        <span style={{ fontSize: 20, color: TEXT2, marginLeft: 4 }}>›</span>
      </div>

      {/* ─── 7. Timeline ─────────────────────────────── */}
      <div style={{
        padding: '20px 20px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>Timeline</div>
        <div style={{
          width: 28, height: 28, borderRadius: 14,
          background: SURFACE,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, color: TEXT2, cursor: 'pointer',
        }}>+</div>
      </div>

      {/* Timeline Item 1: Workout */}
      <div
        onClick={() => openModal('workout-detail')}
        style={{
          background: SURFACE,
          borderRadius: 14,
          padding: 14,
          margin: '0 20px 10px',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        {/* Icon with badge */}
        <div style={{ position: 'relative', marginRight: 12, flexShrink: 0 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 20,
            background: '#3A2A18',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}>🧗</div>
          <div style={{
            position: 'absolute', top: -4, right: -6,
            width: 20, height: 20, borderRadius: 10,
            background: STRAIN_COLOR,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 700, color: TEXT,
          }}>12</div>
        </div>
        {/* Text */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>Upper Body Strength</div>
          <div style={{ fontSize: 12, color: TEXT2, marginTop: 2 }}>Today at 9:00 AM</div>
        </div>
        <span style={{ fontSize: 20, color: TEXT2 }}>›</span>
      </div>

      {/* Timeline Item 2: Sleep */}
      <div
        onClick={() => openModal('primary-sleep')}
        style={{
          background: SURFACE,
          borderRadius: 14,
          padding: 14,
          margin: '0 20px 10px',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <div style={{ position: 'relative', marginRight: 12, flexShrink: 0 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 20,
            background: '#1E2240',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}>🌙</div>
          <div style={{
            position: 'absolute', top: -4, right: -6,
            width: 20, height: 20, borderRadius: 10,
            background: SLEEP_COLOR,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 700, color: TEXT,
          }}>87</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>Primary sleep</div>
          <div style={{ fontSize: 12, color: TEXT2, marginTop: 2 }}>Today at 11:02 PM</div>
        </div>
        <span style={{ fontSize: 20, color: TEXT2 }}>›</span>
      </div>

      {/* ─── 8. Bottom Buttons ───────────────────────── */}
      <div style={{ padding: 20, display: 'flex', gap: 12 }}>
        <button style={{
          flex: 1,
          background: SURFACE,
          border: `1px solid ${BORDER}`,
          borderRadius: 12,
          padding: '12px 16px',
          fontSize: 14,
          color: TEXT,
          textAlign: 'center',
          cursor: 'pointer',
        }}>Edit Home</button>
        <button style={{
          flex: 1,
          background: SURFACE,
          border: `1px solid ${BORDER}`,
          borderRadius: 12,
          padding: '12px 16px',
          fontSize: 14,
          color: TEXT,
          textAlign: 'center',
          cursor: 'pointer',
        }}>View All Categories →</button>
      </div>
    </div>
  )
}

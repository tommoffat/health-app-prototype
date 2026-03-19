import React from 'react'
import { today, weeklyActivity } from '../../data/fake'

const BG = '#F4F3EF'
const TEXT_PRIMARY = '#1A1A1A'
const TEXT_SECONDARY = '#888888'
const BORDER_LIGHT = '#E5E5E0'
const STRAIN_COLOR = '#F0943A'
const STRAIN_LIGHT = '#FDECD0'

function DashedRing({ value, max, color, trackColor, size = 140 }) {
  const r = (size - 14) / 2
  const circ = 2 * Math.PI * r
  const pct = Math.min(value / max, 1)
  const dashFilled = circ * pct
  const dashEmpty = circ - dashFilled
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={trackColor} strokeWidth={8} strokeDasharray="4 3" strokeLinecap="round" />
      <circle cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth={9}
        strokeDasharray={`${dashFilled} ${dashEmpty}`} strokeLinecap="round" />
    </svg>
  )
}

export default function ActivityScreen({ onBack }) {
  const strainPct = Math.round(today.strain / 21 * 100)
  const maxAct = Math.max(...weeklyActivity)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const stats = [
    { label: 'Steps', value: today.activity.steps.toLocaleString(), icon: '\uD83D\uDC5F' },
    { label: 'Calories', value: `${today.activity.calories}`, icon: '\uD83D\uDD25' },
    { label: 'Active Min', value: `${today.activity.activeMinutes}`, icon: '\u23F1' },
    { label: 'Stand Hours', value: `${today.activity.standHours}`, icon: '\uD83E\uDDCD' },
  ]

  return (
    <div style={{ minHeight: '100%', background: BG }}>
      {/* Gradient Header */}
      <div style={{
        background: 'linear-gradient(135deg, #E8F5E9 0%, #A5D6A7 100%)',
        padding: '12px 16px 0', display: 'flex', flexDirection: 'column',
        alignItems: 'center', position: 'relative', paddingBottom: 60, minHeight: 200
      }}>
        {onBack && (
          <button onClick={onBack} style={{
            position: 'absolute', left: 12, top: 14, background: 'none', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4
          }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span style={{ fontSize: 16, color: '#FFFFFF', fontWeight: 500 }}>Activity</span>
          </button>
        )}
        <div style={{ fontSize: 28, fontWeight: 700, color: '#FFFFFF', marginTop: 12 }}>Activity</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>March 19, 2026 ▾</div>
      </div>

      {/* Score card floating */}
      <div style={{
        background: '#FFFFFF', borderRadius: 20, margin: '-40px 16px 0', padding: 24,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <div style={{ position: 'relative', width: 140, height: 140 }}>
          <DashedRing value={today.strain} max={21} color={STRAIN_COLOR} trackColor={STRAIN_LIGHT} size={140} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: 140, height: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 40, fontWeight: 700, color: TEXT_PRIMARY }}>{today.strain}</span>
            <span style={{ fontSize: 12, color: TEXT_SECONDARY }}>/ 21</span>
          </div>
        </div>
        <div style={{ marginTop: 8, fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }}>Strain Score</div>
        <div style={{ fontSize: 13, color: TEXT_SECONDARY, marginTop: 2 }}>{strainPct}% of max</div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: '#FFFFFF', borderRadius: 16, padding: 18, textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: TEXT_PRIMARY }}>{s.value}</div>
              <div style={{ fontSize: 11, color: TEXT_SECONDARY, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Weekly Chart */}
        <div style={{
          background: '#FFFFFF', borderRadius: 20, padding: 18, marginBottom: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SECONDARY, letterSpacing: 1, marginBottom: 12 }}>WEEKLY ACTIVITY</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 100, gap: 6 }}>
            {weeklyActivity.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                <div style={{ flex: 1, width: '60%', position: 'relative', borderRadius: 4, background: '#F0F0F0' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${(v / maxAct) * 100}%`, background: i === 6 ? STRAIN_COLOR : 'rgba(240,148,58,0.35)', borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 10, color: TEXT_SECONDARY, marginTop: 4 }}>{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workout Card */}
        <div style={{
          background: '#FFFFFF', borderRadius: 20, padding: 18, marginBottom: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SECONDARY, letterSpacing: 1, marginBottom: 12 }}>TODAY'S WORKOUT</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 10 }}>{today.workout.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ flex: 1, height: 8, background: '#E5E5E0', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: 8, borderRadius: 4, background: STRAIN_COLOR, width: `${(today.workout.setsComplete / today.workout.setsTotal) * 100}%` }} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }}>{today.workout.setsComplete}/{today.workout.setsTotal}</span>
          </div>
          <div style={{ fontSize: 13, color: TEXT_SECONDARY }}>sets complete</div>
        </div>

        {/* Streak */}
        <div style={{
          background: '#FFFFFF', borderRadius: 20, padding: 18, marginBottom: 24,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SECONDARY, letterSpacing: 1, marginBottom: 12 }}>STREAK</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: STRAIN_COLOR }}>7</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY }}>Day Activity Streak</div>
              <div style={{ fontSize: 13, color: TEXT_SECONDARY, marginTop: 2 }}>Keep it going! You're on fire.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

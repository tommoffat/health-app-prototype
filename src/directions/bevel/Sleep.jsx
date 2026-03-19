import React from 'react'
import { today, weeklySleep } from '../../data/fake'

const BG = '#F4F3EF'
const TEXT_PRIMARY = '#1A1A1A'
const TEXT_SECONDARY = '#888888'
const BORDER_LIGHT = '#E5E5E0'
const SLEEP_COLOR = '#6B7FD7'
const SLEEP_LIGHT = '#E0E0DC'

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

export default function SleepScreen({ onBack }) {
  const s = today.sleep
  const maxSleep = Math.max(...weeklySleep)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const stats = [
    { label: 'Total Sleep', value: s.total },
    { label: 'Efficiency', value: `${s.efficiency}%` },
    { label: 'Deep Sleep', value: s.deep },
    { label: 'Latency', value: `${s.latency} min` },
    { label: 'REM Sleep', value: s.rem },
    { label: 'Resting HR', value: `${s.restingHR} bpm` },
  ]

  return (
    <div style={{ minHeight: '100%', background: BG }}>
      {/* Gradient Header */}
      <div style={{
        background: 'linear-gradient(135deg, #E8D5F0 0%, #A8C8FF 50%, #D4E8FF 100%)',
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
            <span style={{ fontSize: 16, color: '#FFFFFF', fontWeight: 500 }}>Sleep</span>
          </button>
        )}
        <div style={{ fontSize: 28, fontWeight: 700, color: '#FFFFFF', marginTop: 12 }}>Sleep</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>March 19, 2026 ▾</div>
      </div>

      {/* Score card floating over gradient */}
      <div style={{
        background: '#FFFFFF', borderRadius: 20, margin: '-40px 16px 0', padding: 24,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <div style={{ position: 'relative', width: 140, height: 140 }}>
          <DashedRing value={s.score} max={100} color={SLEEP_COLOR} trackColor={SLEEP_LIGHT} size={140} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 40, fontWeight: 700, color: TEXT_PRIMARY }}>{s.score}%</span>
          </div>
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#4CAF50', marginTop: 8 }}>Great</div>
        <div style={{ height: 1, background: BORDER_LIGHT, width: '100%', margin: '16px 0' }} />
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, color: '#AAAAAA', marginBottom: 8, alignSelf: 'flex-start' }}>COACHING</div>
        <div style={{ fontSize: 14, color: '#333', lineHeight: 1.5, alignSelf: 'flex-start' }}>
          Your sleep quality was excellent. Deep sleep duration is above average, supporting muscle recovery and memory consolidation.
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          {stats.map((st, i) => (
            <div key={i} style={{
              background: '#FFFFFF', borderRadius: 16, padding: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginBottom: 6 }}>{st.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY }}>{st.value}</div>
            </div>
          ))}
        </div>

        {/* Sleep Trend */}
        <div style={{ fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 12 }}>Sleep Trend</div>
        <div style={{
          background: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 100, gap: 8 }}>
            {weeklySleep.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                <div style={{ flex: 1, width: '65%', position: 'relative', borderRadius: 4, background: '#F0F0F0' }}>
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: `${(v / maxSleep) * 100}%`,
                    background: i === 6 ? SLEEP_COLOR : '#C5CDE8',
                    borderRadius: 4
                  }} />
                </div>
                <span style={{ fontSize: 10, color: TEXT_SECONDARY, marginTop: 4 }}>{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ fontSize: 20, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 12 }}>Timeline</div>
        <div style={{
          background: '#FFFFFF', borderRadius: 20, padding: 18, marginBottom: 24,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 18, background: '#EEF0F8',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <span style={{ fontSize: 16 }}>&#127769;</span>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY }}>Primary sleep</div>
                <div style={{ fontSize: 12, color: TEXT_SECONDARY }}>Mar 18 10:42 PM &ndash; Mar 19 6:04 AM</div>
              </div>
            </div>
            <svg width={16} height={16} viewBox="0 0 24 24" fill={TEXT_SECONDARY}><polyline points="9 18 15 12 9 6" fill="none" stroke={TEXT_SECONDARY} strokeWidth={2} /></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

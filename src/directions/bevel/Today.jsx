import React from 'react'
import { user, today } from '../../data/fake'

const BG = '#F5F3EE'
const CARD_BG = '#FFFFFF'
const TEXT_PRIMARY = '#1A1A1A'
const TEXT_SECONDARY = '#888888'
const TEXT_LIGHT = '#BBBBBB'
const BORDER_LIGHT = '#E5E5E0'
const STRAIN_COLOR = '#F0943A'
const RECOVERY_COLOR = '#4CAF50'
const SLEEP_COLOR = '#6B7FD7'
const BLUE_STATUS = '#5B8DEF'
const GREEN_STATUS = '#4CAF50'
const ORANGE_STATUS = '#E8943A'
const RED_STAT = '#E74C3C'
const YELLOW_STAT = '#E8962F'

function BevelRing({ value, max, fillColor, trackColor, size = 96 }) {
  const strokeWidth = 11
  const r = (size - strokeWidth) / 2
  const cx = size / 2
  const cy = size / 2

  const startAngle = 210 * Math.PI / 180
  const totalSweep = 300 * Math.PI / 180
  const pct = Math.min(value / max, 1)
  const fillSweep = totalSweep * pct

  const pt = (angle) => ({
    x: cx + r * Math.cos(angle - Math.PI / 2),
    y: cy + r * Math.sin(angle - Math.PI / 2)
  })

  const trackStart = pt(startAngle)
  const trackEnd = pt(startAngle + totalSweep)
  const trackPath = `M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 ${totalSweep > Math.PI ? 1 : 0} 1 ${trackEnd.x} ${trackEnd.y}`

  const fillEnd = pt(startAngle + fillSweep)
  const fillPath = fillSweep > 0
    ? `M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 ${fillSweep > Math.PI ? 1 : 0} 1 ${fillEnd.x} ${fillEnd.y}`
    : null

  const displayValue = max === 21
    ? Math.round((value / max) * 100) + '%'
    : value + '%'

  const gradId = `grad-${fillColor.replace('#', '')}`

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0 }}>
        <path d={trackPath} fill="none" stroke={trackColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        {fillPath && (
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={fillColor === '#F0943A' ? '#F5C842' : fillColor === '#4CAF50' ? '#B8D433' : '#8B9EE8'} />
              <stop offset="100%" stopColor={fillColor} />
            </linearGradient>
          </defs>
        )}
        {fillPath && (
          <path d={fillPath} fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={strokeWidth} strokeLinecap="round" />
        )}
      </svg>
      <span style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A', lineHeight: 1 }}>
        {displayValue}
      </span>
    </div>
  )
}

function SegmentedStressGauge({ value }) {
  const ticks = 30
  const filled = Math.round((value / 100) * ticks)

  const tickColors = (i) => {
    const pct = i / ticks
    if (pct < 0.33) return '#4CAF50'
    if (pct < 0.55) return '#8BC34A'
    if (pct < 0.70) return '#FFC107'
    if (pct < 0.85) return '#FF9800'
    return '#F44336'
  }

  return (
    <svg width={90} height={50} viewBox="0 0 90 50">
      {Array.from({ length: ticks }).map((_, i) => {
        const angle = (i / (ticks - 1)) * Math.PI
        const rad = 38
        const x = 45 + rad * Math.cos(Math.PI - angle)
        const y = 48 - rad * Math.sin(angle)
        const color = i < filled ? tickColors(i) : '#E0E0E0'
        return (
          <circle key={i} cx={x} cy={y} r={2.2} fill={color} />
        )
      })}
      <text x="45" y="38" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1A1A1A">{value}</text>
      <text x="45" y="50" textAnchor="middle" fontSize="10" fill="#E8962F">Med</text>
    </svg>
  )
}

export default function TodayScreen({ onNavigate }) {
  const strainPct = Math.round(today.strain / 21 * 100)

  return (
    <div style={{ padding: '16px 16px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, marginBottom: 20 }}>
        <div style={{ fontSize: 32, fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: -0.5 }}>
          March 19, 2026
          <span style={{ color: '#AAAAAA', fontSize: 24, fontWeight: 400, marginLeft: 4 }}>{'\u25BE'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={TEXT_SECONDARY} strokeWidth={2}>
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="16 6 12 2 8 6" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="2" x2="12" y2="15" strokeLinecap="round" />
          </svg>
          <div onClick={() => onNavigate('profile')} style={{
            width: 36, height: 36, borderRadius: 18, background: '#C5CDD8',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#555555' }}>{user.initials}</span>
          </div>
        </div>
      </div>

      {/* Status pills */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <div style={{
          background: CARD_BG, borderRadius: 24, height: 44, padding: '8px 14px',
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: GREEN_STATUS, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="white">
              <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3A7.28 7.28 0 0018 12.5v-2h-2c-1.86-.64-3.42-1.4-4.5-2.5l-1.2-1.3c-.4-.4-1-.6-1.6-.6-.2 0-.3 0-.5.1L6 8.3V13h2V9.6l1.8-.7" />
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY }}>Active</span>
          <svg width={12} height={12} viewBox="0 0 24 24" fill={TEXT_LIGHT}><path d="M7 10l5 5 5-5z" /></svg>
        </div>
        <div style={{
          background: CARD_BG, borderRadius: 24, height: 44, padding: '8px 14px',
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 14, background: '#C5CDD8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }}>&mdash; &deg;F</span>
            <span style={{ fontSize: 10, color: TEXT_SECONDARY }}>No location</span>
          </div>
          <svg width={12} height={12} viewBox="0 0 24 24" fill={TEXT_LIGHT}><path d="M7 10l5 5 5-5z" /></svg>
        </div>
      </div>

      {/* Main metrics card */}
      <div style={{
        background: CARD_BG, borderRadius: 20, padding: 0, marginBottom: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', padding: '20px 16px 16px' }}>
          {/* Strain */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => onNavigate('activity')}>
            <BevelRing value={today.strain} max={21} fillColor="#F0943A" trackColor="#F5E0C8" />
            <span style={{ fontSize: 13, color: TEXT_SECONDARY, marginTop: 6, fontWeight: 500 }}>Strain</span>
          </div>
          <div style={{ width: 1, height: 100, background: '#E8E6E1', alignSelf: 'center' }} />
          {/* Recovery */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => onNavigate('biometrics')}>
            <BevelRing value={today.readiness.score} max={100} fillColor="#4CAF50" trackColor="#E0EED8" />
            <span style={{ fontSize: 13, color: TEXT_SECONDARY, marginTop: 6, fontWeight: 500 }}>Recovery</span>
          </div>
          <div style={{ width: 1, height: 100, background: '#E8E6E1', alignSelf: 'center' }} />
          {/* Sleep */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => onNavigate('sleep')}>
            <BevelRing value={today.sleep.score} max={100} fillColor="#6B7FD7" trackColor="#DDE0F5" />
            <span style={{ fontSize: 13, color: TEXT_SECONDARY, marginTop: 6, fontWeight: 500 }}>Sleep</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: BORDER_LIGHT, margin: '0 20px 16px' }} />

        {/* Coaching */}
        <div style={{ padding: '0 20px 20px' }}>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: 1.5,
            color: '#B8A060',
            textTransform: 'uppercase'
          }}>COACHING</span>
          <p style={{
            fontSize: 15, color: '#333333', lineHeight: 1.5,
            margin: '10px 0 0', fontWeight: 400
          }}>
            Your recovery is excellent today! HRV is trending up 12% this week. Focus on Zone 2 training.
          </p>
        </div>
      </div>

      {/* Stress & Energy section */}
      <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginTop: 24, marginBottom: 14 }}>Stress & Energy</div>

      {/* Stress card */}
      <div style={{
        background: CARD_BG, borderRadius: 16, padding: 20, marginBottom: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: GREEN_STATUS }} />
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: TEXT_PRIMARY }}>Today's stress</div>
              <div style={{ fontSize: 13, color: TEXT_SECONDARY, marginTop: 2 }}>Last updated at 10:54 PM</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SegmentedStressGauge value={40} />
            <svg width={16} height={16} viewBox="0 0 24 24" fill={TEXT_LIGHT}><path d="M7 10l5 5 5-5z" /></svg>
          </div>
        </div>

        {/* 3 stat row */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#E74C3C' }}>100</div>
            <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginTop: 2 }}>Highest</div>
          </div>
          <div style={{ width: 1, height: 36, background: BORDER_LIGHT }} />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#333333' }}>2</div>
            <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginTop: 2 }}>Lowest</div>
          </div>
          <div style={{ width: 1, height: 36, background: BORDER_LIGHT }} />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#E8962F' }}>40</div>
            <div style={{ fontSize: 12, color: TEXT_SECONDARY, marginTop: 2 }}>Average</div>
          </div>
        </div>
      </div>

      {/* Energy bar card */}
      <div style={{
        background: CARD_BG, borderRadius: 16, padding: 20, marginBottom: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        display: 'flex', alignItems: 'center', gap: 14
      }}>
        <svg width={22} height={22} viewBox="0 0 24 24" fill="#F5C842">
          <path d="M7 2v11h3v9l7-12h-4l4-8z" />
        </svg>
        <div style={{ flex: 1, display: 'flex', gap: 1 }}>
          {Array.from({ length: 40 }, (_, i) => {
            const isFilled = i < Math.round(0.72 * 40)
            return (
              <div key={i} style={{
                width: 3, height: 10, borderRadius: 1,
                background: isFilled ? '#E8B830' : '#E5E5E0'
              }} />
            )
          })}
        </div>
        <span style={{ fontSize: 16, fontWeight: 600, color: TEXT_PRIMARY }}>72%</span>
      </div>
    </div>
  )
}

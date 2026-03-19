import React from 'react'
import { today } from '../../data/fake'

const BG = '#F4F3EF'
const TEXT_PRIMARY = '#1A1A1A'
const TEXT_SECONDARY = '#888888'
const BLUE_STATUS = '#5B8DEF'
const GREEN_STATUS = '#4CAF50'

function VerticalGauge({ value, color, trackColor, max = 100 }) {
  const height = 80
  const fillH = (value / max) * height
  return (
    <div style={{ width: 6, height, borderRadius: 3, background: trackColor, position: 'relative', alignSelf: 'center' }}>
      <div style={{
        position: 'absolute', bottom: 0, width: '100%', height: fillH,
        borderRadius: 3, background: color
      }} />
      <div style={{
        position: 'absolute', bottom: fillH - 5, left: '50%', transform: 'translateX(-50%)',
        width: 10, height: 10, borderRadius: 5, background: '#FFFFFF',
        border: `2px solid ${color}`, boxSizing: 'border-box'
      }} />
    </div>
  )
}

const metrics = [
  { key: 'rr', label: 'RR', icon: '\uD83C\uDF2C\uFE0F', value: 15.7, unit: 'rpm', status: 'Lower', statusColor: BLUE_STATUS, arrow: '\u2193', gaugeValue: 45, gaugeColor: BLUE_STATUS, gaugeTrack: '#E0E8F8' },
  { key: 'rhr', label: 'RHR', icon: '\u2764\uFE0F', value: 52.0, unit: 'bpm', status: 'Normal', statusColor: GREEN_STATUS, arrow: '\u2713', gaugeValue: 52, gaugeColor: GREEN_STATUS, gaugeTrack: '#E0F0E4' },
  { key: 'hrv', label: 'HRV', icon: '\uD83D\uDCC8', value: 68, unit: 'ms', status: 'Higher', statusColor: BLUE_STATUS, arrow: '\u2191', gaugeValue: 68, gaugeColor: BLUE_STATUS, gaugeTrack: '#E0E8F8' },
  { key: 'spo2', label: 'SpO2', icon: '\uD83E\uDE78', value: 98, unit: '%', status: 'Normal', statusColor: GREEN_STATUS, arrow: '\u2713', gaugeValue: 98, gaugeColor: GREEN_STATUS, gaugeTrack: '#E0F0E4' },
  { key: 'temp', label: 'Temp', icon: '\uD83C\uDF21\uFE0F', value: 97.6, unit: '\u00B0F', status: 'Normal', statusColor: GREEN_STATUS, arrow: '\u2713', gaugeValue: 65, gaugeColor: GREEN_STATUS, gaugeTrack: '#E0F0E4' },
  { key: 'weight', label: 'Weight', icon: '\u2696\uFE0F', value: 178.4, unit: 'lbs', status: '', statusColor: TEXT_SECONDARY, arrow: '', gaugeValue: 60, gaugeColor: '#AAAAAA', gaugeTrack: '#E8E8E4' },
]

export default function BiometricsScreen({ onBack }) {
  return (
    <div style={{ minHeight: '100%', background: BG, padding: '16px 16px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 8, marginBottom: 20 }}>
        {onBack && (
          <button onClick={onBack} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
            display: 'flex', alignItems: 'center'
          }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={TEXT_PRIMARY} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <div style={{ fontSize: 28, fontWeight: 700, color: TEXT_PRIMARY, letterSpacing: -0.5 }}>Health Monitor</div>
      </div>

      {/* 2-column card grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {metrics.map((m) => (
          <div key={m.key} style={{
            background: '#FFFFFF', borderRadius: 16, padding: 16, minHeight: 150,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            display: 'flex', justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 16 }}>{m.icon}</span>
                <span style={{ fontSize: 14, color: TEXT_SECONDARY }}>{m.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                <span style={{ fontSize: 32, fontWeight: 700, color: TEXT_PRIMARY }}>{m.value}</span>
                <span style={{ fontSize: 16, color: TEXT_SECONDARY }}>{m.unit}</span>
              </div>
              {m.status && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: m.statusColor }}>{m.arrow}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: m.statusColor }}>{m.status}</span>
                </div>
              )}
              {!m.status && <div style={{ height: 22 }} />}
            </div>
            <VerticalGauge value={m.gaugeValue} color={m.gaugeColor} trackColor={m.gaugeTrack} />
          </div>
        ))}
      </div>
    </div>
  )
}

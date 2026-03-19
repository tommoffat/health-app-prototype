import React from 'react'

const SURFACE = '#1A1E25'
const BORDER = '#2A3040'
const TEXT = '#FFFFFF'
const TEXT2 = '#8A8FA8'

export default function MetricCard({ icon, label, value, unit, status, statusColor = TEXT2, fillColor = '#6ECC6E', fillPct = 50 }) {
  return (
    <div style={{ background: SURFACE, borderRadius: 16, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: 14, marginBottom: 4 }}>{icon}</div>
        <div style={{ fontSize: 12, color: TEXT2, marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: TEXT }}>{value}<span style={{ fontSize: 12, fontWeight: 400, color: TEXT2, marginLeft: 2 }}>{unit}</span></div>
        <div style={{ fontSize: 11, color: statusColor, marginTop: 4 }}>{status}</div>
      </div>
      {/* Vertical thermometer gauge */}
      <div style={{ width: 6, height: 70, borderRadius: 3, background: BORDER, position: 'relative', overflow: 'hidden', marginTop: 8 }}>
        <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${fillPct}%`, borderRadius: 3, background: fillColor }} />
      </div>
    </div>
  )
}

import React from 'react'
import Sparkline from './Sparkline'

const SURFACE = '#1A1E25'
const TEXT = '#FFFFFF'
const TEXT2 = '#8A8FA8'

export default function TrendRow({ icon, label, value, status, statusColor = TEXT2, sparkData, sparkColor, onPress }) {
  return (
    <div onClick={onPress} style={{
      background: SURFACE, borderRadius: 14, padding: '14px 16px',
      display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
      marginBottom: 10
    }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, color: TEXT2, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: TEXT, marginBottom: 2 }}>{value}</div>
        <div style={{ fontSize: 12, color: statusColor }}>{status}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Sparkline data={sparkData} color={sparkColor} width={60} height={32} />
        <span style={{ color: TEXT2, fontSize: 16 }}>›</span>
      </div>
    </div>
  )
}

import React from 'react';

const TEXT = '#F0F0F0';
const TEXT_DIM = '#8B949E';
const BORDER = 'rgba(255,255,255,0.08)';

export default function MetricRow({ label, value, trend, borderBottom = true }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 0',
      borderBottom: borderBottom ? `1px solid ${BORDER}` : 'none',
    }}>
      <span style={{ fontSize: 13, color: TEXT_DIM }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 15, color: TEXT, fontWeight: 500 }}>{value}</span>
        {trend && (
          <span style={{ fontSize: 11, color: trend.startsWith('+') || trend.startsWith('↑') ? '#2ECC71' : trend.startsWith('-') || trend.startsWith('↓') ? '#E74C3C' : TEXT_DIM }}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

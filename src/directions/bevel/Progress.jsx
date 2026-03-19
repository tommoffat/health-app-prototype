import React, { useState } from 'react';
import { weeklyHRV, weeklySleep, weeklyActivity, weeklyWeight } from '../../data/fake';

const CORAL = '#FF6B35';
const TEAL = '#4ECDC4';
const PURPLE = '#9B59B6';
const YELLOW = '#F39C12';
const BG = '#0F0F0F';
const SURFACE = '#1A1A1A';
const SURFACE2 = '#222222';
const WHITE = '#FFFFFF';
const GRAY = '#999999';

const ranges = ['7D', '14D', '30D', '90D'];

const charts = [
  { label: 'Activity Score', data: weeklyActivity, color: CORAL, unit: '%' },
  { label: 'Sleep Score', data: weeklySleep, color: PURPLE, unit: '%' },
  { label: 'HRV', data: weeklyHRV, color: TEAL, unit: 'ms' },
  { label: 'Weight', data: weeklyWeight, color: YELLOW, unit: 'lbs' },
];

const streaks = [
  { label: 'Activity', value: 12, color: CORAL },
  { label: 'Sleep 80+', value: 8, color: PURPLE },
  { label: 'HRV Up', value: 5, color: TEAL },
  { label: 'Log Streak', value: 14, color: YELLOW },
];

function TrendChart({ data, color, label, unit }) {
  const W = 300, H = 90;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const min = Math.min(...data) - (Math.max(...data) - Math.min(...data)) * 0.2;
  const max = Math.max(...data) + (Math.max(...data) - Math.min(...data)) * 0.2;
  const range = max - min || 1;
  const points = data.map((v, i) => ({
    x: 15 + (i / (data.length - 1)) * (W - 30),
    y: 10 + (1 - (v - min) / range) * (H - 30)
  }));
  const line = points.map(p => `${p.x},${p.y}`).join(' ');
  const area = `${points[0].x},${H - 15} ${line} ${points[points.length - 1].x},${H - 15}`;
  const latest = data[data.length - 1];
  const first = data[0];
  const change = latest - first;
  const changePct = ((change / first) * 100).toFixed(1);

  return (
    <div style={{
      background: SURFACE, borderRadius: 16, padding: 16, marginBottom: 12,
      borderTop: `3px solid ${color}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>{label}</div>
          <div style={{ color: WHITE, fontSize: 24, fontWeight: 900, marginTop: 2 }}>
            {typeof latest === 'number' && latest % 1 !== 0 ? latest.toFixed(1) : latest}
            <span style={{ color: GRAY, fontSize: 12, fontWeight: 600 }}> {unit}</span>
          </div>
        </div>
        <div style={{
          background: `${change >= 0 ? TEAL : CORAL}18`,
          borderRadius: 8, padding: '4px 10px',
          color: change >= 0 ? TEAL : CORAL, fontSize: 12, fontWeight: 800
        }}>
          {change >= 0 ? '\u25B2' : '\u25BC'} {Math.abs(change).toFixed(1)} ({changePct}%)
        </div>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
        <defs>
          <linearGradient id={`pg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill={`url(#pg-${color.replace('#', '')})`} />
        <polyline points={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={i === data.length - 1 ? 5 : 3}
              fill={i === data.length - 1 ? color : SURFACE} stroke={color} strokeWidth="2" />
            <text x={p.x} y={H - 2} fill={GRAY} fontSize="7" textAnchor="middle" fontWeight="600">{days[i]}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function ProgressScreen({ onBack }) {
  const [selectedRange, setSelectedRange] = useState('7D');

  return (
    <div style={{ background: BG, minHeight: '100%', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div onClick={onBack} style={{ color: GRAY, fontSize: 24, cursor: 'pointer', lineHeight: 1 }}>&#8592;</div>
        <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase' }}>PROGRESS & TRENDS</div>
      </div>

      {/* Time Range Picker */}
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 6, background: SURFACE, borderRadius: 12, padding: 4 }}>
          {ranges.map(r => (
            <div key={r} onClick={() => setSelectedRange(r)} style={{
              flex: 1, textAlign: 'center', padding: '8px 0', borderRadius: 10,
              background: selectedRange === r ? CORAL : 'transparent',
              color: selectedRange === r ? WHITE : GRAY,
              fontSize: 12, fontWeight: 800, cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}>{r}</div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div style={{ padding: '0 20px' }}>
        {charts.map((c, i) => (
          <TrendChart key={i} {...c} />
        ))}
      </div>

      {/* Streaks */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Active Streaks</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {streaks.map((s, i) => (
            <div key={i} style={{
              background: SURFACE, borderRadius: 16, padding: '16px 14px', textAlign: 'center',
              borderTop: `3px solid ${s.color}`
            }}>
              <div style={{ color: s.color, fontSize: 32, fontWeight: 900, lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: GRAY, fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 6 }}>{s.label}</div>
              <div style={{ color: GRAY, fontSize: 10, marginTop: 2 }}>days</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

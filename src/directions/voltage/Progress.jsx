import React, { useState } from 'react';
import { weeklyHRV, weeklySleep, weeklyActivity, weeklyWeight } from '../../data/fake';

const c = {
  bg: '#0A0A00', surface: '#111100', accent: '#CCFF00',
  text: '#FFFFFF', dim: '#888877', border: '#222200',
};
const heavy = { fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif', fontWeight: 900 };

const ranges = ['7D', '30D', '90D', '1Y'];

function AreaChart({ data, width = 300, height = 100, color = c.accent, id }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * (height - 10) - 5,
  }));
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area = `${line} L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} style={{ display: 'block', width: '100%' }} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`pG_${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0.03" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#pG_${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={i === pts.length - 1 ? color : 'transparent'} />
      ))}
    </svg>
  );
}

export default function Progress({ onBack }) {
  const [range, setRange] = useState('7D');

  const charts = [
    { label: 'HRV', data: weeklyHRV, unit: 'ms', current: weeklyHRV[weeklyHRV.length - 1], color: c.accent },
    { label: 'SLEEP SCORE', data: weeklySleep, unit: '', current: weeklySleep[weeklySleep.length - 1], color: '#88CC00' },
    { label: 'ACTIVITY', data: weeklyActivity, unit: '', current: weeklyActivity[weeklyActivity.length - 1], color: c.accent },
    { label: 'WEIGHT', data: weeklyWeight, unit: 'lbs', current: weeklyWeight[weeklyWeight.length - 1], color: '#88CC00' },
  ];

  const streaks = [
    { label: 'WORKOUT', value: 12, unit: 'DAYS' },
    { label: 'SLEEP 80+', value: 8, unit: 'DAYS' },
    { label: 'STEP GOAL', value: 5, unit: 'DAYS' },
    { label: 'SUPPLEMENT', value: 3, unit: 'DAYS' },
  ];

  return (
    <div style={{ padding: '0 16px 100px' }}>
      <div
        onClick={onBack}
        style={{ ...heavy, fontSize: 13, color: c.accent, cursor: 'pointer', marginBottom: 16, letterSpacing: 1 }}
      >
        ← BACK
      </div>

      {/* Time range picker */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {ranges.map((r) => (
          <div
            key={r}
            onClick={() => setRange(r)}
            style={{
              ...heavy, fontSize: 11, letterSpacing: 2, padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
              background: range === r ? c.accent : c.surface,
              color: range === r ? c.bg : c.dim,
            }}
          >
            {r}
          </div>
        ))}
      </div>

      {/* 4 area charts */}
      {charts.map((ch) => (
        <div key={ch.label} style={{
          background: c.surface, borderRadius: 12, padding: 16, marginBottom: 10,
          borderLeft: `3px solid ${ch.color}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ ...heavy, fontSize: 9, letterSpacing: 2, color: c.dim }}>{ch.label}</div>
            <div style={{ ...heavy, fontSize: 20, color: ch.color }}>
              {ch.current}{ch.unit && <span style={{ fontSize: 10, marginLeft: 2 }}>{ch.unit}</span>}
            </div>
          </div>
          <AreaChart data={ch.data} color={ch.color} id={ch.label} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <span key={i} style={{ ...heavy, fontSize: 9, color: c.dim, letterSpacing: 1 }}>{d}</span>
            ))}
          </div>
        </div>
      ))}

      {/* Streaks */}
      <div style={{ ...heavy, fontSize: 9, letterSpacing: 3, color: c.dim, marginTop: 8, marginBottom: 10 }}>
        ACTIVE STREAKS
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {streaks.map((s) => (
          <div key={s.label} style={{
            background: c.surface, borderRadius: 12, padding: '16px 12px', textAlign: 'center',
            borderLeft: `3px solid ${c.accent}`,
          }}>
            <div style={{ ...heavy, fontSize: 8, letterSpacing: 2, color: c.dim }}>{s.label}</div>
            <div style={{ ...heavy, fontSize: 36, color: c.accent, lineHeight: 1.1 }}>{s.value}</div>
            <div style={{ ...heavy, fontSize: 9, letterSpacing: 2, color: c.dim }}>{s.unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

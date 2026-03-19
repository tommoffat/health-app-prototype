import React, { useState } from 'react';
import { weeklyHRV, weeklySleep, weeklyActivity, weeklyWeight } from '../../data/fake.js';

const c = {
  bg: '#0B0E13',
  surface: '#131920',
  surfaceAlt: '#1E2530',
  accent: '#E8A04B',
  activity: '#4A90D9',
  sleep: '#7B68EE',
  text: '#EAEAEA',
  secondary: '#7A8899',
  border: '#2A3545',
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const ranges = ['7D', '30D', '90D'];

function LineChart({ data, color, label, unit, w = 280, h = 100 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const px = 10, py = 10;
  const points = data.map((v, i) => ({
    x: px + (i / (data.length - 1)) * (w - 2 * px),
    y: py + (1 - (v - min) / range) * (h - 2 * py),
  }));
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area = `${line} L${points[points.length - 1].x},${h} L${points[0].x},${h} Z`;
  const latest = data[data.length - 1];

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ color: c.secondary, fontSize: 12 }}>{label}</span>
        <span style={{ color, fontSize: 18, fontWeight: 700 }}>{latest}{unit}</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: 'block' }}>
        <defs>
          <linearGradient id={`pg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#pg-${color.replace('#', '')})`} />
        <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill={i === points.length - 1 ? color : 'transparent'}
            stroke={i === points.length - 1 ? color : 'transparent'} />
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        {days.map(d => (
          <span key={d} style={{ color: c.secondary, fontSize: 10, width: 30, textAlign: 'center' }}>{d}</span>
        ))}
      </div>
    </div>
  );
}

function StreakCard({ label, value, unit, color }) {
  return (
    <div style={{
      background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14,
      padding: 16, flex: 1, textAlign: 'center',
    }}>
      <div style={{ color, fontSize: 28, fontWeight: 700 }}>{value}</div>
      <div style={{ color: c.secondary, fontSize: 11, marginTop: 2 }}>{unit}</div>
      <div style={{ color: c.text, fontSize: 12, fontWeight: 500, marginTop: 6 }}>{label}</div>
    </div>
  );
}

export default function Progress() {
  const [range, setRange] = useState('7D');

  return (
    <div style={{
      minHeight: '100%', background: c.bg, padding: '20px 20px 32px',
      fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif',
    }}>
      <h2 style={{ color: c.text, fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>Progress</h2>
      <p style={{ color: c.secondary, fontSize: 13, margin: '0 0 20px' }}>Track your trends over time</p>

      {/* Time Range Picker */}
      <div style={{
        display: 'flex', gap: 0, background: c.surfaceAlt, borderRadius: 10,
        padding: 3, marginBottom: 24,
      }}>
        {ranges.map(r => (
          <button key={r} onClick={() => setRange(r)} style={{
            flex: 1, padding: '8px 0', borderRadius: 8, border: 'none',
            background: range === r ? c.accent : 'transparent',
            color: range === r ? '#0B0E13' : c.secondary,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}>{r}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <LineChart data={weeklySleep} color={c.sleep} label="Sleep Score" unit="" />
        <LineChart data={weeklyActivity} color={c.activity} label="Activity Score" unit="" />
        <LineChart data={weeklyHRV} color={c.accent} label="HRV" unit=" ms" />
        <LineChart data={weeklyWeight} color="#A78BFA" label="Weight" unit=" lbs" />
      </div>

      {/* Streaks */}
      <h3 style={{ color: c.text, fontSize: 15, fontWeight: 600, margin: '24px 0 12px' }}>Streaks</h3>
      <div style={{ display: 'flex', gap: 12 }}>
        <StreakCard label="Sleep Goal" value={18} unit="days" color={c.sleep} />
        <StreakCard label="Activity Goal" value={12} unit="days" color={c.activity} />
        <StreakCard label="Log Streak" value={24} unit="days" color={c.accent} />
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { weeklyHRV, weeklySleep, weeklyActivity, weeklyWeight } from '../../data/fake';

const GlassCard = ({ children, style = {} }) => (
  <div style={{
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 20,
    ...style,
  }}>{children}</div>
);

const BackButton = ({ onClick }) => (
  <button onClick={onClick} style={{
    background: 'none', border: 'none', color: '#C9A96E', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 6, padding: 0, fontFamily: 'inherit',
    fontSize: 14, fontWeight: '500',
  }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
    Today
  </button>
);

const LineChart = ({ data, label, unit, color = '#C9A96E' }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 280;
  const h = 90;
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const points = data.map((v, i) =>
    `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 14) - 7}`
  ).join(' ');
  const areaPoints = `0,${h} ${points} ${w},${h}`;

  return (
    <GlassCard>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8 }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: '600', color }}>
          {data[data.length - 1]}{unit}
        </div>
      </div>
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad_${label.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill={`url(#grad_${label.replace(/\s/g, '')})`} />
        <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((v, i) => (
          <circle key={i} cx={(i / (data.length - 1)) * w} cy={h - ((v - min) / range) * (h - 14) - 7}
            r={i === data.length - 1 ? 4 : 2.5}
            fill={i === data.length - 1 ? color : 'rgba(201,169,110,0.5)'}
            stroke={i === data.length - 1 ? '#0D1117' : 'none'}
            strokeWidth={i === data.length - 1 ? 2 : 0}
          />
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        {days.map((d, i) => (
          <span key={i} style={{ fontSize: 10, color: '#8B949E', fontWeight: '500', width: 20, textAlign: 'center' }}>{d}</span>
        ))}
      </div>
    </GlassCard>
  );
};

const timeRanges = ['1W', '1M', '3M', '6M', '1Y'];

export default function Progress({ navigate }) {
  const [range, setRange] = useState('1W');

  const streaks = [
    { label: 'Activity', value: 12, unit: 'days' },
    { label: 'Sleep 80+', value: 5, unit: 'days' },
    { label: 'HRV Trend', value: 3, unit: 'weeks up' },
    { label: 'Weight Loss', value: 0.8, unit: 'lbs/wk' },
  ];

  return (
    <div style={{ padding: '56px 20px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <BackButton onClick={() => navigate('today')} />
      <div style={{ fontSize: 24, fontWeight: '600', letterSpacing: -0.3 }}>Progress</div>

      {/* Time Range Picker */}
      <div style={{
        display: 'flex', gap: 4, padding: 4, borderRadius: 12,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        {timeRanges.map((t) => (
          <button key={t} onClick={() => setRange(t)} style={{
            flex: 1, padding: '8px 0', borderRadius: 9, border: 'none',
            background: range === t ? 'rgba(201,169,110,0.15)' : 'transparent',
            color: range === t ? '#C9A96E' : '#8B949E',
            fontSize: 13, fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
            letterSpacing: 0.3,
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Charts */}
      <LineChart data={weeklySleep} label="Sleep Score" unit="" />
      <LineChart data={weeklyHRV} label="HRV" unit=" ms" />
      <LineChart data={weeklyActivity} label="Activity Score" unit="" />
      <LineChart data={weeklyWeight} label="Weight" unit=" lbs" />

      {/* Streaks */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {streaks.map((s) => (
          <GlassCard key={s.label} style={{ padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: '600', color: '#C9A96E' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#8B949E', marginTop: 2, fontWeight: '500' }}>{s.unit}</div>
            <div style={{ fontSize: 13, color: '#E6EDF3', marginTop: 6, fontWeight: '500' }}>{s.label}</div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

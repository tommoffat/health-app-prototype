import React, { useState } from 'react';
import { weeklyHRV, weeklySleep, weeklyActivity, weeklyWeight } from '../../data/fake';

const c = {
  bg: '#0F1218', surface: '#181E28', surfaceAlt: '#1E2535',
  amber: '#E8A04B', coral: '#FF8C42', text: '#F0F4F8', muted: '#8899AA',
  green: '#4ADE80', blue: '#4EA8FF', purple: '#B18CFF',
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const ranges = ['1W', '1M', '3M', '6M'];

function LineChart({ data, color, label, unit, width = 300, height = 80 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) =>
    `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 16) - 8}`
  ).join(' ');
  const areaPath = `M0,${height} ` + data.map((v, i) =>
    `L${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 16) - 8}`
  ).join(' ') + ` L${width},${height} Z`;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.text, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
          {label}
        </div>
        <div style={{ fontSize: 12, color, fontWeight: 600, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
          {data[data.length - 1]}{unit}
        </div>
      </div>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${label.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#grad-${label.replace(/\s/g, '')})`} />
        <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        {data.map((v, i) => (
          <circle key={i}
            cx={(i / (data.length - 1)) * width}
            cy={height - ((v - min) / range) * (height - 16) - 8}
            r={i === data.length - 1 ? 3.5 : 0} fill={color} />
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        {days.map(d => <span key={d} style={{ fontSize: 10, color: c.muted }}>{d}</span>)}
      </div>
    </div>
  );
}

export default function Progress({ onBack }) {
  const [timeRange, setTimeRange] = useState('1W');

  const streaks = [
    { label: 'Activity', value: 12, unit: 'days', color: c.blue },
    { label: 'Sleep Goal', value: 8, unit: 'days', color: c.purple },
    { label: 'Supplements', value: 5, unit: 'days', color: c.green },
    { label: 'Weight Log', value: 21, unit: 'days', color: c.amber },
  ];

  const cardStyle = {
    background: c.surface, borderRadius: 16, padding: 18,
    border: '1px solid rgba(255,255,255,0.04)', marginBottom: 14,
  };

  return (
    <div style={{ padding: '0 16px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 0' }}>
        <div onClick={onBack} style={{
          width: 32, height: 32, borderRadius: 10, background: c.surface,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke={c.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
          Progress
        </div>
      </div>

      {/* Time Range Picker */}
      <div style={{
        display: 'flex', gap: 4, background: c.surface, borderRadius: 12, padding: 4, marginBottom: 20,
        border: '1px solid rgba(255,255,255,0.04)',
      }}>
        {ranges.map(r => (
          <div key={r} onClick={() => setTimeRange(r)} style={{
            flex: 1, textAlign: 'center', padding: '8px 0', borderRadius: 10, cursor: 'pointer',
            fontSize: 13, fontWeight: 600, fontFamily: 'SF Pro Text, -apple-system, sans-serif',
            background: timeRange === r ? c.amber : 'transparent',
            color: timeRange === r ? '#0F1218' : c.muted,
            transition: 'all 0.2s',
          }}>
            {r}
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={cardStyle}>
        <LineChart data={weeklyHRV} color={c.green} label="HRV" unit=" ms" />
      </div>

      <div style={cardStyle}>
        <LineChart data={weeklySleep} color={c.purple} label="Sleep Score" unit="" />
      </div>

      <div style={cardStyle}>
        <LineChart data={weeklyActivity} color={c.blue} label="Activity Score" unit="" />
      </div>

      <div style={cardStyle}>
        <LineChart data={weeklyWeight} color={c.coral} label="Weight" unit=" lbs" />
      </div>

      {/* Streaks */}
      <div style={cardStyle}>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 14, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
          Current Streaks
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {streaks.map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.02)', borderRadius: 12, padding: 14,
              border: '1px solid rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                fontSize: 24, fontWeight: 800, color: s.color,
                fontFamily: 'SF Pro Display, -apple-system, sans-serif',
              }}>
                {s.value}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.text, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 11, color: c.muted }}>{s.unit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Summary */}
      <div style={{
        ...cardStyle, background: 'linear-gradient(135deg, rgba(232,160,75,0.06) 0%, #181E28 100%)',
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 10, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
          Weekly Summary
        </div>
        <div style={{ fontSize: 13, color: c.text, lineHeight: 1.6, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
          HRV is trending up 12% with improved sleep consistency. Activity score averaged 72 this week. Weight trend remains stable. Keep focusing on sleep timing for optimal recovery.
        </div>
      </div>
    </div>
  );
}

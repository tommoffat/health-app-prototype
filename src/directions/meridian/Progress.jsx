import React, { useState } from 'react';
import { weeklySleep, weeklyHRV, weeklyActivity, weeklyWeight } from '../../data/fake';

const s = {
  page: { padding: '0 0 24px 0' },
  sectionHeader: {
    fontSize: 13, fontWeight: '600', color: '#6C6C70', textTransform: 'uppercase',
    letterSpacing: 0.5, padding: '24px 16px 8px 16px',
  },
  segmentedWrap: {
    margin: '16px 16px 0', background: '#E5E5EA', borderRadius: 10, padding: 2,
    display: 'flex',
  },
  segment: (active) => ({
    flex: 1, padding: '8px 0', textAlign: 'center', fontSize: 13, fontWeight: '600',
    borderRadius: 8, cursor: 'pointer', border: 'none',
    background: active ? '#FFFFFF' : 'transparent',
    color: active ? '#000' : '#6C6C70',
    boxShadow: active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
  }),
  chartCard: {
    background: '#FFFFFF', borderRadius: 16, margin: '12px 16px 0',
    boxShadow: '0 0.5px 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
    padding: '16px 16px 8px',
  },
  chartTitle: { fontSize: 15, fontWeight: '600', color: '#000', marginBottom: 4 },
  chartSub: { fontSize: 13, color: '#6C6C70', marginBottom: 12 },
  streaksCard: {
    background: '#FFFFFF', borderRadius: 16, margin: '0 16px',
    boxShadow: '0 0.5px 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
  },
  streakRow: (last) => ({
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 16px', borderBottom: last ? 'none' : '0.5px solid #E5E5EA',
  }),
  streakLabel: { fontSize: 17, color: '#000' },
  streakValue: { fontSize: 17, fontWeight: '700', color: '#007AFF' },
};

function extendData(data, range) {
  if (range === '7D') return data;
  const mult = range === '30D' ? 4 : 12;
  const result = [];
  for (let i = 0; i < mult; i++) {
    data.forEach(v => result.push(v + (Math.random() - 0.5) * 6));
  }
  return result.slice(-( range === '30D' ? 30 : 90));
}

function LineChart({ data, title, subtitle, color = '#007AFF' }) {
  const w = 280, h = 90, px = 4, py = 8;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = px + (i / (data.length - 1)) * (w - 2 * px);
    const y = py + (1 - (v - min) / range) * (h - 2 * py);
    return `${x},${y}`;
  }).join(' ');

  // Area fill
  const areaPath = `M${px},${h} ` + data.map((v, i) => {
    const x = px + (i / (data.length - 1)) * (w - 2 * px);
    const y = py + (1 - (v - min) / range) * (h - 2 * py);
    return `L${x},${y}`;
  }).join(' ') + ` L${w - px},${h} Z`;

  return (
    <div style={s.chartCard}>
      <div style={s.chartTitle}>{title}</div>
      <div style={s.chartSub}>{subtitle}</div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto' }}>
        <defs>
          <linearGradient id={`grad-${title.replace(/\s/g,'')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#grad-${title.replace(/\s/g,'')})`} />
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function Progress() {
  const [range, setRange] = useState('7D');
  const ranges = ['7D', '30D', '90D'];

  const sleepData = extendData(weeklySleep, range);
  const hrvData = extendData(weeklyHRV, range);
  const actData = extendData(weeklyActivity, range);
  const wtData = extendData(weeklyWeight, range);

  const avg = (arr) => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);

  const streaks = [
    { label: 'Move Goal', value: '12 days' },
    { label: 'Sleep 7h+', value: '9 days' },
    { label: 'HRV Above 60', value: '14 days' },
    { label: 'Supplement Streak', value: '5 days' },
  ];

  return (
    <div style={s.page}>
      {/* Segmented Control */}
      <div style={s.segmentedWrap}>
        {ranges.map(r => (
          <button key={r} style={s.segment(range === r)} onClick={() => setRange(r)}>
            {r}
          </button>
        ))}
      </div>

      {/* Charts */}
      <LineChart data={sleepData} title="Sleep Score" subtitle={`Avg: ${avg(sleepData)}`} color="#007AFF" />
      <LineChart data={hrvData} title="HRV" subtitle={`Avg: ${avg(hrvData)} ms`} color="#5AC8FA" />
      <LineChart data={actData} title="Activity Score" subtitle={`Avg: ${avg(actData)}`} color="#34C759" />
      <LineChart data={wtData} title="Weight" subtitle={`Avg: ${avg(wtData)} lbs`} color="#FF9500" />

      {/* Streaks */}
      <div style={s.sectionHeader}>Current Streaks</div>
      <div style={s.streaksCard}>
        {streaks.map((sk, i) => (
          <div key={i} style={s.streakRow(i === streaks.length - 1)}>
            <span style={s.streakLabel}>{sk.label}</span>
            <span style={s.streakValue}>{sk.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

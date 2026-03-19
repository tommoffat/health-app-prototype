import React, { useState } from 'react';
import { weeklySleep, weeklyHRV, weeklyActivity, weeklyWeight } from '../../data/fake';

const mono = '"SF Mono", "Fira Code", "Cascadia Code", monospace';
const sans = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const accent = '#7C6EFA';
const secondary = '#8888AA';
const border = '#1A1A2E';

const ranges = ['7D', '30D', '90D'];

function BackButton({ navigate }) {
  return (
    <button onClick={() => navigate('today')} style={{
      background: 'none', border: 'none', color: accent, fontFamily: mono, fontSize: 12,
      cursor: 'pointer', padding: '4px 0', letterSpacing: 0.5, marginBottom: 8,
    }}>{'< BACK'}</button>
  );
}

function expandData(base, count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    const src = base[i % base.length];
    const jitter = (Math.sin(i * 2.1) + Math.cos(i * 0.7)) * 2;
    result.push(+(src + jitter).toFixed(1));
  }
  return result;
}

function LineChart({ title, data, unit, color = accent }) {
  const w = 320, h = 110, px = 8, py = 12;
  const min = Math.min(...data) - 2;
  const max = Math.max(...data) + 2;
  const points = data.map((v, i) => {
    const x = px + (i / (data.length - 1)) * (w - 2 * px);
    const y = py + ((max - v) / (max - min)) * (h - 2 * py);
    return `${x},${y}`;
  });

  const latest = data[data.length - 1];
  const first = data[0];
  const diff = (latest - first).toFixed(1);
  const trend = diff > 0 ? `+${diff}` : `${diff}`;

  return (
    <div style={{ border: `1px solid ${border}`, borderRadius: 8, padding: '14px 16px', marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5 }}>{title}</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontFamily: mono, fontSize: 18, fontWeight: 700, color: '#FFF' }}>{latest}</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: secondary }}>{unit}</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: diff >= 0 ? '#4ADE80' : '#EF4444', marginLeft: 4 }}>{trend}</span>
        </div>
      </div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
        <polyline points={points.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function StreakCard({ label, value, unit }) {
  return (
    <div style={{
      border: `1px solid ${border}`, borderRadius: 8, padding: '14px 16px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <span style={{ fontFamily: sans, fontSize: 13, color: '#FFF' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, color: accent }}>{value}</span>
        <span style={{ fontFamily: mono, fontSize: 10, color: secondary }}>{unit}</span>
      </div>
    </div>
  );
}

export default function Progress({ navigate }) {
  const [range, setRange] = useState('7D');

  const count = range === '7D' ? 7 : range === '30D' ? 30 : 90;
  const sleepData = expandData(weeklySleep, count);
  const hrvData = expandData(weeklyHRV, count);
  const activityData = expandData(weeklyActivity, count);
  const weightData = expandData(weeklyWeight, count);

  return (
    <div style={{ padding: '16px 16px 24px' }}>
      <BackButton navigate={navigate} />
      <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, marginBottom: 16 }}>PROGRESS</div>

      {/* Range Picker */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {ranges.map((r) => (
          <button key={r} onClick={() => setRange(r)} style={{
            flex: 1, padding: '10px 0', border: `1px solid ${range === r ? accent : border}`,
            borderRadius: 6, background: range === r ? accent + '18' : 'transparent',
            fontFamily: mono, fontSize: 12, fontWeight: 600,
            color: range === r ? accent : secondary, cursor: 'pointer', letterSpacing: 1,
          }}>{r}</button>
        ))}
      </div>

      <LineChart title="SLEEP SCORE" data={sleepData} unit="pts" />
      <LineChart title="HRV" data={hrvData} unit="ms" />
      <LineChart title="ACTIVITY" data={activityData} unit="pts" />
      <LineChart title="WEIGHT" data={weightData} unit="lbs" color="#06B6D4" />

      {/* Streaks */}
      <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, marginBottom: 12, marginTop: 8 }}>STREAKS</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <StreakCard label="Activity goal streak" value={12} unit="days" />
        <StreakCard label="Sleep 7h+ streak" value={5} unit="days" />
        <StreakCard label="Supplement streak" value={8} unit="days" />
      </div>
    </div>
  );
}

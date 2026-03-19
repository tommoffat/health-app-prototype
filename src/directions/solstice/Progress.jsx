import React, { useState } from 'react';
import { weeklySleep, weeklyHRV, weeklyActivity, weeklyWeight } from '../../data/fake';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const ranges = ['7D', '30D', '90D'];

function LineChart({ data, color = '#D4845A', height = 80, labels }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 280;
  const pad = 12;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / range) * (height - pad * 2);
    return { x, y, v };
  });
  const line = pts.map(p => `${p.x},${p.y}`).join(' ');
  // area fill
  const area = `${pts[0].x},${height - 2} ${line} ${pts[pts.length - 1].x},${height - 2}`;
  return (
    <svg width="100%" height={height + 22} viewBox={`0 0 ${w} ${height + 22}`} preserveAspectRatio="none">
      <polygon points={area} fill={color} opacity={0.08} />
      <polyline points={line} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill={color} />
      ))}
      {labels && labels.map((l, i) => (
        <text key={i} x={pts[i].x} y={height + 16} textAnchor="middle"
          style={{ fontSize: 9, fill: '#B8A48A', fontFamily: 'Georgia, serif' }}>{l}</text>
      ))}
    </svg>
  );
}

export default function Progress({ onBack }) {
  const [timeRange, setTimeRange] = useState('7D');

  const charts = [
    { title: 'Sleep Score', data: weeklySleep, color: '#D4845A', unit: '' },
    { title: 'HRV', data: weeklyHRV, color: '#7A9B76', unit: ' ms' },
    { title: 'Activity Score', data: weeklyActivity, color: '#5A7A8A', unit: '' },
    { title: 'Weight', data: weeklyWeight, color: '#B8A48A', unit: ' lbs' },
  ];

  const streaks = [
    { label: 'Sleep 80+', value: 5, best: 14 },
    { label: 'Steps 8K+', value: 3, best: 10 },
    { label: 'Active Days', value: 12, best: 21 },
    { label: 'Supplement Log', value: 8, best: 30 },
  ];

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backBtn}>&larr; Back</button>
      <h1 style={styles.title}>Progress</h1>

      {/* Time Range Picker */}
      <div style={styles.rangePicker}>
        {ranges.map((r) => (
          <button
            key={r}
            onClick={() => setTimeRange(r)}
            style={{
              ...styles.rangeBtn,
              background: timeRange === r ? '#D4845A' : 'transparent',
              color: timeRange === r ? '#1A1410' : '#B8A48A',
            }}
          >{r}</button>
        ))}
      </div>

      {/* Charts */}
      {charts.map((c, i) => (
        <div key={i} style={styles.section}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <h2 style={styles.sectionTitle}>{c.title}</h2>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 13, color: c.color }}>
              {c.data[c.data.length - 1]}{c.unit}
            </span>
          </div>
          <div style={styles.card}>
            <LineChart data={c.data} color={c.color} labels={days} />
          </div>
        </div>
      ))}

      {/* Streaks */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Streaks</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {streaks.map((s, i) => (
            <div key={i} style={styles.card}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: '#D4845A' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#F5EDD8', marginTop: 2 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: '#7A9B76', marginTop: 4, fontFamily: 'Georgia, serif' }}>Best: {s.best}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 24 }} />
    </div>
  );
}

const styles = {
  container: { padding: '16px 20px' },
  backBtn: { background: 'none', border: 'none', color: '#D4845A', fontFamily: 'Georgia, serif', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 8 },
  title: { fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 26, fontWeight: 400, color: '#F5EDD8', letterSpacing: 0.5, marginBottom: 16 },
  rangePicker: { display: 'flex', gap: 8, marginBottom: 24 },
  rangeBtn: {
    padding: '8px 20px', borderRadius: 20, border: '1px solid rgba(184,164,138,0.15)',
    fontFamily: 'Georgia, serif', fontSize: 13, cursor: 'pointer',
    transition: 'all 0.2s',
  },
  section: { marginBottom: 24 },
  sectionTitle: { fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 400, color: '#F5EDD8', margin: 0 },
  card: { background: '#231C15', borderRadius: 14, padding: '16px 18px' },
};

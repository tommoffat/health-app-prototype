import React from 'react';
import { today, weeklyHRV, weeklyWeight } from '../../data/fake';

function Sparkline({ data, color = '#D4845A', width = 80, height = 28 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = 2 + (i / (data.length - 1)) * (width - 4);
    const y = 2 + (1 - (v - min) / range) * (height - 4);
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OrganicArc({ score, size = 110 }) {
  const r = (size - 10) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const pct = (score / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(184,164,138,0.1)" strokeWidth={5} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#7A9B76" strokeWidth={5}
        strokeDasharray={`${pct} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: 'stroke-dasharray 0.8s ease' }} />
      <text x={cx} y={cy - 4} textAnchor="middle" dominantBaseline="central"
        style={{ fontFamily: 'Georgia, serif', fontSize: 28, fill: '#F5EDD8' }}>{score}</text>
      <text x={cx} y={cy + 18} textAnchor="middle"
        style={{ fontFamily: 'Georgia, serif', fontSize: 10, fill: '#B8A48A' }}>Health Score</text>
    </svg>
  );
}

export default function Biometrics({ onBack }) {
  const metrics = [
    { label: 'HRV', value: `${today.readiness.hrv} ms`, spark: weeklyHRV, color: '#7A9B76', trend: '+12%' },
    { label: 'Resting HR', value: `${today.readiness.restingHR} bpm`, spark: [56, 55, 54, 53, 52, 52, 52], color: '#D4845A', trend: '-3 bpm' },
    { label: 'SpO2', value: `${today.readiness.spo2}%`, spark: [97, 98, 98, 97, 98, 98, 98], color: '#5A7A8A', trend: 'Stable' },
    { label: 'Body Temp', value: today.readiness.bodyTemp, spark: [0.1, 0.0, 0.1, 0.2, 0.1, 0.2, 0.2], color: '#B8A48A', trend: 'Normal' },
    { label: 'Weight', value: `${today.weight} lbs`, spark: weeklyWeight, color: '#D4845A', trend: '-0.8 lbs' },
    { label: 'Strain', value: today.strain, spark: [10, 12, 14, 11, 13, 12, 12], color: '#7A9B76', trend: 'Moderate' },
  ];

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backBtn}>&larr; Back</button>
      <h1 style={styles.title}>Vitals</h1>

      {/* Health Score */}
      <div style={{ textAlign: 'center', margin: '16px 0 28px' }}>
        <OrganicArc score={today.readiness.score} />
      </div>

      {/* 2-col Metric Grid */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Biometrics</h2>
        <div style={styles.grid}>
          {metrics.map((m, i) => (
            <div key={i} style={styles.metricCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={styles.metricLabel}>{m.label}</div>
                  <div style={styles.metricValue}>{m.value}</div>
                </div>
                <Sparkline data={m.spark} color={m.color} />
              </div>
              <div style={{ fontSize: 11, color: m.color, fontFamily: 'Georgia, serif' }}>{m.trend}</div>
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
  title: { fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 26, fontWeight: 400, color: '#F5EDD8', letterSpacing: 0.5 },
  section: { marginBottom: 24 },
  sectionTitle: { fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 400, color: '#F5EDD8', marginBottom: 12 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  metricCard: { background: '#231C15', borderRadius: 14, padding: '14px 14px 10px' },
  metricLabel: { fontSize: 11, color: '#B8A48A', marginBottom: 2, letterSpacing: 0.3 },
  metricValue: { fontFamily: 'Georgia, serif', fontSize: 18, color: '#F5EDD8' },
};

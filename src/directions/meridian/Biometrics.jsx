import React from 'react';
import { today, weeklyHRV, weeklyWeight } from '../../data/fake';

const s = {
  page: { padding: '0 0 24px 0' },
  sectionHeader: {
    fontSize: 13, fontWeight: '600', color: '#6C6C70', textTransform: 'uppercase',
    letterSpacing: 0.5, padding: '24px 16px 8px 16px',
  },
  ringCenter: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px 8px',
  },
  scoreLabel: { fontSize: 13, color: '#6C6C70', fontWeight: '500', marginTop: 8 },
  grid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '0 16px',
  },
  metricCard: {
    background: '#FFFFFF', borderRadius: 16, padding: 16,
    boxShadow: '0 0.5px 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
    display: 'flex', flexDirection: 'column', gap: 8,
  },
  metricLabel: { fontSize: 13, color: '#6C6C70' },
  metricValue: { fontSize: 28, fontWeight: '700', color: '#000' },
  metricUnit: { fontSize: 13, color: '#6C6C70', marginLeft: 4 },
};

function Sparkline({ data, width = 100, height = 32, color = '#007AFF' }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - 4 - ((v - min) / range) * (height - 8);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReadinessRing({ score }) {
  const size = 120, strokeWidth = 12;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  return (
    <div style={s.ringCenter}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E5EA" strokeWidth={strokeWidth} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#007AFF" strokeWidth={strokeWidth}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div style={{ marginTop: -(size/2 + 14), marginBottom: (size/2 - 20), fontSize: 34, fontWeight: '700', color: '#000' }}>
        {score}
      </div>
      <div style={s.scoreLabel}>Readiness Score</div>
    </div>
  );
}

export default function Biometrics() {
  const r = today.readiness;
  const hrvData = weeklyHRV;
  const wtData = weeklyWeight;
  const hrArr = [54, 53, 52, 53, 52, 52, 52];
  const spo2Arr = [97, 98, 98, 97, 98, 98, 98];

  const metrics = [
    { label: 'HRV', value: r.hrv, unit: 'ms', data: hrvData, color: '#007AFF' },
    { label: 'Resting HR', value: r.restingHR, unit: 'bpm', data: hrArr, color: '#FF3B30' },
    { label: 'Body Temp', value: r.bodyTemp, unit: '', data: [0.1, 0.0, 0.1, 0.2, 0.1, 0.2, 0.2], color: '#FF9500' },
    { label: 'SpO2', value: r.spo2, unit: '%', data: spo2Arr, color: '#34C759' },
    { label: 'Weight', value: today.weight, unit: 'lbs', data: wtData, color: '#5856D6' },
    { label: 'Strain', value: today.strain, unit: '', data: [10.2, 11.8, 14.1, 12.0, 13.2, 12.4, 12.4], color: '#FF2D55' },
  ];

  return (
    <div style={s.page}>
      <ReadinessRing score={r.score} />

      <div style={s.sectionHeader}>Biometrics</div>
      <div style={s.grid}>
        {metrics.map((m, i) => (
          <div key={i} style={s.metricCard}>
            <div style={s.metricLabel}>{m.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={s.metricValue}>{m.value}</span>
              {m.unit && <span style={s.metricUnit}>{m.unit}</span>}
            </div>
            <Sparkline data={m.data} color={m.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

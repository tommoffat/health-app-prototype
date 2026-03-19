import React from 'react';
import { today, weeklyHRV, weeklyWeight } from '../../data/fake';

const c = {
  bg: '#0A0A00', surface: '#111100', accent: '#CCFF00',
  text: '#FFFFFF', dim: '#888877', border: '#222200',
};
const heavy = { fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif', fontWeight: 900 };

function Sparkline({ data, width = 100, height = 28, color = c.accent }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * (height - 4) - 2,
  }));
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area = `${line} L${width},${height} L0,${height} Z`;
  const id = `spk_${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export default function Biometrics({ onBack }) {
  const r = today.readiness;

  const metrics = [
    { label: 'HRV', value: `${r.hrv} ms`, trend: '+12%', data: weeklyHRV },
    { label: 'RESTING HR', value: `${r.restingHR} bpm`, trend: '-2 bpm', data: [56, 55, 54, 53, 52, 52, 52] },
    { label: 'BODY TEMP', value: r.bodyTemp, trend: 'Normal', data: [0.1, 0.0, 0.1, 0.2, 0.1, 0.2, 0.2] },
    { label: 'SPO2', value: `${r.spo2}%`, trend: 'Stable', data: [97, 98, 98, 97, 98, 98, 98] },
    { label: 'WEIGHT', value: `${today.weight} lbs`, trend: '-0.8 lbs', data: weeklyWeight },
    { label: 'RESP RATE', value: '14.2 rpm', trend: 'Normal', data: [14.5, 14.3, 14.4, 14.1, 14.2, 14.2, 14.2] },
  ];

  return (
    <div style={{ padding: '0 16px 100px' }}>
      <div
        onClick={onBack}
        style={{ ...heavy, fontSize: 13, color: c.accent, cursor: 'pointer', marginBottom: 16, letterSpacing: 1 }}
      >
        ← BACK
      </div>

      {/* Readiness hero */}
      <div style={{
        background: c.surface, borderRadius: 16, padding: '32px 24px', marginBottom: 12,
        borderLeft: `4px solid ${c.accent}`,
      }}>
        <div style={{ ...heavy, fontSize: 9, letterSpacing: 3, color: c.dim, marginBottom: 4 }}>READINESS</div>
        <div style={{ ...heavy, fontSize: 80, lineHeight: 1, color: c.accent }}>{r.score}</div>
        <div style={{ ...heavy, fontSize: 13, fontWeight: 700, color: c.dim, marginTop: 4 }}>
          Your body is primed for high intensity
        </div>
      </div>

      {/* 2-column metric cards with sparklines */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        {metrics.map((m) => (
          <div key={m.label} style={{
            background: c.surface, borderRadius: 12, padding: 14,
            borderLeft: m.label === 'HRV' ? `3px solid ${c.accent}` : 'none',
          }}>
            <div style={{ ...heavy, fontSize: 8, letterSpacing: 2, color: c.dim, marginBottom: 4 }}>{m.label}</div>
            <div style={{ ...heavy, fontSize: 22, color: c.text, marginBottom: 2 }}>{m.value}</div>
            <div style={{ ...heavy, fontSize: 10, color: c.accent, marginBottom: 6 }}>{m.trend}</div>
            <Sparkline data={m.data} />
          </div>
        ))}
      </div>

      {/* Readiness breakdown */}
      <div style={{ background: c.surface, borderRadius: 12, padding: 16 }}>
        <div style={{ ...heavy, fontSize: 9, letterSpacing: 2, color: c.dim, marginBottom: 12 }}>
          READINESS FACTORS
        </div>
        {[
          { label: 'Sleep Quality', pct: 92, color: c.accent },
          { label: 'Recovery Index', pct: 85, color: '#88CC00' },
          { label: 'HRV Balance', pct: 78, color: '#88CC00' },
          { label: 'Activity Balance', pct: 70, color: '#556600' },
          { label: 'Body Temperature', pct: 88, color: c.accent },
        ].map((f) => (
          <div key={f.label} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ ...heavy, fontSize: 12, fontWeight: 700, color: c.text }}>{f.label}</span>
              <span style={{ ...heavy, fontSize: 12, color: f.color }}>{f.pct}%</span>
            </div>
            <div style={{ height: 5, background: c.border, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${f.pct}%`, height: '100%', background: f.color, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

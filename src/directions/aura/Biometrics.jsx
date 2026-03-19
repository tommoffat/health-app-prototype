import React from 'react';
import { today, weeklyHRV, weeklyWeight } from '../../data/fake';

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

const Sparkline = ({ data, width = 90, height = 32, color = '#C9A96E' }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) =>
    `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 6) - 3}`
  ).join(' ');
  return (
    <svg width={width} height={height}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const ScoreRing = ({ score, size = 130, strokeWidth = 10 }) => {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const p = (score / 100) * c;
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#bioGold)" strokeWidth={strokeWidth}
          strokeDasharray={c} strokeDashoffset={c - p} strokeLinecap="round" />
        <defs>
          <linearGradient id="bioGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A96E" /><stop offset="100%" stopColor="#E8D5A8" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        <div style={{ fontSize: 36, fontWeight: '600', color: '#C9A96E', lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 11, color: '#8B949E', marginTop: 3, fontWeight: '500' }}>Readiness</div>
      </div>
    </div>
  );
};

export default function Biometrics({ navigate }) {
  const { readiness } = today;

  const metrics = [
    { label: 'HRV', value: `${readiness.hrv} ms`, data: weeklyHRV, trend: '+12%' },
    { label: 'Resting HR', value: `${readiness.restingHR} bpm`, data: [56, 55, 54, 53, 52, 52, 52], trend: '-3 bpm' },
    { label: 'Body Temp', value: readiness.bodyTemp, data: [0.1, 0.0, 0.3, 0.1, 0.2, 0.2, 0.2], trend: 'Normal' },
    { label: 'SpO2', value: `${readiness.spo2}%`, data: [97, 98, 97, 98, 98, 98, 98], trend: 'Stable' },
    { label: 'Weight', value: `${today.weight} lbs`, data: weeklyWeight, trend: '-0.8 lbs' },
    { label: 'Strain', value: today.strain.toString(), data: [10.2, 14.1, 12.8, 11.5, 13.2, 12.4, 12.4], trend: 'Moderate' },
  ];

  return (
    <div style={{ padding: '56px 20px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <BackButton onClick={() => navigate('today')} />
      <div style={{ fontSize: 24, fontWeight: '600', letterSpacing: -0.3 }}>Biometrics</div>

      {/* Readiness Ring */}
      <GlassCard style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 28 }}>
        <ScoreRing score={readiness.score} />
        <div style={{ display: 'flex', gap: 24, marginTop: 20 }}>
          {[
            { label: 'HRV', value: `${readiness.hrv}ms` },
            { label: 'RHR', value: `${readiness.restingHR}bpm` },
            { label: 'Temp', value: readiness.bodyTemp },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: '600', color: '#E6EDF3' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#8B949E', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* 2-Column Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {metrics.map((m) => (
          <GlassCard key={m.label} style={{ padding: 16 }}>
            <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8 }}>{m.label}</div>
            <div style={{ fontSize: 22, fontWeight: '600', color: '#C9A96E', marginTop: 6 }}>{m.value}</div>
            <div style={{ marginTop: 8 }}>
              <Sparkline data={m.data} width={100} height={28} />
            </div>
            <div style={{ fontSize: 11, color: '#8B949E', marginTop: 6, fontWeight: '500' }}>{m.trend} this week</div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

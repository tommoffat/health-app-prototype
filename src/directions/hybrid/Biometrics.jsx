import React from 'react';
import { today, weeklyHRV, weeklyWeight } from '../../data/fake';

const c = {
  bg: '#0F1218', surface: '#181E28', surfaceAlt: '#1E2535',
  amber: '#E8A04B', coral: '#FF8C42', text: '#F0F4F8', muted: '#8899AA',
  green: '#4ADE80', blue: '#4EA8FF', purple: '#B18CFF', red: '#FF6B6B',
};

function Ring({ score, size = 120, color, strokeWidth = 8 }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x={size / 2} y={size / 2 - 8} textAnchor="middle" dominantBaseline="central"
        fill={c.text} style={{ fontSize: 32, fontWeight: 700, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
        {score}
      </text>
      <text x={size / 2} y={size / 2 + 16} textAnchor="middle" dominantBaseline="central"
        fill={c.muted} style={{ fontSize: 11, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
        Readiness
      </text>
    </svg>
  );
}

function Sparkline({ data, color, width = 80, height = 32 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) =>
    `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 6) - 3}`
  ).join(' ');
  return (
    <svg width={width} height={height}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Biometrics({ onBack }) {
  const r = today.readiness;

  const metrics = [
    { label: 'Heart Rate Variability', value: `${r.hrv} ms`, trend: '+12%', trendUp: true, color: c.green, data: weeklyHRV },
    { label: 'Resting Heart Rate', value: `${r.restingHR} bpm`, trend: '-2 bpm', trendUp: true, color: c.blue, data: [56, 55, 54, 53, 52, 52, 52] },
    { label: 'Body Temperature', value: r.bodyTemp, trend: 'Normal', trendUp: null, color: c.amber, data: [0.1, 0.0, 0.1, 0.2, 0.1, 0.2, 0.2] },
    { label: 'Blood Oxygen', value: `${r.spo2}%`, trend: 'Optimal', trendUp: null, color: c.purple, data: [97, 98, 97, 98, 98, 98, 98] },
    { label: 'Weight', value: `${today.weight} lbs`, trend: '-0.8 lbs', trendUp: true, color: c.coral, data: weeklyWeight },
    { label: 'Strain', value: today.strain.toFixed(1), trend: 'Moderate', trendUp: null, color: c.red, data: [10.2, 14.1, 8.5, 12.0, 11.3, 12.4, 12.4] },
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
          Biometrics
        </div>
      </div>

      {/* Readiness Ring Card */}
      <div style={{
        ...cardStyle, display: 'flex', flexDirection: 'column', alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(232,160,75,0.08) 0%, #181E28 100%)', padding: '28px 18px',
      }}>
        <Ring score={r.score} size={130} color={c.amber} strokeWidth={9} />
        <div style={{ fontSize: 13, color: c.muted, marginTop: 12, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
          Your body is well recovered and ready for activity
        </div>
      </div>

      {/* 2-Column Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        {metrics.map(m => (
          <div key={m.label} style={{
            background: c.surface, borderRadius: 14, padding: 16,
            border: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div style={{ fontSize: 11, color: c.muted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
              {m.label}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif', marginBottom: 4 }}>
                  {m.value}
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 500,
                  color: m.trendUp === true ? c.green : m.trendUp === false ? c.red : c.muted,
                }}>
                  {m.trendUp === true && '\u2191 '}{m.trendUp === false && '\u2193 '}{m.trend}
                </div>
              </div>
              <Sparkline data={m.data} color={m.color} width={64} height={28} />
            </div>
          </div>
        ))}
      </div>

      {/* Contributors */}
      <div style={cardStyle}>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 14, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
          Readiness Contributors
        </div>
        {[
          { label: 'Previous Night Sleep', value: 87, color: '#B18CFF' },
          { label: 'Sleep Balance', value: 82, color: c.blue },
          { label: 'HRV Balance', value: 90, color: c.green },
          { label: 'Recovery Index', value: 78, color: c.amber },
          { label: 'Body Temperature', value: 85, color: c.coral },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0',
            borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <div style={{ flex: 1, fontSize: 13, color: c.text, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
              {item.label}
            </div>
            <div style={{ width: 80, background: 'rgba(255,255,255,0.04)', borderRadius: 3, height: 5, overflow: 'hidden' }}>
              <div style={{ width: `${item.value}%`, height: '100%', background: item.color, borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.text, width: 28, textAlign: 'right', fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

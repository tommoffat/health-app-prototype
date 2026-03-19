import React from 'react';
import { today, weeklyHRV, weeklyWeight } from '../../data/fake';

const TEAL = '#4ECDC4';
const CORAL = '#FF6B35';
const PURPLE = '#9B59B6';
const BG = '#0F0F0F';
const SURFACE = '#1A1A1A';
const SURFACE2 = '#222222';
const WHITE = '#FFFFFF';
const GRAY = '#999999';

const r = today.readiness;

const metrics = [
  { label: 'HRV', value: `${r.hrv} ms`, trend: '+5%', trendUp: true, color: TEAL, data: weeklyHRV },
  { label: 'Resting HR', value: `${r.restingHR} bpm`, trend: '-2%', trendUp: true, color: CORAL, data: [56, 55, 54, 53, 52, 52, 52] },
  { label: 'Body Temp', value: r.bodyTemp, trend: 'Normal', trendUp: null, color: PURPLE, data: [0.1, 0.0, 0.2, 0.1, 0.3, 0.2, 0.2] },
  { label: 'SpO2', value: `${r.spo2}%`, trend: 'Normal', trendUp: null, color: TEAL, data: [97, 98, 97, 98, 98, 98, 98] },
  { label: 'Weight', value: `${today.weight} lbs`, trend: '-0.8', trendUp: true, color: CORAL, data: weeklyWeight },
  { label: 'Resp Rate', value: '14.2 brpm', trend: 'Normal', trendUp: null, color: PURPLE, data: [14.5, 14.3, 14.1, 14.4, 14.2, 14.3, 14.2] },
];

function Sparkline({ data, color, width = 70, height = 30 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) =>
    `${(i / (data.length - 1)) * width},${height - 4 - ((v - min) / range) * (height - 8)}`
  ).join(' ');
  const areaPoints = `0,${height} ${points} ${width},${height}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#sg-${color.replace('#', '')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={width} cy={parseFloat(points.split(' ').pop().split(',')[1])} r="3" fill={color} />
    </svg>
  );
}

function RecoveryGauge() {
  const score = r.score;
  const radius = 55;
  const circ = 2 * Math.PI * radius;
  const filled = circ * (score / 100);
  return (
    <div style={{ textAlign: 'center', marginBottom: 8 }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke={SURFACE2} strokeWidth="10" />
        <circle cx="70" cy="70" r={radius} fill="none" stroke={TEAL} strokeWidth="10"
          strokeDasharray={`${filled} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ filter: `drop-shadow(0 0 10px ${TEAL}55)` }} />
      </svg>
      <div style={{ marginTop: -95, position: 'relative' }}>
        <div style={{ fontSize: 48, fontWeight: 900, color: TEAL, lineHeight: 1 }}>{score}</div>
        <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2, marginTop: 2 }}>RECOVERY</div>
      </div>
      <div style={{ height: 50 }} />
    </div>
  );
}

export default function BiometricsScreen({ onBack }) {
  return (
    <div style={{ background: BG, minHeight: '100%', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div onClick={onBack} style={{ color: GRAY, fontSize: 24, cursor: 'pointer', lineHeight: 1 }}>&#8592;</div>
        <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase' }}>BIOMETRICS & RECOVERY</div>
      </div>

      {/* Recovery Gauge */}
      <div style={{ padding: '0 20px 10px' }}>
        <div style={{
          background: SURFACE, borderRadius: 20, padding: '24px 16px 16px',
          borderTop: `3px solid ${TEAL}`, textAlign: 'center'
        }}>
          <RecoveryGauge />
        </div>
      </div>

      {/* 2-Column Metric Cards */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {metrics.map((m, i) => (
            <div key={i} style={{
              background: SURFACE, borderRadius: 16, padding: '14px 16px',
              borderTop: `2px solid ${m.color}22`, position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ color: GRAY, fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{m.label}</div>
                  <div style={{ color: WHITE, fontSize: 20, fontWeight: 900 }}>{m.value}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{
                  color: m.trendUp === true ? TEAL : m.trendUp === false ? CORAL : GRAY,
                  fontSize: 11, fontWeight: 700
                }}>
                  {m.trendUp === true ? '\u25B2 ' : m.trendUp === false ? '\u25BC ' : ''}{m.trend}
                </div>
                <Sparkline data={m.data} color={m.color} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HRV Trend Chart */}
      <div style={{ padding: '16px 20px' }}>
        <div style={{ background: SURFACE, borderRadius: 16, padding: 16, borderTop: `2px solid ${SURFACE2}` }}>
          <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>7-Day HRV Trend</div>
          <HRVChart />
        </div>
      </div>
    </div>
  );
}

function HRVChart() {
  const W = 300, H = 100;
  const data = weeklyHRV;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const min = Math.min(...data) - 5;
  const max = Math.max(...data) + 5;
  const range = max - min;
  const points = data.map((v, i) => ({
    x: 20 + (i / (data.length - 1)) * (W - 40),
    y: 10 + (1 - (v - min) / range) * (H - 30)
  }));
  const line = points.map(p => `${p.x},${p.y}`).join(' ');
  const area = `${points[0].x},${H - 15} ${line} ${points[points.length - 1].x},${H - 15}`;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="hrvBevelGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={TEAL} stopOpacity="0.3" />
          <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#hrvBevelGrad)" />
      <polyline points={line} fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={i === data.length - 1 ? 5 : 3} fill={i === data.length - 1 ? TEAL : SURFACE} stroke={TEAL} strokeWidth="2" />
          <text x={p.x} y={H - 2} fill={GRAY} fontSize="8" textAnchor="middle" fontWeight="600">{days[i]}</text>
        </g>
      ))}
    </svg>
  );
}

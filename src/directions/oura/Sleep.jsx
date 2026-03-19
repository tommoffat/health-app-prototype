import React from 'react';
import { today, weeklyHRV, weeklySleep } from '../../data/fake.js';

const c = {
  bg: '#0B0E13',
  surface: '#131920',
  surfaceAlt: '#1E2530',
  accent: '#E8A04B',
  sleep: '#7B68EE',
  text: '#EAEAEA',
  secondary: '#7A8899',
  border: '#2A3545',
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function ScoreRing({ score, size, color, strokeWidth }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const cx = size / 2;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke={c.surfaceAlt} strokeWidth={strokeWidth} />
      <circle cx={cx} cy={cx} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      <text x={cx} y={cx} textAnchor="middle" dominantBaseline="central" fill={c.text}
        style={{ transform: 'rotate(90deg)', transformOrigin: 'center', fontSize: 32, fontWeight: 600,
          fontFamily: '-apple-system, SF Pro Display, sans-serif' }}>{score}</text>
    </svg>
  );
}

function SleepStagesChart() {
  const stages = [
    { label: 'Awake', value: 28, color: '#5E4E8B', total: 442 },
    { label: 'REM', value: 118, color: '#7B68EE', total: 442 },
    { label: 'Light', value: 192, color: '#5B8FD4', total: 442 },
    { label: 'Deep', value: 104, color: '#3A5A8C', total: 442 },
  ];
  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 18 }}>
      <h4 style={{ color: c.text, fontSize: 14, fontWeight: 600, margin: '0 0 16px' }}>Sleep Stages</h4>
      {/* Stacked bar */}
      <div style={{ display: 'flex', height: 28, borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
        {stages.map((s, i) => (
          <div key={i} style={{
            width: `${(s.value / s.total) * 100}%`, background: s.color,
            transition: 'width 0.5s ease',
          }} />
        ))}
      </div>
      {/* Legend */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {stages.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} />
            <span style={{ color: c.secondary, fontSize: 12 }}>{s.label}</span>
            <span style={{ color: c.text, fontSize: 12, fontWeight: 600, marginLeft: 'auto' }}>
              {Math.floor(s.value / 60)}h {s.value % 60}m
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HRVChart() {
  const max = Math.max(...weeklyHRV);
  const min = Math.min(...weeklyHRV);
  const range = max - min || 1;
  const w = 280, h = 100, px = 10, py = 10;
  const points = weeklyHRV.map((v, i) => ({
    x: px + (i / (weeklyHRV.length - 1)) * (w - 2 * px),
    y: py + (1 - (v - min) / range) * (h - 2 * py),
  }));
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area = `${line} L${points[points.length - 1].x},${h} L${points[0].x},${h} Z`;

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h4 style={{ color: c.text, fontSize: 14, fontWeight: 600, margin: 0 }}>HRV Trend</h4>
        <span style={{ color: c.sleep, fontSize: 22, fontWeight: 700 }}>{today.sleep.hrv} ms</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="hrvGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c.sleep} stopOpacity="0.3" />
            <stop offset="100%" stopColor={c.sleep} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#hrvGrad)" />
        <path d={line} fill="none" stroke={c.sleep} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill={c.sleep} />
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        {days.map(d => (
          <span key={d} style={{ color: c.secondary, fontSize: 10, width: 30, textAlign: 'center' }}>{d}</span>
        ))}
      </div>
    </div>
  );
}

function WeeklyTrend() {
  const max = Math.max(...weeklySleep);
  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 18 }}>
      <h4 style={{ color: c.text, fontSize: 14, fontWeight: 600, margin: '0 0 16px' }}>7-Day Sleep Score</h4>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 80, gap: 6 }}>
        {weeklySleep.map((v, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ color: c.text, fontSize: 10, fontWeight: 600 }}>{v}</span>
            <div style={{
              width: '100%', maxWidth: 28,
              height: `${(v / max) * 60}px`,
              background: i === weeklySleep.length - 1 ? c.sleep : c.surfaceAlt,
              borderRadius: 4,
              transition: 'height 0.5s ease',
            }} />
            <span style={{ color: c.secondary, fontSize: 10 }}>{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', padding: '12px 0',
      borderBottom: `1px solid ${c.border}`,
    }}>
      <span style={{ color: c.secondary, fontSize: 13 }}>{label}</span>
      <span style={{ color: c.text, fontSize: 13, fontWeight: 600 }}>{value}</span>
    </div>
  );
}

export default function Sleep({ onBack }) {
  return (
    <div style={{
      minHeight: '100%', background: c.bg, padding: '20px 20px 32px',
      fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', color: c.sleep, fontSize: 15,
          cursor: 'pointer', padding: '4px 0', fontWeight: 500,
        }}>
          &#8592; Back
        </button>
        <h2 style={{ color: c.text, fontSize: 18, fontWeight: 600, margin: '0 auto', paddingRight: 48 }}>
          Sleep
        </h2>
      </div>

      {/* Score Ring */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 8 }}>
        <ScoreRing score={today.sleep.score} size={140} color={c.sleep} strokeWidth={9} />
        <p style={{ color: c.secondary, fontSize: 13, marginTop: 8 }}>Sleep Score</p>
        <p style={{ color: c.text, fontSize: 15, fontWeight: 600, margin: '2px 0 0' }}>
          Total: {today.sleep.total}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
        <SleepStagesChart />
        <HRVChart />

        {/* Stats */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: '6px 18px' }}>
          <StatRow label="Efficiency" value={`${today.sleep.efficiency}%`} />
          <StatRow label="Latency" value={`${today.sleep.latency} min`} />
          <StatRow label="Resting HR" value={`${today.sleep.restingHR} bpm`} />
          <StatRow label="HRV" value={`${today.sleep.hrv} ms`} />
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
            <span style={{ color: c.secondary, fontSize: 13 }}>SpO2</span>
            <span style={{ color: c.text, fontSize: 13, fontWeight: 600 }}>{today.readiness.spo2}%</span>
          </div>
        </div>

        <WeeklyTrend />

        {/* Recommendations */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 18 }}>
          <h4 style={{ color: c.text, fontSize: 14, fontWeight: 600, margin: '0 0 12px' }}>Recommendations</h4>
          {[
            'Maintain consistent bedtime around 10:30 PM',
            'Avoid screens 1 hour before sleep',
            'Keep bedroom temperature at 65-68\u00B0F',
          ].map((rec, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              marginBottom: i < 2 ? 10 : 0,
            }}>
              <span style={{ color: c.sleep, fontSize: 14, marginTop: 1 }}>&#10003;</span>
              <span style={{ color: c.secondary, fontSize: 13, lineHeight: 1.5 }}>{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

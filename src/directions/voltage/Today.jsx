import React from 'react';
import { today, weeklyHRV } from '../../data/fake';

const c = {
  bg: '#0A0A00', surface: '#111100', accent: '#CCFF00',
  text: '#FFFFFF', dim: '#888877', border: '#222200',
};

const heavy = { fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif', fontWeight: 900 };

function MiniAreaChart({ data, width = 120, height = 32, color = c.accent }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * (height - 4) - 2,
  }));
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area = `${line} L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="vAreaG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#vAreaG)" />
      <path d={line} fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export default function Today({ onNavigate }) {
  const metrics = [
    { label: 'SLEEP', value: today.sleep.score, unit: '' },
    { label: 'READINESS', value: today.readiness.score, unit: '' },
    { label: 'ACTIVITY', value: today.activity.score, unit: '' },
    { label: 'STEPS', value: today.activity.steps.toLocaleString(), unit: '' },
    { label: 'CALORIES', value: today.activity.calories, unit: 'kcal' },
    { label: 'HRV', value: today.readiness.hrv, unit: 'ms' },
  ];

  return (
    <div style={{ padding: '0 16px 100px' }}>
      {/* Date */}
      <div style={{ ...heavy, fontSize: 11, letterSpacing: 3, color: c.dim, textTransform: 'uppercase', marginBottom: 8 }}>
        {today.date}
      </div>

      {/* STRAIN hero */}
      <div
        style={{
          background: c.surface, borderRadius: 16, padding: '32px 24px', marginBottom: 12,
          borderLeft: `4px solid ${c.accent}`, cursor: 'pointer',
        }}
        onClick={() => onNavigate && onNavigate('activity')}
      >
        <div style={{ ...heavy, fontSize: 11, letterSpacing: 3, color: c.dim, textTransform: 'uppercase', marginBottom: 4 }}>
          STRAIN
        </div>
        <div style={{ ...heavy, fontSize: 80, lineHeight: 1, color: c.accent, marginBottom: 4 }}>
          {today.strain}
        </div>
        <div style={{ fontSize: 13, color: c.dim, ...heavy, fontWeight: 700 }}>/ 21.0 max</div>
      </div>

      {/* 3-column metrics grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
        {metrics.map((m) => (
          <div
            key={m.label}
            style={{
              background: c.surface, borderRadius: 10, padding: '14px 10px', textAlign: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (m.label === 'SLEEP') onNavigate && onNavigate('sleep');
              if (m.label === 'READINESS' || m.label === 'HRV') onNavigate && onNavigate('biometrics');
              if (m.label === 'ACTIVITY' || m.label === 'STEPS' || m.label === 'CALORIES') onNavigate && onNavigate('activity');
            }}
          >
            <div style={{ ...heavy, fontSize: 9, letterSpacing: 2, color: c.dim, marginBottom: 4, textTransform: 'uppercase' }}>
              {m.label}
            </div>
            <div style={{ ...heavy, fontSize: 26, color: c.text }}>
              {m.value}
              {m.unit && <span style={{ fontSize: 11, color: c.dim, marginLeft: 2 }}>{m.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Workout card */}
      <div style={{ background: c.surface, borderRadius: 12, padding: 16, marginBottom: 12, borderLeft: `4px solid ${c.accent}` }}>
        <div style={{ ...heavy, fontSize: 9, letterSpacing: 2, color: c.dim, marginBottom: 8, textTransform: 'uppercase' }}>
          ACTIVE WORKOUT
        </div>
        <div style={{ ...heavy, fontSize: 18, color: c.text, marginBottom: 4 }}>{today.workout.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            flex: 1, height: 6, background: c.border, borderRadius: 3, overflow: 'hidden',
          }}>
            <div style={{
              width: `${(today.workout.setsComplete / today.workout.setsTotal) * 100}%`,
              height: '100%', background: c.accent, borderRadius: 3,
            }} />
          </div>
          <span style={{ ...heavy, fontSize: 12, color: c.accent }}>
            {today.workout.setsComplete}/{today.workout.setsTotal} SETS
          </span>
        </div>
      </div>

      {/* HRV Trend mini */}
      <div style={{ background: c.surface, borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ ...heavy, fontSize: 9, letterSpacing: 2, color: c.dim, textTransform: 'uppercase' }}>HRV 7-DAY</div>
          <div style={{ ...heavy, fontSize: 18, color: c.accent }}>{weeklyHRV[weeklyHRV.length - 1]} ms</div>
        </div>
        <MiniAreaChart data={weeklyHRV} width={280} height={40} />
      </div>

      {/* Supplements */}
      <div style={{ background: c.surface, borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <div style={{ ...heavy, fontSize: 9, letterSpacing: 2, color: c.dim, marginBottom: 10, textTransform: 'uppercase' }}>
          SUPPLEMENTS
        </div>
        {today.supplements.map((s) => (
          <div key={s.name} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '6px 0', borderBottom: `1px solid ${c.border}`,
          }}>
            <span style={{ ...heavy, fontSize: 13, fontWeight: 700, color: s.done ? c.dim : c.text }}>
              {s.name}
            </span>
            <span style={{
              ...heavy, fontSize: 10, letterSpacing: 1,
              color: s.done ? c.accent : c.dim,
            }}>
              {s.done ? 'DONE' : 'PENDING'}
            </span>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div style={{ background: c.surface, borderRadius: 12, padding: 16, borderLeft: `4px solid ${c.accent}` }}>
        <div style={{ ...heavy, fontSize: 9, letterSpacing: 2, color: c.dim, marginBottom: 10, textTransform: 'uppercase' }}>
          INSIGHTS
        </div>
        {today.insights.map((ins, i) => (
          <div key={i} style={{
            ...heavy, fontSize: 13, fontWeight: 700, color: c.text,
            padding: '8px 0', borderBottom: i < today.insights.length - 1 ? `1px solid ${c.border}` : 'none',
          }}>
            {ins}
          </div>
        ))}
      </div>
    </div>
  );
}

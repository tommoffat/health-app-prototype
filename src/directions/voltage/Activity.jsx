import React from 'react';
import { today, weeklyActivity } from '../../data/fake';

const c = {
  bg: '#0A0A00', surface: '#111100', accent: '#CCFF00',
  text: '#FFFFFF', dim: '#888877', border: '#222200',
};
const heavy = { fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif', fontWeight: 900 };

function AreaChart({ data, width = 300, height = 80, color = c.accent, id = 'act' }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * (height - 8) - 4,
  }));
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area = `${line} L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} style={{ display: 'block', width: '100%' }} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`aG_${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0.03" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#aG_${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={i === pts.length - 1 ? color : 'transparent'} />
      ))}
    </svg>
  );
}

export default function Activity({ onBack }) {
  const a = today.activity;
  const bigMetrics = [
    { label: 'STEPS', value: a.steps.toLocaleString() },
    { label: 'CALORIES', value: `${a.calories}` },
    { label: 'ACTIVE MIN', value: `${a.activeMinutes}` },
  ];

  const workouts = [
    { name: 'Upper Body Strength', duration: '48 min', strain: '14.2', time: 'Today' },
    { name: 'Zone 2 Run', duration: '35 min', strain: '11.8', time: 'Yesterday' },
    { name: 'HIIT Circuit', duration: '25 min', strain: '16.1', time: '2 days ago' },
  ];

  return (
    <div style={{ padding: '0 16px 100px' }}>
      <div
        onClick={onBack}
        style={{ ...heavy, fontSize: 13, color: c.accent, cursor: 'pointer', marginBottom: 16, letterSpacing: 1 }}
      >
        ← BACK
      </div>

      {/* Big numbers row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
        {bigMetrics.map((m) => (
          <div key={m.label} style={{
            background: c.surface, borderRadius: 12, padding: '20px 10px', textAlign: 'center',
            borderLeft: m.label === 'STEPS' ? `4px solid ${c.accent}` : 'none',
          }}>
            <div style={{ ...heavy, fontSize: 8, letterSpacing: 2, color: c.dim, marginBottom: 4 }}>{m.label}</div>
            <div style={{ ...heavy, fontSize: 32, color: c.text }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Strain hero */}
      <div style={{
        background: c.surface, borderRadius: 16, padding: '28px 24px', marginBottom: 12,
        borderLeft: `4px solid ${c.accent}`,
      }}>
        <div style={{ ...heavy, fontSize: 9, letterSpacing: 3, color: c.dim, marginBottom: 4 }}>STRAIN</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ ...heavy, fontSize: 64, lineHeight: 1, color: c.accent }}>{today.strain}</span>
          <span style={{ ...heavy, fontSize: 16, color: c.dim }}>/ 21.0</span>
        </div>
        <div style={{
          height: 8, background: c.border, borderRadius: 4, marginTop: 12, overflow: 'hidden',
        }}>
          <div style={{
            width: `${(today.strain / 21) * 100}%`, height: '100%',
            background: `linear-gradient(90deg, ${c.accent}, #88CC00)`, borderRadius: 4,
          }} />
        </div>
      </div>

      {/* 7-day activity chart */}
      <div style={{ background: c.surface, borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <div style={{ ...heavy, fontSize: 9, letterSpacing: 2, color: c.dim, marginBottom: 8 }}>
          ACTIVITY SCORE · 7 DAYS
        </div>
        <AreaChart data={weeklyActivity} id="actScore" />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <span key={i} style={{ ...heavy, fontSize: 9, color: c.dim, letterSpacing: 1 }}>{d}</span>
          ))}
        </div>
      </div>

      {/* Workout log */}
      <div style={{ background: c.surface, borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <div style={{ ...heavy, fontSize: 9, letterSpacing: 2, color: c.dim, marginBottom: 10 }}>WORKOUT LOG</div>
        {workouts.map((w, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 0', borderBottom: i < workouts.length - 1 ? `1px solid ${c.border}` : 'none',
          }}>
            <div>
              <div style={{ ...heavy, fontSize: 14, color: c.text }}>{w.name}</div>
              <div style={{ ...heavy, fontSize: 11, fontWeight: 700, color: c.dim }}>{w.time} · {w.duration}</div>
            </div>
            <div style={{ ...heavy, fontSize: 18, color: c.accent }}>{w.strain}</div>
          </div>
        ))}
      </div>

      {/* Streak */}
      <div style={{
        background: c.surface, borderRadius: 12, padding: 20, textAlign: 'center',
        borderLeft: `4px solid ${c.accent}`,
      }}>
        <div style={{ ...heavy, fontSize: 9, letterSpacing: 2, color: c.dim, marginBottom: 4 }}>ACTIVE STREAK</div>
        <div style={{ ...heavy, fontSize: 48, color: c.accent }}>12</div>
        <div style={{ ...heavy, fontSize: 11, color: c.dim, letterSpacing: 2 }}>CONSECUTIVE DAYS</div>
      </div>
    </div>
  );
}

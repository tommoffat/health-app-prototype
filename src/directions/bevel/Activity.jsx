import React from 'react';
import { today, weeklyActivity } from '../../data/fake';

const CORAL = '#FF6B35';
const TEAL = '#4ECDC4';
const BG = '#0F0F0F';
const SURFACE = '#1A1A1A';
const SURFACE2 = '#222222';
const WHITE = '#FFFFFF';
const GRAY = '#999999';

const a = today.activity;

const bigMetrics = [
  { label: 'Steps', value: a.steps.toLocaleString(), color: CORAL },
  { label: 'Calories', value: a.calories, color: '#E74C3C' },
];

const smallMetrics = [
  { label: 'Active Min', value: a.activeMinutes },
  { label: 'Stand Hours', value: `${a.standHours}/12` },
  { label: 'Strain', value: today.strain.toFixed(1) },
  { label: 'Score', value: `${a.score}%` },
];

const workouts = [
  { name: 'Upper Body Strength', time: '8:30 AM', strain: 8.2, duration: '42 min', cal: 312 },
  { name: 'Morning Walk', time: '7:00 AM', strain: 4.2, duration: '25 min', cal: 175 },
];

function WeeklyBarChart() {
  const W = 320, H = 120;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const max = Math.max(...weeklyActivity);
  const barW = 28;
  const gap = (W - 40 - barW * 7) / 6;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CORAL} />
          <stop offset="100%" stopColor={CORAL} stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {weeklyActivity.map((v, i) => {
        const barH = (v / max) * (H - 30);
        const x = 20 + i * (barW + gap);
        const isToday = i === weeklyActivity.length - 1;
        return (
          <g key={i}>
            <rect x={x} y={H - 18 - barH} width={barW} height={barH} rx={6}
              fill={isToday ? 'url(#barGrad)' : SURFACE2} />
            {isToday && <rect x={x} y={H - 18 - barH} width={barW} height={3} rx={1.5} fill={CORAL} />}
            <text x={x + barW / 2} y={H - 4} fill={isToday ? WHITE : GRAY} fontSize="8" textAnchor="middle" fontWeight="700">{days[i]}</text>
            <text x={x + barW / 2} y={H - 22 - barH} fill={isToday ? CORAL : GRAY} fontSize="8" textAnchor="middle" fontWeight="700">{v}</text>
          </g>
        );
      })}
    </svg>
  );
}

function StrainGauge() {
  const strain = today.strain;
  const pct = (strain / 21) * 100;
  const radius = 60;
  const circ = 2 * Math.PI * radius;
  const arcLength = circ * 0.75;
  const filled = arcLength * (pct / 100);

  return (
    <div style={{ textAlign: 'center', position: 'relative', width: 160, height: 130, margin: '0 auto' }}>
      <svg width="160" height="130" viewBox="0 0 160 130">
        <path d={`M 20 110 A 60 60 0 1 1 140 110`} fill="none" stroke={SURFACE2} strokeWidth="10" strokeLinecap="round" />
        <path d={`M 20 110 A 60 60 0 1 1 140 110`} fill="none" stroke={CORAL} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${filled} ${arcLength}`}
          style={{ filter: `drop-shadow(0 0 8px ${CORAL}66)` }} />
      </svg>
      <div style={{ position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div style={{ fontSize: 36, fontWeight: 900, color: CORAL, lineHeight: 1 }}>{strain.toFixed(1)}</div>
        <div style={{ color: GRAY, fontSize: 9, fontWeight: 700, letterSpacing: 2, marginTop: 2 }}>STRAIN</div>
      </div>
    </div>
  );
}

export default function ActivityScreen({ onBack }) {
  return (
    <div style={{ background: BG, minHeight: '100%', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div onClick={onBack} style={{ color: GRAY, fontSize: 24, cursor: 'pointer', lineHeight: 1 }}>&#8592;</div>
        <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase' }}>ACTIVITY & STRAIN</div>
      </div>

      {/* Strain Gauge */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ background: SURFACE, borderRadius: 20, padding: '20px 16px 12px', borderTop: `3px solid ${CORAL}` }}>
          <StrainGauge />
        </div>
      </div>

      {/* Big Metrics */}
      <div style={{ display: 'flex', gap: 10, padding: '0 20px', marginBottom: 16 }}>
        {bigMetrics.map((m, i) => (
          <div key={i} style={{
            flex: 1, background: SURFACE, borderRadius: 16, padding: '16px 16px',
            textAlign: 'center', borderTop: `2px solid ${SURFACE2}`
          }}>
            <div style={{ color: WHITE, fontSize: 32, fontWeight: 900 }}>{m.value}</div>
            <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 2 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Small Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, padding: '0 20px', marginBottom: 16 }}>
        {smallMetrics.map((m, i) => (
          <div key={i} style={{
            background: SURFACE, borderRadius: 12, padding: '10px 6px', textAlign: 'center',
            borderTop: `2px solid ${SURFACE2}`
          }}>
            <div style={{ color: WHITE, fontSize: 16, fontWeight: 900 }}>{m.value}</div>
            <div style={{ color: GRAY, fontSize: 8, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 2 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* 7-Day Chart */}
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <div style={{ background: SURFACE, borderRadius: 16, padding: 16, borderTop: `2px solid ${SURFACE2}` }}>
          <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>7-Day Activity Score</div>
          <WeeklyBarChart />
        </div>
      </div>

      {/* Workout Log */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Workout Log</div>
        {workouts.map((w, i) => (
          <div key={i} style={{
            background: SURFACE, borderRadius: 14, padding: '14px 16px', marginBottom: 10,
            borderLeft: `3px solid ${CORAL}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ color: WHITE, fontSize: 14, fontWeight: 800 }}>{w.name}</div>
                <div style={{ color: GRAY, fontSize: 11, marginTop: 2 }}>{w.time} &middot; {w.duration}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: CORAL, fontSize: 18, fontWeight: 900 }}>{w.strain}</div>
                <div style={{ color: GRAY, fontSize: 9, fontWeight: 700, letterSpacing: 1 }}>STRAIN</div>
              </div>
            </div>
            <div style={{ color: GRAY, fontSize: 11, marginTop: 6 }}>{w.cal} cal burned</div>
          </div>
        ))}
      </div>

      {/* Streak */}
      <div style={{ padding: '16px 20px' }}>
        <div style={{
          background: SURFACE, borderRadius: 16, padding: '16px 20px', textAlign: 'center',
          borderTop: `3px solid ${CORAL}`
        }}>
          <div style={{ color: CORAL, fontSize: 36, fontWeight: 900 }}>12</div>
          <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Day Activity Streak</div>
        </div>
      </div>
    </div>
  );
}

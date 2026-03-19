import React from 'react';
import { today, weeklyActivity } from '../../data/fake.js';

const c = {
  bg: '#0B0E13',
  surface: '#131920',
  surfaceAlt: '#1E2530',
  accent: '#E8A04B',
  activity: '#4A90D9',
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

function StatCard({ label, value, unit, icon }) {
  return (
    <div style={{
      background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14,
      padding: 16, flex: 1,
    }}>
      <div style={{ color: c.secondary, fontSize: 12, marginBottom: 6 }}>{icon} {label}</div>
      <div>
        <span style={{ color: c.text, fontSize: 24, fontWeight: 700 }}>{value}</span>
        {unit && <span style={{ color: c.secondary, fontSize: 13, marginLeft: 4 }}>{unit}</span>}
      </div>
    </div>
  );
}

function WeeklyChart() {
  const max = Math.max(...weeklyActivity);
  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 18 }}>
      <h4 style={{ color: c.text, fontSize: 14, fontWeight: 600, margin: '0 0 16px' }}>7-Day Activity Score</h4>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 80, gap: 6 }}>
        {weeklyActivity.map((v, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ color: c.text, fontSize: 10, fontWeight: 600 }}>{v}</span>
            <div style={{
              width: '100%', maxWidth: 28,
              height: `${(v / max) * 60}px`,
              background: i === weeklyActivity.length - 1 ? c.activity : c.surfaceAlt,
              borderRadius: 4,
            }} />
            <span style={{ color: c.secondary, fontSize: 10 }}>{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkoutCard() {
  const w = today.workout;
  const pct = w.setsComplete / w.setsTotal;
  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 18 }}>
      <h4 style={{ color: c.text, fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>Today's Workout</h4>
      <p style={{ color: c.secondary, fontSize: 13, margin: '0 0 14px' }}>{w.name}</p>
      <div style={{ background: c.surfaceAlt, borderRadius: 6, height: 8, overflow: 'hidden', marginBottom: 8 }}>
        <div style={{
          height: '100%', width: `${pct * 100}%`, background: c.activity,
          borderRadius: 6, transition: 'width 0.5s ease',
        }} />
      </div>
      <p style={{ color: c.secondary, fontSize: 12, margin: 0 }}>
        {w.setsComplete} of {w.setsTotal} sets completed
      </p>
    </div>
  );
}

export default function Activity({ onBack }) {
  return (
    <div style={{
      minHeight: '100%', background: c.bg, padding: '20px 20px 32px',
      fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', color: c.activity, fontSize: 15,
          cursor: 'pointer', padding: '4px 0', fontWeight: 500,
        }}>
          &#8592; Back
        </button>
        <h2 style={{ color: c.text, fontSize: 18, fontWeight: 600, margin: '0 auto', paddingRight: 48 }}>
          Activity
        </h2>
      </div>

      {/* Score Ring */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <ScoreRing score={today.activity.score} size={140} color={c.activity} strokeWidth={9} />
        <p style={{ color: c.secondary, fontSize: 13, marginTop: 8 }}>Activity Score</p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <StatCard icon="&#128694;" label="Steps" value={today.activity.steps.toLocaleString()} />
        <StatCard icon="&#128293;" label="Calories" value={today.activity.calories} unit="kcal" />
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <StatCard icon="&#9201;" label="Active Min" value={today.activity.activeMinutes} unit="min" />
        <StatCard icon="&#9650;" label="Stand Hours" value={today.activity.standHours} unit="/ 12" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <WorkoutCard />
        <WeeklyChart />

        {/* Streak */}
        <div style={{
          background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14,
          padding: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <h4 style={{ color: c.text, fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>Activity Streak</h4>
            <p style={{ color: c.secondary, fontSize: 12, margin: 0 }}>Consecutive days meeting goal</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: c.activity, fontSize: 28, fontWeight: 700 }}>12</div>
            <div style={{ color: c.secondary, fontSize: 11 }}>days</div>
          </div>
        </div>
      </div>
    </div>
  );
}

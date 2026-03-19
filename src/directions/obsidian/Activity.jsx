import React from 'react';
import { today, weeklyActivity } from '../../data/fake';

const mono = '"SF Mono", "Fira Code", "Cascadia Code", monospace';
const sans = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const accent = '#7C6EFA';
const secondary = '#8888AA';
const border = '#1A1A2E';
const surface = '#0A0A0A';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function BackButton({ navigate }) {
  return (
    <button onClick={() => navigate('today')} style={{
      background: 'none', border: 'none', color: accent, fontFamily: mono, fontSize: 12,
      cursor: 'pointer', padding: '4px 0', letterSpacing: 0.5, marginBottom: 8,
    }}>{'< BACK'}</button>
  );
}

function ScoreRing({ score }) {
  const size = 120, sw = 4;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '16px 0' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={border} strokeWidth={sw} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={accent} strokeWidth={sw}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div style={{ marginTop: -(size / 2) - 18, height: size / 2 + 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
        <span style={{ fontFamily: mono, fontSize: 40, fontWeight: 700, color: '#FFF' }}>{score}</span>
      </div>
      <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, marginTop: 6 }}>ACTIVITY SCORE</div>
    </div>
  );
}

function StatCard({ label, value, unit }) {
  return (
    <div style={{ border: `1px solid ${border}`, borderRadius: 8, padding: '14px 12px', textAlign: 'center' }}>
      <div style={{ fontFamily: mono, fontSize: 9, color: secondary, letterSpacing: 1, marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, color: '#FFF' }}>{value}</div>
      {unit && <div style={{ fontFamily: mono, fontSize: 10, color: secondary, marginTop: 2 }}>{unit}</div>}
    </div>
  );
}

function ActivityChart() {
  const w = 320, h = 120, px = 24, py = 12;
  const max = 100, min = 0;
  const barW = (w - 2 * px) / weeklyActivity.length - 6;

  return (
    <div style={{ border: `1px solid ${border}`, borderRadius: 8, padding: '14px 16px', marginBottom: 16 }}>
      <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, marginBottom: 8 }}>7-DAY ACTIVITY</div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
        {weeklyActivity.map((v, i) => {
          const x = px + i * ((w - 2 * px) / weeklyActivity.length) + 3;
          const barH = ((v - min) / (max - min)) * (h - 2 * py - 10);
          const y = h - py - barH;
          return (
            <g key={i}>
              <rect x={x} y={py} width={barW} height={h - 2 * py - 10} rx={3} fill={border} />
              <rect x={x} y={y} width={barW} height={barH} rx={3} fill={i === weeklyActivity.length - 1 ? accent : '#4A4A6A'} />
            </g>
          );
        })}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 9, color: secondary, marginTop: 4, padding: '0 8px' }}>
        {days.map((d) => <span key={d}>{d}</span>)}
      </div>
    </div>
  );
}

function WorkoutCard() {
  const { workout } = today;
  return (
    <div style={{ border: `1px solid ${border}`, borderRadius: 8, padding: '14px 16px', marginBottom: 16 }}>
      <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, marginBottom: 10 }}>WORKOUT LOG</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontFamily: sans, fontSize: 15, fontWeight: 600, color: '#FFF' }}>{workout.name}</span>
        <span style={{ fontFamily: mono, fontSize: 12, color: accent }}>{workout.setsComplete}/{workout.setsTotal}</span>
      </div>
      <div style={{ height: 4, background: border, borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(workout.setsComplete / workout.setsTotal) * 100}%`, background: accent, borderRadius: 2 }} />
      </div>
      <div style={{ fontFamily: mono, fontSize: 10, color: secondary, marginTop: 8 }}>
        STRAIN: {today.strain}
      </div>
    </div>
  );
}

export default function Activity({ navigate }) {
  const { activity } = today;

  return (
    <div style={{ padding: '16px 16px 24px' }}>
      <BackButton navigate={navigate} />
      <ScoreRing score={activity.score} />

      {/* Stat Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <StatCard label="STEPS" value={activity.steps.toLocaleString()} />
        <StatCard label="CALORIES" value={activity.calories} unit="kcal" />
        <StatCard label="ACTIVE MIN" value={activity.activeMinutes} unit="min" />
        <StatCard label="STAND HRS" value={activity.standHours} unit="/ 12" />
      </div>

      <WorkoutCard />
      <ActivityChart />

      {/* Streak */}
      <div style={{ border: `1px solid ${border}`, borderRadius: 8, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, marginBottom: 4 }}>CURRENT STREAK</div>
          <div style={{ fontFamily: sans, fontSize: 13, color: '#FFF' }}>Activity goal met</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: mono, fontSize: 32, fontWeight: 700, color: accent }}>12</span>
          <span style={{ fontFamily: mono, fontSize: 11, color: secondary }}>DAYS</span>
        </div>
      </div>
    </div>
  );
}

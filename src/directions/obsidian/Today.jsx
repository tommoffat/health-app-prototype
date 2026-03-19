import React from 'react';
import { today, user } from '../../data/fake';

const mono = '"SF Mono", "Fira Code", "Cascadia Code", monospace';
const sans = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const accent = '#7C6EFA';
const secondary = '#8888AA';
const border = '#1A1A2E';
const surface = '#0A0A0A';

function ScoreRing({ score, size = 80, strokeWidth = 3, label }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={border} strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={accent} strokeWidth={strokeWidth}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div style={{ marginTop: -size / 2 - 14, fontFamily: mono, fontSize: 22, fontWeight: 700, color: '#FFF', textAlign: 'center', height: size / 2 + 14, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        {score}
      </div>
      <div style={{ fontFamily: mono, fontSize: 9, color: secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
    </div>
  );
}

function ScorePill({ label, score, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      background: surface, border: `1px solid ${border}`, borderRadius: 8, padding: '14px 8px',
      cursor: 'pointer',
    }}>
      <span style={{ fontFamily: mono, fontSize: 9, color: secondary, letterSpacing: 1.5 }}>{label}</span>
      <span style={{ fontFamily: mono, fontSize: 26, fontWeight: 700, color: '#FFF' }}>{score}</span>
    </button>
  );
}

function Card({ title, children, style: extraStyle }) {
  return (
    <div style={{ background: 'transparent', border: `1px solid ${border}`, borderRadius: 8, padding: '14px 16px', ...extraStyle }}>
      {title && <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>{title}</div>}
      {children}
    </div>
  );
}

function DataRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${border}` }}>
      <span style={{ fontFamily: sans, fontSize: 13, color: secondary }}>{label}</span>
      <span style={{ fontFamily: mono, fontSize: 13, color: '#FFF', fontWeight: 500 }}>{value}</span>
    </div>
  );
}

export default function Today({ navigate }) {
  const { sleep, readiness, activity, supplements, upcoming, insights, workout, weight, strain } = today;

  return (
    <div style={{ padding: '16px 16px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: mono, fontSize: 11, color: secondary, letterSpacing: 1, marginBottom: 4 }}>{today.date.toUpperCase()}</div>
        <div style={{ fontFamily: sans, fontSize: 22, fontWeight: 700, color: '#FFF' }}>Good morning, {user.name}</div>
      </div>

      {/* Score Pills */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <ScorePill label="SLEEP" score={sleep.score} onClick={() => navigate('sleep')} />
        <ScorePill label="READINESS" score={readiness.score} onClick={() => navigate('vitals')} />
        <ScorePill label="ACTIVITY" score={activity.score} onClick={() => navigate('activity')} />
      </div>

      {/* Daily Snapshot */}
      <Card title="DAILY SNAPSHOT" style={{ marginBottom: 16 }}>
        <DataRow label="Total Sleep" value={sleep.total} />
        <DataRow label="Resting HR" value={`${readiness.restingHR} bpm`} />
        <DataRow label="HRV" value={`${readiness.hrv} ms`} />
        <DataRow label="Steps" value={activity.steps.toLocaleString()} />
        <DataRow label="Calories" value={`${activity.calories} kcal`} />
        <DataRow label="Strain" value={strain} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
          <span style={{ fontFamily: sans, fontSize: 13, color: secondary }}>Weight</span>
          <span style={{ fontFamily: mono, fontSize: 13, color: '#FFF', fontWeight: 500 }}>{weight} lbs</span>
        </div>
      </Card>

      {/* Quick Log */}
      <Card title="QUICK LOG" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Food', 'Water', 'Mood', 'Supplements'].map((cat) => (
            <button key={cat} onClick={() => navigate('log')} style={{
              flex: 1, padding: '10px 4px', background: surface, border: `1px solid ${border}`, borderRadius: 6,
              fontFamily: mono, fontSize: 10, color: accent, cursor: 'pointer', letterSpacing: 0.5,
            }}>{cat.toUpperCase()}</button>
          ))}
        </div>
      </Card>

      {/* Workout */}
      <Card title="ACTIVE WORKOUT" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: sans, fontSize: 14, color: '#FFF' }}>{workout.name}</span>
          <span style={{ fontFamily: mono, fontSize: 13, color: accent }}>{workout.setsComplete}/{workout.setsTotal} sets</span>
        </div>
        <div style={{ marginTop: 8, height: 4, background: border, borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(workout.setsComplete / workout.setsTotal) * 100}%`, background: accent, borderRadius: 2 }} />
        </div>
      </Card>

      {/* Supplements */}
      <Card title="SUPPLEMENTS" style={{ marginBottom: 16 }}>
        {supplements.map((s, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < supplements.length - 1 ? `1px solid ${border}` : 'none' }}>
            <span style={{ fontFamily: sans, fontSize: 13, color: s.done ? secondary : '#FFF' }}>{s.name}</span>
            <span style={{ fontFamily: mono, fontSize: 11, color: s.done ? '#4ADE80' : secondary }}>{s.done ? 'DONE' : 'PENDING'}</span>
          </div>
        ))}
      </Card>

      {/* Insights */}
      <Card title="INSIGHTS" style={{ marginBottom: 16 }}>
        {insights.map((ins, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderBottom: i < insights.length - 1 ? `1px solid ${border}` : 'none' }}>
            <span style={{ fontFamily: mono, fontSize: 11, color: accent, marginTop: 1 }}>{'>'}</span>
            <span style={{ fontFamily: sans, fontSize: 13, color: '#FFF', lineHeight: 1.4 }}>{ins}</span>
          </div>
        ))}
      </Card>

      {/* Upcoming */}
      <Card title="UPCOMING">
        {upcoming.map((ev, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '8px 0', borderBottom: i < upcoming.length - 1 ? `1px solid ${border}` : 'none' }}>
            <span style={{ fontFamily: mono, fontSize: 12, color: accent, minWidth: 68 }}>{ev.time}</span>
            <span style={{ fontFamily: sans, fontSize: 13, color: '#FFF' }}>{ev.label}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

import React from 'react';
import { today, weeklyHRV, weeklyActivity, weeklySleep } from '../../data/fake';

const c = {
  bg: '#0F1218', surface: '#181E28', surfaceAlt: '#1E2535',
  amber: '#E8A04B', coral: '#FF8C42', text: '#F0F4F8', muted: '#8899AA',
  purple: '#B18CFF', blue: '#4EA8FF', green: '#4ADE80', red: '#FF6B6B',
};

function Ring({ score, size = 48, color, strokeWidth = 4 }) {
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
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central"
        fill={c.text} style={{ fontSize: size * 0.32, fontWeight: 700, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
        {score}
      </text>
    </svg>
  );
}

function MiniSparkline({ data, color, width = 80, height = 28 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) =>
    `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 4) - 2}`
  ).join(' ');
  return (
    <svg width={width} height={height}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Today({ onNavigate }) {
  const pills = [
    { label: 'Strain', score: Math.round(today.strain / 21 * 100), color: c.coral, nav: 'activity' },
    { label: 'Recovery', score: today.readiness.score, color: c.green, nav: 'biometrics' },
    { label: 'Sleep', score: today.sleep.score, color: c.purple, nav: 'sleep' },
  ];

  const metrics = [
    { label: 'Steps', value: today.activity.steps.toLocaleString(), sub: 'of 10,000', color: c.blue },
    { label: 'Calories', value: today.activity.calories, sub: 'burned', color: c.coral },
    { label: 'HRV', value: `${today.readiness.hrv} ms`, sub: 'resting', color: c.green },
    { label: 'Resting HR', value: `${today.readiness.restingHR} bpm`, sub: 'avg', color: c.amber },
    { label: 'Weight', value: `${today.weight} lbs`, sub: 'today', color: c.muted },
    { label: 'SpO2', value: `${today.readiness.spo2}%`, sub: 'blood oxygen', color: c.blue },
  ];

  const pillStyle = {
    flex: '1 1 0', background: c.surface, borderRadius: 16, padding: '16px 14px',
    display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
    border: '1px solid rgba(255,255,255,0.04)', transition: 'transform 0.15s',
  };

  const metricCardStyle = {
    background: c.surface, borderRadius: 14, padding: '14px 16px',
    border: '1px solid rgba(255,255,255,0.04)',
  };

  return (
    <div style={{ padding: '0 16px 24px' }}>
      {/* Date header */}
      <div style={{ padding: '20px 0 4px', color: c.muted, fontSize: 13, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
        {today.date}
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif', marginBottom: 20 }}>
        Today
      </div>

      {/* 3 Pill Cards with Rings */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {pills.map(p => (
          <div key={p.label} style={pillStyle}
            onClick={() => onNavigate && onNavigate(p.nav)}>
            <Ring score={p.score} size={48} color={p.color} strokeWidth={4} />
            <div>
              <div style={{ fontSize: 11, color: c.muted, fontFamily: 'SF Pro Text, -apple-system, sans-serif', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {p.label}
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
                {p.score}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Metric Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
        {metrics.map(m => (
          <div key={m.label} style={metricCardStyle}>
            <div style={{ fontSize: 11, color: c.muted, fontFamily: 'SF Pro Text, -apple-system, sans-serif', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 6 }}>
              {m.label}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
              {m.value}
            </div>
            <div style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Workout Card */}
      {today.workout && (
        <div style={{ background: c.surface, borderRadius: 16, padding: 18, marginBottom: 16, border: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.text, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
              Active Workout
            </div>
            <div style={{ fontSize: 11, color: c.amber, fontWeight: 600 }}>IN PROGRESS</div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif', marginBottom: 8 }}>
            {today.workout.name}
          </div>
          <div style={{ background: 'rgba(232,160,75,0.1)', borderRadius: 8, height: 6, overflow: 'hidden' }}>
            <div style={{ width: `${(today.workout.setsComplete / today.workout.setsTotal) * 100}%`, height: '100%', background: `linear-gradient(90deg, ${c.amber}, ${c.coral})`, borderRadius: 8 }} />
          </div>
          <div style={{ fontSize: 12, color: c.muted, marginTop: 6 }}>
            {today.workout.setsComplete}/{today.workout.setsTotal} sets complete
          </div>
        </div>
      )}

      {/* Supplements */}
      <div style={{ background: c.surface, borderRadius: 16, padding: 18, marginBottom: 16, border: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.text, fontFamily: 'SF Pro Text, -apple-system, sans-serif', marginBottom: 12 }}>
          Supplements
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {today.supplements.map(s => (
            <div key={s.name} style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500,
              background: s.done ? 'rgba(232,160,75,0.15)' : 'rgba(255,255,255,0.04)',
              color: s.done ? c.amber : c.muted,
              border: `1px solid ${s.done ? 'rgba(232,160,75,0.25)' : 'rgba(255,255,255,0.06)'}`,
              fontFamily: 'SF Pro Text, -apple-system, sans-serif',
            }}>
              {s.done ? '\u2713 ' : ''}{s.name}
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div style={{ background: c.surface, borderRadius: 16, padding: 18, marginBottom: 16, border: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.text, fontFamily: 'SF Pro Text, -apple-system, sans-serif', marginBottom: 12 }}>
          Insights
        </div>
        {today.insights.map((ins, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0',
            borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: c.amber, marginTop: 6, flexShrink: 0 }} />
            <div style={{ fontSize: 13, color: c.text, lineHeight: 1.45, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
              {ins}
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      <div style={{ background: c.surface, borderRadius: 16, padding: 18, border: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.text, fontFamily: 'SF Pro Text, -apple-system, sans-serif', marginBottom: 12 }}>
          Upcoming
        </div>
        {today.upcoming.map((ev, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
            borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <div style={{
              background: 'rgba(232,160,75,0.1)', borderRadius: 10, padding: '8px 12px',
              fontSize: 12, fontWeight: 600, color: c.amber, fontFamily: 'SF Pro Display, -apple-system, sans-serif',
              whiteSpace: 'nowrap',
            }}>
              {ev.time}
            </div>
            <div style={{ fontSize: 13, color: c.text, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
              {ev.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

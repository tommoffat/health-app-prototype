import React from 'react';
import { today, weeklyActivity } from '../../data/fake';

const c = {
  bg: '#0F1218', surface: '#181E28', surfaceAlt: '#1E2535',
  amber: '#E8A04B', coral: '#FF8C42', text: '#F0F4F8', muted: '#8899AA',
  blue: '#4EA8FF', green: '#4ADE80', red: '#FF6B6B',
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
        Activity
      </text>
    </svg>
  );
}

export default function Activity({ onBack }) {
  const a = today.activity;

  const metricCards = [
    { label: 'Steps', value: a.steps.toLocaleString(), target: '10,000', pct: a.steps / 10000, color: c.blue },
    { label: 'Calories', value: a.calories, target: '600', pct: a.calories / 600, color: c.coral },
    { label: 'Active Min', value: a.activeMinutes, target: '45', pct: a.activeMinutes / 45, color: c.green },
    { label: 'Stand Hrs', value: a.standHours, target: '12', pct: a.standHours / 12, color: c.amber },
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
          Activity
        </div>
      </div>

      {/* Score Ring Card */}
      <div style={{
        ...cardStyle, display: 'flex', flexDirection: 'column', alignItems: 'center',
        background: 'linear-gradient(135deg, #141E2E 0%, #181E28 100%)', padding: '28px 18px',
      }}>
        <Ring score={a.score} size={130} color={c.blue} strokeWidth={9} />
        <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>{a.steps.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: c.muted }}>Steps</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>{a.calories}</div>
            <div style={{ fontSize: 11, color: c.muted }}>Cal</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>{a.activeMinutes}m</div>
            <div style={{ fontSize: 11, color: c.muted }}>Active</div>
          </div>
        </div>
      </div>

      {/* Metric Cards with Progress */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        {metricCards.map(m => (
          <div key={m.label} style={{
            background: c.surface, borderRadius: 14, padding: 16,
            border: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div style={{ fontSize: 11, color: c.muted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
              {m.label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
              {m.value}
            </div>
            <div style={{ fontSize: 11, color: c.muted, marginBottom: 8 }}>of {m.target}</div>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
              <div style={{
                width: `${Math.min(m.pct * 100, 100)}%`, height: '100%',
                background: m.color, borderRadius: 4,
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Workout */}
      {today.workout && (
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.text, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
              Current Workout
            </div>
            <div style={{
              fontSize: 10, fontWeight: 600, color: c.amber, background: 'rgba(232,160,75,0.12)',
              padding: '4px 10px', borderRadius: 12,
            }}>ACTIVE</div>
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif', marginBottom: 10 }}>
            {today.workout.name}
          </div>
          <div style={{ background: 'rgba(78,168,255,0.1)', borderRadius: 6, height: 8, overflow: 'hidden' }}>
            <div style={{
              width: `${(today.workout.setsComplete / today.workout.setsTotal) * 100}%`, height: '100%',
              background: `linear-gradient(90deg, ${c.blue}, ${c.green})`, borderRadius: 6,
            }} />
          </div>
          <div style={{ fontSize: 12, color: c.muted, marginTop: 6 }}>
            {today.workout.setsComplete}/{today.workout.setsTotal} sets
          </div>
        </div>
      )}

      {/* 7-Day Chart */}
      <div style={cardStyle}>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 14, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
          7-Day Activity Score
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 90 }}>
          {weeklyActivity.map((v, i) => {
            const min = Math.min(...weeklyActivity);
            const max = Math.max(...weeklyActivity);
            const h = ((v - min + 5) / (max - min + 10)) * 70 + 10;
            const isToday = i === weeklyActivity.length - 1;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ fontSize: 10, color: isToday ? c.blue : c.muted, fontWeight: isToday ? 700 : 400, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>{v}</div>
                <div style={{
                  width: '100%', height: h, borderRadius: 6,
                  background: isToday ? c.blue : 'rgba(255,255,255,0.06)',
                }} />
                <div style={{ fontSize: 10, color: isToday ? c.blue : c.muted, fontWeight: isToday ? 600 : 400 }}>{days[i]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Streak */}
      <div style={{
        ...cardStyle, display: 'flex', alignItems: 'center', gap: 16,
        background: 'linear-gradient(135deg, rgba(78,168,255,0.08) 0%, #181E28 100%)',
      }}>
        <div style={{ fontSize: 36, fontWeight: 800, color: c.blue, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
          12
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: c.text, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
            Day Streak
          </div>
          <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>
            Keep moving to extend your streak!
          </div>
        </div>
      </div>
    </div>
  );
}

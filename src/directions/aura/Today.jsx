import React from 'react';
import { user, today } from '../../data/fake';

const ScoreRing = ({ score, size = 120, strokeWidth = 8, label }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="url(#goldGrad)" strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={circumference - progress}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A96E" />
            <stop offset="100%" stopColor="#E8D5A8" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: 'absolute',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        width: size, height: size,
      }}>
        <span style={{ fontSize: size * 0.32, fontWeight: '600', color: '#C9A96E', lineHeight: 1 }}>{score}</span>
        {label && <span style={{ fontSize: 11, color: '#8B949E', marginTop: 2, fontWeight: '500' }}>{label}</span>}
      </div>
    </div>
  );
};

const GlassCard = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 20,
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  }}>
    {children}
  </div>
);

const Sparkline = ({ data, width = 100, height = 32, color = '#C9A96E' }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) =>
    `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 4) - 2}`
  ).join(' ');
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default function Today({ navigate }) {
  return (
    <div style={styles.screen}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={{ fontSize: 13, color: '#8B949E', fontWeight: '500', letterSpacing: 0.5 }}>{today.date}</div>
          <div style={{ fontSize: 26, fontWeight: '600', marginTop: 4, letterSpacing: -0.3 }}>Good morning, {user.name}</div>
        </div>
        <div onClick={() => navigate('profile')} style={styles.avatar}>
          {user.initials}
        </div>
      </div>

      {/* Main Score Ring */}
      <GlassCard style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 28 }}>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <ScoreRing score={today.readiness.score} size={140} strokeWidth={10} label="Readiness" />
        </div>
        <div style={{ display: 'flex', gap: 32, marginTop: 20 }}>
          {[
            { label: 'Sleep', score: today.sleep.score },
            { label: 'Activity', score: today.activity.score },
            { label: 'Strain', score: today.strain, isRaw: true },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: '600', color: '#E6EDF3' }}>
                {item.isRaw ? item.score : item.score}
              </div>
              <div style={{ fontSize: 11, color: '#8B949E', marginTop: 2, fontWeight: '500' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Score Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <GlassCard onClick={() => navigate('sleep')} style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8 }}>Sleep</div>
              <div style={{ fontSize: 28, fontWeight: '600', color: '#C9A96E', marginTop: 4 }}>{today.sleep.score}</div>
              <div style={{ fontSize: 12, color: '#8B949E', marginTop: 2 }}>{today.sleep.total}</div>
            </div>
            <Sparkline data={[79, 83, 91, 85, 88, 87, 87]} width={60} height={28} />
          </div>
        </GlassCard>
        <GlassCard onClick={() => navigate('activity')} style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8 }}>Activity</div>
              <div style={{ fontSize: 28, fontWeight: '600', color: '#C9A96E', marginTop: 4 }}>{today.activity.score}</div>
              <div style={{ fontSize: 12, color: '#8B949E', marginTop: 2 }}>{today.activity.steps.toLocaleString()} steps</div>
            </div>
            <Sparkline data={[65, 72, 80, 68, 74, 71, 71]} width={60} height={28} />
          </div>
        </GlassCard>
      </div>

      {/* Workout */}
      <GlassCard>
        <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>Current Workout</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: '600' }}>{today.workout.name}</div>
            <div style={{ fontSize: 13, color: '#8B949E', marginTop: 4 }}>
              {today.workout.setsComplete} of {today.workout.setsTotal} sets complete
            </div>
          </div>
          <div style={styles.progressBar}>
            <div style={{
              ...styles.progressFill,
              width: `${(today.workout.setsComplete / today.workout.setsTotal) * 100}%`,
            }} />
          </div>
        </div>
      </GlassCard>

      {/* Supplements */}
      <GlassCard>
        <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>Supplements</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {today.supplements.map((s) => (
            <div key={s.name} style={{
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: '500',
              background: s.done ? 'rgba(201,169,110,0.15)' : 'rgba(255,255,255,0.04)',
              color: s.done ? '#C9A96E' : '#8B949E',
              border: `1px solid ${s.done ? 'rgba(201,169,110,0.3)' : 'rgba(255,255,255,0.06)'}`,
              textDecoration: s.done ? 'line-through' : 'none',
            }}>
              {s.name}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Insights */}
      <GlassCard>
        <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>Insights</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {today.insights.map((insight, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{
                width: 6, height: 6, borderRadius: 3, marginTop: 6, flexShrink: 0,
                background: 'linear-gradient(135deg, #C9A96E, #E8D5A8)',
              }} />
              <div style={{ fontSize: 14, color: '#E6EDF3', lineHeight: 1.5, fontWeight: '400' }}>{insight}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Upcoming */}
      <GlassCard>
        <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>Upcoming</div>
        {today.upcoming.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 0',
            borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <div style={{ fontSize: 13, color: '#C9A96E', fontWeight: '600', minWidth: 72 }}>{item.time}</div>
            <div style={{ fontSize: 14, color: '#E6EDF3', fontWeight: '400' }}>{item.label}</div>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}

const styles = {
  screen: {
    padding: '56px 20px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    background: 'linear-gradient(135deg, #C9A96E, #E8D5A8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: '#0D1117',
    cursor: 'pointer',
    letterSpacing: 0.5,
  },
  progressBar: {
    width: 60,
    height: 6,
    borderRadius: 3,
    background: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    background: 'linear-gradient(90deg, #C9A96E, #E8D5A8)',
  },
};

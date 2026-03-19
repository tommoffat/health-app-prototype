import React from 'react';
import { today, weeklyHRV, weeklySleep } from '../../data/fake';

const GlassCard = ({ children, style = {} }) => (
  <div style={{
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 20,
    ...style,
  }}>
    {children}
  </div>
);

const BackButton = ({ onClick }) => (
  <button onClick={onClick} style={{
    background: 'none', border: 'none', color: '#C9A96E', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 6, padding: 0, fontFamily: 'inherit',
    fontSize: 14, fontWeight: '500',
  }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
    Today
  </button>
);

const ScoreRing = ({ score, size = 120, strokeWidth = 8, label }) => {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const p = (score / 100) * c;
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#sleepGold)" strokeWidth={strokeWidth}
          strokeDasharray={c} strokeDashoffset={c - p} strokeLinecap="round" />
        <defs>
          <linearGradient id="sleepGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A96E" /><stop offset="100%" stopColor="#E8D5A8" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        <div style={{ fontSize: size * 0.3, fontWeight: '600', color: '#C9A96E', lineHeight: 1 }}>{score}</div>
        {label && <div style={{ fontSize: 11, color: '#8B949E', marginTop: 3, fontWeight: '500' }}>{label}</div>}
      </div>
    </div>
  );
};

const SleepStagesChart = () => {
  const stages = [
    { label: 'Deep', value: today.sleep.deep, color: '#C9A96E', pct: 24 },
    { label: 'REM', value: today.sleep.rem, color: '#E8D5A8', pct: 27 },
    { label: 'Light', value: today.sleep.light, color: 'rgba(201,169,110,0.4)', pct: 43 },
    { label: 'Awake', value: today.sleep.awake, color: 'rgba(255,255,255,0.15)', pct: 6 },
  ];
  return (
    <div>
      <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', height: 14, marginBottom: 14 }}>
        {stages.map((s) => (
          <div key={s.label} style={{ width: `${s.pct}%`, background: s.color, marginRight: 1 }} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {stages.map((s) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: s.color }} />
            <span style={{ fontSize: 13, color: '#8B949E', fontWeight: '400' }}>{s.label}</span>
            <span style={{ fontSize: 13, color: '#E6EDF3', fontWeight: '500', marginLeft: 'auto' }}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const WeeklyChart = ({ data, label, suffix = '' }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const w = 280;
  const h = 80;
  const points = data.map((v, i) =>
    `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 10) - 5}`
  ).join(' ');
  return (
    <div>
      <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>{label}</div>
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <polyline points={points} fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((v, i) => (
          <circle key={i} cx={(i / (data.length - 1)) * w} cy={h - ((v - min) / range) * (h - 10) - 5}
            r="3" fill={i === data.length - 1 ? '#C9A96E' : 'rgba(201,169,110,0.4)'} />
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        {days.map((d, i) => (
          <span key={i} style={{ fontSize: 10, color: '#8B949E', fontWeight: '500', width: 20, textAlign: 'center' }}>{d}</span>
        ))}
      </div>
    </div>
  );
};

export default function Sleep({ navigate }) {
  const { sleep } = today;
  return (
    <div style={{ padding: '56px 20px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <BackButton onClick={() => navigate('today')} />
      <div style={{ fontSize: 24, fontWeight: '600', letterSpacing: -0.3 }}>Sleep</div>

      {/* Score */}
      <GlassCard style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 28 }}>
        <ScoreRing score={sleep.score} size={140} strokeWidth={10} label="Sleep Score" />
        <div style={{ fontSize: 14, color: '#8B949E', marginTop: 16, fontWeight: '400' }}>{sleep.total} total sleep</div>
      </GlassCard>

      {/* Stages */}
      <GlassCard>
        <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 14 }}>Sleep Stages</div>
        <SleepStagesChart />
      </GlassCard>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          { label: 'Efficiency', value: `${sleep.efficiency}%` },
          { label: 'Latency', value: `${sleep.latency} min` },
          { label: 'Resting HR', value: `${sleep.restingHR} bpm` },
          { label: 'HRV', value: `${sleep.hrv} ms` },
        ].map((stat) => (
          <GlassCard key={stat.label} style={{ padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: '600', color: '#C9A96E' }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: '#8B949E', marginTop: 4, fontWeight: '500' }}>{stat.label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Weekly trends */}
      <GlassCard><WeeklyChart data={weeklySleep} label="7-Day Sleep Score" /></GlassCard>
      <GlassCard><WeeklyChart data={weeklyHRV} label="7-Day HRV" suffix=" ms" /></GlassCard>

      {/* Recommendations */}
      <GlassCard>
        <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>Recommendations</div>
        {[
          'Optimal bedtime tonight: 10:30 PM',
          'Consider reducing screen time 1hr before bed',
          'Your deep sleep is above average this week',
        ].map((r, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            padding: '8px 0',
            borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, marginTop: 6, flexShrink: 0, background: 'linear-gradient(135deg, #C9A96E, #E8D5A8)' }} />
            <span style={{ fontSize: 14, color: '#E6EDF3', lineHeight: 1.5, fontWeight: '400' }}>{r}</span>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}

import React from 'react';
import { today, weeklyActivity } from '../../data/fake';

const GlassCard = ({ children, style = {} }) => (
  <div style={{
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 20,
    ...style,
  }}>{children}</div>
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

const BarChart = ({ data }) => {
  const max = Math.max(...data);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 100 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: '100%',
            height: `${(v / max) * 80}px`,
            borderRadius: 6,
            background: i === data.length - 1
              ? 'linear-gradient(180deg, #C9A96E, #E8D5A8)'
              : 'rgba(201,169,110,0.25)',
            transition: 'height 0.3s',
          }} />
          <span style={{ fontSize: 10, color: '#8B949E', fontWeight: '500' }}>{days[i]}</span>
        </div>
      ))}
    </div>
  );
};

export default function Activity({ navigate }) {
  const { activity, workout, strain } = today;
  const streak = 12;

  return (
    <div style={{ padding: '56px 20px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <BackButton onClick={() => navigate('today')} />
      <div style={{ fontSize: 24, fontWeight: '600', letterSpacing: -0.3 }}>Activity</div>

      {/* Score + Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          { label: 'Steps', value: activity.steps.toLocaleString(), sub: 'of 10,000 goal' },
          { label: 'Calories', value: activity.calories, sub: 'active kcal' },
          { label: 'Active Min', value: activity.activeMinutes, sub: 'minutes' },
          { label: 'Stand Hours', value: activity.standHours, sub: 'of 12 goal' },
        ].map((item) => (
          <GlassCard key={item.label} style={{ padding: 16 }}>
            <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8 }}>{item.label}</div>
            <div style={{ fontSize: 26, fontWeight: '600', color: '#C9A96E', marginTop: 6 }}>{item.value}</div>
            <div style={{ fontSize: 12, color: '#8B949E', marginTop: 2 }}>{item.sub}</div>
          </GlassCard>
        ))}
      </div>

      {/* Strain */}
      <GlassCard>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8 }}>Strain</div>
            <div style={{ fontSize: 32, fontWeight: '600', color: '#C9A96E', marginTop: 4 }}>{strain}</div>
            <div style={{ fontSize: 12, color: '#8B949E', marginTop: 2 }}>of 21.0 max</div>
          </div>
          <div style={{ width: 100, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(strain / 21) * 100}%`, borderRadius: 3, background: 'linear-gradient(90deg, #C9A96E, #E8D5A8)' }} />
          </div>
        </div>
      </GlassCard>

      {/* Workout */}
      <GlassCard>
        <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>Today's Workout</div>
        <div style={{ fontSize: 17, fontWeight: '600', color: '#E6EDF3' }}>{workout.name}</div>
        <div style={{ fontSize: 13, color: '#8B949E', marginTop: 4 }}>{workout.setsComplete}/{workout.setsTotal} sets complete</div>
        <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', marginTop: 12, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(workout.setsComplete / workout.setsTotal) * 100}%`, borderRadius: 3, background: 'linear-gradient(90deg, #C9A96E, #E8D5A8)' }} />
        </div>
      </GlassCard>

      {/* 7-Day Chart */}
      <GlassCard>
        <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 14 }}>7-Day Activity Score</div>
        <BarChart data={weeklyActivity} />
      </GlassCard>

      {/* Streak */}
      <GlassCard style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 18 }}>
        <div style={{
          width: 50, height: 50, borderRadius: 25,
          background: 'linear-gradient(135deg, rgba(201,169,110,0.2), rgba(232,213,168,0.1))',
          border: '2px solid rgba(201,169,110,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, fontWeight: '700', color: '#C9A96E',
        }}>
          {streak}
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: '600', color: '#E6EDF3' }}>Day Streak</div>
          <div style={{ fontSize: 13, color: '#8B949E', marginTop: 2 }}>Keep the momentum going</div>
        </div>
      </GlassCard>
    </div>
  );
}

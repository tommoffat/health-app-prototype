import React from 'react';
import { today, weeklyActivity } from '../../data/fake';

const BackArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default function ActivityScreen({ onBack }) {
  const strainPct = Math.round(today.strain / 21 * 100);
  const r = 44;
  const stroke = 9;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - strainPct / 100);
  const ringSize = 100;

  const stats = [
    { label: 'Steps', value: today.activity.steps.toLocaleString(), icon: '\uD83D\uDC5F' },
    { label: 'Calories', value: `${today.activity.calories}`, icon: '\uD83D\uDD25' },
    { label: 'Active Min', value: `${today.activity.activeMinutes}`, icon: '\u23F1' },
    { label: 'Stand Hours', value: `${today.activity.standHours}`, icon: '\uD83E\uDDCD' },
  ];

  const maxAct = Math.max(...weeklyActivity);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div style={styles.container}>
      {/* Gradient Header */}
      <div style={styles.gradientHeader}>
        {onBack && (
          <button style={styles.backBtn} onClick={onBack}>
            <BackArrow />
            <span style={{ fontSize: 16, color: '#1A1A1A', fontWeight: 500 }}>Back</span>
          </button>
        )}
        <div style={styles.headerTitle}>Activity</div>

        <div style={styles.frostedCard}>
          <svg width={ringSize} height={ringSize} viewBox={`0 0 ${ringSize} ${ringSize}`}>
            <circle cx={ringSize / 2} cy={ringSize / 2} r={r} fill="none" stroke="rgba(255,140,66,0.15)" strokeWidth={stroke} />
            <circle cx={ringSize / 2} cy={ringSize / 2} r={r} fill="none" stroke="#FF8C42" strokeWidth={stroke}
              strokeDasharray={circ} strokeDashoffset={offset}
              strokeLinecap="round" transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`} />
            <text x={ringSize / 2} y={ringSize / 2 - 4} textAnchor="middle" dominantBaseline="central"
              style={{ fontSize: 24, fontWeight: 700, fill: '#1A1A1A', fontFamily: "-apple-system, sans-serif" }}>
              {today.strain}
            </text>
            <text x={ringSize / 2} y={ringSize / 2 + 16} textAnchor="middle"
              style={{ fontSize: 10, fill: '#8E8E93', fontFamily: "-apple-system, sans-serif" }}>
              / 21
            </text>
          </svg>
          <div style={{ marginTop: 8, fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>Strain Score</div>
          <div style={{ fontSize: 13, color: '#8E8E93', marginTop: 2 }}>{strainPct}% of max</div>
        </div>
      </div>

      <div style={styles.body}>
        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          {stats.map((s, i) => (
            <div key={i} style={styles.statCard}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#8E8E93', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Weekly Chart */}
        <div style={styles.card}>
          <div style={styles.cardLabel}>WEEKLY ACTIVITY</div>
          <div style={styles.barChart}>
            {weeklyActivity.map((v, i) => (
              <div key={i} style={styles.barCol}>
                <div style={styles.barTrack}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${(v / maxAct) * 100}%`, background: i === 6 ? '#FF8C42' : 'rgba(255,140,66,0.4)', borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 10, color: '#8E8E93', marginTop: 4 }}>{days[i]}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#1A1A1A' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workout Card */}
        <div style={styles.card}>
          <div style={styles.cardLabel}>TODAY'S WORKOUT</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', marginBottom: 10 }}>{today.workout.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ flex: 1, height: 8, background: '#E5E5EA', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: 8, borderRadius: 4, background: '#FF8C42', width: `${(today.workout.setsComplete / today.workout.setsTotal) * 100}%` }} />
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{today.workout.setsComplete}/{today.workout.setsTotal}</span>
          </div>
          <div style={{ fontSize: 13, color: '#8E8E93' }}>sets complete</div>
        </div>

        {/* Activity Streak */}
        <div style={{ ...styles.card, marginBottom: 24 }}>
          <div style={styles.cardLabel}>STREAK</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#FF8C42' }}>7</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>Day Activity Streak</div>
              <div style={{ fontSize: 13, color: '#8E8E93', marginTop: 2 }}>Keep it going! You're on fire.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100%',
    background: '#F8F8F8',
  },
  gradientHeader: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5a623 100%)',
    padding: '12px 16px 0 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 40,
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    position: 'absolute',
    left: 12,
    top: 14,
    WebkitTapHighlightColor: 'transparent',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 600,
    color: '#1A1A1A',
    marginBottom: 20,
  },
  frostedCard: {
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: 24,
    padding: '24px 36px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  },
  body: {
    padding: '16px 16px 0 16px',
    marginTop: -16,
  },
  card: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#8E8E93',
    letterSpacing: 1,
    marginBottom: 12,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
    marginBottom: 12,
  },
  statCard: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    textAlign: 'center',
  },
  barChart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    gap: 6,
  },
  barCol: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  barTrack: {
    flex: 1,
    width: '60%',
    position: 'relative',
    borderRadius: 4,
    background: '#F0F0F0',
  },
};

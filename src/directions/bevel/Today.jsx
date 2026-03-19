import React from 'react';
import { user, today } from '../../data/fake';

const RingGauge = ({ size = 70, stroke = 7, value, max, color, label, onClick }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const offset = circ * (1 - pct);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E5EA" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} />
        <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central"
          style={{ fontSize: 18, fontWeight: 700, fill: '#1A1A1A', fontFamily: "-apple-system, 'SF Pro Display', sans-serif" }}>
          {Math.round(value)}%
        </text>
      </svg>
      <span style={{ fontSize: 12, color: '#8E8E93', marginTop: 6, fontWeight: 500 }}>{label}</span>
    </div>
  );
};

export default function TodayScreen({ onNavigate }) {
  const strainPct = Math.round(today.strain / 21 * 100);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.dateText}>Today, March 19</div>
        </div>
        <div style={styles.avatar} onClick={() => onNavigate('profile')}>
          <span style={styles.avatarText}>{user.initials}</span>
        </div>
      </div>

      {/* Score Card */}
      <div style={styles.scoreCard}>
        <div style={styles.rings}>
          <RingGauge size={80} stroke={8} value={strainPct} max={100} color="#FF8C42" label="Strain" onClick={() => onNavigate('activity')} />
          <RingGauge size={80} stroke={8} value={today.readiness.score} max={100} color="#34C759" label="Recovery" onClick={() => onNavigate('biometrics')} />
          <RingGauge size={80} stroke={8} value={today.sleep.score} max={100} color="#5856D6" label="Sleep" onClick={() => onNavigate('sleep')} />
        </div>
      </div>

      {/* Coaching Card */}
      <div style={styles.card}>
        <div style={styles.cardLabel}>COACHING</div>
        <div style={styles.coachText}>Your recovery is great. You can handle moderate training today.</div>
      </div>

      {/* Stress & Energy Row */}
      <div style={styles.stressRow}>
        <div style={styles.stressItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF3B30" stroke="none">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span style={styles.stressValue}>{today.readiness.restingHR}</span>
          <span style={styles.stressUnit}>bpm</span>
        </div>
        <div style={{ flex: 1, marginLeft: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF8C42" stroke="none">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span style={{ fontSize: 12, color: '#8E8E93', fontWeight: 500 }}>Energy</span>
          </div>
          <div style={styles.energyTrack}>
            <div style={{ ...styles.energyBar, width: `${today.readiness.score}%` }} />
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div style={styles.metricGrid}>
        {[
          { label: 'RHR', value: today.readiness.restingHR, unit: 'bpm', color: '#FF3B30' },
          { label: 'HRV', value: today.readiness.hrv, unit: 'ms', color: '#34C759' },
          { label: 'SpO2', value: today.readiness.spo2, unit: '%', color: '#5856D6' },
          { label: 'Steps', value: today.activity.steps.toLocaleString(), unit: '', color: '#FF8C42' },
          { label: 'Calories', value: today.activity.calories, unit: 'kcal', color: '#FF8C42' },
          { label: 'Active Min', value: today.activity.activeMinutes, unit: 'min', color: '#FF8C42' },
        ].map((m, i) => (
          <div key={i} style={styles.metricCard}>
            <div style={{ fontSize: 11, color: '#8E8E93', fontWeight: 500, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>{m.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A' }}>{m.value}</span>
              {m.unit && <span style={{ fontSize: 12, color: '#8E8E93' }}>{m.unit}</span>}
            </div>
            <div style={{ width: '100%', height: 3, background: '#E5E5EA', borderRadius: 2, marginTop: 8 }}>
              <div style={{ height: 3, borderRadius: 2, background: m.color, width: `${60 + Math.random() * 30}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Workout Card */}
      <div style={styles.card}>
        <div style={styles.cardLabel}>WORKOUT</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }}>{today.workout.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressBar, width: `${(today.workout.setsComplete / today.workout.setsTotal) * 100}%` }} />
          </div>
          <span style={{ fontSize: 13, color: '#8E8E93', whiteSpace: 'nowrap' }}>
            {today.workout.setsComplete}/{today.workout.setsTotal} sets
          </span>
        </div>
      </div>

      {/* Insights */}
      <div style={styles.card}>
        <div style={styles.cardLabel}>INSIGHTS</div>
        {today.insights.map((ins, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: i < today.insights.length - 1 ? 12 : 0 }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: '#34C759', marginTop: 6, flexShrink: 0 }} />
            <span style={{ fontSize: 14, color: '#1A1A1A', lineHeight: 1.4 }}>{ins}</span>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      <div style={{ ...styles.card, marginBottom: 24 }}>
        <div style={styles.cardLabel}>UPCOMING</div>
        {today.upcoming.map((ev, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < today.upcoming.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
            <span style={{ fontSize: 14, color: '#1A1A1A' }}>{ev.label}</span>
            <span style={{ fontSize: 13, color: '#8E8E93' }}>{ev.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '16px 16px 0 16px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 8,
  },
  dateText: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    background: '#1A1A1A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: 600,
    color: '#FFFFFF',
  },
  scoreCard: {
    background: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    marginBottom: 12,
  },
  rings: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    marginBottom: 10,
  },
  coachText: {
    fontSize: 15,
    color: '#1A1A1A',
    lineHeight: 1.5,
  },
  stressRow: {
    display: 'flex',
    alignItems: 'center',
    background: '#FFFFFF',
    borderRadius: 16,
    padding: '14px 18px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    marginBottom: 12,
  },
  stressItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  stressValue: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1A1A1A',
  },
  stressUnit: {
    fontSize: 12,
    color: '#8E8E93',
  },
  energyTrack: {
    height: 6,
    background: '#E5E5EA',
    borderRadius: 3,
    marginTop: 6,
    overflow: 'hidden',
  },
  energyBar: {
    height: 6,
    background: 'linear-gradient(90deg, #FF8C42, #34C759)',
    borderRadius: 3,
  },
  metricGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 10,
    marginBottom: 12,
  },
  metricCard: {
    background: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  progressTrack: {
    flex: 1,
    height: 6,
    background: '#E5E5EA',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: 6,
    background: '#FF8C42',
    borderRadius: 3,
  },
};

import React from 'react';
import { today, user } from '../../data/fake';

const qualityLabel = (score) => {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Very Good';
  if (score >= 70) return 'Good';
  if (score >= 60) return 'Fair';
  return 'Needs Attention';
};

function OrganicArc({ score, size = 80 }) {
  const r = (size - 8) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const pct = (score / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(184,164,138,0.12)" strokeWidth={4} />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="#D4845A" strokeWidth={4}
        strokeDasharray={`${pct} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="central"
        style={{ fontFamily: 'Georgia, serif', fontSize: size * 0.28, fill: '#F5EDD8' }}>
        {score}
      </text>
    </svg>
  );
}

export default function Today({ navigate }) {
  return (
    <div style={styles.container}>
      {/* Masthead */}
      <div style={styles.masthead}>
        <div style={styles.mastheadRule} />
        <h1 style={styles.mastheadTitle}>The Daily Brief</h1>
        <div style={styles.mastheadDate}>{today.date}</div>
        <div style={styles.mastheadRule} />
      </div>

      {/* Greeting */}
      <p style={styles.greeting}>Good morning, {user.name}. Here is your wellness summary.</p>

      {/* Score Row */}
      <div style={styles.scoreRow}>
        <button style={styles.scoreCard} onClick={() => navigate('sleep')}>
          <OrganicArc score={today.sleep.score} />
          <span style={styles.scoreLabel}>Sleep quality: {qualityLabel(today.sleep.score)}</span>
        </button>
        <button style={styles.scoreCard} onClick={() => navigate('biometrics')}>
          <OrganicArc score={today.readiness.score} />
          <span style={styles.scoreLabel}>Readiness: {qualityLabel(today.readiness.score)}</span>
        </button>
        <button style={styles.scoreCard} onClick={() => navigate('activity')}>
          <OrganicArc score={today.activity.score} />
          <span style={styles.scoreLabel}>Activity: {qualityLabel(today.activity.score)}</span>
        </button>
      </div>

      {/* Daily Snapshot */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Daily Snapshot</h2>
        <div style={styles.card}>
          <div style={styles.snapshotRow}>
            <span style={styles.snapshotLabel}>Sleep</span>
            <span style={styles.snapshotValue}>{today.sleep.total}</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.snapshotRow}>
            <span style={styles.snapshotLabel}>Steps</span>
            <span style={styles.snapshotValue}>{today.activity.steps.toLocaleString()}</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.snapshotRow}>
            <span style={styles.snapshotLabel}>Calories burned</span>
            <span style={styles.snapshotValue}>{today.activity.calories}</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.snapshotRow}>
            <span style={styles.snapshotLabel}>Resting heart rate</span>
            <span style={styles.snapshotValue}>{today.readiness.restingHR} bpm</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.snapshotRow}>
            <span style={styles.snapshotLabel}>HRV</span>
            <span style={styles.snapshotValue}>{today.readiness.hrv} ms</span>
          </div>
        </div>
      </div>

      {/* Workout */}
      {today.workout && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Today's Training</h2>
          <div style={styles.card}>
            <div style={styles.workoutName}>{today.workout.name}</div>
            <div style={styles.workoutProgress}>
              {today.workout.setsComplete} of {today.workout.setsTotal} sets completed
            </div>
            <div style={styles.progressBar}>
              <div style={{
                ...styles.progressFill,
                width: `${(today.workout.setsComplete / today.workout.setsTotal) * 100}%`,
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Insights */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Editor's Notes</h2>
        {today.insights.map((ins, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.insightRow}>
              <span style={styles.insightBullet}>{i + 1}.</span>
              <span style={styles.insightText}>{ins}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Supplements */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Supplements</h2>
        <div style={styles.card}>
          {today.supplements.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
              <span style={{
                width: 18, height: 18, borderRadius: '50%',
                border: s.done ? 'none' : '1.5px solid #B8A48A',
                background: s.done ? '#7A9B76' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, color: '#1A1410', flexShrink: 0,
              }}>
                {s.done && '\u2713'}
              </span>
              <span style={{ color: s.done ? '#B8A48A' : '#F5EDD8', textDecoration: s.done ? 'line-through' : 'none', fontSize: 14 }}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.section}>
        <div style={styles.quickRow}>
          <button style={styles.quickBtn} onClick={() => navigate('log')}>
            <span style={styles.quickIcon}>+</span>
            <span style={styles.quickLabel}>Log Entry</span>
          </button>
          <button style={styles.quickBtn} onClick={() => navigate('progress')}>
            <span style={styles.quickIcon}>&rarr;</span>
            <span style={styles.quickLabel}>Progress</span>
          </button>
        </div>
      </div>

      <div style={{ height: 24 }} />
    </div>
  );
}

const styles = {
  container: { padding: '16px 20px' },
  masthead: { textAlign: 'center', marginBottom: 20 },
  mastheadRule: { height: 1, background: 'rgba(184,164,138,0.25)', margin: '0 auto', maxWidth: 280 },
  mastheadTitle: { fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 28, fontWeight: 400, color: '#F5EDD8', margin: '12px 0 4px', letterSpacing: 1 },
  mastheadDate: { fontFamily: 'Georgia, serif', fontSize: 13, color: '#B8A48A', marginBottom: 12, letterSpacing: 0.5, fontStyle: 'italic' },
  greeting: { fontSize: 15, color: '#B8A48A', lineHeight: 1.5, marginBottom: 24, fontFamily: 'Georgia, serif' },
  scoreRow: { display: 'flex', gap: 10, marginBottom: 28, justifyContent: 'center' },
  scoreCard: {
    flex: 1, background: '#231C15', borderRadius: 14, padding: '16px 8px 12px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    border: 'none', cursor: 'pointer',
  },
  scoreLabel: { fontFamily: 'Georgia, serif', fontSize: 11, color: '#B8A48A', textAlign: 'center', lineHeight: 1.3 },
  section: { marginBottom: 24 },
  sectionTitle: { fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 18, fontWeight: 400, color: '#F5EDD8', marginBottom: 12, letterSpacing: 0.3 },
  card: { background: '#231C15', borderRadius: 14, padding: '16px 18px' },
  snapshotRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' },
  snapshotLabel: { fontSize: 14, color: '#B8A48A' },
  snapshotValue: { fontSize: 14, color: '#F5EDD8', fontFamily: 'Georgia, serif' },
  divider: { height: 1, background: 'rgba(184,164,138,0.08)', margin: '6px 0' },
  workoutName: { fontFamily: 'Georgia, serif', fontSize: 16, color: '#F5EDD8', marginBottom: 6 },
  workoutProgress: { fontSize: 13, color: '#B8A48A', marginBottom: 10 },
  progressBar: { height: 4, background: 'rgba(184,164,138,0.12)', borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', background: '#D4845A', borderRadius: 2, transition: 'width 0.6s ease' },
  insightRow: { display: 'flex', gap: 10, alignItems: 'flex-start' },
  insightBullet: { fontFamily: 'Georgia, serif', color: '#D4845A', fontSize: 15, flexShrink: 0 },
  insightText: { fontSize: 14, color: '#F5EDD8', lineHeight: 1.5 },
  quickRow: { display: 'flex', gap: 12 },
  quickBtn: {
    flex: 1, background: '#231C15', borderRadius: 14, padding: '16px 12px',
    border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
  },
  quickIcon: { fontSize: 22, color: '#D4845A', fontFamily: 'Georgia, serif' },
  quickLabel: { fontFamily: 'Georgia, serif', fontSize: 13, color: '#B8A48A' },
};

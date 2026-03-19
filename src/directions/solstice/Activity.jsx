import React from 'react';
import { today, weeklyActivity } from '../../data/fake';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function BarChart({ data, height = 100 }) {
  const max = Math.max(...data);
  const w = 280;
  const barW = 24;
  const gap = (w - barW * data.length) / (data.length - 1);
  return (
    <svg width="100%" height={height + 24} viewBox={`0 0 ${w} ${height + 24}`} preserveAspectRatio="none">
      {data.map((v, i) => {
        const barH = (v / max) * (height - 10);
        const x = i * (barW + gap);
        const y = height - barH;
        return (
          <React.Fragment key={i}>
            <rect x={x} y={y} width={barW} height={barH} rx={4}
              fill={i === data.length - 1 ? '#D4845A' : 'rgba(212,132,90,0.35)'} />
            <text x={x + barW / 2} y={height + 16} textAnchor="middle"
              style={{ fontSize: 9, fill: '#B8A48A', fontFamily: 'Georgia, serif' }}>{days[i]}</text>
          </React.Fragment>
        );
      })}
    </svg>
  );
}

export default function Activity({ onBack }) {
  const stats = [
    { label: 'Steps', value: today.activity.steps.toLocaleString() },
    { label: 'Calories', value: `${today.activity.calories} kcal` },
    { label: 'Active Minutes', value: `${today.activity.activeMinutes} min` },
    { label: 'Stand Hours', value: `${today.activity.standHours} / 12` },
    { label: 'Strain', value: today.strain },
  ];

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backBtn}>&larr; Back</button>
      <h1 style={styles.title}>Move</h1>

      {/* Activity Score */}
      <div style={{ textAlign: 'center', margin: '16px 0 24px' }}>
        <div style={styles.bigScore}>{today.activity.score}</div>
        <div style={styles.bigScoreLabel}>Activity Score</div>
      </div>

      {/* Stats */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Today's Movement</h2>
        <div style={styles.card}>
          {stats.map((s, i) => (
            <React.Fragment key={i}>
              <div style={styles.statRow}>
                <span style={styles.statLabel}>{s.label}</span>
                <span style={styles.statValue}>{s.value}</span>
              </div>
              {i < stats.length - 1 && <div style={styles.divider} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Workout */}
      {today.workout && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Workout Log</h2>
          <div style={styles.card}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#F5EDD8', marginBottom: 8 }}>
              {today.workout.name}
            </div>
            <div style={{ fontSize: 13, color: '#B8A48A', marginBottom: 10 }}>
              {today.workout.setsComplete} of {today.workout.setsTotal} sets completed
            </div>
            <div style={styles.progressBar}>
              <div style={{
                height: '100%', background: '#D4845A', borderRadius: 2,
                width: `${(today.workout.setsComplete / today.workout.setsTotal) * 100}%`,
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Weekly Chart */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>7-Day Activity</h2>
        <div style={styles.card}>
          <BarChart data={weeklyActivity} />
        </div>
      </div>

      {/* Streak */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Active Streak</h2>
        <div style={styles.card}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 36, color: '#D4845A' }}>12</span>
            <span style={{ fontSize: 14, color: '#B8A48A' }}>consecutive active days</span>
          </div>
          <div style={{ fontSize: 13, color: '#7A9B76', marginTop: 8, fontFamily: 'Georgia, serif' }}>
            Personal best: 21 days
          </div>
        </div>
      </div>

      <div style={{ height: 24 }} />
    </div>
  );
}

const styles = {
  container: { padding: '16px 20px' },
  backBtn: { background: 'none', border: 'none', color: '#D4845A', fontFamily: 'Georgia, serif', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 8 },
  title: { fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 26, fontWeight: 400, color: '#F5EDD8', letterSpacing: 0.5 },
  bigScore: { fontFamily: 'Georgia, serif', fontSize: 56, color: '#D4845A' },
  bigScoreLabel: { fontFamily: 'Georgia, serif', fontSize: 13, color: '#B8A48A', marginTop: 2 },
  section: { marginBottom: 24 },
  sectionTitle: { fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 400, color: '#F5EDD8', marginBottom: 10 },
  card: { background: '#231C15', borderRadius: 14, padding: '16px 18px' },
  statRow: { display: 'flex', justifyContent: 'space-between', padding: '4px 0' },
  statLabel: { fontSize: 14, color: '#B8A48A' },
  statValue: { fontSize: 14, color: '#F5EDD8', fontFamily: 'Georgia, serif' },
  divider: { height: 1, background: 'rgba(184,164,138,0.08)', margin: '5px 0' },
  progressBar: { height: 4, background: 'rgba(184,164,138,0.12)', borderRadius: 2, overflow: 'hidden' },
};

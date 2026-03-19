import React from 'react';
import { today, weeklyActivity } from '../../data/fake';

const s = {
  page: { padding: '0 0 24px 0' },
  sectionHeader: {
    fontSize: 13, fontWeight: '600', color: '#6C6C70', textTransform: 'uppercase',
    letterSpacing: 0.5, padding: '24px 16px 8px 16px',
  },
  card: {
    background: '#FFFFFF', borderRadius: 16, margin: '0 16px',
    boxShadow: '0 0.5px 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
    padding: 16,
  },
  statsRow: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '16px 16px 0',
  },
  statCard: {
    background: '#FFFFFF', borderRadius: 16, padding: 16,
    boxShadow: '0 0.5px 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
    display: 'flex', flexDirection: 'column', gap: 4,
  },
  statValue: { fontSize: 28, fontWeight: '700', color: '#000' },
  statValueBlue: { fontSize: 28, fontWeight: '700', color: '#007AFF' },
  statLabel: { fontSize: 13, color: '#6C6C70' },
  row: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 0', borderBottom: '0.5px solid #E5E5EA',
  },
  rowLast: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 0',
  },
  label: { fontSize: 17, color: '#000' },
  value: { fontSize: 17, color: '#6C6C70' },
  valueBlue: { fontSize: 17, fontWeight: '600', color: '#007AFF' },
  chartCard: {
    background: '#FFFFFF', borderRadius: 16, margin: '0 16px',
    boxShadow: '0 0.5px 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
    padding: '16px 16px 8px',
  },
  chartTitle: { fontSize: 15, fontWeight: '600', color: '#000', marginBottom: 12 },
  streakCard: {
    background: '#FFFFFF', borderRadius: 16, margin: '0 16px',
    boxShadow: '0 0.5px 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
    padding: 20, display: 'flex', alignItems: 'center', gap: 16,
  },
  streakNumber: { fontSize: 44, fontWeight: '800', color: '#007AFF' },
  streakText: { fontSize: 17, color: '#000', fontWeight: '600' },
  streakSub: { fontSize: 13, color: '#6C6C70', marginTop: 2 },
};

function BarChart({ data, label }) {
  const max = Math.max(...data);
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const w = 280, h = 120, barW = 24, gap = (w - data.length * barW) / (data.length + 1);

  return (
    <div style={s.chartCard}>
      <div style={s.chartTitle}>{label}</div>
      <svg viewBox={`0 0 ${w} ${h + 20}`} style={{ width: '100%', height: 'auto' }}>
        {data.map((v, i) => {
          const barH = (v / max) * (h - 10);
          const x = gap + i * (barW + gap);
          const y = h - barH;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={barH} rx={6} fill={i === data.length - 1 ? '#007AFF' : '#B4D8FD'} />
              <text x={x + barW / 2} y={h + 14} textAnchor="middle" fontSize="10" fill="#6C6C70">{days[i]}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Activity() {
  const a = today.activity;
  const w = today.workout;

  return (
    <div style={s.page}>
      {/* Move Stats */}
      <div style={s.statsRow}>
        <div style={s.statCard}>
          <div style={s.statValueBlue}>{a.steps.toLocaleString()}</div>
          <div style={s.statLabel}>Steps</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statValue}>{a.calories}</div>
          <div style={s.statLabel}>Calories</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statValue}>{a.activeMinutes}</div>
          <div style={s.statLabel}>Active Minutes</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statValue}>{a.standHours}</div>
          <div style={s.statLabel}>Stand Hours</div>
        </div>
      </div>

      {/* Activity Score Ring */}
      <div style={s.sectionHeader}>Activity Score</div>
      <div style={{ ...s.card, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24 }}>
        <svg width={100} height={100} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={50} cy={50} r={42} fill="none" stroke="#E5E5EA" strokeWidth={10} />
          <circle cx={50} cy={50} r={42} fill="none" stroke="#007AFF" strokeWidth={10}
            strokeDasharray={2 * Math.PI * 42} strokeDashoffset={2 * Math.PI * 42 * (1 - a.score / 100)}
            strokeLinecap="round" />
        </svg>
        <div style={{ marginTop: -62, marginBottom: 38, fontSize: 28, fontWeight: '700', color: '#000' }}>{a.score}</div>
        <div style={{ fontSize: 13, color: '#6C6C70' }}>Activity Score</div>
      </div>

      {/* Workout Log */}
      <div style={s.sectionHeader}>Today's Workout</div>
      <div style={s.card}>
        <div style={s.row}>
          <span style={s.label}>{w.name}</span>
          <span style={s.valueBlue}>{w.setsComplete}/{w.setsTotal} sets</span>
        </div>
        <div style={s.rowLast}>
          <span style={s.label}>Strain</span>
          <span style={s.value}>{today.strain}</span>
        </div>
      </div>

      {/* 7-Day Chart */}
      <div style={s.sectionHeader}>7-Day Activity</div>
      <BarChart data={weeklyActivity} label="Activity Score" />

      {/* Streak */}
      <div style={s.sectionHeader}>Current Streak</div>
      <div style={s.streakCard}>
        <div style={s.streakNumber}>12</div>
        <div>
          <div style={s.streakText}>Day Move Streak</div>
          <div style={s.streakSub}>Consecutive days hitting activity goal</div>
        </div>
      </div>
    </div>
  );
}

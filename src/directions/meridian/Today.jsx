import React from 'react';
import { today, weeklyHRV } from '../../data/fake';

const s = {
  page: { padding: '0 0 24px 0' },
  sectionHeader: {
    fontSize: 13, fontWeight: '600', color: '#6C6C70', textTransform: 'uppercase',
    letterSpacing: 0.5, padding: '24px 16px 8px 16px',
  },
  groupedCard: {
    background: '#FFFFFF', borderRadius: 16, margin: '0 16px',
    boxShadow: '0 0.5px 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
  },
  row: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 16px', borderBottom: '0.5px solid #E5E5EA',
  },
  rowLast: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 16px',
  },
  rowLabel: { fontSize: 17, color: '#000000' },
  rowValue: { fontSize: 17, color: '#6C6C70' },
  rowValueBlue: { fontSize: 17, fontWeight: '600', color: '#007AFF' },
  ringsContainer: {
    display: 'flex', justifyContent: 'space-around', padding: '24px 16px',
    background: '#FFFFFF', borderRadius: 16, margin: '16px 16px 0',
    boxShadow: '0 0.5px 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
  },
  ringWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
  ringLabel: { fontSize: 13, color: '#6C6C70', fontWeight: '500' },
  insightItem: {
    padding: '12px 16px', borderBottom: '0.5px solid #E5E5EA',
    fontSize: 15, color: '#000000', lineHeight: '1.4',
  },
  insightLast: {
    padding: '12px 16px', fontSize: 15, color: '#000000', lineHeight: '1.4',
  },
  chevron: { color: '#C7C7CC', fontSize: 17, marginLeft: 8 },
  upcomingTime: { fontSize: 15, color: '#007AFF', fontWeight: '500', minWidth: 72 },
  upcomingLabel: { fontSize: 15, color: '#000000', flex: 1 },
  supplementRow: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '12px 16px', borderBottom: '0.5px solid #E5E5EA',
  },
  checkCircle: (done) => ({
    width: 24, height: 24, borderRadius: 12,
    border: done ? 'none' : '2px solid #C7C7CC',
    background: done ? '#007AFF' : 'transparent',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, color: '#FFFFFF',
  }),
};

function ScoreRing({ score, size = 80, strokeWidth = 8, label }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  return (
    <div style={s.ringWrap}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E5EA" strokeWidth={strokeWidth} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#007AFF" strokeWidth={strokeWidth}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div style={{ position: 'relative', marginTop: -(size/2 + 10), marginBottom: (size/2 - 14), fontSize: 22, fontWeight: '700', color: '#000' }}>
        {score}
      </div>
      <div style={s.ringLabel}>{label}</div>
    </div>
  );
}

export default function Today({ onNavigate }) {
  const d = today;
  const suppDone = d.supplements.filter(x => x.done).length;
  const suppTotal = d.supplements.length;

  return (
    <div style={s.page}>
      {/* Score Rings */}
      <div style={s.ringsContainer}>
        <ScoreRing score={d.sleep.score} label="Sleep" />
        <ScoreRing score={d.readiness.score} label="Readiness" />
        <ScoreRing score={d.activity.score} label="Activity" />
      </div>

      {/* Daily Stats */}
      <div style={s.sectionHeader}>Daily Snapshot</div>
      <div style={s.groupedCard}>
        <div style={s.row}>
          <span style={s.rowLabel}>Sleep</span>
          <span style={s.rowValueBlue}>{d.sleep.total}</span>
        </div>
        <div style={s.row}>
          <span style={s.rowLabel}>Steps</span>
          <span style={s.rowValue}>{d.activity.steps.toLocaleString()}</span>
        </div>
        <div style={s.row}>
          <span style={s.rowLabel}>Calories Burned</span>
          <span style={s.rowValue}>{d.activity.calories}</span>
        </div>
        <div style={s.row}>
          <span style={s.rowLabel}>Active Minutes</span>
          <span style={s.rowValue}>{d.activity.activeMinutes}</span>
        </div>
        <div style={s.row}>
          <span style={s.rowLabel}>Resting HR</span>
          <span style={s.rowValue}>{d.readiness.restingHR} bpm</span>
        </div>
        <div style={s.rowLast}>
          <span style={s.rowLabel}>HRV</span>
          <span style={s.rowValue}>{d.readiness.hrv} ms</span>
        </div>
      </div>

      {/* Workout */}
      <div style={s.sectionHeader}>Workout</div>
      <div style={s.groupedCard}>
        <div style={s.row}>
          <span style={s.rowLabel}>{d.workout.name}</span>
          <span style={s.rowValueBlue}>{d.workout.setsComplete}/{d.workout.setsTotal} sets</span>
        </div>
        <div style={s.rowLast}>
          <span style={s.rowLabel}>Strain</span>
          <span style={s.rowValue}>{d.strain}</span>
        </div>
      </div>

      {/* Supplements */}
      <div style={s.sectionHeader}>Supplements ({suppDone}/{suppTotal})</div>
      <div style={s.groupedCard}>
        {d.supplements.map((sup, i) => (
          <div key={i} style={{
            ...s.supplementRow,
            borderBottom: i < suppTotal - 1 ? '0.5px solid #E5E5EA' : 'none',
          }}>
            <div style={s.checkCircle(sup.done)}>
              {sup.done ? '✓' : ''}
            </div>
            <span style={{ fontSize: 17, color: sup.done ? '#6C6C70' : '#000', textDecoration: sup.done ? 'line-through' : 'none' }}>
              {sup.name}
            </span>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      <div style={s.sectionHeader}>Upcoming</div>
      <div style={s.groupedCard}>
        {d.upcoming.map((item, i) => (
          <div key={i} style={i < d.upcoming.length - 1 ? s.row : s.rowLast}>
            <span style={s.upcomingTime}>{item.time}</span>
            <span style={s.upcomingLabel}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div style={s.sectionHeader}>Insights</div>
      <div style={s.groupedCard}>
        {d.insights.map((ins, i) => (
          <div key={i} style={i < d.insights.length - 1 ? s.insightItem : s.insightLast}>
            {ins}
          </div>
        ))}
      </div>
    </div>
  );
}

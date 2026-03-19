import React from 'react';
import { today, weeklySleep, weeklyHRV } from '../../data/fake';

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
  row: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 0', borderBottom: '0.5px solid #E5E5EA',
  },
  rowLast: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 0',
  },
  label: { fontSize: 17, color: '#000000' },
  value: { fontSize: 17, color: '#6C6C70' },
  valueBlue: { fontSize: 17, fontWeight: '600', color: '#007AFF' },
  ringCenter: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px 8px' },
  scoreLabel: { fontSize: 13, color: '#6C6C70', fontWeight: '500', marginTop: 8 },
  chartCard: {
    background: '#FFFFFF', borderRadius: 16, margin: '0 16px',
    boxShadow: '0 0.5px 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
    padding: '16px 16px 8px',
  },
  chartTitle: { fontSize: 15, fontWeight: '600', color: '#000', marginBottom: 12 },
  statsGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
    margin: '0 16px',
  },
  statCard: {
    background: '#FFFFFF', borderRadius: 16, padding: 16,
    boxShadow: '0 0.5px 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
    display: 'flex', flexDirection: 'column', gap: 4,
  },
  statValue: { fontSize: 28, fontWeight: '700', color: '#000' },
  statLabel: { fontSize: 13, color: '#6C6C70' },
  recItem: {
    padding: '12px 0', borderBottom: '0.5px solid #E5E5EA',
    fontSize: 15, color: '#000', lineHeight: 1.4,
  },
};

function ScoreRing({ score, size = 120, strokeWidth = 12 }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  return (
    <div style={s.ringCenter}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E5E5EA" strokeWidth={strokeWidth} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#007AFF" strokeWidth={strokeWidth}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div style={{ marginTop: -(size/2 + 14), marginBottom: (size/2 - 20), fontSize: 34, fontWeight: '700', color: '#000' }}>
        {score}
      </div>
      <div style={s.scoreLabel}>Sleep Score</div>
    </div>
  );
}

function SleepStagesChart() {
  const sl = today.sleep;
  const stages = [
    { label: 'Deep', value: sl.deep, color: '#007AFF' },
    { label: 'REM', value: sl.rem, color: '#5AC8FA' },
    { label: 'Light', value: sl.light, color: '#B4D8FD' },
    { label: 'Awake', value: sl.awake, color: '#E5E5EA' },
  ];
  const toMin = (s) => { const p = s.split('h'); const h = parseInt(p[0]); const m = parseInt(p[1]); return h * 60 + m; };
  const totalMin = stages.reduce((a, st) => a + toMin(st.value), 0);

  return (
    <div style={s.chartCard}>
      <div style={s.chartTitle}>Sleep Stages</div>
      <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', height: 28, marginBottom: 12 }}>
        {stages.map((st, i) => (
          <div key={i} style={{ flex: toMin(st.value) / totalMin, background: st.color }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 4 }}>
        {stages.map((st, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: st.color }} />
            <span style={{ fontSize: 11, color: '#6C6C70' }}>{st.label}</span>
            <span style={{ fontSize: 13, fontWeight: '600', color: '#000' }}>{st.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeeklyChart({ data, label, suffix = '' }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const w = 280, h = 100, px = 20, py = 10;
  const points = data.map((v, i) => ({
    x: px + (i / (data.length - 1)) * (w - 2 * px),
    y: py + (1 - (v - min + 5) / (max - min + 10)) * (h - 2 * py),
  }));
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  return (
    <div style={s.chartCard}>
      <div style={s.chartTitle}>{label}</div>
      <svg viewBox={`0 0 ${w} ${h + 20}`} style={{ width: '100%', height: 'auto' }}>
        <polyline points={path.replace(/[ML]/g, (m) => m === 'M' ? '' : ' ').trim().replace(/,/g, ',')}
          fill="none" stroke="#007AFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="#007AFF" />
            <text x={p.x} y={h + 14} textAnchor="middle" fontSize="10" fill="#6C6C70">{days[i]}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function Sleep() {
  const sl = today.sleep;
  const recommendations = [
    'Aim for 10:30 PM bedtime to optimize deep sleep',
    'Reduce screen time 1 hour before bed',
    'Room temperature at 65-68°F is ideal',
  ];

  return (
    <div style={s.page}>
      <ScoreRing score={sl.score} />

      <div style={s.sectionHeader}>Sleep Duration</div>
      <div style={s.card}>
        <div style={s.row}>
          <span style={s.label}>Total Sleep</span>
          <span style={s.valueBlue}>{sl.total}</span>
        </div>
        <div style={s.row}>
          <span style={s.label}>Efficiency</span>
          <span style={s.value}>{sl.efficiency}%</span>
        </div>
        <div style={s.rowLast}>
          <span style={s.label}>Latency</span>
          <span style={s.value}>{sl.latency} min</span>
        </div>
      </div>

      <div style={{ height: 16 }} />
      <SleepStagesChart />

      <div style={s.sectionHeader}>Stats</div>
      <div style={s.statsGrid}>
        <div style={s.statCard}>
          <div style={s.statValue}>{sl.restingHR}</div>
          <div style={s.statLabel}>Resting HR (bpm)</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statValue}>{sl.hrv}</div>
          <div style={s.statLabel}>HRV (ms)</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statValue}>{sl.efficiency}%</div>
          <div style={s.statLabel}>Efficiency</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statValue}>{sl.latency}</div>
          <div style={s.statLabel}>Latency (min)</div>
        </div>
      </div>

      <div style={s.sectionHeader}>7-Day Trend</div>
      <WeeklyChart data={weeklySleep} label="Sleep Score" />

      <div style={{ height: 8 }} />
      <WeeklyChart data={weeklyHRV} label="HRV" suffix=" ms" />

      <div style={s.sectionHeader}>Recommendations</div>
      <div style={s.card}>
        {recommendations.map((rec, i) => (
          <div key={i} style={{
            ...s.recItem,
            borderBottom: i < recommendations.length - 1 ? '0.5px solid #E5E5EA' : 'none',
          }}>
            {rec}
          </div>
        ))}
      </div>
    </div>
  );
}

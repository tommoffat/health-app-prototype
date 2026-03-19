import React from 'react';
import { today, weeklySleep, weeklyHRV } from '../../data/fake';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function OrganicArc({ score, size = 120 }) {
  const r = (size - 10) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const pct = (score / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(184,164,138,0.1)" strokeWidth={6} />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="#D4845A" strokeWidth={6}
        strokeDasharray={`${pct} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
      <text x={cx} y={cy - 6} textAnchor="middle" dominantBaseline="central"
        style={{ fontFamily: 'Georgia, serif', fontSize: 32, fill: '#F5EDD8' }}>{score}</text>
      <text x={cx} y={cy + 18} textAnchor="middle"
        style={{ fontFamily: 'Georgia, serif', fontSize: 11, fill: '#B8A48A' }}>Sleep Score</text>
    </svg>
  );
}

function SleepStages() {
  const stages = [
    { label: 'Deep', value: today.sleep.deep, color: '#5A7A8A', pct: 24 },
    { label: 'REM', value: today.sleep.rem, color: '#7A9B76', pct: 27 },
    { label: 'Light', value: today.sleep.light, color: '#B8A48A', pct: 43 },
    { label: 'Awake', value: today.sleep.awake, color: '#D4845A', pct: 6 },
  ];
  return (
    <div>
      <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height: 10, marginBottom: 14 }}>
        {stages.map((s, i) => (
          <div key={i} style={{ width: `${s.pct}%`, background: s.color, transition: 'width 0.6s' }} />
        ))}
      </div>
      {stages.map((s, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
            <span style={{ fontSize: 13, color: '#B8A48A' }}>{s.label}</span>
          </div>
          <span style={{ fontSize: 13, color: '#F5EDD8', fontFamily: 'Georgia, serif' }}>{s.value}</span>
        </div>
      ))}
    </div>
  );
}

function MiniLineChart({ data, color = '#D4845A', height = 60 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 280;
  const pad = 10;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / range) * (height - pad * 2);
    return `${x},${y}`;
  });
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none">
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => {
        const x = pad + (i / (data.length - 1)) * (w - pad * 2);
        const y = pad + (1 - (v - min) / range) * (height - pad * 2);
        return <circle key={i} cx={x} cy={y} r={3} fill={color} />;
      })}
    </svg>
  );
}

function OvernightHRV() {
  const fakeOvernight = [55, 58, 64, 70, 68, 72, 66, 60];
  return <MiniLineChart data={fakeOvernight} color="#7A9B76" height={70} />;
}

export default function Sleep({ onBack }) {
  const stats = [
    { label: 'Total Sleep', value: today.sleep.total },
    { label: 'Efficiency', value: `${today.sleep.efficiency}%` },
    { label: 'Latency', value: `${today.sleep.latency} min` },
    { label: 'Resting HR', value: `${today.sleep.restingHR} bpm` },
    { label: 'HRV', value: `${today.sleep.hrv} ms` },
  ];

  const recs = [
    'Aim for 10:30 PM bedtime to align with circadian rhythm',
    'Deep sleep was strong \u2014 keep evening screen time low',
    'Consider magnesium supplement before bed for REM optimization',
  ];

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backBtn}>&larr; Back</button>
      <h1 style={styles.title}>Rest</h1>

      {/* Score Arc */}
      <div style={{ textAlign: 'center', margin: '16px 0 24px' }}>
        <OrganicArc score={today.sleep.score} />
      </div>

      {/* Stages */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Sleep Stages</h2>
        <div style={styles.card}>
          <SleepStages />
        </div>
      </div>

      {/* Overnight HRV */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Overnight HRV</h2>
        <div style={styles.card}>
          <OvernightHRV />
        </div>
      </div>

      {/* Stats */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Sleep Details</h2>
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

      {/* 7 Day Trend */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>7-Day Trend</h2>
        <div style={styles.card}>
          <MiniLineChart data={weeklySleep} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            {days.map((d, i) => (
              <span key={i} style={{ fontSize: 10, color: '#B8A48A', fontFamily: 'Georgia, serif' }}>{d}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Recommendations</h2>
        {recs.map((r, i) => (
          <div key={i} style={{ ...styles.card, marginBottom: 10 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ color: '#7A9B76', fontFamily: 'Georgia, serif', fontSize: 15 }}>{i + 1}.</span>
              <span style={{ fontSize: 14, color: '#F5EDD8', lineHeight: 1.5 }}>{r}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 24 }} />
    </div>
  );
}

const styles = {
  container: { padding: '16px 20px' },
  backBtn: { background: 'none', border: 'none', color: '#D4845A', fontFamily: 'Georgia, serif', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 8 },
  title: { fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 26, fontWeight: 400, color: '#F5EDD8', marginBottom: 4, letterSpacing: 0.5 },
  section: { marginBottom: 24 },
  sectionTitle: { fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 400, color: '#F5EDD8', marginBottom: 10 },
  card: { background: '#231C15', borderRadius: 14, padding: '16px 18px' },
  statRow: { display: 'flex', justifyContent: 'space-between', padding: '4px 0' },
  statLabel: { fontSize: 14, color: '#B8A48A' },
  statValue: { fontSize: 14, color: '#F5EDD8', fontFamily: 'Georgia, serif' },
  divider: { height: 1, background: 'rgba(184,164,138,0.08)', margin: '5px 0' },
};

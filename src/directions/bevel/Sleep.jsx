import React from 'react';
import { today, weeklySleep } from '../../data/fake';

const BackArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default function SleepScreen({ onBack }) {
  const s = today.sleep;
  const r = 44;
  const stroke = 9;
  const circ = 2 * Math.PI * r;
  const pct = s.score / 100;
  const offset = circ * (1 - pct);
  const ringSize = 100;

  const stages = [
    { label: 'Deep', time: s.deep, color: '#3634A3', pct: 23 },
    { label: 'REM', time: s.rem, color: '#5856D6', pct: 27 },
    { label: 'Light', time: s.light, color: '#A5A4F3', pct: 43 },
    { label: 'Awake', time: s.awake, color: '#E5E5EA', pct: 7 },
  ];

  const stats = [
    { label: 'Efficiency', value: `${s.efficiency}%` },
    { label: 'Latency', value: `${s.latency} min` },
    { label: 'Resting HR', value: `${s.restingHR} bpm` },
    { label: 'HRV', value: `${s.hrv} ms` },
    { label: 'SpO2', value: `${today.readiness.spo2}%` },
  ];

  const maxSleep = Math.max(...weeklySleep);
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
        <div style={styles.headerTitle}>Sleep</div>

        {/* Frosted Ring Card */}
        <div style={styles.frostedCard}>
          <svg width={ringSize} height={ringSize} viewBox={`0 0 ${ringSize} ${ringSize}`}>
            <circle cx={ringSize / 2} cy={ringSize / 2} r={r} fill="none" stroke="rgba(88,86,214,0.15)" strokeWidth={stroke} />
            <circle cx={ringSize / 2} cy={ringSize / 2} r={r} fill="none" stroke="#5856D6" strokeWidth={stroke}
              strokeDasharray={circ} strokeDashoffset={offset}
              strokeLinecap="round" transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`} />
            <text x={ringSize / 2} y={ringSize / 2 - 4} textAnchor="middle" dominantBaseline="central"
              style={{ fontSize: 24, fontWeight: 700, fill: '#1A1A1A', fontFamily: "-apple-system, sans-serif" }}>
              {s.score}
            </text>
            <text x={ringSize / 2} y={ringSize / 2 + 16} textAnchor="middle"
              style={{ fontSize: 10, fill: '#8E8E93', fontFamily: "-apple-system, sans-serif" }}>
              / 100
            </text>
          </svg>
          <div style={{ marginTop: 8, fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>Sleep Score</div>
          <div style={{ fontSize: 13, color: '#8E8E93', marginTop: 2 }}>{s.total} total sleep</div>
        </div>
      </div>

      {/* Content */}
      <div style={styles.body}>
        {/* Sleep Stages */}
        <div style={styles.card}>
          <div style={styles.cardLabel}>SLEEP STAGES</div>
          <div style={styles.stagesBar}>
            {stages.map((st, i) => (
              <div key={i} style={{ flex: st.pct, height: 12, background: st.color, borderRadius: i === 0 ? '6px 0 0 6px' : i === stages.length - 1 ? '0 6px 6px 0' : 0 }} />
            ))}
          </div>
          <div style={styles.legend}>
            {stages.map((st, i) => (
              <div key={i} style={styles.legendItem}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: st.color }} />
                <span style={{ fontSize: 12, color: '#8E8E93' }}>{st.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A' }}>{st.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={styles.card}>
          <div style={styles.cardLabel}>DETAILS</div>
          {stats.map((st, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: i < stats.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
              <span style={{ fontSize: 14, color: '#8E8E93' }}>{st.label}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{st.value}</span>
            </div>
          ))}
        </div>

        {/* Weekly Chart */}
        <div style={styles.card}>
          <div style={styles.cardLabel}>7-DAY SLEEP SCORE</div>
          <div style={styles.barChart}>
            {weeklySleep.map((v, i) => (
              <div key={i} style={styles.barCol}>
                <div style={styles.barTrack}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${(v / maxSleep) * 100}%`, background: i === 6 ? '#5856D6' : '#A5A4F3', borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 10, color: '#8E8E93', marginTop: 4 }}>{days[i]}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#1A1A1A' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div style={{ ...styles.card, marginBottom: 24 }}>
          <div style={styles.cardLabel}>RECOMMENDATIONS</div>
          {['Maintain your 10:30 PM bedtime for consistency', 'Avoid screens 30 min before bed', 'Your deep sleep is improving - keep it up'].map((rec, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: i < 2 ? 12 : 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: '#5856D6', marginTop: 6, flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: '#1A1A1A', lineHeight: 1.4 }}>{rec}</span>
            </div>
          ))}
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
    background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
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
  stagesBar: {
    display: 'flex',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 14,
  },
  legend: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
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

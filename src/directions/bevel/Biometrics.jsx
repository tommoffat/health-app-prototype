import React from 'react';
import { today, weeklyHRV, weeklyWeight } from '../../data/fake';

const BackArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const Sparkline = ({ data, color, width = 80, height = 30 }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default function BiometricsScreen({ onBack }) {
  const rd = today.readiness;
  const r = 44;
  const stroke = 9;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - rd.score / 100);
  const ringSize = 100;

  const vitals = [
    { label: 'Heart Rate Variability', value: rd.hrv, unit: 'ms', trend: '+12%', trendUp: true, color: '#34C759', data: weeklyHRV },
    { label: 'Resting Heart Rate', value: rd.restingHR, unit: 'bpm', trend: '-2 bpm', trendUp: true, color: '#FF3B30', data: [56, 55, 54, 53, 52, 52, 52] },
    { label: 'Blood Oxygen', value: rd.spo2, unit: '%', trend: 'Normal', trendUp: true, color: '#5856D6', data: [97, 98, 97, 98, 98, 98, 98] },
    { label: 'Body Temperature', value: rd.bodyTemp, unit: '', trend: 'Baseline', trendUp: null, color: '#FF8C42', data: [0, 0.1, -0.1, 0.1, 0.2, 0.1, 0.2] },
    { label: 'Weight', value: today.weight, unit: 'lbs', trend: '-0.8 lbs', trendUp: true, color: '#8E8E93', data: weeklyWeight },
  ];

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
        <div style={styles.headerTitle}>Biology</div>

        <div style={styles.frostedCard}>
          <svg width={ringSize} height={ringSize} viewBox={`0 0 ${ringSize} ${ringSize}`}>
            <circle cx={ringSize / 2} cy={ringSize / 2} r={r} fill="none" stroke="rgba(52,199,89,0.15)" strokeWidth={stroke} />
            <circle cx={ringSize / 2} cy={ringSize / 2} r={r} fill="none" stroke="#34C759" strokeWidth={stroke}
              strokeDasharray={circ} strokeDashoffset={offset}
              strokeLinecap="round" transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`} />
            <text x={ringSize / 2} y={ringSize / 2 - 4} textAnchor="middle" dominantBaseline="central"
              style={{ fontSize: 24, fontWeight: 700, fill: '#1A1A1A', fontFamily: "-apple-system, sans-serif" }}>
              {rd.score}
            </text>
            <text x={ringSize / 2} y={ringSize / 2 + 16} textAnchor="middle"
              style={{ fontSize: 10, fill: '#8E8E93', fontFamily: "-apple-system, sans-serif" }}>
              / 100
            </text>
          </svg>
          <div style={{ marginTop: 8, fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>Recovery Score</div>
          <div style={{ fontSize: 13, color: '#8E8E93', marginTop: 2 }}>Your body is well recovered</div>
        </div>
      </div>

      <div style={styles.body}>
        {vitals.map((v, i) => (
          <div key={i} style={styles.vitalCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#8E8E93', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>{v.label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 32, fontWeight: 700, color: '#1A1A1A' }}>{v.value}</span>
                  {v.unit && <span style={{ fontSize: 14, color: '#8E8E93' }}>{v.unit}</span>}
                </div>
                <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {v.trendUp !== null && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill={v.trendUp ? '#34C759' : '#FF3B30'}>
                      {v.trendUp
                        ? <polygon points="5,1 9,7 1,7" />
                        : <polygon points="5,9 9,3 1,3" />
                      }
                    </svg>
                  )}
                  <span style={{ fontSize: 12, color: v.trendUp ? '#34C759' : '#8E8E93', fontWeight: 500 }}>{v.trend}</span>
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                <Sparkline data={v.data} color={v.color} />
              </div>
            </div>
          </div>
        ))}

        {/* Summary Card */}
        <div style={{ ...styles.vitalCard, marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#8E8E93', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>RECOVERY INSIGHTS</div>
          {[
            'HRV is trending upward, indicating good recovery',
            'Resting HR is at your personal best range',
            'All vitals are within optimal ranges',
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: i < 2 ? 12 : 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: '#34C759', marginTop: 6, flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: '#1A1A1A', lineHeight: 1.4 }}>{t}</span>
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
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
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
  vitalCard: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    marginBottom: 12,
  },
};

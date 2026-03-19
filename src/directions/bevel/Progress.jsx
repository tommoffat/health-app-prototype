import React, { useState } from 'react';
import { weeklySleep, weeklyActivity, weeklyHRV, weeklyWeight } from '../../data/fake';

const BackArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const LineChart = ({ data, color, height = 80 }) => {
  const svgW = 280;
  const min = Math.min(...data) - 2;
  const max = Math.max(...data) + 2;
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (svgW - 8) + 4;
    const y = (height - 8) - ((v - min) / range) * (height - 16) + 4;
    return `${x},${y}`;
  });
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p}`).join(' ');
  const areaD = `${pathD} L ${(svgW - 4)},${height} L 4,${height} Z`;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${svgW} ${height}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#grad-${color.replace('#', '')})`} />
      <polyline points={points.join(' ')} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * (svgW - 8) + 4;
        const y = (height - 8) - ((v - min) / range) * (height - 16) + 4;
        return i === data.length - 1 ? (
          <circle key={i} cx={x} cy={y} r="4" fill={color} stroke="#FFFFFF" strokeWidth="2" />
        ) : null;
      })}
    </svg>
  );
};

const ranges = ['7D', '14D', '30D', '90D'];

export default function ProgressScreen({ onBack }) {
  const [range, setRange] = useState('7D');

  const charts = [
    { label: 'Sleep Score', data: weeklySleep, color: '#5856D6', current: weeklySleep[weeklySleep.length - 1], unit: '' },
    { label: 'Activity Score', data: weeklyActivity, color: '#FF8C42', current: weeklyActivity[weeklyActivity.length - 1], unit: '' },
    { label: 'HRV', data: weeklyHRV, color: '#34C759', current: weeklyHRV[weeklyHRV.length - 1], unit: 'ms' },
    { label: 'Weight', data: weeklyWeight, color: '#8E8E93', current: weeklyWeight[weeklyWeight.length - 1], unit: 'lbs' },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.headerRow}>
        {onBack && (
          <button style={styles.backBtn} onClick={onBack}>
            <BackArrow />
          </button>
        )}
        <div style={styles.title}>Progress</div>
      </div>

      {/* Range Picker */}
      <div style={styles.rangePicker}>
        {ranges.map((r) => (
          <button key={r} style={{ ...styles.rangeBtn, ...(range === r ? styles.rangeBtnActive : {}) }} onClick={() => setRange(r)}>
            {r}
          </button>
        ))}
      </div>

      {/* Charts */}
      {charts.map((ch, i) => (
        <div key={i} style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#8E8E93', letterSpacing: 1, textTransform: 'uppercase' }}>{ch.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A' }}>{ch.current}</span>
              {ch.unit && <span style={{ fontSize: 12, color: '#8E8E93' }}>{ch.unit}</span>}
            </div>
          </div>
          <LineChart data={ch.data} color={ch.color} />
        </div>
      ))}

      {/* Streaks */}
      <div style={{ ...styles.card, marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#8E8E93', letterSpacing: 1, marginBottom: 14 }}>STREAKS</div>
        {[
          { label: 'Activity', days: 7, color: '#FF8C42' },
          { label: 'Sleep 80+', days: 5, color: '#5856D6' },
          { label: 'Recovery 70+', days: 4, color: '#34C759' },
        ].map((st, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? '1px solid #F0F0F0' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: st.color }} />
              <span style={{ fontSize: 14, color: '#1A1A1A' }}>{st.label}</span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>{st.days} days</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '16px 16px 0 16px',
    minHeight: '100%',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
    marginBottom: 20,
  },
  backBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    WebkitTapHighlightColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  rangePicker: {
    display: 'flex',
    background: '#FFFFFF',
    borderRadius: 12,
    padding: 3,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    marginBottom: 16,
  },
  rangeBtn: {
    flex: 1,
    padding: '8px 0',
    borderRadius: 10,
    border: 'none',
    background: 'transparent',
    fontSize: 13,
    fontWeight: 600,
    color: '#8E8E93',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  },
  rangeBtnActive: {
    background: '#1A1A1A',
    color: '#FFFFFF',
  },
  card: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    marginBottom: 12,
  },
};

import React, { useState } from 'react';
import { today, weeklyHRV, weeklyWeight } from '../../data/fake.js';
import AuroraCard from './components/AuroraCard.jsx';
import LineChart from './components/LineChart.jsx';

const TEXT = '#F0F0F0';
const TEXT_DIM = '#8B949E';
const BORDER = 'rgba(255,255,255,0.08)';
const ACCENT = '#E91E8C';

const vitals = [
  {
    key: 'hrv', label: 'Heart Rate Variability', value: `${today.readiness.hrv}`, unit: 'ms',
    trend: '↑ 12% this week', trendColor: '#2ECC71',
    data: weeklyHRV, color: '#4ECDC4',
    gradient: 'linear-gradient(160deg, rgba(78,205,196,0.12) 0%, rgba(46,204,113,0.08) 60%, #0D1117 100%)',
    monthData: [58, 62, 60, 64, 61, 65, 63, 66, 64, 68, 66, 70, 68, 65, 67, 70, 66, 68, 72, 69, 65, 68, 70, 67, 71, 68, 66, 70, 68, 68],
  },
  {
    key: 'rhr', label: 'Resting Heart Rate', value: `${today.readiness.restingHR}`, unit: 'bpm',
    trend: '↓ 2 bpm', trendColor: '#2ECC71',
    data: [56, 54, 55, 53, 54, 52, 52], color: '#E74C3C',
    gradient: 'linear-gradient(160deg, rgba(231,76,60,0.10) 0%, rgba(200,50,50,0.06) 60%, #0D1117 100%)',
    monthData: [58, 57, 56, 55, 56, 54, 55, 54, 53, 54, 53, 52, 53, 54, 53, 52, 53, 54, 52, 53, 52, 51, 52, 53, 52, 51, 52, 52, 52, 52],
  },
  {
    key: 'spo2', label: 'Blood Oxygen', value: `${today.readiness.spo2}`, unit: '%',
    trend: 'Normal', trendColor: TEXT_DIM,
    data: [97, 98, 97, 98, 98, 99, 98], color: '#2ECC71',
    gradient: 'linear-gradient(160deg, rgba(46,204,113,0.10) 0%, rgba(39,174,96,0.06) 60%, #0D1117 100%)',
    monthData: [97, 98, 97, 98, 97, 98, 98, 99, 98, 98, 97, 98, 98, 99, 98, 97, 98, 99, 98, 98, 97, 98, 98, 99, 98, 97, 98, 98, 98, 98],
  },
  {
    key: 'temp', label: 'Body Temperature', value: today.readiness.bodyTemp, unit: '',
    trend: 'Within baseline', trendColor: TEXT_DIM,
    data: [0.1, -0.1, 0.0, 0.2, 0.1, 0.3, 0.2], color: '#F0943A',
    gradient: 'linear-gradient(160deg, rgba(240,148,58,0.10) 0%, rgba(200,100,30,0.06) 60%, #0D1117 100%)',
    monthData: [0.0, 0.1, -0.1, 0.2, 0.0, 0.1, -0.1, 0.2, 0.1, 0.0, 0.2, 0.1, 0.0, -0.1, 0.1, 0.2, 0.0, 0.1, 0.2, 0.0, 0.1, 0.2, 0.1, 0.0, 0.1, 0.2, 0.1, 0.0, 0.1, 0.2],
  },
  {
    key: 'weight', label: 'Weight', value: `${today.weight}`, unit: 'lbs',
    trend: '-0.8 lbs/wk', trendColor: '#2ECC71',
    data: weeklyWeight, color: '#9B59B6',
    gradient: 'linear-gradient(160deg, rgba(155,89,182,0.10) 0%, rgba(100,60,160,0.06) 60%, #0D1117 100%)',
    monthData: [180.2, 180.0, 179.8, 179.6, 179.4, 179.2, 179.0, 179.2, 178.8, 179.0, 178.8, 178.6, 178.8, 178.6, 178.4, 178.6, 178.4, 178.2, 178.4, 178.6, 178.4, 178.2, 178.4, 178.6, 178.4, 178.2, 178.4, 178.4, 178.4, 178.4],
  },
  {
    key: 'resp', label: 'Respiratory Rate', value: '14.2', unit: 'brpm',
    trend: 'Normal', trendColor: TEXT_DIM,
    data: [14.5, 14.2, 13.8, 14.0, 14.3, 14.1, 14.2], color: '#3498DB',
    gradient: 'linear-gradient(160deg, rgba(52,152,219,0.10) 0%, rgba(41,128,185,0.06) 60%, #0D1117 100%)',
    monthData: [14.8, 14.5, 14.2, 14.6, 14.3, 14.0, 14.4, 14.2, 13.8, 14.1, 14.3, 14.0, 14.2, 14.5, 14.1, 13.9, 14.2, 14.4, 14.0, 14.3, 14.1, 13.8, 14.2, 14.0, 14.3, 14.1, 14.2, 14.0, 14.1, 14.2],
  },
];

export default function BiologyScreen() {
  const [activeIdx, setActiveIdx] = useState(0);
  const v = vitals[activeIdx];

  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
      {/* pill tabs */}
      <div style={{
        display: 'flex', gap: 4, padding: '12px 16px', overflowX: 'auto',
        WebkitOverflowScrolling: 'touch', flexShrink: 0,
      }}>
        {vitals.map((vt, i) => (
          <button key={vt.key} onClick={() => setActiveIdx(i)} style={{
            padding: '6px 12px', borderRadius: 16, whiteSpace: 'nowrap', flexShrink: 0,
            background: i === activeIdx ? `${vt.color}22` : 'rgba(255,255,255,0.04)',
            border: i === activeIdx ? `1px solid ${vt.color}55` : `1px solid ${BORDER}`,
            color: i === activeIdx ? vt.color : TEXT_DIM,
            fontSize: 11, fontWeight: i === activeIdx ? 600 : 400, cursor: 'pointer',
          }}>
            {vt.label.split(' ').slice(-1)[0]}
          </button>
        ))}
      </div>

      {/* aurora vital card */}
      <div style={{ padding: '0 16px' }}>
        <AuroraCard gradient={v.gradient} accentColor={v.color}>
          <div style={{ padding: '36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 2.5, color: v.color, fontWeight: 600, marginBottom: 8 }}>{v.label}</div>
            <div style={{ fontSize: 72, fontWeight: 200, color: TEXT, lineHeight: 1, letterSpacing: -2, textShadow: `0 0 60px ${v.color}33` }}>
              {v.value}
            </div>
            {v.unit && <div style={{ fontSize: 16, color: TEXT_DIM, marginTop: 4 }}>{v.unit}</div>}
            <div style={{ fontSize: 12, color: v.trendColor, marginTop: 8, fontWeight: 500 }}>{v.trend}</div>
          </div>
        </AuroraCard>
      </div>

      {/* 30-day trend */}
      <div style={{ padding: '16px 16px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
          borderRadius: 16, padding: '18px 20px', marginBottom: 12,
        }}>
          <div style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>30-Day Trend</div>
          <LineChart
            data={v.monthData}
            color={v.color}
            width={300}
            height={140}
            labels={Array.from({ length: 30 }, (_, i) => i % 7 === 0 ? `W${Math.floor(i / 7) + 1}` : '')}
          />
        </div>

        {/* 7-day mini */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
          borderRadius: 16, padding: '18px 20px', marginBottom: 12,
        }}>
          <div style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>7-Day Detail</div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {v.data.map((val, i) => {
              const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
              return (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 13, color: i === v.data.length - 1 ? TEXT : TEXT_DIM, fontWeight: i === v.data.length - 1 ? 600 : 400, marginBottom: 4 }}>
                    {typeof val === 'number' ? (val % 1 === 0 ? val : val.toFixed(1)) : val}
                  </div>
                  <div style={{ fontSize: 10, color: TEXT_DIM }}>{days[i]}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* swipe hint */}
        <div style={{ textAlign: 'center', padding: '8px 0 24px' }}>
          <div style={{ fontSize: 11, color: TEXT_DIM, opacity: 0.5 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEXT_DIM} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: 4 }}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Use tabs above to browse vitals
          </div>
        </div>
      </div>
    </div>
  );
}

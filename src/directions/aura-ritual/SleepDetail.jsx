import React, { useState } from 'react';
import { today, weeklySleep } from '../../data/fake.js';
import AuroraCard from './components/AuroraCard.jsx';
import LineChart from './components/LineChart.jsx';
import Sparkline from './components/Sparkline.jsx';

const TEXT = '#F0F0F0';
const TEXT_DIM = '#8B949E';
const BORDER = 'rgba(255,255,255,0.08)';
const ACCENT = '#9B59B6';
const GRADIENT = 'linear-gradient(160deg, rgba(155,89,182,0.18) 0%, rgba(100,60,160,0.12) 60%, #0D1117 100%)';

const stages = [
  { name: 'Awake', pct: 6, duration: '28m', color: '#E74C3C' },
  { name: 'REM', pct: 27, duration: '1h 58m', color: '#9B59B6' },
  { name: 'Core', pct: 43, duration: '3h 12m', color: '#3498DB' },
  { name: 'Deep', pct: 23, duration: '1h 44m', color: '#2ECC71' },
];

const vitalsTabs = ['HR', 'HRV', 'Breathing', 'SpO2'];
const vitalsData = {
  HR: { data: [62, 58, 55, 52, 50, 48, 51, 54, 56, 60], color: '#E74C3C', label: 'Heart Rate', unit: 'bpm', avg: '54' },
  HRV: { data: [45, 52, 60, 68, 72, 75, 70, 65, 58, 50], color: '#4ECDC4', label: 'HRV', unit: 'ms', avg: '62' },
  Breathing: { data: [14, 13, 12, 12, 11, 11, 12, 12, 13, 14], color: '#F0943A', label: 'Resp Rate', unit: 'brpm', avg: '12.4' },
  SpO2: { data: [97, 98, 98, 99, 98, 98, 99, 98, 97, 98], color: '#2ECC71', label: 'Blood Oxygen', unit: '%', avg: '98' },
};

export default function SleepDetail({ onBack }) {
  const [vitalTab, setVitalTab] = useState('HR');
  const vd = vitalsData[vitalTab];

  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
      {/* back */}
      <div style={{ padding: '12px 20px 0' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, color: TEXT_DIM, fontSize: 14, padding: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* aurora header */}
      <div style={{ padding: '0 16px', marginTop: 8 }}>
        <AuroraCard gradient={GRADIENT} accentColor={ACCENT}>
          <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 3, color: ACCENT, fontWeight: 600, marginBottom: 8 }}>Sleep</div>
            <div style={{ fontSize: 72, fontWeight: 200, color: TEXT, lineHeight: 1, letterSpacing: -2, textShadow: `0 0 60px ${ACCENT}33` }}>
              {today.sleep.score}
            </div>
            <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 4, letterSpacing: 1, textTransform: 'uppercase' }}>Excellent</div>
          </div>
        </AuroraCard>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        {/* sleep duration banner */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
          borderRadius: 16, padding: '20px', marginBottom: 12, textAlign: 'center',
        }}>
          <div style={{ fontSize: 36, fontWeight: 300, color: TEXT, marginBottom: 4 }}>{today.sleep.total}</div>
          <div style={{ fontSize: 13, color: TEXT_DIM }}>Total Sleep Duration</div>
          <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 4, opacity: 0.6 }}>7h 50m in bed · {today.sleep.latency} min to fall asleep</div>
        </div>

        {/* stage breakdown - 2x2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          {stages.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
              borderRadius: 14, padding: '14px 16px',
            }}>
              <div style={{ fontSize: 11, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>{s.name}</div>
              <div style={{ fontSize: 20, fontWeight: 500, color: TEXT, marginBottom: 4 }}>{s.duration}</div>
              {/* percentage bar */}
              <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)', marginBottom: 4 }}>
                <div style={{ height: '100%', borderRadius: 2, background: s.color, width: `${s.pct}%`, transition: 'width 0.5s ease' }} />
              </div>
              <div style={{ fontSize: 11, color: s.color }}>{s.pct}%</div>
            </div>
          ))}
        </div>

        {/* sleep bank */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
          borderRadius: 16, padding: '18px 20px', marginBottom: 12,
        }}>
          <div style={{ fontSize: 11, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>Sleep Bank</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 24, fontWeight: 300, color: '#2ECC71' }}>+42 min</span>
            <span style={{ fontSize: 12, color: TEXT_DIM }}>surplus this week</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)', display: 'flex', overflow: 'hidden' }}>
            <div style={{ width: '60%', background: '#2ECC71', borderRadius: '4px 0 0 4px' }} />
            <div style={{ width: '2px', background: TEXT }} />
            <div style={{ flex: 1, background: 'rgba(231,76,60,0.15)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: TEXT_DIM }}>
            <span>Surplus</span>
            <span>Debt</span>
          </div>
        </div>

        {/* 7-day trend */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
          borderRadius: 16, padding: '18px 20px', marginBottom: 12,
        }}>
          <div style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>7-Day Sleep Score</div>
          <LineChart data={weeklySleep} color={ACCENT} width={300} height={120} showBand bandMin={75} bandMax={95} />
        </div>

        {/* coaching */}
        <div style={{
          background: `${ACCENT}0a`, border: `1px solid ${ACCENT}22`,
          borderRadius: 16, padding: '16px 18px', marginBottom: 16,
        }}>
          <div style={{ fontSize: 11, color: '#C9A96E', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, fontWeight: 600 }}>Coaching</div>
          <div style={{ fontSize: 14, color: TEXT, lineHeight: 1.55, opacity: 0.88 }}>
            Sleep architecture looks exceptional. Deep sleep of {today.sleep.deep} exceeded your target by 14 minutes, contributing to excellent physical recovery. Your {today.sleep.efficiency}% efficiency indicates minimal disruptions. Optimal bedtime tonight: 10:30 PM.
          </div>
        </div>

        {/* vitals during sleep */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
          borderRadius: 16, padding: '18px 20px', marginBottom: 24,
        }}>
          <div style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>Vitals During Sleep</div>
          {/* tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
            {vitalsTabs.map(t => (
              <button key={t} onClick={() => setVitalTab(t)} style={{
                flex: 1, padding: '6px 0', borderRadius: 8,
                background: t === vitalTab ? `${vd.color}22` : 'rgba(255,255,255,0.04)',
                border: t === vitalTab ? `1px solid ${vd.color}44` : `1px solid transparent`,
                color: t === vitalTab ? vd.color : TEXT_DIM,
                fontSize: 11, fontWeight: t === vitalTab ? 600 : 400, cursor: 'pointer',
              }}>
                {t}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: TEXT_DIM }}>{vd.label}</span>
            <span style={{ fontSize: 14, color: TEXT, fontWeight: 500 }}>Avg: {vd.avg} {vd.unit}</span>
          </div>
          <Sparkline data={vd.data} color={vd.color} width={280} height={50} />
        </div>
      </div>
    </div>
  );
}

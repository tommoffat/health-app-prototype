import React from 'react';
import { today, weeklyHRV } from '../../data/fake.js';
import AuroraCard from './components/AuroraCard.jsx';
import LineChart from './components/LineChart.jsx';
import Sparkline from './components/Sparkline.jsx';
import MetricRow from './components/MetricRow.jsx';

const BG = '#0D1117';
const TEXT = '#F0F0F0';
const TEXT_DIM = '#8B949E';
const BORDER = 'rgba(255,255,255,0.08)';
const ACCENT = '#4ECDC4';
const GRADIENT = 'linear-gradient(160deg, rgba(78,205,196,0.15) 0%, rgba(46,204,113,0.10) 60%, #0D1117 100%)';

const monthlyRecovery = [72, 78, 80, 76, 82, 74, 79, 85, 81, 77, 83, 80, 86, 82, 78, 84, 80, 76, 88, 82, 79, 85, 81, 84, 78, 82, 86, 80, 83, 84];

const contributors = [
  { label: 'Sleep Quality', value: 'Excellent', icon: 'M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z' },
  { label: 'Training Load', value: 'Balanced', icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
  { label: 'Stress Level', value: 'Low', icon: 'M4.93 19.07A10 10 0 1019.07 4.93 10 10 0 004.93 19.07zm2.83-2.83A7 7 0 1016.24 7.76 7 7 0 007.76 16.24z' },
  { label: 'Nutrition', value: 'Good', icon: 'M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3' },
];

export default function RecoveryDetail({ onBack }) {
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
      {/* back button */}
      <div style={{ padding: '12px 20px 0', flexShrink: 0 }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, color: TEXT_DIM, fontSize: 14,
          padding: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* aurora header */}
      <div style={{ padding: '0 16px 0', marginTop: 8 }}>
        <AuroraCard gradient={GRADIENT} accentColor={ACCENT}>
          <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 3, color: ACCENT, fontWeight: 600, marginBottom: 8 }}>Recovery</div>
            <div style={{ fontSize: 72, fontWeight: 200, color: TEXT, lineHeight: 1, letterSpacing: -2, textShadow: `0 0 60px ${ACCENT}33` }}>
              {today.readiness.score}
            </div>
            <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 4, letterSpacing: 1, textTransform: 'uppercase' }}>Optimal</div>
          </div>
        </AuroraCard>
      </div>

      {/* vitals cards */}
      <div style={{ padding: '16px 16px 0' }}>
        {/* HRV card */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
          borderRadius: 16, padding: '18px 20px', marginBottom: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>Heart Rate Variability</div>
              <div style={{ fontSize: 32, fontWeight: 300, color: TEXT }}>{today.readiness.hrv} <span style={{ fontSize: 14, color: TEXT_DIM }}>ms</span></div>
            </div>
            <span style={{ fontSize: 12, color: '#2ECC71', fontWeight: 500, marginTop: 4 }}>↑ 12%</span>
          </div>
          <Sparkline data={weeklyHRV} color={ACCENT} width={280} height={45} />
        </div>

        {/* RHR card */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
          borderRadius: 16, padding: '18px 20px', marginBottom: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 11, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>Resting Heart Rate</div>
              <div style={{ fontSize: 32, fontWeight: 300, color: TEXT }}>{today.readiness.restingHR} <span style={{ fontSize: 14, color: TEXT_DIM }}>bpm</span></div>
            </div>
            <span style={{ fontSize: 12, color: '#2ECC71', fontWeight: 500, marginTop: 4 }}>↓ 2 bpm</span>
          </div>
          <Sparkline data={[56, 54, 55, 53, 54, 52, 52]} color={ACCENT} width={280} height={45} />
        </div>

        {/* SpO2 + Body Temp row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
            borderRadius: 16, padding: '18px 16px',
          }}>
            <div style={{ fontSize: 11, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>SpO2</div>
            <div style={{ fontSize: 28, fontWeight: 300, color: TEXT }}>{today.readiness.spo2}<span style={{ fontSize: 14, color: TEXT_DIM }}>%</span></div>
            <div style={{ fontSize: 11, color: '#2ECC71', marginTop: 4 }}>Normal</div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
            borderRadius: 16, padding: '18px 16px',
          }}>
            <div style={{ fontSize: 11, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>Body Temp</div>
            <div style={{ fontSize: 28, fontWeight: 300, color: TEXT }}>{today.readiness.bodyTemp}</div>
            <div style={{ fontSize: 11, color: TEXT_DIM, marginTop: 4 }}>Within baseline</div>
          </div>
        </div>

        {/* 30-day recovery trend */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
          borderRadius: 16, padding: '18px 20px', marginBottom: 12,
        }}>
          <div style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>30-Day Recovery Trend</div>
          <LineChart data={monthlyRecovery} color={ACCENT} width={300} height={120} showBand bandMin={70} bandMax={90} labels={Array.from({ length: 30 }, (_, i) => i % 7 === 0 ? `W${Math.floor(i / 7) + 1}` : '')} />
        </div>

        {/* coaching */}
        <div style={{
          background: `${ACCENT}0a`, border: `1px solid ${ACCENT}22`,
          borderRadius: 16, padding: '16px 18px', marginBottom: 16,
        }}>
          <div style={{ fontSize: 11, color: ACCENT, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, fontWeight: 600 }}>Coaching</div>
          <div style={{ fontSize: 14, color: TEXT, lineHeight: 1.55, opacity: 0.88 }}>
            Your recovery is excellent at {today.readiness.score}%. HRV is trending upward — your autonomic nervous system is adapting well to training load. Today is a great day for a high-intensity session. Push zone 4-5 intervals.
          </div>
        </div>

        {/* recovery contributors */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12, padding: '0 4px' }}>Recovery Contributors</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {contributors.map((c, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
                borderRadius: 14, padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d={c.icon} />
                </svg>
                <div>
                  <div style={{ fontSize: 11, color: TEXT_DIM, marginBottom: 2 }}>{c.label}</div>
                  <div style={{ fontSize: 13, color: TEXT, fontWeight: 500 }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

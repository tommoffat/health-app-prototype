import React from 'react';
import { today } from '../../data/fake.js';
import { BG_CARD, GOLD, GOLD_LT, TEXT, TEXT_DIM, CREAM, BORDER, SLEEP, ICONS, spacedCaps, btnReset } from './palette.js';
import AuroraHeader from './components/AuroraHeader.jsx';
import LineChart from './components/LineChart.jsx';

const stages = [
  { name: 'Awake', pct: 6, color: '#6B7280', dur: '28m', target: '<10%', interp: 'Brief awakenings are normal.' },
  { name: 'REM', pct: 27, color: '#9B59B6', dur: '1h 58m', target: '20-25%', interp: 'Excellent REM for memory consolidation.' },
  { name: 'Core', pct: 43, color: '#5B8DEF', dur: '3h 12m', target: '40-50%', interp: 'Core sleep is within ideal range.' },
  { name: 'Deep', pct: 24, color: '#2C3E80', dur: '1h 44m', target: '15-20%', interp: 'Above target, supporting physical recovery.' },
];

const overnightHR = [58,56,54,52,50,49,48,50,52,54,56,58,55,52,50,48,52,56,54,52];
const overnightHRV = [55,60,65,68,72,75,70,65,62,60,58,62,68,72,68,65,70,68,66,68];
const overnightBR = [14,14,13,13,12,12,12,13,13,14,14,13,12,12,13,13,14,13,13,14];
const overnightSpO2 = [97,98,98,98,98,99,98,98,97,98,98,98,99,98,98,98,97,98,98,98];

const sleepBank = [0.5, -0.3, 0.2, 0.4, -0.1, 0.1, 0.25];

export default function SleepChamber({ onBack }) {
  const score = today.sleep.score;

  return (
    <>
      <AuroraHeader colorScheme="sleep" height={180}>
        <button onClick={onBack} style={{ ...btnReset, display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={ICONS.back} />
          </svg>
          <span style={{ marginLeft: 6, color: GOLD, fontSize: 13, fontWeight: 500 }}>Lobby</span>
        </button>
        <div style={{ fontSize: 22, fontWeight: 300, color: TEXT, letterSpacing: 0.5 }}>Sleep Chamber</div>
        <div style={{ fontSize: 14, color: SLEEP, marginTop: 4, fontWeight: 500 }}>{score} Sleep Score</div>
      </AuroraHeader>

      <div style={{ padding: '24px 20px 40px' }}>
        {/* Duration Card */}
        <div style={{
          padding: 20, borderRadius: 14, background: BG_CARD,
          border: `1px solid ${BORDER}`, textAlign: 'center', marginBottom: 28,
        }}>
          <div style={{ fontSize: 32, fontWeight: 300, color: TEXT }}>{today.sleep.total} <span style={{ fontSize: 14, color: TEXT_DIM }}>slept</span></div>
          <div style={{ fontSize: 13, color: TEXT_DIM, marginTop: 6 }}>{today.sleep.efficiency}% efficiency &middot; {today.sleep.latency}min to fall asleep</div>
        </div>

        {/* Sleep Architecture */}
        <div style={{ ...spacedCaps, marginBottom: 12 }}>Sleep Architecture</div>

        {/* Stage Timeline */}
        <div style={{
          height: 40, borderRadius: 8, overflow: 'hidden', display: 'flex',
          marginBottom: 16,
        }}>
          {stages.map((s) => (
            <div key={s.name} style={{
              flex: s.pct, background: s.color, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 9, color: '#FFF', fontWeight: 600, letterSpacing: 0.5,
              opacity: 0.85,
            }}>
              {s.pct >= 15 ? `${s.name} ${s.pct}%` : `${s.pct}%`}
            </div>
          ))}
        </div>

        {/* Stage Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
          {stages.map((s) => (
            <div key={s.name} style={{
              padding: 14, borderRadius: 12, background: BG_CARD,
              border: `1px solid ${BORDER}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: s.color }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: TEXT, letterSpacing: 0.3 }}>{s.name}</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 500, color: TEXT }}>{s.dur}</div>
              <div style={{ fontSize: 11, color: TEXT_DIM, marginTop: 4 }}>Target: {s.target}</div>
              <div style={{ fontSize: 11, color: TEXT_DIM, marginTop: 4, lineHeight: 1.4 }}>{s.interp}</div>
            </div>
          ))}
        </div>

        {/* Overnight Vitals */}
        <div style={{ ...spacedCaps, marginBottom: 12 }}>Overnight Vitals</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
          {[
            { label: 'Heart Rate', data: overnightHR, color: '#E74C3C', unit: 'bpm' },
            { label: 'HRV', data: overnightHRV, color: SLEEP, unit: 'ms' },
            { label: 'Breathing Rate', data: overnightBR, color: '#5B8DEF', unit: 'br/min' },
            { label: 'SpO2', data: overnightSpO2, color: '#4ECDC4', unit: '%' },
          ].map((v) => (
            <div key={v.label} style={{
              padding: 12, borderRadius: 12, background: BG_CARD,
              border: `1px solid ${BORDER}`,
            }}>
              <div style={{ fontSize: 10, color: TEXT_DIM, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>{v.label}</div>
              <LineChart data={v.data} color={v.color} width={140} height={60} />
              <div style={{ fontSize: 10, color: TEXT_DIM, marginTop: 4 }}>
                Avg: {Math.round(v.data.reduce((a, b) => a + b) / v.data.length)} {v.unit}
              </div>
            </div>
          ))}
        </div>

        {/* Sleep Bank */}
        <div style={{ ...spacedCaps, marginBottom: 12 }}>Sleep Bank</div>
        <div style={{
          padding: 16, borderRadius: 14, background: BG_CARD,
          border: `1px solid ${BORDER}`, marginBottom: 28,
        }}>
          <div style={{ fontSize: 14, color: TEXT, fontWeight: 500, marginBottom: 12 }}>
            Balance: <span style={{ color: '#4ECDC4' }}>+0h 15m</span> above baseline
          </div>
          {/* Mini bar chart for sleep bank */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 50 }}>
            {sleepBank.map((v, i) => {
              const h = Math.abs(v) * 60;
              const isPositive = v >= 0;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '100%', height: h, borderRadius: 3,
                    background: isPositive ? '#4ECDC4' : GOLD_LT,
                    opacity: 0.7,
                    marginTop: isPositive ? 50 - h : 50 - h,
                  }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 9, color: TEXT_DIM }}>{d}</div>
            ))}
          </div>
        </div>

        {/* Coaching */}
        <div style={{ ...spacedCaps, marginBottom: 12 }}>Sanctum Recommendation</div>
        <div style={{
          padding: 18, borderRadius: 14, background: `${GOLD}06`,
          border: `1px solid ${GOLD}15`,
        }}>
          <div style={{ fontSize: 14, color: TEXT_DIM, lineHeight: 1.7 }}>
            With {today.sleep.total} of sleep at {today.sleep.efficiency}% efficiency, your sleep architecture
            is well-balanced. Your {today.sleep.deep} of deep sleep exceeded the target range, which is particularly
            beneficial for physical recovery. REM duration of {today.sleep.rem} supports cognitive consolidation.
            Maintain your current bedtime to preserve this rhythm.
          </div>
        </div>
      </div>
    </>
  );
}

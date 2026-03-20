import React from 'react';
import { user, today, weeklyHRV } from '../../data/fake.js';
import { BG, BG_CARD, GOLD, GOLD_LT, TEXT, TEXT_DIM, CREAM, BORDER, RECOVERY, ICONS, spacedCaps, btnReset } from './palette.js';
import AuroraHeader from './components/AuroraHeader.jsx';
import StatLine from './components/StatLine.jsx';
import LineChart from './components/LineChart.jsx';

const hrvData30 = [
  58,60,55,62,64,61,59,63,66,64,68,65,62,67,70,68,64,66,69,71,
  65,68,70,67,72,68,66,70,68,68,
];

export default function RecoverySuite({ onBack }) {
  const score = today.readiness.score;

  return (
    <>
      <AuroraHeader colorScheme="recovery" height={180}>
        <button onClick={onBack} style={{ ...btnReset, display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={ICONS.back} />
          </svg>
          <span style={{ marginLeft: 6, color: GOLD, fontSize: 13, fontWeight: 500 }}>Lobby</span>
        </button>
        <div style={{ fontSize: 22, fontWeight: 300, color: TEXT, letterSpacing: 0.5 }}>Recovery Suite</div>
        <div style={{ fontSize: 14, color: RECOVERY, marginTop: 4, fontWeight: 500 }}>{score}% Optimal</div>
      </AuroraHeader>

      <div style={{ padding: '24px 20px 40px' }}>
        {/* Score Ring */}
        <div style={{
          padding: 24, borderRadius: 16, background: BG_CARD,
          border: `1px solid ${BORDER}`, textAlign: 'center', marginBottom: 28,
        }}>
          <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto' }}>
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="60" fill="none" stroke={`${RECOVERY}15`} strokeWidth="8" />
              <circle cx="70" cy="70" r="60" fill="none" stroke={RECOVERY} strokeWidth="8"
                strokeLinecap="round" strokeDasharray={`${(score / 100) * 377} 377`}
                transform="rotate(-90 70 70)" />
            </svg>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontSize: 36, fontWeight: 600, color: TEXT }}>{score}</div>
              <div style={{ fontSize: 11, color: TEXT_DIM, marginTop: 2 }}>Recovery</div>
            </div>
          </div>
          <div style={{ marginTop: 16, fontSize: 14, color: TEXT_DIM, lineHeight: 1.6, fontStyle: 'italic' }}>
            &ldquo;Your recovery is exceptional this morning.&rdquo;
          </div>
          <div style={{ width: '100%', height: 1, background: `${GOLD}20`, marginTop: 20 }} />
        </div>

        {/* Vital Signs */}
        <div style={{ ...spacedCaps, marginBottom: 12 }}>Vital Signs</div>
        <div style={{ padding: '0 4px' }}>
          <StatLine label="Heart Rate Variability" value={`${today.readiness.hrv} ms`} trend="up" trendLabel="Above average" />
          <StatLine label="Resting Heart Rate" value={`${today.readiness.restingHR} bpm`} trend="normal" trendLabel="Normal" />
          <StatLine label="Blood Oxygen" value={`${today.readiness.spo2}%`} trend="optimal" trendLabel="Optimal" />
          <StatLine label="Wrist Temperature" value={today.readiness.bodyTemp} trend="normal" trendLabel="Baseline" showBorder={false} />
        </div>

        {/* 30-Day HRV Trend */}
        <div style={{ ...spacedCaps, marginTop: 28, marginBottom: 12 }}>HRV Over 30 Days</div>
        <div style={{
          padding: 16, borderRadius: 14, background: BG_CARD, border: `1px solid ${BORDER}`,
        }}>
          <LineChart
            data={hrvData30} color={RECOVERY} width={310} height={120}
            avgLine={65} avgColor={GOLD_LT}
            bandLow={55} bandHigh={72} bandColor={`${RECOVERY}08`}
          />
        </div>

        {/* Sleep Contribution */}
        <div style={{
          marginTop: 24, padding: 16, borderRadius: 14,
          background: BG_CARD, border: `1px solid ${BORDER}`,
        }}>
          <div style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.6 }}>
            Last night&apos;s sleep contributed <span style={{ color: RECOVERY, fontWeight: 600 }}>+6 points</span> to your recovery.
          </div>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, height: 6, borderRadius: 3, background: `${RECOVERY}15` }}>
              <div style={{ width: `${today.sleep.score}%`, height: '100%', borderRadius: 3, background: RECOVERY }} />
            </div>
            <span style={{ fontSize: 13, color: TEXT, fontWeight: 500 }}>{today.sleep.score}/100</span>
          </div>
        </div>

        {/* Coaching */}
        <div style={{ ...spacedCaps, marginTop: 28, marginBottom: 12 }}>Sanctum Recommendation</div>
        <div style={{
          padding: 18, borderRadius: 14, background: `${GOLD}06`,
          border: `1px solid ${GOLD}15`,
        }}>
          <div style={{ fontSize: 14, color: TEXT_DIM, lineHeight: 1.7 }}>
            Your HRV of {today.readiness.hrv}ms is well above your 30-day average of 65ms, indicating
            excellent autonomic balance. With a resting heart rate of {today.readiness.restingHR}bpm and
            SpO2 at {today.readiness.spo2}%, your body is primed for peak performance. Consider
            capitalizing on this recovery window with a high-intensity training session.
          </div>
        </div>
      </div>
    </>
  );
}

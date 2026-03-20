import React from 'react';
import { today } from '../../data/fake.js';
import { BG_CARD, GOLD, GOLD_LT, TEXT, TEXT_DIM, CREAM, BORDER, STRAIN, RECOVERY, ICONS, spacedCaps, btnReset } from './palette.js';
import AuroraHeader from './components/AuroraHeader.jsx';
import StatLine from './components/StatLine.jsx';
import LineChart from './components/LineChart.jsx';

const hrZones = [
  { zone: 1, label: 'Rest', pct: 8, color: '#6B7280' },
  { zone: 2, label: 'Light', pct: 22, color: '#4ECDC4' },
  { zone: 3, label: 'Moderate', pct: 35, color: '#5B8DEF' },
  { zone: 4, label: 'Hard', pct: 25, color: STRAIN },
  { zone: 5, label: 'Max', pct: 10, color: '#E74C3C' },
];

const weeklyStrain = [8.2, 10.5, 14.1, 11.8, 9.6, 12.4, 12.4];

export default function PerformanceStudio({ onBack }) {
  const strain = today.strain;

  return (
    <>
      <AuroraHeader colorScheme="strain" height={180}>
        <button onClick={onBack} style={{ ...btnReset, display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={ICONS.back} />
          </svg>
          <span style={{ marginLeft: 6, color: GOLD, fontSize: 13, fontWeight: 500 }}>Lobby</span>
        </button>
        <div style={{ fontSize: 22, fontWeight: 300, color: TEXT, letterSpacing: 0.5 }}>Performance Studio</div>
        <div style={{ fontSize: 14, color: STRAIN, marginTop: 4, fontWeight: 500 }}>{strain.toFixed(1)} Strain</div>
      </AuroraHeader>

      <div style={{ padding: '24px 20px 40px' }}>
        {/* Today's Programme */}
        <div style={{ ...spacedCaps, marginBottom: 12 }}>Today&apos;s Programme</div>
        <div style={{
          padding: 20, borderRadius: 16, background: BG_CARD,
          border: `1px solid ${BORDER}`, marginBottom: 28,
        }}>
          <div style={{ fontSize: 18, fontWeight: 500, color: TEXT }}>{today.workout.name}</div>
          <div style={{ fontSize: 13, color: TEXT_DIM, marginTop: 4 }}>9:00 AM &middot; 45 minutes</div>

          {/* Stats row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', marginTop: 16,
            padding: '14px 0', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`,
          }}>
            {[
              { label: 'Avg HR', value: '138' },
              { label: 'Max HR', value: '172' },
              { label: 'Calories', value: '287' },
              { label: 'Strain', value: '11.2' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: TEXT_DIM, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: TEXT }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* HR Zone bar */}
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 10, color: TEXT_DIM, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Heart Rate Zones</div>
            <div style={{ height: 24, borderRadius: 6, overflow: 'hidden', display: 'flex' }}>
              {hrZones.map((z) => (
                <div key={z.zone} style={{
                  flex: z.pct, background: z.color, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 8, color: '#FFF', fontWeight: 600, opacity: 0.85,
                }}>
                  {z.pct >= 15 ? `Z${z.zone}` : ''}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              {hrZones.map((z) => (
                <div key={z.zone} style={{ fontSize: 9, color: TEXT_DIM, textAlign: 'center', flex: z.pct }}>
                  {z.pct}%
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div style={{ ...spacedCaps, marginBottom: 12 }}>Activity Summary</div>
        <div style={{ padding: '0 4px', marginBottom: 28 }}>
          <StatLine label="Steps Today" value={`${today.activity.steps.toLocaleString()} / 10,000`} trend="up" trendLabel="goal" />
          <StatLine label="Active Calories" value={`${today.activity.calories} kcal`} trend="normal" trendLabel="" />
          <StatLine label="Active Minutes" value={`${today.activity.activeMinutes} min`} trend="normal" trendLabel="" />
          <StatLine label="Total Strain" value={`${strain.toFixed(1)} / 21.0 max`} trend="normal" trendLabel="" showBorder={false} />
        </div>

        {/* 7-Day Training Load */}
        <div style={{ ...spacedCaps, marginBottom: 12 }}>7-Day Training Load</div>
        <div style={{
          padding: 16, borderRadius: 14, background: BG_CARD, border: `1px solid ${BORDER}`,
          marginBottom: 28,
        }}>
          <LineChart
            data={weeklyStrain} color={STRAIN} width={310} height={120}
            avgLine={11.3} avgColor={GOLD_LT}
            labels={['M','T','W','T','F','S','S']}
          />
        </div>

        {/* Coaching */}
        <div style={{ ...spacedCaps, marginBottom: 12 }}>Sanctum Recommendation</div>
        <div style={{
          padding: 18, borderRadius: 14, background: `${GOLD}06`,
          border: `1px solid ${GOLD}15`,
        }}>
          <div style={{ fontSize: 14, color: TEXT_DIM, lineHeight: 1.7 }}>
            Your strain of {strain.toFixed(1)} is moderate, sitting comfortably within your recovery capacity of {today.readiness.score}%.
            With {today.activity.steps.toLocaleString()} steps and {today.activity.calories} active calories logged,
            you have room for an evening zone 2 session. A 30-minute easy run or cycle would complement
            today&apos;s upper body work without compromising tomorrow&apos;s recovery.
          </div>
        </div>
      </div>
    </>
  );
}

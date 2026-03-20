import React from 'react';
import { user, today, weeklyHRV, weeklySleep, weeklyActivity } from '../../data/fake.js';
import { BG_CARD, GOLD, GOLD_LT, TEXT, TEXT_DIM, BORDER, RECOVERY, SLEEP, STRAIN, ICONS, spacedCaps, btnReset } from './palette.js';
import AuroraHeader from './components/AuroraHeader.jsx';
import ServiceCard from './components/ServiceCard.jsx';
import Sparkline from './components/Sparkline.jsx';

const VITALS = [
  { label: 'HRV', value: today.readiness.hrv, unit: 'ms', data: weeklyHRV, trend: '\u2191' },
  { label: 'RHR', value: today.readiness.restingHR, unit: 'bpm', data: [55,54,53,53,52,52,52], trend: '\u2193' },
  { label: 'SpO2', value: today.readiness.spo2, unit: '%', data: [97,98,98,97,98,98,98], trend: '\u2192' },
  { label: 'Temp', value: '+0.2', unit: '\u00b0F', data: [0.1,0.0,-0.1,0.1,0.2,0.1,0.2], trend: '\u2192' },
  { label: 'Steps', value: today.activity.steps.toLocaleString(), unit: '', data: [6200,7400,9100,8800,7600,8432,8432], trend: '\u2191' },
  { label: 'Cal', value: today.activity.calories, unit: 'kcal', data: [320,410,520,390,450,487,487], trend: '\u2191' },
];

export default function LobbyScreen({ navigate, onExit }) {
  const recScore = today.readiness.score;
  const slpScore = today.sleep.score;
  const strScore = today.strain;

  return (
    <>
      <AuroraHeader colorScheme="lobby" height={200}>
        <div style={{ ...spacedCaps, fontSize: 10, marginBottom: 6 }}>{today.date}</div>
        <div style={{ fontSize: 28, fontWeight: 300, color: TEXT, letterSpacing: 0.5 }}>
          Good evening, {user.name}.
        </div>
        <div style={{ fontSize: 13, color: TEXT_DIM, marginTop: 6, lineHeight: 1.5 }}>
          Your recovery is strong. A demanding session awaits.
        </div>
      </AuroraHeader>

      <div style={{ padding: '0 20px 40px' }}>
        {/* Exit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 0 0' }}>
          <button onClick={onExit} style={{ ...btnReset, padding: 8, borderRadius: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEXT_DIM} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={ICONS.exit} />
            </svg>
          </button>
        </div>

        {/* Daily Briefing */}
        <div style={{
          marginTop: 8, padding: 20, borderRadius: 14,
          background: BG_CARD, border: `1px solid ${BORDER}`,
        }}>
          <div style={{ ...spacedCaps, fontSize: 10, marginBottom: 16 }}>Today&apos;s Briefing</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            {[
              { label: 'Recovery', value: recScore, color: recScore >= 80 ? '#4ECDC4' : recScore >= 60 ? GOLD : '#E74C3C' },
              { label: 'Sleep', value: slpScore, color: slpScore >= 85 ? '#4ECDC4' : slpScore >= 70 ? GOLD : '#E74C3C' },
              { label: 'Strain', value: strScore.toFixed(1), color: strScore >= 14 ? '#E74C3C' : strScore >= 8 ? GOLD : '#4ECDC4' },
            ].map((d) => (
              <div key={d.label}>
                <div style={{ ...spacedCaps, fontSize: 9, marginBottom: 8 }}>{d.label}</div>
                <div style={{ fontSize: 28, fontWeight: 600, color: TEXT, lineHeight: 1 }}>{d.value}</div>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: d.color, margin: '8px auto 0' }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, fontSize: 13, color: TEXT_DIM, lineHeight: 1.5, textAlign: 'center' }}>
            All systems optimal. Today is a high-performance day.
          </div>
        </div>

        {/* Today's Services */}
        <div style={{ ...spacedCaps, marginTop: 32, marginBottom: 14 }}>Today&apos;s Services</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <ServiceCard
            icon={ICONS.recovery} title="Recovery Suite" score={recScore}
            status={recScore >= 80 ? 'Optimal' : 'Adequate'} statusColor={RECOVERY}
            onTap={() => navigate('recovery')}
          />
          <ServiceCard
            icon={ICONS.sleep} title="Sleep Chamber" score={slpScore}
            status={slpScore >= 85 ? 'Restored' : 'Fair'} statusColor={SLEEP}
            onTap={() => navigate('sleep')}
          />
          <ServiceCard
            icon={ICONS.strain} title="Performance Studio" score={strScore.toFixed(1)}
            status={strScore < 14 ? 'Ready' : 'Active'} statusColor={STRAIN}
            onTap={() => navigate('strain')}
          />
        </div>

        {/* Vitals */}
        <div style={{ ...spacedCaps, marginTop: 32, marginBottom: 14 }}>Vitals at a Glance</div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
        }}>
          {VITALS.map((v, i) => (
            <div key={i} style={{
              padding: '14px 12px', background: BG_CARD,
              border: `1px solid ${BORDER}`, borderRadius: 12,
            }}>
              <div style={{ ...spacedCaps, fontSize: 9, marginBottom: 8 }}>{v.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                <span style={{ fontSize: 20, fontWeight: 600, color: TEXT }}>{v.value}</span>
                {v.unit && <span style={{ fontSize: 10, color: TEXT_DIM }}>{v.unit}</span>}
              </div>
              <div style={{ marginTop: 8 }}>
                <Sparkline data={v.data} width={80} height={24} color={GOLD_LT} />
              </div>
              <div style={{ fontSize: 10, color: TEXT_DIM, marginTop: 4 }}>{v.trend}</div>
            </div>
          ))}
        </div>

        {/* Latest Entry */}
        <div style={{
          marginTop: 24, padding: '14px 16px', borderRadius: 12,
          background: BG_CARD, border: `1px solid ${BORDER}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ ...spacedCaps, fontSize: 9, marginBottom: 4 }}>Latest Entry</div>
            <div style={{ fontSize: 13, color: TEXT_DIM }}>Feeling energized after morning training.</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEXT_DIM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={ICONS.chevron} />
          </svg>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 40, textAlign: 'center', fontSize: 11, color: TEXT_DIM,
          letterSpacing: 1, opacity: 0.5,
        }}>
          Aura Sanctum &middot; Est. 2026
        </div>
      </div>
    </>
  );
}

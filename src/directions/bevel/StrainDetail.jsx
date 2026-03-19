import React from 'react';
import ScoreRing from './components/ScoreRing';
import HatchedRing from './components/HatchedRing';
import TrendRow from './components/TrendRow';

const BG = '#0F1117';
const SURFACE = '#1A1E25';
const SURFACE2 = '#22272F';
const BORDER = '#2A3040';
const TEXT = '#FFFFFF';
const TEXT2 = '#8A8FA8';
const STRAIN_COLOR = '#F0943A';
const RECOVERY_COLOR = '#6ECC6E';
const SLEEP_COLOR = '#7B8EF0';
const COACHING_LABEL = '#C9A050';

export default function StrainDetail({ navigate, openModal }) {
  const trends = [
    { icon: '🔥', label: 'Strain Score', value: '59%', status: '→ Normal range', statusColor: TEXT2, sparkData: [45,52,58,55,60,57,59] },
    { icon: '⏱', label: 'Exercise Duration', value: '34m', status: '→ Normal range', statusColor: TEXT2, sparkData: [30,35,40,32,38,36,34] },
    { icon: '❤️', label: 'Daytime HR', value: '72 bpm', status: '→ Normal range', statusColor: TEXT2, sparkData: [70,72,74,71,73,72,72] },
    { icon: '⚡', label: 'Total Energy', value: '8.2k kJ', status: '→ Normal range', statusColor: TEXT2, sparkData: [7.5,8.0,8.5,8.2,8.4,8.1,8.2] },
    { icon: '👟', label: 'Step Count', value: '8,432', status: '→ Normal range', statusColor: TEXT2, sparkData: [7500,8000,8500,8200,8400,8300,8432] },
  ];

  return (
    <div style={{ background: 'linear-gradient(160deg, #1A0E08 0%, #2A1408 50%, #1A1010 100%)', minHeight: '100vh', color: TEXT, paddingBottom: 40 }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 0' }}>
        <div style={{ fontSize: 24, cursor: 'pointer', width: 40 }} onClick={() => navigate('home')}>←</div>
        <div style={{ fontWeight: 700, fontSize: 18 }}>Strain</div>
        <div style={{ display: 'flex', gap: 16, width: 40, justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 18, cursor: 'pointer' }}>↗</span>
          <span style={{ fontSize: 18, cursor: 'pointer' }}>🔔</span>
        </div>
      </div>

      {/* Date */}
      <div style={{ textAlign: 'center', color: TEXT2, fontSize: 14, marginTop: 8 }}>Feb 18, 2026 ▾</div>

      {/* Hatched Ring */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '24px 0' }}>
        <HatchedRing value={59} color={STRAIN_COLOR} trackColor='#3A2A18' label="Strain" size={120} targetMin={41} targetMax={63} />
        <div style={{ fontSize: 13, color: TEXT2, marginTop: 10 }}>Target Strain: 41 – 63%</div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'flex', gap: 12, padding: '0 20px', marginBottom: 16 }}>
        <div style={{ background: SURFACE, borderRadius: 14, padding: 14, flex: 1 }}>
          <div style={{ fontSize: 14, marginBottom: 4 }}>⏱ Duration</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>34m</div>
        </div>
        <div style={{ background: SURFACE, borderRadius: 14, padding: 14, flex: 1 }}>
          <div style={{ fontSize: 14, marginBottom: 4 }}>🔥 Total Energy</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>8,200 kJ</div>
        </div>
      </div>

      {/* Coaching card */}
      <div style={{ background: SURFACE, borderRadius: 14, padding: 16, margin: '16px 20px' }}>
        <div style={{ color: COACHING_LABEL, fontSize: 11, letterSpacing: 1.5, fontWeight: 600, marginBottom: 8 }}>COACHING</div>
        <div style={{ fontSize: 14, lineHeight: 1.5, color: TEXT }}>Your strain is within the optimal target zone. This level supports recovery while maintaining fitness gains.</div>
      </div>

      {/* View insights */}
      <div style={{ background: SURFACE, borderRadius: 14, padding: 14, margin: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
        <span style={{ fontSize: 14 }}>✨ View insights</span>
        <span style={{ color: TEXT2, fontSize: 18 }}>›</span>
      </div>

      {/* Timeline */}
      <div style={{ padding: '0 20px', marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Timeline</div>
          <div style={{ fontSize: 22, cursor: 'pointer', color: TEXT2 }}>+</div>
        </div>
        <div
          style={{ background: SURFACE, borderRadius: 14, padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
          onClick={() => openModal('workout-detail')}
        >
          <div style={{ position: 'relative', width: 40, height: 40 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#3A2A18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🧗</div>
            <div style={{ position: 'absolute', bottom: -4, right: -4, background: STRAIN_COLOR, color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 8, padding: '1px 5px', minWidth: 20, textAlign: 'center' }}>12</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Upper Body Strength</div>
            <div style={{ fontSize: 12, color: TEXT2, marginTop: 2 }}>Today at 9:00 AM</div>
          </div>
          <div style={{ color: TEXT2, fontSize: 20 }}>›</div>
        </div>
      </div>

      {/* Trends */}
      <div style={{ padding: '0 20px', marginTop: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Trends</div>
        {trends.map((t, i) => (
          <TrendRow
            key={i}
            icon={t.icon}
            label={t.label}
            value={t.value}
            status={t.status}
            statusColor={t.statusColor}
            sparkData={t.sparkData}
            sparkColor={STRAIN_COLOR}
            onPress={() => openModal('trend-detail', { metric: t.label, category: 'strain', color: STRAIN_COLOR })}
          />
        ))}
      </div>
    </div>
  );
}

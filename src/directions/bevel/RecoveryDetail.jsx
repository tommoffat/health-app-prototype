import Icon from './components/Icon'
import React from 'react';
import ScoreRing from './components/ScoreRing';
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

export default function RecoveryDetail({ navigate, openModal }) {
  const trends = [
    { icon: '💚', label: 'Recovery Score', value: '84%', status: '↑ Above normal', statusColor: '#6ECC6E', sparkData: [72,76,80,78,82,83,84] },
    { icon: '〰️', label: 'Resting HRV', value: '68 ms', status: '↑ Above normal', statusColor: '#5B8DEF', sparkData: [61,64,68,65,70,68,68] },
    { icon: 'heart', label: 'Resting HR', value: '52 bpm', status: '→ Normal range', statusColor: TEXT2, sparkData: [54,53,52,53,52,52,52] },
    { icon: '🫁', label: 'Respiratory Rate', value: '15.7 rpm', status: '→ Normal range', statusColor: TEXT2, sparkData: [15.2,15.5,15.8,15.6,15.7,15.7,15.7] },
    { icon: 'droplets', label: 'Oxygen Saturation', value: '98%', status: '→ Normal range', statusColor: TEXT2, sparkData: [97,98,98,97,98,98,98] },
    { icon: 'thermometer', label: 'Wrist Temperature', value: '97.6°F', status: '→ Normal', statusColor: TEXT2, sparkData: [97.4,97.5,97.6,97.5,97.6,97.6,97.6] },
  ];

  return (
    <div style={{ background: 'linear-gradient(160deg, #080E1A 0%, #0A1828 50%, #0D1020 100%)', minHeight: '100vh', color: TEXT, paddingBottom: 40 }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 0' }}>
        <button style={{ background: 'none', border: 'none', color: TEXT, cursor: 'pointer', width: 40, padding: 0, display: 'flex', alignItems: 'center' }} onClick={() => navigate('home')}><svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M15 18l-6-6 6-6'/></svg></button>
        <div style={{ fontWeight: 700, fontSize: 18 }}>Recovery</div>
        <div style={{ display: 'flex', gap: 16, width: 40, justifyContent: 'flex-end' }}>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' style={{cursor:'pointer'}}><path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8'/><polyline points='16 6 12 2 8 6'/><line x1='12' y1='2' x2='12' y2='15'/></svg>
          
        </div>
      </div>

      {/* Date */}
      <div style={{ textAlign: 'center', color: TEXT2, fontSize: 14, marginTop: 8 }}>Feb 18, 2026 ▾</div>

      {/* Score Ring */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
        <ScoreRing value={84} color={RECOVERY_COLOR} trackColor='#1A301A' label="Recovered" size={120} />
      </div>

      {/* Stat cards */}
      <div style={{ display: 'flex', gap: 12, padding: '0 20px', marginBottom: 16 }}>
        <div style={{ background: SURFACE, borderRadius: 14, padding: 14, flex: 1 }}>
          <div style={{ fontSize: 14, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}><Icon name="zap" size={14} color={TEXT2} strokeWidth={1.75}/>Resting HRV</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>68 ms</div>
          <div style={{ fontSize: 13, color: '#5B8DEF', marginTop: 4 }}>↑ Higher</div>
        </div>
        <div style={{ background: SURFACE, borderRadius: 14, padding: 14, flex: 1 }}>
          <div style={{ fontSize: 14, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}><Icon name="heart" size={14} color={TEXT2} strokeWidth={1.75}/>Resting HR</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>52 bpm</div>
          <div style={{ fontSize: 13, color: TEXT2, marginTop: 4 }}>→ Normal</div>
        </div>
      </div>

      {/* Coaching card */}
      <div style={{ background: SURFACE, borderRadius: 14, padding: 16, margin: '16px 20px' }}>
        <div style={{ color: COACHING_LABEL, fontSize: 11, letterSpacing: 1.5, fontWeight: 600, marginBottom: 8 }}>COACHING</div>
        <div style={{ fontSize: 14, lineHeight: 1.5, color: TEXT }}>Your recovery is strong today. HRV trending upward suggests good adaptation to recent training load.</div>
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
          onClick={() => openModal('primary-sleep')}
        >
          <div style={{ position: 'relative', width: 40, height: 40 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1E2240', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="moon" size={20} color="#7B8EF0" strokeWidth={1.75}/></div>
            <div style={{ position: 'absolute', bottom: -4, right: -4, background: SLEEP_COLOR, color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 8, padding: '1px 5px', minWidth: 20, textAlign: 'center' }}>87</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Primary sleep</div>
            <div style={{ fontSize: 12, color: TEXT2, marginTop: 2 }}>3/19/26 at 11:02 PM</div>
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
            sparkColor={RECOVERY_COLOR}
            onPress={() => openModal('trend-detail', { metric: t.label, category: 'recovery', color: RECOVERY_COLOR })}
          />
        ))}
      </div>
    </div>
  );
}

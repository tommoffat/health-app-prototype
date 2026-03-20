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

export default function SleepDetail({ navigate, openModal }) {
  const trends = [
    { icon: '😴', label: 'Sleep Score', value: '87%', status: '↑ Above normal', statusColor: '#6ECC6E', sparkData: [79,83,91,85,88,87,87] },
    { icon: '⏰', label: 'Time Asleep', value: '7h 22m', status: '↑ Above normal', statusColor: '#6ECC6E', sparkData: [6.5,7.0,7.5,7.2,7.8,7.3,7.4] },
    { icon: 'brain', label: 'REM Sleep', value: '1h 58m', status: '→ Normal range', statusColor: TEXT2, sparkData: [1.5,1.8,2.1,1.7,2.0,1.9,2.0] },
    { icon: '🌊', label: 'Deep Sleep', value: '1h 44m', status: '↑ Above normal', statusColor: '#6ECC6E', sparkData: [1.2,1.5,1.8,1.6,1.7,1.7,1.7] },
    { icon: '🛏', label: 'Time in Bed', value: '7h 45m', status: '→ Normal range', statusColor: TEXT2, sparkData: [7.2,7.5,8.0,7.8,7.9,7.7,7.8] },
    { icon: 'bar-chart', label: 'Sleep Efficiency', value: '94%', status: '↑ Above normal', statusColor: '#6ECC6E', sparkData: [90,92,95,93,94,94,94] },
  ];

  return (
    <div style={{ background: 'linear-gradient(160deg, #1A1040 0%, #2A1850 40%, #1A1830 100%)', minHeight: '100vh', color: TEXT, paddingBottom: 40 }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 0' }}>
        <div style={{ fontSize: 24, cursor: 'pointer', width: 40 }} onClick={() => navigate('home')}>←</div>
        <div style={{ fontWeight: 700, fontSize: 18 }}>Sleep</div>
        <div style={{ display: 'flex', gap: 16, width: 40, justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 18, cursor: 'pointer' }}>↗</span>
          <span style={{ fontSize: 18, cursor: 'pointer' }}>🔔</span>
        </div>
      </div>

      {/* Date */}
      <div style={{ textAlign: 'center', color: TEXT2, fontSize: 14, marginTop: 8 }}>Feb 18, 2026 ▾</div>

      {/* Score Ring */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
        <ScoreRing value={87} color={SLEEP_COLOR} trackColor='#1E2240' label="Quality" size={120} />
      </div>

      {/* Stat cards */}
      <div style={{ display: 'flex', gap: 12, padding: '0 20px', marginBottom: 16 }}>
        <div style={{ background: SURFACE, borderRadius: 14, padding: 14, flex: 1 }}>
          <div style={{ fontSize: 14, marginBottom: 4 }}>🛏 Time in Bed</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>7h 22m</div>
          <div style={{ fontSize: 13, color: TEXT2, marginTop: 4 }}>→ Normal</div>
        </div>
        <div style={{ background: SURFACE, borderRadius: 14, padding: 14, flex: 1 }}>
          <div style={{ fontSize: 14, marginBottom: 4 }}>⏰ Time Asleep</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>7h 10m</div>
          <div style={{ fontSize: 13, color: '#6ECC6E', marginTop: 4 }}>↑ Higher</div>
        </div>
      </div>

      {/* Coaching card */}
      <div style={{ background: SURFACE, borderRadius: 14, padding: 16, margin: '16px 20px' }}>
        <div style={{ color: COACHING_LABEL, fontSize: 11, letterSpacing: 1.5, fontWeight: 600, marginBottom: 8 }}>COACHING</div>
        <div style={{ fontSize: 14, lineHeight: 1.5, color: TEXT }}>Your sleep quality was excellent last night. Deep sleep at 23% is above average.</div>
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
            sparkColor={SLEEP_COLOR}
            onPress={() => openModal('trend-detail', { metric: t.label, category: 'sleep', color: SLEEP_COLOR })}
          />
        ))}
      </div>
    </div>
  );
}

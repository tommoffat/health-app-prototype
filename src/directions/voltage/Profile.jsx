import React from 'react';
import { user, today } from '../../data/fake';

const c = {
  bg: '#0A0A00', surface: '#111100', accent: '#CCFF00',
  text: '#FFFFFF', dim: '#888877', border: '#222200',
};
const heavy = { fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif', fontWeight: 900 };

export default function Profile({ onBack, onExit }) {
  const settings = [
    { label: 'Units', value: 'Imperial' },
    { label: 'Notifications', value: 'On' },
    { label: 'Wrist', value: 'Left' },
    { label: 'Heart Rate Zones', value: 'Auto' },
    { label: 'Sleep Goal', value: '8h 00m' },
    { label: 'Step Goal', value: '10,000' },
    { label: 'Data Export', value: '' },
  ];

  return (
    <div style={{ padding: '0 16px 100px' }}>
      <div
        onClick={onBack}
        style={{ ...heavy, fontSize: 13, color: c.accent, cursor: 'pointer', marginBottom: 16, letterSpacing: 1 }}
      >
        ← BACK
      </div>

      {/* Avatar + name */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', background: c.accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 12px',
        }}>
          <span style={{ ...heavy, fontSize: 28, color: c.bg }}>{user.initials}</span>
        </div>
        <div style={{ ...heavy, fontSize: 24, color: c.text }}>{user.name}</div>
        <div style={{ ...heavy, fontSize: 11, letterSpacing: 2, color: c.dim, marginTop: 4 }}>
          {today.weight} LBS · MEMBER SINCE 2024
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
        {[
          { label: 'AVG SLEEP', value: '85' },
          { label: 'AVG HRV', value: '66' },
          { label: 'STREAK', value: '12d' },
        ].map((s) => (
          <div key={s.label} style={{
            background: c.surface, borderRadius: 10, padding: '12px 8px', textAlign: 'center',
          }}>
            <div style={{ ...heavy, fontSize: 8, letterSpacing: 2, color: c.dim }}>{s.label}</div>
            <div style={{ ...heavy, fontSize: 22, color: c.accent, marginTop: 2 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Settings list */}
      <div style={{ background: c.surface, borderRadius: 12, padding: '4px 16px', marginBottom: 16 }}>
        {settings.map((s, i) => (
          <div key={s.label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 0',
            borderBottom: i < settings.length - 1 ? `1px solid ${c.border}` : 'none',
          }}>
            <span style={{ ...heavy, fontSize: 14, fontWeight: 700, color: c.text }}>{s.label}</span>
            <span style={{ ...heavy, fontSize: 13, color: c.dim }}>{s.value} ›</span>
          </div>
        ))}
      </div>

      {/* Change Direction button */}
      <div
        onClick={onExit}
        style={{
          ...heavy, fontSize: 13, letterSpacing: 3, textAlign: 'center',
          padding: '16px 0', borderRadius: 12, cursor: 'pointer',
          background: c.accent, color: c.bg,
          textTransform: 'uppercase',
        }}
      >
        CHANGE DIRECTION
      </div>

      <div style={{
        ...heavy, fontSize: 10, letterSpacing: 2, color: c.dim, textAlign: 'center', marginTop: 20,
      }}>
        VOLTAGE v1.0 · BUILD 2026.03
      </div>
    </div>
  );
}

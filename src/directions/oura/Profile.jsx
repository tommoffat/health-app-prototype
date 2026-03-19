import React from 'react';
import { user, today } from '../../data/fake.js';

const c = {
  bg: '#0B0E13',
  surface: '#131920',
  surfaceAlt: '#1E2530',
  accent: '#E8A04B',
  text: '#EAEAEA',
  secondary: '#7A8899',
  border: '#2A3545',
};

function SettingRow({ label, value, last }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 18px',
      borderBottom: last ? 'none' : `1px solid ${c.border}`,
    }}>
      <span style={{ color: c.text, fontSize: 14 }}>{label}</span>
      <span style={{ color: c.secondary, fontSize: 14 }}>{value} &#8250;</span>
    </div>
  );
}

export default function Profile({ onExit }) {
  return (
    <div style={{
      minHeight: '100%', background: c.bg, padding: '20px 20px 32px',
      fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif',
    }}>
      {/* Avatar + Name */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
        <div style={{
          width: 80, height: 80, borderRadius: 40,
          background: `linear-gradient(135deg, ${c.accent}, #D4893A)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 14,
        }}>
          <span style={{ color: '#0B0E13', fontSize: 28, fontWeight: 700 }}>{user.initials}</span>
        </div>
        <h2 style={{ color: c.text, fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>{user.name}</h2>
        <p style={{ color: c.secondary, fontSize: 13, margin: 0 }}>Member since Jan 2024</p>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'flex', gap: 12, marginBottom: 24,
      }}>
        {[
          { label: 'Weight', value: `${today.weight} lbs` },
          { label: 'Avg HRV', value: '66 ms' },
          { label: 'Avg Sleep', value: '7h 15m' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12,
            padding: '14px 12px', textAlign: 'center',
          }}>
            <div style={{ color: c.text, fontSize: 16, fontWeight: 700 }}>{s.value}</div>
            <div style={{ color: c.secondary, fontSize: 11, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div style={{
        background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14,
        overflow: 'hidden', marginBottom: 16,
      }}>
        <SettingRow label="Notifications" value="On" />
        <SettingRow label="Units" value="Imperial" />
        <SettingRow label="Sleep Goal" value="8h" />
        <SettingRow label="Step Goal" value="10,000" />
        <SettingRow label="Data Export" value="" last />
      </div>

      {/* Account Settings */}
      <div style={{
        background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14,
        overflow: 'hidden', marginBottom: 24,
      }}>
        <SettingRow label="Account" value="" />
        <SettingRow label="Privacy" value="" />
        <SettingRow label="Help & Support" value="" last />
      </div>

      {/* Change Direction */}
      <button onClick={onExit} style={{
        width: '100%', padding: '16px 0', borderRadius: 14,
        background: 'transparent', border: `1px solid ${c.accent}`,
        color: c.accent, fontSize: 15, fontWeight: 600,
        cursor: 'pointer', transition: 'all 0.2s ease',
        marginBottom: 12,
      }}>
        Change Direction
      </button>

      <p style={{ textAlign: 'center', color: c.secondary, fontSize: 11, margin: 0 }}>
        Oura Direction &middot; v1.0
      </p>
    </div>
  );
}

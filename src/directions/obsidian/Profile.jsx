import React from 'react';
import { user } from '../../data/fake';

const mono = '"SF Mono", "Fira Code", "Cascadia Code", monospace';
const sans = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const accent = '#7C6EFA';
const secondary = '#8888AA';
const border = '#1A1A2E';

function BackButton({ navigate }) {
  return (
    <button onClick={() => navigate('today')} style={{
      background: 'none', border: 'none', color: accent, fontFamily: mono, fontSize: 12,
      cursor: 'pointer', padding: '4px 0', letterSpacing: 0.5, marginBottom: 8,
    }}>{'< BACK'}</button>
  );
}

function SettingRow({ label, value, last }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 0', borderBottom: last ? 'none' : `1px solid ${border}`,
    }}>
      <span style={{ fontFamily: sans, fontSize: 14, color: '#FFF' }}>{label}</span>
      <span style={{ fontFamily: mono, fontSize: 12, color: secondary }}>{value}</span>
    </div>
  );
}

export default function Profile({ navigate, onExit }) {
  const devices = [
    { name: 'Oura Ring Gen 3', status: 'Connected' },
    { name: 'WHOOP 4.0', status: 'Connected' },
    { name: 'Apple Watch Ultra', status: 'Paired' },
  ];

  const settings = [
    { label: 'Notifications', value: 'ON' },
    { label: 'Units', value: 'Imperial' },
    { label: 'Dark Mode', value: 'Always' },
    { label: 'Data Export', value: 'CSV' },
    { label: 'Privacy', value: 'Strict' },
  ];

  return (
    <div style={{ padding: '16px 16px 24px' }}>
      <BackButton navigate={navigate} />

      {/* Avatar + Name */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '24px 0 32px' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', border: `2px solid ${accent}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: mono, fontSize: 28, fontWeight: 700, color: accent, marginBottom: 12,
        }}>{user.initials}</div>
        <div style={{ fontFamily: sans, fontSize: 22, fontWeight: 700, color: '#FFF', marginBottom: 4 }}>{user.name}</div>
        <div style={{ fontFamily: mono, fontSize: 11, color: secondary, letterSpacing: 1 }}>PRO PLAN</div>
      </div>

      {/* Connected Devices */}
      <div style={{ border: `1px solid ${border}`, borderRadius: 8, padding: '14px 16px', marginBottom: 16 }}>
        <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, marginBottom: 12 }}>CONNECTED DEVICES</div>
        {devices.map((d, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 0', borderBottom: i < devices.length - 1 ? `1px solid ${border}` : 'none',
          }}>
            <span style={{ fontFamily: sans, fontSize: 14, color: '#FFF' }}>{d.name}</span>
            <span style={{ fontFamily: mono, fontSize: 10, color: '#4ADE80', letterSpacing: 0.5 }}>{d.status.toUpperCase()}</span>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div style={{ border: `1px solid ${border}`, borderRadius: 8, padding: '14px 16px', marginBottom: 24 }}>
        <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, marginBottom: 8 }}>SETTINGS</div>
        {settings.map((s, i) => (
          <SettingRow key={i} label={s.label} value={s.value} last={i === settings.length - 1} />
        ))}
      </div>

      {/* Change Direction Button */}
      <button onClick={onExit} style={{
        width: '100%', padding: '16px', background: 'transparent', border: `1px solid ${accent}`,
        borderRadius: 8, fontFamily: mono, fontSize: 13, fontWeight: 600, color: accent,
        cursor: 'pointer', letterSpacing: 1.5,
      }}>CHANGE DIRECTION</button>

      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <span style={{ fontFamily: mono, fontSize: 10, color: secondary + '80' }}>OBSIDIAN v1.0.0</span>
      </div>
    </div>
  );
}

import React from 'react';
import { user } from '../../data/fake';

const c = {
  bg: '#0F1218', surface: '#181E28', surfaceAlt: '#1E2535',
  amber: '#E8A04B', coral: '#FF8C42', text: '#F0F4F8', muted: '#8899AA',
  red: '#FF6B6B',
};

export default function Profile({ onBack, onExit }) {
  const settings = [
    { label: 'Health Goals', value: 'Recovery Focused' },
    { label: 'Units', value: 'Imperial' },
    { label: 'Notifications', value: 'On' },
    { label: 'Bedtime Reminder', value: '10:15 PM' },
    { label: 'Connected Devices', value: 'Oura Ring, Apple Watch' },
    { label: 'Data Export', value: '' },
    { label: 'Privacy', value: '' },
  ];

  const stats = [
    { label: 'Member Since', value: 'Jan 2024' },
    { label: 'Total Workouts', value: '247' },
    { label: 'Avg Sleep Score', value: '84' },
    { label: 'Best Streak', value: '34 days' },
  ];

  const cardStyle = {
    background: c.surface, borderRadius: 16, padding: 18,
    border: '1px solid rgba(255,255,255,0.04)', marginBottom: 14,
  };

  return (
    <div style={{ padding: '0 16px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 0' }}>
        <div onClick={onBack} style={{
          width: 32, height: 32, borderRadius: 10, background: c.surface,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke={c.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
          Profile
        </div>
      </div>

      {/* Avatar + Name */}
      <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 18px' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: `linear-gradient(135deg, ${c.amber}, ${c.coral})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, fontWeight: 700, color: '#0F1218',
          fontFamily: 'SF Pro Display, -apple-system, sans-serif',
          marginBottom: 12,
        }}>
          {user.initials}
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
          {user.name}
        </div>
        <div style={{ fontSize: 13, color: c.muted, marginTop: 4, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
          Premium Member
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: c.surface, borderRadius: 14, padding: 14, textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
              {s.value}
            </div>
            <div style={{ fontSize: 11, color: c.muted, marginTop: 4, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div style={cardStyle}>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 12, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
          Settings
        </div>
        {settings.map((s, i) => (
          <div key={s.label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 0',
            borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <div style={{ fontSize: 14, color: c.text, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
              {s.label}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {s.value && (
                <span style={{ fontSize: 13, color: c.muted, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
                  {s.value}
                </span>
              )}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3L9 7L5 11" stroke={c.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Change Direction Button */}
      <div onClick={onExit} style={{
        background: `linear-gradient(135deg, ${c.amber}, ${c.coral})`,
        borderRadius: 14, padding: '16px 0', textAlign: 'center', cursor: 'pointer',
        fontSize: 15, fontWeight: 700, color: '#0F1218',
        fontFamily: 'SF Pro Display, -apple-system, sans-serif',
        marginBottom: 14,
      }}>
        Change Direction
      </div>

      {/* Sign out */}
      <div style={{
        background: c.surface, borderRadius: 14, padding: '14px 0', textAlign: 'center',
        cursor: 'pointer', fontSize: 14, fontWeight: 600, color: c.red,
        border: '1px solid rgba(255,107,107,0.15)',
        fontFamily: 'SF Pro Text, -apple-system, sans-serif',
      }}>
        Sign Out
      </div>
    </div>
  );
}

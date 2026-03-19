import React from 'react';
import { user } from '../../data/fake';

const GlassCard = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 20,
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  }}>{children}</div>
);

const BackButton = ({ onClick }) => (
  <button onClick={onClick} style={{
    background: 'none', border: 'none', color: '#C9A96E', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 6, padding: 0, fontFamily: 'inherit',
    fontSize: 14, fontWeight: '500',
  }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
    Today
  </button>
);

const SettingsRow = ({ label, value, isLast }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 0',
    borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)',
  }}>
    <span style={{ fontSize: 15, color: '#E6EDF3', fontWeight: '400' }}>{label}</span>
    <span style={{ fontSize: 14, color: '#8B949E', fontWeight: '400' }}>{value}</span>
  </div>
);

export default function Profile({ navigate, onExit }) {
  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { label: 'Name', value: user.name },
        { label: 'Email', value: 'tom@example.com' },
        { label: 'Membership', value: 'Premium' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { label: 'Units', value: 'Imperial' },
        { label: 'Bedtime Goal', value: '10:30 PM' },
        { label: 'Step Goal', value: '10,000' },
        { label: 'Notifications', value: 'On' },
      ],
    },
    {
      title: 'Integrations',
      items: [
        { label: 'Apple Health', value: 'Connected' },
        { label: 'Oura Ring', value: 'Connected' },
        { label: 'Whoop', value: 'Not Connected' },
      ],
    },
  ];

  return (
    <div style={{ padding: '56px 20px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <BackButton onClick={() => navigate('today')} />
      <div style={{ fontSize: 24, fontWeight: '600', letterSpacing: -0.3 }}>Profile</div>

      {/* Avatar + Name */}
      <GlassCard style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 32 }}>
        <div style={{
          width: 80, height: 80, borderRadius: 40,
          background: 'linear-gradient(135deg, #C9A96E, #E8D5A8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, fontWeight: '700', color: '#0D1117',
          letterSpacing: 1,
          boxShadow: '0 4px 24px rgba(201,169,110,0.2)',
        }}>
          {user.initials}
        </div>
        <div style={{ fontSize: 22, fontWeight: '600', color: '#E6EDF3', marginTop: 16 }}>{user.name}</div>
        <div style={{ fontSize: 14, color: '#8B949E', marginTop: 4, fontWeight: '400' }}>Premium Member</div>
      </GlassCard>

      {/* Settings Groups */}
      {settingsGroups.map((group) => (
        <GlassCard key={group.title}>
          <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>{group.title}</div>
          {group.items.map((item, i) => (
            <SettingsRow key={item.label} label={item.label} value={item.value} isLast={i === group.items.length - 1} />
          ))}
        </GlassCard>
      ))}

      {/* Change Direction Button */}
      <button onClick={onExit} style={{
        width: '100%', padding: '16px 0', borderRadius: 14, border: 'none',
        background: 'linear-gradient(135deg, #C9A96E, #E8D5A8)',
        color: '#0D1117', fontSize: 16, fontWeight: '600', cursor: 'pointer',
        fontFamily: 'inherit', letterSpacing: 0.3,
        boxShadow: '0 4px 20px rgba(201,169,110,0.15)',
      }}>
        Change Direction
      </button>

      {/* Logout */}
      <button style={{
        width: '100%', padding: '14px 0', borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.04)',
        color: '#8B949E', fontSize: 15, fontWeight: '500', cursor: 'pointer',
        fontFamily: 'inherit',
      }}>
        Sign Out
      </button>

      <div style={{ textAlign: 'center', padding: '12px 0 20px', fontSize: 12, color: 'rgba(139,148,158,0.5)' }}>
        Aura v1.0 -- Health App Prototype
      </div>
    </div>
  );
}

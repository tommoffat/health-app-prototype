import React from 'react';
import { user } from '../../data/fake';

const s = {
  page: { padding: '0 0 24px 0' },
  sectionHeader: {
    fontSize: 13, fontWeight: '600', color: '#6C6C70', textTransform: 'uppercase',
    letterSpacing: 0.5, padding: '24px 16px 8px 16px',
  },
  profileHeader: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 16px 8px',
  },
  avatar: {
    width: 96, height: 96, borderRadius: 48,
    background: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 36, fontWeight: '700', color: '#FFFFFF',
  },
  name: { fontSize: 24, fontWeight: '700', color: '#000', marginTop: 16 },
  email: { fontSize: 15, color: '#6C6C70', marginTop: 4 },
  groupedCard: {
    background: '#FFFFFF', borderRadius: 16, margin: '0 16px',
    boxShadow: '0 0.5px 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
  },
  row: (last) => ({
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 16px', borderBottom: last ? 'none' : '0.5px solid #E5E5EA',
    cursor: 'pointer',
  }),
  rowLabel: { fontSize: 17, color: '#000' },
  rowValue: { display: 'flex', alignItems: 'center', gap: 6 },
  rowDetail: { fontSize: 17, color: '#6C6C70' },
  chevron: { fontSize: 17, color: '#C7C7CC' },
  exitBtn: {
    display: 'block', width: 'calc(100% - 32px)', margin: '24px 16px 0',
    padding: '14px', fontSize: 17, fontWeight: '600',
    background: '#FFFFFF', color: '#007AFF', border: 'none', borderRadius: 16,
    boxShadow: '0 0.5px 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
    cursor: 'pointer', textAlign: 'center',
  },
  destructive: {
    display: 'block', width: 'calc(100% - 32px)', margin: '12px 16px 0',
    padding: '14px', fontSize: 17, fontWeight: '600',
    background: '#FFFFFF', color: '#FF3B30', border: 'none', borderRadius: 16,
    boxShadow: '0 0.5px 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
    cursor: 'pointer', textAlign: 'center',
  },
  version: { textAlign: 'center', fontSize: 13, color: '#C7C7CC', marginTop: 24 },
};

export default function Profile({ onExit }) {
  const settings = [
    { label: 'Notifications', detail: 'On' },
    { label: 'Units', detail: 'Imperial' },
    { label: 'Health Integrations', detail: '' },
    { label: 'Data Export', detail: '' },
  ];

  const account = [
    { label: 'Email', detail: 'tom@example.com' },
    { label: 'Subscription', detail: 'Pro' },
    { label: 'Privacy', detail: '' },
  ];

  return (
    <div style={s.page}>
      <div style={s.profileHeader}>
        <div style={s.avatar}>{user.initials}</div>
        <div style={s.name}>{user.name}</div>
        <div style={s.email}>tom@example.com</div>
      </div>

      <div style={s.sectionHeader}>Settings</div>
      <div style={s.groupedCard}>
        {settings.map((item, i) => (
          <div key={i} style={s.row(i === settings.length - 1)}>
            <span style={s.rowLabel}>{item.label}</span>
            <span style={s.rowValue}>
              {item.detail && <span style={s.rowDetail}>{item.detail}</span>}
              <span style={s.chevron}>›</span>
            </span>
          </div>
        ))}
      </div>

      <div style={s.sectionHeader}>Account</div>
      <div style={s.groupedCard}>
        {account.map((item, i) => (
          <div key={i} style={s.row(i === account.length - 1)}>
            <span style={s.rowLabel}>{item.label}</span>
            <span style={s.rowValue}>
              {item.detail && <span style={s.rowDetail}>{item.detail}</span>}
              <span style={s.chevron}>›</span>
            </span>
          </div>
        ))}
      </div>

      <button style={s.exitBtn} onClick={onExit}>Change Direction</button>
      <button style={s.destructive}>Sign Out</button>

      <div style={s.version}>Meridian v1.0.0</div>
    </div>
  );
}

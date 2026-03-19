import React from 'react';
import { user, today } from '../../data/fake';

const BackArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default function ProfileScreen({ onBack, onExit }) {
  const quickStats = [
    { label: 'Avg Recovery', value: '82%', color: '#34C759' },
    { label: 'Avg Strain', value: '11.8', color: '#FF8C42' },
    { label: 'Avg Sleep', value: '85', color: '#5856D6' },
  ];

  const personalBests = [
    { label: 'Highest HRV', value: '78 ms', date: 'Mar 12' },
    { label: 'Lowest RHR', value: '49 bpm', date: 'Mar 8' },
    { label: 'Best Sleep', value: '96', date: 'Mar 5' },
    { label: 'Max Strain', value: '18.2', date: 'Feb 28' },
  ];

  const settings = [
    'Notifications',
    'Heart Rate Zones',
    'Sleep Goals',
    'Units & Display',
    'Connected Devices',
    'Privacy',
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.headerRow}>
        {onBack && (
          <button style={styles.backBtn} onClick={onBack}>
            <BackArrow />
          </button>
        )}
        <div style={styles.title}>Profile</div>
      </div>

      {/* Avatar */}
      <div style={styles.avatarSection}>
        <div style={styles.avatarRing}>
          <div style={styles.avatar}>
            <span style={styles.avatarText}>{user.initials}</span>
          </div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginTop: 12 }}>{user.name}</div>
        <div style={{ fontSize: 14, color: '#8E8E93', marginTop: 4 }}>Member since Jan 2024</div>
      </div>

      {/* Quick Stats */}
      <div style={styles.statsRow}>
        {quickStats.map((s, i) => (
          <div key={i} style={styles.statCard}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 10, color: '#8E8E93', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Personal Bests */}
      <div style={styles.card}>
        <div style={styles.cardLabel}>PERSONAL BESTS</div>
        {personalBests.map((pb, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: i < personalBests.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
            <span style={{ fontSize: 14, color: '#1A1A1A' }}>{pb.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{pb.value}</span>
              <span style={{ fontSize: 12, color: '#8E8E93' }}>{pb.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div style={styles.card}>
        <div style={styles.cardLabel}>SETTINGS</div>
        {settings.map((s, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: i < settings.length - 1 ? '1px solid #F0F0F0' : 'none', cursor: 'pointer' }}>
            <span style={{ fontSize: 15, color: '#1A1A1A' }}>{s}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        ))}
      </div>

      {/* Change Direction Button */}
      <button style={styles.exitBtn} onClick={onExit}>
        Change Direction
      </button>

      <div style={{ height: 32 }} />
    </div>
  );
}

const styles = {
  container: {
    padding: '16px 16px 0 16px',
    minHeight: '100%',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
    marginBottom: 20,
  },
  backBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    WebkitTapHighlightColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  avatarSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    border: '3px solid #34C759',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    background: '#1A1A1A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 700,
    color: '#FFFFFF',
  },
  statsRow: {
    display: 'flex',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    background: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    textAlign: 'center',
  },
  card: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#8E8E93',
    letterSpacing: 1,
    marginBottom: 8,
  },
  exitBtn: {
    width: '100%',
    padding: '15px 0',
    borderRadius: 14,
    background: '#FFFFFF',
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 600,
    border: '1px solid #FF3B30',
    cursor: 'pointer',
    marginTop: 4,
    WebkitTapHighlightColor: 'transparent',
  },
};

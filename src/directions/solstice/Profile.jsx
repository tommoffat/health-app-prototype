import React from 'react';
import { user } from '../../data/fake';

export default function Profile({ onBack, onExit }) {
  const settings = [
    { label: 'Notifications', value: 'On' },
    { label: 'Units', value: 'Imperial' },
    { label: 'Goal Bedtime', value: '10:30 PM' },
    { label: 'Step Goal', value: '10,000' },
    { label: 'Theme', value: 'Solstice' },
    { label: 'Data Export', value: '' },
    { label: 'Privacy', value: '' },
  ];

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backBtn}>&larr; Back</button>
      <h1 style={styles.title}>You</h1>

      {/* Avatar + Name */}
      <div style={styles.avatarSection}>
        <div style={styles.avatar}>
          <span style={styles.initials}>{user.initials}</span>
        </div>
        <div style={styles.userName}>{user.name}</div>
        <div style={styles.memberSince}>Member since January 2024</div>
      </div>

      {/* Stats Summary */}
      <div style={styles.section}>
        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <div style={styles.statNum}>87</div>
            <div style={styles.statLabel}>Avg Sleep</div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <div style={styles.statNum}>12</div>
            <div style={styles.statLabel}>Day Streak</div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.statBox}>
            <div style={styles.statNum}>68</div>
            <div style={styles.statLabel}>Avg HRV</div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Settings</h2>
        <div style={styles.card}>
          {settings.map((s, i) => (
            <React.Fragment key={i}>
              <div style={styles.settingRow}>
                <span style={{ fontSize: 14, color: '#F5EDD8' }}>{s.label}</span>
                <span style={{ fontSize: 14, color: '#B8A48A', fontFamily: 'Georgia, serif' }}>
                  {s.value || '\u203A'}
                </span>
              </div>
              {i < settings.length - 1 && <div style={styles.divider} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Change Direction */}
      <div style={styles.section}>
        <button style={styles.directionBtn} onClick={onExit}>
          Change Direction
        </button>
      </div>

      {/* Version */}
      <div style={{ textAlign: 'center', marginTop: 12, marginBottom: 32 }}>
        <span style={{ fontSize: 11, color: 'rgba(184,164,138,0.4)', fontFamily: 'Georgia, serif' }}>
          Solstice v1.0 &middot; Health App Prototype
        </span>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '16px 20px' },
  backBtn: { background: 'none', border: 'none', color: '#D4845A', fontFamily: 'Georgia, serif', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 8 },
  title: { fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 26, fontWeight: 400, color: '#F5EDD8', letterSpacing: 0.5, marginBottom: 20 },
  avatarSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 },
  avatar: {
    width: 80, height: 80, borderRadius: '50%',
    background: 'linear-gradient(135deg, #D4845A 0%, #7A9B76 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  initials: { fontFamily: 'Georgia, serif', fontSize: 28, color: '#1A1410', fontWeight: 700 },
  userName: { fontFamily: 'Georgia, serif', fontSize: 22, color: '#F5EDD8' },
  memberSince: { fontSize: 13, color: '#B8A48A', marginTop: 4 },
  section: { marginBottom: 24 },
  statsRow: {
    display: 'flex', background: '#231C15', borderRadius: 14, padding: '18px 16px',
    justifyContent: 'space-around', alignItems: 'center',
  },
  statBox: { textAlign: 'center' },
  statNum: { fontFamily: 'Georgia, serif', fontSize: 24, color: '#D4845A' },
  statLabel: { fontSize: 11, color: '#B8A48A', marginTop: 2 },
  statDivider: { width: 1, height: 36, background: 'rgba(184,164,138,0.12)' },
  sectionTitle: { fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 400, color: '#F5EDD8', marginBottom: 12 },
  card: { background: '#231C15', borderRadius: 14, padding: '12px 18px' },
  settingRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 0' },
  divider: { height: 1, background: 'rgba(184,164,138,0.08)' },
  directionBtn: {
    width: '100%', padding: '14px', background: 'transparent',
    border: '1.5px solid #D4845A', borderRadius: 12,
    color: '#D4845A', fontFamily: 'Georgia, serif', fontSize: 15,
    cursor: 'pointer', letterSpacing: 0.5,
  },
};

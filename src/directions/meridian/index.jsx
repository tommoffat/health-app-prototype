import React, { useState } from 'react';
import Today from './Today.jsx';
import Sleep from './Sleep.jsx';
import Activity from './Activity.jsx';
import Biometrics from './Biometrics.jsx';
import Log from './Log.jsx';
import Progress from './Progress.jsx';
import Profile from './Profile.jsx';
import { today } from '../../data/fake';

const tabs = [
  { key: 'today', label: 'Today', icon: '☀️' },
  { key: 'sleep', label: 'Sleep', icon: '🌙' },
  { key: 'activity', label: 'Activity', icon: '🏃' },
  { key: 'bio', label: 'Bio', icon: '❤️' },
  { key: 'log', label: 'Log', icon: '📝' },
  { key: 'progress', label: 'Progress', icon: '📈' },
  { key: 'profile', label: 'Profile', icon: '👤' },
];

const titles = {
  today: today.date,
  sleep: 'Sleep',
  activity: 'Activity',
  bio: 'Biometrics',
  log: 'Log',
  progress: 'Progress',
  profile: 'Profile',
};

const s = {
  shell: {
    display: 'flex', flexDirection: 'column', height: '100vh',
    background: '#F2F2F7', fontFamily: '-apple-system, SF Pro Display, SF Pro Text, Helvetica Neue, Helvetica, Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased', color: '#000000', maxWidth: 500, margin: '0 auto',
    position: 'relative',
  },
  navBar: {
    background: 'rgba(249,249,249,0.94)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '0.5px solid #C6C6C8', padding: '12px 16px 12px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'sticky', top: 0, zIndex: 100, minHeight: 44,
  },
  navTitle: { fontSize: 17, fontWeight: '600', color: '#000' },
  navLargeTitle: {
    fontSize: 34, fontWeight: '700', color: '#000', padding: '4px 16px 8px',
    background: '#F2F2F7',
  },
  backBtn: {
    position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', color: '#007AFF', fontSize: 17,
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
    fontFamily: 'inherit', padding: '8px',
  },
  content: {
    flex: 1, overflow: 'auto', WebkitOverflowScrolling: 'touch',
  },
  tabBar: {
    background: 'rgba(249,249,249,0.94)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    borderTop: '0.5px solid #C6C6C8', display: 'flex',
    padding: '6px 0 env(safe-area-inset-bottom, 8px)',
    position: 'sticky', bottom: 0, zIndex: 100,
  },
  tab: (active) => ({
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
    background: 'none', border: 'none', padding: '4px 0',
    cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
  }),
  tabIcon: { fontSize: 22, lineHeight: '1' },
  tabLabel: (active) => ({
    fontSize: 10, fontWeight: '500',
    color: active ? '#007AFF' : '#8E8E93',
  }),
};

export default function Meridian({ onExit }) {
  const [tab, setTab] = useState('today');
  const [detail, setDetail] = useState(null);

  const handleNavigate = (screen) => setDetail(screen);
  const handleBack = () => setDetail(null);

  const currentTab = detail || tab;

  const renderScreen = () => {
    switch (currentTab) {
      case 'today': return <Today onNavigate={handleNavigate} />;
      case 'sleep': return <Sleep />;
      case 'activity': return <Activity />;
      case 'bio': return <Biometrics />;
      case 'log': return <Log />;
      case 'progress': return <Progress />;
      case 'profile': return <Profile onExit={onExit} />;
      default: return <Today onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={s.shell}>
      {/* iOS Navigation Bar */}
      <div style={s.navBar}>
        {detail && (
          <button style={s.backBtn} onClick={handleBack}>
            ‹ Back
          </button>
        )}
        <span style={s.navTitle}>{titles[currentTab]}</span>
      </div>

      {/* Content */}
      <div style={s.content}>
        {renderScreen()}
      </div>

      {/* iOS Tab Bar */}
      <div style={s.tabBar}>
        {tabs.map(t => (
          <button key={t.key} style={s.tab(tab === t.key)} onClick={() => { setTab(t.key); setDetail(null); }}>
            <span style={s.tabIcon}>{t.icon}</span>
            <span style={s.tabLabel(tab === t.key)}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

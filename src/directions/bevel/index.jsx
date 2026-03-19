import React, { useState } from 'react';
import TodayScreen from './Today';
import SleepScreen from './Sleep';
import ActivityScreen from './Activity';
import BiometricsScreen from './Biometrics';
import LogScreen from './Log';
import ProgressScreen from './Progress';
import ProfileScreen from './Profile';

const HomeIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const JournalIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="8" y1="7" x2="16" y2="7" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const FitnessIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
  </svg>
);

const BiologyIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const PlusIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default function BevelApp({ onExit }) {
  const [screen, setScreen] = useState('today');
  const [activeTab, setActiveTab] = useState('home');

  const navigate = (s) => setScreen(s);

  const handleTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'home') setScreen('today');
    else if (tab === 'journal') setScreen('log');
    else if (tab === 'plus') setScreen('log');
    else if (tab === 'fitness') setScreen('activity');
    else if (tab === 'biology') setScreen('biometrics');
  };

  const goBack = () => {
    setScreen('today');
    setActiveTab('home');
  };

  const showTabBar = ['today', 'log', 'activity', 'biometrics'].includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case 'today':
        return <TodayScreen onNavigate={navigate} />;
      case 'sleep':
        return <SleepScreen onBack={goBack} />;
      case 'activity':
        return <ActivityScreen onBack={activeTab === 'fitness' ? null : goBack} />;
      case 'biometrics':
        return <BiometricsScreen onBack={activeTab === 'biology' ? null : goBack} />;
      case 'log':
        return <LogScreen />;
      case 'progress':
        return <ProgressScreen onBack={goBack} />;
      case 'profile':
        return <ProfileScreen onBack={goBack} onExit={onExit} />;
      default:
        return <TodayScreen onNavigate={navigate} />;
    }
  };

  const tabColor = (tab) => activeTab === tab ? '#1A1A1A' : '#8E8E93';

  return (
    <div style={styles.shell}>
      <div style={{ ...styles.content, paddingBottom: showTabBar ? 80 : 0 }}>
        {renderScreen()}
      </div>
      {showTabBar && (
        <div style={styles.tabBarOuter}>
          <div style={styles.tabBar}>
            <button style={styles.tabBtn} onClick={() => handleTab('home')}>
              <HomeIcon color={tabColor('home')} />
              <span style={{ ...styles.tabLabel, color: tabColor('home') }}>Home</span>
            </button>
            <button style={styles.tabBtn} onClick={() => handleTab('journal')}>
              <JournalIcon color={tabColor('journal')} />
              <span style={{ ...styles.tabLabel, color: tabColor('journal') }}>Journal</span>
            </button>
            <button style={styles.plusBtn} onClick={() => handleTab('plus')}>
              <PlusIcon />
            </button>
            <button style={styles.tabBtn} onClick={() => handleTab('fitness')}>
              <FitnessIcon color={tabColor('fitness')} />
              <span style={{ ...styles.tabLabel, color: tabColor('fitness') }}>Fitness</span>
            </button>
            <button style={styles.tabBtn} onClick={() => handleTab('biology')}>
              <BiologyIcon color={tabColor('biology')} />
              <span style={{ ...styles.tabLabel, color: tabColor('biology') }}>Biology</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  shell: {
    display: 'flex',
    flexDirection: 'column',
    height: '100dvh',
    overflow: 'hidden',
    background: '#F8F8F8',
    fontFamily: "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
  },
  content: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  tabBarOuter: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '0 12px 10px 12px',
    zIndex: 100,
    pointerEvents: 'none',
  },
  tabBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    background: '#FFFFFF',
    borderRadius: 28,
    boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
    padding: '6px 8px',
    pointerEvents: 'auto',
  },
  tabBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px 12px',
    WebkitTapHighlightColor: 'transparent',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: 0.2,
  },
  plusBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    background: '#1A1A1A',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    WebkitTapHighlightColor: 'transparent',
    flexShrink: 0,
  },
};

import React, { useState } from 'react';
import Today from './Today';
import Sleep from './Sleep';
import Activity from './Activity';
import Biometrics from './Biometrics';
import Log from './Log';
import Progress from './Progress';
import Profile from './Profile';

const tabs = [
  { id: 'today', label: 'Today', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
  { id: 'sleep', label: 'Sleep', icon: 'M12.1 22c-4.9 0-9.1-3.5-9.9-8.3-.2-.9.6-1.7 1.5-1.4C5 12.7 6.4 13 7.9 13c4.4 0 8-3.6 8-8 0-1-.2-2-.5-2.9-.3-.9.5-1.7 1.4-1.5C21.5 2 25 6.8 25 12.1 25 17.6 19.1 22 12.1 22z' },
  { id: 'activity', label: 'Activity', icon: 'M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z' },
  { id: 'biometrics', label: 'Bio', icon: 'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z' },
  { id: 'log', label: 'Log', icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' },
  { id: 'progress', label: 'Progress', icon: 'M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z' },
  { id: 'profile', label: 'Profile', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
];

export default function AuraApp({ onExit }) {
  const [activeTab, setActiveTab] = useState('today');

  const navigate = (tab) => setActiveTab(tab);

  const renderScreen = () => {
    switch (activeTab) {
      case 'today': return <Today navigate={navigate} />;
      case 'sleep': return <Sleep navigate={navigate} />;
      case 'activity': return <Activity navigate={navigate} />;
      case 'biometrics': return <Biometrics navigate={navigate} />;
      case 'log': return <Log navigate={navigate} />;
      case 'progress': return <Progress navigate={navigate} />;
      case 'profile': return <Profile navigate={navigate} onExit={onExit} />;
      default: return <Today navigate={navigate} />;
    }
  };

  return (
    <div style={styles.container}>
      {/* Aurora gradient overlays */}
      <div style={styles.auroraTR} />
      <div style={styles.auroraBL} />

      <div style={styles.content}>
        {renderScreen()}
      </div>

      {/* Tab bar */}
      <div style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.tabButton,
                color: isActive ? '#C9A96E' : '#8B949E',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ marginBottom: 2 }}>
                <path d={tab.icon} />
              </svg>
              <span style={{
                fontSize: 10,
                fontWeight: isActive ? '600' : '400',
                letterSpacing: 0.3,
              }}>{tab.label}</span>
              {isActive && <div style={styles.activeIndicator} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100dvh', overflowY: 'auto', WebkitOverflowScrolling: 'touch',
    background: '#0D1117',
    fontFamily: '-apple-system, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
    color: '#E6EDF3',
    overflow: 'visible',
  },
  auroraTR: {
    position: 'fixed',
    top: '-20%',
    right: '-20%',
    width: '60%',
    height: '60%',
    background: 'radial-gradient(circle, rgba(0,255,204,0.04) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  auroraBL: {
    position: 'fixed',
    bottom: '-20%',
    left: '-20%',
    width: '60%',
    height: '60%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  content: {
    position: 'relative',
    zIndex: 1,
    paddingBottom: 90,
    height: '100dvh', overflowY: 'auto', WebkitOverflowScrolling: 'touch',
  },
  tabBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '8px 0 24px 0',
    background: 'rgba(13,17,23,0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    zIndex: 100,
  },
  tabButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    padding: '4px 8px',
    minWidth: 44,
    fontFamily: 'inherit',
  },
  activeIndicator: {
    position: 'absolute',
    top: -8,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 20,
    height: 2,
    borderRadius: 1,
    background: 'linear-gradient(90deg, #C9A96E, #E8D5A8)',
  },
};

import React, { useState } from 'react';
import Today from './Today';
import Sleep from './Sleep';
import Activity from './Activity';
import Biometrics from './Biometrics';
import Log from './Log';
import Progress from './Progress';
import Profile from './Profile';

const tabs = [
  { key: 'today', label: 'TODAY' },
  { key: 'sleep', label: 'SLEEP' },
  { key: 'activity', label: 'ACTIVITY' },
  { key: 'vitals', label: 'VITALS' },
  { key: 'log', label: 'LOG' },
  { key: 'progress', label: 'PROGRESS' },
  { key: 'profile', label: 'PROFILE' },
];

export default function ObsidianDirection({ onExit }) {
  const [activeTab, setActiveTab] = useState('today');

  const navigate = (tab) => setActiveTab(tab);

  const renderScreen = () => {
    switch (activeTab) {
      case 'today': return <Today navigate={navigate} />;
      case 'sleep': return <Sleep navigate={navigate} />;
      case 'activity': return <Activity navigate={navigate} />;
      case 'vitals': return <Biometrics navigate={navigate} />;
      case 'log': return <Log navigate={navigate} />;
      case 'progress': return <Progress navigate={navigate} />;
      case 'profile': return <Profile navigate={navigate} onExit={onExit} />;
      default: return <Today navigate={navigate} />;
    }
  };

  return (
    <div style={styles.shell}>
      <div style={styles.content}>
        {renderScreen()}
      </div>
      <div style={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              ...styles.tab,
              ...(activeTab === tab.key ? styles.tabActive : {}),
            }}
          >
            <span style={{
              ...styles.tabLabel,
              color: activeTab === tab.key ? '#7C6EFA' : '#8888AA',
            }}>
              {tab.label}
            </span>
            {activeTab === tab.key && <div style={styles.tabIndicator} />}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  shell: {
    display: 'flex',
    flexDirection: 'column',
    height: '100dvh',
    width: '100vw',
    background: '#000000',
    color: '#FFFFFF',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflow: 'visible',
    position: 'relative',
  },
  content: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
  },
  tabBar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#0A0A0A',
    borderTop: '1px solid #1A1A2E',
    padding: '6px 0 env(safe-area-inset-bottom, 8px)',
    flexShrink: 0,
  },
  tab: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px 4px 2px',
    position: 'relative',
    minWidth: 0,
  },
  tabLabel: {
    fontFamily: '"SF Mono", "Fira Code", "Cascadia Code", monospace',
    fontSize: '9px',
    fontWeight: 500,
    letterSpacing: '0.5px',
    whiteSpace: 'nowrap',
  },
  tabActive: {},
  tabIndicator: {
    width: '100%',
    height: '2px',
    background: '#7C6EFA',
    borderRadius: '1px',
  },
};

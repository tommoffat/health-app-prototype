import React, { useState } from 'react';
import Today from './Today';
import Sleep from './Sleep';
import Activity from './Activity';
import Biometrics from './Biometrics';
import Log from './Log';
import Progress from './Progress';
import Profile from './Profile';

const tabs = [
  { key: 'today', label: 'Today' },
  { key: 'sleep', label: 'Rest' },
  { key: 'activity', label: 'Move' },
  { key: 'biometrics', label: 'Vitals' },
  { key: 'profile', label: 'You' },
];

export default function SolsticeApp({ onExit }) {
  const [tab, setTab] = useState('today');
  const [overlay, setOverlay] = useState(null); // 'log', 'progress'

  const navigate = (t) => {
    if (t === 'log' || t === 'progress') {
      setOverlay(t);
    } else {
      setOverlay(null);
      setTab(t);
    }
  };

  const goBack = () => {
    if (overlay) { setOverlay(null); return; }
    setTab('today');
  };

  const renderScreen = () => {
    if (overlay === 'log') return <Log onBack={goBack} />;
    if (overlay === 'progress') return <Progress onBack={goBack} />;
    switch (tab) {
      case 'today': return <Today navigate={navigate} />;
      case 'sleep': return <Sleep onBack={goBack} />;
      case 'activity': return <Activity onBack={goBack} />;
      case 'biometrics': return <Biometrics onBack={goBack} />;
      case 'profile': return <Profile onBack={goBack} onExit={onExit} />;
      default: return <Today navigate={navigate} />;
    }
  };

  return (
    <div style={styles.shell}>
      <div style={styles.content}>
        {renderScreen()}
      </div>
      {!overlay && (
        <div style={styles.tabBar}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                ...styles.tabBtn,
                color: tab === t.key ? '#D4845A' : '#B8A48A',
              }}
            >
              <span style={styles.tabLabel}>{t.label}</span>
              {tab === t.key && <span style={styles.tabDot} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  shell: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    background: '#1A1410',
    color: '#F5EDD8',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    maxWidth: 430,
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  tabBar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '8px 0 24px',
    background: '#1A1410',
    borderTop: '1px solid rgba(184,164,138,0.12)',
    flexShrink: 0,
  },
  tabBtn: {
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: '6px 12px',
    cursor: 'pointer',
  },
  tabLabel: {
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  tabDot: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: '#D4845A',
    display: 'block',
  },
};

import React, { useState } from 'react';
import Today from './Today.jsx';
import Sleep from './Sleep.jsx';
import Activity from './Activity.jsx';
import Biometrics from './Biometrics.jsx';
import Log from './Log.jsx';
import Progress from './Progress.jsx';
import Profile from './Profile.jsx';

const c = {
  bg: '#0B0E13',
  surface: '#131920',
  surfaceAlt: '#1E2530',
  accent: '#E8A04B',
  text: '#EAEAEA',
  secondary: '#7A8899',
  border: '#2A3545',
};

const tabs = [
  { id: 'today', label: 'Today', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' },
  { id: 'vitals', label: 'Vitals', icon: 'M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z' },
  { id: 'myhealth', label: 'My Health', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
];

const healthSubNav = [
  { id: 'log', label: 'Log' },
  { id: 'progress', label: 'Progress' },
  { id: 'profile', label: 'Profile' },
];

function TabIcon({ path, active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? c.accent : c.secondary}>
      <path d={path} />
    </svg>
  );
}

export default function OuraDirection({ onExit }) {
  const [tab, setTab] = useState('today');
  const [screen, setScreen] = useState('today');
  const [healthSub, setHealthSub] = useState('log');

  const handleTabChange = (id) => {
    setTab(id);
    if (id === 'today') setScreen('today');
    else if (id === 'vitals') setScreen('vitals');
    else if (id === 'myhealth') setScreen('myhealth');
  };

  const handleNavigate = (dest) => {
    setScreen(dest);
  };

  const handleBack = () => {
    setScreen('today');
    setTab('today');
  };

  // Determine if tab bar should be hidden (drill-in screens)
  const showTabBar = screen !== 'sleep' && screen !== 'activity';

  return (
    <div style={{
      height: '100dvh', display: 'flex', flexDirection: 'column',
      background: c.bg, overflow: 'hidden',
      fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif',
    }}>
      {/* Content area */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {screen === 'today' && <Today onNavigate={handleNavigate} />}
        {screen === 'sleep' && <Sleep onBack={handleBack} />}
        {screen === 'activity' && <Activity onBack={handleBack} />}
        {screen === 'vitals' && <Biometrics />}
        {screen === 'myhealth' && (
          <div style={{ minHeight: '100%' }}>
            {/* Sub-navigation */}
            <div style={{
              display: 'flex', gap: 0, background: c.surfaceAlt,
              padding: '12px 20px 0',
            }}>
              {healthSubNav.map(s => (
                <button key={s.id} onClick={() => setHealthSub(s.id)} style={{
                  flex: 1, padding: '10px 0 12px', border: 'none', background: 'transparent',
                  color: healthSub === s.id ? c.accent : c.secondary,
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  borderBottom: healthSub === s.id ? `2px solid ${c.accent}` : '2px solid transparent',
                  transition: 'all 0.2s ease',
                }}>{s.label}</button>
              ))}
            </div>
            {healthSub === 'log' && <Log />}
            {healthSub === 'progress' && <Progress />}
            {healthSub === 'profile' && <Profile onExit={onExit} />}
          </div>
        )}
      </div>

      {/* Bottom Tab Bar */}
      {showTabBar && (
        <div style={{
          display: 'flex', background: c.surface,
          borderTop: `1px solid ${c.border}`,
          padding: '8px 0 20px',
          flexShrink: 0,
        }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => handleTabChange(t.id)} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 4, background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px 0',
            }}>
              <TabIcon path={t.icon} active={tab === t.id} />
              <span style={{
                fontSize: 10, fontWeight: 600,
                color: tab === t.id ? c.accent : c.secondary,
              }}>{t.label}</span>
              {tab === t.id && (
                <div style={{
                  width: 4, height: 4, borderRadius: 2,
                  background: c.accent, marginTop: -2,
                }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

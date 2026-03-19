import React, { useState } from 'react';
import TodayScreen from './Today';
import SleepScreen from './Sleep';
import ActivityScreen from './Activity';
import BiometricsScreen from './Biometrics';
import LogScreen from './Log';
import ProgressScreen from './Progress';
import ProfileScreen from './Profile';

const CORAL = '#FF6B35';
const BG = '#0F0F0F';
const SURFACE = '#1A1A1A';
const WHITE = '#FFFFFF';
const GRAY = '#999999';

const tabs = [
  { id: 'today', label: 'Today', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z' },
  { id: 'sleep', label: 'Sleep', icon: 'M12 3a9 9 0 109 9c0-4.97-4.03-9-9-9z' },
  { id: 'activity', label: 'Activity', icon: 'M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3A7.28 7.28 0 0018 12.5v-2c-1.86-.64-3.42-1.4-4.5-2.5l-1.2-1.3c-.4-.4-1-.6-1.6-.6-.2 0-.3 0-.5.1L6 8.3V13h2V9.6l1.8-.7' },
  { id: 'progress', label: 'Progress', icon: 'M3 13h2v8H3zm4-5h2v13H7zm4-3h2v16h-2zm4 6h2v10h-2zm4-8h2v18h-2z' },
  { id: 'profile', label: 'Profile', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 2 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z' },
];

function TabIcon({ path, active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? WHITE : GRAY}>
      <path d={path} />
    </svg>
  );
}

export default function BevelApp({ onExit }) {
  const [activeTab, setActiveTab] = useState('today');
  const [subScreen, setSubScreen] = useState(null);

  const navigateTo = (screen) => {
    if (['sleep', 'activity', 'biometrics', 'log', 'progress', 'profile'].includes(screen)) {
      if (['sleep', 'activity', 'progress', 'profile'].includes(screen)) {
        setActiveTab(screen);
        setSubScreen(null);
      } else {
        setSubScreen(screen);
      }
    }
  };

  const goBack = () => {
    setSubScreen(null);
    setActiveTab('today');
  };

  const renderScreen = () => {
    // Sub-screens first
    if (subScreen === 'biometrics') return <BiometricsScreen onBack={goBack} />;
    if (subScreen === 'log') return <LogScreen onBack={goBack} />;

    switch (activeTab) {
      case 'today': return <TodayScreen onNavigate={navigateTo} />;
      case 'sleep': return <SleepScreen onBack={goBack} />;
      case 'activity': return <ActivityScreen onBack={goBack} />;
      case 'progress': return <ProgressScreen onBack={goBack} />;
      case 'profile': return <ProfileScreen onBack={goBack} onExit={onExit} />;
      default: return <TodayScreen onNavigate={navigateTo} />;
    }
  };

  return (
    <div style={{
      background: BG, minHeight: '100vh', maxWidth: 430, margin: '0 auto',
      position: 'relative', fontFamily: '-apple-system, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Screen Content */}
      <div style={{ paddingBottom: 64, minHeight: '100vh', overflowY: 'auto' }}>
        {renderScreen()}
      </div>

      {/* Tab Bar */}
      {!subScreen && (
        <div style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 430, background: SURFACE,
          borderTop: `1px solid ${BG}`,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          padding: '8px 0 20px', zIndex: 50,
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <div key={tab.id} onClick={() => { setActiveTab(tab.id); setSubScreen(null); }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  cursor: 'pointer', padding: '4px 12px', position: 'relative'
                }}>
                <TabIcon path={tab.icon} active={isActive} />
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
                  color: isActive ? WHITE : GRAY, textTransform: 'uppercase'
                }}>{tab.label}</span>
                {/* Coral active dot */}
                {isActive && (
                  <div style={{
                    position: 'absolute', bottom: -4, width: 4, height: 4, borderRadius: 2,
                    background: CORAL, boxShadow: `0 0 6px ${CORAL}`
                  }} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import HomeScreen from './HomeScreen.jsx';
import RecoveryDetail from './RecoveryDetail.jsx';
import SleepDetail from './SleepDetail.jsx';
import StrainDetail from './StrainDetail.jsx';
import JournalScreen from './JournalScreen.jsx';
import BiologyScreen from './BiologyScreen.jsx';
import ProfileScreen from './ProfileScreen.jsx';
import LogModal from './LogModal.jsx';

const BG = '#0D1117';
const TEXT = '#F0F0F0';
const TEXT_DIM = '#8B949E';
const BORDER = 'rgba(255,255,255,0.08)';

/* SVG tab bar icons — stroke-based, 24x24 viewBox */
const TAB_ICONS = {
  home: (
    <>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </>
  ),
  journal: (
    <>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M8 7h8M8 11h6" />
    </>
  ),
  activity: (
    <>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </>
  ),
  bio: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  profile: (
    <>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
};

export default function AuraRitualDirection({ onExit }) {
  const [activeTab, setActiveTab] = useState('home');
  const [activeDomain, setActiveDomain] = useState('recovery');
  const [screen, setScreen] = useState('home'); // home | recoveryDetail | sleepDetail | strainDetail
  const [logOpen, setLogOpen] = useState(false);

  const handleNavigate = (target) => setScreen(target);
  const handleBack = () => setScreen('home');

  const renderScreen = () => {
    if (activeTab === 'home') {
      switch (screen) {
        case 'recoveryDetail': return <RecoveryDetail onBack={handleBack} />;
        case 'sleepDetail': return <SleepDetail onBack={handleBack} />;
        case 'strainDetail': return <StrainDetail onBack={handleBack} />;
        default: return (
          <HomeScreen
            onExit={onExit}
            onNavigate={handleNavigate}
            activeDomain={activeDomain}
            setActiveDomain={setActiveDomain}
          />
        );
      }
    }
    switch (activeTab) {
      case 'journal': return <JournalScreen />;
      case 'activity': return <StrainDetail onBack={() => setActiveTab('home')} />;
      case 'bio': return <BiologyScreen />;
      case 'profile': return <ProfileScreen onExit={onExit} />;
      default: return null;
    }
  };

  const tabs = ['home', 'journal', 'activity', 'bio', 'profile'];

  return (
    <div style={{
      position: 'fixed', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 390, background: BG, display: 'flex', flexDirection: 'column',
      paddingTop: 'env(safe-area-inset-top, 0px)', overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: TEXT,
    }}>
      <style>{`
        @keyframes aurora-shift {
          0%, 100% { filter: hue-rotate(0deg) brightness(1); }
          33% { filter: hue-rotate(15deg) brightness(1.05); }
          66% { filter: hue-rotate(-10deg) brightness(0.98); }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* main content */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {renderScreen()}
      </div>

      {/* FAB — log button */}
      <button
        onClick={() => setLogOpen(true)}
        style={{
          position: 'absolute', bottom: 72, right: 20, width: 48, height: 48,
          borderRadius: 24, background: '#C9A96E', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', boxShadow: '0 4px 20px rgba(201,169,110,0.3)',
          zIndex: 50,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0D1117" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      {/* tab bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '6px 0', paddingBottom: 'max(6px, env(safe-area-inset-bottom, 0px))',
        background: BG, borderTop: `1px solid ${BORDER}`,
        flexShrink: 0,
      }}>
        {tabs.map(t => {
          const isActive = t === activeTab;
          return (
            <button
              key={t}
              onClick={() => { setActiveTab(t); setScreen('home'); }}
              style={{
                background: 'none', border: 'none', padding: '6px 12px',
                cursor: 'pointer', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 2,
                opacity: isActive ? 1 : 0.35,
                transition: 'opacity 0.2s ease',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke={isActive ? TEXT : TEXT_DIM} strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round">
                {TAB_ICONS[t]}
              </svg>
            </button>
          );
        })}
      </div>

      {/* log modal */}
      <LogModal open={logOpen} onClose={() => setLogOpen(false)} />
    </div>
  );
}

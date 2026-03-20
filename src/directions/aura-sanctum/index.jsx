import React, { useState } from 'react';
import { BG, GOLD, TEXT_DIM, BORDER, ICONS, btnReset } from './palette.js';
import LobbyScreen from './LobbyScreen.jsx';
import RecoverySuite from './RecoverySuite.jsx';
import SleepChamber from './SleepChamber.jsx';
import PerformanceStudio from './PerformanceStudio.jsx';
import HealthLibrary from './HealthLibrary.jsx';
import GuestDiary from './GuestDiary.jsx';
import ProfileSuite from './ProfileSuite.jsx';
import LogModal from './LogModal.jsx';

const TABS = [
  { id: 'lobby', label: 'Lobby', icon: ICONS.home },
  { id: 'library', label: 'Library', icon: ICONS.library },
  { id: 'journal', label: 'Journal', icon: ICONS.journal },
  { id: 'profile', label: 'Profile', icon: ICONS.profile },
];

export default function AuraSanctumDirection({ onExit }) {
  const [screen, setScreen] = useState('lobby');
  const [logOpen, setLogOpen] = useState(false);

  const navigate = (s) => setScreen(s);
  const goLobby = () => setScreen('lobby');

  const activeTab = ['lobby', 'library', 'journal', 'profile'].includes(screen) ? screen : null;

  const renderScreen = () => {
    switch (screen) {
      case 'lobby':
        return <LobbyScreen navigate={navigate} onExit={onExit} />;
      case 'recovery':
        return <RecoverySuite onBack={goLobby} />;
      case 'sleep':
        return <SleepChamber onBack={goLobby} />;
      case 'strain':
        return <PerformanceStudio onBack={goLobby} />;
      case 'library':
        return <HealthLibrary onBack={goLobby} />;
      case 'journal':
        return <GuestDiary onBack={goLobby} />;
      case 'profile':
        return <ProfileSuite onBack={goLobby} onExit={onExit} />;
      default:
        return <LobbyScreen navigate={navigate} onExit={onExit} />;
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 390, background: BG,
      display: 'flex', flexDirection: 'column',
      paddingTop: 'env(safe-area-inset-top, 0px)',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#E8E4D8',
    }}>
      <style>{`
        @keyframes as-slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes as-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Scrollable content */}
      <div style={{
        flex: 1, minHeight: 0, overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}>
        {renderScreen()}
      </div>

      {/* Tab bar */}
      <div style={{
        flexShrink: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        height: 56, background: BG, borderTop: `1px solid ${BORDER}`,
        paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      }}>
        {TABS.map((tab, i) => {
          const isActive = activeTab === tab.id;
          return (
            <React.Fragment key={tab.id}>
              {i === 2 && (
                <button onClick={() => setLogOpen(true)} style={{
                  ...btnReset, width: 44, height: 44, borderRadius: 22,
                  background: `${GOLD}15`, border: `1px solid ${GOLD}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={ICONS.bell} />
                  </svg>
                </button>
              )}
              <button onClick={() => navigate(tab.id)} style={{
                ...btnReset, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', padding: '6px 12px',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke={isActive ? GOLD : TEXT_DIM}
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tab.icon} />
                </svg>
                <span style={{
                  fontSize: 10, marginTop: 3, letterSpacing: 0.5,
                  color: isActive ? GOLD : TEXT_DIM,
                  fontWeight: isActive ? 600 : 400,
                }}>{tab.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Log Modal */}
      <LogModal open={logOpen} onClose={() => setLogOpen(false)} />
    </div>
  );
}

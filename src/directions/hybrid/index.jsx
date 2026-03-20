import React, { useState } from 'react';
import Today from './Today';
import Sleep from './Sleep';
import Activity from './Activity';
import Biometrics from './Biometrics';
import Log from './Log';
import Progress from './Progress';
import Profile from './Profile';

const c = {
  bg: '#0F1218', surface: '#181E28', surfaceAlt: '#1E2535',
  amber: '#E8A04B', coral: '#FF8C42', text: '#F0F4F8', muted: '#8899AA',
};

const tabs = [
  {
    id: 'today', label: 'Today',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke={active ? c.amber : c.muted} strokeWidth="1.5" />
        <circle cx="11" cy="11" r="3" fill={active ? c.amber : c.muted} />
      </svg>
    ),
  },
  {
    id: 'activity', label: 'Activity',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 16L8 10L12 13L18 6" stroke={active ? c.amber : c.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'log', label: 'Log',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="4" y="4" width="14" height="14" rx="3" stroke={active ? c.amber : c.muted} strokeWidth="1.5" />
        <path d="M8 9H14M8 13H12" stroke={active ? c.amber : c.muted} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'progress', label: 'Progress',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="4" y="12" width="3" height="6" rx="1" fill={active ? c.amber : c.muted} />
        <rect x="9.5" y="8" width="3" height="10" rx="1" fill={active ? c.amber : c.muted} />
        <rect x="15" y="4" width="3" height="14" rx="1" fill={active ? c.amber : c.muted} />
      </svg>
    ),
  },
  {
    id: 'profile', label: 'Profile',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="3.5" stroke={active ? c.amber : c.muted} strokeWidth="1.5" />
        <path d="M4.5 18.5C4.5 15.5 7 13 11 13C15 13 17.5 15.5 17.5 18.5" stroke={active ? c.amber : c.muted} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function HybridDirection({ onExit }) {
  const [activeTab, setActiveTab] = useState('today');
  const [detailScreen, setDetailScreen] = useState(null);

  const goBack = () => setDetailScreen(null);

  const navigateToDetail = (screen) => {
    setDetailScreen(screen);
  };

  const renderScreen = () => {
    if (detailScreen === 'sleep') return <Sleep onBack={goBack} />;
    if (detailScreen === 'biometrics') return <Biometrics onBack={goBack} />;

    switch (activeTab) {
      case 'today':
        return <Today onNavigate={navigateToDetail} />;
      case 'activity':
        return <Activity onBack={() => setActiveTab('today')} />;
      case 'log':
        return <Log onBack={() => setActiveTab('today')} />;
      case 'progress':
        return <Progress onBack={() => setActiveTab('today')} />;
      case 'profile':
        return <Profile onBack={() => setActiveTab('today')} onExit={onExit} />;
      default:
        return <Today onNavigate={navigateToDetail} />;
    }
  };

  return (
    <div style={{
      background: c.bg, height: '100dvh', maxWidth: 430, margin: '0 auto', paddingTop: 'env(safe-area-inset-top, 0px)',
      fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif',
      display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
    }}>
      {/* Scrollable content */}
      <div style={{
        flex: 1, minHeight: 0, overflowY: 'auto', paddingBottom: 72,
        WebkitOverflowScrolling: 'touch',
      }}>
        {renderScreen()}
      </div>

      {/* Tab Bar */}
      {!detailScreen && (
        <div style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 430,
          background: 'rgba(15,18,24,0.92)', backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', justifyContent: 'space-around', alignItems: 'center',
          padding: '6px 0 env(safe-area-inset-bottom, 8px)',
          height: 56, zIndex: 50,
        }}>
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            return (
              <div key={tab.id} onClick={() => { setActiveTab(tab.id); setDetailScreen(null); }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                  cursor: 'pointer', padding: '4px 12px', position: 'relative',
                  transition: 'opacity 0.15s', opacity: active ? 1 : 0.6,
                }}>
                {tab.icon(active)}
                <span style={{
                  fontSize: 10, fontWeight: active ? 600 : 400,
                  color: active ? c.amber : c.muted,
                  fontFamily: 'SF Pro Text, -apple-system, sans-serif',
                }}>
                  {tab.label}
                </span>
                {active && (
                  <div style={{
                    position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%)',
                    width: 20, height: 3, borderRadius: 2, background: c.amber,
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

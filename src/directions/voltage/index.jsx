import React, { useState } from 'react';
import Today from './Today';
import Sleep from './Sleep';
import Activity from './Activity';
import Biometrics from './Biometrics';
import Log from './Log';
import Progress from './Progress';
import Profile from './Profile';

const c = {
  bg: '#0A0A00', surface: '#111100', accent: '#CCFF00',
  text: '#FFFFFF', dim: '#888877',
};
const heavy = { fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif', fontWeight: 900 };

const tabs = [
  { key: 'today', label: 'TODAY' },
  { key: 'sleep', label: 'SLEEP' },
  { key: 'activity', label: 'TRAIN' },
  { key: 'biometrics', label: 'VITALS' },
  { key: 'profile', label: 'ME' },
];

export default function VoltageApp({ onExit }) {
  const [tab, setTab] = useState('today');
  const [stack, setStack] = useState([]);

  const push = (screen) => setStack((s) => [...s, screen]);
  const pop = () => setStack((s) => s.slice(0, -1));

  const currentScreen = stack.length > 0 ? stack[stack.length - 1] : tab;

  const handleNavigate = (screen) => {
    if (tabs.some((t) => t.key === screen)) {
      setTab(screen);
      setStack([]);
    } else {
      push(screen);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'today':
        return <Today onNavigate={handleNavigate} />;
      case 'sleep':
        return <Sleep onBack={stack.length > 0 ? pop : undefined} />;
      case 'activity':
        return <Activity onBack={stack.length > 0 ? pop : undefined} />;
      case 'biometrics':
        return <Biometrics onBack={stack.length > 0 ? pop : undefined} />;
      case 'log':
        return <Log onBack={stack.length > 0 ? pop : undefined} />;
      case 'progress':
        return <Progress onBack={stack.length > 0 ? pop : undefined} />;
      case 'profile':
        return <Profile onBack={stack.length > 0 ? pop : undefined} onExit={onExit} />;
      default:
        return <Today onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{
      background: c.bg, height: '100dvh', paddingTop: 'env(safe-area-inset-top, 0px)', overflowY: 'auto', WebkitOverflowScrolling: 'touch', color: c.text, position: 'relative',
      maxWidth: 430, margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, background: c.bg, zIndex: 100,
      }}>
        <div style={{ ...heavy, fontSize: 18, letterSpacing: 4, color: c.accent }}>VOLTAGE</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div
            onClick={() => handleNavigate('log')}
            style={{
              ...heavy, fontSize: 10, letterSpacing: 2, color: c.bg, background: c.accent,
              padding: '6px 12px', borderRadius: 6, cursor: 'pointer',
            }}
          >
            + LOG
          </div>
          <div
            onClick={() => handleNavigate('progress')}
            style={{
              ...heavy, fontSize: 10, letterSpacing: 2, color: c.accent,
              padding: '6px 12px', borderRadius: 6, cursor: 'pointer',
              border: `1px solid ${c.accent}`,
            }}
          >
            PROGRESS
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ paddingBottom: 70 }}>
        {renderScreen()}
      </div>

      {/* Tab bar — chartreuse active bar on TOP */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 430, background: c.surface, zIndex: 200,
      }}>
        <div style={{ display: 'flex' }}>
          {tabs.map((t) => {
            const active = tab === t.key && stack.length === 0;
            return (
              <div
                key={t.key}
                onClick={() => { setTab(t.key); setStack([]); }}
                style={{
                  flex: 1, textAlign: 'center', padding: '10px 0 14px', cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {/* Top bar indicator */}
                <div style={{
                  position: 'absolute', top: 0, left: '15%', right: '15%', height: 3,
                  background: active ? c.accent : 'transparent', borderRadius: '0 0 2px 2px',
                }} />
                <div style={{
                  ...heavy, fontSize: 10, letterSpacing: 2,
                  color: active ? c.accent : c.dim,
                }}>
                  {t.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

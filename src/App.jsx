import './index.css'
import { useState } from 'react'
import { ThemeContext, themes } from './themes'
import TodayScreen from './screens/TodayScreen'
import SleepScreen from './screens/SleepScreen'
import ActivityScreen from './screens/ActivityScreen'
import BiometricsScreen from './screens/BiometricsScreen'
import LogScreen from './screens/LogScreen'
import ProgressScreen from './screens/ProgressScreen'
import ProfileScreen from './screens/ProfileScreen'

const TABS = [
  { id: 'today', label: 'Today', icon: '🏠' },
  { id: 'sleep', label: 'Sleep', icon: '😴' },
  { id: 'move', label: 'Move', icon: '⚡' },
  { id: 'data', label: 'Data', icon: '📊' },
  { id: 'me', label: 'Me', icon: '👤' },
];

export default function App() {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [activeTab, setActiveTab] = useState('today');
  const [subScreen, setSubScreen] = useState(null); // 'log' | 'progress'

  const renderScreen = () => {
    if (subScreen === 'log') return <LogScreen />;
    if (subScreen === 'progress') return <ProgressScreen onBack={() => setSubScreen(null)} />;

    switch (activeTab) {
      case 'today': return <TodayScreen />;
      case 'sleep': return <SleepScreen />;
      case 'move': return <ActivityScreen />;
      case 'data': return <BiometricsScreen />;
      case 'me': return (
        <ProfileScreen
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          onShowProgress={() => setSubScreen('progress')}
        />
      );
      default: return <TodayScreen />;
    }
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div style={{
        maxWidth: '390px',
        margin: '0 auto',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background: currentTheme.colors.bg,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Scrollable content area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingTop: '52px',
          paddingBottom: '90px',
          paddingLeft: '20px',
          paddingRight: '20px',
          WebkitOverflowScrolling: 'touch',
        }}>
          {renderScreen()}
        </div>

        {/* FAB for Log */}
        {!subScreen && activeTab === 'data' && (
          <button
            onClick={() => setSubScreen('log')}
            style={{
              position: 'absolute',
              bottom: '90px',
              right: '20px',
              width: '56px',
              height: '56px',
              borderRadius: '28px',
              background: currentTheme.colors.accent,
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
          >📝</button>
        )}

        {/* Bottom Tab Bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: currentTheme.colors.surface,
          borderTop: `1px solid ${currentTheme.colors.border}`,
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          backdropFilter: 'blur(20px)',
          zIndex: 20,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '8px 0 6px',
          }}>
            {TABS.map(tab => {
              const isActive = !subScreen && activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSubScreen(null); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    padding: '4px 12px',
                    minWidth: '52px',
                  }}
                >
                  <span style={{ fontSize: '22px', opacity: isActive ? 1 : 0.5 }}>{tab.icon}</span>
                  <span style={{
                    fontFamily: currentTheme.fonts.body,
                    fontSize: '10px',
                    color: isActive ? currentTheme.colors.accent : currentTheme.colors.textSecondary,
                    fontWeight: isActive ? '600' : '400',
                  }}>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

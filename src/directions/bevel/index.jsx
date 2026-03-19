import React, { useState } from 'react'
import Today from './Today'
import Sleep from './Sleep'
import Activity from './Activity'
import Biometrics from './Biometrics'
import Log from './Log'
import Progress from './Progress'
import Profile from './Profile'

const BG = '#F4F3EF'

const tabs = [
  { id: 'today', label: 'Home',
    icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
  { id: 'sleep', label: 'Journal',
    icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' },
  { id: 'log', label: '', icon: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z', center: true },
  { id: 'activity', label: 'Fitness',
    icon: 'M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3A7.28 7.28 0 0018 12.5v-2h-2c-1.86-.64-3.42-1.4-4.5-2.5l-1.2-1.3c-.4-.4-1-.6-1.6-.6-.2 0-.3 0-.5.1L6 8.3V13h2V9.6l1.8-.7' },
  { id: 'biometrics', label: 'Biology',
    icon: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' },
]

export default function BevelApp({ onExit }) {
  const [activeTab, setActiveTab] = useState('today')
  const [subScreen, setSubScreen] = useState(null)

  const goBack = () => {
    setSubScreen(null)
    setActiveTab('today')
  }

  const renderContent = () => {
    if (subScreen === 'sleep-detail') return <Sleep onBack={goBack} />
    if (subScreen === 'activity-detail') return <Activity onBack={goBack} />
    if (subScreen === 'progress') return <Progress onBack={goBack} />
    if (subScreen === 'profile') return <Profile onBack={goBack} onExit={onExit} />

    switch (activeTab) {
      case 'today':
        return (
          <Today
            onNavigate={(s) => {
              if (s === 'sleep') setSubScreen('sleep-detail')
              else if (s === 'activity') setSubScreen('activity-detail')
              else if (s === 'progress') setSubScreen('progress')
              else if (s === 'profile') setSubScreen('profile')
            }}
          />
        )
      case 'sleep':
        return <Sleep onBack={() => setActiveTab('today')} />
      case 'log':
        return <Log />
      case 'activity':
        return <Activity onBack={() => setActiveTab('today')} />
      case 'biometrics':
        return <Biometrics />
      default:
        return <Today onNavigate={() => {}} />
    }
  }

  return (
    <div style={{
      background: BG, height: '100dvh', display: 'flex', flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
      maxWidth: 430, margin: '0 auto', position: 'relative'
    }}>
      <div style={{
        flex: 1, minHeight: 0, overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>
        {renderContent()}
      </div>

      {/* Tab Bar */}
      <div style={{
        height: 83, background: '#FFFFFF',
        boxShadow: '0 -1px 0 rgba(0,0,0,0.08)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around',
        paddingTop: 8, paddingBottom: 'env(safe-area-inset-bottom)',
        flexShrink: 0
      }}>
        {tabs.map(tab => {
          const active = activeTab === tab.id && !subScreen
          if (tab.center) return (
            <button key={tab.id} onClick={() => { setSubScreen(null); setActiveTab('log') }} style={{
              background: '#1A1A1A', borderRadius: 24, width: 48, height: 48,
              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', marginTop: -4
            }}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="white">
                <path d={tab.icon} />
              </svg>
            </button>
          )
          return (
            <button key={tab.id} onClick={() => { setSubScreen(null); setActiveTab(tab.id) }} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '2px 8px'
            }}>
              {active ? (
                <div style={{
                  background: '#1A1A1A', borderRadius: 18, padding: '6px 14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="white">
                    <path d={tab.icon} />
                  </svg>
                </div>
              ) : (
                <svg width={24} height={24} viewBox="0 0 24 24" fill="#AAAAAA">
                  <path d={tab.icon} />
                </svg>
              )}
              <span style={{
                fontSize: 10, color: active ? '#1A1A1A' : '#AAAAAA',
                fontWeight: active ? '600' : '400'
              }}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

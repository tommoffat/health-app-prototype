import { useState } from 'react'
import Today from './Today'

const BG = '#0A0A0A'
const TEXT = '#FFFFFF'
const TEXT_SECONDARY = '#888888'

const tabs = [
  { id: 'home', label: 'Home', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )},
  { id: 'journal', label: 'Journal', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  )},
  { id: 'fitness', label: 'Fitness', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  )},
  { id: 'biology', label: 'Biology', icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )},
  { id: 'add', label: '', icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  )},
]

export default function BevelApp({ onExit }) {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div style={{
      maxWidth: 390, margin: '0 auto', height: '100dvh',
      background: BG, display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch',
        paddingBottom: `calc(83px + var(--safe-bottom))`,
      }}>
        {activeTab === 'home' && <Today />}
        {activeTab === 'journal' && <Placeholder title="Journal" />}
        {activeTab === 'fitness' && <Placeholder title="Fitness" />}
        {activeTab === 'biology' && <Placeholder title="Biology" />}
      </div>

      {/* Bottom tab bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#111111', borderTop: '1px solid #222',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        paddingTop: 8, paddingBottom: `calc(8px + var(--safe-bottom))`,
        height: `calc(83px + var(--safe-bottom))`,
        zIndex: 50,
      }}>
        {tabs.map(tab => {
          const isActive = tab.id === activeTab
          const isAdd = tab.id === 'add'
          if (isAdd) {
            return (
              <button key="add" style={{
                width: 44, height: 44, borderRadius: 22,
                background: '#333', border: 'none', color: TEXT,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {tab.icon}
              </button>
            )
          }
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              background: isActive ? '#2A2A2A' : 'none',
              border: 'none', color: isActive ? TEXT : TEXT_SECONDARY,
              display: 'flex', alignItems: 'center', gap: 6,
              padding: isActive ? '8px 16px' : '8px 12px',
              borderRadius: 20, fontSize: 12, fontWeight: 600,
            }}>
              {tab.icon}
              {isActive && <span>{tab.label}</span>}
            </button>
          )
        })}
      </div>

      {onExit && (
        <button onClick={onExit} style={{
          position: 'fixed', top: 'calc(8px + var(--safe-top))', right: 8,
          background: 'rgba(255,255,255,0.1)', border: 'none', color: '#888',
          width: 32, height: 32, borderRadius: 16, fontSize: 16, zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>
      )}
    </div>
  )
}

function Placeholder({ title }) {
  return (
    <div style={{ padding: '80px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: TEXT }}>{title}</div>
      <div style={{ fontSize: 14, color: TEXT_SECONDARY, marginTop: 8 }}>Coming soon</div>
    </div>
  )
}

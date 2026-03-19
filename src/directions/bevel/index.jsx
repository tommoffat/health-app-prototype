import React, { useState } from 'react'
import HomeScreen from './HomeScreen'
import SleepDetail from './SleepDetail'
import RecoveryDetail from './RecoveryDetail'
import StrainDetail from './StrainDetail'
import JournalScreen from './JournalScreen'
import FitnessScreen from './FitnessScreen'
import BiologyScreen from './BiologyScreen'
import PrimarySleepModal from './PrimarySleepModal'
import TrendDetailModal from './TrendDetailModal'
import WorkoutDetailModal from './WorkoutDetailModal'
import LogModal from './LogModal'

const BG = '#0F1117'
const SURFACE = '#1A1E25'
const TEXT = '#FFFFFF'
const TEXT2 = '#8A8FA8'
const BORDER = '#2A3040'

const tabs = [
  { id: 'home', label: 'Home', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
  { id: 'journal', label: 'Journal', icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6z' },
  { id: 'fitness', label: 'Fitness', icon: 'M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3A7.28 7.28 0 0018 12.5v-2h-2c-1.86-.64-3.42-1.4-4.5-2.5l-1.2-1.3c-.4-.4-1-.6-1.6-.6-.2 0-.3 0-.5.1L6 8.3V13h2V9.6l1.8-.7' },
  { id: 'biology', label: 'Biology', icon: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' },
]

export default function BevelApp({ onExit }) {
  const [screen, setScreen] = useState('home')
  const [screenProps, setScreenProps] = useState({})
  const [modals, setModals] = useState([])

  const navigate = (s, props = {}) => { setScreen(s); setScreenProps(props) }
  const openModal = (type, props = {}) => setModals(prev => [...prev, { type, props }])
  const closeModal = () => setModals(prev => prev.slice(0, -1))

  const screenMap = {
    'home': HomeScreen,
    'sleep-detail': SleepDetail,
    'recovery-detail': RecoveryDetail,
    'strain-detail': StrainDetail,
    'journal': JournalScreen,
    'fitness': FitnessScreen,
    'biology': BiologyScreen,
  }
  const Screen = screenMap[screen] || HomeScreen

  const modalMap = {
    'primary-sleep': PrimarySleepModal,
    'trend-detail': TrendDetailModal,
    'workout-detail': WorkoutDetailModal,
    'log': LogModal,
  }

  // Determine active tab
  const activeTab = ['home', 'journal', 'fitness', 'biology'].includes(screen) ? screen : 'home'

  return (
    <div style={{ maxWidth: 390, margin: '0 auto', background: BG, minHeight: '100vh', position: 'relative', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: TEXT, overflow: 'hidden' }}>
      {/* Exit button */}
      <button onClick={onExit} style={{ position: 'fixed', top: 12, right: 12, zIndex: 200, background: 'rgba(255,255,255,0.1)', border: 'none', color: TEXT2, fontSize: 12, padding: '6px 12px', borderRadius: 8, cursor: 'pointer' }}>✕ Exit</button>

      {/* Main screen */}
      <div style={{ paddingBottom: 83, minHeight: '100vh', overflowY: 'auto' }}>
        <Screen navigate={navigate} openModal={openModal} {...screenProps} />
      </div>

      {/* Bottom tab bar */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 390, height: 83, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 16, boxShadow: '0 -2px 10px rgba(0,0,0,0.1)', zIndex: 100 }}>
        {tabs.map((tab, i) => {
          // Insert + button in the middle (after index 1, i.e., between fitness and biology... actually between journal and fitness positions)
          // Actually the tabs are: Home, Journal, +, Fitness, Biology
          // Let me put the + button between journal and fitness
          return null // handled below
        })}
        {/* Render: Home, Journal, +, Fitness, Biology */}
        {[tabs[0], tabs[1]].map(tab => (
          <button key={tab.id} onClick={() => navigate(tab.id)} style={{ background: activeTab === tab.id ? 'rgba(0,0,0,0.08)' : 'none', border: 'none', display: 'flex', flexDirection: activeTab === tab.id ? 'row' : 'column', alignItems: 'center', gap: activeTab === tab.id ? 6 : 2, padding: activeTab === tab.id ? '8px 16px' : '8px 12px', borderRadius: 18, cursor: 'pointer' }}>
            <svg width={22} height={22} viewBox="0 0 24 24" fill={activeTab === tab.id ? '#000' : '#999'}><path d={tab.icon}/></svg>
            {activeTab === tab.id && <span style={{ fontSize: 12, fontWeight: 600, color: '#000' }}>{tab.label}</span>}
          </button>
        ))}
        {/* + button */}
        <button onClick={() => openModal('log')} style={{ width: 48, height: 48, borderRadius: 24, background: '#000', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
          <svg width={24} height={24} viewBox="0 0 24 24" fill="#FFF"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </button>
        {[tabs[2], tabs[3]].map(tab => (
          <button key={tab.id} onClick={() => navigate(tab.id)} style={{ background: activeTab === tab.id ? 'rgba(0,0,0,0.08)' : 'none', border: 'none', display: 'flex', flexDirection: activeTab === tab.id ? 'row' : 'column', alignItems: 'center', gap: activeTab === tab.id ? 6 : 2, padding: activeTab === tab.id ? '8px 16px' : '8px 12px', borderRadius: 18, cursor: 'pointer' }}>
            <svg width={22} height={22} viewBox="0 0 24 24" fill={activeTab === tab.id ? '#000' : '#999'}><path d={tab.icon}/></svg>
            {activeTab === tab.id && <span style={{ fontSize: 12, fontWeight: 600, color: '#000' }}>{tab.label}</span>}
          </button>
        ))}
      </div>

      {/* Modal stack */}
      {modals.map((modal, i) => {
        const Modal = modalMap[modal.type]
        if (!Modal) return null
        return <Modal key={i} {...modal.props} closeModal={closeModal} openModal={openModal} navigate={navigate} />
      })}
    </div>
  )
}

import React, { useState } from 'react'
import Icon from './components/Icon'
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
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'journal', label: 'Journal', icon: 'journal' },
  { id: 'fitness', label: 'Fitness', icon: 'fitness' },
  { id: 'biology', label: 'Biology', icon: 'biology' },
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
    <div style={{ maxWidth: 390, margin: '0 auto', background: BG, height: '100dvh', position: 'relative', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: TEXT, overflowY: 'auto', WebkitOverflowScrolling: 'touch', paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      {/* Exit button */}
      <button onClick={onExit} style={{ position: 'fixed', top: 12, right: 12, zIndex: 200, background: 'rgba(255,255,255,0.1)', border: 'none', color: TEXT2, fontSize: 12, padding: '6px 12px', borderRadius: 8, cursor: 'pointer' }}>✕ Exit</button>

      {/* Main screen */}
      <div style={{ paddingBottom: 'calc(83px + env(safe-area-inset-bottom, 0px))' }}>
        <Screen navigate={navigate} openModal={openModal} {...screenProps} />
      </div>

      {/* Bottom tab bar */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 390, height: 'calc(83px + env(safe-area-inset-bottom, 0px))', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)', zIndex: 100 }}>
        {tabs.map((tab, i) => {
          // Insert + button in the middle (after index 1, i.e., between fitness and biology... actually between journal and fitness positions)
          // Actually the tabs are: Home, Journal, +, Fitness, Biology
          // Let me put the + button between journal and fitness
          return null // handled below
        })}
        {/* Render: Home, Journal, +, Fitness, Biology */}
        {[tabs[0], tabs[1]].map(tab => (
          <button key={tab.id} onClick={() => navigate(tab.id)} style={{ background: activeTab === tab.id ? 'rgba(0,0,0,0.08)' : 'none', border: 'none', display: 'flex', flexDirection: activeTab === tab.id ? 'row' : 'column', alignItems: 'center', gap: activeTab === tab.id ? 6 : 2, padding: activeTab === tab.id ? '8px 16px' : '8px 12px', borderRadius: 18, cursor: 'pointer' }}>
            <Icon name={tab.icon} size={22} color={activeTab === tab.id ? '#000' : '#999'} strokeWidth={activeTab === tab.id ? 2 : 1.75} />
            {activeTab === tab.id && <span style={{ fontSize: 12, fontWeight: 600, color: '#000' }}>{tab.label}</span>}
          </button>
        ))}
        {/* + button */}
        <button onClick={() => openModal('log')} style={{ width: 48, height: 48, borderRadius: 24, background: '#000', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
          <Icon name="plus" size={24} color="#FFF" strokeWidth={2.5} />
        </button>
        {[tabs[2], tabs[3]].map(tab => (
          <button key={tab.id} onClick={() => navigate(tab.id)} style={{ background: activeTab === tab.id ? 'rgba(0,0,0,0.08)' : 'none', border: 'none', display: 'flex', flexDirection: activeTab === tab.id ? 'row' : 'column', alignItems: 'center', gap: activeTab === tab.id ? 6 : 2, padding: activeTab === tab.id ? '8px 16px' : '8px 12px', borderRadius: 18, cursor: 'pointer' }}>
            <Icon name={tab.icon} size={22} color={activeTab === tab.id ? '#000' : '#999'} strokeWidth={activeTab === tab.id ? 2 : 1.75} />
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

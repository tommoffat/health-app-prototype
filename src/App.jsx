import './index.css'
import { useState } from 'react'

import ObsidianApp from './directions/obsidian/index'
import SolsticeApp from './directions/solstice/index'
import VoltageApp from './directions/voltage/index'
import MeridianApp from './directions/meridian/index'
import AuraApp from './directions/aura/index'
import BevelApp from './directions/bevel/index'
import OuraApp from './directions/oura/index'
import HybridApp from './directions/hybrid/index'

const DIRECTIONS = [
  { id: 'obsidian', name: 'Obsidian', tagline: 'Bloomberg terminal meets fitness', colors: ['#7C6EFA', '#000000'], component: ObsidianApp },
  { id: 'solstice', name: 'Solstice', tagline: 'Warm editorial wellness journal', colors: ['#D4845A', '#1A1410'], component: SolsticeApp },
  { id: 'voltage', name: 'Voltage', tagline: 'Gym energy dashboard', colors: ['#CCFF00', '#0A0A00'], component: VoltageApp },
  { id: 'meridian', name: 'Meridian', tagline: 'iOS-native precision', colors: ['#007AFF', '#F2F2F7'], component: MeridianApp },
  { id: 'aura', name: 'Aura', tagline: 'Luxury spa aurora borealis', colors: ['#C9A96E', '#0D1117'], component: AuraApp },
  { id: 'bevel', name: 'Bevel', tagline: 'Strain recovery sleep system', colors: ['#FF6B35', '#0F0F0F'], component: BevelApp },
  { id: 'oura', name: 'Oura', tagline: 'Circular ring scores', colors: ['#E8A04B', '#0B0E13'], component: OuraApp },
  { id: 'hybrid', name: 'Hybrid', tagline: 'Oura rings in Bevel cards', colors: ['#E8A04B', '#0F1218'], component: HybridApp },
]

export default function App() {
  const [activeDirection, setActiveDirection] = useState(null)

  if (activeDirection) {
    const dir = DIRECTIONS.find(d => d.id === activeDirection)
    const DirectionComponent = dir.component
    return <DirectionComponent onExit={() => setActiveDirection(null)} />
  }

  return (
    <div style={{
      maxWidth: '390px',
      margin: '0 auto',
      minHeight: '100dvh',
      background: '#0A0A0F',
      paddingTop: 'calc(20px + env(safe-area-inset-top, 0px))',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '20px',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
    }}>
      <h1 style={{
        color: '#FFFFFF',
        fontSize: '24px',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '6px',
        marginTop: '40px',
      }}>Health App v2</h1>
      <p style={{
        color: '#888',
        fontSize: '13px',
        textAlign: 'center',
        marginBottom: '28px',
      }}>Choose a design direction</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
      }}>
        {DIRECTIONS.map(dir => (
          <button
            key={dir.id}
            onClick={() => setActiveDirection(dir.id)}
            style={{
              background: '#141418',
              border: '1px solid #2A2A35',
              borderRadius: '16px',
              padding: '20px 16px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              transition: 'transform 0.15s',
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${dir.colors[0]}, ${dir.colors[1]})`,
              border: `2px solid ${dir.colors[0]}33`,
            }} />
            <span style={{ color: '#FFF', fontSize: '16px', fontWeight: '600' }}>{dir.name}</span>
            <span style={{ color: '#777', fontSize: '11px', lineHeight: '1.3' }}>{dir.tagline}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

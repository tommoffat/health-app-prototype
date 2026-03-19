import React, { useState } from 'react'

const BG = '#0F1117'
const SURFACE = '#1A1E25'
const SURFACE2 = '#22272F'
const BORDER = '#2A3040'
const TEXT = '#FFFFFF'
const TEXT2 = '#8A8FA8'

const logTypes = [
  { emoji: '💪', label: 'Workout' },
  { emoji: '😴', label: 'Sleep' },
  { emoji: '🍎', label: 'Nutrition' },
  { emoji: '💊', label: 'Supplement' },
  { emoji: '🧘', label: 'Mindfulness' },
  { emoji: '📝', label: 'Journal' },
]

export default function LogModal({ closeModal }) {
  const [selected, setSelected] = useState(null)
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 150, display: 'flex', alignItems: 'flex-end', background: 'rgba(0,0,0,0.6)' }} onClick={closeModal}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 390, margin: '0 auto', background: SURFACE, borderRadius: '20px 20px 0 0', padding: 24, paddingBottom: 40 }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: BORDER, margin: '0 auto 20px' }} />
        <h3 style={{ fontSize: 20, fontWeight: 700, color: TEXT, marginBottom: 16 }}>Quick Log</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {logTypes.map(t => (
            <button key={t.label} onClick={() => setSelected(t.label)} style={{
              background: selected === t.label ? SURFACE2 : BG, border: `1px solid ${selected === t.label ? TEXT2 : BORDER}`, borderRadius: 14, padding: '16px 8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6
            }}>
              <span style={{ fontSize: 24 }}>{t.emoji}</span>
              <span style={{ fontSize: 12, color: selected === t.label ? TEXT : TEXT2 }}>{t.label}</span>
            </button>
          ))}
        </div>
        {selected && (
          <button onClick={closeModal} style={{ width: '100%', marginTop: 20, padding: 14, borderRadius: 12, background: '#FFFFFF', border: 'none', fontSize: 16, fontWeight: 600, color: '#000', cursor: 'pointer' }}>
            Log {selected}
          </button>
        )}
      </div>
    </div>
  )
}

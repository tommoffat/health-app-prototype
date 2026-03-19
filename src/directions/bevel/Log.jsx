import React, { useState } from 'react'
import { today } from '../../data/fake'

const BG = '#F5F3EE'
const TEXT_PRIMARY = '#1A1A1A'
const TEXT_SECONDARY = '#888888'
const BORDER_LIGHT = '#E5E5E0'

const categories = [
  { key: 'workout', label: 'Workout', color: '#F0943A', emoji: '\uD83C\uDFCB\uFE0F' },
  { key: 'nutrition', label: 'Nutrition', color: '#4CAF50', emoji: '\uD83E\uDD57' },
  { key: 'supplement', label: 'Supplement', color: '#6B7FD7', emoji: '\uD83D\uDC8A' },
  { key: 'mood', label: 'Mood', color: '#E85740', emoji: '\uD83D\uDE0A' },
]

export default function LogScreen() {
  const [modal, setModal] = useState(null)
  const doneCount = today.supplements.filter(s => s.done).length
  const totalCount = today.supplements.length

  return (
    <div style={{ padding: '16px 16px 24px', minHeight: '100%' }}>
      <div style={{ paddingTop: 8, marginBottom: 24 }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: TEXT_PRIMARY, letterSpacing: -0.5 }}>Journal</div>
        <div style={{ fontSize: 15, color: TEXT_SECONDARY, marginTop: 4 }}>Track your daily wellness</div>
      </div>

      {/* Category Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {categories.map((cat) => (
          <button key={cat.key} onClick={() => setModal(cat.key)} style={{
            background: '#FFFFFF', borderRadius: 16, padding: 20, border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)', WebkitTapHighlightColor: 'transparent'
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16, background: `${cat.color}12`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24
            }}>
              {cat.emoji}
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }}>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Today's Log */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SECONDARY, letterSpacing: 1, marginBottom: 10, paddingLeft: 4 }}>TODAY'S LOG</div>
        <div style={{
          background: '#FFFFFF', borderRadius: 14, padding: 16, marginBottom: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 4, height: 36, borderRadius: 2, background: '#F0943A' }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY }}>{today.workout.name}</div>
              <div style={{ fontSize: 13, color: TEXT_SECONDARY, marginTop: 2 }}>{today.workout.setsComplete}/{today.workout.setsTotal} sets</div>
            </div>
          </div>
        </div>
        <div style={{
          background: '#FFFFFF', borderRadius: 14, padding: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 4, height: 36, borderRadius: 2, background: '#6B7FD7' }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY }}>Supplements</div>
              <div style={{ fontSize: 13, color: TEXT_SECONDARY, marginTop: 2 }}>{doneCount}/{totalCount} taken</div>
            </div>
          </div>
        </div>
      </div>

      {/* Supplements Checklist */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SECONDARY, letterSpacing: 1, marginBottom: 10, paddingLeft: 4 }}>SUPPLEMENTS</div>
        <div style={{
          background: '#FFFFFF', borderRadius: 16, padding: '4px 18px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          {today.supplements.map((sup, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0',
              borderBottom: i < today.supplements.length - 1 ? `1px solid ${BORDER_LIGHT}` : 'none'
            }}>
              <span style={{ fontSize: 15, color: sup.done ? TEXT_SECONDARY : TEXT_PRIMARY, textDecoration: sup.done ? 'line-through' : 'none' }}>{sup.name}</span>
              <div style={{
                width: 22, height: 22, borderRadius: 11,
                border: sup.done ? 'none' : `2px solid ${BORDER_LIGHT}`,
                background: sup.done ? '#4CAF50' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {sup.done && (
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SECONDARY, letterSpacing: 1, marginBottom: 10, paddingLeft: 4 }}>UPCOMING</div>
        <div style={{
          background: '#FFFFFF', borderRadius: 16, padding: '4px 18px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          {today.upcoming.map((ev, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0',
              borderBottom: i < today.upcoming.length - 1 ? `1px solid ${BORDER_LIGHT}` : 'none'
            }}>
              <span style={{ fontSize: 14, color: TEXT_PRIMARY }}>{ev.label}</span>
              <span style={{ fontSize: 13, color: TEXT_SECONDARY, fontWeight: 500 }}>{ev.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'flex-end',
          justifyContent: 'center', zIndex: 200
        }} onClick={() => setModal(null)}>
          <div style={{
            background: '#FFFFFF', borderRadius: '20px 20px 0 0', padding: '12px 24px 32px',
            width: '100%', maxWidth: 420
          }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: BORDER_LIGHT, margin: '0 auto 16px' }} />
            <div style={{ fontSize: 18, fontWeight: 700, color: TEXT_PRIMARY, marginBottom: 8, textTransform: 'capitalize' }}>
              Log {modal}
            </div>
            <div style={{ fontSize: 14, color: TEXT_SECONDARY, marginBottom: 20 }}>
              Quick log your {modal} entry for today.
            </div>
            <div style={{ background: BG, borderRadius: 12, padding: '14px 16px', fontSize: 15, color: TEXT_SECONDARY, marginBottom: 16 }}>
              Tap to add details...
            </div>
            <button onClick={() => setModal(null)} style={{
              width: '100%', padding: '14px 0', borderRadius: 14, background: TEXT_PRIMARY,
              color: '#FFFFFF', fontSize: 16, fontWeight: 600, border: 'none', cursor: 'pointer'
            }}>
              Save Entry
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

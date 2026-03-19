import React, { useState } from 'react';
import { today } from '../../data/fake';

const CORAL = '#FF6B35';
const TEAL = '#4ECDC4';
const PURPLE = '#9B59B6';
const BG = '#0F0F0F';
const SURFACE = '#1A1A1A';
const SURFACE2 = '#222222';
const WHITE = '#FFFFFF';
const GRAY = '#999999';

const categories = [
  { id: 'workout', label: 'Workout', icon: '🏋️', color: CORAL, fields: ['Type', 'Duration', 'Intensity'] },
  { id: 'nutrition', label: 'Nutrition', icon: '🥗', color: TEAL, fields: ['Meal', 'Calories', 'Notes'] },
  { id: 'supplement', label: 'Supplement', icon: '💊', color: PURPLE, fields: ['Name', 'Dose', 'Time'] },
  { id: 'journal', label: 'Journal', icon: '📝', color: '#F39C12', fields: ['Mood', 'Energy', 'Notes'] },
];

const todayEntries = [
  { category: 'workout', label: 'Upper Body Strength', time: '8:30 AM', detail: '42 min \u00B7 High intensity' },
  { category: 'supplement', label: 'Omega-3', time: '7:00 AM', detail: '1000mg' },
  { category: 'supplement', label: 'Vitamin D', time: '7:00 AM', detail: '5000 IU' },
  { category: 'nutrition', label: 'Breakfast', time: '7:30 AM', detail: '420 cal \u00B7 High protein' },
  { category: 'journal', label: 'Morning Check-in', time: '6:45 AM', detail: 'Mood: Good \u00B7 Energy: 7/10' },
];

function getCatColor(id) {
  return categories.find(c => c.id === id)?.color || GRAY;
}

export default function LogScreen({ onBack }) {
  const [modal, setModal] = useState(null);

  return (
    <div style={{ background: BG, minHeight: '100%', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div onClick={onBack} style={{ color: GRAY, fontSize: 24, cursor: 'pointer', lineHeight: 1 }}>&#8592;</div>
        <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase' }}>QUICK LOG</div>
      </div>

      {/* 2x2 Category Grid */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {categories.map((cat) => (
            <div key={cat.id} onClick={() => setModal(cat)} style={{
              background: SURFACE, borderRadius: 20, padding: '24px 16px',
              textAlign: 'center', cursor: 'pointer', borderTop: `3px solid ${cat.color}`,
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 50,
                background: `linear-gradient(180deg, ${cat.color}12, transparent)`
              }} />
              <div style={{ fontSize: 32, marginBottom: 8 }}>{cat.icon}</div>
              <div style={{ color: WHITE, fontSize: 14, fontWeight: 800 }}>{cat.label}</div>
              <div style={{ color: GRAY, fontSize: 10, marginTop: 4 }}>Tap to log</div>
            </div>
          ))}
        </div>
      </div>

      {/* Supplement Checklist */}
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Supplement Tracker</div>
        <div style={{ background: SURFACE, borderRadius: 16, padding: '12px 16px', borderTop: `2px solid ${PURPLE}` }}>
          {today.supplements.map((sup, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0',
              borderBottom: i < today.supplements.length - 1 ? `1px solid ${SURFACE2}` : 'none'
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                background: sup.done ? PURPLE : 'transparent',
                border: `2px solid ${sup.done ? PURPLE : GRAY}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: WHITE, fontSize: 12, fontWeight: 700
              }}>
                {sup.done && '\u2713'}
              </div>
              <span style={{
                color: sup.done ? GRAY : WHITE, fontSize: 13, fontWeight: 600,
                textDecoration: sup.done ? 'line-through' : 'none'
              }}>{sup.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Entries */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Today's Entries</div>
        {todayEntries.map((entry, i) => (
          <div key={i} style={{
            background: SURFACE, borderRadius: 14, padding: '12px 16px', marginBottom: 8,
            borderLeft: `3px solid ${getCatColor(entry.category)}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ color: WHITE, fontSize: 13, fontWeight: 700 }}>{entry.label}</div>
              <div style={{ color: GRAY, fontSize: 10, fontWeight: 600 }}>{entry.time}</div>
            </div>
            <div style={{ color: GRAY, fontSize: 11, marginTop: 3 }}>{entry.detail}</div>
          </div>
        ))}
      </div>

      {/* Bottom Sheet Modal */}
      {modal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)', zIndex: 200,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
        }} onClick={() => setModal(null)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: SURFACE, borderRadius: '24px 24px 0 0', padding: '20px 24px 40px',
            width: '100%', maxWidth: 430
          }}>
            {/* Handle */}
            <div style={{ width: 40, height: 4, borderRadius: 2, background: SURFACE2, margin: '0 auto 16px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 24 }}>{modal.icon}</span>
              <span style={{ color: WHITE, fontSize: 18, fontWeight: 900 }}>Log {modal.label}</span>
            </div>
            {modal.fields.map((field, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>{field}</div>
                <div style={{
                  background: SURFACE2, borderRadius: 12, padding: '12px 16px',
                  color: GRAY, fontSize: 14, border: `1px solid ${SURFACE2}`
                }}>
                  Enter {field.toLowerCase()}...
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <div onClick={() => setModal(null)} style={{
                flex: 1, padding: '14px 0', borderRadius: 14, textAlign: 'center',
                background: SURFACE2, color: GRAY, fontSize: 14, fontWeight: 700, cursor: 'pointer'
              }}>Cancel</div>
              <div onClick={() => setModal(null)} style={{
                flex: 2, padding: '14px 0', borderRadius: 14, textAlign: 'center',
                background: modal.color, color: WHITE, fontSize: 14, fontWeight: 800, cursor: 'pointer',
                boxShadow: `0 4px 16px ${modal.color}44`
              }}>Save Entry</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

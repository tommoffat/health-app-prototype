import React, { useState } from 'react';

const c = {
  bg: '#0A0A00', surface: '#111100', accent: '#CCFF00',
  text: '#FFFFFF', dim: '#888877', border: '#222200',
};
const heavy = { fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif', fontWeight: 900 };

const categories = [
  { key: 'workout', label: 'WORKOUT', icon: '🏋️', items: ['Upper Body', 'Lower Body', 'Cardio', 'HIIT', 'Yoga'] },
  { key: 'nutrition', label: 'NUTRITION', icon: '🥩', items: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Supplement'] },
  { key: 'recovery', label: 'RECOVERY', icon: '🧊', items: ['Cold Plunge', 'Sauna', 'Foam Roll', 'Stretch', 'Massage'] },
  { key: 'mindset', label: 'MINDSET', icon: '🧠', items: ['Meditation', 'Journaling', 'Breathwork', 'Gratitude', 'Visualization'] },
];

const todayEntries = [
  { time: '6:30 AM', label: 'Cold Plunge', cat: 'recovery' },
  { time: '7:15 AM', label: 'Upper Body Strength', cat: 'workout' },
  { time: '8:00 AM', label: 'Breakfast — 42g protein', cat: 'nutrition' },
  { time: '9:00 AM', label: 'Omega-3, Vitamin D', cat: 'nutrition' },
];

export default function Log({ onBack }) {
  const [modal, setModal] = useState(null);

  return (
    <div style={{ padding: '0 16px 100px' }}>
      <div
        onClick={onBack}
        style={{ ...heavy, fontSize: 13, color: c.accent, cursor: 'pointer', marginBottom: 16, letterSpacing: 1 }}
      >
        ← BACK
      </div>

      <div style={{ ...heavy, fontSize: 9, letterSpacing: 3, color: c.dim, marginBottom: 12, textTransform: 'uppercase' }}>
        QUICK LOG
      </div>

      {/* 2×2 category grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        {categories.map((cat) => (
          <div
            key={cat.key}
            onClick={() => setModal(cat)}
            style={{
              background: c.surface, borderRadius: 14, padding: '24px 16px', textAlign: 'center',
              cursor: 'pointer', borderLeft: `3px solid ${c.accent}`,
              transition: 'transform 0.1s',
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>{cat.icon}</div>
            <div style={{ ...heavy, fontSize: 11, letterSpacing: 2, color: c.text }}>{cat.label}</div>
          </div>
        ))}
      </div>

      {/* Today's entries */}
      <div style={{ background: c.surface, borderRadius: 12, padding: 16 }}>
        <div style={{ ...heavy, fontSize: 9, letterSpacing: 2, color: c.dim, marginBottom: 10 }}>TODAY'S LOG</div>
        {todayEntries.map((e, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
            borderBottom: i < todayEntries.length - 1 ? `1px solid ${c.border}` : 'none',
          }}>
            <div style={{ ...heavy, fontSize: 10, color: c.accent, minWidth: 60, letterSpacing: 1 }}>{e.time}</div>
            <div>
              <div style={{ ...heavy, fontSize: 13, fontWeight: 700, color: c.text }}>{e.label}</div>
              <div style={{ ...heavy, fontSize: 9, letterSpacing: 1.5, color: c.dim, textTransform: 'uppercase' }}>{e.cat}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom-sheet modal */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', zIndex: 1000,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: c.surface, borderRadius: '20px 20px 0 0', padding: '24px 20px 40px',
              width: '100%', maxWidth: 430,
            }}
          >
            <div style={{
              width: 40, height: 4, background: c.border, borderRadius: 2,
              margin: '0 auto 16px',
            }} />
            <div style={{ ...heavy, fontSize: 11, letterSpacing: 3, color: c.accent, marginBottom: 16, textTransform: 'uppercase' }}>
              LOG {modal.label}
            </div>
            {modal.items.map((item) => (
              <div
                key={item}
                onClick={() => setModal(null)}
                style={{
                  ...heavy, fontSize: 16, fontWeight: 700, color: c.text, padding: '14px 0',
                  borderBottom: `1px solid ${c.border}`, cursor: 'pointer',
                }}
              >
                {item}
              </div>
            ))}
            <div
              onClick={() => setModal(null)}
              style={{
                ...heavy, fontSize: 12, letterSpacing: 2, color: c.dim, textAlign: 'center',
                marginTop: 16, cursor: 'pointer',
              }}
            >
              CANCEL
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

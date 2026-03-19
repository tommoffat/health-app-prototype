import React, { useState } from 'react';

const mono = '"SF Mono", "Fira Code", "Cascadia Code", monospace';
const sans = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const accent = '#7C6EFA';
const secondary = '#8888AA';
const border = '#1A1A2E';
const surface = '#0A0A0A';

const categories = [
  { key: 'food', label: 'FOOD', icon: 'F', options: ['Breakfast', 'Lunch', 'Dinner', 'Snack'] },
  { key: 'water', label: 'WATER', icon: 'W', options: ['8 oz', '16 oz', '24 oz', '32 oz'] },
  { key: 'mood', label: 'MOOD', icon: 'M', options: ['Great', 'Good', 'Okay', 'Low'] },
  { key: 'supplements', label: 'SUPPS', icon: 'S', options: ['Omega-3', 'Vitamin D', 'Magnesium', 'Creatine', 'NAD+'] },
];

const initialEntries = [
  { time: '7:15 AM', category: 'food', label: 'Breakfast — Oats + berries' },
  { time: '7:30 AM', category: 'supplements', label: 'Omega-3, Vitamin D' },
  { time: '8:00 AM', category: 'water', label: '16 oz water' },
  { time: '9:00 AM', category: 'mood', label: 'Mood: Good' },
];

function BackButton({ navigate }) {
  return (
    <button onClick={() => navigate('today')} style={{
      background: 'none', border: 'none', color: accent, fontFamily: mono, fontSize: 12,
      cursor: 'pointer', padding: '4px 0', letterSpacing: 0.5, marginBottom: 8,
    }}>{'< BACK'}</button>
  );
}

function Modal({ category, onClose, onLog }) {
  if (!category) return null;

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100,
      }} />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 101,
        background: '#0A0A0A', border: `1px solid ${border}`, borderRadius: '16px 16px 0 0',
        padding: '20px 20px env(safe-area-inset-bottom, 20px)',
        animation: 'slideUp 0.25s ease-out',
      }}>
        <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: '#FFF', letterSpacing: 1.5 }}>LOG {category.label}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontFamily: mono, fontSize: 14, color: secondary, cursor: 'pointer' }}>CLOSE</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {category.options.map((opt) => (
            <button key={opt} onClick={() => onLog(category, opt)} style={{
              background: 'transparent', border: `1px solid ${border}`, borderRadius: 8,
              padding: '14px 16px', fontFamily: mono, fontSize: 13, color: '#FFF',
              cursor: 'pointer', textAlign: 'left', letterSpacing: 0.5,
            }}>{opt}</button>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Log({ navigate }) {
  const [entries, setEntries] = useState(initialEntries);
  const [activeModal, setActiveModal] = useState(null);

  const handleLog = (cat, opt) => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    const time = `${h > 12 ? h - 12 : h || 12}:${m} ${ampm}`;
    setEntries([{ time, category: cat.key, label: `${cat.label}: ${opt}` }, ...entries]);
    setActiveModal(null);
  };

  return (
    <div style={{ padding: '16px 16px 24px' }}>
      <BackButton navigate={navigate} />
      <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, marginBottom: 16 }}>QUICK LOG</div>

      {/* 2x2 Category Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
        {categories.map((cat) => (
          <button key={cat.key} onClick={() => setActiveModal(cat)} style={{
            border: `1px solid ${border}`, borderRadius: 8, padding: '24px 16px',
            background: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', border: `2px solid ${accent}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: mono, fontSize: 18, fontWeight: 700, color: accent,
            }}>{cat.icon}</div>
            <span style={{ fontFamily: mono, fontSize: 10, color: '#FFF', letterSpacing: 1.5 }}>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Today's Entries */}
      <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, marginBottom: 12 }}>TODAY'S LOG</div>
      <div style={{ border: `1px solid ${border}`, borderRadius: 8, overflow: 'hidden' }}>
        {entries.map((e, i) => (
          <div key={i} style={{
            display: 'flex', gap: 12, alignItems: 'center', padding: '12px 16px',
            borderBottom: i < entries.length - 1 ? `1px solid ${border}` : 'none',
          }}>
            <span style={{ fontFamily: mono, fontSize: 11, color: accent, minWidth: 64 }}>{e.time}</span>
            <span style={{ fontFamily: sans, fontSize: 13, color: '#FFF' }}>{e.label}</span>
          </div>
        ))}
      </div>

      <Modal category={activeModal} onClose={() => setActiveModal(null)} onLog={handleLog} />
    </div>
  );
}

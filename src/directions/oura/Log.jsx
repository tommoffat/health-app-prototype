import React, { useState } from 'react';
import { today } from '../../data/fake.js';

const c = {
  bg: '#0B0E13',
  surface: '#131920',
  surfaceAlt: '#1E2530',
  accent: '#E8A04B',
  text: '#EAEAEA',
  secondary: '#7A8899',
  border: '#2A3545',
};

const categories = [
  { id: 'supplement', label: 'Supplements', icon: '\u{1F48A}', color: '#4ADE80' },
  { id: 'workout', label: 'Workouts', icon: '\u{1F3CB}', color: '#4A90D9' },
  { id: 'meal', label: 'Meals', icon: '\u{1F957}', color: '#E8A04B' },
  { id: 'mood', label: 'Mood', icon: '\u{1F60C}', color: '#7B68EE' },
];

const moodOptions = ['Great', 'Good', 'Okay', 'Low', 'Stressed'];
const mealOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

function BottomSheet({ category, onClose }) {
  const cat = categories.find(c => c.id === category);
  if (!cat) return null;

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100,
      }} />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 101,
        background: c.surface, borderRadius: '20px 20px 0 0',
        padding: '24px 20px 40px', maxHeight: '60vh', overflow: 'auto',
        border: `1px solid ${c.border}`, borderBottom: 'none',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ color: c.text, fontSize: 18, fontWeight: 600, margin: 0 }}>
            {cat.icon} Log {cat.label}
          </h3>
          <button onClick={onClose} style={{
            background: c.surfaceAlt, border: 'none', color: c.secondary, fontSize: 18,
            width: 32, height: 32, borderRadius: 16, cursor: 'pointer', lineHeight: '32px',
          }}>&#10005;</button>
        </div>

        {category === 'supplement' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {today.supplements.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', background: c.surfaceAlt, borderRadius: 10,
              }}>
                <span style={{ color: c.text, fontSize: 14 }}>{s.name}</span>
                <div style={{
                  width: 24, height: 24, borderRadius: 12,
                  background: s.done ? cat.color : 'transparent',
                  border: s.done ? 'none' : `2px solid ${c.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {s.done && <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>&#10003;</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {category === 'workout' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ padding: '14px 16px', background: c.surfaceAlt, borderRadius: 10 }}>
              <div style={{ color: c.text, fontSize: 14, fontWeight: 600 }}>{today.workout.name}</div>
              <div style={{ color: c.secondary, fontSize: 12, marginTop: 4 }}>
                {today.workout.setsComplete}/{today.workout.setsTotal} sets
              </div>
            </div>
            <button style={{
              background: c.surfaceAlt, border: `1px dashed ${c.border}`, borderRadius: 10,
              padding: 14, color: c.secondary, fontSize: 14, cursor: 'pointer',
            }}>+ Add Workout</button>
          </div>
        )}

        {category === 'meal' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {mealOptions.map(m => (
              <button key={m} style={{
                padding: '14px 16px', background: c.surfaceAlt, borderRadius: 10,
                border: 'none', color: c.text, fontSize: 14, textAlign: 'left', cursor: 'pointer',
              }}>{m}</button>
            ))}
          </div>
        )}

        {category === 'mood' && (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {moodOptions.map(m => (
              <button key={m} style={{
                padding: '10px 20px', background: c.surfaceAlt, borderRadius: 20,
                border: 'none', color: c.text, fontSize: 14, cursor: 'pointer',
              }}>{m}</button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function Log() {
  const [sheet, setSheet] = useState(null);

  const entries = [
    { time: '7:15 AM', text: 'Omega-3, Vitamin D', cat: 'supplement' },
    { time: '8:00 AM', text: 'Upper Body Strength (3/4 sets)', cat: 'workout' },
  ];

  return (
    <div style={{
      minHeight: '100%', background: c.bg, padding: '20px 20px 32px',
      fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif',
    }}>
      <h2 style={{ color: c.text, fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>Log</h2>
      <p style={{ color: c.secondary, fontSize: 13, margin: '0 0 24px' }}>{today.date}</p>

      {/* 2x2 Category Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setSheet(cat.id)} style={{
            background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14,
            padding: '20px 16px', cursor: 'pointer', textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 28 }}>{cat.icon}</span>
            <span style={{ color: c.text, fontSize: 14, fontWeight: 500 }}>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Today's Entries */}
      <h3 style={{ color: c.text, fontSize: 15, fontWeight: 600, margin: '0 0 12px' }}>Today's Entries</h3>
      <div style={{
        background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14,
        overflow: 'hidden',
      }}>
        {entries.map((e, i) => {
          const cat = categories.find(c => c.id === e.cat);
          return (
            <div key={i} style={{
              padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
              borderBottom: i < entries.length - 1 ? `1px solid ${c.border}` : 'none',
            }}>
              <span style={{ fontSize: 18 }}>{cat?.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: c.text, fontSize: 14 }}>{e.text}</div>
                <div style={{ color: c.secondary, fontSize: 11, marginTop: 2 }}>{e.time}</div>
              </div>
            </div>
          );
        })}
      </div>

      {sheet && <BottomSheet category={sheet} onClose={() => setSheet(null)} />}
    </div>
  );
}

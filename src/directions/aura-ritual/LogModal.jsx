import React, { useState } from 'react';
import BottomSheet from './components/BottomSheet.jsx';

const TEXT = '#F0F0F0';
const TEXT_DIM = '#8B949E';
const BORDER = 'rgba(255,255,255,0.08)';
const GOLD = '#C9A96E';

const categories = [
  {
    id: 'workout', label: 'Workout', color: '#F0943A',
    icon: 'M6.5 6.5h11M5 12h14M6.5 17.5h11M4 6.5a2.5 2.5 0 010-5M4 6.5a2.5 2.5 0 000 5M4 11.5a2.5 2.5 0 010-5M4 11.5a2.5 2.5 0 000 5M20 6.5a2.5 2.5 0 010-5M20 6.5a2.5 2.5 0 000 5',
    // simpler dumbbell icon
    iconPath: 'M6 7v10M18 7v10M4 8h4M16 8h4M4 16h4M16 16h4M4 8v8M20 8v8M8 10h8v4H8z',
  },
  {
    id: 'sleep', label: 'Sleep Notes', color: '#9B59B6',
    iconPath: 'M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z',
  },
  {
    id: 'biometric', label: 'Biometric', color: '#4ECDC4',
    iconPath: 'M22 12h-4l-3 9L9 3l-3 9H2',
  },
];

export default function LogModal({ open, onClose }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [duration, setDuration] = useState(30);
  const [intensity, setIntensity] = useState(3);
  const [notes, setNotes] = useState('');

  const handleClose = () => {
    setActiveCategory(null);
    setDuration(30);
    setIntensity(3);
    setNotes('');
    onClose();
  };

  return (
    <BottomSheet open={open} onClose={handleClose} title="Quick Log">
      {!activeCategory ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 18px', borderRadius: 14,
                background: 'rgba(255,255,255,0.04)', border: `1px solid ${BORDER}`,
                cursor: 'pointer', color: TEXT, fontSize: 15, fontWeight: 500,
                textAlign: 'left',
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: `${cat.color}18`, border: `1px solid ${cat.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={cat.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={cat.iconPath} />
                </svg>
              </div>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      ) : activeCategory === 'workout' ? (
        <div>
          <button onClick={() => setActiveCategory(null)} style={{
            background: 'none', border: 'none', color: TEXT_DIM, fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 16,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* duration slider */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8 }}>Duration</span>
              <span style={{ fontSize: 14, color: TEXT, fontWeight: 500 }}>{duration} min</span>
            </div>
            <input
              type="range" min="5" max="120" step="5" value={duration}
              onChange={e => setDuration(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F0943A' }}
            />
          </div>

          {/* intensity dots */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>Intensity</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[1, 2, 3, 4, 5].map(i => (
                <button
                  key={i}
                  onClick={() => setIntensity(i)}
                  style={{
                    width: 36, height: 36, borderRadius: 18, cursor: 'pointer',
                    background: i <= intensity ? '#F0943A' : 'rgba(255,255,255,0.06)',
                    border: i <= intensity ? '2px solid #F0943A' : `1px solid ${BORDER}`,
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
            </div>
          </div>

          {/* notes */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Notes</div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="How did it go?"
              rows={3}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 12,
                background: 'rgba(255,255,255,0.04)', border: `1px solid ${BORDER}`,
                color: TEXT, fontSize: 14, outline: 'none', resize: 'none',
                fontFamily: 'inherit', boxSizing: 'border-box',
              }}
            />
          </div>

          {/* save button */}
          <button
            onClick={handleClose}
            style={{
              width: '100%', padding: '14px', borderRadius: 14,
              background: '#F0943A', border: 'none', color: '#0D1117',
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Log Workout
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => setActiveCategory(null)} style={{
            background: 'none', border: 'none', color: TEXT_DIM, fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 16,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
              {activeCategory === 'sleep' ? 'Sleep Notes' : 'Biometric Entry'}
            </div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder={activeCategory === 'sleep' ? 'How was your sleep?' : 'Log a measurement...'}
              rows={4}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 12,
                background: 'rgba(255,255,255,0.04)', border: `1px solid ${BORDER}`,
                color: TEXT, fontSize: 14, outline: 'none', resize: 'none',
                fontFamily: 'inherit', boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            onClick={handleClose}
            style={{
              width: '100%', padding: '14px', borderRadius: 14,
              background: activeCategory === 'sleep' ? '#9B59B6' : '#4ECDC4',
              border: 'none', color: '#0D1117',
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Save
          </button>
        </div>
      )}
    </BottomSheet>
  );
}

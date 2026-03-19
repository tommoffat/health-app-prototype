import { useState } from 'react';
import { useTheme } from '../themes';
import { SUPPLEMENTS } from '../data/fake';

export default function LogModal({ type, onClose }) {
  const theme = useTheme();
  const [waterOz, setWaterOz] = useState(8);
  const [moodIndex, setMoodIndex] = useState(2);
  const [note, setNote] = useState('');
  const [foodText, setFoodText] = useState('');
  const [supps, setSupps] = useState(SUPPLEMENTS.map(s => ({ ...s })));

  const moods = ['😞', '😐', '😊', '😄', '🤩'];
  const titles = { food: 'Log Food 🍎', water: 'Log Water 💧', mood: 'Log Mood 😌', supplement: 'Supplements 💊' };

  const inputStyle = {
    width: '100%', padding: '12px', borderRadius: '8px',
    border: `1px solid ${theme.colors.border}`, background: theme.colors.surfaceAlt || theme.colors.surface,
    color: theme.colors.text, fontFamily: theme.fonts.body, fontSize: '16px', outline: 'none',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
      }} />
      <div style={{
        position: 'relative', background: theme.colors.surface, borderRadius: '20px 20px 0 0',
        padding: '24px', paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
        maxHeight: '70vh', overflowY: 'auto',
        animation: 'slideUp 200ms ease-out',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontFamily: theme.fonts.heading, fontWeight: theme.style.headingWeight, fontSize: '20px', color: theme.colors.text }}>
            {titles[type]}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: theme.colors.textSecondary, fontSize: '24px', cursor: 'pointer' }}>✕</button>
        </div>

        {type === 'food' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input placeholder="What did you eat?" value={foodText} onChange={e => setFoodText(e.target.value)} style={inputStyle} />
            <button style={{ padding: '12px', borderRadius: '8px', border: `1px solid ${theme.colors.border}`, background: 'transparent', color: theme.colors.textSecondary, fontFamily: theme.fonts.body, fontSize: '15px', cursor: 'pointer' }}>
              📷 Scan with camera
            </button>
          </div>
        )}

        {type === 'water' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontFamily: theme.style.numberFont, fontWeight: theme.style.numberWeight, fontSize: '48px', color: theme.colors.text }}>{waterOz} oz</span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setWaterOz(Math.max(0, waterOz - 8))} style={{ width: '48px', height: '48px', borderRadius: '24px', border: `1px solid ${theme.colors.border}`, background: theme.colors.surfaceAlt, color: theme.colors.text, fontSize: '24px', cursor: 'pointer' }}>−</button>
              <button onClick={() => setWaterOz(waterOz + 8)} style={{ width: '48px', height: '48px', borderRadius: '24px', border: `1px solid ${theme.colors.border}`, background: theme.colors.surfaceAlt, color: theme.colors.text, fontSize: '24px', cursor: 'pointer' }}>+</button>
            </div>
          </div>
        )}

        {type === 'mood' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {moods.map((m, i) => (
                <button key={i} onClick={() => setMoodIndex(i)} style={{
                  fontSize: '32px', background: i === moodIndex ? theme.colors.accent + '33' : 'transparent',
                  border: i === moodIndex ? `2px solid ${theme.colors.accent}` : '2px solid transparent',
                  borderRadius: '12px', padding: '8px 12px', cursor: 'pointer',
                }}>{m}</button>
              ))}
            </div>
            <textarea placeholder="Add a note (optional)" value={note} onChange={e => setNote(e.target.value)}
              style={{ ...inputStyle, minHeight: '80px', resize: 'none' }} />
          </div>
        )}

        {type === 'supplement' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {supps.map((s, i) => (
              <button key={i} onClick={() => {
                const next = [...supps];
                next[i] = { ...next[i], done: !next[i].done };
                setSupps(next);
              }} style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '14px',
                borderRadius: '10px', border: `1px solid ${theme.colors.border}`,
                background: s.done ? theme.colors.accent + '18' : 'transparent',
                color: theme.colors.text, fontFamily: theme.fonts.body, fontSize: '16px', cursor: 'pointer',
                textAlign: 'left', width: '100%',
              }}>
                <span style={{ fontSize: '18px' }}>{s.done ? '✅' : '⬜'}</span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        )}

        <button onClick={onClose} style={{
          marginTop: '20px', width: '100%', padding: '14px', borderRadius: '12px',
          background: theme.colors.accent, border: 'none', color: theme.style.isLight ? '#FFFFFF' : '#000000',
          fontFamily: theme.fonts.heading, fontWeight: '600', fontSize: '16px', cursor: 'pointer',
        }}>
          Log Entry
        </button>
      </div>
    </div>
  );
}

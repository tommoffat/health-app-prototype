import React, { useState } from 'react';
import { today } from '../../data/fake';

const GlassCard = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 20,
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  }}>{children}</div>
);

const BackButton = ({ onClick }) => (
  <button onClick={onClick} style={{
    background: 'none', border: 'none', color: '#C9A96E', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 6, padding: 0, fontFamily: 'inherit',
    fontSize: 14, fontWeight: '500',
  }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
    Today
  </button>
);

const categories = [
  {
    id: 'workout', label: 'Workout', icon: 'M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z',
    fields: ['Exercise', 'Duration', 'Sets', 'Notes'],
  },
  {
    id: 'meal', label: 'Meal', icon: 'M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-4.5-6.77-5-8.52-5C5.76 9.99 1 10.49 1 14.99h15.03zM1 17h15.03v2H1v-2z',
    fields: ['Description', 'Calories', 'Protein', 'Notes'],
  },
  {
    id: 'supplement', label: 'Supplement', icon: 'M4.22 11.29l3.54-3.54c.78-.78 2.05-.78 2.83 0l6.36 6.36c.78.78.78 2.05 0 2.83l-3.54 3.54c-.78.78-2.05.78-2.83 0L4.22 14.12c-.78-.78-.78-2.05 0-2.83zm13.36.71l1.41-1.41-3.54-3.54-1.41 1.41 3.54 3.54zM3 3v2h2V3h2v2h2V3h2v2h2V3h2v2h1v2H3V5h-.5V3H3z',
    fields: ['Name', 'Dosage', 'Time', 'Notes'],
  },
  {
    id: 'symptom', label: 'Symptom', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
    fields: ['Description', 'Severity', 'Duration', 'Notes'],
  },
];

const todaysEntries = [
  { type: 'workout', label: 'Upper Body Strength', time: '7:15 AM', detail: '3/4 sets' },
  { type: 'supplement', label: 'Omega-3', time: '8:00 AM', detail: '1000mg' },
  { type: 'supplement', label: 'Vitamin D', time: '8:00 AM', detail: '5000 IU' },
  { type: 'meal', label: 'Breakfast', time: '8:30 AM', detail: '~480 kcal' },
];

const LogModal = ({ category, onClose }) => (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 200,
    display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
  }}>
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    }} />
    <div style={{
      position: 'relative', width: '100%', maxWidth: 440,
      background: 'rgba(22,27,34,0.95)',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '20px 20px 0 0',
      padding: '28px 24px 40px',
      zIndex: 201,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 20, fontWeight: '600', color: '#E6EDF3' }}>Log {category.label}</div>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 20,
          width: 32, height: 32, cursor: 'pointer', color: '#8B949E', fontSize: 18,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>x</button>
      </div>
      {category.fields.map((field) => (
        <div key={field} style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: '#8B949E', fontWeight: '500', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.6 }}>{field}</label>
          <input
            placeholder={`Enter ${field.toLowerCase()}...`}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 10,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#E6EDF3', fontSize: 15, fontFamily: 'inherit',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
      ))}
      <button style={{
        width: '100%', padding: '14px 0', borderRadius: 12, border: 'none',
        background: 'linear-gradient(135deg, #C9A96E, #E8D5A8)',
        color: '#0D1117', fontSize: 15, fontWeight: '600', cursor: 'pointer',
        fontFamily: 'inherit', marginTop: 8, letterSpacing: 0.3,
      }}>
        Save Entry
      </button>
    </div>
  </div>
);

export default function Log({ navigate }) {
  const [modal, setModal] = useState(null);

  return (
    <div style={{ padding: '56px 20px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <BackButton onClick={() => navigate('today')} />
      <div style={{ fontSize: 24, fontWeight: '600', letterSpacing: -0.3 }}>Log</div>

      {/* 2x2 Category Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {categories.map((cat) => (
          <GlassCard key={cat.id} onClick={() => setModal(cat)} style={{
            padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: 'linear-gradient(135deg, rgba(201,169,110,0.15), rgba(232,213,168,0.08))',
              border: '1px solid rgba(201,169,110,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#C9A96E">
                <path d={cat.icon} />
              </svg>
            </div>
            <div style={{ fontSize: 14, fontWeight: '600', color: '#E6EDF3' }}>{cat.label}</div>
            <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '400' }}>Tap to log</div>
          </GlassCard>
        ))}
      </div>

      {/* Today's Entries */}
      <GlassCard>
        <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 14 }}>Today's Entries</div>
        {todaysEntries.map((entry, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 0',
            borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: '500', color: '#E6EDF3' }}>{entry.label}</div>
              <div style={{ fontSize: 12, color: '#8B949E', marginTop: 2 }}>{entry.detail}</div>
            </div>
            <div style={{ fontSize: 12, color: '#8B949E', fontWeight: '500' }}>{entry.time}</div>
          </div>
        ))}
      </GlassCard>

      {/* Supplements checklist */}
      <GlassCard>
        <div style={{ fontSize: 11, color: '#8B949E', fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>Supplement Checklist</div>
        {today.supplements.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 0',
            borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6,
              border: `1.5px solid ${s.done ? '#C9A96E' : 'rgba(255,255,255,0.15)'}`,
              background: s.done ? 'rgba(201,169,110,0.15)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {s.done && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="3" strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </div>
            <span style={{ fontSize: 14, color: s.done ? '#8B949E' : '#E6EDF3', textDecoration: s.done ? 'line-through' : 'none', fontWeight: '400' }}>{s.name}</span>
          </div>
        ))}
      </GlassCard>

      {modal && <LogModal category={modal} onClose={() => setModal(null)} />}
    </div>
  );
}

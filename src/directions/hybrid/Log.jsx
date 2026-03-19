import React, { useState } from 'react';
import { today } from '../../data/fake';

const c = {
  bg: '#0F1218', surface: '#181E28', surfaceAlt: '#1E2535',
  amber: '#E8A04B', coral: '#FF8C42', text: '#F0F4F8', muted: '#8899AA',
  green: '#4ADE80', blue: '#4EA8FF', purple: '#B18CFF', red: '#FF6B6B',
};

const categories = [
  {
    name: 'Nutrition', icon: 'N', color: c.green, bg: 'rgba(74,222,128,0.1)',
    items: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Water Intake'],
  },
  {
    name: 'Exercise', icon: 'E', color: c.blue, bg: 'rgba(78,168,255,0.1)',
    items: ['Strength', 'Cardio', 'Yoga', 'Walking', 'Stretching'],
  },
  {
    name: 'Wellness', icon: 'W', color: c.purple, bg: 'rgba(177,140,255,0.1)',
    items: ['Meditation', 'Journaling', 'Cold Plunge', 'Sauna', 'Breathwork'],
  },
  {
    name: 'Symptoms', icon: 'S', color: c.coral, bg: 'rgba(255,140,66,0.1)',
    items: ['Energy Level', 'Mood', 'Stress', 'Pain', 'Digestion'],
  },
];

const todayEntries = [
  { time: '7:15 AM', category: 'Nutrition', text: 'Breakfast - Oatmeal with berries', color: c.green },
  { time: '7:30 AM', category: 'Wellness', text: 'Morning meditation - 15 min', color: c.purple },
  { time: '8:00 AM', category: 'Exercise', text: 'Upper Body Strength - 45 min', color: c.blue },
  { time: '9:00 AM', category: 'Nutrition', text: 'Post-workout protein shake', color: c.green },
];

export default function Log({ onBack }) {
  const [modal, setModal] = useState(null);
  const [logged, setLogged] = useState([]);

  const cardStyle = {
    background: c.surface, borderRadius: 16, padding: 18,
    border: '1px solid rgba(255,255,255,0.04)', marginBottom: 14,
  };

  return (
    <div style={{ padding: '0 16px 24px', position: 'relative' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 0' }}>
        <div onClick={onBack} style={{
          width: 32, height: 32, borderRadius: 10, background: c.surface,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke={c.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
          Log
        </div>
      </div>

      {/* 2x2 Category Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
        {categories.map(cat => (
          <div key={cat.name} onClick={() => setModal(cat)} style={{
            background: c.surface, borderRadius: 16, padding: 20, cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.04)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            transition: 'transform 0.15s',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, background: cat.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, fontWeight: 700, color: cat.color,
              fontFamily: 'SF Pro Display, -apple-system, sans-serif',
            }}>
              {cat.icon}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: c.text, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
              {cat.name}
            </div>
            <div style={{ fontSize: 11, color: c.muted }}>Tap to log</div>
          </div>
        ))}
      </div>

      {/* Supplements Quick Log */}
      <div style={cardStyle}>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 12, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
          Supplements
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {today.supplements.map(s => (
            <div key={s.name} style={{
              padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: 'pointer',
              background: s.done ? 'rgba(232,160,75,0.15)' : 'rgba(255,255,255,0.04)',
              color: s.done ? c.amber : c.muted,
              border: `1px solid ${s.done ? 'rgba(232,160,75,0.25)' : 'rgba(255,255,255,0.06)'}`,
              fontFamily: 'SF Pro Text, -apple-system, sans-serif',
            }}>
              {s.done ? '\u2713 ' : '\u25CB '}{s.name}
            </div>
          ))}
        </div>
      </div>

      {/* Today's Entries */}
      <div style={cardStyle}>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 12, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
          Today's Entries
        </div>
        {todayEntries.map((entry, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0',
            borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <div style={{
              width: 4, height: 4, borderRadius: 2, background: entry.color,
              marginTop: 7, flexShrink: 0,
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: c.text, fontFamily: 'SF Pro Text, -apple-system, sans-serif', marginBottom: 2 }}>
                {entry.text}
              </div>
              <div style={{ fontSize: 11, color: c.muted }}>{entry.time}</div>
            </div>
          </div>
        ))}
        {logged.map((entry, i) => (
          <div key={`l-${i}`} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div style={{ width: 4, height: 4, borderRadius: 2, background: c.amber, marginTop: 7, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: c.text, fontFamily: 'SF Pro Text, -apple-system, sans-serif', marginBottom: 2 }}>
                {entry}
              </div>
              <div style={{ fontSize: 11, color: c.muted }}>Just now</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Sheet Modal */}
      {modal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }}>
          <div onClick={() => setModal(null)} style={{
            flex: 1, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          }} />
          <div style={{
            background: c.surfaceAlt, borderTopLeftRadius: 24, borderTopRightRadius: 24,
            padding: '12px 20px 32px', maxHeight: '55vh',
          }}>
            {/* Handle */}
            <div style={{
              width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)',
              margin: '0 auto 18px',
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, background: modal.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 700, color: modal.color,
              }}>
                {modal.icon}
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
                  Log {modal.name}
                </div>
                <div style={{ fontSize: 12, color: c.muted }}>Select an item to log</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {modal.items.map(item => (
                <div key={item} onClick={() => {
                  setLogged(prev => [...prev, `${modal.name} - ${item}`]);
                  setModal(null);
                }} style={{
                  padding: '14px 16px', background: c.surface, borderRadius: 12,
                  fontSize: 14, color: c.text, cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.04)',
                  fontFamily: 'SF Pro Text, -apple-system, sans-serif',
                  transition: 'background 0.15s',
                }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

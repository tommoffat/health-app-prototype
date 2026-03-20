import React, { useState } from 'react';
import AuroraCard from './components/AuroraCard.jsx';

const TEXT = '#F0F0F0';
const TEXT_DIM = '#8B949E';
const BORDER = 'rgba(255,255,255,0.08)';
const GOLD = '#C9A96E';
const GRADIENT = 'linear-gradient(160deg, rgba(201,169,110,0.15) 0%, rgba(180,140,80,0.08) 60%, #0D1117 100%)';

const moodLevels = [
  { level: 1, label: 'Rough', color: '#E74C3C' },
  { level: 2, label: 'Low', color: '#F0943A' },
  { level: 3, label: 'Okay', color: '#F1C40F' },
  { level: 4, label: 'Good', color: '#2ECC71' },
  { level: 5, label: 'Great', color: '#4ECDC4' },
];

const recentEntries = [
  { date: 'Mar 19', mood: 4, energy: 'High', text: 'Felt strong after morning workout. Clear-headed all day.' },
  { date: 'Mar 18', mood: 3, energy: 'Medium', text: 'Decent day but felt a bit foggy after lunch.' },
  { date: 'Mar 17', mood: 5, energy: 'High', text: 'Best sleep in weeks. Meditation practice paying off.' },
  { date: 'Mar 16', mood: 4, energy: 'High', text: 'Great recovery day. Spent time outside.' },
  { date: 'Mar 15', mood: 3, energy: 'Low', text: 'Stressed about deadlines. Skipped workout.' },
  { date: 'Mar 14', mood: 4, energy: 'Medium', text: 'Solid training session. Good appetite.' },
  { date: 'Mar 13', mood: 4, energy: 'High', text: 'Active recovery. Yoga and walking.' },
];

export default function JournalScreen() {
  const [selectedMood, setSelectedMood] = useState(4);
  const [expandedEntry, setExpandedEntry] = useState(null);
  const [intention, setIntention] = useState('');

  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
      {/* ritual card — today's reflection */}
      <div style={{ padding: '12px 16px 0' }}>
        <AuroraCard gradient={GRADIENT} accentColor={GOLD}>
          <div style={{ padding: '28px 24px' }}>
            <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 2.5, color: GOLD, fontWeight: 600, marginBottom: 20, textAlign: 'center' }}>
              Today's Reflection
            </div>

            {/* mood ring */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>How are you feeling?</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                {moodLevels.map(m => (
                  <button
                    key={m.level}
                    onClick={() => setSelectedMood(m.level)}
                    style={{
                      flex: 1, padding: '12px 0', borderRadius: 12, cursor: 'pointer',
                      background: selectedMood === m.level ? `${m.color}22` : 'rgba(255,255,255,0.04)',
                      border: selectedMood === m.level ? `2px solid ${m.color}` : `1px solid ${BORDER}`,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: 12,
                      background: selectedMood === m.level ? m.color : `${m.color}44`,
                      transition: 'background 0.2s ease',
                    }} />
                    <span style={{ fontSize: 9, color: selectedMood === m.level ? m.color : TEXT_DIM, fontWeight: selectedMood === m.level ? 600 : 400 }}>
                      {m.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* energy level */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Energy Level</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Low', 'Medium', 'High'].map(level => (
                  <div key={level} style={{
                    flex: 1, padding: '10px 0', borderRadius: 10, textAlign: 'center',
                    background: level === 'High' ? 'rgba(46,204,113,0.12)' : 'rgba(255,255,255,0.04)',
                    border: level === 'High' ? '1px solid rgba(46,204,113,0.3)' : `1px solid ${BORDER}`,
                    color: level === 'High' ? '#2ECC71' : TEXT_DIM,
                    fontSize: 12, fontWeight: level === 'High' ? 600 : 400,
                  }}>
                    {level}
                  </div>
                ))}
              </div>
            </div>

            {/* intention */}
            <div>
              <div style={{ fontSize: 11, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Today's Intention</div>
              <input
                type="text"
                value={intention}
                onChange={e => setIntention(e.target.value)}
                placeholder="What's your focus today?"
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)', border: `1px solid ${BORDER}`,
                  color: TEXT, fontSize: 14, outline: 'none', boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          </div>
        </AuroraCard>
      </div>

      {/* recent entries */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12, padding: '0 4px' }}>Recent Entries</div>
        {recentEntries.map((entry, i) => {
          const isExpanded = expandedEntry === i;
          const moodInfo = moodLevels.find(m => m.level === entry.mood);
          return (
            <div
              key={i}
              onClick={() => setExpandedEntry(isExpanded ? null : i)}
              style={{
                background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
                borderRadius: 14, padding: '14px 16px', marginBottom: 8, cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 14, background: `${moodInfo.color}22`,
                  border: `1px solid ${moodInfo.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <div style={{ width: 10, height: 10, borderRadius: 5, background: moodInfo.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: TEXT, fontWeight: 500 }}>{entry.date}</span>
                    <span style={{ fontSize: 11, color: TEXT_DIM }}>{moodInfo.label} · {entry.energy}</span>
                  </div>
                  {!isExpanded && (
                    <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {entry.text}
                    </div>
                  )}
                </div>
              </div>
              {isExpanded && (
                <div style={{ marginTop: 12, fontSize: 14, color: TEXT, lineHeight: 1.55, opacity: 0.88, animation: 'cardReveal 0.3s ease-out' }}>
                  {entry.text}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* spacer */}
      <div style={{ height: 24 }} />
    </div>
  );
}

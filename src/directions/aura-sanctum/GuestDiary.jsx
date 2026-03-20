import React, { useState } from 'react';
import { today } from '../../data/fake.js';
import { BG_CARD, GOLD, GOLD_LT, GOLD_DARK, TEXT, TEXT_DIM, CREAM, BORDER, ICONS, spacedCaps, btnReset } from './palette.js';

const pastEntries = [
  { date: 'March 18, 2026', mood: 4, energy: 3, notes: 'Feeling energized after morning training. Need to focus on hydration.' },
  { date: 'March 17, 2026', mood: 3, energy: 4, notes: 'Solid recovery day. Meditation session was particularly grounding.' },
  { date: 'March 16, 2026', mood: 5, energy: 5, notes: 'Best day this week. PR on deadlift, sleep was excellent.' },
  { date: 'March 15, 2026', mood: 3, energy: 2, notes: 'Travel fatigue setting in. Shortened workout to compensate.' },
];

function DotScale({ value, onChange, label }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 14, color: TEXT, marginBottom: 10 }}>{label}</div>
      <div style={{ display: 'flex', gap: 12 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} onClick={() => onChange(n)} style={{
            ...btnReset, width: 32, height: 32, borderRadius: 16,
            border: `1.5px solid ${GOLD}`,
            background: n <= value ? GOLD : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 600,
            color: n <= value ? '#0A0C12' : GOLD,
          }}>
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function GuestDiary({ onBack }) {
  const [mood, setMood] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [intention, setIntention] = useState('');
  const [notes, setNotes] = useState('');
  const [expandedEntry, setExpandedEntry] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div style={{ padding: '24px 20px 40px' }}>
      {/* Back */}
      <button onClick={onBack} style={{ ...btnReset, display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d={ICONS.back} />
        </svg>
        <span style={{ marginLeft: 6, color: GOLD, fontSize: 13, fontWeight: 500 }}>Lobby</span>
      </button>

      <div style={{ ...spacedCaps, fontSize: 12, marginBottom: 24 }}>Guest Diary</div>

      {/* Today's entry */}
      <div style={{ fontSize: 20, fontWeight: 300, color: TEXT, marginBottom: 4 }}>{today.date}</div>
      <div style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 24 }}>Record your experience</div>

      <DotScale label="How are you feeling?" value={mood} onChange={setMood} />
      <DotScale label="Energy level" value={energy} onChange={setEnergy} />

      {/* Intention */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 14, color: TEXT, marginBottom: 10 }}>Today&apos;s intention</div>
        <input
          type="text"
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          placeholder="Set an intention for today..."
          style={{
            width: '100%', padding: '12px 14px', borderRadius: 10,
            background: BG_CARD, border: `1px solid ${BORDER}`,
            color: TEXT, fontSize: 14, fontFamily: 'inherit',
            outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Notes */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 14, color: TEXT, marginBottom: 10 }}>Notes</div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How was your day..."
          rows={4}
          style={{
            width: '100%', padding: '12px 14px', borderRadius: 10,
            background: '#12151F', border: `1px solid ${BORDER}`,
            color: TEXT, fontSize: 14, fontFamily: 'inherit', lineHeight: 1.6,
            outline: 'none', resize: 'none', boxSizing: 'border-box',
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(201,169,110,0.06) 27px, rgba(201,169,110,0.06) 28px)',
            backgroundPositionY: 12,
          }}
        />
      </div>

      {/* Submit */}
      <button onClick={handleSubmit} style={{
        ...btnReset, width: '100%', padding: '14px 0',
        borderRadius: 12, background: submitted ? `${GOLD}40` : GOLD,
        color: submitted ? GOLD_LT : '#0A0C12', fontSize: 15,
        fontWeight: 600, letterSpacing: 0.5,
      }}>
        {submitted ? 'Entry Recorded' : 'Record Entry'}
      </button>

      {/* Past entries */}
      <div style={{ ...spacedCaps, marginTop: 36, marginBottom: 14 }}>Past Entries</div>
      {pastEntries.map((entry, i) => {
        const isExpanded = expandedEntry === i;
        return (
          <button
            key={i}
            onClick={() => setExpandedEntry(isExpanded ? null : i)}
            style={{
              ...btnReset, width: '100%', textAlign: 'left',
              padding: '14px 16px', borderRadius: 12,
              background: BG_CARD, border: `1px solid ${BORDER}`,
              marginBottom: 8,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ ...spacedCaps, fontSize: 9, marginBottom: 4 }}>{entry.date}</div>
                <div style={{ display: 'flex', gap: 4, marginBottom: isExpanded ? 8 : 0 }}>
                  {[...Array(5)].map((_, j) => (
                    <div key={j} style={{
                      width: 8, height: 8, borderRadius: 4,
                      background: j < entry.mood ? GOLD : `${GOLD}25`,
                    }} />
                  ))}
                  <span style={{ fontSize: 10, color: TEXT_DIM, marginLeft: 6 }}>
                    E: {entry.energy}/5
                  </span>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TEXT_DIM} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                <path d={ICONS.chevron} />
              </svg>
            </div>
            {isExpanded && (
              <div style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.6, marginTop: 4 }}>
                {entry.notes}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

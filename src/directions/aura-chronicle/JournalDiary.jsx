import React, { useState } from 'react';
import { today } from '../../data/fake.js';

const PAPER = '#111520';
const GOLD = '#C9A96E';
const GOLD_LT = '#E8D5A8';
const GOLD_RULE = 'rgba(201,169,110,0.3)';
const TEXT = '#E8E8E8';
const TEXT_DIM = '#8B949E';
const TEXT_CAPTION = '#6B7280';
const BORDER = 'rgba(255,255,255,0.06)';

const MOODS = [
  { label: 'Low', value: 1 },
  { label: 'Below Avg', value: 2 },
  { label: 'Average', value: 3 },
  { label: 'Good', value: 4 },
  { label: 'Great', value: 5 },
];

const PAST_ENTRIES = [
  {
    date: 'Wednesday, March 18',
    mood: 4,
    energy: 3,
    intention: 'Stay focused on deep work',
    notes: 'Solid day overall. Morning meditation helped set the tone. Afternoon energy dipped after lunch but recovered well. Hit the gym for a light session.',
  },
  {
    date: 'Tuesday, March 17',
    mood: 3,
    energy: 3,
    intention: 'Catch up on rest',
    notes: 'Feeling average today. Sleep was interrupted by noise around 3 AM. Kept things light physically. Good evening walk helped decompress.',
  },
  {
    date: 'Monday, March 16',
    mood: 5,
    energy: 4,
    intention: 'Start the week strong',
    notes: 'Excellent day. Woke up feeling refreshed after a great night of sleep. Crushed the morning workout and had sustained energy throughout. Clear-headed and motivated.',
  },
];

function MoodDot({ value, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        background: selected ? GOLD : 'transparent',
        border: `2px solid ${selected ? GOLD : BORDER}`,
        color: selected ? '#0D1117' : TEXT_DIM,
        fontSize: 14,
        fontWeight: selected ? 700 : 400,
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {value}
    </button>
  );
}

export default function JournalDiary({ navigate }) {
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [intention, setIntention] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '24px 24px 80px', maxWidth: 640, margin: '0 auto' }}>
      <h1 style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: 24,
        fontWeight: 400,
        color: TEXT,
        margin: '0 0 8px 0',
      }}>
        Daily Journal
      </h1>
      <div style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 24 }}>
        {today.date}
      </div>

      <hr style={{ border: 'none', borderTop: `1px solid ${GOLD_RULE}`, margin: '0 0 28px 0' }} />

      {/* Today's Entry */}
      {!submitted ? (
        <div style={{
          background: PAPER,
          borderRadius: 10,
          padding: '24px 20px',
          border: `1px solid ${BORDER}`,
          marginBottom: 40,
        }}>
          {/* Mood */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5,
              textTransform: 'uppercase', marginBottom: 12,
            }}>
              How are you feeling?
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {MOODS.map(m => (
                <div key={m.value} style={{ textAlign: 'center' }}>
                  <MoodDot value={m.value} selected={mood === m.value} onClick={() => setMood(m.value)} />
                  <div style={{ fontSize: 9, color: TEXT_CAPTION, marginTop: 4 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Energy */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5,
              textTransform: 'uppercase', marginBottom: 12,
            }}>
              Energy Level
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1, 2, 3, 4, 5].map(v => (
                <button
                  key={v}
                  onClick={() => setEnergy(v)}
                  style={{
                    flex: 1,
                    height: 32,
                    borderRadius: 6,
                    background: energy === v ? 'rgba(201,169,110,0.2)' : 'transparent',
                    border: `1px solid ${energy === v ? GOLD : BORDER}`,
                    color: energy === v ? GOLD_LT : TEXT_DIM,
                    fontSize: 13,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Intention */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5,
              textTransform: 'uppercase', marginBottom: 8,
            }}>
              Today's Intention
            </div>
            <input
              type="text"
              value={intention}
              onChange={e => setIntention(e.target.value)}
              placeholder="What's your focus today?"
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${BORDER}`,
                borderRadius: 6,
                padding: '10px 12px',
                color: TEXT,
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Notes */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5,
              textTransform: 'uppercase', marginBottom: 8,
            }}>
              Notes
            </div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="How was your day? Any observations..."
              rows={4}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${BORDER}`,
                borderRadius: 6,
                padding: '10px 12px',
                color: TEXT,
                fontSize: 14,
                lineHeight: 1.6,
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 8,
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LT})`,
              border: 'none',
              color: '#0D1117',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: 0.5,
            }}
          >
            Submit Entry
          </button>
        </div>
      ) : (
        <div style={{
          background: PAPER,
          borderRadius: 10,
          padding: '24px 20px',
          border: `1px solid ${GOLD_RULE}`,
          marginBottom: 40,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 18, color: GOLD_LT, fontFamily: 'Georgia, "Times New Roman", serif', marginBottom: 8 }}>
            Entry Recorded
          </div>
          <div style={{ fontSize: 13, color: TEXT_DIM }}>
            Your journal entry for {today.date} has been saved.
          </div>
        </div>
      )}

      {/* Past Entries */}
      <div style={{
        fontSize: 10, color: GOLD, letterSpacing: 3, textTransform: 'uppercase',
        fontWeight: 600, marginBottom: 20,
      }}>
        Recent Entries
      </div>

      {PAST_ENTRIES.map((entry, i) => (
        <div key={i} style={{ marginBottom: 32 }}>
          <div style={{
            fontSize: 12, color: GOLD, letterSpacing: 0.5, marginBottom: 12,
            fontWeight: 500,
          }}>
            {entry.date}
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: TEXT_DIM }}>
              Mood: <span style={{ color: TEXT, fontWeight: 500 }}>{entry.mood}/5</span>
            </span>
            <span style={{ fontSize: 12, color: TEXT_DIM }}>
              Energy: <span style={{ color: TEXT, fontWeight: 500 }}>{entry.energy}/5</span>
            </span>
          </div>
          {entry.intention && (
            <div style={{
              fontSize: 13, color: GOLD_LT, fontStyle: 'italic', marginBottom: 8,
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}>
              "{entry.intention}"
            </div>
          )}
          <div style={{ fontSize: 14, lineHeight: 1.7, color: TEXT_DIM }}>
            {entry.notes}
          </div>
          {i < PAST_ENTRIES.length - 1 && (
            <hr style={{ border: 'none', borderTop: `1px solid ${BORDER}`, margin: '24px 0 0 0' }} />
          )}
        </div>
      ))}
    </div>
  );
}

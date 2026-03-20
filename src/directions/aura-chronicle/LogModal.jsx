import React, { useState } from 'react';

const BG = '#0D1117';
const PAPER = '#111520';
const GOLD = '#C9A96E';
const GOLD_LT = '#E8D5A8';
const GOLD_RULE = 'rgba(201,169,110,0.3)';
const TEXT = '#E8E8E8';
const TEXT_DIM = '#8B949E';
const TEXT_CAPTION = '#6B7280';
const BORDER = 'rgba(255,255,255,0.06)';

const LOG_TYPES = [
  {
    id: 'activity',
    label: 'Activity',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
      </svg>
    ),
  },
  {
    id: 'sleep',
    label: 'Sleep Note',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    id: 'biometric',
    label: 'Biometric Reading',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

const WORKOUT_TYPES = ['Strength', 'Running', 'Cycling', 'Swimming', 'Yoga', 'Walking', 'HIIT', 'Other'];

function ActivityForm({ onClose }) {
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState(3);

  return (
    <div>
      <div style={{ fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>
        Workout Type
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {WORKOUT_TYPES.map(t => (
          <button key={t} onClick={() => setType(t)} style={{
            padding: '6px 14px',
            borderRadius: 6,
            background: type === t ? 'rgba(201,169,110,0.2)' : 'transparent',
            border: `1px solid ${type === t ? GOLD : BORDER}`,
            color: type === t ? GOLD_LT : TEXT_DIM,
            fontSize: 12,
            cursor: 'pointer',
          }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>
        Duration (minutes)
      </div>
      <input
        type="number"
        value={duration}
        onChange={e => setDuration(e.target.value)}
        placeholder="45"
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${BORDER}`,
          borderRadius: 6,
          padding: '10px 12px',
          color: TEXT,
          fontSize: 14,
          outline: 'none',
          marginBottom: 20,
          boxSizing: 'border-box',
        }}
      />

      <div style={{ fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>
        Intensity
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {[1, 2, 3, 4, 5].map(v => (
          <button key={v} onClick={() => setIntensity(v)} style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            background: intensity === v ? GOLD : 'transparent',
            border: `2px solid ${intensity === v ? GOLD : BORDER}`,
            color: intensity === v ? BG : TEXT_DIM,
            fontSize: 14,
            fontWeight: intensity === v ? 700 : 400,
            cursor: 'pointer',
          }}>
            {v}
          </button>
        ))}
      </div>

      <button onClick={onClose} style={{
        width: '100%',
        padding: '12px',
        borderRadius: 8,
        background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LT})`,
        border: 'none',
        color: BG,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
      }}>
        Save Activity
      </button>
    </div>
  );
}

function SleepNoteForm({ onClose }) {
  const [note, setNote] = useState('');
  return (
    <div>
      <div style={{ fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>
        Sleep Note
      </div>
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Any notes about your sleep..."
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
          marginBottom: 20,
          boxSizing: 'border-box',
        }}
      />
      <button onClick={onClose} style={{
        width: '100%',
        padding: '12px',
        borderRadius: 8,
        background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LT})`,
        border: 'none',
        color: BG,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
      }}>
        Save Note
      </button>
    </div>
  );
}

function BiometricForm({ onClose }) {
  const [reading, setReading] = useState('');
  const [metric, setMetric] = useState('weight');
  return (
    <div>
      <div style={{ fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>
        Metric
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['weight', 'blood pressure', 'glucose', 'temperature'].map(m => (
          <button key={m} onClick={() => setMetric(m)} style={{
            padding: '6px 14px',
            borderRadius: 6,
            background: metric === m ? 'rgba(201,169,110,0.2)' : 'transparent',
            border: `1px solid ${metric === m ? GOLD : BORDER}`,
            color: metric === m ? GOLD_LT : TEXT_DIM,
            fontSize: 12,
            cursor: 'pointer',
            textTransform: 'capitalize',
          }}>
            {m}
          </button>
        ))}
      </div>

      <div style={{ fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>
        Value
      </div>
      <input
        type="text"
        value={reading}
        onChange={e => setReading(e.target.value)}
        placeholder="Enter value..."
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${BORDER}`,
          borderRadius: 6,
          padding: '10px 12px',
          color: TEXT,
          fontSize: 14,
          outline: 'none',
          marginBottom: 20,
          boxSizing: 'border-box',
        }}
      />
      <button onClick={onClose} style={{
        width: '100%',
        padding: '12px',
        borderRadius: 8,
        background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LT})`,
        border: 'none',
        color: BG,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
      }}>
        Save Reading
      </button>
    </div>
  );
}

export default function LogModal({ onClose }) {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 500,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
        }}
      />

      {/* Sheet */}
      <div style={{
        position: 'relative',
        background: PAPER,
        borderRadius: '16px 16px 0 0',
        padding: '20px 24px 32px',
        maxWidth: 390,
        width: '100%',
        margin: '0 auto',
        maxHeight: '70vh',
        overflowY: 'auto',
        paddingBottom: 'calc(32px + env(safe-area-inset-bottom, 0px))',
      }}>
        {/* Handle */}
        <div style={{
          width: 40,
          height: 4,
          borderRadius: 2,
          background: 'rgba(255,255,255,0.2)',
          margin: '0 auto 20px',
        }} />

        {!selectedType ? (
          <>
            <div style={{
              fontSize: 16, fontWeight: 600, color: TEXT, marginBottom: 4,
            }}>
              Quick Log
            </div>
            <div style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 20 }}>
              What would you like to record?
            </div>

            {LOG_TYPES.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  width: '100%',
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${BORDER}`,
                  borderRadius: 10,
                  padding: '16px 18px',
                  cursor: 'pointer',
                  marginBottom: 10,
                  textAlign: 'left',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD_RULE; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; }}
              >
                {t.icon}
                <span style={{ fontSize: 14, color: TEXT, fontWeight: 500 }}>{t.label}</span>
              </button>
            ))}
          </>
        ) : (
          <>
            <button
              onClick={() => setSelectedType(null)}
              style={{
                background: 'none',
                border: 'none',
                color: GOLD,
                fontSize: 12,
                cursor: 'pointer',
                padding: '0 0 16px 0',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15,18 9,12 15,6" />
              </svg>
              Back
            </button>

            {selectedType === 'activity' && <ActivityForm onClose={onClose} />}
            {selectedType === 'sleep' && <SleepNoteForm onClose={onClose} />}
            {selectedType === 'biometric' && <BiometricForm onClose={onClose} />}
          </>
        )}
      </div>
    </div>
  );
}

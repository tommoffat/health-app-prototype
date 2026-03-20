import React, { useState } from 'react';
import { BG_CARD, GOLD, GOLD_LT, TEXT, TEXT_DIM, CREAM, BORDER, ICONS, spacedCaps, btnReset } from './palette.js';
import BottomSheet from './components/BottomSheet.jsx';

const options = [
  {
    id: 'activity',
    icon: ICONS.dumbbell,
    label: 'Log Activity',
    desc: 'Record a workout or movement',
    fields: [
      { key: 'type', label: 'Activity Type', placeholder: 'e.g. Running, Weights...' },
      { key: 'duration', label: 'Duration (min)', placeholder: '45' },
      { key: 'notes', label: 'Notes', placeholder: 'How did it feel?', multiline: true },
    ],
  },
  {
    id: 'sleep',
    icon: ICONS.moon,
    label: 'Sleep Note',
    desc: 'Pre or post sleep note',
    fields: [
      { key: 'timing', label: 'Timing', placeholder: 'Pre-sleep or post-wake' },
      { key: 'notes', label: 'Notes', placeholder: 'Any observations...', multiline: true },
    ],
  },
  {
    id: 'reading',
    icon: ICONS.pulse,
    label: 'Record Reading',
    desc: 'Manual biometric entry',
    fields: [
      { key: 'metric', label: 'Metric', placeholder: 'e.g. Blood Pressure, Weight...' },
      { key: 'value', label: 'Value', placeholder: '120/80' },
      { key: 'notes', label: 'Notes', placeholder: 'Context...', multiline: true },
    ],
  },
];

export default function LogModal({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setExpanded(null);
    setFormData({});
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 1200);
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: 8,
    background: '#0A0C12', border: `1px solid ${BORDER}`,
    color: TEXT, fontSize: 13, fontFamily: 'inherit',
    outline: 'none', boxSizing: 'border-box',
  };

  return (
    <BottomSheet open={open} onClose={handleClose} title="Request a Service">
      <div style={{ padding: '0 20px 20px' }}>
        {options.map((opt) => {
          const isExpanded = expanded === opt.id;
          return (
            <div key={opt.id} style={{ marginBottom: 10 }}>
              <button
                onClick={() => setExpanded(isExpanded ? null : opt.id)}
                style={{
                  ...btnReset, width: '100%', display: 'flex', alignItems: 'center',
                  padding: '16px', borderRadius: 12,
                  background: BG_CARD, border: `1px solid ${isExpanded ? `${GOLD}30` : BORDER}`,
                  textAlign: 'left',
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `${GOLD}10`, border: `1px solid ${GOLD}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={opt.icon} />
                  </svg>
                </div>
                <div style={{ flex: 1, marginLeft: 12 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: TEXT }}>{opt.label}</div>
                  <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 2 }}>{opt.desc}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TEXT_DIM} strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path d={ICONS.chevron} />
                </svg>
              </button>

              {isExpanded && (
                <div style={{ padding: '16px 16px 8px', background: BG_CARD, borderRadius: '0 0 12px 12px', marginTop: -4 }}>
                  {opt.fields.map((field) => (
                    <div key={field.key} style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 6, letterSpacing: 0.3 }}>{field.label}</div>
                      {field.multiline ? (
                        <textarea
                          placeholder={field.placeholder}
                          rows={3}
                          value={formData[`${opt.id}_${field.key}`] || ''}
                          onChange={(e) => setFormData({ ...formData, [`${opt.id}_${field.key}`]: e.target.value })}
                          style={{ ...inputStyle, resize: 'none', lineHeight: 1.5 }}
                        />
                      ) : (
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          value={formData[`${opt.id}_${field.key}`] || ''}
                          onChange={(e) => setFormData({ ...formData, [`${opt.id}_${field.key}`]: e.target.value })}
                          style={inputStyle}
                        />
                      )}
                    </div>
                  ))}
                  <button onClick={handleSubmit} style={{
                    ...btnReset, width: '100%', padding: '12px 0',
                    borderRadius: 10, background: submitted ? `${GOLD}40` : GOLD,
                    color: submitted ? GOLD_LT : '#0A0C12', fontSize: 14,
                    fontWeight: 600, letterSpacing: 0.5, marginTop: 4,
                  }}>
                    {submitted ? 'Submitted' : 'Submit'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </BottomSheet>
  );
}

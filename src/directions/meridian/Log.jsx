import React, { useState } from 'react';

const categories = [
  { key: 'supplement', label: 'Supplement', icon: '💊', color: '#007AFF' },
  { key: 'workout', label: 'Workout', icon: '🏋️', color: '#FF3B30' },
  { key: 'meal', label: 'Meal', icon: '🍽️', color: '#FF9500' },
  { key: 'note', label: 'Note', icon: '📝', color: '#34C759' },
];

const s = {
  page: { padding: '0 0 24px 0' },
  sectionHeader: {
    fontSize: 13, fontWeight: '600', color: '#6C6C70', textTransform: 'uppercase',
    letterSpacing: 0.5, padding: '24px 16px 8px 16px',
  },
  grid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '0 16px',
  },
  catCard: (color) => ({
    background: '#FFFFFF', borderRadius: 16, padding: '24px 16px',
    boxShadow: '0 0.5px 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
    cursor: 'pointer', border: 'none', WebkitTapHighlightColor: 'transparent',
  }),
  catIcon: { fontSize: 36 },
  catLabel: { fontSize: 15, fontWeight: '600', color: '#000' },
  entriesCard: {
    background: '#FFFFFF', borderRadius: 16, margin: '0 16px',
    boxShadow: '0 0.5px 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
  },
  entryRow: (last) => ({
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '14px 16px',
    borderBottom: last ? 'none' : '0.5px solid #E5E5EA',
  }),
  entryIcon: { fontSize: 20 },
  entryText: { fontSize: 17, color: '#000', flex: 1 },
  entryTime: { fontSize: 15, color: '#6C6C70' },
  empty: { padding: 24, textAlign: 'center', color: '#6C6C70', fontSize: 15 },
  // Modal / bottom sheet
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.3)', zIndex: 1000,
    display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
  },
  sheet: {
    background: '#FFFFFF', borderRadius: '16px 16px 0 0', width: '100%', maxWidth: 500,
    padding: '12px 0 0', maxHeight: '70vh', overflow: 'auto',
  },
  sheetHandle: {
    width: 36, height: 5, borderRadius: 3, background: '#C7C7CC',
    margin: '0 auto 12px',
  },
  sheetTitle: {
    fontSize: 17, fontWeight: '600', color: '#000', textAlign: 'center',
    padding: '0 16px 16px', borderBottom: '0.5px solid #E5E5EA',
  },
  sheetBody: { padding: 16 },
  input: {
    width: '100%', padding: '12px 16px', fontSize: 17, border: '1px solid #E5E5EA',
    borderRadius: 12, outline: 'none', boxSizing: 'border-box', marginBottom: 12,
    fontFamily: 'inherit',
  },
  submitBtn: {
    width: '100%', padding: '14px', fontSize: 17, fontWeight: '600',
    background: '#007AFF', color: '#FFFFFF', border: 'none', borderRadius: 12,
    cursor: 'pointer', marginBottom: 8,
  },
  cancelBtn: {
    width: '100%', padding: '14px', fontSize: 17, fontWeight: '600',
    background: 'transparent', color: '#007AFF', border: 'none', borderRadius: 12,
    cursor: 'pointer',
  },
};

export default function Log() {
  const [modal, setModal] = useState(null);
  const [entries, setEntries] = useState([
    { cat: 'supplement', text: 'Omega-3', time: '8:00 AM' },
    { cat: 'supplement', text: 'Vitamin D', time: '8:00 AM' },
    { cat: 'workout', text: 'Upper Body Strength', time: '7:15 AM' },
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleAdd = () => {
    if (!inputVal.trim()) return;
    const now = new Date();
    const h = now.getHours(); const m = now.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const timeStr = `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${ampm}`;
    setEntries([{ cat: modal, text: inputVal.trim(), time: timeStr }, ...entries]);
    setInputVal('');
    setModal(null);
  };

  const catInfo = (key) => categories.find(c => c.key === key);

  return (
    <div style={s.page}>
      <div style={s.sectionHeader}>Log an Entry</div>
      <div style={s.grid}>
        {categories.map(cat => (
          <div key={cat.key} style={s.catCard(cat.color)} onClick={() => setModal(cat.key)}>
            <span style={s.catIcon}>{cat.icon}</span>
            <span style={s.catLabel}>{cat.label}</span>
          </div>
        ))}
      </div>

      <div style={s.sectionHeader}>Today's Entries</div>
      <div style={s.entriesCard}>
        {entries.length === 0 ? (
          <div style={s.empty}>No entries yet today</div>
        ) : entries.map((e, i) => (
          <div key={i} style={s.entryRow(i === entries.length - 1)}>
            <span style={s.entryIcon}>{catInfo(e.cat)?.icon}</span>
            <span style={s.entryText}>{e.text}</span>
            <span style={s.entryTime}>{e.time}</span>
          </div>
        ))}
      </div>

      {/* Bottom Sheet Modal */}
      {modal && (
        <div style={s.overlay} onClick={() => setModal(null)}>
          <div style={s.sheet} onClick={e => e.stopPropagation()}>
            <div style={s.sheetHandle} />
            <div style={s.sheetTitle}>Log {catInfo(modal)?.label}</div>
            <div style={s.sheetBody}>
              <input
                style={s.input}
                placeholder={`Enter ${catInfo(modal)?.label.toLowerCase()} details...`}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAdd()}
                autoFocus
              />
              <button style={s.submitBtn} onClick={handleAdd}>Add Entry</button>
              <button style={s.cancelBtn} onClick={() => setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

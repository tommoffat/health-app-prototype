import React, { useState } from 'react';
import { today } from '../../data/fake';

const categories = [
  { key: 'food', label: 'Food', icon: '\uD83C\uDF3F', color: '#7A9B76' },
  { key: 'water', label: 'Water', icon: '\uD83D\uDCA7', color: '#5A7A8A' },
  { key: 'mood', label: 'Mood', icon: '\u2600\uFE0F', color: '#D4845A' },
  { key: 'supplements', label: 'Supplements', icon: '\uD83D\uDC8A', color: '#B8A48A' },
];

const mockEntries = [
  { time: '7:30 AM', category: 'food', text: 'Oatmeal with berries' },
  { time: '8:00 AM', category: 'supplements', text: 'Omega-3, Vitamin D' },
  { time: '9:15 AM', category: 'water', text: '16 oz water' },
  { time: '12:00 PM', category: 'mood', text: 'Feeling focused' },
];

export default function Log({ onBack }) {
  const [modal, setModal] = useState(null);

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backBtn}>&larr; Back</button>
      <h1 style={styles.title}>Log</h1>
      <p style={styles.subtitle}>Record your daily wellness entries.</p>

      {/* 2x2 Category Grid */}
      <div style={styles.grid}>
        {categories.map((c) => (
          <button key={c.key} style={styles.catCard} onClick={() => setModal(c.key)}>
            <span style={{ fontSize: 28 }}>{c.icon}</span>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: '#F5EDD8' }}>{c.label}</span>
          </button>
        ))}
      </div>

      {/* Today's Entries */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Today's Entries</h2>
        {mockEntries.map((e, i) => {
          const cat = categories.find((c) => c.key === e.category);
          return (
            <div key={i} style={styles.entryCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: cat?.color || '#B8A48A', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 14, color: '#F5EDD8' }}>{e.text}</div>
                  <div style={{ fontSize: 11, color: '#B8A48A', marginTop: 2 }}>{e.time} &middot; {cat?.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Supplements Checklist */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Supplement Tracker</h2>
        <div style={styles.card}>
          {today.supplements.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
              <span style={{
                width: 18, height: 18, borderRadius: '50%',
                border: s.done ? 'none' : '1.5px solid #B8A48A',
                background: s.done ? '#7A9B76' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, color: '#1A1410', flexShrink: 0,
              }}>{s.done && '\u2713'}</span>
              <span style={{ fontSize: 14, color: s.done ? '#B8A48A' : '#F5EDD8', textDecoration: s.done ? 'line-through' : 'none' }}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 24 }} />

      {/* Bottom Sheet Modal */}
      {modal && (
        <>
          <div style={styles.backdrop} onClick={() => setModal(null)} />
          <div style={styles.modal}>
            <div style={styles.modalHandle} />
            <h3 style={styles.modalTitle}>Log {categories.find(c => c.key === modal)?.label}</h3>
            <div style={styles.modalInput}>
              <input
                type="text"
                placeholder={`What did you ${modal === 'mood' ? 'feel' : modal === 'water' ? 'drink' : 'have'}?`}
                style={styles.input}
                autoFocus
              />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button style={styles.modalCancel} onClick={() => setModal(null)}>Cancel</button>
              <button style={styles.modalSave} onClick={() => setModal(null)}>Save Entry</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '16px 20px', minHeight: '100vh', position: 'relative' },
  backBtn: { background: 'none', border: 'none', color: '#D4845A', fontFamily: 'Georgia, serif', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 8 },
  title: { fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 26, fontWeight: 400, color: '#F5EDD8', letterSpacing: 0.5 },
  subtitle: { fontSize: 14, color: '#B8A48A', marginBottom: 20, fontFamily: 'Georgia, serif' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 },
  catCard: {
    background: '#231C15', borderRadius: 14, padding: '24px 16px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
    border: 'none', cursor: 'pointer',
  },
  section: { marginBottom: 24 },
  sectionTitle: { fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: 400, color: '#F5EDD8', marginBottom: 12 },
  card: { background: '#231C15', borderRadius: 14, padding: '14px 18px' },
  entryCard: { background: '#231C15', borderRadius: 12, padding: '12px 16px', marginBottom: 8 },
  backdrop: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.6)', zIndex: 100,
  },
  modal: {
    position: 'fixed', bottom: 0, left: 0, right: 0,
    background: '#231C15', borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: '12px 24px 36px', zIndex: 101,
    maxWidth: 430, margin: '0 auto',
  },
  modalHandle: { width: 36, height: 4, borderRadius: 2, background: 'rgba(184,164,138,0.2)', margin: '0 auto 16px' },
  modalTitle: { fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 400, color: '#F5EDD8', marginBottom: 16 },
  modalInput: { marginBottom: 4 },
  input: {
    width: '100%', padding: '12px 14px', background: '#1A1410', border: '1px solid rgba(184,164,138,0.15)',
    borderRadius: 10, color: '#F5EDD8', fontSize: 14, fontFamily: 'Georgia, serif',
    outline: 'none', boxSizing: 'border-box',
  },
  modalCancel: {
    flex: 1, padding: '12px', background: 'transparent', border: '1px solid rgba(184,164,138,0.2)',
    borderRadius: 10, color: '#B8A48A', fontFamily: 'Georgia, serif', fontSize: 14, cursor: 'pointer',
  },
  modalSave: {
    flex: 1, padding: '12px', background: '#D4845A', border: 'none',
    borderRadius: 10, color: '#1A1410', fontFamily: 'Georgia, serif', fontSize: 14, cursor: 'pointer', fontWeight: 600,
  },
};

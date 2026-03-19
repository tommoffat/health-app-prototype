import React, { useState } from 'react';
import { today } from '../../data/fake';

const categories = [
  {
    key: 'workout',
    label: 'Workout',
    color: '#FF8C42',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF8C42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 6.5h11v11h-11z" /><path d="M3 12h3" /><path d="M18 12h3" /><path d="M12 3v3" /><path d="M12 18v3" />
      </svg>
    ),
  },
  {
    key: 'nutrition',
    label: 'Nutrition',
    color: '#34C759',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    key: 'supplement',
    label: 'Supplement',
    color: '#5856D6',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5856D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="4" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    key: 'mood',
    label: 'Mood',
    color: '#FF3B30',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
];

export default function LogScreen() {
  const [modal, setModal] = useState(null);

  const doneCount = today.supplements.filter(s => s.done).length;
  const totalCount = today.supplements.length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>Journal</div>
        <div style={styles.subtitle}>Track your daily wellness</div>
      </div>

      {/* Category Grid */}
      <div style={styles.grid}>
        {categories.map((cat) => (
          <button key={cat.key} style={styles.catCard} onClick={() => setModal(cat.key)}>
            <div style={{ ...styles.iconCircle, background: `${cat.color}10` }}>
              {cat.icon}
            </div>
            <span style={styles.catLabel}>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Today's Entries */}
      <div style={styles.section}>
        <div style={styles.sectionLabel}>TODAY'S LOG</div>

        {/* Workout Entry */}
        <div style={styles.entryCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 4, height: 36, borderRadius: 2, background: '#FF8C42' }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>{today.workout.name}</div>
              <div style={{ fontSize: 13, color: '#8E8E93', marginTop: 2 }}>{today.workout.setsComplete}/{today.workout.setsTotal} sets</div>
            </div>
          </div>
        </div>

        {/* Supplement Entry */}
        <div style={styles.entryCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 4, height: 36, borderRadius: 2, background: '#5856D6' }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>Supplements</div>
              <div style={{ fontSize: 13, color: '#8E8E93', marginTop: 2 }}>{doneCount}/{totalCount} taken</div>
            </div>
          </div>
        </div>
      </div>

      {/* Supplements Checklist */}
      <div style={styles.section}>
        <div style={styles.sectionLabel}>SUPPLEMENTS</div>
        <div style={styles.card}>
          {today.supplements.map((sup, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < today.supplements.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
              <span style={{ fontSize: 15, color: sup.done ? '#8E8E93' : '#1A1A1A', textDecoration: sup.done ? 'line-through' : 'none' }}>{sup.name}</span>
              <div style={{ width: 22, height: 22, borderRadius: 11, border: sup.done ? 'none' : '2px solid #E5E5EA', background: sup.done ? '#34C759' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {sup.done && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming */}
      <div style={{ ...styles.section, marginBottom: 24 }}>
        <div style={styles.sectionLabel}>UPCOMING</div>
        <div style={styles.card}>
          {today.upcoming.map((ev, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < today.upcoming.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
              <span style={{ fontSize: 14, color: '#1A1A1A' }}>{ev.label}</span>
              <span style={{ fontSize: 13, color: '#8E8E93', fontWeight: 500 }}>{ev.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div style={styles.overlay} onClick={() => setModal(null)}>
          <div style={styles.sheet} onClick={e => e.stopPropagation()}>
            <div style={styles.sheetHandle} />
            <div style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 8, textTransform: 'capitalize' }}>
              Log {modal}
            </div>
            <div style={{ fontSize: 14, color: '#8E8E93', marginBottom: 20 }}>
              Quick log your {modal} entry for today.
            </div>
            <div style={styles.inputRow}>
              <div style={styles.fakeInput}>Tap to add details...</div>
            </div>
            <button style={styles.logBtn} onClick={() => setModal(null)}>
              Save Entry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '16px 16px 0 16px',
    minHeight: '100%',
  },
  header: {
    paddingTop: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#8E8E93',
    marginTop: 4,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    marginBottom: 24,
  },
  catCard: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    WebkitTapHighlightColor: 'transparent',
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: '#1A1A1A',
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: '#8E8E93',
    letterSpacing: 1,
    marginBottom: 10,
    paddingLeft: 4,
  },
  entryCard: {
    background: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    marginBottom: 8,
  },
  card: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: '4px 18px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 200,
  },
  sheet: {
    background: '#FFFFFF',
    borderRadius: '20px 20px 0 0',
    padding: '12px 24px 32px 24px',
    width: '100%',
    maxWidth: 420,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    background: '#E5E5EA',
    margin: '0 auto 16px auto',
  },
  inputRow: {
    marginBottom: 16,
  },
  fakeInput: {
    background: '#F8F8F8',
    borderRadius: 12,
    padding: '14px 16px',
    fontSize: 15,
    color: '#8E8E93',
  },
  logBtn: {
    width: '100%',
    padding: '14px 0',
    borderRadius: 14,
    background: '#1A1A1A',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
  },
};

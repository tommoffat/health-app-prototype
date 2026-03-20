import React from 'react';

const GOLD = '#C9A96E';
const GOLD_RULE = 'rgba(201,169,110,0.3)';

export default function EditorialSection({ id, label, children, showTopRule = true }) {
  return (
    <section id={id} style={{ padding: '0 24px 48px', maxWidth: 640, margin: '0 auto' }}>
      {showTopRule && (
        <hr style={{
          border: 'none',
          borderTop: `1px solid ${GOLD_RULE}`,
          margin: '0 0 40px 0',
        }} />
      )}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 28,
      }}>
        <div style={{
          width: 32,
          height: 2,
          background: GOLD,
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: 10,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: GOLD,
          fontWeight: 600,
        }}>
          {label}
        </span>
      </div>
      {children}
    </section>
  );
}

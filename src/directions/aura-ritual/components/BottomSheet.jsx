import React, { useEffect, useState } from 'react';

const BG = '#0D1117';
const BORDER = 'rgba(255,255,255,0.08)';

export default function BottomSheet({ open, onClose, title, children }) {
  const [visible, setVisible] = useState(false);
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true)));
    } else {
      setAnimIn(false);
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!visible) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: animIn ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0)',
        transition: 'background 0.3s ease',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#161B22',
          borderTop: `1px solid ${BORDER}`,
          borderRadius: '20px 20px 0 0',
          padding: '12px 20px 20px',
          paddingBottom: 'max(20px, env(safe-area-inset-bottom, 0px))',
          maxHeight: '70vh',
          overflowY: 'auto',
          transform: animIn ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* handle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
        </div>
        {title && (
          <div style={{ fontSize: 16, fontWeight: 600, color: '#F0F0F0', marginBottom: 16 }}>{title}</div>
        )}
        {children}
      </div>
    </div>
  );
}

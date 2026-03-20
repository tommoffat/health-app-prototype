import React from 'react';
import { BG_SHEET, BORDER, TEXT_DIM, btnReset, ICONS } from '../palette.js';

export default function BottomSheet({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
      zIndex: 200, display: 'flex', alignItems: 'flex-end',
      animation: 'as-fadeIn 0.2s ease-out',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: '100%', maxHeight: '85vh', background: BG_SHEET,
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        overflowY: 'auto', animation: 'as-slideUp 0.3s ease-out',
        paddingBottom: 'env(safe-area-inset-bottom, 20px)',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10, paddingBottom: 8 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
        </div>
        {/* Header */}
        {title && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 20px 16px' }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#E8E4D8', letterSpacing: 0.5 }}>{title}</div>
            <button onClick={onClose} style={{ ...btnReset, padding: 6, borderRadius: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TEXT_DIM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={ICONS.close} />
              </svg>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

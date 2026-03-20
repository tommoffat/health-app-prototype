import React from 'react';
import { BG_CARD, BORDER, GOLD, TEXT, TEXT_DIM, ICONS, btnReset } from '../palette.js';

export default function ServiceCard({ icon, title, score, status, statusColor, onTap }) {
  return (
    <button onClick={onTap} style={{
      ...btnReset,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '16px',
      background: BG_CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: 14,
      textAlign: 'left',
    }}>
      {/* Gold icon square */}
      <div style={{
        width: 42, height: 42, borderRadius: 10,
        background: `${GOLD}12`, border: `1px solid ${GOLD}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d={icon} />
        </svg>
      </div>
      {/* Center: name + score */}
      <div style={{ flex: 1, marginLeft: 14 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: TEXT, letterSpacing: 0.3 }}>{title}</div>
        <div style={{ fontSize: 13, color: TEXT_DIM, marginTop: 2 }}>{score}</div>
      </div>
      {/* Status + chevron */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          padding: '3px 10px', borderRadius: 10, fontSize: 11, fontWeight: 600,
          letterSpacing: 0.5, color: statusColor, background: `${statusColor}15`,
        }}>{status}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEXT_DIM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d={ICONS.chevron} />
        </svg>
      </div>
    </button>
  );
}

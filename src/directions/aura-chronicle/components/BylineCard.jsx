import React from 'react';

const PAPER = '#111520';
const GOLD = '#C9A96E';
const TEXT = '#E8E8E8';
const TEXT_DIM = '#8B949E';
const BORDER = 'rgba(255,255,255,0.06)';

export default function BylineCard({ title, subtitle, detail, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        background: PAPER,
        border: `1px solid ${BORDER}`,
        borderRadius: 8,
        padding: '16px 18px',
        cursor: onClick ? 'pointer' : 'default',
        textAlign: 'left',
        marginBottom: 16,
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.borderColor = GOLD; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; }}
    >
      <div style={{ fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 4 }}>
        {title}
      </div>
      <div style={{ fontSize: 13, color: TEXT_DIM }}>
        {subtitle}
      </div>
      {detail && (
        <div style={{ fontSize: 12, color: GOLD, marginTop: 8, fontWeight: 500 }}>
          {detail}
        </div>
      )}
    </button>
  );
}

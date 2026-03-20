import React from 'react';

const BG = '#0D1117';
const BORDER = 'rgba(255,255,255,0.08)';

export default function AuroraCard({ gradient, accentColor, children, onClick, style = {} }) {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: 24,
        background: gradient,
        border: `1px solid ${accentColor}18`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.4s ease',
        animation: 'aurora-shift 8s ease-in-out infinite',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

import React from 'react';

const TEXT_DIM = '#8B949E';
const TEXT_CAPTION = '#6B7280';
const BORDER = 'rgba(255,255,255,0.06)';

export default function ArticleChart({ data, color = '#4ECDC4', width = 280, height = 100, label, showAxis = true }) {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padX = 32;
  const padY = 12;
  const usableW = width - padX * 2;
  const usableH = height - padY * 2;

  const points = data.map((v, i) => {
    const x = padX + (i / (data.length - 1)) * usableW;
    const y = padY + usableH - ((v - min) / range) * usableH;
    return { x, y, v };
  });

  const polyline = points.map(p => `${p.x},${p.y}`).join(' ');
  const gradId = `chart-grad-${color.replace('#', '')}`;
  const areaPoints = `${padX},${padY + usableH} ${polyline} ${padX + usableW},${padY + usableH}`;

  return (
    <div style={{ marginBottom: 20 }}>
      {label && (
        <div style={{
          fontSize: 11,
          color: TEXT_CAPTION,
          letterSpacing: 0.5,
          marginBottom: 8,
          textTransform: 'uppercase',
        }}>
          {label}
        </div>
      )}
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', width: '100%', height: 'auto' }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {showAxis && [0, 0.5, 1].map((frac, i) => {
          const y = padY + usableH * (1 - frac);
          const val = Math.round(min + range * frac);
          return (
            <g key={i}>
              <line x1={padX} y1={y} x2={padX + usableW} y2={y} stroke={BORDER} strokeWidth="1" />
              <text x={padX - 6} y={y + 3} textAnchor="end" fill={TEXT_DIM} fontSize="9" fontFamily="sans-serif">{val}</text>
            </g>
          );
        })}
        <polygon points={areaPoints} fill={`url(#${gradId})`} />
        <polyline
          points={polyline}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* End dot */}
        <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="3" fill={color} />
      </svg>
    </div>
  );
}

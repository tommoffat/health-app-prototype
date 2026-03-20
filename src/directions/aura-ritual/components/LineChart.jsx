import React from 'react';

export default function LineChart({ data, color, width = 280, height = 120, showBand = false, bandMin, bandMax, labels }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padY = 16;
  const padX = 8;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;

  const pts = data.map((v, i) => {
    const x = padX + (i / (data.length - 1)) * chartW;
    const y = padY + chartH - ((v - min) / range) * chartH;
    return { x, y };
  });

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${pts[pts.length - 1].x},${height - padY} L${pts[0].x},${height - padY} Z`;
  const gradId = `lc_${color.replace('#', '')}`;

  // band coordinates
  let bandY1, bandY2;
  if (showBand && bandMin !== undefined && bandMax !== undefined) {
    bandY1 = padY + chartH - ((bandMax - min) / range) * chartH;
    bandY2 = padY + chartH - ((bandMin - min) / range) * chartH;
  }

  const dayLabels = labels || ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <svg width={width} height={height + 20} viewBox={`0 0 ${width} ${height + 20}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {/* grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
        const y = padY + chartH * (1 - f);
        return <line key={i} x1={padX} y1={y} x2={width - padX} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />;
      })}

      {/* normal range band */}
      {showBand && bandY1 !== undefined && (
        <rect x={padX} y={bandY1} width={chartW} height={bandY2 - bandY1} fill={color} opacity="0.06" rx="4" />
      )}

      {/* area fill */}
      <path d={areaPath} fill={`url(#${gradId})`} />

      {/* line */}
      <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* dots */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === pts.length - 1 ? 4 : 2.5} fill={color} opacity={i === pts.length - 1 ? 1 : 0.5} />
      ))}

      {/* day labels */}
      {dayLabels.slice(0, data.length).map((label, i) => {
        const x = padX + (i / (data.length - 1)) * chartW;
        return (
          <text key={i} x={x} y={height + 14} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="inherit">
            {label}
          </text>
        );
      })}
    </svg>
  );
}

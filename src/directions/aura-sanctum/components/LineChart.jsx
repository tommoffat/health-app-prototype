import React from 'react';
import { TEXT_DIM, GOLD, BORDER } from '../palette.js';

export default function LineChart({
  data, color = GOLD, width = 340, height = 120,
  avgLine = null, avgColor = GOLD, bandLow = null, bandHigh = null, bandColor = 'rgba(201,169,110,0.08)',
  labels = null,
}) {
  if (!data || data.length < 2) return null;
  const pad = { top: 8, right: 8, bottom: labels ? 22 : 8, left: 8 };
  const cw = width - pad.left - pad.right;
  const ch = height - pad.top - pad.bottom;
  const allVals = [...data, ...(avgLine != null ? [avgLine] : []), ...(bandLow != null ? [bandLow] : []), ...(bandHigh != null ? [bandHigh] : [])];
  const min = Math.min(...allVals) - 2;
  const max = Math.max(...allVals) + 2;
  const range = max - min || 1;
  const step = cw / (data.length - 1);
  const toX = (i) => pad.left + i * step;
  const toY = (v) => pad.top + ch - ((v - min) / range) * ch;

  const linePath = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ');
  const areaPath = linePath + ` L${toX(data.length - 1)},${pad.top + ch} L${toX(0)},${pad.top + ch} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
        const y = pad.top + ch * (1 - f);
        return <line key={i} x1={pad.left} y1={y} x2={width - pad.right} y2={y} stroke={BORDER} strokeWidth="1" />;
      })}
      {/* Normal band */}
      {bandLow != null && bandHigh != null && (
        <rect x={pad.left} y={toY(bandHigh)} width={cw} height={toY(bandLow) - toY(bandHigh)} fill={bandColor} />
      )}
      {/* Average line */}
      {avgLine != null && (
        <line x1={pad.left} y1={toY(avgLine)} x2={width - pad.right} y2={toY(avgLine)}
          stroke={avgColor} strokeWidth="1.5" strokeDasharray="5,4" opacity="0.6" />
      )}
      {/* Area fill */}
      <path d={areaPath} fill={color} opacity="0.08" />
      {/* Main line */}
      <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* End dot */}
      <circle cx={toX(data.length - 1)} cy={toY(data[data.length - 1])} r="3.5" fill={color} />
      {/* Labels */}
      {labels && labels.map((l, i) => (
        <text key={i} x={toX(i)} y={height - 4} textAnchor="middle" fill={TEXT_DIM} fontSize="9" fontFamily="inherit">
          {l}
        </text>
      ))}
    </svg>
  );
}

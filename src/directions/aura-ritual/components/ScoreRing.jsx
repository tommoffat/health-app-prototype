import React from 'react';

export default function ScoreRing({ score, maxScore = 100, size = 160, color, trackColor }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / maxScore) * circumference;
  const center = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      {/* track */}
      <circle
        cx={center} cy={center} r={radius}
        fill="none"
        stroke={trackColor || `${color}18`}
        strokeWidth={strokeWidth}
        strokeDasharray="6 3"
      />
      {/* progress arc */}
      <circle
        cx={center} cy={center} r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={`${progress} ${circumference - progress}`}
        strokeDashoffset={circumference * 0.25}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.6s ease' }}
      />
    </svg>
  );
}

import React from 'react';
import { RECOVERY, SLEEP, STRAIN } from '../palette.js';

const SCHEMES = {
  lobby: { colors: [RECOVERY, SLEEP, STRAIN], moon: null },
  recovery: { colors: [RECOVERY, RECOVERY, '#2ECC71'], moon: 'crescent' },
  sleep: { colors: [SLEEP, SLEEP, '#7B68EE'], moon: 'full' },
  strain: { colors: [STRAIN, STRAIN, '#E8731A'], moon: 'quarter' },
};

const stars = [
  [40,22,1.2,0.6],[90,45,0.8,0.5],[130,15,1.0,0.7],[170,55,0.6,0.4],
  [210,20,1.1,0.65],[250,38,0.7,0.55],[290,12,0.9,0.6],[320,50,1.0,0.5],
  [360,28,0.8,0.7],[55,60,0.5,0.45],[185,35,0.6,0.5],[340,18,1.0,0.6],
  [75,10,0.7,0.55],[155,42,0.9,0.65],[230,8,0.6,0.5],[305,58,0.5,0.4],
  [380,40,0.8,0.6],[20,48,0.6,0.45],[270,25,1.1,0.7],[110,55,0.4,0.35],
];

export default function AuroraHeader({ colorScheme = 'lobby', height = 200, children }) {
  const scheme = SCHEMES[colorScheme] || SCHEMES.lobby;
  const [c1, c2, c3] = scheme.colors;
  const id = `as-${colorScheme}`;

  return (
    <div style={{ position: 'relative', width: '100%', height, overflow: 'hidden', flexShrink: 0 }}>
      <svg width="100%" height={height} viewBox={`0 0 400 ${height}`} preserveAspectRatio="xMidYMid slice"
        style={{ display: 'block', position: 'absolute', top: 0, left: 0 }}>
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#05080F" />
            <stop offset="40%" stopColor="#0A0C12" />
            <stop offset="100%" stopColor="#111520" />
          </linearGradient>
          <linearGradient id={`${id}-a1`} x1="0" y1="0" x2="1" y2="0.5">
            <stop offset="0%" stopColor={c1} stopOpacity="0" />
            <stop offset="30%" stopColor={c1} stopOpacity="0.06" />
            <stop offset="50%" stopColor={c2} stopOpacity="0.08" />
            <stop offset="70%" stopColor={c3} stopOpacity="0.05" />
            <stop offset="100%" stopColor={c3} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${id}-a2`} x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor={c2} stopOpacity="0" />
            <stop offset="40%" stopColor={c2} stopOpacity="0.06" />
            <stop offset="60%" stopColor={c1} stopOpacity="0.07" />
            <stop offset="100%" stopColor={c3} stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor={c1} stopOpacity="0.04" />
            <stop offset="100%" stopColor={c1} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Sky */}
        <rect width="400" height={height} fill={`url(#${id}-sky)`} />
        {/* Aurora shimmer */}
        <ellipse cx="200" cy={height * 0.3} rx="260" ry="40" fill={`url(#${id}-a1)`} />
        <ellipse cx="160" cy={height * 0.4} rx="200" ry="30" fill={`url(#${id}-a2)`} />
        <ellipse cx="260" cy={height * 0.25} rx="140" ry="25" fill={`url(#${id}-a2)`} opacity="0.5" />
        {/* Warm glow */}
        <rect width="400" height={height} fill={`url(#${id}-glow)`} />
        {/* Stars */}
        {stars.map(([cx, cy, r, op], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="#FFF" opacity={op} />
        ))}
        {/* Moon */}
        {scheme.moon === 'full' && (
          <circle cx="340" cy="35" r="12" fill="#E8E4D8" opacity="0.12" />
        )}
        {scheme.moon === 'crescent' && (
          <>
            <circle cx="340" cy="35" r="12" fill="#E8E4D8" opacity="0.10" />
            <circle cx="346" cy="31" r="10" fill="#05080F" />
          </>
        )}
        {scheme.moon === 'quarter' && (
          <>
            <circle cx="340" cy="35" r="12" fill="#E8E4D8" opacity="0.10" />
            <rect x="340" y="23" width="14" height="24" fill="#05080F" />
          </>
        )}
        {/* Mountain silhouette */}
        <path
          d={`M0 ${height} L0 ${height * 0.85} L30 ${height * 0.78} L70 ${height * 0.83} L100 ${height * 0.7} L140 ${height * 0.75} L170 ${height * 0.63} L200 ${height * 0.68} L230 ${height * 0.6} L260 ${height * 0.65} L290 ${height * 0.58} L320 ${height * 0.64} L350 ${height * 0.55} L380 ${height * 0.63} L400 ${height * 0.59} L400 ${height} Z`}
          fill="#080C14" opacity="0.9"
        />
        <path
          d={`M0 ${height} L0 ${height * 0.9} L50 ${height * 0.86} L100 ${height * 0.8} L150 ${height * 0.84} L200 ${height * 0.78} L250 ${height * 0.81} L300 ${height * 0.74} L350 ${height * 0.78} L400 ${height * 0.73} L400 ${height} Z`}
          fill="#0A0E18" opacity="0.7"
        />
      </svg>
      {/* Overlaid text content */}
      {children && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0 24px 20px', zIndex: 1,
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

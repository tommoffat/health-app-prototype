import { useId } from 'react';
import { useTheme } from '../themes';

export default function LineChart({ data, color, width = 300, height = 100, fill = true, showDots = false }) {
  const theme = useTheme();
  const id = useId();
  const c = color || theme.colors.accent;
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 4;

  const points = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (width - pad * 2),
    y: pad + (1 - (v - min) / range) * (height - pad * 2),
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const fillD = `${pathD} L${points[points.length-1].x},${height} L${points[0].x},${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {fill && (
        <>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={c} stopOpacity="0.3" />
              <stop offset="100%" stopColor={c} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={fillD} fill={`url(#${id})`} />
        </>
      )}
      <path d={pathD} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {showDots && points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={c} />
      ))}
    </svg>
  );
}

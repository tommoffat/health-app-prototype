import { useTheme } from '../themes';

export default function Sparkline({ data, color, width = 80, height = 32 }) {
  const theme = useTheme();
  const c = color || theme.colors.accent;
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) =>
    `${(i / (data.length - 1)) * width},${(1 - (v - min) / range) * height}`
  ).join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline points={points} fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

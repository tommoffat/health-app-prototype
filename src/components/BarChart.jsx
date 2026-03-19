import { useTheme } from '../themes';

export default function BarChart({ data, color, width = 300, height = 100, barRadius = 3 }) {
  const theme = useTheme();
  const c = color || theme.colors.accent;
  if (!data || data.length === 0) return null;

  const max = Math.max(...data);
  const gap = 2;
  const barW = (width - gap * (data.length - 1)) / data.length;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {data.map((v, i) => {
        const barH = (v / max) * (height - 4);
        const x = i * (barW + gap);
        const y = height - barH;
        return <rect key={i} x={x} y={y} width={barW} height={barH} rx={barRadius} fill={c} opacity={0.8} />;
      })}
    </svg>
  );
}

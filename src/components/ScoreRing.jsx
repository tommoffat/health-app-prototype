import { useTheme } from '../themes';

export default function ScoreRing({ score, size = 120, strokeWidth = 8, color, label, fontSize }) {
  const theme = useTheme();
  const c = color || theme.colors.accent;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const numSize = fontSize || size * 0.3;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none"
          stroke={theme.colors.border} strokeWidth={strokeWidth} opacity={0.3} />
        <circle cx={size/2} cy={size/2} r={radius} fill="none"
          stroke={c} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
      </svg>
      <div style={{
        position: 'relative', marginTop: -size - 4, height: size,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: theme.style.numberFont, fontWeight: theme.style.numberWeight,
          fontSize: numSize, color: theme.colors.text, lineHeight: 1,
        }}>{score}</span>
      </div>
      {label && <span style={{
        fontFamily: theme.fonts.body, fontSize: '12px',
        color: theme.colors.textSecondary, marginTop: '4px',
      }}>{label}</span>}
    </div>
  );
}

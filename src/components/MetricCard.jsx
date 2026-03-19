import { useTheme } from '../themes';
import Sparkline from './Sparkline';

export default function MetricCard({ label, value, unit, sparkData, color, onClick }) {
  const theme = useTheme();

  return (
    <div onClick={onClick} style={{
      background: theme.colors.cardBg || theme.colors.surface,
      border: theme.style.cardBorder,
      borderRadius: theme.style.cardRadius,
      boxShadow: theme.style.cardShadow || 'none',
      padding: '14px',
      cursor: onClick ? 'pointer' : 'default',
      backdropFilter: theme.style.frosted ? 'blur(20px)' : undefined,
      display: 'flex', flexDirection: 'column', gap: '8px',
    }}>
      <span style={{ fontFamily: theme.fonts.body, fontSize: '12px', color: theme.colors.textSecondary }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <span style={{
            fontFamily: theme.style.numberFont, fontWeight: theme.style.numberWeight,
            fontSize: '24px', color: theme.colors.text, lineHeight: 1,
          }}>{value}</span>
          {unit && <span style={{
            fontFamily: theme.fonts.body, fontSize: '13px',
            color: theme.colors.textSecondary, marginLeft: '4px',
          }}>{unit}</span>}
        </div>
        {sparkData && <Sparkline data={sparkData} color={color || theme.colors.accent} width={60} height={28} />}
      </div>
    </div>
  );
}

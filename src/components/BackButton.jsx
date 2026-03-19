import { useTheme } from '../themes';

export default function BackButton({ onBack, label = 'Back' }) {
  const theme = useTheme();
  return (
    <button onClick={onBack} style={{
      background: 'none', border: 'none', color: theme.colors.accent,
      fontFamily: theme.fonts.body, fontSize: '16px', cursor: 'pointer',
      padding: '8px 0', display: 'flex', alignItems: 'center', gap: '4px',
    }}>
      ← {label}
    </button>
  );
}

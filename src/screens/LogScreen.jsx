import { useTheme } from '../themes';

export default function LogScreen() {
  const theme = useTheme();

  const moods = ['😴', '😐', '🙂', '😀', '🔥'];
  const selectedMood = 3;
  const energyValue = 7;
  const sorenessValue = 3;

  const card = {
    background: theme.colors.cardBg || theme.colors.surface,
    border: theme.style.cardBorder,
    borderRadius: theme.style.cardRadius,
    boxShadow: theme.style.cardShadow || 'none',
    padding: '16px',
    backdropFilter: theme.style.frosted ? 'blur(20px)' : undefined,
  };

  const sliderTrack = (value, max, color) => (
    <div style={{ position: 'relative', height: '32px', display: 'flex', alignItems: 'center' }}>
      <div style={{
        width: '100%', height: '6px', borderRadius: '3px',
        background: theme.colors.border,
      }}>
        <div style={{
          height: '100%', borderRadius: '3px', background: color,
          width: `${(value / max) * 100}%`,
        }} />
      </div>
      <div style={{
        position: 'absolute', left: `calc(${(value / max) * 100}% - 12px)`,
        width: '24px', height: '24px', borderRadius: '12px',
        background: color, border: `3px solid ${theme.colors.surface}`,
        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }} />
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h1 style={{
        fontFamily: theme.fonts.heading, fontWeight: theme.style.headingWeight,
        fontSize: '28px', color: theme.colors.text,
      }}>Daily Check-in</h1>

      {/* Mood */}
      <div style={card}>
        <p style={{
          fontFamily: theme.fonts.body, fontSize: '13px',
          color: theme.colors.textSecondary, marginBottom: '12px',
        }}>How are you feeling?</p>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {moods.map((m, i) => (
            <span key={i} style={{
              fontSize: '28px', padding: '8px',
              borderRadius: '12px',
              background: i === selectedMood ? theme.colors.accent + '33' : 'transparent',
              border: i === selectedMood ? `2px solid ${theme.colors.accent}` : '2px solid transparent',
              cursor: 'pointer',
            }}>{m}</span>
          ))}
        </div>
      </div>

      {/* Energy */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <p style={{ fontFamily: theme.fonts.body, fontSize: '13px', color: theme.colors.textSecondary }}>Energy</p>
          <span style={{
            fontFamily: theme.style.numberFont, fontWeight: theme.style.numberWeight,
            fontSize: '15px', color: theme.colors.accent,
          }}>{energyValue}/10</span>
        </div>
        {sliderTrack(energyValue, 10, theme.colors.accent)}
      </div>

      {/* Soreness */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <p style={{ fontFamily: theme.fonts.body, fontSize: '13px', color: theme.colors.textSecondary }}>Soreness</p>
          <span style={{
            fontFamily: theme.style.numberFont, fontWeight: theme.style.numberWeight,
            fontSize: '15px', color: '#FF6B6B',
          }}>{sorenessValue}/10</span>
        </div>
        {sliderTrack(sorenessValue, 10, '#FF6B6B')}
      </div>

      {/* Notes */}
      <div style={card}>
        <textarea
          readOnly
          placeholder="Notes for Tom..."
          style={{
            width: '100%', minHeight: '100px', padding: '12px',
            borderRadius: '8px', border: `1px solid ${theme.colors.border}`,
            background: theme.colors.surfaceAlt || theme.colors.surface,
            color: theme.colors.text, fontFamily: theme.fonts.body, fontSize: '15px',
            resize: 'none', outline: 'none',
          }}
        />
      </div>

      {/* Submit */}
      <button style={{
        width: '100%', padding: '16px', borderRadius: '12px',
        background: theme.colors.accent, border: 'none',
        color: theme.style.isLight ? '#FFFFFF' : '#000000',
        fontFamily: theme.fonts.heading, fontWeight: '600', fontSize: '17px',
        cursor: 'pointer',
      }}>Log Today</button>
    </div>
  );
}

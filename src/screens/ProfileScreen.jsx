import { useTheme, themes } from '../themes';
import { USER } from '../data/fake';

export default function ProfileScreen({ currentTheme, onThemeChange, onShowProgress }) {
  const theme = useTheme();

  const card = {
    background: theme.colors.cardBg || theme.colors.surface,
    border: theme.style.cardBorder,
    borderRadius: theme.style.cardRadius,
    boxShadow: theme.style.cardShadow || 'none',
    padding: '16px',
    backdropFilter: theme.style.frosted ? 'blur(20px)' : undefined,
  };

  const sectionTitle = {
    fontFamily: theme.fonts.heading, fontWeight: theme.style.headingWeight,
    fontSize: '17px', color: theme.colors.text, marginBottom: '12px',
  };

  const row = (label, value, accent) => (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 0', borderBottom: `1px solid ${theme.colors.border}`,
    }}>
      <span style={{ fontFamily: theme.fonts.body, fontSize: '15px', color: theme.colors.text }}>{label}</span>
      <span style={{
        fontFamily: theme.fonts.body, fontSize: '15px',
        color: accent ? theme.colors.accent : theme.colors.textSecondary,
      }}>{value}</span>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Profile Header */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '36px',
          background: theme.colors.accent, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: theme.fonts.heading, fontWeight: '700',
            fontSize: '24px', color: theme.style.isLight ? '#FFFFFF' : '#000000',
          }}>{USER.initials}</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontFamily: theme.fonts.heading, fontWeight: theme.style.headingWeight,
            fontSize: '22px', color: theme.colors.text,
          }}>{USER.name}</h1>
          <p style={{
            fontFamily: theme.fonts.body, fontSize: '14px',
            color: theme.colors.accent, marginTop: '2px',
          }}>{USER.plan}</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        {[
          { label: 'Days Active', value: USER.daysActive },
          { label: 'Workouts', value: USER.workoutsLogged },
          { label: 'Data Pts', value: USER.dataPointsSynced.toLocaleString() },
        ].map(s => (
          <div key={s.label} style={{ ...card, textAlign: 'center' }}>
            <p style={{
              fontFamily: theme.style.numberFont, fontWeight: theme.style.numberWeight,
              fontSize: '20px', color: theme.colors.text,
            }}>{s.value}</p>
            <p style={{
              fontFamily: theme.fonts.body, fontSize: '11px',
              color: theme.colors.textSecondary, marginTop: '4px',
            }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Connected Devices */}
      <div style={card}>
        <h3 style={sectionTitle}>Connected Devices</h3>
        {row('Apple Watch', '✓ Connected', true)}
        {row('HealthKit', '✓ Synced', true)}
      </div>

      {/* Supplements & Coach */}
      <div style={card}>
        <h3 style={sectionTitle}>Configuration</h3>
        {row('Supplements', '5 configured')}
        {row('Coach', '✓ Connected', true)}
      </div>

      {/* Progress Link */}
      {onShowProgress && (
        <button onClick={onShowProgress} style={{
          ...card, cursor: 'pointer', textAlign: 'center',
          fontFamily: theme.fonts.heading, fontWeight: '600',
          fontSize: '16px', color: theme.colors.accent, width: '100%',
        }}>
          View Progress & Trends →
        </button>
      )}

      {/* Theme Picker */}
      <div style={card}>
        <h3 style={sectionTitle}>Theme</h3>
        <div style={{
          display: 'flex', gap: '10px', overflowX: 'auto',
          paddingBottom: '4px', WebkitOverflowScrolling: 'touch',
        }}>
          {themes.map(t => (
            <button
              key={t.name}
              onClick={() => onThemeChange(t)}
              style={{
                flexShrink: 0,
                width: '48px', height: '48px', borderRadius: '24px',
                background: t.colors.accent,
                border: currentTheme.name === t.name
                  ? `3px solid ${theme.colors.text}`
                  : '3px solid transparent',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: currentTheme.name === t.name ? `0 0 0 2px ${t.colors.accent}` : 'none',
              }}
              title={t.name}
            >
              {currentTheme.name === t.name && (
                <span style={{ fontSize: '18px', color: theme.style.isLight ? '#FFFFFF' : '#000000' }}>✓</span>
              )}
            </button>
          ))}
        </div>
        <p style={{
          fontFamily: theme.fonts.body, fontSize: '12px',
          color: theme.colors.textSecondary, marginTop: '8px', textAlign: 'center',
        }}>{currentTheme.name} — {currentTheme.description}</p>
      </div>
    </div>
  );
}

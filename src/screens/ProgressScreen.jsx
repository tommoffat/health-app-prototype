import { useTheme } from '../themes';
import LineChart from '../components/LineChart';
import { USER, HRV_30D, WEIGHT_30D } from '../data/fake';

const HABIT_DATA = [
  { name: 'Omega-3', pct: 87 },
  { name: 'Vitamin D', pct: 91 },
  { name: 'Magnesium', pct: 64 },
  { name: 'Creatine', pct: 72 },
  { name: 'NAD+', pct: 45 },
];

export default function ProgressScreen({ onBack }) {
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {onBack && (
        <button onClick={onBack} style={{
          background: 'none', border: 'none', color: theme.colors.accent,
          fontFamily: theme.fonts.body, fontSize: '16px', cursor: 'pointer',
          padding: '0', textAlign: 'left',
        }}>← Back</button>
      )}

      <h1 style={{
        fontFamily: theme.fonts.heading, fontWeight: theme.style.headingWeight,
        fontSize: '28px', color: theme.colors.text,
      }}>Progress</h1>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        {[
          { label: 'Streak', value: `${ACTIVITY_STREAK}d` },
          { label: 'Workouts', value: String(USER.workoutsLogged) },
          { label: 'Days Active', value: String(USER.daysActive) },
        ].map(s => (
          <div key={s.label} style={{ ...card, textAlign: 'center' }}>
            <p style={{
              fontFamily: theme.style.numberFont, fontWeight: theme.style.numberWeight,
              fontSize: '22px', color: theme.colors.accent,
            }}>{s.value}</p>
            <p style={{
              fontFamily: theme.fonts.body, fontSize: '12px',
              color: theme.colors.textSecondary, marginTop: '4px',
            }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* HRV Trend */}
      <div style={card}>
        <p style={sectionTitle}>HRV Trend — 30 Days</p>
        <LineChart data={HRV_30D} width={310} height={100} color={theme.colors.accent} />
      </div>

      {/* Weight */}
      <div style={card}>
        <p style={sectionTitle}>Weight — 30 Days</p>
        <LineChart data={WEIGHT_30D} width={310} height={100} color="#4ECDC4" />
      </div>

      {/* Habits This Month */}
      <div style={card}>
        <p style={sectionTitle}>Habits — This Month</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {HABIT_DATA.map(h => (
            <div key={h.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontFamily: theme.fonts.body, fontSize: '14px', color: theme.colors.text }}>{h.name}</span>
                <span style={{ fontFamily: theme.style.numberFont, fontSize: '13px', color: theme.colors.textSecondary }}>{h.pct}%</span>
              </div>
              <div style={{ height: '6px', borderRadius: '3px', background: theme.colors.border }}>
                <div style={{
                  height: '100%', borderRadius: '3px', background: theme.colors.accent,
                  width: `${h.pct}%`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const ACTIVITY_STREAK = 12;

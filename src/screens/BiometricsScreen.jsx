import { useTheme } from '../themes';
import MetricCard from '../components/MetricCard';
import { BIOMETRICS } from '../data/fake';

export default function BiometricsScreen() {
  const theme = useTheme();

  const card = {
    background: theme.colors.cardBg || theme.colors.surface,
    border: theme.style.cardBorder,
    borderRadius: theme.style.cardRadius,
    boxShadow: theme.style.cardShadow || 'none',
    padding: '16px',
    backdropFilter: theme.style.frosted ? 'blur(20px)' : undefined,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h1 style={{
        fontFamily: theme.fonts.heading, fontWeight: theme.style.headingWeight,
        fontSize: '28px', color: theme.colors.text,
      }}>Biometrics</h1>

      <h3 style={{
        fontFamily: theme.fonts.heading, fontWeight: theme.style.headingWeight,
        fontSize: '17px', color: theme.colors.text,
      }}>7-Day Trends</h3>

      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <MetricCard
          label="HRV"
          value={BIOMETRICS.hrv.current}
          unit={BIOMETRICS.hrv.unit}
          sparkData={BIOMETRICS.hrv.data7d}
          color={theme.colors.accent}
        />
        <MetricCard
          label="Resting HR"
          value={BIOMETRICS.restingHR.current}
          unit={BIOMETRICS.restingHR.unit}
          sparkData={BIOMETRICS.restingHR.data7d}
          color="#FF6B6B"
        />
        <MetricCard
          label="Weight"
          value={BIOMETRICS.weight.current}
          unit={BIOMETRICS.weight.unit}
          sparkData={BIOMETRICS.weight.data7d}
          color="#4ECDC4"
        />
        <MetricCard
          label="Body Fat"
          value={BIOMETRICS.bodyFat.current}
          unit={BIOMETRICS.bodyFat.unit}
          color="#FFD93D"
        />
      </div>

      {/* Inline Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={card}>
          <p style={{ fontFamily: theme.fonts.body, fontSize: '13px', color: theme.colors.textSecondary }}>SpO2</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '6px' }}>
            <span style={{
              fontFamily: theme.style.numberFont, fontWeight: theme.style.numberWeight,
              fontSize: '24px', color: theme.colors.text,
            }}>{BIOMETRICS.spo2.current}</span>
            <span style={{ fontFamily: theme.fonts.body, fontSize: '13px', color: theme.colors.textSecondary }}>{BIOMETRICS.spo2.unit}</span>
          </div>
        </div>
        <div style={card}>
          <p style={{ fontFamily: theme.fonts.body, fontSize: '13px', color: theme.colors.textSecondary }}>Body Temp</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '6px' }}>
            <span style={{
              fontFamily: theme.style.numberFont, fontWeight: theme.style.numberWeight,
              fontSize: '24px', color: theme.colors.text,
            }}>+{BIOMETRICS.bodyTemp.current}</span>
            <span style={{ fontFamily: theme.fonts.body, fontSize: '13px', color: theme.colors.textSecondary }}>{BIOMETRICS.bodyTemp.unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

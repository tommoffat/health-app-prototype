import { useTheme } from '../themes';
import ScoreRing from '../components/ScoreRing';
import SleepStages from '../components/SleepStages';
import LineChart from '../components/LineChart';
import { SCORES, SLEEP, BIOMETRICS } from '../data/fake';

export default function SleepScreen() {
  const theme = useTheme();

  const stages = [SLEEP.deep, SLEEP.rem, SLEEP.light, SLEEP.awake];

  const card = {
    background: theme.colors.cardBg || theme.colors.surface,
    border: theme.style.cardBorder,
    borderRadius: theme.style.cardRadius,
    boxShadow: theme.style.cardShadow || 'none',
    padding: '16px',
    backdropFilter: theme.style.frosted ? 'blur(20px)' : undefined,
  };

  const statBox = (label, value) => (
    <div style={{ textAlign: 'center' }}>
      <p style={{
        fontFamily: theme.style.numberFont, fontWeight: theme.style.numberWeight,
        fontSize: '18px', color: theme.colors.text,
      }}>{value}</p>
      <p style={{
        fontFamily: theme.fonts.body, fontSize: '12px',
        color: theme.colors.textSecondary, marginTop: '4px',
      }}>{label}</p>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h1 style={{
        fontFamily: theme.fonts.heading, fontWeight: theme.style.headingWeight,
        fontSize: '28px', color: theme.colors.text,
      }}>Sleep</h1>

      {/* Score Ring */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
        <ScoreRing score={SCORES.sleep} size={140} strokeWidth={10} label="Sleep Score" color={theme.colors.sleep} />
      </div>

      {/* Sleep Stages */}
      <div style={card}>
        <p style={{
          fontFamily: theme.fonts.body, fontSize: '13px',
          color: theme.colors.textSecondary, marginBottom: '12px',
        }}>Sleep Stages</p>
        <SleepStages stages={stages} width={310} height={28} />
        <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
          {stages.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: s.color }} />
              <span style={{ fontFamily: theme.fonts.body, fontSize: '12px', color: theme.colors.textSecondary }}>
                {s.label} {s.duration}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        ...card,
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        gap: '16px',
      }}>
        {statBox('Total', SLEEP.total)}
        {statBox('Deep', SLEEP.deep.duration)}
        {statBox('REM', SLEEP.rem.duration)}
        {statBox('Efficiency', `${SLEEP.efficiency}%`)}
        {statBox('Latency', SLEEP.latency)}
        {statBox('In Bed', SLEEP.timeInBed)}
      </div>

      {/* HRV Sparkline */}
      <div style={card}>
        <p style={{
          fontFamily: theme.fonts.body, fontSize: '13px',
          color: theme.colors.textSecondary, marginBottom: '12px',
        }}>7-Day HRV Trend</p>
        <LineChart data={BIOMETRICS.hrv.data7d} width={310} height={80} color={theme.colors.accent} showDots />
      </div>
    </div>
  );
}

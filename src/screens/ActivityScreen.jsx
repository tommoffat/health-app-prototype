import { useTheme } from '../themes';
import ScoreRing from '../components/ScoreRing';
import BarChart from '../components/BarChart';
import { SCORES, ACTIVITY } from '../data/fake';

export default function ActivityScreen() {
  const theme = useTheme();

  const card = {
    background: theme.colors.cardBg || theme.colors.surface,
    border: theme.style.cardBorder,
    borderRadius: theme.style.cardRadius,
    boxShadow: theme.style.cardShadow || 'none',
    padding: '16px',
    backdropFilter: theme.style.frosted ? 'blur(20px)' : undefined,
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h1 style={{
        fontFamily: theme.fonts.heading, fontWeight: theme.style.headingWeight,
        fontSize: '28px', color: theme.colors.text,
      }}>Activity</h1>

      {/* Score Ring */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
        <ScoreRing score={SCORES.activity} size={140} strokeWidth={10} label="Activity Score" color={theme.colors.activity} />
      </div>

      {/* Steps */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <p style={{ fontFamily: theme.fonts.body, fontSize: '13px', color: theme.colors.textSecondary }}>Steps</p>
          <p style={{ fontFamily: theme.fonts.body, fontSize: '12px', color: theme.colors.textSecondary }}>Goal: 10,000</p>
        </div>
        <p style={{
          fontFamily: theme.style.numberFont, fontWeight: theme.style.numberWeight,
          fontSize: '32px', color: theme.colors.text, margin: '8px 0',
        }}>{ACTIVITY.steps.toLocaleString()}</p>
        <div style={{
          height: '6px', borderRadius: '3px', background: theme.colors.border,
        }}>
          <div style={{
            height: '100%', borderRadius: '3px', background: theme.colors.activity,
            width: `${Math.min(100, (ACTIVITY.steps / 10000) * 100)}%`,
          }} />
        </div>
      </div>

      {/* Active Calories + Stand Hours */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={card}>
          <p style={{ fontFamily: theme.fonts.body, fontSize: '13px', color: theme.colors.textSecondary }}>Active Cal</p>
          <p style={{
            fontFamily: theme.style.numberFont, fontWeight: theme.style.numberWeight,
            fontSize: '24px', color: theme.colors.text, marginTop: '6px',
          }}>{ACTIVITY.activeCalories}</p>
        </div>
        <div style={card}>
          <p style={{ fontFamily: theme.fonts.body, fontSize: '13px', color: theme.colors.textSecondary }}>Stand Hours</p>
          <p style={{
            fontFamily: theme.style.numberFont, fontWeight: theme.style.numberWeight,
            fontSize: '24px', color: theme.colors.text, marginTop: '6px',
          }}>{ACTIVITY.standHours.current}<span style={{ fontSize: '14px', color: theme.colors.textSecondary }}>/{ACTIVITY.standHours.goal}</span></p>
        </div>
      </div>

      {/* Weekly Bar Chart */}
      <div style={card}>
        <p style={{
          fontFamily: theme.fonts.body, fontSize: '13px',
          color: theme.colors.textSecondary, marginBottom: '12px',
        }}>Weekly Activity (cal)</p>
        <BarChart data={ACTIVITY.weeklyData} width={310} height={80} color={theme.colors.activity} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          {days.map(d => (
            <span key={d} style={{ fontFamily: theme.fonts.body, fontSize: '11px', color: theme.colors.textSecondary }}>
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Workout Card */}
      <div style={card}>
        <p style={{ fontFamily: theme.fonts.body, fontSize: '13px', color: theme.colors.textSecondary }}>Today's Workout</p>
        <p style={{
          fontFamily: theme.fonts.heading, fontWeight: '600',
          fontSize: '16px', color: theme.colors.text, marginTop: '6px',
        }}>{ACTIVITY.currentWorkout.name}</p>
        <p style={{
          fontFamily: theme.fonts.body, fontSize: '14px',
          color: theme.colors.accent, marginTop: '4px',
        }}>{ACTIVITY.currentWorkout.setsComplete}/{ACTIVITY.currentWorkout.setsTotal} sets complete</p>
      </div>
    </div>
  );
}

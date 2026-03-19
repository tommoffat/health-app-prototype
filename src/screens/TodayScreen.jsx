import { useState } from 'react';
import { useTheme } from '../themes';
import ScoreRing from '../components/ScoreRing';
import { SCORES, SUPPLEMENTS, ACTIVITY, USER } from '../data/fake';

export default function TodayScreen() {
  const theme = useTheme();
  const [supps, setSupps] = useState(SUPPLEMENTS.map(s => ({ ...s })));

  const moods = ['😴', '😐', '🙂', '😀', '🔥'];
  const energyEmojis = ['😩', '😮‍💨', '😐', '🙂', '💪'];

  const card = {
    background: theme.colors.cardBg || theme.colors.surface,
    border: theme.style.cardBorder,
    borderRadius: theme.style.cardRadius,
    boxShadow: theme.style.cardShadow || 'none',
    padding: '16px',
    backdropFilter: theme.style.frosted ? 'blur(20px)' : undefined,
  };

  const sectionTitle = {
    fontFamily: theme.fonts.heading,
    fontWeight: theme.style.headingWeight,
    fontSize: '17px',
    color: theme.colors.text,
    marginBottom: '12px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div>
        <h1 style={{
          fontFamily: theme.fonts.heading, fontWeight: theme.style.headingWeight,
          fontSize: '28px', color: theme.colors.text, lineHeight: 1.2,
        }}>Good morning, Tom</h1>
        <p style={{
          fontFamily: theme.fonts.body, fontSize: '15px',
          color: theme.colors.textSecondary, marginTop: '4px',
        }}>Wednesday, March 19</p>
      </div>

      {/* Score Rings */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '8px 0' }}>
        <ScoreRing score={SCORES.sleep} size={96} label="Sleep" color={theme.colors.sleep} />
        <ScoreRing score={SCORES.readiness} size={96} label="Readiness" color={theme.colors.readiness} />
        <ScoreRing score={SCORES.activity} size={96} label="Activity" color={theme.colors.activity} />
      </div>

      {/* Today's Program */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: theme.fonts.body, fontSize: '13px', color: theme.colors.textSecondary }}>Today's Program</p>
            <p style={{ fontFamily: theme.fonts.heading, fontWeight: '600', fontSize: '16px', color: theme.colors.text, marginTop: '4px' }}>
              {ACTIVITY.currentWorkout.name}
            </p>
          </div>
          <span style={{
            fontFamily: theme.style.numberFont, fontWeight: theme.style.numberWeight,
            fontSize: '14px', color: theme.colors.accent,
          }}>
            {ACTIVITY.currentWorkout.setsComplete}/{ACTIVITY.currentWorkout.setsTotal} sets
          </span>
        </div>
        <div style={{
          marginTop: '12px', height: '6px', borderRadius: '3px',
          background: theme.colors.border,
        }}>
          <div style={{
            height: '100%', borderRadius: '3px', background: theme.colors.accent,
            width: `${(ACTIVITY.currentWorkout.setsComplete / ACTIVITY.currentWorkout.setsTotal) * 100}%`,
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Habits */}
      <div>
        <h3 style={sectionTitle}>Habits</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {supps.map((s, i) => (
            <button key={i} onClick={() => {
              const next = [...supps];
              next[i] = { ...next[i], done: !next[i].done };
              setSupps(next);
            }} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 14px', borderRadius: '10px',
              border: `1px solid ${theme.colors.border}`,
              background: s.done ? theme.colors.accent + '18' : 'transparent',
              color: theme.colors.text, fontFamily: theme.fonts.body, fontSize: '15px',
              cursor: 'pointer', textAlign: 'left', width: '100%',
            }}>
              <span style={{ fontSize: '16px' }}>{s.done ? '✅' : '⬜'}</span>
              <span>{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Daily Log Quick Entry */}
      <div style={card}>
        <h3 style={{ ...sectionTitle, marginBottom: '14px' }}>Quick Check-in</h3>
        <div style={{ marginBottom: '14px' }}>
          <p style={{ fontFamily: theme.fonts.body, fontSize: '13px', color: theme.colors.textSecondary, marginBottom: '8px' }}>Mood</p>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {moods.map((m, i) => (
              <span key={i} style={{
                fontSize: '24px', padding: '6px',
                borderRadius: '8px',
                background: i === 3 ? theme.colors.accent + '33' : 'transparent',
                border: i === 3 ? `2px solid ${theme.colors.accent}` : '2px solid transparent',
              }}>{m}</span>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontFamily: theme.fonts.body, fontSize: '13px', color: theme.colors.textSecondary, marginBottom: '8px' }}>Energy</p>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {energyEmojis.map((e, i) => (
              <span key={i} style={{
                fontSize: '24px', padding: '6px',
                borderRadius: '8px',
                background: i === 3 ? theme.colors.accent + '33' : 'transparent',
                border: i === 3 ? `2px solid ${theme.colors.accent}` : '2px solid transparent',
              }}>{e}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

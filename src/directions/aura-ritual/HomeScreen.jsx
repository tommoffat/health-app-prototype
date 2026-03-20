import React, { useState } from 'react';
import { user, today, weeklyHRV, weeklySleep } from '../../data/fake.js';
import AuroraCard from './components/AuroraCard.jsx';
import ScoreRing from './components/ScoreRing.jsx';
import Sparkline from './components/Sparkline.jsx';

const BG = '#0D1117';
const TEXT = '#F0F0F0';
const TEXT_DIM = '#8B949E';
const BORDER = 'rgba(255,255,255,0.08)';
const GOLD = '#C9A96E';

const DOMAINS = {
  recovery: {
    label: 'Recovery', score: today.readiness.score,
    accent: '#4ECDC4', track: 'rgba(78,205,196,0.12)',
    gradient: 'linear-gradient(160deg, rgba(78,205,196,0.15) 0%, rgba(46,204,113,0.10) 60%, #0D1117 100%)',
    stats: [
      { label: 'HRV', value: `${today.readiness.hrv} ms` },
      { label: 'Resting HR', value: `${today.readiness.restingHR} bpm` },
      { label: 'SpO2', value: `${today.readiness.spo2}%` },
    ],
    metrics: [
      { label: 'HRV', value: `${today.readiness.hrv} ms`, sub: '7-day avg: 66 ms' },
      { label: 'Resting HR', value: `${today.readiness.restingHR} bpm`, sub: 'Optimal range' },
      { label: 'SpO2', value: `${today.readiness.spo2}%`, sub: 'Normal' },
      { label: 'Body Temp', value: today.readiness.bodyTemp || '+0.2°F', sub: 'Within baseline' },
    ],
    coaching: 'Your recovery is excellent today. HRV has been trending upward all week — your nervous system is well-adapted. Consider a higher-intensity session today.',
    sparkData: weeklyHRV,
  },
  sleep: {
    label: 'Sleep', score: today.sleep.score,
    accent: '#9B59B6', track: 'rgba(155,89,182,0.12)',
    gradient: 'linear-gradient(160deg, rgba(155,89,182,0.18) 0%, rgba(100,60,160,0.12) 60%, #0D1117 100%)',
    stats: [
      { label: 'Duration', value: today.sleep.total },
      { label: 'Deep', value: today.sleep.deep },
      { label: 'Efficiency', value: `${today.sleep.efficiency}%` },
    ],
    metrics: [
      { label: 'Total', value: today.sleep.total, sub: 'Target: 7h 30m' },
      { label: 'Deep Sleep', value: today.sleep.deep, sub: '23% of total' },
      { label: 'REM Sleep', value: today.sleep.rem, sub: '27% of total' },
      { label: 'Efficiency', value: `${today.sleep.efficiency}%`, sub: 'Excellent' },
    ],
    coaching: 'Sleep architecture looks great. Deep sleep exceeded your target by 14 minutes. Keep your wind-down routine consistent for continued gains.',
    sparkData: weeklySleep,
  },
  strain: {
    label: 'Strain', score: today.strain,
    accent: '#F0943A', track: 'rgba(240,148,58,0.12)',
    gradient: 'linear-gradient(160deg, rgba(240,148,58,0.15) 0%, rgba(200,100,30,0.10) 60%, #0D1117 100%)',
    stats: [
      { label: 'Calories', value: `${today.activity.calories} kcal` },
      { label: 'Steps', value: today.activity.steps.toLocaleString() },
      { label: 'Active Min', value: `${today.activity.activeMinutes} min` },
    ],
    metrics: [
      { label: 'Strain', value: `${today.strain}`, sub: 'Moderate load' },
      { label: 'Steps', value: today.activity.steps.toLocaleString(), sub: 'Goal: 10,000' },
      { label: 'Calories', value: `${today.activity.calories} kcal`, sub: 'Active burn' },
      { label: 'Active Min', value: `${today.activity.activeMinutes} min`, sub: 'Target: 60 min' },
    ],
    coaching: 'Strain is moderate at 12.4. With your high recovery score, you have headroom for a challenging workout. Zone 2 training load is on target this week.',
    sparkData: [8.2, 10.1, 14.3, 9.8, 11.6, 12.4, 12.4],
  },
  biology: {
    label: 'Biology', score: today.readiness.hrv,
    accent: '#E91E8C', track: 'rgba(233,30,140,0.10)',
    gradient: 'linear-gradient(160deg, rgba(233,30,140,0.12) 0%, rgba(155,89,182,0.08) 60%, #0D1117 100%)',
    stats: [
      { label: 'HRV', value: `${today.readiness.hrv} ms` },
      { label: 'RHR', value: `${today.readiness.restingHR} bpm` },
      { label: 'Weight', value: `${today.weight} lbs` },
    ],
    metrics: [
      { label: 'HRV', value: `${today.readiness.hrv} ms`, sub: 'Trending up' },
      { label: 'Resting HR', value: `${today.readiness.restingHR} bpm`, sub: 'Athletic range' },
      { label: 'SpO2', value: `${today.readiness.spo2}%`, sub: 'Optimal' },
      { label: 'Weight', value: `${today.weight} lbs`, sub: '-0.8 lbs/wk' },
    ],
    coaching: 'Biometrics are trending favorably. HRV is up 12% this week and resting heart rate remains in the athletic range. Body composition is shifting in the right direction.',
    sparkData: weeklyHRV,
  },
  journal: {
    label: 'Journal', score: 4,
    accent: '#C9A96E', track: 'rgba(201,169,110,0.12)',
    gradient: 'linear-gradient(160deg, rgba(201,169,110,0.15) 0%, rgba(180,140,80,0.08) 60%, #0D1117 100%)',
    stats: [
      { label: 'Mood', value: 'Great' },
      { label: 'Energy', value: 'High' },
      { label: 'Streak', value: '7 days' },
    ],
    metrics: [
      { label: 'Mood', value: '4/5', sub: 'Above average' },
      { label: 'Energy', value: 'High', sub: 'Matches recovery' },
      { label: 'Streak', value: '7 days', sub: 'Personal best' },
      { label: 'Entries', value: '28', sub: 'This month' },
    ],
    coaching: 'Your journaling streak is strong. Mood and energy are tracking with your recovery scores, which shows strong mind-body alignment. Keep reflecting.',
    sparkData: [3, 3, 4, 4, 3, 5, 4],
  },
};

export default function HomeScreen({ onExit, onNavigate, activeDomain, setActiveDomain }) {
  const [expanded, setExpanded] = useState(false);
  const domain = DOMAINS[activeDomain];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {/* scrollable area */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch', display: 'flex', flexDirection: 'column' }}>
        {/* top bar — low opacity */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 20px 4px', flexShrink: 0, opacity: 0.3,
        }}>
          <div style={{ fontSize: 12, color: TEXT_DIM, fontWeight: 500 }}>{today.date}</div>
          <div style={{ fontSize: 13, color: TEXT, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' }}>Ritual</div>
          <div
            onClick={onExit}
            style={{
              width: 30, height: 30, borderRadius: 15, background: 'rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 600, color: TEXT_DIM, letterSpacing: 0.5, cursor: 'pointer',
            }}
          >
            {user.initials}
          </div>
        </div>

        {/* hero card — fills available space */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 16px 0' }}>
          <AuroraCard gradient={domain.gradient} accentColor={domain.accent} onClick={() => setExpanded(!expanded)} style={{ flex: expanded ? 'none' : 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{
              padding: expanded ? '28px 24px 16px' : '0 24px',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: expanded ? 'flex-start' : 'center',
              flex: expanded ? 'none' : 1,
              transition: 'padding 0.3s ease',
            }}>
              {/* domain label */}
              <div style={{
                fontSize: 14, textTransform: 'uppercase', letterSpacing: 3,
                color: domain.accent, fontWeight: 600, marginBottom: 8, opacity: 0.9,
              }}>
                {domain.label}
              </div>

              {/* score ring + number */}
              <div style={{ position: 'relative', width: 160, height: 160, marginBottom: 8 }}>
                <ScoreRing score={activeDomain === 'strain' ? (domain.score / 21) * 100 : domain.score} size={160} color={domain.accent} trackColor={domain.track} />
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{
                    fontSize: 88, fontWeight: 200, color: TEXT, lineHeight: 1, letterSpacing: -2,
                    textShadow: `0 0 60px ${domain.accent}33`,
                  }}>
                    {activeDomain === 'journal' ? '' : domain.score}
                  </span>
                </div>
              </div>

              {/* descriptor */}
              <div style={{
                fontSize: 12, color: TEXT_DIM, marginBottom: 20, letterSpacing: 1,
                textTransform: 'uppercase',
              }}>
                {activeDomain === 'strain'
                  ? (domain.score >= 14 ? 'High' : domain.score >= 10 ? 'Moderate' : 'Low')
                  : activeDomain === 'journal'
                  ? 'Feeling Great'
                  : (domain.score >= 80 ? 'Optimal' : domain.score >= 60 ? 'Moderate' : 'Low')
                }
              </div>

              {/* 3 stat rows */}
              <div style={{ width: '100%', maxWidth: 260 }}>
                {domain.stats.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 0',
                    borderTop: i === 0 ? `1px solid ${BORDER}` : 'none',
                    borderBottom: `1px solid ${BORDER}`,
                  }}>
                    <span style={{ fontSize: 13, color: TEXT_DIM }}>{s.label}</span>
                    <span style={{ fontSize: 14, color: TEXT, fontWeight: 500 }}>{s.value}</span>
                  </div>
                ))}
              </div>

              {/* expand chevron */}
              <div style={{ marginTop: 16, opacity: 0.35 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEXT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>

            {/* expanded detail */}
            {expanded && (
              <div style={{ padding: '0 24px 20px', animation: 'cardReveal 0.4s ease-out' }}>
                {/* 2x2 metric grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                  {domain.metrics.map((m, i) => (
                    <div key={i} style={{
                      background: 'rgba(255,255,255,0.04)', border: `1px solid ${BORDER}`,
                      borderRadius: 14, padding: '14px 16px',
                    }}>
                      <div style={{ fontSize: 11, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>{m.label}</div>
                      <div style={{ fontSize: 22, fontWeight: 600, color: TEXT, marginBottom: 4 }}>{m.value}</div>
                      <div style={{ fontSize: 11, color: TEXT_DIM }}>{m.sub}</div>
                    </div>
                  ))}
                </div>

                {/* 7-day sparkline */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
                  borderRadius: 14, padding: '16px 20px', marginBottom: 16,
                }}>
                  <div style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>7-Day Trend</div>
                  <Sparkline data={domain.sparkData} color={domain.accent} width={280} height={50} />
                </div>

                {/* coaching */}
                <div style={{
                  background: `${domain.accent}0a`, border: `1px solid ${domain.accent}22`,
                  borderRadius: 14, padding: '16px 18px', marginBottom: 16,
                }}>
                  <div style={{ fontSize: 11, color: domain.accent, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, fontWeight: 600 }}>Coaching</div>
                  <div style={{ fontSize: 14, color: TEXT, lineHeight: 1.55, opacity: 0.88 }}>{domain.coaching}</div>
                </div>

                {/* View Trends button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const detailMap = { recovery: 'recoveryDetail', sleep: 'sleepDetail', strain: 'strainDetail' };
                    if (detailMap[activeDomain]) onNavigate(detailMap[activeDomain]);
                  }}
                  style={{
                    width: '100%', padding: '14px', borderRadius: 14,
                    background: `${domain.accent}18`, border: `1px solid ${domain.accent}33`,
                    color: domain.accent, fontSize: 14, fontWeight: 600,
                    cursor: 'pointer', letterSpacing: 0.5,
                  }}
                >
                  View Trends
                </button>
              </div>
            )}
          </AuroraCard>
        </div>
      </div>

      {/* domain switcher */}
      <div style={{
        display: 'flex', gap: 6, justifyContent: 'center', padding: '12px 12px 8px',
        flexShrink: 0, overflowX: 'auto',
      }}>
        {Object.keys(DOMAINS).map(d => {
          const isActive = d === activeDomain;
          const cfg = DOMAINS[d];
          return (
            <button
              key={d}
              onClick={() => { setActiveDomain(d); setExpanded(false); }}
              style={{
                background: isActive ? `${cfg.accent}22` : 'rgba(255,255,255,0.04)',
                border: isActive ? `1px solid ${cfg.accent}66` : `1px solid ${BORDER}`,
                borderRadius: 20, padding: '7px 14px', cursor: 'pointer',
                color: isActive ? cfg.accent : TEXT_DIM,
                fontSize: 12, fontWeight: isActive ? 600 : 400,
                transition: 'all 0.3s ease', whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              {cfg.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

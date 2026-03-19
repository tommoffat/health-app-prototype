import React, { useState } from 'react';
import { today, weeklyHRV, weeklyActivity, weeklySleep } from '../../data/fake';

const CORAL = '#FF6B35';
const TEAL = '#4ECDC4';
const PURPLE = '#9B59B6';
const BG = '#0F0F0F';
const SURFACE = '#1A1A1A';
const SURFACE2 = '#222222';
const WHITE = '#FFFFFF';
const GRAY = '#999999';

const scorePills = [
  { label: 'STRAIN', value: today.strain, color: CORAL, max: 21 },
  { label: 'RECOVERY', value: today.readiness.score, color: TEAL, max: 100, unit: '%' },
  { label: 'SLEEP', value: today.sleep.score, color: PURPLE, max: 100, unit: '%' },
];

const metrics = [
  { label: 'Steps', value: today.activity.steps.toLocaleString(), icon: '👟' },
  { label: 'Calories', value: `${today.activity.calories}`, icon: '🔥' },
  { label: 'Active Min', value: `${today.activity.activeMinutes}`, icon: '⏱' },
  { label: 'Resting HR', value: `${today.readiness.restingHR} bpm`, icon: '❤️' },
  { label: 'HRV', value: `${today.readiness.hrv} ms`, icon: '📈' },
  { label: 'SpO2', value: `${today.readiness.spo2}%`, icon: '🫁' },
];

function TrainingLoadBar() {
  const load = today.strain;
  const pct = Math.min((load / 21) * 100, 100);
  const zones = [
    { label: 'Light', end: 33, color: '#4ECDC4' },
    { label: 'Moderate', end: 66, color: CORAL },
    { label: 'Overreaching', end: 100, color: '#E74C3C' },
  ];
  return (
    <div style={{ background: SURFACE, borderRadius: 16, padding: '16px 20px', marginBottom: 16,
      borderTop: `2px solid ${SURFACE2}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ color: GRAY, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>Training Load</span>
        <span style={{ color: WHITE, fontSize: 14, fontWeight: 800 }}>{load.toFixed(1)}<span style={{ color: GRAY, fontSize: 11 }}> / 21</span></span>
      </div>
      <div style={{ position: 'relative', height: 12, borderRadius: 6, overflow: 'hidden', background: SURFACE2 }}>
        {zones.map((z, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${i === 0 ? 0 : zones[i - 1].end}%`, width: `${z.end - (i === 0 ? 0 : zones[i - 1].end)}%`,
            height: '100%', background: z.color, opacity: 0.15
          }} />
        ))}
        <div style={{
          position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`,
          background: `linear-gradient(90deg, ${TEAL}, ${CORAL})`, borderRadius: 6,
          transition: 'width 0.5s ease'
        }} />
        <div style={{
          position: 'absolute', left: `${pct}%`, top: -2, width: 4, height: 16, borderRadius: 2,
          background: WHITE, transform: 'translateX(-50%)',
          boxShadow: `0 0 8px ${CORAL}`
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        {zones.map((z, i) => (
          <span key={i} style={{ color: GRAY, fontSize: 9, letterSpacing: 0.5 }}>{z.label}</span>
        ))}
      </div>
    </div>
  );
}

function MiniSparkline({ data, color, width = 60, height = 24 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) =>
    `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 4) - 2}`
  ).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TodayScreen({ onNavigate }) {
  const [showFab, setShowFab] = useState(false);

  return (
    <div style={{ background: BG, minHeight: '100%', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 8px' }}>
        <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 2 }}>{today.date}</div>
        <div style={{ color: WHITE, fontSize: 22, fontWeight: 900, letterSpacing: 1.5, textTransform: 'uppercase' }}>DAILY PERFORMANCE</div>
      </div>

      {/* Score Pills */}
      <div style={{ display: 'flex', gap: 10, padding: '12px 20px' }}>
        {scorePills.map((pill, i) => (
          <div key={i} onClick={() => {
            if (pill.label === 'SLEEP') onNavigate('sleep');
            else if (pill.label === 'STRAIN') onNavigate('activity');
            else onNavigate('biometrics');
          }} style={{
            flex: 1, background: SURFACE, borderRadius: 20, padding: '20px 8px 16px',
            textAlign: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden',
            borderTop: `3px solid ${pill.color}`,
            transition: 'transform 0.15s ease',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 60,
              background: `linear-gradient(180deg, ${pill.color}15, transparent)`
            }} />
            <div style={{
              fontSize: 42, fontWeight: 900, color: pill.color, lineHeight: 1,
              textShadow: `0 0 30px ${pill.color}33`
            }}>
              {typeof pill.value === 'number' && pill.value % 1 !== 0 ? pill.value.toFixed(1) : pill.value}
            </div>
            <div style={{ color: GRAY, fontSize: 9, fontWeight: 700, letterSpacing: 2, marginTop: 6, textTransform: 'uppercase' }}>
              {pill.label}
            </div>
          </div>
        ))}
      </div>

      {/* Training Load Bar */}
      <div style={{ padding: '0 20px' }}>
        <TrainingLoadBar />
      </div>

      {/* Body Battery */}
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <div style={{ background: SURFACE, borderRadius: 16, padding: '16px 20px', borderTop: `2px solid ${SURFACE2}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ color: GRAY, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>Body Battery</span>
            <span style={{ color: TEAL, fontSize: 20, fontWeight: 900 }}>72<span style={{ color: GRAY, fontSize: 12 }}>/100</span></span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: SURFACE2, overflow: 'hidden' }}>
            <div style={{
              width: '72%', height: '100%', borderRadius: 4,
              background: `linear-gradient(90deg, ${CORAL}, ${TEAL})`
            }} />
          </div>
        </div>
      </div>

      {/* 2-Column Metric Grid */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {metrics.map((m, i) => {
            const sparkData = i < 2 ? weeklyActivity : i < 4 ? weeklyHRV : weeklySleep;
            const sparkColor = i < 2 ? CORAL : i < 4 ? TEAL : PURPLE;
            return (
              <div key={i} style={{
                background: SURFACE, borderRadius: 14, padding: '14px 16px',
                borderTop: `2px solid ${SURFACE2}`, position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ color: GRAY, fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{m.label}</div>
                    <div style={{ color: WHITE, fontSize: 22, fontWeight: 900 }}>{m.value}</div>
                  </div>
                  <MiniSparkline data={sparkData} color={sparkColor} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insights */}
      <div style={{ padding: '16px 20px' }}>
        <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Insights</div>
        {today.insights.map((ins, i) => (
          <div key={i} style={{
            background: SURFACE, borderRadius: 12, padding: '12px 16px', marginBottom: 8,
            borderLeft: `3px solid ${[CORAL, TEAL, PURPLE][i % 3]}`,
            color: WHITE, fontSize: 13, fontWeight: 500, lineHeight: 1.4
          }}>
            {ins}
          </div>
        ))}
      </div>

      {/* Workout Card */}
      {today.workout && (
        <div style={{ padding: '0 20px', marginBottom: 16 }}>
          <div style={{
            background: SURFACE, borderRadius: 16, padding: '16px 20px',
            borderTop: `3px solid ${CORAL}`
          }}>
            <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>Current Workout</div>
            <div style={{ color: WHITE, fontSize: 16, fontWeight: 800, marginBottom: 8 }}>{today.workout.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, height: 6, borderRadius: 3, background: SURFACE2, overflow: 'hidden' }}>
                <div style={{
                  width: `${(today.workout.setsComplete / today.workout.setsTotal) * 100}%`,
                  height: '100%', borderRadius: 3, background: CORAL
                }} />
              </div>
              <span style={{ color: CORAL, fontSize: 12, fontWeight: 700 }}>{today.workout.setsComplete}/{today.workout.setsTotal} sets</span>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <div onClick={() => onNavigate('log')} style={{
        position: 'fixed', bottom: 80, right: 20, width: 56, height: 56, borderRadius: 28,
        background: CORAL, display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', boxShadow: `0 4px 20px ${CORAL}66`,
        fontSize: 28, color: WHITE, fontWeight: 300, zIndex: 100
      }}>
        +
      </div>
    </div>
  );
}

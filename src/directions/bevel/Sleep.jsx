import React from 'react';
import { today, weeklySleep, weeklyHRV } from '../../data/fake';

const PURPLE = '#9B59B6';
const CORAL = '#FF6B35';
const TEAL = '#4ECDC4';
const BG = '#0F0F0F';
const SURFACE = '#1A1A1A';
const SURFACE2 = '#222222';
const WHITE = '#FFFFFF';
const GRAY = '#999999';

const s = today.sleep;

const stages = [
  { label: 'Deep', duration: s.deep, color: '#6C3483', pct: 24 },
  { label: 'REM', duration: s.rem, color: PURPLE, pct: 27 },
  { label: 'Light', duration: s.light, color: '#BB8FCE', pct: 43 },
  { label: 'Awake', duration: s.awake, color: '#E74C3C', pct: 6 },
];

const stats = [
  { label: 'Total Sleep', value: s.total },
  { label: 'Efficiency', value: `${s.efficiency}%` },
  { label: 'Latency', value: `${s.latency} min` },
  { label: 'Resting HR', value: `${s.restingHR} bpm` },
  { label: 'HRV', value: `${s.hrv} ms` },
  { label: 'SpO2', value: `${today.readiness.spo2}%` },
];

const recommendations = [
  'Maintain your 10:30 PM bedtime for optimal recovery',
  'Deep sleep is 24% of total — within ideal range',
  'HRV trending upward this week, keep it up',
];

function SleepStagesChart() {
  const W = 320, H = 140, pad = 40;
  const stageMap = { deep: 0, rem: 1, light: 2, awake: 3 };
  const colors = ['#6C3483', PURPLE, '#BB8FCE', '#E74C3C'];
  const labels = ['Deep', 'REM', 'Light', 'Awake'];
  // Simulated hypnogram data
  const data = [2, 2, 1, 3, 2, 1, 0, 0, 1, 2, 1, 0, 1, 2, 2, 3, 1, 0, 0, 1, 2, 2, 1, 3];
  const segW = (W - pad) / data.length;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      {labels.map((l, i) => (
        <text key={i} x={2} y={20 + i * 32} fill={GRAY} fontSize="9" fontWeight="600">{l}</text>
      ))}
      {data.map((stage, i) => (
        <rect key={i} x={pad + i * segW} y={6 + stage * 32} width={segW - 1} height={26}
          rx={3} fill={colors[stage]} opacity={0.8} />
      ))}
    </svg>
  );
}

function WeeklyChart({ data, color, label }) {
  const W = 320, H = 100;
  const min = Math.min(...data) - 5;
  const max = Math.max(...data) + 5;
  const range = max - min;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const points = data.map((v, i) => ({
    x: 30 + (i / (data.length - 1)) * (W - 50),
    y: 10 + (1 - (v - min) / range) * (H - 30)
  }));
  const line = points.map(p => `${p.x},${p.y}`).join(' ');
  const area = `${points[0].x},${H - 15} ${line} ${points[points.length - 1].x},${H - 15}`;

  return (
    <div style={{ background: SURFACE, borderRadius: 16, padding: '16px 12px', marginBottom: 12, borderTop: `2px solid ${SURFACE2}` }}>
      <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
        <defs>
          <linearGradient id={`sleepGrad-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill={`url(#sleepGrad-${label})`} />
        <polyline points={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={i === data.length - 1 ? 5 : 3} fill={i === data.length - 1 ? color : SURFACE} stroke={color} strokeWidth="2" />
            <text x={p.x} y={H - 2} fill={GRAY} fontSize="8" textAnchor="middle" fontWeight="600">{days[i]}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function SleepScreen({ onBack }) {
  return (
    <div style={{ background: BG, minHeight: '100%', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div onClick={onBack} style={{ color: GRAY, fontSize: 24, cursor: 'pointer', lineHeight: 1 }}>&#8592;</div>
        <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase' }}>SLEEP ANALYSIS</div>
      </div>

      {/* Big Score */}
      <div style={{ textAlign: 'center', padding: '8px 20px 20px' }}>
        <div style={{
          fontSize: 72, fontWeight: 900, color: PURPLE, lineHeight: 1,
          textShadow: `0 0 40px ${PURPLE}44`
        }}>{s.score}</div>
        <div style={{ color: GRAY, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginTop: 4 }}>SLEEP SCORE</div>
        <div style={{ color: GRAY, fontSize: 13, marginTop: 4 }}>{s.total} total sleep</div>
      </div>

      {/* Sleep Stages */}
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <div style={{ background: SURFACE, borderRadius: 16, padding: 16, borderTop: `3px solid ${PURPLE}` }}>
          <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Sleep Stages</div>
          <SleepStagesChart />
          {/* Stage bars */}
          <div style={{ marginTop: 12 }}>
            {stages.map((st, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: st.color, flexShrink: 0 }} />
                <span style={{ color: GRAY, fontSize: 11, width: 45, fontWeight: 600 }}>{st.label}</span>
                <div style={{ flex: 1, height: 6, borderRadius: 3, background: SURFACE2, overflow: 'hidden' }}>
                  <div style={{ width: `${st.pct}%`, height: '100%', borderRadius: 3, background: st.color }} />
                </div>
                <span style={{ color: WHITE, fontSize: 12, fontWeight: 700, width: 55, textAlign: 'right' }}>{st.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {stats.map((st, i) => (
            <div key={i} style={{
              background: SURFACE, borderRadius: 12, padding: '12px 10px', textAlign: 'center',
              borderTop: `2px solid ${SURFACE2}`
            }}>
              <div style={{ color: GRAY, fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{st.label}</div>
              <div style={{ color: WHITE, fontSize: 16, fontWeight: 900 }}>{st.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Charts */}
      <div style={{ padding: '0 20px' }}>
        <WeeklyChart data={weeklySleep} color={PURPLE} label="7-Day Sleep Score" />
        <WeeklyChart data={weeklyHRV} color={TEAL} label="7-Day HRV" />
      </div>

      {/* Recommendations */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Recommendations</div>
        {recommendations.map((r, i) => (
          <div key={i} style={{
            background: SURFACE, borderRadius: 12, padding: '12px 16px', marginBottom: 8,
            borderLeft: `3px solid ${PURPLE}`, color: WHITE, fontSize: 13, lineHeight: 1.4
          }}>
            {r}
          </div>
        ))}
      </div>
    </div>
  );
}

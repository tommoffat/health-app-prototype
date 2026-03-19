import React from 'react';
import { today, weeklySleep, weeklyHRV } from '../../data/fake';

const c = {
  bg: '#0F1218', surface: '#181E28', surfaceAlt: '#1E2535',
  amber: '#E8A04B', coral: '#FF8C42', text: '#F0F4F8', muted: '#8899AA',
  purple: '#B18CFF', deepPurple: '#8B6CC1', blue: '#4EA8FF',
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function Ring({ score, size = 120, color, strokeWidth = 8 }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x={size / 2} y={size / 2 - 8} textAnchor="middle" dominantBaseline="central"
        fill={c.text} style={{ fontSize: 32, fontWeight: 700, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
        {score}
      </text>
      <text x={size / 2} y={size / 2 + 16} textAnchor="middle" dominantBaseline="central"
        fill={c.muted} style={{ fontSize: 11, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
        Sleep Score
      </text>
    </svg>
  );
}

function StagesChart() {
  const stages = [
    { label: 'Awake', value: 28, total: 450, color: '#FF6B6B' },
    { label: 'Light', value: 192, total: 450, color: c.blue },
    { label: 'REM', value: 118, total: 450, color: c.purple },
    { label: 'Deep', value: 104, total: 450, color: c.deepPurple },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {stages.map(s => (
        <div key={s.label}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: c.muted, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>{s.label}</span>
            <span style={{ fontSize: 12, color: c.text, fontWeight: 600, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
              {Math.floor(s.value / 60)}h {s.value % 60}m
            </span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 4, height: 8, overflow: 'hidden' }}>
            <div style={{ width: `${(s.value / s.total) * 100}%`, height: '100%', background: s.color, borderRadius: 4 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function WeeklyChart({ data, color, label }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 14, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }}>
        {data.map((v, i) => {
          const h = ((v - min + 5) / (max - min + 10)) * 70 + 10;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ fontSize: 10, color: c.muted, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>{v}</div>
              <div style={{
                width: '100%', height: h, borderRadius: 6,
                background: i === data.length - 1 ? color : 'rgba(255,255,255,0.06)',
              }} />
              <div style={{ fontSize: 10, color: c.muted }}>{days[i]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HRVLineChart() {
  const w = 300, h = 80;
  const min = Math.min(...weeklyHRV);
  const max = Math.max(...weeklyHRV);
  const range = max - min || 1;
  const pts = weeklyHRV.map((v, i) =>
    `${(i / (weeklyHRV.length - 1)) * w},${h - ((v - min) / range) * (h - 16) - 8}`
  ).join(' ');
  const areaPath = `M0,${h} ` + weeklyHRV.map((v, i) =>
    `L${(i / (weeklyHRV.length - 1)) * w},${h - ((v - min) / range) * (h - 16) - 8}`
  ).join(' ') + ` L${w},${h} Z`;
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 14, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
        HRV Trend
      </div>
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="hrvGradHybSleep" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c.purple} stopOpacity="0.25" />
            <stop offset="100%" stopColor={c.purple} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#hrvGradHybSleep)" />
        <polyline points={pts} fill="none" stroke={c.purple} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        {weeklyHRV.map((v, i) => (
          <circle key={i} cx={(i / (weeklyHRV.length - 1)) * w}
            cy={h - ((v - min) / range) * (h - 16) - 8} r={3}
            fill={i === weeklyHRV.length - 1 ? c.purple : 'transparent'}
            stroke={i === weeklyHRV.length - 1 ? c.purple : 'transparent'} />
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        {days.map(d => <span key={d} style={{ fontSize: 10, color: c.muted }}>{d}</span>)}
      </div>
    </div>
  );
}

export default function Sleep({ onBack }) {
  const s = today.sleep;
  const stats = [
    { label: 'Total Sleep', value: s.total },
    { label: 'Efficiency', value: `${s.efficiency}%` },
    { label: 'Latency', value: `${s.latency} min` },
    { label: 'Resting HR', value: `${s.restingHR} bpm` },
    { label: 'HRV', value: `${s.hrv} ms` },
    { label: 'Deep Sleep', value: s.deep },
  ];

  const recommendations = [
    'Your deep sleep is above average. Keep consistent bed times.',
    'Try to avoid screens 30 minutes before your 10:30 PM target.',
    'Sleep efficiency is excellent at 94%. Maintain cool room temp.',
  ];

  const cardStyle = {
    background: c.surface, borderRadius: 16, padding: 18,
    border: '1px solid rgba(255,255,255,0.04)', marginBottom: 14,
  };

  return (
    <div style={{ padding: '0 16px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 0' }}>
        <div onClick={onBack} style={{
          width: 32, height: 32, borderRadius: 10, background: c.surface,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke={c.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
          Sleep
        </div>
      </div>

      {/* Score Ring Card */}
      <div style={{
        ...cardStyle, display: 'flex', flexDirection: 'column', alignItems: 'center',
        background: 'linear-gradient(135deg, #1E1A2E 0%, #181E28 100%)', padding: '28px 18px',
      }}>
        <Ring score={s.score} size={130} color={c.purple} strokeWidth={9} />
        <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>{s.total}</div>
            <div style={{ fontSize: 11, color: c.muted }}>Total</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>{s.efficiency}%</div>
            <div style={{ fontSize: 11, color: c.muted }}>Efficiency</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>{s.hrv} ms</div>
            <div style={{ fontSize: 11, color: c.muted }}>HRV</div>
          </div>
        </div>
      </div>

      {/* Stages */}
      <div style={cardStyle}>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 14, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
          Sleep Stages
        </div>
        <StagesChart />
      </div>

      {/* HRV Chart */}
      <div style={cardStyle}>
        <HRVLineChart />
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
        {stats.map(st => (
          <div key={st.label} style={{
            background: c.surface, borderRadius: 14, padding: '12px 14px',
            border: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div style={{ fontSize: 10, color: c.muted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 4, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
              {st.label}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: c.text, fontFamily: 'SF Pro Display, -apple-system, sans-serif' }}>
              {st.value}
            </div>
          </div>
        ))}
      </div>

      {/* 7-Day Trend */}
      <div style={cardStyle}>
        <WeeklyChart data={weeklySleep} color={c.purple} label="7-Day Sleep Score" />
      </div>

      {/* Recommendations */}
      <div style={cardStyle}>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 12, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
          Recommendations
        </div>
        {recommendations.map((rec, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0',
            borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: c.purple, marginTop: 6, flexShrink: 0 }} />
            <div style={{ fontSize: 13, color: c.text, lineHeight: 1.45, fontFamily: 'SF Pro Text, -apple-system, sans-serif' }}>
              {rec}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { today, weeklySleep, weeklyHRV } from '../../data/fake';

const c = {
  bg: '#0A0A00', surface: '#111100', accent: '#CCFF00',
  text: '#FFFFFF', dim: '#888877', border: '#222200',
};
const heavy = { fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif', fontWeight: 900 };

function AreaChart({ data, width = 300, height = 80, color = c.accent, label }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * (height - 8) - 4,
  }));
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area = `${line} L${width},${height} L0,${height} Z`;
  const id = `slpG_${label}`;
  return (
    <svg width={width} height={height} style={{ display: 'block', width: '100%' }} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0.03" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={i === pts.length - 1 ? color : 'transparent'} />
      ))}
    </svg>
  );
}

function SleepStagesBar() {
  const s = today.sleep;
  const stages = [
    { label: 'DEEP', time: s.deep, color: c.accent, pct: 24 },
    { label: 'REM', time: s.rem, color: '#88CC00', pct: 27 },
    { label: 'LIGHT', time: s.light, color: '#556600', pct: 43 },
    { label: 'AWAKE', time: s.awake, color: '#333300', pct: 6 },
  ];
  return (
    <div>
      <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height: 20, marginBottom: 10 }}>
        {stages.map((st) => (
          <div key={st.label} style={{ width: `${st.pct}%`, background: st.color, height: '100%' }} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 4 }}>
        {stages.map((st) => (
          <div key={st.label} style={{ textAlign: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: st.color, display: 'inline-block', marginBottom: 2 }} />
            <div style={{ ...heavy, fontSize: 8, letterSpacing: 1.5, color: c.dim }}>{st.label}</div>
            <div style={{ ...heavy, fontSize: 14, color: c.text }}>{st.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Sleep({ onBack }) {
  const s = today.sleep;
  const stats = [
    { label: 'TOTAL', value: s.total },
    { label: 'EFFICIENCY', value: `${s.efficiency}%` },
    { label: 'LATENCY', value: `${s.latency}m` },
    { label: 'RESTING HR', value: `${s.restingHR} bpm` },
    { label: 'HRV', value: `${s.hrv} ms` },
    { label: 'SPO2', value: `${today.readiness.spo2}%` },
  ];

  const recommendations = [
    'Maintain your 10:30 PM bedtime for optimal deep sleep',
    'Avoid screens 45 min before bed to improve latency',
    'Your deep sleep ratio is above average — keep it up',
  ];

  return (
    <div style={{ padding: '0 16px 100px' }}>
      {/* Back */}
      <div
        onClick={onBack}
        style={{ ...heavy, fontSize: 13, color: c.accent, cursor: 'pointer', marginBottom: 16, letterSpacing: 1 }}
      >
        ← BACK
      </div>

      {/* Score hero */}
      <div style={{
        background: c.surface, borderRadius: 16, padding: '32px 24px', marginBottom: 12,
        borderLeft: `4px solid ${c.accent}`,
      }}>
        <div style={{ ...heavy, fontSize: 9, letterSpacing: 3, color: c.dim, textTransform: 'uppercase', marginBottom: 4 }}>
          SLEEP SCORE
        </div>
        <div style={{ ...heavy, fontSize: 80, lineHeight: 1, color: c.accent }}>{s.score}</div>
        <div style={{ ...heavy, fontSize: 13, fontWeight: 700, color: c.dim, marginTop: 4 }}>{s.total} total sleep</div>
      </div>

      {/* Stages */}
      <div style={{ background: c.surface, borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <div style={{ ...heavy, fontSize: 9, letterSpacing: 2, color: c.dim, marginBottom: 12, textTransform: 'uppercase' }}>
          SLEEP STAGES
        </div>
        <SleepStagesBar />
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
        {stats.map((m) => (
          <div key={m.label} style={{ background: c.surface, borderRadius: 10, padding: '12px 8px', textAlign: 'center' }}>
            <div style={{ ...heavy, fontSize: 8, letterSpacing: 2, color: c.dim }}>{m.label}</div>
            <div style={{ ...heavy, fontSize: 20, color: c.text, marginTop: 2 }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* HRV chart */}
      <div style={{ background: c.surface, borderRadius: 12, padding: 16, marginBottom: 12 }}>
        <div style={{ ...heavy, fontSize: 9, letterSpacing: 2, color: c.dim, marginBottom: 8, textTransform: 'uppercase' }}>
          HRV TREND · 7 DAYS
        </div>
        <AreaChart data={weeklyHRV} label="hrv" />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <span key={i} style={{ ...heavy, fontSize: 9, color: c.dim, letterSpacing: 1 }}>{d}</span>
          ))}
        </div>
      </div>

      {/* 7-day sleep trend */}
      <div style={{ background: c.surface, borderRadius: 12, padding: 16, marginBottom: 12, borderLeft: `4px solid ${c.accent}` }}>
        <div style={{ ...heavy, fontSize: 9, letterSpacing: 2, color: c.dim, marginBottom: 8, textTransform: 'uppercase' }}>
          SLEEP SCORE · 7 DAYS
        </div>
        <AreaChart data={weeklySleep} label="sleep" />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <span key={i} style={{ ...heavy, fontSize: 9, color: c.dim, letterSpacing: 1 }}>{d}</span>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div style={{ background: c.surface, borderRadius: 12, padding: 16 }}>
        <div style={{ ...heavy, fontSize: 9, letterSpacing: 2, color: c.dim, marginBottom: 10, textTransform: 'uppercase' }}>
          RECOMMENDATIONS
        </div>
        {recommendations.map((r, i) => (
          <div key={i} style={{
            ...heavy, fontSize: 13, fontWeight: 700, color: c.text, padding: '8px 0',
            borderBottom: i < recommendations.length - 1 ? `1px solid ${c.border}` : 'none',
          }}>
            {r}
          </div>
        ))}
      </div>
    </div>
  );
}

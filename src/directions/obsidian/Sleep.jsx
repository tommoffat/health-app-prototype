import React from 'react';
import { today, weeklySleep, weeklyHRV } from '../../data/fake';

const mono = '"SF Mono", "Fira Code", "Cascadia Code", monospace';
const sans = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const accent = '#7C6EFA';
const secondary = '#8888AA';
const border = '#1A1A2E';
const surface = '#0A0A0A';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function BackButton({ navigate }) {
  return (
    <button onClick={() => navigate('today')} style={{
      background: 'none', border: 'none', color: accent, fontFamily: mono, fontSize: 12,
      cursor: 'pointer', padding: '4px 0', letterSpacing: 0.5, marginBottom: 8,
    }}>{'< BACK'}</button>
  );
}

function ScoreRing({ score }) {
  const size = 120, sw = 4;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '16px 0' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={border} strokeWidth={sw} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={accent} strokeWidth={sw}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div style={{ marginTop: -(size / 2) - 18, height: size / 2 + 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
        <span style={{ fontFamily: mono, fontSize: 40, fontWeight: 700, color: '#FFF' }}>{score}</span>
      </div>
      <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, marginTop: 6 }}>SLEEP SCORE</div>
    </div>
  );
}

function SleepStagesBar() {
  const s = today.sleep;
  const parseMin = (str) => { const p = str.split('h '); return parseInt(p[0]) * 60 + parseInt(p[1]); };
  const stages = [
    { label: 'AWAKE', mins: parseInt(s.awake), color: '#EF4444' },
    { label: 'REM', mins: parseMin(s.rem), color: '#7C6EFA' },
    { label: 'LIGHT', mins: parseMin(s.light), color: '#3B82F6' },
    { label: 'DEEP', mins: parseMin(s.deep), color: '#06B6D4' },
  ];
  const total = stages.reduce((a, b) => a + b.mins, 0);

  return (
    <div style={{ border: `1px solid ${border}`, borderRadius: 8, padding: '14px 16px', marginBottom: 16 }}>
      <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, marginBottom: 12 }}>SLEEP STAGES</div>
      <div style={{ display: 'flex', height: 24, borderRadius: 4, overflow: 'hidden', marginBottom: 12 }}>
        {stages.map((st, i) => (
          <div key={i} style={{ width: `${(st.mins / total) * 100}%`, background: st.color, height: '100%' }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {stages.map((st, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: st.color }} />
            <div>
              <div style={{ fontFamily: mono, fontSize: 9, color: secondary, letterSpacing: 0.5 }}>{st.label}</div>
              <div style={{ fontFamily: mono, fontSize: 12, color: '#FFF', fontWeight: 500 }}>{st.mins}m</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HRVOvernightChart() {
  const data = [55, 62, 70, 68, 74, 72, 66, 60, 58, 65, 68];
  const w = 320, h = 100, px = 16, py = 10;
  const min = Math.min(...data) - 5, max = Math.max(...data) + 5;
  const points = data.map((v, i) => {
    const x = px + (i / (data.length - 1)) * (w - 2 * px);
    const y = py + ((max - v) / (max - min)) * (h - 2 * py);
    return `${x},${y}`;
  });

  return (
    <div style={{ border: `1px solid ${border}`, borderRadius: 8, padding: '14px 16px', marginBottom: 16 }}>
      <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, marginBottom: 8 }}>HRV OVERNIGHT</div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
        <polyline points={points.join(' ')} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((v, i) => {
          const x = px + (i / (data.length - 1)) * (w - 2 * px);
          const y = py + ((max - v) / (max - min)) * (h - 2 * py);
          return <circle key={i} cx={x} cy={y} r="3" fill={accent} />;
        })}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 9, color: secondary, marginTop: 4 }}>
        <span>11 PM</span><span>2 AM</span><span>5 AM</span><span>7 AM</span>
      </div>
    </div>
  );
}

function StatsGrid() {
  const s = today.sleep;
  const stats = [
    { label: 'TOTAL', value: s.total },
    { label: 'EFFICIENCY', value: `${s.efficiency}%` },
    { label: 'LATENCY', value: `${s.latency}m` },
    { label: 'RHR', value: `${s.restingHR} bpm` },
    { label: 'HRV', value: `${s.hrv} ms` },
    { label: 'DEEP', value: s.deep },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
      {stats.map((st, i) => (
        <div key={i} style={{ border: `1px solid ${border}`, borderRadius: 8, padding: '12px 10px', textAlign: 'center' }}>
          <div style={{ fontFamily: mono, fontSize: 9, color: secondary, letterSpacing: 1, marginBottom: 6 }}>{st.label}</div>
          <div style={{ fontFamily: mono, fontSize: 16, fontWeight: 600, color: '#FFF' }}>{st.value}</div>
        </div>
      ))}
    </div>
  );
}

function WeeklyTrend() {
  const w = 320, h = 100, px = 24, py = 10;
  const min = Math.min(...weeklySleep) - 5, max = Math.max(...weeklySleep) + 5;
  const points = weeklySleep.map((v, i) => {
    const x = px + (i / (weeklySleep.length - 1)) * (w - 2 * px);
    const y = py + ((max - v) / (max - min)) * (h - 2 * py);
    return `${x},${y}`;
  });

  return (
    <div style={{ border: `1px solid ${border}`, borderRadius: 8, padding: '14px 16px', marginBottom: 16 }}>
      <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, marginBottom: 8 }}>7-DAY SLEEP TREND</div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
        <polyline points={points.join(' ')} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {weeklySleep.map((v, i) => {
          const x = px + (i / (weeklySleep.length - 1)) * (w - 2 * px);
          const y = py + ((max - v) / (max - min)) * (h - 2 * py);
          return <circle key={i} cx={x} cy={y} r="3" fill={accent} />;
        })}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 9, color: secondary, marginTop: 4, padding: '0 8px' }}>
        {days.map((d) => <span key={d}>{d}</span>)}
      </div>
    </div>
  );
}

export default function Sleep({ navigate }) {
  const recs = [
    'Target bedtime: 10:30 PM for optimal deep sleep',
    'Avoid screens 1 hour before bed to improve latency',
    'Your HRV is trending up — recovery looks strong',
  ];

  return (
    <div style={{ padding: '16px 16px 24px' }}>
      <BackButton navigate={navigate} />
      <ScoreRing score={today.sleep.score} />
      <SleepStagesBar />
      <HRVOvernightChart />
      <StatsGrid />
      <WeeklyTrend />

      {/* Recommendations */}
      <div style={{ border: `1px solid ${border}`, borderRadius: 8, padding: '14px 16px' }}>
        <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, marginBottom: 10 }}>RECOMMENDATIONS</div>
        {recs.map((r, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: i < recs.length - 1 ? `1px solid ${border}` : 'none' }}>
            <span style={{ fontFamily: mono, fontSize: 11, color: accent }}>{'>'}</span>
            <span style={{ fontFamily: sans, fontSize: 13, color: '#FFF', lineHeight: 1.4 }}>{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

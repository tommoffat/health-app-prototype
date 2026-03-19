import React from 'react';
import { today, weeklyHRV, weeklyWeight } from '../../data/fake';

const mono = '"SF Mono", "Fira Code", "Cascadia Code", monospace';
const sans = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const accent = '#7C6EFA';
const secondary = '#8888AA';
const border = '#1A1A2E';

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
      <div style={{ fontFamily: mono, fontSize: 10, color: secondary, letterSpacing: 1.5, marginTop: 6 }}>READINESS SCORE</div>
    </div>
  );
}

function Sparkline({ data, color = accent, width = 80, height = 28 }) {
  const min = Math.min(...data) - 1;
  const max = Math.max(...data) + 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = ((max - v) / (max - min)) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MetricCard({ label, value, unit, sparkData, trend }) {
  return (
    <div style={{
      border: `1px solid ${border}`, borderRadius: 8, padding: '14px 14px',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ fontFamily: mono, fontSize: 9, color: secondary, letterSpacing: 1 }}>{label}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: mono, fontSize: 26, fontWeight: 700, color: '#FFF' }}>{value}</span>
          {unit && <span style={{ fontFamily: mono, fontSize: 11, color: secondary }}>{unit}</span>}
        </div>
        {sparkData && <Sparkline data={sparkData} />}
      </div>
      {trend && <div style={{ fontFamily: mono, fontSize: 10, color: trend.startsWith('+') || trend.startsWith('up') ? '#4ADE80' : trend.startsWith('-') || trend.startsWith('down') ? '#EF4444' : secondary }}>{trend}</div>}
    </div>
  );
}

export default function Biometrics({ navigate }) {
  const { readiness } = today;

  const hrvSpark = weeklyHRV;
  const rhrSpark = [54, 53, 52, 53, 51, 52, 52];
  const spo2Spark = [97, 98, 98, 97, 98, 98, 98];
  const tempSpark = [0.1, 0.0, -0.1, 0.1, 0.2, 0.2, 0.2];
  const weightSpark = weeklyWeight;

  return (
    <div style={{ padding: '16px 16px 24px' }}>
      <BackButton navigate={navigate} />
      <ScoreRing score={readiness.score} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <MetricCard
          label="HRV"
          value={readiness.hrv}
          unit="ms"
          sparkData={hrvSpark}
          trend="+12% this week"
        />
        <MetricCard
          label="RESTING HR"
          value={readiness.restingHR}
          unit="bpm"
          sparkData={rhrSpark}
          trend="-2 bpm avg"
        />
        <MetricCard
          label="SPO2"
          value={readiness.spo2}
          unit="%"
          sparkData={spo2Spark}
          trend="Normal range"
        />
        <MetricCard
          label="BODY TEMP"
          value={readiness.bodyTemp}
          unit=""
          sparkData={tempSpark.map(v => v + 98)}
          trend="Within baseline"
        />
        <MetricCard
          label="WEIGHT"
          value={today.weight}
          unit="lbs"
          sparkData={weightSpark}
          trend="-0.8 lbs / 7d"
        />
        <MetricCard
          label="STRAIN"
          value={today.strain}
          unit=""
          sparkData={[8.2, 10.1, 14.3, 11.0, 9.5, 12.4, 12.4]}
          trend="Moderate load"
        />
      </div>
    </div>
  );
}

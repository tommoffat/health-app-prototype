import React from 'react';
import { today, weeklyHRV, weeklyWeight } from '../../data/fake.js';

const c = {
  bg: '#0B0E13',
  surface: '#131920',
  surfaceAlt: '#1E2530',
  accent: '#E8A04B',
  sleep: '#7B68EE',
  activity: '#4A90D9',
  text: '#EAEAEA',
  secondary: '#7A8899',
  border: '#2A3545',
};

function Sparkline({ data, color, width = 120, height = 36 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const px = 4, py = 4;
  const points = data.map((v, i) => ({
    x: px + (i / (data.length - 1)) * (width - 2 * px),
    y: py + (1 - (v - min) / range) * (height - 2 * py),
  }));
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area = `${line} L${points[points.length - 1].x},${height} L${points[0].x},${height} Z`;
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`sp-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sp-${color.replace('#', '')})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VitalCard({ label, value, unit, data, color, trend }) {
  return (
    <div style={{
      background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: 18,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div style={{ color: c.secondary, fontSize: 12, marginBottom: 4 }}>{label}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ color: c.text, fontSize: 28, fontWeight: 700 }}>{value}</span>
            <span style={{ color: c.secondary, fontSize: 13 }}>{unit}</span>
          </div>
          {trend && (
            <div style={{ color: trend.startsWith('+') ? '#4ADE80' : trend.startsWith('-') ? '#F87171' : c.secondary, fontSize: 12, marginTop: 2 }}>
              {trend} vs last week
            </div>
          )}
        </div>
        <Sparkline data={data} color={color} />
      </div>
    </div>
  );
}

export default function Biometrics() {
  const weeklyRHR = [54, 53, 52, 53, 51, 52, 52];
  const weeklySpo2 = [97, 98, 98, 97, 98, 98, 98];
  const weeklyTemp = [0.1, 0.0, -0.1, 0.2, 0.1, 0.2, 0.2];

  return (
    <div style={{
      minHeight: '100%', background: c.bg, padding: '20px 20px 32px',
      fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif',
    }}>
      <h2 style={{ color: c.text, fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>Vitals</h2>
      <p style={{ color: c.secondary, fontSize: 13, margin: '0 0 24px' }}>
        {today.date} &middot; Updated just now
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <VitalCard
          label="Heart Rate Variability"
          value={today.readiness.hrv}
          unit="ms"
          data={weeklyHRV}
          color={c.sleep}
          trend="+8%"
        />
        <VitalCard
          label="Resting Heart Rate"
          value={today.readiness.restingHR}
          unit="bpm"
          data={weeklyRHR}
          color={c.activity}
          trend="-2 bpm"
        />
        <VitalCard
          label="Blood Oxygen (SpO2)"
          value={today.readiness.spo2}
          unit="%"
          data={weeklySpo2}
          color="#4ADE80"
          trend="stable"
        />
        <VitalCard
          label="Body Temperature"
          value={today.readiness.bodyTemp}
          unit=""
          data={weeklyTemp}
          color={c.accent}
          trend="+0.1\u00B0F"
        />
        <VitalCard
          label="Weight"
          value={today.weight}
          unit="lbs"
          data={weeklyWeight}
          color="#A78BFA"
          trend="-0.8 lbs"
        />
      </div>
    </div>
  );
}

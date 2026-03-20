import React from 'react';
import { today, weeklyHRV, weeklyWeight } from '../../data/fake.js';
import Sparkline from './components/Sparkline.jsx';

const PAPER = '#111520';
const GOLD = '#C9A96E';
const GOLD_RULE = 'rgba(201,169,110,0.3)';
const TEXT = '#E8E8E8';
const TEXT_DIM = '#8B949E';
const TEXT_CAPTION = '#6B7280';
const BORDER = 'rgba(255,255,255,0.06)';

const TEAL = '#4ECDC4';
const PINK = '#E87BA4';
const BLUE = '#5B8DEF';
const PURPLE = '#9B72CF';

function TrendArrow({ direction }) {
  if (direction === 'up') {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginLeft: 4 }}>
        <path d="M6 2L10 7H2L6 2Z" fill={TEAL} />
      </svg>
    );
  }
  if (direction === 'down') {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginLeft: 4 }}>
        <path d="M6 10L2 5H10L6 10Z" fill={PINK} />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" style={{ marginLeft: 4 }}>
      <rect x="2" y="5" width="8" height="2" rx="1" fill={TEXT_DIM} />
    </svg>
  );
}

function VitalTile({ label, value, unit, data, color, trend, interpretation, large }) {
  return (
    <div style={{
      background: PAPER,
      borderRadius: 10,
      padding: large ? '20px 20px 16px' : '16px',
      border: `1px solid ${BORDER}`,
      gridColumn: large ? 'span 2' : 'span 1',
    }}>
      <div style={{
        fontSize: 10,
        color: TEXT_CAPTION,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        marginBottom: 10,
      }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 4 }}>
        <span style={{
          fontSize: large ? 36 : 28,
          fontWeight: 400,
          color: TEXT,
          fontFamily: 'Georgia, "Times New Roman", serif',
          lineHeight: 1,
        }}>
          {value}
        </span>
        {unit && (
          <span style={{ fontSize: 14, color: TEXT_DIM, marginLeft: 4, fontWeight: 300 }}>{unit}</span>
        )}
        <TrendArrow direction={trend} />
      </div>
      <div style={{ margin: '8px 0' }}>
        <Sparkline data={data} color={color} width={large ? 260 : 120} height={large ? 40 : 28} />
      </div>
      {interpretation && (
        <div style={{ fontSize: 12, color: TEXT_DIM, lineHeight: 1.5, marginTop: 8 }}>
          {interpretation}
        </div>
      )}
    </div>
  );
}

export default function BiometricsSpread({ navigate }) {
  return (
    <div style={{ padding: '24px 24px 80px', maxWidth: 640, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <button onClick={() => navigate('today')} style={{
          background: 'none', border: 'none', color: GOLD, fontSize: 13,
          cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15,18 9,12 15,6" />
          </svg>
        </button>
      </div>

      <h1 style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: 24,
        fontWeight: 400,
        color: TEXT,
        margin: '0 0 8px 0',
      }}>
        Your Vitals at a Glance
      </h1>
      <div style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 24 }}>
        14-day trends and current readings
      </div>

      <hr style={{ border: 'none', borderTop: `1px solid ${GOLD_RULE}`, margin: '0 0 24px 0' }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 12,
      }}>
        <VitalTile
          label="Heart Rate Variability"
          value={today.readiness.hrv}
          unit="ms"
          data={[52, 55, 48, 58, 62, 55, 60, 63, 58, 65, 61, 64, 68, 68]}
          color={TEAL}
          trend="up"
          interpretation="Trending upward. Excellent parasympathetic activity indicating strong recovery."
          large
        />
        <VitalTile
          label="Resting HR"
          value={today.readiness.restingHR}
          unit="bpm"
          data={[56, 55, 54, 55, 54, 53, 54, 53, 54, 53, 52, 53, 52, 52]}
          color={PINK}
          trend="down"
          interpretation="Improving cardiovascular efficiency."
        />
        <VitalTile
          label="Blood Oxygen"
          value={today.readiness.spo2}
          unit="%"
          data={[97, 98, 98, 97, 98, 99, 98, 97, 98, 98, 99, 98, 98, 98]}
          color={BLUE}
          trend="stable"
          interpretation="Consistently optimal."
        />
        <VitalTile
          label="Skin Temp"
          value={today.readiness.bodyTemp}
          unit=""
          data={[0.0, 0.1, -0.1, 0.0, 0.2, 0.1, 0.0, -0.1, 0.1, 0.2, 0.1, 0.0, 0.1, 0.2]}
          color="#E87B50"
          trend="stable"
          interpretation="Within normal variation."
        />
        <VitalTile
          label="Body Weight"
          value={today.weight}
          unit="lbs"
          data={[180.5, 180.2, 179.8, 179.5, 179.2, 179.0, 178.8, 178.6, 178.4, 178.5, 178.4, 178.6, 178.4, 178.4]}
          color={GOLD}
          trend="down"
          interpretation="Gradual downward trend. Consistent with your targets."
          large
        />
        <VitalTile
          label="Resp Rate"
          value="14.2"
          unit="rpm"
          data={[14.8, 14.5, 14.3, 14.6, 14.4, 14.1, 14.3, 14.5, 14.2, 14.0, 14.3, 14.1, 14.2, 14.2]}
          color={PURPLE}
          trend="stable"
          interpretation="Normal respiratory rate."
        />
      </div>
    </div>
  );
}

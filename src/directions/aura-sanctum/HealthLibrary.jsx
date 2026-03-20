import React from 'react';
import { today, weeklyHRV } from '../../data/fake.js';
import { BG_CARD, GOLD, GOLD_LT, TEXT, TEXT_DIM, CREAM, BORDER, ICONS, spacedCaps, btnReset } from './palette.js';
import Sparkline from './components/Sparkline.jsx';

const entries = [
  {
    icon: ICONS.pulse,
    name: 'Heart Rate Variability',
    value: `${today.readiness.hrv} ms`,
    explanation: 'HRV measures the variation in time between heartbeats. Higher values indicate better cardiovascular fitness and stress resilience.',
    data: weeklyHRV,
    rangeLow: 40, rangeHigh: 100, current: today.readiness.hrv,
    color: '#4ECDC4',
  },
  {
    icon: ICONS.recovery,
    name: 'Resting Heart Rate',
    value: `${today.readiness.restingHR} bpm`,
    explanation: 'Your resting heart rate reflects cardiovascular efficiency. Lower values typically indicate better aerobic fitness.',
    data: [55, 54, 53, 53, 52, 52, 52],
    rangeLow: 40, rangeHigh: 80, current: today.readiness.restingHR,
    color: '#E74C3C',
  },
  {
    icon: ICONS.wind,
    name: 'Blood Oxygen (SpO2)',
    value: `${today.readiness.spo2}%`,
    explanation: 'SpO2 measures oxygen saturation in your blood. Healthy levels are typically 95-100%, supporting cellular energy production.',
    data: [97, 98, 98, 97, 98, 98, 98],
    rangeLow: 90, rangeHigh: 100, current: today.readiness.spo2,
    color: '#5B8DEF',
  },
  {
    icon: ICONS.thermometer,
    name: 'Body Temperature',
    value: today.readiness.bodyTemp,
    explanation: 'Skin temperature deviations from your baseline can indicate immune response, hormonal changes, or recovery status.',
    data: [0.1, 0.0, -0.1, 0.1, 0.2, 0.1, 0.2],
    rangeLow: -1, rangeHigh: 1, current: 0.2,
    color: '#F0943A',
  },
  {
    icon: ICONS.wind,
    name: 'Respiratory Rate',
    value: '13.2 br/min',
    explanation: 'Respiratory rate during sleep reflects autonomic nervous system health. Stable rates between 12-20 breaths per minute are normal.',
    data: [13.5, 13.2, 13.8, 13.0, 13.4, 13.2, 13.2],
    rangeLow: 10, rangeHigh: 20, current: 13.2,
    color: '#9B59B6',
  },
  {
    icon: ICONS.weight,
    name: 'Weight',
    value: `${today.weight} lbs`,
    explanation: 'Body weight trends help track body composition changes over time. Day-to-day fluctuations are normal and expected.',
    data: [179.2, 179.0, 178.8, 178.6, 178.4, 178.4, 178.4],
    rangeLow: 150, rangeHigh: 200, current: today.weight,
    color: GOLD_LT,
  },
];

export default function HealthLibrary({ onBack }) {
  return (
    <div style={{ padding: '24px 20px 40px' }}>
      {/* Back */}
      <button onClick={onBack} style={{ ...btnReset, display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d={ICONS.back} />
        </svg>
        <span style={{ marginLeft: 6, color: GOLD, fontSize: 13, fontWeight: 500 }}>Lobby</span>
      </button>

      <div style={{ fontSize: 26, fontWeight: 300, color: TEXT, letterSpacing: 1, marginBottom: 8 }}>
        Health Library
      </div>
      <div style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 28, lineHeight: 1.5 }}>
        Your comprehensive biometrics reference, curated by the Sanctum.
      </div>

      {entries.map((entry, i) => (
        <div key={i}>
          <div style={{
            padding: 20, borderRadius: 14, background: BG_CARD,
            border: `1px solid ${BORDER}`, marginBottom: 4,
          }}>
            {/* Icon + Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={entry.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={entry.icon} />
              </svg>
              <span style={{ fontSize: 16, fontWeight: 500, color: TEXT, letterSpacing: 0.3 }}>{entry.name}</span>
            </div>

            {/* Current value */}
            <div style={{ fontSize: 28, fontWeight: 600, color: CREAM, marginBottom: 10 }}>{entry.value}</div>

            {/* Explanation */}
            <div style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.6, marginBottom: 14 }}>{entry.explanation}</div>

            {/* Sparkline */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 9, color: TEXT_DIM, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>30-Day Trend</div>
              <Sparkline data={entry.data} color={entry.color} width={260} height={32} />
            </div>

            {/* Normal range bar */}
            <div>
              <div style={{ fontSize: 9, color: TEXT_DIM, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Normal Range</div>
              <div style={{ position: 'relative', height: 8, borderRadius: 4, background: `${entry.color}15` }}>
                {/* Normal range fill */}
                <div style={{
                  position: 'absolute', left: '20%', right: '20%', top: 0, bottom: 0,
                  borderRadius: 4, background: `${entry.color}30`,
                }} />
                {/* Current marker */}
                <div style={{
                  position: 'absolute',
                  left: `${((entry.current - entry.rangeLow) / (entry.rangeHigh - entry.rangeLow)) * 100}%`,
                  top: -2, width: 12, height: 12, borderRadius: 6,
                  background: entry.color, border: `2px solid ${BG_CARD}`,
                  transform: 'translateX(-6px)',
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontSize: 9, color: TEXT_DIM }}>{entry.rangeLow}</span>
                <span style={{ fontSize: 9, color: TEXT_DIM }}>{entry.rangeHigh}</span>
              </div>
            </div>
          </div>
          {/* Gold rule separator */}
          {i < entries.length - 1 && (
            <div style={{ height: 1, background: `${GOLD}15`, margin: '12px 20px' }} />
          )}
        </div>
      ))}
    </div>
  );
}

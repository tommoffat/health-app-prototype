import React from 'react';
import { today } from '../../data/fake.js';
import AuroraCard from './components/AuroraCard.jsx';
import LineChart from './components/LineChart.jsx';
import ScoreRing from './components/ScoreRing.jsx';

const TEXT = '#F0F0F0';
const TEXT_DIM = '#8B949E';
const BORDER = 'rgba(255,255,255,0.08)';
const ACCENT = '#F0943A';
const GRADIENT = 'linear-gradient(160deg, rgba(240,148,58,0.15) 0%, rgba(200,100,30,0.10) 60%, #0D1117 100%)';

const weeklyStrain = [11.2, 13.5, 10.8, 14.2, 12.1, 11.8, 12.4];

const hrZones = [
  { zone: 1, label: 'Recovery', range: '93-111', min: 18, color: '#8B949E' },
  { zone: 2, label: 'Fat Burn', range: '111-130', min: 24, color: '#2ECC71' },
  { zone: 3, label: 'Aerobic', range: '130-148', min: 14, color: '#3498DB' },
  { zone: 4, label: 'Threshold', range: '148-167', min: 8, color: '#F0943A' },
  { zone: 5, label: 'Anaerobic', range: '167-185', min: 3, color: '#E74C3C' },
  { zone: 6, label: 'Max', range: '185+', min: 0, color: '#9B59B6' },
];
const totalZoneMin = hrZones.reduce((a, z) => a + z.min, 0);

const workouts = [
  { name: 'Upper Body Strength', time: '7:15 AM', duration: '48 min', strain: 8.2, hr: '142 avg' },
  { name: 'Walking', time: '12:30 PM', duration: '22 min', strain: 3.1, hr: '98 avg' },
];

export default function StrainDetail({ onBack }) {
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
      {/* back */}
      <div style={{ padding: '12px 20px 0' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, color: TEXT_DIM, fontSize: 14, padding: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* aurora header */}
      <div style={{ padding: '0 16px', marginTop: 8 }}>
        <AuroraCard gradient={GRADIENT} accentColor={ACCENT}>
          <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 3, color: ACCENT, fontWeight: 600, marginBottom: 8 }}>Strain</div>
            <div style={{ fontSize: 72, fontWeight: 200, color: TEXT, lineHeight: 1, letterSpacing: -2, textShadow: `0 0 60px ${ACCENT}33` }}>
              {today.strain}
            </div>
            <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 4, letterSpacing: 1, textTransform: 'uppercase' }}>Moderate</div>
          </div>
        </AuroraCard>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        {/* workout timeline */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10, padding: '0 4px' }}>Today's Activities</div>
          {workouts.map((w, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
              borderRadius: 14, padding: '16px 18px', marginBottom: 8,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 15, color: TEXT, fontWeight: 500, marginBottom: 4 }}>{w.name}</div>
                <div style={{ fontSize: 12, color: TEXT_DIM }}>{w.time} · {w.duration} · {w.hr}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 22, fontWeight: 300, color: ACCENT }}>{w.strain}</div>
                <div style={{ fontSize: 10, color: TEXT_DIM }}>strain</div>
              </div>
            </div>
          ))}
        </div>

        {/* caloric burn + steps */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
            borderRadius: 14, padding: '18px 16px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>Calories</div>
            <div style={{ fontSize: 28, fontWeight: 300, color: TEXT }}>{today.activity.calories}</div>
            <div style={{ fontSize: 11, color: TEXT_DIM, marginTop: 2 }}>kcal burned</div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
            borderRadius: 14, padding: '18px 16px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>Steps</div>
            <div style={{ fontSize: 28, fontWeight: 300, color: TEXT }}>{today.activity.steps.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: TEXT_DIM, marginTop: 2 }}>of 10,000</div>
          </div>
        </div>

        {/* HR zone breakdown */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
          borderRadius: 16, padding: '18px 20px', marginBottom: 12,
        }}>
          <div style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 14 }}>Heart Rate Zones</div>
          {hrZones.map((z, i) => (
            <div key={i} style={{ marginBottom: i < hrZones.length - 1 ? 10 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: TEXT_DIM }}>Z{z.zone} {z.label}</span>
                <span style={{ fontSize: 12, color: TEXT, fontWeight: 500 }}>{z.min} min</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)' }}>
                <div style={{
                  height: '100%', borderRadius: 3, background: z.color,
                  width: totalZoneMin > 0 ? `${(z.min / totalZoneMin) * 100}%` : '0%',
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* cardio load chart */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
          borderRadius: 16, padding: '18px 20px', marginBottom: 12,
        }}>
          <div style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>7-Day Strain History</div>
          <LineChart data={weeklyStrain} color={ACCENT} width={300} height={120} showBand bandMin={10} bandMax={14} />
        </div>

        {/* active minutes ring */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
          borderRadius: 16, padding: '20px', marginBottom: 12,
          display: 'flex', alignItems: 'center', gap: 20,
        }}>
          <div style={{ position: 'relative', width: 80, height: 80 }}>
            <ScoreRing score={(today.activity.activeMinutes / 60) * 100} size={80} color={ACCENT} trackColor={`${ACCENT}18`} />
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 300, color: TEXT,
            }}>
              {today.activity.activeMinutes}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>Active Minutes</div>
            <div style={{ fontSize: 14, color: TEXT }}>{today.activity.activeMinutes} of 60 min goal</div>
            <div style={{ fontSize: 12, color: '#2ECC71', marginTop: 2 }}>{Math.round((today.activity.activeMinutes / 60) * 100)}% complete</div>
          </div>
        </div>

        {/* coaching */}
        <div style={{
          background: `${ACCENT}0a`, border: `1px solid ${ACCENT}22`,
          borderRadius: 16, padding: '16px 18px', marginBottom: 24,
        }}>
          <div style={{ fontSize: 11, color: '#C9A96E', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, fontWeight: 600 }}>Coaching</div>
          <div style={{ fontSize: 14, color: TEXT, lineHeight: 1.55, opacity: 0.88 }}>
            Strain is moderate at {today.strain}. With your recovery at {today.readiness.score}%, you have significant headroom for a demanding session. Consider zone 4-5 intervals or a tempo run. Your Zone 2 base is solid this week — good aerobic foundation.
          </div>
        </div>
      </div>
    </div>
  );
}

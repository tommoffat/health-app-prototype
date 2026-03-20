import React from 'react';
import { user, today, weeklyActivity } from '../../data/fake.js';
import ArticleChart from './components/ArticleChart.jsx';

const PAPER = '#111520';
const GOLD = '#C9A96E';
const GOLD_LT = '#E8D5A8';
const GOLD_RULE = 'rgba(201,169,110,0.3)';
const TEXT = '#E8E8E8';
const TEXT_DIM = '#8B949E';
const TEXT_CAPTION = '#6B7280';
const BORDER = 'rgba(255,255,255,0.06)';
const TEAL = '#4ECDC4';

function BackButton({ onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', color: GOLD, fontSize: 13,
      cursor: 'pointer', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 6,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15,18 9,12 15,6" />
      </svg>
      Back to Today
    </button>
  );
}

function HRZoneBar({ zone, label, minutes, maxMinutes, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
      <span style={{ fontSize: 11, color: TEXT_DIM, width: 56, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: 20, background: BORDER, borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
        <div style={{
          width: `${(minutes / maxMinutes) * 100}%`,
          height: '100%',
          background: color,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 8,
        }}>
          {minutes >= 4 && (
            <span style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>{minutes}m</span>
          )}
        </div>
      </div>
      <span style={{ fontSize: 11, color: TEXT_CAPTION, width: 32, textAlign: 'right' }}>{minutes}m</span>
    </div>
  );
}

export default function ActivityArticle({ navigate }) {
  const strainWeek = [10.2, 11.8, 14.1, 9.5, 12.8, 11.2, 12.4];
  const zones = [
    { zone: 1, label: 'Zone 1', minutes: 8, color: '#5B8DEF' },
    { zone: 2, label: 'Zone 2', minutes: 14, color: '#4ECDC4' },
    { zone: 3, label: 'Zone 3', minutes: 10, color: '#F0C040' },
    { zone: 4, label: 'Zone 4', minutes: 8, color: '#E87B50' },
    { zone: 5, label: 'Zone 5', minutes: 4, color: '#E85050' },
    { zone: 6, label: 'Zone 6', minutes: 1, color: '#C82020' },
  ];
  const maxMin = Math.max(...zones.map(z => z.minutes));

  return (
    <div>
      <BackButton onClick={() => navigate('today')} />

      <article style={{ padding: '0 24px 80px', maxWidth: 640, margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 28,
          fontWeight: 400,
          lineHeight: 1.3,
          color: TEXT,
          margin: '8px 0 16px',
        }}>
          {today.workout.name} Session
        </h1>

        <div style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 28 }}>
          {user.name} M. — March 19, 2026 — 9:00 AM
        </div>

        {/* Workout Detail Card */}
        <div style={{
          background: PAPER,
          borderRadius: 10,
          padding: '20px',
          border: `1px solid ${BORDER}`,
          marginBottom: 32,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { label: 'Duration', value: '45 min' },
              { label: 'Avg HR', value: '128 bpm' },
              { label: 'Max HR', value: '162 bpm' },
              { label: 'Calories', value: `${today.activity.calories}` },
              { label: 'Strain', value: '8.2' },
              { label: 'Sets', value: `${today.workout.setsComplete}/${today.workout.setsTotal}` },
            ].map(m => (
              <div key={m.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>
                  {m.label}
                </div>
                <div style={{ fontSize: 18, fontWeight: 500, color: TEXT, fontFamily: 'Georgia, "Times New Roman", serif' }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: `1px solid ${GOLD_RULE}`, margin: '0 0 32px 0' }} />

        {/* HR Zone Breakdown */}
        <div style={{
          fontSize: 11, color: TEXT_CAPTION, letterSpacing: 0.5, marginBottom: 16,
          textTransform: 'uppercase',
        }}>
          Heart Rate Zone Breakdown
        </div>
        <div style={{ marginBottom: 32 }}>
          {zones.map(z => (
            <HRZoneBar key={z.zone} {...z} maxMinutes={maxMin} />
          ))}
        </div>

        <hr style={{ border: 'none', borderTop: `1px solid ${GOLD_RULE}`, margin: '0 0 32px 0' }} />

        {/* Strain History */}
        <ArticleChart data={strainWeek} color={GOLD} width={320} height={120} label="7-Day Strain History" />

        {/* Weekly Training Load */}
        <div style={{
          background: PAPER,
          borderRadius: 10,
          padding: '18px 20px',
          border: `1px solid ${BORDER}`,
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 12 }}>
            Weekly Training Load
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 500, color: TEXT, fontFamily: 'Georgia, "Times New Roman", serif' }}>
                82.0
              </div>
              <div style={{ fontSize: 11, color: TEXT_DIM }}>total strain</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 22, fontWeight: 500, color: TEAL, fontFamily: 'Georgia, "Times New Roman", serif' }}>
                Optimal
              </div>
              <div style={{ fontSize: 11, color: TEXT_DIM }}>load status</div>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: `1px solid ${GOLD_RULE}`, margin: '0 0 32px 0' }} />

        {/* Next Recommended */}
        <div style={{
          fontSize: 11, color: GOLD, letterSpacing: 3, textTransform: 'uppercase',
          fontWeight: 600, marginBottom: 16,
        }}>
          Next Recommended
        </div>
        <div style={{
          background: 'rgba(201,169,110,0.08)',
          border: `1px solid ${GOLD_RULE}`,
          borderRadius: 10,
          padding: '18px 20px',
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 18, fontWeight: 500, color: GOLD_LT, marginBottom: 6, fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Moderate Day
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.7, color: TEXT_DIM }}>
            Based on your recovery score of {today.readiness.score}% and this week's accumulated strain of 82.0,
            a moderate-intensity session is recommended. Consider Zone 2 cardio or a lighter
            complementary strength session targeting lower body.
          </div>
        </div>

        {/* Coaching */}
        <div style={{ fontSize: 14, lineHeight: 1.8, color: TEXT_DIM }}>
          <p style={{ margin: '0 0 16px 0' }}>
            Today's upper body session generated a strain of 8.2, with most time spent in zones 2-3.
            Your average heart rate of 128 bpm and peak of 162 bpm indicate you worked at a moderate
            intensity — appropriate for a strength-focused session.
          </p>
          <p style={{ margin: 0 }}>
            Your weekly strain of 82.0 is tracking within your optimal range of 75-90. Maintaining
            this pace through the week while respecting your recovery signals will support continued
            adaptation without overreaching.
          </p>
        </div>
      </article>
    </div>
  );
}

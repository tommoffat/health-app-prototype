import React from 'react';
import { today, user } from '../../data/fake.js';

const c = {
  bg: '#0B0E13',
  surface: '#131920',
  surfaceAlt: '#1E2530',
  accent: '#E8A04B',
  activity: '#4A90D9',
  sleep: '#7B68EE',
  text: '#EAEAEA',
  secondary: '#7A8899',
  border: '#2A3545',
};

function ScoreRing({ score, size, color, label, strokeWidth, onClick }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const center = size / 2;
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={center} cy={center} r={r} fill="none"
          stroke={c.surfaceAlt} strokeWidth={strokeWidth} />
        <circle cx={center} cy={center} r={r} fill="none"
          stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
        <text x={center} y={center} textAnchor="middle" dominantBaseline="central"
          fill={c.text}
          style={{
            transform: 'rotate(90deg)', transformOrigin: 'center',
            fontSize: size > 100 ? 36 : 20, fontWeight: 600,
            fontFamily: '-apple-system, SF Pro Display, sans-serif',
          }}
        >{score}</text>
      </svg>
      {label && (
        <span style={{ fontSize: 13, color: c.secondary, fontWeight: 500 }}>{label}</span>
      )}
    </div>
  );
}

function InsightCard({ text }) {
  return (
    <div style={{
      background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14,
      borderLeft: '3px solid #E8A04B',
      padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: 12,
    }}>
      <span style={{ fontSize: 18, marginTop: 1 }}>&#9679;</span>
      <span style={{ color: c.text, fontSize: 14, lineHeight: 1.5 }}>{text}</span>
    </div>
  );
}

export default function Today({ onNavigate }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{
      minHeight: '100%', background: c.bg, padding: '48px 20px 32px',
      fontFamily: '-apple-system, SF Pro Display, system-ui, sans-serif',
    }}>
      {/* Greeting */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <p style={{ color: c.secondary, fontSize: 15, margin: 0 }}>
          {greeting}, {user.name}. Here's your readiness.
        </p>
      </div>

      {/* Large Readiness Ring */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
        <ScoreRing
          score={today.readiness.score}
          size={160}
          color={c.accent}
          strokeWidth={10}
        />
      </div>

      {/* Two smaller rings */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 48, marginBottom: 32,
      }}>
        <ScoreRing
          score={today.sleep.score}
          size={80}
          color={c.sleep}
          strokeWidth={7}
          label="Sleep"
          onClick={() => onNavigate('sleep')}
        />
        <ScoreRing
          score={today.activity.score}
          size={80}
          color={c.activity}
          strokeWidth={7}
          label="Activity"
          onClick={() => onNavigate('activity')}
        />
      </div>

      {/* Insight Card */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ color: c.text, fontSize: 15, fontWeight: 600, margin: '0 0 12px' }}>
          Insights
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {today.insights.map((ins, i) => (
            <InsightCard key={i} text={ins} />
          ))}
        </div>
      </div>

      {/* Upcoming */}
      <div>
        <h3 style={{ color: c.text, fontSize: 15, fontWeight: 600, margin: '0 0 12px' }}>
          Upcoming
        </h3>
        <div style={{
          background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14,
          overflow: 'hidden',
        }}>
          {today.upcoming.map((item, i) => (
            <div key={i} style={{
              padding: '14px 18px',
              borderBottom: i < today.upcoming.length - 1 ? `1px solid ${c.border}` : 'none',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <span style={{
                color: c.accent, fontSize: 13, fontWeight: 600, minWidth: 68,
              }}>{item.time}</span>
              <span style={{ color: c.text, fontSize: 14 }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

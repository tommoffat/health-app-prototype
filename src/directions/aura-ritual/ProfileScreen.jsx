import React, { useState } from 'react';
import { user } from '../../data/fake.js';

const TEXT = '#F0F0F0';
const TEXT_DIM = '#8B949E';
const BORDER = 'rgba(255,255,255,0.08)';
const GOLD = '#C9A96E';

const goals = [
  { label: 'Recovery Target', value: '80+', color: '#4ECDC4' },
  { label: 'Sleep Goal', value: '8h', color: '#9B59B6' },
  { label: 'Strain Range', value: '12-14', color: '#F0943A' },
];

export default function ProfileScreen({ onExit }) {
  const [notifications, setNotifications] = useState({
    morning: true, coaching: true, bedtime: true, workout: false,
  });
  const [units, setUnits] = useState('imperial');

  const toggleNotif = key => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <div style={{ padding: '16px 16px 0' }}>
        {/* avatar section */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '32px 0 24px',
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: 36,
            background: 'rgba(201,169,110,0.15)', border: `2px solid ${GOLD}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 600, color: GOLD, letterSpacing: 1, marginBottom: 12,
          }}>
            {user.initials}
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: TEXT, marginBottom: 4 }}>Tom M.</div>
          <div style={{ fontSize: 13, color: TEXT_DIM }}>Health since Jan 2026</div>
        </div>

        {/* goals */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10, padding: '0 4px' }}>Goals</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {goals.map((g, i) => (
              <div key={i} style={{
                flex: 1, background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
                borderRadius: 14, padding: '16px 12px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 10, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>{g.label}</div>
                <div style={{ fontSize: 20, fontWeight: 500, color: g.color }}>{g.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* notification preferences */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10, padding: '0 4px' }}>Notifications</div>
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
            borderRadius: 16, overflow: 'hidden',
          }}>
            {[
              { key: 'morning', label: 'Morning Ritual' },
              { key: 'coaching', label: 'Coaching Insights' },
              { key: 'bedtime', label: 'Bedtime Reminder' },
              { key: 'workout', label: 'Workout Reminders' },
            ].map((item, i, arr) => (
              <div key={item.key} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 18px',
                borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : 'none',
              }}>
                <span style={{ fontSize: 14, color: TEXT }}>{item.label}</span>
                <button
                  onClick={() => toggleNotif(item.key)}
                  style={{
                    width: 44, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
                    background: notifications[item.key] ? GOLD : 'rgba(255,255,255,0.1)',
                    position: 'relative', transition: 'background 0.2s ease',
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: 10, background: TEXT,
                    position: 'absolute', top: 3,
                    left: notifications[item.key] ? 21 : 3,
                    transition: 'left 0.2s ease',
                  }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* units */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10, padding: '0 4px' }}>Units</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['imperial', 'metric'].map(u => (
              <button key={u} onClick={() => setUnits(u)} style={{
                flex: 1, padding: '12px 0', borderRadius: 12,
                background: units === u ? `${GOLD}22` : 'rgba(255,255,255,0.04)',
                border: units === u ? `1px solid ${GOLD}55` : `1px solid ${BORDER}`,
                color: units === u ? GOLD : TEXT_DIM,
                fontSize: 14, fontWeight: units === u ? 600 : 400, cursor: 'pointer',
                textTransform: 'capitalize',
              }}>
                {u}
              </button>
            ))}
          </div>
        </div>

        {/* exit button */}
        <button
          onClick={onExit}
          style={{
            width: '100%', padding: '14px', borderRadius: 14,
            background: 'rgba(255,255,255,0.06)', border: `1px solid ${BORDER}`,
            color: TEXT_DIM, fontSize: 14, fontWeight: 500, cursor: 'pointer',
            marginBottom: 24,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: 6 }}>
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Exit to Directions
        </button>
      </div>
    </div>
  );
}

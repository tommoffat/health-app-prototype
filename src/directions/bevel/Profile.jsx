import React from 'react';
import { user, today } from '../../data/fake';

const CORAL = '#FF6B35';
const TEAL = '#4ECDC4';
const PURPLE = '#9B59B6';
const BG = '#0F0F0F';
const SURFACE = '#1A1A1A';
const SURFACE2 = '#222222';
const WHITE = '#FFFFFF';
const GRAY = '#999999';

const settings = [
  { label: 'Notifications', value: 'On', icon: '🔔' },
  { label: 'Heart Rate Zones', value: 'Custom', icon: '❤️' },
  { label: 'Strain Coach', value: 'Enabled', icon: '🎯' },
  { label: 'Sleep Goal', value: '8 hours', icon: '🌙' },
  { label: 'Recovery Mode', value: 'Auto', icon: '⚡' },
  { label: 'Units', value: 'Imperial', icon: '📏' },
];

const achievements = [
  { label: 'Activity Streak', value: '12 days', color: CORAL },
  { label: 'Best Sleep Score', value: '94', color: PURPLE },
  { label: 'Peak HRV', value: '72 ms', color: TEAL },
];

export default function ProfileScreen({ onBack, onExit }) {
  return (
    <div style={{ background: BG, minHeight: '100%', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div onClick={onBack} style={{ color: GRAY, fontSize: 24, cursor: 'pointer', lineHeight: 1 }}>&#8592;</div>
        <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase' }}>PROFILE</div>
      </div>

      {/* Avatar & Name */}
      <div style={{ textAlign: 'center', padding: '12px 20px 24px' }}>
        <div style={{
          width: 80, height: 80, borderRadius: 40, background: SURFACE,
          border: `3px solid ${CORAL}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 12px', fontSize: 28, fontWeight: 900, color: CORAL,
          boxShadow: `0 0 20px ${CORAL}33`
        }}>
          {user.initials}
        </div>
        <div style={{ color: WHITE, fontSize: 22, fontWeight: 900 }}>{user.name}</div>
        <div style={{ color: GRAY, fontSize: 12, marginTop: 4 }}>Member since January 2024</div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px', marginBottom: 20 }}>
        {[
          { label: 'Avg Recovery', value: `${today.readiness.score}%`, color: TEAL },
          { label: 'Avg Strain', value: today.strain.toFixed(1), color: CORAL },
          { label: 'Avg Sleep', value: `${today.sleep.score}%`, color: PURPLE },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, background: SURFACE, borderRadius: 14, padding: '14px 8px',
            textAlign: 'center', borderTop: `2px solid ${s.color}`
          }}>
            <div style={{ color: s.color, fontSize: 20, fontWeight: 900 }}>{s.value}</div>
            <div style={{ color: GRAY, fontSize: 8, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div style={{ padding: '0 20px', marginBottom: 16 }}>
        <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Personal Bests</div>
        {achievements.map((a, i) => (
          <div key={i} style={{
            background: SURFACE, borderRadius: 14, padding: '12px 16px', marginBottom: 8,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            borderLeft: `3px solid ${a.color}`
          }}>
            <span style={{ color: WHITE, fontSize: 13, fontWeight: 700 }}>{a.label}</span>
            <span style={{ color: a.color, fontSize: 16, fontWeight: 900 }}>{a.value}</span>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div style={{ padding: '0 20px', marginBottom: 20 }}>
        <div style={{ color: GRAY, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Settings</div>
        <div style={{ background: SURFACE, borderRadius: 16, overflow: 'hidden' }}>
          {settings.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px',
              borderBottom: i < settings.length - 1 ? `1px solid ${SURFACE2}` : 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 16 }}>{s.icon}</span>
                <span style={{ color: WHITE, fontSize: 13, fontWeight: 600 }}>{s.label}</span>
              </div>
              <span style={{ color: GRAY, fontSize: 12, fontWeight: 600 }}>{s.value} &#8250;</span>
            </div>
          ))}
        </div>
      </div>

      {/* Change Direction */}
      <div style={{ padding: '0 20px' }}>
        <div onClick={onExit} style={{
          background: 'transparent', border: `2px solid ${CORAL}`, borderRadius: 16,
          padding: '16px 0', textAlign: 'center', cursor: 'pointer',
          color: CORAL, fontSize: 14, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase'
        }}>
          Change Direction
        </div>
        <div style={{
          textAlign: 'center', marginTop: 20, color: GRAY, fontSize: 11
        }}>
          Bevel v1.0 &middot; Health App Prototype
        </div>
      </div>
    </div>
  );
}

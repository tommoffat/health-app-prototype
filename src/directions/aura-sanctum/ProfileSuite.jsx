import React, { useState } from 'react';
import { user } from '../../data/fake.js';
import { BG_CARD, GOLD, GOLD_LT, TEXT, TEXT_DIM, CREAM, BORDER, ICONS, spacedCaps, btnReset } from './palette.js';

function SliderRow({ label, value, min, max, unit, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 14, color: TEXT }}>{label}</span>
        <span style={{ fontSize: 14, color: GOLD, fontWeight: 500 }}>{value}{unit}</span>
      </div>
      <div style={{ position: 'relative', height: 6, borderRadius: 3, background: `${GOLD}15` }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, borderRadius: 3, background: GOLD }} />
        <input
          type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            opacity: 0, cursor: 'pointer', margin: 0,
          }}
        />
        <div style={{
          position: 'absolute', top: -5, left: `${pct}%`, transform: 'translateX(-8px)',
          width: 16, height: 16, borderRadius: 8, background: GOLD,
          border: `2px solid #0A0C12`, pointerEvents: 'none',
        }} />
      </div>
    </div>
  );
}

function ToggleRow({ label, value, onChange }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 0', borderBottom: `1px solid ${BORDER}`,
    }}>
      <span style={{ fontSize: 14, color: TEXT }}>{label}</span>
      <button onClick={() => onChange(!value)} style={{
        ...btnReset, width: 44, height: 24, borderRadius: 12,
        background: value ? GOLD : `${GOLD}25`, padding: 2,
        display: 'flex', alignItems: value ? 'center' : 'center',
        justifyContent: value ? 'flex-end' : 'flex-start',
      }}>
        <div style={{
          width: 20, height: 20, borderRadius: 10,
          background: value ? '#0A0C12' : TEXT_DIM,
          transition: 'all 0.2s',
        }} />
      </button>
    </div>
  );
}

export default function ProfileSuite({ onBack, onExit }) {
  const [recoveryGoal, setRecoveryGoal] = useState(80);
  const [sleepTarget, setSleepTarget] = useState(8);
  const [strainMin, setStrainMin] = useState(10);
  const [strainMax, setStrainMax] = useState(14);
  const [notifRecovery, setNotifRecovery] = useState(true);
  const [notifSleep, setNotifSleep] = useState(true);
  const [notifStrain, setNotifStrain] = useState(false);
  const [notifCoaching, setNotifCoaching] = useState(true);

  return (
    <div style={{ padding: '24px 20px 40px' }}>
      {/* Back */}
      <button onClick={onBack} style={{ ...btnReset, display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d={ICONS.back} />
        </svg>
        <span style={{ marginLeft: 6, color: GOLD, fontSize: 13, fontWeight: 500 }}>Lobby</span>
      </button>

      {/* Profile Header */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 72, height: 72, borderRadius: 36, background: `${GOLD}12`,
          border: `2px solid ${GOLD}40`, display: 'flex', alignItems: 'center',
          justifyContent: 'center', margin: '0 auto 16px', fontSize: 24,
          fontWeight: 600, color: GOLD, letterSpacing: 1,
        }}>
          {user.initials}
        </div>
        <div style={{ fontSize: 24, fontWeight: 300, color: TEXT, letterSpacing: 0.5 }}>
          {user.name} M.
        </div>
        <div style={{ fontSize: 13, color: TEXT_DIM, marginTop: 6 }}>
          Member since January 2026
        </div>
        <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 2, fontStyle: 'italic' }}>
          Guest of Aura Sanctum
        </div>
      </div>

      {/* Sanctuary Preferences */}
      <div style={{ ...spacedCaps, marginBottom: 16 }}>Your Sanctuary</div>
      <div style={{
        padding: 20, borderRadius: 14, background: BG_CARD,
        border: `1px solid ${BORDER}`, marginBottom: 28,
      }}>
        <SliderRow label="Recovery Goal" value={recoveryGoal} min={50} max={100} unit="+" onChange={setRecoveryGoal} />
        <SliderRow label="Sleep Target" value={sleepTarget} min={5} max={10} unit="h" onChange={setSleepTarget} />
        <SliderRow label="Strain Range Min" value={strainMin} min={0} max={21} unit="" onChange={setStrainMin} />
        <SliderRow label="Strain Range Max" value={strainMax} min={0} max={21} unit="" onChange={setStrainMax} />
      </div>

      {/* Notifications */}
      <div style={{ ...spacedCaps, marginBottom: 16 }}>Notifications</div>
      <div style={{
        padding: '0 20px', borderRadius: 14, background: BG_CARD,
        border: `1px solid ${BORDER}`, marginBottom: 28,
      }}>
        <ToggleRow label="Recovery Alerts" value={notifRecovery} onChange={setNotifRecovery} />
        <ToggleRow label="Sleep Reminders" value={notifSleep} onChange={setNotifSleep} />
        <ToggleRow label="Strain Warnings" value={notifStrain} onChange={setNotifStrain} />
        <ToggleRow label="Coaching Insights" value={notifCoaching} onChange={setNotifCoaching} />
      </div>

      {/* About */}
      <div style={{ ...spacedCaps, marginBottom: 16 }}>About</div>
      <div style={{
        padding: 20, borderRadius: 14, background: BG_CARD,
        border: `1px solid ${BORDER}`, marginBottom: 32,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: TEXT_DIM }}>Version</span>
          <span style={{ fontSize: 13, color: TEXT }}>1.0.0</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: TEXT_DIM }}>Direction</span>
          <span style={{ fontSize: 13, color: TEXT }}>Aura Sanctum</span>
        </div>
      </div>

      {/* Exit */}
      <button onClick={onExit} style={{
        ...btnReset, width: '100%', padding: '14px 0',
        borderRadius: 12, border: `1px solid rgba(231,76,60,0.3)`,
        color: '#E74C3C', fontSize: 14, fontWeight: 500,
        letterSpacing: 0.5, textAlign: 'center',
      }}>
        Leave Sanctuary
      </button>
    </div>
  );
}

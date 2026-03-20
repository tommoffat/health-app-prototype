import React from 'react';
import { user } from '../../data/fake.js';

const BG = '#0D1117';
const PAPER = '#111520';
const GOLD = '#C9A96E';
const GOLD_LT = '#E8D5A8';
const GOLD_RULE = 'rgba(201,169,110,0.3)';
const TEXT = '#E8E8E8';
const TEXT_DIM = '#8B949E';
const TEXT_CAPTION = '#6B7280';
const BORDER = 'rgba(255,255,255,0.06)';

function SettingRow({ label, value }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 0',
      borderBottom: `1px solid ${BORDER}`,
    }}>
      <span style={{ fontSize: 14, color: TEXT }}>{label}</span>
      <span style={{ fontSize: 14, color: TEXT_DIM }}>{value}</span>
    </div>
  );
}

export default function ProfilePage({ onExit }) {
  return (
    <div style={{ padding: '24px 24px 80px', maxWidth: 640, margin: '0 auto' }}>
      {/* Avatar + Name */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LT})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: 28,
          fontWeight: 700,
          color: BG,
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}>
          {user.initials}
        </div>
        <div style={{
          fontSize: 22,
          fontWeight: 500,
          color: TEXT,
          fontFamily: 'Georgia, "Times New Roman", serif',
          marginBottom: 4,
        }}>
          {user.name} M.
        </div>
        <div style={{ fontSize: 13, color: TEXT_DIM }}>
          Health since Jan 2026
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: `1px solid ${GOLD_RULE}`, margin: '0 0 28px 0' }} />

      {/* Goals */}
      <div style={{
        fontSize: 10, color: GOLD, letterSpacing: 3, textTransform: 'uppercase',
        fontWeight: 600, marginBottom: 16,
      }}>
        Goals
      </div>
      <div style={{
        background: PAPER,
        borderRadius: 10,
        border: `1px solid ${BORDER}`,
        padding: '4px 18px',
        marginBottom: 32,
      }}>
        <SettingRow label="Recovery" value="80+" />
        <SettingRow label="Sleep" value="8h" />
        <SettingRow label="Daily Strain" value="12-14" />
      </div>

      {/* Preferences */}
      <div style={{
        fontSize: 10, color: GOLD, letterSpacing: 3, textTransform: 'uppercase',
        fontWeight: 600, marginBottom: 16,
      }}>
        Preferences
      </div>
      <div style={{
        background: PAPER,
        borderRadius: 10,
        border: `1px solid ${BORDER}`,
        padding: '4px 18px',
        marginBottom: 32,
      }}>
        <SettingRow label="Units" value="Imperial" />
        <SettingRow label="Notifications" value="On" />
        <SettingRow label="Dark Mode" value="Always" />
      </div>

      {/* About */}
      <div style={{
        fontSize: 10, color: GOLD, letterSpacing: 3, textTransform: 'uppercase',
        fontWeight: 600, marginBottom: 16,
      }}>
        About Chronicle
      </div>
      <div style={{
        background: PAPER,
        borderRadius: 10,
        border: `1px solid ${BORDER}`,
        padding: '18px',
        marginBottom: 32,
      }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: TEXT, marginBottom: 4, fontFamily: 'Georgia, "Times New Roman", serif' }}>
          Aura Chronicle
        </div>
        <div style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 4 }}>
          Version 1.0.0
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.6, color: TEXT_DIM }}>
          Your health as a beautiful editorial magazine. Not a dashboard. A story.
        </div>
      </div>

      {/* Exit */}
      <button
        onClick={onExit}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: 10,
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${BORDER}`,
          color: TEXT_DIM,
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD_RULE; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; }}
      >
        Exit to Directions
      </button>
    </div>
  );
}

import React from 'react'
import { user } from '../../data/fake'

const BG = '#F4F3EF'
const TEXT_PRIMARY = '#1A1A1A'
const TEXT_SECONDARY = '#888888'
const BORDER_LIGHT = '#E5E5E0'

export default function ProfileScreen({ onBack, onExit }) {
  const quickStats = [
    { label: 'Avg Recovery', value: '82%', color: '#4CAF50' },
    { label: 'Avg Strain', value: '11.8', color: '#F0943A' },
    { label: 'Avg Sleep', value: '85', color: '#6B7FD7' },
  ]

  const personalBests = [
    { label: 'Highest HRV', value: '78 ms', date: 'Mar 12' },
    { label: 'Lowest RHR', value: '49 bpm', date: 'Mar 8' },
    { label: 'Best Sleep', value: '96', date: 'Mar 5' },
    { label: 'Max Strain', value: '18.2', date: 'Feb 28' },
  ]

  const settings = ['Notifications', 'Heart Rate Zones', 'Sleep Goals', 'Units & Display', 'Connected Devices', 'Privacy']

  return (
    <div style={{ padding: '16px 16px 0', minHeight: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 8, marginBottom: 20 }}>
        {onBack && (
          <button onClick={onBack} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
            display: 'flex', alignItems: 'center'
          }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={TEXT_PRIMARY} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <div style={{ fontSize: 28, fontWeight: 700, color: TEXT_PRIMARY, letterSpacing: -0.5 }}>Profile</div>
      </div>

      {/* Avatar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <div style={{
          width: 80, height: 80, borderRadius: 40, border: '3px solid #4CAF50',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            width: 70, height: 70, borderRadius: 35, background: '#B8C4DB',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: TEXT_PRIMARY }}>{user.initials}</span>
          </div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: TEXT_PRIMARY, marginTop: 12 }}>{user.name}</div>
        <div style={{ fontSize: 14, color: TEXT_SECONDARY, marginTop: 4 }}>Member since Jan 2024</div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {quickStats.map((s, i) => (
          <div key={i} style={{
            flex: 1, background: '#FFFFFF', borderRadius: 16, padding: 16, textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 10, color: TEXT_SECONDARY, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Personal Bests */}
      <div style={{
        background: '#FFFFFF', borderRadius: 16, padding: 18, marginBottom: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SECONDARY, letterSpacing: 1, marginBottom: 8 }}>PERSONAL BESTS</div>
        {personalBests.map((pb, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0',
            borderBottom: i < personalBests.length - 1 ? `1px solid ${BORDER_LIGHT}` : 'none'
          }}>
            <span style={{ fontSize: 14, color: TEXT_PRIMARY }}>{pb.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }}>{pb.value}</span>
              <span style={{ fontSize: 12, color: TEXT_SECONDARY }}>{pb.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div style={{
        background: '#FFFFFF', borderRadius: 16, padding: 18, marginBottom: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SECONDARY, letterSpacing: 1, marginBottom: 8 }}>SETTINGS</div>
        {settings.map((s, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0',
            borderBottom: i < settings.length - 1 ? `1px solid ${BORDER_LIGHT}` : 'none', cursor: 'pointer'
          }}>
            <span style={{ fontSize: 15, color: TEXT_PRIMARY }}>{s}</span>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={TEXT_SECONDARY} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        ))}
      </div>

      {/* Change Direction */}
      <button onClick={onExit} style={{
        width: '100%', padding: '15px 0', borderRadius: 14, background: '#FFFFFF',
        color: '#E85740', fontSize: 16, fontWeight: 600, border: '1px solid #E85740',
        cursor: 'pointer', marginTop: 4
      }}>
        Change Direction
      </button>
      <div style={{ height: 32 }} />
    </div>
  )
}

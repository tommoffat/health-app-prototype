import React, { useState } from 'react'
import SleepHypnogram from './components/SleepHypnogram'
import VitalChart from './components/VitalChart'

const BG = '#0F1117'
const SURFACE = '#1A1E25'
const SURFACE2 = '#22272F'
const BORDER = '#2A3040'
const TEXT = '#FFFFFF'
const TEXT2 = '#8A8FA8'
const SLEEP_COLOR = '#7B8EF0'
const STRAIN_COLOR = '#F0943A'
const RECOVERY_COLOR = '#6ECC6E'

function MiniDonut({ pct, color, size = 40 }) {
  const r = (size - 4) / 2
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#2A3040" strokeWidth={4} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={4} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
    </svg>
  )
}

export default function PrimarySleepModal({ closeModal, openModal }) {
  const [activeVitalTab, setActiveVitalTab] = useState('hr')

  const stages = [
    { label: 'Awake', color: '#F0943A', duration: '0:28:00', pct: 6 },
    { label: 'REM', color: '#7B8EF0', duration: '1:58:00', pct: 27 },
    { label: 'Core', color: '#5566CC', duration: '3:12:00', pct: 43 },
    { label: 'Deep', color: '#3344AA', duration: '1:44:00', pct: 23 },
  ]

  const vitalTabs = [
    { key: 'hr', label: 'HR' },
    { key: 'hrv', label: 'HRV' },
    { key: 'rr', label: 'RR' },
    { key: 'spo2', label: 'SpO2' },
  ]

  const vitalInfo = {
    hr: { title: 'Sleeping Heart Rate', value: '64.4 bpm', sub: 'AVERAGE HR' },
    hrv: { title: 'Sleeping HRV', value: '68 ms', sub: 'AVERAGE HRV' },
    rr: { title: 'Sleeping Respiratory Rate', value: '15.7 rpm', sub: 'AVERAGE RR' },
    spo2: { title: 'Sleeping SpO2', value: '98%', sub: 'AVERAGE SPO2' },
  }

  const currentVital = vitalInfo[activeVitalTab]

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 150, background: BG,
      overflowY: 'auto', maxWidth: 390, margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, background: BG, zIndex: 10,
        padding: '16px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            onClick={closeModal}
            style={{
              width: 20, height: 20, borderRadius: '50%', display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              fontSize: 14, color: TEXT2,
            }}
          >✕</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: TEXT }}>Primary sleep</div>
          <div style={{ fontSize: 16, color: TEXT2, cursor: 'pointer' }}>↑</div>
        </div>
        <div style={{ textAlign: 'center', fontSize: 13, color: TEXT2, marginTop: 4 }}>
          3/19/26 at 11:02 PM
        </div>
      </div>

      {/* Sleep Stages */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, marginTop: 16 }}>Sleep Stages</div>

        <div style={{ marginTop: 12 }}>
          <SleepHypnogram width={350} height={120} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ fontSize: 11, color: TEXT2 }}>Legend: Typical range</span>
          <span style={{ fontSize: 11, color: TEXT2 }}>Duration: 07:22:00</span>
        </div>
      </div>

      {/* 2x2 Stage Breakdown */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
        padding: '12px 20px',
      }}>
        {stages.map((s) => (
          <div key={s.label} style={{
            background: SURFACE2, borderRadius: 12, padding: 12,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: s.color }}>{s.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>{s.duration}</div>
              <div style={{ fontSize: 13, color: s.color }}>{s.pct}%</div>
            </div>
            <MiniDonut pct={s.pct} color={s.color} />
          </div>
        ))}
      </div>

      {/* Sleep needed row */}
      <div style={{
        background: SURFACE, borderRadius: 14, padding: 14, margin: '12px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: 14, color: TEXT }}>Last night's sleep needed</span>
        <span style={{ fontSize: 14, color: TEXT2 }}>9h 0m ›</span>
      </div>

      {/* Time to Fall Asleep */}
      <div style={{ padding: '0 20px', marginTop: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>Time To Fall Asleep</div>
        <div style={{ background: SURFACE, borderRadius: 14, padding: 16, marginTop: 8 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: TEXT }}>12 min</div>
          <div style={{ position: 'relative', marginTop: 12 }}>
            <div style={{
              display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', width: '100%',
            }}>
              <div style={{ width: '33%', background: '#6ECC6E' }} />
              <div style={{ width: '34%', background: '#F5C842' }} />
              <div style={{ width: '33%', background: '#E74C3C' }} />
            </div>
            {/* Indicator dot */}
            <div style={{
              position: 'absolute', top: -3, left: '40%',
              width: 12, height: 12, borderRadius: '50%', background: TEXT,
              border: '2px solid ' + BG,
            }} />
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', marginTop: 8,
          }}>
            <span style={{ fontSize: 11, color: TEXT2 }}>Fast</span>
            <span style={{ fontSize: 11, color: TEXT2 }}>Normal</span>
            <span style={{ fontSize: 11, color: TEXT2 }}>Late</span>
          </div>
        </div>
      </div>

      {/* Vital charts section */}
      <div style={{ padding: '0 20px', marginTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>{currentVital.title}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: TEXT }}>{currentVital.value}</div>
            <div style={{ fontSize: 10, color: TEXT2, letterSpacing: 1 }}>{currentVital.sub}</div>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <VitalChart type={activeVitalTab} width={350} height={180} />
        </div>
      </div>

      {/* Tab switcher */}
      <div style={{
        background: SURFACE, borderRadius: 12, padding: 4,
        display: 'flex', margin: '12px 20px',
      }}>
        {vitalTabs.map((tab) => {
          const isActive = activeVitalTab === tab.key
          return (
            <div
              key={tab.key}
              onClick={() => setActiveVitalTab(tab.key)}
              style={{
                flex: 1, padding: '8px 0', borderRadius: 8, fontSize: 13,
                fontWeight: 600, textAlign: 'center', cursor: 'pointer',
                background: isActive ? SURFACE2 : 'transparent',
                color: isActive ? TEXT : TEXT2,
                borderBottom: isActive ? `2px solid ${SLEEP_COLOR}` : '2px solid transparent',
              }}
            >
              {tab.label}
            </div>
          )
        })}
      </div>

      {/* Bottom padding */}
      <div style={{ height: 40 }} />
    </div>
  )
}

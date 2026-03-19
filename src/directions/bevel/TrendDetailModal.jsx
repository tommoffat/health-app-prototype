import React, { useState } from 'react'
import LineChart from './components/LineChart'
import Sparkline from './components/Sparkline'

const BG = '#0F1117'
const SURFACE = '#1A1E25'
const SURFACE2 = '#22272F'
const BORDER = '#2A3040'
const TEXT = '#FFFFFF'
const TEXT2 = '#8A8FA8'
const SLEEP_COLOR = '#7B8EF0'
const STRAIN_COLOR = '#F0943A'
const RECOVERY_COLOR = '#6ECC6E'

const categoryTabs = {
  sleep: ['Sleep Score', 'Time Asleep', 'REM Sleep', 'Deep Sleep', 'Time in Bed', 'Sleep Efficiency'],
  recovery: ['Recovery Score', 'Resting HRV', 'Resting HR', 'Respiratory Rate', 'SpO2', 'Temp'],
  strain: ['Strain Score', 'Exercise Duration', 'Daytime HR', 'Total Energy', 'Step Count'],
}

const chartData = Array.from({ length: 30 }, (_, i) => ({
  x: `${(i % 28) + 1}`,
  y: 75 + Math.random() * 20,
}))

const trendRows = [
  { period: '3-day', change: '↑ +4%' },
  { period: '7-day', change: '↑ +8%' },
  { period: '14-day', change: '↑ +6%' },
  { period: '30-day', change: '↑ +12%' },
]

export default function TrendDetailModal({ closeModal, openModal, metric, category, color }) {
  const [activeMetric, setActiveMetric] = useState(metric || 'Sleep Score')
  const [activeRange, setActiveRange] = useState('30D')

  const tabs = categoryTabs[category] || categoryTabs.sleep
  const chartColor = color || SLEEP_COLOR
  const ranges = ['30D', '3M', '6M', '1Y']

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 150, background: BG,
      overflowY: 'auto', maxWidth: 390, margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div
          onClick={closeModal}
          style={{
            width: 20, height: 20, borderRadius: '50%', display: 'flex',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            fontSize: 14, color: TEXT2,
          }}
        >✕</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: TEXT }}>{metric || 'Trend Detail'}</div>
        <div style={{ width: 20 }} />
      </div>

      {/* Summary row */}
      <div style={{
        padding: '16px 20px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: TEXT }}>87%</div>
        <div style={{ fontSize: 13, color: TEXT2 }}>Feb 18 – Mar 19</div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: '#6ECC6E' }}>↑ Above normal</div>
          <div style={{ fontSize: 11, color: TEXT2 }}>Range: 75-95</div>
        </div>
      </div>

      {/* Metric tabs */}
      <div style={{
        padding: '0 20px', overflowX: 'auto', display: 'flex', gap: 8,
        whiteSpace: 'nowrap', msOverflowStyle: 'none', scrollbarWidth: 'none',
      }}>
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {tabs.map((tab) => {
          const isActive = activeMetric === tab
          return (
            <div
              key={tab}
              onClick={() => setActiveMetric(tab)}
              style={{
                borderRadius: 16, padding: '6px 14px', fontSize: 13,
                cursor: 'pointer', flexShrink: 0,
                background: isActive ? SURFACE2 : 'transparent',
                color: isActive ? TEXT : TEXT2,
              }}
            >
              {tab}
            </div>
          )
        })}
      </div>

      {/* Line chart */}
      <div style={{ padding: '16px 20px' }}>
        <LineChart data={chartData} color={chartColor} width={350} height={240} />
      </div>

      {/* Time range selector */}
      <div style={{
        padding: '12px 20px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: 16, color: TEXT2, cursor: 'pointer' }}>‹</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {ranges.map((r) => {
            const isActive = activeRange === r
            return (
              <div
                key={r}
                onClick={() => setActiveRange(r)}
                style={{
                  borderRadius: 12, padding: '6px 12px', fontSize: 13,
                  cursor: 'pointer',
                  background: isActive ? SURFACE2 : 'transparent',
                  color: isActive ? TEXT : TEXT2,
                }}
              >
                {r}
              </div>
            )
          })}
        </div>
        <span style={{ fontSize: 16 }}>📅</span>
        <div style={{ fontSize: 16, color: TEXT2, cursor: 'pointer' }}>›</div>
      </div>

      {/* Trends Analysis */}
      <div style={{ padding: '20px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>Trends Analysis</div>
        <div style={{ fontSize: 13, color: TEXT2, marginTop: 4 }}>
          Last data point on Mar 19, 2026
        </div>

        {trendRows.map((row) => (
          <div key={row.period} style={{
            background: SURFACE, borderRadius: 12, padding: '12px 16px',
            marginTop: 10, display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 14, color: TEXT }}>{row.period}</span>
            <span style={{ fontSize: 14, color: '#6ECC6E' }}>{row.change}</span>
            <Sparkline
              data={Array.from({ length: 5 }, () => Math.random() * 20 + 70)}
              width={50}
              height={20}
              color={chartColor}
            />
          </div>
        ))}
      </div>

      {/* Bottom padding */}
      <div style={{ height: 40 }} />
    </div>
  )
}

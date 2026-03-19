const BG = '#0A0A0A'
const CARD = '#1C1C1E'
const TEXT = '#FFFFFF'
const TEXT_SECONDARY = '#888888'
const SEPARATOR = '#333333'

export default function WorkoutDetail({ onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: BG, zIndex: 100,
      display: 'flex', flexDirection: 'column',
      paddingTop: 'env(safe-area-inset-top)',
      overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onClose} style={{
          width: 36, height: 36, borderRadius: 18, border: '1px solid #555',
          background: 'none', color: TEXT, fontSize: 18, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>✕</button>
        <div style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>Upper Body Strength</div>
        <div style={{ width: 36 }} />
      </div>

      <div style={{ fontSize: 14, color: TEXT_SECONDARY, textAlign: 'center', marginBottom: 20 }}>March 19, 2026 · 7:30 AM</div>

      <div style={{ padding: '0 16px' }}>
        {/* Cardio Impact */}
        <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, marginBottom: 12 }}>Cardio Impact</div>

        {/* Cardio Load */}
        <div style={{ background: CARD, borderRadius: 16, padding: 20, marginBottom: 12 }}>
          <div style={{ fontSize: 14, color: TEXT_SECONDARY, marginBottom: 12 }}>Cardio Load</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: TEXT }}>+13</span>
            <span style={{ fontSize: 14, color: '#8BC34A', fontWeight: 600 }}>Maintaining</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, background: '#222', borderRadius: 12, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: TEXT_SECONDARY, marginBottom: 4 }}>Before</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>15</div>
            </div>
            <div style={{ flex: 1, background: '#2A1A3E', borderRadius: 12, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#B39DDB', marginBottom: 4 }}>After</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#CE93D8' }}>28</div>
            </div>
          </div>
        </div>

        {/* Cardio Focus */}
        <div style={{ background: CARD, borderRadius: 16, padding: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 14, color: TEXT_SECONDARY, marginBottom: 16 }}>Cardio Focus</div>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { label: 'Low Aero', pct: 45, color: '#4CAF50' },
              { label: 'High Aero', pct: 35, color: '#FF9800' },
              { label: 'Anaerobic', pct: 20, color: '#F44336' },
            ].map((f) => (
              <div key={f.label} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: 80, background: '#222', borderRadius: 8, position: 'relative', overflow: 'hidden', marginBottom: 8 }}>
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: `${f.pct}%`, background: f.color, borderRadius: '0 0 8px 8px',
                  }} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{f.pct}%</div>
                <div style={{ fontSize: 11, color: TEXT_SECONDARY, marginTop: 2 }}>{f.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Heart Rate */}
        <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, marginBottom: 12 }}>Heart Rate</div>
        <div style={{ background: CARD, borderRadius: 16, padding: 20, marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: TEXT }}>126</span>
            <span style={{ fontSize: 14, color: TEXT_SECONDARY }}>bpm avg</span>
          </div>
          <div style={{ fontSize: 13, color: '#FF9800', fontWeight: 600, marginBottom: 16 }}>Zone 2</div>

          {/* HR zone chart */}
          <svg width="100%" height={80} viewBox="0 0 300 80" preserveAspectRatio="none" style={{ display: 'block' }}>
            {/* Zone shading */}
            <rect x="0" y="0" width="300" height="16" fill="rgba(244,67,54,0.1)" />
            <rect x="0" y="16" width="300" height="16" fill="rgba(255,152,0,0.1)" />
            <rect x="0" y="32" width="300" height="16" fill="rgba(255,193,7,0.08)" />
            <rect x="0" y="48" width="300" height="16" fill="rgba(139,195,74,0.08)" />
            <rect x="0" y="64" width="300" height="16" fill="rgba(96,125,139,0.08)" />
            {/* HR line */}
            <path d="M0,55 Q20,50 40,48 T80,35 T120,30 T160,28 T200,32 T240,30 T280,35 T300,40"
              fill="none" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 11, color: TEXT_SECONDARY }}>0 min</span>
            <span style={{ fontSize: 11, color: TEXT_SECONDARY }}>37 min</span>
            <span style={{ fontSize: 11, color: TEXT_SECONDARY }}>75 min</span>
          </div>
        </div>
      </div>
    </div>
  )
}

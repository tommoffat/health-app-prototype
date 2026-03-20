import React, { useState } from 'react';
import { user, today, weeklyHRV, weeklySleep } from '../../data/fake.js';

// ── Color palette ──
const BG_DEEP = '#0D1117';
const BG_MID  = '#111827';
const GOLD    = '#C9A96E';
const GOLD_LT = '#E8D5A8';
const AURORA_TEAL   = '#4ECDC4';
const AURORA_PURPLE = '#9B59B6';
const AURORA_GREEN  = '#2ECC71';
const TEXT     = '#F0F0F0';
const TEXT_DIM = '#8B949E';
const BORDER   = 'rgba(255,255,255,0.08)';

// ── Node definitions ──
const CANVAS_W = 390;
const CANVAS_H = 500;

const CENTER = { id: 'wellbeing', label: 'Wellbeing', value: today.readiness.score, unit: '', x: 195, y: 250, r: 44, color: GOLD, ring: 0 };

const RING1 = [
  { id: 'recovery', label: 'Recovery', value: 72, unit: '%', x: 195, y: 110, r: 30, color: AURORA_TEAL },
  { id: 'sleep',    label: 'Sleep',    value: today.sleep.score, unit: '%', x: 320, y: 195, r: 32, color: AURORA_PURPLE },
  { id: 'strain',   label: 'Strain',   value: today.strain, unit: '', x: 70, y: 195, r: 26, color: AURORA_GREEN },
];

const RING2 = [
  { id: 'hrv',   label: 'HRV',   value: today.readiness.hrv,       unit: 'ms',  x: 290, y: 360, r: 20, color: AURORA_TEAL },
  { id: 'rhr',   label: 'RHR',   value: today.readiness.restingHR, unit: 'bpm', x: 155, y: 390, r: 20, color: AURORA_PURPLE },
  { id: 'spo2',  label: 'SpO2',  value: today.readiness.spo2,      unit: '%',   x: 100, y: 330, r: 18, color: AURORA_GREEN },
  { id: 'steps', label: 'Steps', value: today.activity.steps,      unit: '',    x: 270, y: 100, r: 22, color: AURORA_TEAL },
];

const ALL_NODES = [CENTER, ...RING1, ...RING2];

// ── Connections: center to ring1, ring1 to ring2 ──
const CONNECTIONS = [
  // center → ring1
  ...RING1.map(n => ({ from: CENTER, to: n, color: GOLD })),
  // ring1 → ring2
  { from: RING1[0], to: RING2[3], color: AURORA_TEAL },   // Recovery → Steps
  { from: RING1[1], to: RING2[0], color: AURORA_PURPLE },  // Sleep → HRV
  { from: RING1[1], to: RING2[1], color: AURORA_PURPLE },  // Sleep → RHR
  { from: RING1[2], to: RING2[2], color: AURORA_GREEN },   // Strain → SpO2
  { from: RING1[2], to: RING2[3], color: AURORA_GREEN },   // Strain → Steps
  { from: RING1[0], to: RING2[0], color: AURORA_TEAL },    // Recovery → HRV
];

// ── Domain detail data for bottom sheet ──
function getDomainDetail(nodeId) {
  switch (nodeId) {
    case 'wellbeing': return {
      title: 'Wellbeing', score: today.readiness.score, sparkData: weeklyHRV,
      metrics: [
        { label: 'HRV', value: `${today.readiness.hrv}ms` },
        { label: 'RHR', value: `${today.readiness.restingHR}bpm` },
        { label: 'SpO2', value: `${today.readiness.spo2}%` },
        { label: 'Body Temp', value: today.readiness.bodyTemp },
      ],
    };
    case 'recovery': return {
      title: 'Recovery', score: 72, sparkData: weeklyHRV,
      metrics: [
        { label: 'HRV', value: `${today.readiness.hrv}ms` },
        { label: 'RHR', value: `${today.readiness.restingHR}bpm` },
        { label: 'Body Temp', value: today.readiness.bodyTemp },
        { label: 'SpO2', value: `${today.readiness.spo2}%` },
      ],
    };
    case 'sleep': return {
      title: 'Sleep', score: today.sleep.score, sparkData: weeklySleep,
      metrics: [
        { label: 'Total', value: today.sleep.total },
        { label: 'Deep', value: today.sleep.deep },
        { label: 'REM', value: today.sleep.rem },
        { label: 'Efficiency', value: `${today.sleep.efficiency}%` },
      ],
    };
    case 'strain': return {
      title: 'Strain', score: today.strain, sparkData: [8.2, 10.1, 14.3, 11.0, 12.8, 12.4, 12.4],
      metrics: [
        { label: 'Day Strain', value: today.strain },
        { label: 'Calories', value: today.activity.calories },
        { label: 'Active Min', value: `${today.activity.activeMinutes}m` },
        { label: 'Steps', value: today.activity.steps.toLocaleString() },
      ],
    };
    case 'hrv': return {
      title: 'HRV', score: today.readiness.hrv, sparkData: weeklyHRV,
      metrics: [
        { label: 'Current', value: `${today.readiness.hrv}ms` },
        { label: '7d Avg', value: '66ms' },
        { label: 'Trend', value: '+12%' },
        { label: 'Baseline', value: '62ms' },
      ],
    };
    case 'rhr': return {
      title: 'Resting HR', score: today.readiness.restingHR, sparkData: [54, 53, 52, 53, 52, 52, 52],
      metrics: [
        { label: 'Current', value: `${today.readiness.restingHR}bpm` },
        { label: '7d Avg', value: '53bpm' },
        { label: 'Trend', value: '-2bpm' },
        { label: 'Baseline', value: '54bpm' },
      ],
    };
    case 'spo2': return {
      title: 'SpO2', score: today.readiness.spo2, sparkData: [97, 98, 98, 97, 98, 98, 98],
      metrics: [
        { label: 'Current', value: `${today.readiness.spo2}%` },
        { label: '7d Avg', value: '98%' },
        { label: 'Min', value: '96%' },
        { label: 'Max', value: '99%' },
      ],
    };
    case 'steps': return {
      title: 'Steps', score: today.activity.steps, sparkData: [7200, 8100, 9400, 7800, 8600, 8432, 8432],
      metrics: [
        { label: 'Today', value: today.activity.steps.toLocaleString() },
        { label: 'Calories', value: today.activity.calories },
        { label: 'Active Min', value: `${today.activity.activeMinutes}m` },
        { label: 'Stand Hrs', value: today.activity.standHours },
      ],
    };
    default: return { title: '', score: 0, sparkData: [], metrics: [] };
  }
}

// ── Sparkline component ──
function Sparkline({ data, color, width = 120, height = 36 }) {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const px = (i / (data.length - 1)) * width;
    const py = height - ((v - min) / range) * (height - 4) - 2;
    return `${px},${py}`;
  }).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={parseFloat(points.split(' ').pop().split(',')[0])} cy={parseFloat(points.split(' ').pop().split(',')[1])} r="3" fill={color} />
    </svg>
  );
}

// ── Tab definitions ──
const TABS = [
  { id: 'graph', label: 'Graph', path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { id: 'trends', label: 'Trends', path: 'M3 17l6-6 4 4 8-8M14 7h7v7' },
  { id: 'body', label: 'Body', path: 'M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2' },
  { id: 'log', label: 'Log', path: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8' },
  { id: 'profile', label: 'Profile', path: 'M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M12 14H8a4 4 0 0 0-4 4v2M10 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
];

// ── Main component ──
export default function AuraBloomDirection({ onExit }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeTab, setActiveTab] = useState('graph');

  const detail = selectedNode ? getDomainDetail(selectedNode) : null;

  const handleNodeTap = (nodeId) => {
    setSelectedNode(nodeId);
  };

  const closeSheet = () => {
    setSelectedNode(null);
  };

  return (
    <div style={{
      height: '100dvh',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      paddingTop: 'env(safe-area-inset-top, 0px)',
      background: BG_DEEP,
      color: TEXT,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
      position: 'relative',
    }}>
      {/* Keyframe animations */}
      <style>{`
        @keyframes auraBloomPulse {
          0%, 100% { filter: drop-shadow(0 0 8px ${GOLD}44); }
          50% { filter: drop-shadow(0 0 24px ${GOLD}99); }
        }
        @keyframes auraBloomShimmer {
          0%, 100% { opacity: 0.03; transform: translateY(0) scale(1); }
          33% { opacity: 0.06; transform: translateY(-10px) scale(1.02); }
          66% { opacity: 0.04; transform: translateY(5px) scale(0.98); }
        }
        @keyframes auraBloomSheetUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes auraBloomFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes auraBloomNodeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>

      {/* Aurora shimmer backgrounds */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-20%', width: '80%', height: '60%',
          background: `radial-gradient(ellipse at center, ${AURORA_TEAL}15 0%, transparent 70%)`,
          animation: 'auraBloomShimmer 8s ease-in-out infinite',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-20%', width: '70%', height: '50%',
          background: `radial-gradient(ellipse at center, ${AURORA_PURPLE}12 0%, transparent 70%)`,
          animation: 'auraBloomShimmer 12s ease-in-out infinite 2s',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', top: '30%', left: '10%', width: '50%', height: '40%',
          background: `radial-gradient(ellipse at center, ${AURORA_GREEN}08 0%, transparent 70%)`,
          animation: 'auraBloomShimmer 10s ease-in-out infinite 4s',
          borderRadius: '50%',
        }} />
      </div>

      {/* Header with back button */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px 8px',
      }}>
        <button onClick={onExit} style={{
          background: 'rgba(255,255,255,0.06)',
          border: `1px solid ${BORDER}`,
          borderRadius: 10,
          padding: '6px 10px',
          display: 'flex', alignItems: 'center', gap: 4,
          color: TEXT_DIM, cursor: 'pointer',
          fontSize: 13, fontWeight: 500,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </button>
        <div style={{ fontSize: 15, fontWeight: 600, color: GOLD_LT, letterSpacing: 1 }}>AURA BLOOM</div>
        <div style={{ width: 60 }} />
      </div>

      {/* Greeting */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '4px 0 0' }}>
        <div style={{ fontSize: 13, color: TEXT_DIM }}>Hello, {user.name}</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: TEXT, marginTop: 2 }}>Living Ecosystem</div>
        <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 2 }}>{today.date}</div>
      </div>

      {/* SVG Canvas */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
        <svg
          width={CANVAS_W}
          height={CANVAS_H}
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          style={{ maxWidth: '100%', overflow: 'visible' }}
        >
          {/* Connection lines */}
          {CONNECTIONS.map((conn, i) => (
            <line
              key={`conn-${i}`}
              x1={conn.from.x} y1={conn.from.y}
              x2={conn.to.x} y2={conn.to.y}
              stroke={conn.color}
              strokeWidth="1"
              strokeOpacity="0.2"
              strokeLinecap="round"
            />
          ))}

          {/* Ring 2 nodes */}
          {RING2.map(node => (
            <g key={node.id} onClick={() => handleNodeTap(node.id)} style={{ cursor: 'pointer' }}>
              <circle cx={node.x} cy={node.y} r={node.r + 4} fill="transparent" />
              <circle cx={node.x} cy={node.y} r={node.r} fill={BG_MID} stroke={node.color} strokeWidth="1.5" strokeOpacity="0.5" />
              <text x={node.x} y={node.y - 4} textAnchor="middle" fill={node.color} fontSize="11" fontWeight="700" fontFamily="inherit">
                {typeof node.value === 'number' && node.value > 999 ? `${(node.value / 1000).toFixed(1)}k` : node.value}
              </text>
              <text x={node.x} y={node.y + 10} textAnchor="middle" fill={TEXT_DIM} fontSize="8" fontFamily="inherit">
                {node.label}
              </text>
            </g>
          ))}

          {/* Ring 1 nodes */}
          {RING1.map(node => (
            <g key={node.id} onClick={() => handleNodeTap(node.id)} style={{ cursor: 'pointer' }}>
              <circle cx={node.x} cy={node.y} r={node.r + 4} fill="transparent" />
              <circle cx={node.x} cy={node.y} r={node.r} fill={BG_MID} stroke={node.color} strokeWidth="2" strokeOpacity="0.6" />
              <circle cx={node.x} cy={node.y} r={node.r - 3} fill="transparent" stroke={node.color} strokeWidth="0.5" strokeOpacity="0.2" />
              <text x={node.x} y={node.y - 4} textAnchor="middle" fill={TEXT} fontSize="14" fontWeight="700" fontFamily="inherit">
                {node.value}{node.unit}
              </text>
              <text x={node.x} y={node.y + 12} textAnchor="middle" fill={TEXT_DIM} fontSize="9" fontFamily="inherit">
                {node.label}
              </text>
            </g>
          ))}

          {/* Center node with pulsing glow */}
          <g onClick={() => handleNodeTap(CENTER.id)} style={{ cursor: 'pointer', animation: 'auraBloomPulse 3s ease-in-out infinite' }}>
            <circle cx={CENTER.x} cy={CENTER.y} r={CENTER.r + 6} fill="transparent" />
            <circle cx={CENTER.x} cy={CENTER.y} r={CENTER.r} fill={BG_MID} stroke={GOLD} strokeWidth="2.5" />
            <circle cx={CENTER.x} cy={CENTER.y} r={CENTER.r - 5} fill="transparent" stroke={GOLD} strokeWidth="0.5" strokeOpacity="0.3" />
            <text x={CENTER.x} y={CENTER.y - 6} textAnchor="middle" fill={GOLD_LT} fontSize="22" fontWeight="700" fontFamily="inherit">
              {CENTER.value}
            </text>
            <text x={CENTER.x} y={CENTER.y + 12} textAnchor="middle" fill={TEXT_DIM} fontSize="10" fontFamily="inherit">
              {CENTER.label}
            </text>
          </g>
        </svg>
      </div>

      {/* Insights */}
      <div style={{
        position: 'relative', zIndex: 2,
        margin: '4px 16px 16px',
        padding: '14px 16px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 14,
        border: `1px solid ${BORDER}`,
      }}>
        <div style={{ fontSize: 11, color: GOLD, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Insights</div>
        {today.insights.map((insight, i) => (
          <div key={i} style={{ fontSize: 13, color: TEXT_DIM, padding: '4px 0', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <span style={{ color: AURORA_TEAL, fontSize: 8, marginTop: 4 }}>&#9679;</span>
            {insight}
          </div>
        ))}
      </div>

      {/* Quick stats row */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', gap: 8,
        margin: '0 16px 16px',
      }}>
        {[
          { label: 'Weight', value: `${today.weight} lbs`, color: AURORA_TEAL },
          { label: 'Calories', value: today.activity.calories, color: AURORA_PURPLE },
          { label: 'Active', value: `${today.activity.activeMinutes}m`, color: AURORA_GREEN },
        ].map((stat, i) => (
          <div key={i} style={{
            flex: 1, padding: '12px 10px', textAlign: 'center',
            background: 'rgba(255,255,255,0.03)', borderRadius: 12,
            border: `1px solid ${BORDER}`,
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: TEXT_DIM, marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Spacer for tab bar */}
      <div style={{ height: 80, paddingBottom: 'env(safe-area-inset-bottom, 0px)' }} />

      {/* Tab bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: `${BG_DEEP}F2`,
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${BORDER}`,
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        paddingTop: 6, paddingBottom: 'max(8px, env(safe-area-inset-bottom, 0px))',
      }}>
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              padding: '4px 8px', color: isActive ? GOLD : TEXT_DIM,
              transition: 'color 0.2s',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={tab.path} />
              </svg>
              <span style={{ fontSize: 9, fontWeight: isActive ? 600 : 400 }}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom sheet overlay */}
      {selectedNode && (
        <div
          onClick={closeSheet}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 100,
            animation: 'auraBloomFadeIn 0.2s ease-out',
          }}
        >
          {/* Bottom sheet */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: BG_MID,
              borderRadius: '20px 20px 0 0',
              padding: '12px 20px',
              paddingBottom: 'max(24px, env(safe-area-inset-bottom, 0px))',
              animation: 'auraBloomSheetUp 0.3s ease-out',
              maxHeight: '55vh',
              overflowY: 'auto',
            }}
          >
            {/* Handle */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
            </div>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>{detail.title}</div>
                <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 2 }}>7-day overview</div>
              </div>
              <div style={{
                fontSize: 32, fontWeight: 800, color: GOLD_LT,
              }}>
                {detail.score}
              </div>
            </div>

            {/* Sparkline */}
            <div style={{
              padding: '12px 16px', marginBottom: 16,
              background: 'rgba(255,255,255,0.03)', borderRadius: 12,
              border: `1px solid ${BORDER}`,
              display: 'flex', justifyContent: 'center',
            }}>
              <Sparkline data={detail.sparkData} color={AURORA_TEAL} width={280} height={48} />
            </div>

            {/* Metrics grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              {detail.metrics.map((m, i) => (
                <div key={i} style={{
                  padding: '12px 14px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 12,
                  border: `1px solid ${BORDER}`,
                }}>
                  <div style={{ fontSize: 10, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.5 }}>{m.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, marginTop: 4 }}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Close button */}
            <button onClick={closeSheet} style={{
              width: '100%', padding: '12px 0',
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              color: TEXT_DIM, fontSize: 14, fontWeight: 500,
              cursor: 'pointer', marginTop: 4,
            }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { user, today, weeklyHRV, weeklySleep, weeklyActivity, weeklyWeight } from '../../data/fake.js';

// ── Palette ──
const BG = '#080D12';
const BG_NODE = '#0D1520';
const GLOW_RECOVERY = '#4ECDC4';
const GLOW_SLEEP = '#9B59B6';
const GLOW_STRAIN = '#F0943A';
const GLOW_BIOLOGY = '#E91E8C';
const GLOW_NEUTRAL = '#C9A96E';
const TEXT = '#F0F0F0';
const TEXT_DIM = '#5A6A7A';
const CONN_LINE = 'rgba(255,255,255,0.06)';
const CONN_LINE_ACTIVE = 'rgba(255,255,255,0.15)';
const BORDER = 'rgba(255,255,255,0.08)';

// ── Canvas & Node Definitions ──
const CANVAS_W = 390;
const CANVAS_H = 520;

const CENTER_NODE = { id: 'wellbeing', label: 'Wellbeing', value: today.readiness.score, unit: '', x: 195, y: 230, r: 52, color: GLOW_NEUTRAL, ring: 0 };

const RING1_NODES = [
  { id: 'recovery', label: 'Recovery', value: `${today.readiness.score}%`, rawValue: today.readiness.score, x: 195, y: 100, r: 46, color: GLOW_RECOVERY, ring: 1 },
  { id: 'sleep', label: 'Sleep', value: `${today.sleep.score}%`, rawValue: today.sleep.score, x: 330, y: 260, r: 46, color: GLOW_SLEEP, ring: 1 },
  { id: 'strain', label: 'Strain', value: today.strain, rawValue: today.strain, x: 60, y: 260, r: 46, color: GLOW_STRAIN, ring: 1 },
];

const RING2_NODES = [
  { id: 'hrv', label: 'HRV', value: `${today.readiness.hrv}`, rawValue: today.readiness.hrv, unit: 'ms', x: 290, y: 130, r: 30, color: GLOW_RECOVERY, ring: 2 },
  { id: 'rhr', label: 'RHR', value: `${today.readiness.restingHR}`, rawValue: today.readiness.restingHR, unit: 'bpm', x: 100, y: 130, r: 30, color: GLOW_BIOLOGY, ring: 2 },
  { id: 'spo2', label: 'SpO2', value: `${today.readiness.spo2}`, rawValue: today.readiness.spo2, unit: '%', x: 345, y: 370, r: 30, color: '#3498DB', ring: 2 },
  { id: 'steps', label: 'Steps', value: '8.4k', rawValue: today.activity.steps, x: 45, y: 370, r: 30, color: GLOW_STRAIN, ring: 2 },
  { id: 'temp', label: 'Temp', value: today.readiness.bodyTemp, rawValue: 0.2, x: 195, y: 430, r: 30, color: '#2ECC71', ring: 2 },
];

const ALL_NODES = [CENTER_NODE, ...RING1_NODES, ...RING2_NODES];

const CONNECTIONS = [
  { from: 'wellbeing', to: 'recovery' },
  { from: 'wellbeing', to: 'sleep' },
  { from: 'wellbeing', to: 'strain' },
  { from: 'recovery', to: 'hrv' },
  { from: 'recovery', to: 'rhr' },
  { from: 'recovery', to: 'spo2' },
  { from: 'sleep', to: 'hrv' },
  { from: 'sleep', to: 'temp' },
  { from: 'strain', to: 'steps' },
];

function getNode(id) { return ALL_NODES.find(n => n.id === id); }

function getStatus(id) {
  const good = ['recovery', 'sleep', 'hrv', 'spo2', 'wellbeing', 'temp'];
  const warn = ['strain', 'steps'];
  if (good.includes(id)) return '#2ECC71';
  if (warn.includes(id)) return '#F1C40F';
  return '#E74C3C';
}

// ── Sparkline ──
function Sparkline({ data, color, width = 120, height = 36 }) {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const px = (i / (data.length - 1)) * width;
    const py = height - ((v - min) / range) * (height - 6) - 3;
    return `${px},${py}`;
  });
  const lastPt = pts[pts.length - 1].split(',');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={parseFloat(lastPt[0])} cy={parseFloat(lastPt[1])} r="3" fill={color} />
    </svg>
  );
}

// ── LineChart (larger trend chart) ──
function LineChart({ data, color, width = 280, height = 100, showBand = false, bandMin, bandMax }) {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 4;
  const pts = data.map((v, i) => {
    const px = padding + (i / (data.length - 1)) * (width - padding * 2);
    const py = padding + (1 - (v - min) / range) * (height - padding * 2);
    return { x: px, y: py };
  });
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaD = pathD + ` L${pts[pts.length - 1].x},${height} L${pts[0].x},${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {showBand && bandMin != null && bandMax != null && (
        <rect
          x={padding} y={padding + (1 - (bandMax - min) / range) * (height - padding * 2)}
          width={width - padding * 2}
          height={((bandMax - bandMin) / range) * (height - padding * 2)}
          fill={color} fillOpacity="0.08" rx="4"
        />
      )}
      <defs>
        <linearGradient id={`lc-grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#lc-grad-${color.replace('#', '')})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="4" fill={color} />
    </svg>
  );
}

// ── Score Ring ──
function ScoreRing({ score, maxScore = 100, color, size = 120 }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(score / maxScore, 1);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="6"
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x={size / 2} y={size / 2 - 4} textAnchor="middle" fill={TEXT} fontSize="28" fontWeight="800" fontFamily="inherit">{score}</text>
      <text x={size / 2} y={size / 2 + 16} textAnchor="middle" fill={TEXT_DIM} fontSize="11" fontFamily="inherit">{maxScore === 100 ? '%' : ''}</text>
    </svg>
  );
}

// ── Sleep Stage Bar ──
function SleepStageBar() {
  const stages = [
    { label: 'Awake', duration: '28m', pct: 6, color: '#E74C3C' },
    { label: 'REM', duration: '1h 58m', pct: 27, color: '#3498DB' },
    { label: 'Core', duration: '3h 12m', pct: 44, color: GLOW_SLEEP },
    { label: 'Deep', duration: '1h 44m', pct: 23, color: '#1A0A3E' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', height: 18, borderRadius: 9, overflow: 'hidden', marginBottom: 8 }}>
        {stages.map((s, i) => (
          <div key={i} style={{ width: `${s.pct}%`, background: s.color, transition: 'width 0.3s' }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {stages.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: TEXT_DIM }}>{s.label}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: s.color }}>{s.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── HR Zone Bars ──
function HRZoneBars() {
  const zones = [
    { label: 'Zone 1', pct: 35, color: '#3498DB' },
    { label: 'Zone 2', pct: 40, color: '#2ECC71' },
    { label: 'Zone 3', pct: 15, color: '#F1C40F' },
    { label: 'Zone 4', pct: 8, color: GLOW_STRAIN },
    { label: 'Zone 5', pct: 2, color: '#E74C3C' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {zones.map((z, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 10, color: TEXT_DIM, width: 42, flexShrink: 0 }}>{z.label}</div>
          <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 5 }}>
            <div style={{ width: `${z.pct}%`, height: '100%', background: z.color, borderRadius: 5 }} />
          </div>
          <div style={{ fontSize: 10, color: TEXT_DIM, width: 28, textAlign: 'right' }}>{z.pct}%</div>
        </div>
      ))}
    </div>
  );
}

// ── NodeDetail content by type ──
function getNodeDetailContent(nodeId) {
  switch (nodeId) {
    case 'wellbeing': return {
      title: 'Wellbeing', score: today.readiness.score, color: GLOW_NEUTRAL, maxScore: 100,
      coaching: 'Your overall wellbeing is strong today. Recovery and sleep are both tracking well, supporting a productive day ahead.',
      metrics: [
        { label: 'HRV', value: `${today.readiness.hrv}ms` },
        { label: 'RHR', value: `${today.readiness.restingHR}bpm` },
        { label: 'SpO2', value: `${today.readiness.spo2}%` },
        { label: 'Temp', value: today.readiness.bodyTemp },
      ],
      chartData: weeklyHRV, chartColor: GLOW_NEUTRAL,
    };
    case 'recovery': return {
      title: 'Recovery', score: today.readiness.score, color: GLOW_RECOVERY, maxScore: 100,
      coaching: 'Recovery is in the green zone. Your autonomic nervous system shows strong parasympathetic activity. Consider a moderate training day.',
      metrics: [
        { label: 'HRV', value: `${today.readiness.hrv}ms` },
        { label: 'RHR', value: `${today.readiness.restingHR}bpm` },
        { label: 'SpO2', value: `${today.readiness.spo2}%` },
        { label: 'Temp', value: today.readiness.bodyTemp },
      ],
      chartData: weeklyHRV, chartColor: GLOW_RECOVERY, showRing: true,
    };
    case 'sleep': return {
      title: 'Sleep', score: today.sleep.score, color: GLOW_SLEEP, maxScore: 100,
      duration: today.sleep.total,
      coaching: 'Excellent sleep architecture last night. Deep sleep exceeded target, and sleep efficiency was high. Maintain your current wind-down routine.',
      chartData: weeklySleep, chartColor: GLOW_SLEEP, showStages: true,
    };
    case 'strain': return {
      title: 'Strain', score: today.strain, color: GLOW_STRAIN, maxScore: 21,
      workout: today.workout,
      coaching: 'Moderate strain today from your upper body session. You have capacity for additional activity if desired. Zone 2 work would complement today well.',
      chartData: [8.2, 10.1, 14.3, 11.0, 12.8, 12.4, 12.4], chartColor: GLOW_STRAIN, showZones: true,
    };
    case 'hrv': return {
      title: 'Heart Rate Variability', score: today.readiness.hrv, color: GLOW_RECOVERY, unit: 'ms',
      description: 'Heart Rate Variability measures the variation in time between heartbeats. Higher values generally indicate better cardiovascular fitness and recovery.',
      metrics: [
        { label: '7-day Avg', value: '66ms' },
        { label: '14-day Avg', value: '64ms' },
        { label: 'Baseline', value: '62ms' },
        { label: 'Trend', value: '+12%' },
      ],
      interpretation: 'Well above your baseline. Your autonomic nervous system is showing strong recovery patterns.',
      chartData: weeklyHRV, chartColor: GLOW_RECOVERY, showBand: true, bandMin: 58, bandMax: 72,
    };
    case 'rhr': return {
      title: 'Resting Heart Rate', score: today.readiness.restingHR, color: GLOW_BIOLOGY, unit: 'bpm',
      description: 'Your resting heart rate reflects cardiovascular efficiency. Lower values typically indicate better fitness.',
      metrics: [
        { label: '7-day Avg', value: '53bpm' },
        { label: '14-day Avg', value: '54bpm' },
        { label: 'Baseline', value: '54bpm' },
        { label: 'Trend', value: '-2bpm' },
      ],
      interpretation: 'Below your baseline, indicating strong cardiovascular adaptation from recent training.',
      chartData: [54, 53, 52, 53, 52, 52, 52], chartColor: GLOW_BIOLOGY, showBand: true, bandMin: 50, bandMax: 56,
    };
    case 'spo2': return {
      title: 'Blood Oxygen', score: today.readiness.spo2, color: '#3498DB', unit: '%',
      description: 'SpO2 measures blood oxygen saturation. Normal range is 95-100%. Consistent readings indicate healthy respiratory function.',
      metrics: [
        { label: '7-day Avg', value: '98%' },
        { label: '14-day Avg', value: '97%' },
        { label: 'Min', value: '96%' },
        { label: 'Max', value: '99%' },
      ],
      interpretation: 'Optimal blood oxygen levels. Respiratory function is excellent.',
      chartData: [97, 98, 98, 97, 98, 98, 98], chartColor: '#3498DB', showBand: true, bandMin: 95, bandMax: 100,
    };
    case 'steps': return {
      title: 'Steps', score: today.activity.steps, color: GLOW_STRAIN, unit: '',
      description: 'Daily step count tracks overall movement and non-exercise activity thermogenesis (NEAT).',
      metrics: [
        { label: 'Calories', value: `${today.activity.calories}` },
        { label: 'Active Min', value: `${today.activity.activeMinutes}m` },
        { label: 'Stand Hrs', value: `${today.activity.standHours}` },
        { label: '7-day Avg', value: '8,280' },
      ],
      interpretation: 'On track for your daily movement goal. Consider an evening walk to close out the day.',
      chartData: [7200, 8100, 9400, 7800, 8600, 8432, 8432], chartColor: GLOW_STRAIN,
    };
    case 'temp': return {
      title: 'Body Temperature', score: 0.2, color: '#2ECC71', unit: '°F',
      description: 'Skin temperature deviation from your personal baseline. Small variations are normal; larger shifts may indicate illness or hormonal changes.',
      metrics: [
        { label: '7-day Avg', value: '+0.1°F' },
        { label: '14-day Avg', value: '+0.0°F' },
        { label: 'Baseline', value: '97.8°F' },
        { label: 'Range', value: '±0.3°F' },
      ],
      interpretation: 'Slightly above baseline but within normal range. No concern warranted.',
      chartData: [0.0, -0.1, 0.1, 0.0, 0.2, 0.1, 0.2], chartColor: '#2ECC71', showBand: true, bandMin: -0.3, bandMax: 0.3,
    };
    default: return null;
  }
}

// ── NodeDetail Bottom Sheet ──
function NodeDetail({ nodeId, onClose }) {
  const detail = getNodeDetailContent(nodeId);
  if (!detail) return null;

  const isMetricNode = ['hrv', 'rhr', 'spo2', 'steps', 'temp'].includes(nodeId);

  return (
    <div onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.55)', zIndex: 100,
      animation: 'abFadeIn 0.2s ease-out',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: BG_NODE, borderRadius: '20px 20px 0 0',
        padding: '12px 20px', paddingBottom: 'max(24px, env(safe-area-inset-bottom, 0px))',
        animation: 'abSheetUp 0.3s cubic-bezier(0.32,0.72,0,1)',
        maxHeight: '60vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>{detail.title}</div>
            <div style={{ fontSize: 12, color: detail.color, marginTop: 2 }}>
              {isMetricNode ? 'Detailed Analysis' : '7-day overview'}
            </div>
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, color: detail.color }}>
            {nodeId === 'temp' ? `+${detail.score}` : nodeId === 'steps' ? detail.score.toLocaleString() : detail.score}
            {detail.unit && <span style={{ fontSize: 14, fontWeight: 500, color: TEXT_DIM }}>{detail.unit}</span>}
          </div>
        </div>

        {/* Score Ring for recovery */}
        {detail.showRing && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <ScoreRing score={detail.score} color={detail.color} />
          </div>
        )}

        {/* Description for metric nodes */}
        {detail.description && (
          <div style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.5, marginBottom: 16, padding: '0 2px' }}>
            {detail.description}
          </div>
        )}

        {/* Sleep stages */}
        {detail.showStages && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 8 }}>
              <span style={{ color: TEXT, fontWeight: 600 }}>{detail.duration}</span> slept
            </div>
            <SleepStageBar />
          </div>
        )}

        {/* Workout card for strain */}
        {detail.workout && (
          <div style={{
            padding: '14px 16px', marginBottom: 12,
            background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: `1px solid ${BORDER}`,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{detail.workout.name}</div>
            <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 4 }}>45 min</div>
          </div>
        )}

        {/* HR zones for strain */}
        {detail.showZones && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: TEXT_DIM, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>HR Zones</div>
            <HRZoneBars />
          </div>
        )}

        {/* Trend chart */}
        <div style={{
          padding: '14px 16px', marginBottom: 16,
          background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: `1px solid ${BORDER}`,
          display: 'flex', justifyContent: 'center',
        }}>
          <LineChart data={detail.chartData} color={detail.chartColor || detail.color} width={280} height={100}
            showBand={detail.showBand} bandMin={detail.bandMin} bandMax={detail.bandMax} />
        </div>

        {/* Metrics grid */}
        {detail.metrics && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            {detail.metrics.map((m, i) => (
              <div key={i} style={{
                padding: '12px 14px', background: 'rgba(255,255,255,0.03)',
                borderRadius: 12, border: `1px solid ${BORDER}`,
              }}>
                <div style={{ fontSize: 10, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.5 }}>{m.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, marginTop: 4 }}>{m.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Interpretation for metric nodes */}
        {detail.interpretation && (
          <div style={{
            padding: '12px 16px', marginBottom: 12,
            background: `${detail.color}10`, borderRadius: 12, borderLeft: `3px solid ${detail.color}`,
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: detail.color, marginBottom: 4 }}>Status</div>
            <div style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.5 }}>{detail.interpretation}</div>
          </div>
        )}

        {/* Coaching text */}
        {detail.coaching && (
          <div style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.5, marginBottom: 16, padding: '0 2px' }}>
            {detail.coaching}
          </div>
        )}

        {/* Close */}
        <button onClick={onClose} style={{
          width: '100%', padding: '12px 0', background: 'rgba(255,255,255,0.05)',
          border: `1px solid ${BORDER}`, borderRadius: 12,
          color: TEXT_DIM, fontSize: 14, fontWeight: 500, cursor: 'pointer',
        }}>Close</button>
      </div>
    </div>
  );
}

// ── Bezier helper ──
function bezierPath(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = Math.abs(x2 - x1) * 0.3;
  const dy = Math.abs(y2 - y1) * 0.3;
  const cpx1 = x1 + (x2 > x1 ? dx : -dx);
  const cpy1 = y1 + (y2 > y1 ? dy : -dy);
  const cpx2 = x2 - (x2 > x1 ? dx : -dx);
  const cpy2 = y2 - (y2 > y1 ? dy : -dy);
  return `M${x1},${y1} C${cpx1},${cpy1} ${cpx2},${cpy2} ${x2},${y2}`;
}

// ── NodeGraph SVG component ──
function NodeGraph({ selectedNode, onNodeTap }) {
  return (
    <svg width={CANVAS_W} height={CANVAS_H} viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`} style={{ maxWidth: '100%', overflow: 'visible' }}>
      {/* Connections */}
      {CONNECTIONS.map((conn, i) => {
        const from = getNode(conn.from);
        const to = getNode(conn.to);
        const isActive = selectedNode === conn.from || selectedNode === conn.to;
        return (
          <path key={`c-${i}`} d={bezierPath(from.x, from.y, to.x, to.y)}
            fill="none" stroke={isActive ? CONN_LINE_ACTIVE : CONN_LINE}
            strokeWidth={isActive ? 1.5 : 1} strokeLinecap="round"
            style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }} />
        );
      })}

      {/* Ring 2 nodes */}
      {RING2_NODES.map((node, idx) => {
        const isSel = selectedNode === node.id;
        return (
          <g key={node.id} onClick={() => onNodeTap(node.id)} style={{ cursor: 'pointer' }}>
            {/* Pulse glow */}
            <circle cx={node.x} cy={node.y} r={node.r + 8} fill="none" stroke={node.color} strokeWidth="1"
              className="ab-pulse-r2" style={{ animationDelay: `${idx * 0.8}s` }} />
            {/* Main circle */}
            <circle cx={node.x} cy={node.y} r={node.r} fill={BG_NODE} stroke={node.color} strokeWidth="1.5"
              style={{ transform: isSel ? 'scale(1.1)' : 'scale(1)', transformOrigin: `${node.x}px ${node.y}px`, transition: 'transform 0.2s' }} />
            {/* Score */}
            <text x={node.x} y={node.y - 2} textAnchor="middle" fill={TEXT} fontSize="13" fontWeight="700" fontFamily="inherit">
              {node.value}
            </text>
            {/* Label */}
            <text x={node.x} y={node.y + 12} textAnchor="middle" fill={TEXT_DIM} fontSize="9" fontFamily="inherit">
              {node.label}
            </text>
            {/* Status dot */}
            <circle cx={node.x + node.r * 0.6} cy={node.y - node.r * 0.6} r="4" fill={getStatus(node.id)} />
          </g>
        );
      })}

      {/* Ring 1 nodes */}
      {RING1_NODES.map((node, idx) => {
        const isSel = selectedNode === node.id;
        return (
          <g key={node.id} onClick={() => onNodeTap(node.id)} style={{ cursor: 'pointer' }}>
            <circle cx={node.x} cy={node.y} r={node.r + 8} fill="none" stroke={node.color} strokeWidth="1"
              className="ab-pulse-r1" style={{ animationDelay: `${idx * 1.2}s` }} />
            <circle cx={node.x} cy={node.y} r={node.r} fill={BG_NODE} stroke={node.color} strokeWidth="1.5"
              style={{ transform: isSel ? 'scale(1.1)' : 'scale(1)', transformOrigin: `${node.x}px ${node.y}px`, transition: 'transform 0.2s' }} />
            <text x={node.x} y={node.y - 2} textAnchor="middle" fill={TEXT} fontSize="16" fontWeight="700" fontFamily="inherit">
              {node.value}
            </text>
            <text x={node.x} y={node.y + 14} textAnchor="middle" fill={TEXT_DIM} fontSize="9" fontFamily="inherit">
              {node.label}
            </text>
            <circle cx={node.x + node.r * 0.55} cy={node.y - node.r * 0.55} r="5" fill={getStatus(node.id)} />
          </g>
        );
      })}

      {/* Center node */}
      {(() => {
        const n = CENTER_NODE;
        const isSel = selectedNode === n.id;
        return (
          <g onClick={() => onNodeTap(n.id)} style={{ cursor: 'pointer' }}>
            <circle cx={n.x} cy={n.y} r={n.r + 8} fill="none" stroke={n.color} strokeWidth="1.5"
              className="ab-pulse-center" />
            <circle cx={n.x} cy={n.y} r={n.r} fill={BG_NODE} stroke={n.color} strokeWidth="2"
              style={{ transform: isSel ? 'scale(1.1)' : 'scale(1)', transformOrigin: `${n.x}px ${n.y}px`, transition: 'transform 0.2s' }} />
            <text x={n.x} y={n.y - 6} textAnchor="middle" fill={GLOW_NEUTRAL} fontSize="24" fontWeight="800" fontFamily="inherit">
              {n.value}
            </text>
            <text x={n.x} y={n.y + 14} textAnchor="middle" fill={TEXT_DIM} fontSize="10" fontFamily="inherit">
              {n.label}
            </text>
            <circle cx={n.x + n.r * 0.55} cy={n.y - n.r * 0.55} r="5" fill="#2ECC71" />
          </g>
        );
      })()}
    </svg>
  );
}

// ── Aurora Background ──
function AuroraBackground() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <defs>
        <radialGradient id="aurora1" cx="30%" cy="40%">
          <stop offset="0%" stopColor={GLOW_RECOVERY} stopOpacity="0.06" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="aurora2" cx="70%" cy="60%">
          <stop offset="0%" stopColor={GLOW_SLEEP} stopOpacity="0.05" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <ellipse cx="30%" cy="40%" rx="200" ry="160" fill="url(#aurora1)" className="ab-aurora-float" />
      <ellipse cx="70%" cy="60%" rx="180" ry="140" fill="url(#aurora2)" className="ab-aurora-float-rev" />
    </svg>
  );
}

// ── EcosystemView ──
function EcosystemView({ selectedNode, onNodeTap }) {
  const pills = ['Recovery', 'Sleep', 'Strain', 'Biology'];
  const pillColors = [GLOW_RECOVERY, GLOW_SLEEP, GLOW_STRAIN, GLOW_BIOLOGY];
  return (
    <div>
      {/* Date + avatar header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px 4px', opacity: 0.7 }}>
        <div style={{ fontSize: 13, color: TEXT_DIM }}>{today.date}</div>
        <div style={{
          width: 32, height: 32, borderRadius: 16, background: 'rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 600, color: TEXT_DIM,
        }}>{user.initials}</div>
      </div>

      {/* Node graph */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 0 8px', position: 'relative' }}>
        <NodeGraph selectedNode={selectedNode} onNodeTap={onNodeTap} />
      </div>

      {/* Domain pills */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '0 16px 12px' }}>
        {pills.map((p, i) => (
          <div key={p} style={{
            padding: '6px 14px', borderRadius: 20,
            background: `${pillColors[i]}12`, border: `1px solid ${pillColors[i]}30`,
            fontSize: 11, color: pillColors[i], fontWeight: 500,
          }}>{p}</div>
        ))}
      </div>

      {/* Last updated */}
      <div style={{ textAlign: 'center', padding: '4px 0 16px' }}>
        <div style={{ fontSize: 11, color: TEXT_DIM }}>Last synced 12 min ago</div>
      </div>
    </div>
  );
}

// ── TimelineView ──
function TimelineView({ onNodeTap }) {
  const timelineNodes = [
    { id: 'sleep', label: 'Sleep', value: '87%', time: '2:45 AM', x: 80, color: GLOW_SLEEP, desc: 'Mid-sleep' },
    { id: 'hrv', label: 'HRV', value: '68ms', time: '6:30 AM', x: 180, color: GLOW_RECOVERY, desc: 'Morning reading' },
    { id: 'rhr', label: 'RHR', value: '52bpm', time: '6:30 AM', x: 250, color: GLOW_BIOLOGY, desc: 'Waking HR' },
    { id: 'strain', label: 'Workout', value: '12.4', time: '9:00 AM', x: 350, color: GLOW_STRAIN, desc: 'Upper Body' },
    { id: 'steps', label: 'Steps', value: '8.4k', time: '2:00 PM', x: 460, color: GLOW_STRAIN, desc: 'Afternoon' },
    { id: 'spo2', label: 'SpO2', value: '98%', time: '3:30 PM', x: 540, color: '#3498DB', desc: 'Spot check' },
    { id: 'temp', label: 'Temp', value: '+0.2°F', time: '9:00 PM', x: 620, color: '#2ECC71', desc: 'Evening' },
  ];

  const hours = ['12a', '3a', '6a', '9a', '12p', '3p', '6p', '9p'];

  return (
    <div>
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>Timeline</div>
        <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 2 }}>{today.date}</div>
      </div>

      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', padding: '0 0 16px' }}>
        <svg width={700} height={280} viewBox="0 0 700 280" style={{ display: 'block' }}>
          {/* Time axis */}
          <line x1="30" y1="220" x2="680" y2="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          {hours.map((h, i) => (
            <g key={h}>
              <line x1={30 + i * 93} y1="215" x2={30 + i * 93} y2="225" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x={30 + i * 93} y="242" textAnchor="middle" fill={TEXT_DIM} fontSize="10" fontFamily="inherit">{h}</text>
            </g>
          ))}

          {/* Connection lines */}
          {timelineNodes.slice(0, -1).map((node, i) => {
            const next = timelineNodes[i + 1];
            return (
              <line key={`tc-${i}`} x1={node.x} y1="140" x2={next.x} y2="140"
                stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4,4" />
            );
          })}

          {/* Nodes */}
          {timelineNodes.map((node, i) => {
            const yBase = 140;
            const yOffset = i % 2 === 0 ? -20 : 20;
            const ny = yBase + yOffset;
            return (
              <g key={node.id + '-tl'} onClick={() => onNodeTap(node.id)} style={{ cursor: 'pointer' }}>
                {/* Drop line to axis */}
                <line x1={node.x} y1={ny + 24} x2={node.x} y2="220" stroke={node.color} strokeWidth="0.5" strokeOpacity="0.3" />
                {/* Glow */}
                <circle cx={node.x} cy={ny} r="32" fill="none" stroke={node.color} strokeWidth="1" className="ab-pulse-r2" style={{ animationDelay: `${i * 0.5}s` }} />
                {/* Node */}
                <circle cx={node.x} cy={ny} r="24" fill={BG_NODE} stroke={node.color} strokeWidth="1.5" />
                <text x={node.x} y={ny - 2} textAnchor="middle" fill={TEXT} fontSize="11" fontWeight="700" fontFamily="inherit">{node.value}</text>
                <text x={node.x} y={ny + 11} textAnchor="middle" fill={TEXT_DIM} fontSize="8" fontFamily="inherit">{node.label}</text>
                {/* Time label */}
                <text x={node.x} y={ny - 32} textAnchor="middle" fill={node.color} fontSize="9" fontWeight="500" fontFamily="inherit">{node.time}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Summary cards */}
      <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { title: 'Morning Window', time: '6:00 AM - 9:00 AM', desc: 'HRV check, morning routine, upper body workout', color: GLOW_RECOVERY },
          { title: 'Active Day', time: '9:00 AM - 6:00 PM', desc: '8,432 steps, 487 calories burned, 34 active minutes', color: GLOW_STRAIN },
          { title: 'Evening Recovery', time: '6:00 PM - 11:00 PM', desc: 'Temperature slightly elevated, preparing for sleep', color: GLOW_SLEEP },
        ].map((card, i) => (
          <div key={i} style={{
            padding: '14px 16px', background: 'rgba(255,255,255,0.03)',
            borderRadius: 14, border: `1px solid ${BORDER}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{card.title}</div>
              <div style={{ fontSize: 11, color: card.color }}>{card.time}</div>
            </div>
            <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 6 }}>{card.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── BiologyView ──
function BiologyView({ onNodeTap }) {
  const systems = [
    {
      name: 'Brain / Mind', y: 60, color: GLOW_SLEEP,
      icon: 'M12 2a7 7 0 0 0-7 7c0 3.5 2.5 6.5 7 11 4.5-4.5 7-7.5 7-11a7 7 0 0 0-7-7z',
      metrics: [
        { id: 'hrv', label: 'HRV', value: '68ms', color: GLOW_RECOVERY },
        { id: 'sleep', label: 'Sleep', value: '87%', color: GLOW_SLEEP },
      ],
    },
    {
      name: 'Heart', y: 170, color: GLOW_BIOLOGY,
      icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z',
      metrics: [
        { id: 'rhr', label: 'RHR', value: '52bpm', color: GLOW_BIOLOGY },
        { id: 'recovery', label: 'Recovery', value: '84%', color: GLOW_RECOVERY },
      ],
    },
    {
      name: 'Lungs', y: 280, color: '#3498DB',
      icon: 'M12 22c4-4 8-7 8-12a8 8 0 0 0-16 0c0 5 4 8 8 12z',
      metrics: [
        { id: 'spo2', label: 'SpO2', value: '98%', color: '#3498DB' },
      ],
    },
    {
      name: 'Muscle', y: 390, color: GLOW_STRAIN,
      icon: 'M18 8h1a4 4 0 0 1 0 8h-1M6 8H5a4 4 0 0 0 0 8h1M6 12h12',
      metrics: [
        { id: 'strain', label: 'Strain', value: '12.4', color: GLOW_STRAIN },
        { id: 'steps', label: 'Steps', value: '8.4k', color: GLOW_STRAIN },
      ],
    },
    {
      name: 'Core / Temp', y: 490, color: '#2ECC71',
      icon: 'M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z',
      metrics: [
        { id: 'temp', label: 'Temp', value: '+0.2°F', color: '#2ECC71' },
      ],
    },
  ];

  const [expanded, setExpanded] = useState(null);

  return (
    <div>
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>Biology</div>
        <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 2 }}>Anatomical systems overview</div>
      </div>

      {/* Body outline SVG with system nodes */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
        <svg width={300} height={560} viewBox="0 0 300 560">
          {/* Abstract body line */}
          <path d="M150 40 L150 520" stroke="rgba(255,255,255,0.04)" strokeWidth="2" strokeDasharray="6,6" />

          {/* Body region ellipses */}
          {systems.map((sys, si) => (
            <g key={sys.name}>
              {/* Region ellipse */}
              <ellipse cx="150" cy={sys.y} rx="60" ry="35" fill={`${sys.color}08`} stroke={`${sys.color}20`} strokeWidth="1" />

              {/* Central system node */}
              <g onClick={() => setExpanded(expanded === si ? null : si)} style={{ cursor: 'pointer' }}>
                <circle cx="150" cy={sys.y} r="28" fill={BG_NODE} stroke={sys.color} strokeWidth="1.5"
                  className="ab-pulse-r1" style={{ animationDelay: `${si * 0.7}s` }} />
                <svg x="138" y={sys.y - 12} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={sys.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={sys.icon} />
                </svg>
              </g>
              <text x="150" y={sys.y + 45} textAnchor="middle" fill={TEXT_DIM} fontSize="10" fontFamily="inherit">{sys.name}</text>

              {/* Satellite metric nodes */}
              {(expanded === si) && sys.metrics.map((m, mi) => {
                const angle = mi === 0 ? -0.6 : 0.6;
                const mx = 150 + Math.cos(angle) * 90;
                const my = sys.y + Math.sin(angle) * 30;
                return (
                  <g key={m.id} onClick={() => onNodeTap(m.id)} style={{ cursor: 'pointer' }}>
                    <line x1="150" y1={sys.y} x2={mx} y2={my} stroke={m.color} strokeWidth="0.5" strokeOpacity="0.3" />
                    <circle cx={mx} cy={my} r="22" fill={BG_NODE} stroke={m.color} strokeWidth="1"
                      style={{ animation: 'abFadeIn 0.3s ease-out' }} />
                    <text x={mx} y={my - 3} textAnchor="middle" fill={TEXT} fontSize="10" fontWeight="600" fontFamily="inherit">{m.value}</text>
                    <text x={mx} y={my + 10} textAnchor="middle" fill={TEXT_DIM} fontSize="8" fontFamily="inherit">{m.label}</text>
                  </g>
                );
              })}
            </g>
          ))}
        </svg>
      </div>

      {/* System summary cards */}
      <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {systems.map((sys, i) => (
          <div key={i} onClick={() => setExpanded(expanded === i ? null : i)} style={{
            padding: '12px 16px', background: 'rgba(255,255,255,0.03)',
            borderRadius: 12, border: `1px solid ${BORDER}`, cursor: 'pointer',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: sys.color }} />
              <div style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{sys.name}</div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {sys.metrics.map((m, j) => (
                <div key={j} style={{ fontSize: 12, color: m.color, fontWeight: 500 }}>{m.value}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── JournalView ──
function JournalView() {
  const [mood, setMood] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ripple, setRipple] = useState(false);

  const moodColors = ['#E74C3C', '#F0943A', '#F1C40F', '#2ECC71', GLOW_RECOVERY];
  const moodLabels = ['Low', 'Meh', 'Okay', 'Good', 'Great'];
  const energyColors = ['#5A6A7A', '#3498DB', GLOW_RECOVERY, '#2ECC71', GLOW_NEUTRAL];

  const pastEntries = [
    { date: 'Yesterday', mood: 3, text: 'Good energy after morning workout. Felt focused in afternoon meetings.' },
    { date: '2 days ago', mood: 4, text: 'Excellent recovery day. Deep sleep was the best this week.' },
    { date: '3 days ago', mood: 2, text: 'Restless night affected morning. Recovered by afternoon.' },
  ];

  const handleSubmit = () => {
    if (mood === null && energy === null && !note) return;
    setRipple(true);
    setTimeout(() => {
      setRipple(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div>
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>Journal</div>
        <div style={{ fontSize: 12, color: TEXT_DIM, marginTop: 2 }}>Reflect on your day</div>
      </div>

      {/* Central journal node */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          {ripple && (
            <circle cx="60" cy="60" r="55" fill="none" stroke={GLOW_NEUTRAL} strokeWidth="2" className="ab-ripple" />
          )}
          <circle cx="60" cy="60" r="46" fill={BG_NODE} stroke={GLOW_NEUTRAL} strokeWidth="2" className="ab-pulse-center" />
          <svg x="40" y="38" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={GLOW_NEUTRAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
          </svg>
        </svg>
      </div>

      {!submitted ? (
        <div style={{ padding: '0 20px 20px' }}>
          {/* Mood */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: TEXT_DIM, fontWeight: 500, marginBottom: 10 }}>How are you feeling?</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              {moodColors.map((c, i) => (
                <button key={i} onClick={() => setMood(i)} style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  padding: '10px 4px', borderRadius: 12, cursor: 'pointer',
                  background: mood === i ? `${c}20` : 'rgba(255,255,255,0.03)',
                  border: mood === i ? `2px solid ${c}` : `1px solid ${BORDER}`,
                  transition: 'all 0.2s',
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: 12, background: c,
                    transform: mood === i ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.2s',
                  }} />
                  <span style={{ fontSize: 10, color: mood === i ? c : TEXT_DIM }}>{moodLabels[i]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Energy */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: TEXT_DIM, fontWeight: 500, marginBottom: 10 }}>Energy level</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              {energyColors.map((c, i) => (
                <button key={i} onClick={() => setEnergy(i)} style={{
                  flex: 1, height: 36, borderRadius: 10, cursor: 'pointer',
                  background: energy === i ? `${c}30` : 'rgba(255,255,255,0.03)',
                  border: energy === i ? `2px solid ${c}` : `1px solid ${BORDER}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {Array.from({ length: i + 1 }, (_, j) => (
                      <div key={j} style={{ width: 4, height: 8 + j * 3, borderRadius: 2, background: energy === i ? c : TEXT_DIM }} />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: TEXT_DIM, fontWeight: 500, marginBottom: 10 }}>Notes</div>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="What's on your mind?"
              style={{
                width: '100%', minHeight: 100, padding: '12px 14px',
                background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`,
                borderRadius: 12, color: TEXT, fontSize: 14, fontFamily: 'inherit',
                resize: 'vertical', outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} style={{
            width: '100%', padding: '14px 0', borderRadius: 14,
            background: `linear-gradient(135deg, ${GLOW_NEUTRAL}, ${GLOW_RECOVERY})`,
            border: 'none', color: '#080D12', fontSize: 15, fontWeight: 700,
            cursor: 'pointer',
          }}>Save Entry</button>
        </div>
      ) : (
        <div style={{ padding: '0 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: GLOW_NEUTRAL, marginBottom: 8 }}>Entry saved</div>
          <div style={{ fontSize: 13, color: TEXT_DIM }}>Your reflection has been recorded.</div>
          <button onClick={() => { setSubmitted(false); setMood(null); setEnergy(null); setNote(''); }} style={{
            marginTop: 16, padding: '10px 24px', borderRadius: 12,
            background: 'rgba(255,255,255,0.05)', border: `1px solid ${BORDER}`,
            color: TEXT_DIM, fontSize: 13, cursor: 'pointer',
          }}>New Entry</button>
        </div>
      )}

      {/* Past entries */}
      <div style={{ padding: '20px 20px 16px' }}>
        <div style={{ fontSize: 13, color: TEXT_DIM, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Recent</div>
        {pastEntries.map((entry, i) => (
          <div key={i} style={{
            padding: '12px 16px', marginBottom: 8,
            background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: `1px solid ${BORDER}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ fontSize: 12, color: TEXT_DIM }}>{entry.date}</div>
              <div style={{ width: 12, height: 12, borderRadius: 6, background: moodColors[entry.mood] }} />
            </div>
            <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.5 }}>{entry.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ProfileView ──
function ProfileView({ onExit }) {
  const [expandedItem, setExpandedItem] = useState(null);

  const profileNodes = [
    {
      id: 'goals', label: 'Goals', color: GLOW_RECOVERY,
      icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'Recovery', target: '80+', current: `${today.readiness.score}`, color: GLOW_RECOVERY },
            { label: 'Sleep', target: '8h', current: today.sleep.total, color: GLOW_SLEEP },
            { label: 'Strain Range', target: '10-14', current: `${today.strain}`, color: GLOW_STRAIN },
          ].map((g, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: `1px solid ${BORDER}`,
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{g.label}</div>
                <div style={{ fontSize: 11, color: TEXT_DIM }}>Target: {g.target}</div>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: g.color }}>{g.current}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'preferences', label: 'Preferences', color: GLOW_SLEEP,
      icon: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {['Dark mode', 'Node animations', 'Daily reminders', 'Haptic feedback'].map((p, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: `1px solid ${BORDER}`,
            }}>
              <div style={{ fontSize: 13, color: TEXT }}>{p}</div>
              <div style={{
                width: 36, height: 20, borderRadius: 10,
                background: i < 3 ? GLOW_RECOVERY : 'rgba(255,255,255,0.1)',
                position: 'relative',
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: 8, background: TEXT,
                  position: 'absolute', top: 2, left: i < 3 ? 18 : 2,
                  transition: 'left 0.2s',
                }} />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'notifications', label: 'Notifications', color: GLOW_STRAIN,
      icon: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0',
      content: (
        <div style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.6 }}>
          Morning summary: 7:00 AM<br />
          Workout reminder: 8:30 AM<br />
          Sleep reminder: 10:00 PM<br />
          Weekly report: Sunday 9:00 AM
        </div>
      ),
    },
    {
      id: 'data', label: 'Data', color: '#3498DB',
      icon: 'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z',
      content: (
        <div style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.6 }}>
          Connected devices: Apple Watch, Oura Ring<br />
          Data points today: 2,847<br />
          Sync status: Active<br />
          Last export: March 15
        </div>
      ),
    },
    {
      id: 'about', label: 'About', color: '#2ECC71',
      icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 16v-4M12 8h.01',
      content: (
        <div style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.6 }}>
          Aura Bloom v2.0<br />
          Your health as a living ecosystem.<br />
          Each metric is a node. The space between them has energy.
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>Profile</div>
      </div>

      {/* Central avatar node */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="56" fill={BG_NODE} stroke={GLOW_NEUTRAL} strokeWidth="2" className="ab-pulse-center" />
          <text x="80" y="76" textAnchor="middle" fill={GLOW_NEUTRAL} fontSize="28" fontWeight="800" fontFamily="inherit">{user.initials}</text>
          <text x="80" y="96" textAnchor="middle" fill={TEXT_DIM} fontSize="11" fontFamily="inherit">{user.name}</text>

          {/* Surrounding small nodes */}
          {profileNodes.map((pn, i) => {
            const angle = (i / profileNodes.length) * Math.PI * 2 - Math.PI / 2;
            const nx = 80 + Math.cos(angle) * 68;
            const ny = 80 + Math.sin(angle) * 68;
            return (
              <g key={pn.id}>
                <line x1="80" y1="80" x2={nx} y2={ny} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <circle cx={nx} cy={ny} r="8" fill={BG_NODE} stroke={pn.color} strokeWidth="1" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Expandable items */}
      <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {profileNodes.map(pn => (
          <div key={pn.id}>
            <div onClick={() => setExpandedItem(expandedItem === pn.id ? null : pn.id)} style={{
              padding: '14px 16px', background: 'rgba(255,255,255,0.03)',
              borderRadius: expandedItem === pn.id ? '12px 12px 0 0' : 12,
              border: `1px solid ${BORDER}`, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={pn.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={pn.icon} />
              </svg>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: TEXT }}>{pn.label}</div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEXT_DIM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: expandedItem === pn.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
            {expandedItem === pn.id && (
              <div style={{
                padding: '14px 16px', background: 'rgba(255,255,255,0.02)',
                borderRadius: '0 0 12px 12px', border: `1px solid ${BORDER}`, borderTop: 'none',
              }}>
                {pn.content}
              </div>
            )}
          </div>
        ))}

        {/* Exit button */}
        <button onClick={onExit} style={{
          width: '100%', padding: '14px 0', marginTop: 12,
          borderRadius: 14, background: 'rgba(255,255,255,0.05)',
          border: `1px solid ${BORDER}`, color: TEXT_DIM,
          fontSize: 14, fontWeight: 500, cursor: 'pointer',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Exit Aura Bloom
          </div>
        </button>
      </div>
    </div>
  );
}

// ── Tab definitions ──
const TABS = [
  { id: 'ecosystem', label: 'Ecosystem', path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { id: 'timeline', label: 'Timeline', path: 'M3 17l6-6 4 4 8-8M14 7h7v7' },
  { id: 'biology', label: 'Biology', path: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z' },
  { id: 'journal', label: 'Journal', path: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8' },
  { id: 'profile', label: 'Profile', path: 'M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M12 14H8a4 4 0 0 0-4 4v2M10 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
];

// ── Main Shell ──
export default function AuraBloomDirection({ onExit }) {
  const [activeTab, setActiveTab] = useState('ecosystem');
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeTap = (nodeId) => setSelectedNode(nodeId);
  const closeSheet = () => setSelectedNode(null);

  const renderView = () => {
    switch (activeTab) {
      case 'ecosystem': return <EcosystemView selectedNode={selectedNode} onNodeTap={handleNodeTap} />;
      case 'timeline': return <TimelineView onNodeTap={handleNodeTap} />;
      case 'biology': return <BiologyView onNodeTap={handleNodeTap} />;
      case 'journal': return <JournalView />;
      case 'profile': return <ProfileView onExit={onExit} />;
      default: return null;
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 390, background: BG, display: 'flex', flexDirection: 'column',
      paddingTop: 'env(safe-area-inset-top, 0px)', overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
      color: TEXT,
    }}>
      {/* CSS Keyframes */}
      <style>{`
        @keyframes abNodePulseCenter {
          0%, 100% { opacity: 0.3; r: inherit; }
          50% { opacity: 0.6; }
        }
        @keyframes abNodePulseR1 {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes abNodePulseR2 {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .ab-pulse-center {
          animation: abNodePulseCenter 3s ease-in-out infinite;
        }
        .ab-pulse-r1 {
          animation: abNodePulseR1 4s ease-in-out infinite;
        }
        .ab-pulse-r2 {
          animation: abNodePulseR2 5s ease-in-out infinite;
        }
        @keyframes abSheetUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes abFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes abAuroraFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-15px) scale(1.05); opacity: 0.8; }
        }
        .ab-aurora-float {
          animation: abAuroraFloat 12s ease-in-out infinite;
        }
        .ab-aurora-float-rev {
          animation: abAuroraFloat 15s ease-in-out infinite reverse;
        }
        @keyframes abRipple {
          0% { r: 46; opacity: 0.8; }
          100% { r: 58; opacity: 0; }
        }
        .ab-ripple {
          animation: abRipple 0.6s ease-out forwards;
        }
      `}</style>

      {/* Aurora background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <AuroraBackground />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch', position: 'relative', zIndex: 1 }}>
        {renderView()}
        {/* Tab bar spacer */}
        <div style={{ height: 72, paddingBottom: 'env(safe-area-inset-bottom, 0px)' }} />
      </div>

      {/* Tab bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: `${BG}F2`, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${BORDER}`,
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        paddingTop: 6, paddingBottom: 'max(8px, env(safe-area-inset-bottom, 0px))',
      }}>
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSelectedNode(null); }} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              padding: '4px 8px', color: isActive ? GLOW_NEUTRAL : TEXT_DIM,
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

      {/* NodeDetail bottom sheet */}
      {selectedNode && <NodeDetail nodeId={selectedNode} onClose={closeSheet} />}
    </div>
  );
}

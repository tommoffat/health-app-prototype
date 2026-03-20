import React, { useState, useMemo } from 'react';
import { user, today, weeklyHRV, weeklySleep } from '../../data/fake.js';

/* ─── palette ─── */
const BG_DEEP = '#0D1117';
const BG_MID = '#111827';
const GOLD = '#C9A96E';
const GOLD_LT = '#E8D5A8';
const AURORA_TEAL = '#4ECDC4';
const AURORA_PURPLE = '#9B59B6';
const AURORA_GREEN = '#2ECC71';
const TEXT = '#F0F0F0';
const TEXT_DIM = '#8B949E';
const BORDER = 'rgba(255,255,255,0.08)';

/* ─── domain configs ─── */
const DOMAINS = {
  recovery: {
    label: 'Recovery',
    score: today.readiness.score,
    gradient: `linear-gradient(135deg, ${AURORA_TEAL}22 0%, ${AURORA_GREEN}18 40%, ${BG_DEEP} 100%)`,
    auroraColors: [AURORA_TEAL, AURORA_GREEN, '#1ABC9C'],
    accentColor: AURORA_TEAL,
    stats: [
      { label: 'HRV', value: `${today.readiness.hrv} ms` },
      { label: 'Resting HR', value: `${today.readiness.restingHR} bpm` },
      { label: 'SpO2', value: `${today.readiness.spo2}%` },
    ],
    metrics: [
      { label: 'HRV', value: `${today.readiness.hrv} ms`, sub: '7-day avg: 66 ms' },
      { label: 'Resting HR', value: `${today.readiness.restingHR} bpm`, sub: 'Optimal range' },
      { label: 'SpO2', value: `${today.readiness.spo2}%`, sub: 'Normal' },
      { label: 'Body Temp', value: today.readiness.bodyTemp || '+0.2\u00b0F', sub: 'Within baseline' },
    ],
    coaching: 'Your recovery is excellent today. HRV has been trending upward all week \u2014 your nervous system is well-adapted. Consider a higher-intensity session today.',
    sparkData: weeklyHRV,
  },
  sleep: {
    label: 'Sleep',
    score: today.sleep.score,
    gradient: `linear-gradient(135deg, ${AURORA_PURPLE}22 0%, #6C3483aa 30%, ${BG_DEEP} 100%)`,
    auroraColors: [AURORA_PURPLE, '#8E44AD', '#6C3483'],
    accentColor: AURORA_PURPLE,
    stats: [
      { label: 'Total Sleep', value: today.sleep.total },
      { label: 'Deep', value: today.sleep.deep },
      { label: 'Efficiency', value: `${today.sleep.efficiency}%` },
    ],
    metrics: [
      { label: 'Total', value: today.sleep.total, sub: 'Target: 7h 30m' },
      { label: 'Deep Sleep', value: today.sleep.deep, sub: '23% of total' },
      { label: 'REM Sleep', value: today.sleep.rem, sub: '27% of total' },
      { label: 'Efficiency', value: `${today.sleep.efficiency}%`, sub: 'Excellent' },
    ],
    coaching: 'Sleep architecture looks great. Deep sleep exceeded your target by 14 minutes. Keep your wind-down routine consistent for continued gains.',
    sparkData: weeklySleep,
  },
  strain: {
    label: 'Strain',
    score: today.strain,
    gradient: `linear-gradient(135deg, #E67E2222 0%, #F39C1218 40%, ${BG_DEEP} 100%)`,
    auroraColors: ['#E67E22', '#F39C12', '#D35400'],
    accentColor: '#E67E22',
    stats: [
      { label: 'Steps', value: today.activity.steps.toLocaleString() },
      { label: 'Calories', value: `${today.activity.calories} kcal` },
      { label: 'Weight', value: `${today.weight} lbs` },
    ],
    metrics: [
      { label: 'Strain', value: `${today.strain}`, sub: 'Moderate load' },
      { label: 'Steps', value: today.activity.steps.toLocaleString(), sub: 'Goal: 10,000' },
      { label: 'Calories', value: `${today.activity.calories} kcal`, sub: 'Active burn' },
      { label: 'Weight', value: `${today.weight} lbs`, sub: 'Trend: -0.8 lbs/wk' },
    ],
    coaching: 'Strain is moderate. With your high recovery score, you have headroom for a challenging workout. Zone 2 training load is on target this week.',
    sparkData: [8.2, 10.1, 14.3, 9.8, 11.6, 12.4, 12.4],
  },
};

/* ─── mini sparkline SVG ─── */
function Sparkline({ data, color, width = 120, height = 40 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  });
  const polyline = pts.join(' ');
  const gradId = `sg_${color.replace('#', '')}`;
  const areaPath = `M0,${height} L${pts.map(p => p).join(' L')} L${width},${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* dot on last point */}
      {(() => {
        const last = pts[pts.length - 1].split(',');
        return <circle cx={last[0]} cy={last[1]} r="3" fill={color} />;
      })()}
    </svg>
  );
}

/* ─── tab bar icons (SVG paths, 24x24 viewBox) ─── */
const TAB_ICONS = {
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  sleep: 'M12.1 22c-4.9 0-9.1-3.5-9.9-8.3-.2-.9.6-1.7 1.5-1.4C5 12.7 6.4 13 7.9 13c4.4 0 8-3.6 8-8 0-1-.2-2-.5-2.9-.3-.9.5-1.7 1.4-1.5C21.5 2 25 6.8 25 12.1 25 17.6 19.1 22 12.1 22z',
  activity: 'M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z',
  stats: 'M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z',
  profile: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
};

/* ─── main component ─── */
export default function AuraRitualDirection({ onExit }) {
  const [activeDomain, setActiveDomain] = useState('recovery');
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const domain = DOMAINS[activeDomain];

  /* ─── non-primary tab stubs ─── */
  if (activeTab !== 'home') {
    const tabLabel = { sleep: 'Sleep', activity: 'Activity', stats: 'Stats', profile: 'Profile' }[activeTab] || activeTab;
    return (
      <div style={{
        height: '100dvh', overflowY: 'auto', WebkitOverflowScrolling: 'touch',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        background: BG_DEEP, color: TEXT, display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: TEXT }}>{tabLabel}</div>
          <div style={{ fontSize: 14, color: TEXT_DIM, marginBottom: 24, textAlign: 'center' }}>This section is coming soon.</div>
          <button
            onClick={() => setActiveTab('home')}
            style={{
              background: 'rgba(255,255,255,0.06)', border: `1px solid ${BORDER}`,
              borderRadius: 10, padding: '10px 28px', color: TEXT, fontSize: 14,
              cursor: 'pointer', fontWeight: 500,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEXT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: 6 }}>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
        {renderTabBar()}
      </div>
    );
  }

  /* ─── tab bar renderer ─── */
  function renderTabBar() {
    const tabs = ['home', 'sleep', 'activity', 'stats', 'profile'];
    return (
      <div style={{
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '8px 0', paddingBottom: 'max(8px, env(safe-area-inset-bottom, 0px))',
        background: BG_DEEP, borderTop: `1px solid ${BORDER}`,
        flexShrink: 0,
      }}>
        {tabs.map(t => {
          const isActive = t === activeTab;
          return (
            <button
              key={t}
              onClick={() => { setActiveTab(t); setExpanded(false); }}
              style={{
                background: 'none', border: 'none', padding: '6px 12px',
                cursor: 'pointer', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 2, opacity: isActive ? 1 : 0.4,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill={isActive ? TEXT : TEXT_DIM}>
                <path d={TAB_ICONS[t]} />
              </svg>
            </button>
          );
        })}
      </div>
    );
  }

  /* ─── domain switcher ─── */
  function renderDomainSwitcher() {
    const domains = ['recovery', 'sleep', 'strain'];
    return (
      <div style={{
        display: 'flex', gap: 6, justifyContent: 'center', padding: '16px 0 8px',
      }}>
        {domains.map(d => {
          const isActive = d === activeDomain;
          const cfg = DOMAINS[d];
          return (
            <button
              key={d}
              onClick={() => { setActiveDomain(d); setExpanded(false); }}
              style={{
                background: isActive ? `${cfg.accentColor}22` : 'rgba(255,255,255,0.04)',
                border: isActive ? `1px solid ${cfg.accentColor}66` : `1px solid ${BORDER}`,
                borderRadius: 20, padding: '8px 20px', cursor: 'pointer',
                color: isActive ? cfg.accentColor : TEXT_DIM,
                fontSize: 13, fontWeight: isActive ? 600 : 400,
                transition: 'all 0.3s ease',
              }}
            >
              {cfg.label}
            </button>
          );
        })}
      </div>
    );
  }

  /* ─── expanded detail ─── */
  function renderExpanded() {
    if (!expanded) return null;
    return (
      <div style={{
        padding: '0 24px 16px',
        animation: 'cardReveal 0.4s ease-out',
      }}>
        {/* 2x2 metric grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20,
        }}>
          {domain.metrics.map((m, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${BORDER}`,
              borderRadius: 14, padding: '14px 16px',
            }}>
              <div style={{ fontSize: 11, color: TEXT_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: TEXT, marginBottom: 4 }}>{m.value}</div>
              <div style={{ fontSize: 11, color: TEXT_DIM }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* sparkline */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${BORDER}`,
          borderRadius: 14, padding: '16px 20px', marginBottom: 16,
        }}>
          <div style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>7-Day Trend</div>
          <Sparkline data={domain.sparkData} color={domain.accentColor} width={280} height={50} />
        </div>

        {/* coaching text */}
        <div style={{
          background: `${domain.accentColor}0a`,
          border: `1px solid ${domain.accentColor}22`,
          borderRadius: 14, padding: '16px 18px',
        }}>
          <div style={{ fontSize: 11, color: domain.accentColor, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, fontWeight: 600 }}>Coaching Insight</div>
          <div style={{ fontSize: 14, color: TEXT, lineHeight: 1.55, opacity: 0.88 }}>{domain.coaching}</div>
        </div>
      </div>
    );
  }

  /* ─── main render ─── */
  return (
    <div style={{
      height: '100dvh', overflowY: 'auto', WebkitOverflowScrolling: 'touch',
      paddingTop: 'env(safe-area-inset-top, 0px)',
      background: BG_DEEP, color: TEXT, display: 'flex', flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <style>{`
        @keyframes auroraShift {
          0% { filter: hue-rotate(0deg); }
          25% { filter: hue-rotate(15deg); }
          50% { filter: hue-rotate(-10deg); }
          75% { filter: hue-rotate(8deg); }
          100% { filter: hue-rotate(0deg); }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scorePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
      `}</style>

      {/* scrollable content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* top bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 20px 4px', opacity: 0.5, flexShrink: 0,
        }}>
          <div style={{ fontSize: 13, color: TEXT_DIM, fontWeight: 500 }}>{today.date}</div>
          <div style={{
            width: 30, height: 30, borderRadius: 15, background: 'rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 600, color: TEXT_DIM, letterSpacing: 0.5,
          }}>
            {user.initials}
          </div>
        </div>

        {/* hero card */}
        <div
          onClick={() => setExpanded(!expanded)}
          style={{
            margin: '8px 16px 0',
            borderRadius: 24,
            background: domain.gradient,
            border: `1px solid ${domain.accentColor}18`,
            cursor: 'pointer',
            transition: 'all 0.4s ease',
            animation: 'auroraShift 12s ease-in-out infinite',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          {/* card inner — collapsed hero */}
          <div style={{
            padding: expanded ? '32px 24px 16px' : '48px 24px 32px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            transition: 'padding 0.3s ease',
          }}>
            {/* domain label */}
            <div style={{
              fontSize: 13, textTransform: 'uppercase', letterSpacing: 2.5,
              color: domain.accentColor, fontWeight: 600, marginBottom: 8, opacity: 0.9,
            }}>
              {domain.label}
            </div>

            {/* giant score */}
            <div style={{
              fontSize: 96, fontWeight: 200, color: TEXT, lineHeight: 1,
              marginBottom: 4, letterSpacing: -2,
              textShadow: `0 0 60px ${domain.accentColor}33`,
            }}>
              {domain.score}
            </div>

            {/* subtle score descriptor */}
            <div style={{
              fontSize: 12, color: TEXT_DIM, marginBottom: 24, letterSpacing: 1,
              textTransform: 'uppercase',
            }}>
              {domain.score >= 80 ? 'Optimal' : domain.score >= 60 ? 'Moderate' : 'Low'}
            </div>

            {/* 3 stat lines */}
            <div style={{ width: '100%', maxWidth: 260 }}>
              {domain.stats.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 0',
                  borderTop: i === 0 ? `1px solid ${BORDER}` : 'none',
                  borderBottom: `1px solid ${BORDER}`,
                }}>
                  <span style={{ fontSize: 13, color: TEXT_DIM }}>{s.label}</span>
                  <span style={{ fontSize: 14, color: TEXT, fontWeight: 500 }}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* expand hint */}
            <div style={{ marginTop: 16, opacity: 0.35 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEXT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* expanded detail */}
          {renderExpanded()}
        </div>

        {/* domain switcher */}
        {renderDomainSwitcher()}

        {/* spacer */}
        <div style={{ flex: 1 }} />
      </div>

      {/* tab bar */}
      {renderTabBar()}
    </div>
  );
}

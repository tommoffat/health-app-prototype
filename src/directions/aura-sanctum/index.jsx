import React, { useState } from 'react';
import { user, today, weeklyHRV, weeklySleep } from '../../data/fake.js';

/* ── Palette ─────────────────────────────────────────── */
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

/* ── Sparkline helper ────────────────────────────────── */
function Sparkline({ data, color = GOLD, width = 120, height = 32 }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* end dot */}
      {(() => {
        const lastX = (data.length - 1) * step;
        const lastY = height - ((data[data.length - 1] - min) / range) * (height - 4) - 2;
        return <circle cx={lastX} cy={lastY} r="3" fill={color} />;
      })()}
    </svg>
  );
}

/* ── SVG Icons (inline paths) ────────────────────────── */
function Icon({ d, size = 20, color = GOLD }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  recovery: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
  sleep: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
  strain: 'M13 2L3 14h9l-1 10 10-12h-9l1-10z',
  home: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  journal: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  activity: 'M22 12h-4l-3 9L9 3l-3 9H2',
  profile: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  back: 'M19 12H5 M12 19l-7-7 7-7',
  close: 'M18 6L6 18 M6 6l12 12',
  chevron: 'M9 18l6-6-6-6',
  exit: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9',
};

/* ── Header SVG illustration ─────────────────────────── */
function AuroraHeader() {
  return (
    <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="as-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#05080F" />
          <stop offset="40%" stopColor="#0D1117" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
        <linearGradient id="as-aurora1" x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0%" stopColor={AURORA_TEAL} stopOpacity="0" />
          <stop offset="30%" stopColor={AURORA_TEAL} stopOpacity="0.25" />
          <stop offset="50%" stopColor={AURORA_GREEN} stopOpacity="0.35" />
          <stop offset="70%" stopColor={AURORA_PURPLE} stopOpacity="0.2" />
          <stop offset="100%" stopColor={AURORA_PURPLE} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="as-aurora2" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={AURORA_PURPLE} stopOpacity="0" />
          <stop offset="40%" stopColor={AURORA_PURPLE} stopOpacity="0.18" />
          <stop offset="60%" stopColor={AURORA_TEAL} stopOpacity="0.22" />
          <stop offset="100%" stopColor={AURORA_GREEN} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="as-glow" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.06" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Sky background */}
      <rect width="400" height="200" fill="url(#as-sky)" />
      {/* Aurora bands */}
      <ellipse cx="200" cy="60" rx="260" ry="40" fill="url(#as-aurora1)" />
      <ellipse cx="160" cy="80" rx="200" ry="30" fill="url(#as-aurora2)" />
      <ellipse cx="260" cy="50" rx="140" ry="25" fill="url(#as-aurora2)" opacity="0.5" />
      {/* Warm glow */}
      <rect width="400" height="200" fill="url(#as-glow)" />
      {/* Stars */}
      {[
        [40, 22, 1.2], [90, 45, 0.8], [130, 15, 1.0], [170, 55, 0.6],
        [210, 20, 1.1], [250, 38, 0.7], [290, 12, 0.9], [320, 50, 1.0],
        [360, 28, 0.8], [55, 60, 0.5], [185, 35, 0.6], [340, 18, 1.0],
        [75, 10, 0.7], [155, 42, 0.9], [230, 8, 0.6], [305, 58, 0.5],
        [380, 40, 0.8], [20, 48, 0.6], [270, 25, 1.1], [110, 55, 0.4],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#FFF" opacity={0.4 + Math.random() * 0.4} />
      ))}
      {/* Mountain silhouette */}
      <path
        d="M0 200 L0 170 L30 155 L70 165 L100 140 L140 150 L170 125 L200 135 L230 120 L260 130 L290 115 L320 128 L350 110 L380 125 L400 118 L400 200 Z"
        fill="#080C14"
        opacity="0.9"
      />
      <path
        d="M0 200 L0 180 L50 172 L100 160 L150 168 L200 155 L250 162 L300 148 L350 155 L400 145 L400 200 Z"
        fill="#0A0E18"
        opacity="0.7"
      />
    </svg>
  );
}

/* ── Domain detail data ──────────────────────────────── */
const DOMAIN_DETAILS = {
  recovery: {
    title: 'Recovery',
    score: today.readiness.score,
    color: AURORA_GREEN,
    icon: ICONS.recovery,
    status: today.readiness.score >= 80 ? 'Optimal' : today.readiness.score >= 60 ? 'Adequate' : 'Low',
    metrics: [
      { label: 'HRV', value: `${today.readiness.hrv} ms` },
      { label: 'Resting Heart Rate', value: `${today.readiness.restingHR} bpm` },
      { label: 'SpO2', value: `${today.readiness.spo2}%` },
      { label: 'Body Temperature', value: today.readiness.bodyTemp },
    ],
    sparkData: weeklyHRV,
    sparkLabel: '7-Day HRV Trend',
    coaching: 'Your recovery is in an excellent range. Your body is well-rested and prepared for high-intensity training. Consider capitalizing on this window with a challenging session.',
  },
  sleep: {
    title: 'Sleep',
    score: today.sleep.score,
    color: AURORA_PURPLE,
    icon: ICONS.sleep,
    status: today.sleep.score >= 85 ? 'Restorative' : today.sleep.score >= 70 ? 'Fair' : 'Insufficient',
    metrics: [
      { label: 'Total Sleep', value: today.sleep.total },
      { label: 'Deep Sleep', value: today.sleep.deep },
      { label: 'REM Sleep', value: today.sleep.rem },
      { label: 'Efficiency', value: `${today.sleep.efficiency}%` },
    ],
    sparkData: weeklySleep,
    sparkLabel: '7-Day Sleep Score',
    coaching: 'Your sleep architecture shows strong deep and REM phases. Maintaining your current sleep schedule will continue to support cognitive function and physical recovery.',
  },
  strain: {
    title: 'Strain',
    score: today.strain,
    color: AURORA_TEAL,
    icon: ICONS.strain,
    status: today.strain >= 14 ? 'High' : today.strain >= 8 ? 'Moderate' : 'Light',
    metrics: [
      { label: 'Strain Score', value: today.strain.toFixed(1) },
      { label: 'Active Calories', value: `${today.activity.calories} kcal` },
      { label: 'Steps', value: today.activity.steps.toLocaleString() },
      { label: 'Recovery Score', value: `${today.readiness.score}%` },
    ],
    sparkData: weeklyHRV.map((v, i) => 10 + (i * 0.8) + (v % 5)),
    sparkLabel: '7-Day Strain Trend',
    coaching: 'Your current strain level is moderate, well within your recovery capacity. You have room for additional exertion today without risk of overtraining.',
  },
};

/* ── Vitals data ─────────────────────────────────────── */
const VITALS = [
  { label: 'HRV', value: `${today.readiness.hrv}`, unit: 'ms' },
  { label: 'RHR', value: `${today.readiness.restingHR}`, unit: 'bpm' },
  { label: 'SpO2', value: `${today.readiness.spo2}`, unit: '%' },
  { label: 'Steps', value: today.activity.steps.toLocaleString(), unit: '' },
  { label: 'Calories', value: `${today.activity.calories}`, unit: 'kcal' },
  { label: 'Weight', value: `${today.weight}`, unit: 'lbs' },
];

/* ── Tab config ──────────────────────────────────────── */
const TABS = [
  { id: 'home', label: 'Home', icon: ICONS.home },
  { id: 'journal', label: 'Journal', icon: ICONS.journal },
  { id: 'activity', label: 'Activity', icon: ICONS.activity },
  { id: 'profile', label: 'Profile', icon: ICONS.profile },
];

/* ── Stub Screen ─────────────────────────────────────── */
function StubScreen({ title, onBack }) {
  return (
    <div style={{ padding: 24, paddingTop: 16 }}>
      <button onClick={onBack} style={s.backBtn}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d={ICONS.back} />
        </svg>
        <span style={{ marginLeft: 8, color: GOLD, fontSize: 15, fontWeight: 500 }}>Back</span>
      </button>
      <div style={{ marginTop: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 600, color: TEXT, letterSpacing: 1 }}>{title}</div>
        <div style={{ marginTop: 12, color: TEXT_DIM, fontSize: 14, lineHeight: 1.6 }}>
          This section is being prepared for your arrival.
        </div>
      </div>
    </div>
  );
}

/* ── Bottom Sheet Modal ──────────────────────────────── */
function BottomSheet({ domain, onClose }) {
  if (!domain) return null;
  const d = DOMAIN_DETAILS[domain];
  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.sheet} onClick={(e) => e.stopPropagation()}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10, paddingBottom: 8 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
        </div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 20px 16px' }}>
          <div style={{ fontSize: 20, fontWeight: 600, color: TEXT, letterSpacing: 0.5 }}>{d.title} Report</div>
          <button onClick={onClose} style={s.closeBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TEXT_DIM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={ICONS.close} />
            </svg>
          </button>
        </div>
        {/* Score */}
        <div style={{ textAlign: 'center', padding: '8px 20px 20px' }}>
          <div style={{ fontSize: 52, fontWeight: 700, color: d.color, lineHeight: 1 }}>
            {typeof d.score === 'number' && d.score > 20 ? d.score : d.score.toFixed(1)}
          </div>
          <div style={{
            display: 'inline-block', marginTop: 8, padding: '4px 14px',
            borderRadius: 12, fontSize: 12, fontWeight: 600, letterSpacing: 1,
            textTransform: 'uppercase', color: d.color,
            background: `${d.color}18`,
          }}>{d.status}</div>
        </div>
        {/* Metrics */}
        <div style={{ padding: '0 20px' }}>
          {d.metrics.map((m, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '13px 0',
              borderBottom: i < d.metrics.length - 1 ? `1px solid ${BORDER}` : 'none',
            }}>
              <span style={{ color: TEXT_DIM, fontSize: 14 }}>{m.label}</span>
              <span style={{ color: TEXT, fontSize: 15, fontWeight: 500 }}>{m.value}</span>
            </div>
          ))}
        </div>
        {/* Sparkline */}
        <div style={{ padding: '20px 20px 8px' }}>
          <div style={{ color: TEXT_DIM, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>
            {d.sparkLabel}
          </div>
          <Sparkline data={d.sparkData} color={d.color} width={280} height={40} />
        </div>
        {/* Coaching */}
        <div style={{
          margin: '16px 20px 20px', padding: 16, borderRadius: 12,
          background: 'rgba(201,169,110,0.06)', border: `1px solid ${BORDER}`,
        }}>
          <div style={{ color: GOLD, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>
            Concierge Insight
          </div>
          <div style={{ color: TEXT_DIM, fontSize: 13, lineHeight: 1.65 }}>{d.coaching}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────── */
export default function AuraSanctumDirection({ onExit }) {
  const [activeTab, setActiveTab] = useState('home');
  const [openDomain, setOpenDomain] = useState(null);

  /* ── Home Screen ─── */
  function HomeScreen() {
    return (
      <>
        {/* Aurora Header Illustration */}
        <AuroraHeader />

        <div style={{ padding: '0 20px 100px' }}>
          {/* Exit button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 0 0' }}>
            <button onClick={onExit} style={s.exitBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEXT_DIM} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={ICONS.exit} />
              </svg>
            </button>
          </div>

          {/* Greeting Card */}
          <div style={s.greetingCard}>
            <div style={{
              fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase',
              color: GOLD, marginBottom: 10, fontVariant: 'small-caps',
            }}>
              {today.date}
            </div>
            <div style={{ fontSize: 26, fontWeight: 300, color: TEXT, letterSpacing: 0.5, marginBottom: 8 }}>
              Good evening, {user.name}.
            </div>
            <div style={{ fontSize: 14, color: TEXT_DIM, lineHeight: 1.5 }}>
              Your recovery is excellent today — an ideal window for performance.
            </div>
          </div>

          {/* Today's Report */}
          <div style={{
            fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase',
            color: GOLD_LT, marginBottom: 14, marginTop: 32, fontVariant: 'small-caps',
          }}>
            Today&apos;s Report
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['recovery', 'sleep', 'strain'].map((key) => {
              const d = DOMAIN_DETAILS[key];
              return (
                <button
                  key={key}
                  onClick={() => setOpenDomain(key)}
                  style={s.serviceCard}
                >
                  {/* Gold icon square */}
                  <div style={s.iconSquare}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={d.icon} />
                    </svg>
                  </div>
                  {/* Center: name + score */}
                  <div style={{ flex: 1, textAlign: 'left', marginLeft: 14 }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: TEXT, letterSpacing: 0.3 }}>{d.title}</div>
                    <div style={{ fontSize: 13, color: TEXT_DIM, marginTop: 2 }}>
                      {typeof d.score === 'number' && d.score > 20 ? d.score : d.score.toFixed(1)}
                    </div>
                  </div>
                  {/* Status badge + chevron */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 10, fontSize: 11, fontWeight: 600,
                      letterSpacing: 0.5, color: d.color,
                      background: `${d.color}15`,
                    }}>{d.status}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEXT_DIM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={ICONS.chevron} />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Vitals Grid */}
          <div style={{
            fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase',
            color: GOLD_LT, marginBottom: 14, marginTop: 32, fontVariant: 'small-caps',
          }}>
            Vitals
          </div>

          <div style={s.vitalsGrid}>
            {VITALS.map((v, i) => (
              <div key={i} style={s.vitalCard}>
                <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: GOLD, marginBottom: 8 }}>
                  {v.label}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 22, fontWeight: 600, color: TEXT }}>{v.value}</span>
                  {v.unit && <span style={{ fontSize: 11, color: TEXT_DIM }}>{v.unit}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  /* ── Render ─── */
  return (
    <div style={s.container}>
      <style>{`
        @keyframes as-slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes as-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      {/* Screen content */}
      <div style={s.scrollArea}>
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'journal' && <StubScreen title="Journal" onBack={() => setActiveTab('home')} />}
        {activeTab === 'activity' && <StubScreen title="Activity" onBack={() => setActiveTab('home')} />}
        {activeTab === 'profile' && (
          <div style={{ padding: 24, paddingTop: 16 }}>
            <button onClick={() => setActiveTab('home')} style={s.backBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={ICONS.back} />
              </svg>
              <span style={{ marginLeft: 8, color: GOLD, fontSize: 15, fontWeight: 500 }}>Back</span>
            </button>
            <div style={{ marginTop: 60, textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: 32, background: `${GOLD}18`,
                border: `1.5px solid ${GOLD}40`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', margin: '0 auto 16px', fontSize: 22,
                fontWeight: 600, color: GOLD, letterSpacing: 1,
              }}>
                {user.initials}
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, color: TEXT, letterSpacing: 1 }}>{user.name}</div>
              <div style={{ marginTop: 12, color: TEXT_DIM, fontSize: 14 }}>Profile</div>
              <button onClick={onExit} style={{
                ...s.exitFullBtn, marginTop: 32,
              }}>
                Exit Direction
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tab Bar */}
      <div style={s.tabBar}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={s.tabBtn}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke={isActive ? GOLD : TEXT_DIM}
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d={tab.icon} />
              </svg>
              <span style={{
                fontSize: 10, marginTop: 3, letterSpacing: 0.5,
                color: isActive ? GOLD : TEXT_DIM,
                fontWeight: isActive ? 600 : 400,
              }}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Sheet */}
      <BottomSheet domain={openDomain} onClose={() => setOpenDomain(null)} />
    </div>
  );
}

/* ── Styles ───────────────────────────────────────────── */
const s = {
  container: {
    position: 'relative',
    height: '100dvh',
    background: BG_DEEP,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: TEXT,
    overflow: 'hidden',
  },
  scrollArea: {
    height: '100dvh',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    paddingTop: 'env(safe-area-inset-top, 0px)',
    paddingBottom: 70,
  },
  /* Greeting */
  greetingCard: {
    padding: '24px 0 0',
  },
  /* Service card */
  serviceCard: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '16px 16px',
    background: BG_MID,
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
    fontFamily: 'inherit',
    textAlign: 'left',
  },
  iconSquare: {
    width: 42,
    height: 42,
    borderRadius: 10,
    background: `${GOLD}12`,
    border: `1px solid ${GOLD}25`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  /* Vitals */
  vitalsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 10,
  },
  vitalCard: {
    padding: '16px 14px',
    background: BG_MID,
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
  },
  /* Tab bar */
  tabBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 56,
    background: BG_DEEP,
    borderTop: `1px solid ${BORDER}`,
    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    zIndex: 100,
  },
  tabBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px 12px',
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
    fontFamily: 'inherit',
  },
  /* Back button */
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 0',
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
    fontFamily: 'inherit',
  },
  /* Exit */
  exitBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 8,
    borderRadius: 8,
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
  },
  exitFullBtn: {
    padding: '12px 28px',
    borderRadius: 10,
    background: 'none',
    border: `1px solid ${GOLD}40`,
    color: GOLD,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: 0.5,
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
  },
  /* Bottom sheet */
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'flex-end',
    animation: 'as-fadeIn 0.2s ease-out',
  },
  sheet: {
    width: '100%',
    maxHeight: '85vh',
    background: BG_MID,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflowY: 'auto',
    animation: 'as-slideUp 0.3s ease-out',
    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 6,
    borderRadius: 8,
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
  },
};

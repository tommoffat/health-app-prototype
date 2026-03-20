import React, { useRef, useState, useEffect } from 'react';
import { user, today, weeklyHRV, weeklySleep, weeklyActivity } from '../../data/fake.js';

// ── Color Palette ──────────────────────────────────────────────
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

// ── Sparkline SVG ──────────────────────────────────────────────
function Sparkline({ data, color = GOLD, width = 120, height = 40 }) {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 4;
  const usableW = width - padding * 2;
  const usableH = height - padding * 2;

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * usableW;
    const y = padding + usableH - ((v - min) / range) * usableH;
    return `${x},${y}`;
  }).join(' ');

  const gradientId = `spark-${color.replace('#', '')}`;

  // Area fill
  const firstX = padding;
  const lastX = padding + usableW;
  const areaPoints = `${firstX},${padding + usableH} ${points} ${lastX},${padding + usableH}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradientId})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Pen SVG Icon ───────────────────────────────────────────────
function PenIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BG_DEEP} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

// ── Arrow Left Icon ────────────────────────────────────────────
function ArrowLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEXT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12,19 5,12 12,5" />
    </svg>
  );
}

// ── Section Data ───────────────────────────────────────────────
const SECTIONS = [
  { id: 'recovery', label: 'Recovery' },
  { id: 'sleep', label: 'Sleep' },
  { id: 'strain', label: 'Strain' },
  { id: 'biometrics', label: 'Biometrics' },
];

// ── Formatting ─────────────────────────────────────────────────
function formatDate() {
  const d = new Date();
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// ── Main Component ─────────────────────────────────────────────
export default function AuraChronicleDirection({ onExit }) {
  const scrollRef = useRef(null);
  const [activeSection, setActiveSection] = useState('recovery');

  // Track which section is in view
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop + 120;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollTop) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el && scrollRef.current) {
      const top = el.offsetTop - 100;
      scrollRef.current.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // ── Styles ─────────────────────────────────────────────────
  const styles = {
    outerContainer: {
      height: '100dvh',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      paddingTop: 'env(safe-area-inset-top, 0px)',
      background: BG_DEEP,
      color: TEXT,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
    },
    navPills: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '12px 16px',
      background: 'rgba(13,17,23,0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${BORDER}`,
    },
    backButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '6px 8px 6px 0',
      display: 'flex',
      alignItems: 'center',
    },
    pill: (active) => ({
      padding: '6px 14px',
      borderRadius: 20,
      border: `1px solid ${active ? GOLD : BORDER}`,
      background: active ? 'rgba(201,169,110,0.15)' : 'transparent',
      color: active ? GOLD_LT : TEXT_DIM,
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: 1,
      textTransform: 'uppercase',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
    }),
    masthead: {
      padding: '48px 24px 40px',
      maxWidth: 640,
      margin: '0 auto',
    },
    mastheadDate: {
      fontSize: 11,
      letterSpacing: 3,
      textTransform: 'uppercase',
      color: GOLD,
      marginBottom: 12,
    },
    mastheadTitle: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: 28,
      fontWeight: 400,
      lineHeight: 1.5,
      color: TEXT,
      margin: 0,
    },
    mastheadHighlight: {
      color: GOLD_LT,
      fontWeight: 600,
    },
    sectionContainer: {
      maxWidth: 640,
      margin: '0 auto',
      padding: '0 24px 64px',
    },
    goldRule: {
      width: 48,
      height: 2,
      background: GOLD,
      border: 'none',
      margin: '0 0 16px 0',
    },
    sectionLabel: {
      fontSize: 11,
      letterSpacing: 3,
      textTransform: 'uppercase',
      color: GOLD,
      fontWeight: 600,
      marginBottom: 32,
    },
    pullQuoteRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    pullQuoteNumber: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: 72,
      fontWeight: 200,
      lineHeight: 1,
      color: TEXT,
    },
    pullQuoteUnit: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: 20,
      fontWeight: 300,
      color: TEXT_DIM,
      marginLeft: 6,
    },
    pullQuoteLabel: {
      fontSize: 13,
      color: TEXT_DIM,
      marginBottom: 28,
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 1,
      background: BORDER,
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 28,
    },
    metricCell: {
      background: BG_MID,
      padding: '18px 16px',
      textAlign: 'center',
    },
    metricValue: {
      fontSize: 22,
      fontWeight: 500,
      color: TEXT,
      marginBottom: 4,
    },
    metricLabel: {
      fontSize: 11,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: TEXT_DIM,
    },
    coachingText: {
      fontSize: 14,
      lineHeight: 1.7,
      color: TEXT_DIM,
      fontStyle: 'italic',
      borderLeft: `2px solid ${GOLD}`,
      paddingLeft: 16,
      margin: '0 0 0 4px',
    },
    fab: {
      position: 'fixed',
      bottom: 28,
      right: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LT})`,
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 20px rgba(201,169,110,0.4)',
      zIndex: 200,
      transition: 'transform 0.2s ease',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    },
    divider: {
      border: 'none',
      borderTop: `1px solid ${BORDER}`,
      margin: '0 0 48px 0',
    },
  };

  // ── Narrative opening ──────────────────────────────────────
  const narrativeOpening = (
    <p style={styles.mastheadTitle}>
      <span style={styles.mastheadHighlight}>{user.name}</span> had a night of deep restoration.
      HRV reached <span style={styles.mastheadHighlight}>{today.readiness.hrv}ms</span>,
      sleep scored <span style={styles.mastheadHighlight}>{today.sleep.score}</span>,
      and readiness sits at a solid <span style={styles.mastheadHighlight}>{today.readiness.score}</span>.
    </p>
  );

  // ── Sections ───────────────────────────────────────────────
  const renderRecovery = () => (
    <section id="recovery" style={styles.sectionContainer}>
      <hr style={styles.goldRule} />
      <div style={styles.sectionLabel}>Recovery</div>

      <div style={styles.pullQuoteRow}>
        <div>
          <span style={styles.pullQuoteNumber}>{today.readiness.score}</span>
          <span style={styles.pullQuoteUnit}>pts</span>
        </div>
        <Sparkline data={weeklyHRV} color={AURORA_TEAL} />
      </div>
      <div style={styles.pullQuoteLabel}>Readiness Score — 7-day HRV trend</div>

      <div style={styles.metricsGrid}>
        <div style={styles.metricCell}>
          <div style={styles.metricValue}>{today.readiness.hrv}</div>
          <div style={styles.metricLabel}>HRV (ms)</div>
        </div>
        <div style={styles.metricCell}>
          <div style={styles.metricValue}>{today.readiness.restingHR}</div>
          <div style={styles.metricLabel}>Rest HR</div>
        </div>
        <div style={styles.metricCell}>
          <div style={styles.metricValue}>{today.readiness.spo2}%</div>
          <div style={styles.metricLabel}>SpO2</div>
        </div>
      </div>

      <p style={styles.coachingText}>
        Your autonomic nervous system is showing strong parasympathetic tone this morning.
        HRV of {today.readiness.hrv}ms paired with a resting heart rate of {today.readiness.restingHR} bpm
        suggests excellent recovery. You're well-positioned for a moderate-to-hard training day.
      </p>
    </section>
  );

  const renderSleep = () => (
    <section id="sleep" style={styles.sectionContainer}>
      <hr style={styles.divider} />
      <hr style={styles.goldRule} />
      <div style={styles.sectionLabel}>Sleep</div>

      <div style={styles.pullQuoteRow}>
        <div>
          <span style={styles.pullQuoteNumber}>{today.sleep.score}</span>
          <span style={styles.pullQuoteUnit}>score</span>
        </div>
        <Sparkline data={weeklySleep} color={AURORA_PURPLE} />
      </div>
      <div style={styles.pullQuoteLabel}>Sleep Quality — 7-day trend</div>

      <div style={styles.metricsGrid}>
        <div style={styles.metricCell}>
          <div style={styles.metricValue}>{today.sleep.total}</div>
          <div style={styles.metricLabel}>Total</div>
        </div>
        <div style={styles.metricCell}>
          <div style={styles.metricValue}>{today.sleep.deep}</div>
          <div style={styles.metricLabel}>Deep</div>
        </div>
        <div style={styles.metricCell}>
          <div style={styles.metricValue}>{today.sleep.rem}</div>
          <div style={styles.metricLabel}>REM</div>
        </div>
      </div>

      <div style={{ ...styles.metricsGrid, gridTemplateColumns: '1fr 1fr', marginTop: 1 }}>
        <div style={styles.metricCell}>
          <div style={styles.metricValue}>{today.sleep.efficiency}%</div>
          <div style={styles.metricLabel}>Efficiency</div>
        </div>
        <div style={styles.metricCell}>
          <div style={styles.metricValue}>{today.sleep.total}</div>
          <div style={styles.metricLabel}>Time Asleep</div>
        </div>
      </div>

      <p style={styles.coachingText}>
        A strong night with {today.sleep.deep} of deep sleep — that's where growth hormone
        peaks and tissue repair happens. Your {today.sleep.rem} of REM supports memory
        consolidation and emotional regulation. Sleep efficiency at {today.sleep.efficiency}%
        indicates minimal nighttime disruptions.
      </p>
    </section>
  );

  const renderStrain = () => (
    <section id="strain" style={styles.sectionContainer}>
      <hr style={styles.divider} />
      <hr style={styles.goldRule} />
      <div style={styles.sectionLabel}>Strain</div>

      <div style={styles.pullQuoteRow}>
        <div>
          <span style={styles.pullQuoteNumber}>{today.strain}</span>
          <span style={styles.pullQuoteUnit}>load</span>
        </div>
        <Sparkline data={weeklyActivity} color={AURORA_GREEN} />
      </div>
      <div style={styles.pullQuoteLabel}>Daily Strain — 7-day activity trend</div>

      <div style={styles.metricsGrid}>
        <div style={styles.metricCell}>
          <div style={styles.metricValue}>{today.activity.steps.toLocaleString()}</div>
          <div style={styles.metricLabel}>Steps</div>
        </div>
        <div style={styles.metricCell}>
          <div style={styles.metricValue}>{today.activity.calories}</div>
          <div style={styles.metricLabel}>Calories</div>
        </div>
        <div style={styles.metricCell}>
          <div style={styles.metricValue}>{today.activity.activeMinutes}</div>
          <div style={styles.metricLabel}>Active Min</div>
        </div>
      </div>

      <p style={styles.coachingText}>
        Strain of {today.strain} puts you in a moderate effort zone. With {today.activity.steps.toLocaleString()} steps
        and {today.activity.activeMinutes} active minutes, you've maintained a healthy baseline of movement.
        Given your strong recovery, there's capacity for a focused training session today.
      </p>
    </section>
  );

  const renderBiometrics = () => (
    <section id="biometrics" style={styles.sectionContainer}>
      <hr style={styles.divider} />
      <hr style={styles.goldRule} />
      <div style={styles.sectionLabel}>Biometrics</div>

      <div style={styles.pullQuoteRow}>
        <div>
          <span style={styles.pullQuoteNumber}>{today.weight}</span>
          <span style={styles.pullQuoteUnit}>lbs</span>
        </div>
        <Sparkline data={[180.2, 179.8, 179.1, 178.9, 178.6, 178.5, 178.4]} color={GOLD} />
      </div>
      <div style={styles.pullQuoteLabel}>Body Weight — 7-day trend</div>

      <div style={styles.metricsGrid}>
        <div style={styles.metricCell}>
          <div style={styles.metricValue}>{today.readiness.restingHR}</div>
          <div style={styles.metricLabel}>Rest HR</div>
        </div>
        <div style={styles.metricCell}>
          <div style={styles.metricValue}>{today.readiness.spo2}%</div>
          <div style={styles.metricLabel}>SpO2</div>
        </div>
        <div style={styles.metricCell}>
          <div style={styles.metricValue}>{today.readiness.hrv}</div>
          <div style={styles.metricLabel}>HRV (ms)</div>
        </div>
      </div>

      <p style={styles.coachingText}>
        Weight is trending steadily at {today.weight} lbs, consistent with your recent week.
        Blood oxygen at {today.readiness.spo2}% is optimal. Resting heart rate of {today.readiness.restingHR} bpm
        reflects strong cardiovascular fitness and effective recovery.
      </p>

      {/* Bottom spacer */}
      <div style={{ height: 120 }} />
    </section>
  );

  // ── Render ─────────────────────────────────────────────────
  return (
    <div ref={scrollRef} style={styles.outerContainer}>
      {/* Sticky Navigation Pills */}
      <nav style={styles.navPills}>
        <button style={styles.backButton} onClick={onExit} aria-label="Back">
          <ArrowLeftIcon />
        </button>
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            style={styles.pill(activeSection === s.id)}
            onClick={() => scrollToSection(s.id)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* Editorial Masthead */}
      <header style={styles.masthead}>
        <div style={styles.mastheadDate}>{formatDate()}</div>
        {narrativeOpening}
      </header>

      {/* Content Sections */}
      {renderRecovery()}
      {renderSleep()}
      {renderStrain()}
      {renderBiometrics()}

      {/* Floating Action Button */}
      <button
        style={styles.fab}
        onClick={() => {}}
        aria-label="Log"
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <PenIcon />
      </button>
    </div>
  );
}

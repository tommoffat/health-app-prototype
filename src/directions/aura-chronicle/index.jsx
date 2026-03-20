import React, { useRef, useState, useEffect } from 'react';
import TodayEdition from './TodayEdition.jsx';
import SleepArticle from './SleepArticle.jsx';
import RecoveryArticle from './RecoveryArticle.jsx';
import ActivityArticle from './ActivityArticle.jsx';
import BiometricsSpread from './BiometricsSpread.jsx';
import JournalDiary from './JournalDiary.jsx';
import ProfilePage from './ProfilePage.jsx';
import LogModal from './LogModal.jsx';

const BG = '#0D1117';
const GOLD = '#C9A96E';
const GOLD_LT = '#E8D5A8';
const TEXT = '#E8E8E8';
const TEXT_DIM = '#8B949E';
const BORDER = 'rgba(255,255,255,0.06)';

const TABS = [
  { id: 'today', label: 'Today', icon: (color) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8z" />
    </svg>
  )},
  { id: 'vitals', label: 'Vitals', icon: (color) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
    </svg>
  )},
  { id: 'journal', label: 'Journal', icon: (color) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )},
  { id: 'profile', label: 'Profile', icon: (color) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )},
];

const SECTION_PILLS = [
  { id: 'section-brief', label: 'Brief' },
  { id: 'section-recovery', label: 'Sleep' },
  { id: 'section-sleep', label: 'Activity' },
  { id: 'section-activity', label: 'Vitals' },
];

export default function AuraChronicleDirection({ onExit }) {
  const scrollRef = useRef(null);
  const [activeTab, setActiveTab] = useState('today');
  const [detailScreen, setDetailScreen] = useState(null);
  const [showLog, setShowLog] = useState(false);
  const [activeSection, setActiveSection] = useState('section-brief');

  const navigate = (screen) => {
    if (['sleep', 'recovery', 'activity'].includes(screen)) {
      setDetailScreen(screen);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    } else if (screen === 'today') {
      setDetailScreen(null);
      setActiveTab('today');
    }
  };

  const handleTabChange = (tabId) => {
    setDetailScreen(null);
    setActiveTab(tabId);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  // Track active section on scroll for Today view
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || activeTab !== 'today' || detailScreen) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop + 140;
      for (let i = SECTION_PILLS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_PILLS[i].id);
        if (el && el.offsetTop <= scrollTop) {
          setActiveSection(SECTION_PILLS[i].id);
          break;
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeTab, detailScreen]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el && scrollRef.current) {
      const top = el.offsetTop - 120;
      scrollRef.current.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const showSectionNav = activeTab === 'today' && !detailScreen;

  const renderContent = () => {
    if (detailScreen === 'sleep') return <SleepArticle navigate={navigate} />;
    if (detailScreen === 'recovery') return <RecoveryArticle navigate={navigate} />;
    if (detailScreen === 'activity') return <ActivityArticle navigate={navigate} />;

    switch (activeTab) {
      case 'today': return <TodayEdition navigate={navigate} />;
      case 'vitals': return <BiometricsSpread navigate={navigate} />;
      case 'journal': return <JournalDiary navigate={navigate} />;
      case 'profile': return <ProfilePage onExit={onExit} />;
      default: return <TodayEdition navigate={navigate} />;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 390,
      background: BG,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 'env(safe-area-inset-top, 0px)',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: TEXT,
    }}>
      {/* Top bar: section nav or back button */}
      {showSectionNav && (
        <nav style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '10px 14px',
          background: 'rgba(13,17,23,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${BORDER}`,
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}>
          <button
            onClick={onExit}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px 8px 6px 0',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TEXT_DIM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12,19 5,12 12,5" />
            </svg>
          </button>
          {SECTION_PILLS.map(s => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              style={{
                padding: '5px 12px',
                borderRadius: 16,
                border: `1px solid ${activeSection === s.id ? GOLD : BORDER}`,
                background: activeSection === s.id ? 'rgba(201,169,110,0.12)' : 'transparent',
                color: activeSection === s.id ? GOLD_LT : TEXT_DIM,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {s.label}
            </button>
          ))}
        </nav>
      )}

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {renderContent()}
      </div>

      {/* Tab bar */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        background: 'rgba(13,17,23,0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: `1px solid ${BORDER}`,
        padding: '8px 0',
        paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))',
      }}>
        {TABS.map(tab => {
          const active = !detailScreen && activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                padding: '4px 12px',
                position: 'relative',
              }}
            >
              {active && (
                <div style={{
                  position: 'absolute',
                  top: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 20,
                  height: 2,
                  background: GOLD,
                  borderRadius: 1,
                }} />
              )}
              {tab.icon(active ? GOLD : TEXT_DIM)}
              <span style={{
                fontSize: 10,
                color: active ? GOLD_LT : TEXT_DIM,
                fontWeight: active ? 600 : 400,
                letterSpacing: 0.3,
              }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowLog(true)}
        style={{
          position: 'absolute',
          bottom: 72,
          right: 16,
          width: 52,
          height: 52,
          borderRadius: 26,
          background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LT})`,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(201,169,110,0.4)',
          zIndex: 200,
          transition: 'transform 0.2s ease',
          marginBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        aria-label="Log"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BG} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </button>

      {/* Log Modal */}
      {showLog && <LogModal onClose={() => setShowLog(false)} />}
    </div>
  );
}

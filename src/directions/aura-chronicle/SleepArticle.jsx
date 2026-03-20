import React from 'react';
import { user, today, weeklySleep } from '../../data/fake.js';
import ArticleChart from './components/ArticleChart.jsx';
import Sparkline from './components/Sparkline.jsx';

const BG = '#0D1117';
const PAPER = '#111520';
const GOLD = '#C9A96E';
const GOLD_RULE = 'rgba(201,169,110,0.3)';
const TEXT = '#E8E8E8';
const TEXT_DIM = '#8B949E';
const TEXT_CAPTION = '#6B7280';
const BORDER = 'rgba(255,255,255,0.06)';

const PURPLE = '#9B72CF';
const BLUE = '#5B8DEF';
const DEEP_BLUE = '#3A5BA0';
const GRAY = '#6B7280';
const PINK = '#E87BA4';
const TEAL = '#4ECDC4';

function BackButton({ onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', color: GOLD, fontSize: 13,
      cursor: 'pointer', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 6,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15,18 9,12 15,6" />
      </svg>
      Back to Today
    </button>
  );
}

function SleepTimeline() {
  // Simulated timeline segments across 7h 22m
  const segments = [
    { stage: 'Light', duration: 45, color: BLUE },
    { stage: 'Deep', duration: 30, color: DEEP_BLUE },
    { stage: 'Light', duration: 20, color: BLUE },
    { stage: 'REM', duration: 25, color: PURPLE },
    { stage: 'Light', duration: 15, color: BLUE },
    { stage: 'Deep', duration: 35, color: DEEP_BLUE },
    { stage: 'Light', duration: 30, color: BLUE },
    { stage: 'REM', duration: 30, color: PURPLE },
    { stage: 'Awake', duration: 8, color: GRAY },
    { stage: 'Light', duration: 25, color: BLUE },
    { stage: 'Deep', duration: 20, color: DEEP_BLUE },
    { stage: 'REM', duration: 28, color: PURPLE },
    { stage: 'Light', duration: 40, color: BLUE },
    { stage: 'Deep', duration: 19, color: DEEP_BLUE },
    { stage: 'REM', duration: 35, color: PURPLE },
    { stage: 'Light', duration: 20, color: BLUE },
    { stage: 'Awake', duration: 16, color: GRAY },
    { stage: 'Light', duration: 20, color: BLUE },
  ];
  const total = segments.reduce((a, s) => a + s.duration, 0);
  const hours = ['11 PM', '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM'];

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        fontSize: 11, color: TEXT_CAPTION, letterSpacing: 0.5, marginBottom: 12,
        textTransform: 'uppercase',
      }}>
        Sleep Timeline
      </div>
      <div style={{ display: 'flex', borderRadius: 4, overflow: 'hidden', height: 32, marginBottom: 8 }}>
        {segments.map((s, i) => (
          <div key={i} style={{
            width: `${(s.duration / total) * 100}%`,
            background: s.color,
            borderRight: i < segments.length - 1 ? `1px solid ${BG}` : 'none',
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {hours.map(h => (
          <span key={h} style={{ fontSize: 9, color: TEXT_CAPTION }}>{h}</span>
        ))}
      </div>
    </div>
  );
}

function StageCard({ name, duration, pct, trend, color }) {
  return (
    <div style={{
      background: PAPER,
      borderRadius: 8,
      padding: '14px 16px',
      border: `1px solid ${BORDER}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: 4, background: color }} />
        <span style={{ fontSize: 12, color: TEXT, fontWeight: 500 }}>{name}</span>
      </div>
      <div style={{ fontSize: 22, fontWeight: 500, color: TEXT, fontFamily: 'Georgia, "Times New Roman", serif', marginBottom: 2 }}>
        {duration}
      </div>
      <div style={{ fontSize: 11, color: TEXT_DIM }}>{pct}% of total</div>
      <div style={{ fontSize: 11, color: trend.startsWith('+') ? TEAL : TEXT_CAPTION, marginTop: 4 }}>
        {trend} vs avg
      </div>
    </div>
  );
}

export default function SleepArticle({ navigate }) {
  // Simulated chart data
  const hrDuringSleep = [62, 58, 54, 52, 50, 48, 51, 53, 49, 47, 50, 54, 56, 58, 60, 62];
  const hrvDuringSleep = [45, 52, 58, 65, 72, 78, 68, 62, 75, 80, 70, 58, 52, 48, 44, 40];
  const breathingRate = [14.5, 14.2, 13.8, 13.5, 13.2, 13.0, 13.3, 13.6, 13.1, 12.9, 13.4, 13.8, 14.0, 14.2, 14.4, 14.5];
  const spo2Data = [98, 98, 97, 98, 98, 99, 98, 97, 98, 98, 99, 98, 98, 97, 98, 98];
  const sleepBankWeek = [-15, -30, 10, 5, -10, 8, 15];

  return (
    <div>
      <BackButton onClick={() => navigate('today')} />

      <article style={{ padding: '0 24px 80px', maxWidth: 640, margin: '0 auto' }}>
        {/* Headline */}
        <h1 style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 28,
          fontWeight: 400,
          lineHeight: 1.3,
          color: TEXT,
          margin: '8px 0 16px',
        }}>
          A Night of Deep Restoration
        </h1>

        {/* Byline */}
        <div style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 8 }}>
          {user.name} M. — March 19, 2026
        </div>
        <div style={{
          display: 'inline-block',
          background: 'rgba(201,169,110,0.12)',
          border: `1px solid ${GOLD_RULE}`,
          borderRadius: 4,
          padding: '4px 10px',
          fontSize: 12,
          color: GOLD,
          fontWeight: 500,
          marginBottom: 28,
        }}>
          Sleep Index {today.sleep.score}
        </div>

        {/* Lede */}
        <div style={{ fontSize: 14, lineHeight: 1.8, color: TEXT_DIM, marginBottom: 32 }}>
          Last night delivered a high-quality sleep session totaling {today.sleep.total}, with an
          efficiency of {today.sleep.efficiency}%. Deep sleep accounted for {today.sleep.deep}, providing
          the restorative foundation for tissue repair and growth hormone release. REM sleep at{' '}
          {today.sleep.rem} supported memory consolidation and emotional processing. Sleep onset
          latency was a brisk {today.sleep.latency} minutes, indicating well-calibrated circadian timing.
        </div>

        <hr style={{ border: 'none', borderTop: `1px solid ${GOLD_RULE}`, margin: '0 0 32px 0' }} />

        {/* Timeline */}
        <SleepTimeline />

        {/* Stage Analysis */}
        <div style={{
          fontSize: 11, color: TEXT_CAPTION, letterSpacing: 0.5, marginBottom: 16,
          textTransform: 'uppercase',
        }}>
          Stage Analysis
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
          marginBottom: 32,
        }}>
          <StageCard name="Deep" duration={today.sleep.deep} pct={23} trend="+12%" color={DEEP_BLUE} />
          <StageCard name="REM" duration={today.sleep.rem} pct={27} trend="+5%" color={PURPLE} />
          <StageCard name="Core" duration={today.sleep.light} pct={43} trend="-3%" color={BLUE} />
          <StageCard name="Awake" duration={today.sleep.awake} pct={6} trend="-8%" color={GRAY} />
        </div>

        <hr style={{ border: 'none', borderTop: `1px solid ${GOLD_RULE}`, margin: '0 0 32px 0' }} />

        {/* Charts */}
        <ArticleChart data={hrDuringSleep} color={PINK} width={320} height={100} label="Heart Rate During Sleep" />
        <ArticleChart data={hrvDuringSleep} color={TEAL} width={320} height={100} label="HRV During Sleep" />
        <ArticleChart data={breathingRate} color={PURPLE} width={320} height={100} label="Breathing Rate" />
        <ArticleChart data={spo2Data} color={BLUE} width={320} height={100} label="Blood Oxygen (SpO2)" />

        <hr style={{ border: 'none', borderTop: `1px solid ${GOLD_RULE}`, margin: '12px 0 32px 0' }} />

        {/* Sleep Bank */}
        <div style={{
          fontSize: 11, color: TEXT_CAPTION, letterSpacing: 0.5, marginBottom: 12,
          textTransform: 'uppercase',
        }}>
          Sleep Bank
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 28, fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 300, color: TEAL }}>
            +15min
          </span>
          <span style={{ fontSize: 13, color: TEXT_DIM }}>above baseline</span>
        </div>
        <ArticleChart data={sleepBankWeek} color={TEAL} width={320} height={80} label="7-Day Sleep Bank" />

        <hr style={{ border: 'none', borderTop: `1px solid ${GOLD_RULE}`, margin: '12px 0 32px 0' }} />

        {/* What the Data Says */}
        <div style={{
          fontSize: 11, color: GOLD, letterSpacing: 3, textTransform: 'uppercase',
          fontWeight: 600, marginBottom: 16,
        }}>
          What the Data Says
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.8, color: TEXT_DIM }}>
          <p style={{ margin: '0 0 16px 0' }}>
            Your {today.sleep.deep} of deep sleep is well above the recommended minimum of 1h 30m, indicating
            excellent physical recovery. Deep sleep is where the body releases growth hormone and performs
            cellular repair — this is the most restorative phase of your night.
          </p>
          <p style={{ margin: '0 0 16px 0' }}>
            REM sleep at {today.sleep.rem} shows healthy cognitive and emotional processing. Your heart rate
            variability remained elevated through the night, with peak readings during deep sleep phases, reflecting
            strong parasympathetic activation.
          </p>
          <p style={{ margin: 0 }}>
            Sleep efficiency of {today.sleep.efficiency}% and a sleep onset latency of {today.sleep.latency} minutes
            both fall within optimal ranges. Maintaining consistent bed and wake times this week has
            contributed to these strong results.
          </p>
        </div>
      </article>
    </div>
  );
}

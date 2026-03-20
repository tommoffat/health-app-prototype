import React from 'react';
import { user, today, weeklyHRV } from '../../data/fake.js';
import ArticleChart from './components/ArticleChart.jsx';
import Sparkline from './components/Sparkline.jsx';

const PAPER = '#111520';
const GOLD = '#C9A96E';
const GOLD_RULE = 'rgba(201,169,110,0.3)';
const TEXT = '#E8E8E8';
const TEXT_DIM = '#8B949E';
const TEXT_CAPTION = '#6B7280';
const BORDER = 'rgba(255,255,255,0.06)';
const TEAL = '#4ECDC4';
const PINK = '#E87BA4';

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

function ContributorCard({ label, value, color }) {
  return (
    <div style={{
      background: PAPER,
      borderRadius: 8,
      padding: '14px 16px',
      border: `1px solid ${BORDER}`,
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 20, fontWeight: 500, color: color || TEXT, fontFamily: 'Georgia, "Times New Roman", serif' }}>
        {value}
      </div>
    </div>
  );
}

export default function RecoveryArticle({ navigate }) {
  // 30-day HRV trend
  const hrv30 = [52, 55, 48, 58, 62, 55, 60, 63, 58, 65, 61, 59, 64, 66, 62, 68, 65, 60, 63, 67, 64, 70, 66, 63, 68, 65, 70, 68, 66, 68];
  const rhr30 = [58, 57, 56, 55, 56, 55, 54, 55, 54, 53, 54, 53, 54, 53, 52, 53, 52, 53, 52, 53, 52, 51, 52, 53, 52, 51, 52, 52, 51, 52];

  // This week vs last week HRV
  const thisWeek = [61, 64, 68, 65, 70, 68, 68];
  const lastWeek = [55, 58, 52, 60, 63, 58, 61];

  return (
    <div>
      <BackButton onClick={() => navigate('today')} />

      <article style={{ padding: '0 24px 80px', maxWidth: 640, margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: 28,
          fontWeight: 400,
          lineHeight: 1.3,
          color: TEXT,
          margin: '8px 0 16px',
        }}>
          Recovery at Peak Levels
        </h1>

        <div style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 8 }}>
          {user.name} M. — March 19, 2026
        </div>
        <div style={{
          display: 'inline-block',
          background: 'rgba(78,205,196,0.12)',
          border: '1px solid rgba(78,205,196,0.3)',
          borderRadius: 4,
          padding: '4px 10px',
          fontSize: 12,
          color: TEAL,
          fontWeight: 500,
          marginBottom: 28,
        }}>
          Readiness {today.readiness.score}%
        </div>

        <div style={{ fontSize: 14, lineHeight: 1.8, color: TEXT_DIM, marginBottom: 32 }}>
          Your recovery score of {today.readiness.score}% places you in the green zone this morning. An HRV
          reading of {today.readiness.hrv}ms — well above your 30-day average of 62ms — reflects excellent
          autonomic balance. Combined with a resting heart rate of {today.readiness.restingHR} bpm and blood
          oxygen at {today.readiness.spo2}%, all physiological indicators point toward full recovery.
        </div>

        <hr style={{ border: 'none', borderTop: `1px solid ${GOLD_RULE}`, margin: '0 0 32px 0' }} />

        {/* 30-day HRV */}
        <ArticleChart data={hrv30} color={TEAL} width={320} height={140} label="30-Day HRV Trend" />

        {/* 30-day RHR */}
        <ArticleChart data={rhr30} color={PINK} width={320} height={100} label="30-Day Resting Heart Rate" />

        <hr style={{ border: 'none', borderTop: `1px solid ${GOLD_RULE}`, margin: '12px 0 32px 0' }} />

        {/* Week comparison */}
        <div style={{
          fontSize: 11, color: TEXT_CAPTION, letterSpacing: 0.5, marginBottom: 16,
          textTransform: 'uppercase',
        }}>
          Weekly HRV Comparison
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          <div style={{ background: PAPER, borderRadius: 8, padding: 14, border: `1px solid ${BORDER}` }}>
            <div style={{ fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>
              This Week
            </div>
            <div style={{ fontSize: 20, fontWeight: 500, color: TEXT, fontFamily: 'Georgia, "Times New Roman", serif', marginBottom: 6 }}>
              Avg {Math.round(thisWeek.reduce((a, b) => a + b) / thisWeek.length)}ms
            </div>
            <Sparkline data={thisWeek} color={TEAL} width={120} height={32} />
          </div>
          <div style={{ background: PAPER, borderRadius: 8, padding: 14, border: `1px solid ${BORDER}` }}>
            <div style={{ fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>
              Last Week
            </div>
            <div style={{ fontSize: 20, fontWeight: 500, color: TEXT, fontFamily: 'Georgia, "Times New Roman", serif', marginBottom: 6 }}>
              Avg {Math.round(lastWeek.reduce((a, b) => a + b) / lastWeek.length)}ms
            </div>
            <Sparkline data={lastWeek} color={TEXT_DIM} width={120} height={32} />
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: `1px solid ${GOLD_RULE}`, margin: '0 0 32px 0' }} />

        {/* Contributors */}
        <div style={{
          fontSize: 11, color: TEXT_CAPTION, letterSpacing: 0.5, marginBottom: 16,
          textTransform: 'uppercase',
        }}>
          Recovery Contributors
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 32 }}>
          <ContributorCard label="Sleep" value={today.sleep.score} color={TEAL} />
          <ContributorCard label="Stress" value="Low" color={TEAL} />
          <ContributorCard label="Training Load" value="Moderate" color={GOLD} />
          <ContributorCard label="Nutrition" value="--" color={TEXT_DIM} />
        </div>

        <hr style={{ border: 'none', borderTop: `1px solid ${GOLD_RULE}`, margin: '0 0 32px 0' }} />

        {/* Coaching */}
        <div style={{
          fontSize: 11, color: GOLD, letterSpacing: 3, textTransform: 'uppercase',
          fontWeight: 600, marginBottom: 16,
        }}>
          Coaching Notes
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.8, color: TEXT_DIM }}>
          <p style={{ margin: '0 0 16px 0' }}>
            Your HRV has been on an upward trend over the past two weeks, climbing from an average of 58ms
            to 66ms this week. This trajectory suggests your body is adapting well to your current training
            load and recovery practices.
          </p>
          <p style={{ margin: '0 0 16px 0' }}>
            Resting heart rate has also improved, dropping from 55 bpm to a steady 52 bpm — a sign of
            improving cardiovascular efficiency. These metrics together indicate you are in an excellent
            position for higher-intensity work if desired.
          </p>
          <p style={{ margin: 0 }}>
            Consider maintaining your current sleep schedule and stress management routine, as both are
            clearly contributing to your recovery gains. Today is a green-light day for training.
          </p>
        </div>
      </article>
    </div>
  );
}

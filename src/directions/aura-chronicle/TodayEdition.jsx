import React from 'react';
import { user, today, weeklyHRV, weeklySleep, weeklyActivity, weeklyWeight } from '../../data/fake.js';
import EditorialSection from './components/EditorialSection.jsx';
import PullQuote from './components/PullQuote.jsx';
import Sparkline from './components/Sparkline.jsx';
import BylineCard from './components/BylineCard.jsx';

const BG = '#0D1117';
const PAPER = '#111520';
const GOLD = '#C9A96E';
const GOLD_LT = '#E8D5A8';
const GOLD_RULE = 'rgba(201,169,110,0.3)';
const TEXT = '#E8E8E8';
const TEXT_DIM = '#8B949E';
const TEXT_CAPTION = '#6B7280';
const BORDER = 'rgba(255,255,255,0.06)';

const TEAL = '#4ECDC4';
const PINK = '#E87BA4';
const PURPLE = '#9B72CF';
const BLUE = '#5B8DEF';
const DEEP_BLUE = '#3A5BA0';
const GRAY = '#6B7280';

function SleepStageBar() {
  const stages = [
    { label: 'Awake', pct: 6, color: GRAY },
    { label: 'REM', pct: 27, color: PURPLE },
    { label: 'Core', pct: 43, color: BLUE },
    { label: 'Deep', pct: 23, color: DEEP_BLUE },
  ];
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', borderRadius: 6, overflow: 'hidden', height: 28, marginBottom: 8 }}>
        {stages.map(s => (
          <div key={s.label} style={{
            width: `${s.pct}%`,
            background: s.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {s.pct >= 15 && (
              <span style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>{s.pct}%</span>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {stages.map(s => (
          <div key={s.label} style={{ textAlign: 'center', flex: s.pct }}>
            <span style={{ fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.3 }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepsBar() {
  const pct = Math.min(100, (today.activity.steps / 10000) * 100);
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: TEXT_DIM }}>Steps</span>
        <span style={{ fontSize: 13, color: TEXT }}>{today.activity.steps.toLocaleString()} / 10,000</span>
      </div>
      <div style={{ height: 6, background: BORDER, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LT})`, borderRadius: 3 }} />
      </div>
    </div>
  );
}

function HRZoneBars() {
  const zones = [
    { label: 'Zone 1', min: 12, color: '#5B8DEF' },
    { label: 'Zone 2', min: 18, color: '#4ECDC4' },
    { label: 'Zone 3', min: 8, color: '#F0C040' },
    { label: 'Zone 4', min: 4, color: '#E87B50' },
    { label: 'Zone 5', min: 2, color: '#E85050' },
  ];
  const maxMin = Math.max(...zones.map(z => z.min));
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 11, color: TEXT_CAPTION, letterSpacing: 0.5, marginBottom: 10, textTransform: 'uppercase' }}>
        HR Zone Summary
      </div>
      {zones.map(z => (
        <div key={z.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 10, color: TEXT_DIM, width: 44, flexShrink: 0 }}>{z.label}</span>
          <div style={{ flex: 1, height: 8, background: BORDER, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: `${(z.min / maxMin) * 100}%`, height: '100%', background: z.color, borderRadius: 4 }} />
          </div>
          <span style={{ fontSize: 10, color: TEXT_CAPTION, width: 32, textAlign: 'right' }}>{z.min}m</span>
        </div>
      ))}
    </div>
  );
}

function VitalCell({ label, value, data, color }) {
  return (
    <div style={{
      background: PAPER,
      borderRadius: 8,
      padding: '14px 14px 10px',
      border: `1px solid ${BORDER}`,
    }}>
      <div style={{ fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 500, color: TEXT, marginBottom: 6, fontFamily: 'Georgia, "Times New Roman", serif' }}>
        {value}
      </div>
      <Sparkline data={data} color={color} width={100} height={28} />
    </div>
  );
}

export default function TodayEdition({ navigate }) {
  return (
    <div>
      {/* Masthead */}
      <header style={{ padding: '40px 24px 32px', maxWidth: 640, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: TEXT,
            fontWeight: 300,
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}>
            Chronicle
          </div>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LT})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 700,
            color: BG,
          }}>
            {user.initials}
          </div>
        </div>
        <hr style={{ border: 'none', borderTop: `1px solid ${GOLD_RULE}`, margin: '0 0 12px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 12, color: TEXT_DIM, letterSpacing: 0.5 }}>
            {today.date} — Vol. {today.readiness.score}
          </span>
          <span style={{ fontSize: 12, color: GOLD, letterSpacing: 0.5 }}>
            Readiness: {today.readiness.score}
          </span>
        </div>
      </header>

      {/* Opening Brief */}
      <div style={{ padding: '0 24px 40px', maxWidth: 640, margin: '0 auto' }}>
        <div style={{
          background: PAPER,
          borderRadius: 10,
          padding: '24px 22px',
          border: `1px solid ${BORDER}`,
        }}>
          <div style={{
            fontSize: 14,
            lineHeight: 1.8,
            color: TEXT_DIM,
          }}>
            {user.name} achieved his highest recovery score this week at <strong style={{ color: TEXT }}>{today.readiness.score}%</strong>,
            driven by an HRV reading of {today.readiness.hrv}ms — well above his 30-day average.
            Last night's <strong style={{ color: TEXT }}>{today.sleep.total}</strong> of sleep included strong deep sleep phases.
            Today is a <strong style={{ color: GOLD_LT }}>good day to train</strong>.
          </div>
        </div>
      </div>

      {/* RECOVERY */}
      <EditorialSection id="section-brief" label="Recovery" showTopRule={false}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ flex: '0 0 60%' }}>
            <PullQuote value={`${today.readiness.score}%`} unit="readiness" />
          </div>
          <div style={{ flex: '0 0 36%', paddingTop: 8 }}>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5, marginBottom: 4 }}>HRV 7-day</div>
              <Sparkline data={weeklyHRV} color={TEAL} width={120} height={32} />
            </div>
            <div>
              <div style={{ fontSize: 10, color: TEXT_CAPTION, letterSpacing: 0.5, marginBottom: 4 }}>RHR 7-day</div>
              <Sparkline data={[54, 53, 52, 53, 52, 51, 52]} color={PINK} width={120} height={32} />
            </div>
          </div>
        </div>

        <div style={{ fontSize: 14, lineHeight: 1.8, color: TEXT_DIM, marginBottom: 24 }}>
          Your HRV of {today.readiness.hrv}ms indicates excellent parasympathetic tone this morning.
          Paired with a resting heart rate of {today.readiness.restingHR} bpm, your autonomic nervous system
          is signaling strong recovery. You're well-positioned for a moderate-to-hard training day.
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
          {[
            { label: 'HRV', val: `${today.readiness.hrv}ms` },
            { label: 'RHR', val: `${today.readiness.restingHR}bpm` },
            { label: 'SpO2', val: `${today.readiness.spo2}%` },
            { label: 'Temp', val: today.readiness.bodyTemp },
          ].map(m => (
            <span key={m.label} style={{ fontSize: 12, color: TEXT_DIM }}>
              <span style={{ color: TEXT, fontWeight: 500 }}>{m.label}</span> {m.val}
            </span>
          ))}
        </div>

        <button
          onClick={() => navigate('recovery')}
          style={{
            background: 'none',
            border: 'none',
            color: GOLD,
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            padding: 0,
            letterSpacing: 0.5,
          }}
        >
          Read full report →
        </button>
      </EditorialSection>

      {/* SLEEP */}
      <EditorialSection id="section-recovery" label="Sleep">
        <PullQuote value={today.sleep.total} unit="slept" />
        <SleepStageBar />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 11, color: TEXT_CAPTION, letterSpacing: 0.5, textTransform: 'uppercase' }}>Sleep Bank</span>
          <span style={{ fontSize: 16, fontWeight: 500, color: '#4ECDC4', fontFamily: 'Georgia, "Times New Roman", serif' }}>+0h 15m</span>
          <span style={{ fontSize: 11, color: TEXT_CAPTION }}>above baseline</span>
        </div>

        <div style={{ fontSize: 14, lineHeight: 1.8, color: TEXT_DIM, marginBottom: 20 }}>
          A strong night with {today.sleep.deep} of deep sleep — that's where growth hormone peaks
          and tissue repair happens. Your {today.sleep.rem} of REM supports memory consolidation
          and emotional regulation.
        </div>

        <button
          onClick={() => navigate('sleep')}
          style={{
            background: 'none',
            border: 'none',
            color: GOLD,
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            padding: 0,
            letterSpacing: 0.5,
          }}
        >
          Read full report →
        </button>
      </EditorialSection>

      {/* ACTIVITY */}
      <EditorialSection id="section-sleep" label="Activity">
        <PullQuote value={today.strain} unit="strain" context="today" />

        <BylineCard
          title={`${today.workout.name} — 9:00 AM`}
          subtitle="45 min — Strain 8.2"
          detail="View session details →"
          onClick={() => navigate('activity')}
        />

        <StepsBar />

        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <span style={{ fontSize: 13, color: TEXT_DIM }}>
            <span style={{ color: TEXT, fontWeight: 500 }}>Calories</span> {today.activity.calories} active
          </span>
          <span style={{ fontSize: 13, color: TEXT_DIM }}>
            <span style={{ color: TEXT, fontWeight: 500 }}>Active</span> {today.activity.activeMinutes} min
          </span>
        </div>

        <HRZoneBars />

        <div style={{ fontSize: 14, lineHeight: 1.8, color: TEXT_DIM, marginBottom: 20 }}>
          Strain of {today.strain} puts you in a moderate effort zone. With {today.activity.steps.toLocaleString()} steps
          and {today.activity.activeMinutes} active minutes, you've maintained a healthy baseline of movement.
          Given your strong recovery, there's capacity for a focused session this afternoon.
        </div>

        <button
          onClick={() => navigate('activity')}
          style={{
            background: 'none',
            border: 'none',
            color: GOLD,
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            padding: 0,
            letterSpacing: 0.5,
          }}
        >
          Read full report →
        </button>
      </EditorialSection>

      {/* VITALS */}
      <EditorialSection id="section-activity" label="Vitals">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
          marginBottom: 20,
        }}>
          <VitalCell label="HRV" value={`${today.readiness.hrv}ms`} data={weeklyHRV} color={TEAL} />
          <VitalCell label="Resting HR" value={`${today.readiness.restingHR}bpm`} data={[54, 53, 52, 53, 52, 51, 52]} color={PINK} />
          <VitalCell label="SpO2" value={`${today.readiness.spo2}%`} data={[98, 97, 98, 98, 99, 98, 98]} color={BLUE} />
          <VitalCell label="Skin Temp" value={today.readiness.bodyTemp} data={[0.1, 0.0, -0.1, 0.1, 0.2, 0.1, 0.2]} color="#E87B50" />
          <VitalCell label="Weight" value={`${today.weight}lbs`} data={weeklyWeight} color={GOLD} />
          <VitalCell label="Resp Rate" value="14.2rpm" data={[14.5, 14.3, 14.1, 14.4, 14.2, 14.0, 14.2]} color={PURPLE} />
        </div>
      </EditorialSection>

      {/* Footer */}
      <footer style={{ padding: '20px 24px 80px', maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <hr style={{ border: 'none', borderTop: `1px solid ${GOLD_RULE}`, margin: '0 0 20px 0' }} />
        <div style={{ fontSize: 11, color: TEXT_CAPTION, letterSpacing: 1 }}>
          Published by Aura Chronicle
        </div>
        <div style={{ fontSize: 11, color: TEXT_CAPTION, marginTop: 4, letterSpacing: 0.5 }}>
          {today.date} — Issue #{today.readiness.score}
        </div>
      </footer>
    </div>
  );
}

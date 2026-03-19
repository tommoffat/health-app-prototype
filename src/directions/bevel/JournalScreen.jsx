import React from 'react'

const BG = '#0F1117'
const TEXT = '#FFFFFF'
const TEXT2 = '#8A8FA8'
const SURFACE = '#1A1E25'

export default function JournalScreen() {
  return (
    <div style={{ padding: 20, paddingTop: 60 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: TEXT, marginBottom: 8 }}>Journal</h1>
      <p style={{ color: TEXT2, fontSize: 14, lineHeight: 1.6 }}>Track your daily thoughts, habits, and wellness notes.</p>
      <div style={{ background: SURFACE, borderRadius: 16, padding: 24, marginTop: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📓</div>
        <div style={{ color: TEXT2, fontSize: 14 }}>Coming soon</div>
      </div>
    </div>
  )
}

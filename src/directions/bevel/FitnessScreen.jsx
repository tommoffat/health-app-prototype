import Icon from './components/Icon'
import React from 'react'

const TEXT = '#FFFFFF'
const TEXT2 = '#8A8FA8'
const SURFACE = '#1A1E25'

export default function FitnessScreen() {
  return (
    <div style={{ padding: 20, paddingTop: 60 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: TEXT, marginBottom: 8 }}>Fitness</h1>
      <p style={{ color: TEXT2, fontSize: 14, lineHeight: 1.6 }}>Your workouts, exercises, and training plans.</p>
      <div style={{ background: SURFACE, borderRadius: 16, padding: 24, marginTop: 20, textAlign: 'center' }}>
        <div style={{ marginBottom: 12 }}><Icon name="dumbbell" size={40} color="#8A8FA8" strokeWidth={1.5} /></div>
        <div style={{ color: TEXT2, fontSize: 14 }}>Coming soon</div>
      </div>
    </div>
  )
}

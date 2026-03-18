import './index.css'

export default function App() {
  return (
    <div style={{
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      background: 'var(--color-bg)',
      padding: '32px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '48px' }}>🦉</div>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '24px',
        fontWeight: '700',
        color: 'var(--color-text)',
        letterSpacing: '-0.5px',
      }}>
        Health App v2
      </h1>
      <p style={{
        fontFamily: 'var(--font-text)',
        fontSize: '15px',
        color: 'var(--color-text-secondary)',
        lineHeight: '1.5',
        maxWidth: '280px',
      }}>
        Prototype in progress.<br />
        Athena is working on PAN-201.
      </p>
      <div style={{
        marginTop: '8px',
        padding: '8px 16px',
        borderRadius: 'var(--radius-full)',
        background: 'var(--color-surface-alt)',
        fontSize: '13px',
        color: 'var(--color-text-tertiary)',
      }}>
        Infrastructure ✓ — design coming soon
      </div>
    </div>
  )
}

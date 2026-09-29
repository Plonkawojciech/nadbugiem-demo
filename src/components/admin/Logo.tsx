export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><path d="M4 26c6-5 10 5 16 0s10 5 16 0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><path d="M4 33c6-5 10 5 16 0s10 5 16 0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity=".45" /><path d="M20 5l9 14H11z" fill="currentColor" /></svg>
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em' }}>Fundacja Nad Bugiem</div>
        <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.6 }}>Panel</div>
      </div>
    </div>
  )
}

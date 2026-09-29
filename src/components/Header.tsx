'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV: [string, string][] = [
  ['Aktualności', '/aktualnosci'],
  ['Projekty', '/projekty'],
  ['Wypożyczalnia', '/wypozyczalnia'],
  ['O fundacji', '/o-fundacji'],
  ['Kontakt', '/kontakt'],
]

export function Header() {
  const [open, setOpen] = useState(false)
  const path = usePathname()
  useEffect(() => setOpen(false), [path])
  const active = (h: string) => path === h || path.startsWith(h + '/')
  return (
    <>
      <header className="head">
        <div className="wrap">
          <Link href="/" className="brand" aria-label="Fundacja Nad Bugiem, strona główna">
            <svg viewBox="0 0 40 40" width="38" height="38" aria-hidden="true"><path d="M4 26c6-5 10 5 16 0s10 5 16 0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /><path d="M4 33c6-5 10 5 16 0s10 5 16 0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity=".45" /><path d="M20 5l9 14H11z" fill="currentColor" /></svg>
            <span><b>Fundacja Nad Bugiem</b><small>Brańszczyk · Wyszków</small></span>
          </Link>
          <nav className="nav" aria-label="Główne">
            {NAV.map(([l, h]) => <Link key={h} href={h} className={active(h) ? 'on' : ''} aria-current={active(h) ? 'page' : undefined}>{l}</Link>)}
          </nav>
          <div className="head-act">
            <Link href="/kontakt#wsparcie" className="btn btn-accent btn-sm">Wesprzyj</Link>
            <button className="burger" aria-expanded={open} aria-controls="menu-mobile" aria-label="Menu" onClick={() => setOpen((o) => !o)}><span /><span /><span /></button>
          </div>
        </div>
      </header>
      <nav id="menu-mobile" className={'drawer' + (open ? ' open' : '')} aria-label="Menu mobilne">
        {NAV.map(([l, h]) => <Link key={h} href={h}>{l}</Link>)}
      </nav>
    </>
  )
}

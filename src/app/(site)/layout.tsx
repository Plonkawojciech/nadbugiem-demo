import type { Metadata } from 'next'
import { Sora, Figtree } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { Header } from '@/components/Header'
import { db } from '@/lib/data'

const display = Sora({ subsets: ['latin', 'latin-ext'], variable: '--font-display' })
const body = Figtree({ subsets: ['latin', 'latin-ext'], variable: '--font-body' })

export const metadata: Metadata = {
  title: { default: 'Fundacja Nad Bugiem — streetworking i wypożyczalnia w Wyszkowie', template: '%s — Fundacja Nad Bugiem' },
  description: 'Fundacja Nad Bugiem z Brańszczyka: pedagogika niekonwencjonalna z dziećmi i młodzieżą w gminie Wyszków, społeczna wypożyczalnia kajaków i rowerów, spływy z lekcją historii.',
  openGraph: { siteName: 'Fundacja Nad Bugiem', locale: 'pl_PL', type: 'website' },
  robots: { index: false, follow: false },
}
export const dynamic = 'force-dynamic'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const payload = await db()
  const [s, partners] = await Promise.all([
    payload.findGlobal({ slug: 'settings' }),
    payload.find({ collection: 'partners', sort: 'order', limit: 20, depth: 0 }),
  ])
  const tel = (s.phone || '').replace(/[\s()-]/g, '')
  return (
    <html lang="pl" className={`${display.variable} ${body.variable}`}>
      <body>
        {s.banner && <div className="topline"><div className="wrap"><span>{s.banner}</span><a href={`tel:${tel}`}>{s.phone}</a></div></div>}
        <Header />
        <main>{children}</main>
        <footer className="foot">
          <div className="wrap partners">
            <p className="foot-h">Nasi darczyńcy i partnerzy</p>
            <div className="marquee" aria-label="Darczyńcy i partnerzy">
              <ul className="logos marquee-track">
                {[...partners.docs, ...partners.docs].map((p, i) => {
                  const dup = i >= partners.docs.length
                  const inner = p.logoUrl ? <img src={p.logoUrl} alt={dup ? '' : p.name} loading="lazy" referrerPolicy="no-referrer" /> : <span>{p.name}</span>
                  return (
                    <li key={`${p.id}-${i}`} aria-hidden={dup || undefined}>
                      {p.url ? <a href={p.url} rel="noopener" target="_blank" title={p.name} tabIndex={dup ? -1 : undefined}>{inner}</a> : inner}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="wrap foot-grid">
            <div>
              <p className="foot-name">Fundacja Nad Bugiem</p>
              <p className="foot-txt">{s.mission}</p>
            </div>
            <div>
              <p className="foot-h">Na stronie</p>
              <ul>
                <li><Link href="/aktualnosci">Aktualności</Link></li>
                <li><Link href="/projekty">Projekty</Link></li>
                <li><Link href="/wypozyczalnia">Wypożyczalnia kajaków i rowerów</Link></li>
                <li><Link href="/o-fundacji">O fundacji</Link></li>
                <li><Link href="/kontakt">Kontakt</Link></li>
              </ul>
            </div>
            <div>
              <p className="foot-h">Kontakt</p>
              <ul>
                <li>{(s.address || '').split('\n').map((l: string) => <span key={l} style={{ display: 'block' }}>{l}</span>)}</li>
                <li><a href={`tel:${tel}`}>{s.phone}</a></li>
                <li><a href={`mailto:${s.email}`}>{s.email}</a></li>
                {s.krs && <li>KRS {s.krs}</li>}
                {s.facebookStreet && <li><a href={s.facebookStreet} rel="noopener">Streetworking na Facebooku</a></li>}
              </ul>
            </div>
            <div className="cr"><span>© 2012–{new Date().getFullYear()} Fundacja Nad Bugiem</span><span>Wersja demonstracyjna nowej strony · Programo s.j.</span></div>
          </div>
        </footer>
      </body>
    </html>
  )
}

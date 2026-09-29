import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db, pic, gallery, dateLong, zl } from '@/lib/data'
import { PostCard } from '@/components/PostCard'
import { InquiryForm } from '@/components/InquiryForm'

type Props = { params: Promise<{ slug: string[] }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const segs = (await params).slug
  const p = segs.join('/')
  const fixed: Record<string, string> = { aktualnosci: 'Aktualności', projekty: 'Projekty', wypozyczalnia: 'Wypożyczalnia kajaków i rowerów', 'o-fundacji': 'O fundacji', kontakt: 'Kontakt' }
  if (fixed[p]) return { title: fixed[p] }
  if (segs[0] === 'aktualnosci' && segs[1]) {
    const r = await (await db()).find({ collection: 'posts', where: { slug: { equals: segs[1] } }, limit: 1 })
    return r.docs[0] ? { title: r.docs[0].title, description: r.docs[0].lead } : {}
  }
  return {}
}

export default async function Page({ params }: Props) {
  const segs = (await params).slug
  const p = segs.join('/')
  const payload = await db()

  if (p === 'aktualnosci') {
    const posts = await payload.find({ collection: 'posts', sort: '-date', limit: 40, depth: 0 })
    return (
      <div className="section"><div className="wrap">
        <div className="crumbs"><Link href="/">Start</Link><span>/</span><span>Aktualności</span></div>
        <h1 className="h1">Aktualności</h1>
        <p className="lead">Wybrane działania streetworkerów i fundacji, opisane i opatrzone zdjęciami. Bieżące relacje są też na Facebooku wyszkowskiego streetworkingu.</p>
        <div className="posts" style={{ marginTop: 44 }}>{posts.docs.map((x) => <PostCard key={x.id} p={x} />)}</div>
      </div></div>
    )
  }

  if (segs[0] === 'aktualnosci' && segs.length === 2) {
    const post = (await payload.find({ collection: 'posts', where: { slug: { equals: segs[1] } }, limit: 1, depth: 1 })).docs[0]
    if (!post) notFound()
    const more = await payload.find({ collection: 'posts', where: { id: { not_equals: post.id } }, sort: '-date', limit: 3, depth: 0 })
    const img = pic(post, 'full')
    const gal = gallery(post)
    return (
      <>
        <div className="section"><div className="wrap narrow">
          <div className="crumbs"><Link href="/">Start</Link><span>/</span><Link href="/aktualnosci">Aktualności</Link><span>/</span><span>{post.title}</span></div>
          <p className="kicker">{dateLong(post.date)}{post.author ? ` · ${post.author}` : ''}</p>
          <h1 className="h1">{post.title}</h1>
          <p className="lead">{post.lead}</p>
          {img && <img src={img} alt="" className="article-img" referrerPolicy="no-referrer" />}
          <div className="prose" style={{ whiteSpace: 'pre-line' }}>{post.body}</div>
          {post.project && <p className="projnote">{post.project}</p>}
          {gal.length > 0 && <div className="mosaic">{gal.map((u, i) => <img key={u} src={u} alt={`${post.title}, zdjęcie ${i + 1}`} loading="lazy" referrerPolicy="no-referrer" />)}</div>}
        </div></div>
        {more.docs.length > 0 && (
          <div className="section tint"><div className="wrap">
            <div className="sechead"><h2 className="h3">Inne wpisy</h2><Link className="textlink" href="/aktualnosci">Wszystkie</Link></div>
            <div className="posts">{more.docs.map((x) => <PostCard key={x.id} p={x} />)}</div>
          </div></div>
        )}
      </>
    )
  }

  if (p === 'projekty') {
    const projects = await payload.find({ collection: 'projects', sort: '-year', limit: 60, depth: 0 })
    return (
      <div className="section"><div className="wrap narrow">
        <div className="crumbs"><Link href="/">Start</Link><span>/</span><span>Projekty</span></div>
        <h1 className="h1">Projekty i zadania publiczne</h1>
        <p className="lead">Fundacja realizuje zadania zlecane przez samorząd w otwartych konkursach ofert. Poniżej wybrane projekty z listy publikowanej przez fundację, z kwotami dofinansowania.</p>
        <table className="ptable"><thead><tr><th scope="col">Rok</th><th scope="col">Projekt</th><th scope="col" className="num">Dofinansowanie</th></tr></thead><tbody>
          {projects.docs.map((x) => (
            <tr key={x.id}>
              <td className="proj-year">{x.year}</td>
              <td><b>{x.name}</b>{x.funder && <small>{x.funder}</small>}{x.basis && <small>{x.basis}</small>}{x.body && <p>{x.body}</p>}</td>
              <td className="num">{x.amount ? zl(x.amount) : ''}{x.current && <small>w trakcie</small>}</td>
            </tr>
          ))}
        </tbody></table>
      </div></div>
    )
  }

  if (p === 'wypozyczalnia') {
    const s = await payload.findGlobal({ slug: 'settings' })
    return (
      <>
        <div className="section"><div className="wrap split">
          <div>
            <div className="crumbs"><Link href="/">Start</Link><span>/</span><span>Wypożyczalnia</span></div>
            <h1 className="h1">Społeczna wypożyczalnia kajaków i rowerów</h1>
            <p className="lead">{s.rentalIntro}</p>
            <section className="osec"><h2 className="h3">Kajaki</h2><p>{s.rentalKayaks}</p></section>
            <section className="osec"><h2 className="h3">Rowery</h2><p>{s.rentalBikes}</p></section>
            {s.rentalImageUrl && <img src={s.rentalImageUrl} alt="Kajaki fundacji" className="article-img" loading="lazy" referrerPolicy="no-referrer" />}
          </div>
          <div className="aside"><p className="aside-h">Zapytaj o termin</p><InquiryForm rental /></div>
        </div></div>
      </>
    )
  }

  if (p === 'o-fundacji') {
    const [s, team] = await Promise.all([payload.findGlobal({ slug: 'settings' }), payload.find({ collection: 'team', sort: 'order', limit: 20, depth: 0 })])
    return (
      <div className="section"><div className="wrap narrow">
        <div className="crumbs"><Link href="/">Start</Link><span>/</span><span>O fundacji</span></div>
        <h1 className="h1">O fundacji</h1>
        <p className="lead">{s.mission}</p>
        <div className="prose" style={{ whiteSpace: 'pre-line' }}>{s.history}</div>
        <dl className="facts">
          {s.registered && <div><dt>Rejestracja w KRS</dt><dd>{s.registered}</dd></div>}
          <div><dt>Siedziba</dt><dd>Brańszczyk</dd></div>
          <div><dt>Obszar działania</dt><dd>gmina Wyszków</dd></div>
        </dl>
        <h2 className="h2" style={{ marginTop: 56 }}>Zarząd i ludzie</h2>
        <div className="team">
          {team.docs.map((t) => (
            <article key={t.id} className="person">
              {pic(t) ? <img src={pic(t)} alt="" loading="lazy" referrerPolicy="no-referrer" /> : <span className="person-ph" aria-hidden="true">{t.name.split(' ').map((w: string) => w[0]).join('')}</span>}
              <div>
                <h3 className="h3">{t.name}</h3>
                <p className="person-role">{t.role}</p>
                {t.bio && <p className="person-bio">{t.bio}</p>}
                {(t.phone || t.email) && <p className="person-contact">{t.phone && <a href={`tel:${t.phone.replace(/[\s-]/g, '')}`}>{t.phone}</a>}{t.phone && t.email ? ' · ' : ''}{t.email && <a href={`mailto:${t.email}`}>{t.email}</a>}</p>}
              </div>
            </article>
          ))}
        </div>
      </div></div>
    )
  }

  if (p === 'kontakt') {
    const s = await payload.findGlobal({ slug: 'settings' })
    return (
      <div className="section"><div className="wrap split">
        <div>
          <div className="crumbs"><Link href="/">Start</Link><span>/</span><span>Kontakt</span></div>
          <h1 className="h1">Kontakt</h1>
          <dl className="dl">
            <div><dt>Adres</dt><dd style={{ whiteSpace: 'pre-line' }}>{s.address}</dd></div>
            <div><dt>Telefon</dt><dd><a href={`tel:${(s.phone || '').replace(/[\s()-]/g, '')}`}>{s.phone}</a></dd></div>
            <div><dt>E-mail</dt><dd><a href={`mailto:${s.email}`}>{s.email}</a></dd></div>
            {s.krs && <div><dt>KRS</dt><dd>{s.krs}</dd></div>}
          </dl>
          <h2 className="h3" id="wsparcie" style={{ marginTop: 44 }}>Jak można pomóc</h2>
          <p className="prose">Napisz, w czym chcesz pomóc: czasem, sprzętem albo wsparciem konkretnego wyjazdu. Fundacja odpowie, co jest teraz potrzebne.</p>
        </div>
        <div className="aside"><p className="aside-h">Napisz do nas</p><InquiryForm kind="message" /></div>
      </div></div>
    )
  }

  notFound()
}

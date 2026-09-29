import Link from 'next/link'
import { db, pic, dateLong, zl } from '@/lib/data'
import { PostCard } from '@/components/PostCard'

export default async function Home() {
  const payload = await db()
  const [s, posts, projects] = await Promise.all([
    payload.findGlobal({ slug: 'settings' }),
    payload.find({ collection: 'posts', sort: '-date', limit: 4, depth: 0 }),
    payload.find({ collection: 'projects', sort: '-year', limit: 3, depth: 0 }),
  ])
  const hero = pic({ image: s.heroImage, imageUrl: s.heroImageUrl }, 'full')
  const [first, ...rest] = posts.docs
  return (
    <>
      <section className="hero">
        {hero && <img className="hero-img" src={hero} alt="" fetchPriority="high" referrerPolicy="no-referrer" />}
        <div className="wrap hero-in">
          <p className="hero-where">Brańszczyk · gmina Wyszków · od 2012 roku</p>
          <h1 className="display">{s.heroTitle}</h1>
          <p className="lead">{s.heroText}</p>
          <div className="cta-row">
            <Link className="btn btn-accent" href="/aktualnosci">Co robimy</Link>
            <Link className="btn btn-line" href="/wypozyczalnia">Kajaki i rowery</Link>
          </div>
        </div>
      </section>

      <section className="section"><div className="wrap">
        <div className="pillars">
          {(s.pillars || []).map((p: any) => (
            <Link key={p.id} href={p.href || '/o-fundacji'} className="pillar">
              <h2 className="h3">{p.title}</h2>
              <p>{p.body}</p>
              <span className="textlink">Więcej</span>
            </Link>
          ))}
        </div>
      </div></section>

      {first && (
        <section className="section tint"><div className="wrap">
          <div className="sechead">
            <div><p className="kicker">Aktualności</p><h2 className="h2">Co się ostatnio działo</h2></div>
            <Link className="textlink" href="/aktualnosci">Wszystkie wpisy</Link>
          </div>
          <div className="posts-lead">
            <Link href={`/aktualnosci/${first.slug}`} className="post-big">
              {pic(first) && <img src={pic(first, 'full')} alt="" loading="lazy" referrerPolicy="no-referrer" />}
              <span className="post-big-body">
                <span className="post-date">{dateLong(first.date)}</span>
                <b>{first.title}</b>
                <span>{first.lead}</span>
              </span>
            </Link>
            <div className="posts-side">{rest.map((p) => <PostCard key={p.id} p={p} compact />)}</div>
          </div>
        </div></section>
      )}

      <section className="section"><div className="wrap split">
        <div>
          <p className="kicker">Projekty</p>
          <h2 className="h2">Zadania publiczne, które prowadzimy</h2>
          <p className="lead">Od 2015 roku realizujemy zadania zlecane przez Gminę Wyszków w otwartych konkursach ofert: pedagogikę osiedlową i ulicy, a od 2019 roku projekt „Juklandia”. Wybrane projekty z latami i kwotami dofinansowania są na osobnej stronie.</p>
          <div className="cta-row"><Link className="btn btn-solid" href="/projekty">Lista projektów</Link></div>
        </div>
        <ol className="projlist">
          {projects.docs.map((p) => (
            <li key={p.id}>
              <span className="proj-year">{p.year}</span>
              <span><b>{p.name}</b><small>{p.funder}{p.amount ? ` · ${zl(p.amount)}` : ''}</small></span>
            </li>
          ))}
        </ol>
      </div></section>

      <section className="section navy"><div className="wrap split">
        <div>
          <p className="kicker">Wypożyczalnia społeczna</p>
          <h2 className="h2">12 kajaków i 20 rowerów w barwach Wyszkowa</h2>
          <p className="lead">{s.rentalIntro}</p>
          <div className="cta-row"><Link className="btn btn-accent" href="/wypozyczalnia">Zapytaj o termin</Link></div>
        </div>
        {s.rentalImageUrl && <img src={s.rentalImageUrl} alt="Kajaki fundacji na brzegu Bugu" className="rental-img" loading="lazy" referrerPolicy="no-referrer" />}
      </div></section>
    </>
  )
}

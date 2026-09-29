import Link from 'next/link'
import { pic, dateLong } from '@/lib/data'

export function PostCard({ p, compact }: { p: any; compact?: boolean }) {
  const img = pic(p)
  return (
    <Link href={`/aktualnosci/${p.slug}`} className={'post' + (compact ? ' post-compact' : '')}>
      {img && <span className="post-ph"><img src={img} alt="" loading="lazy" referrerPolicy="no-referrer" /></span>}
      <span className="post-body">
        <span className="post-date">{dateLong(p.date)}</span>
        <b>{p.title}</b>
        {!compact && <span>{p.lead}</span>}
      </span>
    </Link>
  )
}

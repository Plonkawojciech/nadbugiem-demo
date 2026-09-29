import { getPayload } from 'payload'
import config from '@payload-config'

export const db = () => getPayload({ config })

export type Img = { url?: string | null; alt?: string | null; sizes?: { thumb?: { url?: string | null }; card?: { url?: string | null } } } | number | null | undefined

export const imgUrl = (m: Img, size: 'thumb' | 'card' | 'full' = 'card') => {
  if (!m || typeof m === 'number') return ''
  if (size === 'full') return m.url || ''
  return m.sizes?.[size]?.url || m.url || ''
}
export const pic = (doc: { image?: Img; imageUrl?: string | null }, size: 'thumb' | 'card' | 'full' = 'card') => imgUrl(doc.image, size) || doc.imageUrl || ''
export const gallery = (doc: { gallery?: Img[] | null; galleryUrls?: { url: string }[] | null }) => [
  ...((doc.gallery || []).map((g) => imgUrl(g, 'card')).filter(Boolean) as string[]),
  ...((doc.galleryUrls || []).map((g) => g.url)),
]
export const zl = (n: number | null | undefined) => (typeof n === 'number' ? n.toLocaleString('pl-PL') + ' zł' : '')
export const dateLong = (d?: string | null) => (d ? new Date(d).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }) : '')

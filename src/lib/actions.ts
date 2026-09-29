'use server'
import { db } from './data'

export type FormState = { ok: boolean; message: string }
const KINDS = new Set(['rental', 'volunteer', 'support', 'message'])

export async function createInquiry(_prev: FormState, form: FormData): Promise<FormState> {
  const kind = String(form.get('kind') || 'message')
  const name = String(form.get('name') || '').trim().slice(0, 120)
  const organization = String(form.get('organization') || '').trim().slice(0, 160)
  const phone = String(form.get('phone') || '').trim().slice(0, 40)
  const email = String(form.get('email') || '').trim().slice(0, 160)
  const date = String(form.get('date') || '') || undefined
  const kayaks = Number(form.get('kayaks')) || undefined
  const bikes = Number(form.get('bikes')) || undefined
  const message = String(form.get('message') || '').trim().slice(0, 4000)
  if (!name || !email) return { ok: false, message: 'Podaj imię i nazwisko oraz e-mail.' }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, message: 'Sprawdź adres e-mail.' }
  if (phone && !(/^\+?[\d\s()-]{7,20}$/.test(phone) && phone.replace(/\D/g, '').length >= 7)) return { ok: false, message: 'Sprawdź numer telefonu.' }
  if ((kayaks && (kayaks < 0 || kayaks > 12)) || (bikes && (bikes < 0 || bikes > 20))) return { ok: false, message: 'Mamy 12 kajaków i 20 rowerów.' }
  const payload = await db()
  try {
  await payload.create({
    collection: 'inquiries',
    data: { kind: (KINDS.has(kind) ? kind : 'message') as 'rental' | 'volunteer' | 'support' | 'message', name, organization, phone, email, date, kayaks, bikes, message },
  })
  } catch {
    return { ok: false, message: 'Nie udało się zapisać zgłoszenia. Napisz na fundacjanadbugiem@gmail.com.' }
  }
  return {
    ok: true,
    message: kind === 'rental' ? 'Zgłoszenie trafiło do wypożyczalni. Fundacja skontaktuje się, żeby potwierdzić termin oraz liczbę kajaków i rowerów.' : 'Wiadomość dotarła do fundacji.',
  }
}

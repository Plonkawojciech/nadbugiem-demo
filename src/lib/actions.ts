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
  const payload = await db()
  await payload.create({
    collection: 'inquiries',
    data: { kind: (KINDS.has(kind) ? kind : 'message') as 'rental' | 'volunteer' | 'support' | 'message', name, organization, phone, email, date, kayaks, bikes, message },
  })
  return {
    ok: true,
    message: kind === 'rental' ? 'Zgłoszenie trafiło do wypożyczalni. Artur oddzwoni i potwierdzi termin oraz liczbę sprzętu.' : 'Wiadomość dotarła. Odpowiadamy w ciągu kilku dni, zwykle szybciej.',
  }
}

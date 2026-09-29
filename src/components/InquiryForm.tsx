'use client'
import { useActionState } from 'react'
import { createInquiry, type FormState } from '@/lib/actions'

const KINDS: [string, string][] = [['rental', 'Wypożyczalnia kajaków i rowerów'], ['volunteer', 'Wolontariat'], ['support', 'Chcę wesprzeć fundację'], ['message', 'Inna sprawa']]

export function InquiryForm({ kind = 'message', rental }: { kind?: string; rental?: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(createInquiry, { ok: false, message: '' })
  if (state.ok) return <div className="done"><strong>Dziękujemy.</strong> {state.message}</div>
  return (
    <form action={action} className="form">
      {rental ? <input type="hidden" name="kind" value="rental" /> : (
        <label>W jakiej sprawie
          <select name="kind" defaultValue={kind}>{KINDS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
        </label>
      )}
      <div className="form-row">
        <label>Imię i nazwisko<input name="name" required autoComplete="name" /></label>
        <label>Organizacja lub grupa<input name="organization" autoComplete="organization" placeholder="szkoła, świetlica, stowarzyszenie" /></label>
      </div>
      <div className="form-row">
        <label>E-mail<input name="email" type="email" required autoComplete="email" /></label>
        <label>Telefon<input name="phone" type="tel" autoComplete="tel" /></label>
      </div>
      {rental && (
        <div className="form-row three">
          <label>Termin<input name="date" type="date" /></label>
          <label>Kajaki<input name="kayaks" type="number" min={0} max={12} inputMode="numeric" /></label>
          <label>Rowery<input name="bikes" type="number" min={0} max={20} inputMode="numeric" /></label>
        </div>
      )}
      <label>Wiadomość<textarea name="message" rows={4} placeholder={rental ? 'Skąd grupa, ile osób, czy potrzebna trasa i opieka' : ''} /></label>
      {state.message && !state.ok && <p className="form-err">{state.message}</p>}
      <button className="btn btn-accent" disabled={pending}>{pending ? 'Wysyłanie…' : rental ? 'Wyślij zapytanie' : 'Wyślij wiadomość'}</button>
      <p className="note">{rental ? 'Mamy 12 kajaków i 20 rowerów. Grupy z sektora pomocy i integracji społecznej mogą liczyć na zniżki.' : 'Zgłoszenie trafia do panelu fundacji, bez pośredników.'}</p>
    </form>
  )
}

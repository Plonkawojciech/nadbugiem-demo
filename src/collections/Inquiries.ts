import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: 'Zgłoszenie', plural: 'Zgłoszenia' },
  admin: {
    useAsTitle: 'name',
    group: 'Kontakt',
    defaultColumns: ['name', 'kind', 'organization', 'phone', 'date', 'status', 'createdAt'],
    description: 'Zapytania o wypożyczalnię, wolontariat, wsparcie i wiadomości ogólne — wszystko w jednym miejscu.',
  },
  access: { create: () => false, read: ({ req }) => !!req.user },
  fields: [
    {
      name: 'kind', label: 'Rodzaj', type: 'select', required: true, defaultValue: 'rental',
      options: [
        { label: 'Wypożyczalnia kajaków i rowerów', value: 'rental' }, { label: 'Wolontariat', value: 'volunteer' },
        { label: 'Wsparcie fundacji', value: 'support' }, { label: 'Wiadomość', value: 'message' },
      ],
    },
    { name: 'name', label: 'Imię i nazwisko', type: 'text', required: true },
    { name: 'organization', label: 'Organizacja / grupa', type: 'text' },
    { type: 'row', fields: [
      { name: 'phone', label: 'Telefon', type: 'text' },
      { name: 'email', label: 'E-mail', type: 'email', required: true },
    ] },
    { type: 'row', fields: [
      { name: 'date', label: 'Termin', type: 'date', admin: { width: '34%', date: { displayFormat: 'd MMM yyyy' } } },
      { name: 'kayaks', label: 'Kajaki', type: 'number', admin: { width: '33%' } },
      { name: 'bikes', label: 'Rowery', type: 'number', admin: { width: '33%' } },
    ] },
    { name: 'message', label: 'Wiadomość', type: 'textarea' },
    {
      name: 'status', label: 'Status', type: 'select', defaultValue: 'new', admin: { position: 'sidebar' },
      options: [{ label: 'Nowe', value: 'new' }, { label: 'Odpowiedziano', value: 'answered' }, { label: 'Umówione', value: 'booked' }, { label: 'Zamknięte', value: 'closed' }],
    },
  ],
}

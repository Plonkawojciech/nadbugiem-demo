import type { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: { singular: 'Osoba', plural: 'Zespół i zarząd' },
  admin: { useAsTitle: 'name', group: 'Treści', defaultColumns: ['name', 'role', 'phone', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'name', label: 'Imię i nazwisko', type: 'text', required: true },
    { type: 'row', fields: [
      { name: 'role', label: 'Funkcja', type: 'text', required: true },
      { name: 'phone', label: 'Telefon', type: 'text' },
      { name: 'email', label: 'E-mail', type: 'email' },
    ] },
    { name: 'bio', label: 'Kilka zdań', type: 'textarea' },
    { name: 'imageUrl', label: 'Zdjęcie (URL)', type: 'text' },
    { name: 'image', label: 'Zdjęcie (plik)', type: 'upload', relationTo: 'media' },
    { name: 'order', label: 'Kolejność', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}

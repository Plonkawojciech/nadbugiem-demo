import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Projekt', plural: 'Projekty' },
  admin: { useAsTitle: 'name', group: 'Treści', defaultColumns: ['name', 'year', 'funder', 'amount'] },
  access: { read: () => true },
  fields: [
    { name: 'name', label: 'Nazwa projektu', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'year', label: 'Rok', type: 'number', required: true, admin: { width: '20%' } },
        { name: 'funder', label: 'Zleceniodawca / źródło', type: 'text', admin: { width: '50%' } },
        { name: 'amount', label: 'Kwota dofinansowania (zł)', type: 'number', admin: { width: '30%' } },
      ],
    },
    { name: 'basis', label: 'Podstawa (konkurs, ustawa)', type: 'text' },
    { name: 'body', label: 'Opis', type: 'textarea' },
    { name: 'current', label: 'W trakcie realizacji', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}

import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: { singular: 'Darczyńca / partner', plural: 'Darczyńcy i partnerzy' },
  admin: { useAsTitle: 'name', group: 'Treści', defaultColumns: ['name', 'kind', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'name', label: 'Nazwa', type: 'text', required: true },
    { type: 'row', fields: [
      { name: 'kind', label: 'Rodzaj', type: 'select', options: [{ label: 'Zleceniodawca', value: 'funder' }, { label: 'Darczyńca', value: 'donor' }, { label: 'Partner', value: 'partner' }], defaultValue: 'partner' },
      { name: 'url', label: 'Strona (URL)', type: 'text' },
    ] },
    { name: 'logoUrl', label: 'Logo (URL)', type: 'text' },
    { name: 'logo', label: 'Logo (plik)', type: 'upload', relationTo: 'media' },
    { name: 'order', label: 'Kolejność', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}

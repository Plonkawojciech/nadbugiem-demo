import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Ustawienia strony',
  admin: { group: 'Treści' },
  access: { read: () => true },
  fields: [
    { name: 'banner', label: 'Pasek na górze strony', type: 'text' },
    { name: 'heroTitle', label: 'Nagłówek strony głównej', type: 'text' },
    { name: 'heroText', label: 'Tekst pod nagłówkiem', type: 'textarea' },
    { name: 'heroImageUrl', label: 'Zdjęcie w hero (URL)', type: 'text' },
    { name: 'heroImage', label: 'Zdjęcie w hero (plik)', type: 'upload', relationTo: 'media' },
    { name: 'mission', label: 'Misja (2–3 zdania)', type: 'textarea' },
    {
      name: 'pillars', label: 'Trzy filary działania', type: 'array', labels: { singular: 'Filar', plural: 'Filary' },
      fields: [
        { name: 'title', label: 'Nagłówek', type: 'text', required: true },
        { name: 'body', label: 'Treść', type: 'textarea', required: true },
        { name: 'href', label: 'Link', type: 'text' },
      ],
    },
    { name: 'history', label: 'Historia (O fundacji)', type: 'textarea' },
    { name: 'rentalIntro', label: 'Wypożyczalnia — wstęp', type: 'textarea' },
    { name: 'rentalKayaks', label: 'Wypożyczalnia — kajaki', type: 'textarea' },
    { name: 'rentalBikes', label: 'Wypożyczalnia — rowery', type: 'textarea' },
    { name: 'rentalImageUrl', label: 'Wypożyczalnia — zdjęcie (URL)', type: 'text' },
    { type: 'row', fields: [
      { name: 'phone', label: 'Telefon', type: 'text' },
      { name: 'email', label: 'E-mail', type: 'email' },
    ] },
    { name: 'address', label: 'Adres', type: 'textarea' },
    { name: 'krs', label: 'KRS', type: 'text' },
    { name: 'registered', label: 'Data rejestracji', type: 'text' },
    { name: 'facebook', label: 'Facebook (URL)', type: 'text' },
    { name: 'facebookStreet', label: 'Facebook streetworkingu (URL)', type: 'text' },
  ],
}

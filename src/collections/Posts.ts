import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Aktualność', plural: 'Aktualności' },
  admin: { useAsTitle: 'title', group: 'Treści', defaultColumns: ['title', 'date', 'project', 'featured'] },
  access: { read: () => true },
  fields: [
    { name: 'title', label: 'Tytuł', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'slug', label: 'Adres (slug)', type: 'text', required: true, unique: true, admin: { width: '50%' } },
        { name: 'date', label: 'Data wydarzenia', type: 'date', required: true, admin: { width: '25%', date: { displayFormat: 'd MMM yyyy' } } },
        { name: 'author', label: 'Autor', type: 'text', admin: { width: '25%' } },
      ],
    },
    { name: 'lead', label: 'Zajawka', type: 'textarea', required: true },
    { name: 'body', label: 'Treść', type: 'textarea', required: true },
    { name: 'project', label: 'W ramach projektu', type: 'text', admin: { description: 'np. „JulKlandia. Pedagogika niekonwencjonalna w 2026 roku” — zadanie zlecone przez Gminę Wyszków' } },
    { name: 'imageUrl', label: 'Zdjęcie główne (URL)', type: 'text' },
    { name: 'image', label: 'Zdjęcie główne (plik)', type: 'upload', relationTo: 'media' },
    { name: 'galleryUrls', label: 'Galeria (adresy URL)', type: 'array', labels: { singular: 'Zdjęcie', plural: 'Zdjęcia' }, fields: [{ name: 'url', label: 'URL', type: 'text', required: true }] },
    { name: 'gallery', label: 'Galeria (pliki)', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'featured', label: 'Wyróżnij na stronie głównej', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}

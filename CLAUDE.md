# nadbugiem-demo

Demo nowej strony dla Fundacji Nad Bugiem (Brańszczyk; streetworking w gminie Wyszków, społeczna wypożyczalnia
kajaków i rowerów). Lead w CRM: „Fundacja Nad Bugiem”, tel. 29 679 41 17. Next.js 16 + Payload CMS 3 (SQLite):
front i panel `/admin`.

- Dev: `pnpm dev` (port 3015). Seed: `pnpm seed` (pomija, gdy dane już są; `--force` dokłada).
- **Zakres celowo mały — to demo, nie migracja.** Strona główna, aktualności z galeriami (6 wpisów klienta),
  projekty z kwotami (lista klienta), wypożyczalnia z formularzem zapytania, o fundacji (zarząd, historia), kontakt.
- Kolekcje: `src/collections/*` (Aktualności, Projekty, Zespół, Partnerzy, Zgłoszenia, Media, Użytkownicy) + global
  `Ustawienia strony` (hero, filary, historia, wypożyczalnia, kontakt).
- Treść 1:1 ze strony fundacjanadbugiem.pl (skróty redakcyjne). Liczby: 12 kajaków, 20 rowerów, kwoty dofinansowań
  i daty pochodzą od klienta. Numer KRS nieznany — pole puste.
- Zdjęcia i loga darczyńców: hotlink z fundacjanadbugiem.pl (`imageUrl`, `galleryUrls`, `logoUrl`); po wdrożeniu
  pola upload mają pierwszeństwo.
- Design: `docs/plan-demo.md`. System w `src/app/(site)/globals.css` (Sora + Figtree, granat #16324F, czerwień).
- Zmiana schematu: `pnpm exec payload migrate:create <nazwa>`, commit `src/migrations/`. `push: false`.
- Deploy: Coolify (projekt `nadbugiem-demo`, Dockerfile), domena `fundacjanadbugiem.programo.pl`, wolumen `/data`.
- Panel demo: `demo@fundacjanadbugiem.pl` / `nadbugiem2026`.

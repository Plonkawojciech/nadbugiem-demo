# Demo Fundacja Nad Bugiem — plan (2026-09-29)

Klient (lead w CRM): Fundacja Nad Bugiem, ul. Jana Pawła II 10, 07-221 Brańszczyk, tel. (29) 679 41 17,
fundacjanadbugiem@gmail.com. Prezes Andrzej Grajczyk (tel. 691 801 440), wypożyczalnia: Artur Laskowski (691 801 220).
Działalność: streetworking (pedagogika niekonwencjonalna) w gminie Wyszków od 2015 r. na zlecenie Gminy Wyszków
(projekt „JulKlandia”), społeczna wypożyczalnia 12 kajaków i 20 rowerów, spływy z lekcją historii („Spływ Czarnobylski”).
Obecna strona: własny CMS Infostrony, bootstrap 3, bez responsywności na małych ekranach, brak meta, brak analityki.
Notatka z rozmowy (12.09): wysłać demo do piątku, oddzwonić po tygodniu.

## Co pokazuje demo
- Strona główna: co robi fundacja (trzy filary: streetworking, wypożyczalnia, projekty), ostatnie aktualności ze zdjęciami,
  darczyńcy i partnerzy (loga z obecnej strony), kontakt.
- Aktualności z galerią (treść i zdjęcia klienta, 6 wpisów z 2025–2026).
- Projekty z dofinansowaniem (kwoty i lata ze strony klienta).
- Wypożyczalnia: kajaki i rowery, formularz zapytania dla grup (kolekcja Zapytania).
- O fundacji: historia, zarząd (stan na 1 marca 2026), ludzie.
- Panel: aktualności, projekty, zespół, partnerzy, zapytania — bez informatyka.

## Decyzje projektowe
- Paleta „Bug o zmierzchu”: granat #16324F (tekst i tło stopki), niebo #EAF1F8 (tło sekcji), biel, akcent czerwień kajaka
  z ich plakatu #C8322B (tylko przyciski i podkreślenia), szary #5B6673. Bez fioletu, bez gradientów.
- Kroje: Sora (nagłówki, wyraziste) + Figtree (tekst). Nagłówki ciężkie, dużo światła.
- Element wyróżniający: pasek „Rok · projekt · zleceniodawca · kwota” w Projektach jak w sprawozdaniu, oraz galerie
  aktualności w mozaice — zdjęcia klienta robią robotę.
- Zero emoji, zero zmyślonych liczb; „12 kajaków i 20 rowerów”, kwoty dofinansowań i daty pochodzą ze strony klienta.

## Zakres techniczny
Next.js 16 + Payload 3 (SQLite). Kolekcje: Aktualności, Projekty, Zespół, Partnerzy, Zapytania, Media, Użytkownicy;
global Ustawienia. Strony: /, /aktualnosci, /aktualnosci/[slug], /projekty, /wypozyczalnia, /o-fundacji, /kontakt.
Panel: /admin (demo@fundacjanadbugiem.pl / nadbugiem2026).

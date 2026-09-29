/* Seed demo Fundacja Nad Bugiem — treść, daty, kwoty i zdjęcia pochodzą z fundacjanadbugiem.pl (stan 29.09.2026).
   Zakres celowo mały: 6 aktualności, projekty z listy klienta, zarząd, darczyńcy. */
import { getPayload } from 'payload'
import config from '../src/payload.config'

const F = 'https://fundacjanadbugiem.pl/'
const G = (dir: string, ids: number[]) => ids.map((i) => ({ url: `${F}pliki/upload/galerie/${dir}/00${i}_foto.jpg` }))
const JUL = 'Zorganizowane przez Fundację Nad Bugiem w ramach projektu „JulKlandia. Pedagogika niekonwencjonalna w 2026 roku” — zadania z zakresu zdrowia publicznego zleconego przez Gminę Wyszków.'

async function main() {
  const payload = await getPayload({ config })
  if ((await payload.count({ collection: 'posts' })).totalDocs > 0 && !process.argv.includes('--force')) {
    console.log('[seed] dane już są, pomijam')
    process.exit(0)
  }
  if ((await payload.count({ collection: 'users' })).totalDocs === 0) {
    await payload.create({ collection: 'users', data: { email: 'demo@fundacjanadbugiem.pl', password: 'nadbugiem2026', name: 'Fundacja Nad Bugiem' } })
    console.log('[seed] konto demo@fundacjanadbugiem.pl / nadbugiem2026')
  }

  const posts: any[] = [
    { title: 'Wyjazd do królewskiej rezydencji', slug: 'wyjazd-do-krolewskiej-rezydencji', date: '2026-06-20', featured: true, project: JUL,
      imageUrl: F + 'pliki/upload/galerie/0046/00986_foto.jpg', galleryUrls: G('0046', [986, 987, 988, 989, 990, 991]),
      lead: 'Nie samym survivalem, fortami czy bagnami żyjemy. Od czasu do czasu wybieramy się z młodzieżą także w takie miejsca, jak Muzeum Pałac w Wilanowie.',
      body: 'Wyjazd do siedziby króla Jana III Sobieskiego był zwieńczeniem kilku naszych spotkań z cyklu „pogaduchy o historii”, podczas których dużo rozmawialiśmy o husarii, jeździe pancernej, ich taktyce oraz bitwach. Nie zabrakło wątku Wiktorii Wiedeńskiej, bitwy pod Parkanami oraz nowinek taktycznych wprowadzonych do naszych wojsk przez króla Jana.\n\nTu mogliśmy dotknąć niemal bezpośrednio historii, o której dyskutowaliśmy. Tym bardziej, że wzięliśmy udział w warsztatach fechtunku prowadzonych przez dwóch zawodowych instruktorów. Były niespodziewaną, dodatkową atrakcją, która spodobała się do tego stopnia, że po kilku nieśmiałych ruchach zasłon i cięć trudno było przerwać lekcję. Zwiedzanie pałacu, jego bogato zdobionych wnętrz, było ciekawsze za sprawą audioprzewodników.\n\nUczestnicy w drodze powrotnej podkreślali znaczenie tej lekcji historii i podsuwali nowe tematy z pytaniem, czy na zakończenie ich omawiania zorganizujemy kolejne wycieczki. Aż się boimy, żeby nie poruszyli tematu bitwy o Anglię.' },
    { title: 'Spływ Czarnobylski', slug: 'splyw-czarnobylski', date: '2026-05-30', featured: true, project: JUL,
      imageUrl: F + 'pliki/upload/galerie/0045/00967_foto.jpg', galleryUrls: G('0045', [967, 968, 969, 970, 971, 972]),
      lead: 'W 106. rocznicę bitwy polskich okrętów z bolszewickimi pod Czarnobylem zorganizowaliśmy kolejny, dwunasty spływ kajakowy z lekcją historii na wodzie.',
      body: 'Dzieje się tak już od 2014 roku. Takie spływy organizujemy głównie z myślą o młodzieży, szczególnie tej uczestniczącej w zajęciach streetworkerskich, ale nie brakuje na nich instruktorów i zawodników z Kuźni Mistrzów Wyszków oraz osób interesujących się jednocześnie kajakarstwem i historią Polski.\n\nSama bitwa, jej przebieg i geneza są do dziś bardzo mało znane, a Czarnobyl kojarzy się głównie z katastrofą w elektrowni jądrowej. Nazwa bitwy została dopiero w 1991 roku wpisana na jedną z tablic Grobu Nieznanego Żołnierza w Warszawie. Dwa polskie monitory rzeczne z trzema działami, wspierane przez trzy motorówki, zmierzyły się z pięcioma kanonierkami mającymi czternaście dział. Jeden bolszewicki okręt zatopiony, dwa poważnie uszkodzone, siły radzieckie wycofały się z Prypeci. Po stronie polskiej obyło się bez strat.\n\nWspomnienie przebiegu bitwy jak zawsze było kluczowym elementem spływu. Po nim nastąpiło uroczyste zwodowanie wieńca przygotowanego przez dziewczęta pod kierunkiem streetworkerki Joanny, w hołdzie polskim marynarzom. Dziękujemy wszystkim uczestnikom za zaangażowanie i dyscyplinę.' },
    { title: 'Szkoła survivalu', slug: 'szkola-survivalu', date: '2026-04-30',
      imageUrl: F + 'pliki/upload/galerie/0044/00946_foto.jpg', galleryUrls: G('0044', [946, 947, 948, 949, 950, 951]),
      lead: 'Streetworker Andrzej Grajczyk i Piotr Ossliński wzięli udział razem z instruktorem survivalu Radosławem Grajczykiem w całodniowym biwaku w Kampinoskim Parku Narodowym. Uczyli skautów technik szkoły przetrwania.',
      body: 'W szkoleniu wzięła udział ponad setka uczestników, w zdecydowanej większości mocno zainteresowanych zdobyciem wiedzy i wcielaniem jej w życie, najlepiej od razu, jeszcze w trakcie omawiania poszczególnych technik. Ilu było uczestników, tyle zanosiło się na ognisk, bo każdy chciał rozpalić je samodzielnie. Zapędy młodych adeptów studził Piotr, uspokajając emocje opowieściami.\n\nMłodzi adepci survivalu pochodzili z Płocka, Niepokalanowa, Lasek, Łomianek i kilku mniejszych miejscowości. Dzień i wieczór spędzili w sposób, który na długo zapadnie im w pamięć. Nam jest bardzo miło, że mogliśmy reprezentować Wyszków i podzielić się technikami survivalowymi, na których opieramy działania streetworkerskie.' },
    { title: 'Aquaparkowy relaks', slug: 'aquaparkowy-relaks', date: '2026-05-29', project: JUL,
      lead: 'Tym razem zero presji i wysiłku, zero stawianych zadań. Luz i rekreacja w Aquaparku Łódź.',
      body: 'To był wypad w nagrodę za dotychczasowe zaangażowanie w spotkania i zajęcia streetworkerskie.' },
    { title: 'Kulig', slug: 'kulig-2026', date: '2026-02-10', author: 'Andrzej Grajczyk', project: 'Kulig został zorganizowany przez Fundację Nad Bugiem w ramach projektu „JulKlandia. Pedagogika niekonwencjonalna w 2026 roku” — zadania z zakresu zdrowia publicznego zleconego przez Gminę Wyszków.',
      imageUrl: F + 'pliki/upload/galerie/0042/00922_foto.jpg', galleryUrls: G('0042', [922, 923, 924, 925, 926, 927]),
      lead: 'Jak to w ferie, choć u nas nie tylko w ferie: od pomysłu do przemysłu droga krótka. Śnieg, mróz, sanie, sanki i żywy koń.',
      body: 'Plan wypadu przygotowany, ustalam szczegóły z Arturem Laskowskim, a tu jakby coś walnęło. „Andrzej, fajna pogoda, nie wiadomo, ile śnieg się utrzyma, chodź, zrobimy młodzieży frajdę i zorganizujemy kulig?” Śniegu dawno nie było, nie wiadomo, kiedy będzie znowu. Dobra, może być.\n\nMłodzież entuzjazmem nie tryska, ja się waham, Artur zawzięty. Do młodych docieramy osobiście i jest komplet chętnych. Jak się później okazało, to chyba nie bardzo wiedzieli, co to takiego ten kulig.\n\nTemperatura około zera, lekka mgiełka, sanie, sanki i żywy koń. Pani Joanna z uśmiechem wita wszystkich. Zaczyna się bitwa śnieżkami, przewrotki, zjazdy na sankach, ognisko, kiełbaska i niesamowite wrażenie, o czym każdy powiedział na zakończenie: „Nie mieliśmy pojęcia, że będzie tak fajnie!”. Szczerze? Też nie miałem pojęcia, że pomysł Artura będzie strzałem w dziesiątkę.' },
    { title: 'Wyszkowski streetworking', slug: 'wyszkowski-streetworking', date: '2025-10-28',
      imageUrl: F + 'pliki/2025/Streetworking-wiadomo%C5%9B%C4%87_g%C5%82%C3%B3wna_ikona.jpg',
      lead: 'Streetworking, czyli pedagogika niekonwencjonalna na ulicach, osiedlach i w terenie otwartym, to działania z dziećmi i młodzieżą, którzy tracą wiarę w to, że są wartościowi i mogą wiele osiągnąć.',
      body: 'Pedagodzy poświęcają im swój czas, okazują zainteresowanie każdemu z osobna i pomagają w samodzielnym rozwiązywaniu problemów. Nie robią tego tylko przemawiając i przekonując, ale przede wszystkim proponując wspólne, atrakcyjne i twórcze spędzanie czasu: spacery, rajdy piesze i rowerowe, spływy kajakowe, wycieczki tam, gdzie młodzi jeszcze nigdy nie byli, i w formie, której sami by nie doświadczyli.\n\nWszystkie działania wyszkowskich streetworkerów są opisywane na Facebooku, a wybrane, bardziej spektakularne, publikujemy w aktualnościach. Wyszkowski streetworking jest realizowany od 2009 roku, początkowo przez Stowarzyszenie Inicjatyw Społecznych WIATRAK, a od 2015 roku przez Fundację Nad Bugiem na zlecenie Gminy Wyszków, w ramach zadań publicznych zlecanych organizacjom pozarządowym.' },
  ]
  for (const p of posts) await payload.create({ collection: 'posts', data: p })
  console.log('[seed] aktualności:', posts.length)

  const KONK = 'Otwarty konkurs ofert Burmistrza Wyszkowa, art. 14 ust. 1 ustawy z 11 września 2015 r. o zdrowiu publicznym'
  const projects: any[] = [
    { year: 2026, name: 'JulKlandia. Pedagogika niekonwencjonalna w 2026 roku', funder: 'Gmina Wyszków', basis: 'Zadanie z zakresu zdrowia publicznego', current: true, body: 'Spływ Czarnobylski, kulig, wyjazdy do Wilanowa i Aquaparku Łódź oraz bieżące zajęcia streetworkerskie.' },
    { year: 2021, name: 'Juklandia. Pedagogika niekonwencjonalna w Gminie Wyszków w 2021 roku', funder: 'Gmina Wyszków', amount: 89250, basis: KONK },
    { year: 2020, name: 'Juklandia. Pedagogika niekonwencjonalna w Gminie Wyszków w 2020 roku', funder: 'Gmina Wyszków', amount: 89250, basis: KONK },
    { year: 2019, name: 'Juklandia. Pedagogika niekonwencjonalna w Gminie Wyszków w 2019 roku', funder: 'Gmina Wyszków', amount: 85000, basis: KONK },
    { year: 2018, name: 'Pedagogika osiedlowa i ulicy w Wyszkowie w 2018 roku', funder: 'Gmina Wyszków', amount: 57000, basis: 'Otwarty konkurs ofert na realizację zadań pożytku publicznego z zakresu przeciwdziałania patologiom społecznym' },
    { year: 2017, name: 'Pedagogika osiedlowa i ulicy w Wyszkowie w 2017 roku', funder: 'Gmina Wyszków', amount: 57000, basis: 'Otwarty konkurs ofert na realizację zadań pożytku publicznego z zakresu przeciwdziałania patologiom społecznym' },
    { year: 2016, name: 'Pedagogika osiedlowa i ulicy w Wyszkowie w 2016 roku', funder: 'Gmina Wyszków', amount: 57000, basis: 'Otwarty konkurs ofert na realizację zadań pożytku publicznego z zakresu przeciwdziałania patologiom społecznym' },
    { year: 2015, name: 'Pedagogika osiedlowa i ulicy w Wyszkowie w 2015 roku', funder: 'Gmina Wyszków', amount: 57000, basis: 'Otwarty konkurs ofert na realizację zadań pożytku publicznego z zakresu przeciwdziałania patologiom społecznym' },
    { year: 2014, name: '„U sąsiada za miedzą” — widowisko folklorystyczne Zespołu Pieśni i Tańca „Oberek”', funder: 'Gmina Wyszków', amount: 7000, basis: 'Zadanie „Prowadzenie zespołów tanecznych, wokalnych, rockowych”', body: 'Tańce, pieśni, przyśpiewki i gadki z terenów Puszczy Białej oraz sąsiednich Puszczy Zielonej i Podlasia, 1.01–31.12.2014.' },
    { year: 2013, name: '„Się Dzieje!” Wyszkowski Inkubator Pozarządowy — projekt, w którym powstała fundacja', funder: 'Fundacja rower.com, Europejski Fundusz Społeczny (PO KL 5.4.2)', basis: 'Projekt realizowany XI 2011 – XI 2013 przez Fundację rower.com; Fundacja Nad Bugiem powstała w jego ramach', body: 'Rozwój dialogu obywatelskiego i potencjału trzeciego sektora w powiecie wyszkowskim.' },
  ]
  for (const p of projects) await payload.create({ collection: 'projects', data: p })
  console.log('[seed] projekty:', projects.length)

  const team: any[] = [
    { name: 'Andrzej Grajczyk', role: 'Prezes zarządu, pedagog ulicy', phone: '691 801 440', email: 'andrzejgrajczyk@wp.pl', order: 1, imageUrl: F + 'pliki/oferta/andrzej.jpg',
      bio: 'Główny realizator projektów pedagogiki ulicy w Wyszkowie od 2008 roku, absolwent szkolenia z pedagogiki ulicy w programie „Partnerstwo dla Dzieci” Fundacji Wspólna Droga. Instruktor sztuk walki, założyciel i trener sekcji karate prowadzonej od 1991 roku. Organizator spływów kajakowych, zajęć survivalowych, nocnych marszów i wycieczek kondycyjno-krajoznawczych.' },
    { name: 'Anna Brajczewska', role: 'Wiceprezes zarządu', order: 2 },
    { name: 'Alicja Kasińska', role: 'Wiceprezes zarządu', order: 3 },
    { name: 'Danuta Laskowska', role: 'Fundatorka', order: 4, imageUrl: F + 'pliki/oferta/danusia.jpg',
      bio: 'Absolwentka socjologii na Uniwersytecie Jagiellońskim, pracowała w Instytucie Matki i Dziecka, Warszawskim Hospicjum dla Dzieci i Urzędzie m.st. Warszawy. W latach 2011–2013 animatorka społeczna w Wyszkowskim Inkubatorze Pozarządowym. Od 2015 roku związana z Domem Emeryta w Brańszczyku, obecnie jako dyrektor wykonawczy.' },
    { name: 'Artur Laskowski', role: 'Fundator, społeczna wypożyczalnia', phone: '691 801 220', email: 'artlasko@gmail.com', order: 5, imageUrl: F + 'pliki/oferta/artur.jpg',
      bio: 'Polityk społeczny, menedżer kultury i animator, pomysłodawca pracy metodą streetworkingu z „dziećmi na ulicy” w Wyszkowie. Kierownik Wyszkowskiego Inkubatora Pozarządowego (2011–2013), do 2012 roku prezes Stowarzyszenia WIATRAK, inicjator Wyszkowskiego Uniwersytetu Trzeciego Wieku i Zespołu Pieśni i Tańca „Oberek”. Od 1 marca 2026 roku zastępca Burmistrza Wyszkowa.' },
  ]
  for (const t of team) await payload.create({ collection: 'team', data: t })
  console.log('[seed] zespół:', team.length)

  const partners: any[] = [
    ['Gmina Wyszków', 'funder', 'pliki/upload/wykazy/0003_icon.jpg', 'https://www.wyszkow.pl'],
    ['Streetworking w Wyszkowie — profil na Facebooku', 'partner', 'pliki/upload/wykazy/0009_icon.jpg', 'https://www.facebook.com/streetworkingwyszkow'],
    ['Fundacja Wspólna Droga — United Way Polska', 'donor', 'pliki/upload/wykazy/0006_icon.jpg', ''],
    ['Polsko-Amerykańska Fundacja Wolności', 'donor', 'pliki/upload/wykazy/0012_icon.png', ''],
    ['Równać Szanse', 'donor', 'pliki/upload/wykazy/0011_icon.jpg', ''],
    ['Fundacja Civis Polonus', 'partner', 'pliki/upload/wykazy/0013_icon.png', ''],
    ['Centrum Księdza Orione w Brańszczyku', 'partner', 'pliki/upload/wykazy/0008_icon.jpg', ''],
    ['5 o’clock The School of English — szkoła językowa w Wyszkowie', 'partner', 'pliki/upload/wykazy/0010_icon.jpg', ''],
    ['Kapitał Ludzki — Europejski Fundusz Społeczny', 'funder', 'pliki/upload/wykazy/0002_icon.png', ''],
  ]
  let i = 0
  for (const [name, kind, logo, url] of partners) await payload.create({ collection: 'partners', data: { name, kind, logoUrl: F + logo, url: url || undefined, order: i++ } })
  console.log('[seed] partnerzy:', partners.length)

  await payload.updateGlobal({ slug: 'settings', data: {
    banner: 'Streetworking w gminie Wyszków od 2015 roku na zlecenie Gminy Wyszków.',
    heroTitle: 'Zabieramy wyszkowską młodzież tam, gdzie sama by nie trafiła',
    heroText: 'Pedagogika niekonwencjonalna na osiedlach i w terenie: spływy z lekcją historii, marsze pamięci, survival, forty i pałace. Od 2015 roku na zlecenie Gminy Wyszków. Do tego społeczna wypożyczalnia kajaków i rowerów.',
    heroImageUrl: F + 'pliki/upload/galerie/0045/00967_foto.jpg',
    mission: 'Fundacja Nad Bugiem powstała, żeby wspierać i inicjować działalność społecznie użyteczną na rzecz społeczności lokalnej. Pracujemy metodą streetworkingu z dziećmi i młodzieżą z osiedli zagrożonych marginalizacją, prowadzimy społeczną wypożyczalnię kajaków i rowerów.',
    pillars: [
      { title: 'Streetworking w Wyszkowie', body: 'Pedagodzy ulicy spędzają czas z dziećmi i młodzieżą, których nie obejmuje żadna świetlica ani klub: na osiedlach, w terenie, na spływach i wycieczkach. Realizujemy to od 2015 roku na zlecenie Gminy Wyszków.', href: '/aktualnosci' },
      { title: 'Wypożyczalnia kajaków i rowerów', body: '12 kajaków i 20 rowerów w barwach Wyszkowa. Spływy i rajdy dla zorganizowanych grup z sektora pomocy i integracji społecznej; rowery za drobną odpłatnością dla każdego.', href: '/wypozyczalnia' },
      { title: 'Projekty i zadania publiczne', body: 'Od „Się Dzieje!” po „JulKlandię”: zadania z konkursów ofert Burmistrza Wyszkowa, z latami i kwotami dofinansowania.', href: '/projekty' },
    ],
    history: 'Fundacja Nad Bugiem została ufundowana przez Danutę i Artura Laskowskich i zarejestrowana w Krajowym Rejestrze Sądowym 28 lutego 2012 roku. Siedzibą jest Brańszczyk. Fundacja powstała w ramach „Się Dzieje! Wyszkowskiego Inkubatora Pozarządowego”, projektu realizowanego od listopada 2011 do listopada 2013 roku i dofinansowanego z Europejskiego Funduszu Społecznego (Program Operacyjny Kapitał Ludzki, poddziałanie 5.4.2 „Rozwój dialogu obywatelskiego”).\n\nPierwsze wyzwania, jakie sobie postawiliśmy, to organizacja centrum wolontariatu w gminie Brańszczyk, organizacja czasu wolnego dzieci i młodzieży oraz wsparcie dla osób samotnych i schorowanych. Od 2015 roku fundacja kontynuuje wyszkowski streetworking, prowadzony wcześniej przez Stowarzyszenie Inicjatyw Społecznych WIATRAK.\n\nSkład zarządu (stan na 1 marca 2026 roku): Andrzej Grajczyk — prezes, Anna Brajczewska — wiceprezes, Alicja Kasińska — wiceprezes.',
    rentalIntro: 'Fundacja prowadzi Społeczną Wypożyczalnię. Specjalizujemy się w organizowaniu spływów kajakowych i rajdów rowerowych dla zorganizowanych grup z sektora pomocy i integracji społecznej. Dysponujemy 12 kajakami i 20 rowerami.',
    rentalKayaks: 'Wypożyczamy wygodne polietylenowe kajaki Vista, Sprinter i Sierra (jedynki) i organizujemy spływy, także z lekcją historii na wodzie, jak coroczny Spływ Czarnobylski na Bugu.',
    rentalBikes: 'Dwadzieścia rowerów wykonanych według indywidualnego projektu i na specjalne zamówienie: wygodne, trwałe, pomalowane w barwach gminy Wyszków, z herbem Wyszkowa na ramie. Za drobną odpłatnością może z nich korzystać każdy, a zorganizowane grupy młodzieży oraz organizacje i instytucje społeczne mogą liczyć na zniżki. Informacja: Artur Laskowski, tel. 691 801 220.',
    rentalImageUrl: F + 'pliki/kajaki.jpg',
    phone: '29 679 41 17', email: 'fundacjanadbugiem@gmail.com', address: 'Fundacja Nad Bugiem\nul. Jana Pawła II 10\n07-221 Brańszczyk',
    registered: '28 lutego 2012',
    facebookStreet: 'https://www.facebook.com/streetworkingwyszkow',
  } })
  console.log('[seed] gotowe')
  process.exit(0)
}
main().catch((e) => { console.error(e); process.exit(1) })

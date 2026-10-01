# Sunt de 10

Aplicație gratuită de română și matematică pentru clasele 5–8
(suntde10.ro). Copilul învață din lecții, iar tutorele îl ajută pas cu pas,
fără să-i facă tema. Conținutul urmează programa oficială (OMEN 3393/2017)
și e scris ca rezumat propriu, nu ca text de manual.

Numele tehnic vechi rămâne la fișierul de date (`data/mentor-ai.json`) și
la identificatorii din cod. Așa nu se pierd conturile deja salvate.

## Cum rulezi local

Node 18 sau mai nou.

```bash
npm install
cp backend/.env.example backend/.env
npm run dev
```

`npm run dev` pornește API-ul pe `http://localhost:3001` și Vite pe
`http://localhost:5173` (cererile `/api` sunt proxiate către backend).

Pentru a servi SPA-ul compilat din Express, ca pe hosting:

```bash
npm run build
npm start
```

Deschide `http://localhost:3001`. Fără `npm run build`, `npm start` răspunde
503 pe rutele de frontend.

## Teste, lint, build

```bash
npm test
npm run lint
npm run build
```

## Lecții copiate din manual

`npm test` rulează `tests/lessonContentGuard.test.js`. Testul citește lecțiile
și scrie `reports/lesson-content-guard.md`: lecția, câmpul, fraza și motivul
(cheie de răspunsuri, citat lung, sursă încă protejată). Raportul stă în
`reports/`, este ignorat de git și nu se urcă pe server. Testul pică doar
pentru unitățile din lista `RESTRUCTURED`
(`backend/src/data/restructuredLessons.js`), când promptul de lecții a
rescris deja unitatea. Până atunci rămâne verde și doar raportează.

Compararea cu manualele extrase se face doar local. Fișierele `.txt` stau pe
laptop (de exemplu `manual-romana-8-litera\mai-putine`) și nu se urcă în repo.
Scriptul nu rulează în CI:

```bash
node scripts/check-lesson-copy.mjs --surse "C:\Users\Kiril\Desktop\manual-romana-8-litera\mai-putine"
```

Caută 10 cuvinte la rând identici, după `normalizeRo()`, și scrie
`reports/lesson-copy.md`: lecția, fișierul-sursă și secvența. Rescrierea
lecțiilor semnalate se face cu `prompt-cursor-lectii.md`, unitate cu unitate.

## Datele copilului

Orice etapă care adaugă date despre un copil le înregistrează în
`backend/src/data/userDataRegistry.js`, cu export și ștergere. Exportul
contului și ștergerea citesc doar registrul. Termenele de păstrare stau în
`backend/src/config/retention.js`; pagina de confidențialitate trebuie să
folosească aceleași numere.

## Culori

Tema închisă, cea de bază:

- fundal `#08142A`, suprafață `#091C3C`, suprafață ridicată `#0F2A52`
- text `#FFFFFF`, text secundar `#A9B8D0`
- accent `#44D6D7`, reușită `#93FC09`, greșeală `#FF6B6B`

Tema deschisă, pe `html[data-theme="light"]`:

- fundal `#F7F9FC`, suprafață `#FFFFFF`, suprafață ridicată `#E7EEF6`
- text `#1F2937`, text secundar `#4B5563`
- accent `#0C7C86`, reușită `#3A8600`, greșeală `#C63E3E`

Turcoazul și lime-ul din tema deschisă sunt mai închise decât în logo,
ca textul să treacă de 4.5:1.

## Mascota

Furnicuța se desenează în `frontend/components/mascot/Mascota.jsx`.
Numele afișat stă doar în `shared/mascot.json` (`MASCOT_NAME`).
Mesajele, starea și categoria stau în `frontend/i18n/mascotMessages.js`.

Stările: `salut`, `bucuros`, `sarbatoare`, `gandeste`, `incurajeaza`,
`explica`, `somnoros`, `mandru`, `trist-bland`.
La 32 px se vede capul (`/mascot/cap.png`). La 120 și 240 px se vede
desenul stării, din `frontend/public/mascot/`.

Pagina `#/creator/mascota` e doar pentru creator (cookie-ul de pe
`/creator`). Arată toate stările, ambele teme, 32 px și 240 px, câte un
mesaj din fiecare categorie și panoul de ajutor. Acolo scrie și numele
curent și fișierul de editat.

## Ajutor

Articolele pentru copil stau în `frontend/help/articles.js`.
Ecranul e `#/ajutor`: căutare și categorii (lecții, ritm, examen, cont).
Acoperă lecția, testul, caietul de greșeli, obiectivul zilei (o lecție),
obiectivul săptămânii (4 zile, luni–duminică), Evaluarea Națională,
părintele, profilul privat și instalarea pe telefon.

## Aplicația pe telefon

Iconițele din `frontend/public/icons` sunt emblema (cercul „SUNT 10”).
Din browser: pe iPhone, Distribuie apoi Adaugă pe ecranul de pornire;
pe Android, meniul apoi Adaugă pe ecranul de pornire sau Instalează.

Service worker-ul `frontend/public/sw.js` ține în cache doar fișierele
statice: `/assets/`, iconițele, desenele din `/mascot/`, fonturile locale,
manifestul și pagina offline. Nu salvează `/api/`, `/parinte` sau `/creator`.

Ca să oprești cache-ul, pune `const DISABLE = true` sus în `sw.js`, apoi
build și deploy. La următoarea vizită worker-ul se dezînregistrează și
șterge cache-urile. După aceea pune `false` înapoi.

## Structură

- `backend/` — Express: autentificare, chat din lecții, economie, calendar, persistență JSON
- `frontend/` — React compilat cu Vite (ES modules, i18n `ro` / `en`)
- `tests/` — Vitest + Supertest (auth, chat din lecții, cumpărături, clasament)

Fără SMTP aplicația pornește, iar emailurile rămân în inbox. Variabilele sunt în
[backend/.env.example](backend/.env.example).

Acordul părintelui se dă doar din linkul primit pe email. Dacă mesajul
ajunge în Spam, părintele nu confirmă și contul se șterge după 14 zile.
SPF, DKIM și DMARC se setează în DirectAdmin înainte de orice deschidere
publică. Pașii sunt în [DEPLOY.md](DEPLOY.md). `SITE_PUBLIC` rămâne gol
până trec și checklist-ul `npm run prelansare` (numele, adresa și emailul
operatorului, SMTP, copia de siguranță). Nu completa în repo un CIF sau
o adresă.

Note vechi, mutate, nu mai descriu codul de acum:
[docs/arhiva/IMPLEMENTARE.md](docs/arhiva/IMPLEMENTARE.md),
[docs/arhiva/plan-imbunatatiri.md](docs/arhiva/plan-imbunatatiri.md).
Deploy pe gazduire.net: [DEPLOY.md](DEPLOY.md).

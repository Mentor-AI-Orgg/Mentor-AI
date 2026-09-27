# Sunt de 10

Aplicație gratuită de română și matematică pentru clasele 5–8
(suntde10.ro). Tutorele răspunde din lecțiile salvate. Conținutul urmează
programa oficială (OMEN 3393/2017) și e scris ca rezumat propriu, nu ca text
de manual.

Numele tehnic vechi rămâne la cookie-uri, la fișierul `data/mentor-ai.json`
și la numele repo-ului, ca să nu se piardă conturile.

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

## Pe telefon

Manifestul e `frontend/public/manifest.webmanifest`. Iconițele se regenerează cu `node scripts/make-icons.mjs` (nu rulează la build și nu se urcă scriptul pe server).

Service worker-ul (`frontend/public/sw.js`) păstrează doar fișiere statice: `/assets/`, iconițe, fonturi, manifest. Nu pune în cache `/api/`, paginile de părinte sau de creator, nici răspunsurile cu cookie. `index.html` se cere mereu de la rețea. Fără internet se arată `offline.html`.

Dacă după un deploy ceva rămâne blocat, deschide `frontend/public/sw.js`, pune `SW_DISABLED = true`, urcă din nou. La următoarea vizită worker-ul se șterge și golește cache-ul. Apoi pune-l înapoi pe `false`.

Cât site-ul e închis, pagina „În curând” nu înregistrează worker-ul. Înregistrarea pornește doar din aplicație, după ce creatorul a intrat.

## Structură

- `backend/` — Express: autentificare, chat din lecții, economie, calendar, persistență JSON
- `frontend/` — React compilat cu Vite (ES modules, i18n `ro` / `en`)
- `tests/` — Vitest + Supertest (auth, chat din lecții, cumpărături, clasament)

Fără SMTP aplicația pornește, iar emailurile rămân în inbox. Variabilele sunt în
[backend/.env.example](backend/.env.example).

Note vechi, mutate, nu mai descriu codul de acum:
[docs/arhiva/IMPLEMENTARE.md](docs/arhiva/IMPLEMENTARE.md),
[docs/arhiva/plan-imbunatatiri.md](docs/arhiva/plan-imbunatatiri.md).
Deploy pe gazduire.net: [DEPLOY.md](DEPLOY.md).

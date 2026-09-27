# Ce s-a implementat — Mentor AI

Documentul ăsta descrie **ce rulează azi**, nu planul inițial. Planul original
rămâne în [plan-imbunatatiri.md](plan-imbunatatiri.md). Setup local:
[README.md](README.md). Hosting: [DEPLOY.md](DEPLOY.md). Variabile:
[backend/.env.example](backend/.env.example).

Ultima actualizare: 27 august 2026.

## Stare pe scurt

| Fază | PR | Pe `main` |
| --- | --- | --- |
| Housekeeping + deploy gazduire.net | [#2](https://github.com/Mentor-AI-Orgg/Mentor-AI/pull/2) | da |
| 1 — Autentificare și autorizare | [#3](https://github.com/Mentor-AI-Orgg/Mentor-AI/pull/3) | da |
| 1b — Legături cu consimțământ | [#4](https://github.com/Mentor-AI-Orgg/Mentor-AI/pull/4) | da |
| 2 — Persistență | [#5](https://github.com/Mentor-AI-Orgg/Mentor-AI/pull/5) | da |
| 3 — Siguranță, rată, CORS, confidențialitate | [#6](https://github.com/Mentor-AI-Orgg/Mentor-AI/pull/6) | da |
| 4 — Provideri, mock etichetat, `/api/v1` | [#7](https://github.com/Mentor-AI-Orgg/Mentor-AI/pull/7) | da |
| 5 — Vite, i18n, teste, CI | [#8](https://github.com/Mentor-AI-Orgg/Mentor-AI/pull/8) | da |
| 6 — Plăți, OAuth, clasament, email/SMS, polish | [#9](https://github.com/Mentor-AI-Orgg/Mentor-AI/pull/9) | nu (draft) |

Faza 5 (PR #8) este **deja pe `main`**. Faza 6 trăiește pe
`cursor/phase6-product-polish-11d2` până se mergează PR #9.

Constrângerea de hosting a ghidat câteva alegeri față de plan: gazduire.net
este DirectAdmin + CloudLinux, deci `npm install` pe server nu poate compile
module native. Parolele folosesc `scrypt` din `node:crypto` (nu bcrypt),
datele stau într-un JSON atomic (nu Prisma/Postgres), iar driverul MySQL
(`mysql2`, tot JS) rămâne calea de scalare.

Fără chei externe, aplicația **pornește**. Fiecare integrare fără credențiale
răspunde mock și spune asta în JSON (`mocked` / `engine_mocked` /
`online (mock)`).

---

## Cum rulezi

```bash
npm install
cp backend/.env.example backend/.env
npm run dev          # API :3001 + Vite :5173, /api proxiat
npm test
npm run lint
npm run build && npm start   # ca pe hosting: Express servește frontend/dist
```

Cookie-ul de sesiune (`s10_session`, httpOnly, SameSite=lax) circulă doar
pe aceeași origine. Deschide SPA-ul de pe `:5173` (dev) sau `:3001` (build),
nu ca `file://`.

Parolă de test (reguli server): minim 8 caractere, o majusculă, o cifră, un
caracter special — de exemplu `Testpass1!`. Contul de elev cere emailul
părintelui, `parental_consent: true` și `privacy_accepted: true`.

---

## Arhitectura actuală

```
Browser (React + Vite)
    cookie s10_session
Express  (backend/src/app.js)
    basicAuth (opțional, staging)
    CORS allowlist
    webhook Stripe (body brut)
    express.json
    rate limit
    attachUser
    /api  și  /api/v1
        auth, health, leaderboard          — publice / sesiune opțională
        calendar/oauth/callback            — public (redirect de la Google/Notion)
        restul                             — authRequired
    frontend/dist  (după npm run build)
persistență  data/mentor-ai.json
```

Identitatea **nu** mai vine din `user_id` trimis de client. Vine din sesiune.
Rolul (elev / părinte / profesor) e pe contul salvat, nu în body.

---

## PR #2 — Deploy și housekeeping

Pe `main`. A făcut aplicația instalabilă pe gazduire.net.

- Un singur proces Node pe un singur domeniu. Express servește API-ul și
  frontend-ul compilat. Fără CORS obligatoriu, fără mixed content.
- `.github/workflows/deploy.yml`: pe push la `main`, build Vite, verificare
  de sintaxă pe backend, `tmp/restart.txt` pentru Passenger, sincronizare
  FTPS. `data/` și `node_modules` sunt excluse din FTP.
- `.gitignore` (lipsea complet) și `backend/.env.example`.
- `trust proxy` (în spatele LiteSpeed) și oprire curată pe `SIGTERM`/`SIGINT`.
- `STAGING_AUTH_USER` / `STAGING_AUTH_PASSWORD`: parolă HTTP Basic pe tot
  site-ul, cu `/api/health` lăsat public pentru monitorizare. Nu înlocuiește
  conturile de utilizator.
- `getApiBaseUrl` folosește originea curentă. Înainte, pe un domeniu real
  (port 443), clientul chema `localhost:3001` pe mașina vizitatorului.

Deploy-ul pe gazduire.net **nu pornește** până nu sunt setate în GitHub
Actions secretele `FTP_SERVER` / `FTP_USERNAME` / `FTP_PASSWORD` și
variabilele `FTP_SERVER_DIR` / `FTP_PROTOCOL`.

---

## Faza 1 — Identitate (PR #3 + #4)

Pe `main`. Asta era blocajul: fără identitate, restul rutelor erau IDOR.

### Conturi și sesiune

- `POST /api/auth/register`, `/login`, `/logout`, `GET /api/auth/me`,
  `POST /api/auth/forgot-password`.
- Parola: scrypt + salt unic. Nu se stochează niciodată în clar.
- Sesinea: token aleator în cookie `s10_session`; pe disc se salvează
  doar SHA-256-ul tokenului, nu valoarea din cookie.
- `authRequired` și `roleGuard` pe rutele care ating un cont.
- Profesorul nu se poate auto-înregistra: trebuie `TEACHER_INVITE_CODE`.
  Fără variabilă, înregistrarea ca profesor e blocată.
- Elevul minor: email părinte diferit de al elevului + consimțământ parental
  explicit + acceptarea politicii de confidențialitate.

### Legături (PR #4)

`connectParentChild` nu mai leagă două conturi doar pentru că cineva a
introdus un email. Fluxul e invitație:

1. `POST /api/links/invite` — cineva trimite către un email și un tip
   (`parent_child` sau `teacher_student`).
2. Destinatarul acceptă sau respinge.
3. Abia atunci apar analitica părinte/profesor.

Fără accept, un elev nu poate atașa un adult oarecare la contul lui, și
invers. `POST /api/economy/connect-child` răspunde 410 și indică ruta nouă.

---

## Faza 2 — Persistență (PR #5)

Pe `main`. Înainte, orice `Map` din `backend/src/data/` se golea la restart
sau deploy.

- `backend/src/data/persistence.js` scrie atomic `data/mentor-ai.json`
  (sau `DATA_DIR`). Autosave la ~5s și încă o dată la oprirea procesului.
- Dacă fișierul e corupt, e mutat în `mentor-ai.json.corupt-<timestamp>` și
  procesul pornește gol, ca site-ul să nu rămână jos.
- Conversațiile sunt cheate pe **email + conversation_id**, nu pe un hash al
  primului mesaj (doi elevi cu același text nu mai împart memoria).
- Abonamentul stă în `subscriptionStore`, nu ca obiect de modul care se
  pierdea la restart.

Prisma/Postgres din plan **nu** s-au folosit: pe shared hosting nu există
Postgres, iar native addons sunt riscante. JSON-ul e suficient la volumul
actual. Înlocuirea e un singur fișier: `persistence.js` → `mysql2`.

---

## Faza 3 — Siguranță și confidențialitate (PR #6)

Pe `main`.

- Filtru de cuvinte (inclusiv variante cu diacritice/spații) ca pre-filtru
  ieftin, apoi OpenAI Moderations dacă există `OPENAI_KEY`.
- `express-rate-limit`: general pe `/api`, mai strâns pe auth, chat, detect
  și verificarea OTP. În teste (`NODE_ENV=test`) limitele sunt sărite.
- OTP de acces părinte: 6 cifre, 10 minute, **hash** pe disc, maxim 5
  încercări, apoi blocare. Răspunsul HTTP **nu** include codul.
- CORS pe allowlist, cu `credentials: true`. Same-origin merge fără
  `CORS_ORIGINS`.
- Validare Zod pe body-urile importante (auth, chat, detect, shop, OTP,
  calendar, ștergere cont, profil).
- Detectorul de text rămâne euristic (inclusiv o componentă aleatorie) și
  e etichetat în UI ca demonstrație, nu ca verdict de încredere.
- Consimțământ parental + acceptarea politicii la înregistrarea elevului.
- Pagini statice: `/privacy.html`, `/terms.html`.
- GDPR: `GET /api/account/export` și `DELETE /api/account` cu
  `{ "confirm": "DELETE" }` — șterge sesiuni, economie, calendar, memorie,
  invitații și abonament, nu doar rândul de auth.

---

## Faza 4 — Provideri și API (PR #7)

Pe `main`.

- Timeout `AbortController` pe Claude, GPT-4o, Gemini, Wolfram, Mathpix
  (`PROVIDER_TIMEOUT_MS`, implicit 8000 ms). Un motor agățat cedează locul
  următorului din lanț.
- `engine_mocked` / banner în UI: dacă lipsește cheia, răspunsul e mock și
  interfața o arată. Nu se mai poate confunda un mock cu un model real.
- `MAX_TOKENS` implicit 2048 (în loc de 500, care tăia scaffolding-ul).
- Alias `/api/v1` pentru toate rutele. Spec: `GET /api/openapi.json`.
- TTL: notificări (30 de zile, max 500), sesiuni, coduri de acces,
  memorie de conversație.
- Health: `GET /api/health` raportează per motor `online (real)` sau
  `online (mock)`.

Lanțul de chat (neschimbat ca idee, acum cu timeout):

| Plan | Ordine |
| --- | --- |
| free | GPT-4o → Wolfram → Mathpix → Gemini → Claude |
| pro | Gemini → Claude → Wolfram |
| premium | consiliu GPT-4o + Wolfram + Gemini + Mathpix, Claude judecător |

---

## Faza 5 — Frontend și calitate (PR #8, pe `main`)

Asta e PR-ul cerut la merge. Este deja în `main` (commit `cae3e59`,
27 august 2026).

Înainte, `frontend/index.html` încărca Babel Standalone și compila fiecare
componentă în browser. Tailwind venea de pe CDN (nepotrivit pentru producție).
Componentele erau `window.Nume` globale, iar `app.js` avea peste 1200 de linii.

Acum:

- Vite (`vite.config.mjs`): dev pe 5173 cu proxy `/api` → 3001; `npm run build`
  scrie `frontend/dist`.
- React pe ES modules. Ecranele sunt fișiere separate
  (`frontend/screens/`, `frontend/components/`).
- i18n `ro` / `en` în `frontend/i18n/locales/`. Interfața nu mai e doar
  română hardcodată (unele ecrane de magazin/calendar au rămas predominant RO).
- Vitest + Supertest: `tests/auth.test.js`, `chat.test.js`, `economy.test.js`,
  `i18n.test.js`.
- ESLint, Prettier, `.gitattributes` (LF).
- CI: `.github/workflows/ci.yml` — lint, teste, build, `npm audit` pe
  dependințele de producție.

---

## Faza 6 — Polish de produs (PR #9, draft)

Nu este pe `main` până nu se mergează #9. Implementarea e pe branch-ul
`cursor/phase6-product-polish-11d2`.

### Plăți (Stripe)

- `POST /api/subscriptions/checkout`:
  - plan free → activare imediată;
  - elev + `parent_email` → `pending_parent_review`, fără charge;
  - `STRIPE_SECRET_KEY` setat → Checkout Session, răspuns cu `url`;
  - fără cheie → activare mock, `mocked: true`.
- `POST /api/subscriptions/webhook` (înainte de `express.json`) verifică
  HMAC-ul Stripe și activează planul la `checkout.session.completed`.
- Netopia nu e implementat; poate înlocui Stripe pe același flux de
  activare. Prețurile sunt în RON (bani către Stripe).

### Calendar OAuth

- Cu `GOOGLE_CLIENT_ID/SECRET` sau `NOTION_CLIENT_ID/SECRET`, connect
  întoarce `oauth_url`. Callback:
  `GET /api/calendar/oauth/{google|notion}/callback`.
- `state` e semnat HMAC (CSRF). Tokenii stau în store, nu ies pe API-ul public.
- Fără chei: evenimente demo, `mocked: true`, banner în UI.

### Clasament

- Calculat din elevii din `economyStore` (XP = monede câștigate + streak).
- Nume afișat: `username` sau `Elev ABCD` (hash din email). Numele real și
  emailul **nu** apar.
- Query-ul vechi `?name=&xp=` e ignorat (era spoofabil).

### Email și SMS

- SMTP prin nodemailer (`SMTP_HOST` + `SMTP_FROM`).
- SMS prin Twilio REST (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`,
  `TWILIO_FROM`).
- Codul de acces părinte, recenzia de plan și forgot-password încearcă
  livrarea reală; altfel rămân în inbox cu `mocked: true`.
- Răspunsul HTTP la cererea de OTP tot nu include codul.

### Polish UI

- Onboarding: `PATCH /api/account/profile`, restaurat din `GET /api/auth/me`.
- FocusTimer: stare în `localStorage`, cheie per email, inclusiv dacă
  cronometrul rula în altă sesiune.
- Magazin: dialog de confirmare (nume + preț) înainte de cumpărare.
- `prefers-reduced-motion: reduce` oprește WebGL-ul (FloatingLines, DarkVeil,
  LineWaves) și animațiile CSS `fadeIn`.

Teste noi: `tests/phase6.test.js` (checkout mock, HMAC Stripe, calendar mock,
clasament cu pseudonim, review mock, persistare onboarding).

---

## Hartă API (prefix `/api` sau `/api/v1`)

| Metodă | Ruta | Auth | Notă |
| --- | --- | --- | --- |
| GET | `/health` | nu | motoare + integrări mock/real |
| GET | `/openapi.json` | nu | spec OpenAPI 3 |
| POST | `/auth/register` | nu | cookie de sesiune |
| POST | `/auth/login` | nu | |
| POST | `/auth/logout` | nu | |
| GET | `/auth/me` | da | |
| POST | `/auth/forgot-password` | nu | nu enumeră dacă emailul există |
| GET | `/leaderboard` | opțional | evidențiază userul din sesiune |
| POST | `/chat` | da | `engine_used`, `engine_mocked` |
| POST | `/detect` | da | demonstrație euristică |
| POST | `/wolfram`, `/mathpix` | da | |
| * | `/flashcards`, `/diagnostics` | da | |
| * | `/calendar/*` | da | exceptând OAuth callback |
| GET | `/calendar/oauth/:provider/callback` | nu | redirect de la provider |
| * | `/economy/*` | da | roluri pe analytics / OTP |
| * | `/links/*` | da | invitații |
| GET | `/account/export` | da | JSON descărcabil |
| PATCH | `/account/profile` | da | onboarding, username, clasă |
| DELETE | `/account` | da | body `{ confirm: "DELETE" }` |
| GET | `/subscriptions`, `/subscriptions/plans` | nu | catalog |
| GET | `/subscriptions/me` | da | |
| POST | `/subscriptions/checkout` | da | Stripe sau mock |
| POST | `/subscriptions/webhook` | Stripe sig | body brut |

---

## Variabile de mediu

Toate sunt opționale în afară de ce vrei să activezi. Lista completă e în
`.env.example`. Pe hosting, setează-le în Node.js Selector (cwd-ul procesului
nu e `backend/`, deci un `backend/.env` poate fi ignorat).

| Grup | Variabile | Fără ele |
| --- | --- | --- |
| Proces | `PORT`, `NODE_ENV`, `DATA_DIR` | 3001, development, `data/` |
| Conturi | `TEACHER_INVITE_CODE` | profesori blocați |
| CORS | `CORS_ORIGINS` | doar same-origin |
| Staging | `STAGING_AUTH_*` | Basic Auth oprit |
| Chat | `CLAUDE_KEY`, `OPENAI_KEY`, `GEMINI_KEY`, `WOLFRAM_KEY`, `MATHPIX_*` | mock etichetat |
| URL | `APP_BASE_URL` | reconstruiește din request |
| Stripe | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | checkout mock |
| OAuth | `GOOGLE_*`, `NOTION_*`, `OAUTH_STATE_SECRET` | calendar mock |
| Email | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | inbox local |
| SMS | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` | inbox local |

Mathpix cere **ambele** `APP_ID` și `APP_KEY`; una singură = mock silențios.

---

## Teste

```bash
npm test
```

| Fișier | Ce acoperă |
| --- | --- |
| `tests/auth.test.js` | consimțământ, register, duplicate, profesor fără invitație, `/me` |
| `tests/chat.test.js` | lanț mock, alias `/api/v1` |
| `tests/economy.test.js` | bonus prima logare + cumpărare, item inexistent |
| `tests/i18n.test.js` | interpolare, fallback `ro` |
| `tests/phase6.test.js` | plăți mock, webhook HMAC, calendar mock, clasament, profil |

---

## Ce a rămas în afara fazelor 1–6

Nu e un backlog complet; sunt lucrurile pe care planul le-a atins și care
încă nu sunt „live” sau sunt conștient mock:

- **Chei de producție** — Stripe, SMTP, Twilio, Google, Notion, motoarele AI.
  Codul e gata; fără valori în panel, totul e mock etichetat.
- **Netopia** — neimplementat; Stripe e procesatorul.
- **Resetare parolă cu link** — forgot-password trimite (sau stochează) un
  mesaj, dar nu există încă token + formular de parolă nouă.
- **Prisma / MySQL** — persistența e JSON; `persistence.js` e locul de schimbat.
- **Detector AI real** — rămâne demonstrație euristică, etichetată.
- **i18n complet** — magazinul, calendarul și o parte din shop sunt încă
  preponderent în română.
- **FTP secrets** — workflow-ul de deploy e scris, dar eșuează până nu sunt
  puse secretele GitHub.
- **Date reale despre minori pe staging** — Basic Auth rămâne recomandat
  cât instanța e prototip public.

---

## Fișiere de citit lângă ăsta

| Fișier | Rol |
| --- | --- |
| [README.md](README.md) | pornire locală |
| [DEPLOY.md](DEPLOY.md) | gazduire.net, Passenger, FTP, `DATA_DIR` |
| [plan-imbunatatiri.md](plan-imbunatatiri.md) | planul original pe faze |
| [backend/.env.example](backend/.env.example) | toate cheile, cu comentarii |
| [file-explicatie.md](file-explicatie.md) | arborele vechi (pre-faze); vezi mai jos |
| [vulnerabilitati_v2.md](vulnerabilitati_v2.md) | analiza de securitate de dinaintea fazelor |

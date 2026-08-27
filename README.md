# Mentor AI

Aplicație educațională pentru clasele 1–12: un mentor AI cu scaffolding,
gamificare și dashboard-uri pentru părinte și profesor.

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

## Structură

- `backend/` — Express: autentificare, chat, economie, plăți, calendar, persistență JSON
- `frontend/` — React compilat cu Vite (ES modules, i18n `ro` / `en`)
- `tests/` — Vitest + Supertest (auth, chat mock, cumpărături, plăți mock, clasament)

Fără chei externe (Stripe, SMTP, Twilio, Google/Notion, motoare AI) aplicația
pornește pe mock-uri etichetate. Variabilele sunt în
[backend/.env.example](backend/.env.example).

Ce s-a implementat, pe faze și PR-uri: [IMPLEMENTARE.md](IMPLEMENTARE.md).
Planul original: [plan-imbunatatiri.md](plan-imbunatatiri.md).
Deploy pe gazduire.net: [DEPLOY.md](DEPLOY.md).

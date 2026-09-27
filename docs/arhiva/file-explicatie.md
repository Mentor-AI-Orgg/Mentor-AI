# Arbore de fișiere explicat — Mentor AI v3.0

> **Notă (august 2026):** textul de mai jos descrie repo-ul **înainte** de
> fazele 1–6 (Babel în browser, store-uri doar în memorie, login fără API,
> clasament hardcodat). Starea actuală, pe PR-uri, este în
> [IMPLEMENTARE.md](IMPLEMENTARE.md). Frontend-ul se compilează cu Vite;
> identitatea e pe cookie; datele stau în `data/mentor-ai.json`.

„Mentor AI" e o aplicație educațională (elevi clasele I–XII) cu un mentor AI de tip scaffolding (nu dă răspunsul direct, ci ghidează), plus gamification (monede, magazin, leaderboard, streak), dashboard-uri pentru părinți/profesori și un „detector de text scris cu AI". Backend Node/Express, frontend React.

```
project/
├── backend/                          Server Express (Node ≥18), toată logica API
│   ├── server.js                     Punctul de intrare: pornește Express, montează toate rutele /api/*, servește frontend-ul static
│   ├── package.json                  Dependințe: express, cors, dotenv
│   ├── .env.example                  Șablon de configurare (chei API pentru Claude/OpenAI/Gemini/Wolfram/Mathpix)
│   ├── .gitignore                    Exclude node_modules, .env, loguri
│   │
│   └── src/
│       ├── config.js                 Citește .env, expune toate cheile/modelele + PORT, nume/versiune aplicație
│       │
│       ├── routes/                   Un fișier = un grup de endpoint-uri REST
│       │   ├── chat.js               POST /api/chat — orchestrează lanțul de fallback AI (Free/Pro/Premium), safety check, memorie conversație
│       │   ├── detect.js             POST /api/detect — „detector" de text scris cu AI (euristic, nu model real)
│       │   ├── wolfram.js            POST /api/wolfram — interogări matematice/științifice către Wolfram Alpha
│       │   ├── mathpix.js            POST /api/mathpix — recunoaștere text/formule din imagini (OCR)
│       │   ├── subscriptions.js      GET planuri, GET abonament curent, POST checkout (mock, fără plată reală)
│       │   ├── health.js             GET /api/health — stare simplă a serverului și a providerilor (configurați sau nu)
│       │   ├── leaderboard.js        GET /api/leaderboard — clasament (mock, cu inserare opțională a userului curent)
│       │   ├── calendar.js           CRUD evenimente calendar + conectare mock la Google/Notion
│       │   ├── flashcards.js         POST /api/flashcards/generate — generează flashcarduri via lanț de motoare AI, cu fallback local
│       │   ├── diagnostics.js        Rulează teste de sănătate pe toate subsistemele (memorie, motoare AI, safety) — util pentru debugging
│       │   └── economy.js            Cel mai mare grup de rute: monede, magazin, inventar, notificări, legătură părinte-copil/profesor-elev, cod de acces OTP, analytics
│       │
│       ├── providers/                Adaptoare către fiecare API extern de AI/tool, cu fallback automat la mock dacă lipsește cheia
│       │   ├── claude.js             Apelează Anthropic API (model implicit: claude-haiku-4-5); mock dacă CLAUDE_KEY lipsește
│       │   ├── openai.js             Apelează OpenAI (gpt-4o); mock dacă OPENAI_KEY lipsește
│       │   ├── gemini.js             Apelează Google Gemini; mock dacă GEMINI_KEY lipsește
│       │   ├── wolfram.js            Apelează Wolfram|Alpha; mock dacă WOLFRAM_KEY lipsește
│       │   └── mathpix.js            Apelează Mathpix OCR; mock dacă lipsesc APP_ID/APP_KEY
│       │
│       ├── data/                     „Baze de date" — toate in-memory (Map/obiecte JS), se pierd la restart
│       │   ├── economyStore.js       (902 linii) Useri, balanță monede, catalog magazin, inventar, notificări, legături părinte/profesor, coduri de acces OTP, analytics pentru părinte/profesor
│       │   ├── subscriptions.js      Definițiile celor 4 planuri (Free/Pro/Premium/Elite) + prețuri
│       │   ├── curriculum.js         Lista limbilor suportate + alte constante de curriculum
│       │   ├── calendarStore.js      Evenimente calendar per user + stare conectare provideri externi
│       │   ├── leaderboard.js        10 înregistrări hardcodate pentru clasament
│       │   ├── systemPrompts.js      Prompt-ul de sistem „scaffolding" al mentorului AI, tradus în 11 limbi
│       │   ├── responseTemplates.js  Texte fixe (refuz de siguranță, ghidaj anti-copiat, „toate motoarele indisponibile"), traduse în 11 limbi
│       │   ├── mockClaude.js         Răspunsuri simulate pentru Claude, pe materie și limbă
│       │   ├── mockGpt4o.js          Răspunsuri simulate pentru GPT-4o, pe limbă
│       │   └── mockGemini.js         Răspunsuri simulate pentru Gemini, pe limbă
│       │
│       ├── memory/
│       │   └── memoryStore.js        Istoric conversație in-memory, limitat la 15 mesaje/conversație, indexat doar după conversation_id
│       │
│       ├── safety/
│       │   └── safetyCheck.js        Filtru de siguranță bazat pe listă de cuvinte interzise + detectare „cere răspunsul direct la temă" (scaffolding guard)
│       │
│       └── services/
│           └── detectService.js      Logica euristică (+ aleatorie) din spatele „detectorului de text AI"
│
└── frontend/                         SPA React, fără build step — JSX compilat live în browser cu Babel Standalone
    ├── index.html                    Shell HTML: încarcă React/ReactDOM/Babel/Tailwind/Three.js din CDN, apoi fiecare componentă ca <script type="text/babel">
    ├── styles.css                    Toate stilurile custom (685 linii) — completează clasele Tailwind utilitare
    ├── BorderGlow.css                Stiluri specifice efectului vizual „border glow"
    ├── apiClient.js                  `window.MentorAPI` — wrapper fetch pentru toate rutele backend, cu timeout (6s) și fallback la date implicite la eroare
    ├── app.js                        (1244 linii) Componenta rădăcină `App`: routing între ecrane (splash/auth/login/register/onboarding/home/parent/teacher), stare globală a userului (persistă în localStorage)
    │
    └── components/
        ├── SplashScreen.js           Ecran de pornire, afișat 2.5s, apoi trece la auth sau direct în aplicație dacă userul e deja „logat"
        ├── AuthScreen.js              Ecran de alegere: „Ai deja cont? Login" / alegere rol pentru înregistrare
        ├── LoginScreen.js             Formular login — ⚠️ câmpurile nu sunt legate de state, butonul loghează necondiționat (vezi raportul de vulnerabilități #1)
        ├── RegisterScreen.js          Formular înregistrare cu validare completă client-side (parolă, username interzis, câmpuri per rol student/profesor/părinte)
        ├── OnboardingScreen.js        Pași de configurare inițială (materie, clasă, obiective) după înregistrare
        ├── BottomNav.js               Bară de navigație inferioară stil „dock" (iconițe cu scalare la hover, ca pe macOS)
        ├── AdaptiveContainer.js       Detectează mobil/tabletă/desktop din lățimea ferestrei și ajustează layout-ul
        ├── Toast.js                   Notificare scurtă (succes/eroare), auto-dispare după 3s
        │
        ├── StudyScreens.js            (290 linii) Ecranul principal de chat cu mentorul AI — trimite mesaje, afișează scaffolding, integrare foto/OCR
        ├── FlashCards.js              Afișare interactivă flashcarduri (flip card) generate de backend
        ├── FocusTimer.js              Cronometru tip Pomodoro cu presetări (15/25/50/60 min)
        │
        ├── ShopScreen.js              (323 linii) Magazin cu avataruri, teme, voci AI, boost-uri — cumpărare cu monede virtuale
        ├── Leaderboard.js             Afișare clasament, cu stare de „loading” (skeleton)
        │
        ├── TeacherDashboard.js        Dashboard profesor: roster elevi, analytics de clasă, cerere de test, conectare elev nou (doar prin email, fără confirmare)
        │                              (folosește implicit și un flux similar pentru părinți, definit în app.js/economy)
        │
        ├── DarkVeil.js                Fundal animat WebGL (shader custom) — efect vizual decorativ
        ├── LineWaves.js               Fundal animat cu linii/valuri (WebGL) — efect vizual decorativ
        ├── FloatingLines.js           (452 linii) Fundal animat 3D cu linii plutitoare, folosind Three.js — efect vizual decorativ
        └── BorderGlow.js              Efect de „glow” animat pe conturul cardurilor/containerelor
```

## Fluxul general al aplicației

1. **Pornire** → `SplashScreen` → dacă userul nu e „logat" (flag local, nu autentificare reală) → `AuthScreen` → `LoginScreen`/`RegisterScreen` → `OnboardingScreen`.
2. **Ecranul principal** variază după rol (`routeByRole` în `app.js`): elev → `home` (chat, flashcards, focus timer, shop, leaderboard, calendar), părinte → dashboard cu analytics despre copil, profesor → `TeacherDashboard`.
3. **Chatul cu mentorul** (`StudyScreens.js` → `apiClient.chat()` → `routes/chat.js`) trece mai întâi prin `safetyCheck`, apoi printr-un lanț de motoare AI diferit în funcție de plan (Free/Pro/Premium), fiecare motor căzând pe mock dacă nu are cheie API reală configurată.
4. **Economia** (monede, magazin, streak) e gestionată integral de `economyStore.js` pe backend, in-memory — nimic nu supraviețuiește unui restart de server.
5. **Legăturile părinte-copil/profesor-elev** se fac direct prin introducerea unui email, fără verificare — a se vedea raportul de vulnerabilități pentru implicații.

Pentru lista completă de probleme și priorități, vezi `02-TOP-50-DE-FACUT.md`; pentru analiza detaliată de securitate, vezi `01-VULNERABILITATI.md`.

# Top 50 — Ce trebuie musai făcut — Mentor AI v3.0

Listă prioritizată, dincolo de vulnerabilitățile pur de securitate (acelea sunt detaliate separat în `01-VULNERABILITATI.md`, dar cele mai critice apar și aici, pentru context de prioritizare generală).

## 🔴 Blocante pentru lansare (P0)

1. **Autentificare reală** — nu există login/register funcțional pe backend; oricine intră în orice cont (vezi vuln #1, #2).
2. **Bază de date reală** — tot ce contează (useri, economie, calendar, leaderboard, mesaje) trăiește în `Map()`/obiecte JS in-memory. La fiecare `npm start`/restart al serverului, **toate datele se pierd**. Nu există persistență.
3. **Autorizare pe rute (nu doar identificare)** — orice utilizator poate citi/scrie date ale oricărui alt `user_id` (IDOR generalizat, vezi vuln #2).
4. **Confirmare bidirecțională pentru legăturile părinte-copil / profesor-elev** — în prezent, un email introdus de o singură parte leagă instant două conturi (vuln #3).
5. **Rate limiting** pe toate rutele publice, în special chat și `access-code/verify` (vuln #4, #5).
6. **Filtru de siguranță al conținutului real** — lista fixă de cuvinte interzise din `safetyCheck.js` e ușor de ocolit; într-o aplicație pentru copii, e cea mai importantă piesă lipsă (vuln #6).
7. **Chei API reale + testare cu provideri reali** — momentan totul rulează pe mock-uri (`mockClaude.js`, `mockGpt4o.js`, `mockGemini.js`); aplicația n-a fost niciodată testată cu răspunsuri AI reale, deci comportamentul cu latențe/erori reale e necunoscut.
8. **Plăți reale** — `subscriptions.js` / `routes/subscriptions.js` fac „mock checkout"; nu există integrare Stripe/Netopia/alt procesator. Fără asta, nu se poate monetiza produsul.
9. **Politică de confidențialitate + consimțământ parental (parental consent flow)** — aplicația colectează date despre minori (activitate, „risc de copiat", mesaje) fără niciun flux de consimțământ parental verificabil, cerut de obicei legal pentru servicii adresate copiilor.
10. **Backup/export al datelor utilizatorului** — inexistent; dacă serverul cade, tot (progres, monede, istoric) e pierdut ireversibil (legat de #2).

## 🟠 Funcționalitate esențială, dar incompletă (P1)

11. **Persistă memoria conversației dincolo de 15 mesaje** — `memoryStore.js` păstrează doar ultimele 15 mesaje și se pierde la restart; planul „Pro" promite „memorie persistentă", dar nu există implementare reală.
12. **Detectorul de „scris cu AI" e o simulare aleatorie** — `detectService.js` calculează un scor eurístic + `Math.random()`; trebuie fie un model/serviciu real, fie eliminat/etichetat clar drept demo (vuln #9).
13. **Integrare Google Calendar / Notion reale** — `calendarStore.js` are doar conectare mock, fără OAuth real.
14. **Leaderboard cu date reale** — `leaderboard.js` e complet hardcodat cu 10 nume fictive; nu extrage XP real din activitatea userilor.
15. **Notificări reale (SMS/email)** — `pushNotification()` din `economyStore.js` doar loghează/stochează în memorie; nu trimite SMS/email efectiv (relevant mai ales pentru codul de acces părinte, care e promis „prin SMS").
16. **Validare server-side a rolului la înregistrare** — orice client poate trimite `role: 'teacher'` fără nicio verificare (vuln #11).
17. **Gestionarea erorilor de rețea pe frontend** — `apiClient.js` are try/catch cu fallback generic peste tot, dar nu există retry/backoff sau afișare clară a stării offline vs. eroare de server.
18. **Internaționalizare completă** — `curriculum.js`/`systemPrompts.js` acoperă 11 limbi pentru prompt-uri AI, dar interfața (`styles.css`, componentele) e scrisă hardcodat doar în română; nu există fișiere i18n pentru UI.
19. **Fluxul de „uitat parola"** — butonul există în `LoginScreen.js` (`Ai uitat parola?`) dar nu are handler/funcționalitate.
20. **Validare completă de formular pe `RegisterScreen`** — verifică front-end doar; nicio validare (unicitate email/username, format telefon) pe server.

## 🟡 Calitate & mentenabilitate (P2)

21. **Migrare de la Babel-in-browser (JSX live) la un build real** (Vite/webpack/esbuild) — în prezent fiecare vizitator compilează tot JSX-ul la runtime, ceea ce e lent și nesustenabil pentru producție.
22. **Renunțare la Tailwind CDN** — `<script src="https://cdn.tailwindcss.com">` e documentat oficial ca „nu pentru producție"; trebuie build cu Tailwind CLI/PostCSS.
23. **Suită de teste automate** — nu există niciun fișier de test (`*.test.js`, Jest, etc.) în tot proiectul. Zero acoperire.
24. **CI/CD** — nu există `.github/workflows` sau alt pipeline; nimic nu rulează automat la fiecare push (lint, teste, audit).
25. **Linting & formatting** — nu există `.eslintrc`/`.prettierrc`; stilul de cod variază (unele fișiere `\r\n`, altele `\n` — vezi #29).
26. **Logging structurat** — momentan doar `console.log`/`console.error`; niciun logger cu niveluri (info/warn/error), fără posibilitate de agregare în producție.
27. **Monitorizare/health checks reale** — `routes/health.js` există, dar e superficial (doar verifică dacă cheile sunt setate, nu dacă providerii răspund efectiv); `diagnostics.js` e mai complet, dar nu e conectat la o soluție de alertare externă.
28. **Documentație API** — nu există OpenAPI/Swagger pentru cele ~11 grupuri de rute; greu de integrat sau de auditat extern.
29. **Uniformizare a terminatorilor de linie (CRLF vs LF)** — mai multe fișiere backend (`economy.js`, `subscriptions.js`, `calendarStore.js`) au `\r\n`, altele `\n` — semn de editare pe medii diferite, risc de conflicte git și diff-uri zgomotoase.
30. **`server.js` nu are graceful shutdown** — nu tratează `SIGTERM`/`SIGINT` pentru închidere curată (relevant mai ales când se adaugă o bază de date reală, ca să nu se piardă tranzacții în curs).

## 🟢 UX / produs (P3)

31. **Onboarding-ul (`OnboardingScreen.js`) nu salvează progresul dacă utilizatorul închide aplicația la jumătate** — `onboardingData` trăiește doar în state React, se pierde la refresh.
32. **Ecranele de Login/Register nu au stare de „loading"/disable pe buton în timpul request-urilor** (unde există request-uri reale, ex. `TeacherDashboard`, dar nu peste tot).
33. **Accesibilitate (a11y)** — verifică `aria-label`/focus management pe toate componentele interactive noi (canvas-urile WebGL — `DarkVeil`, `LineWaves`, `FloatingLines` — nu au fallback pentru utilizatori cu `prefers-reduced-motion`).
34. **Responsive/testare pe ecrane mici reale** — `AdaptiveContainer.js` face un switch simplu pe `width`, dar nu e clar dacă a fost testat pe device-uri reale (doar breakpoint-uri arbitrare 680/1024px).
35. **Mesaje de eroare mai specifice către utilizator** — multe erori din `apiClient.js` cad pe un mesaj generic („Momentan nu pot contacta backend-ul...") indiferent de cauza reală (timeout vs. 500 vs. 404).
36. **FocusTimer nu persistă starea la schimbare de tab/reload** — un pomodoro pornit se resetează la refresh.
37. **Shop (`ShopScreen.js`) — fără confirmare înainte de cumpărare** cu monede (risc de achiziții accidentale, mai ales pentru copii).
38. **Fără undo/anulare pentru achiziții din shop sau claim de recompense.**
39. **Leaderboard-ul arată nume/inițiale complete fără opțiune de anonimizare** — de reconsiderat pentru confidențialitatea copiilor (afișare cu pseudonim, nu nume real).
40. **TeacherDashboard — fără paginare/căutare pe roster** dacă o clasă are mulți elevi (`findStudentsForTeacher` scanează tot `USERS` fără index, va deveni lent la scară).

## 🔵 Robustețe tehnică (P2/P3)

41. **`config.js`: fallback silențios la mock fără avertisment vizibil pentru utilizator final** — dacă o cheie API lipsește sau expiră în producție, userul primește un răspuns mock „ca și cum ar fi normal", fără avertisment vizibil în UI (doar în logurile de server).
42. **Fallback chain din `chat.js` (Free/Pro/Premium) nu are timeout global** — dacă un provider agățat (hang) nu respectă fetch-ul, lanțul de fallback poate întârzia mult întregul răspuns (nu există `AbortController`/timeout explicit pe `fetch` din providers, spre deosebire de `apiClient.js` din frontend care are timeout de 6s).
43. **`flashcards.js` — parsing JSON fragil**: `extractJsonArray` face regex simplu pe `\[[\s\S]*\]`; poate eșua silențios pe răspunsuri AI cu markdown/text în plus mai complex, căzând mereu pe fallback generic.
44. **Limita fixă de 500 tokeni la Claude/OpenAI (`max_tokens: 500`)** — poate trunchia răspunsuri legitime mai lungi (explicații de scaffolding cu mai mulți pași); de calibrat cu teste reale.
45. **`Buffer.from(message).toString('base64').slice(0,8)` pentru `conversation_id`** — pe lângă problema de coliziune (vuln #12), nu ține cont de user, deci doi useri diferiți cu prim mesaj identic ajung să „vorbească" cu aceeași memorie.
46. **Fără versionare a API-ului (`/api/v1/...`)** — orice schimbare viitoare de contract va rupe clienți vechi fără cale de coexistență.
47. **`economyStore.js` (902 linii) e un singur fișier monolitic** cu shop, useri, notificări, analytics, coduri de acces — greu de întreținut/testat izolat; de spart pe module (`userStore`, `shopStore`, `notificationStore`, `analyticsStore`).
48. **Nicio validare de schemă (ex. Zod/Joi) pe body-urile request-urilor** — validările sunt manuale, inconsistente (unele rute verifică `if (!x) return 400`, altele nu verifică deloc tipul).
49. **`.env.example` nu documentează ce se întâmplă dacă doar o parte din cheile Mathpix sunt setate** (`MATHPIX_APP_ID` fără `MATHPIX_APP_KEY`) — comportamentul e implicit (cade pe mock), dar nu e explicat utilizatorului care configurează.
50. **Fără mecanism de curățare (TTL) pentru datele mock in-memory care cresc la infinit** — `NOTIFICATIONS`, `ACCESS_CODES`, `memoryStore` cresc fără limită globală de dimensiune (doar `memoryStore` are limită per-conversație de 15 mesaje); la o rulare lungă fără restart, memoria serverului poate crește necontrolat.

---

**Notă generală:** aplicația e clar un prototip funcțional (multe comentarii proprii de genul „mock", „de înlocuit cu bază de date reală", „de adăugat" confirmă asta) — arhitectura de rute e curată și modulară, dar **nimic din persistență, autentificare sau siguranță a conținutului nu e pregătit pentru utilizatori reali, cu atât mai puțin pentru copii**. Recomand tratarea punctelor P0 ca o condiție obligatorie înainte de orice lansare publică, chiar și beta închisă.

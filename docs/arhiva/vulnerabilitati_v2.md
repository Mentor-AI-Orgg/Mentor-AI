# Vulnerabilități — Mentor AI v3.0

Analiză asupra codului din `backend/` și `frontend/` (excl. `node_modules`). Severitatea e orientativă, ținând cont că aplicația se adresează copiilor (elevi clasele I–XII) și implică conturi de părinte/profesor cu acces la date despre minori.

---

## 🔴 CRITICE

### 1. Autentificarea este complet falsă — oricine intră în orice cont
`frontend/components/LoginScreen.js` are câmpurile de email și parolă **needate la state** (fără `value`/`onChange`), iar `handleLogin()` din `app.js` (linia ~967) face doar:
```js
setUserData(prev => ({ ...prev, isLoggedIn: true }));
```
Nu există niciun apel către backend pentru login, nu există `POST /api/auth/login`, nu există verificare de parolă. Oricine apasă „Conectează-te" e logat, indiferent ce scrie (sau nu scrie) în câmpuri. Practic nu există barieră de acces la cont — un copil își poate accesa "contul" doar deschizând aplicația, dar la fel de simplu, oricine altcineva pe același dispozitiv/browser.

### 2. Nicio rută de autentificare pe backend + niciun middleware de sesiune/token
`server.js` montează rute pentru chat, economy, calendar etc., dar **nu există `routes/auth.js`**, nu există JWT/sesiune/cookie de autentificare. Toate rutele economy/calendar/subscriptions identifică userul strict prin `user_id` trimis liber în query/body de client (`req.query.user_id || 'demo_user'`). Oricine poate:
- citi/modifica datele oricărui `user_id` (balanță de monede, inventar, evenimente calendar, abonament) doar schimbând parametrul în request;
- vedea `parent-analytics` sau `teacher-analytics` pentru orice email, fără nicio verificare de proprietate a contului.

Acesta e un **IDOR (Insecure Direct Object Reference) generalizat** pe aproape toate rutele din `backend/src/routes/economy.js` și `calendar.js`.

### 3. Legarea părinte–copil și profesor–elev nu cere consimțământul celuilalt cont
`connectParentChild()` și `logActivity({type:'teacher_link'})` din `economyStore.js` leagă imediat două conturi doar pe baza unui email introdus de un singur utilizator — fără e-mail de confirmare, fără accept din partea celuilalt cont, fără verificare că adresa de e-mail chiar aparține unui părinte/profesor real. Un necunoscut poate introduce email-ul unui copil real și îl leagă la propriul cont de „profesor", câștigând acces la:
- `afkRisk`, `copiedRisk` (scor de „suspiciune de copiat")
- `mentorMessages` (notițe din activitatea de chat)
- `detectHistory` (istoric al detectorului anti-AI)

Combinat cu punctul 2 (fără autentificare), oricine poate deveni „profesorul" oricărui copil doar știindu-i adresa de email. **Risc serios de confidențialitate pentru date despre minori (relevant GDPR / COPPA-like).**

### 4. Codul de acces (OTP) al părintelui e vulnerabil la brute-force
`generateAccessCode()` / `verifyAccessCode()` din `economyStore.js`: cod numeric de 6 cifre, valabil 10 minute, **fără limitare a numărului de încercări** pe ruta `POST /api/economy/access-code/verify`. Un atacator poate încerca toate cele 1.000.000 de combinații în fereastra de 10 minute (posibil ușor la un request/10ms fără rate limiting), obținând acces "de urgență" la contul copilului.

### 5. Fără rate limiting pe nicio rută
Nicio rută (`chat`, `access-code`, `checkout`, `economy/buy` etc.) nu are limitare de rată. Asta amplifică problema #4, permite spam masiv către providerii AI (cost financiar dacă se adaugă chei reale) și abuz al oricărei alte rute publice.

### 6. Filtrul de siguranță pentru conținut este o listă fixă de cuvinte, ușor de ocolit
`backend/src/safety/safetyCheck.js` verifică doar `message.toLowerCase().includes(cuvânt)` dintr-o listă foarte scurtă (`INAPPROPRIATE_KEYWORDS` are ~13 cuvinte). Este trivial de ocolit prin:
- diacritice/typo-uri ("s3x", "bombă" cu spații: "b o m b a"),
- traduceri în alte limbi neacoperite,
- parafrazare.

Autorul chiar a lăsat comentarii `//de adaugat` — semn că lista e recunoscută ca incompletă. Într-o aplicație pentru copii, acesta e un gol serios de siguranță a conținutului, nu doar o vulnerabilitate tehnică.

---

## 🟠 RIDICATE

### 7. CORS complet deschis
`server.js`: `app.use(cors())` fără nicio configurare — acceptă cereri de pe orice origine. Combinat cu lipsa de autentificare (#2), orice site poate face cereri către API din numele vizitatorului (mai puțin grav aici pentru că nu există cookie-uri de sesiune, dar tot elimină o linie de apărare pentru viitor).

### 8. Chei API — risc de expunere prin `.env` necontrolat + fără redactare la loguri
`config.js` citește cheile (`CLAUDE_KEY`, `OPENAI_KEY` etc.) direct din `.env`. Fișierul `.gitignore` exclude `.env`, ceea ce e corect, dar:
- nu există niciun mecanism de rotație/validare a cheilor;
- erorile de la provideri sunt logate cu `console.error(err.message)` — de verificat dacă mesajele de eroare de la Anthropic/OpenAI/Gemini pot conține fragmente din cheie (de regulă nu, dar merită un audit când se activează chei reale).

### 9. Detectorul de conținut AI (`detectService.js`) e complet fals, dar prezentat ca real
Scorul e calculat euristic + `Math.random()`, etichetat public drept motor „gptzero_sim" și afișat elevilor/profesorilor ca verdict de încredere („confidence: high"). Nu e o vulnerabilitate de securitate clasică, dar este o **problemă de integritate/etichetare înșelătoare**: un profesor poate lua decizii disciplinare reale pe baza unui verdict parțial aleator.

### 10. Fără validare/sanitizare a input-ului pe majoritatea rutelor
Body-urile sunt folosite aproape direct (`req.body.message`, `req.body.note`, etc.) fără limite de lungime (în afară de `express.json({limit:'10mb'})` global) și fără validare de tip strict. Exemple:
- `POST /api/chat`: `message` fără limită de caractere → poate trimite text foarte lung către providerii AI (cost + latență).
- `image_base64` trimis fără verificare de dimensiune/tip real de imagine înainte de a fi trimis către Mathpix.

### 11. Escaladare de rol client-side, fără verificare server-side
Rolul (`student` / `parent` / `teacher`) e stabilit din formularul de înregistrare (`RegisterScreen.js`) și trimis liber ca `role` la `POST /api/economy/bootstrap` sau `POST /api/subscriptions/checkout`. Backend-ul (`ensureUser`) acceptă orice `role` trimis, fără verificare — oricine se poate declara „profesor" sau „părinte" fără nicio dovadă și capătă acces la funcțiile de dashboard aferente (vezi #3).

### 12. `conversation_id` generat previzibil
În `routes/chat.js`: `conv_${Buffer.from(message).toString('base64').slice(0, 8)}` — id-ul conversației derivă direct din primele caractere ale mesajului, deci e ușor de coliziune/ghicit (două persoane cu primul mesaj identic ajung în aceeași "conversație" din `memoryStore`, care e global, indexat doar după acest id). Nu e izolat pe utilizator.

---

## 🟡 MEDII

### 13. `memoryStore.js` e complet in-memory, global, neizolat pe user
Orice proces care cunoaște (sau ghicește, vezi #12) un `conversation_id` poate citi istoricul acelei conversații via ruta de chat — nu există legătură criptografică între conversație și user.

### 14. Stocare a datelor de profil în `localStorage`, needatate, needate de niciun backend real
`app.js`: `localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))`. Toate datele de profil (nume, telefon, email, școală, clasă) stau needatate în clar în browser, accesibile oricărei extensii de browser instalate sau oricărui script XSS viitor.

### 15. Dependințe încărcate din CDN-uri publice, fără fixare exactă de versiune / SRI parțial
`index.html` încarcă `react@18` și `react-dom@18` (fără versiune minoră fixă), `@babel/standalone`, Tailwind CDN și Three.js r128 din `unpkg`/`cdnjs`, fără `integrity` (SRI) pe React/Babel/Three (doar Font Awesome are `crossorigin`/`referrerpolicy`, nu și hash de integritate). Dacă unul din aceste CDN-uri e compromis, se poate injecta cod arbitrar în aplicație.

### 16. Compilare JSX live în browser cu Babel Standalone (nu e strict o vulnerabilitate, dar are impact de securitate + performanță)
Fiecare vizitator descarcă și rulează un compilator JSX complet client-side. Pe lângă performanța slabă (vezi celălalt raport), asta mărește suprafața de atac (mai mult cod terț executat cu privilegii depline în pagină).

### 17. Lipsă completă de HTTPS/HSTS/security headers
Nu există `helmet` sau headere de securitate (`Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security`) setate în `server.js`. Aplicația servește static + API fără nicio protecție suplimentară la nivel HTTP.

### 18. Username-uri filtrate doar printr-o listă fixă de cuvinte interzise
`RegisterScreen.js`, `FORBIDDEN_USERNAME_WORDS` — listă scurtă, hardcodată, ușor de ocolit cu variații typo/diacritice, similar cu #6.

### 19. Parola nu are verificare reală de robustețe la nivel de backend
`RegisterScreen.js` validează parola doar client-side (`isPasswordValid`). Pentru că nu există endpoint de `/register` pe backend (vezi #1), parola nu ajunge niciodată să fie stocată/verificată — deci criteriile de complexitate sunt complet decorative.

### 20. Fără protecție CSRF (relevant doar când se adaugă autentificare reală cu cookie-uri de sesiune)
De reținut pentru când se implementează autentificarea reală (#1): fără CORS restrictiv (#7) și fără token CSRF, orice viitor flux bazat pe cookie e vulnerabil.

---

## 🟢 MINORE / DE OBSERVAT

### 21. `err.message` din provideri e expus în răspunsul JSON (`error: err.message`)
Poate scurge detalii interne (ex. mesaje de eroare HTTP complete de la Anthropic/OpenAI) către client. Recomandat: loghează detaliat pe server, trimite client-ului un mesaj generic.

### 22. `fallback.innerHTML = ... + event.message + ...` în `index.html`
Textul erorii JS (`event.message`) e inserat direct în `innerHTML`. În teorie, un `Error` cu mesaj controlat de atacator (foarte greu de declanșat aici, dar teoretic posibil printr-un script terț compromis) ar putea injecta HTML. Risc redus, dar ar trebui `textContent` în loc de `innerHTML`.

### 23. `npm audit` curat momentan, dar fără proces de mentenanță
`express@4.22.2`, `cors@2.8.6`, `dotenv@16.6.1` — 0 vulnerabilități la data analizei, dar `package.json` folosește range-uri (`^`) fără `package-lock` verificat în CI și fără Dependabot/`npm audit` automatizat.

---

## Recomandări prioritare (ordine de rezolvare)

1. Implementează autentificare reală (hash parole cu `bcrypt`/`argon2`, sesiune sau JWT semnat, rută `/api/auth/login` + `/register`).
2. Leagă fiecare cerere API de identitatea autentificată (nu de `user_id` trimis liber în body/query) — elimină IDOR-ul (#2).
3. Adaugă confirmare bidirecțională (email/cod) pentru legăturile părinte–copil și profesor–elev (#3).
4. Adaugă rate limiting (`express-rate-limit`) pe toate rutele publice, în special `access-code/verify` și `chat`.
5. Înlocuiește filtrul de siguranță bazat pe cuvinte-cheie cu un clasificator real (sau minim un serviciu de moderare extern) — critic pentru o aplicație pentru copii.
6. Etichetează clar detectorul AI drept experimental/demo, sau înlocuiește-l cu un serviciu real, ca să nu inducă în eroare profesorii.
7. Adaugă `helmet`, CSP, și configurează CORS restrictiv la domeniul frontend-ului real.
8. Fixează versiunile exacte ale librăriilor CDN și adaugă integritate (SRI) sau, mai bine, mută la un build real (vezi raportul de TODO-uri pentru detalii despre migrarea de la Babel-in-browser).

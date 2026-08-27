# Deploy pe gazduire.net (DirectAdmin + CloudLinux)

Setup pentru sincronizare automată: fiecare push pe `main` urcă aplicația pe
hosting și repornește procesul Node, deci vezi modificările pe domeniu în
aproximativ un minut.

Aplicația rulează ca **o singură aplicație Node**, pe același domeniu.
`backend/server.js` servește frontend-ul compilat din `frontend/dist`
(după `npm run build` în GitHub Actions):

```js
app.use(express.static(distDir));
app.get(/^\/(?!api\/).*/, (req, res) => { ... });
```

Deci nu ai nevoie de un host separat pentru API, nu ai CORS de configurat și
nu ai probleme de mixed content.

---

## Pasul 1 - Creează aplicația Node în DirectAdmin

În DirectAdmin: **Extra Features** (sau **Advanced Features**) →
**Setup Node.js App** → **Create Application**.

| Câmp | Valoare |
| --- | --- |
| Node.js version | 18.x sau mai nou |
| Application mode | Production |
| Application root | `mentor-ai` |
| Application URL | domeniul tău |
| Application startup file | `backend/server.js` |

Două detalii care contează:

- **Application root trebuie să fie folderul care conține `backend/` și
  `frontend/`**, nu `backend/`. Serverul rezolvă frontend-ul ca
  `path.join(__dirname, "..", "frontend")`, deci structura din repo trebuie
  păstrată intactă.
- **Nu configura portul.** CloudLinux atribuie portul prin variabila `PORT`,
  iar `backend/src/config.js` o citește deja (`process.env.PORT || 3001`).

Dacă opțiunea nu apare în panel, cere-le suport să activeze Node.js Selector
pe contul tău (planurile gazduire.net rulează CloudLinux și listează NodeJS ca
inclus).

## Pasul 2 - Configurează secretele în GitHub

**Settings → Secrets and variables → Actions**.

La tab-ul **Secrets** (valori sensibile, nu se mai pot citi după salvare):

| Secret | Valoare |
| --- | --- |
| `FTP_SERVER` | hostname-ul FTP de la gazduire.net |
| `FTP_USERNAME` | utilizatorul FTP |
| `FTP_PASSWORD` | parola FTP |

La tab-ul **Variables** (valori normale, vizibile):

| Variabilă | Valoare | Observații |
| --- | --- | --- |
| `FTP_SERVER_DIR` | `./mentor-ai/` | Calea către Application root, relativ la folderul în care aterizează userul FTP |
| `FTP_PROTOCOL` | `ftps` | Pune `ftp` doar dacă hostul nu suportă FTPS |

Folosește **FTPS** dacă poți. FTP simplu trimite parola în clar la fiecare
deploy.

## Pasul 3 - Primul deploy

Fă un push pe `main` (sau rulează workflow-ul manual din tab-ul **Actions** →
**Deploy** → **Run workflow**). Workflow-ul din
[.github/workflows/deploy.yml](.github/workflows/deploy.yml):

1. instalează dependințele și compilează frontend-ul cu Vite (`npm run build`);
2. verifică sintaxa fiecărui fișier din `backend/` - un deploy cu o eroare de
   sintaxă ar lăsa site-ul căzut, pentru că Passenger nu poate porni procesul;
3. scrie `tmp/restart.txt` cu data curentă;
4. sincronizează fișierele prin FTPS, incremental (doar ce s-a schimbat),
   inclusiv `frontend/dist`.

`node_modules` este exclus intenționat: sunt mii de fișiere și transferul prin
FTP ar dura foarte mult.

## Pasul 4 - Instalează dependințele pe server

O singură dată, după primul deploy: în **Setup Node.js App**, apasă
**Run NPM Install**. Aplicația are câteva dependințe JS pure (`express`,
`cors`, `dotenv`, `express-rate-limit`, `zod`, `nodemailer`), deci durează câteva secunde.

Repetă pasul doar când se schimbă `backend/package.json` sau `package.json`
din rădăcină.

Frontend-ul nu se mai compilează în browser. Workflow-ul de deploy rulează
`npm run build` și urcă `frontend/dist`. Pe server nu trebuie Vite.

Dacă butonul cere un `package.json` în Application root și al tău e în
`backend/`, ai două variante: pornește instalarea prin SSH
(`cd ~/mentor-ai/backend && npm install --omit=dev`), sau setează Application
root pe `mentor-ai/backend` **și** mută frontend-ul corespunzător - prima
variantă e mai simplă.

## Pasul 5 - Setează variabilele de mediu

**Recomandat: direct în interfața Setup Node.js App**, la secțiunea de
environment variables. Valorile ajung ca variabile reale de proces, deci
`dotenv` nu mai are nicio treabă.

Merită să știi de ce recomand asta: `config.js` apelează `require("dotenv").config()`
fără cale explicită, iar dotenv citește `.env` din **directorul curent al
procesului**, nu de lângă fișierul `config.js`. Local rulezi din `backend/`, deci
`backend/.env` funcționează. Sub Passenger, directorul curent este Application
root, deci un `backend/.env` ar fi ignorat în silence - exact genul de problemă
care se depanează greu. Variabilele setate din panel evită complet ambiguitatea.

Variabilele disponibile sunt documentate în
[backend/.env.example](backend/.env.example). Minimul pentru producție:

```
STAGING_AUTH_USER=<alege un user>
STAGING_AUTH_PASSWORD=<alege o parolă>
```

Fără chei de AI aplicația funcționează, dar toate răspunsurile sunt mock.
La fel pentru plăți (Stripe), email (SMTP), SMS (Twilio) și calendar
(Google/Notion): fără chei, fluxurile rămân mock și răspunsul include
`mocked: true`.

Pentru plăți live și OAuth, setează și:

```
APP_BASE_URL=https://domeniul-tau.ro
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NOTION_CLIENT_ID=
NOTION_CLIENT_SECRET=
SMTP_HOST=
SMTP_FROM=
```

Webhook-ul Stripe este `POST /api/subscriptions/webhook` (body brut, fără
JSON parser). Redirectul OAuth este
`/api/calendar/oauth/{google|notion}/callback`.

Dacă frontend-ul și API-ul sunt pe același domeniu, nu trebuie să setezi
`CORS_ORIGINS`. Completeaz-o doar dacă apeți API-ul de pe un alt origin
(de exemplu un preview). Origini necunoscute nu mai primesc
`Access-Control-Allow-Credentials`, deci cookie-ul de sesiune nu poate fi
folosit cross-site de un domeniu oarecare.

## Pasul 6 - Verifică

```
https://domeniul-tau.ro/api/health
```

Ruta răspunde cu starea fiecărui provider și rămâne accesibilă fără parolă, ca
să poți conecta monitorizare externă. Restul site-ului cere user și parolă dacă
ai setat variabilele din pasul 5.

---

## Protecție extra pe prototipul public

Autentificarea pe conturi există (Faza 1): identitatea vine din cookie-ul
`mentor_session`, nu din `user_id` trimis de client. Cât instanța e un
prototip pe un URL ghicibil, ține totuși `STAGING_AUTH_USER` și
`STAGING_AUTH_PASSWORD` setate, ca să nu indexeze motoarele de căutare
paginile și ca Basic Auth să stea în fața formularului de register.

Nu pune date reale despre elevi pe o instanță de staging.

## Unde stau datele

Conturile, monedele, abonamentele, calendarul și istoricul conversațiilor sunt
salvate în `data/mentor-ai.json`, în rădăcina aplicației (configurabil prin
`DATA_DIR`). Fișierul este scris automat la câteva secunde după orice
modificare și încă o dată la oprirea procesului, deci datele supraviețuiesc
restartului și deploy-ului.

Trei lucruri de reținut:

- **Folderul `data/` este exclus din sincronizarea prin FTP.** Acțiunea de
  deploy șterge de pe server fișierele care nu există în repo; fără excludere,
  fiecare deploy ar șterge toate conturile. Exclusion-ul este deja în
  [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
- **Include-l în backup-uri.** Backup-ul zilnic de la gazduire.net acoperă
  contul, deci și acest fișier, dar merită verificat că e acolo.
- **Fișierul conține date despre minori.** Nu îl copia în afara serverului fără
  motiv și nu îl comite niciodată în git (este în `.gitignore`).

Dacă fișierul se corupe, aplicația nu refuză să pornească: îl mută într-un
`mentor-ai.json.corupt-<timestamp>` și pornește pe curat, ca site-ul să rămână
funcțional.

Un fișier JSON este suficient pentru volumul de acum și nu are nicio
dependință, ceea ce conteaza pe shared hosting, unde `npm install` rulează pe
server. Când numărul de utilizatori crește, locul de înlocuit este doar
`backend/src/data/persistence.js` - MySQL este disponibil în DirectAdmin, iar
driverul `mysql2` este pur JavaScript, deci nu cere compilare.

## Rollback

Deploy-ul urmează `main`, deci cel mai rapid rollback este:

```bash
git revert <commit>
git push origin main
```

Următorul deploy pornește automat și readuce versiunea anterioară.

## Alternativă: deploy prin SSH

Planurile gazduire.net includ acces SSH, care e mai bun decât FTP: folosește
chei în loc de parolă, sincronizează mai repede și poate rula `npm install`
singur. Dacă vrei să treci pe SSH, înlocuiește pasul de sincronizare cu:

```yaml
      - name: Deploy prin SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd ~/mentor-ai
            git pull origin main
            cd backend && npm install --omit=dev
            mkdir -p ~/mentor-ai/tmp && touch ~/mentor-ai/tmp/restart.txt
```

Pentru varianta asta trebuie să faci o dată `git clone` al repo-ului în
`~/mentor-ai` pe server și să adaugi cheia publică în `~/.ssh/authorized_keys`.

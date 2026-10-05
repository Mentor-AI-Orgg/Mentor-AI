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

Workflow-ul de deploy citește environment-ul GitHub **`mentor.ai`**.

Calea corectă: **Settings → Environments → `mentor.ai`** (creează-l dacă
nu există) → **Environment secrets** / **Environment variables**.

| Secret | Valoare |
| --- | --- |
| `FTP_SERVER` | hostname-ul FTP de la gazduire.net |
| `FTP_USERNAME` | utilizatorul FTP |
| `FTP_PASSWORD` | parola FTP |

| Variabilă | Valoare | Observații |
| --- | --- | --- |
| `FTP_SERVER_DIR` | `./mentor-ai/` | Calea către Application root, relativ la folderul în care aterizează userul FTP |
| `FTP_PROTOCOL` | `ftps` | Pune `ftp` doar dacă hostul nu suportă FTPS |

Numele trebuie să fie **exact** cele de mai sus (majuscule, underscore).

Dacă le pui doar la **Settings → Secrets and variables → Actions**
(Repository secrets), tot funcționează: job-ul le vede ca fallback. Nu le
pune într-un environment cu alt nume — workflow-ul nu îl citește, iar
acțiunea FTP eșuează cu `Input required and not supplied: server`.

Folosește **FTPS** dacă poți. FTP simplu trimite parola în clar la fiecare
deploy.

## Pasul 3 - Primul deploy

Fă un push pe `main`. Workflow-ul **CI** rulează lint, teste și build.
**Deploy** pornește doar după ce CI s-a încheiat cu succes pe `main`
(`workflow_run`, condiția `conclusion == success`). Poți porni deploy-ul și
manual: **Actions** → **Deploy** → **Run workflow**. Workflow-ul din
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
**Run NPM Install**. Application root este folderul care are `package.json`
din rădăcina repo-ului. Dacă instalezi din `backend/`, acolo sunt aceleași
pachete de server (`express`, `helmet`, `nodemailer`, `zod`). Durează
câteva secunde.

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
[backend/.env.example](backend/.env.example). Nu e nevoie de parolă de
staging: elevul intră cu emailul și parola contului. Dacă vrei din nou
poarta HTTP Basic, pune `ENABLE_STAGING_AUTH=1` plus `STAGING_AUTH_USER`
și `STAGING_AUTH_PASSWORD`.

Cât site-ul e închis, publicul vede „În curând”. Tu deschizi aplicația
din formularul **Intrare creator**, cu `PREVIEW_PASSWORD` setată în
DirectAdmin. Dacă parola lipsește, nimeni nu intră. Nu o pune în adresă.
După `SITE_PUBLIC=1`, copiii intră fără parola asta. `/creator` rămâne:
aceeași parolă pune cookie-ul cerut de moderare. Încercările sunt limitate pe IP.
Cookie-ul se semnează cu `PREVIEW_COOKIE_SECRET` (cel puțin 32 de caractere).
`SESSION_SECRET` are tot cel puțin 32 de caractere; fără el aplicația nu pornește în producție.
`HEALTH_TOKEN` deschide detaliile din `/api/health` (dacă emailul e configurat și cât de veche e copia). Fără token, ruta răspunde doar `{ ok, version }`.
Ca să vezi iar pagina
publică: `https://suntde10.ro/creator/iesire`.
`BACKUP_KEY` cifrează doar copiile rapide bak1–bak3. Cifrarea nu blochează
salvarea: rulează după scriere, cel mult o dată la 15 minute.
Pune un șir de cel puțin 16 caractere. `BACKUP_PUBLIC_KEY` este cheia publică
RSA pentru copia zilnică. Cheia privată nu se pune pe server.

## Copii de rezervă

Copia zilnică stă în `backups/`, lângă `data/`, nu în site-ul public.
Este gzip, apoi AES-256-GCM, iar cheia AES este înfășurată cu `BACKUP_PUBLIC_KEY`.
Se păstrează 14 zile și 4 duminici. Fișierele `data/*.pre-*` mai vechi de 35 de zile se șterg odată cu rotația.

Pe laptop, o singură dată:

```bash
node scripts/backup-keygen.mjs
```

`backup-public.pem` intră în DirectAdmin ca `BACKUP_PUBLIC_KEY`, sau ca fișier
`backend/backup-public.pem`. `backup-private.pem` rămâne pe laptop și pe un stick.
Nu o urca și nu o comite.

Cron în DirectAdmin, în fiecare zi la 03:30, dacă ceasul serverului e pe ora României.
Calea către `node` o copiezi din **Setup Node.js App** (linia „Enter to the virtual environment”):

```bash
30 3 * * * cd ~/domains/suntde10.ro/public_html/mentor-ai && /home/USER/nodevenv/domains/suntde10.ro/public_html/mentor-ai/18/bin/node backend/src/ops/backup.js
```

Înlocuiește `USER` și `18` cu userul și versiunea din panou. La pornire, dacă ultima copie are peste 26 de ore, se face una imediat. `/api/health` cu `HEALTH_TOKEN` arată data și mărimea, fără conținut.

GitHub Actions (`.github/workflows/backup-pull.yml`) descarcă la 04:30 ora României, vara, cea mai nouă copie și o ține 35 de zile ca artifact. Dacă descărcarea pică sau copia are peste 26 de ore, workflow-ul pică. O dată pe săptămână, descarcă și tu cea mai nouă copie din File Manager, folderul `backups/`, pe laptop.

### Restaurare

1. Oprește aplicația Node din DirectAdmin.
2. Copiază `data/mentor-ai.json` în `data/mentor-ai.json.inainte-de-restaurare`.
3. Pe laptop, cu cheia privată:

```bash
node scripts/backup-restore.mjs --copie mentor-ai-AAAA-LL-ZZ.json.gz.enc --cheie backup-private.pem --curent mentor-ai.json --iesire mentor-ai.restaurat.json
```

`--curent` este fișierul de acum, ca să se aplice ștergerile făcute după data copiei.
4. Urcă `mentor-ai.restaurat.json` peste `data/mentor-ai.json`.
5. Pornește aplicația și verifică `/api/health`.

### Exercițiu, înainte de lansare și apoi la 3 luni

Pe un folder local, nu pe server: descarcă artifact-ul din GitHub → Actions, rulează comanda de restaurare, pornește aplicația cu `DATA_DIR` spre folderul restaurat și intră cu un cont de test.

`ADMIN_EMAIL` primește alerta când aplicația înregistrează o eroare (prima
de un tip într-o oră, maxim 10 pe zi), când ultima copie de siguranță are
peste 26 de ore, sau când SMTP eșuează de 3 ori la rând. Mesajul are tipul,
numărul de apariții și un id scurt, fără date despre copii. Fără adresă,
erorile rămân doar în `logs/errors.log` pe server (în afara site-ului public,
nu se urcă în git). Sentry nu este pornit.

Pagina de confidențialitate rămâne deschisă și cât site-ul e închis.
Numele, adresa și emailul operatorului vin din variabile, nu din repo:

```
LEGAL_OPERATOR_NAME=
LEGAL_OPERATOR_ADDRESS=
LEGAL_CONTACT=
LEGAL_CUI=
LEGAL_DPO=
```

`LEGAL_CUI` rămâne gol dacă operatorul este persoană fizică. `LEGAL_DPO`
rămâne gol dacă nu există un responsabil cu protecția datelor. Dacă
numele, adresa sau emailul lipsesc, pagina arată un TODO, iar
`npm run prelansare` iese cu cod 1. Nu pune un CIF sau o adresă inventată.

Tutorele răspunde din lecții, fără chei de AI. Emailul către părinte
are nevoie de SMTP. Calendarul stă în aplicație, fără Google sau Notion.
Nu există plăți.

Pentru linkurile din email:

```
APP_BASE_URL=https://suntde10.ro
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
```

`APP_BASE_URL` este obligatoriu în producție: un URL `https`, fără slash
final, de exemplu `https://suntde10.ro`. Dacă lipsește sau nu este valid,
aplicația nu pornește și `npm run prelansare` iese cu cod 1. Linkurile
către părinte nu se construiesc din antetul `Host` sau `X-Forwarded-Host`.

`SMTP_FROM` trebuie să fie o adresă de pe domeniul site-ului, de exemplu
`nu-raspunde@suntde10.ro`. Linkul de acord pleacă doar pe email. Dacă
mesajul cade în Spam, părintele nu confirmă, iar după 14 zile contul se
șterge. Nu deschide site-ul (`SITE_PUBLIC` rămâne gol) până nu primești
un email de probă în inbox, nu în Spam.

## SPF, DKIM și DMARC

În DirectAdmin, la domeniul `suntde10.ro`:

1. **DNS Management**. Adaugă sau corectează o înregistrare TXT pentru SPF.
   Dacă trimiți doar prin serverul de mail al aceluiași cont, forma minimă
   este `v=spf1 a mx -all`. Dacă SMTP-ul este alt serviciu, pune include-ul
   lui în loc de `a mx` și lasă un singur SPF. Două înregistrări SPF se
   anulează una pe alta.
2. **Account Manager → Email Accounts**, sau **DNS Management → DKIM**.
   Activează DKIM pentru domeniu. DirectAdmin scrie singur înregistrarea
   TXT cu selectorul lui. Nu o șterge la un deploy.
3. Adaugă DMARC, tot TXT, pe numele `_dmarc`:
   `v=DMARC1; p=none; rua=mailto:LEGAL_CONTACT`.
   `p=none` doar la început, ca să vezi rapoartele. După ce SPF și DKIM
   trec la un email de probă, poți trece la `p=quarantine`.
4. Trimite un email de acord către o căsuță pe care o deschizi tu
   (Gmail și Yahoo, dacă poți). În mesajul original trebuie să vezi
   `spf=pass` și `dkim=pass`. Dacă vezi `fail` sau mesajul e în Spam,
   nu conta pe fluxul de acord și nu pune `SITE_PUBLIC=1`.

Aplicația nu poate verifica DNS-ul din Node. Avertismentul de mai sus
este condiția de lansare pentru linkurile de acord.

Dacă frontend-ul și API-ul sunt pe același domeniu, nu trebuie să setezi
`CORS_ORIGINS`. Completeaz-o doar dacă apeți API-ul de pe un alt origin
(de exemplu un preview). Origini necunoscute nu mai primesc
`Access-Control-Allow-Credentials`, deci cookie-ul de sesiune nu poate fi
folosit cross-site de un domeniu oarecare.

## Pasul 6 - Verifică

```
https://domeniul-tau.ro/api/health
```

Ruta răspunde cu `{ "ok": true }` și rămâne accesibilă fără parolă, ca
să poți conecta monitorizare externă. Restul site-ului cere user și parolă dacă
ai setat variabilele din pasul 5.

---

## Protecție extra pe prototipul public

Autentificarea pe conturi există (Faza 1): identitatea vine din cookie-ul
`s10_session`, nu din `user_id` trimis de client. Cât instanța e un
prototip pe un URL ghicibil, ține totuși `STAGING_AUTH_USER` și
`STAGING_AUTH_PASSWORD` setate, ca să nu indexeze motoarele de căutare
paginile și ca Basic Auth să stea în fața formularului de register.

Nu pune date reale despre elevi pe o instanță de staging.

## Unde stau datele

Conturile, monedele, abonamentele, calendarul și istoricul conversațiilor sunt
salvate în `data/mentor-ai.json`, în rădăcina aplicației (configurabil prin
`DATA_DIR`). Fișierul este scris automat la câteva secunde după orice
modificare și încă o dată la oprirea procesului, deci datele supraviețuiesc
restartului și deploy-ului. Conversațiile cu tutorele mai vechi de 90 de zile
se scot la încărcare și la salvare; conturile și progresul nu se ating.

Passenger trebuie să ruleze un singur proces Node (pool de 1). Un al doilea
proces nu scrie peste fișier: `data/mentor-ai.json.lock` ține pid-ul, iar
procesul nou lasă datele neatinse cât timp primul trăiește.

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

Numele de utilizator care nu mai trec de verificarea de pe server sunt
marcate la pornire. Copilul, la următoarea intrare, își alege alt nume și
până atunci nu apare la prieteni sau în clasament. Ca să vezi lista (doar în
consolă, fără emailuri), din aplicația Node:

```bash
node backend/src/ops/auditUsernames.js
```

Un fișier JSON este suficient pentru volumul de acum și nu are nicio
dependință, ceea ce conteaza pe shared hosting, unde `npm install` rulează pe
server. Când numărul de utilizatori crește, locul de înlocuit este doar
`backend/src/data/persistence.js` - MySQL este disponibil în DirectAdmin, iar
driverul `mysql2` este pur JavaScript, deci nu cere compilare.

## Deploy doar după CI verde

Deploy-ul nu mai pornește la fiecare push. `.github/workflows/deploy.yml`
ascultă `workflow_run` pentru workflow-ul **CI**, pe ramura `main`, și intră
în job doar dacă `github.event.workflow_run.conclusion == 'success'`.
Pornirea manuală (`workflow_dispatch`) rămâne. Excluderile din upload
(`data/**`, `scripts/**`, `tests/**`, `*.md`) rămân.

Un push pe o ramură, sau un merge pe `main` al unui commit cu teste picate,
nu sincronizează hostingul. După ce CI e verde pe `main`, deploy-ul pornește
singur.

### Protecția ramurii main

Ca un PR cu teste picate să nu poată fi unit în `main`:

1. Pe GitHub: **Settings** → **Rules** → **Rulesets** (sau **Branches** →
   **Add branch protection rule**), ramura `main`.
2. Activează **Require a pull request before merging**.
3. Activează **Require status checks to pass before merging**.
4. Caută și bifează jobul **quality** din workflow-ul **CI**.
5. Salvează. De aici, butonul de merge stă blocat până CI e verde.

Dependabot deschide săptămânal PR-uri npm pentru rădăcină și pentru
`backend/` (`.github/dependabot.yml`).

## UptimeRobot

Ca să afli când site-ul nu mai răspunde, fără să instalezi nimic pe server:

1. Cont gratuit pe [uptimerobot.com](https://uptimerobot.com).
2. **Add New Monitor** → tip **HTTP(s)**.
3. URL: `https://suntde10.ro/api/health`.
4. Interval: **5 minute**.
5. Alert Contacts: adresa de email a lui David.
6. Salvează. Ruta răspunde `{ "ok": true }` fără date despre copii.

Dacă oprești aplicația din DirectAdmin, monitorul vede că health nu mai
răspunde și trimite emailul.

## Rollback

Deploy-ul urmează `main` după un CI reușit, deci cel mai rapid rollback este:

```bash
git revert <commit>
git push origin main
```

După ce CI reușește pe `main`, deploy-ul readuce versiunea anterioară.

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

# Plan: de la fișierul JSON la MySQL

Aplicația ține conturile într-un singur fișier, `data/mentor-ai.json`, prin `backend/src/data/persistence.js`. Asta e potrivit cât timp sunt puține conturi. Planul de mai jos spune când se trece pe MySQL (disponibil pe gazduire.net) și cum. Nu se implementează acum.

## Când nu mai ajunge fișierul

Se trece pe MySQL dacă se întâmplă una dintre acestea:

- peste aproximativ 5.000 de conturi active (un copil care a intrat în ultimele 90 de zile);
- fișierul trece de aproximativ 20 MB;
- salvarea durează vizibil (aplicația se blochează la fiecare scriere, pentru că tot fișierul se rescrie).

Până atunci se rămâne pe JSON. Backup-ul criptat din etapa T7 rămâne valabil.

## Tabele

Un cont, un rând. Fără date în plus față de ce e deja în JSON.

- `accounts`: email intern, nume de utilizator, hash-ul parolei, sarea, clasa, emailul părintelui, acordul, data ultimei intrări, suspendare, nume de schimbat.
- `sessions`: tokenul hash-uit, contul, expirarea.
- `economy`: monede, XP, inventar, capitole, jurnalul de activitate (JSON în coloană, până se sparge pe rânduri).
- `friends`: perechi, cereri, blocări.
- `calendar_events`: data, titlul, tipul, ora.
- `moderation_reports` și `moderation_log`: rapoartele și jurnalul de 12 luni.
- `consent_tokens`, `reset_tokens`: token hash-uit și expirare.

Cheile străine folosesc id-ul intern al contului, nu emailul în clar în tabelele publice.

## Cum se migrează

1. Copie de siguranță a `data/mentor-ai.json` (criptată, ca în T7) și o copie pe laptop.
2. Script local `scripts/json-to-mysql.mjs` (de scris atunci, nu acum): citește JSON-ul, inserează în tabele, într-o tranzacție.
3. Se compară numărul de conturi și un cont de test (login, o lecție, export).
4. `persistence.js` capătă un mod `STORE=mysql`. Până e verificat, `STORE=json` rămâne implicit.
5. Pe server se pune parola MySQL doar în mediul DirectAdmin, nu în repo.

Dacă migrarea eșuează, se revine la fișierul JSON din copie. Nu se șterge JSON-ul în aceeași zi.

## Backup-ul după migrare

- În fiecare noapte, `mysqldump` al bazei, criptat cu aceeași `BACKUP_KEY`, păstrat 3 copii, ca bak1–bak3.
- Restaurarea: script separat, oprit site-ul, import, pornit din nou.
- Verificarea de 26 de ore din T9 se mută pe data fișierului de dump, nu pe `mentor-ai.json`.
- Fișierul JSON rămâne o copie de rezervă încă 40 de zile, apoi se șterge de pe server.

## Ce nu se face acum

Nu se adaugă `mysql2`, nu se creează baza, nu se schimbă store-urile. Documentul e doar planul.

# Evaluare de impact (DPIA), simplă

Document intern. Prelucrarea datelor copiilor de 10–14 ani.

## Ce se întâmplă

Un părinte dă acordul. Copilul are un nume de utilizator și o parolă. Aplicația ține minte lecțiile făcute, XP-ul, monedele, prietenii și, dacă e cazul, un raport către un adult. Nu există reclamă și nu se vinde nimic.

## Riscuri

- Un copil vede numele altui copil în clasament. Clasamentul e doar pentru conturi logate, cu acord, iar profilul privat e ascuns.
- Un nume nepotrivit. Există filtru și butonul Raportează, plus panoul de moderare.
- Cineva ghicește parola. Minim 8 caractere, se refuză parolele foarte cunoscute și parola egală cu numele.
- Fișierul JSON e furat de pe server. Parolele sunt hash-uite. Backup-ul e criptat dacă există `BACKUP_KEY`.
- Un email către părinte pleacă la adresa greșită. Schimbarea de email se confirmă pe adresa nouă.

## Măsuri deja luate

Cookie de sesiune httpOnly, limite de cereri, fără stack în răspunsul de eroare, fără date de copii în alerta de email, ștergerea contului la cerere, rapoartele autorului șters devin anonime.

## Ce mai lipsește

- [DE COMPLETAT: cine aprobă această evaluare și data]
- [DE COMPLETAT: dacă se consultă ANSPDCP înainte de lansarea publică]
- Revizuire când apare baza de date (vezi `docs/plan-baza-de-date.md`) sau când se adaugă un furnizor nou.

Concluzie: riscul rămâne limitat dacă site-ul rămâne închis până sunt setate parola de creator, SMTP-ul și backup-ul, și dacă nu se adaugă Sentry sau alt furnizor fără o linie nouă aici.

# Furnizori și contracte de prelucrare

Document intern. Lista celor care pot vedea date despre copii sau despre părinți.

| Furnizor | Ce face | Unde | Contract |
| --- | --- | --- | --- |
| gazduire.net | serverul (DirectAdmin, Passenger) și, la nevoie, MySQL | [DE COMPLETAT: țara / UE] | [DE COMPLETAT: numărul și data contractului de prelucrare] |
| Email SMTP | trimite emailul către părinte | [DE COMPLETAT: numele furnizorului, țara] | [DE COMPLETAT: contractul] |
| UptimeRobot | verifică doar `https://suntde10.ro/api/health`, fără date de copii | [DE COMPLETAT: contul lui David] | nu prelucrează date de copii; primește doar „ok” |
| Umami (cloud.umami.is) | numără vizitele paginii. Fără cont, fără chat, fără identificarea copilului | cloud.umami.is, deja în pagina HTML | [DE COMPLETAT: contul și contractul, dacă Umami vede ceva dincolo de un număr de vizite] |
| Sentry | doar dacă `SENTRY_DSN` și `VITE_SENTRY_DSN` sunt setate. Trimite tipul erorii, fără nume, email, chat, IP și fără înregistrare de sesiune. Oprit implicit | [DE COMPLETAT: regiunea proiectului, când se pornește] | se adaugă contractul înainte de a pune DSN-ul. Până atunci nu primește date |

Nu sunt folosite: plăți, SMS, publicitate. Sentry rămâne oprit cât timp DSN-ul lipsește. Umami este deja în pagină.

OpenAI și Mathpix apar în mediu doar dacă se pornește recenzia foto. Implicit nu se trimit poze. Dacă se pornesc, se adaugă o linie aici și în pagina de confidențialitate înainte.

La fiecare furnizor nou: o linie în tabel, o frază în politica publică (etapa T4) și, dacă vede date de copii, un contract semnat înainte de a primi date.

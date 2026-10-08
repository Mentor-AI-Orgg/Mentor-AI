# Registrul activităților de prelucrare (art. 30 GDPR)

Document intern, pentru David. Nu se publică pe site.

Operator: [DE COMPLETAT: numele legal, CUI, adresa]

Responsabil: [DE COMPLETAT: numele lui David, telefon, email]

Aplicația: Sunt de 10, https://suntde10.ro. Copii de 10–14 ani, clasele 5–8, română și matematică. Gratuit.

## Activități

| Activitate | Date | De ce | Cât timp | Cine mai vede |
| --- | --- | --- | --- | --- |
| Cont de elev | nume de utilizator, parolă (hash), clasă, email intern generat | contul și lecțiile | până la ștergere; inactiv 24 de luni | doar serverul |
| Acordul părintelui | emailul părintelui, data acordului, versiunea politicii | temeiul pentru un copil | cât ține contul | părintele, prin link |
| Progres | XP, monede, capitole, răspunsuri corectate de server | aplicația și clasamentul pentru copiii logați | cât ține contul | copilul; părintele prin emailul de activitate |
| Prieteni și rapoarte | id public, motivul raportului, blocarea | siguranța între copii | raportul rămâne, autorul devine „anonim” la ștergere; jurnalul de moderare 12 luni | David, în panoul de creator |
| Emailuri | adresa părintelui, subiectul | informare, fără reclamă | cât ține contul; maxim 3 pe zi | furnizorul de email |
| Jurnal de erori | id scurt, rută, cod, fără email | repararea aplicației | 30 de zile pe disc | David, prin alerta de email. Sentry doar dacă DSN-ul este pus, și atunci fără nume, email, chat sau IP |
| Vizite | număr de pagini, fără cont | să se vadă dacă site-ul e folosit | la Umami | Umami, deja în pagină |

Nu se colectează: nume real obligatoriu, telefon, școală, poză de profil, locație, reclamă.

Temei: acordul părintelui (art. 8) și interesul legitim pentru securitatea contului (jurnal de erori, limite).

Drepturi: export JSON și ștergere din profil sau de către părinte, din etapa T3.

Măsuri: parolă cu hash, cookie httpOnly, site închis până la `SITE_PUBLIC=1`, backup criptat, clasament doar pentru copiii logați cu acord.

Transfer în afara UE: [DE COMPLETAT: nu, dacă SMTP-ul și gazda sunt în UE. Dacă un furnizor e în afara UE, se scrie aici.]

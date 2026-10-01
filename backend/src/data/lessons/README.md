# Lecțiile „Sunt de 10”

Acest folder ține infrastructura comună a lecțiilor. Capitolele de matematică stau în `backend/src/data/mate*.js`. Româna stă în `backend/src/data/romana-lectii/`, câte un fișier pe unitate. `romana5Litera.js` … `romana8Litera.js` sunt re-exporturi.

Starea din tabel este cea de dinainte de rescriere (cuvinte din `platter`). ⬜ înseamnă că etapa capitolului nu a rulat. ✅ se bifează când capitolul intră în `RESTRUCTURED` (din Etapa 0C).

## Matematică

| Cheie | Fișier | Lecții | Cuvinte | Stare |
|---|---|---:|---:|---|
| `matematica:5:naturale` | `mate5Naturale.js` | 31 | 9052 | ⬜ |
| `matematica:5:fractii` | `mate5Fractii.js` | 33 | 8257 | ⬜ |
| `matematica:5:geometrie` | `mate5Geometrie.js` | 19 | 5685 | ⬜ |
| `matematica:6:multimi` | `mate6Multimi.js` | 10 | 2489 | ⬜ |
| `matematica:6:proportii` | `mate6Proportii.js` | 9 | 2282 | ⬜ |
| `matematica:6:intregi-rationale` | `mate6Numere.js` | 22 | 4617 | ⬜ |
| `matematica:6:triunghi` | `mate6Geometrie.js` | 31 | 7524 | ⬜ |
| `matematica:7:reale` | `mate7Reale.js` | 19 | 4242 | ⬜ |
| `matematica:7:ecuati` | `mate7Ecuatii.js` | 7 | 1775 | ⬜ |
| `matematica:7:date` | `mate7Date.js` | 5 | 1430 | ⬜ |
| `matematica:7:geo7` | `mate7Geometrie.js` | 38 | 8576 | ⬜ |
| `matematica:8:intervale` | `mate8Intervale.js` | 10 | 2964 | ⬜ |
| `matematica:8:algebric` | `mate8Algebric.js` | 12 | 3376 | ⬜ |
| `matematica:8:functii` | `mate8Functii.js` | 8 | 2400 | ⬜ |
| `matematica:8:spatiu` | `mate8Spatiu.js` | 30 | 7990 | ⬜ |

## Română

| Cheie | Fișier | Lecții | Cuvinte | Stare |
|---|---|---:|---:|---|
| `romana:5:evaluare-initiala` | `romana-lectii/r5-evaluare-initiala.js` | 2 | 847 | ⬜ |
| `romana:5:cuvinte` | `romana-lectii/r5-cuvinte.js` | 28 | 7766 | ⬜ |
| `romana:5:cartea` | `romana-lectii/r5-cartea.js` | 17 | 5511 | ⬜ |
| `romana:5:povestirea` | `romana-lectii/r5-povestirea.js` | 19 | 6466 | ⬜ |
| `romana:5:prietenia` | `romana-lectii/r5-prietenia.js` | 15 | 5013 | ⬜ |
| `romana:5:natura` | `romana-lectii/r5-natura.js` | 10 | 3406 | ⬜ |
| `romana:5:trepte` | `romana-lectii/r5-trepte.js` | 15 | 4905 | ⬜ |
| `romana:5:eroi` | `romana-lectii/r5-eroi.js` | 7 | 2430 | ⬜ |
| `romana:6:recapitulare-initiala` | `romana-lectii/r6-recapitulare-initiala.js` | 4 | 885 | ✅ |
| `romana:6:lumea-de-acasa` | `romana-lectii/r6-lumea-de-acasa.js` | 13 | 3742 | ✅ |
| `romana:6:taramul-prieteniei` | `romana-lectii/r6-taramul-prieteniei.js` | 14 | 4291 | ✅ |
| `romana:6:intelepciunea-lumii` | `romana-lectii/r6-intelepciunea-lumii.js` | 13 | 4435 | ✅ |
| `romana:6:tablouri-de-poveste` | `romana-lectii/r6-tablouri-de-poveste.js` | 13 | 3956 | ✅ |
| `romana:6:calatorii-literare` | `romana-lectii/r6-calatorii-literare.js` | 11 | 4964 | ✅ |
| `romana:6:ferestre-spre-viitor` | `romana-lectii/r6-ferestre-spre-viitor.js` | 11 | 4854 | ✅ |
| `romana:6:incheierea-anului` | `romana-lectii/r6-incheierea-anului.js` | 4 | 1492 | ✅ |
| `romana:7:recapitulare-initiala` | `romana-lectii/r7-recapitulare-initiala.js` | 4 | 1779 | ✅ |
| `romana:7:pe-drumul-cunoasterii` | `romana-lectii/r7-pe-drumul-cunoasterii.js` | 20 | 10190 | ✅ |
| `romana:7:punti-intre-lumi` | `romana-lectii/r7-punti-intre-lumi.js` | 17 | 7883 | ✅ |
| `romana:7:taramul-sentimentelor` | `romana-lectii/r7-taramul-sentimentelor.js` | 16 | 8075 | ✅ |
| `romana:7:lumea-teatrului` | `romana-lectii/r7-lumea-teatrului.js` | 19 | 9015 | ✅ |
| `romana:7:calator-prin-lume` | `romana-lectii/r7-calator-prin-lume.js` | 16 | 8763 | ✅ |
| `romana:7:privind-catre-mine` | `romana-lectii/r7-privind-catre-mine.js` | 12 | 6545 | ✅ |
| `romana:8:recapitulare-examen` | `romana-lectii/r8-recapitulare-examen.js` | 7 | 3138 | ✅ |
| `romana:8:calatoria` | `romana-lectii/r8-calatoria.js` | 11 | 4136 | ✅ |
| `romana:8:lume-sentimente` | `romana-lectii/r8-lume-sentimente.js` | 10 | 4004 | ✅ |
| `romana:8:valori-ascultare` | `romana-lectii/r8-valori-ascultare.js` | 11 | 5355 | ✅ |
| `romana:8:traditie-inovatie` | `romana-lectii/r8-traditie-inovatie.js` | 11 | 5527 | ✅ |
| `romana:8:modele-antimodele` | `romana-lectii/r8-modele-antimodele.js` | 13 | 6540 | ✅ |
| `romana:8:familia-comunitate` | `romana-lectii/r8-familia-comunitate.js` | 12 | 8043 | ✅ |

Tabelul de mai sus este starea „înainte”, în cuvinte din `platter`. `node scripts/lesson-stats.js` retipărește lecțiile, cuvintele vizibile și cele ascunse. `RESTRUCTURED` din `lessons/restructured.js` rămâne goală până la etapa capitolului. Unitățile care treceau singure de 90 000 de caractere sunt tăiate în `-1` și `-2`, după lecții.

## Forma unei lecții

Lecțiile rescrise se construiesc cu `mathLesson({...})` sau `romanaLesson({...})` din `backend/src/data/lessonBuilder.js`. Parametrii sunt pe nume. Câmpurile noi sunt opționale și sunt documentate în `backend/src/data/lessonShape.js`.

- `boxes`: căsuțe scurte (`definitie`, `formula`, `regula`, `atentie`).
- `extraExamples`: exemple pliabile („Încă un exemplu”).
- `answers`: răspunsurile de la `practice`, în ordine. `practice` nu mai conține „Răspunsuri:”.
- `keyPoints`: 2–3 puncte „De reținut”. `recap` este `keyPoints` unite cu spațiu.
- `more`: secțiuni pliabile „Vezi mai mult”.
- `figures`: desene în plus; `figure` rămâne primul.
- `seeAlso`: la fișele EN8, lecțiile complete (`{ key, lesson }`).
- `kind`: doar română (`limba`, `lectura`, `comunicare`, `redactare`, `recapitulare`).

`platter` este textul integral, cu pliabilele, fără `**`, cu „Exemplu lucrat: …” și, când există `answers`, „Răspunsuri: 1) …; 2) …”.

Pe ecran, fiecare lecție este un card `<details id="lectie-{id}">`. Prima este deschisă. `~N min` este numărul de cuvinte vizibile împărțit la 150, rotunjit în sus. Termenii `**astfel**` devin bold. Un `**` neînchis rămâne text.

## Harta id-urilor

Modulul `backend/src/data/lessonIdMap.js` ține `LESSON_ID_MAP` (goală până la prima unire) și `LESSON_ID_MAP_VERSION` (pornește de la 1). Instantaneul celor 720 de chei de dinainte de uniri este `tests/fixtures/lessonIds-baseline.json`. Nu îl regenera.

Când un capitol unește sau împarte lecții:

- id-ul vechi nu se refolosește în același capitol;
- fiecare id dispărut intră în `LESSON_ID_MAP`, cu cheia completă, de exemplu `matematica:7:geo7:romb`;
- la o împărțire, valoarea este o listă, iar prima intrare este partea principală;
- `LESSON_ID_MAP_VERSION` crește cu 1.

`resolveLessonId(subject, grade, chapterId, id)` întoarce id-ul actual (ținta principală) sau `null` dacă id-ul nu e în hartă. Prompturile de teste care încă pomenesc un id vechi (`ecuatie-grad2`, `teorema-inaltimii`, `paralelogram`) îl rezolvă cu funcția asta, nu prin redenumire în test.

`resolveLessonKey(key)` urmează lanțul și întoarce `{ key, keys, moved }`, sau `null` la un ciclu. `aliasesFor(subject, grade, chapterId)` întoarce `{ idVechi: idNou }` pentru ancorele `#lectie-{idVechi}`. `GET /api/curriculum` pune lista pe fiecare capitol, chiar dacă e goală.

Progresul vechi se mută în `economyStore` când `user.lessonMapVersion` e în urma hărții. Înainte de prima migrare la o versiune, se copiază `data/mentor-ai.json.pre-lectii-vN`, fără să se șteargă nimic. Cheile de capitol, `chapters`, seria și `activityLog` rămân neatinse. Dacă `backend/src/data/quiz/` apare, `scripts/migrate-quiz-lessons.js` rescrie `lesson` și `point`.

## Ordinea cu prompturile de teste

Acest șir de etape rulează înaintea prompturilor de teste (`prompt-cursor-teste-matematica.md`, `prompt-cursor-teste-romana.md`) și înainte de rebrand. Acele prompturi spun „Nu modifica lecțiile”. Un capitol primește teste-grilă abia după ce este bifat aici.

Dacă `backend/src/data/quiz/` există deja pentru capitol, singura modificare permisă în etapa capitolului este migrarea câmpurilor `lesson` și `point` după `LESSON_ID_MAP`. Listele de lecții din prompturile de teste se învechesc; id-ul vechi se rezolvă cu `resolveLessonId()`.

În `LearnScreen`, ancora `id="lectie-{id}"` nu se dublează dacă există deja. Butonul „Verifică-te”, când îl adaugă promptul de teste, stă după „De reținut”.

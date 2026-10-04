// Lecții originale pentru Evaluarea Națională (clasa a VIII-a).
// Nu copiem programele, manualele sau culegerile. Fiecare lecție:
// idee + exemplu lucrat + ce să reții.

const { lesson } = require('./gimnaziuLessons');

const LESSONS_EN = {
  'matematica:proba': [
    lesson(
      'harta',
      'Cele trei subiecte și punctajul',
      'Proba scrisă de matematică durează, de obicei, două ore. Ai 90 de puncte din itemi și 10 puncte din oficiu, deci nota 10 înseamnă 100. Structura clasică (cea de pe modelele 2022) e simplă de ținut minte: Subiectul I — 6 grile din numere, rapoarte și date, câte 5 puncte; Subiectul II — 6 grile de geometrie, numerotate tot 1–6, câte 5 puncte; Subiectul III — 6 exerciții, fiecare cu a) 2 puncte și b) 3 puncte (metode aritmetice, expresie algebrică, funcție, geometrie plană, apoi un corp). La III scrii rezultatul în aplicație și rezolvarea pe caiet. Fiecare subiect valorează 30 de puncte.',
      'Nu e un test de capitol. Un item de 5 puncte de la I poate cere un procent, următorul un interval. La III, pe platformă scrii doar rezultatul (15 cm, 60°); calculele le faci pe caiet. Rezolvarea completă, pas cu pas, apare după ce predai lucrarea.',
      'Exemplu lucrat: vezi pe foaie „Calculează 2³ × 5 − 12 : 4”. Întâi puterea: 8. Apoi înmulțirea și împărțirea, de la stânga: 8 × 5 = 40, 12 : 4 = 3. Apoi 40 − 3 = 37. Dacă aduni 2+3 întâi, ai greșit ordinea, nu „matematica grea”.',
      'Reține: oficiul nu se cere. La I și II încercuiești o literă. La III scrii rezultatul de la a) și de la b). Rezolvarea lungă o vezi după predare.'
    ),
    lesson(
      'foaie',
      'Cum scrii pe foaie, nu în cap',
      'Corectorul nu-ți citește gândurile. Pe ciornă poți încerca; pe lucrare lași un lanț vizibil: date → relație → calcul → răspuns. Răspunsul final se subliniază sau se încadrează. Unitatea de măsură (cm, m², lei) stă lângă număr, nu „undeva în minte”.',
      'Dacă te blochezi, nu ștergi tot. Lași ce e corect și treci la următorul item. Baremul, în spiritul programei, acceptă orice metodă corectă: aritmetică, ecuație, figură. Nu există „metoda din culegerea X”.',
      'Exemplu lucrat: „Un dreptunghi are lungimea 12 cm și lățimea 5 cm. Aria?” Pe foaie: A = L × l = 12 × 5 = 60. Răspuns: 60 cm². Dacă scrii doar 60, un corector binevoitor poate înțelege, dar 60 cm² e limpede. Dacă înmulțești 12+5, ai confuzat aria cu perimetrul.',
      'Reține: cifra fără unitate la o mărime măsurată e jumătate de mesaj. Ciorna nu se punctează; lucrarea da.'
    ),
    lesson(
      'timp-mate',
      'Cum îți împarți cele două ore',
      'Un ritm sănătos: 35–40 de minute pe Subiectul I (e variat, nu te împotmoli la un item de 5 puncte), 35–40 pe II, restul pe III plus o recitire. Geometria cere desen: nu o lăsa pe ultimele zece minute. Dacă I ți se pare „ușor”, nu alerga: acolo se pierd puncte pe ordine a operațiilor și pe semne.',
      'Recitirea nu e vanitate. Verifici: am răspuns la ce s-a cerut (valoarea, mulțimea, lungimea)? Am pus unitatea? Semnul minus a rămas unde trebuia?',
      'Exemplu lucrat: rămân 12 minute și mai ai un item de geometrie și o recitire. Facultatea bună: schițezi figura (2 minute), scrii relația (Pitagora / arie), calculezi, apoi treci ochii pe Subiectul I după semne. Nu rescrii tot Subiectul II „ca să arate frumos”.',
      'Reține: un item neterminat cu metodă corectă poate lua puncte parțiale. Un item gol ia zero. Timpul e o resursă, nu un inamic.'
    ),
    lesson(
      'citire-enunt',
      'Citește cerința, nu doar numerele',
      'Enunțul are capcane blânde, nu viclene: „cel mai mic număr natural”, „valoarea pozitivă”, „aria laterală” versus „aria totală”, „măsura în grade”. Subliniezi verbul: calculează, arată, determină, compară. Dacă cere „arată că”, nu e de ajuns rezultatul — e un lanț de egalități sau o justificare scurtă.',
      'Datele extra se ignoră. Dacă ți se dă culoarea cubului, nu intră în volum. Dacă ți se dă un tabel, citești și capul de tabel, nu doar o celulă.',
      'Exemplu lucrat: „Află cel mai mic număr natural n pentru care 3n > 20”. Nu e 20:3. 3×6=18 (prea mic), 3×7=21 (merge). n=7. Dacă răspundeai 6, ai citit „≥” în loc de „>”.',
      'Reține: primul pensul e pe verbe și pe cuvinte ca „cel mai mic”, „pozitiv”, „strict”. Numerele vin după.'
    )
  ],
  'matematica:numere': [
    lesson(
      'naturale-en',
      'Naturale, puteri, divizibilitate — itemul scurt',
      'La EN, numerele naturale apar ca puteri, ordine a operațiilor, criterii de divizibilitate, c.m.m.d.c. / c.m.m.m.c., uneori scriere în baza 10. 2⁵ nu e 2×5. 10³ e 1 urmat de trei zerouri. Parantezele se fac primele; apoi puterile; apoi × și : de la stânga; apoi + și −.',
      'Un număr se împarte la 2 dacă ultima cifră e pară; la 5 dacă se termină cu 0 sau 5; la 3 dacă suma cifrelor se împarte la 3. Primele au exact doi divizori.',
      'Exemplu lucrat: cel mai mic multiplu comun al lui 12 și 18. 12=2²×3, 18=2×3², deci c.m.m.m.c.=2²×3²=36. Verificare: 36:12=3, 36:18=2. Dacă luai produsul 12×18=216, e un multiplu, dar nu cel mai mic.',
      'Reține: c.m.m.d.c. ia puterile cele mici comune; c.m.m.m.c. ia puterile cele mari. Nu sunt același buton.'
    ),
    lesson(
      'intregi-en',
      'Întregi: semn, modul, axă',
      'Întregii sunt … −2, −1, 0, 1, 2 … Modulul |−7| e 7: distanța până la zero, fără semn. Opusul lui −7 e 7. Pe axă, −7 e la stânga lui −2. Înmulțirea: minus cu minus dă plus; minus cu plus dă minus. Scăderea e adunare cu opusul: 3 − (−5) = 3+5=8.',
      'La examen, un item poate cere doar locul pe axă sau valoarea lui |a−b|. Nu sări peste paranteze.',
      'Exemplu lucrat: calculează |−4| − |3−9| + (−2)×3. |−4|=4. 3−9=−6, |−6|=6. (−2)×3=−6. Deci 4 − 6 + (−6) = −2 − 6 = −8.',
      'Reține: modulul nu „șterge tot ce e greu”. Șterge semnul unui singur număr sau al rezultatului din paranteză, după ce ai calculat interiorul.'
    ),
    lesson(
      'rationale-en',
      'Raționale, fracții, procente',
      'Un număr rațional se scrie ca fracție de întregi, numitor nenul. 0,75 = 3/4, 2,5 = 5/2, −3 = −3/1. Fracțiile zecimale periodice (0,333…) sunt și ele raționale. Procentul e sutimi: 20% = 20/100 = 1/5.',
      'La adunare, aduci la același numitor. La înmulțire, sus cu sus, jos cu jos. „20% din 80” e (20/100)×80=16, nu 80−20.',
      'Exemplu lucrat: o carte costă 80 de lei, redusă cu 15%, apoi cu încă 10 lei. 15% din 80 = 12, rămân 68; 68−10=58 lei. Dacă scădeai 15+10=25 din 80, amestecai procentul cu un număr de lei.',
      'Reține: procentul e din valoarea de atunci. Reducerea nu e o scădere a cifrei procentului din preț.'
    ),
    lesson(
      'reale-en',
      'Reale, radicali, raționalizare',
      'Realele cuprind raționalele și iraționalele (√2, π). √a, cu a≥0, e numărul pozitiv al cărui pătrat e a. √49=7, pentru că 7²=49. √50 = √(25×2)=5√2. Nu poți scoate factor dacă nu e pătrat perfect sub radical. Raționalizarea lui 1/√3: înmulțești sus și jos cu √3 → √3/3.',
      'Compararea: √2 ≈ 1,41, deci 1 < √2 < 1,5. Pe axă, √2 e între 1 și 2.',
      'Exemplu lucrat: simplifică √72 − √18 + √8. √72=√(36×2)=6√2, √18=√(9×2)=3√2, √8=√(4×2)=2√2. 6√2 − 3√2 + 2√2 = 5√2.',
      'Reține: radicalii se adună doar dacă „părțile oarbe” coincid, ca termenii asemenea. √2 + √3 nu e √5.'
    ),
    lesson(
      'intervale-en',
      'Intervale și inecuații pe axă',
      'Un interval e o bucată de axă. [2,5] include 2 și 5 (segmente pline). (2,5) nu le include (goluri). [2,∞) merge la dreapta fără capăt. Intersecția e ce e comun; reuniunea e tot ce apare măcar într-unul.',
      'Inecuația 2x − 6 < 0 se rezolvă ca o ecuație, dar ții inegalitatea: 2x < 6, x < 3, deci x ∈ (−∞,3). Dacă înmulțești sau împarți cu un număr negativ, sensul se inversează.',
      'Exemplu lucrat: [−1,4) ∩ (2,7]. Comun: de la 2 (fără 2, pentru că al doilea interval e deschis la 2) până la 4 (fără 4, primul e deschis la 4). Rezultat: (2,4).',
      'Reține: pătratul include capătul, runda îl lasă afară. Desenează axa înainte să scrii notația.'
    )
  ],
  'matematica:algebra-en': [
    lesson(
      'litere',
      'Termeni asemenea și paranteze cu litere',
      'O literă ține locul unui număr. 3x înseamnă 3 de x, nu 3+x. Termenii asemenea au aceeași parte cu litere: 5a și −2a se adună: 3a. 5a și 5b nu se unesc. Distributivitatea: 3(x−4)=3x−12. Minus înainte de paranteză schimbă semnele dinăuntru: −(2x−5)= −2x+5.',
      'La EN, un item scurt e adesea „simplifică expresia”. Nu înlocuiești x cu un număr dacă nu ți se cere valoarea.',
      'Exemplu lucrat: 4(x+2) − 3(2x−1). 4x+8 − 6x +3 = (4x−6x)+(8+3)= −2x+11.',
      'Reține: minusul din fața parantezei e un „schimbă tot ce e înăuntru”, nu doar primul termen.'
    ),
    lesson(
      'formule',
      'Formulele scurte care merită ținute',
      '(a+b)² = a² + 2ab + b². (a−b)² = a² − 2ab + b². (a−b)(a+b)= a² − b². Nu sunt poezii: vin din înmulțirea parantezelor. (a+b)² nu e a²+b² — lipsește mijlocul 2ab.',
      'La examen, recunoști tiparul și înlocuiești. Dacă vezi 9x² − 12x + 4, e (3x−2)².',
      'Exemplu lucrat: calculează 101² fără calculator lung. 101=100+1, deci (100+1)²=10000+200+1=10201. Verificare mintală: 100²=10000, plus încă o sută de două ori, plus 1.',
      'Reține: pătratul sumei are trei termeni. Diferența de pătrate are două paranteze conjugate.'
    ),
    lesson(
      'factori',
      'Scoaterea factorului și fracții algebrice',
      'Factorul comun iese în față: 6x²+9x = 3x(2x+3). Gruparea: x²+3x+2x+6 = x(x+3)+2(x+3)=(x+2)(x+3). După formule, a²−9=(a−3)(a+3).',
      'O fracție algebrică se simplifică doar prin factori comuni, nu „tai x-ul” de oriunde. (x²−4)/(x−2)=(x−2)(x+2)/(x−2)=x+2, pentru x≠2.',
      'Exemplu lucrat: (x²−5x+6)/(x−2). Numărătorul: (x−2)(x−3). Împarți: x−3, cu x≠2. Dacă „tăiai” x de sus și de jos, rămâneai cu un rezultat greșit.',
      'Reține: simplifici factori, nu termeni. x din  x+3  nu se taie cu x de la numitor.'
    ),
    lesson(
      'ecuatii',
      'Ecuații liniare, de gradul II și sisteme',
      'Ecuația ax+b=0, a≠0, are o soluție x=−b/a. Verifici prin înlocuire. Sistemul de două ecuații cu x și y: substituție (scoți o necunoscută din una, o bagi în cealaltă) sau reducere (aduni după ce ai făcut coeficienții opuși).',
      'Ecuația ax²+bx+c=0, cât cere gimnaziul, se atacă prin factori sau prin recunoaștere. Soluțiile se pun în mulțime.',
      'Exemplu lucrat: { x+y=10, x−y=2 }. Aduni: 2x=12, x=6. Din x+y=10, y=4. Verificare: 6−4=2. Dacă scădeai greșit, y ieșea negativ și verificarea pică.',
      'Reține: fără verificare, un semn greșit trece neobservat. Sistemul e o poveste cu două condiții, nu două probleme separate.'
    ),
    lesson(
      'inecuatii',
      'De la egalitate la interval',
      'Inecuația 3x−6≥0 → 3x≥6 → x≥2 → [2,∞). Dacă −2x > 8, împarți la −2 și inversezi: x < −4, deci (−∞,−4). Pe axă, capătul plin înseamnă „egal e permis”.',
      'La EN, uneori ți se cere mulțimea soluțiilor intersectată cu naturalele sau cu un interval dat. Citești și a doua condiție.',
      'Exemplu lucrat: 2−5x < 12. −5x < 10. Împărțim la −5, inversăm: x > −2. Dacă se cere x număr natural, rămân 0,1,2,3… (toate naturalele, pentru că 0 > −2). Dacă se cere x întreg pozitiv, 1,2,3…',
      'Reține: înmulțirea cu minus întoarce inegalitatea. Uită și ai pus capătul greșit pe axă.'
    )
  ],
  'matematica:functii-en': [
    lesson(
      'ce-e-f',
      'Ce e o funcție, fără mister',
      'O funcție leagă fiecare x dintr-o mulțime D de un singur f(x). Poți s-o vezi ca mașină: bagi 3, iese f(3). Tabelul, formula și graficul spun aceeași poveste. Dacă dintr-un x ies două valori, nu mai e funcție.',
      'f(x)=2x+1: pentru x=0, f=1; pentru x=4, f=9. Punctele (0,1) și (4,9) stau pe o dreaptă.',
      'Exemplu lucrat: f(x)=−x+5. Calculează f(2) și f(−1). f(2)=−2+5=3. f(−1)=−(−1)+5=1+5=6. Semnul din fața lui x se aplică întregului x, inclusiv când x e negativ.',
      'Reține: f(2) nu e f×2. E „valoarea mașinii când bagi 2”.'
    ),
    lesson(
      'dreapta',
      'Dreapta f(x)=ax+b',
      'a e panta: dacă a>0, dreapta urcă; dacă a<0, coboară; dacă a=0, e orizontală, constantă. b e locul unde taie axa Oy (x=0). Taie Ox unde f(x)=0, deci ax+b=0.',
      'La examen, adesea citești din desen: trece prin (0,2) și (1,5) → b=2, a=3, f(x)=3x+2.',
      'Exemplu lucrat: f(x)=2x−4. Taie Oy în (0,−4). Taie Ox: 2x−4=0, x=2, punctul (2,0). Pentru x=3, f=2. Punctele (0,−4), (2,0), (3,2) sunt coliniare pe grafic.',
      'Reține: b se vede pe verticală, la x=0. Nu confunda cu locul unde taie Ox.'
    ),
    lesson(
      'lecturi',
      'Lecturi grafice: ce se cere de fapt',
      'Întrebări tipice: f(2)=? (cauți x=2, citești y); pentru ce x avem f(x)=0 (intersecția cu Ox); pe ce interval f e pozitivă (graficul deasupra axei); distanța dintre două puncte pe grafic.',
      'Nu estima „din ochi” dacă poți citi o grilă. Dacă pătrățelul e 1, numără.',
      'Exemplu lucrat: dreapta trece prin (0,1) și (4,3). Panta a=(3−1)/(4−0)=2/4=1/2. Formula: f(x)=(1/2)x+1. f(6)=4. Dacă spuneai a=2, ai luat Δx la numitor greșit.',
      'Reține: panta e „cât urc pe cât merg în dreapta”. Δy peste Δx, nu invers.'
    ),
    lesson(
      'puncte',
      'Axe, distanță, produs cartezian',
      'În plan, un punct e o pereche (x,y). Distanța dintre A(x₁,y₁) și B(x₂,y₂) e √[(x₂−x₁)²+(y₂−y₁)²] — Pitagora pe o grilă. Produsul cartezian A×B e mulțimea perechilor, primul din A, al doilea din B.',
      'La EN, uneori ți se cere să reprezinți punctele și să recunoști un dreptunghi sau să calculezi o lungime.',
      'Exemplu lucrat: A(1,2), B(4,6). Δx=3, Δy=4, distanța √(9+16)=5. E triunghiul 3-4-5, nu o coincidență magică.',
      'Reține: distanța e totdeauna pozitivă. Nu scazi coordonatele și te oprești la 3 sau la 4.'
    )
  ],
  'matematica:date': [
    lesson(
      'rapoarte',
      'Rapoarte și proporții',
      'Raportul 2:5 spune „2 părți la 5 părți”. Ca fracție, 2/5. O proporție e o egalitate de rapoarte: 2/5 = 6/15. Proprietatea fundamentală: produsul extremelor egal produsul mijloacelor: 2×15=5×6.',
      'Termenul necunoscut: x/12 = 5/6 → 6x=60 → x=10. Șirul de rapoarte egale: 2/3=4/6=6/9.',
      'Exemplu lucrat: în clasă, raportul fete:băieți e 3:4. Sunt 21 de fete. Câți băieți? 3 părți = 21, o parte = 7, 4 părți = 28 băieți. Total 49. Dacă făceai 21×4, ignorai că 3 părți erau deja 21.',
      'Reține: o parte e unitatea. Afli întâi o parte, apoi cererea.'
    ),
    lesson(
      'proportii',
      'Direct, invers, regula de trei',
      'Direct proporționale: dacă una se dublează, și cealaltă. Kilometrii și timpul la viteză constantă. Invers: dacă una se dublează, cealaltă se înjumătățește. Muncitori și zile, la aceeași treabă.',
      'Regula de trei simplă: așezi tabelul, pui x, înmulțești în cruce la direct. La invers, produsul rămâne constant: 4 muncitori × 6 zile = 24 muncitori-zile; 6 muncitori → 4 zile.',
      'Exemplu lucrat: 5 caiete costă 35 lei. 8 caiete? Direct. 5 → 35, 8 → x, x= (8×35)/5 = 56 lei. Dacă inversai fără să gândești „mai multe caiete, mai mulți lei”, puteai împărți greșit.',
      'Reține: întreabă întâi: dacă prima crește, a doua crește sau scade? Apoi formula.'
    ),
    lesson(
      'statistica',
      'Medie, mediană, modul, amplitudine',
      'Medie: suma împărțită la câți sunt. Mediană: valoarea din mijloc după ce ai ordonat (dacă sunt doi la mijloc, media lor). Modul: valoarea care apare cel mai des. Amplitudine: cea mai mare minus cea mai mică.',
      'Ele nu spun același lucru. Notele 2, 10, 10: media 7,33…, mediana 10, modul 10, amplitudinea 8. Media e trasă în jos de 2; mediana nu.',
      'Exemplu lucrat: 4, 7, 7, 10, 12. Medie: 40/5=8. Mediană: 7. Mod: 7. Amplitudine: 12−4=8. Dacă luai media ca 7, ai confuzat-o cu modul.',
      'Reține: întâi ordonezi pentru mediană. Media nu cere ordine, cere suma.'
    ),
    lesson(
      'grafice-date',
      'Tabele, bare, frecvențe',
      'Frecvența e „de câte ori”. Un grafic cu bare arată categorii; unul cu linii arată o evoluție. Citești axele: ce e pe orizontală, ce e pe verticală, care e scara (din 2 în 2? din 10 în 10?).',
      'La EN, un item poate cere „în care zi s-a vândut cel mai mult” sau „cu cât a crescut de marți până joi”. Scazi înălțimile, nu ghicești.',
      'Exemplu lucrat: luni 12, marți 8, miercuri 15. Cea mai mare bară e miercuri. Diferența luni–marți: 12−8=4 (scădere). Media celor trei zile: 35/3. Nu e 15, nota maximă nu e media.',
      'Reține: graficul minte dacă nu citești scara. Un pătrățel poate fi 5 unități, nu 1.'
    )
  ],
  'matematica:geo-plana': [
    lesson(
      'unghiuri-drepte',
      'Unghiuri, paralele, secante',
      'Drept: 90°. Ascuțit: sub 90°. Obtuz: între 90° și 180°. Opuse la vârf sunt congruente. Adiacente pe o linie: suma 180°. O secantă pe două paralele face unghiuri corespunzătoare congruente; interne de aceeași parte suplementare.',
      'La examen, figura e jumătate din punctaj. Notezi pe desen ce știi, nu ții totul în cap.',
      'Exemplu lucrat: două paralele, o secantă, un unghi intern de 110°. Vecinul de pe aceeași parte a secantei, intern: 70°. Corespondentul lui de 110° e tot 110°, chiar dacă e în alt colț al figurii.',
      'Reține: „pare egal” nu e argument. Cauți: opus la vârf, corespondent, altern intern, suplementar.',
      { figure: 'parallels', formulas: ['corespunzătoare = egale', 'interne de aceeași parte: 180°'] }
    ),
    lesson(
      'triunghi',
      'Triunghiul: sume, linii, congruență',
      'Suma unghiurilor e 180°. Exteriorul e egal cu suma celor două interioare nealăturate. Isoscel: două laturi egale, unghiuri de la bază egale. Echilateral: tot 60°. Congruența: LUL, ULU, LLL (și cazurile dreapta: CC, IC, CU, IU).',
      'Bisectoarele se întâlnesc în centrul cercului înscris. Mediatoarele — circumscris. Medianele — centrul de greutate (2/3 de la vârf). Înălțimile — ortocentru.',
      'Exemplu lucrat: triunghi cu unghiuri 50° și 60°. Al treilea: 70°. Exteriorul lângă 70°: 110°, sau 50+60. Dacă spuneai 70, ai luat interiorul în loc de exterior.',
      'Reține: congruența e „aceeași formă și aceeași mărime”. Asemănarea e „aceeași formă, mărime poate alta”.',
      { figure: 'triangle', formulas: ['A+B+C=180°', 'exterior = suma celorlalte două interioare'] }
    ),
    lesson(
      'metric',
      'Thales, asemănare, Pitagora',
      'Thales: o paralelă la o latură taie pe celelalte două segmente proporționale. Asemănarea: unghiuri egale, laturi proporționale. Raportul ariilor e pătratul raportului de asemănare. Pitagora: în dreptunghic, catetă²+catetă²=ipotenuză². Teorema catetei și a înălțimii leagă proiecțiile pe ipotenuză.',
      'Sin, cos, tg într-un ascuțit al dreptunghicului: laturi / ipotenuză sau opus / alăturat. Nu le amesteci.',
      'Exemplu lucrat: catete 6 și 8. Ipotenuză √(36+64)=10. Dacă înălțimea pe ipotenuză e h, h= (6×8)/10=4,8 (arie dublă: 6×8=h×10).',
      'Reține: Pitagora e doar în dreptunghic. Asemănarea cere justificarea unghiurilor, nu „arată similar”.',
      { figure: 'thales', formulas: ['Thales: a/a′ = b/b′', 'Pitagora: a²+b²=c²', 'arii: k²'] }
    ),
    lesson(
      'patrulatere',
      'Paralelogram, dreptunghi, romb, pătrat, trapez',
      'Paralelogram: laturi opuse paralele și egale, unghiuri opuse egale, diagonalele se taie în jumătăți. Dreptunghi: unghiuri drepte, diagonale egale. Romb: laturi egale, diagonale perpendiculare. Pătrat: le are pe toate. Trapez: o singură pereche de paralele; linia mijlocie e media bazelor.',
      'Aria paralelogramului: bază × înălțime, nu baza × latura oblică. Aria trapezului: (B+b)/2 × h.',
      'Exemplu lucrat: trapez cu baze 8 și 12, înălțime 5. Aria (8+12)/2 × 5 = 10×5=50. Dacă înmulțeai 8×12, ai făcut un dreptunghi inexistent.',
      'Reține: înălțimea e perpendiculara dintre baze, nu latura neparalelă, decât dacă e trapez dreptunghic pe acea latură.',
      { figure: 'parallelogram', formulas: ['A_paral = bază × h', 'A_romb = (d₁d₂)/2', 'A_trapez = (B+b)h/2'] }
    ),
    lesson(
      'cerc',
      'Cerc, disc, unghiuri în cerc',
      'Rază R, diametru 2R, coardă (între două puncte pe cerc), tangentă (atinge într-un punct, perpendiculară pe rază). Lungimea cercului 2πR, aria discului πR². Unghiul la centru are măsura arcului. Unghiul înscris are jumătate din arcul cuprins.',
      'Tangentele dintr-un punct exterior sunt egale. Diametrul perpendicular pe o coardă o împarte în jumătate.',
      'Exemplu lucrat: R=7, lungimea ≈ 2×3,14×7=43,96. Aria ≈ 3,14×49=153,86. Dacă luai 2πR², ai amestecat lungimea cu aria. La EN, deseori se lasă răspunsul cu π: 14π și 49π.',
      'Reține: lungimea e „gardul”, aria e „iarba dinăuntru”. π stă la amândouă, dar puterea lui R diferă.',
      { figure: 'circle-tangent', formulas: ['L = 2πR', 'A = πR²', 'înscris = arc / 2'] }
    )
  ],
  'matematica:geo-spatiu': [
    lesson(
      'pozitii',
      'Puncte, drepte, plane în spațiu',
      'O dreaptă e determinată de două puncte. Un plan, de trei puncte necoliniare. Drepte: paralele, concurente sau oarecare (nu se întâlnesc și nu sunt paralele). Dreaptă paralelă cu planul: nu-l înțeapă. Dreaptă perpendiculară pe plan: e perpendiculară pe două drepte concurente din plan.',
      'Teorema celor trei perpendiculare leagă o perpendiculară pe plan de o oblică și de proiecția ei.',
      'Exemplu lucrat: muchia verticală a unei camere e perpendiculară pe planul podelei. O diagonală pe podea și acea muchie formează un unghi drept. Dacă „pare înclinată” pe o fotografie, fotografia minte — folosești definiția, nu poza.',
      'Reține: în spațiu, „nu se întâlnesc” nu înseamnă automat paralele. Pot fi oarecare.',
      { figure: 'planes', formulas: ['plan: 3 puncte necoliniare', '⊥ pe plan: ⊥ pe două drepte din plan'] }
    ),
    lesson(
      'prisma-piramida',
      'Prismă, cub, piramidă',
      'Prisma dreaptă: baze poligoane congruente, muchii laterale perpendiculare pe baze. Cubul e prisma cu toate fețele pătrate. Volum prismă: Aria_bazei × înălțime. Piramida: vârf + bază; volum (1/3)×A_bazei×h. Tetraedrul regulat are patru fețe triunghiuri echilaterale.',
      'Aria laterală: suma fețelor laterale (sau perimetrul bazei × apotema, la piramida regulată). Aria totală = laterală + baze.',
      'Exemplu lucrat: cub cu muchia 4. Volum 64. Aria totală 6×16=96. Diagonală pe o față: √(16+16)=√32=4√2. Diagonală în spațiu: √(16+16+16)=√48=4√3.',
      'Reține: volumul cubului e a³, nu 6a² (asta e aria). Factorul 1/3 la piramidă nu se uită.',
      { figure: 'pyramid', formulas: ['V_prismă = Ab × h', 'V_piramidă = Ab × h / 3', 'V_cub = a³'] }
    ),
    lesson(
      'rotatie',
      'Cilindru, con, trunchiuri',
      'Cilindrul circular drept: două discuri și o „bandă”. Volum πR²h. Aria laterală 2πRh (desfășurarea e dreptunghi). Conul: volum (1/3)πR²h. Generatoarea l intră în aria laterală πRl. Trunchiul: tai cu un plan paralel cu baza; rămân două baze și o „centură”.',
      'Desfășurarea te scapă de formule tocite: vezi ce fețe lipsești.',
      'Exemplu lucrat: cilindru R=3, h=10. Volum 90π. Laterală 60π. Totală 60π+2×9π=78π. Dacă luai (1/3)πR²h, ai calculat un con.',
      'Reține: conul și piramida au 1/3. Cilindrul și prisma nu.',
      { figure: 'frustum', formulas: ['V_cilindru = πR²h', 'V_con = πR²h/3', 'trunchi: două baze'] }
    ),
    lesson(
      'sfera-masuri',
      'Sfera, arii și volume — ce se cere',
      'Sfera: toate punctele la distanță R de centru. Arie 4πR², volum (4/3)πR³. Nu are „bază” și „înălțime” ca prisma. La EN, itemul spune clar: arie sau volum, uneori o combinație (o cameră = prismă + un acoperiș prismă/piramidă).',
      'Unități: 1 m = 10 dm = 100 cm; 1 m² = 10 000 cm²; 1 m³ = 1 000 000 cm³. Transformi înainte de formulă.',
      'Exemplu lucrat: sferă R=3. Arie 36π. Volum 36π (stai: (4/3)π×27=36π — coincidență pentru R=3, nu o regulă). Pentru R=2, arie 16π, volum 32π/3. Nu sunt egale.',
      'Reține: R=3 e o capcană drăguță unde 4πR² și (4/3)πR³ arată similar numeric cu π. Verifică formula, nu coincidența.',
      { figure: 'sphere', formulas: ['A = 4πR²', 'V = (4/3)πR³'] }
    )
  ],
  'romana:proba-ro': [
    lesson(
      'harta-ro',
      'Cele trei subiecte la română',
      'Proba de limba română e scrisă, două ore, 90 de puncte plus 10 din oficiu. Schema EN 2026: Subiectul I (70p) pornește de la două texte — textul 1 poate fi versuri sau narațiune, textul 2 e nonliterar. Partea A (38p) e înțelegere: notare, trei grile, adevărat/fals pe 6 enunțuri, apoi itemii 6–9 se scriu (măsură și rimă sau trăsătură de tipar; element comun min. 30 de cuvinte; justificare 50–100; asociere 50–100). Partea B (32p) e gramatică: 4 grile (hiat, derivare, sens, paronime) și 4 răspunsuri scrise. Subiectul II (20p) e compunerea: o scrii în caiet, minimum 150 de cuvinte, nu o tastezi în aplicație.',
      'Nu ți se cere un comentariu tocit dintr-o carte de critică. Ți se cere să arăți că ai citit textul de azi și că poți scrie tu, organizat.',
      'Exemplu lucrat: vezi un item „numește două trăsături ale personajului, cu citate”. Nu scrii „e bun și curajos” din memorie. Cauți în text două fapte sau vorbe și le pui între ghilimele scurte, cu rândul dacă e dat.',
      'Reține: textul de pe foaie e legea. Părerea ta vine la itemii de motivare, la asocierea cu o carte citită și la Subiectul II (compunerea pe caiet).'
    ),
    lesson(
      'punctaj-ro',
      'Ce se punctează, de fapt',
      'La lectură: informația corectă, nu stilul. La limbă: eticheta potrivită în contextul frazei. La redactare, baremul (în spiritul programei) se uită la: încadrare în cerință, conținut, organizare (paragrafe, fir), stil/vocabular, corectitudine (acord, ortografie, punctuație), uneori la lizibilitate.',
      'Un text frumos care nu răspunde la cerință (ai scris o descriere când se cerea argumentare) pierde gros. Un text simplu, curat, pe subiect, ia puncte.',
      'Exemplu lucrat: cerința e „naratază o întâmplare petrecută într-o gară, la persoana I”. Tu scrii un eseu despre cât de importante sunt trenurile. Ai ratat persoana, narațiunea și locul. Corectorul nu poate „înțelege ce voiai”.',
      'Reține: întâi cerința (ce, cine, unde, persoana), apoi frumusețea. Frumusețea fără țintă e zero organizat.'
    ),
    lesson(
      'timp-ro',
      'Cum îți împarți timpul la română',
      'Citești textul de două ori: o dată pe fugă, a doua oară cu creionul (idei, personaje, cuvinte grele). Itemii de I și II merită răspunsuri scurte și exacte — nu eseuri. Pentru redactare lași 40–50 de minute: 5 minute plan, 30 scriere, 5–10 recitire.',
      'Nu începe cu redactarea „că ți-e teamă de ea”. Un plan de 6 rânduri pe ciornă e mai ieftin decât o pagină greșită.',
      'Exemplu lucrat: rămân 8 minute. Nu mai adaugi un paragraf nou cu o idee nouă. Recitești acordurile (este / sunt, pe el / lui), virgulele de vocativ, diacriticele dacă lucrezi de mână îngrijit. Tai o repetare. Atât.',
      'Reține: ultimele minute sunt de reparații, nu de inspirație târzie.'
    ),
    lesson(
      'cerinta',
      'Cum citești un item, cuvintele mici',
      '„Precizează”, „numește”, „transcrie”, „explică într-un enunț”, „motivează cu o secvență”: fiecare verb cere altceva. Transcrie = copie exact din text. Numește = un cuvânt sau o etichetă. Explică = o frază cu cauză. Motivează cu secvență = idee + citat.',
      'Limitele de cuvinte la redactare nu sunt sugestii. Sub minim, conținutul e subțire. Mult peste maxim, riști să te împrăștii și să greșești mai mult.',
      'Exemplu lucrat: „Transcrie un epitet”. Răspunsul e un cuvânt/grup din text, nu definiția epitetului. Dacă scrii „epitetul este un adjectiv…”, ai făcut lecția, nu itemul.',
      'Reține: verbul din cerință e instructorul. Definiția tocită, fără text, nu punctează.'
    )
  ],
  'romana:receptare': [
    lesson(
      'prima-vedere',
      'Cum citești un text necunoscut',
      'Nu cauți „ce a vrut autorul să transmită” ca formulă magică. Cauți: despre cine e, unde, ce se întâmplă sau ce se explică, ce ton are (umor, grav, neutru). La nonliterar (anunț, tabel, articol), cauți scopul: să informeze, să convingă, să instruiască.',
      'A doua lectură: subliniezi repetări, contraste, un cuvânt rar. Ideea principală e ce ține totul, nu un detaliu pitoresc.',
      'Exemplu lucrat: un text despre o fată care udă un cireș bătrân în fiecare dimineață, deși vecinii râd. Detaliul cu râsul e secundar. Firul: grijă statornică față de un loc/un copac. Tema posibilă: statornicie, grijă, timp.',
      'Reține: tema e umbrela. Ideea principală e fraza-umbrelă a acestui text, nu a literaturii universale.'
    ),
    lesson(
      'explicit-implicit',
      'Spus negru pe alb versus dedus',
      'Explicit: stă scris. „Trenul a plecat la 5”. Implicit: scoți din indicii. Dacă personajul își strânge pumnii și tace, poți deduce tensiune, dar nu „e criminal” — asta e închipuire.',
      'La EN, itemii de inferență cer un pas mic, legat de text, nu un roman paralel.',
      'Exemplu lucrat: „Mama a stins lumina, deși copiii încă șopteau.” Explicit: lumina s-a stins, copiii vorbesc în șoaptă. Implicit rezonabil: e târziu, e ora de somn. Nerezonabil: mama e supărată pe școală — textul nu dă asta.',
      'Reține: un pas de la text. Două salturi sunt invenție.'
    ),
    lesson(
      'struct-text',
      'Cum e organizat: narațiune, descriere, explicație, tabel',
      'Narațiunea are timp și evenimente. Descrierea oprește timpul și arată. Explicația (nonliterar) merge cauză–efect sau pași. Un tabel e text discontinuu: citești capul de coloană, apoi celula. Un afiș amestecă imagine și slogan.',
      'Compari două texte pe temă, structură, punct de vedere. Nu pe „care e mai frumos” fără criteriu.',
      'Exemplu lucrat: un paragraf cu „mai întâi / apoi / în cele din urmă” e succesiune. Unul cu „în stânga / deasupra / în zare” e spațiu, deci descriere. Dacă le confunzi, rezumatul iese strâmb.',
      'Reține: conectorii sunt semnele de circulație ale textului. Îi citești ca pe un GPS.'
    ),
    lesson(
      'voce',
      'Cine vorbește și din ce unghi',
      'Persoana I: „am văzut”. Persoana a III-a: „ea a văzut”. Naratorul poate ști tot (privilegiat) sau doar ce vede un personaj. Un articol de ziar pretinde distanță; un jurnal, apropiere. La EN, „punct de vedere” înseamnă adesea cine povestește și ce atitudine are (ironie, empatie, neutră).',
      'Nu confunda autorul real cu vocea din text. Vocile pot fi personaje.',
      'Exemplu lucrat: „Nu știam atunci că ușa aceea nu se va mai deschide.” Vocea știe acum mai mult decât știa atunci — e o privire înapoi. Dacă spui „autorul e trist”, ai sărit peste voce.',
      'Reține: întreabă „cine spune fraza asta?” înainte de „ce simte autorul?”.'
    ),
    lesson(
      'dovada',
      'Răspunsul cu dovadă din text',
      'Când itemul cere justificare, schema e: afirmație scurtă + „deoarece” + secvență. Secvența e scurtă, exactă, între ghilimele dacă transcrii. Nu copia un paragraf întreg „ca să prinzi ideea”.',
      'Parafraza e cu cuvintele tale, dar nu schimbă faptele. Rezumatul taie ornamentul, păstrează firul.',
      'Exemplu lucrat: „Personajul e grijuliu față de copac, deoarece udă cireșul în fiecare dimineață, deși vecinii râd.” Afirmație + fapt. Fără „autorul vrea să ne arate iubirea de natură în general”.',
      'Reține: ghilimelele nu sunt decorație. Ele arată „asta e din text, nu din capul meu”.'
    )
  ],
  'romana:limba-en': [
    lesson(
      'morfo',
      'Părți de vorbire pe text, nu pe listă',
      'Pe fragmentul de examen, încercuiești cuvântul, te uiți la ce face în frază. „Lucru” poate fi substantiv. „Lucru” în „un lucru bun” tot substantiv. Verbul e predicat de obicei, dar infinitivul sau gerunziul joacă altfel. Adjectivul stă lângă un substantiv și se acordă. Adverbul modifică un verb: „citește rar”.',
      'Numeralul, pronumele, prepoziția, conjuncția — le recunoști după rol, nu după „sună a”.',
      'Exemplu lucrat: „Fata aceea citește rar, dar înțelege tot.” Fata — substantiv; aceea — pronume demonstrativ (sau adjectiv pronominal, după cum e folosit); citește — verb; rar — adverb; dar — conjuncție; tot — adverb sau pronume, aici „complet”, adverb.',
      'Reține: același cuvânt poate fi altceva în altă frază. Contextul e eticheta.'
    ),
    lesson(
      'sintaxa',
      'Subiect, predicat, atribute, complemente',
      'Predicatul spune ce se întâmplă. Subiectul e „cine”. Atributul ține de un substantiv (fata harnică, caietul de matematică). Complementul direct răspunde la „pe cine / ce” după un verb tranzitiv. Indirectul: „cui”. Circumstanțialele: unde, când, cum, de ce.',
      'Predicatul nominal: „este” + nume predicativ. „Ana e atentă”: e — copulă, atentă — nume predicativ.',
      'Exemplu lucrat: „Ieri, elevii au scris o scrisoare bunicii.” Ieri — circumstanțial de timp; elevii — subiect; au scris — predicat; o scrisoare — complement direct; bunicii — complement indirect.',
      'Reține: întrebi verbul. Răspunsurile sunt funcțiile. Nu lipi etichete după ordine în frază.'
    ),
    lesson(
      'fraza',
      'Fraza: coordonare și subordonare',
      'Două propoziții legate prin și, dar, ori, deci sunt coordonate. O propoziție care ține de alta (că, să, dacă, când, care) e subordonată. „Știu că vii” — principală + completivă. „Cartea care e pe masă” — atributivă. Virgula nu e întâmplare: se pune după reguli, nu „când răsufli”.',
      'La EN, poți fi rugat să transcrii o propoziție subordonată sau să indici felul ei.',
      'Exemplu lucrat: „Plecăm dacă nu plouă.” dacă nu plouă — circumstanțială de condiție. Nu e „de timp” doar pentru că ploaia e un eveniment.',
      'Reține: conjuncția/cuvântul de legătură e cheia felului, împreună cu întrebarea pusă predicatu-lui din principală.'
    ),
    lesson(
      'vocab',
      'Vocabular în context: sinonim, antonim, sens',
      'Sinonimul trebuie să stea în frază. „rece” nu se înlocuiește cu „ingrat” dacă e vorba de apă. Antonimul întoarce sensul în același câmp. Sensul figurat: „o mare de oameni” nu e hidrografie. Paronimele (temporal / temporar) se deosebesc, nu se tocesc în listă.',
      'Familia lexicală: copac, copăcel, împădurit. Câmpul lexical: copac, frunză, rădăcină, coroană.',
      'Exemplu lucrat: în „a rupt tăcerea”, rupt e figurat. Un sinonim de context: a întrerupt tăcerea / a vorbit. Antonim de situație: a păstrat tăcerea. Nu „a lipit tăcerea”.',
      'Reține: dicționarul mintal e filtrat de frază. Fără frază, sinonimul e o loterie.'
    ),
    lesson(
      'norma',
      'Acord, punctuație, DOOM ca aliat',
      'Acordul: predicatul cu subiectul (copiii sunt, nu „copiii este”); adjectivul cu substantivul. Virgula la vocativ: „Mara, vino.” Nu pui virgulă între subiect și predicat. Dialogul: linia de dialog. Ortografia: „să fie”, nu „sa fie”; „intr-un” cere diacritice: într-un.',
      'DOOM e norma, nu un inamic. Dacă eziti între două forme, alegi varianta literară stabilă, nu argoul clasei.',
      'Exemplu lucrat: „Niciun elev nu a întârziat.” niciun se scrie legat când e adjectiv pronominal. „Nici un pensul nu e de ajuns” — aici „nici” + articol, alt caz. La examen, te uiți dacă urmează un substantiv pe care îl determină.',
      'Reține: recitirea e o competență, nu un moft. Jumătate din greșelile de limbă se văd la a doua privire.'
    )
  ],
  'romana:narativ': [
    lesson(
      'fir',
      'Firul: început, mijloc, capăt',
      'Narațiunea mută timpul. Începutul ancorează (cine, unde, când). Mijlocul are o treaptă: ceva se schimbă. Sfârșitul închide treapta, nu deschide un roman nou. La EN, lungimea e scurtă: nu încape o saga.',
      'Momentele clasice (expozițiune, conflict, punct culminant, deznodământ) sunt o hartă internă, nu titluri pe care le scrii în lucrare.',
      'Exemplu lucrat: plan în 4 rânduri: 1) Ajung în gară, trenul e anunțat cu întârziere. 2) Caut un bancomat, coada e lungă. 3) O doamnă îmi cedează locul, reușesc. 4) Trenul tot pleacă, dar am biletul. Fir. Fără 4, e o plângere; fără 3, e o listă.',
      'Reține: ceva trebuie să se întâmple. O descriere a gării, oricât de frumoasă, nu e narațiune dacă timpul stă.'
    ),
    lesson(
      'persoana',
      'Persoana I sau a III-a, și de ce contează',
      'Cerința spune adesea persoana. I: ochii tăi, verbe la am/am văzut. A III-a: el/ea, distanță. Amestecul strică. Timpul verbal: perfect compus sau imperfect, ținute consecvent. Nu sari în prezent fără motiv.',
      'Personajele se văd din fapte și vorbe, nu din „era foarte bun” repetat.',
      'Exemplu lucrat: cerință la I. Greșit: „Ionel a alergat spre peron, iar eu îl priveam din elicopter.” Ai amestecat un narator-dronă. Corect: „Am alergat spre peron, cu biletul în dinți, și am auzit fluierul.”',
      'Reține: persoana e un contract cu cerința. Îl ții până la punctul final.'
    ),
    lesson(
      'dialog-nar',
      'Dialog și detalii care mișcă',
      'Un dialog scurt e viu: două-trei replici, linia de dialog, vorbirea indicată rar. Detaliile senzoriale (un fluier, miros de cafea, o valiză care șchioapătă) fac scena, dar două-trei, nu un catalog.',
      'Nu copia un dialog de serial. Tonul e de gimnaziu, curat.',
      'Exemplu lucrat: — Mai e loc? / — Doar lângă geam, dacă nu te deranjează bagajul. Asta arată o situație. Zece replici despre vreme mănâncă cuvintele din limita de 180.',
      'Reține: dialogul e un condiment. Textul tot trebuie să narateze, nu să fie doar teatru.'
    ),
    lesson(
      'plan-nar',
      'De la plan la text, fără panică',
      'Pe ciornă: 5–7 puncte. Apoi scrii paragrafe: unul de deschidere, unul-două de mijloc, unul de închidere. Fiecare paragraf are o treabă. Recitești: am respectat locul, persoana, numărul de cuvinte? Am o treaptă, nu o listă de „apoi… apoi…”?',
      'Titlul, dacă se cere, e scurt. Dacă nu se cere, nu-l pui ca să „arate a temă”.',
      'Exemplu lucrat: numără cuvintele pe degete de rând (cam 8–10 cuvinte pe rând de lucrare). 20 de rânduri ≈ 160–200 de cuvinte. Ajustezi. Nu ghici.',
      'Reține: planul de 5 rânduri salvează 20 de minute de șters. E parte din competența de redactare, nu trișare.'
    )
  ],
  'romana:descriptiv': [
    lesson(
      'ordine-spat',
      'O ordine: ochiul se plimbă',
      'Descrierea nu e narațiune: timpul stă, spațiul se desface. Alegi un traseu: de departe spre aproape, de sus în jos, de la stânga la dreapta, de la general la detaliu. Fără traseu, e o listă de adjective.',
      'Portretul (fizic / moral) tot are ordine: întâi ce se vede, apoi un gest care trădează caracterul — un gest, nu o predică.',
      'Exemplu lucrat: o curte. Departe: gardul scund, un cireș. Aproape: o găleată albastră, urme de apă pe dale. Sunet: un strop. Ai loc, nu ai întâmplare. Dacă începi „Apoi am intrat și s-a întâmplat…”, ai alunecat în narațiune.',
      'Reține: traseul e scheletul. Adjectivele sunt pielea. Fără schelet, pielea cade.'
    ),
    lesson(
      'simturi',
      'Cele cinci simțuri, cu măsură',
      'Văz, auz, miros, pipăit, gust — două-trei, nu toate deodată ca la un exercițiu forțat. Un miros precis (coajă de pâine, praf de cretă) bate cinci „frumos”. Figurile de stil (comparație, personificare, epitet) ajută dacă sunt una-două reușite.',
      'Epitetele înșirate („frumoasa, minunata, superba curte”) se anulează între ele.',
      'Exemplu lucrat: „Cireșul stătea strâmb, cu scoarța ca o hartă uscată, și frunzele făceau o umbră rece pe găleată.” O comparație, un detaliu tactil-vizual. Destul pentru un paragraf de EN.',
      'Reține: un detaliu precis > cinci adjective de laudă. Corectorul s-a săturat de „peisaj de basm”.'
    ),
    lesson(
      'portret',
      'Portretul: fizic care spune ceva',
      'Nu inventaria: ochi, nas, gură, păr, ca la buletin. Alege 2–3 trăsături și un gest. Gestul e podul spre moral: își netezește caietul de trei ori înainte să vorbească — grijă sau emoție. Spune-o prin fapt, nu prin etichetă („era timidă”).',
      'Dacă cerința e portret moral, tot ai nevoie de fapte, nu de o listă de virtuți.',
      'Exemplu lucrat: „Își ținea mâinile în buzunare, dar degetele numărau tivul, iar când râdea, râdea doar cu un colț, ca și cum ar fi verificat dacă e voie.” Portret. „Era o fată foarte sociabilă și inteligentă” — buletin.',
      'Reține: caracterul se vede. Nu se anunță cu trompeta.'
    ),
    lesson(
      'plan-desc',
      'Plan de descriere în cinci rânduri',
      '1) Cadru general. 2) Un element dominant. 3) Detalii de aproape / un simț. 4) O figură de stil sau un contrast. 5) O închidere care nu e morală de calendar („natura e importantă”). Închiderea poate fi o imagine: umbra se mută pe găleată.',
      'Paragrafele urmează planul. Recitire: am alunecat în poveste? Am repetat „frumos”?',
      'Exemplu lucrat: închidere slabă: „În concluzie, curtea era frumoasă.” Închidere bună: „Găleata rămânea acolo, albastră, ca un semn că cineva o să se întoarcă.”',
      'Reține: descrierea se închide cu o imagine, nu cu o concluzie de eseu.'
    )
  ],
  'romana:argumentativ': [
    lesson(
      'teza',
      'O părere care se poate apăra',
      'Argumentarea nu e poveste și nu e slogan. Teza e o frază clară: „Da, lectura pe hârtie ajută mintea să stea”, sau „Nu, e suficient ecranul dacă alegi bine”. Evită teze imposibil de acoperit în 180 de cuvinte („tot sistemul educațional…”).',
      'Cerința poate cere raportare la un text citit sau o temă din viața școlii. Rămâi acolo.',
      'Exemplu lucrat: temă „Merită să înveți un instrument?” Teză: „Da, pentru că ritmul de exercițiu te învață să aștepți un rezultat.” Nu: „Muzica e viață.” A doua nu se poate argumenta, doar striga.',
      'Reține: teza e o propoziție, nu un titlu de poster.'
    ),
    lesson(
      'arg-ex',
      'Argument + exemplu, nu listă de lozinci',
      'Un argument e un motiv. Exemplul îl face vizibil: din clasă, dintr-un text, dintr-o situație credibilă (nu o statistică inventată). Două argumente solide bat cinci vorbe goale. Conectori: pentru că, de exemplu, în plus, totuși, așadar.',
      'Concesia („e adevărat că…, însă…”) arată maturitate, dacă e scurtă.',
      'Exemplu lucrat: „Lectura pe hârtie ajută atenția, pentru că nu sare o notificare. De exemplu, când citesc 10 pagini dintr-o carte, țin firul; pe telefon, după două ecrane, verific altceva.” Motiv + exemplu. Fără „toată lumea știe că e bine să citești”.',
      'Reține: „toată lumea știe” nu e argument. E o evadare.'
    ),
    lesson(
      'struct-arg',
      'Paragrafe: teză, corp, concluzie',
      'Paragraful 1: poziția, în cuvinte simple. 2–3: câte un argument cu exemplu. Ultimul: reiei teza cu alți termeni, fără idee nouă. Nu încheia cu „și-am trăit fericiți” și nu deschide o temă nouă („și sportul e important”).',
      'Persoana: de obicei a I-a de politețe a opiniei („cred că”, „din experiența clasei”) sau un ton impesonal. Ține un registru, nu trece în argou.',
      'Exemplu lucrat: concluzie slabă: „Cam astea au fost părerile mele.” Concluzie bună: „Așadar, un instrument merită timpul: nu pentru concert, ci pentru obiceiul de a relua un pas până iese.”',
      'Reține: concluzia e o oglindă, nu o ușă spre alt coridor.'
    ),
    lesson(
      'greseli-arg',
      'Ce strică un text argumentativ la EN',
      'Narațiunea deghizată („anul trecut, când eram la bunici…”) fără să se întoarcă la teză. Atacul („cine nu e de acord e prost”). Exemplul lung cât o temă. Lipsa conectorilor, deci lipsa scheletului. Copierea unor fraze din internet — inutile aici, și oricum se văd.',
      'Dacă cerința e pe un text-suport, trebuie un nod spre acel text: o idee, o situație, nu neapărat un citat lung.',
      'Exemplu lucrat: cerință pe un text despre un cireș. Argumentul tău despre fotbal, fără punte, e în altă lucrare. Punte: „Ca personajul care se întoarce zilnic la copac, un obicei mic bate un entuziasm de o zi.”',
      'Reține: tot ce scrii trebuie să poată fi întrebat: „cum ajută asta teza?” Dacă nu, tai.'
    )
  ],
  'romana:strategie': [
    lesson(
      'ordine-lucru',
      'Ordinea pe foaie, de la cap la coadă',
      '1) Citești toate cerințele, inclusiv redactarea, ca să știi unde merg minutele. 2) Textul de două ori. 3) Itemii scurți, răspunsuri pe măsură. 4) Plan de redactare. 5) Redactare. 6) Recitire globală. Să sari la redactare de panică e un clasic care costă itemi ușori de la I.',
      'Ciorna e legală. Lucrarea trebuie să poată fi citită de un om străin, obosit, seara.',
      'Exemplu lucrat: un item de 4 puncte îți mănâncă 15 minute de filosofie. Îl lași marcat, treci mai departe, te întorci. Cele 4 puncte nu merită 15 minute dacă 30 stau la redactare.',
      'Reține: punctajul nu e proporțional cu emoția. Itemul scurt e bani rapizi.'
    ),
    lesson(
      'plan-5',
      'Planul de cinci rânduri, pentru orice tip',
      'Narativ: situație – treaptă – gest – capăt. Descriptiv: cadru – dominant – aproape – imagine finală. Argumentativ: teză – motiv1 – exemplu – motiv2 – oglindă. Scrii planul cu verbe, nu cu „frumos”.',
      'Dacă planul nu încape în 5–7 rânduri, textul tău va ieși împrăștiat.',
      'Exemplu lucrat: argumentativ pe „Merită caietul de hârtie?” 1) Da, pentru atenție. 2) Fără notificări. 3) Exemplu: o oră de algebră. 4) Totuși, ecranul e bun la dicționar. 5) Așadar, hârtia pentru gândul lung, ecranul pentru căutat. Ai și o concesie, totul încape.',
      'Reține: planul e textul văzut de sus. Fără el, scrii la întâmplare și speri.'
    ),
    lesson(
      'recitire',
      'Lista scurtă de recitire',
      'Acord subiect–predicat. „să” cu diacritice. Virgula de vocativ. Anularea dublei negații greșite. Persoana cerută la redactare. Ai răspuns la verb (transcrie vs. explică)? Ai depășit absurd limita de cuvinte? Un rând ilizibil se rescrie, nu se „ghicește” de corector.',
      'Nu schimbi teza în ultimele două minute. Repari suprafața.',
      'Exemplu lucrat: vezi „copiii citește”. Corectezi „citesc”. Vezi trei „apoi” la rând în narațiune: înlocuiești unul cu un detaliu. Atât. Nu rescrii pagina.',
      'Reține: recitirea e un tur de pistă, nu un al doilea examen.'
    ),
    lesson(
      'capcane',
      'Capcane obișnuite, spuse pe șleau',
      'A copia enunțul ca umplutură. A scrie „autorul vrea să transmită” la toate. A confunda narațiunea cu descrierea. A uita persoana. A da un sinonim care nu stă în frază. A lăsa redactarea neîncheiată. A scrie argou sau mesaje de telefon. A inventa citate.',
      'Niciuna nu e fatală dacă prinzi una-două la recitire. Trei-patru la un loc, da.',
      'Exemplu lucrat: item „explică rolul virgulei”. Nu e „face o pauză”. E un rol gramatical: izolează un vocativ, o apoziție, o incidență. Răspunsul scurt și tehnic bate poezia despre respirație.',
      'Reține: examenul premiază exactitatea. Farmecul e bonus, după ce ai fost exact.'
    )
  ]
};

function lessonsForEn(subject, chapterId) {
  const key = `${String(subject || '').toLowerCase()}:${String(chapterId || '')}`;
  return LESSONS_EN[key] ? LESSONS_EN[key].slice() : [];
}

module.exports = { LESSONS_EN, lessonsForEn };

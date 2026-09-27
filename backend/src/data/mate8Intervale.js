// Capitolul I din Matematică, clasa a VIII-a, Litera, A1984 (2025):
// intervale de numere reale și inecuații în ℝ.
// Text original. Nu copiem enunțuri, teste sau exemple din manual.
// Plan principal: tot ce cere programa (mulțimi prin proprietate, intervale,
// operații cu intervale, inecuații ax + b și cele reductibile la ele).
// Pașii de click din proiectele cu programe de desen sau de tabele nu sunt lecții.

function lesson(id, title, block) {
  const example = String(block.example || '').replace(/^Exemplu lucrat:\s*/i, '');
  const platter = [
    block.theory,
    `Exemplu lucrat: ${example}`,
    block.practice ? `Exersează: ${block.practice}` : '',
    block.mistakes ? `Greșeli frecvente: ${block.mistakes}` : '',
    block.tryThis,
    block.recap
  ].filter(Boolean).join('\n\n');
  return {
    id, title, platter,
    theory: block.theory,
    example,
    practice: block.practice,
    mistakes: block.mistakes,
    tryThis: block.tryThis,
    recap: block.recap,
    figure: block.figure,
    formulas: block.formulas
  };
}

const INTERVALE_LESSONS = [
  lesson('recap-sapte', 'Ne amintim din clasa a VII-a', {
    figure: 'number-line',
    formulas: ['√(a^2) = |a|', 'm_g ≤ m_a', 'x^2 = a are 0, 1 sau 2 soluții reale'],
    theory: 'Plan principal. Înainte de intervale, pune la loc uneltele de anul trecut. ℝ este axa. În ea stau naturalele, întregii și raționalele. Iraționalele, ca √2 și π, au zecimale infinite, fără perioadă.\n\nRadicalul scoate un pătrat. √(a^2) = |a|. Termenii asemenea se adună. Media aritmetică stă între cea mai mică și cea mai mare valoare. Media geometrică a două numere pozitive este √(a · b) și nu trece peste media aritmetică. Procentul este o fracție cu numitorul 100.\n\nÎn geometrie știi triunghiul, paralelogramul, trapezul, cercul și triunghiurile asemenea. Pitagora și sinusul rămân pentru lungimi și unghiuri. Ecuația x^2 = a o știi deja. Inecuațiile în ℝ încep abia în lecțiile următoare.\n\nPlan secundar. Proiectele cu programe de desen sau de tabele nu se învață ca pași de click. Aici contează ideea, nu meniul unui program.',
    example: '√16 = 4. Media aritmetică a lui 4 și 16 este 10. Media geometrică este √(4 · 16) = 8. 8 este mai mic decât 10. 25% din 40 este 10, pentru că 25/100 · 40 = 10. Într-un dreptunghi 6 cm pe 8 cm, diagonala are 10 cm.',
    practice: '1. √(9/4). 2. Media geometrică a lui 1 și 9. 3. 10% din 70.\n\nRăspunsuri: 3/2. 3. 7.',
    mistakes: 'Nu relua testele de anul trecut ca pe niște enunțuri de copiat. Nu pune media geometrică mai mare decât cea aritmetică. Nu începe inecuațiile în ℝ înainte să recunoști axa.',
    tryThis: 'Scrie pe un rând un radical, o medie și un procent, cu numere mici, apoi verifică fiecare rezultat.',
    recap: 'Anul trecut ai ℝ, radicali, medii, procente, triunghiuri, patrulatere, cerc și asemănare. De aici, mulțimile de pe axă se scriu ca intervale, iar inecuația întreabă pentru ce x rămâne adevărată.'
  }),

  lesson('multimi-proprietate', 'Mulțimi descrise printr-o proprietate', {
    figure: 'venn',
    formulas: ['{x ∈ M | proprietate}', 'ℝ₊ = {x ∈ ℝ | x > 0}', 'cardinalul numără elementele'],
    theory: 'Plan principal. O mulțime o poți da în trei feluri. O enumeri, când are puține elemente: {0, 1, 2}. O desenezi ca diagramă, cu o linie închisă și elementele înăuntru. O descrii printr-o proprietate: {x ∈ M | proprietate}. Citești „x din M astfel încât proprietatea”.\n\nM este mulțimea din care alegi. Bara verticală desparte elementul de condiție. {x ∈ ℕ | x < 4} înseamnă naturalele mai mici decât 4. ℕ începe de la 0, deci mulțimea este {0, 1, 2, 3}.\n\nℝ₊ este mulțimea realelor pozitive: {x ∈ ℝ | x > 0}. ℝ₋ este mulțimea realelor negative: {x ∈ ℝ | x < 0}. ℝ* este mulțimea realelor nenule: {x ∈ ℝ | x ≠ 0}. 0 nu stă în niciuna dintre ele.\n\nCardinalul unei mulțimi finite este numărul de elemente distincte. Îl notezi cu două bare: |{0, 1, 2}| = 3. Elementele repetate nu se numără de două ori.',
    example: '{x ∈ ℤ | −1 ≤ x < 3} = {−1, 0, 1, 2}. Cardinalul este 4. {x ∈ ℝ₊ | x < 1} nu se enumeră: sunt toate realele strict între 0 și 1. 0 nu intră, pentru că nu este pozitiv.',
    practice: '1. Scrie elementele lui {x ∈ ℕ | x ≤ 2}. 2. −3 este în ℝ₋? 3. Cardinalul lui {2, 2, 5}.\n\nRăspunsuri: {0, 1, 2}. Da. 2.',
    mistakes: 'Nu uita că 0 este natural. Nu pune 0 în ℝ₊ și nici în ℝ₋. Nu număra de două ori același element când spui cardinalul.',
    tryThis: 'Descrie printr-o proprietate mulțimea întregilor de la −2 până la 2, inclusiv. Apoi enumeră elementele și spune cardinalul.',
    recap: 'Enumerarea, diagrama și proprietatea spun aceeași mulțime. {x ∈ M | …} alege din M doar elementele care îndeplinesc condiția. Cardinalul numără elementele distincte.'
  }),

  lesson('relatii-multimi', 'Relații și operații cu mulțimi', {
    figure: 'venn',
    formulas: ['A ∪ B strânge tot', 'A ∩ B este partea comună', 'A − B scoate din A ce este și în B'],
    theory: 'Plan principal. x ∈ A înseamnă că x este element al lui A. x ∉ A înseamnă că nu este. A ⊂ B înseamnă că orice element din A este și în B. Spui că A este submulțime a lui B. A = B când au exact aceleași elemente. Ordinea din enumerare nu contează.\n\nO mulțime finită cu n elemente are 2^n submulțimi, inclusiv mulțimea vidă și mulțimea însăși. {a, b} are submulțimile ∅, {a}, {b} și {a, b}. Sunt 4, adică 2^2.\n\nReuniunea A ∪ B strânge elementele care sunt în A sau în B sau în amândouă. Intersecția A ∩ B ține doar ce este în amândouă. Diferența A − B ține ce este în A și nu este în B. B − A este cealaltă bucată. Nu sunt egale, decât dacă A și B au aceleași elemente.\n\nCând mulțimile sunt date prin proprietate, operația se vede tot prin proprietate. {x ∈ ℤ | x ≥ 0} ∩ {x ∈ ℤ | x < 3} = {0, 1, 2}.',
    example: 'A = {1, 2, 3} și B = {3, 4}. A ∪ B = {1, 2, 3, 4}. A ∩ B = {3}. A − B = {1, 2}. B − A = {4}. {a, b} are patru submulțimi.',
    practice: '1. {1, 2} ∩ {2, 5}. 2. {1, 2} − {2, 5}. 3. Câte submulțimi are o mulțime cu 3 elemente?\n\nRăspunsuri: {2}. {1}. 8.',
    mistakes: 'Nu schimba A − B cu B − A. Nu spune că reuniunea este doar partea comună. Nu uita mulțimea vidă când numeri submulțimile.',
    tryThis: 'Desenează două cercuri care se taie. Pune în ele numerele 1, 2 și 3, apoi scrie reuniunea, intersecția și ambele diferențe.',
    recap: 'Apartenența, incluziunea și egalitatea compară mulțimi. Reuniunea lipește, intersecția păstrează comunul, diferența taie. O mulțime cu n elemente are 2^n submulțimi.'
  }),

  lesson('axa-submultimi', 'Axa și submulțimi ale dreptei', {
    figure: 'integer-line',
    formulas: ['MN = |x_N − x_M|', 'segmentul este o bucată cu două capete', 'semidreapta are un singur capăt'],
    theory: 'Plan principal. Axa numerelor este o dreaptă cu origine, sens și unitate. Fiecare număr real are un punct. Ca să așezi un irațional, folosești o aproximare zecimală. √2 este aproximativ 1,41 și stă între 1 și 2.\n\nDacă M și N au coordonatele x_M și x_N, distanța MN este |x_N − x_M|. Modulul șterge semnul, pentru că distanța nu este negativă. Nu contează din care capăt pornești.\n\nSegmentul este mulțimea punctelor dintre două capete, inclusiv capetele. Pe axă, segmentul de la a la b, cu a < b, este {x ∈ ℝ | a ≤ x ≤ b}. Semidreapta are un capăt și merge la nesfârșit într-un sens. {x ∈ ℝ | x ≥ 3} este semidreapta care începe la 3 și merge spre dreapta, cu capătul inclus.\n\nDreapta întreagă este {x ∈ ℝ | x este real}. O scrii și (−∞, +∞).',
    example: 'M are coordonata −2 și N are coordonata 5. MN = |5 − (−2)| = |7| = 7. Aceeași distanță iese din |−2 − 5| = 7. Segmentul de la −2 la 5 ține și capetele. Semidreapta x ≥ 3 începe la 3.',
    practice: '1. Distanța dintre 1 și 6. 2. Distanța dintre −4 și 2. 3. 3 este pe semidreapta x > 3?\n\nRăspunsuri: 5. 6. Nu.',
    mistakes: 'Nu lași distanța cu semn minus. Nu confunda segmentul, care are două capete, cu semidreapta, care are unul. Nu pune √2 exact pe 1,41: 1,41 este o aproximare.',
    tryThis: 'Alege două numere întregi pe axă, unul negativ. Calculează distanța cu modulul și verifică numărând unitățile.',
    recap: 'Pe axă, distanța este modulul diferenței coordonatelor. Segmentul are două capete. Semidreapta are unul și merge într-un singur sens.'
  }),

  lesson('intervale-reale', 'Intervale de numere reale', {
    figure: 'number-line',
    formulas: ['[a, b] ține capetele', '(a, b) taie capetele', '|x| < a înseamnă x ∈ (−a, a)'],
    theory: 'Plan principal. Un interval este o bucată de axă. Paranteza dreaptă ține capătul. Paranteza rotundă îl taie. Le desenezi: punct plin pentru capăt inclus, punct gol pentru capăt exclus.\n\nMărginite: [a, b] este închis, (a, b) este deschis, [a, b) ține pe a și taie pe b, (a, b] taie pe a și ține pe b. Le legi de segment: [a, b] este segmentul, (a, b) este segmentul fără capete.\n\nNemărginite: (a, +∞) și [a, +∞) merg spre dreapta. (−∞, a) și (−∞, a] merg spre stânga. ℝ = (−∞, +∞). ∞ nu este un număr. Este un sens, spre dreapta sau spre stânga, fără capăt.\n\nAcelași interval se scrie și ca mulțime cu proprietate. [2, 5) = {x ∈ ℝ | 2 ≤ x < 5}. Invers, {x ∈ ℝ | x > 1} = (1, +∞).\n\nModulul se citește tot ca interval, dacă a > 0. |x| < a înseamnă −a < x < a, deci x ∈ (−a, a). |x| ≤ a înseamnă x ∈ [−a, a]. |x| > a înseamnă x ∈ (−∞, −a) ∪ (a, +∞). |x| ≥ a ține și capetele −a și a.',
    example: '(−2, 5] ține numerele reale strict mai mari decât −2 și mai mici sau egale cu 5. Întregii din el sunt −1, 0, 1, 2, 3, 4 și 5. Sunt 7. −2 nu intră. |x| < 3 înseamnă x ∈ (−3, 3).',
    practice: '1. 5 este în [2, 5)? 2. Câte întregi sunt în [1, 3]? 3. |x| ≤ 2 se scrie ca interval.\n\nRăspunsuri: nu. 3. [−2, 2].',
    mistakes: 'Nu ține capătul de la o paranteză rotundă. Nu crede că ∞ este un număr pe care îl incluzi. Nu uita că |x| > a dă două bucăți de axă, nu una.',
    tryThis: 'Desenează [−1, 4) și (1, +∞) pe aceeași axă. Marchează capetele pline și goale, apoi spune un număr care este doar în primul și unul care este doar în al doilea.',
    recap: 'Paranteza dreaptă ține capătul, cea rotundă îl taie. Intervalul se scrie și ca proprietate. |x| < a este intervalul deschis (−a, a), când a > 0.'
  }),

  lesson('operatii-intervale', 'Operații cu intervale', {
    figure: 'number-line',
    formulas: ['reuniunea lipește', 'intersecția este bucata comună', 'rezultatul poate să nu fie un interval'],
    theory: 'Plan principal. Cu intervalele faci aceleași operații ca la mulțimi: reuniune, intersecție și diferență. Le vezi pe axă. Hașurezi fiecare interval, apoi citești ce rămâne.\n\nReuniunea lipește bucățile. Dacă se ating sau se acoperă, iese un singur interval. [1, 2] ∪ (2, 3] = [1, 3], pentru că 2 este deja în primul. Intersecția ține doar porțiunea comună. [0, 5] ∩ [3, 8] = [3, 5].\n\nDiferența scoate din primul ce este și în al doilea. [0, 5] − [3, 5] = [0, 3). Capătul 3 pleacă, pentru că este în al doilea interval.\n\nRezultatul nu este mereu un interval. (−1, 0) ∪ (2, 3) are o gaură între 0 și 2. Nu o poți scrie cu o singură pereche de capete. O lași ca reuniune.\n\nLa capete, te uiți care paranteză câștigă. Dacă un capăt este inclus măcar într-un interval al reuniunii, rămâne inclus. La intersecție, capătul rămâne doar dacă este inclus în ambele.',
    example: '[−1, 4) ∪ (2, 6] acoperă axa de la −1 până la 6, inclusiv capetele, pentru că 4 stă în al doilea interval și 2 stă în primul. Reuniunea este [−1, 6]. Tăiată cu [0, 5], rămâne [0, 5]. (−1, 0) ∪ (2, 3) nu este un interval.',
    practice: '1. [0, 4] ∩ [2, 6]. 2. [0, 4] ∪ [5, 7] este un singur interval? 3. ([−1, 4) ∪ (2, 6]) ∩ [0, 5].\n\nRăspunsuri: [2, 4]. Nu. [0, 5].',
    mistakes: 'Nu lipi două intervale dacă între ele rămâne o gaură. Nu include un capăt la intersecție dacă una dintre paranteze îl taie. Nu spune că orice reuniune este un interval.',
    tryThis: 'Desenează [−2, 1) și (0, 3]. Hașurează reuniunea și intersecția. Spune dacă reuniunea are un singur interval și care sunt capetele intersecției.',
    recap: 'Reuniunea lipește, intersecția păstrează comunul, diferența taie. Desenezi axa înainte să scrii rezultatul. Uneori rămân două bucăți, nu un interval.'
  }),

  lesson('proprietati-inegalitati', 'Proprietăți ale inegalităților', {
    figure: 'integer-line',
    formulas: ['aduni același număr și sensul rămâne', 'înmulțești cu un negativ și sensul se întoarce', 'inegalitățile se pot aduna membru cu membru'],
    theory: 'Plan principal. Pe axă, x < y înseamnă că x este la stânga lui y. x ≤ y permite și egalitatea. La fel pentru > și ≥.\n\nTranzitivitatea: dacă x < y și y < z, atunci x < z. Același lucru merge și cu ≤.\n\nDacă aduni sau scazi același număr în ambii membri, sensul rămâne. Din x < 3 scoți x + 2 < 5 și x − 4 < −1.\n\nDacă înmulțești sau împarți cu un număr pozitiv, sensul rămâne. Din x < 3 și înmulțirea cu 4 scoți 4x < 12. Dacă înmulțești sau împarți cu un număr negativ, sensul se întoarce. Din x < 3 și înmulțirea cu −2 scoți −2x > −6. Minusul de la o adunare nu întoarce sensul. Îl întoarce doar înmulțirea sau împărțirea cu un negativ.\n\nPoți aduna inegalități membru cu membru, în același sens. Dacă 2 < 5 și 1 < 4, atunci 3 < 9. Nu le scădea membru cu membru: sensul poate să nu se păstreze.',
    example: 'Din −2 < 4, aduni 3 și rămâne 1 < 7. Împarți la 2 și rămâne −1 < 2. Înmulțești cu −3 și sensul se întoarce: 6 > −12. Din 2 < 5 și 1 < 4, suma membru cu membru este 3 < 9.',
    practice: '1. Din x ≤ 4, cât este x + 1? 2. Din x > 1, înmulțit cu −5, ce sens are −5x? 3. 1 < 3 și 2 < 6. Suma membru cu membru.\n\nRăspunsuri: x + 1 ≤ 5. −5x < −5. 3 < 9.',
    mistakes: 'Nu întoarce sensul când aduni un număr negativ. Îl întorci doar când înmulțești sau împarți cu un negativ. Nu scădea inegalități membru cu membru și să păstrezi sensul din obișnuință.',
    tryThis: 'Pornește de la 2 < 6. Adună −3, înmulțește cu 2, apoi înmulțește rezultatul cu −1. Scrie sensul după fiecare pas.',
    recap: 'Sensul rămâne la adunare, la scădere și la înmulțirea cu un pozitiv. Sensul se întoarce la înmulțirea sau împărțirea cu un negativ. Inegalitățile de același sens se pot aduna membru cu membru.'
  }),

  lesson('inecuatie-axb', 'Inecuația ax + b', {
    figure: 'number-line',
    formulas: ['soluția este un interval', 'împarți la un negativ și întorci sensul', 'în M, tai intervalul cu M'],
    theory: 'Plan principal. O inecuație întreabă pentru ce x inegalitatea rămâne adevărată. Nu cauți un singur număr, ci mulțimea soluțiilor. ax + b ≤ 0, sau cu <, > ori ≥, are necunoscuta x la puterea întâi.\n\nDouă inecuații sunt echivalente când au aceeași mulțime de soluții. Le transformi ca la ecuații, cu regula sensului. Muți termenii, apoi împarți la coeficientul lui x.\n\nDacă a > 0, împarți și sensul rămâne. Dacă a < 0, împarți și sensul se întoarce. Dacă a = 0, nu mai ai x. Atunci b ≤ 0 este adevărată pentru orice x, sau este falsă pentru orice x, după numărul b.\n\nÎn ℝ, soluția este un interval. Îl desenezi pe axă. −2x + 3 ≤ 11 se aduce la −2x ≤ 8. Împarți la −2 și întorci sensul: x ≥ −4, adică [−4, +∞).\n\nPoți cere soluția doar într-o mulțime M. Atunci iei intersecția intervalului cu M. În ℕ, x + 1 ≤ 3 dă x ≤ 2, deci {0, 1, 2}. În ℤ, −2 ≤ x < 2 dă {−2, −1, 0, 1}. În M = {−1, 0, 4, 5}, condiția x ≥ 0 lasă {0, 4, 5}. Nu orice restricție rămâne un interval: contraexemplul este chiar această mulțime finită.',
    example: 'Un bilet costă 4 lei și ai cel mult 20 de lei. 4x ≤ 20 dă x ≤ 5. Dacă x este număr natural de bilete, soluția este {0, 1, 2, 3, 4, 5}. În ℝ, aceeași inecuație este (−∞, 5]. Separat: −2x + 3 ≤ 11 dă x ≥ −4, adică [−4, +∞).',
    practice: '1. 3x − 6 ≤ 0. Scrie intervalul. 2. Cel mai mic întreg x cu x + 3 ≥ 7. 3. 2x < 10. Cel mai mare întreg x.\n\nRăspunsuri: (−∞, 2]. 4. 4.',
    mistakes: 'Nu lăsa un singur număr când soluția este un interval. Nu uita să întorci sensul la împărțirea cu un negativ. Nu spune că soluția în ℕ este tot intervalul de pe axă: tai cu ℕ.',
    tryThis: 'Rezolvă −3x + 1 > 7 în ℝ și desenează intervalul. Apoi spune care sunt soluțiile întregi mai mari decât −4.',
    recap: 'ax + b se rezolvă prin transformări echivalente. Semnul lui a spune dacă sensul rămâne. În ℝ răspunsul este un interval. În M este intersecția intervalului cu M.'
  }),

  lesson('semne-fractii', 'Inecuații cu paranteze, fracții și regula semnelor', {
    figure: 'number-line',
    formulas: ['aduci la ax + b', 'numitorul nu este 0', '(x − 1)(x + 3) > 0 în afara rădăcinilor'],
    theory: 'Plan principal. Unele inecuații par mai grele, dar se aduc la ax + b. Deschizi parantezele. La o fracție, înmulțești cu numitorul doar după ce știi semnul lui. Dacă numitorul este un număr pozitiv, sensul rămâne. Dacă este un număr negativ, sensul se întoarce.\n\nO inegalitate dublă se taie în două condiții și le ții pe amândouă. −1 < 2x + 1 ≤ 5 înseamnă −1 < 2x + 1 și 2x + 1 ≤ 5.\n\nCând necunoscuta este la numitor, nu înmulțești orbește. Pentru a/(bx + c) < 0, cu a număr nenul, fracția este negativă când numărătorul și numitorul au semne diferite. bx + c ≠ 0, deci valoarea care anulează numitorul nu este soluție. Aceeași regulă merge la >, ≤ și ≥. La ≤ și ≥, numărătorul poate fi 0, dar numitorul tot nu poate fi 0.\n\nTabelul de semne merge și la un produs. (x − 1)(x + 3) > 0. Rădăcinile sunt −3 și 1. La stânga lui −3, ambii factori sunt negativi, produsul este pozitiv. Între rădăcini, semnele diferă, produsul este negativ. La dreapta lui 1, ambii sunt pozitivi, produsul este pozitiv. Soluția este (−∞, −3) ∪ (1, +∞).',
    example: '(x + 4)/2 > 1. Înmulțești cu 2 și sensul rămâne: x + 4 > 2, deci x > −2. Apoi (x − 1)(x + 3) > 0 dă x < −3 sau x > 1. Iar −1 < 2x + 1 ≤ 5 se taie: −2 < 2x ≤ 4, deci −1 < x ≤ 2, adică (−1, 2].',
    practice: '1. 3(x − 1) ≤ 6. 2. (x − 1)(x + 3) > 0, ca reuniune de intervale. 3. (x − 2)/(x + 1) < 0, cu x ≠ −1.\n\nRăspunsuri: x ≤ 3, adică (−∞, 3]. (−∞, −3) ∪ (1, +∞). (−1, 2).',
    mistakes: 'Nu includi valoarea care anulează numitorul. Nu înmulți cu un numitor care depinde de x fără să-i știi semnul. Nu pui semnul plus între rădăcini la (x − 1)(x + 3), când coeficientul lui x^2 este pozitiv.',
    tryThis: 'Fă tabelul de semne pentru (x − 2)(x + 1). Spune unde produsul este negativ și scrie intervalul, fără rădăcini.',
    recap: 'Parantezele și fracțiile cu numitor numeric se aduc la ax + b. La o fracție cu x la numitor folosești semnele și scoți valoarea care anulează numitorul. Produsul (x − 1)(x + 3) este pozitiv în afara rădăcinilor.'
  }),

  lesson('recap-intervale', 'Recapitulare: intervale și inecuații', {
    figure: 'integer-line',
    formulas: ['|x| < a înseamnă (−a, a)', 'sensul se întoarce la împărțirea cu un negativ', 'soluția în M este intersecția cu M'],
    theory: 'Plan principal. O mulțime o enumeri, o desenezi sau o scrii {x ∈ M | proprietate}. ℝ₊, ℝ₋ și ℝ* se citesc tot așa. Reuniunea, intersecția și diferența se văd pe elemente sau pe axă.\n\nDistanța pe axă este un modul. Intervalul ține sau taie capetele după paranteză. ℝ este (−∞, +∞). |x| < a este (−a, a). Operația cu intervale poate lăsa o gaură, deci rezultatul nu este mereu un interval.\n\nLa inegalități, sensul rămâne când lucrezi cu un pozitiv și se întoarce când înmulțești sau împarți cu un negativ. ax + b se rezolvă prin echivalențe și dă un interval în ℝ. În ℕ, în ℤ sau într-o mulțime finită, tai intervalul cu mulțimea cerută.\n\nParantezele și fracțiile se reduc la aceeași formă. Regula semnelor rezolvă a/(bx + c) și produsul (x − 1)(x + 3), cu grija ca numitorul să nu fie 0.',
    example: '−2x + 3 ≤ 11 dă x ≥ −4, adică [−4, +∞). (x − 1)(x + 3) > 0 dă (−∞, −3) ∪ (1, +∞). În (−2, 5] sunt 7 întregi. ([−1, 4) ∪ (2, 6]) ∩ [0, 5] = [0, 5].',
    practice: '1. Câte întregi sunt în (−2, 5]? 2. Intervalul soluție pentru −2x + 3 ≤ 11. 3. [0, 4] ∩ [2, 6].\n\nRăspunsuri: 7. [−4, +∞). [2, 4].',
    mistakes: 'Nu uita schimbarea de sens. Nu include un capăt tăiat de o paranteză rotundă. Nu anula un numitor care este 0.',
    tryThis: 'Fă o fișă cu patru rânduri: o mulțime prin proprietate, un interval cu capete, o operație de intervale și o inecuație în care împărți la un negativ. Rezolvă-le fără să te uiți în lecție.',
    recap: 'Intervalul este o bucată de axă. Inecuația ax + b dă, în ℝ, un interval. Sensul se întoarce doar la înmulțirea sau împărțirea cu un negativ. Într-o mulțime dată, soluția este intersecția cu acea mulțime.'
  })
];

module.exports = { INTERVALE_LESSONS };

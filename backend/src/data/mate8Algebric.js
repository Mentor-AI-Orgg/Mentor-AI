// Capitolul II din Matematică, clasa a VIII-a, Litera, A1984 (2025):
// calcul algebric în ℝ.
// Text original. Nu copiem enunțuri, teste sau exemple din manual.
// Plan principal: litere, formulele (a ± b)^2 și a^2 − b^2, descompunerea,
// fracțiile algebrice și ecuația de gradul II prin completarea pătratului.
// Plan secundar: formula cu Δ, pe care programa nu o cere.
// Nu folosim terminologia monom/polinom și nu predăm cubul unui binom,
// (a + b + c)^2, suma sau diferența de cuburi și nici relațiile lui Viète.

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

const ALGEBRIC_LESSONS = [
  lesson('calcule-litere', 'Calcule cu numere reale și litere', {
    figure: 'rectangle',
    formulas: ['termenii asemenea au aceeași parte cu litere', '(a + b)(c + d) = ac + ad + bc + bd', 'minus ori minus dă plus'],
    theory: 'Plan principal. Adunarea și înmulțirea numerelor reale sunt comutative și asociative. Înmulțirea se distribuie față de adunare. 0 este elementul neutru la adunare, 1 la înmulțire. Puterea cu exponent natural repetă înmulțirea. a^(−n) = 1/a^n, când a ≠ 0. Întâi parantezele, apoi puterile, apoi înmulțirile și împărțirile, apoi adunările și scăderile.\n\nO expresie algebrică amestecă numere și litere legate prin operații. Litera este o variabilă: îi poți da valori. Valoarea numerică iese când înlocuiești litera cu un număr.\n\nTermeni asemenea au aceeași parte cu litere, inclusiv același exponent. 3x și −5x sunt asemenea. 3x și 3y nu. 3x^2 și 3x nu, pentru că exponentul diferă. La reducere aduni coeficienții și păstrezi partea cu litere. Scoți factorul comun când același factor stă în fiecare termen.\n\nAduni și scazi doar după ce ai grupat termenii asemenea. Înmulțești cu distributivitatea. (a + b)(c + d) = ac + ad + bc + bd. Împarți doar când împărțitorul nu este 0. La puteri, (xy)^n = x^n · y^n și (x^m)^n = x^(m·n), pentru exponenți întregi și baze permise.\n\nRegula semnelor: plus cu plus dă plus, minus cu minus dă plus, semne diferite dau minus. (−2x) · (−3) = 6x.',
    example: '4x + 7x − 2x^2 + x^2 = 11x − x^2. Pentru x = 1, valoarea este 11 − 1 = 10. (x + 2)(x + 3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6. Pentru x = 1, (3) · (4) = 12 și 1 + 5 + 6 = 12.',
    practice: '1. 5x + 2x pentru x = 1. 2. 3x^2 și 3x sunt asemenea? 3. (−2)^2.\n\nRăspunsuri: 7. Nu. 4.',
    mistakes: 'Nu aduna 3x cu 3x^2. Nu spune că (x + 2)(x + 3) este x^2 + 6. Nu împărți la o literă care poate fi 0 fără să spui condiția.',
    tryThis: 'Scrie 2a + 5b − a + b și redu termenii. Apoi înlocuiește a = 3 și b = 1 și verifică valoarea.',
    recap: 'Expresia cu litere capătă o valoare când înlocuiești variabilele. Termenii asemenea se reduc. Înmulțirea desface parantezele prin distributivitate, iar semnele urmează regula cunoscută.'
  }),

  lesson('formule-scurte', 'Pătratul sumei și al diferenței. Diferența de pătrate', {
    figure: 'square',
    formulas: ['(a + b)^2 = a^2 + 2ab + b^2', '(a − b)^2 = a^2 − 2ab + b^2', '(a − b)(a + b) = a^2 − b^2'],
    theory: 'Plan principal. Trei formule scurte se demonstrează și cu arii, și cu înmulțirea.\n\nUn pătrat de latură a + b se taie în patru: un pătrat de latură a, un pătrat de latură b și două dreptunghiuri de laturi a și b. Aria este a^2 + b^2 + 2ab. Deci (a + b)^2 = a^2 + 2ab + b^2. Mijlocul este dublul produsului, nu un simplu ab.\n\n(a − b)^2 = a^2 − 2ab + b^2. Schimbi semnul din mijloc. Algebric: (a − b)(a − b) = a^2 − ab − ab + b^2.\n\n(a − b)(a + b) = a^2 − b^2. Termenii cu ab se anulează: ab și −ab. Geometric, din pătratul mare de latură a scoți pătratul de latură b și rămâne un dreptunghi care se rearanjează în (a − b) pe (a + b).\n\n(a + b)^2 nu este a^2 + b^2. Lipsește 2ab. a^2 − b^2 nu este (a − b)^2. Una este diferență de pătrate, cealaltă este pătratul diferenței.\n\nFormulele merg și când în loc de a și b stau expresii sau radicali. (x + 3)^2 = x^2 + 6x + 9. (√5 + 1)^2 = 5 + 2√5 + 1 = 6 + 2√5.\n\nLe folosești și la un calcul rapid de arie. O grădină pătrată de latură 20 m cu o bordură de 1 m are latura 21 m. Aria este 21^2 = (20 + 1)^2 = 400 + 40 + 1 = 441. Două benzi de lungime n + k și n − k dau aria n^2 − k^2, fără să înmulțești numerele mari cap-coadă.',
    example: '(x + 3)^2 − (x − 1)^2 este o diferență de pătrate. a = x + 3 și b = x − 1. a − b = 4 și a + b = 2x + 2. Produsul este 4 · (2x + 2) = 8(x + 1). Pentru x = 2 iese 8 · 3 = 24. Direct: 5^2 − 1^2 = 25 − 1 = 24.',
    practice: '1. (x + 3)^2 pentru x = 2. 2. (x + 3)^2 − (x − 1)^2 pentru x = 2. 3. 21^2 cu formula, dacă scrii 21 = 20 + 1.\n\nRăspunsuri: 25. 24. 441.',
    mistakes: 'Nu uita 2ab în pătratul sumei. Nu confunda (a − b)^2 cu a^2 − b^2. Nu ridica la pătrat doar primul termen dintr-o paranteză.',
    tryThis: 'Desenează un pătrat de latură 5 împărțit în 3 și 2. Calculează aria ca 3^2 + 2^2 + 2 · 3 · 2 și verifică prin 5^2.',
    recap: '(a + b)^2 = a^2 + 2ab + b^2 și (a − b)^2 = a^2 − 2ab + b^2. (a − b)(a + b) = a^2 − b^2. Mijlocul din pătrat este dublul produsului.'
  }),

  lesson('conjugata', 'Raționalizarea cu conjugată', {
    figure: 'triangle-right',
    formulas: ['conjugata lui a + √b este a − √b', 'conjugata lui √a + √b este √a − √b', '(√a − √b)(√a + √b) = a − b'],
    theory: 'Plan principal. Anul trecut ai raționalizat un numitor de forma a√b, amplificând cu √b. Acum numitorul poate fi o sumă sau o diferență în care apare un radical.\n\nConjugata schimbă semnul din mijloc. Conjugata lui a + √b este a − √b. Conjugata lui √a − √b este √a + √b. Produsul lor este o diferență de pătrate, deci radicalii dispar: (a − √b)(a + √b) = a^2 − b, când b este pozitiv și a^2 − b ≠ 0. (√a − √b)(√a + √b) = a − b.\n\nAmplifici fracția cu conjugata numitorului. Înmulțești și numărătorul, și numitorul. Apoi simplifici, dacă se poate. Condiția este ca numitorul să nu fie 0.',
    example: '2/(√5 − 1). Amplifici cu √5 + 1. Numitorul (√5 − 1)(√5 + 1) = 5 − 1 = 4. Numărătorul este 2(√5 + 1). Fracția este 2(√5 + 1)/4 = (√5 + 1)/2. La fel, 1/(√5 − √2) amplificat cu √5 + √2 dă (√5 + √2)/3, pentru că 5 − 2 = 3.',
    practice: '1. Conjugata lui 3 + √2. 2. (√7 − 1)(√7 + 1). 3. 2/(√5 − 1), după raționalizare.\n\nRăspunsuri: 3 − √2. 6. (√5 + 1)/2.',
    mistakes: 'Nu amplifica doar numitorul. Nu schimba semnul și la numărător, și la numitor, fără să înmulțești pe amândoi cu aceeași conjugată. Nu spune că (√5 − 1)(√5 + 1) este 5 + 1.',
    tryThis: 'Raționalizează 3/(√5 + 1). Verifică numitorul: 5 − 1 = 4. Simplifică rezultatul.',
    recap: 'Conjugata schimbă semnul din mijloc. Produsul este o diferență de pătrate, fără radical la numitor. Amplifici și sus, și jos.'
  }),

  lesson('factor-grupare', 'Factor comun și grupare', {
    figure: 'rectangle',
    formulas: ['scoți ce este în toți termenii', 'grupezi câte doi', 'un produs este 0 dacă un factor este 0'],
    theory: 'Plan principal. Descompunerea în factori scrie expresia ca un produs. Inversul desfacerii parantezelor.\n\nFactorul comun este ce se repetă în toți termenii. Îl scoți în față și în paranteză rămâne cât a rămas din fiecare termen. 4x^2 − 6x = 2x(2x − 3). Verifici desfăcând înapoi.\n\nDacă nu există un factor comun la toți, grupezi. xy + 2x + 3y + 6 = x(y + 2) + 3(y + 2) = (x + 3)(y + 2). Paranteza care se repetă devine factor.\n\nUn produs este 0 dacă cel puțin un factor este 0. De aici, mai târziu, scoți soluțiile unei ecuații. Acum doar recunoști produsul.',
    example: '4x^2 − 6x = 2x(2x − 3). Pentru x = 5, 2 · 5 · (10 − 3) = 10 · 7 = 70. Și 4 · 25 − 6 · 5 = 100 − 30 = 70. xy + 2x + 3y + 6 = (x + 3)(y + 2).',
    practice: '1. 4x^2 − 6x pentru x = 5. 2. Factorul comun din 6x + 9. 3. xy + 2x + 3y + 6, ca produs.\n\nRăspunsuri: 70. 3(2x + 3). (x + 3)(y + 2).',
    mistakes: 'Nu scoate un factor care nu este în toți termenii. Nu lăsa în paranteză termenul întreg, fără să-l împărți la factor. Nu grupa la întâmplare dacă parantezele care ies nu seamănă.',
    tryThis: 'Descompune 6a + 3b + 2a + b prin grupare. Verifică pentru a = 1 și b = 1: suma termenilor și produsul trebuie să dea același număr.',
    recap: 'Factorul comun iese în față. Gruparea face să apară o paranteză repetată. Produsul este forma pe care o cauți.'
  }),

  lesson('descompunere-formule', 'Descompunere cu formule de calcul prescurtat', {
    figure: 'square',
    formulas: ['a^2 − b^2 = (a − b)(a + b)', '(a − b)^2 = (b − a)^2', 'a^2 + b^2 nu se descompune cu aceste formule'],
    theory: 'Plan principal. Ca să descompui, recunoști formula citită de-a-ndoaselea.\n\na^2 − b^2 = (a − b)(a + b). 9x^2 − 25 = (3x)^2 − 5^2 = (3x − 5)(3x + 5).\n\na^2 + 2ab + b^2 = (a + b)^2. a^2 − 2ab + b^2 = (a − b)^2. x^2 − 6x + 9 = (x − 3)^2, pentru că 6x este dublul produsului dintre x și 3, iar 9 este 3^2.\n\n(a − b)^2 = (b − a)^2. Diferența își schimbă semnul, dar pătratul rămâne. (3 − 5)^2 = (−2)^2 = 4 și (5 − 3)^2 = 4.\n\nO sumă de pătrate, a^2 + b^2, nu se descompune cu aceste formule. Nu există un „plus“ în (a − b)(a + b). x^2 + 4 rămâne sumă de pătrate până nu adaugi și scazi un termen potrivit, iar acel truc este în lecția următoare.',
    example: '9x^2 − 25 = (3x − 5)(3x + 5). Pentru x = 2: (6 − 5)(6 + 5) = 1 · 11 = 11. x^2 + 6x + 9 = (x + 3)^2. x^2 + 9 nu se descompune ca diferență de pătrate.',
    practice: '1. 9x^2 − 25 pentru x = 2. 2. x^2 − 6x + 9 ca pătrat. 3. (5 − 3)^2 și (3 − 5)^2.\n\nRăspunsuri: 11. (x − 3)^2. Ambele sunt 4.',
    mistakes: 'Nu descompune a^2 + b^2 în (a + b)(a − b). Nu uita că 9x^2 este (3x)^2, nu 3x^2. Nu spune că (a − b)^2 și (b − a)^2 sunt diferite.',
    tryThis: 'Scrie trei expresii: una diferență de pătrate, una pătrat de sumă și una sumă de pătrate. Descompune doar primele două.',
    recap: 'Diferența de pătrate dă doi factori cu semne diferite. Pătratul perfect dă un factor repetat. Suma de pătrate nu se descompune cu formula diferenței.'
  }),

  lesson('alte-descompuneri', 'Trinomul și alte descompuneri', {
    figure: 'rectangle',
    formulas: ['x^2 + (p + q)x + p·q = (x + p)(x + q)', 'aduni și scazi același termen', 'o sumă de pătrate este cel puțin 0'],
    theory: 'Plan principal. Metodele se combină. Întâi scoți factorul comun, apoi cauți o formulă sau grupezi.\n\nTrinomul x^2 + mx + n se scrie (x + p)(x + q) când p + q = m și p · q = n. Spargi termenul din mijloc în px + qx. x^2 + 5x + 6 = x^2 + 2x + 3x + 6 = x(x + 2) + 3(x + 2) = (x + 2)(x + 3).\n\nUneori aduni și scazi același termen ca să apară o diferență de pătrate. x^4 + 4 = x^4 + 4x^2 + 4 − 4x^2 = (x^2 + 2)^2 − (2x)^2 = (x^2 − 2x + 2)(x^2 + 2x + 2).\n\nDacă scrii o expresie ca sumă de pătrate, vezi un minim sau un maxim. (x − 1)^2 + 4 este cel puțin 4, pentru că un pătrat este cel puțin 0. Minimul este 4, când x = 1. Nu ai nevoie de alte unelte ca să vezi asta.',
    example: 'x^2 + 5x + 6 = (x + 2)(x + 3). Pentru x = 1, 1 + 5 + 6 = 12 și 3 · 4 = 12. x^4 + 4 pentru x = 1 este 5. Factorii (1 − 2 + 2)(1 + 2 + 2) = 1 · 5 = 5. (x − 1)^2 + 4 are minimul 4.',
    practice: '1. x^2 + 5x + 6 ca produs. 2. Valoarea lui x^4 + 4 pentru x = 1. 3. Minimul lui (x − 1)^2 + 4.\n\nRăspunsuri: (x + 2)(x + 3). 5. 4.',
    mistakes: 'Nu căuta p și q doar după produs, fără să verifici suma. Nu spune că x^4 + 4 rămâne nedescompus după ce ai adunat și scăzut 4x^2. Nu pune minimul unei sume de pătrate sub 0.',
    tryThis: 'Descompune x^2 + 7x + 12. Verifică suma și produsul numerelor din paranteze: trebuie să iasă 7 și 12.',
    recap: 'Trinomul x^2 + mx + n se factorizează când găsești două numere cu suma m și produsul n. Poți aduna și scădea un termen ca să apară o diferență de pătrate. O sumă de pătrate îți arată un minim sau un maxim.'
  }),

  lesson('fractii-domeniu', 'Fracții algebrice. Domeniu', {
    figure: 'axes',
    formulas: ['numitorul nu este 0', '(x^2 − 9)/(x − 3) = x + 3 pentru x ≠ 3', 'simplifici doar factori'],
    theory: 'Plan principal. O fracție algebrică este raportul a două expresii cu litere. Numitorul nu are voie să fie 0. Domeniul este mulțimea valorilor pentru care expresia are sens.\n\n(x^2 − 9)/(x − 3) are sens când x − 3 ≠ 0, deci x ≠ 3. La două litere, (x + y)/(x − 1) are sens când x ≠ 1. y poate fi orice.\n\nValoarea numerică se calculează doar pentru un număr din domeniu. Înlocuiești, apoi faci operațiile.\n\nDouă fracții sunt egale pe domeniul comun când au aceeași valoare pentru fiecare astfel de număr. Amplifici înmulțind numărătorul și numitorul cu aceeași expresie nenulă. Simplifici doar după ce ai scris numărătorul și numitorul ca produse și ai tăiat un factor comun. Nu tai termeni adunați.\n\nx^2 − 9 = (x − 3)(x + 3), deci (x^2 − 9)/(x − 3) = x + 3 pentru x ≠ 3. La x = 3 fracția nu există, deși x + 3 ar da 6.',
    example: '(x^2 − 9)/(x − 3) pentru x = 5. Domeniul permite 5. După simplificare rămâne x + 3 = 8. Direct: (25 − 9)/(5 − 3) = 16/2 = 8. (x + y)/(x − 1) nu se calculează la x = 1.',
    practice: '1. (x^2 − 9)/(x − 3) pentru x = 5. 2. Poți calcula aceeași fracție la x = 3? 3. 2x/4, simplificat.\n\nRăspunsuri: 8. Nu. x/2, pentru x oarecare.',
    mistakes: 'Nu simplifica x + 3 cu x, ca și cum adunarea ar fi un produs. Nu înlocui o valoare care anulează numitorul. Nu uita să spui domeniul după simplificare.',
    tryThis: 'Scrie domeniul pentru 1/(x − 2) și pentru (x^2 − 4)/(x − 2). Simplifică a doua fracție și spune ce valoare nu are voie.',
    recap: 'Fracția algebrică cere numitor nenul. Simplifici factori, nu termeni. După simplificare, valoarea scoasă din domeniu rămâne scoasă.'
  }),

  lesson('operatii-fractii', 'Operații cu fracții algebrice', {
    figure: 'rectangle',
    formulas: ['aduni pe numitor comun', 'împărțirea înmulțește cu inversa', '(A/B)^2 = A^2 / B^2'],
    theory: 'Plan principal. Operațiile cu fracții algebrice urmează regulile de la fracțiile numerice, cu domeniul scris de la început.\n\nDacă numitorii sunt egali, aduni sau scazi numărătorii și păstrezi numitorul. Dacă nu sunt egali, descompui și iei numitorul comun. 1/x + 1/(x + 1) = (x + 1)/(x(x + 1)) + x/(x(x + 1)) = (2x + 1)/(x(x + 1)), cu x ≠ 0 și x ≠ −1.\n\nÎnmulțești numărător cu numărător și numitor cu numitor, apoi simplifici. (x/3) · (6/(x + 1)) = 6x / (3(x + 1)) = 2x/(x + 1), cu x ≠ −1.\n\nÎmpărțirea înmulțește cu inversa. (x/2) : (x/4) = (x/2) · (4/x) = 4/2 = 2, cu x ≠ 0.\n\nPuterea trece și sus, și jos. (x/2)^2 = x^2 / 4, cu baza permisă. La final simplifici rezultatul și abia apoi pui valoarea numerică, dacă ți se cere.',
    example: '1/x + 1/(x + 1) la x = 1 este 1/1 + 1/2 = 3/2. Formula dă (2 + 1)/(1 · 2) = 3/2. (x/2)^2 la x = 6 este 36/4 = 9. Și (6/2)^2 = 3^2 = 9.',
    practice: '1. 1/x + 1/(x + 1) pentru x = 1. 2. (x/2) : (x/4) pentru x ≠ 0. 3. (x/2)^2 pentru x = 6.\n\nRăspunsuri: 3/2. 2. 9.',
    mistakes: 'Nu aduna numitorii între ei și să lași numărătorii neschimbați. Nu împărți răsturnând doar o parte din fracție. Nu pui o valoare care anulează un numitor apărut pe drum.',
    tryThis: 'Calculează x/(x + 1) − 1/(x + 1) și simplifică. Apoi înlocuiește x = 2 și verifică cu fracțiile inițiale.',
    recap: 'Aduni pe numitor comun, înmulțești pe diagonală de sus cu cea de jos, împărțirea răstoarnă a doua fracție, puterea urcă și la numărător, și la numitor. Simplifici la final și respecți domeniul.'
  }),

  lesson('ecuatie-grad2', 'Ecuația de gradul al doilea', {
    figure: 'axes',
    formulas: ['x^2 = a are două soluții reale dacă a > 0', 'compleți pătratul', 'un produs nul are un factor nul'],
    theory: 'Plan principal. ax^2 + bx + c = 0, cu a ≠ 0, este ecuația de gradul al doilea. a, b și c sunt coeficienți. O soluție este un număr care face egalitatea adevărată. Mulțimea soluțiilor poate avea două numere, unul sau niciunul.\n\nCazul x^2 = a îl știi. Dacă a > 0, soluțiile sunt √a și −√a. Dacă a = 0, soluția este 0. Dacă a < 0, nu există soluție reală.\n\nax^2 + c = 0 se aduce la x^2 = −c/a, când a ≠ 0, și se judecă la fel. 2x^2 − 8 = 0 dă x^2 = 4, deci x = 2 sau x = −2.\n\nax^2 + bx = 0 scoate factorul comun: x(ax + b) = 0. Un produs este 0 când un factor este 0. x^2 − 5x = 0 dă x(x − 5) = 0, deci x = 0 sau x = 5.\n\nCazul general se rezolvă formând un pătrat. Împarți prin a, dacă vrei coeficientul lui x^2 să fie 1. Muți termenul liber. Adaugi pătratul jumătății coeficientului lui x. De exemplu, x^2 − 6x + 5 = 0 devine x^2 − 6x = −5. Jumătate din 6 este 3, iar 3^2 = 9. x^2 − 6x + 9 = 4, deci (x − 3)^2 = 4. x − 3 = 2 sau x − 3 = −2. x = 5 sau x = 1.\n\nÎn dreapta, după ce ai format pătratul, rămâne un număr. Dacă este pozitiv, ai două soluții reale. Dacă este 0, ai o soluție. Dacă este negativ, nu ai soluție reală, pentru că un pătrat nu este negativ. Același număr este (b^2 − 4·a·c) împărțit la 4a^2. Semnul lui se citește din b^2 − 4·a·c, fiindcă numitorul 4a^2 este pozitiv.\n\nPoți și să descompui în factori de gradul întâi. 2x^2 − 8x + 6 = 2(x^2 − 4x + 3) = 2(x − 1)(x − 3) = 0, deci x = 1 sau x = 3.\n\nx^2 + (a + b)x + ab = (x + a)(x + b) = 0, deci x = −a sau x = −b. Dacă necunoscuta este la numitor, înmulțești cu numitorul după ce ai scos valorile interzise, apoi rezolvi ecuația de gradul II și verifici.',
    example: 'x^2 − 6x + 5 = 0. (x − 3)^2 = 4, deci x = 5 sau x = 1. Verificare: 25 − 30 + 5 = 0 și 1 − 6 + 5 = 0. Separat, x + 6/x = 5, cu x ≠ 0, dă x^2 − 5x + 6 = 0, deci (x − 2)(x − 3) = 0. x = 2 sau x = 3. Ambele sunt nenule și verifică: 2 + 3 = 5.',
    practice: '1. x^2 = 16, soluția pozitivă. 2. x^2 − 5x = 0. 3. x^2 − 6x + 5 = 0.\n\nRăspunsuri: 4. 0 și 5. 1 și 5.',
    mistakes: 'Nu da o singură soluție la x^2 = 9. Nu împărți prin x când x poate fi 0: scoate-l factor. Nu păstra o soluție care anulează un numitor.',
    tryThis: 'Rezolvă x^2 − 4x + 4 = 0 prin pătrat. Spune câte soluții reale are și de ce numărul din dreapta este 0.',
    recap: 'Ecuația de gradul II se rezolvă prin cazurile x^2 = a și ax^2 + bx = 0, apoi prin completarea pătratului sau prin factori. Semnul lui b^2 − 4·a·c spune dacă ai două soluții, una sau niciuna. Verifici soluțiile în ecuația inițială.'
  }),

  lesson('formula-delta', 'Plan secundar: formula cu Δ', {
    figure: 'axes',
    formulas: ['Δ = b^2 − 4·a·c', 'x = (−b ± √Δ) / (2a)', 'metoda din programă rămâne completarea pătratului'],
    theory: 'Plan secundar. Programa cere rezolvarea prin formulele scurte și prin descompunere. Scurtătura cu discriminant nu este în programă. O vezi aici doar ca să recunoști de unde vine, nu ca să o tocesti în locul metodei.\n\nDacă notezi Δ = b^2 − 4·a·c, completarea pătratului se poate rescrie compact. Soluțiile, când Δ > 0, sunt (−b + √Δ) împărțit la 2a și (−b − √Δ) împărțit la 2a. Când Δ = 0, este o singură soluție, −b împărțit la 2a. Când Δ < 0, nu există soluție reală.\n\nNu este o metodă nouă. Este aceeași discuție de semn, scrisă gata calculată. La lucru folosești completarea pătratului sau factorii.',
    example: 'La x^2 − 6x + 5 = 0, a = 1, b = −6 și c = 5. Δ = 36 − 20 = 16. √Δ = 4. (6 + 4)/2 = 5 și (6 − 4)/2 = 1. Aceleași soluții ca la completarea pătratului: 5 și 1.',
    practice: '1. Δ pentru x^2 − 6x + 5. 2. Cele două soluții, cu formula sau cu pătratul. 3. Metoda pe care o folosești la clasă, în primul rând.\n\nRăspunsuri: 16. 5 și 1. Completarea pătratului sau factorii.',
    mistakes: 'Nu înlocui completarea pătratului cu formula doar pentru că este mai scurtă pe o fițuică. Nu uita semnul lui b când b este negativ. Nu căuta soluții reale când Δ este negativ.',
    tryThis: 'Rezolvă x^2 − 4 = 0 și prin factori, și calculând Δ. Cele două drumuri trebuie să dea 2 și −2.',
    recap: 'Δ = b^2 − 4·a·c este o prescurtare a completării pătratului. Este plan secundar. La rezolvare rămâi pe pătrat și pe factori, apoi poți recunoaște formula.'
  }),

  lesson('probleme-grad2', 'Probleme cu ecuații de gradul al doilea', {
    figure: 'rectangle',
    formulas: ['traduci povestea în ax^2 + bx + c = 0', 'păstrezi soluția care are sens', 'verifici în enunț'],
    theory: 'Plan principal. O problemă se traduce întâi în ecuație. Alegi necunoscuta, scrii relația din poveste, rezolvi, apoi păstrezi doar soluția care are sens. Lungimile sunt pozitive. Un număr de persoane este natural. O soluție care nu respectă condiția se aruncă, chiar dacă verifică ecuația.\n\nLa arii, produsul dimensiunilor dă ecuația. La numere, „cu 2 mai mult“ se scrie x + 2. După ce rezolvi, verifici în fraza inițială, nu doar în ecuație.',
    example: 'Un dreptunghi are aria 48 m². Lungimea este cu 2 m mai mare decât lățimea. x(x + 2) = 48, deci x^2 + 2x − 48 = 0. (x + 8)(x − 6) = 0. x = 6 sau x = −8. Lățimea este 6 m, lungimea este 8 m. −8 nu este lungime. Verificare: 6 · 8 = 48.',
    practice: '1. Lățimea din exemplul cu aria 48. 2. x(x + 1) = 12, soluția pozitivă. 3. De ce arunci x = −8 la o lungime?\n\nRăspunsuri: 6 m. 3. Lungimea nu este negativă.',
    mistakes: 'Nu păstra ambele rădăcini dacă una contrazice povestea. Nu uita să verifici produsul dimensiunilor. Nu schimba „cu 2 mai mare“ în 2x.',
    tryThis: 'Găsește două numere naturale consecutive al căror produs este 20. Scrie ecuația, rezolv-o și spune care soluție păstrezi.',
    recap: 'Tradu povestea, rezolvă ecuația de gradul II și păstrează soluția care are sens în context. Verificarea se face în enunț.'
  }),

  lesson('recap-algebric', 'Recapitulare: calcul algebric', {
    figure: 'square',
    formulas: ['(a ± b)^2 = a^2 ± 2ab + b^2', 'a^2 − b^2 = (a − b)(a + b)', 'numitorul nu este 0'],
    theory: 'Plan principal. Cu litere reduci termeni asemenea, înmulțești prin distributivitate și ții regula semnelor. (a + b)^2, (a − b)^2 și a^2 − b^2 se justifică prin arii și prin înmulțire. Conjugata raționalizează numitorii a ± √b și √a ± √b.\n\nDescompui prin factor comun, grupare și formule. (a − b)^2 = (b − a)^2. Suma de pătrate nu se descompune cu diferența de pătrate. Trinomul x^2 + mx + n și adăugarea unui termen, ca la x^4 + 4, combină metodele. O sumă de pătrate arată un minim.\n\nFracția algebrică are domeniu. Simplifici factori. Aduni, scazi, înmulțești, împarți și ridici la putere ca la fracțiile numerice.\n\nEcuația ax^2 + bx + c = 0 se rezolvă prin x^2 = a, prin factor comun sau prin completarea pătratului. Semnul lui b^2 − 4·a·c spune câte soluții reale sunt. În probleme păstrezi soluția care are sens.\n\nPlan secundar. Formula cu Δ este aceeași discuție, scrisă scurt. Nu înlocuiește metoda.',
    example: '(x + 3)^2 − (x − 1)^2 la x = 2 este 24. 9x^2 − 25 la x = 2 este 11. 4x^2 − 6x la x = 5 este 70. (x^2 − 9)/(x − 3) la x = 5 este 8. x^2 − 6x + 5 = 0 are soluțiile 1 și 5.',
    practice: '1. (x + 3)^2 − (x − 1)^2 pentru x = 2. 2. 9x^2 − 25 pentru x = 2. 3. (x^2 − 9)/(x − 3) pentru x = 5.\n\nRăspunsuri: 24. 11. 8.',
    mistakes: 'Nu uita 2ab. Nu simplifica termeni adunați. Nu da soluția care anulează numitorul sau care nu are sens în poveste.',
    tryThis: 'Fă cinci rânduri: o reducere de termeni, o formulă scurtă, o descompunere, o fracție simplificată și o ecuație de gradul II. Rezolvă-le cu numere mici.',
    recap: 'Literele se calculează prin reguli și prin trei formule scurte. Descompunerea și fracțiile pregătesc ecuația de gradul II. O rezolvi formând un pătrat sau un produs nul, apoi verifici.'
  })
];

module.exports = { ALGEBRIC_LESSONS };

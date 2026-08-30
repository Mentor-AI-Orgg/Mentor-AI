// Trepte 1–3: foarte ușor → ușor. Inspirate de tipare de manual, nu copiate.
// Se lipesc în fața băncii principale ca testul să urce de la simplu la greu.

function ex(id, point, prompt, answers, explain, extra = {}) {
  return {
    id,
    point,
    prompt,
    answers: answers.slice(),
    explain,
    hint: extra.hint || '',
    numeric: extra.numeric || null,
    tokens: extra.tokens || [],
    long: false,
    minWords: Number(extra.minWords) || 0,
    steps: Array.isArray(extra.steps) ? extra.steps.slice() : [],
    level: Number(extra.level) || 1
  };
}

const EXTRAS = {
  'matematica:5:naturale': [
    ex('e5n5', 'puteri', 'Calculează 2³. Doar rezultatul.', ['8'], '2×2×2 = 8.', { level: 1, numeric: { value: 8, tolerance: 0 }, steps: ['2³ = 2 × 2 × 2', '4 × 2 = 8'] }),
    ex('e5n6', 'paranteze', 'Calculează 36 : 4 + 5.', ['14'], 'Întâi împărțirea: 9, apoi +5 = 14.', { level: 2, numeric: { value: 14, tolerance: 0 }, steps: ['36 : 4 = 9', '9 + 5 = 14'] }),
    ex('e5n7', 'div3', 'Se împarte 45 exact la 3? da sau nu.', ['da'], '4+5=9, 9 se împarte la 3, deci da.', { level: 3, tokens: ['da'], steps: ['Suma cifrelor: 4+5=9', '9 : 3 = 3', 'Da'] })
  ],
  'matematica:5:fractii': [
    ex('e5f5', 'numitor', 'Calculează 1/2 + 1/2. Doar rezultatul.', ['1', '2/2'], 'Aceleași părți: 2/2 = 1.', { level: 1, steps: ['Numitor comun 2', '1/2 + 1/2 = 2/2', '2/2 = 1'] }),
    ex('e5f6', 'procent', 'Cât e 20% din 50?', ['10'], '20/100 × 50 = 10.', { level: 2, numeric: { value: 10, tolerance: 0 }, steps: ['20% = 20/100 = 1/5', '50 : 5 = 10'] }),
    ex('e5f7', 'media', 'Media aritmetică a notelor 4 și 8.', ['6'], '(4+8):2 = 6.', { level: 3, numeric: { value: 6, tolerance: 0 }, steps: ['Suma = 12', '12 : 2 = 6'] })
  ],
  'matematica:5:geometrie': [
    ex('e5g5', 'unghi', 'Câte grade are un unghi drept?', ['90', '90°'], 'Colțul pătratului: 90°.', { level: 1, numeric: { value: 90, tolerance: 0 }, steps: ['Unghi drept = 90°'] }),
    ex('e5g6', 'perimetru', 'Pătrat de latură 4 cm. Perimetrul, în cm?', ['16'], '4 laturi egale: 4×4=16.', { level: 2, numeric: { value: 16, tolerance: 0 }, steps: ['P = 4 × latura', '4 × 4 = 16'] }),
    ex('e5g7', 'unitati', '3 metri câți centimetri sunt?', ['300', '300 cm'], '1 m = 100 cm, deci 300 cm.', { level: 3, numeric: { value: 300, tolerance: 0 }, steps: ['1 m = 100 cm', '3 × 100 = 300'] })
  ],
  'matematica:6:multimi': [
    ex('e6m5', 'reuniune', 'Câte elemente are {1, 3, 5, 7}?', ['4'], 'Patru numere distincte.', { level: 1, numeric: { value: 4, tolerance: 0 }, steps: ['Numeri valorile dintre acolade', 'Sunt 4'] }),
    ex('e6m6', 'intersectie', 'Este 4 element al mulțimii {2, 4, 6}? da sau nu.', ['da'], '4 apare în mulțime.', { level: 2, tokens: ['da'], steps: ['Cauți 4 între acolade', 'Da'] }),
    ex('e6m7', 'cmmdc', 'c.m.m.d.c.(12, 18). Doar numărul.', ['6'], 'Divizori comuni: 1,2,3,6. Cel mai mare: 6.', { level: 3, numeric: { value: 6, tolerance: 0 }, steps: ['12 = 2²×3, 18 = 2×3²', 'c.m.m.d.c. = 2×3 = 6'] })
  ],
  'matematica:6:proportii': [
    ex('e6p5', 'regula3', '2 kg costă 16 lei. Cât costă 1 kg?', ['8', '8 lei'], '16 : 2 = 8.', { level: 1, numeric: { value: 8, tolerance: 0 }, steps: ['Reduci la 1 kg', '16 : 2 = 8'] }),
    ex('e6p6', 'procent6', '10% din 80. Doar numărul.', ['8'], '10/100 × 80 = 8.', { level: 2, numeric: { value: 8, tolerance: 0 }, steps: ['10% = o zecime', '80 : 10 = 8'] }),
    ex('e6p7', 'scara', 'Simplifică raportul 3 : 6. Scrie a:b.', ['1:2', '1 : 2'], 'Împarți ambele părți la 3.', { level: 3, steps: ['3 și 6 se divid la 3', 'Rămâne 1 : 2'] })
  ],
  'matematica:6:intregi-rationale': [
    ex('e6i5', 'adunare', 'Calculează (−3) + 5.', ['2'], 'De la −3 urci 5: ajungi la 2.', { level: 1, numeric: { value: 2, tolerance: 0 }, steps: ['−3 + 5 = 2'] }),
    ex('e6i6', 'modul', 'Cât este modulul lui −7?', ['7'], 'Modulul e distanța până la 0.', { level: 2, numeric: { value: 7, tolerance: 0 }, steps: ['|−7| = 7'] }),
    ex('e6i7', 'ecuatie', 'Calculează (−2) × 4.', ['-8', '−8'], 'Minus ori plus = minus. 8.', { level: 3, numeric: { value: -8, tolerance: 0 }, steps: ['2 × 4 = 8', 'Semn: minus'] })
  ],
  'matematica:6:triunghi': [
    ex('e6t5', 'suma180', 'Câte grade au împreună unghiurile unui triunghi?', ['180', '180°'], 'Mereu 180°.', { level: 1, numeric: { value: 180, tolerance: 0 }, steps: ['Suma = 180°'] }),
    ex('e6t6', 'pitagora', 'Catete 3 cm și 4 cm. Ipotenuza?', ['5'], '9+16=25=5².', { level: 2, numeric: { value: 5, tolerance: 0 }, steps: ['3² + 4² = 9 + 16', '25 = 5²'] }),
    ex('e6t7', 'opuse', 'Un unghi drept are… grade? Doar numărul.', ['90'], 'Drept = 90°.', { level: 3, numeric: { value: 90, tolerance: 0 }, steps: ['Unghi drept = 90°'] })
  ],
  'matematica:7:reale': [
    ex('e7r5', 'radical', 'Calculează √49.', ['7'], '7 × 7 = 49, deci radicalul e 7.', { level: 1, numeric: { value: 7, tolerance: 0 }, steps: ['7 × 7 = 49', '√49 = 7'] }),
    ex('e7r6', 'ordin', 'Calculează √16 + 1.', ['5'], '√16 este 4, apoi 4 + 1 = 5.', { level: 2, numeric: { value: 5, tolerance: 0 }, steps: ['√16 = 4', '4 + 1 = 5'] }),
    ex('e7r7', 'medii', 'Calculează 2 × √9.', ['6'], '√9=3, 2×3=6.', { level: 3, numeric: { value: 6, tolerance: 0 }, steps: ['√9 = 3', '2 × 3 = 6'] })
  ],
  'matematica:7:ecuati': [
    ex('e7e5', 'cantar', 'Află x: x + 5 = 12.', ['7'], 'x = 12 − 5 = 7.', { level: 1, numeric: { value: 7, tolerance: 0 }, steps: ['Treci 5 în dreapta', '12 − 5 = 7'] }),
    ex('e7e6', 'sistem', 'Află x: 2x = 10.', ['5'], 'x = 10 : 2 = 5.', { level: 2, numeric: { value: 5, tolerance: 0 }, steps: ['Împarți la 2', 'x = 5'] }),
    ex('e7e7', 'substituie', 'Află x: x − 3 = 4.', ['7'], 'x = 4 + 3 = 7.', { level: 3, numeric: { value: 7, tolerance: 0 }, steps: ['Treci −3 în dreapta', '4 + 3 = 7'] })
  ],
  'matematica:7:date': [
    ex('e7d5', 'origine', 'La punctul A(2, 3), care e abscisa (x)?', ['2'], 'Prima coordonată e x.', { level: 1, numeric: { value: 2, tolerance: 0 }, steps: ['A(x, y) = A(2, 3)', 'x = 2'] }),
    ex('e7d6', 'pereche', 'Scrie originea ca (x, y).', ['(0, 0)', '(0,0)', '0,0'], 'Originea e (0, 0).', { level: 2, steps: ['Axa x taie axa y în 0', '(0, 0)'] }),
    ex('e7d7', 'depend', 'y = x + 1. Dacă x = 2, cât e y?', ['3'], 'Înlocuiești: 2 + 1 = 3.', { level: 3, numeric: { value: 3, tolerance: 0 }, steps: ['Înlocuiești x', '2 + 1 = 3'] })
  ],
  'matematica:7:geo7': [
    ex('e7g5', 'paralelogram', 'Pătrat de latură 5 cm. Aria, cm²?', ['25'], 'Aria pătratului: 5 × 5 = 25.', { level: 1, numeric: { value: 25, tolerance: 0 }, steps: ['Aria pătratului = latură²', '25'] }),
    ex('e7g6', 'trig', 'Dreptunghi 3 cm × 4 cm. Aria?', ['12'], 'Aria dreptunghiului: 3 × 4 = 12.', { level: 2, numeric: { value: 12, tolerance: 0 }, steps: ['Aria = lungime × lățime', '12'] }),
    ex('e7g7', 'asemanare', 'Într-un paralelogram, un unghi e 70°. Cât e unghiul opus?', ['70', '70°'], 'Unghiurile opuse sunt egale.', { level: 3, numeric: { value: 70, tolerance: 0 }, steps: ['Opusele sunt egale', '70°'] })
  ],
  'matematica:8:intervale': [
    ex('e8i5', 'interval', 'Este 3 în intervalul [1, 5]? da sau nu.', ['da'], '1 ≤ 3 ≤ 5, capetele sunt incluse.', { level: 1, tokens: ['da'], steps: ['[ ] include capetele', '3 e între 1 și 5', 'Da'] }),
    ex('e8i6', 'inecuatie', 'Pentru x > 2, este 2 o soluție? da sau nu.', ['nu'], 'Deschis: 2 nu intră.', { level: 2, tokens: ['nu'], steps: ['x > 2 e deschis la 2', '2 nu e soluție'] }),
    ex('e8i7', 'semn', 'Câte întregi sunt în [1, 3]?', ['3'], '1, 2 și 3.', { level: 3, numeric: { value: 3, tolerance: 0 }, steps: ['Capetele intră', '1, 2, 3'] })
  ],
  'matematica:8:algebric': [
    ex('e8a5', 'patrat', 'Calculează 5² − 4².', ['9'], '25 − 16 = 9.', { level: 1, numeric: { value: 9, tolerance: 0 }, steps: ['25 − 16 = 9'] }),
    ex('e8a6', 'diferenta', 'Calculează (x+1)(x−1) pentru x = 3.', ['8'], '4 × 2 = 8, sau 9−1=8.', { level: 2, numeric: { value: 8, tolerance: 0 }, steps: ['x+1=4, x−1=2', '4 × 2 = 8'] }),
    ex('e8a7', 'factor', 'Calculează (−2)². Doar rezultatul.', ['4'], 'Minus ori minus = plus, deci 4.', { level: 3, numeric: { value: 4, tolerance: 0 }, steps: ['(−2)×(−2)=4'] })
  ],
  'matematica:8:functii': [
    ex('e8f5', 'dreapta', 'f(x)=x+1. Cât e f(4)?', ['5'], 'Înlocuiești x: 4 + 1 = 5.', { level: 1, numeric: { value: 5, tolerance: 0 }, steps: ['Înlocuiești x=4', '5'] }),
    ex('e8f6', 'medie', 'Media numerelor 2, 4, 6.', ['4'], '(2+4+6):3=4.', { level: 2, numeric: { value: 4, tolerance: 0 }, steps: ['Suma 12', '12 : 3 = 4'] }),
    ex('e8f7', 'amplitudine', 'Amplitudinea setului 3, 5, 9.', ['6'], 'Amplitudine = maxim minus minim: 9 − 3 = 6.', { level: 3, numeric: { value: 6, tolerance: 0 }, steps: ['max − min', '9 − 3 = 6'] })
  ],
  'matematica:8:spatiu': [
    ex('e8s5', 'prisma', 'Cub de latură 2. Volumul?', ['8'], 'Volumul cubului: 2 × 2 × 2 = 8.', { level: 1, numeric: { value: 8, tolerance: 0 }, steps: ['2 × 2 × 2 = 8'] }),
    ex('e8s6', 'piramida', 'Cub de latură 3. Aria unei fețe?', ['9'], 'Fața e pătrat: 3 × 3 = 9.', { level: 2, numeric: { value: 9, tolerance: 0 }, steps: ['Fața e pătrat', '9'] }),
    ex('e8s7', 'desfasurare', 'Cub de latură 2. Aria totală?', ['24'], '6 fețe × 4 = 24.', { level: 3, numeric: { value: 24, tolerance: 0 }, steps: ['O față = 4', '6 × 4 = 24'] })
  ],
  'romana:5:oral': [
    ex('e5o5', 'mesaj', 'Un anunț bun spune întâi… (ce / când / cine — un cuvânt).', ['ce', 'cand', 'când', 'cine'], 'Ideea, nu fiecare vorbă.', { level: 1, steps: ['Prinzi ideea principală', 'Ce / când / cine'] }),
    ex('e5o6', 'intrebare', 'O întrebare se termină cu ce semn? Scrie semnul.', ['?', 'semnul intrebarii'], 'Semnul întrebării.', { level: 2, steps: ['Afirmația are punct', 'Întrebarea are ?'] }),
    ex('e5o7', 'povesti', 'Prima parte a unei povestiri se numește… (un cuvânt).', ['inceput', 'început'], 'Început, apoi mijloc, apoi sfârșit.', { level: 3, steps: ['Firul are trei părți', 'Prima e începutul'] })
  ],
  'romana:5:lectura': [
    ex('e5l5', 'personaj', 'În „Mara citește”, cine e personajul? Scrie numele.', ['mara'], 'Cine face acțiunea: Mara.', { level: 1, steps: ['Cine? Mara', 'Ce face? citește'] }),
    ex('e5l6', 'comparatie', '„ca un fulg” e, de regulă, ce figură? Un cuvânt.', ['comparatie', 'comparație'], '„ca” leagă două lucruri.', { level: 2, steps: ['Cauți „ca” / „precum”', 'Comparație'] }),
    ex('e5l7', 'idee', 'Ideea principală e despre… (cine face ce). Un cuvânt-cheie: faptă / detaliu?', ['fapta', 'faptă', 'fapte'], 'Fapta, nu ornamentul.', { level: 3, steps: ['Tai detaliile de cadru', 'Rămâne fapta'] })
  ],
  'romana:5:redactare': [
    ex('e5r5', 'pasi', 'Înainte de text, faci un… (un cuvânt: plan).', ['plan'], 'Fără plan, începutul se pierde.', { level: 1, steps: ['Aduni idei', 'Le pui în plan'] }),
    ex('e5r6', 'structura', 'Ultima parte a textului se numește…', ['sfarsit', 'sfârșit', 'incheiere', 'încheiere'], 'Sfârșitul închide.', { level: 2, steps: ['Început, cuprins, sfârșit', 'Ultima e sfârșitul'] }),
    ex('e5r7', 'notite', 'O notiță păstrează… (ce trebuie să faci / tot textul)? Un cuvânt: esențialul / tot?', ['esentialul', 'esențialul', 'esential'], 'Prinzi ce trebuie, nu copiezi tot.', { level: 3, steps: ['Tai umplutura', 'Rămâne esențialul'] })
  ],
  'romana:5:limba5': [
    ex('e5lg5', 'predicat', '„Copilul aleargă.” Care e predicatul?', ['alearga', 'aleargă'], 'Ce face? Aleargă.', { level: 1, steps: ['Cine? copilul', 'Ce face? aleargă'] }),
    ex('e5lg6', 'subiect', 'În aceeași propoziție, care e subiectul?', ['copilul'], 'Cine aleargă? Copilul.', { level: 2, steps: ['Întrebarea „cine?”', 'Copilul'] }),
    ex('e5lg7', 'atribut', '„Casa mare e albă.” Care e atributul?', ['mare'], 'Spune ceva despre casă.', { level: 3, steps: ['Despre ce? casa', 'Cum e? mare'] })
  ],
  'romana:5:inter5': [
    ex('e5c5', 'legenda', 'O legendă e o… (știre / poveste)?', ['poveste'], 'E un fir, nu o știre de azi.', { level: 1, steps: ['Nu e jurnal', 'E poveste despre loc sau erou'] }),
    ex('e5c6', 'identitate', 'Un lucru din identitatea ta (un cuvânt: familie / limbă / loc).', ['familie', 'limba', 'loc', 'scoala', 'școală', 'nume'], 'Cine ești, fără laudă.', { level: 2, steps: ['Alegi o ancoră concretă'] }),
    ex('e5c7', 'noi', 'Cercul apropiat e… (casă / țară)? Un cuvânt.', ['casa', 'casă', 'scoala', 'familie'], 'Cercul e mic ca să-l descrii.', { level: 3, steps: ['Aproape: casă, școală, familie'] })
  ],
  'romana:6:oral6': [
    ex('e6o5', 'rezumat-oral', 'Un rezumat păstrează… (ideile / toate detaliile)? Un cuvânt: ideile.', ['ideile', 'idei'], 'Firul, nu broderia.', { level: 1, steps: ['Tai umplutura', 'Păstrezi ideile'] }),
    ex('e6o6', 'parere', 'După o părere pui… (pentru că / și gata)? Două cuvinte.', ['pentru ca', 'pentru că'], 'Motivul ține părerea.', { level: 2, steps: ['Părere + pentru că + motiv'] }),
    ex('e6o7', 'ordine', 'A doua parte a rezumatului e… (mijloc / sfârșit)?', ['mijloc'], 'Început, mijloc, sfârșit.', { level: 3, steps: ['Ordinea timpului poveștii'] })
  ],
  'romana:6:lectura6': [
    ex('e6l5', 'pers1', '„Am plecat.” E persoana I sau III? Scrie I sau III.', ['i', '1'], '„Am” = eu = persoana I.', { level: 1, steps: ['Verbul e la „eu”', 'Persoana I'] }),
    ex('e6l6', 'stire', 'Prima întrebare a unei știri e de obicei… (cine / de ce)?', ['cine'], 'Cine, ce, unde, când.', { level: 2, steps: ['Cine a făcut', 'Apoi ce, unde, când'] }),
    ex('e6l7', 'deduc', 'Dacă ușa e deschisă și nimeni nu răspunde, poți deduce prudent că… (e gol / e spargere)? Un cuvânt: gol / nimeni.', ['gol', 'nimeni', 'plecat'], 'Indicii, nu film.', { level: 3, steps: ['Deducție mică', 'Nu inventezi o crimă'] })
  ],
  'romana:6:redactare6': [
    ex('e6r5', 'destinatar', 'Tonul formal e pentru… (director / bunică)? Un cuvânt.', ['director', 'directorului'], 'Destinatarul alege tonul.', { level: 1, steps: ['Cui îi scrii?', 'Director = formal'] }),
    ex('e6r6', 'jurnal', 'Jurnalul se scrie la persoana… (I / III)?', ['i', '1', 'intai'], 'E la persoana I: eu, am făcut, am simțit.', { level: 2, steps: ['E pentru tine', 'Persoana I'] }),
    ex('e6r7', 'intamplare', 'Prima clipă a întâmplării e… (început / capăt)?', ['inceput', 'început'], 'Apoi tensiunea, apoi capătul.', { level: 3, steps: ['Început → mijloc → capăt'] })
  ],
  'romana:6:limba6': [
    ex('e6g5', 'cd', '„Vad filmul.” Care e complementul direct?', ['filmul', 'film'], 'Ce văd? Filmul.', { level: 1, steps: ['Predicat: văd', 'Ce? filmul'] }),
    ex('e6g6', 'nume-pred', '„Ea este medic.” Numele predicativ?', ['medic'], 'Este + medic.', { level: 2, steps: ['Verb de legătură: este', 'Nume predicativ: medic'] }),
    ex('e6g7', 'circ', '„Vin mâine.” Circumstanțialul e de… (timp / loc)?', ['timp'], 'Când? Mâine.', { level: 3, steps: ['Întrebarea „când?”', 'Timp'] })
  ],
  'romana:6:inter6': [
    ex('e6c5', 'popular', 'Un proverb e o idee… (scurtă / lungă)?', ['scurta', 'scurtă'], 'Scurtă, verificată de mulți.', { level: 1, steps: ['Nu e basm', 'E o idee scurtă'] }),
    ex('e6c6', 'valori', 'O valoare din basm, văzută în fapte (un cuvânt: curaj).', ['curaj', 'cinste', 'harnicie', 'hărnicie', 'prietenie'], 'Ce face eroul.', { level: 2, steps: ['Te uiți la faptă', 'Numești valoarea'] }),
    ex('e6c7', 'respect', 'Despre alt popor, descrii, nu… (un verb: ironizezi).', ['ironizezi', 'jignesti', 'jignești'], 'Curiozitate, nu rang.', { level: 3, steps: ['Descrii', 'Nu ironizezi'] })
  ],
  'romana:7:oral7': [
    ex('e7o5', 'sinteza', 'O prezentare scurtă are nevoie de o… (idee / listă)?', ['idee'], 'O idee, un exemplu, o închidere.', { level: 1, steps: ['Nu zece fire', 'O idee'] }),
    ex('e7o6', 'timp', 'Dacă treci de timp, tai din… (mijloc / salut)?', ['mijloc'], 'Păstrezi capetele.', { level: 2, steps: ['Salut și capăt rămân', 'Tai din mijloc'] }),
    ex('e7o7', 'voce', 'Un lucru al vocii (volum / claritate / pauze). Un cuvânt.', ['volum', 'claritate', 'pauze', 'pauza'], 'Se aude, fără urlet.', { level: 3, steps: ['Alegi una: volum, claritate, pauze'] })
  ],
  'romana:7:lectura7': [
    ex('e7l5', 'epic', 'Text cu acțiune și personaje: epic / liric?', ['epic'], 'Se povestește ceva.', { level: 1, steps: ['Are plot', 'Epic'] }),
    ex('e7l6', 'liric', 'Text despre o stare, nu un plot: …', ['liric'], 'Cine vorbește și ce simte.', { level: 2, steps: ['Nu „ce s-a întâmplat apoi”', 'Liric'] }),
    ex('e7l7', 'dovada', 'O caracterizare ține dacă ai o… (dovadă / bănuială)?', ['dovada', 'dovadă'], 'Arăți locul din text.', { level: 3, steps: ['Eticheta fără citat cade', 'Dovadă'] })
  ],
  'romana:7:redactare7': [
    ex('e7rd5', 'caracterizare', 'Caracterizezi prin… (fapte / „e bun”)? Un cuvânt: fapte.', ['fapte', 'vorbe', 'fapta'], 'Arată, nu eticheta.', { level: 1, steps: ['Fapte sau vorbe', 'Nu „bun/frumos”'] }),
    ex('e7rd6', 'cerere', 'O cerere are un… (destinatar / slogan)?', ['destinatar'], 'Cui i te adresezi.', { level: 2, steps: ['Destinatar, solicitare, date'] }),
    ex('e7rd7', 'scop', 'Înainte să scrii, întrebi: cu ce… ? (scop)', ['scop'], 'Scopul alege forma.', { level: 3, steps: ['Scop + destinatar'] })
  ],
  'romana:7:limba7': [
    ex('e7lg5', 'fraza', '„Ana citește.” Câte propoziții? Un număr.', ['1', 'una'], 'Un predicat = o propoziție.', { level: 1, numeric: { value: 1, tolerance: 0 }, steps: ['Un predicat: citește', 'O propoziție'] }),
    ex('e7lg6', 'cauza', '„pentru că” introduce de obicei o… (cauză / loc)?', ['cauza', 'cauză'], 'Răspunde la „de ce?”.', { level: 2, steps: ['De ce?', 'Cauză'] }),
    ex('e7lg7', 'pleonasm', '„Urcă sus” e greșit pentru că e… (un cuvânt: pleonasm).', ['pleonasm'], 'Spui de două ori același lucru.', { level: 3, steps: ['A urca = în sus', 'Surplus = pleonasm'] })
  ],
  'romana:7:inter7': [
    ex('e7c5', 'mit', 'Un mit e despre origini / eroi, nu despre… (știre / zeu)? Un cuvânt: știre.', ['stire', 'știre'], 'Nu e jurnal de azi.', { level: 1, steps: ['Mit ≠ știre', 'E fir de origini'] }),
    ex('e7c6', 'intalnire', 'Limba se schimbă când oamenii se… (un verb).', ['intalnesc', 'întâlnesc', 'imprumuta', 'împrumută'], 'Cuvintele călătoresc.', { level: 2, steps: ['Oamenii se întâlnesc', 'Iau cuvinte'] }),
    ex('e7c7', 'respect7', 'Față de mitul altora, întâi… (asculți / ironizezi)?', ['asculti', 'asculți'], 'Curiozitate.', { level: 3, steps: ['Întâi asculți'] })
  ],
  'romana:8:oral8': [
    ex('e8o5', 'argument', 'Scheletul unei păreri: părere + … (pentru că).', ['pentru ca', 'pentru că'], 'Apoi motivul.', { level: 1, steps: ['Părere', 'pentru că', 'motiv'] }),
    ex('e8o6', 'info-intentie', 'O știre vrea să… (anunțe / convingă)?', ['anunte', 'anunțe', 'anunta', 'informeze'], 'Informație, nu campanie.', { level: 2, steps: ['Știrea anunță', 'Discursul convinge'] }),
    ex('e8o7', 'ascult8', 'În dezbatere, înainte să adaugi, … ideea celuilalt (un verb: rezumi).', ['rezumi', 'reiei', 'reformulezi'], 'Arăți că ai auzit.', { level: 3, steps: ['Reiei / rezumi', 'Apoi adaugi'] })
  ],
  'romana:8:lectura8': [
    ex('e8l5', 'tema', 'Tema e despre ce e textul, în… (mare / detaliu)?', ['mare'], 'Nu un citat izolat.', { level: 1, steps: ['Despre ce e, în mare'] }),
    ex('e8l6', 'esential', 'Dacă tai un ornament, rămâne… (tema / nimic)?', ['tema', 'temă'], 'Ornamentul e culoare.', { level: 2, steps: ['Scheletul e tema'] }),
    ex('e8l7', 'necunoscut', 'La text nou, întâi… (citești / sari la grilă)?', ['citesti', 'citești'], 'Textul din față.', { level: 3, steps: ['Întâi citești firul'] })
  ],
  'romana:8:redactare8': [
    ex('e8r5', 'arg', 'După motive, în argumentare pui… (exemple / titluri)?', ['exemple', 'exemplu'], 'Se vede scheletul.', { level: 1, steps: ['Părere, motive, exemple'] }),
    ex('e8r6', 'paragraf', 'Un paragraf = câte idei de bază? Un număr.', ['1', 'una'], 'Un bloc, o treabă.', { level: 2, numeric: { value: 1, tolerance: 0 }, steps: ['O idee pe paragraf'] }),
    ex('e8r7', 'incheiere', 'Încheierea aduce un subiect nou? da sau nu.', ['nu'], 'Ușa se închide.', { level: 3, tokens: ['nu'], steps: ['Nu deschizi alt fir', 'Nu'] })
  ],
  'romana:8:limba8': [
    ex('e8g5', 'acord', '„Elevii …” (merge / merg)? Alege forma.', ['merg'], 'Plural → merg.', { level: 1, steps: ['Subiect plural', 'merg'] }),
    ex('e8g6', 'acord2', 'Două subiecte cer predicatul la… (singular / plural)?', ['plural'], 'Fata și băiatul aleargă.', { level: 2, steps: ['A + B = plural'] }),
    ex('e8g7', 'vocab8', '„Greșeală …” (gravă / grea)? Un cuvânt.', ['grava', 'gravă'], 'Colocăm: greșeală gravă.', { level: 3, steps: ['grav = serios', 'nu greu ca o geantă'] })
  ],
  'romana:8:inter8': [
    ex('e8c5', 'punte', 'Citești un text al lumii cu… (idee / rang)? Un cuvânt: idee.', ['idee', 'dovada', 'ton'], 'Aceleași unelte.', { level: 1, steps: ['Idee, dovadă, ton'] }),
    ex('e8c6', 'noi-ceilalti', 'Primul verb: descrii sau cobori?', ['descrii', 'descrie'], 'Curiozitate, nu rang.', { level: 2, steps: ['Descrii întâi'] }),
    ex('e8c7', 'reflectie', 'O reflecție întreabă ce rămâne… (după / înainte)?', ['dupa', 'după'], 'Nu doar relatare.', { level: 3, steps: ['Ce rămâne după'] })
  ]
};

module.exports = { EXTRAS };

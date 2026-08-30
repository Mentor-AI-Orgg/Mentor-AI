// Exerciții de rezolvat (teste), nu grilă. Cuvintele noastre, programa 5–8.
// Răspunsurile rămân pe server; clientul primește doar enunțul.

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
    long: Boolean(extra.long),
    minWords: Number(extra.minWords) || 0
  };
}

const BANK = {
  'matematica:5:naturale': [
    ex('e5n1', 'puteri', 'Calculează 2⁵. Scrie doar rezultatul.', ['32'], '2⁵ = 2×2×2×2×2 = 32.', { hint: 'Înmulțești 2 cu el însuși de 5 ori.', numeric: { value: 32, tolerance: 0 } }),
    ex('e5n2', 'paranteze', 'Calculează (18 − 6) : 3 + 4.', ['8'], 'Întâi paranteza: 12. 12 : 3 = 4. 4 + 4 = 8.', { hint: 'Paranteza se face prima.', numeric: { value: 8, tolerance: 0 } }),
    ex('e5n3', 'div3', 'Se împarte 147 exact la 3? Răspunde cu da sau nu.', ['da', 'da se imparte', 'se imparte'], '1+4+7 = 12, iar 12 se împarte la 3, deci da.', { hint: 'Adună cifrele.' }),
    ex('e5n4', 'prime', 'Scrie un număr prim aflat între 20 și 30.', ['23', '29'], 'Între 20 și 30, prime sunt 23 și 29. 21, 25, 27, 28 nu sunt.', { hint: 'Nu e par (în afară de 2) și nu se taie la 3 sau 5.' })
  ],
  'matematica:5:fractii': [
    ex('e5f1', 'numitor', 'Calculează 1/2 + 1/4. Scrie rezultatul ca fracție (ex. 3/4).', ['3/4', '0.75', '0,75'], 'Numitor comun 4: 2/4 + 1/4 = 3/4.', { hint: 'Adu-le la același numitor.' }),
    ex('e5f2', 'amplif', 'Amplifică 2/5 cu 3. Ce fracție obții?', ['6/15'], '2×3 = 6, 5×3 = 15. Valoarea e aceeași.', { hint: 'Înmulțești sus și jos cu 3.' }),
    ex('e5f3', 'procent', '25% din 40 de lei. Câți lei?', ['10', '10 lei'], '25% = 1/4. 40 : 4 = 10.', { hint: 'Un sfert din 40.', numeric: { value: 10, tolerance: 0 } }),
    ex('e5f4', 'media', 'Media aritmetică a notelor 7 și 9.', ['8'], '(7+9):2 = 8.', { numeric: { value: 8, tolerance: 0 } })
  ],
  'matematica:5:geometrie': [
    ex('e5g1', 'unghi', 'Câte grade are un unghi drept?', ['90', '90 de grade', '90°'], 'Colțul pătratului: 90°.', { numeric: { value: 90, tolerance: 0 } }),
    ex('e5g2', 'perimetru', 'Un dreptunghi are lungimea 8 cm și lățimea 3 cm. Care e perimetrul, în cm?', ['22', '22 cm'], '2×(8+3) = 22 cm. Perimetrul e „gardul”.', { hint: 'Aduni toate laturile.', numeric: { value: 22, tolerance: 0 } }),
    ex('e5g3', 'arie-drep', 'Aria aceluiași dreptunghi 8 cm × 3 cm, în cm².', ['24', '24 cm2', '24 cm²'], '8 × 3 = 24 cm².', { numeric: { value: 24, tolerance: 0 } }),
    ex('e5g4', 'unitati', 'Câți centimetri sunt într-un metru și jumătate?', ['150', '150 cm'], '1 m = 100 cm, deci 1,5 m = 150 cm.', { numeric: { value: 150, tolerance: 0 } })
  ],
  'matematica:6:multimi': [
    ex('e6m1', 'reuniune', 'A = {1, 2, 3}, B = {3, 4}. Scrie reuniunea A ∪ B, elementele despărțite prin virgulă.', ['1, 2, 3, 4', '1,2,3,4', '{1, 2, 3, 4}', '{1,2,3,4}'], 'Strângi tot, fără să repeți 3.'),
    ex('e6m2', 'intersectie', 'Cu aceleași mulțimi, scrie intersecția A ∩ B.', ['3', '{3}'], 'Doar ce e comun: 3.'),
    ex('e6m3', 'cmmdc', 'c.m.m.d.c. dintre 12 și 18.', ['6'], '12 = 2×2×3, 18 = 2×3×3. Comun: 2×3 = 6.', { hint: 'Cel mai mare care îi împarte pe amândoi.', numeric: { value: 6, tolerance: 0 } }),
    ex('e6m4', 'cmmmc', 'c.m.m.m.c. dintre 4 și 6.', ['12'], 'Multiplii lui 4: 4, 8, 12… ai 6: 6, 12… primul comun e 12.', { numeric: { value: 12, tolerance: 0 } })
  ],
  'matematica:6:proportii': [
    ex('e6p1', 'regula3', '3 caiete costă 18 lei. Cât costă 5 caiete, același preț?', ['30', '30 lei'], 'Un caiet: 6 lei. 5 × 6 = 30.', { hint: 'Află întâi prețul unuia.', numeric: { value: 30, tolerance: 0 } }),
    ex('e6p2', 'invers', '4 lucrători termină o treabă în 6 ore. Câte ore le-ar lua la 2 lucrători, același ritm?', ['12', '12 ore'], 'Mai puțini oameni, mai mult timp: 4×6 = 24 = 2×12.', { hint: 'Invers proporționale: produsul rămâne.', numeric: { value: 12, tolerance: 0 } }),
    ex('e6p3', 'procent6', 'Un raport 3:4 scris ca procent din întreg 3+4. Cât la sută e prima parte?', ['42.86', '42,86', '43', '42.8', '3/7'], '3 din 7 ≈ 42,9%. Acceptăm 43 sau 3/7.', { hint: 'Întregul e 3+4.' }),
    ex('e6p4', 'scara', 'Pe o hartă 1:100, 3 cm pe hartă câți cm sunt în realitate?', ['300', '300 cm'], '1 cm → 100 cm, deci 3 → 300 cm.', { numeric: { value: 300, tolerance: 0 } })
  ],
  'matematica:6:intregi-rationale': [
    ex('e6i1', 'adunare', 'Calculează 5 + (−8).', ['-3', '−3'], 'Cinci pași dreapta, opt stânga: rămâi la −3.', { numeric: { value: -3, tolerance: 0 } }),
    ex('e6i2', 'modul', 'Cât este modulul lui −12?', ['12'], 'Modulul e distanța până la zero.', { numeric: { value: 12, tolerance: 0 } }),
    ex('e6i3', 'ecuatie', 'Află x din x + 7 = 3.', ['-4', '−4'], 'Scazi 7 din ambele părți: x = −4. Verificare: −4+7=3.', { numeric: { value: -4, tolerance: 0 } }),
    ex('e6i4', 'rationale', 'Scrie −0,5 ca fracție de întregi.', ['-1/2', '−1/2', '-1 / 2'], '0,5 = 1/2, deci cu minus: −1/2.')
  ],
  'matematica:6:triunghi': [
    ex('e6t1', 'suma180', 'Într-un triunghi, două unghiuri au 40° și 70°. Cât are al treilea?', ['70', '70°', '70 de grade'], '180 − 40 − 70 = 70°.', { numeric: { value: 70, tolerance: 0 } }),
    ex('e6t2', 'pitagora', 'Un triunghi dreptunghic are catetele 3 și 4. Cât e ipotenuza?', ['5'], '3²+4²=9+16=25=5².', { hint: 'a² + b² = c²', numeric: { value: 5, tolerance: 0 } }),
    ex('e6t3', 'cerc', 'Raza e 6 cm. Cât e diametrul, în cm?', ['12', '12 cm'], 'Diametrul = 2 × raza.', { numeric: { value: 12, tolerance: 0 } }),
    ex('e6t4', 'opuse', 'Două drepte se taie. Un unghi e 55°. Cât are unghiul opus la vârf?', ['55', '55°'], 'Opusele la vârf sunt egale.', { numeric: { value: 55, tolerance: 0 } })
  ],
  'matematica:7:reale': [
    ex('e7r1', 'radical', 'Calculează √81.', ['9'], '9 × 9 = 81.', { numeric: { value: 9, tolerance: 0 } }),
    ex('e7r2', 'ordin', 'Între ce doi întregi consecutivi stă √20? Scrie de forma 4 si 5.', ['4 si 5', '4 și 5', '4, 5', 'intre 4 si 5'], '16 < 20 < 25, deci 4 < √20 < 5.', { hint: '4²=16, 5²=25.' }),
    ex('e7r3', 'rationaliz', 'Raționalizează 1/√4 (simplu). Ce număr obții?', ['1/2', '0.5', '0,5'], '√4 = 2, deci 1/2.', { hint: '√4 e un întreg.' }),
    ex('e7r4', 'medii', 'Media aritmetică a numerelor 4, 6 și 8.', ['6'], '(4+6+8):3 = 6.', { numeric: { value: 6, tolerance: 0 } })
  ],
  'matematica:7:ecuati': [
    ex('e7e1', 'cantar', 'Rezolvă 2x − 5 = 9.', ['7'], '2x = 14, x = 7. Verificare: 14−5=9.', { numeric: { value: 7, tolerance: 0 } }),
    ex('e7e2', 'sistem', 'x + y = 10 și x − y = 2. Află x.', ['6'], 'Aduni: 2x = 12, x = 6. Atunci y = 4.', { hint: 'Adună cele două ecuații.', numeric: { value: 6, tolerance: 0 } }),
    ex('e7e3', 'substituie', 'Din x = 2y și x + y = 9, cât e y?', ['3'], '2y + y = 9, 3y = 9, y = 3.', { numeric: { value: 3, tolerance: 0 } }),
    ex('e7e4', 'solutie', 'Verifică dacă (2, 3) e soluție pentru x + y = 5 și x − y = −1. Răspunde da sau nu.', ['da'], '2+3=5 și 2−3=−1. Potrivește în ambele.')
  ],
  'matematica:7:date': [
    ex('e7d1', 'origine', 'Care sunt coordonatele originii? Scrie de forma (0, 0).', ['(0, 0)', '(0,0)', '0, 0', '0,0'], 'Acolo se întâlnesc axele.'),
    ex('e7d2', 'pereche', 'Punctul A(3, −2): cât e coordonata y?', ['-2', '−2'], 'Prima e x (3), a doua e y (−2).', { numeric: { value: -2, tolerance: 0 } }),
    ex('e7d3', 'citire', 'Pe un grafic, când x = 2, y = 5. Scrie perechea.', ['(2, 5)', '(2,5)', '2, 5'], 'O linie din tabel = un punct.'),
    ex('e7d4', 'depend', 'Dacă y = 2x, cât e y când x = 4?', ['8'], '2 × 4 = 8.', { numeric: { value: 8, tolerance: 0 } })
  ],
  'matematica:7:geo7': [
    ex('e7g1', 'paralelogram', 'Un paralelogram are o latură 7 cm și una alăturată 5 cm. Perimetrul?', ['24', '24 cm'], '2×(7+5) = 24.', { numeric: { value: 24, tolerance: 0 } }),
    ex('e7g2', 'trig', 'Într-un triunghi dreptunghic, cateta opusă e 3, ipotenuza 5. Cât e sin unghiului? Fracție.', ['3/5', '0.6', '0,6'], 'sin = opusă / ipotenuză.'),
    ex('e7g3', 'asemanare', 'Două triunghiuri asemenea, raport de asemănare 2. O latură e 6 cm la cel mic. Cât e corespondenta la cel mare?', ['12', '12 cm'], 'Aceeași formă, scară 2: 6×2=12.', { numeric: { value: 12, tolerance: 0 } }),
    ex('e7g4', 'thales', 'Pe o dreaptă, paralele taie segmente 2 cm și 3 cm pe o secantă. Pe cealaltă, primul e 4 cm. Cât e al doilea, dacă e Thales?', ['6', '6 cm'], '2/3 = 4/x → x = 6.', { numeric: { value: 6, tolerance: 0 } })
  ],
  'matematica:8:intervale': [
    ex('e8i1', 'inecuatie', 'Rezolvă x + 3 > 7. Scrie intervalul, de exemplu (4, +∞).', ['(4, +inf)', '(4,+inf)', '(4, +∞)', '(4,+∞)', 'x>4', 'x > 4'], 'x > 4. Capătul 4 nu e inclus.'),
    ex('e8i2', 'semn', 'Înmulțești inecuația −2x < 6 cu −1/2. Schimbi sensul? da sau nu.', ['da'], 'Înmulțire cu negativ: sensul se întoarce. x > −3.'),
    ex('e8i3', 'interval', 'Intervalul [2, 5) îl conține pe 5? da sau nu.', ['nu'], 'Paranteza rotundă la 5 înseamnă „fără 5”.'),
    ex('e8i4', 'intersect-int', 'Intersecția [0, 4] ∩ [3, 7]. Scrie intervalul.', ['[3, 4]', '[3,4]'], 'Porțiunea comună e de la 3 la 4, ambele capete închise.')
  ],
  'matematica:8:algebric': [
    ex('e8a1', 'patrat', 'Desfășoară (x + 3)².', ['x^2+6x+9', 'x² + 6x + 9', 'x^2 + 6x + 9'], 'a² + 2ab + b² = x² + 6x + 9.'),
    ex('e8a2', 'diferenta', 'Descompune x² − 16.', ['(x-4)(x+4)', '(x − 4)(x + 4)', '(x-4)(x+4)'], 'Diferență de pătrate: (x−4)(x+4).'),
    ex('e8a3', 'factor', 'Scoate factorul comun din 6x + 9.', ['3(2x+3)', '3(2x + 3)'], '3 e comun: 3(2x+3).'),
    ex('e8a4', 'asemenea', 'Adună 4x² + 3x².', ['7x^2', '7x²', '7 x^2'], 'Aceeași parte literară: 7x².')
  ],
  'matematica:8:functii': [
    ex('e8f1', 'dreapta', 'f(x) = 2x + 1. Cât e f(4)?', ['9'], '2×4 + 1 = 9.', { numeric: { value: 9, tolerance: 0 } }),
    ex('e8f2', 'medie', 'Media datelor 2, 5, 5, 8.', ['5'], '(2+5+5+8):4 = 5.', { numeric: { value: 5, tolerance: 0 } }),
    ex('e8f3', 'mediana', 'Mediana setului ordonat 1, 3, 4, 8, 10.', ['4'], 'Valoarea din mijloc, după ordonare.', { numeric: { value: 4, tolerance: 0 } }),
    ex('e8f4', 'amplitudine', 'Amplitudinea setului 2, 9, 4.', ['7'], '9 − 2 = 7 (max minus min).', { numeric: { value: 7, tolerance: 0 } })
  ],
  'matematica:8:spatiu': [
    ex('e8s1', 'prisma', 'O cutie 2 cm × 3 cm × 4 cm. Volumul, în cm³?', ['24', '24 cm3', '24 cm³'], '2×3×4 = 24.', { numeric: { value: 24, tolerance: 0 } }),
    ex('e8s2', 'piramida', 'Câte fețe laterale are o piramidă cu baza pătrat?', ['4'], 'Patru triunghiuri care urcă la vârf.', { numeric: { value: 4, tolerance: 0 } }),
    ex('e8s3', 'cilindru', 'Un cilindru are raza 2 și înălțimea 5. Aria unei baze (disc) e πr². Cât e r²?', ['4'], '2² = 4. Aria bazei e 4π.', { numeric: { value: 4, tolerance: 0 } }),
    ex('e8s4', 'desfasurare', 'Un cub de latură 3 cm. Aria totală (6 fețe), în cm²?', ['54', '54 cm2'], 'O față 9, șase fețe 54.', { numeric: { value: 54, tolerance: 0 } })
  ],
  'romana:5:oral': [
    ex('e5o1', 'mesaj', 'Asculți un anunț de 20 de secunde. În maximum 8 cuvinte, scrie despre ce e vorba (ideea, nu fiecare vorbă). Folosește cuvintele „despre” sau „ideea”.', ['despre', 'ideea'], 'Ancora e ideea principală, nu lista de cuvinte.', { long: true, tokens: ['despre'] }),
    ex('e5o2', 'intrebare', 'Transformă în întrebare clară: vrei să afli ora la care începe pauza. Scrie întrebarea.', ['cand', 'când', 'ora'], 'O întrebare scurtă: „Când începe pauza?” / „La ce oră…?”', { tokens: ['pauza'] }),
    ex('e5o3', 'povesti', 'În 3 scurte părți, numește scheletul unei povestiri orale (cuvinte: început, apoi, sfârșit — sau sinonime).', ['inceput', 'sfarsit'], 'Început → ce s-a întâmplat → sfârșit.', { long: true, tokens: ['sfarsit'] }),
    ex('e5o4', 'ton', 'Același cuvânt „da”, spus plictisit. Ce transmite tonul? Un cuvânt: plictiseală / dezinteres / enervare.', ['plictiseala', 'dezinteres', 'enervare', 'plictiseală'], 'Tonul schimbă mesajul la fel de mult ca vorba.')
  ],
  'romana:5:lectura': [
    ex('e5l1', 'personaj', 'În „Ionel a pierdut minge în parc”, cine e personajul? Scrie numele.', ['ionel'], 'Personajul e cine face / trăiește acțiunea.'),
    ex('e5l2', 'comparatie', '„E iute ca un iepure.” Ce figură de stil e? Un cuvânt.', ['comparatie', 'comparație'], '„ca” leagă două lucruri.'),
    ex('e5l3', 'personif', '„Vântul șoptește la fereastră.” Ce figură e?', ['personificare', 'personificarea'], 'Un ne-om primește o faptă omenească.'),
    ex('e5l4', 'idee', 'Text: „Ana a udat florile, apoi a citit. Seara era liniștită.” Într-o frază, ideea principală — trebuie să apară Ana și ce a făcut.', ['ana'], 'Detaliile (seara liniștită) sprijină, nu înlocuiesc fapta.', { long: true, tokens: ['ana'] })
  ],
  'romana:5:redactare': [
    ex('e5r1', 'pasi', 'Scrie, în ordine, cei 3 pași înainte să scrii un text (idei, plan, text).', ['idei', 'plan', 'text'], 'Fără plan, începutul se pierde.', { tokens: ['plan'] }),
    ex('e5r2', 'structura', 'Un text scurt are nevoie de trei părți. Numește-le.', ['inceput', 'cuprins', 'sfarsit'], 'Început, cuprins, sfârșit.', { tokens: ['inceput'] }),
    ex('e5r3', 'povestire', 'În 2 fraze, povestește o întâmplare inventată cu un ghiozdan. Trebuie un verb de acțiune.', ['ghiozdan'], 'Se vede o faptă, nu doar adjective.', { long: true, tokens: ['ghiozdan'], minWords: 8 }),
    ex('e5r4', 'notite', 'Rescrie ca notiță scurtă (max 8 cuvinte): „Mâine aducem atlasul și creioanele colorate.”', ['atlas'], 'Prinzi ce trebuie să faci, nu copiezi tot.', { tokens: ['atlas'] })
  ],
  'romana:5:limba5': [
    ex('e5lg1', 'predicat', '„Pisica doarme pe fotoliu.” Care e predicatul?', ['doarme'], 'Predicatul spune ce se întâmplă.'),
    ex('e5lg2', 'subiect', 'În aceeași propoziție, care e subiectul?', ['pisica'], 'Cine? Pisica.'),
    ex('e5lg3', 'atribut', '„Cartea nouă e pe masă.” Care e atributul?', ['noua', 'nouă'], 'Spune ceva despre „cartea”.'),
    ex('e5lg4', 'sinonime', 'Un sinonim pentru „frumos” (un cuvânt).', ['dragut', 'drăguț', 'placut', 'plăcut', 'minunat', 'fermecator', 'fermecător'], 'Aproape ca sens, nu identic obligatoriu.')
  ],
  'romana:5:inter5': [
    ex('e5c1', 'legenda', 'În 2 fraze, spune cu cuvintele tale ce e o legendă (loc sau erou + poveste).', ['poveste', 'legenda'], 'Nu e știre: e un fir despre un loc sau un erou.', { long: true, tokens: ['poveste'] }),
    ex('e5c2', 'identitate', 'Numește 2 lucruri din care ți-ai putea povesti identitatea (familie, loc, limbă…).', ['familie', 'limba', 'loc', 'scoala', 'școală', 'nume'], 'Cine ești, fără laudă.', { tokens: [] }),
    ex('e5c3', 'noi', 'Un subiect potrivit pentru „eu și lumea mea apropiată”: scrie un exemplu (casă / școală / prieteni).', ['casa', 'scoala', 'prieteni', 'familie', 'sat', 'oras'], 'Cercul e mic, ca să-l descrii bine.'),
    ex('e5c4', 'retell', 'Rezumă în o frază o legendă pe care o știi. Trebuie un nume de loc sau de erou.', ['legenda', 'erou', 'traian', 'miorita'], 'Dacă nu poți povesti, n-ai luat-o cu tine.', { long: true, minWords: 6 })
  ],
  'romana:6:oral6': [
    ex('e6o1', 'rezumat-oral', 'Rezumă în o frază: „A plouat. Trenul a întârziat. Ana a ajuns la 10.”', ['ana', 'tren'], 'Idei, ordine, fără umplutură.', { long: true, tokens: ['ana'] }),
    ex('e6o2', 'parere', 'O părere + un motiv: „Îmi place lectura în pauză pentru că…” — termină tu.', ['pentru ca', 'pentru că'], 'Nu doar „îmi place”: de ce?', { long: true, tokens: ['pentru'] }),
    ex('e6o3', 'dialog', 'Scrie o replică de dialog în care îl lași pe celălalt să vorbească (o întrebare).', ['?'], 'Întrebi, asculți, răspunzi.'),
    ex('e6o4', 'ordine', 'Pune în ordine, despărțite prin liniuță: sfârșit, început, mijloc — în ordinea corectă a rezumatului.', ['inceput-mijloc-sfarsit', 'început-mijloc-sfârșit', 'inceput - mijloc - sfarsit'], 'Păstrezi firul, nu broderia.')
  ],
  'romana:6:lectura6': [
    ex('e6l1', 'pers1', '„M-am așezat și am deschis jurnalul.” La ce persoană e narațiunea? Scrie I sau III.', ['i', '1', 'intai', 'întâi', 'persoana i'], '„eu” = persoana I.'),
    ex('e6l2', 'stire', 'O știre trebuie să răspundă la 4 întrebări. Numește-le (cine, ce, unde, când).', ['cine', 'ce', 'unde', 'cand'], 'Apoi vin detaliile.', { tokens: ['cine'] }),
    ex('e6l3', 'deduc', 'Text: „Ușa e deschisă, ghiozdanul e pe hol, dar nimeni nu răspunde.” Ce poți deduce? O frază.', ['plecat', 'afara', 'nu e', 'gol', 'lipseste'], 'Indicii, nu invenție liberă.', { long: true }),
    ex('e6l4', 'email', 'Cine, cui, de ce — completează pentru un e-mail către diriginte despre o absență.', ['diriginte', 'absenta', 'absență'], 'Destinatar + scop.', { long: true, tokens: ['dirig'] })
  ],
  'romana:6:redactare6': [
    ex('e6r1', 'destinatar', 'Scrii bunicii sau directorului. Pentru cine e tonul mai formal? Un cuvânt.', ['director', 'directorului'], 'Tonul urmează destinatarul.'),
    ex('e6r2', 'jurnal', 'Scrie 2 fraze de jurnal: ce ți s-a întâmplat azi + ce ai simțit. Folosește „am”.' , ['am'], 'E pentru tine, dar tot e în ordine.', { long: true, tokens: ['am'] }),
    ex('e6r3', 'emotie', 'Descrie bucuria fără să scrii cuvântul „bucurie”. Un gest sau un gând.', ['zambet', 'zâmbet', 'ochi', 'sarit'], 'Detaliul bate eticheta.', { long: true, minWords: 6 }),
    ex('e6r4', 'intamplare', 'Numește cele 3 momente ale unei întâmplări (început, tensiune / mijloc, capăt).', ['inceput', 'sfarsit', 'capat', 'mijloc', 'tensiune'], 'Nu un singur adjectiv.', { tokens: ['inceput'] })
  ],
  'romana:6:limba6': [
    ex('e6g1', 'cd', '„Citesc o carte.” Care e complementul direct?', ['o carte', 'carte'], 'Pe cine / ce? o carte.'),
    ex('e6g2', 'nume-pred', '„El este elev.” Care e numele predicativ?', ['elev'], 'Verb de legătură + nume predicativ.'),
    ex('e6g3', 'circ', '„Alergăm în parc.” Ce fel de circumstanțial e „în parc”? (loc / timp / mod)', ['loc'], 'Unde? = loc.'),
    ex('e6g4', 'diftong', 'În „stea”, e diftong sau hiat? Un cuvânt.', ['diftong'], 'Două vocale în aceeași silabă.')
  ],
  'romana:6:inter6': [
    ex('e6c1', 'popular', 'Scrie un proverb pe care îl știi, cu cuvintele tale sau clasic.', ['cine', 'nu', 'face', 'lucru'], 'O idee scurtă, verificată de mulți.', { long: true, minWords: 5 }),
    ex('e6c2', 'valori', 'Dintr-un basm, numește o valoare văzută în fapte (curaj, hărnicie…).', ['curaj', 'harnicie', 'hărnicie', 'cinste', 'prietenie', 'dreptate'], 'Nu slogan: ce face eroul.'),
    ex('e6c3', 'compar-leg', 'În o frază, ce cauți când compari două legende (comun vs al locului).', ['comun', 'aseman', 'deoseb'], 'Nu e concurs: e oglindă.', { long: true }),
    ex('e6c4', 'respect', 'Completează: când vorbești despre alt popor, descrii, nu… (un verb).', ['ironizezi', 'jignesti', 'jignești', 'bati joc', 'bați joc'], 'Curiozitate, nu rang.')
  ],
  'romana:7:oral7': [
    ex('e7o1', 'sinteza', 'Pentru o prezentare de 2 minute, scrie în 3 cuvinte planul: idee, exemplu, închidere.', ['idee', 'exemplu'], 'Sinteză ≠ copie de 10 pagini.', { tokens: ['idee'] }),
    ex('e7o2', 'timp', 'Dacă treci de timp, tai din mijloc, salut sau capăt? Un cuvânt.', ['mijloc'], 'Păstrezi deschiderea și închiderea.'),
    ex('e7o3', 'exemplu', 'Dă un exemplu concret (o frază) pentru ideea „pauza e zgomotoasă”.', ['pauza', 'zgomot', 'striga', 'alearga'], 'Un exemplu bun e scurt și se vede.', { long: true }),
    ex('e7o4', 'voce', 'Numește 2 lucruri care țin de controlul vocii (volum, claritate, pauze…).', ['volum', 'claritate', 'pauze', 'pauza'], 'Se aude în spate, fără urlet.', { tokens: [] })
  ],
  'romana:7:lectura7': [
    ex('e7l1', 'epic', 'Un text cu acțiune și personaje e, de regulă… (epic / liric / dramatic)', ['epic'], 'Se povestește ceva.'),
    ex('e7l2', 'liric', 'Un text care pune în față o stare, nu un plot, e…', ['liric'], 'Cine vorbește și ce simte.'),
    ex('e7l3', 'dovada', 'Ai zis „personajul e timid”. Scrie o frază de dovadă care începe cu „în text”.', ['in text', 'în text'], 'Arăți locul, nu ghicești.', { long: true, tokens: ['text'] }),
    ex('e7l4', 'dramatic', 'De ce e un text dramatic „de jucat”? Un motiv (replici / scene / conflict).', ['replici', 'scene', 'conflict', 'scena'], 'Citit, tot auzi voci.')
  ],
  'romana:7:redactare7': [
    ex('e7rd1', 'caracterizare', 'Caracterizează un coleg în 2 fraze fără „bun” și „frumos” — doar fapte sau vorbe.', ['el', 'ea', 'cand', 'când'], 'Arată, nu eticheta.', { long: true, minWords: 10 }),
    ex('e7rd2', 'cerere', 'Numește 3 piese ale unei cereri (destinatar, ce soliciți, date).', ['destinatar', 'date'], 'E un text cu scop oficial.', { tokens: ['destinatar'] }),
    ex('e7rd3', 'recenzie', 'O recenzie: titlul unei cărți + un motiv dacă o recomanzi. O frază.', ['pentru', 'pentru ca'], 'Cititorul decide dacă se apropie.', { long: true }),
    ex('e7rd4', 'scop', 'Înainte să scrii, ce întrebi întâi? (cu ce scop / pentru cine)', ['scop', 'pentru cine', 'destinatar'], 'Scopul alege forma.')
  ],
  'romana:7:limba7': [
    ex('e7lg1', 'fraza', '„Am plecat și am ajuns târziu.” Câte propoziții are fraza?', ['2', 'doua', 'două'], 'Două predicații legate prin „și”.', { numeric: { value: 2, tolerance: 0 } }),
    ex('e7lg2', 'cauza', '„Am rămas acasă pentru că ploua.” Ce exprimă a doua parte? (cauză / scop / loc)', ['cauza', 'cauză'], 'Răspunde la „de ce?”.'),
    ex('e7lg3', 'pleonasm', 'Corectează: „Coboară jos.” Scrie varianta fără surplus.', ['coboara', 'coboară'], 'Pleonasm: spui de două ori același lucru.'),
    ex('e7lg4', 'familie', 'Un cuvânt din familia lui „carte” (alta decât „carte”).', ['carticica', 'cărticică', 'carturar', 'cărturar', 'incartirui', 'a citi'], 'Aceeași rădăcină.')
  ],
  'romana:7:inter7': [
    ex('e7c1', 'mit', 'În 2 fraze, un mit românesc pe care îl știi (nume + ce se întâmplă).', ['zamolxe', 'miorita', 'traian', 'manole', 'dochia'], 'Nu e știre: e un fir de origini / eroi.', { long: true, minWords: 8 }),
    ex('e7c2', 'retell', 'Testul că ai înțeles: spune mitul în o frază, cu cuvintele tale.', ['a fost', 'erou', 'zeu', 'legenda'], 'Dacă se rupe firul, mai citești.', { long: true, minWords: 8 }),
    ex('e7c3', 'intalnire', 'Limba se schimbă când oamenii se… (un verb).', ['intalnesc', 'întâlnesc', 'intalnire', 'imprumuta', 'împrumută'], 'Cuvintele călătoresc.'),
    ex('e7c4', 'respect7', 'Față de un mit al altora, primul verb potrivit: asculți / ironizezi?', ['asculti', 'asculți'], 'Curiozitate > rang.')
  ],
  'romana:8:oral8': [
    ex('e8o1', 'argument', 'O părere + „pentru că” + un motiv, despre teme în weekend.', ['pentru ca', 'pentru că'], '„Pentru că” e scheletul.', { long: true, tokens: ['pentru'] }),
    ex('e8o2', 'info-intentie', 'O știre vrea să anunțe; un discurs de campanie vrea să… (un verb).', ['convinga', 'convingă', 'convinge'], 'Informație vs intenție.'),
    ex('e8o3', 'ascult8', 'Într-o dezbatere, înainte să adaugi, ce faci cu ideea celuilalt? Un verb.', ['reiei', 'repeți', 'reformulezi', 'rezumi'], 'Arăți că ai auzit.'),
    ex('e8o4', 'surasa', 'Numește o sursă scurtă pentru o afirmație din clasă (text, oră, martor).', ['text', 'ora', 'oră', 'profesor', 'manual', 'martor'], 'Nu e bibliografie de 2 pagini.')
  ],
  'romana:8:lectura8': [
    ex('e8l1', 'tema', 'Tema e „despre ce e, în mare”. Pentru un text despre prietenie la școală, scrie tema în 4-6 cuvinte.', ['prietenie'], 'Nu un citat magic: despre ce e.', { tokens: ['prieten'] }),
    ex('e8l2', 'esential', 'Tai un detaliu: rămâne sensul? Ce e esențial — tema sau ornamentul? Un cuvânt.', ['tema', 'temă'], 'Ornamentul e culoare, nu schelet.'),
    ex('e8l3', 'necunoscut', 'La un text necunoscut, ce faci întâi: citești firul sau sari la grilă? Un cuvânt.', ['citesti', 'citești', 'firul', 'textul'], 'Textul din față, nu comentariul de acasă.'),
    ex('e8l4', 'nonlit', 'Un afiș e text nonliterar. Ce întrebi: cine, cui, ce vrea? Răspunde pe scurt pentru un afiș de serbare.', ['serbare', 'cine', 'cui'], 'Forma e parte din mesaj.', { long: true })
  ],
  'romana:8:redactare8': [
    ex('e8r1', 'arg', 'Scheletul argumentativ: părere + motive + … (ce lipsește?)', ['exemple', 'exemplu'], 'Se vede scheletul.'),
    ex('e8r2', 'paragraf', 'Un paragraf = câte idei de bază? Un număr.', ['1', 'o idee', 'una'], 'Un bloc, o treabă.', { numeric: { value: 1, tolerance: 0 } }),
    ex('e8r3', 'incheiere', 'Încheierea aduce un subiect nou? da sau nu.', ['nu'], 'Ușa se închide, nu se deschide alt coridor.'),
    ex('e8r4', 'en-scriere', 'La EN, primul lucru la textul scris: plan sau inspirație de moment? Un cuvânt.', ['plan'], 'Capăt + mijloc, chiar dacă e creativ.')
  ],
  'romana:8:limba8': [
    ex('e8g1', 'acord', 'Corectează: „Copiii aleargă și se joacă frumos.” E deja corect? da sau nu.', ['da'], 'Subiectul „copiii” se leagă de predicatele la plural.'),
    ex('e8g2', 'acord2', '„Fata și băiatul … la poartă.” Completează verbul (aleargă / aleargă).', ['alearga', 'aleargă'], 'Două subiecte → plural.'),
    ex('e8g3', 'punctuatie', 'Pune virgula unde trebuie: „Când plouă ies cu umbrela.” Scrie propoziția.', ['cand ploua, ies', 'când plouă, ies'], 'Virgula arată respirația după circumstanțialul antepus.'),
    ex('e8g4', 'vocab8', 'Alege cuvântul potrivit: „A făcut o … greșeală” (gravă / grea). Unul.', ['grava', 'gravă'], 'Contextul decide, nu lista tocită.')
  ],
  'romana:8:inter8': [
    ex('e8c1', 'punte', 'Cu ce unelte citești un text „al lumii”? Numește 2 (idee, dovadă, ton).', ['idee', 'dovada', 'dovadă', 'ton'], 'Uneltele de română călătoresc.', { tokens: ['idee'] }),
    ex('e8c2', 'noi-ceilalti', '„Noi și ceilalți”: primul verb — descrii sau cobori? ', ['descrii', 'descrie'], 'Curiozitate, nu rang.'),
    ex('e8c3', 'reflectie', 'O reflecție întreabă „ce rămâne după…”. Completează în 5-8 cuvinte.', ['dupa', 'după'], 'Nu doar relatare.', { long: true }),
    ex('e8c4', 'lume-lit', 'De ce merită un model din literatura lumii? O frază cu „aceleași” sau „și aiurea”.', ['aceleasi', 'aceleași', 'aiurea', 'lume'], 'Te uiți afară ca să te vezi.', { long: true })
  ]
};

function chapterKey(subject, grade, chapterId) {
  return `${String(subject || '').toLowerCase()}:${String(grade || '')}:${String(chapterId || '')}`;
}

function listChapterExercises(subject, grade, chapterId) {
  const key = chapterKey(subject, grade, chapterId);
  return BANK[key] ? BANK[key].slice() : [];
}

function listExercisePoints(subject, grade, chapterId) {
  return [...new Set(listChapterExercises(subject, grade, chapterId).map(item => item.point))];
}

function allExerciseKeys() {
  return Object.keys(BANK);
}

function findExercise(id) {
  const needle = String(id || '');
  for (const list of Object.values(BANK)) {
    const found = list.find(item => item.id === needle);
    if (found) return found;
  }
  return null;
}

function normalizeAnswer(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/,/g, '.')
    .replace(/[–—−]/g, '-')
    .replace(/[∞]/g, 'inf')
    .replace(/²/g, '2')
    .replace(/³/g, '3')
    .replace(/[^\p{L}\p{N}.\-/+() ]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripWrap(value) {
  return normalizeAnswer(value).replace(/[{}]/g, '').replace(/\s/g, '');
}

function answersMatch(given, exercise) {
  const raw = String(given || '').trim();
  if (!raw) return false;
  const g = normalizeAnswer(raw);
  const compact = stripWrap(g);

  if ((exercise.answers || []).some(answer => {
    const a = normalizeAnswer(answer);
    return a && (g === a || compact === stripWrap(a) || (a.length >= 4 && g.includes(a)));
  })) {
    return true;
  }

  const tokens = (exercise.tokens || []).map(normalizeAnswer).filter(Boolean);
  if (tokens.length && tokens.every(token => g.includes(token))) return true;

  if (exercise.minWords && raw.split(/\s+/).filter(Boolean).length >= exercise.minWords && (exercise.answers || []).some(answer => {
    const a = normalizeAnswer(answer);
    return !a || a.length < 3 || g.includes(a);
  })) {
    return true;
  }

  if (exercise.numeric && Number.isFinite(Number(exercise.numeric.value))) {
    const parsed = Number(String(g).replace(/[^\d.-]/g, ''));
    if (Number.isFinite(parsed) && Math.abs(parsed - Number(exercise.numeric.value)) <= (Number(exercise.numeric.tolerance) || 0)) {
      return true;
    }
  }
  return false;
}

function publicExercise(item, review = false) {
  return {
    id: item.id,
    point: item.point,
    prompt: item.prompt,
    hint: item.hint || '',
    long: Boolean(item.long),
    review
  };
}

function checkExercise(id, given) {
  const exercise = findExercise(id);
  if (!exercise) return { ok: false, found: false };
  const correct = answersMatch(given, exercise);
  return {
    ok: correct,
    found: true,
    explain: exercise.explain,
    sample: exercise.answers[0] || ''
  };
}

module.exports = {
  BANK,
  chapterKey,
  listChapterExercises,
  listExercisePoints,
  allExerciseKeys,
  findExercise,
  normalizeAnswer,
  answersMatch,
  publicExercise,
  checkExercise
};

// Modele recomandate de teste EN — originale, inspirate de structura probei.
// Nu sunt subiecte publicate și nu sunt copiate din culegeri.
// Se afișează doar ca text; elevul le lucrează pe foaie, nu în aplicație.

function paper(id, title, duration, hint, blocks) {
  return {
    id,
    title,
    duration,
    oficiu: 10,
    completable: false,
    workOnPaper: true,
    hint,
    blocks
  };
}

function block(label, points, intro, items) {
  return { label, points, intro: intro || '', items };
}

function item(n, points, prompt, lines) {
  const row = { n, points, prompt };
  if (lines) row.lines = lines;
  return row;
}

const MATH_NOTE =
  'Lucrezi pe caiet sau pe o foaie albă, ca la examen. În aplicație vezi doar testul: fără câmpuri, fără finalizare, fără notare. Se acordă 10 puncte din oficiu. Baremul, în spiritul programei, acceptă orice metodă corectă. Calculele se văd pe foaie.';

const RO_NOTE =
  'Lucrezi pe caiet sau pe o foaie albă. În aplicație nu completezi și nu trimiți răspunsuri. Se acordă 10 puncte din oficiu. La redactare, ții cerința (tip de text, persoană, lungime) și lași un plan pe ciornă.';

const PAPERS = {
  matematica: [
    paper(
      'en-mate-a',
      'Model recomandat A — matematică',
      '2 ore',
      MATH_NOTE,
      [
        block('Subiectul I', 30, 'Itemi scurți. Pe foaie: calcul vizibil și răspuns subliniat.', [
          item(1, 5, 'Calculează valoarea expresiei 3² × 4 − 18 : 6 + 5.'),
          item(2, 5, 'Arată care dintre numerele −4; 0; 2/7; √5; 1,25; 3,14 (aproximație a lui π) sunt raționale. Motivează pe scurt pentru un număr pe care îl lași în afara listei.'),
          item(3, 5, 'Un ghiozdan costă 160 de lei. Se aplică o reducere de 15%, apoi încă 8 lei. Ce sumă se plătește?'),
          item(4, 5, 'Reprezintă pe axă intervalul [−2, 3) ∪ (1, 5] și scrie, printr-o singură notație de interval dacă se poate, reuniunea.'),
          item(5, 5, 'Raportul merelor verzi față de cele roșii dintr-un coș este 2 : 5. Sunt 14 mere verzi. Câte mere sunt în total?'),
          item(6, 5, 'Un dreptunghi are lungimea 12 cm și lățimea 5 cm. Calculează perimetrul și aria. Precizează unitățile.')
        ]),
        block('Subiectul II', 30, 'Algebră. Justifică transformările. Verifică soluțiile.', [
          item(7, 5, 'Simplifică expresia 5(2x − 3) − 2(x + 4) + 7.'),
          item(8, 5, 'Folosește o formulă de calcul prescurtat și scrie (2a − 5)² ca trinom.'),
          item(9, 5, 'Rezolvă în ℝ ecuația 3(x − 4) = 2x + 1. Verifică.'),
          item(10, 5, 'Rezolvă sistemul { 2x + y = 11 ; x − y = 1 }. '),
          item(11, 5, 'Rezolvă inecuația −2x + 6 ≤ 0. Scrie mulțimea soluțiilor ca interval.'),
          item(12, 5, 'Fie f(x) = −x + 4. Calculează f(0) și f(3). Determină punctul în care graficul taie axa Ox.')
        ]),
        block('Subiectul III', 30, 'Geometrie. Desenează, notează datele, apoi calculează.', [
          item(13, 5, 'În triunghiul ABC, măsura unghiului A este 50°, iar a unghiului B este 70°. Află măsura unghiului C și măsura unghiului exterior format lângă C.'),
          item(14, 5, 'Un triunghi dreptunghic are catetele 9 cm și 12 cm. Află ipotenuza. (Poți recunoaște un multiplu al triunghiului 3-4-5.)'),
          item(15, 5, 'Un trapez isoscel are bazele de 8 cm și 14 cm și înălțimea 5 cm. Calculează aria. Apoi află lungimea unei laturi neparalele, știind că proiecțiile oblice pe baza mare sunt egale.'),
          item(16, 5, 'Un cerc are raza 7 cm. Scrie lungimea cercului și aria discului, lăsând π în rezultat.'),
          item(17, 5, 'Un cub are muchia 6 cm. Calculează aria totală și volumul. Apoi lungimea diagonalei unei fețe.'),
          item(18, 5, 'O prismă dreaptă cu baza un pătrat de latură 4 cm are înălțimea 10 cm. Calculează volumul și aria laterală.')
        ])
      ]
    ),
    paper(
      'en-mate-b',
      'Model recomandat B — matematică',
      '2 ore',
      MATH_NOTE,
      [
        block('Subiectul I', 30, 'Variat, din toată programa de gimnaziu.', [
          item(1, 5, 'Află c.m.m.d.c. și c.m.m.m.c. pentru 24 și 36. (Descompunere în factori primi.)'),
          item(2, 5, 'Calculează |−8| − |5 − 12| + (−3) × 4.'),
          item(3, 5, 'Subliniază scrierea echivalentă cu 0,6: 3/4 ; 3/5 ; 2/3 ; 6/9. Arată calculul.'),
          item(4, 5, '√48 se scrie sub forma a√3, cu a natural. Află a. Apoi compară √48 cu 7.'),
          item(5, 5, 'Patru note: 7, 9, 9, 5. Calculează media aritmetică, mediana, modul și amplitudinea.'),
          item(6, 5, '5 muncitori termină o treabă în 12 zile (același ritm, treabă neschimbată). În câte zile ar termina 6 muncitori? Precizează dacă mărimile sunt direct sau invers proporționale.')
        ]),
        block('Subiectul II', 30, 'Litere, ecuații, o funcție.', [
          item(7, 5, 'Scoate factorul comun: 6x² − 9x.'),
          item(8, 5, 'Calculează 99² folosind (100 − 1)², fără să înmulțești „în lung” 99 cu 99.'),
          item(9, 5, 'Simplifică fracția algebrică (x² − 9)/(x − 3), precizând valoarea exclusă pentru x.'),
          item(10, 5, 'Rezolvă 4 − 3x > 10. Scrie soluția ca interval. Marcheaz-o pe o axă schițată.'),
          item(11, 5, 'Sistem: { x + 2y = 8 ; 3x − 2y = 4 }. Folosește reducerea sau substituția, apoi verifică.'),
          item(12, 5, 'f(x) = 2x − 6. Completează un tabel pentru x ∈ {0, 1, 3, 4}. Care e panta? Unde taie axa Oy?')
        ]),
        block('Subiectul III', 30, 'Plan și spațiu. Figura contează.', [
          item(13, 5, 'Două drepte paralele tăiate de o secantă. Un unghi intern are 125°. Află unghiul intern de aceeași parte a secantei și un unghi corespondent cu cel de 125°.'),
          item(14, 5, 'Triunghi isoscel ABC cu AB = AC și unghiul din A de 40°. Află unghiurile de la bază.'),
          item(15, 5, 'În triunghiul dreptunghic, ipotenuza e 13 cm, o catetă e 5 cm. Află cealaltă catetă și aria.'),
          item(16, 5, 'Un romb are diagonalele 10 cm și 24 cm. Calculează aria. Apoi o latură (Pitagora pe jumătăți de diagonale).'),
          item(17, 5, 'Cilindru circular drept cu R = 3 cm, h = 8 cm. Volumul și aria laterală, cu π în rezultat.'),
          item(18, 5, 'Piramidă regulată cu baza un pătrat de latură 6 cm și înălțimea 4 cm. Calculează volumul. (Aria bazei întâi.)')
        ])
      ]
    ),
    paper(
      'en-mate-c',
      'Model recomandat C — matematică',
      '2 ore',
      MATH_NOTE,
      [
        block('Subiectul I', 30, 'Citește verbul din cerință înainte de a calcula.', [
          item(1, 5, 'Calculează 2⁵ : 4 + 3 × (10 − 7)².'),
          item(2, 5, 'Află cel mai mic număr natural n pentru care 5n ≥ 42.'),
          item(3, 5, 'O pâine costă 6 lei. Câte pâini se pot cumpăra cu 50 de lei și câți lei rămân?'),
          item(4, 5, 'Pe axă, marchează −3, 0, √4 și 2,5. Care e cel mai mic? Care e cel mai mare?'),
          item(5, 5, 'Într-un grafic cu bare, vânzările (cutii) sunt: lun 20, mar 12, mie 24, joi 18. În care zi s-a vândut cel mai puțin? Cu cât a crescut de marți până miercuri? Care e media celor patru zile?'),
          item(6, 5, 'Un pătrat are perimetrul 36 cm. Află latura și aria.')
        ]),
        block('Subiectul II', 30, 'Expresii și dependențe.', [
          item(7, 5, 'Desfășoară și reducere: (x + 3)(x − 3) + 6x.'),
          item(8, 5, 'Arată că 4x² − 12x + 9 e un pătrat perfect și scrie-l ca ( )².'),
          item(9, 5, 'Rezolvă ax + 8 = 0 când a = −2. Ce se întâmplă dacă a ar fi 0? Răspunde în o frază, după ce rezolvi cazul a = −2.'),
          item(10, 5, 'Inecuația 2x − 5 < 3x + 1. Intervalul soluțiilor.'),
          item(11, 5, 'Doi copii au împreună 36 de stickere. Primul are cu 8 mai multe decât al doilea. Câte are fiecare? (Ecuație sau sistem.)'),
          item(12, 5, 'Graficul lui f(x) = (1/2)x + 1 trece prin (0, b) și (4, c). Află b și c. Este f crescătoare sau descrescătoare?')
        ]),
        block('Subiectul III', 30, 'Măsuri, arii, corpuri.', [
          item(13, 5, 'Unghiurile unui triunghi sunt în raport 2 : 3 : 4. Află măsurile. (Suma e 180°.)'),
          item(14, 5, 'Un segment de 12 cm e împărțit de o paralelă (Thales) în părți proporționale cu 1 și 2. Află lungimile celor două părți.'),
          item(15, 5, 'Dreptunghi 15 cm pe 8 cm. Aria. Lungimea diagonalei.'),
          item(16, 5, 'Cerc cu diametrul 10 cm. Lungimea și aria discului, cu π.'),
          item(17, 5, 'Con circular drept, R = 6 cm, h = 8 cm. Află generatoarea (Pitagora) și volumul.'),
          item(18, 5, 'Sferă de rază 3 cm. Aria și volumul, cu π. (Atenție la formule: 4πR² și (4/3)πR³.)')
        ])
      ]
    )
  ],
  romana: [
    paper(
      'en-ro-a',
      'Model recomandat A — limba română',
      '2 ore',
      RO_NOTE,
      [
        block(
          'Subiectul I',
          50,
          'Citește textul de două ori, apoi răspunde. Textul este original, scris pentru antrenament; nu e extras dintr-un manual.',
          [
            item(
              0,
              0,
              'Text-suport\n\nCireșul din spatele blocului nu mai dădea roade de trei veri, dar Mara urca totuși scările cu o sticlă de apă, în fiecare dimineață, înainte de autobuz. Vecinii ziceau că e risipă. Ea zicea că pământul de la rădăcină e încă viu, dacă îl atingi și nu e praf.\n\nÎntr-o luni cu vânt, a găsit pe trepte un bilet îndoit: „Lasă copacul. Oricum o să-l taie.” Scrisul era grăbit, fără nume. Mara a băgat biletul în buzunar lângă carnetul de elev și a udat mai cu grijă, de jur împrejur, ca pe o hartă.\n\nSâmbăta, un băiat din 7B a venit cu o lopată prea mare pentru el. Nu a întrebat dacă are voie. A săpat un șanț subțire, ca un cerc, și a tăcut. Când a plecat, pe lopată rămăsese un strop de noroi și o frunză uscată, ca o semnătură.\n\nMara nu a aflat cine scrisese biletul. A aflat altceva: că un copac poate aduna oameni fără să strige.'
            ),
            item(1, 6, 'Precizează locul principal al întâmplărilor și un personaj care acționează în text.'),
            item(2, 6, 'Numește două fapte ale Marei care arată grijă față de copac.'),
            item(3, 6, 'Transcrie o secvență în care apare un punct de vedere opus celui al Marei.'),
            item(4, 6, 'Explică, într-un enunț, de ce biletul e fără nume contează pentru atmosferă. Nu rescrie tot textul.'),
            item(5, 6, 'Formulează ideea principală a ultimului paragraf, cu cuvintele tale (o frază).'),
            item(6, 6, 'Găsește în text un epitet și un cuvânt folosit cu sens figurat. Transcrie-le.'),
            item(7, 6, 'Alcătuiește un enunț în care să folosești un sinonim potrivit, în context, pentru „grăbit” (din „scrisul era grăbit”).'),
            item(8, 8, 'Motivează, în 3–5 rânduri, dacă finalul e mai degrabă despre copac sau despre oameni. Folosește o dovadă din text.')
          ]
        ),
        block('Subiectul II', 10, 'Limbă, pe același text sau pe fraze din el.', [
          item(9, 5, 'Indică valoarea morfologică a cuvântului „încă” din fragmentul „pământul de la rădăcină e încă viu”. Alege și justifică în o frază.'),
          item(10, 5, 'În fraza „A săpat un șanț subțire, ca un cerc, și a tăcut.” precizează predicatul și un circumstanțial. Numește felul circumstanțialului.')
        ]),
        block('Subiectul III', 30, 'Redactează pe foaie. 150–180 de cuvinte. Lasă un plan de 5 rânduri pe ciornă.', [
          item(
            11,
            30,
            'Redactează o narațiune la persoana I, în care un obiect mic (un bilet, o cheie, o frunză) schimbă mersul unei zile. Respectă: loc vizibil, o treaptă (ceva se întâmplă), un capăt. Nu relua textul-suport cu alte cuvinte; poți păstra doar ideea de „semn”.',
            'plan + 150–180 de cuvinte'
          )
        ])
      ]
    ),
    paper(
      'en-ro-b',
      'Model recomandat B — limba română',
      '2 ore',
      RO_NOTE,
      [
        block(
          'Subiectul I',
          50,
          'Text nonliterar original (anunț de bibliotecă școlară). Citește și tabelul.',
          [
            item(
              0,
              0,
              'Text-suport\n\nBiblioteca „Scara 3” — anunț pentru elevi\n\nDe luni, 12 mai, sala de lectură se deschide la 8:00 și se închide la 16:00. În sesiunea de teste a școlii, programul se scurtează: miercuri și joi, ultima oră de acces e 14:30.\n\nReguli scurte: ghiozdanele stau în cuierul de la ușă; apa e permisă în sticlă închisă; dialogul în șoaptă, nu în grup. Cărțile din sala de lectură nu se împrumută acasă. Împrumutul se face de la ghișeu, maximum 3 volume, 14 zile.\n\nTabel. Zile / locuri în sală / voluntari de gardă\n• luni — 24 locuri — clasa a VII-a A\n• marți — 24 locuri — clasa a VIII-a C\n• miercuri — 16 locuri — clasa a VI-a B\n• joi — 16 locuri — clasa a VIII-a A\n• vineri — 24 locuri — clasa a VII-a D\n\nDacă sala e plină, te treci pe listă. Nu se „ține locul” cu un caiet pe masă. Pentru proiecte de grup, cereți sala de lângă, nu mutați scaunele printre rafturi.\n\nÎntrebări: biblioteca@scara3.școala.ro — răspundem în zilele lucrătoare, nu în weekend.'
            ),
            item(1, 6, 'Precizează scopul principal al textului: să povestească, să descrie un loc sau să informeze / să reglementeze. Motivează cu un indiciu de structură (titlu, tabel, reguli).'),
            item(2, 6, 'În ce zile se închide sala mai devreme și la ce oră?'),
            item(3, 6, 'Câte volume poți lua acasă și pentru câte zile?'),
            item(4, 6, 'Folosind tabelul, spune în ce zile sunt mai puține locuri și ce clase țin garda atunci.'),
            item(5, 6, 'Explică, într-un enunț, de ce un caiet pe masă nu rezervă un loc. (Ideea e în text; formuleaz-o tu.)'),
            item(6, 6, 'Transcrie două reguli care țin de liniște sau de ordine, nu de programul orelor.'),
            item(7, 6, 'Alcătuiește un enunț cu un antonim potrivit pentru „se scurtează” (programul).'),
            item(8, 8, 'Compară, în 4–6 rânduri, informația din tabel cu informația din paragraful despre program. Ce adaugă tabelul, ce nu spune tabelul?')
          ]
        ),
        block('Subiectul II', 10, 'Limbă aplicată.', [
          item(9, 5, 'În „Cărțile din sala de lectură nu se împrumută acasă.” identifică subiectul și predicatul. Spune dacă predicatul e verbal sau nominal.'),
          item(10, 5, 'Indică funcția sintactică a grupului „în weekend” din ultima frază. Numește felul circumstanțialului, dacă e cazul.')
        ]),
        block('Subiectul III', 30, '150–180 de cuvinte. Plan pe ciornă.', [
          item(
            11,
            30,
            'Redactează un text argumentativ în care să susții dacă școala are sau nu nevoie de o sală de lectură cu reguli stricte. Teză clară, două argumente cu exemple credibile (din viața de elev, nu statistici inventate), o concluzie-oglindă. Poți face o punte scurtă spre anunțul-suport, fără să-l copiezi.',
            'plan + 150–180 de cuvinte'
          )
        ])
      ]
    ),
    paper(
      'en-ro-c',
      'Model recomandat C — limba română',
      '2 ore',
      RO_NOTE,
      [
        block(
          'Subiectul I',
          50,
          'Text descriptiv original. Urmărește traseul ochiului, nu „ce a vrut autorul”.',
          [
            item(
              0,
              0,
              'Text-suport\n\nPeronul 2 e o bandă de beton frecată de valize. Dimineața, aerul miroase a cafea de automat și a oțel ud. Un ceas rotund, cu o sticlă fisurată, arată mereu un minut în urma anunțurilor din difuzor, ca un bătrân care aude, dar nu se grăbește.\n\nÎn stânga, o bancă cu vopseaua sărită ține trei oameni care nu se privesc: o femeie cu un plic galben, un elev cu un caiet pe genunchi, un bărbat care numără monede în palmă, una câte una, ca pe o rugăciune practică. Deasupra lor, un afiș deconcertat, jumătate dezlipit, promite un festival de luna trecută.\n\nȘinele, când nu e tren, par două linii de caiet foarte lungi. Când vine trenul, liniile se umplu de zgomot și de o lumină jos, galbenă, care alunecă pe picioarele celor care se dau înapoi fără să se fi înțeles între ei.\n\nNimeni nu rămâne pe peron ca să-l descrie. Peronul rămâne totuși, cu ceasul lui întârziat și cu vopseaua de pe bancă, gata să țină alți trei oameni care nu se privesc.'
            ),
            item(1, 6, 'Precizează locul descris și un element care revine (un „personaj” al locului, nu neapărat om).'),
            item(2, 6, 'Numește două simțuri activate în primul paragraf, cu câte o dovadă transcrisă scurt.'),
            item(3, 6, 'În ce ordine se mișcă privirea în paragraful al doilea? (stânga / deasupra / etc.)'),
            item(4, 6, 'Explică, într-un enunț, comparația ceasului cu „un bătrân care aude, dar nu se grăbește”.'),
            item(5, 6, 'Identifică o personificare sau o comparație din paragraful despre șine. Transcrie-o.'),
            item(6, 6, 'Formulează, cu cuvintele tale, o temă posibilă a textului (nu o poveste inventată).'),
            item(7, 6, 'Găsește un antonim de context pentru „se dau înapoi” și folosește-l într-un enunț propriu, nu din text.'),
            item(8, 8, 'În 4–6 rânduri, arată cum ultimul paragraf închide descrierea fără să treacă în narațiune. Folosește o secvență.')
          ]
        ),
        block('Subiectul II', 10, 'Limbă pe fragment.', [
          item(9, 5, 'Indică valoarea morfologică a lui „foarte” din „două linii de caiet foarte lungi”.'),
          item(10, 5, 'În „Un ceas rotund, cu o sticlă fisurată, arată mereu un minut în urma anunțurilor” precizează un atribut și spune ce cuvânt îl determină.')
        ]),
        block('Subiectul III', 30, '150–180 de cuvinte.', [
          item(
            11,
            30,
            'Redactează o descriere a unui loc de așteptare pe care îl cunoști (hol, stație, cabinet, scară de bloc). Ordine spațială vizibilă, două simțuri, o imagine de închidere — fără întâmplare lungă, fără morală de calendar. Nu copia peronul din text; inventează locul tău.',
            'plan + 150–180 de cuvinte'
          )
        ])
      ]
    )
  ]
};

function papersForEn(subject) {
  const sid = String(subject || '').toLowerCase().includes('rom') ? 'romana' : 'matematica';
  return (PAPERS[sid] || []).map(entry => ({ ...entry, blocks: entry.blocks.map(block => ({ ...block, items: block.items.slice() })) }));
}

module.exports = { PAPERS, papersForEn };

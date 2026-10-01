'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(fields) {
  return romanaLesson(fields);
}

module.exports = {
  id: 'traditie-inovatie',
  title: 'Tradiție și inovație',
  inOwnWords: 'Persuasiunea se sprijină pe fapte. Textul explicativ stă lângă cel argumentativ. Circumstanțialele de loc, timp, mod, cauză și scop se transcriu după întrebare. Compararea textelor și opinia închid unitatea. Turismul cultural rămâne scurt.',
  toc: [
    'Persuasiune și o știre falsă',
    'Patrimoniul, explicativ și argumentativ',
    'Circumstanțiala de loc',
    'Circumstanțiala de timp',
    'Circumstanțiala de mod',
    'Două umbre la Cozia',
    'Circumstanțiala cauzală',
    'Circumstanțiala finală',
    'Preferință și opinie',
    'Recapitularea începutului',
    'Turismul cultural'
  ],
  glossary: [
    {
      term: 'persuasiv',
      meaning: 'Care caută să convingă pe cineva să creadă sau să facă un lucru.'
    },
    {
      term: 'manipulare',
      meaning: 'Influențarea gândului și a faptei prin mijloace care ascund sau răstălmăcesc.'
    },
    {
      term: 'patrimoniu',
      meaning: 'Bunuri materiale sau imateriale cu valoare artistică sau istorică.'
    }
  ],
  lessons: [
    lesson({
      id: 'persuasiune',
      title: 'Faptul, emoția și valoarea',
      kind: 'redactare',
      boxes: [
        {
          type: 'definitie',
          title: 'Două căi',
          text: 'Persuasiunea convinge prin fapte, emoții sau valori. Manipularea ascunde sau răstălmăcește. Opinia de examen cere părerea, motivul și faptul.'
        }
      ],
      theory: [
        'Compunerea argumentativă, mai rară, cere ipoteza, două argumente, concluzia și conectorii. Opiniile gata făcute schimbă felul în care primești mesajul.',
        'Postarea de verificat spune că râul Sălăuța, în Bistrița-Năsăud, are ape roșii vindecătoare și că autorul s-a vindecat. Știrea Gărzii de Mediu spune altceva.',
        'Sălăuța este afluent al Someșului Mare. Pe 13 octombrie 2022, la ora 17:30, în Romuli, cineva a poluat râul. Pe 14 octombrie 2022 persoana a fost identificată și amendată cu 6.000 de lei, conform OUG 195/2005.',
        'Imaginea roșie pusă lângă postare este făcută cu inteligență artificială, nu este râul real. Ideea preconcepută: apa roșie ar fi leac.',
        'Apelul la eu am fost acolo și sunt fericit este emoție, nu dovadă. Scopul postării este să te trimită la un loc minune. Nu este etic să convingi cu o imagine falsă.',
        'Argumentul rațional este controlul: dată, loc, amendă. O știre despre premii care nu este în text nu se inventează. Nu inventa nici substanța poluantă.',
        'Oralul rămâne scurt. De scris rămân ipoteza și faptul. La opinia de 50–100 de cuvinte nu se cer conectorii.',
        'Dacă trimiți postarea mai departe fără dată și fără amendă, repeți emoția, nu controlul. Verificarea este gestul care desparte persuasiunea de manipulare.'
      ].join('\n\n'),
      example: [
        'Ipoteză: postarea nu descrie un râu vindecător. Argument rațional: Garda de Mediu a găsit o poluare pe 13 octombrie 2022, la Romuli, și a dat o amendă de 6.000 de lei pe 14 octombrie.',
        'Argument de valoare: o imagine făcută de calculator, pusă ca dovadă, minte. Concluzie: emoția eu m-am vindecat nu înlocuiește controlul.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Persuasiune cu fapt: amenda și data. Manipulare: aceeași poză roșie, fără dată și fără loc. Deosebirea nu este tonul vesel. Este faptul ascuns.'
        }
      ],
      tryThis: 'Definește persuasiunea și manipularea. Demonstrează, în 50–80 de cuvinte, că postarea este falsă, numai cu data, locul, amenda și imaginea artificială. Încheie cu o opinie de 50–100 de cuvinte: merită să verifici o postare înainte să o trimiți mai departe.',
      keyPoints: [
        'Sălăuța este afluent al Someșului Mare. Poluarea din Romuli este pe 13 octombrie 2022.',
        'Amenda, pe 14 octombrie 2022, este de 6.000 de lei. Imaginea roșie nu este râul.',
        'Emoția nu înlocuiește controlul. Faptul se scrie cu dată și loc.'
      ]
    }),
    lesson({
      id: 'patrimoniu',
      title: 'Definiția și părerea, în același text',
      kind: 'redactare',
      boxes: [
        {
          type: 'definitie',
          title: 'Două tipuri',
          text: 'Textul explicativ lămurește. Dicționarul și enciclopedia sunt explicative. Textul argumentativ are opinie, argumente și concluzie. Pot sta în aceeași pagină, în bucăți diferite.'
        }
      ],
      theory: [
        'Turul virtual simulează vizita, cu videoclipuri, poze, sunet și text, și promovează case memoriale și muzee. Această bucată este definiție, deci explicativă.',
        'Bucata despre muzeul virtual are opinia autorului: vizita contează pentru un adolescent, pentru că îi lărgește cunoașterea, gândirea, sensibilitatea și imaginația.',
        'Un argument: muzeul virtual este deschis la orice oră și poți sta într-o sală fără zgomot. Exemplul: turul online al expoziției România în Marele Război, de la Muzeul Național de Istorie a României.',
        'Laura Lucia Găvan, născută în 1990, este istoric de artă și jurnalist cultural. Textul ei despre patrimoniu desparte materialul de imaterial.',
        'Patrimoniul este un ansamblu de bunuri cu importanță artistică sau istorică. Cel imaterial cuprinde tradiții, literatură, dans, muzică. Cel material cuprinde clădiri, monumente și obiecte. Autoarea îl numește zestre comună.',
        'Ipoteza: dacă îl îngrijim, ne facem văzuți și putem susține economia printr-un turism care nu îl distruge. Exemple: bisericile de lemn din Maramureș, cu turn suplu și înalt.',
        'Mănăstirile pictate din Bucovina, între ele Arbore, Humor, Moldovița, Voroneț și Sucevița, sunt de la sfârșitul secolului al XV-lea sau din secolul al XVI-lea.',
        'Cazinoul din Constanța și vestigiile de la Băile Herculane au nevoie de intervenție, pentru că sunt aproape de prăbușire. Degradarea înseamnă și bani pierduți, și o parte din identitate.',
        'În text sunt verbe la persoana I și la persoana a III-a. Nu sunt enunțuri exclamative. Definiția deschide textul. Proiectul de minimum 150 de cuvinte despre un monument este scriere reală. Dezbaterea orală este plan scurt.'
      ].join('\n\n'),
      example: [
        'Textul despre turul virtual este explicativ: definește și enumeră mijloacele. Textul cu în opinia mea este argumentativ: ipoteză, deoarece, de exemplu.',
        'La Găvan, paragrafele de definiție sunt explicative. Paragrafele cu consider și cu recomand sunt argumentative. Două locuri în pericol: Cazinoul și Herculane.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Explicativ, două trăsături: biserica de lemn din Maramureș are turn suplu și turn înalt. Argumentativ: merită îngrijită, pentru că degradarea pierde și banii, și identitatea. Concluzia cere grijă, nu doar admirare.'
        }
      ],
      tryThis: 'Definește patrimoniul material și pe cel imaterial. Numește două mănăstiri pictate și cele două locuri în pericol. Răspunde adevărat sau fals: textul are persoana I și a III-a. Are enunțuri exclamative. Definiția deschide textul. În 30–50 de cuvinte, spune de ce degradarea este și pierdere de identitate.',
      keyPoints: [
        'Explicativul definește. Argumentativul are ipoteză, argumente și concluzie.',
        'Găvan, născută în 1990, desparte patrimoniul material de cel imaterial.',
        'Cazinoul din Constanța și vestigiile de la Herculane sunt aproape de prăbușire.'
      ]
    }),
    lesson({
      id: 'circumstantiala-loc',
      title: 'Unde stă locul în frază',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'De loc',
          text: 'Face treaba complementului de loc și răspunde la unde, de unde, până unde, pe unde, încotro. După regentă, de obicei, nu ia virgulă.'
        }
      ],
      theory: [
        'Călătoresc în Bucovina: în Bucovina este circumstanțial de loc. Călătoresc unde vreau: unde vreau este circumstanțială de loc. În regentă poate sta corelativul acolo: Plecăm acolo unde ne-ai trimis.',
        'Determină un verb, o interjecție predicativă, un adjectiv sau un adverb: Am mers unde mi-ai spus. Hai unde v-am zis. Aici unde sunt e foarte frumos.',
        'O introduc adverbe relative, unde și încotro, sau pronume cu prepoziție: S-a îndreptat către cine l-a aplaudat. Se uită spre ce este pe cer.',
        'Același unde nu este mereu loc. Mi-a spus unde se află cartea: completivă directă, ce mi-a spus. Locul unde ne-am oprit este frumos: atributivă.',
        'Mă gândesc unde am pus telefonul: completivă prepozițională. Mă duc acolo unde am fost ieri: circumstanțială de loc. Felul îl dă întrebarea, nu forma lui unde.',
        'Unde sunt pădurile de tei, acolo aș vrea să mergem nu conține două circumstanțiale de loc. Unde sunt pădurile este de loc. Să mergem este alt fel.',
        'M-am întors acolo, de unde am plecat în copilărie: de unde este adverb relativ. Se îndreptau către ce zgomot auzeau: către ce zgomot este adjectiv pronominal relativ.',
        'Versurile de la școală nu se lipesc. Le judeci pe rândul deschis, cu aceeași întrebare.'
      ].join('\n\n'),
      example: [
        'Alergăm pe unde ni se permite. Circumstanțiala: pe unde ni se permite. Elementul: pe unde. Regenta: alergăm.',
        'S-a întors spre cine i-a adresat întrebarea: spre cine i-a adresat întrebarea. Haide unde ne-a trimis mama: interjecția predicativă haide este regentă. Locul unde ne-am oprit nu se etichetează de loc.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Mi-a spus unde se află cartea. Întrebarea este ce mi-a spus, nu unde a mers. De aceea este completivă directă, deși începe cu unde.'
        }
      ],
      practice: [
        '1) Transcrie circumstanțiala de loc din Alergăm pe unde ni se permite.',
        '2) Clasifică unde în Mi-a spus unde se află cartea.',
        '3) Clasifică unde în Locul unde ne-am oprit este frumos.',
        '4) Clasifică unde în Mă duc acolo unde am fost ieri.'
      ].join('\n\n'),
      answers: [
        'pe unde ni se permite',
        'completivă directă',
        'atributivă',
        'circumstanțială de loc'
      ],
      mistakes: 'Unde nu înseamnă automat loc. Întrebarea de la regentă decide felul. Două de loc în fraza cu pădurile de tei este o numărare greșită.',
      tryThis: 'Spune ce introduce subordonata din Se îndreptau către ce zgomot auzeau. Construiește o circumstanțială de loc cu unde și una cu un pronume relativ.',
      keyPoints: [
        'Circumstanțiala de loc răspunde la unde și stă, de obicei, fără virgulă după regentă.',
        'Acolo este corelativ. Unde poate introduce și o directă, și o atributivă, și o prepozițională.',
        'Felul îl dă întrebarea de la regentă, nu forma lui unde.'
      ]
    }),
    lesson({
      id: 'circumstantiala-timp',
      title: 'Când nu este mereu timp',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Virgula',
          text: 'Când circumstanțiala de timp stă înaintea regentei, virgula desparte. Când stă după, de obicei nu ia virgulă.'
        }
      ],
      theory: [
        'Face treaba complementului de timp și răspunde la când, de când, până când, cât timp. Mă trezesc la răsăritul soarelui: complement. Mă trezesc când răsare soarele: subordonată.',
        'Corelative în regentă: atunci, cum. Am plecat atunci când te-am auzit. Poate sta înainte sau după: După ce am văzut piesa, am plecat. A lucrat până ce s-a înserat.',
        'O introduc când și cât, pronume cu prepoziție sau locuțiuni: până, până ce, imediat ce, după ce, în timp ce. Am discutat toate detaliile până să plecăm: de timp.',
        'Același când schimbă felul. El a aflat când va fi examenul: completivă directă. Problema când începe cursul: atributivă.',
        'Nu mi-am dat seama când a intrat: completivă prepozițională, pentru că a-și da seama cere de. A ajuns acasă când ei tocmai plecau: circumstanțială de timp.',
        'Pe un rând original, Când se stinge lampa, camera rămâne liniștită, când este adverb relativ și subordonata este de timp. Versul de la școală nu se lipește.',
        'Noi vom intra pe scenă după cine prezintă acum: pronume cu prepoziție. Ți-am dat telefon la ce oră mi-ai zis: adjectiv pronominal.'
      ].join('\n\n'),
      example: [
        'În timp ce noi suntem în Bucovina, ei vizitează Maramureșul. Circumstanțiala stă înainte și ia virgulă: în timp ce noi suntem în Bucovina.',
        'După ce a ajuns acasă, a povestit. Până să vină invitații, el a terminat de scris. A venit imediat când l-am invitat: fără virgulă, pentru că stă după regentă.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Problema când începe cursul rămâne nerezolvată. Când începe cursul ține de problema, nu de un verb de timp. Este atributivă. Nu o copia ca circumstanțială doar pentru că vezi când.'
        }
      ],
      practice: [
        '1) Transcrie circumstanțiala din După ce a ajuns acasă, a povestit.',
        '2) Clasifică când în El a aflat când va fi examenul.',
        '3) Clasifică când în A ajuns acasă când ei tocmai plecau.',
        '4) Spune de ce în timp ce noi suntem în Bucovina ia virgulă.'
      ].join('\n\n'),
      answers: [
        'după ce a ajuns acasă',
        'completivă directă',
        'circumstanțială de timp',
        'stă înaintea regentei'
      ],
      mistakes: 'Când de lângă a aflat nu este timp. Când de lângă problema nu este timp. Întrebarea schimbă eticheta.',
      tryThis: 'Construiește trei fraze de timp: cu când, cu după ce și cu până să. Pune virgula doar când subordonata stă înainte.',
      keyPoints: [
        'Circumstanțiala de timp răspunde la când. Înaintea regentei ia virgulă.',
        'După ce, până să și în timp ce o introduc.',
        'Când, lângă a aflat, este directă. Când, lângă a ajuns, este timp.'
      ]
    }),
    lesson({
      id: 'circumstantiala-mod',
      title: 'Cum, cu virgula din corelativ',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Perechile',
          text: 'În așa cum, atât cât, cu cât cu atât și pe cât pe atât, virgula este obligatorie. Fără aceste perechi, stă de obicei după regentă și nu ia virgulă.'
        }
      ],
      theory: [
        'Face treaba complementului de mod și răspunde la cum, în ce fel. A plecat fără a ne saluta: infinitiv, complement. A plecat fără să ne salute: circumstanțială de mod.',
        'Așa am făcut, cum mi s-a cerut. Pe cât era de inteligent, pe atât era de rău. Așa am stabilit cum am vorbit se îndreaptă în Așa am stabilit, cum am vorbit.',
        'Pe cât era de inteligentă pe atât era de timidă se îndreaptă cu virgulă după inteligentă. O introduc cum, cât, precum, ca și cum, de parcă, după cum, fără să.',
        'Cum schimbă și el felul. El nu știe cum s-a rezolvat problema: completivă directă. S-a mirat cum a reușit lucrarea: completivă prepozițională.',
        'Modul cum ne-a privit: atributivă. S-a comportat cum ne așteptam: circumstanțială de mod. Cum ai intrat pe ușă, îmi dai telefon imediat nu este de mod. Cum înseamnă aici când, deci este de timp.',
        'Așa am desenat, cum ne-ai învățat este de mod, iar cum este adverb relativ. Pe un rând original, Se așază cum le este rândul, subordonata este de mod. Versul de la școală nu se lipește.',
        'Virgula din fără să nu ține de perechea așa cum. Ea poate marca o informație în plus. Nu o pune doar pentru că vezi cum.'
      ].join('\n\n'),
      example: [
        'A stabilit planul după cum i s-a spus. Circumstanțiala: după cum i s-a spus. S-a purtat cu noi ca și cum nu s-ar fi întâmplat nimic.',
        'S-a trezit devreme, fără să fie obosit. Așa să răspunzi, cum ți-am arătat: virgula stă, pentru că așa și cum fac pereche.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Cum ai intrat pe ușă, te-am sunat. Aici cum înseamnă când. Este de timp, nu de mod. Întrebarea este când te-am sunat, nu în ce fel.'
        }
      ],
      practice: [
        '1) Transcrie circumstanțiala din A stabilit planul după cum i s-a spus.',
        '2) Pune virgula în Așa am stabilit cum am vorbit.',
        '3) Clasifică cum în El nu știe cum s-a rezolvat problema.',
        '4) Spune de ce Cum ai intrat pe ușă este de timp, nu de mod.'
      ].join('\n\n'),
      answers: [
        'după cum i s-a spus',
        'Așa am stabilit, cum am vorbit.',
        'completivă directă',
        'cum înseamnă când'
      ],
      mistakes: 'Fără perechea așa cum, virgula nu se pune doar pentru că există cum. Cum de la început de frază, cu sensul când, nu este mod.',
      tryThis: 'Construiește o circumstanțială de mod cu cum și una cu ca și cum. Clasifică și modul cum ne-a privit.',
      keyPoints: [
        'Circumstanțiala de mod răspunde la cum. Perechile așa cum și pe cât pe atât cer virgulă.',
        'Cum poate fi directă, prepozițională, atributivă sau de mod.',
        'Cum ai intrat, la început de frază, este timp când înseamnă când.'
      ]
    }),
    lesson({
      id: 'comparare-cozia',
      title: 'Același loc, alt tip de text',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Element comun',
          text: 'Se scrie în cel puțin 30 de cuvinte și privește conținutul. Se spune ce este la fel și ce diferă ca tip de text. Nu se compară frumusețea.'
        }
      ],
      theory: [
        'Textul A este o fișă. Mircea cel Bătrân s-a născut în 1355 și a murit la 31 ianuarie 1418. A fost voievod al Țării Românești din 23 septembrie 1386, cu o întrerupere, până la moarte.',
        'Este fiul lui Radu I și fratele lui Dan I, pe care îl urmează la tron. Cea mai importantă ctitorie a lui este mănăstirea Cozia, cu hramul Sfânta Treime. Fișa dă informații despre domnie. Nu are un eu care povestește.',
        'Textul lui Dimitrie Bolintineanu, Mircea cel Mare și solii, este liric. Domnul stă bătrân între căpitani. Două apropieri, fără versuri: este ca un stejar între trestii și ca un munte albit între dealuri. Are imagini. Este liric.',
        'Umbra lui Mircea. La Cozia, de Grigore Alexandrescu, a apărut în 1844, în revista Propășirea. Tema este istoria. Vocea de la Cozia salută umbra lui Mircea. Emoția este respectul amestecat cu părerea de rău. Oda nu se lipește.',
        'Umbra noastră. La Cozia, de Ioana Brușten, născută în 1968, este o povestire scrisă pentru școală. Autoarea este jurnalistă. Naratorul se numește Mircea. La Istanbul a cunoscut copii dintr-un proiect, români și turci.',
        'Bassam vorbește mult. La Cozia, ghidul spune despre un tunel pe sub Olt, despre clopote lipsă și despre o fântână cu monede. Tot ghidul spune că aici a funcționat prima școală mănăstirească, din 1415: este vorba din povestire, nu o fișă sigură în afara textului.',
        'Ghidul încheie că istoria popoarelor ține mult până învață pacea. Bassam întreabă dacă arhitecții de la Hagia Sophia și cei de la Cozia ar fi putut fi prieteni. Naratorul vrea, a doua zi, un proiect despre ce s-ar fi construit fără lupte.',
        'Trăsătura lui: se aprinde repede la gălăgie, apoi caută o ieșire comună. Tema textelor de la Cozia este istoria. Asemănare: Cozia și amintirea lui Mircea. Deosebire: fișa informează, poemul evocă, povestirea narează o vizită.'
      ].join('\n\n'),
      example: [
        'Element comun, peste 30 de cuvinte: fișa, poemul și povestirea vorbesc despre același domn și despre amintirea lui legată de Cozia. Fișa dă anii și hramul. Poemul din 1844 cheamă umbra. Povestirea aduce doi elevi în curte și închide vizita cu ideea că pacea se învață târziu.',
        'Deosebirea: una informează, una evocă liric, una narează. Cuvinte-cheie în fișă: voievod, 1386, Cozia. În povestire: umbră, Cozia, Bassam.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Adevărat: fișa dă informații despre domnie. Fals: fișa are un narator-personaj. Adevărat: textul lui Bolintineanu este liric. Fals: povestirea este o odă. Tipul se vede din structură, nu din locul comun.'
        }
      ],
      tryThis: 'Notează anii 1355, 23 septembrie 1386 și 31 ianuarie 1418, numele tatălui și al fratelui și hramul Coziei. Spune tema poemului din 1844 și tema povestirii. Numește trăsătura naratorului. Scrie cel puțin 30 de cuvinte cu elementul comun și cu o deosebire de structură.',
      keyPoints: [
        'Mircea cel Bătrân, 1355–1418, urcă la tron la 23 septembrie 1386. Ctitoria cea mai importantă este Cozia, hramul Sfânta Treime.',
        'Alexandrescu publică textul de la Cozia în 1844. Brușten, născută în 1968, narează o vizită.',
        'Elementul comun este Cozia și amintirea domnului. Tipurile de text diferă.'
      ]
    }),
    lesson({
      id: 'cauzala',
      title: 'Pentru că, și când cum înseamnă fiindcă',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Cauzală',
          text: 'Face treaba circumstanțialului de cauză și răspunde la din ce cauză. Felul se spune exact: circumstanțială cauzală. Când stă înainte, ia virgulă.'
        }
      ],
      theory: [
        'Râdea de veselă ce era: complement de cauză. Râdea fiindcă era veselă: circumstanțială cauzală. Corelative: atunci, apoi, de aceea, de asta. Pentru că avea emoții, de aceea a greșit.',
        'Cum, când și unde, dacă introduc o cauzală, au valoare de conjuncție și nu au funcție în subordonată. Cum bătea vântul, nu am ieșit din casă: cum înseamnă fiindcă.',
        'O introduc fiindcă, deoarece, căci, întrucât, pentru că, de vreme ce, din moment ce, din cauză că. L-a certat pentru ce a făcut: pentru ce este pronume relativ cu prepoziție, nu adverb.',
        'De vreme ce nu am primit niciun răspuns, nu te pot ajuta conține o cauzală. Virgula stă când cauzala este înainte. După regentă, de obicei, nu ia virgulă.',
        'Pe un rând original, Nu mai clipește, căci pleoapele au stat, căci este conjuncție subordonatoare. Versul de la școală nu se lipește.',
        'Nu o confunda cu finala. Pentru că ploua spune cauza. Ca să nu mă ud spune scopul. Aceeași ploaie poate sta în ambele feluri, după întrebare.'
      ].join('\n\n'),
      example: [
        'Am rămas acasă deoarece a început furtuna. Cauzala: deoarece a început furtuna. Fiindcă nu aveam umbrelă, nu am putut pleca: virgula stă, cauzala este înainte.',
        'Eram mulțumit întrucât găsisem o carte interesantă: fără virgulă, stă după regentă. Cum nu mi-a răspuns nimeni, am plecat: cum este aici conjuncție, nu adverb de mod.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'A fost apreciat pentru ce a făcut. Pentru ce este pronume cu prepoziție. Nu este adverb relativ. Cauzala se transcrie pentru ce a făcut, nu doar a făcut.'
        }
      ],
      practice: [
        '1) Transcrie cauzala din Am rămas acasă deoarece a început furtuna.',
        '2) Spune ce valoare are cum în Cum nu mi-a răspuns nimeni, am plecat.',
        '3) Este pentru ce, în A fost apreciat pentru ce a făcut, adverb sau pronume?',
        '4) Deosebește M-am adăpostit pentru că ploua de M-am adăpostit ca să nu mă ud.'
      ].join('\n\n'),
      answers: [
        'deoarece a început furtuna',
        'conjuncție, cu sensul fiindcă',
        'pronume relativ cu prepoziție',
        'prima este cauzală, a doua este finală'
      ],
      mistakes: 'Cum cu sensul fiindcă nu se analizează ca adverb de mod. Virgula lipsește când cauzala stă înainte.',
      tryThis: 'Construiește două cauzale cu conjuncții diferite și una cu pentru ce. Pune virgula când cauzala stă înainte.',
      keyPoints: [
        'Cauzala răspunde la din ce cauză. Fiindcă, deoarece, întrucât și pentru că o introduc.',
        'Înaintea regentei ia virgulă. Cum poate însemna fiindcă și atunci este conjuncție.',
        'Pentru ce este pronume cu prepoziție, nu adverb.'
      ]
    }),
    lesson({
      id: 'finala',
      title: 'Ca să stea după scop',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Finală',
          text: 'Face treaba circumstanțialului de scop și răspunde la cu ce scop. Să și de, în registrul popular, stau numai după regentă.'
        }
      ],
      theory: [
        'S-a antrenat pentru victorie: complement de scop. S-a antrenat ca să obțină victoria: circumstanțială finală. Corelative: de aceea, de asta. Când acestea stau în regentă, virgula desparte.',
        'Topica este liberă: Citește articolul ca să afli. Ca să afli informații, citește articolul. Conjuncțiile să și de introduc finala numai după regentă. Mergi la cantină să mănânci. Du-te de mănâncă.',
        'O introduc ca să, să, pentru ca să sau un pronume relativ cu prepoziție: Se pregătise mult pentru ce avea de prezentat. A mers în grădină să culeagă flori.',
        'A fost de și-a cumpărat un costum: de ține locul lui să. M-am adăpostit să scap de ploaie conține o finală. Nu o confunzi cu cauzala: să scap spune scopul. Cauza ar fi pentru că ploua.',
        'Pe un rând original, Duc făina ca să coacă pâinea, ca să este locuțiune conjuncțională. Versul cu furnici nu se lipește.',
        'De-asta a strigat, ca să fim atenți: virgula ține de perechea de-asta ca să. Fără pereche, să după regentă nu cere virgulă.'
      ].join('\n\n'),
      example: [
        'A mers în grădină să culeagă flori. Finala: să culeagă flori. Elementul: să. Stă după regentă, fără virgulă.',
        'Ca să afle ora, a deschis afișul: finala stă înainte și ia virgulă. M-am adăpostit să scap de ploaie este finală. M-am adăpostit pentru că ploua este cauzală.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'A cules flori ca să facă o coroniță. Finala: ca să facă o coroniță. A repetat mult pentru ce are de interpretat. Elementul: pentru ce, pronume cu prepoziție.'
        }
      ],
      practice: [
        '1) Transcrie finala din A mers în grădină să culeagă flori.',
        '2) Spune felul lui M-am adăpostit să scap de ploaie.',
        '3) Unde pot sta să și de: înainte sau numai după regentă?',
        '4) Construiește o finală cu ca să.'
      ].join('\n\n'),
      answers: [
        'să culeagă flori',
        'circumstanțială finală',
        'numai după regentă',
        'Citește ca să afli ora.'
      ],
      mistakes: 'Să scap de ploaie nu este cauză. Pentru că ploua nu este scop. De aceea cere virgulă când stă în regentă.',
      tryThis: 'Construiește o finală cu pentru ca să și una cu pentru ce. Transcrie și de și-a cumpărat un costum, cu elementul.',
      keyPoints: [
        'Finala răspunde la cu ce scop. Ca să, să și pentru ca să o introduc.',
        'Să și de stau numai după regentă. De aceea și de-asta cer virgulă.',
        'Să scap de ploaie este scop. Pentru că ploua este cauză.'
      ]
    }),
    lesson({
      id: 'preferinte',
      title: 'Opinia, fără pleonasm',
      kind: 'redactare',
      boxes: [
        {
          type: 'atentie',
          title: 'Două dublări',
          text: 'În opinia mea, eu consider se scurtează la una dintre formule. Dar și totuși nu stau împreună. Nu am preferințe, dar totuși îmi place mai mult se curăță.'
        }
      ],
      theory: [
        'Verbe de opinie: a considera, a crede, a presupune. Adverbe: probabil, desigur, fără îndoială. Poți sprijini opinia pe o circumstanțială de mod, de cauză sau de scop.',
        'Conectorii: în primul rând, în al doilea rând, de fapt, prin urmare, în concluzie, așadar, însă, totuși. Construcțiile concesive și condiționale se pomenesc, dar nu se exersează ca item de subordonată.',
        'Articolul semnat de Noni Alexa spune că, deși se anunță de ani buni că e-bookul va detrona cartea tipărită, preferințele cititorilor merg încă, masiv, spre cartea tipărită.',
        'Avantajele e-bookului, pe text: prețul este mult mai mic, îl iei pe loc, încape pe un dispozitiv, cu mii de titluri, fără praf și fără uzură. Limita: puțin peste 5 la sută dintre cititorii europeni aleg acest format.',
        'Sunt autori care publică unele romane doar digital. Exemplul dat este Paulo Coelho. Multe titluri tipărite nu sunt încă e-book.',
        'Ordinea unui text de opinie: întâi părerea, apoi primul argument, apoi al doilea, apoi limita, apoi concluzia. Conectorii din model: într-adevăr, pentru că, totuși, mai bine zis, dimpotrivă, așadar.',
        'Însă arată un dezacord: Apreciez argumentele, însă eu tot cred că soluția mea este mai bună. Așa că arată o urmare, nu o cauză: vreau o carte care nu a apărut aici, așa că o cumpăr digital.',
        'Forma curată: Consider că este important să citești zilnic. Sau: În opinia mea, este important să citești zilnic. Îmi plac mai mult romanele istorice. Compunerea are cel puțin 150 de cuvinte.'
      ].join('\n\n'),
      example: [
        'Opinia articolului: cititorii preferă încă, masiv, cartea tipărită. Argument pentru e-book: prețul mic și descărcarea imediată. Argument contra: peste cinci la sută este puțin, iar multe titluri lipsesc.',
        'Forma curată: Consider că lectura zilnică contează. A doua: Îmi plac mai mult romanele istorice. Însă îl desparte pe cel care nu e de acord. Așadar închide.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Sunt de acord, într-adevăr cărțile digitale se descarcă imediat. Totuși nu citesc digital, mai bine zis nu vreau să rămân fără baterie. Așadar prefer cartea tipărită. Conectorii stau la început de idee, nu se înghesuie toți într-o propoziție.'
        }
      ],
      tryThis: 'Spune opinia articolului despre preferințele cititorilor. Notează două avantaje și limita de puțin peste 5 la sută. Spune că însă marchează dezacordul și că așa că marchează urmarea. Curăță cele două pleonasme din lecție.',
      keyPoints: [
        'Cititorii preferă încă cartea tipărită, deși e-bookul e mai ieftin și încape fără praf.',
        'Puțin peste 5 la sută dintre cititorii europeni aleg formatul digital.',
        'În opinia mea, eu consider este pleonasm. Însă arată dezacord. Așa că arată urmare.'
      ]
    }),
    lesson({
      id: 'recap-traditie',
      title: 'Cinci întrebări și o părere',
      kind: 'recapitulare',
      boxes: [
        {
          type: 'regula',
          title: 'Cinci întrebări',
          text: 'Unde dă locul. Când dă timpul. Cum dă modul. Din ce cauză dă cauzala. Cu ce scop dă finala.'
        }
      ],
      theory: [
        'Începutul unității se închide pe o scenă, nu pe foaia cu puncte. Sâmbătă, la Cozia, Mara spune: Stau unde ghidul ne-a oprit. Am venit când s-a deschis poarta.',
        'Ascult cum povestește despre hram. Am rămas pentru că turnul se vede de pe drum. Am deschis caietul ca să notez anul 1418.',
        'Unde ghidul ne-a oprit este circumstanțială de loc. Când s-a deschis poarta este de timp. Cum povestește este de mod. Pentru că turnul se vede este cauzală. Ca să notez anul este finală.',
        'Hramul Coziei este Sfânta Treime. Mircea cel Bătrân a murit la 31 ianuarie 1418. Dacă cineva postează că zidul s-a prăbușit azi, verifici înainte să dai mai departe.',
        'Persuasiunea fără fapt este manipulare. Opinia de 50–100 de cuvinte nu cere conectori. Compunerea de 150 de cuvinte îi cere. Textul explicativ definește. Textul argumentativ alege o parte.',
        'După opinie urmează turismul cultural, ca plan scurt. Cele cinci feluri rămân metoda, nu o listă de citate.',
        'Dacă postezi că zidul a căzut azi, fără o sursă, repeți greșeala de la Sălăuța: emoție în loc de fapt. La Cozia, faptul verificabil este hramul și anul 1418.',
        'Opinia scurtă poate spune că merită să verifici. Nu are nevoie de așadar. Compunerea lungă îl poate folosi la încheiere.'
      ].join('\n\n'),
      example: [
        'Ce scrie: sâmbătă, Mara stă la Cozia, ascultă despre hram și notează anul morții lui Mircea. Ce vezi: o văd în curte, cu caietul deschis spre un turn.',
        'Eu aș întreba care este hramul, pentru că lecția spune Sfânta Treime și nu vreau să îl înlocuiesc cu altul. Anul din caiet este 1418.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Cinci transcrieri, pe scurt: unde ghidul ne-a oprit, loc. Când s-a deschis poarta, timp. Cum povestește, mod. Pentru că turnul se vede, cauză. Ca să notez anul, scop. Elementul intră în fiecare.'
        }
      ],
      tryThis: 'Transcrie cele cinci subordonate ale Marei și spune felul și elementul fiecăreia. Spune hramul și data de 31 ianuarie 1418. Scrie o opinie de 50–100 de cuvinte: merită ca un elev să verifice o postare despre un monument, cu un fapt din lecția despre Sălăuța sau din lecția despre Cozia.',
      keyPoints: [
        'Locul, timpul, modul, cauza și scopul se despart prin întrebare, nu prin primul cuvânt care seamănă.',
        'Cozia are hramul Sfânta Treime. Mircea cel Bătrân a murit la 31 ianuarie 1418.',
        'Opinia scurtă are părere, motiv și fapt. Compunerea lungă are și conectori.'
      ]
    }),
    lesson({
      id: 'turism-cultural',
      title: 'Orașul se luminează prin oameni',
      kind: 'comunicare',
      boxes: [
        {
          type: 'atentie',
          title: 'Plan scurt',
          text: 'Turismul cultural nu este item. Rămâne o opinie cu un fapt și o valoare pentru asociere. Anul care lipsește nu se inventează.'
        }
      ],
      theory: [
        'Sunt reprezentative taberele de limbă, festivalurile, circuitele prin muzee și pelerinajele: fiecare îl pune pe călător într-un loc sau într-o limbă care poartă o cultură.',
        'Timișoara și Banatul adună de generații peste 30 de culturi și mai multe confesiuni. În 2016 orașul a câștigat titlul de Capitală Culturală Europeană pentru anul 2021.',
        'Programul este un proces, nu un eveniment, și stă în jurul oamenilor. Sloganul este Luminează orașul prin tine. Metafora luminii vrea să spună că schimbarea pornește de la locuitor, nu de la un afiș.',
        'Festivalul Internațional George Enescu are loc din doi în doi ani. Corina Dima scrie că este prietenă cu festivalul de 18 ani. Ediția 2019: 23 de zile, 3 sau 4 concerte pe zi, peste 2.500 de muzicieni din 50 de naționalități, 84 de concerte și recitaluri, 32 de lucrări de George Enescu.',
        'Peste 400 de evenimente asociate, dintre care 100 în Piața Festivalului. În 2013, organizatorii dau peste 20.000 de turiști străini, timp de trei săptămâni, în București.',
        'Elena Badea mai numește festivaluri de la Mamaia și de la Cluj-Napoca. Bilbao, în Țara Bascilor, este modelul ei: Muzeul Guggenheim. În anii 1990 șomajul era în jur de 25 la sută.',
        'Planul de revitalizare, de 700 de milioane de dolari, a păstrat 4.400 de locuri de muncă și a adăugat peste 1.000 de locuri cu program complet. Numărul de turiști a crescut de opt ori de la deschiderea muzeului.',
        'Activ, în text, înseamnă o resursă care poate aduce un folos mai târziu. Entertainment înseamnă divertisment. Broșura de târg spune regiunea, când are loc obiceiul, ce înseamnă și de ce merită dus mai departe.'
      ].join('\n\n'),
      example: [
        'Opinie: un festival poate ține un oraș viu. Faptul: în 2019, Festivalul Enescu a avut 84 de concerte și muzicieni din 50 de naționalități, iar în 2013 a adus peste 20.000 de turiști străini în București.',
        'Sloganul din Timișoara mută lumina în om, nu în clădire. Bilbao arată același mecanism cu un muzeu: 4.400 de locuri păstrate și peste 1.000 noi.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Valoare pentru asociere: o cultură circulă când oamenii se întâlnesc în jurul ei. O frază ajunge. Nu se copiază lista de orașe ca să pară compunere.'
        }
      ],
      tryThis: 'Notează anul 2016, anul 2021 și sloganul Timișoarei. În 30–50 de cuvinte, comentează sloganul numai cu faptele din lecție. Scrie cifrele ediției 2019 și cifra din 2013. Spune de ce Bilbao este model: șomajul, suma, locurile de muncă, înmulțirea turiștilor.',
      keyPoints: [
        'Timișoara a câștigat în 2016 titlul pentru 2021. Sloganul este Luminează orașul prin tine.',
        'Festivalul Enescu are loc din doi în doi ani. În 2019: 84 de concerte și peste 2.500 de muzicieni.',
        'La Bilbao, muzeul a înmulțit turiștii de opt ori și a adăugat peste 1.000 de locuri de muncă.'
      ]
    })
  ]
};

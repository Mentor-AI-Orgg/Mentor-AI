'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(fields) {
  return romanaLesson(fields);
}

module.exports = {
  id: 'recapitulare-initiala',
  title: 'Recapitulare inițială',
  inOwnWords: 'Patru lecții deschid anul. Închizi vacanța în șase tipare la persoana I și într-o scrisoare. Descrii toamna de la fereastră ca tablou. Repeți silaba, omonimul și verbul a fi. La final alegi ce rămâne în ghiozdan. Scenele stau scrise în lecție. La clasă, pașii se aplică pe textul deschis.',
  toc: [
    'Jurnalul vacanței și scrisoarea',
    'Toamna de la fereastră',
    'Silaba, omonimul și verbul a fi',
    'Ghiozdanul primei zile'
  ],
  glossary: [
    {
      term: 'scrisoare',
      meaning: 'Text cu locul și data în dreapta sus, o adresare cu virgulă, cuprins și o formulă de încheiere urmată de semnătură.'
    },
    {
      term: 'tablou',
      meaning: 'Descriere a unui loc, nu a feței unui om.'
    },
    {
      term: 'hiat',
      meaning: 'Două vocale alăturate, rostite în silabe diferite.'
    }
  ],
  lessons: [
    lesson({
      id: 'jurnal-vacanta',
      title: 'Vacanța, în șase fraze și într-o scrisoare',
      kind: 'redactare',
      boxes: [
        {
          type: 'regula',
          title: 'Șase tipare',
          text: 'Jurnalul se scrie la persoana I, cu șase începuturi. Scrisoarea de închidere pune locul și data sus, în dreapta, adresarea cu virgulă, cuprinsul, încheierea și semnătura.'
        }
      ],
      theory: [
        'Vacanța se povestește prin șase începuturi, toate la persoana I.',
        'Întâiul este Am învățat că. Urmează Am reușit să, apoi Am descoperit.',
        'Al patrulea este Am înțeles că. Al cincilea este Cea mai frumoasă experiență am trăit-o. La final stă Important este că.',
        'Scena este bucătăria, duminică seara. Cartea de vară stă închisă pe masă, lângă un ghiozdan fără caiete.',
        'Am învățat că lectura se oprește când tu închizi volumul. Am reușit să o duc până la capăt.',
        'Am descoperit liniștea serii de duminică. Am înțeles că școala începe a doua zi.',
        'Cea mai frumoasă experiență am trăit-o afară, în iarba curții, cu volumul desfăcut. Important este că ghiozdanul fără caiete așteaptă foi noi.',
        'Faci trei pași, în ordine: ce este scris, ce vezi cu Văd la început, ce ai face tu cu motivul prin pentru că.',
        'Ionel Teodoreanu, avocat și romancier, a trăit din 1897 până în 1954.',
        'În 1919 a debutat în revista Însemnări literare. Poemul se numea Jucării pentru Lily.',
        'Debutul de editură este volumul de nuvele Ulița copilăriei, din 1923.',
        'Între 1924 și 1928 a scris trilogia La Medeleni, în revista Viața românească, cu întâmplări luate și din viața lui.',
        'În text, violă numește un instrument cu coarde. Este mai mare decât vioara și are sunetul mai grav.',
        'Cromolitografia este o imprimare în mai multe culori. Tălmăcitor înseamnă traducător.',
        'Locul și data stau sus, în dreapta. Adresarea, cu virgulă, stă la mijloc, sus.',
        'Cuprinsul ține introducerea, mijlocul și încheierea. Pui o descriere scurtă și emoția legată de despărțirea de locul verii.',
        'Formula de încheiere se pune în dreapta, iar semnătura urmează imediat.'
      ].join('\n\n'),
      example: [
        'Ce scrie: Seara de duminică găsește cartea de vară închisă, pe masa din bucătărie, lângă ghiozdanul fără caiete.',
        'Ce vezi: Văd volumul închis și ghiozdanul fără caiete, ambele pe masă.',
        'Eu aș așeza un caiet nou în ghiozdan, pentru că școala începe a doua zi, iar locul din el este gol.',
        'Primul volum al lui Teodoreanu, Ulița copilăriei, a apărut în 1923.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Iași, 14 septembrie stă sus, în dreapta. Urmează Dragă mamă, cu virgulă. În cuprins: curtea a rămas verde, iar seara era liniștită. Îmi pare rău de despărțire. În dreapta: Cu drag, apoi semnătura Ana.'
        }
      ],
      tryThis: [
        'Pe scena din bucătărie, umple cele șase începuturi, cu alte vorbe între ele: Am învățat că, apoi Am reușit să, apoi Am descoperit, apoi Am înțeles că.',
        'Continuă cu Cea mai frumoasă experiență am trăit-o și închide cu Important este că. Adaugă trei fraze: ce este scris, ce vezi, ce ai face tu. Ce vezi pornește cu Văd, iar motivul stă cu pentru că.',
        'Compune o scrisoare, între 100 și 120 de cuvinte, despre cum te desparți de locul verii. Sus, în dreapta, pui locul și data. Dragă mamă se termină cu virgulă. Urmează două propoziții de descriere și o emoție, apoi Cu drag și semnătura.',
        'Nu relua un fragment din La Medeleni. Notează anii 1897 și 1954 ai lui Teodoreanu și intervalul 1924–1928, când trilogia a apărut în fragmente.'
      ].join('\n\n'),
      keyPoints: [
        'Cele șase începuturi se scriu la persoana I, iar scrisoarea își păstrează locul, data, virgula după adresare și semnătura.',
        'Teodoreanu a fost avocat și romancier: debutul din 1919 stă în Însemnări literare, iar Ulița copilăriei a apărut în 1923.',
        'Cei trei pași cer ce este scris, ce vezi deschis cu Văd și ce ai face tu, cu motivul legat prin pentru că.'
      ]
    }),
    lesson({
      id: 'toamna-de-la-fereastra',
      title: 'Tabloul de toamnă',
      kind: 'redactare',
      boxes: [
        {
          type: 'definitie',
          title: 'Tablou',
          text: 'Tabloul descrie un loc și adună imagini din natură. Portretul descrie chipul unui om.'
        }
      ],
      theory: [
        'Compunerea aceasta descrie toamna văzută de la fereastra camerei tale.',
        'Textul este tablou dacă arată un loc și strânge imagini ale naturii. Devine portret dacă arată chipul unui om.',
        'Poezia Toamna este scrisă de Octavian Goga. Rămâne tablou, fiindcă arată grădina atinsă de anotimp, iar nu chipul unui om.',
        'Versurile nu sunt copiate aici. La clasă numeri silabele pe rândul din fața ta, la fel ca în modelul de mai jos.',
        'Modelul este rândul Frunza cade pe fereastră. Îl tăiem în frun-za și ca-de, apoi pe, apoi fe-reas-tră.',
        'Grupul ea din fereastră face un singur sunet, deci este diftong. Rândul ajunge astfel la opt silabe.',
        'Șura este o construcție anexă, așezată lângă gospodăria de la țară.',
        'Șindrila este o scândurică îngustă, din brad și subțire, pusă pe acoperiș.',
        'Scena înlocuiește poezia. De la fereastra camerei se văd iarba udă și nucul bătrân. Mai departe stau șopronul și șindrila care lipsește de pe acoperiș.',
        'Iarba udă este epitet: udă stă lângă iarbă și o caracterizează.',
        'Nucul tremură este personificare, fiindcă tremurul este o acțiune omenească dată copacului.',
        'Comparația este Iarba este ca un covor rece, pentru că în ea apare ca.',
        'O creangă care scârțâie dă imaginea auditivă, fiindcă sunetul se aude. Emoția este liniștea tristă.',
        'Elementele de peisaj sunt patru: iarba, nucul, șopronul, șindrila. Tema este toamna. Din natură alegi iarbă, nuc și creangă.',
        'Sub compunere scrii numele figurilor, ca să se vadă că le recunoști.',
        'Și de aici faci trei pași. Spui ce este scris, apoi ce vezi, cu Văd la început, apoi ce ai face tu, cu pentru că.'
      ].join('\n\n'),
      example: [
        'Ce scrie: De la fereastră apar iarba udă și nucul bătrân, care tremură. Șopronul are o șindrilă lipsă, iar o creangă scârțâie.',
        'Ce vezi: Văd iarba udă, apoi nucul și șopronul de unde lipsește o șindrilă.',
        'Aș închide fereastra, pentru că scârțâie o creangă și liniștea este tristă.',
        'Frunza cade pe fereastră numără opt silabe. Textul este un tablou, nu un portret.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Pe aceeași scenă, udă este epitetul, tremură este personificarea, ca leagă iarba de un covor rece, iar scârțâitul crengii este imagine auditivă. Emoția rămâne liniștea tristă.'
        }
      ],
      tryThis: [
        'Descrie toamna așa cum o vezi de la geamul camerei tale. Alege patru bucăți de peisaj, trei figuri de stil, fiecare de alt fel, și o emoție. Dedesubt, spune numele fiecărei figuri.',
        'Nu folosi nucul și șindrila din model. Pe scena lecției fă trei fraze: ce este scris, ce vezi, ce ai face tu. Deschide ce vezi cu Văd și leagă fapta prin pentru că.',
        'Arată de ce ai un tablou și nu un portret, numește tema și spune câte silabe are modelul Frunza cade pe fereastră. Definește șura și șindrila.'
      ].join('\n\n'),
      keyPoints: [
        'Tabloul arată un loc și imagini de natură, iar portretul arată un chip.',
        'În scena de la fereastră, epitetul stă la iarba udă, personificarea la nucul care tremură, comparația la ca, iar scârțâitul este auditiv.',
        'Modelul Frunza cade pe fereastră numără opt silabe, fiindcă ea este diftong. Șura numește anexa de la țară, iar șindrila numește scândurica subțire din brad.'
      ]
    }),
    lesson({
      id: 'recap-constructie',
      title: 'Silabe, omonime și verbul a fi',
      kind: 'limba',
      boxes: [
        {
          type: 'definitie',
          title: 'Hiat și diftong',
          text: 'Hiatul pune două vocale în silabe diferite. Diftongul și triftongul le țin în același sunet.'
        }
      ],
      theory: [
        'Lucrezi pe cuvintele date aici, nu pe un vers ținut minte.',
        'Argintie se taie ar-gin-ti-e, cu i-e în hiat. Creștet se taie creș-tet.',
        'Zdrențuită se taie zdren-țu-i-tă, cu u-i în hiat. Povestea se taie po-ves-tea, iar ea este diftong.',
        'Învie se taie în-vi-e, cu i-e în hiat. Hiat au, din seria aceasta, argintie, zdrențuită și învie.',
        'Geamuri are șapte litere și șase sunete, fiindcă ea este un diftong.',
        'La ochi, literele sunt o, c, h, i, deci patru, iar sunetele sunt o, ch, i, deci trei.',
        'Căciulă numără șapte litere și șase sunete. Sunetul ci este unul singur. Iu este diftong. Silabele sunt că-ciu-lă.',
        'La râdeau și la plângeau, grupul eau este triftong. La violoncele, io este diftong. La uitase, u-i este hiat, cu silabele u-i-ta-se.',
        'Omonimele păstrează aceeași formă, dar sensurile nu se nasc unul din celălalt.',
        'În Puiul stă în cuib, pui este puiul păsării. În Eu pui cartea pe bancă, pui este verbul a pune.',
        'În Am milă de pui, milă este sentimentul. În Drumul are o milă, milă este o unitate de lungime.',
        'A fi este auxiliar când ajută un timp sau diateza pasivă. O arată Am fost plecat.',
        'A fi este copulativ: leagă subiectul de numele predicativ. O arată Sunt bucuros.',
        'Enunțul interogativ sună Unde te uiți, iar răspunsul este În grădină. Aici, în grădină este un complement circumstanțial de loc.',
        'Propoziția asertivă sună Copacul din curte este un nuc. Acolo, nuc este nume predicativ.',
        'Râdeau stă la indicativ imperfect. Primiră stă la indicativ, perfect simplu. Să plece stă la conjunctiv prezent.',
        'La plural, forma dulci este gradul pozitiv. Forma mai dulci trece la comparativ de superioritate. Cele mai dulci urcă la superlativul relativ.',
        'La clasă pui aceleași etichete pe cuvintele subliniate.'
      ].join('\n\n'),
      example: [
        'Argintie se taie ar-gin-ti-e, fiindcă are hiat. La povestea, tăietura po-ves-tea are diftong. Ochi numără patru litere și trei sunete.',
        'În Am fost plecat, a fi este auxiliar. În Sunt bucuros, a fi este copulativ.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Întrebarea Unde te uiți? primește răspunsul În grădină, iar grupul este complement circumstanțial de loc. În Copacul din curte este un nuc, nuc este nume predicativ. Râdeau stă la imperfect, primiră la perfect simplu, să plece la conjunctiv prezent.'
        }
      ],
      practice: [
        '1) Desparte cuvintele argintie, creștet, zdrențuită, povestea, învie. Arată hiatul și arată diftongul.',
        '2) Câte litere și câte sunete au geamuri, ochi și căciulă? Cum se taie căciulă?',
        '3) Ce este eau în râdeau și în plângeau? Ce este io în violoncele? Ce este u-i în uitase?',
        '4) Ce valoare are a fi în Am fost plecat și în Sunt bucuros? La ce grad stau dulci, mai dulci și cele mai dulci?'
      ].join('\n\n'),
      answers: [
        'ar-gin-ti-e, hiat i-e; creș-tet; zdren-țu-i-tă, hiat u-i; po-ves-tea, diftong ea; în-vi-e, hiat i-e',
        'geamuri: 7 litere, 6 sunete; ochi: 4 litere, 3 sunete; căciulă: 7 litere, 6 sunete, silabe că-ciu-lă',
        'eau este triftong la râdeau și la plângeau; io este diftong la violoncele; u-i este hiat la uitase, silabe u-i-ta-se',
        'Am fost plecat: auxiliar; Sunt bucuros: copulativ; dulci este pozitiv; mai dulci este comparativ de superioritate; cele mai dulci este superlativ relativ'
      ],
      mistakes: 'Nu confunda diftongul ea din povestea cu hiatul. La ochi, ch este un singur sunet. Auxiliarul din Am fost plecat nu este copulativul din Sunt bucuros. Mai dulci este comparativ de superioritate, iar cele mai dulci este superlativ relativ.',
      tryThis: [
        'Scrie patru enunțuri: pui pasăre, pui verb, milă sentiment, milă ca unitate de lungime.',
        'Pune o întrebare al cărei răspuns, în grădină, să fie circumstanțial de loc. Într-un enunț asertiv, fă din nuc un nume predicativ.',
        'Dă modul și timpul la râdeau, la primiră și la să plece.'
      ].join('\n\n'),
      keyPoints: [
        'Hiatul desparte vocalele în silabe, iar diftongul și triftongul le țin împreună.',
        'Pui și milă sunt omonime: aceeași formă, sensuri fără legătură între ele.',
        'În Am fost plecat, a fi ajută un timp, deci este auxiliar. În Sunt bucuros leagă numele predicativ, deci este copulativ.'
      ]
    }),
    lesson({
      id: 'prima-zi',
      title: 'Ce rămâne în ghiozdan',
      kind: 'redactare',
      boxes: [
        {
          type: 'atentie',
          title: 'Alegere, nu listă',
          text: 'Prima zi se scrie prin ce păstrezi și ce lași acasă. Fiecare obiect are un motiv, într-o propoziție întreagă.'
        }
      ],
      theory: [
        'Prima zi de școală se rezolvă printr-o alegere. O listă copiată nu ajunge.',
        'În ghiozdanul de anul trecut stăteau trei lucruri, nu o grămadă nealeasă.',
        'Unul era un caiet albastru. Altul era un creion scurt. Al treilea era harta vacanței, îndoită în patru.',
        'Din ele păstrez caietul albastru. Motivul este că notițele din el încă se pot citi.',
        'Harta îndoită rămâne acasă. Vacanța s-a închis în seara de duminică, la masa din bucătărie, și harta ține de acea închidere.',
        'Creionul scurt îl iau numai dacă mai scrie pe hârtie. Altfel rămâne și el acasă.',
        'Răspunsul este creativ când numești un obiect păstrat și unul lăsat acasă, fiecare cu motivul lui, legat de o faptă deja spusă.',
        'Dacă lucrezi chiar pe scena aceasta, nu adăuga un obiect care nu apare în ea.',
        'Când povestești propriul ghiozdan, lucrurile pot veni din viața ta. Motivul rămâne, însă, o propoziție întreagă, nu un singur cuvânt.',
        'Din scena ghiozdanului faci tot trei pași. Spui ce este scris. Spui ce vezi, iar propoziția începe cu Văd. Spui ce ai face tu și pui motivul cu pentru că.',
        'O propoziție întreagă are verb și un motiv. De exemplu: păstrez caietul, pentru că notițele încă se citesc. Nu ajunge să scrii doar caiet.',
        'Alegerea leagă obiectul de o faptă deja cunoscută: notițele se citesc, vacanța s-a închis, creionul mai scrie sau nu.',
        'Când lucrezi pe scena dată, cele trei obiecte sunt numai caietul, creionul și harta. Motivul fiecăruia trebuie să trimită la o faptă din scenă, nu la o poveste nouă.',
        'Textul tău de prima zi are șase până la opt rânduri. În el stau obiectul păstrat, obiectul lăsat și cele două motive, fiecare în propoziție.'
      ].join('\n\n'),
      example: [
        'Ce scrie: Anul trecut, ghiozdanul avea un caiet albastru, apoi un creion scurt și, separat, harta vacanței îndoită în patru.',
        'Ce vezi: Văd caietul albastru lângă creionul scurt și, mai departe, harta îndoită.',
        'Aș pune harta deoparte, pentru că vacanța s-a terminat duminică seara. Caietul albastru ar rămâne, fiindcă în el stau notițe.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Ana păstrează caietul albastru, pentru că notițele se citesc. Lasă harta îndoită acasă, pentru că vacanța s-a închis. Creionul scurt intră în ghiozdan numai dacă mai scrie.'
        }
      ],
      tryThis: [
        'Pe scena ghiozdanului, scrie trei propoziții separate: ce este scris, ce vezi și ce ai face tu. Ce vezi se deschide cu Văd. La al treilea pas folosește pentru că.',
        'Apoi scrie șase sau opt rânduri despre prima ta zi. Alege un lucru păstrat din anul trecut și unul lăsat, fiecare cu motivul lui.',
        'Poți folosi lucruri din viața ta. Nu relua lista cu caietul, cu creionul și cu harta.'
      ].join('\n\n'),
      keyPoints: [
        'Prima zi cere o alegere cu motiv, nu o înșiruire de obiecte.',
        'În scenă, caietul albastru se păstrează pentru notițe, iar harta îndoită se lasă odată cu vacanța terminată.',
        'Pașii sunt trei: ce este scris, ce vezi cu Văd și ce ai face tu, legat prin pentru că.'
      ]
    })
  ]
};

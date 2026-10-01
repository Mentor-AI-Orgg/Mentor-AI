'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(f){return romanaLesson(f);}

module.exports = {
  id: 'recapitulare-initiala',
  title: 'Recapitulare inițială',
  inOwnWords: 'Unitatea de început te pune să citești o scenă și să scrii jurnalul unei zile. Întâmplarea e așezată în lecție. Uneori primul text e din Cuore, de Edmondo de Amicis, iar al doilea e o poezie cu un pisoi. Titlul de la clasă poate să fie altul.',
  toc: [
    'Pagina de jurnal și prima zi',
    'Indicii de timp și de spațiu',
    'Silaba, sunetul și enunțul',
    'Banda desenată scurtă'
  ],
  glossary: [
    {
      term: 'pagină de jurnal',
      meaning: 'O zi scrisă la persoana I, cu data, o formulă de adresare și emoția trăită.'
    },
    {
      term: 'indice',
      meaning: 'Cuvântul care arată când sau unde se petrece fapta.'
    }
  ],
  lessons: [
    lesson({
      id: 'jurnal-prima-zi',
      title: 'Pagina de jurnal',
      kind: 'redactare',
      boxes: [
        {
          type: 'definitie',
          title: 'Pagina de jurnal',
          text: 'Notează o zi trăită, la persoana I. Are data, o adresare către jurnal, fapte la perfect compus, emoție sau observație la prezent și o descriere scurtă.'
        }
      ],
      theory: [
        'Jurnalul păstrează o experiență reală. Nu inventezi o întâmplare. Vorbești despre tine, deci stai la persoana I.',
        'Deschiderea are două semne. Întâi scrii ziua împreună cu data. Apoi pui o formulă de adresare, de pildă Dragă jurnalule.',
        'Verbele nu stau toate la un singur timp. Perfectul compus poartă fapta încheiată: am intrat, am așezat, am simțit.',
        'Prezentul poartă ce simți acum sau ce observi în jur. Așa se amestecă cele două timpuri în aceeași pagină de jurnal.',
        'Pe lângă fapte, spui emoția. Fără ea, textul rămâne o listă. O secvență descriptivă scurtă arată locul: miros, culoare, obiect.',
        'Două propoziții de descriere ajung. Alegi detalii pe care le poți verifica, nu podoabe lungi.',
        'Scena de lucru cade luni, pe 15 septembrie. Mara începe clasa a VI-a și are ghiozdanul nou.',
        'În sală se simte miros de cretă. Ea e bucuroasă, însă și un pic speriată. Pe bancă așază un caiet albastru.',
        'Din scenă lucrezi în trei pași, mereu în aceeași ordine. Întâi redai faptele, adică ce scrie.',
        'Al doilea pas e imaginea: ce vezi. Al treilea e hotărârea ta: ce ai face, legată prin pentru că de o faptă din text.',
        'Ce scrie nu primește părerea ta. Ce vezi nu adaugă lucruri care nu apar. Motivul de după pentru că se sprijină pe emoția sau pe gestul din scenă.'
      ].join('\n\n'),
      example: [
        'Ce scrie: data e luni, 15 septembrie. Mara pășește în clasa a VI-a, poartă ghiozdanul nou și lasă un caiet albastru pe bancă.',
        'Ce vezi: o văd în sală, cu ghiozdanul nou lângă ea și cu caietul albastru pe bancă. Miroase a cretă.',
        'Eu aș saluta un coleg, pentru că Mara e bucuroasă și, totodată, un pic speriată.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Ce scrie: mirosul de cretă umple sala, iar Mara simte bucurie amestecată cu teamă. Ce vezi: banca, caietul albastru, ghiozdanul nou. Eu aș sta lângă ea la prima oră, pentru că emoția ei e amestecată.'
        }
      ],
      tryThis: [
        'Compune jurnalul primei tale zile de școală, în 100–120 de cuvinte. Pornește cu data, apoi cu formula Dragă jurnalule.',
        'Rămâi la persoana I. Folosește un verb la perfect compus și unul la prezent. Descrie locul în două propoziții.',
        'La capăt alege o faptă chiar din textul tău și încheie cu tiparul Eu aș..., pentru că...'
      ].join('\n\n'),
      keyPoints: [
        'Data, adresarea și persoana I leagă jurnalul de o zi trăită, nu de o poveste făcută.',
        'Perfectul compus duce faptele, prezentul duce emoția sau observația, iar descrierea arată locul.',
        'Lucrezi în ordine: ce scrie, ce vezi, apoi ce ai face, cu motivul după pentru că.'
      ]
    }),
    lesson({
      id: 'indicii-recap',
      title: 'Timpul, spațiul și firul',
      kind: 'lectura',
      boxes: [
        {
          type: 'regula',
          title: 'Indicii și idee',
          text: 'Cine, unde, când și ce iese deschid înțelegerea. Indicele de timp fixează când. Cel de spațiu fixează unde. Tema e eticheta scurtă, iar ideea principală e propoziția cu cine face ce.'
        }
      ],
      theory: [
        'Ca să prinzi un text, întrebi pe rând cine ia parte, unde se petrece fapta, când se petrece și ce iese la urmă.',
        'Indicii de timp sunt cuvintele clipei: o zi, o parte a zilei, o oră. Indicii de spațiu sunt cuvintele locului.',
        'Tema este numele scurt al întâmplării, ca o etichetă de două-trei cuvinte. Nu povestește tot.',
        'Ideea principală e altceva: o propoziție. În ea spui cine face ce, fără amănunte de prisos.',
        'Comparația se recunoaște la cuvântul ca. El pune alături două lucruri, iar asemănarea se vede.',
        'Duminică dimineața dă timpul. Locul e grădina de lângă casă. Un pisoi mic se strecoară printre uluci.',
        'Era cât o floare, însă mustățile îi stăteau lungi. Fata îi dă lapte cald și îl numește Arpagic, fiindcă e mic.',
        'Tema poate fi Pisoiul din grădină. Ideea principală: fata găsește pisoiul, îi dă lapte cald și îl numește Arpagic.',
        'În scena pisoiului, asemănarea de mărime stă în cât o floare. Cuvântul ca e markerul obișnuit când două lucruri stau alături.',
        'Și aici ai trei pași. Redai ce scrie, construiești ce vezi, apoi alegi ce ai face. Ultimul pas se leagă cu pentru că.',
        'La pisoi, ce scrie adună ulucile, laptele cald și numele Arpagic. Ce vezi adună locul și cana. Hotărârea pleacă de la faptul că el e mic.',
        'Ce vezi pornește de la detalii din text. Nu aduci un obiect care nu apare. Indicele nu e tema: el spune când sau unde, nu cum se numește întâmplarea.'
      ].join('\n\n'),
      example: [
        'Ce scrie: duminică dimineața, pisoiul cel mic intră printre uluci. Locul e grădina de lângă casă. Fata îi dă lapte cald și alege numele Arpagic.',
        'Ce vezi: Văd ulucile, grădina, cana și pisoiul mic. Eu aș pune și eu puțin lapte, pentru că el e mic.',
        'Indice de timp: duminică dimineața. Indice de spațiu: grădina de lângă casă. Tema: pisoiul Arpagic. Asemănarea de mărime: cât o floare.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Mustățile lungi nu sunt ideea principală. Acelea sunt un detaliu. Ideea e că fata hrănește pisoiul mic și îi dă numele Arpagic. Mustățile doar îl descriu.'
        }
      ],
      tryThis: [
        'Sâmbătă, seara, băiatul găsește pe prispa casei o mănușă udă. Ea e rece ca gheața. El o așază la sobă.',
        'Scrie trei enunțuri: întâi ce scrie, apoi ce vezi, apoi ce ai face tu. Leagă ultimul cu pentru că.',
        'Ce vezi pornește cu Văd. Arată și care e comparația.'
      ].join('\n\n'),
      keyPoints: [
        'Indicele de timp fixează clipa, iar indicele de spațiu fixează locul întâmplării.',
        'Tema rămâne o etichetă scurtă. Propoziția despre cine și despre ce face e ideea principală.',
        'Markerul comparației e ca. Motivul tău se prinde de o faptă cu ajutorul lui pentru că.'
      ]
    }),
    lesson({
      id: 'recap-constructie',
      title: 'Silaba, sunetul și enunțul',
      kind: 'limba',
      boxes: [
        {
          type: 'regula',
          title: 'Silaba și sunetul',
          text: 'Silaba se spune dintr-o suflare și are o vocală. Litera e semnul de pe foaie. Sunetul e ce auzi. La duceam, grupul ce dă un singur sunet, așa că literele sunt mai multe.'
        }
      ],
      theory: [
        'Numără silabele după vocale rostite împreună, nu după câte litere vezi. O silabă, o vocală.',
        'Vacanța are trei silabe, anume va-can-ța. Tăietura cade după va și după can.',
        'Dimineață are patru silabe: di-mi-nea-ță. Grupul nea rămâne într-o singură silabă.',
        'Teatru are două silabe: tea-tru. Grupul tea nu se rupe în două.',
        'Litera și sunetul nu coincid mereu. Litera se vede. Sunetul se aude.',
        'În duceam, grupul ce se aude ca un singur sunet. De aceea literele întrec sunetele la număr.',
        'Cuvintele unei teme formează câmpul lexical. La școală stau împreună ghiozdan, caiet și bancă. Un pisoi nu intră aici.',
        'Enunțul asertiv spune o faptă și se oprește cu punct. El informează, nu întreabă și nu strigă.',
        'Enunțul exclamativ arată o emoție puternică. Se oprește cu semnul exclamării.',
        'Forma interogativă schimbă spusa în întrebare. La capăt pui semnul întrebării.',
        'Subiectul arată cine face acțiunea, adică autorul faptei.',
        'Atributul se așază lângă un substantiv și răspunde la care.',
        'Pozitivul e forma simplă. Comparativul de superioritate adaugă mai. Superlativul adaugă cel mai.'
      ].join('\n\n'),
      example: [
        'Vacanța se taie va-can-ța. Dimineață se taie di-mi-nea-ță. Teatru se taie tea-tru.',
        'De câmpul școlii țin ghiozdanul, caietul și banca. Azi începe școala e enunț asertiv: spune o faptă și are punct.',
        'Ce zi lungă! e enunț exclamativ. Întrebarea scoasă din el este Ce zi este azi?',
        'În Musafirul a intrat, musafirul este subiect. În Musafirul mic, cuvântul mic este atribut.',
        'Laptele cald e pozitiv. Laptele mai cald e comparativ de superioritate. Laptele cel mai cald e superlativ.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Pozitivul nu are mai și nici cel mai. Dacă scrii mai cel mai cald, ai amestecat cele două trepte. Corect la superlativ e cel mai cald.'
        }
      ],
      practice: [
        '1) Desparte vacanța, dimineață și teatru. La fiecare scrie câte silabe are.',
        '2) Notează trei cuvinte din câmpul școlii. Compune un enunț asertiv, unul exclamativ și întrebarea obținută din cel exclamativ.',
        '3) Formulează o propoziție în care musafir e subiect și una în care musafir e atribut.',
        '4) Pentru lapte, scrie treapta pozitiv, apoi comparativul de superioritate și, separat, superlativul.'
      ].join('\n\n'),
      answers: [
        'va-can-ța, trei silabe; di-mi-nea-ță, patru silabe; tea-tru, două silabe.',
        'ghiozdan, caiet, bancă. Azi începe școala. Ce zi lungă! Ce zi este azi?',
        'Musafirul a intrat. La Musafirul mic, mic este atribut.',
        'lapte cald; lapte mai cald; lapte cel mai cald.'
      ],
      mistakes: [
        'Nu rupe nea din dimineață și nu rupe tea din teatru. În duceam, nu număra ce ca două sunete.',
        'Nu pune punct după o emoție puternică și nu uita semnul întrebării când întrebi. Subiectul face fapta, atributul doar spune care.',
        'La superlativ se scrie cel mai, nu mai cel mai.'
      ].join('\n\n'),
      tryThis: [
        'Verifică tăieturile va-can-ța, di-mi-nea-ță și tea-tru și spune numărul de silabe.',
        'Pentru Azi începe școala. și pentru Ce zi lungă!, numește felul enunțului. Din a doua fă întrebarea Ce zi este azi?'
      ].join('\n\n'),
      keyPoints: [
        'Silaba cere o vocală, iar litera scrisă nu e totuna cu sunetul auzit.',
        'Câmpul lexical adună o temă, iar semnul de la final arată dacă spui, exclami sau întrebi.',
        'Subiectul face fapta, atributul lămurește substantivul, iar gradele urcă prin mai și prin cel mai.'
      ]
    }),
    lesson({
      id: 'banda-scurta',
      title: 'Trei cadre',
      kind: 'redactare',
      boxes: [
        {
          type: 'atentie',
          title: 'Trei cadre',
          text: 'O bandă desenată scurtă povestește o întâmplare prin cadre așezate în ordine. Desenul stă în cadru, vorba stă în bulă, sunetul stă lângă mișcare. Ajung trei: intrarea, fapta, încheierea.'
        }
      ],
      theory: [
        'Banda desenată scurtă ține o singură întâmplare. O citești dintr-o parte în alta, cadru după cadru, fără să sari.',
        'Ordinea e firul. Dacă pui încheierea înaintea intrării, cititorul nu mai știe ce s-a întâmplat.',
        'Cadrul e chenarul. În el stă desenul: cine e acolo, unde se află, ce gest face.',
        'Desenul arată. Nu trebuie să scrii totul. Dacă se vede cana, nu mai explici în cuvinte lungi că există o cană.',
        'Bula e locul vorbirii. Acolo intră ce spune personajul, scurt, ca să rămână loc pentru desen.',
        'O bulă nu e un sunet de mișcare. Vorba are un vorbitor. Sunetul marchează zgomotul unui gest.',
        'Lângă o mișcare poți așeza un sunet, de pildă poc sau miau. El stă lângă gest, nu în locul replicii.',
        'Miau poate fi strigătul pisoiului, deci bulă, sau zgomotul lui, deci sunet. Te uiți unde îl pui.',
        'Ultimul cadru închide întâmplarea. Nu deschide o faptă nouă. Lasă un rezultat clar.',
        'Trei cadre sunt de ajuns. Primul e intrarea: cine apare și unde. Al doilea e fapta. Al treilea e încheierea.',
        'Intrarea nu rezolvă nimic. Ea doar deschide. Fapta schimbă situația. Încheierea arată ce rămâne după schimbare.',
        'La pisoi, intrarea e sosirea în grădină. Fapta e laptele pus de fată. Încheierea e rămânerea lui acolo.',
        'La sunet alegi un cuvânt scurt, poc, miau sau clip. Nu scrii o propoziție în locul zgomotului.',
        'Înainte să predai banda, verifici patru lucruri: desen în fiecare cadru, bulă cu vorbă, sunet la mișcare, final care închide.'
      ].join('\n\n'),
      example: [
        'Cadrul 1 e intrarea: pisoiul ajunge în grădină, iar bula zice Miau.',
        'Cadrul 2 e fapta: fata toarnă lapte, iar lângă cană apare clip.',
        'Cadrul 3 e încheierea: pisoiul rămâne, iar bula zice Rămâi.',
        'Firul citit e intrare, apoi faptă, apoi încheiere. Nimic nu se mută din loc.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Clip nu intră în bula fetei, fiindcă nu e o vorbă, ci sunetul laptelui. Rămâi e vorbă, deci stă în bulă, în cadrul care închide. Miau din primul cadru e strigătul pisoiului.'
        }
      ],
      tryThis: [
        'Desenează trei cadre cu pisoiul din grădină. În fiecare pui o bulă scurtă.',
        'În cadrul al doilea adaugi și un sunet de mișcare, lângă gest.',
        'Cadrul din urmă arată că pisoiul rămâne. Nu mai deschide o altă întâmplare.'
      ].join('\n\n'),
      keyPoints: [
        'Cadrele merg în ordine: desenul stă în cadru, iar vorba stă în bulă.',
        'Sunetul de lângă mișcare, cum e poc sau miau, nu se confundă cu vorba din bulă.',
        'Trei cadre acoperă intrarea, fapta și încheierea, iar ultimul lasă rezultatul.'
      ]
    })
  ]
};

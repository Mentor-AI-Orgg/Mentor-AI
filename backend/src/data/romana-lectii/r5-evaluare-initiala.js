'use strict';

const { romanaLesson } = require('../lessonBuilder');

function lesson(f){return romanaLesson(f);}

module.exports = {
  id: 'evaluare-initiala',
  title: 'Evaluare inițială',
  inOwnWords: 'La început înveți să citești o scenă scurtă pe care nu ai pregătit-o. Scena stă scrisă în lecție. Uneori textul poartă titlul D-l Goe…, de I.L. Caragiale. La școală titlul poate fi altul: redai faptele, descrii imaginea și spui hotărârea ta.',
  toc: [
    'Evaluare inițială (D-l Goe…, de I.L. Caragiale, text-suport)'
  ],
  glossary: [
    {
      term: 'text-suport',
      meaning: 'Textul pe care se sprijină întrebările. Îl citești înainte să răspunzi.'
    },
    {
      term: 'informație esențială',
      meaning: 'Fără ea, nu mai știi ce s-a întâmplat.'
    }
  ],
  lessons: [
    lesson({
      id: 'text-suport',
      title: 'Textul-suport și esențialul',
      kind: 'lectura',
      boxes: [
        {
          type: 'definitie',
          title: 'Esențial și detaliu',
          text: 'Textul-suport e fragmentul de la evaluarea de început. Îl citești ca să arăți că pricepi un text necunoscut. Esențialul spune cine, ce face și ce rezultă. Detaliul doar colorează.'
        }
      ],
      theory: [
        'Evaluarea de la început nu verifică ce ai ținut minte din vacanță. Ea arată felul în care citești acum, pe un text pe care nu l-ai exersat acasă.',
        'Schița D-l Goe… îi aparține lui Ion Luca Caragiale. Aici nu o povestim întreagă: înveți numai la ce folosește textul-suport.',
        'Prima lectură îți arată personajele și fapta. A doua desparte ce ține povestea de amănuntul care doar o înveselește.',
        'Un amănunt poate fi haina, strigătul sau locul. Fără el, firul rămâne întreg. Cu el, scena doar prinde viață.',
        'Întrebările vin după citire, nu înaintea textului. Dacă pasajul îți scapă, recitești. Nu adaugi o faptă născocită.',
        'Informația esențială e bucata fără de care întâmplarea se destramă. Ea spune cine e în scenă, ce face și ce iese la capăt.',
        'Detaliul dă culoare. Esențialul susține povestea și nu poate fi înlocuit de o haină sau de o exclamație.',
        'Tema se spune într-o etichetă scurtă: o călătorie, o răsfățare ori o lecție de purtare. Nu rezumă tot ce s-a întâmplat.',
        'Ideea principală e propoziția care arată cine face fapta. La evaluare nu transcrii fragmentul întreg și nu lași un singur adjectiv în loc de idee.',
        'Opinia ta urmează faptelor. Nu le înlocuiește. Dacă nu poți arăta locul din text, cauți din nou, în loc să inventezi.',
        'Băiatul, ajuns la gară, cere locul de la geam. Mama îl anunță că locul e deja ocupat. El scoate o exclamație puternică.',
        'Trenul pleacă și îi lasă pe peron. Haina albastră e detaliu: nuanța nu schimbă încurcătura.',
        'Tema scenei e o lecție de purtare. Ideea principală sună așa: copilul ține la locul de la geam și, din cauza asta, pierde trenul.',
        'Pe scena aceasta lucrezi în trei timpi. Întâi redai faptele scrise. Apoi descrii imaginea. La urmă alegi o faptă a ta, prinsă cu pentru că.'
      ].join('\n\n'),
      example: [
        'Ce scrie: băiatul, în gară, cere locul de la geam. Mama răspunde că locul e ocupat. El strigă, iar trenul pleacă fără ei.',
        'Ce vezi: peronul, băiatul îmbrăcat în albastru, mama lângă el și trenul gata să plece.',
        'Eu aș fi stat lângă mama, fără strigăt, pentru că locul de la geam era deja luat.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Dacă scrii doar albastru, ai lăsat un adjectiv și ai pierdut firul. Esențialul e că băiatul cere locul de la geam, mama spune că e ocupat, el strigă, iar trenul pleacă fără ei. Culoarea hainei poate lipsi.'
        }
      ],
      tryThis: [
        'Fata, în parc, cere înghețată înainte de masă. Tatăl îi amintește că masa vine întâi. Ea scoate o exclamație, iar cutia cu înghețată rămâne închisă.',
        'Eșarfa verde e detaliu: culoarea nu mută firul. Tema e o răsfățare. Ideea principală: fata cere înghețată și nu o primește.',
        'Compune trei enunțuri separate: unul pentru ce scrie, unul pentru ce vezi și unul pentru ce ai face tu, legat prin pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'La evaluarea de început arăți cum citești un text nou, nu ce ai memorat din vacanță.',
        'Esențialul ține firul, adică cine, faptă și rezultat, iar haina, strigătul sau locul rămân amănunte.',
        'Tema e eticheta scurtă, ideea principală e propoziția, iar părerea se sprijină pe o faptă din text.'
      ]
    }),
    lesson({
      id: 'intentie',
      title: 'Intenția și răspunsul scurt',
      kind: 'comunicare',
      boxes: [
        {
          type: 'regula',
          title: 'Intenția, pe scurt',
          text: 'Intenția e scopul vorbitorului dintr-o replică, nu șirul de cuvinte. O spui în patru sau cinci cuvinte simple, de pildă vrea să pară important.'
        }
      ],
      theory: [
        'Într-un dialog poți recunoaște patru scopuri: lauda de sine, o cerere, o scuză sau o poruncă. Cuvintele singure nu spun tot.',
        'Emoția se citește din ton, din repetare și din felul în care celălalt răspunde. O replică spusă de două ori, tare, nu e o simplă veste.',
        'Pe textul citit marchezi o replică. Intenția o formulezi scurt, fără un termen de liceu.',
        'Un răspuns politicos nu urcă tonul. Nu copiezi vocea ridicată a celuilalt. Rămâi liniștit și spui fapta.',
        'Răspunsul scurt și corect e o frază care răspunde la întrebare. Are o dovadă din text și închide ideea.',
        'După ce ai citit, scrii puțin și rămâi la obiect. O frază limpede bate un paragraf care ocolește întrebarea.',
        'Te verifici în trei puncte: ai pus o dovadă din text, scrisul se înțelege, ideea e închisă.',
        'Dacă ți se cere o părere, o prinzi de o faptă cu ajutorul lui pentru că. Fără motiv, părerea plutește.',
        'Proba de la început urmărește exact răspunsul acesta: scurt, scos din text și însoțit de un motiv.',
        'Radu, pe hol, repetă de două ori și cu voce tare că drumul îl știe el mai bine. Nu dă doar o veste. Vrea să pară important.',
        'Ana, liniștită, arată că pe hartă drumul e altul. Nu preia tonul ridicat. Ideea o închide într-o frază, iar dovada o ia din vorbele lui Radu.',
        'Ordinea rămâne aceeași. Redai faptele din text, descrii imaginea, apoi spui hotărârea ta, prinsă cu pentru că.'
      ].join('\n\n'),
      example: [
        'Ce scrie: Radu repetă de două ori, tare, că știe drumul mai bine. Ana rămâne liniștită. Harta, spune ea, arată alt drum. Nu urcă tonul.',
        'Ce vezi: holul, Radu cu vocea ridicată, harta deschisă și Ana lângă el.',
        'Aș păstra vocea joasă, pentru că Ana rămâne calmă și se sprijină pe hartă, nu pe tonul ridicat.'
      ].join('\n\n'),
      extraExamples: [
        {
          title: 'Încă un exemplu',
          text: 'Intenția lui Radu, în cinci cuvinte: vrea să pară important. Dovada e repetarea tare. Ana nu îi copiază vocea. Ea închide răspunsul cu harta, care arată un drum diferit.'
        }
      ],
      tryThis: [
        'Ioana, la masă, repetă de două ori, pe ton ridicat, că răspunsul l-a găsit ea. Intenția ei e să se laude.',
        'Mihai, politicos, îi spune că se bucură. Nu îi copiază tonul. Ideea lui stă într-o frază scurtă, închisă.',
        'Notează trei propoziții: ce scrie, ce vezi, ce ai face tu. Ultima o legi cu pentru că.'
      ].join('\n\n'),
      keyPoints: [
        'Intenția e scopul replicii, spus în câteva cuvinte simple, iar emoția stă în ton, în repetare și în răspunsul celuilalt.',
        'Răspunsul bun e scurt, are o dovadă din text și închide ideea, iar părerea se leagă de o faptă.',
        'Un răspuns politicos lasă tonul ridicat deoparte și nu îl urcă la loc.'
      ]
    })
  ]
};

// Foaia EN 2026 de limba română (modele / simulări bacplus, barem CNPEE):
// I A 38p + I B 32p + II 20p + oficiu 10. Textele sunt originale.
// Textul 1 poate fi versuri sau narațiune; textul 2 e nonliterar.

const NOVEL_HINT =
  'Poți porni de la o carte citită la gimnaziu (Amintiri din copilărie, Povestea lui Harap-Alb, Dumbrava minunată, Toate pânzele sus! sau alta). O valoare comună + un fapt din opera ta + un fapt din fragment.';

const ASSOCIATE_TOKENS = [
  'amintiri', 'creanga', 'creangă', 'harap', 'dumbrava', 'sadoveanu', 'tudoran', 'pânze', 'panze',
  'prieten', 'familie', 'curaj', 'grij', 'natur', 'copil', 'bunici', 'bunic', 'onest', 'adevăr', 'adevar',
  'responsabil', 'învățătur', 'invatatur', 'lectur', 'carte', 'roman', 'poveste', 'oper'
];

function wordCount(text) {
  return String(text || '').trim().split(/\s+/).filter(Boolean).length;
}

const IA_INTRO =
  'Citește cele două texte-suport. Textul 1 poate fi versuri sau narațiune; textul 2 e nonliterar. Itemul 1 se notează. Itemii 2–4 sunt grile. Itemul 5: adevărat / fals (6 enunțuri). Itemii 6–9 se scriu aici, cu număr de cuvinte vizibil.';

const IB_INTRO =
  'Gramatică pe fragmente din texte. Itemii 1–4 sunt grile (câte 2 puncte). Itemii 5–8 se scriu (câte 6 puncte): valoare morfologică, alcătuire de propoziții, subordonate, rescriere corectă.';

const II_INTRO =
  'Compunere, ca la examen: o scrii în caiet, de mână, minimum 150 de cuvinte. Aici NU o tastezi. După predare poți fotografia pagina (maximum 3 poze pe zi).';

function quotedWord(prompt, fallback) {
  const match = String(prompt || '').match(/[„"]([^”"]+)[”"]/);
  return (match && match[1]) || fallback;
}

function typoMessage(nonText) {
  const line = String(nonText || '')
    .split('\n')
    .map(row => row.trim())
    .find(row => row.length > 40 && !/^textul 2/i.test(row) && !/^•/.test(row));
  const sample = (line || 'Programul se deschide la 8:00 si se inchide la 16:00. Ghiozdanele sta in cuier.')
    .replace(/[Șş]/g, 'S')
    .replace(/[Țţ]/g, 'T')
    .replace(/\bși\b/gi, 'si')
    .replace(/\bîn\b/gi, 'in')
    .replace(/\bsunt\b/gi, 'sunt')
    .slice(0, 160);
  return `${sample.replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i')} Elevii trebuie sa respectă regula.`;
}

function tfFromMcq(aItems) {
  const byN = n => (aItems || []).find(item => item.n === n) || { extra: { choices: ['…', 'nu', 'nu', 'nu'] } };
  const choice = (item, idx) => (item.extra && item.extra.choices && item.extra.choices[idx]) || '';
  const a1 = byN(1);
  const a2 = byN(2);
  const a3 = byN(3);
  const a4 = byN(4);
  const a5 = byN(5);
  return [
    { text: `În textul 1, afirmația corectă este: ${choice(a1, 0)}.`, answer: true },
    { text: `În textul 1, afirmația corectă este: ${choice(a1, 1)}.`, answer: false },
    { text: `În textul 1, detaliul cerut este: ${choice(a2, 0)}.`, answer: true },
    { text: `Textul 2: ${choice(a3, 0)}.`, answer: true },
    { text: `În textul 2, afirmația corectă este: ${choice(a4, 2) || choice(a4, 1)}.`, answer: false },
    { text: `Un element comun celor două texte este: ${choice(a5, 0)}.`, answer: true }
  ];
}

function legacyToSpec(meta, lit, non) {
  const aItems = meta.aItems || [];
  const bItems = meta.bItems || [];
  const old = meta.barem || {};
  const poetry = meta.literaryKind === 'poetry';
  const transcribe = aItems.find(item => item.n === 6) || aItems[0];
  const mcq = [1, 2, 3].map(n => aItems.find(item => item.n === n)).filter(Boolean);
  const eight = aItems.find(item => item.n === 8) || {};
  const nine = aItems.find(item => item.n === 9) || {};
  const morphWord = quotedWord((bItems[1] || bItems[4] || {}).prompt, 'încă');
  const statements = tfFromMcq(aItems);
  const item6 = poetry
    ? {
      prompt: 'Precizează măsura versurilor din textul 1 (numărul de silabe) și tipul rimei (împerecheată / încrucișată / îmbrățișată). Motivează pe scurt, cu un exemplu de versuri alăturate.',
      minWords: 12,
      maxWords: 40,
      lines: '12–40 de cuvinte',
      answers: ['încrucișată', 'ABAB', '9–12 silabe', 'opt silabe', 'nouă silabe'],
      tokens: ['silab', 'incrucis', 'încruciș', 'abab', 'imperech', 'împerech', 'imbatis', 'îmbrățiș', 'masura', 'măsur', 'vers'],
      explain: 'Măsura = numărul de silabe; rima încrucișată e ABAB, împerecheată AABB, îmbrățișată ABBA. Ilustrezi cu două versuri alăturate.'
    }
    : {
      prompt: 'Menționează o trăsătură a tiparului textual din textul 1 (narativ / descriptiv / dialogat) și ilustreaz-o cu o secvență. Minimum două enunțuri.',
      minWords: 12,
      maxWords: 40,
      lines: '12–40 de cuvinte',
      answers: ['narativ', 'narațiune', 'descriptiv', 'dialog'],
      tokens: ['narativ', 'narati', 'narați', 'descript', 'dialog', 'secvent', 'secvenț', 'personaj', 'actiun', 'acțiun'],
      explain: 'Trăsătură a tiparului (narator, acțiune, personaje / imagine, detalii / replici) + o secvență din textul 1.'
    };

  const themeTokens = (old['Subiectul I A:5'] && old['Subiectul I A:5'].explain)
    ? String(old['Subiectul I A:5'].explain).toLowerCase().split(/\s+/).filter(w => w.length > 4).slice(0, 6)
    : ['grij', 'regul', 'loc'];

  const rewrite = typoMessage(non);
  const b5old = old['Subiectul I B:2'] || old['Subiectul I B:5'] || {};
  const bWriteBarem = {
    'Subiectul I B:5': {
      answers: [b5old.explain || morphWord, morphWord],
      tokens: [String(morphWord).slice(0, 6).toLowerCase(), 'adjectiv', 'adverb', 'substantiv', 'verb', 'atribut', 'predicat', 'nume'],
      explain: b5old.explain || `Valoarea morfologică a lui „${morphWord}”, ca în text.`,
      steps: ['Ce parte de vorbire e, în enunțul dat?']
    },
    'Subiectul I B:6': {
      answers: [morphWord],
      tokens: [String(morphWord).slice(0, 6).toLowerCase(), 'propozitie', 'propoziț'],
      explain: 'Două propoziții corecte, cu valori sau sensuri diferite.',
      steps: ['Două enunțuri', 'Valori diferite']
    },
    'Subiectul I B:7': {
      answers: ['care', 'că', 'să', 'când', 'unde'],
      tokens: ['care', 'ca ', 'că', 'sa ', 'să', 'cand', 'când', 'unde', 'subordon'],
      explain: 'O frază cu subordonată marcată (atributivă, completivă sau circumstanțială).',
      steps: ['Regent + subordonată']
    },
    'Subiectul I B:8': {
      answers: [rewrite.replace(/si /g, 'și ').replace(/in /g, 'în ')],
      tokens: ['și', 'în', 'sunt', 'stau', 'respectă', 'respecta'],
      explain: 'Rescrii mesajul corectând ortografia, diacriticele și acordul.',
      steps: ['Citești greșelile', 'Rescrii tot mesajul']
    }
  };

  return {
    id: meta.id,
    title: meta.title,
    generated: Boolean(meta.generated),
    literaryKind: poetry ? 'poetry' : 'prose',
    lit,
    non,
    transcribe: {
      prompt: transcribe.prompt || 'Notează, din textul 1, enunțul cerut.',
      minWords: 2,
      lines: transcribe.extra && transcribe.extra.lines ? transcribe.extra.lines : 'un enunț din text',
      answers: (old['Subiectul I A:6'] || {}).answers || [],
      tokens: (old['Subiectul I A:6'] || {}).tokens || [],
      explain: (old['Subiectul I A:6'] || {}).explain || 'Transcrii exact din textul 1.',
      steps: (old['Subiectul I A:6'] || {}).steps || ['Transcrii']
    },
    mcq: mcq.map((item, idx) => ({
      prompt: item.prompt,
      choices: (item.extra && item.extra.choices) || item.choices || [],
      letter: (old[`Subiectul I A:${idx + 1}`] || {}).letter || 'A',
      explain: (old[`Subiectul I A:${idx + 1}`] || {}).explain || '',
      steps: (old[`Subiectul I A:${idx + 1}`] || {}).steps || []
    })),
    statements,
    item6,
    item7: {
      prompt: 'Precizează un element comun celor două texte, valorificând câte o secvență din fiecare text. Minimum 30 de cuvinte.',
      minWords: 30,
      lines: 'minimum 30 de cuvinte',
      answers: (old['Subiectul I A:5'] && old['Subiectul I A:5'].explain)
        ? [old['Subiectul I A:5'].explain]
        : ['grijă', 'regulă'],
      tokens: [...themeTokens, 'grij', 'regul', 'loc', 'textul', 'secvent', 'secvenț'],
      explain: 'Element comun + o secvență din textul 1 + o secvență din textul 2. Minimum 30 de cuvinte.',
      steps: ['Elementul', 'Secvență text 1', 'Secvență text 2', '30+ cuvinte']
    },
    item8: {
      prompt: String(eight.prompt || '')
        .replace(/40–80/g, '50–100')
        .replace(/40-80/g, '50–100') ||
        'Justifică, valorificând un text, de ce o grijă mică (un loc, o regulă, o întoarcere) poate schimba o zi. 50–100 de cuvinte.',
      minWords: 50,
      maxWords: 100,
      lines: '50–100 de cuvinte',
      answers: (old['Subiectul I A:8'] || {}).answers || [],
      tokens: (old['Subiectul I A:8'] || {}).tokens || ['grij', 'text'],
      explain: (old['Subiectul I A:8'] || {}).explain
        ? String(old['Subiectul I A:8'].explain).replace(/40–80/g, '50–100')
        : 'Justificare cu secvență, 50–100 de cuvinte.',
      steps: (old['Subiectul I A:8'] || {}).steps || ['Idee + secvență']
    },
    item9: {
      prompt: String(nine.prompt || '')
        .replace(/50–80/g, '50–100')
        .replace(/50-80/g, '50–100') ||
        `Asociază fragmentul literar (textul 1) cu o operă literară studiată sau citită, evidențiind o valoare / o temă comună. 50–100 de cuvinte. ${NOVEL_HINT}`,
      minWords: 50,
      maxWords: 100,
      lines: '50–100 de cuvinte',
      answers: (old['Subiectul I A:9'] || {}).answers || ['Amintiri din copilărie'],
      tokens: (old['Subiectul I A:9'] || {}).tokens || ASSOCIATE_TOKENS,
      explain: (old['Subiectul I A:9'] || {}).explain || 'Operă citită + valoare/temă comună + un fapt din fragment și unul din carte.',
      steps: (old['Subiectul I A:9'] || {}).steps || ['Titlul', 'Valoarea', 'Două fapte']
    },
    bMcq: [1, 2, 3, 4].map(n => {
      const item = bItems.find(row => row.n === n) || bItems[n - 1] || { prompt: '…', choices: ['A', 'B', 'C', 'D'] };
      const row = old[`Subiectul I B:${n}`] || {};
      return {
        prompt: item.prompt,
        choices: item.choices || [],
        letter: row.letter || 'A',
        explain: row.explain || '',
        steps: row.steps || []
      };
    }),
    bWrite: [
      {
        prompt: `Precizează valoarea morfologică a cuvântului „${morphWord}”, așa cum apare în texte. Motivează pe scurt (parte de vorbire + funcție, dacă e cazul).`,
        minWords: 8,
        lines: 'valoare morfologică',
        ...bWriteBarem['Subiectul I B:5']
      },
      {
        prompt: `Alcătuiește două propoziții în care cuvântul „${morphWord}” să aibă valori morfologice sau sensuri diferite, potrivite contextului din texte.`,
        minWords: 12,
        lines: 'două propoziții',
        ...bWriteBarem['Subiectul I B:6']
      },
      {
        prompt: 'Alcătuiește o frază în care să existe o propoziție subordonată (atributivă, completivă sau circumstanțială), pornind de la o idee din textul 1 sau 2. Marchează subordonata.',
        minWords: 12,
        lines: 'o frază cu subordonată',
        ...bWriteBarem['Subiectul I B:7']
      },
      {
        prompt: `Rescrie corectând greșelile de scriere, de diacritice și de acord din mesajul: „${rewrite}”.`,
        minWords: 10,
        lines: 'mesaj corectat',
        ...bWriteBarem['Subiectul I B:8']
      }
    ],
    composition: meta.composition,
    compositionBarem: old['Subiectul II:1'] || {
      letter: '',
      explain: 'Compunere, minimum 150 de cuvinte, pe caiet. Nu există text-model de copiat.',
      ideas: ['Încadrare', 'Conținut', 'Organizare'],
      steps: ['Plan', '150+', 'Recitire']
    }
  };
}

function assembleOfficial(helpers, spec) {
  const { paperShell, publicItem, block, note } = helpers;
  const poetry = spec.literaryKind === 'poetry';
  const statements = spec.statements || [];
  const composition = spec.composition || (
    poetry
      ? 'Redactează un eseu de minimum 150 de cuvinte în care să prezinți mesajul textului 1, valorificând peisajul, două figuri de stil și emoția transmisă. Fără titlu sau motto. Pe caiet.'
      : 'Redactează un eseu de minimum 150 de cuvinte în care să caracterizezi un personaj din textul 1 (două date de identificare, două trăsături cu secvențe, o valoare) sau să rezumi textul 1 (100–150 de cuvinte, apoi un comentariu scurt până la 150+). Fără titlu. Pe caiet.'
  );

  const aItems = [
    publicItem(1, 2, spec.transcribe.prompt, {
      kind: 'short',
      minWords: spec.transcribe.minWords || 2,
      lines: spec.transcribe.lines || 'un enunț din text'
    }),
    ...spec.mcq.map((item, idx) => publicItem(idx + 2, 2, item.prompt, { choices: item.choices })),
    publicItem(5, 6, 'Stabilește dacă enunțurile următoare sunt adevărate sau false, valorificând textele. (câte 1 punct)', {
      kind: 'true-false',
      statements: statements.map((row, idx) => ({ n: idx + 1, text: row.text }))
    }),
    publicItem(6, 6, spec.item6.prompt, {
      kind: 'short',
      minWords: spec.item6.minWords || 12,
      maxWords: spec.item6.maxWords || 40,
      lines: spec.item6.lines || '12–40 de cuvinte'
    }),
    publicItem(7, 6, spec.item7.prompt, {
      kind: 'short',
      minWords: spec.item7.minWords || 30,
      lines: spec.item7.lines || 'minimum 30 de cuvinte'
    }),
    publicItem(8, 6, spec.item8.prompt, {
      kind: 'short',
      minWords: spec.item8.minWords || 50,
      maxWords: spec.item8.maxWords || 100,
      lines: spec.item8.lines || '50–100 de cuvinte'
    }),
    publicItem(9, 6, spec.item9.prompt, {
      kind: 'associate',
      minWords: spec.item9.minWords || 50,
      maxWords: spec.item9.maxWords || 100,
      lines: spec.item9.lines || '50–100 de cuvinte'
    })
  ];

  const bItems = [
    ...spec.bMcq.map((item, idx) => publicItem(idx + 1, 2, item.prompt, { choices: item.choices })),
    ...spec.bWrite.map((item, idx) => publicItem(idx + 5, 6, item.prompt, {
      kind: 'short',
      minWords: item.minWords || 8,
      lines: item.lines
    }))
  ];

  const litExtra = { passage: true, kind: 'passage', verse: poetry || undefined };
  const bundle = {
    public: paperShell(spec.id, spec.title, 'romana', note, [
      block(
        'Subiectul I A',
        38,
        IA_INTRO,
        [
          publicItem(0, 0, spec.lit, litExtra),
          publicItem(0, 0, spec.non, { passage: true, kind: 'passage' }),
          ...aItems
        ]
      ),
      block('Subiectul I B', 32, IB_INTRO, bItems),
      block('Subiectul II', 20, II_INTRO, [
        publicItem(1, 20, composition, {
          kind: 'write',
          photoOnly: true,
          minWords: 150,
          lines: 'scrie în caiet, min. 150 de cuvinte'
        })
      ])
    ], spec.generated),
    barem: {
      'Subiectul I A:1': {
        answers: spec.transcribe.answers || [],
        tokens: spec.transcribe.tokens || [],
        explain: spec.transcribe.explain || '',
        steps: spec.transcribe.steps || []
      },
      'Subiectul I A:2': { letter: spec.mcq[0] && spec.mcq[0].letter, explain: spec.mcq[0] && spec.mcq[0].explain, steps: (spec.mcq[0] && spec.mcq[0].steps) || [] },
      'Subiectul I A:3': { letter: spec.mcq[1] && spec.mcq[1].letter, explain: spec.mcq[1] && spec.mcq[1].explain, steps: (spec.mcq[1] && spec.mcq[1].steps) || [] },
      'Subiectul I A:4': { letter: spec.mcq[2] && spec.mcq[2].letter, explain: spec.mcq[2] && spec.mcq[2].explain, steps: (spec.mcq[2] && spec.mcq[2].steps) || [] },
      'Subiectul I A:5': {
        keys: statements.map(row => Boolean(row.answer)),
        explain: 'Câte 1 punct pentru fiecare enunț judecat corect. Enunțurile 1, 3, 4, 6 sunt, de regulă, adevărate; 2 și 5 sunt false — verifică totuși pe text.',
        steps: ['Citești enunțul', 'Cauți fapta în textul 1 sau 2', 'Marchezi A sau F']
      },
      'Subiectul I A:6': {
        answers: spec.item6.answers || [],
        tokens: spec.item6.tokens || [],
        explain: spec.item6.explain || '',
        steps: spec.item6.steps || ['Trăsătură / măsură', 'Exemplu din text']
      },
      'Subiectul I A:7': {
        answers: spec.item7.answers || [],
        tokens: spec.item7.tokens || [],
        explain: spec.item7.explain || '',
        steps: spec.item7.steps || []
      },
      'Subiectul I A:8': {
        answers: spec.item8.answers || [],
        tokens: spec.item8.tokens || [],
        explain: spec.item8.explain || '',
        steps: spec.item8.steps || []
      },
      'Subiectul I A:9': {
        answers: spec.item9.answers || [],
        tokens: spec.item9.tokens || ASSOCIATE_TOKENS,
        explain: spec.item9.explain || '',
        steps: spec.item9.steps || []
      },
      'Subiectul I B:1': { letter: spec.bMcq[0] && spec.bMcq[0].letter, explain: spec.bMcq[0] && spec.bMcq[0].explain, steps: (spec.bMcq[0] && spec.bMcq[0].steps) || [] },
      'Subiectul I B:2': { letter: spec.bMcq[1] && spec.bMcq[1].letter, explain: spec.bMcq[1] && spec.bMcq[1].explain, steps: (spec.bMcq[1] && spec.bMcq[1].steps) || [] },
      'Subiectul I B:3': { letter: spec.bMcq[2] && spec.bMcq[2].letter, explain: spec.bMcq[2] && spec.bMcq[2].explain, steps: (spec.bMcq[2] && spec.bMcq[2].steps) || [] },
      'Subiectul I B:4': { letter: spec.bMcq[3] && spec.bMcq[3].letter, explain: spec.bMcq[3] && spec.bMcq[3].explain, steps: (spec.bMcq[3] && spec.bMcq[3].steps) || [] },
      'Subiectul I B:5': { answers: spec.bWrite[0].answers, tokens: spec.bWrite[0].tokens, explain: spec.bWrite[0].explain, steps: spec.bWrite[0].steps },
      'Subiectul I B:6': { answers: spec.bWrite[1].answers, tokens: spec.bWrite[1].tokens, explain: spec.bWrite[1].explain, steps: spec.bWrite[1].steps },
      'Subiectul I B:7': { answers: spec.bWrite[2].answers, tokens: spec.bWrite[2].tokens, explain: spec.bWrite[2].explain, steps: spec.bWrite[2].steps },
      'Subiectul I B:8': { answers: spec.bWrite[3].answers, tokens: spec.bWrite[3].tokens, explain: spec.bWrite[3].explain, steps: spec.bWrite[3].steps },
      'Subiectul II:1': spec.compositionBarem
    }
  };
  if (spec.generated) bundle.public.generated = true;
  return bundle;
}

module.exports = {
  wordCount,
  NOVEL_HINT,
  ASSOCIATE_TOKENS,
  IA_INTRO,
  IB_INTRO,
  II_INTRO,
  legacyToSpec,
  assembleOfficial,
  typoMessage
};

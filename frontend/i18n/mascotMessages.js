const MASCOT_MESSAGES = {
  prima_intrare_azi: {
    mood: 'salut',
    lines: [
      'Salut, {nume}! Ce învățăm azi?',
      'Bine ai revenit! Hai să facem o lecție scurtă.',
      'Mă bucur să te văd! Ai 10 minute pentru o lecție?',
      'O lecție mică azi, un pas mare mâine.'
    ]
  },
  raspuns_corect: {
    mood: 'bucuros',
    lines: [
      'Exact! 🎉',
      'Bravo, ai prins ideea!',
      'Corect! Se vede că ai fost atent.',
      'Așa da!'
    ]
  },
  serie_corecte: {
    mood: 'sarbatoare',
    lines: [
      '{n} la rând! Ești în formă azi!',
      'Pas cu pas, ca furnica. Și uite cât ai urcat!'
    ]
  },
  raspuns_gresit: {
    mood: 'incurajeaza',
    lines: [
      'Aproape! Mai încearcă o dată.',
      'Nu-i nimic, greșelile ne arată ce mai avem de învățat.',
      'Uită-te încă o dată la cerință.',
      'Și furnica mai ocolește o piatră. Încearcă altfel.'
    ]
  },
  raspuns_gresit_din_nou: {
    mood: 'explica',
    lines: [
      'Hai să-l luăm împreună, pas cu pas.',
      'Uite un indiciu: {hint}'
    ]
  },
  corect_dupa_greseala: {
    mood: 'mandru',
    lines: [
      'Ai încercat și ai reușit. Asta contează cel mai mult!',
      'Vezi? N-ai renunțat și a mers!',
      'Mic, dar puternic: exact ca tine azi.'
    ]
  },
  lectie_terminata: {
    mood: 'bucuros',
    lines: [
      'Lecție terminată! Încă un pas spre 10.',
      'Gata! Ai învățat ceva nou azi.',
      'Bob cu bob, ca furnica, ai mai strâns o lecție.'
    ]
  },
  capitol_terminat: {
    mood: 'sarbatoare',
    big: true,
    lines: [
      'Ai terminat capitolul {capitol}! Mă bucur mult pentru tine.',
      'Un capitol întreg, lecție cu lecție. Asta e muncă adevărată!'
    ]
  },
  test_terminat: {
    mood: 'sarbatoare',
    big: true,
    lines: [
      'Ai dus testul până la capăt. Asta e muncă.',
      'Gata testul. Acum vezi ce ai de repetat, pas cu pas.'
    ]
  },
  insigna_noua: {
    mood: 'sarbatoare',
    big: true,
    lines: [
      'Insignă nouă! Ai muncit pentru ea.',
      'Ai urcat la nivelul {n}!'
    ]
  },
  nivel_nou: {
    mood: 'sarbatoare',
    big: true,
    lines: [
      'Ai urcat la nivelul {n}!',
      'Nivel nou! L-ai construit lecție cu lecție.'
    ]
  },
  obiectiv_saptamanal: {
    mood: 'mandru',
    big: true,
    lines: [
      'Ai atins obiectivul săptămânii! Puțin în fiecare zi te-a dus departe.',
      'Obiectivul săptămânii e gata. Puțin, dar des.'
    ]
  },
  serie_zile: {
    mood: 'mandru',
    lines: [
      '{n} zile de învățat. Mic, dar puternic!',
      '{n} zile la rând, pas cu pas, ca furnica.'
    ]
  },
  revenire_dupa_pauza: {
    mood: 'somnoros',
    lines: [
      'Te-am așteptat! Hai să recapitulăm puțin și continuăm.',
      'Bine ai revenit. Reluăm încet, apoi mergem mai departe.'
    ]
  },
  sta_pe_intrebare: {
    mood: 'gandeste',
    lines: [
      'Ia-ți timp. Vrei un indiciu?',
      'Nu e grabă. Mai citește o dată cerința.'
    ]
  },
  seara_tarziu: {
    mood: 'somnoros',
    lines: [
      'E cam târziu. Somnul ajută și la învățat, continuăm mâine?',
      'Și furnicile se odihnesc. Ne vedem mâine?'
    ]
  },
  mod_en: {
    mood: 'explica',
    lines: [
      'Citește cerința de două ori înainte să răspunzi.',
      'Nu uita să verifici calculele la final.'
    ]
  },
  eroare_tehnica: {
    mood: 'trist-bland',
    lines: [
      'Ceva n-a mers de partea mea. Mai încercăm o dată?',
      'Aici m-am încurcat eu. Mai încercăm?'
    ]
  }
};

const EXERCISE_EVENTS = new Set([
  'raspuns_corect',
  'raspuns_gresit',
  'raspuns_gresit_din_nou',
  'corect_dupa_greseala',
  'serie_corecte',
  'sta_pe_intrebare'
]);

function fillMessage(template, vars = {}) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) => (
    vars[key] == null || vars[key] === '' ? '' : String(vars[key])
  )).replace(/\s+/g, ' ').trim();
}

function emojiCount(text) {
  const found = String(text).match(/\p{Extended_Pictographic}/gu);
  return found ? found.length : 0;
}

export {
  MASCOT_MESSAGES,
  EXERCISE_EVENTS,
  fillMessage,
  emojiCount
};

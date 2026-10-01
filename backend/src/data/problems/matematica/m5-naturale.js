module.exports = {
  key: 'matematica:5:naturale',
  problems: [
    {
      id: 'p5n-comparare-1',
      lesson: 'comparare',
      level: 2,
      enSlot: null,
      statement: 'Andrei are 48 de timbre, iar Bianca are 35.',
      parts: [
        { id: 'a', points: 2, prompt: 'Arată că Andrei are mai multe timbre decât Bianca.' },
        { id: 'b', points: 3, prompt: 'Cu câte timbre are Andrei mai multe?' }
      ],
      steps: [
        {
          id: 'a1', part: 'a', points: 1,
          ask: 'Câte timbre are Andrei?',
          answers: ['48'],
          numeric: { value: 48, tolerance: 0 },
          hint: 'Numărul lui Andrei este scris primul.',
          solution: 'Andrei are 48 de timbre.',
          barem: 'Andrei: 48 de timbre'
        },
        {
          id: 'a2', part: 'a', points: 1,
          ask: 'Cine are mai multe timbre?',
          answers: ['Andrei', 'Andrei are mai multe'],
          hint: 'Compară 48 cu 35.',
          solution: '48 > 35, deci Andrei are mai multe.',
          barem: '48 > 35, deci Andrei'
        },
        {
          id: 'b1', part: 'b', points: 1,
          ask: 'Ce operație dă „cu câte mai multe”?',
          choices: ['scăderea', 'adunarea', 'înmulțirea', 'împărțirea'],
          answers: ['scăderea'],
          hint: 'Diferența se află prin scădere.',
          solution: '„Cu câte mai multe” se află prin scădere.',
          barem: 'scădere'
        },
        {
          id: 'b2', part: 'b', points: 1,
          ask: 'Cât este 48 − 35?',
          answers: ['13'],
          numeric: { value: 13, tolerance: 0 },
          hint: '48 − 30 = 18, apoi mai scazi 5.',
          solution: '48 − 35 = 13.',
          barem: '48 − 35 = 13'
        },
        {
          id: 'b3', part: 'b', points: 1,
          ask: 'Scrie rezultatul, cu unitatea.',
          answers: ['13 timbre', '13 de timbre'],
          hint: 'Unitatea este timbrul.',
          solution: 'Andrei are cu 13 timbre mai multe.',
          barem: '13 timbre'
        }
      ],
      model: 'a) Andrei are 48 de timbre, Bianca are 35. 48 > 35, deci Andrei are mai multe.\n\nb) Diferența: 48 − 35 = 13. Andrei are cu 13 timbre mai multe.'
    },
    {
      id: 'p5n-adunare-1',
      lesson: 'adunare',
      level: 2,
      enSlot: null,
      statement: 'Într-o cutie sunt 27 de creioane albastre și 16 roșii.',
      parts: [
        { id: 'a', points: 2, prompt: 'Calculează câte creioane sunt în cutie.' },
        { id: 'b', points: 3, prompt: 'Mai pui 8 creioane verzi. Câte sunt acum, în total?' }
      ],
      steps: [
        {
          id: 'a1', part: 'a', points: 1,
          ask: 'Cât este 27 + 16?',
          answers: ['43'],
          numeric: { value: 43, tolerance: 0 },
          hint: '27 + 10 = 37, apoi mai aduni 6.',
          solution: '27 + 16 = 43.',
          barem: '27 + 16 = 43'
        },
        {
          id: 'a2', part: 'a', points: 1,
          ask: 'Scrie totalul, cu unitatea.',
          answers: ['43 de creioane', '43 creioane'],
          hint: 'Unitatea este creionul.',
          solution: 'În cutie sunt 43 de creioane.',
          barem: '43 de creioane'
        },
        {
          id: 'b1', part: 'b', points: 1,
          ask: 'Ce aduni ca să afli noul total?',
          choices: ['43 + 8', '27 + 8', '16 + 8', '27 + 16'],
          answers: ['43 + 8'],
          hint: 'Pornești de la totalul de la a) și aduni cele verzi.',
          solution: 'La cele 43 de creioane se adaugă 8.',
          barem: '43 + 8'
        },
        {
          id: 'b2', part: 'b', points: 1,
          ask: 'Cât este 43 + 8?',
          answers: ['51'],
          numeric: { value: 51, tolerance: 0 },
          hint: '43 + 10 = 53, apoi scazi 2.',
          solution: '43 + 8 = 51.',
          barem: '43 + 8 = 51'
        },
        {
          id: 'b3', part: 'b', points: 1,
          ask: 'Scrie noul total, cu unitatea.',
          answers: ['51 de creioane', '51 creioane'],
          hint: 'Aceeași unitate ca la început.',
          solution: 'Acum sunt 51 de creioane.',
          barem: '51 de creioane'
        }
      ],
      model: 'a) 27 + 16 = 43. În cutie sunt 43 de creioane.\n\nb) 43 + 8 = 51. După cele 8 creioane verzi sunt 51 de creioane.'
    }
  ]
};

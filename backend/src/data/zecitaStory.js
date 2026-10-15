// Câte o scenă scurtă pentru fiecare capitol terminat. Textele sunt ale noastre.

const { MASCOT_NAME } = require('../config/mascot');

const SCENES = [
  {
    id: 'caiet-nou',
    mood: 'salut',
    lines: [
      `${MASCOT_NAME} a deschis un caiet cu coperta goală.`,
      'A scris pe prima pagină: „Azi am început.”',
      'A lăsat loc și pentru mâine.'
    ]
  },
  {
    id: 'cararea',
    mood: 'bucuros',
    lines: [
      'Pe potecă a găsit o piatră plată, bună de stat.',
      '„Un pas e destul”, a spus ea.',
      'Apoi a pus pietricica în buzunar.'
    ]
  },
  {
    id: 'piatra',
    mood: 'gandeste',
    lines: [
      'Pe piatră era desenat un număr mic.',
      `${MASCOT_NAME} l-a citit de două ori, rar.`,
      'A zâmbit când a înțeles că nu trebuie să se grăbească.'
    ]
  },
  {
    id: 'pietricica',
    mood: 'incurajeaza',
    lines: [
      'A lăsat pietricica la răscruce, ca un semn.',
      '„Dacă te întorci, știi pe unde ai venit.”',
      'Semnul rămâne. Nu trebuie să-l păzești.'
    ]
  },
  {
    id: 'harta',
    mood: 'explica',
    lines: [
      `${MASCOT_NAME} a desfășurat o hartă cât palma.`,
      'Un cerc mic arăta capitolul de azi.',
      'Restul hărții poate aștepta.'
    ]
  },
  {
    id: 'stea',
    mood: 'mandru',
    lines: [
      'În caiet a pus o steluță lângă titlu.',
      'Nu era mare. Era doar a ei.',
      'A închis caietul fără să șteargă nimic.'
    ]
  },
  {
    id: 'cacao',
    mood: 'sarbatoare',
    lines: [
      'La capătul potecii era o cană de cacao.',
      `${MASCOT_NAME} a suflat în ea și a stat un minut.`,
      '„Gata pentru azi”, a spus, și a zâmbit.'
    ]
  },
  {
    id: 'seara',
    mood: 'somnoros',
    lines: [
      `Seara, ${MASCOT_NAME} a pus caietul sub pernă.`,
      'Nu ca să viseze formule.',
      'Doar ca să-l găsească dimineața, unde l-a lăsat.'
    ]
  }
];

function cleanTitle(title) {
  return String(title || 'lecția de azi').replace(/[<>]/g, '').trim().slice(0, 80) || 'lecția de azi';
}

function sceneFor(order, title) {
  const name = cleanTitle(title);
  if (order >= 0 && order < SCENES.length) {
    const scene = SCENES[order];
    return { id: scene.id, mood: scene.mood, lines: scene.lines.slice(), chapterTitle: name };
  }
  const n = Math.max(SCENES.length, Number(order) || 0);
  return {
    id: `mai-departe-${n}`,
    mood: 'mandru',
    lines: [
      `${MASCOT_NAME} a notat „${name}” în caiet.`,
      'A pus o steluță mică lângă titlu.',
      '„Asta rămâne aici. Data viitoare plecăm mai departe.”'
    ],
    chapterTitle: name
  };
}

module.exports = { SCENES, sceneFor, cleanTitle };

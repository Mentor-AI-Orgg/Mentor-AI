const GLOSSARY = {
  'matematica:5:naturale': [
    { term: 'ordin', meaning: 'Locul unei cifre: unități, zeci, sute, mii.' },
    { term: 'axă', meaning: 'Dreaptă cu origine, sens și unitate, pe care stă fiecare număr.' },
    { term: 'putere', meaning: 'Baza înmulțită cu ea însăși de atâtea ori cât spune exponentul.' },
    { term: 'rest', meaning: 'Ce rămâne la împărțire. Este mai mic decât împărțitorul.' },
    { term: 'divizor', meaning: 'Număr nenul care împarte exact.' },
    { term: 'prim', meaning: 'Număr cu exact doi divizori: 1 și el însuși.' },
    { term: 'rotunjire', meaning: 'Apropierea unui număr de un ordin, prin lipsă sau prin adaos.' },
    { term: 'mers invers', meaning: 'Desfaci operațiile de la rezultat spre numărul de la început.' }
  ],
  'matematica:5:fractii': [
    { term: 'numărător', meaning: 'Câte părți egale iei din întreg.' },
    { term: 'numitor', meaning: 'În câte părți egale tai întregul. Nu este 0.' },
    { term: 'echivalente', meaning: 'Aceeași parte din întreg. Proba: produsele în cruce sunt egale.' },
    { term: 'c.m.m.d.c.', meaning: 'Cel mai mare număr care împarte și numărătorul, și numitorul.' },
    { term: 'c.m.m.m.c.', meaning: 'Cel mai mic multiplu comun nenul. Dă numitorul comun cel mai mic.' },
    { term: 'procent', meaning: 'O sutime. 25% = 25/100.' },
    { term: 'zecimală', meaning: 'Cifră după virgulă: zecimi, sutimi, miimi.' },
    { term: 'rațional', meaning: 'Un număr scris ca fracție de naturale, cu numitor nenul.' }
  ],
  'matematica:5:geometrie': [
    { term: 'perimetru', meaning: 'Gardul: suma laturilor.' },
    { term: 'arie', meaning: 'Câte pătrățele încap înăuntru.' }
  ],
  'matematica:6:multimi': [
    { term: 'reuniune', meaning: 'Tot din cel puțin o mulțime, fără dubluri.' },
    { term: 'c.m.m.d.c.', meaning: 'Cel mai mare număr care împarte pe amândoi.' }
  ],
  'matematica:6:proportii': [
    { term: 'raport', meaning: 'Compari două mărimi printr-o împărțire.' },
    { term: 'invers proporțional', meaning: 'Una crește, cealaltă scade; produsul rămâne.' }
  ],
  'matematica:7:ecuati': [
    { term: 'ecuație', meaning: 'O cântar: ce e stânga trebuie să fie egal cu dreapta.' },
    { term: 'sistem', meaning: 'Două relații, două necunoscute.' }
  ],
  'matematica:7:date': [
    { term: 'medie', meaning: 'Suma împărțită la câți termeni ai.' },
    { term: 'mediană', meaning: 'Valoarea din mijloc, după ce ai așezat șirul.' }
  ],
  'matematica:8:algebric': [
    { term: 'termeni asemenea', meaning: 'Aceeași literă, același exponent — îi poți aduna.' },
    { term: 'identitate', meaning: 'E adevărată pentru orice valoare a literei.' }
  ],
  'matematica:8:functii': [
    { term: 'funcție', meaning: 'Unește un x de un singur f(x).' },
    { term: 'pantă', meaning: 'Cât urcă sau coboară dreapta când x crește cu 1.' }
  ],
  'matematica:8:spatiu': [
    { term: 'prismă', meaning: 'Două baze paralele, muchii laterale perpendiculare pe baze dacă e dreaptă.' },
    { term: 'volum', meaning: 'Cât umple corpul, nu doar coaja.' }
  ],
  'en:matematica:numere': [
    { term: 'rațional', meaning: 'Se scrie ca fracție de întregi. √2 nu e.' },
    { term: 'interval', meaning: 'O bucată de axă, cu capete închise sau deschise.' }
  ],
  'en:matematica:algebra-en': [
    { term: 'ecuație', meaning: 'Cauți x-ul care face egalitatea adevărată.' },
    { term: 'inecuație', meaning: 'Cauți un interval, nu un singur număr.' }
  ],
  'en:romana:receptare': [
    { term: 'text la prima vedere', meaning: 'Nu l-ai învățat acasă. Citești, apoi dovedești.' },
    { term: 'secvență', meaning: 'O bucată transcrisă, nu rezumatul tău.' }
  ],
  'en:romana:argumentativ': [
    { term: 'teză', meaning: 'Ce susții, spus din prima.' },
    { term: 'argument', meaning: 'De ce + un exemplu credibil, nu o vorbă mare.' }
  ]
};

function glossaryFor(subject, grade, chapterId, track) {
  const sid = String(subject || '').toLowerCase().includes('rom') ? 'romana' : 'matematica';
  const prefix = track === 'en' ? `en:${sid}` : `${sid}:${grade}`;
  const key = `${prefix}:${chapterId}`;
  return GLOSSARY[key] || GLOSSARY[`${sid}:${grade}:${chapterId}`] || [];
}

module.exports = { GLOSSARY, glossaryFor };

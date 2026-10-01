'use strict';
const first = require('./r8-familia-comunitate-1');
const second = require('./r8-familia-comunitate-2');
module.exports = {
  ...{
  "id": "familia-comunitate",
  "title": "Familia și comunitatea",
  "inOwnWords": "Unitatea 6 până la capăt, și cu ea anul. Plan principal: textul narativ și caracterizarea, opinia cu un text studiat, coerența, timpurile și anafora, originalitatea. Plan secundar: atitudinile orale, jargonul, argoul, limbajul colocvial și proiectele. Foile de puncte și fișa de observare nu sunt lecții.",
  "toc": [
    "Asertivitate și o expoziție",
    "Mai multe citiri, aceeași seară",
    "Vitoria pe drumul Dornelor",
    "Originalitatea și plagiatul",
    "De ce citim",
    "Jargon și argou",
    "Colocvial și cultivat",
    "Fraza vorbită și fraza scrisă",
    "Coerență și anaforă",
    "Spirit civic",
    "Proiectele anului",
    "Recapitularea anului"
  ],
  "glossary": [
    {
      "term": "asertivitate",
      "meaning": "Îți spui punctul de vedere și interesul, fără teamă și fără să le negi pe ale celuilalt."
    },
    {
      "term": "plagiat",
      "meaning": "Iei ideea sau textul altcuiva și le prezinți ca pe creația ta."
    },
    {
      "term": "anaforă",
      "meaning": "Un cuvânt din text care trimite la același lucru din realitate, numit referent."
    },
    {
      "term": "jargon",
      "meaning": "Limbaj de meserie sau împrumuturi neadaptate, cu circulație restrânsă."
    },
    {
      "term": "argou",
      "meaning": "Limbaj de grup, adesea al lumii periferice, ca să nu fie înțeles de ceilalți."
    }
  ]
},
  lessons: first.lessons.concat(second.lessons)
};

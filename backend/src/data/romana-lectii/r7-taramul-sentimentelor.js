'use strict';
const first = require('./r7-taramul-sentimentelor-1');
const second = require('./r7-taramul-sentimentelor-2');
module.exports = {
  ...{
  "id": "taramul-sentimentelor",
  "title": "Tărâmul sentimentelor",
  "inOwnWords": "Unitatea trece de la întâmplare la emoție. Înveți textul liric, versul, rima și figurile, apoi o nuntă dintr-o baladă, fără să copiezi strofele. La oral schimbi tonul și descrii. La scris așezi pagina după situație. La gramatică reiei substantivul, cazurile, prepoziția și adjectivul. La final stau Sânzienele, din 24 iunie, și lada cu o tradiție.",
  "toc": [
    "Harta unității",
    "Textul liric",
    "Versul, strofa și rima",
    "Figurile de stil",
    "Nunta Zamfirei",
    "Intonația",
    "Descrierea orală",
    "Așezarea textului",
    "Substantivul",
    "Cazurile",
    "Prepoziția",
    "Adjectivul",
    "Adjectivul în propoziție",
    "Sânzienele",
    "Lada cu sentimente",
    "Închiderea unității"
  ],
  "glossary": [
    {
      "term": "text liric",
      "meaning": "Text literar în care o voce ficțională spune emoții, sentimente și gânduri, la persoana I sau a II-a."
    },
    {
      "term": "rimă încrucișată",
      "meaning": "Primul vers rimează cu al treilea, al doilea cu al patrulea: abab."
    },
    {
      "term": "Sânziene",
      "meaning": "Sărbătoare populară de pe 24 iunie, a iubirii și a fertilității. În Muntenia și în Oltenia se numește Drăgaică."
    }
  ]
},
  lessons: first.lessons.concat(second.lessons)
};

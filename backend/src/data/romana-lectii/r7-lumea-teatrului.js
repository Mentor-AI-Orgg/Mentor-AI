'use strict';
const first = require('./r7-lumea-teatrului-1');
const second = require('./r7-lumea-teatrului-2');
module.exports = {
  ...{
  "id": "lumea-teatrului",
  "title": "Lumea teatrului",
  "inOwnWords": "Unitatea trece de la emoție la scenă. Înveți textul dramatic, dialogul, spectacolul, interviul, tracul și cronica, fără să copiezi replicile. La gramatică reiei pronumele, de la cel personal până la cel negativ, apoi întărirea, combinațiile și numeralul. La final stau contactele culturale și o scenă de cetate pe care o poți verifica.",
  "toc": [
    "Harta măștilor",
    "Acte și scene",
    "Dialogul dramatic",
    "Spectacolul",
    "Interviul",
    "Tracul",
    "Cronica de teatru",
    "Pronumele personal",
    "Pronumele posesiv",
    "Pronumele demonstrativ",
    "Pronumele nehotărât",
    "Pronumele interogativ",
    "Pronumele relativ",
    "Pronumele negativ",
    "Întărirea",
    "Pronumele în propoziție",
    "Numeralul",
    "Contacte culturale",
    "Închiderea unității"
  ],
  "glossary": [
    {
      "term": "text dramatic",
      "meaning": "Text scris ca să fie jucat, împărțit în acte și scene, cu replici și indicații scenice."
    },
    {
      "term": "didascalie",
      "meaning": "Indicație scenică a autorului: decor, timp, gest, ton sau atitudine."
    },
    {
      "term": "cronică de teatru",
      "meaning": "Articol nonliterar care consemnează un spectacol și îl recomandă sau nu."
    }
  ]
},
  lessons: first.lessons.concat(second.lessons)
};

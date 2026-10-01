'use strict';
const first = require('./r7-punti-intre-lumi-1');
const second = require('./r7-punti-intre-lumi-2');
module.exports = {
  ...{
  "id": "punti-intre-lumi",
  "title": "Punți între lumi",
  "inOwnWords": "Unitatea deschide fantasticul, apoi explică, recenzează și reia verbul. La final vin formele nepersonale, combinările verbului și mitul Dochiei. Scena stă în lecție. La școală, textul deschis poate fi altul.",
  "toc": [
    "Harta unității",
    "Literatura fantastică",
    "Personaje și planuri",
    "Enciclopedia",
    "Textul explicativ",
    "Respect și toleranță",
    "Recenzia",
    "Verbul",
    "Moduri și timpuri",
    "Conjunctivul și condiționalul",
    "Infinitivul",
    "Participiul",
    "Gerunziul",
    "Supinul",
    "Combinările verbului",
    "Mitul Dochiei",
    "Închiderea unității"
  ],
  "glossary": [
    {
      "term": "fantastic",
      "meaning": "Într-o lume reală apare un fapt care nu se poate explica, iar finalul rămâne deschis."
    },
    {
      "term": "text multimodal",
      "meaning": "Text în care informația vine și prin cuvinte, și prin imagini, sunete sau gesturi."
    },
    {
      "term": "conjunctiv",
      "meaning": "Modul acțiunii posibile, recunoscut după să."
    },
    {
      "term": "infinitiv",
      "meaning": "Forma de dicționar a verbului, fără persoană și fără număr. Nu poate fi predicat."
    },
    {
      "term": "supin",
      "meaning": "Prepoziția la, de, din, după sau pentru, urmată de participiu: de citit, pentru pictat."
    }
  ]
},
  lessons: first.lessons.concat(second.lessons)
};

'use strict';
const first = require('./r7-pe-drumul-cunoasterii-1');
const second = require('./r7-pe-drumul-cunoasterii-2');
module.exports = {
  ...{
  "id": "pe-drumul-cunoasterii",
  "title": "Pe drumul cunoașterii. Școala",
  "inOwnWords": "Unitatea ține școala de la textul epic până la limbile vecine și până la proiect. La construcție sunt fraza, conjuncția, contextul, pleonasmul, paronimele, derivarea, compunerea, locuțiunea, vorbirea și scrisul, sunetul, silaba și accentul. Evaluarea cu puncte și fișa de observare nu sunt lecții.",
  "toc": [
    "Harta unității",
    "Textul epic",
    "Autor, narator, personaje",
    "Caracterizarea",
    "Anunțul",
    "Textul oral",
    "Fraza",
    "Conjuncția",
    "Vocabularul și contextul",
    "Pleonasmul",
    "Paronimele",
    "Derivarea",
    "Compunerea",
    "Locuțiunile",
    "Vorbirea și scrisul",
    "Sunetul",
    "Silaba și accentul",
    "Limbile vecine",
    "Proiectul despre școli",
    "Recapitularea unității"
  ],
  "glossary": [
    {
      "term": "text epic",
      "meaning": "Text literar bazat pe narațiune, cu întâmplări în ordine și cu personaje."
    },
    {
      "term": "frază",
      "meaning": "Enunț complex, cu cel puțin două propoziții legate și cu cel puțin o propoziție principală."
    },
    {
      "term": "paronime",
      "meaning": "Cuvinte cu formă asemănătoare și cu sens diferit, de obicei aceeași parte de vorbire."
    }
  ]
},
  lessons: first.lessons.concat(second.lessons)
};

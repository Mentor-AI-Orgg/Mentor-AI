'use strict';
const first = require('./r7-calator-prin-lume-1');
const second = require('./r7-calator-prin-lume-2');
module.exports = {
  ...{
  "id": "calator-prin-lume",
  "title": "Călător prin lume",
  "inOwnWords": "Unitatea te poartă prin textul epic, prin jurnalul de călătorie și prin ascultarea activă. La scris urmărești stilul și legi secvențele. La gramatică reiei adverbul și interjecția. La final stau țările din jur și un ghid făcut în grup. Scenele sunt în lecții.",
  "toc": [
    "Harta călătoriei",
    "Balta-Albă",
    "Momentele subiectului",
    "Trei feluri de text",
    "Jurnalul de călătorie",
    "Don Quijote",
    "Ascultarea activă",
    "Stilul",
    "Secvențele textului",
    "Adverbul",
    "Gradele adverbului",
    "Interjecția",
    "Interjecția predicativă",
    "Țările vecine",
    "Ghidul turistic",
    "Închiderea unității"
  ],
  "glossary": [
    {
      "term": "povestire în ramă",
      "meaning": "O narațiune bagată în alta: un cadru naște povestirea dinăuntru."
    },
    {
      "term": "jurnal de călătorie",
      "meaning": "Text narativ nonliterar, la persoana I, cu locuri și fapte reale."
    },
    {
      "term": "interjecție predicativă",
      "meaning": "Interjecție care ține locul verbului și este predicat verbal."
    }
  ]
},
  lessons: first.lessons.concat(second.lessons)
};

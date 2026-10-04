'use strict';

const MANUAL = {
  "code": "A1954",
  "title": "Limba și literatura română. Manual pentru clasa a VIII-a",
  "author": "Mihaela Daniela Cîrstea, Alexandra Dragomirescu, Ileana Sanda",
  "publisher": "Litera Educațional, Editura Litera",
  "year": 2025,
  "approval": "Ordinul ministrului educației nr. 4500/10.07.2025",
  "curriculum": "OMEN nr. 3393/28.02.2017"
};

const COMPETENCIES = [
  {
    "code": "1.2",
    "text": "Spune o părere și o sprijină pe un fapt din text."
  },
  {
    "code": "2.1",
    "text": "Găsește în text personajul, timpul, spațiul și întâmplarea."
  },
  {
    "code": "2.3",
    "text": "Caracterizează un personaj cu două trăsături și două mijloace."
  },
  {
    "code": "3.1",
    "text": "Scrie o compunere de cel puțin 150 de cuvinte, pe tipul cerut."
  },
  {
    "code": "3.4",
    "text": "Ține limita de cuvinte și normele, pentru punctul de redactare."
  },
  {
    "code": "4.1",
    "text": "Transcrie o subordonată întreagă și îi spune felul."
  },
  {
    "code": "4.2",
    "text": "Alege sensul după context: sinonim, antonim, omonim, paronim."
  },
  {
    "code": "4.4",
    "text": "Scrie formele din norma actuală, fără capcanele de ortografie."
  },
  {
    "code": "4.5",
    "text": "Construiește un enunț în care cuvântul are funcția și cazul cerute."
  },
  {
    "code": "5.2",
    "text": "Leagă o valoare de un text literar studiat, cu titlu și autor."
  }
];

const UNITS = [
  require('./r8-recapitulare-examen'),
  require('./r8-calatoria'),
  require('./r8-lume-sentimente'),
  require('./r8-valori-ascultare'),
  require('./r8-traditie-inovatie'),
  require('./r8-modele-antimodele'),
  require('./r8-familia-comunitate')
];

function grade8Guide() {
  return {
    title: "Limba română, clasa a VIII-a",
    restored: true,
    manual: MANUAL,
    competencies: COMPETENCIES,
    howISeeIt: "Clasa a VIII-a este parcursă până la capăt: testul inițial, Unitățile 1-5 și Unitatea 6, Familia și comunitatea, până la recapitulare. Foile de evaluare finală și fișa de observare nu sunt lecții. Planul principal ține compunerea, caracterizarea, coerența, timpurile, anafora și originalitatea, pe lângă subordonatele, figurile și fonetica deja predate. Planul secundar ține atitudinile orale, jargonul, argoul și proiectele. Subordonatele din afara programei nu se exersează. Matematica nu se schimbă aici.",
    units: UNITS
  };
}

module.exports = {
  MANUAL,
  COMPETENCIES,
  UNITS,
  grade8Guide
};

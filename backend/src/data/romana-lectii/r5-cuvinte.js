'use strict';
const first = require('./r5-cuvinte-1');
const second = require('./r5-cuvinte-2');
module.exports = {
  ...{
  "id": "cuvinte",
  "title": "Cuvinte potrivite",
  "inOwnWords": "Unitatea 1 pune la un loc vorbirea potrivită și prima gramatică a propoziției: enunț, predicat, subiect, acord, atribut, apoi ideea principală și planul de idei. Scenele sunt în lecții. În unele manuale snoava se numește Păcală avocat. La școală titlul poate fi altul.",
  "toc": [
    "A înțelege și a exprima informații, intenții, atitudini și emoții",
    "Strategii de interpretare. Răspunsul afectiv (Păcală avocat)",
    "Dicționarul. Articolul de dicționar",
    "Enunțul. Tipuri de enunț și punctuația",
    "Roluri în comunicare: vorbitor, ascultător",
    "Tipuri de propoziții. Predicatul verbal",
    "Acte de limbaj: a cere și a primi scuze; a refuza și a accepta",
    "Propoziția afirmativă și propoziția negativă",
    "Subiectul simplu și multiplu. Propoziția simplă și dezvoltată",
    "Acordul predicatului cu subiectul",
    "Atributul",
    "Ideea principală. Planul simplu și planul dezvoltat de idei",
    "Recapitulare și evaluare"
  ],
  "glossary": [
    {
      "term": "enunț",
      "meaning": "O rostire încheiată, între două pauze, cu un scop: spui, întrebi, exclami sau ceri."
    },
    {
      "term": "predicat verbal",
      "meaning": "Verbul care arată persoana și timpul și spune destul despre ce face subiectul."
    },
    {
      "term": "răspuns afectiv",
      "meaning": "Ce ai simțit după lectură, legat de o bucată anume din text."
    },
    {
      "term": "atribut",
      "meaning": "Stă lângă un substantiv și îl precizează: nou, al Anei, de lemn."
    },
    {
      "term": "subiect",
      "meaning": "Cine face acțiunea sau despre cine se spune ceva, împreună cu predicatul."
    },
    {
      "term": "idee principală",
      "meaning": "Informația esențială dintr-o secvență. Înșirate în ordine, ideile principale fac planul simplu."
    }
  ]
},
  lessons: first.lessons.concat(second.lessons)
};

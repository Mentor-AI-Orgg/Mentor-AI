'use strict';

const MANUAL = {
  "code": "A1732",
  "title": "Limba și literatura română. Manual pentru clasa a VII-a",
  "author": "Loredana Dorobăț, Lorelai Slavu, Geanina Oprea",
  "publisher": "Grup Editorial Litera",
  "year": 2024,
  "isbn": "978-630-342-037-0",
  "approval": "Ordinul ministrului educației nr. 5420/04.07.2024",
  "curriculum": "OMEN nr. 3393/28.02.2017"
};

const COMPETENCIES = [
  {
    "code": "1.1",
    "text": "Găsește informația importantă într-un mesaj ascultat sau citit."
  },
  {
    "code": "1.2",
    "text": "Spune o idee cu voce clară și o susține cu un exemplu."
  },
  {
    "code": "1.3",
    "text": "Recunoaște locul, momentul și relația dintre cei care vorbesc."
  },
  {
    "code": "2.1",
    "text": "Recunoaște textul epic și felul în care se leagă întâmplările."
  },
  {
    "code": "2.3",
    "text": "Spune ce scrie într-un text, ce vede și ce părere are, legată de o faptă."
  },
  {
    "code": "2.4",
    "text": "Stă pe text până la capăt și alege o bucată care îl oprește."
  },
  {
    "code": "3.1",
    "text": "Scrie o pagină de jurnal, o scrisoare sau o povestire la persoana I."
  },
  {
    "code": "3.2",
    "text": "Scrie o caracterizare, cu introducere, cuprins și încheiere."
  },
  {
    "code": "3.4",
    "text": "Spune ce i-a ieșit bine la scris și ce mai are de îndreptat."
  },
  {
    "code": "4.1",
    "text": "Recunoaște propoziția, fraza și felul legăturii dintre propoziții."
  },
  {
    "code": "4.2",
    "text": "Alege sensul după context: propriu, figurat, sinonim, paronim."
  },
  {
    "code": "4.4",
    "text": "Scrie corect formele care se aud la fel și cuvintele care se aseamănă."
  },
  {
    "code": "4.5",
    "text": "Recunoaște rolul unui cuvânt în propoziție."
  },
  {
    "code": "5.1",
    "text": "Recunoaște o valoare într-o faptă de la școală: răbdare, loialitate, curaj."
  },
  {
    "code": "1.4",
    "text": "Poartă un dialog scurt, pe rând, cu gest și cu ton potrivit."
  },
  {
    "code": "2.2",
    "text": "Spune pe scurt, cu cuvintele lui, ce s-a întâmplat și în ce ordine."
  },
  {
    "code": "4.3",
    "text": "Desparte în silabe și recunoaște diftongul, triftongul și hiatul."
  },
  {
    "code": "5.2",
    "text": "Recunoaște o valoare într-o întâlnire cu o altă lume: respect, toleranță, prietenie."
  },
  {
    "code": "2.5",
    "text": "Leagă emoția dintr-un text liric de o imagine și o spune cu un exemplu."
  },
  {
    "code": "3.3",
    "text": "Așază textul după situația de comunicare și își recitește ciorna."
  }
];

const UNITS = [
  require('./r7-recapitulare-initiala'),
  require('./r7-pe-drumul-cunoasterii'),
  require('./r7-punti-intre-lumi'),
  require('./r7-taramul-sentimentelor'),
  require('./r7-lumea-teatrului'),
  require('./r7-calator-prin-lume'),
  require('./r7-privind-catre-mine')
];

function grade7Guide() {
  return {
    title: "Limba română, clasa a VII-a",
    restored: true,
    manual: MANUAL,
    competencies: COMPETENCIES,
    howISeeIt: "Clasa a VII-a cuprinde recapitularea inițială, Unitatea 1 până la capăt, Unitatea 2, Punți între lumi, până la capăt, Unitatea 3, Tărâmul sentimentelor, până la capăt, Unitatea 4, Lumea teatrului, până la capăt, Unitatea 5, Călător prin lume, până la capăt, Unitatea 6, Privind către mine, până la capăt, și recapitularea finală. Scena sau regula stă în lecție.",
    units: UNITS
  };
}

module.exports = {
  MANUAL,
  COMPETENCIES,
  UNITS,
  grade7Guide
};

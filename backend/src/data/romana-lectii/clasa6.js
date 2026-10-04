'use strict';

const MANUAL = {
  "code": "A1470",
  "title": "Limba și literatura română. Manual pentru clasa a VI-a",
  "author": "Loredana Dorobăț, Lorelai Slavu, Violeta Nania",
  "publisher": "Grup Editorial Litera",
  "year": 2023,
  "isbn": "978-630-319-187-4",
  "approval": "Ordinul ministrului educației nr. 5022/06.07.2023",
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
    "code": "1.4",
    "text": "Poartă un dialog scurt, pe rând, cu gest și cu ton potrivit."
  },
  {
    "code": "2.1",
    "text": "Recunoaște felul textului și momentele acțiunii."
  },
  {
    "code": "2.2",
    "text": "Spune pe scurt, cu cuvintele lui, ce s-a întâmplat și în ce ordine."
  },
  {
    "code": "2.3",
    "text": "Spune ce scrie într-un text narativ, ce vede și ce părere are, legată de o faptă."
  },
  {
    "code": "2.4",
    "text": "Stă pe text până la capăt și alege o bucată care îl oprește."
  },
  {
    "code": "2.5",
    "text": "Leagă un tablou de o emoție și o spune cu un exemplu."
  },
  {
    "code": "3.1",
    "text": "Scrie o pagină de jurnal, o scrisoare sau o povestire la persoana I."
  },
  {
    "code": "3.2",
    "text": "Scrie un text explicativ, cu pași, o cauză și o concluzie."
  },
  {
    "code": "3.3",
    "text": "Își recitește textul: ortografie, punctuație, așezare în pagină."
  },
  {
    "code": "3.4",
    "text": "Spune ce i-a ieșit bine la scris și ce mai are de îndreptat."
  },
  {
    "code": "4.1",
    "text": "Recunoaște verbul, modul, timpul și felul predicatului."
  },
  {
    "code": "4.2",
    "text": "Alege sensul după context: propriu, figurat, sinonim, omonim."
  },
  {
    "code": "4.3",
    "text": "Desparte în silabe și recunoaște diftongul, triftongul și hiatul."
  },
  {
    "code": "4.4",
    "text": "Scrie corect formele care se aud la fel, ca ea și ia."
  },
  {
    "code": "4.5",
    "text": "Recunoaște substantivul, cazul, pronumele și subiectul."
  },
  {
    "code": "5.1",
    "text": "Recunoaște o învățătură într-un proverb sau într-o fabulă."
  },
  {
    "code": "5.2",
    "text": "Recunoaște o valoare într-o legendă: curaj, adevăr, bunătate."
  }
];

const UNITS = [
  require('./r6-recapitulare-initiala'),
  require('./r6-lumea-de-acasa'),
  require('./r6-taramul-prieteniei'),
  require('./r6-intelepciunea-lumii'),
  require('./r6-tablouri-de-poveste'),
  require('./r6-calatorii-literare'),
  require('./r6-ferestre-spre-viitor'),
  require('./r6-incheierea-anului')
];

function grade6Guide() {
  return {
    title: "Limba română, clasa a VI-a",
    restored: true,
    manual: MANUAL,
    competencies: COMPETENCIES,
    howISeeIt: "Clasa a VI-a este parcursă până la capăt: recapitularea inițială, Unitățile 1–6 și încheierea anului. Scena sau regula stă în lecție.",
    units: UNITS
  };
}

module.exports = {
  MANUAL,
  COMPETENCIES,
  UNITS,
  grade6Guide
};

// Re-export. Conținutul stă în backend/src/data/romana-lectii/, câte un fișier pe unitate.
function emptyYear(grade) {
  const label = { 6: 'VI', 7: 'VII', 8: 'VIII' }[grade];
  return {
    title: `Limba și literatura română, clasa a ${label}-a`,
    restored: false,
    manual: null,
    competencies: [],
    howISeeIt:
      'Planul scris înainte în aplicație, fără un manual anume, a fost șters. Clasa asta se reface de la zero, din manualul oficial, când îl aduci. Până atunci nu sunt capitole inventate.',
    units: []
  };
}

module.exports = {
  ...require('./romana-lectii/clasa5'),
  emptyYear
};

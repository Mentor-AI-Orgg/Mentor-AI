const parts = [require('./m6-intregi-rationale-p1'), require('./m6-intregi-rationale-p2')];
module.exports = {
  key: "matematica:6:intregi-rationale",
  flashcards: parts.flatMap(part => part.flashcards),
  tests: []
};

const parts = [require('./m8-spatiu-p1'), require('./m8-spatiu-p2')];
module.exports = {
  key: "matematica:8:spatiu",
  flashcards: parts.flatMap(part => part.flashcards),
  tests: []
};

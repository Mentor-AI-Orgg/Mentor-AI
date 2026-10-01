const parts = [require('./m7-geo7-p1'), require('./m7-geo7-p2')];
module.exports = {
  key: "matematica:7:geo7",
  flashcards: parts.flatMap(part => part.flashcards),
  tests: []
};

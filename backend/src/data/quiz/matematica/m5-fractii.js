const parts = [require('./m5-fractii-p1'), require('./m5-fractii-p2')];
module.exports = {
  key: "matematica:5:fractii",
  flashcards: parts.flatMap(part => part.flashcards),
  tests: []
};

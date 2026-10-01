const parts = [require('./m6-triunghi-p1'), require('./m6-triunghi-p2')];
module.exports = {
  key: "matematica:6:triunghi",
  flashcards: parts.flatMap(part => part.flashcards),
  tests: []
};

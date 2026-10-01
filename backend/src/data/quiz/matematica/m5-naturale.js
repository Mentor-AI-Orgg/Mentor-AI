const parts = [require('./m5-naturale-p1'), require('./m5-naturale-p2')];
module.exports = {
  key: "matematica:5:naturale",
  flashcards: parts.flatMap(part => part.flashcards),
  tests: []
};

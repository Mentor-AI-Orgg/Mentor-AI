const parts = [require('./r5-cuvinte-p1'), require('./r5-cuvinte-p2')];
module.exports = {
  key: "romana:5:cuvinte",
  flashcards: parts.flatMap(part => part.flashcards),
  tests: []
};

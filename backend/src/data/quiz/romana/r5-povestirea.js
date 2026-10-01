const parts = [require('./r5-povestirea-p1'), require('./r5-povestirea-p2')];
module.exports = {
  key: "romana:5:povestirea",
  flashcards: parts.flatMap(part => part.flashcards),
  tests: []
};

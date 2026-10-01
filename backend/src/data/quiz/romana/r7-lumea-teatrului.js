const parts = [require('./r7-lumea-teatrului-p1'), require('./r7-lumea-teatrului-p2')];
module.exports = {
  key: "romana:7:lumea-teatrului",
  flashcards: parts.flatMap(part => part.flashcards),
  tests: []
};

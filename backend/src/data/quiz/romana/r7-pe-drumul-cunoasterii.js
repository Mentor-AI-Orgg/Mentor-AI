const parts = [require('./r7-pe-drumul-cunoasterii-p1'), require('./r7-pe-drumul-cunoasterii-p2')];
module.exports = {
  key: "romana:7:pe-drumul-cunoasterii",
  flashcards: parts.flatMap(part => part.flashcards),
  tests: []
};

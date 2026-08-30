const { GRADES, SUBJECT_IDS } = require("./gimnaziuGuide");

const LANGUAGES = [
  { id: "ro", name: "Română", flag: "🇷🇴" },
  { id: "en", name: "English", flag: "🇬🇧" }
];

const SUBJECTS = [
  {
    id: "matematica",
    name: { ro: "Matematică", en: "Mathematics" },
    cycles: ["gimnazial"],
    icon: "fa-square-root-alt"
  },
  {
    id: "romana",
    name: { ro: "Limba și literatura română", en: "Romanian language and literature" },
    cycles: ["gimnazial"],
    icon: "fa-book"
  }
];

const CYCLES = [
  {
    id: "gimnazial",
    name: { ro: "Gimnazial", en: "Middle school" },
    classes: GRADES.slice()
  }
];

module.exports = { LANGUAGES, SUBJECTS, CYCLES, SUBJECT_IDS, GRADES };

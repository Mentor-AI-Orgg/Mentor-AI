// leaderboard mock — pana se conecteaza o baza de date reala (ex: Postgres/Mongo)
// cu utilizatori reali si XP calculat din activitate.

const MOCK_LEADERBOARD = [
  { id: "u1", name: "Ana Popescu", initials: "AP", xp: 4820, streak: 41, level: 12, class: "a XI-a" },
  { id: "u2", name: "David Ionescu", initials: "DI", xp: 4390, streak: 33, level: 11, class: "a XII-a" },
  { id: "u3", name: "Maria Radu", initials: "MR", xp: 4110, streak: 28, level: 10, class: "a X-a" },
  { id: "u4", name: "Andrei Stan", initials: "AS", xp: 3765, streak: 19, level: 10, class: "a XI-a" },
  { id: "u5", name: "Elena Marin", initials: "EM", xp: 3502, streak: 22, level: 9, class: "a IX-a" },
  { id: "u6", name: "Vlad Dumitru", initials: "VD", xp: 3190, streak: 14, level: 9, class: "a XII-a" },
  { id: "u7", name: "Ioana Vasile", initials: "IV", xp: 2884, streak: 17, level: 8, class: "a X-a" },
  { id: "u8", name: "Cristian Toma", initials: "CT", xp: 2510, streak: 9, level: 7, class: "a XI-a" },
  { id: "u9", name: "Sofia Constantin", initials: "SC", xp: 2201, streak: 12, level: 7, class: "a IX-a" },
  { id: "u10", name: "Matei Georgescu", initials: "MG", xp: 1875, streak: 6, level: 6, class: "a X-a" }
];

module.exports = { MOCK_LEADERBOARD };

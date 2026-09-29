// Titluri din prototipul „cod cu Claude”: se deblochează din faptă, nu din magazin.
// Țintele sunt tăiate la scară de gimnaziu (8 capitole / clasă, nu 100 de lecții).

const TITLE_CATALOG = [
  { id: "prima-lectie", name: "Prima lecție", emoji: "🎓", description: "Termină primul capitol." },
  { id: "elev-dedicat", name: "Elev dedicat", emoji: "📚", description: "Termină 8 capitole." },
  { id: "invatacei-harnic", name: "Învățăcel harnic", emoji: "📖", description: "Termină 16 capitole." },
  { id: "maestru-teste", name: "Maestru la teste", emoji: "🧠", description: "Rezolvă 10 teste de capitol." },
  { id: "pe-de-rost", name: "Pe de rost", emoji: "🎯", description: "Primește de 5 ori recompensa de flashcarduri." },
  { id: "foc-7", name: "Foc de 7 zile", emoji: "🔥", description: "Ține streak-ul 7 zile la rând." },
  { id: "foc-30", name: "Foc de 30 de zile", emoji: "🔥", description: "Ține streak-ul 30 de zile." },
  { id: "primul-prieten", name: "Primul prieten", emoji: "👥", description: "Ai cel puțin un prieten." },
  { id: "prima-cumparare", name: "Prima cumpărătură", emoji: "🛒", description: "Cumpără un obiect din magazin." },
  { id: "colectionar", name: "Colecționar", emoji: "🎨", description: "Deține 5 obiecte din magazin." },
  { id: "ciocarlie", name: "Ciocârlie", emoji: "🌅", description: "Învață înainte de ora 8, în 5 zile diferite." },
  { id: "campion", name: "Campion", emoji: "🏆", description: "Ajungi pe locul 1 în clasament, cu XP." },
  { id: "curs-incheiat", name: "Curs încheiat", emoji: "🏅", description: "Termină toate capitolele clasei tale." },
  // id-ul vechi rămâne, ca insignele deja primite să nu se piardă.
  { id: "mentor-curios", name: "Tutore curios", emoji: "💬", description: "Întreabă tutorele de 10 ori." }
];

function countAllDone(user) {
  return Object.values(user.chapters || {}).filter(item => item && item.status === "done").length;
}

function mentorAsks(user) {
  return Object.values(user.mentorAwards || {}).reduce((sum, value) => sum + Number(value || 0), 0);
}

function friendCount(email) {
  try {
    const { friendList } = require("./friendStore");
    return friendList(email).length;
  } catch {
    return 0;
  }
}

function isChampion(user, listLeaderboardEntries) {
  if (!user || Number(user.xp || 0) <= 0 || typeof listLeaderboardEntries !== "function") return false;
  const board = listLeaderboardEntries({ limit: 3, currentEmail: user.userId });
  const first = board[0];
  return Boolean(first && first.isCurrentUser && Number(first.xp || 0) > 0);
}

function unlockedTitleIds(user, helpers = {}) {
  const done = countAllDone(user);
  const grade = user.preferences?.className || "5";
  const gradeDone = helpers.countDoneChapters ? helpers.countDoneChapters(user, grade) : 0;
  const gradeTotal = helpers.chapterUniverse ? helpers.chapterUniverse(grade) : 0;
  const tests = Object.keys(user.practiceTests || {}).length;
  const flashDays = Object.keys(user.flashcardRewardDates || {}).length;
  const streak = Number(user.metrics?.streak || 0);
  const owned = (user.inventory || []).length;
  const early = (user.earlyBirdDays || []).length;
  const friends = friendCount(user.userId);
  const champion = isChampion(user, helpers.listLeaderboardEntries);

  const checks = {
    "prima-lectie": done >= 1,
    "elev-dedicat": done >= 8,
    "invatacei-harnic": done >= 16,
    "maestru-teste": tests >= 10,
    "pe-de-rost": flashDays >= 5,
    "foc-7": streak >= 7,
    "foc-30": streak >= 30,
    "primul-prieten": friends >= 1,
    "prima-cumparare": owned >= 1,
    "colectionar": owned >= 5,
    ciocarlie: early >= 5,
    campion: champion,
    "curs-incheiat": gradeTotal > 0 && gradeDone >= gradeTotal,
    "mentor-curios": mentorAsks(user) >= 10
  };

  return TITLE_CATALOG.filter(item => checks[item.id]).map(item => item.id);
}

function titleById(id) {
  return TITLE_CATALOG.find(item => item.id === id) || null;
}

function bucharestHour(from = new Date()) {
  return Number(new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Bucharest",
    hour: "numeric",
    hour12: false
  }).format(from));
}

function noteEarlyBird(user, todayKey, from = new Date()) {
  if (!user.earlyBirdDays) user.earlyBirdDays = [];
  if (bucharestHour(from) >= 8) return;
  if (!user.earlyBirdDays.includes(todayKey)) user.earlyBirdDays.push(todayKey);
}

module.exports = {
  TITLE_CATALOG,
  unlockedTitleIds,
  titleById,
  noteEarlyBird,
  bucharestHour
};

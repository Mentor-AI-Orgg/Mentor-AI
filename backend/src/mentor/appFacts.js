// Fapte despre aplicație, copiate din textele deja arătate copilului
// (frontend/help/articles.js, frontend/help/ask.js) și din premiile din cod.
// Tutorele nu inventează un ecran sau o sumă care nu e aici.

const { AWARDS } = require("../data/progressEngine");

const ARTICLES = [
  {
    id: "lectie",
    title: "Cum deschizi o lecție",
    route: "#/lectii",
    keys: ["lectie", "lectii", "lectiile", "capitol", "capitole", "capitolul", "unde sunt lectiile", "deschid o lectie"],
    body: "De pe prima pagină apeși Limba română sau Matematică. Alegi clasa, apoi un capitol. Citești lecția și abia după aceea treci la exerciții. Dacă ai lăsat un capitol la jumătate, butonul Continuă te duce înapoi acolo."
  },
  {
    id: "test",
    title: "Testul de la capitol",
    route: "#/lectii",
    keys: ["test", "testul", "testele", "test de capitol", "testul capitolului", "where is the test", "chapter test"],
    body: "După lecție poți da testul capitolului. Dacă greșești, răspunsul nu îți e dat gata. Îl mai încerci, iar greșeala ajunge în caiet ca să o repeți mai târziu."
  },
  {
    id: "flash",
    title: "Flashcard-uri",
    route: "#/lectii",
    keys: ["flashcard", "flashcarduri", "flashcardurile", "flashcards", "grile"],
    body: "Flashcard-urile stau în lecție, la „Flashcard-uri la lecția asta”, și la capitol, la „Flashcard-uri din tot capitolul”. Le deschizi din Lecții, după ce alegi materia și capitolul."
  },
  {
    id: "caiet",
    title: "Caietul de greșeli",
    route: "#/caiet",
    keys: ["caiet", "caietul", "greseli", "de repetat", "recapituleaza"],
    body: "Greșelile de la exerciții se strâng singure. Într-o zi primești cel mult 10 de repetat, la 1, 3, 7 și 21 de zile. Le găsești la Caiet, de pe prima pagină, când scrie că ai de recapitulat."
  },
  {
    id: "obiectiv-zi",
    title: "Obiectivul zilei",
    route: "#/acasa",
    keys: ["obiectivul zilei", "obiectiv zilnic", "misiuni"],
    body: "Obiectivul zilnic e o lecție. Când ai deschis-o, ziua e gata. Cele trei misiuni de sub ea sunt în plus, dacă mai ai chef. Poți lipsi o zi: săptămâna cere 4 zile, nu șapte."
  },
  {
    id: "obiectiv",
    title: "Obiectivul săptămânii",
    route: "#/acasa",
    keys: ["obiectivul saptamanii", "saptamana", "4 zile"],
    body: "Obiectivul este 4 zile cu lecții în aceeași săptămână, de luni până duminică. Nu trebuie să stai mult și nu trebuie să vii în fiecare zi. Când ajungi la 4, furnicuța te felicită o singură dată în săptămâna aceea."
  },
  {
    id: "en",
    title: "Evaluarea Națională",
    route: "#/en/matematica",
    keys: ["evaluare nationala", "evaluarea nationala", "simulare", "subiecte en", "en"],
    body: "La Evaluare Națională lucrezi ca la examen: subiecte de limba română și matematică pentru clasa a 8-a. Citește cerința de două ori înainte să răspunzi și verifică calculele la final. Cardul e la Lecții, separat de capitolele pe clase."
  },
  {
    id: "magazin",
    title: "Magazinul",
    route: "#/magazin",
    keys: ["magazin", "magazinul", "avatar", "fundal", "cumpar"],
    body: "Magazinul e locul cu avataruri și fundaluri, plătite cu monedele din lecții. Plătești cu monede de studiu, nu cu lei."
  },
  {
    id: "calendar",
    title: "Calendarul",
    route: "#/calendar",
    keys: ["calendar", "calendarul", "ritm", "orar"],
    body: "Calendarul e ecranul cu ritmul tău: zilele în care ai lucrat și orarul, dacă l-ai pus."
  },
  {
    id: "ajutor",
    title: "Ajutorul",
    route: "#/ajutor",
    keys: ["ajutor", "ajutorul", "cum functioneaza aplicatia"],
    body: "Ajutorul e pagina cu articole despre lecții, ritm, examen și cont. O deschizi din meniu, la Ajutor."
  },
  {
    id: "setari",
    title: "Setări",
    route: "#/profil/setari",
    keys: ["setari", "setarile", "profil privat", "cereri de prietenie"],
    body: "Setările sunt în profil, la „Cine te poate găsi”: profil privat și dacă accepți cereri de prietenie."
  },
  {
    id: "tema",
    title: "Temă",
    route: "#/profil/tema",
    keys: ["tema intunecata", "tema luminoasa", "schimb tema", "aspect", "marimea textului"],
    body: "Tema se schimbă din profil, la Aspect: întunecată, luminoasă sau ca telefonul. Acolo sunt și mărimea textului și animațiile."
  },
  {
    id: "clasament",
    title: "Clasament",
    route: "#/profil/clasament",
    keys: ["clasament", "clasamentul", "locul meu"],
    body: "Clasamentul e în profil, mai jos. E după XP, tot timpul. Dacă profilul e privat, se vede locul și punctajul, fără nume."
  },
  {
    id: "prieteni",
    title: "Prieteni",
    route: "#/profil/prieteni",
    keys: ["prieten", "prieteni", "cod de prieten"],
    body: "Prietenii se adaugă din profil: cauți un nume sau trimiți codul de prieten. Poți trimite câteva cereri pe zi."
  },
  {
    id: "parola",
    title: "Parolă",
    route: "#/profil/parola",
    keys: ["parola", "schimb parola", "am uitat parola"],
    body: "Parola se schimbă din profil, la Datele tale de elev: parola actuală, apoi cea nouă."
  },
  {
    id: "cont",
    title: "Cont",
    route: "#/profil/cont",
    keys: ["username", "nume de utilizator", "schimb clasa", "clasa mea"],
    body: "Numele de utilizator și clasa se schimbă din profil, la Datele tale de elev."
  },
  {
    id: "parinte",
    title: "Părintele",
    route: "#/profil/parinte",
    keys: ["email parinte", "parinte", "rezumat parinte"],
    body: "La cont scrii emailul părintelui. Nu confirmă contul. Primește un rezumat pe email și vede același fel de rezumat în zona de părinte: lecții, minute, teste. Nu primește mesajele tale către tutore."
  },
  {
    id: "acasa",
    title: "Acasă",
    route: "#/acasa",
    keys: ["acasa", "prima pagina", "continua"],
    body: "Prima pagină e Acasă. Acolo sunt obiectivul zilei, obiectivul săptămânii și butonul Continuă."
  },
  {
    id: "mentor",
    title: "Tutorele",
    route: "#/mentor",
    keys: ["unde e tutorele", "unde e mentorul", "ecranul mentor"],
    body: "Tutorele e ecranul Mentor. Acolo întrebi despre lecție. Mesajele acelea nu pleacă la părinte."
  }
];

function coinBody() {
  const lines = [
    `La prima intrare: ${AWARDS.login_bonus.coins} de monede.`,
    `Un capitol nou: ${AWARDS.chapter_open.coins}.`,
    `O sesiune terminată: ${AWARDS.session_complete.coins}.`,
    `5 flashcarduri corecte: ${AWARDS.flashcards_5.coins}.`,
    `Concentrare 25 de minute: ${AWARDS.focus_25.coins}; 50 de minute: ${AWARDS.focus_50.coins}.`,
    `Test de capitol: ${AWARDS.chapter_test.coins}.`,
    `Un mesaj către tutore: ${AWARDS.mentor_message.coins}.`,
    `O zi din serie: ${AWARDS.streak_day.coins}.`
  ];
  return `Monedele de studiu nu se cumpără cu lei. Le primești din activitatea din aplicație: ${lines.join(" ")} Le cheltui în Magazin, pe avataruri și fundaluri.`;
}

const COINS = {
  id: "monede",
  title: "Monede de studiu",
  route: "#/magazin",
  keys: ["monede", "moneda", "coins", "cum castig", "earn coins", "bani de studiu"],
  body: coinBody()
};

const STUDY = {
  id: "studiu",
  title: "Cum înveți aici",
  route: "#/acasa",
  body: "Obiectivul zilnic e o lecție. Când ai deschis-o, ziua e gata. Săptămâna cere 4 zile cu lecții, de luni până duminică, nu șapte. Greșelile de la exerciții se strâng în Caiet: într-o zi primești cel mult 10 de repetat, la 1, 3, 7 și 21 de zile."
};

module.exports = { ARTICLES, COINS, STUDY, coinBody };

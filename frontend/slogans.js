const SLOGANS = [
  'Un pas mic. Creierul tău e deja în încălzire.',
  'Greșeala e antrenament, nu semnal de alarmă.',
  'Pe programă, cu barem. Nu e un chat care îți face tema.',
  'Poți da testul de zece ori. Capitolul nu fuge.',
  'Întreabă tutorele de trei ori. A patra oară o să-ți sune cunoscut.',
  'Nu trebuie să știi tot. Trebuie să încerci următorul lucru.',
  'Ai bifat un pas? Ești deja mai departe decât ieri.',
  'Curiozitatea e superputerea ta de gimnaziu.',
  'Dacă te-ai încurcat, e semn că ești pe teren, nu pe tușă.',
  'Limba română și matematică, același joc: înțelegi, apoi încerci.',
  'Hai, încă o întrebare. Creierul tău colecționează stele.',
  'Nu e cursă. E un joc: încerci, vezi, mai încerci.',
  'Astăzi ești detectiv: găsești ideea, nu tocești pagina.'
];

function sloganFor(seed = Date.now()) {
  const index = Math.abs(Number(seed) || 0) % SLOGANS.length;
  return SLOGANS[index];
}

function dailySlogan() {
  const key = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) hash = (hash + key.charCodeAt(i) * (i + 3)) % SLOGANS.length;
  return SLOGANS[hash];
}

export { SLOGANS, sloganFor, dailySlogan };

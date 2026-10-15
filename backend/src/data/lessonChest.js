// Cufăr mic, o dată pe lecție terminată. Alegerea e fixă pentru elev și capitol,
// ca o reîmprospătare să nu schimbe premiul. Nu e din magazin și nu se cumpără.

const crypto = require('crypto');
const { possessiveName } = require('../config/mascot');

const COIN_AMOUNT = 4;
const DAILY_COIN_MAX = 12;

const STICKERS = [
  { id: 'zecita-stea', name: `Steaua ${possessiveName()}`, emoji: '⭐' },
  { id: 'zecita-cana', name: 'Cana de cacao', emoji: '☕' },
  { id: 'zecita-caiet', name: 'Caietul cu colț', emoji: '📒' },
  { id: 'zecita-fulg', name: 'Fulg de pauză', emoji: '❄️' },
  { id: 'zecita-creion', name: 'Creionul ascuțit', emoji: '✏️' },
  { id: 'zecita-rucsac', name: 'Rucsacul de potecă', emoji: '🎒' },
  { id: 'zecita-frunza', name: 'Frunza de semn', emoji: '🍃' },
  { id: 'zecita-luna', name: 'Luna de deasupra', emoji: '🌙' },
  { id: 'zecita-floare', name: 'Floarea de pe caiet', emoji: '🌸' },
  { id: 'zecita-cheie', name: 'Cheia sertarului', emoji: '🔑' },
  { id: 'zecita-busola', name: 'Busola mică', emoji: '🧭' },
  { id: 'zecita-pin', name: 'Pinul de pe hartă', emoji: '📍' },
  { id: 'zecita-cizma', name: 'Cizma de ploaie', emoji: '👢' },
  { id: 'zecita-esarfa', name: 'Eșarfa cu dungi', emoji: '🧣' },
  { id: 'zecita-mar', name: 'Mărul de pauză', emoji: '🍎' },
  { id: 'zecita-semn', name: 'Semnul de carte', emoji: '🔖' },
  { id: 'zecita-clopotel', name: 'Clopoțelul de început', emoji: '🔔' },
  { id: 'zecita-nor', name: 'Norul blând', emoji: '☁️' },
  { id: 'zecita-piatra', name: 'Pietricica din buzunar', emoji: '🪨' },
  { id: 'zecita-poteca', name: `Poteca ${possessiveName()}`, emoji: '🐾' }
];

const FACTS = [
  'Zero este un număr par.',
  'Un cerc nu are colțuri.',
  '10% din 50 este 5.',
  'Un triunghi are trei laturi, oricât de strâmb ar fi.',
  'Suma unghiurilor unui triunghi este 180 de grade.',
  'Un pătrat are patru laturi egale și patru unghiuri drepte.',
  '1/2 este egal cu 0,5.',
  'Numărul 1 nu este nici prim, nici compus.',
  'Cel mai mic număr prim este 2.',
  '2 este singurul număr prim par.',
  'Perimetrul unui pătrat cu latura de 3 cm este 12 cm.',
  'Aria unui dreptunghi este lungimea înmulțită cu lățimea.',
  '3/6 este egal cu 1/2.',
  'Media aritmetică a numerelor 4 și 6 este 5.',
  'Un unghi drept măsoară 90 de grade.',
  '25% din 80 este 20.',
  'Modulul lui -5 este 5.',
  'Un kilometru are 1 000 de metri.',
  'Produsul a două numere negative este un număr pozitiv.',
  'Rădăcina pătrată din 9 este 3, pentru că 3 × 3 = 9.',
  'În limba română scriem „sunt”, chiar dacă uneori se aude altfel.',
  'Substantivul numește ființe, lucruri sau fenomene.',
  'Verbul arată o acțiune, o stare sau o devenire.',
  'Adjectivul arată o însușire.',
  'Propoziția are un singur predicat.',
  'Fraza are cel puțin două predicate.',
  'Pluralul lui „copil” este „copii”.',
  '„Într-un” se scrie cu cratimă.',
  'Un diftong unește o vocală și o semivocală în aceeași silabă.',
  'Semnul întrebării încheie o propoziție interogativă.',
  '„Nicidecum” se scrie într-un singur cuvânt.',
  'Pronumele ține locul unui substantiv.',
  '„A fi” și „a avea” pot fi verbe auxiliare.',
  '„sa” și „s-a” nu înseamnă același lucru.',
  'Diacriticele românești sunt ă, â, î, ș și ț.',
  'Apa fierbe la 100 °C la presiune normală.',
  'Apa îngheață la 0 °C la presiune normală.',
  'Pământul înconjoară Soarele în aproximativ 365 de zile.',
  'Luna este satelitul natural al Pământului.',
  'La lumină, plantele eliberează oxigen prin fotosinteză.',
  'Inima pompează sângele prin corp.',
  'Forța de greutate atrage obiectele spre Pământ.',
  'Sunetul nu se propagă prin vid.',
  'Densitatea este masa împărțită la volum.',
  'Un an bisect are 366 de zile.',
  'Capitala României este București.',
  'Dunărea se varsă în Marea Neagră.',
  'Vârful Moldoveanu, din Munții Făgăraș, este cel mai înalt din România.',
  'Ecuatorul desparte emisfera nordică de emisfera sudică.',
  'România se află în Europa.',
  'Marea Neagră scaldă sud-estul României.',
  'Carpații străbat România.',
  'Cel mai lung fluviu din Europa este Volga.',
  'În 1600 Mihai Viteazul a unit pentru scurt timp cele trei țări române.',
  'În 1859 Alexandru Ioan Cuza a fost ales domn în Moldova și în Țara Românească.',
  'În 1881 România a devenit regat.',
  'La 1 decembrie 1918, la Alba Iulia, Transilvania s-a unit cu România.',
  'Ștefan cel Mare a fost domn al Moldovei.',
  'Romanii au cucerit Dacia în anul 106, sub împăratul Traian.',
  'Independența de stat a României a fost proclamată în 1877.'
];

function hashInt(text) {
  return crypto.createHash('sha256').update(String(text)).digest().readUInt32BE(0);
}

function stickerById(id) {
  return STICKERS.find(item => item.id === id) || null;
}

function pickFact(userId, key, seenFacts) {
  const seen = new Set(seenFacts || []);
  const fresh = FACTS.filter(item => !seen.has(item));
  const pool = fresh.length ? fresh : FACTS;
  return pool[hashInt(`${userId}:${key}:fact`) % pool.length];
}

function decideChest({ userId, key, owned = [], seenFacts = [], coinRoom = 0 }) {
  const roll = hashInt(`${userId}:${key}:chest`) % 3;
  const free = STICKERS.filter(item => !owned.includes(item.id));
  const sticker = free.length ? free[hashInt(`${userId}:${key}:sticker`) % free.length] : null;
  const fact = pickFact(userId, key, seenFacts);
  const coins = Math.min(COIN_AMOUNT, Math.max(0, Number(coinRoom) || 0));

  const asCoins = coins > 0 ? { kind: 'coins', coins, sticker: null, fact: '' } : null;
  const asSticker = sticker ? { kind: 'sticker', coins: 0, sticker, fact: '' } : null;
  const asFact = { kind: 'fact', coins: 0, sticker: null, fact };

  const order = roll === 0 ? [asCoins, asSticker, asFact] : roll === 1 ? [asSticker, asCoins, asFact] : [asFact, asCoins, asSticker];
  return order.find(Boolean);
}

function chestLabel(reward) {
  if (!reward) return '';
  if (reward.kind === 'coins') return `Ai găsit ${reward.coins} monede.`;
  if (reward.kind === 'sticker') return `${reward.sticker.emoji} ${reward.sticker.name}.`;
  return reward.fact;
}

module.exports = {
  COIN_AMOUNT,
  DAILY_COIN_MAX,
  STICKERS,
  FACTS,
  stickerById,
  decideChest,
  chestLabel
};

// Surse încă protejate. Citatele de peste 12 cuvinte din lecția care le
// pomenește sunt semnalate. Needle-urile sunt deja fără diacritice, ca
// normalizeRo(). La ziare evităm cuvintele obișnuite („adevărul”, „libertatea”).

export const PROTECTED_SOURCES = [
  { id: 'sadoveanu', name: 'Mihail Sadoveanu', needles: ['sadoveanu'] },
  { id: 'stanescu', name: 'Nichita Stănescu', needles: ['nichita stanescu', 'stanescu'] },
  { id: 'sorescu', name: 'Marin Sorescu', needles: ['sorescu'] },
  { id: 'blandiana', name: 'Ana Blandiana', needles: ['blandiana'] },
  { id: 'cartarescu', name: 'Mircea Cărtărescu', needles: ['cartarescu'] },
  { id: 'preda', name: 'Marin Preda', needles: ['marin preda'] },
  { id: 'arghezi', name: 'Tudor Arghezi', needles: ['arghezi'] },
  { id: 'eliade', name: 'Mircea Eliade', needles: ['mircea eliade'] },
  { id: 'bully', name: 'BULLY', needles: ['bully'] },
  { id: 'adevarul', name: 'Adevărul', needles: ['ziarul adevarul', 'adevarul.ro'] },
  { id: 'libertatea', name: 'Libertatea', needles: ['ziarul libertatea', 'libertatea.ro'] },
  { id: 'hotnews', name: 'HotNews', needles: ['hotnews'] },
  { id: 'digi24', name: 'Digi24', needles: ['digi24'] },
  { id: 'protv', name: 'Pro TV', needles: ['protv', 'pro tv'] },
  { id: 'mediafax', name: 'Mediafax', needles: ['mediafax'] },
  { id: 'g4media', name: 'G4Media', needles: ['g4media'] },
  { id: 'recorder', name: 'Recorder', needles: ['recorder.ro'] },
  { id: 'pressone', name: 'PressOne', needles: ['pressone'] },
  { id: 'agerpres', name: 'Agerpres', needles: ['agerpres'] }
];

// Domeniu public: citatele nu se semnalează. Frazele-cheie se verifică în continuare.
export const PUBLIC_DOMAIN_AUTHORS = [
  { id: 'eminescu', name: 'Mihai Eminescu', needles: ['eminescu'] },
  { id: 'creanga', name: 'Ion Creangă', needles: ['creanga'] },
  { id: 'caragiale', name: 'I. L. Caragiale', needles: ['caragiale'] },
  { id: 'cosbuc', name: 'George Coșbuc', needles: ['cosbuc'] }
];

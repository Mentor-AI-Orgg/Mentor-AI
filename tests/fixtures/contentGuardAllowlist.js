// Excepții intenționate. Fiecare intrare are un motiv.
// lessonId este id-ul lecției. field și patternId sunt opționale:
// dacă lipsesc, excepția acoperă toată lecția, respectiv orice motiv.
//
// Exemplu:
// { lessonId: 'scrisoarea-iii', field: 'theory', patternId: 'citat-lung',
//   reason: 'citat scurt analizat, cu sursa, sub 25 de cuvinte rămase după tăiere' }

export const CONTENT_GUARD_ALLOWLIST = [];

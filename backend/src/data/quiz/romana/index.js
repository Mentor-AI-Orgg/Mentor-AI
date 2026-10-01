const r8_recapitulare_examen = require('./r8-recapitulare-examen');
const r8_calatoria = require('./r8-calatoria');
const r8_lume_sentimente = require('./r8-lume-sentimente');
const r8_valori_ascultare = require('./r8-valori-ascultare');
const r8_traditie_inovatie = require('./r8-traditie-inovatie');
const r8_modele_antimodele = require('./r8-modele-antimodele');
const r8_familia_comunitate = require('./r8-familia-comunitate');
const r7_recapitulare_initiala = require('./r7-recapitulare-initiala');
const r7_pe_drumul_cunoasterii = require('./r7-pe-drumul-cunoasterii');
const r7_punti_intre_lumi = require('./r7-punti-intre-lumi');
const r7_taramul_sentimentelor = require('./r7-taramul-sentimentelor');
const r7_lumea_teatrului = require('./r7-lumea-teatrului');
const r7_calator_prin_lume = require('./r7-calator-prin-lume');
const r7_privind_catre_mine = require('./r7-privind-catre-mine');
const r6_recapitulare_initiala = require('./r6-recapitulare-initiala');
const r6_lumea_de_acasa = require('./r6-lumea-de-acasa');
const r6_taramul_prieteniei = require('./r6-taramul-prieteniei');
const r6_intelepciunea_lumii = require('./r6-intelepciunea-lumii');
const r6_tablouri_de_poveste = require('./r6-tablouri-de-poveste');
const r6_calatorii_literare = require('./r6-calatorii-literare');
const r6_ferestre_spre_viitor = require('./r6-ferestre-spre-viitor');
const r6_incheierea_anului = require('./r6-incheierea-anului');
const r5_evaluare_initiala = require('./r5-evaluare-initiala');
const r5_cuvinte = require('./r5-cuvinte');
const r5_cartea = require('./r5-cartea');
const r5_povestirea = require('./r5-povestirea');
const r5_prietenia = require('./r5-prietenia');
const r5_natura = require('./r5-natura');
const r5_trepte = require('./r5-trepte');
const r5_eroi = require('./r5-eroi');

const CHAPTERS = [
  r8_recapitulare_examen,
  r8_calatoria,
  r8_lume_sentimente,
  r8_valori_ascultare,
  r8_traditie_inovatie,
  r8_modele_antimodele,
  r8_familia_comunitate,
  r7_recapitulare_initiala,
  r7_pe_drumul_cunoasterii,
  r7_punti_intre_lumi,
  r7_taramul_sentimentelor,
  r7_lumea_teatrului,
  r7_calator_prin_lume,
  r7_privind_catre_mine,
  r6_recapitulare_initiala,
  r6_lumea_de_acasa,
  r6_taramul_prieteniei,
  r6_intelepciunea_lumii,
  r6_tablouri_de_poveste,
  r6_calatorii_literare,
  r6_ferestre_spre_viitor,
  r6_incheierea_anului,
  r5_evaluare_initiala,
  r5_cuvinte,
  r5_cartea,
  r5_povestirea,
  r5_prietenia,
  r5_natura,
  r5_trepte,
  r5_eroi
];

const BY_KEY = Object.fromEntries(CHAPTERS.map(chapter => [chapter.key, {
  flashcards: chapter.flashcards || [],
  tests: chapter.tests || []
}]));

function flashcardsFor(key) {
  return (BY_KEY[key] && BY_KEY[key].flashcards) || [];
}

module.exports = { BY_KEY, CHAPTERS, flashcardsFor };

// Corectare din poză: compunere EN sau Subiectul III la mate.
// Vision (GPT-4o) dacă e cheie; altfel OCR Mathpix + barem; altfel mesaj-ghid.
// Maximum 3 poze/zi — costul e real (vision/OCR), deci nu lăsăm nelimitat.

const { callGPT4o } = require('../providers/openai');
const { recognizeImage } = require('../providers/mathpix');
const { gradeWriting } = require('./writingRubric');
const { getBundle } = require('../data/enPaperFactory');

function dataUrl(imageBase64) {
  const raw = String(imageBase64 || '').trim();
  if (!raw) return '';
  if (raw.startsWith('data:')) return raw;
  return `data:image/jpeg;base64,${raw}`;
}

function parseJsonish(text) {
  const raw = String(text || '').trim();
  const fence = raw.match(/\{[\s\S]*\}/);
  if (!fence) return null;
  try {
    return JSON.parse(fence[0]);
  } catch {
    return null;
  }
}

function compositionPrompt(item, barem) {
  const ideas = (barem.ideas || []).join('\n- ');
  return `Ești profesor de limba română la Evaluarea Națională, clasa a VIII-a. Elevul a scris pe caiet compunerea (Subiectul II) și ți-a fotografiat pagina.

Cerința:
${item.prompt}

Idei de barem (NU da un text-model de copiat):
- ${ideas || (barem.explain || '')}

Citește poza. Răspunde STRICT cu JSON:
{
  "extracted": "transcriere scurtă a ce se vede, max 400 cuvinte",
  "wordCount": 0,
  "points": 0,
  "max": ${Number(item.points) || 20},
  "feedback": "feedback de profesor, 6-10 fraze, pe română, pe baza programei și a baremului: ce e bine, ce lipsește, ce să corecteze",
  "tips": ["un sfat concret", "al doilea", "al treilea"]
}
Punctează 0–${Number(item.points) || 20}: încadrare, conținut, organizare, stil, corectitudine. Dacă poza e ștearsă, points=0 și spune să reia fotografia.`;
}

function mathPrompt(item, barem) {
  const parts = (barem.parts && typeof barem.parts === 'object')
    ? Object.entries(barem.parts).map(([id, part]) => `${id}) rezultat așteptat: ${part.answer}. ${part.solution || part.explain || ''}`).join('\n')
    : (barem.solution || barem.explain || '');
  return `Ești profesor de matematică la Evaluarea Națională, clasa a VIII-a. Elevul a rezolvat pe caiet Subiectul III și ți-a fotografiat pagina. În aplicație a scris doar rezultatul; tu verifici redactarea completă.

Enunț:
${item.prompt}
${(item.parts || []).map(part => `${part.id}) ${part.prompt}`).join('\n')}

Barem / rezolvare corectă (orice metodă corectă e acceptată):
${parts}

Citește poza. Răspunde STRICT cu JSON:
{
  "extracted": "ce se vede: calcule, figuri, rezultate",
  "points": null,
  "feedback": "feedback de profesor, 6-10 fraze: ce e corect, unde e gaura, un pas de reparat. Nu da rezolvarea gata de copiat dacă elevul n-a scris nimic lizibil; dă primul pas.",
  "tips": ["un sfat de metodă", "un sfat de redactare (enunț, calcule, răspuns subliniat)", "un sfat din programă"]
}
Nu înlocui nota de pe rezultat; e feedback de caiet.`;
}

function mockFromBarem({ kind, item, barem, extracted }) {
  const ideas = (barem.ideas || []).join(' ');
  const steps = (barem.steps || []).join(' · ');
  if (kind === 'composition' || kind === 'write') {
    const rubric = extracted ? gradeWriting(extracted, { long: true, minWords: 80 }) : null;
    return {
      extracted: extracted || '',
      points: rubric ? Math.round((rubric.total / 30) * (item.points || 20)) : 0,
      max: item.points || 20,
      feedback: extracted
        ? `${rubric.teacher} Pe caiet caută: ${ideas || barem.explain || 'cerința, 150 de cuvinte, două idei, un capăt.'}`
        : `Am primit poza, dar nu citesc pagina (mediul e fără cheie de vision). Pe caiet trebuie min. 150 de cuvinte, pe cerință. Baremul: ${ideas || barem.explain}. Fotografiază toată pagina, drept, cu lumină.`,
      tips: (barem.steps || ['Plan pe ciornă', '150+ cuvinte', 'Recitește acordul']).slice(0, 3),
      mocked: true
    };
  }
  return {
    extracted: extracted || '',
    points: null,
    feedback: extracted
      ? `Am citit de pe pagină: «${extracted.slice(0, 220)}». Compară cu baremul: ${steps || barem.explain || 'enunț, calcule, răspuns subliniat'}.`
      : `Am primit poza de la Subiectul III. Fără cheie de vision nu transcriu calculele. Pe caiet: enunț, calcule, răspuns subliniat. Rezolvarea din barem apare după predare; poza e ca să-ți spun unde e gaura de metodă.`,
    tips: ['Scrie enunțul cu datele', 'Justifică fiecare pas', 'Subliniază rezultatul cu unitatea'],
    mocked: true
  };
}

async function reviewEnPhoto({ imageBase64, kind, item, barem }) {
  const url = dataUrl(imageBase64);
  const prompt = kind === 'math-iii'
    ? mathPrompt(item, barem)
    : compositionPrompt(item, barem);

  const gpt = await callGPT4o(
    [
      { role: 'system', content: 'Profesor de gimnaziu, română și matematică, Evaluare Națională. Răspunzi doar cu JSON valid. Nu inventa un eseu-model.' },
      { role: 'user', content: prompt }
    ],
    'ro',
    { imageBase64: url, timeoutMs: 20000 }
  );

  if (gpt?.success && !gpt.mocked) {
    const parsed = parseJsonish(gpt.content);
    if (parsed && (parsed.feedback || parsed.extracted)) {
      return {
        extracted: String(parsed.extracted || ''),
        points: parsed.points == null ? null : Number(parsed.points),
        max: Number(parsed.max) || item.points || 20,
        feedback: String(parsed.feedback || gpt.content),
        tips: Array.isArray(parsed.tips) ? parsed.tips.map(String).slice(0, 5) : [],
        mocked: false,
        engine: gpt.engine
      };
    }
    if (gpt.content) {
      return {
        extracted: '',
        points: null,
        feedback: gpt.content,
        tips: [],
        mocked: false,
        engine: gpt.engine
      };
    }
  }

  const ocr = await recognizeImage(url);
  const extracted = (ocr?.success && !ocr.mocked && (ocr.text || ocr.latex)) ? String(ocr.text || ocr.latex) : '';
  const fallback = mockFromBarem({ kind, item, barem, extracted });
  if (extracted && kind !== 'math-iii') {
    fallback.engine = 'mathpix+rubric';
    fallback.mocked = Boolean(ocr.mocked);
  } else {
    fallback.engine = gpt?.engine || 'barem-guide';
  }
  return fallback;
}

function targetFromPaper(paperId, target) {
  const bundle = getBundle(paperId);
  if (!bundle) return null;
  const want = String(target || '');
  let found = null;
  (bundle.public.blocks || []).forEach(block => {
    (block.items || []).forEach(item => {
      if (!item.n || item.kind === 'passage' || item.passage) return;
      const key = `${block.label}:${item.n}`;
      const isWrite = item.kind === 'write' && (want === 'composition' || want === 'write' || want === key);
      const isMath = (item.kind === 'en-parts' || item.parts) && (want === 'math-iii' || want === key);
      if (isWrite || isMath) {
        if (!found || want === key) {
          found = { block: block.label, n: item.n, item, barem: bundle.barem[key] || {}, kind: isWrite ? 'write' : 'math-iii' };
        }
      }
    });
  });
  return found;
}

module.exports = { reviewEnPhoto, targetFromPaper, dataUrl };

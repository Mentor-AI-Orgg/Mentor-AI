import { useEffect, useMemo, useState } from 'react';
import { MentorAPI } from '../apiClient.js';
import { verdictLabel } from '../verdictCopy.js';
import QuoteCard from './QuoteCard.jsx';
import GeoFigure from './GeoFigure.jsx';

const LETTERS = ['A', 'B', 'C', 'D'];

function countWords(text) {
  return String(text || '').trim().split(/\s+/).filter(Boolean).length;
}

function WordMeter({ text, minWords, maxWords }) {
  const n = countWords(text);
  const hasMin = Number(minWords) > 0;
  const hasMax = Number(maxWords) > 0;
  if (!hasMin && !hasMax) {
    return n > 0 ? <small className="en-word-meter">{n} {n === 1 ? 'cuvânt' : 'cuvinte'}</small> : null;
  }
  const enough = !hasMin || n >= Number(minWords);
  const notOver = !hasMax || n <= Number(maxWords);
  const inRange = enough && notOver && n > 0;
  const range = hasMin && hasMax
    ? `${minWords}–${maxWords}`
    : hasMin
      ? `minimum ${minWords}`
      : `maximum ${maxWords}`;
  return (
    <small className={`en-word-meter ${inRange ? 'is-ok' : (n > 0 ? 'is-short' : '')}`}>
      {n} {n === 1 ? 'cuvânt' : 'cuvinte'} · cerință {range}
    </small>
  );
}

function clock(ms) {
  const total = Math.max(0, Math.ceil(Number(ms) || 0) / 1000);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = Math.floor(total % 60);
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function stayLabel(ms) {
  if (!ms || ms < 1000) return 'fără timp minim';
  if (ms >= 50 * 60 * 1000) {
    const hours = Math.round(ms / 3600000);
    return hours <= 1 ? 'o oră' : `${hours} ore`;
  }
  const minutes = Math.max(1, Math.round(ms / 60000));
  return minutes === 1 ? 'un minut' : `${minutes} minute`;
}

function draftKey(paperId) {
  return `en-draft:${paperId}`;
}

function loadDraft(paperId) {
  if (typeof window === 'undefined' || !paperId) return {};
  try {
    const raw = window.sessionStorage.getItem(draftKey(paperId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveDraft(paperId, answers) {
  if (typeof window === 'undefined' || !paperId) return;
  try {
    window.sessionStorage.setItem(draftKey(paperId), JSON.stringify(answers));
  } catch {
    // sessionStorage full or private mode — answers stay only in memory
  }
}

function EnPhotoBox({ paperId, target, label, remaining, onDone }) {
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');

  const readFile = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Nu am putut citi poza.'));
    reader.readAsDataURL(file);
  });

  const send = async event => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (file.size > 4_500_000) {
      setNote('Poza e prea mare (max 4,5 MB). Taie pagina sau coboară calitatea.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setNote('Trimite o fotografie a paginii din caiet.');
      return;
    }
    setBusy(true);
    setNote('');
    try {
      const dataUrl = await readFile(file);
      const response = await MentorAPI.reviewEnPhoto({
        paper_id: paperId,
        target,
        image_base64: dataUrl
      });
      if (!response.success) {
        setNote(response.error || 'Nu am putut citi poza. Mai ai voie doar 3 pe zi.');
        if (response.photoQuota) onDone({ photoQuota: response.photoQuota });
        return;
      }
      onDone(response.data);
    } catch (error) {
      setNote(error.message || 'Nu am putut citi poza.');
    } finally {
      setBusy(false);
    }
  };

  const blocked = remaining <= 0;
  return (
    <div className="en-photo-box">
      <p>
        {label}
        {' '}
        <small>{remaining} poze rămase azi (din 3).</small>
      </p>
      <label className={`ghost-button en-photo-btn ${blocked || busy ? 'is-disabled' : ''}`}>
        <input type="file" accept="image/*" capture="environment" hidden disabled={blocked || busy} onChange={send} />
        {busy ? 'Mentorul citește pagina…' : blocked ? 'Ai folosit cele 3 poze de azi' : 'Fotografiază pagina din caiet'}
      </label>
      {note ? <small className="guide-error">{note}</small> : null}
    </div>
  );
}

const EnPaperView = ({ paper, onClose, session: initialSession }) => {
  const [session, setSession] = useState(initialSession || null);
  const [answers, setAnswers] = useState(() => loadDraft(paper?.id));
  const [starting, setStarting] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [error, setError] = useState('');
  const [now, setNow] = useState(Date.now());
  const [result, setResult] = useState(initialSession?.result || null);
  const [photoQuota, setPhotoQuota] = useState({ remaining: 3, used: 0, limit: 3 });

  useEffect(() => {
    if (!paper?.id) return undefined;
    MentorAPI.openEnPaper({ paper_id: paper.id }).then(response => {
      if (!response.success) return;
      setSession(response.data.session);
      if (response.data.session?.result) setResult(response.data.session.result);
      if (response.data.photoQuota) setPhotoQuota(response.data.photoQuota);
    });
    return undefined;
  }, [paper?.id]);

  useEffect(() => {
    if (!session?.started || session.finished) return undefined;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [session?.started, session?.finished]);

  const isDrill = paper?.mode === 'drill' || session?.mode === 'drill' || Number(paper?.minStayMinutes) === 0;
  const stayMs = isDrill
    ? 0
    : (Number.isFinite(Number(session?.minStayMs))
      ? Number(session.minStayMs)
      : (Number(paper?.minStayMinutes) || 60) * 60000);
  const examLimit = Number.isFinite(Number(session?.examMs))
    ? Number(session.examMs)
    : (Number(paper?.examMinutes) || (isDrill ? 25 : 120)) * 60000;
  const startedAt = session?.startedAt || 0;
  const elapsed = session?.finished
    ? (session.durationMs || 0)
    : (startedAt ? Math.max(0, now - startedAt) : 0);
  const stayLeft = session?.started && !session?.finished ? Math.max(0, stayMs - elapsed) : 0;
  const examLeft = session?.started && !session?.finished ? Math.max(0, examLimit - elapsed) : 0;
  const canFinish = session?.started && !session?.finished && stayLeft === 0;
  const finished = Boolean(session?.finished || result);

  const scored = useMemo(() => {
    const map = new Map();
    (result?.items || []).forEach(item => {
      map.set(`${item.block}:${item.n}`, item);
    });
    return map;
  }, [result]);

  const setAnswer = (blockLabel, n, patch) => {
    const key = `${blockLabel}:${n}`;
    setAnswers(prev => {
      const next = { ...prev, [key]: { ...(prev[key] || {}), ...patch } };
      saveDraft(paper.id, next);
      return next;
    });
  };

  const startExam = async () => {
    if (starting || session?.started) return;
    setStarting(true);
    setError('');
    const response = await MentorAPI.startEnPaper({ paper_id: paper.id });
    setStarting(false);
    if (!response.success) {
      setError(response.error || 'Nu am putut porni testul.');
      return;
    }
    setSession(response.data.session);
    if (response.data.photoQuota) setPhotoQuota(response.data.photoQuota);
    setNow(Date.now());
  };

  const finishExam = async () => {
    if (finishing || !canFinish) return;
    setFinishing(true);
    setError('');
    const payload = [];
    (paper.blocks || []).forEach(block => {
      (block.items || []).forEach(item => {
        if (!item.n || item.kind === 'passage' || item.passage) return;
        const draft = answers[`${block.label}:${item.n}`] || {};
        payload.push({
          block: block.label,
          n: item.n,
          letter: draft.letter || '',
          text: draft.text || '',
          parts: draft.parts || {},
          tf: Array.isArray(draft.tf) ? draft.tf : undefined
        });
      });
    });
    const response = await MentorAPI.finishEnPaper({ paper_id: paper.id, answers: payload });
    setFinishing(false);
    if (!response.success) {
      setError(response.error || 'Nu poți finaliza încă. Stai cu testul deschis până se scurge timpul minim de sală.');
      if (response.waitMs) {
        setSession(prev => (prev ? { ...prev, waitMs: response.waitMs, canFinish: false } : prev));
      }
      return;
    }
    setSession(response.data.session);
    setResult(response.data.result || response.data.session?.result || null);
    if (response.data.photoQuota) setPhotoQuota(response.data.photoQuota);
  };

  if (!paper) return null;

  return (
    <section className="en-paper-sheet surface" aria-label={paper.title}>
      <header className="en-paper-head">
        <div>
          <div className="eyebrow">
            {isDrill
              ? (paper.subject === 'romana'
                ? 'Antrenament scurt · texte + grile + scriere 6–7, fără compunere și fără ora de sală'
                : 'Antrenament scurt · grile + o problemă, fără ora de sală')
              : (paper.subject === 'romana'
                ? 'Simulare EN · I A 38p (texte, grile, A/F, scriere 6–9) · I B 32p · II pe caiet'
                : 'Simulare EN · I–II cu 4 variante · III cu a) și b) · rezultat aici, rezolvare pe caiet')}
          </div>
          <h3 className="display-font en-paper-title">{paper.title}</h3>
          <p className="en-paper-meta">
            Timp de lucru: {paper.duration}
            {isDrill ? ' · predai când termini, fără timp minim de sală' : ` · minim ${stayLabel(stayMs)} în sală`}
            {' · '}{paper.oficiu} puncte din oficiu
          </p>
        </div>
        <button type="button" className="ghost-button result-action" onClick={onClose}>
          Închide {finished ? 'baremul' : 'testul'} <i className="fas fa-times" />
        </button>
      </header>

      {!session?.started && !finished && (
        <>
          <p className="en-paper-lock">
            {isDrill ? (
              <>
                <i className="fas fa-bolt" /> Citește enunțurile. Cronometrul pornește când apeși
                „Începe antrenamentul”. Nu există ora de sală: predai când termini. Baremul apare după predare.
                Regula de minim 60 de minute e doar la simularea completă de Evaluare Națională.
              </>
            ) : (
              <>
                <i className="fas fa-hourglass-start" /> Citește enunțurile. Cronometrul pornește abia când apeși
                „Începe test Evaluare Națională”. Apoi trebuie să ții lucrarea deschisă cel puțin {stayLabel(stayMs)}
                — ca predarea anticipată la examen. Baremul apare după finalizare.
              </>
            )}
          </p>
          <button type="button" className="accent-button en-start-btn" disabled={starting} onClick={startExam}>
            {starting
              ? (isDrill ? 'Se deschide antrenamentul…' : 'Se deschide sala…')
              : (isDrill ? 'Începe antrenamentul' : 'Începe test Evaluare Națională')}
          </button>
        </>
      )}

      {session?.started && !finished && (
        <div className="en-timer" role="status">
          <p>
            <strong>Timp scurs:</strong> {clock(elapsed)}
            {isDrill ? null : (
              <>
                {' · '}
                <strong>Până poți preda:</strong> {stayLeft > 0 ? clock(stayLeft) : 'acum'}
              </>
            )}
            {' · '}
            <strong>{isDrill ? 'Rămas din cele 25 de minute:' : 'Rămas din cele 2 ore:'}</strong>{' '}
            {examLeft > 0 ? clock(examLeft) : 'predă lucrarea'}
          </p>
          <button
            type="button"
            className="accent-button"
            disabled={!canFinish || finishing}
            onClick={finishExam}
          >
            {finishing
              ? 'Predau…'
              : canFinish
                ? (isDrill ? 'Predă antrenamentul' : 'Finalizare test')
                : `Finalizare după ${clock(stayLeft)}`}
          </button>
        </div>
      )}

      {finished && result && (
        <div className="en-result-banner">
          <p className="display-font">Nota {result.grade} · {result.points}/{result.max} puncte</p>
          <QuoteCard grade={result.grade} seed={result.grade} className="quote-inline" />
          <p>Timp de lucru: {clock(session?.durationMs || elapsed)}. Baremul e mai jos, după predare. Părintele primește nota, durata și ce ai răspuns.</p>
        </div>
      )}

      {!session?.started && !finished && <QuoteCard className="quote-inline" />}

      {(paper.blocks || []).map(block => (
        <article key={block.label} className="en-paper-block">
          <h4>{block.label}{block.points ? ` · ${block.points} puncte` : ''}</h4>
          {block.intro ? <p className="en-paper-intro">{block.intro}</p> : null}
          <ol className="en-paper-items">
            {(block.items || []).map((entry, idx) => {
              const key = `${block.label}:${entry.n}`;
              const isPassage = entry.n === 0 || entry.kind === 'passage' || entry.passage;
              const draft = answers[key] || {};
              const scoredItem = scored.get(key);
              return (
                <li key={`${block.label}-${entry.n}-${idx}`} className={isPassage ? 'en-paper-passage' : 'en-paper-item'}>
                  {isPassage ? (
                    <div className={`en-paper-text ${entry.verse ? 'is-verse' : ''}`}>{entry.prompt}</div>
                  ) : (
                    <>
                      <strong className="en-paper-n">{entry.n}.</strong>
                      <div>
                        <p>{entry.prompt}</p>
                        {entry.figure ? <GeoFigure kind={entry.figure} /> : null}
                        {entry.points ? <small>{entry.points} puncte{entry.lines ? ` · ${entry.lines}` : ''}</small> : null}
                        {entry.kind === 'en-parts' || entry.parts?.length ? (
                          <div className="en-parts">
                            {(entry.parts || []).map(part => {
                              const partDraft = (draft.parts || {})[part.id] || '';
                              const scoredPart = (scoredItem?.parts || []).find(row => row.id === part.id);
                              return (
                                <div key={`${key}-${part.id}`} className="en-part">
                                  <p>
                                    <strong>{part.id})</strong> {part.prompt}
                                    {part.points ? <small> · {part.points} puncte</small> : null}
                                  </p>
                                  {session?.started && !finished ? (
                                    <input
                                      className="field form-input en-part-input"
                                      value={partDraft}
                                      onChange={event => setAnswer(block.label, entry.n, {
                                        parts: { ...(draft.parts || {}), [part.id]: event.target.value }
                                      })}
                                      placeholder="Scrie doar rezultatul (ex: 15 cm, 60°). Rezolvarea completă e pe caiet; o poți fotografia după predare."
                                      aria-label={`Rezultat subpunctul ${part.id}`}
                                    />
                                  ) : !session?.started && !finished ? (
                                    <small>Câmpul pentru rezultat se deschide după ce începi testul. Nu scrii rezolvarea aici.</small>
                                  ) : null}
                                  {finished && scoredPart ? (
                                    <div className="en-part-barem">
                                      <p><strong>Tu, {part.id}):</strong> {scoredPart.given || '—'}</p>
                                      <p><strong>Rezultat din barem:</strong> {scoredPart.expected}</p>
                                      {scoredPart.maxPoints ? (
                                        <small>{scoredPart.points}/{scoredPart.maxPoints} puncte</small>
                                      ) : null}
                                    </div>
                                  ) : null}
                                </div>
                              );
                            })}
                            {finished ? (
                              <EnPhotoBox
                                paperId={paper.id}
                                target={`${block.label}:${entry.n}`}
                                remaining={photoQuota.remaining}
                                label="Vrei feedback pe rezolvarea de pe caiet? Trimite o poză (Subiectul III)."
                                onDone={data => {
                                  if (data.photoQuota) setPhotoQuota(data.photoQuota);
                                  if (data.session?.result) setResult(data.session.result);
                                  if (data.session) setSession(data.session);
                                }}
                              />
                            ) : null}
                          </div>
                        ) : null}
                        {entry.choices?.length > 0 && (
                          <ol className="en-choices">
                            {entry.choices.map((choice, choiceIndex) => {
                              const letter = LETTERS[choiceIndex];
                              const selected = draft.letter === letter;
                              const showKey = finished;
                              return (
                                <li key={`${key}-${choiceIndex}`}>
                                  {session?.started && !finished ? (
                                    <label className={`en-choice-btn ${selected ? 'selected' : ''}`}>
                                      <input
                                        type="radio"
                                        name={key}
                                        value={letter}
                                        checked={selected}
                                        onChange={() => setAnswer(block.label, entry.n, { letter })}
                                      />
                                      <span>{letter}.</span> {choice}
                                    </label>
                                  ) : (
                                    <span className={selected ? 'en-choice-picked' : undefined}>
                                      <span>{letter}.</span> {choice}
                                    </span>
                                  )}
                                  {showKey && scoredItem?.expected === letter ? <em className="en-barem-mark">barem</em> : null}
                                </li>
                              );
                            })}
                          </ol>
                        )}
                        {entry.kind === 'true-false' && entry.statements?.length > 0 && (
                          <ol className="en-tf">
                            {entry.statements.map((statement, statementIndex) => {
                              const picked = Array.isArray(draft.tf) ? draft.tf[statementIndex] : undefined;
                              const scoredRow = (scoredItem?.statements || [])[statementIndex];
                              return (
                                <li key={`${key}-tf-${statementIndex}`}>
                                  <p>{statement.n}. {statement.text}</p>
                                  {session?.started && !finished ? (
                                    <div className="en-tf-actions">
                                      <label className={`en-choice-btn ${picked === true ? 'selected' : ''}`}>
                                        <input
                                          type="radio"
                                          name={`${key}-tf-${statementIndex}`}
                                          checked={picked === true}
                                          onChange={() => {
                                            const next = Array.isArray(draft.tf) ? draft.tf.slice() : [];
                                            next[statementIndex] = true;
                                            setAnswer(block.label, entry.n, { tf: next });
                                          }}
                                        />
                                        Adevărat
                                      </label>
                                      <label className={`en-choice-btn ${picked === false ? 'selected' : ''}`}>
                                        <input
                                          type="radio"
                                          name={`${key}-tf-${statementIndex}`}
                                          checked={picked === false}
                                          onChange={() => {
                                            const next = Array.isArray(draft.tf) ? draft.tf.slice() : [];
                                            next[statementIndex] = false;
                                            setAnswer(block.label, entry.n, { tf: next });
                                          }}
                                        />
                                        Fals
                                      </label>
                                    </div>
                                  ) : !session?.started && !finished ? (
                                    <small>Marchezi adevărat sau fals după ce începi testul.</small>
                                  ) : null}
                                  {finished && scoredRow ? (
                                    <small>
                                      Tu: {scoredRow.given === true ? 'Adevărat' : scoredRow.given === false ? 'Fals' : '—'}
                                      {' · '}
                                      Baremul: {scoredRow.expected ? 'Adevărat' : 'Fals'}
                                    </small>
                                  ) : null}
                                </li>
                              );
                            })}
                          </ol>
                        )}
                        {(entry.kind === 'short' || entry.kind === 'associate') && session?.started && !finished && (
                          <>
                            <textarea
                              className="field form-input quiz-work en-short"
                              value={draft.text || ''}
                              onChange={event => setAnswer(block.label, entry.n, { text: event.target.value })}
                              placeholder={entry.kind === 'associate'
                                ? 'Scrie aici asocierea (50–100 de cuvinte): opera citită, valoarea sau tema comună, un fapt din fragment și unul din carte.'
                                : ((entry.minWords || 0) >= 50
                                  ? 'Scrie răspunsul aici (50–100 de cuvinte). Numărul de cuvinte apare sub câmp. Compunerea lungă rămâne pe caiet, la Subiectul II.'
                                  : ((entry.minWords || 0) >= 20
                                    ? 'Scrie răspunsul aici. Numărul de cuvinte apare sub câmp.'
                                    : 'Scrie răspunsul aici (transcriere, măsură și rimă, trăsătură + secvență).'))}
                              aria-label={`Răspuns itemul ${entry.n}`}
                              rows={entry.kind === 'associate' || (entry.minWords || 0) >= 20 ? 7 : ((entry.minWords || 0) >= 8 ? 4 : 3)}
                            />
                            <WordMeter text={draft.text || ''} minWords={entry.minWords} maxWords={entry.maxWords} />
                          </>
                        )}
                        {(entry.kind === 'short' || entry.kind === 'associate') && !session?.started && !finished && (
                          <small>Câmpul de răspuns se deschide după ce începi testul.</small>
                        )}
                        {entry.kind === 'write' && entry.photoOnly && !finished && (
                          <div className="en-notebook-note">
                            <p>
                              Compunerea <strong>nu se tastează</strong> aici, ca la examen. O scrii în caiet
                              {entry.minWords ? ` (minimum ${entry.minWords} de cuvinte)` : ''}. După predare fotografiază pagina —
                              mentorul o corectează pe barem. Ai {photoQuota.remaining} poze rămase azi din 3.
                            </p>
                          </div>
                        )}
                        {entry.kind === 'write' && !entry.photoOnly && session?.started && !finished && (
                          <textarea
                            className="field form-input quiz-work quiz-write en-write"
                            value={draft.text || ''}
                            onChange={event => setAnswer(block.label, entry.n, { text: event.target.value })}
                            placeholder="Scrie redactarea aici. Baremul (idei, nu text-model) apare după finalizare."
                            aria-label="Redactare Evaluare Națională"
                            rows={8}
                          />
                        )}
                        {entry.kind === 'write' && !entry.photoOnly && !session?.started && !finished && (
                          <small>Câmpul de redactare se deschide după ce începi testul.</small>
                        )}
                        {entry.kind === 'write' && entry.photoOnly && finished && (
                          <EnPhotoBox
                            paperId={paper.id}
                            target="composition"
                            remaining={photoQuota.remaining}
                            label="Fotografiază compunerea din caiet. Mentorul o citește pe barem și îți dă sfaturi — nu un text de copiat."
                            onDone={data => {
                              if (data.photoQuota) setPhotoQuota(data.photoQuota);
                              if (data.session?.result) setResult(data.session.result);
                              if (data.session) setSession(data.session);
                            }}
                          />
                        )}
                        {finished && scoredItem && (
                          <div className="en-barem-card">
                            {scoredItem.letter || scoredItem.given ? (
                              <p><strong>Tu:</strong> {scoredItem.letter || scoredItem.given || '—'}</p>
                            ) : (
                              <p><strong>Tu:</strong> fără răspuns</p>
                            )}
                            {scoredItem.expected ? (
                              <p>
                                <strong>Varianta din barem: {scoredItem.expected}</strong>
                                {scoredItem.sample && scoredItem.sample !== scoredItem.expected ? ` (${scoredItem.sample})` : ''}
                              </p>
                            ) : null}
                            {scoredItem.teacher || scoredItem.explain ? (
                              <p className="quiz-explain">{scoredItem.teacher || scoredItem.explain}</p>
                            ) : null}
                            {scoredItem.barem && scoredItem.barem !== scoredItem.teacher && scoredItem.barem !== scoredItem.explain ? (
                              <p>{scoredItem.barem}</p>
                            ) : null}
                            {scoredItem.solution ? (
                              <div className="en-full-solution">
                                <strong>Rezolvare completă</strong>
                                {String(scoredItem.solution).split(/\n\n+/).map((para, paraIndex) => (
                                  <p key={`${key}-sol-${paraIndex}`}>{para}</p>
                                ))}
                              </div>
                            ) : null}
                            {scoredItem.steps?.length > 0 && (
                              <ol className="quiz-steps">
                                {scoredItem.steps.map((step, stepIndex) => <li key={`${key}-s-${stepIndex}`}>{step}</li>)}
                              </ol>
                            )}
                            {scoredItem.ideas?.length > 0 && (
                              <ul className="en-barem-ideas">
                                {scoredItem.ideas.map((idea, ideaIndex) => <li key={`${key}-i-${ideaIndex}`}>{idea}</li>)}
                              </ul>
                            )}
                            {scoredItem.rubric && (
                              <p className="quiz-explain">
                                Redactare: {scoredItem.rubric.total}/{scoredItem.rubric.max} · {scoredItem.points}/{scoredItem.maxPoints} puncte
                              </p>
                            )}
                            {scoredItem.photoFeedback ? (
                              <div className="en-photo-feedback">
                                <strong>Mentorul, după poză</strong>
                                <p>{scoredItem.photoFeedback}</p>
                                {scoredItem.photoTips?.length ? (
                                  <ul>
                                    {scoredItem.photoTips.map((tip, tipIndex) => (
                                      <li key={`${key}-tip-${tipIndex}`}>{tip}</li>
                                    ))}
                                  </ul>
                                ) : null}
                              </div>
                            ) : null}
                            {scoredItem.maxPoints ? (
                              <small>{scoredItem.points}/{scoredItem.maxPoints} puncte · {verdictLabel(scoredItem)}</small>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </article>
      ))}

      {session?.started && !finished && (
        <div className="en-timer en-timer-foot">
          <button
            type="button"
            className="accent-button"
            disabled={!canFinish || finishing}
            onClick={finishExam}
          >
            {finishing
              ? 'Predau…'
              : canFinish
                ? (isDrill ? 'Predă antrenamentul' : 'Finalizare test')
                : `Finalizare după ${clock(stayLeft)}`}
          </button>
        </div>
      )}

      {error ? <p className="guide-error">{error}</p> : null}
      <p className="en-paper-foot">
        {isDrill
          ? 'Antrenament scurt: predai când termini, fără ora de sală. Baremul se deschide după predare. Simularea completă (minim 60 de minute) e butonul „Alt model” de deasupra.'
          : 'Baremul întregului test se deschide după predare. La română, itemii 6–9 de la I A se scriu aici (cu număr de cuvinte); compunerea rămâne pe caiet. La mate, la Subiectul III scrii doar rezultatul. Pozele de corectare: 3 pe zi, ca să rămână aplicația gratuită. Părintele primește nota, durata și răspunsurile tale.'}
      </p>
    </section>
  );
};

export default EnPaperView;

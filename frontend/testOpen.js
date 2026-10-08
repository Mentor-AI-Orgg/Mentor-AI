// Deschiderea unui test are două cereri (previzualizare, apoi start).
// Dacă răspunsul vechi ajunge după start, ecranul se întoarce la buton
// și pare că apăsarea n-a făcut nimic. Biletul și îmbinarea de mai jos
// păstrează sesiunea mai nouă.

export const TEST_OPEN_ERROR = 'Nu am putut deschide testul. Încearcă din nou.';

export function takeTicket(box) {
  const next = (Number(box.current) || 0) + 1;
  box.current = next;
  return next;
}

export function ticketIsCurrent(box, ticket) {
  return box.current === ticket;
}

export function isLiveSession(session) {
  return Boolean(session && (session.started || session.finished || session.startedAt));
}

/** Nu lăsa o previzualizare veche să închidă un test deja pornit. */
export function mergeExamSession(current, incoming) {
  if (!incoming) return current || null;
  if (!current) return incoming;
  if (isLiveSession(current) && !isLiveSession(incoming)) return current;
  return incoming;
}

export function readQuizPack(pack, { lesson = false } = {}) {
  if (!pack || pack.success === false) {
    return { ok: false, error: (pack && pack.error) || TEST_OPEN_ERROR };
  }
  const cards = Array.isArray(pack.data?.cards) ? pack.data.cards : [];
  if (!cards.length) {
    return {
      ok: false,
      error: lesson
        ? 'Lecția asta nu are încă exerciții proprii.'
        : 'Nu am găsit exerciții pentru testul ăsta. Încearcă din nou.'
    };
  }
  return {
    ok: true,
    cards,
    sessionId: pack.data.session_id || '',
    coverage: pack.data.coverage || null,
    review: Boolean(pack.data.review)
  };
}

export function readDeckPack(pack) {
  if (!pack || pack.success === false) {
    return { ok: false, error: (pack && pack.error) || TEST_OPEN_ERROR, cards: [] };
  }
  const cards = Array.isArray(pack.data?.cards) ? pack.data.cards : [];
  if (!cards.length) {
    return { ok: true, cards: [], empty: 'Nu sunt flashcard-uri aici încă.', nextDue: pack.data?.nextDue || '' };
  }
  return { ok: true, cards, empty: '', nextDue: pack.data?.nextDue || '' };
}

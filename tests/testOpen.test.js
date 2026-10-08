import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { MASCOT_NAME } from '../frontend/config/mascot.js';
import { answerFromLessons } from '../backend/src/mentor/localMentor.js';
import {
  TEST_OPEN_ERROR,
  isLiveSession,
  mergeExamSession,
  readDeckPack,
  readQuizPack,
  takeTicket,
  ticketIsCurrent
} from '../frontend/testOpen.js';

function source(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
}

describe('deschiderea unui test dintr-o singură apăsare', () => {
  it('aruncă răspunsul vechi de „deschide” dacă „începe” a apucat să pornească', () => {
    const box = { current: 0 };
    const openTicket = takeTicket(box);
    const started = { started: true, startedAt: 80, finished: false };
    const preview = { started: false, startedAt: 0, finished: false };

    const startTicket = takeTicket(box);
    expect(ticketIsCurrent(box, openTicket)).toBe(false);
    expect(ticketIsCurrent(box, startTicket)).toBe(true);
    expect(isLiveSession(started)).toBe(true);
    expect(isLiveSession(preview)).toBe(false);
    expect(mergeExamSession(started, preview)).toBe(started);
    expect(mergeExamSession(preview, started).started).toBe(true);
    expect(mergeExamSession(null, preview)).toBe(preview);
    expect(mergeExamSession(started, null)).toBe(started);
  });

  it('ține minte doar ultimul bilet, ca două apăsări să nu se calce', () => {
    const box = { current: 0 };
    const first = takeTicket(box);
    const second = takeTicket(box);
    expect(first).toBe(1);
    expect(second).toBe(2);
    expect(ticketIsCurrent(box, first)).toBe(false);
    expect(ticketIsCurrent(box, second)).toBe(true);
  });

  it('spune clar când serverul nu deschide testul sau lecția n-are exerciții', () => {
    expect(readQuizPack({ success: false }).error).toBe(TEST_OPEN_ERROR);
    expect(readQuizPack({ success: false, error: 'Rețeaua a căzut.' }).error).toBe('Rețeaua a căzut.');
    expect(readQuizPack({ success: true, data: { cards: [] } }, { lesson: true }).error).toMatch(/nu are încă/);
    expect(readQuizPack({ success: true, data: { cards: [] } }).error).toMatch(/Încearcă din nou/);
    const ok = readQuizPack({
      success: true,
      data: { cards: [{ id: 'a' }], session_id: 's1', coverage: { seen: 1 }, review: true }
    });
    expect(ok.ok).toBe(true);
    expect(ok.cards).toHaveLength(1);
    expect(ok.sessionId).toBe('s1');
    expect(ok.review).toBe(true);
  });

  it('deosebește flashcard-urile goale de o eroare de rețea', () => {
    expect(readDeckPack({ success: false }).ok).toBe(false);
    expect(readDeckPack({ success: false, error: 'timeout' }).error).toBe('timeout');
    const empty = readDeckPack({ success: true, data: { cards: [], nextDue: '2026-10-08' } });
    expect(empty.ok).toBe(true);
    expect(empty.cards).toEqual([]);
    expect(empty.empty).toMatch(/Nu sunt flashcard/);
    expect(empty.nextDue).toBe('2026-10-08');
  });

  it('leagă încărcarea și eroarea de fiecare loc din care pornește un test', () => {
    const quiz = source('frontend/components/ChapterQuiz.jsx');
    const paper = source('frontend/components/EnPaperView.jsx');
    const learn = source('frontend/screens/LearnScreen.jsx');
    const home = source('frontend/screens/HomeScreen.jsx');
    const cards = source('frontend/components/FlashCards.jsx');
    const deck = source('frontend/components/CardDeck.jsx');
    const goal = source('frontend/components/GradeGoalPicker.jsx');

    expect(quiz).toContain('takeTicket');
    expect(quiz).toContain('readQuizPack');
    expect(quiz).toContain('ticketIsCurrent');
    expect(quiz).toContain('role="alert"');
    expect(quiz).toContain('Pregătesc exercițiile…');
    expect(quiz).toContain('Încearcă din nou');

    expect(paper).toContain('mergeExamSession');
    expect(paper).toContain('takeTicket');
    expect(paper).toContain('Se deschide sala…');
    expect(paper).toContain('role="alert"');

    expect(learn).toContain('quizRun');
    expect(learn).toContain('key={quizRun}');
    expect(learn).toContain('key={enRun}');
    expect(learn).toContain('key={cardRun}');
    expect(learn).toContain('paperBusy');
    expect(learn).toContain('openQuiz(');
    expect(learn).toContain('openEnTrain(');
    expect(learn).toContain('openGeneratedPaper');
    expect(learn).toContain('Se deschide…');

    expect(home).toContain('placementBusy');
    expect(home).toContain('Se deschide…');
    expect(home).toContain('role="alert"');
    expect(home).toContain('Da, hai!');

    expect(cards).toContain('readQuizPack');
    expect(cards).toContain('takeTicket');
    expect(cards).toContain('busy={loading}');
    expect(deck).toContain('readDeckPack');
    expect(deck).toContain('Încearcă din nou');
    expect(goal).toContain('Se deschide…');
    expect(goal).toContain('disabled={busy}');
  });
});

describe('Zecița e vocea tutorelui, iar diagnosticarea nu e la elev', () => {
  it('răspunsul începe cu numele din mascot.json, la persoana întâi', () => {
    const hit = answerFromLessons({ message: 'diftong', subject: 'romana', grade: 6 });
    expect(hit.text.startsWith(`Sunt ${MASCOT_NAME}.`)).toBe(true);
    const miss = answerFromLessons({ message: 'azi e soare afara', subject: 'matematica', grade: 6 });
    expect(miss.text).toMatch(/Nu sunt sigură/);
    expect(miss.text).toMatch(/nu am găsit/);
    expect(miss.text).toMatch(/#\/lectii\//);
    const mentor = source('backend/src/mentor/localMentor.js');
    expect(mentor).toContain('MASCOT_NAME');
    expect(mentor).not.toMatch(/Zecița/);
  });

  it('nav-ul și intrările folosesc numele din fișier, nu îl scriu de mână', () => {
    const nav = source('frontend/components/BottomNav.jsx');
    const study = source('frontend/components/StudyScreens.jsx');
    const learn = source('frontend/screens/LearnScreen.jsx');
    expect(nav).toContain('MASCOT_NAME');
    expect(nav).not.toMatch(/Zecița/);
    expect(study).toContain('Sunt {MASCOT_NAME}');
    expect(study).toContain('Dacă nu sunt sigură');
    expect(study).not.toMatch(/serviciu plătit|Nu încarc poze/);
    expect(study).not.toMatch(/Diagnosticare|diagMode|runDiagnostics|fa-stethoscope/);
    expect(learn).toContain('Întreab-o pe {MASCOT_NAME}');
    expect(learn).not.toMatch(/Zecița/);
  });

  it('diagnosticarea rămâne la creator, nu pe ruta elevului', () => {
    const app = source('backend/src/app.js');
    const creator = source('frontend/screens/CreatorMascotScreen.jsx');
    expect(app).toContain('creatorRequired, diagnosticsRoute');
    expect(app).not.toContain('studentOnly, diagnosticsRoute');
    expect(creator).toContain('runDiagnostics');
    expect(creator).toContain('Verifică sistemul');
  });
});

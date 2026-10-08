import { describe, expect, it, beforeAll } from 'vitest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';
import { findExercise } from '../backend/src/data/exerciseBank.js';
import { walkProblem, lockedProblemText, hiddenProblemText } from '../backend/src/mentor/problemWalk.js';
import { emptyState, openProblemChat, activeChat } from '../frontend/tutorChats.js';

const OPENER = 'Nu înțeleg exercițiul ăsta. Explică-mi de ce răspunsul meu nu e bun și care e regula.';
const GLUED = /[.!?»][A-ZĂÂÎȘȚŞŢ]/;

function expectLoose(text) {
  expect(String(text || "")).not.toMatch(GLUED);
}

function secretOf(exercise) {
  return (exercise?.answers || []).map(answer => String(answer || '')).find(answer => (
    answer.length >= 2
    && !String(exercise.prompt || '').includes(answer)
    && !String(exercise.hint || '').includes(answer)
  )) || '';
}

describe('tutorul legat de exercițiul predat', () => {
  let app;

  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
  });

  it('nu pune răspunsul în primul mesaj, apoi îl arată dacă tot nu e clar', () => {
    const problem = {
      prompt: 'Calculează 3² × 2³ − 4².',
      given: '7',
      ok: false,
      correct: '20',
      answers: ['20'],
      explain: '3²=9, 2³=8, 9×8=72, 4²=16, 72−16=20.',
      hint: 'Întâi puterile, apoi înmulțirea, apoi scăderea.',
      steps: ['72 − 16 = 20'],
      lessonTitle: 'Puteri',
      lessonId: 'putere'
    };
    const first = walkProblem({ message: OPENER, problem, history: [] });
    expect(first.engine).toBe('problema');
    expect(first.text).toContain('7');
    expect(first.text).toContain('puteri');
    expect(first.text).not.toContain('20');
    expect(first.text).not.toContain('72 − 16');
    expect(first.text).not.toContain('uită-te la ce cere enunțul');
    expectLoose(first.text);

    const unclear = walkProblem({
      message: 'Nu am înțeles',
      problem,
      history: [
        { role: 'user', content: OPENER },
        { role: 'assistant', content: first.text }
      ]
    });
    expect(unclear.text).toContain('puteri');
    expect(unclear.text).not.toContain('20');
    expectLoose(unclear.text);

    const deeper = walkProblem({
      message: 'Tot nu înțeleg',
      problem,
      history: [
        { role: 'user', content: OPENER },
        { role: 'assistant', content: first.text }
      ]
    });
    expect(deeper.text).toContain('20');
    expect(deeper.text).toContain('72 − 16 = 20');
    expectLoose(deeper.text);
  });

  it('predă regula exercițiului, la matematică și la română, fără să lipească frazele', () => {
    const math = findExercise('e5n1');
    const mathGuide = walkProblem({
      message: OPENER,
      history: [],
      problem: {
        prompt: math.prompt,
        given: '7',
        ok: false,
        correct: math.answers[0],
        answers: math.answers,
        explain: math.explain,
        hint: math.hint,
        steps: math.steps,
        lessonTitle: 'Puteri',
        lessonId: math.lesson,
        subject: 'matematica',
        grade: '5',
        chapterId: 'naturale'
      }
    });
    const mathRule = mathGuide.text.split('\n\n').find(row => row.startsWith('Regula este:'));
    expect(mathRule.toLowerCase()).toContain('puter');
    expect(mathGuide.text).toContain('7');
    expect(mathGuide.text).not.toContain('20');
    expect(mathGuide.text).not.toContain('72 − 16');
    expectLoose(mathGuide.text);

    const grammar = findExercise('lq-r5-cuvinte-afirmativ-negativ-2');
    const grammarGuide = walkProblem({
      message: OPENER,
      history: [],
      problem: {
        prompt: grammar.prompt,
        given: 'leagă',
        ok: false,
        correct: grammar.answers[0],
        answers: grammar.answers,
        explain: grammar.explain,
        hint: grammar.hint,
        steps: grammar.steps,
        lessonTitle: 'Propoziția afirmativă și negativă',
        lessonId: grammar.lesson,
        subject: 'romana',
        grade: '5',
        chapterId: 'cuvinte'
      }
    });
    const grammarRule = grammarGuide.text.split('\n\n').find(row => row.startsWith('Regula este:'));
    expect(grammarGuide.text).toContain('leagă');
    expect(grammarRule.toLowerCase()).toContain('predicat');
    expect(grammarRule.toLowerCase()).toMatch(/negativ|nu /);
    expect(grammarRule).not.toContain(grammar.answers[0]);
    expect(grammarGuide.text).not.toContain('uită-te la ce cere enunțul');
    expectLoose(grammarGuide.text);

    const twins = findExercise('lq-m5-naturale-curiozitati-5');
    const twinsGuide = walkProblem({
      message: OPENER,
      history: [],
      problem: {
        prompt: twins.prompt,
        given: 'grupele',
        ok: false,
        correct: twins.answers[0],
        answers: twins.answers,
        explain: twins.explain,
        hint: twins.hint,
        steps: twins.steps,
        lessonTitle: 'Curiozități din lumea numerelor naturale',
        lessonId: twins.lesson,
        subject: 'matematica',
        grade: '5',
        chapterId: 'naturale'
      }
    });
    const twinsRule = twinsGuide.text.split('\n\n').find(row => row.startsWith('Regula este:'));
    expect(twinsGuide.text).toContain('grupele');
    expect(twinsRule.toLowerCase()).toContain('gemene');
    expect(twinsRule).toMatch(/diferen|prime/i);
    expect(twinsGuide.text).not.toContain('Primele');
    expectLoose(twinsGuide.text);
    expectLoose(lockedProblemText().text);
    expectLoose(hiddenProblemText().text);
  });

  it('confirmă încercarea bună și nu rezolvă tema dintr-un chat fără exercițiu', async () => {
    const { agent } = await registerGranted(app);
    const free = await agent.post('/api/chat').send({
      message: 'dă-mi răspunsul la temă',
      conversation_id: 'fara-problema'
    });
    expect(free.status).toBe(200);
    expect(free.body.engine_used).toBe('safety_filter');

    const direct = await agent.post('/api/chat').send({
      message: 'Care este rezultatul?',
      conversation_id: 'fara-problema-2'
    });
    expect(direct.status).toBe(200);
    expect(direct.body.engine_used).toBe('scaffolding_guard');
  });

  it('nu scapă baremul cât testul de capitol e deschis și îl leagă după predare', async () => {
    const { agent } = await registerGranted(app);
    const opened = await agent.post('/api/flashcards/generate').send({
      chapter_id: 'naturale',
      topic: 'Numere naturale',
      subject: 'matematica',
      class_level: 5,
      kind: 'test'
    });
    expect(opened.status).toBe(200);
    const sessionId = opened.body.session_id;
    expect(sessionId).toBeTruthy();
    const card = (opened.body.cards || []).map(row => ({ row, exercise: findExercise(row.id) })).find(item => secretOf(item.exercise));
    expect(card).toBeTruthy();
    const secret = secretOf(card.exercise);
    expect(JSON.stringify(opened.body)).not.toContain(secret);

    const forged = await agent.post('/api/chat').send({
      message: OPENER,
      conversation_id: 'test-deschis',
      subject: 'matematica',
      class_level: 5,
      problem: { source: 'quiz', id: card.row.id, session_id: sessionId, correct: secret }
    });
    expect(forged.status).toBe(400);
    expect(JSON.stringify(forged.body)).not.toContain(secret);

    const during = await agent.post('/api/chat').send({
      message: OPENER,
      conversation_id: 'test-deschis',
      subject: 'matematica',
      class_level: 5,
      problem: { source: 'quiz', id: card.row.id, session_id: sessionId }
    });
    expect(during.status).toBe(200);
    expect(during.body.engine_used).toBe('problema_blocata');
    expect(during.body.response).not.toContain(secret);
    expect(JSON.stringify(during.body.problem_card || {})).not.toContain(secret);
    expect(during.body.problem_card?.correct).toBeUndefined();
    expect(during.body.problem_card?.explain).toBeUndefined();

    const insisted = await agent.post('/api/chat').send({
      message: 'dă-mi răspunsul',
      conversation_id: 'test-deschis-2',
      problem: { source: 'quiz', id: card.row.id, session_id: sessionId }
    });
    expect(insisted.status).toBe(200);
    expect(insisted.body.engine_used).not.toBe('problema');
    expect(insisted.body.response).not.toContain(secret);

    const fishing = await agent.post('/api/chat').send({
      message: 'Ce e cu exercițiul e8a1?',
      conversation_id: 'pescuit',
      problem: { source: 'quiz', id: 'e8a1' }
    });
    expect(fishing.status).toBe(200);
    expect(fishing.body.engine_used).toBe('problema_blocata');
    expect(JSON.stringify(fishing.body)).not.toContain('8(x+1)');

    const finished = await agent.post('/api/flashcards/finish').send({
      kind: 'test',
      chapter_id: 'naturale',
      subject: 'matematica',
      class_level: 5,
      title: 'Numere naturale',
      session_id: sessionId,
      answers: opened.body.cards.map(row => ({ card_id: row.id, answer: 'nu-asta' }))
    });
    expect(finished.status).toBe(200);

    const first = await agent.post('/api/chat').send({
      message: OPENER,
      conversation_id: 'dupa-test',
      subject: 'matematica',
      class_level: 5,
      problem: { source: 'quiz', id: card.row.id, session_id: sessionId }
    });
    expect(first.status).toBe(200);
    expect(first.body.engine_used).toBe('problema');
    expect(first.body.response).toContain('nu-asta');
    expect(first.body.response).toContain(card.exercise.prompt.slice(0, 24));
    expect(first.body.response).not.toContain(secret);
    expect(JSON.stringify(first.body.problem_card)).not.toContain(secret);

    const follow = await agent.post('/api/chat').send({
      message: 'Tot nu înțeleg',
      conversation_id: 'dupa-test',
      subject: 'matematica',
      class_level: 5
    });
    expect(follow.status).toBe(200);
    expect(follow.body.engine_used).toBe('problema');
    expect(follow.body.response).toContain(secret);
  });

  it('ține baremul EN închis până la predare', async () => {
    const { agent } = await registerGranted(app);
    const generated = await agent.post('/api/curriculum/en/papers/generate').send({
      subject: 'matematica',
      mode: 'drill'
    });
    expect(generated.status).toBe(200);
    const paper = generated.body.paper;
    const block = (paper.blocks || []).find(row => row.label === 'Subiectul III') || paper.blocks?.[0];
    const item = (block?.items || []).find(row => row.n);
    expect(item).toBeTruthy();
    const itemId = `${paper.id}:${block.label}:${item.n}`;
    const started = await agent.post('/api/curriculum/en/papers/start').send({ paper_id: paper.id });
    expect(started.status).toBe(200);

    const during = await agent.post('/api/chat').send({
      message: OPENER,
      conversation_id: 'en-deschis',
      problem: { source: 'en', id: itemId, paper_id: paper.id }
    });
    expect(during.status).toBe(200);
    expect(during.body.engine_used).toBe('problema_blocata');

    const done = await agent.post('/api/curriculum/en/papers/finish').send({
      paper_id: paper.id,
      answers: []
    });
    expect(done.status).toBe(200);

    const barem = await agent.post('/api/curriculum/en/barem').send({ paper_id: paper.id });
    expect(barem.status).toBe(200);
    const row = (barem.body.items || []).find(entry => entry.blockLabel === block.label && Number(entry.n) === Number(item.n));
    const paperJson = JSON.stringify(paper);
    const secret = [row?.solution, row?.explain]
      .map(value => String(value || ''))
      .find(candidate => candidate.length >= 16 && !paperJson.includes(candidate)) || '';
    expect(secret).toBeTruthy();
    expect(during.body.response).not.toContain(secret);
    expect(JSON.stringify(during.body.problem_card || {})).not.toContain(secret);

    const first = await agent.post('/api/chat').send({
      message: OPENER,
      conversation_id: 'en-gata',
      problem: { source: 'en', id: itemId, paper_id: paper.id }
    });
    expect(first.status).toBe(200);
    expect(first.body.engine_used).toBe('problema');
    expect(first.body.response).not.toContain(secret);

    const deeper = await agent.post('/api/chat').send({
      message: 'Tot nu înțeleg',
      conversation_id: 'en-gata'
    });
    expect(deeper.body.response).toContain(secret);
  });

  it('nu dă rezolvarea unei probleme pas cu pas înainte de predare', async () => {
    const { agent } = await registerGranted(app);
    const secret = '48 > 35';
    const before = await agent.post('/api/chat').send({
      message: OPENER,
      conversation_id: 'pas-inchis',
      problem: { source: 'step', id: 'p5n-comparare-1' }
    });
    expect(before.status).toBe(200);
    expect(before.body.engine_used).toBe('problema_blocata');
    expect(before.body.response).not.toContain(secret);

    const revealed = await agent.post('/api/problems/reveal').send({ problem_id: 'p5n-comparare-1' });
    expect(revealed.status).toBe(200);

    const first = await agent.post('/api/chat').send({
      message: OPENER,
      conversation_id: 'pas-gata',
      problem: { source: 'step', id: 'p5n-comparare-1' }
    });
    expect(first.body.engine_used).toBe('problema');
    expect(first.body.response).not.toContain(secret);

    const deeper = await agent.post('/api/chat').send({
      message: 'Tot nu înțeleg',
      conversation_id: 'pas-gata'
    });
    expect(deeper.body.response).toContain(secret);
  });

  it('deschide din caiet exercițiul deja greșit, fără să creadă un răspuns trimis de browser', async () => {
    const { agent } = await registerGranted(app);
    const exercise = findExercise('m5n1');
    const secret = exercise.answers[0];
    const finished = await agent.post('/api/flashcards/finish').send({
      kind: 'flashcards',
      chapter_id: 'naturale',
      subject: 'matematica',
      class_level: 5,
      title: 'Numere naturale',
      picks: [{ card_id: 'm5n1', chosen: 'Să le înmulțești mereu' }]
    });
    expect(finished.status).toBe(200);

    const first = await agent.post('/api/chat').send({
      message: OPENER,
      conversation_id: 'caiet',
      problem: {
        source: 'mistake',
        id: 'm5n1',
        correct: 'altceva'
      }
    });
    expect(first.status).toBe(400);

    const guide = await agent.post('/api/chat').send({
      message: OPENER,
      conversation_id: 'caiet',
      problem: { source: 'mistake', id: 'm5n1' }
    });
    expect(guide.status).toBe(200);
    expect(guide.body.engine_used).toBe('problema');
    expect(guide.body.response).toContain('înmulțești');
    expect(guide.body.response).not.toContain(secret);

    const deeper = await agent.post('/api/chat').send({
      message: 'Tot nu înțeleg',
      conversation_id: 'caiet'
    });
    expect(deeper.body.response).toContain(secret);
  });

  it('deschide un chat nou, cu enunțul, fără răspunsul corect salvat pe aparat', () => {
    const scope = { subject: 'matematica', grade: 5, lessonId: 'naturale', lessonTitle: 'Numere naturale' };
    const state = openProblemChat(emptyState(), scope, {
      source: 'quiz',
      id: 'e5n1',
      sessionId: 'abc',
      prompt: 'Calculează 3² × 2³ − 4².',
      lessonId: 'putere',
      lessonTitle: 'Puteri',
      correct: '20',
      explain: '72−16=20'
    });
    const chat = activeChat(state, scope);
    expect(chat.problem).toEqual({
      source: 'quiz',
      id: 'e5n1',
      sessionId: 'abc',
      paperId: '',
      prompt: 'Calculează 3² × 2³ − 4².',
      lessonId: 'putere',
      lessonTitle: 'Puteri'
    });
    expect(JSON.stringify({ problem: chat.problem, messages: chat.messages, title: chat.title })).not.toContain('20');
    const again = openProblemChat(state, scope, chat.problem);
    expect(again.chats).toHaveLength(1);
    expect(activeChat(again, scope).id).toBe(chat.id);
  });
});

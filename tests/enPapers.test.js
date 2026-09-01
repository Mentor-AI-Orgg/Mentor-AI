import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { recommendedList, generatePaper, getBaremItem, getBundle, scoreAttempt } from '../backend/src/data/enPaperFactory.js';

describe('EN papers and barem', () => {
  let app;

  beforeAll(() => {
    ({ app } = createApp({ autosave: false }));
  });

  it('recommended math papers have four choices and no answers in the public payload', () => {
    const papers = recommendedList('matematica');
    expect(papers).toHaveLength(3);
    const first = papers[0].blocks[0].items.find(item => item.n === 1);
    expect(first.choices).toHaveLength(4);
    expect(first.letter).toBeUndefined();
    expect(JSON.stringify(papers)).not.toMatch(/Varianta din barem/);
    expect(JSON.stringify(papers)).not.toMatch(/Rezolvare completă|BC² = AB²/);
    papers.forEach(paper => {
      const third = paper.blocks.find(block => block.label === 'Subiectul III');
      const problems = (third.items || []).filter(item => item.n > 0);
      expect(problems).toHaveLength(2);
      problems.forEach(item => {
        expect(item.kind).toBe('en-parts');
        expect(item.parts).toHaveLength(2);
        expect(item.parts.map(part => part.id)).toEqual(['a', 'b']);
        expect(item.parts[0].prompt).toBeTruthy();
        expect(JSON.stringify(item)).not.toMatch(/"answer"|solution/);
      });
    });
  });

  it('recommended Romanian papers follow the 2026 EN sheet: two long texts, I A + I B grammar, II on paper', () => {
    const papers = recommendedList('romana');
    papers.forEach(paper => {
      const passages = paper.blocks.flatMap(block => block.items).filter(item => item.kind === 'passage' || item.n === 0);
      expect(passages.length).toBeGreaterThanOrEqual(2);
      passages.forEach(item => {
        expect(item.prompt.split(/\s+/).length).toBeGreaterThan(120);
      });
      const a = paper.blocks.find(block => block.label === 'Subiectul I A');
      const b = paper.blocks.find(block => block.label === 'Subiectul I B');
      const two = paper.blocks.find(block => block.label === 'Subiectul II');
      expect(a.points).toBe(50);
      expect(b.points).toBe(20);
      expect(two.points).toBe(20);
      const scoredA = a.items.filter(item => item.n > 0);
      expect(scoredA).toHaveLength(9);
      expect(scoredA.filter(item => item.choices).map(item => item.n)).toEqual([1, 2, 3, 4, 5]);
      expect(scoredA.find(item => item.n === 6).kind).toBe('short');
      expect(scoredA.find(item => item.n === 9).kind).toBe('associate');
      const grammar = b.items.filter(item => item.n > 0);
      expect(grammar).toHaveLength(8);
      expect(grammar.every(item => item.choices?.length === 4)).toBe(true);
      const writing = two.items.find(item => item.kind === 'write');
      expect(writing.photoOnly).toBe(true);
      expect(writing.minWords).toBe(150);
    });
  });

  it('generated math papers shuffle the correct letter and stay solvable', () => {
    const letters = new Set();
    for (let i = 0; i < 6; i += 1) {
      const paper = generatePaper('matematica');
      const bundle = getBundle(paper.id);
      const answers = [];
      paper.blocks.forEach(block => {
        block.items.filter(item => item.n > 0).forEach(item => {
          const key = `${block.label}:${item.n}`;
          const row = bundle.barem[key];
          if (item.kind === 'en-parts' || item.parts) {
            const parts = {};
            Object.entries(row.parts || {}).forEach(([id, part]) => {
              parts[id] = part.answer;
            });
            answers.push({ block: block.label, n: item.n, parts });
            return;
          }
          const letter = row.letter;
          letters.add(letter);
          const idx = 'ABCD'.indexOf(letter);
          expect(item.choices[idx]).toBeTruthy();
          answers.push({ block: block.label, n: item.n, letter });
        });
      });
      const score = scoreAttempt(paper.id, answers);
      expect(score.points).toBe(100);
      expect(score.grade).toBe('10.00');
      const third = score.items.filter(item => item.kind === 'en-parts');
      expect(third).toHaveLength(2);
      expect(third.every(item => item.solution && item.parts.length === 2)).toBe(true);
    }
    expect(letters.size).toBeGreaterThan(1);
  });

  it('scores a real writing attempt without demanding the barem sentences', () => {
    const text = [
      'Aleg narațiunea. Într-o zi am deschis fereastra și praful a intrat în cameră.',
      'Apoi am închis-o, pentru că nu mai puteam scrie. Deci ziua s-a schimbat doar cu un geam.',
      'Am pus caietul deoparte și am ascultat curtea. Nu e o poveste lungă, e un capăt mic.',
      'Personajul din text, Mara, are grijă de un cireș și tace când e luată în râs. Asta e o trăsătură: discreția.',
      'A doua trăsătură e statornicia: se întoarce, udă, nu cere o placă cu nume. O valoare comună e grija.',
      'Am citit Amintiri din copilărie și acolo tot o grijă mică ține un loc. Închei aici, după ce am scris destul.',
      'Mai adaug un paragraf ca să trec de o sută cincizeci de cuvinte: holul, ghiozdanul ud, ploaia de joi,',
      'băiatul care îndreaptă piatra, sala de lectură cu reguli, și faptul că un loc al școlii rămâne viu dacă cineva are grijă.'
    ].join(' ');
    const score = scoreAttempt('en-ro-a', [
      { block: 'Subiectul I A', n: 1, letter: 'A' },
      { block: 'Subiectul I A', n: 9, text },
      { block: 'Subiectul II', n: 1, text }
    ]);
    const writing = score.items.find(item => item.kind === 'write');
    expect(writing.points).toBeGreaterThanOrEqual(8);
    const associate = score.items.find(item => item.kind === 'associate');
    expect(associate.points).toBeGreaterThan(0);
  });

  it('generates infinite unique math papers', () => {
    const a = generatePaper('matematica');
    const b = generatePaper('matematica', [a.id]);
    expect(a.id).not.toBe(b.id);
    expect(a.generated).toBe(true);
    expect(a.blocks[0].items.filter(item => item.n > 0)[0].choices).toHaveLength(4);
  });

  it('writing barem has ideas, not a model essay', () => {
    const item = getBaremItem('en-ro-a', 'Subiectul II', 1);
    expect(item.ideas.length).toBeGreaterThanOrEqual(2);
    expect(item.explain).toMatch(/nu există|fără text-model|compunere-model|nu un text/i);
    expect(item.ideas.join(' ')).toMatch(/încadrare|conținut|organizare/i);
    expect(item.ideas.join(' ')).not.toMatch(/Dragi colegi, astăzi/);
  });

  it('does not start the exam on open and hides the barem until finish', async () => {
    const agent = request.agent(app);
    const register = await agent.post('/api/auth/register').send({
      email: `en.barem.lock.${Date.now()}@example.com`,
      password: 'Testpass1!',
      name: 'Barem',
      username: `baremlock${Date.now()}`,
      class: '8',
      parentEmail: `parinte.barem.${Date.now()}@example.com`,
      parental_consent: true,
      privacy_accepted: true
    });
    expect([200, 201]).toContain(register.status);
    const open = await agent.post('/api/curriculum/en/papers/open').send({ paper_id: 'en-mate-a' });
    expect(open.status).toBe(200);
    expect(open.body.session.started).toBe(false);
    expect(open.body.session.finished).toBe(false);
    const reveal = await agent.post('/api/curriculum/en/barem').send({ paper_id: 'en-mate-a', block: 'Subiectul I', n: 1 });
    expect(reveal.status).toBe(403);
    expect(reveal.body.error).toMatch(/finaliz/i);

    const start = await agent.post('/api/curriculum/en/papers/start').send({ paper_id: 'en-mate-a' });
    expect(start.status).toBe(200);
    expect(start.body.session.started).toBe(true);
    expect(start.body.session.canFinish).toBe(false);

    const early = await agent.post('/api/curriculum/en/papers/finish').send({
      paper_id: 'en-mate-a',
      answers: [{ block: 'Subiectul I', n: 1, letter: 'B' }]
    });
    expect(early.status).toBe(429);
    expect(early.body.error).toMatch(/minim|sală|oră|minute/i);
  });

  it('allows finish after the official min stay and then opens the full barem', async () => {
    const agent = request.agent(app);
    const stamp = Date.now();
    const register = await agent.post('/api/auth/register').send({
      email: `en.finish.${stamp}@example.com`,
      password: 'Testpass1!',
      name: 'Elev EN',
      username: `enfinish${stamp}`,
      class: '8',
      parentEmail: `parinte.en.${stamp}@example.com`,
      parental_consent: true,
      privacy_accepted: true
    });
    expect([200, 201]).toContain(register.status);

    const start = await agent.post('/api/curriculum/en/papers/start').send({ paper_id: 'en-mate-a' });
    expect(start.status).toBe(200);
    await new Promise(resolve => setTimeout(resolve, 120));

    const finish = await agent.post('/api/curriculum/en/papers/finish').send({
      paper_id: 'en-mate-a',
      answers: [
        { block: 'Subiectul I', n: 1, letter: 'B' },
        { block: 'Subiectul I', n: 2, letter: 'C' }
      ]
    });
    expect(finish.status).toBe(200);
    expect(finish.body.result.grade).toMatch(/^\d+\.\d{2}$/);
    expect(finish.body.result.points).toBeGreaterThanOrEqual(20);
    expect(finish.body.session.finished).toBe(true);
    expect(finish.body.parentNotified).toBe(true);
    expect(finish.body.parentNotify.skipped).toBe(false);

    const reveal = await agent.post('/api/curriculum/en/barem').send({ paper_id: 'en-mate-a', block: 'Subiectul I', n: 1 });
    expect(reveal.status).toBe(200);
    expect(reveal.body.letter).toBe('B');

    const all = await agent.post('/api/curriculum/en/barem').send({ paper_id: 'en-mate-a' });
    expect(all.status).toBe(200);
    expect(all.body.items.length).toBeGreaterThan(10);
  });

  it('caps EN photo reviews at three per day and grades a notebook page after start', async () => {
    const agent = request.agent(app);
    const stamp = Date.now();
    const register = await agent.post('/api/auth/register').send({
      email: `en.photo.${stamp}@example.com`,
      password: 'Testpass1!',
      name: 'Foto EN',
      username: `enphoto${stamp}`,
      class: '8',
      parentEmail: `parinte.photo.${stamp}@example.com`,
      parental_consent: true,
      privacy_accepted: true
    });
    expect([200, 201]).toContain(register.status);
    const start = await agent.post('/api/curriculum/en/papers/start').send({ paper_id: 'en-ro-a' });
    expect(start.status).toBe(200);
    expect(start.body.photoQuota.remaining).toBe(3);
    const blob = `data:image/jpeg;base64,${'A'.repeat(80)}`;
    const first = await agent.post('/api/curriculum/en/photo-review').send({
      paper_id: 'en-ro-a',
      target: 'composition',
      image_base64: blob
    });
    expect(first.status).toBe(200);
    expect(first.body.review.feedback.length).toBeGreaterThan(20);
    expect(first.body.photoQuota.remaining).toBe(2);
    await agent.post('/api/curriculum/en/photo-review').send({ paper_id: 'en-ro-a', target: 'composition', image_base64: blob });
    await agent.post('/api/curriculum/en/photo-review').send({ paper_id: 'en-ro-a', target: 'composition', image_base64: blob });
    const fourth = await agent.post('/api/curriculum/en/photo-review').send({
      paper_id: 'en-ro-a',
      target: 'composition',
      image_base64: blob
    });
    expect(fourth.status).toBe(429);
    expect(fourth.body.error).toMatch(/3 poze/i);
  });
});

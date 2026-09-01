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
  });

  it('recommended Romanian papers include two support texts', () => {
    const papers = recommendedList('romana');
    papers.forEach(paper => {
      const passages = paper.blocks.flatMap(block => block.items).filter(item => item.kind === 'passage' || item.n === 0);
      expect(passages.length).toBeGreaterThanOrEqual(2);
      expect(passages.some(item => /Text-suport 1|literar/i.test(item.prompt))).toBe(true);
      expect(passages.some(item => /Text-suport 2|nonliterar|anunț|Aviz|Regulament/i.test(item.prompt))).toBe(true);
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
          const letter = bundle.barem[key].letter;
          letters.add(letter);
          const idx = 'ABCD'.indexOf(letter);
          expect(item.choices[idx]).toBeTruthy();
          answers.push({ block: block.label, n: item.n, letter });
        });
      });
      const score = scoreAttempt(paper.id, answers);
      expect(score.points).toBe(100);
      expect(score.grade).toBe('10.00');
    }
    expect(letters.size).toBeGreaterThan(1);
  });

  it('scores a real writing attempt without demanding the barem sentences', () => {
    const text = [
      'Aleg narațiunea. Într-o zi am deschis fereastra și praful a intrat în cameră.',
      'Apoi am închis-o, pentru că nu mai puteam scrie. Deci ziua s-a schimbat doar cu un geam.',
      'Am pus caietul deoparte și am ascultat curtea. Nu e o poveste lungă, e un capăt mic.'
    ].join(' ');
    const score = scoreAttempt('en-ro-a', [
      { block: 'Subiectul I', n: 1, letter: 'A' },
      { block: 'Subiectul III', n: 13, text }
    ]);
    const writing = score.items.find(item => item.kind === 'write');
    expect(writing.points).toBeGreaterThanOrEqual(16);
  });

  it('generates infinite unique math papers', () => {
    const a = generatePaper('matematica');
    const b = generatePaper('matematica', [a.id]);
    expect(a.id).not.toBe(b.id);
    expect(a.generated).toBe(true);
    expect(a.blocks[0].items.filter(item => item.n > 0)[0].choices).toHaveLength(4);
  });

  it('writing barem has ideas, not a model essay', () => {
    const item = getBaremItem('en-ro-a', 'Subiectul III', 13);
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
});

import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { recommendedList, generatePaper, getBaremItem, getBundle, scoreAttempt, timingForPaper } from '../backend/src/data/enPaperFactory.js';

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
      const first = paper.blocks.find(block => block.label === 'Subiectul I');
      const second = paper.blocks.find(block => block.label === 'Subiectul II');
      const third = paper.blocks.find(block => block.label === 'Subiectul III');
      expect(first.items.filter(item => item.n > 0).map(item => item.n)).toEqual([1, 2, 3, 4, 5, 6]);
      expect(second.items.filter(item => item.n > 0).map(item => item.n)).toEqual([1, 2, 3, 4, 5, 6]);
      const problems = (third.items || []).filter(item => item.n > 0);
      expect(problems).toHaveLength(6);
      problems.forEach(item => {
        expect(item.kind).toBe('en-parts');
        expect(item.points).toBe(5);
        expect(item.parts).toHaveLength(2);
        expect(item.parts.map(part => part.id)).toEqual(['a', 'b']);
        expect(item.parts[0].points).toBe(2);
        expect(item.parts[1].points).toBe(3);
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
        expect(item.prompt.split(/\s+/).length).toBeGreaterThan(180);
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
    const letters = new Set();
    papers.forEach(paper => {
      const bundle = getBundle(paper.id);
      Object.values(bundle.barem).forEach(row => {
        if (row.letter) letters.add(row.letter);
      });
    });
    expect(letters.size).toBeGreaterThan(1);
  });

  it('generated Romanian papers stay on the 2026 sheet and shuffle the correct letter', () => {
    const letters = new Set();
    const ids = new Set();
    for (let i = 0; i < 6; i += 1) {
      const paper = generatePaper('romana', [...ids]);
      ids.add(paper.id);
      expect(paper.generated).toBe(true);
      const a = paper.blocks.find(block => block.label === 'Subiectul I A');
      const b = paper.blocks.find(block => block.label === 'Subiectul I B');
      const two = paper.blocks.find(block => block.label === 'Subiectul II');
      expect(a.points).toBe(50);
      expect(b.points).toBe(20);
      expect(two.points).toBe(20);
      expect(a.items.filter(item => item.kind === 'passage' || item.n === 0).length).toBeGreaterThanOrEqual(2);
      expect(b.items.filter(item => item.n > 0).every(item => item.choices?.length === 4)).toBe(true);
      expect(two.items.find(item => item.kind === 'write').photoOnly).toBe(true);
      const bundle = getBundle(paper.id);
      const answers = [];
      paper.blocks.forEach(block => {
        block.items.filter(item => item.n > 0).forEach(item => {
          const row = bundle.barem[`${block.label}:${item.n}`];
          if (item.choices?.length) {
            letters.add(row.letter);
            answers.push({ block: block.label, n: item.n, letter: row.letter });
            return;
          }
          if (item.kind === 'short' && (item.minWords || 0) < 20) {
            answers.push({ block: block.label, n: item.n, text: (row.answers || [])[0] || '' });
          }
        });
      });
      const score = scoreAttempt(paper.id, answers);
      expect(score.points).toBeGreaterThanOrEqual(50);
    }
    expect(ids.size).toBe(6);
    expect(letters.size).toBeGreaterThan(1);
  });

  it('generated math papers shuffle the correct letter and stay solvable', () => {
    const letters = new Set();
    for (let i = 0; i < 6; i += 1) {
      const paper = generatePaper('matematica');
      const first = paper.blocks.find(block => block.label === 'Subiectul I');
      const second = paper.blocks.find(block => block.label === 'Subiectul II');
      const thirdBlock = paper.blocks.find(block => block.label === 'Subiectul III');
      expect(first.items.filter(item => item.n > 0).map(item => item.n)).toEqual([1, 2, 3, 4, 5, 6]);
      expect(second.items.filter(item => item.n > 0).map(item => item.n)).toEqual([1, 2, 3, 4, 5, 6]);
      expect(thirdBlock.items.filter(item => item.n > 0)).toHaveLength(6);
      expect(thirdBlock.items.filter(item => item.n > 0).every(item => item.parts?.[0]?.points === 2 && item.parts?.[1]?.points === 3)).toBe(true);
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
      expect(third).toHaveLength(6);
      expect(third.every(item => item.solution && item.parts.length === 2)).toBe(true);
      expect(third.every(item => item.maxPoints === 5)).toBe(true);
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

  it('keeps extra original Romanian packs in the infinite pool, with longer texts', () => {
    const ids = ['en-ro-a', 'en-ro-b', 'en-ro-c', 'en-ro-d', 'en-ro-e', 'en-ro-f', 'en-ro-g', 'en-ro-h', 'en-ro-i', 'en-ro-j', 'en-ro-k', 'en-ro-l'];
    ids.forEach(id => {
      const bundle = getBundle(id);
      expect(bundle, id).toBeTruthy();
      const passages = bundle.public.blocks.flatMap(block => block.items).filter(item => item.kind === 'passage' || item.n === 0);
      expect(passages.length).toBeGreaterThanOrEqual(2);
      const lit = passages[0].prompt.split(/\s+/).filter(Boolean).length;
      const non = passages[1].prompt.split(/\s+/).filter(Boolean).length;
      expect(lit, `${id} literary`).toBeGreaterThan(280);
      expect(non, `${id} nonliterary`).toBeGreaterThan(180);
    });
    const seenTitles = new Set();
    for (let i = 0; i < 24; i += 1) {
      const paper = generatePaper('romana');
      const first = paper.blocks[0].items.find(item => item.kind === 'passage' || item.n === 0);
      const passages = paper.blocks.flatMap(block => block.items).filter(item => item.kind === 'passage' || item.n === 0);
      expect(passages[0].prompt.split(/\s+/).filter(Boolean).length).toBeGreaterThan(280);
      expect(passages[1].prompt.split(/\s+/).filter(Boolean).length).toBeGreaterThan(180);
      seenTitles.add(String(first.prompt || '').slice(0, 120));
    }
    expect(seenTitles.size).toBe(24);
  });

  it('drill papers skip the 60-minute sala rule and still score to 10 on a perfect attempt', () => {
    const drillRo = generatePaper('romana', [], { mode: 'drill' });
    expect(drillRo.mode).toBe('drill');
    expect(drillRo.minStayMinutes).toBe(0);
    expect(drillRo.antiCheat.minStayMinutes).toBe(0);
    expect(drillRo.title).toMatch(/Antrenament scurt/i);
    expect(drillRo.title).not.toMatch(/dril$/i);
    expect(drillRo.blocks.find(block => block.label === 'Subiectul II')).toBeUndefined();
    const a = drillRo.blocks.find(block => block.label === 'Subiectul I A');
    const b = drillRo.blocks.find(block => block.label === 'Subiectul I B');
    expect(a.items.filter(item => item.n > 0).every(item => item.n <= 7)).toBe(true);
    expect(b.items.filter(item => item.n > 0)).toHaveLength(4);
    expect(timingForPaper(drillRo).stayMs).toBe(0);
    expect(timingForPaper(drillRo).mode).toBe('drill');

    const exam = generatePaper('romana');
    expect(exam.mode).toBe('exam');
    expect(exam.minStayMinutes).toBeGreaterThanOrEqual(1);
    expect(timingForPaper(exam).stayMs).toBeGreaterThan(0);

    const fillPerfect = paper => {
      const bundle = getBundle(paper.id);
      const answers = [];
      paper.blocks.forEach(block => {
        block.items.filter(item => item.n > 0).forEach(item => {
          const row = bundle.barem[`${block.label}:${item.n}`] || {};
          if (item.kind === 'en-parts' || item.parts) {
            const parts = {};
            Object.entries(row.parts || {}).forEach(([id, part]) => {
              parts[id] = part.answer;
            });
            answers.push({ block: block.label, n: item.n, parts });
            return;
          }
          if (item.choices?.length) {
            answers.push({ block: block.label, n: item.n, letter: row.letter });
            return;
          }
          answers.push({ block: block.label, n: item.n, text: (row.answers || [])[0] || (row.tokens || [])[0] || '' });
        });
      });
      return scoreAttempt(paper.id, answers);
    };

    const roScore = fillPerfect(drillRo);
    expect(roScore.grade).toBe('10.00');
    expect(roScore.points).toBe(roScore.max);

    const drillMath = generatePaper('matematica', [], { mode: 'drill' });
    expect(drillMath.minStayMinutes).toBe(0);
    expect(drillMath.blocks.find(block => block.label === 'Subiectul II')).toBeUndefined();
    const third = drillMath.blocks.find(block => block.label === 'Subiectul III');
    expect(third.items.filter(item => item.n > 0)).toHaveLength(3);
    const mathScore = fillPerfect(drillMath);
    expect(mathScore.grade).toBe('10.00');
  });

  it('lets a student finish a drill immediately while a full EN paper still waits', async () => {
    const agent = request.agent(app);
    const stamp = Date.now();
    const register = await agent.post('/api/auth/register').send({
      email: `en.drill.${stamp}@example.com`,
      password: 'Testpass1!',
      name: 'Drill EN',
      username: `endrill${stamp}`,
      class: '8',
      parentEmail: `parinte.drill.${stamp}@example.com`,
      parental_consent: true,
      privacy_accepted: true
    });
    expect([200, 201]).toContain(register.status);

    const gen = await agent.post('/api/curriculum/en/papers/generate').send({
      subject: 'romana',
      mode: 'drill'
    });
    expect(gen.status).toBe(200);
    expect(gen.body.paper.mode).toBe('drill');
    expect(gen.body.paper.minStayMinutes).toBe(0);
    expect(gen.body.session.minStayMs).toBe(0);

    const start = await agent.post('/api/curriculum/en/papers/start').send({ paper_id: gen.body.paper.id });
    expect(start.status).toBe(200);
    expect(start.body.session.canFinish).toBe(true);
    expect(start.body.session.minStayMs).toBe(0);

    const finish = await agent.post('/api/curriculum/en/papers/finish').send({
      paper_id: gen.body.paper.id,
      answers: [{ block: 'Subiectul I A', n: 1, letter: 'A' }]
    });
    expect(finish.status).toBe(200);
    expect(finish.body.session.finished).toBe(true);
    expect(finish.body.result.grade).toMatch(/^\d+\.\d{2}$/);
  });
});

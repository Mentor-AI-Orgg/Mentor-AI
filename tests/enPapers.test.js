import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { recommendedList, generatePaper, getBaremItem } from '../backend/src/data/enPaperFactory.js';

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
    expect(item.explain).toMatch(/nu există un text|nu un text/i);
    expect(item.ideas.join(' ')).not.toMatch(/Dragi colegi, astăzi/);
  });

  it('refuses a barem reveal before the work lock', async () => {
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
    expect(open.body.session.unlocked).toBe(false);
    const reveal = await agent.post('/api/curriculum/en/barem').send({ paper_id: 'en-mate-a', block: 'Subiectul I', n: 1 });
    expect(reveal.status).toBe(429);
    expect(reveal.body.error).toMatch(/minute|foaie/i);
  });
});

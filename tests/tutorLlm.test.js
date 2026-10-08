import { createRequire } from 'node:module';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const config = nodeRequire('../backend/src/config.js');
const { maybeTutorLlm } = nodeRequire('../backend/src/mentor/tutorLlm.js');

const saved = {
  flag: process.env.TUTOR_LLM,
  model: process.env.TUTOR_LLM_MODEL,
  key: config.OPENAI_KEY
};

function restoreEnv() {
  if (saved.flag === undefined) delete process.env.TUTOR_LLM;
  else process.env.TUTOR_LLM = saved.flag;
  if (saved.model === undefined) delete process.env.TUTOR_LLM_MODEL;
  else process.env.TUTOR_LLM_MODEL = saved.model;
  config.OPENAI_KEY = saved.key;
}

function mockReply(content) {
  return vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({ choices: [{ message: { content } }] })
  });
}

describe('modelul opțional al tutorelui', () => {
  afterEach(() => {
    restoreEnv();
    vi.restoreAllMocks();
  });

  it('rămâne oprit fără steag, chiar dacă există cheie', async () => {
    delete process.env.TUTOR_LLM;
    config.OPENAI_KEY = 'cheie-falsa';
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(() => {
      throw new Error('fetch nu trebuie apelat');
    });
    const result = await maybeTutorLlm({
      message: 'zzqq plmnbvc',
      subject: 'matematica',
      grade: 6,
      local: { confident: false }
    });
    expect(result).toBeNull();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('rămâne oprit cu steagul pornit, dacă lipsește cheia', async () => {
    process.env.TUTOR_LLM = '1';
    config.OPENAI_KEY = '';
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(() => {
      throw new Error('fetch nu trebuie apelat');
    });
    const result = await maybeTutorLlm({
      message: 'zzqq plmnbvc',
      subject: 'matematica',
      grade: 6,
      local: { confident: false }
    });
    expect(result).toBeNull();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('cere modelul ieftin și aruncă un răspuns cu numere din afara materialului', async () => {
    process.env.TUTOR_LLM = '1';
    config.OPENAI_KEY = 'cheie-falsa';
    const fetchSpy = mockReply('Rezultatul este 99999.');
    const result = await maybeTutorLlm({
      message: 'zzqq plmnbvc',
      subject: 'matematica',
      grade: 6,
      language: 'ro',
      local: { confident: false }
    });
    expect(result).toBeNull();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const body = JSON.parse(fetchSpy.mock.calls[0][1].body);
    expect(body.model).toBe('gpt-4o-mini');
    expect(body.temperature).toBe(0);
    expect(body.messages[0].content).toMatch(/Nu rezolvi tema/);
    expect(body.messages[0].content).toMatch(/nu sunt scrise acolo|Nu adaugi/);
  });

  it('păstrează un răspuns scurt, fără numere noi', async () => {
    process.env.TUTOR_LLM = '1';
    process.env.TUTOR_LLM_MODEL = 'gpt-4o-mini';
    config.OPENAI_KEY = 'cheie-falsa';
    mockReply('Nu sunt sigură. Spune lecția pe care ai deschis-o.');
    const result = await maybeTutorLlm({
      message: 'zzqq plmnbvc',
      subject: 'matematica',
      grade: 6,
      local: { confident: false }
    });
    expect(result.engine).toBe('tutor_llm');
    expect(result.confident).toBe(true);
    expect(result.text).toMatch(/Nu sunt sigură/);
  });

  it('prin chat, steagul și cheia schimbă motorul doar la o întrebare nesigură', async () => {
    process.env.TUTOR_LLM = '1';
    config.OPENAI_KEY = 'cheie-falsa';
    mockReply('Nu sunt sigură. Rămânem la ce e scris în lecții.');
    const { app } = createApp({ autosave: false });
    const { agent } = await registerGranted(app);
    const res = await agent.post('/api/chat').send({
      message: 'zzqq plmnbvc',
      language: 'ro',
      subject: 'matematica',
      class_level: 6
    });
    expect(res.status).toBe(200);
    expect(res.body.engine_used).toBe('tutor_llm');
    expect(res.body.engine_mocked).toBe(false);
    expect(res.body.response).toMatch(/Nu sunt sigură/);
  });
});

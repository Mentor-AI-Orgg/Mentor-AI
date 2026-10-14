import fs from 'node:fs';
import { createRequire } from 'node:module';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { lateDecision, rememberNight, seenNight } from '../frontend/lateNight.js';

const nodeRequire = createRequire(import.meta.url);
const days = nodeRequire('../backend/src/ops/bucharestDay.js');
const economy = nodeRequire('../backend/src/data/economyStore.js');
const { buildPanel } = nodeRequire('../backend/src/parent/panel.js');

afterEach(() => {
  vi.useRealTimers();
});

describe('ora târzie', () => {
  it('ține fereastra 22:00–06:00 la București', () => {
    expect(days.isLateHour(21)).toBe(false);
    expect(days.isLateHour(22)).toBe(true);
    expect(days.isLateHour(0)).toBe(true);
    expect(days.isLateHour(5)).toBe(true);
    expect(days.isLateHour(6)).toBe(false);
    const night = new Date('2026-10-14T20:30:00.000Z');
    const morning = new Date('2026-10-14T21:40:00.000Z');
    const noon = new Date('2026-10-14T09:00:00.000Z');
    expect(days.bucharestClock(night).hour).toBe(23);
    expect(days.bucharestClock(morning)).toMatchObject({ hour: 0, minute: '40', day: '2026-10-15' });
    expect(days.isLateHour(days.bucharestClock(noon).hour)).toBe(false);
    expect(days.nightKey(morning)).toBe('2026-10-14');
    expect(days.nightKey(night)).toBe('2026-10-14');
  });

  it('spune părintelui „ieri la 00:40”, fără email', () => {
    const at = '2026-10-14T21:40:00.000Z';
    const later = new Date('2026-10-15T07:00:00.000Z');
    expect(days.lateActivityNote(at, later)).toBe('Activitate târzie: ieri la 00:40');
    expect(days.lateActivityNote(at, new Date('2026-10-14T22:10:00.000Z'))).toBe('Activitate târzie: azi la 00:40');
    expect(days.lateActivityNote('2026-10-14T20:10:00.000Z', later)).toBe('Activitate târzie: ieri la 23:10');
    expect(days.lateActivityNote('2026-10-10T20:10:00.000Z', later)).toBe('');
    const noteFile = fs.readFileSync('backend/src/ops/bucharestDay.js', 'utf8');
    expect(noteFile).not.toMatch(/deliver|nodemailer|sendMail/);
  });

  it('notează deschiderea și finalul doar noaptea', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-10-14T20:30:00.000Z'));
    const email = `noapte.${Date.now()}@example.com`;
    const before = economy.getNotifications(email).inbox.length;
    economy.recordProgress({
      userId: email,
      type: 'chapter_open',
      meta: { subject: 'matematica', grade: '5', chapterId: 'naturale', title: 'Numere naturale' }
    });
    const user = economy.getUser(email);
    expect(user.lateActivity.at).toBe('2026-10-14T20:30:00.000Z');
    expect(buildPanel(email).lateNote).toBe('Activitate târzie: azi la 23:30');
    expect(economy.getNotifications(email).inbox.length).toBe(before);
    expect(economy.getSummary(email).lateNight).toBe(true);

    vi.setSystemTime(new Date('2026-10-14T09:00:00.000Z'));
    const dayEmail = `ziua.${Date.now()}@example.com`;
    economy.recordProgress({
      userId: dayEmail,
      type: 'chapter_open',
      meta: { subject: 'matematica', grade: '5', chapterId: 'naturale', title: 'Numere naturale' }
    });
    expect(economy.getUser(dayEmail).lateActivity).toBeNull();
    expect(buildPanel(dayEmail).lateNote).toBe('');
    expect(economy.getSummary(dayEmail).lateNight).toBe(false);
  });
});

describe('cardul de noapte, pe client', () => {
  it('folosește ora telefonului doar în Europe/Bucharest', () => {
    const lateLocal = new Date(2026, 9, 14, 23, 15);
    const dayLocal = new Date(2026, 9, 14, 15, 0);
    expect(lateDecision({
      now: lateLocal,
      timeZone: 'Europe/Bucharest',
      serverLate: false
    }).late).toBe(true);
    expect(lateDecision({
      now: dayLocal,
      timeZone: 'Europe/Bucharest',
      serverLate: true
    }).late).toBe(false);
    expect(lateDecision({
      now: dayLocal,
      timeZone: 'America/New_York',
      serverLate: true,
      serverNight: '2026-10-14'
    })).toMatchObject({ late: true, night: '2026-10-14', source: 'server' });
    expect(lateDecision({
      now: lateLocal,
      timeZone: 'America/New_York',
      serverLate: false
    }).late).toBe(false);
  });

  it('apare o singură dată în sesiune, în noaptea asta', () => {
    const box = {
      value: '',
      getItem() { return this.value; },
      setItem(_key, value) { this.value = value; }
    };
    expect(seenNight('2026-10-14', box)).toBe(false);
    rememberNight('2026-10-14', box);
    expect(seenNight('2026-10-14', box)).toBe(true);
    expect(seenNight('2026-10-15', box)).toBe(false);
  });

  it('nu acoperă întrebarea și are cele două ieșiri', () => {
    const card = fs.readFileSync('frontend/components/LateNightCard.jsx', 'utf8');
    const daily = fs.readFileSync('frontend/screens/DailyChallengeScreen.jsx', 'utf8');
    const learn = fs.readFileSync('frontend/screens/LearnScreen.jsx', 'utf8');
    const quiz = fs.readFileSync('frontend/components/ChapterQuiz.jsx', 'utf8');
    const parent = fs.readFileSync('frontend/components/ConsentScreens.jsx', 'utf8');
    expect(card).toContain('🌙 E târziu! Seria ta e salvată pentru azi. Continuăm mâine?');
    expect(card).toContain('Pe mâine');
    expect(card).toContain('Mai fac puțin');
    expect(card).toContain('accent-button');
    expect(card).toContain('ghost-button');
    expect(daily).toContain("step === 'start' && !nightOn");
    expect(daily).toContain("step === 'ask'");
    const asking = daily.slice(daily.indexOf("step === 'ask'"), daily.indexOf("step === 'result'"));
    expect(asking).not.toContain('LateNightCard');
    expect(learn).toContain('askNight');
    const questions = quiz.slice(quiz.indexOf('card && !report'), quiz.indexOf('{report &&'));
    expect(questions).not.toContain('onFinished');
    expect(quiz).toContain('onFinished?.()');
    expect(parent).toContain('panel?.lateNote');
    expect(parent).not.toContain('Mama');
  });
});

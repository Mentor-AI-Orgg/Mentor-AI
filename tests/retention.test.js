import fs from 'node:fs';
import { createRequire } from 'node:module';
import { afterEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../backend/src/app.js';
import { registerGranted } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const league = nodeRequire('../backend/src/data/weeklyLeague.js');
const readiness = nodeRequire('../backend/src/data/readiness.js');
const economy = nodeRequire('../backend/src/data/economyStore.js');
const auth = nodeRequire('../backend/src/data/authStore.js');
const days = nodeRequire('../backend/src/ops/bucharestDay.js');
const { publicId } = nodeRequire('../backend/src/data/friendStore.js');

afterEach(() => {
  vi.useRealTimers();
});

function parentOf(app, parentEmail) {
  return (async () => {
    const logs = [];
    const original = console.log;
    console.log = (...args) => logs.push(args.map(item => String(item)).join(' '));
    try {
      await request(app).post('/api/parent/magic').send({ email: parentEmail });
    } finally {
      console.log = original;
    }
    const token = (logs.join('\n').match(/#\/parinte\/([a-f0-9]+)/) || [])[1];
    const agent = request.agent(app);
    const consumed = await agent.post('/api/parent/magic/consume').send({ token });
    expect(consumed.status).toBe(200);
    return agent;
  })();
}

describe('regulile ligii', () => {
  it('numără zilele de luni până duminică și nu lasă zonele să se calce', () => {
    expect(days.weekKey('2026-10-12')).toBe(days.weekKey('2026-10-18'));
    expect(days.weekKey('2026-10-19')).not.toBe(days.weekKey('2026-10-12'));
    expect(league.daysLeft('2026-10-12')).toBe(7);
    expect(league.daysLeft('2026-10-18')).toBe(1);
    expect(league.daysLabel(1)).toBe('Ultima zi din săptămână');
    expect(league.daysLabel(7)).toBe('Mai sunt 7 zile');

    const full = league.zoneBounds(20, 'argint');
    expect(full).toEqual({ promoteThrough: 5, demoteFrom: 16 });
    expect(league.zoneBounds(20, 'bronz').demoteFrom).toBe(21);
    expect(league.zoneBounds(20, 'diamant').promoteThrough).toBe(0);
    expect(league.zoneBounds(1, 'bronz')).toEqual({ promoteThrough: 1, demoteFrom: 2 });
    expect(league.nextTierForPlace(1, 1, 'bronz')).toBe('argint');
    expect(league.nextTierForPlace(1, 1, 'diamant')).toBe('diamant');
    expect(league.nextTierForPlace(6, 6, 'bronz')).toBe('bronz');
    expect(league.nextTierForPlace(1, 6, 'diamant')).toBe('diamant');
    expect(league.nextTierForPlace(6, 6, 'diamant')).toBe('aur');
  });

  it('arată doar porecla, locul și zona', () => {
    const rows = league.publicBoard([
      { nickname: 'Zeta', xp: 10, self: false, email: 'zeta@example.com' },
      { nickname: 'Alfa', xp: 40, self: true, email: 'alfa@example.com' },
      { nickname: 'Beta', xp: 30, email: 'beta@example.com' },
      { nickname: 'Gama', xp: 20, email: 'gama@example.com' },
      { nickname: 'Delta', xp: 15, email: 'delta@example.com' },
      { nickname: 'Eps', xp: 12, email: 'eps@example.com' }
    ], 'argint');
    expect(rows[0]).toEqual({ place: 1, nickname: 'Alfa', xp: 40, zone: 'up', self: true });
    expect(rows[5].zone).toBe('down');
    expect(JSON.stringify(rows)).not.toContain('@');
    expect(rows[0]).not.toHaveProperty('email');
  });
});

describe('liga săptămânală', () => {
  function makeStudent(name, grade, tier) {
    const email = `${name}.${grade}@example.com`;
    const user = economy.ensureUser(email, { username: name, className: grade, role: 'student' });
    user.league.tier = tier;
    return email;
  }

  function giveChapters(email, grade, count) {
    for (let index = 0; index < count; index += 1) {
      economy.recordProgress({
        userId: email,
        type: 'session_complete',
        trusted: true,
        meta: { subject: 'matematica', grade, chapterId: `cap${index}`, title: `Capitol ${index}` }
      });
    }
  }

  it('deschide o ligă nouă la al 21-lea elev și nu arată emailul', () => {
    const grade = `g${Date.now().toString(36)}`;
    const emails = Array.from({ length: 21 }, (_, index) => {
      const name = `grup${String(index).padStart(2, '0')}`;
      const email = makeStudent(name, grade, 'bronz');
      giveChapters(email, grade, 1);
      return email;
    });
    const views = emails.map(email => economy.leagueView(email));
    const sizes = views.map(view => view.size).sort((a, b) => b - a);
    expect(sizes.filter(size => size === 20)).toHaveLength(20);
    expect(sizes.filter(size => size === 1)).toHaveLength(1);
    views.forEach(view => {
      expect(view.joined).toBe(true);
      expect(view.tier).toBe('Bronz');
      expect(JSON.stringify(view)).not.toContain('@');
      view.rows.forEach(row => {
        expect(row.nickname.startsWith('grup')).toBe(true);
        expect(Object.keys(row).sort()).toEqual(['nickname', 'place', 'self', 'xp', 'zone']);
      });
    });
  });

  it('urcă primii cinci, coboară ultimul și nu repetă rezolvarea', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-10-12T10:00:00.000Z'));
    const grade = `r${Date.now().toString(36)}`;
    const plan = [
      ['aalfa', 4],
      ['bbeta', 3],
      ['cgama', 2],
      ['ddelta', 2],
      ['eeps', 1],
      ['fzeta', 1]
    ];
    const emails = plan.map(([name, count]) => {
      const email = makeStudent(name, grade, 'argint');
      giveChapters(email, grade, count);
      return email;
    });
    const monday = economy.leagueView(emails[0]);
    expect(monday.daysLeft).toBe(7);
    expect(monday.daysLabel).toBe('Mai sunt 7 zile');
    expect(monday.rows.map(row => row.nickname)).toEqual(plan.map(([name]) => name));
    expect(monday.rows.filter(row => row.zone === 'up').map(row => row.place)).toEqual([1, 2, 3, 4, 5]);
    expect(monday.rows.filter(row => row.zone === 'down').map(row => row.place)).toEqual([6]);
    expect(JSON.stringify(monday)).not.toContain('@');

    vi.setSystemTime(new Date('2026-10-18T10:00:00.000Z'));
    const sunday = economy.leagueView(emails[5]);
    expect(sunday.daysLeft).toBe(1);
    expect(sunday.daysLabel).toBe('Ultima zi din săptămână');
    expect(sunday.tier).toBe('Argint');

    vi.setSystemTime(new Date('2026-10-19T10:00:00.000Z'));
    emails.forEach(email => economy.leagueView(email));
    expect(economy.getUser(emails[0]).league.tier).toBe('aur');
    expect(economy.getUser(emails[4]).league.tier).toBe('aur');
    expect(economy.getUser(emails[5]).league.tier).toBe('bronz');
    const promoted = economy.childShare(emails[0]).milestones.filter(item => item.kind === 'league');
    expect(promoted).toHaveLength(1);
    expect(promoted[0].label).toBe('A urcat în liga Aur');
    economy.leagueView(emails[0]);
    expect(economy.childShare(emails[0]).milestones.filter(item => item.kind === 'league')).toHaveLength(1);
    expect(economy.childShare(emails[5]).milestones.some(item => item.kind === 'league')).toBe(false);
  });

  it('nu urcă peste Diamant și nu coboară sub Bronz', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-10-12T10:00:00.000Z'));
    const grade = `c${Date.now().toString(36)}`;
    const top = makeStudent('topdiam', grade, 'diamant');
    giveChapters(top, grade, 2);
    vi.setSystemTime(new Date('2026-10-19T10:00:00.000Z'));
    economy.leagueView(top);
    expect(economy.getUser(top).league.tier).toBe('diamant');

    vi.setSystemTime(new Date('2026-10-12T10:00:00.000Z'));
    const lowGrade = `b${Date.now().toString(36)}`;
    const emails = ['unu', 'doi', 'trei', 'patru', 'cinci', 'sase'].map((name, index) => {
      const email = makeStudent(name, lowGrade, 'bronz');
      giveChapters(email, lowGrade, 6 - index);
      return email;
    });
    vi.setSystemTime(new Date('2026-10-19T10:00:00.000Z'));
    emails.forEach(email => economy.leagueView(email));
    expect(economy.getUser(emails[0]).league.tier).toBe('argint');
    expect(economy.getUser(emails[5]).league.tier).toBe('bronz');
  });

  it('nu bagă în ligă un cont care nu e de elev', () => {
    const grade = `p${Date.now().toString(36)}`;
    const email = `profesor.${grade}@example.com`;
    economy.ensureUser(email, { role: 'teacher', className: grade, username: 'profesor' });
    giveChapters(email, grade, 2);
    const view = economy.leagueView(email);
    expect(view.joined).toBe(false);
    expect(view.weekXp).toBe(0);
    expect(view.message).toMatch(/XP/);
  });
});

describe('pregătirea pentru evaluare', () => {
  it('pornește de la zero și urcă odată cu capitolul terminat și cu acuratețea', () => {
    const units = readiness.unitsFor(5);
    const user = { preferences: { className: '5' }, chapters: {}, practiceTests: {} };
    const empty = readiness.readinessFor(user, 5);
    expect(empty.percent).toBe(0);
    expect(empty.label).toBe('Progres la clasa a V-a');
    expect(empty.next.title).toBe(units[0].title);
    expect(empty.hint).toBe(`Următorul capitol: ${units[0].title}`);

    const first = units[0];
    const key = `${first.subject}:${first.grade}:${first.id}`;
    user.chapters[key] = { status: 'done' };
    const doneOnly = readiness.readinessFor(user, 5);
    expect(doneOnly.percent).toBe(Math.round((100 * 0.75) / units.length));
    expect(doneOnly.done).toBe(1);
    expect(doneOnly.next.chapterId).toBe(units[1].id);

    user.practiceTests[`${key}:2026-10-14`] = { score: 8, total: 10 };
    const scored = readiness.readinessFor(user, 5);
    expect(scored.percent).toBe(Math.round((100 * 0.9) / units.length));
  });

  it('la clasa a VI-a e progresul clasei, iar la a VIII-a e programa de examen', () => {
    const six = readiness.readinessFor({ preferences: { className: '6' }, chapters: {}, practiceTests: {} }, 6);
    expect(six.label).toBe('Progres la clasa a VI-a');
    expect(six.exam).toBe(false);

    const en = readiness.unitsFor(8);
    expect(en[0].id).toBe('proba');
    expect(en.some(unit => unit.id === 'intervale')).toBe(false);
    const user = { preferences: { className: '8' }, chapters: {}, practiceTests: {} };
    const before = readiness.readinessFor(user, 8);
    expect(before.label).toBe('Pregătit pentru Evaluare');
    expect(before.exam).toBe(true);
    expect(before.next.chapterId).toBe('proba');
    user.chapters['matematica:8:proba'] = { status: 'done' };
    const after = readiness.readinessFor(user, 8);
    expect(after.percent).toBeGreaterThan(before.percent);
    expect(after.next.chapterId).not.toBe('intervale');
    expect(after.next.title).not.toBe('Intervale și inecuații');
  });

  it('notează o singură dată fiecare prag de 10 procente', () => {
    const units = readiness.unitsFor(6);
    const email = `prag.${Date.now()}@example.com`;
    const user = economy.ensureUser(email, { className: '6', username: 'praguri' });
    let marked = 0;
    while (readiness.readinessFor(user, 6).percent < 10 && marked < units.length) {
      const unit = units[marked];
      user.chapters[`${unit.subject}:${unit.grade}:${unit.id}`] = { status: 'done' };
      marked += 1;
    }
    const summary = economy.getSummary(email);
    expect(summary.readiness.percent).toBeGreaterThanOrEqual(10);
    expect(summary.readiness.label).toBe('Progres la clasa a VI-a');
    const ids = economy.childShare(email).milestones.map(item => item.id);
    expect(ids).toContain('readiness:10');
    if (summary.readiness.percent < 20) expect(ids).not.toContain('readiness:20');
    economy.getSummary(email);
    expect(economy.childShare(email).milestones.filter(item => item.id === 'readiness:10')).toHaveLength(1);
  });
});

describe('lauda părintelui', () => {
  it('ține minte seria, provocarea perfectă și nu retrimite lauda', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-10-14T08:00:00.000Z'));
    const hits = [3, 5, 7, 14, 30].map(count => {
      const email = `serie${count}.${Date.now()}@example.com`;
      const user = economy.ensureUser(email, { username: `serie${count}`, className: '5' });
      user.streakGuard = { count: count - 1, lastDay: '2026-10-13', week: '2026-W42', freezes: 1, frozenDay: '' };
      economy.recordProgress({
        userId: email,
        type: 'session_complete',
        trusted: true,
        meta: { subject: 'matematica', grade: '5', chapterId: `serie${count}`, title: 'Serie' }
      });
      return economy.childShare(email).milestones.some(item => item.id === `streak:${count}`);
    });
    expect(hits).toEqual([true, true, true, true, true]);

    const again = `serie3b.${Date.now()}@example.com`;
    const repeat = economy.ensureUser(again, { username: 'serie3b', className: '5' });
    repeat.streakGuard = { count: 2, lastDay: '2026-10-13', week: '2026-W42', freezes: 1, frozenDay: '' };
    economy.recordProgress({
      userId: again,
      type: 'session_complete',
      trusted: true,
      meta: { subject: 'matematica', grade: '5', chapterId: 'prima', title: 'Prima' }
    });
    economy.recordProgress({
      userId: again,
      type: 'session_complete',
      trusted: true,
      meta: { subject: 'matematica', grade: '5', chapterId: 'adoua', title: 'A doua' }
    });
    expect(economy.childShare(again).milestones.filter(item => item.id === 'streak:3')).toHaveLength(1);

    const email = `perfect.${Date.now()}@example.com`;
    economy.ensureUser(email, { username: 'perfect', className: '5' });
    economy.recordProgress({
      userId: email,
      type: 'session_complete',
      trusted: true,
      meta: { subject: 'matematica', grade: '5', chapterId: 'naturale', title: 'Numere naturale' }
    });
    economy.getDailyChallenge(email);
    const stored = economy.getUser(email).dailyChallenge.questions;
    expect(stored.length).toBeGreaterThan(0);
    const finished = economy.finishDailyChallenge(email, stored.map(item => ({ id: item.id, choice: item.correctAt })));
    expect(finished.correct).toBe(finished.total);
    const challenge = economy.childShare(email).milestones.find(item => item.kind === 'challenge');
    expect(challenge.label).toBe('Provocarea zilei, punctaj maxim');

    const before = economy.getNotifications(email).inbox.length;
    expect(economy.praiseChild(email, challenge.id, 'clap')).toEqual({ ok: true });
    expect(economy.getNotifications(email).inbox.length).toBe(before);
    expect(economy.getSummary(email).praiseNotice).toEqual({ text: 'Părintele tău te-a lăudat! 👏' });
    economy.seePraise(email);
    expect(economy.praiseChild(email, challenge.id, 'heart')).toEqual({ ok: true });
    expect(economy.getSummary(email).praiseNotice).toBeNull();
    expect(economy.getUser(email).praiseNotice.emoji).toBe('👏');
    expect(JSON.stringify(economy.childShare(email))).not.toContain(email);
  });

  it('răspunde părintelui fără email și refuză alt copil', async () => {
    const { app } = createApp({ autosave: false });
    const child = await registerGranted(app);
    const other = await registerGranted(app);
    expect(child.res.status).toBe(201);
    const account = auth.findByUsername(child.username);
    const user = economy.ensureUser(account.email, { username: child.username, className: '5' });
    user.milestones = [{
      id: 'streak:3',
      kind: 'streak',
      label: 'Serie de 3 zile',
      at: '2026-10-14T08:00:00.000Z',
      praised: false
    }];
    const parent = await parentOf(app, child.parentEmail);
    const mine = await parent.get('/api/parent/me');
    const id = mine.body.children[0].id;
    const panel = await parent.get(`/api/parent/children/${id}/panel`);
    expect(panel.status).toBe(200);
    expect(panel.body.readiness.label).toMatch(/Progres la clasa/);
    expect(panel.body.milestones.map(item => item.id)).toContain('streak:3');
    expect(JSON.stringify(panel.body.milestones)).not.toContain('@');
    expect(JSON.stringify(panel.body.readiness)).not.toContain('@');

    const praised = await parent.post(`/api/parent/children/${id}/praise`).send({ milestoneId: 'streak:3', emoji: 'clap' });
    expect(praised.status).toBe(200);
    expect(praised.body).toEqual({ success: true });
    const summary = await child.agent.get('/api/economy/summary');
    expect(summary.body.summary.praiseNotice.text).toBe('Părintele tău te-a lăudat! 👏');
    const seen = await child.agent.post('/api/economy/praise-seen');
    expect(seen.status).toBe(200);
    const again = await parent.post(`/api/parent/children/${id}/praise`).send({ milestoneId: 'streak:3', emoji: 'heart' });
    expect(again.body).toEqual({ success: true });
    const after = await child.agent.get('/api/economy/summary');
    expect(after.body.summary.praiseNotice).toBeNull();

    const foreign = await parent.post(`/api/parent/children/${publicId(auth.findByUsername(other.username).email)}/praise`)
      .send({ milestoneId: 'streak:3', emoji: 'clap' });
    expect(foreign.status).toBe(404);
    const missing = await parent.post(`/api/parent/children/${id}/praise`).send({ milestoneId: 'streak:99', emoji: 'clap' });
    expect(missing.status).toBe(404);
    const bad = await parent.post(`/api/parent/children/${id}/praise`).send({ milestoneId: 'streak:3', emoji: 'star' });
    expect(bad.status).toBe(400);
    const quiet = await request(app).get('/api/league');
    expect(quiet.status).toBe(401);

    const grade = `h${Date.now().toString(36)}`;
    economy.getUser(account.email).preferences.className = grade;
    await child.agent.post('/api/economy/claim').send({ type: 'login_bonus' });
    const board = await child.agent.get('/api/league');
    expect(board.status).toBe(200);
    expect(board.body.joined).toBe(true);
    expect(board.body.rows.some(row => row.nickname === child.username)).toBe(true);
    expect(JSON.stringify(board.body)).not.toContain('@');
    expect(JSON.stringify(board.body)).not.toContain(account.email);
  });

  it('păstrează textele calme în ecrane', () => {
    const home = fs.readFileSync('frontend/screens/HomeScreen.jsx', 'utf8');
    const parent = fs.readFileSync('frontend/components/ConsentScreens.jsx', 'utf8');
    const leagueScreen = fs.readFileSync('frontend/screens/LeagueScreen.jsx', 'utf8');
    const route = fs.readFileSync('backend/src/routes/parent.js', 'utf8');
    const praiseBlock = route.slice(route.indexOf('children/:id/praise'), route.indexOf('children/:id/panel'));
    expect(home).toContain('Liga săptămânii');
    expect(home).toContain('La capitolul următor');
    expect(home).toContain('Am văzut');
    expect(parent).toContain('Laudă cu aplauze');
    expect(parent).toContain('Laudă cu inimă');
    expect(parent).not.toContain('Mama');
    expect(parent).not.toContain('Tata');
    expect(leagueScreen).toContain('nu sub Bronz');
    expect(praiseBlock).not.toContain('deliver');
  });
});

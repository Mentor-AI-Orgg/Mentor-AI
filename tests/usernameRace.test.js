import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import { PASSWORD, uniqueEmail, uniqueUsername } from './registerStudent.js';

const nodeRequire = createRequire(import.meta.url);
const authStore = nodeRequire('../backend/src/data/authStore.js');

function accountsNamed(username) {
  const needle = String(username || '')
    .trim()
    .toLowerCase();
  return authStore.listAccounts().filter(
    (account) =>
      String(account.profile?.username || '')
        .trim()
        .toLowerCase() === needle
  );
}

describe('createStudentAccount username reservation', () => {
  it('lets only one of two concurrent creates keep the same username', async () => {
    const username = uniqueUsername('race');
    const [first, second] = await Promise.all([
      authStore.createStudentAccount({
        username,
        password: PASSWORD,
        className: '5',
        parentEmail: uniqueEmail('parinte')
      }),
      authStore.createStudentAccount({
        username,
        password: PASSWORD,
        className: '6',
        parentEmail: uniqueEmail('parinte')
      })
    ]);

    const results = [first, second];
    expect(results.filter((result) => result.ok)).toHaveLength(1);
    expect(
      results.filter((result) => !result.ok && result.reason === 'username_taken')
    ).toHaveLength(1);
    const stored = accountsNamed(username);
    expect(stored).toHaveLength(1);
    expect(stored[0].profile.username).toBe(username);
  });

  it('releases the username when hashing fails', async () => {
    const username = uniqueUsername('race');
    const password = {
      toString() {
        throw new Error('hash failed');
      }
    };

    await expect(
      authStore.createStudentAccount({
        username,
        password,
        className: '5',
        parentEmail: uniqueEmail('parinte')
      })
    ).rejects.toThrow(/hash failed/);
    expect(accountsNamed(username)).toHaveLength(0);

    const created = await authStore.createStudentAccount({
      username,
      password: PASSWORD,
      className: '5',
      parentEmail: uniqueEmail('parinte')
    });
    expect(created.ok).toBe(true);
    expect(created.account.profile.username).toBe(username);
    expect(accountsNamed(username)).toHaveLength(1);
  });
});

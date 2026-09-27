import request from 'supertest';

const PASSWORD = 'Testpass1!';
let sequence = 0;

function uniqueEmail(prefix) {
  return `${prefix}.${Date.now()}.${Math.random().toString(16).slice(2)}@example.com`;
}

function uniqueUsername(prefix = 'e') {
  sequence += 1;
  return `${prefix}${sequence}${Math.random().toString(16).slice(2, 6)}`.slice(0, 20);
}

async function registerPending(app, overrides = {}) {
  const username = overrides.username || uniqueUsername();
  const parentEmail = overrides.parentEmail || uniqueEmail('parinte');
  const password = overrides.password || PASSWORD;
  const agent = overrides.agent || request.agent(app);
  const logs = [];
  const original = console.log;
  console.log = (...args) => {
    logs.push(args.map(item => String(item)).join(' '));
  };
  let res;
  try {
    res = await agent.post('/api/auth/register').send({
      username,
      password,
      confirmPassword: overrides.confirmPassword || password,
      class: String(overrides.class || '5'),
      parentEmail,
      role: overrides.role || 'student',
      name: overrides.name || '',
      phone: overrides.phone || '',
      email: overrides.email || '',
      school: overrides.school || ''
    });
  } finally {
    console.log = original;
  }
  const token = (logs.join('\n').match(/#\/acord\/([a-f0-9]+)/) || [])[1] || '';
  return { agent, res, username, parentEmail, password, token, logs };
}

async function registerGranted(app, overrides = {}) {
  const pending = await registerPending(app, overrides);
  if (pending.res.status !== 201 || !pending.token) return pending;
  const confirm = await request(app).post('/api/auth/consent').send({
    token: pending.token,
    action: 'grant'
  });
  return { ...pending, confirm };
}

export { PASSWORD, uniqueEmail, uniqueUsername, registerPending, registerGranted };

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

process.env.NODE_ENV = 'test';
process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'mentor-ai-test-'));
process.env.TEACHER_INVITE_CODE = 'test-invite';
process.env.PORT = '0';
process.env.STAGING_AUTH_USER = '';
process.env.STAGING_AUTH_PASSWORD = '';

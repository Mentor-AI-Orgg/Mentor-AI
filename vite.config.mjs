import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { manualChunk } from './manualChunks.mjs';
import { buildStamp } from './buildStamp.mjs';

const repoRoot = path.dirname(fileURLToPath(import.meta.url));
const BUILD_ID = buildStamp();

function writeBuildId() {
  return {
    name: 'write-build-id',
    apply: 'build',
    closeBundle() {
      const dir = path.join(repoRoot, 'frontend', 'dist');
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'build-id.json'), JSON.stringify({ build: BUILD_ID }));
    }
  };
}

function sharedPasswordList() {
  return {
    name: 'shared-password-list',
    transform(code, id) {
      if (!id.endsWith('commonPasswords.js')) return null;
      if (!code.includes('module.exports')) return null;
      return {
        code: code.replace(
          'module.exports = { isCommonPassword, commonPasswordCount };',
          'export { isCommonPassword, commonPasswordCount };'
        ),
        map: null
      };
    }
  };
}

function sentryScrubForDev() {
  return {
    name: 'sentry-scrub-dev',
    apply: 'serve',
    transform(code, id) {
      if (!id.includes('sentryScrub.cjs')) return null;
      return {
        code: `const module = { exports: {} };\n${code}\nexport default module.exports;\n`,
        map: null
      };
    }
  };
}

export default defineConfig({
  root: 'frontend',
  define: {
    'import.meta.env.VITE_BUILD_ID': JSON.stringify(BUILD_ID)
  },
  plugins: [react(), sharedPasswordList(), sentryScrubForDev(), writeBuildId()],
  publicDir: 'public',
  resolve: {
    alias: {
      '@shared': path.join(repoRoot, 'shared')
    },
    dedupe: ['react', 'react-dom']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    // Fără modulepreload: webview-ul din Facebook poate evalua chunk-ul React de două ori.
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks: manualChunk
      }
    },
    commonjsOptions: {
      include: [/shared\//, /node_modules/]
    }
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    fs: {
      allow: [repoRoot]
    },
    proxy: {
      '/api/': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/privacy.html': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/terms.html': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/confidentialitate': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/termeni': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});

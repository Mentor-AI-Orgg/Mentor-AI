import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

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
  plugins: [react(), sentryScrubForDev()],
  publicDir: 'public',
  resolve: {
    alias: {
      '@shared': path.join(repoRoot, 'shared')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
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
      }
    }
  }
});

module.exports = {
  root: true,
  ignorePatterns: ['frontend/dist/**', 'node_modules/**', 'coverage/**', 'data/**'],
  env: {
    es2021: true
  },
  overrides: [
    {
      files: ['backend/**/*.js'],
      env: { node: true },
      extends: ['eslint:recommended'],
      parserOptions: { ecmaVersion: 2021 },
      rules: {
        'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
      }
    },
    {
      files: ['tests/**/*.js'],
      env: { node: true },
      extends: ['eslint:recommended'],
      parserOptions: { ecmaVersion: 2021, sourceType: 'module' },
      rules: {
        'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
      }
    },
    {
      files: ['frontend/**/*.{js,jsx}'],
      env: { browser: true },
      extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
      parserOptions: { ecmaVersion: 2021, sourceType: 'module', ecmaFeatures: { jsx: true } },
      plugins: ['react', 'react-hooks'],
      settings: { react: { version: 'detect' } },
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react-hooks/exhaustive-deps': 'warn',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
      }
    }
  ]
};

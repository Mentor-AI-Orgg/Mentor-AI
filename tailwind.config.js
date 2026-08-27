/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./frontend/index.html', './frontend/**/*.{js,jsx}'],
  corePlugins: { preflight: false },
  theme: { extend: {} }
};

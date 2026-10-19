import { defineConfig } from 'vite';

// Relative assets work on GitHub Pages' /turkish-quiz-app/ project path.
export default defineConfig({ base: './', define: { __GRAMMAR_PREVIEW__: JSON.stringify(process.env.NODE_ENV !== 'production' || process.env.VITE_GRAMMAR_PREVIEW === 'true') } });

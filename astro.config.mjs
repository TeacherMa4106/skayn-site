import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://skayn.net',
  output: 'static',
  build: {
    format: 'directory',
    assetsPrefix: './',
  },
});

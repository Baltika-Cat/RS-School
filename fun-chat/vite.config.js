// vite.config.js
import { defineConfig } from 'vite';
// import eslint from 'vite-config-eslint'

export default defineConfig({
  publicDir: 'public',
  root: './',
  build: {
    ourDir: 'dist',
  },
  base: 'baltika-cat-JSFE2023Q4/fun-chat/',
})
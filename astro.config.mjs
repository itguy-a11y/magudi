import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://makudi.in',
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});

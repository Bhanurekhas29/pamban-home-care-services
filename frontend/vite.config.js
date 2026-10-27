import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  // the admin app lives in ./admin with its own index.html; keep it out of this site's dependency scan
  optimizeDeps: { entries: ['index.html'] },
  build: { rollupOptions: { input: 'index.html' } },
});

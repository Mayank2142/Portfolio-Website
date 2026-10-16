import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
export default defineConfig({
  base: process.env.SITE_BASE_PATH ? `${process.env.SITE_BASE_PATH}/` : '/',
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: { port: 5173, strictPort: true, proxy: { '/api': 'http://127.0.0.1:3001' } },
});

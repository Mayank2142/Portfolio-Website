import { defineConfig } from 'tsup';
export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],
  target: 'es2022',
  outDir: 'dist',
  sourcemap: true,
  noExternal: ['@portfolio/core'],
  removeNodeProtocol: false,
  clean: true,
});

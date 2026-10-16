import { spawnSync } from 'node:child_process';
import { cp, copyFile, readdir, realpath, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const compiled = path.join(repository, 'apps', 'web', 'build', 'client');
const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const build = spawnSync(command, ['run', 'build', '-w', '@portfolio/web'], {
  cwd: repository,
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: {
    ...process.env,
    SITE_BASE_PATH: '/Portfolio-Website',
    VITE_STATIC_CONTACT: 'email',
  },
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status || 1);

// Pages currently publishes this repository's root. Copy only the generated
// client files; all source directories and the full Express app stay intact.
for (const entry of await readdir(compiled)) {
  if (entry === '.vite') continue;
  if (entry === 'Portfolio-Website') {
    for (const page of await readdir(path.join(compiled, entry))) {
      await cp(path.join(compiled, entry, page), path.join(repository, page), {
        recursive: true,
        force: true,
      });
    }
  } else {
    await cp(path.join(compiled, entry), path.join(repository, entry), {
      recursive: true,
      force: true,
    });
  }
}
await copyFile(path.join(compiled, '__spa-fallback.html'), path.join(repository, '404.html'));
const caseSlugs = (await readdir(path.join(repository, 'projects'), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
const baseUrl = 'https://mayank2142.github.io/Portfolio-Website';
const paths = ['/', '/projects/', ...caseSlugs.map((slug) => `/projects/${slug}/`)];
await writeFile(path.join(repository, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((route) => `<url><loc>${baseUrl}${route}</loc></url>`).join('')}</urlset>`);
// A previous build placed the basename directory here. Remove only that
// generated child after resolving it within this checkout.
const misplaced = path.join(repository, 'Portfolio-Website');
try {
  const resolved = await realpath(misplaced);
  if (resolved !== path.join(repository, 'Portfolio-Website')) {
    throw new Error('Refusing to remove a generated path outside the checkout.');
  }
  await rm(resolved, { recursive: true });
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
await writeFile(path.join(repository, '.nojekyll'), '');
console.log('GitHub Pages files are ready at the repository root.');

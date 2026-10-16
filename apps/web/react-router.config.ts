import type { Config } from '@react-router/dev/config';
import { projects } from '../../packages/core/src/index';
export default {
  ssr: false,
  basename: process.env.SITE_BASE_PATH || '/',
  prerender: ['/', '/projects', ...projects.map((p) => `/projects/${p.slug}`)],
} satisfies Config;

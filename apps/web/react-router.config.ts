import type { Config } from '@react-router/dev/config';
import { projects } from '../../packages/core/src/index';
export default {
  ssr: false,
  prerender: ['/', '/projects', ...projects.map((p) => `/projects/${p.slug}`)],
} satisfies Config;

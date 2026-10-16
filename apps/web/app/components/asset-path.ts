/** Prefix public files when the same React build is hosted below a subpath. */
export function assetPath(path: string) {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
}

import { cp, rm } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await cp('_site', 'dist', { recursive: true });
console.log('Static Sites output prepared in dist/');

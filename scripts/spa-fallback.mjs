// GitHub Pages has no server-side routing, so a direct visit to /about would normally be
// answered with HTTP 404 (the 404.html fallback). To get a proper 200 for every page we
// write a real index.html into dist/<page>/ (same app shell, correct <title>), and keep
// 404.html for unknown addresses.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { TITLES } from '../src/routeMeta.js';

const shell = readFileSync('dist/index.html', 'utf8');
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');

for (const [route, title] of Object.entries(TITLES)) {
  if (route === '/') continue;
  const html = shell.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  mkdirSync(`dist${route}`, { recursive: true });
  writeFileSync(`dist${route}/index.html`, html);
}

copyFileSync('dist/index.html', 'dist/404.html');
console.log(`✓ ${Object.keys(TITLES).length - 1} page files + 404.html written to dist/`);

// GitHub Pages has no server-side routing. Copy index.html to 404.html so
// direct visits to /about, /services, /work and /contact load the app.
import { copyFileSync } from 'node:fs';

copyFileSync('dist/index.html', 'dist/404.html');
console.log('✓ dist/404.html created (SPA fallback for direct page URLs)');

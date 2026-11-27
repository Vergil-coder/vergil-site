import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

// Client bundle and a temporary build-time React renderer. Only dist/ is published.
await build();
await build({
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: '.build/prerender',
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } },
  },
});
const { render } = await import(pathToFileURL(resolve('.build/prerender/entry-server.mjs')));
const indexPath = resolve('dist/index.html');
const html = await readFile(indexPath, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error('Root marker missing; static export was not written.');
const rendered = render();
if (!rendered.includes('粤ICP备2024281609号-2')) {
  throw new Error('Website ICP missing from rendered HTML.');
}
await writeFile(indexPath, html.replace(marker, `<div id="root">${rendered}</div>`));
console.log('Static HTML written: profile, projects and ICP are available before JavaScript.');

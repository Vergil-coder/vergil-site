import { execFileSync } from 'node:child_process';
import { cp, lstat, mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const git = (args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
if (git(['branch', '--show-current']) !== 'main') {
  throw new Error('Publish from the main source branch.');
}
if (git(['status', '--porcelain'])) {
  throw new Error('Commit and push source changes before publishing.');
}
git(['fetch', 'origin']);
const source = git(['rev-parse', 'HEAD']);
if (git(['rev-parse', 'refs/remotes/origin/main']) !== source) {
  throw new Error('Push main to origin before publishing.');
}
const html = await readFile(join(root, 'dist/index.html'), 'utf8');
if (!html.includes('粤ICP备2024281609号-2')) {
  throw new Error('Build does not contain the website ICP footer.');
}
// Ensure generated HTML references files that will actually be deployed.
for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
  if (match[1].startsWith('//')) continue;
  const path = resolve(root, 'dist', `.${decodeURIComponent(match[1])}`);
  if (!path.startsWith(`${resolve(root, 'dist')}/`)) throw new Error('Invalid asset path.');
  await lstat(path);
}

const previous = git(['for-each-ref', '--format=%(objectname)', 'refs/remotes/origin/site']);
const temp = await mkdtemp(join(tmpdir(), 'vergil-site-'));
try {
  const site = join(temp, 'site');
  await cp(join(root, 'dist'), site, {
    recursive: true,
    filter: (path) => !basename(path).startsWith('._') && basename(path) !== '.DS_Store',
  });
  async function inspect(dir) {
    for (const name of await readdir(dir)) {
      const path = join(dir, name);
      const info = await lstat(path);
      if (info.isSymbolicLink() || name === '.git' || name === '.env' || name.startsWith('.env.')) {
        throw new Error(`Unexpected file in static output: ${name}`);
      }
      if (info.isDirectory()) await inspect(path);
    }
  }
  await inspect(site);
  const gitDir = git(['rev-parse', '--absolute-git-dir']);
  const stage = (args) => execFileSync('git', [
    '--git-dir', gitDir, '--work-tree', site, ...args,
  ], {
    cwd: site,
    env: { ...process.env, GIT_INDEX_FILE: join(temp, 'index') },
    encoding: 'utf8',
  }).trim();
  stage(['read-tree', '--empty']);
  stage(['add', '--all', '--', '.']);
  // The external drive may mark every file executable; web assets need no executable bit.
  const paths = stage(['ls-files', '-z']).split('\0').filter(Boolean);
  stage(['update-index', '--chmod=-x', '--', ...paths]);
  const tree = stage(['write-tree']);
  if (previous && git(['rev-parse', `${previous}^{tree}`]) === tree) {
    console.log('Static output is unchanged; site already up to date.');
  } else {
    const commit = git(['commit-tree', tree, ...(previous ? ['-p', previous] : []),
      '-m', `Publish static site from ${source.slice(0, 12)}`]);
    // A normal push rejects concurrent updates; never overwrite another deployment.
    git(['push', 'origin', `${commit}:refs/heads/site`]);
    console.log(`Published site ${commit.slice(0, 12)} from source ${source.slice(0, 12)}.`);
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}

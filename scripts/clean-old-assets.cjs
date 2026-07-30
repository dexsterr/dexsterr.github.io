const fs = require('fs');
const path = require('path');

const root = process.cwd();
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const assetsDir = path.join(root, 'assets');

const referenced = new Set();
for (const match of indexHtml.matchAll(/(?:src|href)="([^"]+)"/g)) {
  referenced.add(match[1].replace(/^\//, ''));
}

if (!fs.existsSync(assetsDir)) {
  process.exit(0);
}

for (const file of fs.readdirSync(assetsDir)) {
  if (!/^index-[A-Za-z0-9_-]+\.(js|css)$/.test(file)) continue;
  const relative = path.posix.join('assets', file);
  if (!referenced.has(relative)) {
    fs.unlinkSync(path.join(assetsDir, file));
    console.log('Removed stale asset:', relative);
  }
}

const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

if (html.includes('/src/main.tsx')) {
  console.error('ERROR: index.html still points to /src/main.tsx (dev template).');
  console.error('Run: npm run build');
  process.exit(1);
}

if (!html.includes('/assets/index-') && !html.includes('./assets/index-')) {
  console.error('ERROR: index.html has no built JS bundle reference.');
  console.error('Run: npm run build');
  process.exit(1);
}

console.log('OK: index.html is production-ready.');

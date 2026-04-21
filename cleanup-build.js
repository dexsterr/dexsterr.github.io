const fs = require('fs');
const path = require('path');
const root = process.cwd();
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const jsMatch = html.match(/src="\.\/assets\/(index-[^\"]+\.js)"/);
const cssMatch = html.match(/href="\.\/assets\/(index-[^\"]+\.css)"/);
const keepJs = jsMatch ? jsMatch[1] : null;
const keepCss = cssMatch ? cssMatch[1] : null;
console.log('Keeping JS:', keepJs);
console.log('Keeping CSS:', keepCss);
fs.readdirSync(path.join(root, 'assets')).forEach((file) => {
  if (/^index-.*\.js$/.test(file)) {
    if (file !== keepJs) {
      fs.unlinkSync(path.join(root, 'assets', file));
      console.log('Removed', file);
    }
  }
  if (/^index-.*\.css$/.test(file)) {
    if (file !== keepCss) {
      fs.unlinkSync(path.join(root, 'assets', file));
      console.log('Removed', file);
    }
  }
});
const distPath = path.join(root, 'dist');
if (fs.existsSync(distPath)) {
  const rimraf = (p) => {
    fs.readdirSync(p).forEach((entry) => {
      const full = path.join(p, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) rimraf(full);
      else fs.unlinkSync(full);
    });
    fs.rmdirSync(p);
  };
  rimraf(distPath);
  console.log('Removed dist folder');
}

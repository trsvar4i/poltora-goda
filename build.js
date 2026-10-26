// Собирает index.html из src.html (src.html — фрагмент без <html>/<head>/<body>, как для Claude Artifact)
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'src.html'), 'utf8');
const cut = src.indexOf('</style>') + '</style>'.length;
const head = src.slice(0, cut).replace(/<meta name="claude:[^>]*>\s*/, '');
const body = src.slice(cut);
const html = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#c1121f">
<meta name="description" content="Полтора года вместе. 26.04.2025 — 26.10.2026">
<meta property="og:title" content="Полтора года вместе">
<meta property="og:description" content="18 месяцев, 548 дней и много-много 26-х">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23c1121f' d='M12 21s-7.5-4.6-10-9.3C.3 8.3 2.2 4 6.2 4c2.3 0 3.8 1.3 5.8 3.5C14 5.3 15.5 4 17.8 4c4 0 5.9 4.3 4.2 7.7C19.5 16.4 12 21 12 21z'/%3E%3C/svg%3E">
${head}
</head>
<body>
${body.trim()}
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log('index.html собран');

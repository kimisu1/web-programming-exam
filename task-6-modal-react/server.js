import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = process.env.PORT || 3006;
const DIST_DIR = path.join(import.meta.dirname, 'dist');

// Типи файлів, які створює збирання Vite
const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
};

if (!fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
  console.error('Клієнтську частину ще не зібрано. Виконайте: npm run build');
  process.exit(1);
}

function send(res, status, type, body) {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  const filePath = path.join(DIST_DIR, pathname === '/' ? 'index.html' : pathname);
  const contentType = CONTENT_TYPES[path.extname(filePath)];

  // Віддаємо лише файли відомих типів і лише з каталогу dist
  if (!contentType || !filePath.startsWith(DIST_DIR + path.sep)) {
    send(res, 404, 'text/plain; charset=utf-8', 'Сторінку не знайдено');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404, 'text/plain; charset=utf-8', 'Сторінку не знайдено');
      return;
    }
    send(res, 200, contentType, data);
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
});

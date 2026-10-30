import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = process.env.PORT || 3004;
const PUBLIC_DIR = path.join(import.meta.dirname, 'public');

// Файли клієнтської частини, які віддає сервер
const ROUTES = {
  '/': { file: 'index.html', type: 'text/html; charset=utf-8' },
  '/style.css': { file: 'style.css', type: 'text/css; charset=utf-8' },
  '/script.js': { file: 'script.js', type: 'text/javascript; charset=utf-8' },
};

function send(res, status, type, body) {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  const route = ROUTES[pathname];

  if (!route) {
    send(res, 404, 'text/plain; charset=utf-8', 'Сторінку не знайдено');
    return;
  }

  fs.readFile(path.join(PUBLIC_DIR, route.file), (err, data) => {
    if (err) {
      send(res, 500, 'text/plain; charset=utf-8', 'Помилка сервера');
      return;
    }
    send(res, 200, route.type, data);
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
});

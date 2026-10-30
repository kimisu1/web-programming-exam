import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = process.env.PORT || 3008;
const CLIENT_SCRIPT = path.join(import.meta.dirname, 'public', 'app.js');

// Браузеру потрібен HTML-документ, щоб завантажити скрипт, тому сервер віддає
// мінімальну оболонку. Усі елементи сторінки та їхні стилі створює public/app.js.
const PAGE = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="data:,">
  <script src="/app.js" defer></script>
</head>
<body></body>
</html>`;

function send(res, status, type, body) {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
}

const server = http.createServer((req, res) => {
  // Шлях запиту без параметрів після «?»
  const pathname = req.url.split('?')[0];

  if (pathname === '/') {
    send(res, 200, 'text/html; charset=utf-8', PAGE);
    return;
  }

  if (pathname === '/app.js') {
    fs.readFile(CLIENT_SCRIPT, (err, data) => {
      if (err) {
        send(res, 500, 'text/plain; charset=utf-8', 'Помилка сервера');
        return;
      }
      send(res, 200, 'text/javascript; charset=utf-8', data);
    });
    return;
  }

  send(res, 404, 'text/plain; charset=utf-8', 'Сторінку не знайдено');
});

server.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
});

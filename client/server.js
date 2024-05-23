// server.ts

var https = require('https');
var fs = require('fs');
const { parse } = require('url');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "/etc/letsencrypt/live/www.codice.dev/privkey.pem")),
  cert: fs.readFileSync(path.join(__dirname, "/etc/letsencrypt/live/www.codice.dev/fullchain.pem")),
};

app.prepare().then(() => {
  https(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(4000, err => {
    if (err) throw err;
    console.log('> Ready on https://localhost:4000');
  });
});
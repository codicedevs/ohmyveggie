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
  key: fs.readFileSync(path.join("/etc/letsencrypt/live/omvrosario.com/privkey.pem")),
  cert: fs.readFileSync(path.join("/etc/letsencrypt/live/omvrosario.com/fullchain.pem")),
};

app.prepare().then(() => {
  https.createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on PORT: 3000');
  });
});
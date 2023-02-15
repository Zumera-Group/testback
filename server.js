/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const next = require('next');
const express = require('express');
const sslRedirect = require('heroku-ssl-redirect').default; // to make it work with 'require' keyword.

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PRODUCTION_HEROKU_HOST = 'saxenhammer-frontend-prod.herokuapp.com';

app.prepare().then(() => {
  const server = express();

  // Express's middleware to automatically redirect to 'https'.
  server.use(sslRedirect());

  server.all('*', (req, res) => {
    const host = req.header('host');
    if (host === PRODUCTION_HEROKU_HOST) {
      return res.redirect(301, process.env.NEXT_PUBLIC_BASE_URL + req.url);
    }
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;

    console.log(`Server starts on ${PORT}.`);
  });
});

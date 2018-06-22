const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const setupApiRoutes = require('./middlewares/api');
const logger = require('./logger');
const {envConfig, httpsConst} = require('./../../config/application.config');
const proxy = require('http-proxy-middleware');

function onUnhandledError(err) {
  try {
    logger.error(err);
  } catch (e) {
    console.log('LOGGER ERROR:', e); //eslint-disable-line no-console
    console.log('APPLICATION ERROR:', err); //eslint-disable-line no-console
  }
  process.exit(1);
}

function invalidReqHandling(err, req, res, next) {
  const ipaddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.error(`IP: ${ipaddr} -- ${err.message}`);
  res.status(500).send('500');
}

function approveDomains(opts, certs, cb) {
  if (certs) {
    //opts.domains = httpsConst.hostNameArray;
    opts.domains = certs.altnames;
  } else {
    opts.email = httpsConst.emailUser;
    opts.agreeTos = true;
  }
  cb(null, {options: opts, certs});
}

process.on('unhandledRejection', onUnhandledError);
process.on('uncaughtException', onUnhandledError);

const setupAppRoutes =
  envConfig.nodeEnv === 'development' ? require('./middlewares/development') : require('./middlewares/production');

const app = express();

app.set('env', process.env.NODE_ENV);
logger.info(`Application env: ${process.env.NODE_ENV}`);

app.use('/instaclip', proxy({target: 'https://api.instclip.com', changeOrigin: true, xfwd: true}));
app.use(logger.expressMiddleware);
app.use(bodyParser.json());
app.use(invalidReqHandling);

// application routes
setupApiRoutes(app);
setupAppRoutes(app);

let https_options;
let lex;
//Get SSL required certificates
if (envConfig.nodeEnv === 'production') {
  lex = require('greenlock-express').create({
    version: 'draft-11',
    // You MUST change 'acme-staging-v02' to 'acme-v02' in production
    server: 'https://acme-v02.api.letsencrypt.org/directory',
    challenges: {'http-01': require('le-challenge-fs').create({webrootPath: '/tmp/acme-challenges'})},
    store: require('le-store-certbot').create({webrootPath: '/tmp/acme-challenges'}),
    approveDomains
  });

  http.createServer(lex.middleware(require('redirect-https')())).listen(envConfig.httpPort, () => {
    logger.info(`HTTP server is now running on port: ${envConfig.httpPort}`);
  });

  https.createServer(lex.httpsOptions, lex.middleware(app)).listen(envConfig.httpsPort, () => {
    logger.info(`HTTPS server is now running on port: ${envConfig.httpsPort}`);
  });
} else {
  https_options = {
    key: fs.readFileSync('./.ssl/private.key'),
    cert: fs.readFileSync('./.ssl/certificate.pem')
  };

  http.createServer(app).listen(envConfig.httpPort, () => {
    logger.info(`HTTP server is now running on port: ${envConfig.httpPort}`);
  });

  https.createServer(https_options, app).listen(envConfig.httpsPort, () => {
    logger.info(`HTTPS server is now running on port: ${envConfig.httpsPort}`);
  });
}

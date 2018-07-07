const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const setupApiRoutes = require('./middlewares/api');
const logger = require('./logger');
const session = require('express-session');
const {envConfig} = require('./../../config/application.config');
const proxy = require('http-proxy-middleware');
const ws = require('ws');
const {wsConn} = require('./middlewares/ws.js');

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
app.use(session({secret: 'recommand 128 bytes random string'}));

// application routes
setupApiRoutes(app);
setupAppRoutes(app);

const server = http.createServer(app);

const WebSocketServer = ws.Server;

const wss = new WebSocketServer({server});

process.wsMap = {};

wsConn(wss);

server.listen(envConfig.httpPort, () => {
  logger.info(`HTTP server is now running on port: ${envConfig.httpPort}`);
});

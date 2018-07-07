const uuid = require('node-uuid');
const TYPE_RELA = 'rela';
const TYPE_PROCESS = 'process';
const FreedomApi = require('../tools/freedom-api');

function buildMsg(type, data) {
  return JSON.stringify({
    type,
    data
  });
}

function receiveMsg(data) {
  try {
    data = JSON.parse(data);
    if (data.type === TYPE_PROCESS) {
      const freedomApi = new FreedomApi({
        rela: data.rela,
        processes: data.data
      });
      freedomApi.start();
    }
  } catch (e) {
    console.log(e);
  }
}

function wsConn(wss) {
  const wsMap = process.wsMap;
  wss.on('connection', function(ws) {
    // build rela key
    const relaKey = uuid.v1();
    // send rela key
    ws.send(buildMsg(TYPE_RELA, {rela: relaKey}));
    // listen
    ws.on('message', function(data) {
      receiveMsg(data);
    });
    // on close
    ws.on('close', function() {
      delete wsMap[ws._relaKey];
    });
    // save client
    wsMap[relaKey] = ws;
    ws._relaKey = relaKey;
  });
}

module.exports = {
  wsConn
};

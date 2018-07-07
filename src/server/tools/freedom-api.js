const fApi = require('freedom-api');
const TYPE_RESULT = 'result';
const TYPE_BEFORE_REQUEST = 'breq';
const TYPE_AFTER_REQUEST = 'areq';

function buildMsg(type, data) {
  return JSON.stringify({
    type,
    data
  });
}

class FreedomApi {
  constructor({processes, rela}) {
    this.processes = processes;
    this.rela = rela;
    this.client = process.wsMap[this.rela];
  }

  beforeRequestPlugin(processRule) {
    processRule.hooks.beforeRequest.tapPromise('beforeRequest', (options) => {
      this.client.send(buildMsg(TYPE_BEFORE_REQUEST, options));
      return new Promise((resolve) => {
        resolve(options);
      });
    });
  }

  afterRequestPlugin(processRule) {
    processRule.hooks.afterRequest.tapPromise('afterRequest', (data) => {
      this.client.send(buildMsg(TYPE_AFTER_REQUEST, data));
      return new Promise((resolve) => {
        resolve(data);
      });
    });
  }

  start() {
    const client = this.client;
    fApi({
      processes: this.processes,
      plugins: [this.beforeRequestPlugin.bind(this), this.afterRequestPlugin.bind(this)],
      callback: function(data) {
        client.send(buildMsg(TYPE_RESULT, data));
      }
    });
  }
}

module.exports = FreedomApi;

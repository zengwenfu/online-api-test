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

  afterDueOptionPlugin(processRule) {
    processRule.hooks.afterDueOption.tapPromise('afterDueOption', (reqOptions, options) => {
      this.client.send(buildMsg(TYPE_BEFORE_REQUEST, {options: reqOptions, index: options.index}));
      return new Promise((resolve) => {
        resolve(reqOptions);
      });
    });
  }

  afterRequestPlugin(processRule) {
    processRule.hooks.afterRequest.tapPromise('afterRequest', (data, options) => {
      this.client.send(buildMsg(TYPE_AFTER_REQUEST, {data, index: options.index}));
      return new Promise((resolve) => {
        resolve(data);
      });
    });
  }

  start() {
    const client = this.client;
    fApi({
      processes: this.processes,
      plugins: [this.afterDueOptionPlugin.bind(this), this.afterRequestPlugin.bind(this)],
      callback: function(data) {
        client.send(buildMsg(TYPE_RESULT, data));
      }
    });
  }
}

module.exports = FreedomApi;

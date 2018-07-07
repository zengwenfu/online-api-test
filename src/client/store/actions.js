const types = require('./action-types.js');

function setGlobal(data) {
  return {
    type: types.SET_GLOBAL,
    data
  };
}

function setProcessParam(data) {
  return {
    type: types.SET_PROCESS_PARAM,
    data
  };
}

function deleteProcessParam(data) {
  return {
    type: types.DELETE_PROCESS_PARAM,
    data
  };
}

function setProcessUrl(data) {
  return {
    type: types.SET_PROCESS_URL,
    data
  };
}

function setProcessMethod(data) {
  return {
    type: types.SET_PROCESS_METHOD,
    data
  };
}

function setProcessParamJson(data) {
  return {
    type: types.SET_PROCESS_PARAM_JSON,
    data
  };
}

function addProcess(data) {
  return {
    type: types.ADD_PROCESS,
    data
  };
}

function setCurrentProcess(num) {
  return {
    type: types.SET_CURRENT_PROCESS,
    num
  };
}

function addRow() {
  return {
    type: types.ADD_ROW
  };
}

function deleteProcess() {
  return {
    type: types.DELETE_PROCESS
  };
}

function setFormatType(type) {
  return {
    type: types.SET_FORMAT_TYPE,
    formatType: type
  };
}

function setName(name) {
  return {
    type: types.SET_NAME,
    name
  };
}

function setDemoData() {
  return {
    type: types.SET_DEMO_DATA
  };
}

function setRequestOptions(data) {
  return {
    type: types.SET_REQUEST_OPTIONS,
    data
  };
}

function setRequestResult(data) {
  return {
    type: types.SET_REQUEST_RESULT,
    data
  };
}

module.exports = {
  setGlobal,
  setProcessParam,
  deleteProcessParam,
  setProcessUrl,
  setProcessMethod,
  setProcessParamJson,
  addProcess,
  setCurrentProcess,
  addRow,
  deleteProcess,
  setFormatType,
  setName,
  setDemoData,
  setRequestOptions,
  setRequestResult
};

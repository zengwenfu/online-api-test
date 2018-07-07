const types = require('./action-types.js');
const combineReducers = require('redux').combineReducers;
const {PROCESS_TYPE_SERIAL, PROCESS_FORMAT_URLENCODE} = require('../utils/constants');

/**
 *
 * @param {*} state
 * @param {*} actionData
 *  num: processNum
 *  row: param row
 *  type: 'key' or value
 */
function _setProcessParam(state, {row, type, value}) {
  const result = state.processes.slice();
  const process = result[state.currentProcess];
  process.params[row][type] = value;
  return result;
}

function _deleteProcessParam(state, {row}) {
  const result = state.processes.slice();
  const process = result[state.currentProcess];
  if (process.params.length === 1) {
    process.params = [{key: '', value: ''}];
  } else {
    process.params.splice(row, 1);
  }
  return result;
}

function _setProcessUrl(state, {url}) {
  const result = state.processes.slice();
  const process = result[state.currentProcess];
  process.url = url;
  return result;
}

function _setName(state, name) {
  const result = state.processes.slice();
  const process = result[state.currentProcess];
  process.name = name;
  return result;
}

function _setProcessMethod(state, {method}) {
  const result = state.processes.slice();
  const process = result[state.currentProcess];
  process.method = method;
  return result;
}

function _setFormatType(state, formatType) {
  const result = state.processes.slice();
  const process = result[state.currentProcess];
  process.formatType = formatType;
  return result;
}

function _setProcessParamJson(state, {json}) {
  const result = state.processes.slice();
  const process = result[state.currentProcess];
  process.json = json;
  return json;
}

function _addRow(state) {
  const result = state.processes.slice();
  const process = result[state.currentProcess];
  process.params.push({key: '', value: ''});
  return result;
}

function _addProcess(state, {type}) {
  const processes = state.processes.slice();
  const initProcess = {params: [{key: '', value: ''}], type, formatType: PROCESS_FORMAT_URLENCODE};
  processes.splice(state.currentProcess + 1, 0, initProcess);
  return {
    processes,
    currentProcess: state.currentProcess + 1
  };
}

function _deleteProcess(state) {
  const processes = state.processes.slice();
  let currentProcess = 0;
  if (state.processes.length > 1) {
    // 删除的是并行接口的头一个，重置下一个的type
    if (state.currentProcess === 0 || processes[state.currentProcess - 1].type === PROCESS_TYPE_SERIAL) {
      if (state.currentProcess + 1 < state.processes.length) {
        processes[state.currentProcess + 1].type = PROCESS_TYPE_SERIAL;
      }
    }
    processes.splice(state.currentProcess, 1);
    currentProcess = state.currentProcess - 1 >= 0 ? state.currentProcess - 1 : 0;
  } else {
    processes[0] = {
      params: [
        {
          key: '',
          value: ''
        }
      ],
      type: PROCESS_TYPE_SERIAL,
      formatType: PROCESS_FORMAT_URLENCODE
    };
  }
  return {
    processes,
    currentProcess
  };
}

const _state = {
  processes: [
    {
      params: [
        {
          key: '',
          value: ''
        }
      ],
      type: PROCESS_TYPE_SERIAL,
      formatType: PROCESS_FORMAT_URLENCODE
    }
  ],
  currentProcess: 0
};

function processData(state = _state, action) {
  switch (action.type) {
    case types.SET_GLOBAL:
      return Object.assign({}, state, action.data);
    case types.SET_PROCESS_PARAM:
      return Object.assign({}, state, {
        processes: _setProcessParam(state, action.data)
      });
    case types.DELETE_PROCESS_PARAM:
      return Object.assign({}, state, {
        processes: _deleteProcessParam(state, action.data)
      });
    case types.SET_PROCESS_URL:
      return Object.assign({}, state, {
        processes: _setProcessUrl(state, action.data)
      });
    case types.SET_PROCESS_METHOD:
      return Object.assign({}, state, {
        processes: _setProcessMethod(state, action.data)
      });
    case types.SET_PROCESS_PARAM_JSON:
      return Object.assign({}, state, {
        processes: _setProcessParamJson(state, action.data)
      });
    case types.ADD_PROCESS:
      const obj = _addProcess(state, action.data);
      return Object.assign({}, state, {
        processes: obj.processes,
        currentProcess: obj.currentProcess
      });
    case types.SET_CURRENT_PROCESS:
      return Object.assign({}, state, {
        currentProcess: action.num
      });
    case types.ADD_ROW:
      return Object.assign({}, state, {
        processes: _addRow(state)
      });
    case types.DELETE_PROCESS:
      return Object.assign({}, state, {
        ..._deleteProcess(state)
      });
    case types.SET_FORMAT_TYPE:
      return Object.assign({}, state, {
        ..._setFormatType(state, action.formatType)
      });
    case types.SET_NAME:
      return Object.assign({}, state, {
        ..._setName(state, action.name)
      });
    default:
      return state;
  }
}

module.exports = combineReducers({
  processData
});

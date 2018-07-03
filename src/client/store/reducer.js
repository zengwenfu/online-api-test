const types = require('./action-types.js');
const combineReducers = require('redux').combineReducers;
const TYPE_SYNC = 1;

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

function _setProcessMethod(state, {method}) {
  const result = state.processes.slice();
  const process = result[state.currentProcess];
  process.method = method;
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
  const nums = state.nums.slice();
  processes.push({params: [{key: '', value: ''}]});
  if (type === TYPE_SYNC) {
    const current = nums[nums.length - 1];
    if (current instanceof Array) {
      current.push(1);
    } else {
      nums[nums.length - 1] = [1, 1];
    }
  } else {
    nums.push(1);
  }
  return {
    processes,
    nums
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
      ]
    }
  ],
  nums: [1],
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
      return Object.assign({}, state, {
        ..._addProcess(state, action.data)
      });
    case types.SET_CURRENT_PROCESS:
      return Object.assign({}, state, {
        currentProcess: action.num
      });
    case types.ADD_ROW:
      return Object.assign({}, state, {
        processes: _addRow(state)
      });
    default:
      return state;
  }
}

module.exports = combineReducers({
  processData
});

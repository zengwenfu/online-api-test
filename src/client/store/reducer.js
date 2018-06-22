const types = require('./action-types.js');
const combineReducers = require('redux').combineReducers;

function instaclipState(state = {}, action) {
  switch (action.type) {
    case types.SET_INSTCLIP_DATA:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

module.exports = combineReducers({
  instaclipState
});

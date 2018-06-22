const types = require('./action-types.js');

function setInstclipData(data) {
  return {
    type: types.SET_INSTCLIP_DATA,
    data
  };
}

module.exports = {
  setInstclipData
};

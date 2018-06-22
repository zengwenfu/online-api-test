const renderToString = require('../tools/react-render').renderToString;
const {apiConfig, errCode} = require('../../../config/application.config');
const Share = require('../view/Share');
const UserCase = require('../view/UserCase');
const request = require('request');

function getInstaclipData(id, url) {
  const options = {
    uri: url,
    method: 'POST',
    json: {idStr: id}
  };
  return new Promise((resolve, reject) => {
    request(options, function(e, r, b) {
      if (!e && b.errCode === errCode.noErr) {
        resolve(b);
      } else {
        resolve(-1);
      }
    });
  });
}

module.exports = function setup(app) {
  app.get('/', (req, res) => {
    res.send(renderToString(UserCase, {}));
  });

  app.get('/c/:id', (req, res) => {
    const instaclipIdStr = req.params.id;
    getInstaclipData(instaclipIdStr, apiConfig.getPreview).then((data) => {
      if (data === -1) {
        data = {
          errorCode: -1
        };
      }
      res.send(renderToString(Share, {instaclipState: data}));
    });
  });

  app.get('/api/:id', (req, res) => {
    const instaclipIdStr = req.params.id;
    getInstaclipData(instaclipIdStr, apiConfig.getUrl).then((data) => {
      if (data === -1) {
        data = {
          errorCode: -1
        };
      }
      res.send(JSON.stringify(data));
    });
  });
};

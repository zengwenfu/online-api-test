const renderToString = require('../tools/react-render').renderToString;
const UserCase = require('../view/UserCase');
const {list, detail, processes} = require('../tools/mock');
const freedomApi = require('freedom-api');
module.exports = function setup(app) {
  app.get('/', (req, res) => {
    res.send(renderToString(UserCase, {}));
  });

  app.get('/freedomApi', (req, res) => {
    freedomApi({
      processes,
      callback: function(data) {
        res.append('Set-Cookie', data.setCookie);
        res.send({
          success: data.success,
          allData: data.allData
        });
      }
    });
  });

  app.post('/testFApi/login', (req, res) => {
    const body = req.body;
    if (body.name === 'facemagic' && body.pass === 'facemagic888') {
      req.session.login = true;
      res.send(JSON.stringify({code: 0, login: true}));
      return;
    }
    res.send(JSON.stringify({code: 0, login: false}));
  });

  app.get('/testFApi/getList', (req, res) => {
    req.session.test = 'test';
    const result = {
      code: 0,
      data: list
    };
    res.send(JSON.stringify(result));
  });

  app.get('/testFApi/getDetail/:id', (req, res) => {
    const id = req.params.id;
    const result = {
      code: 0,
      data: detail[id]
    };
    res.send(JSON.stringify(result));
  });

  app.get('/testFApi/getDetailById', (req, res) => {
    const id = req.param('id');
    const result = {
      code: 0,
      data: detail[id]
    };
    res.send(JSON.stringify(result));
  });
};

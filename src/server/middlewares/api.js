const renderToString = require('../tools/react-render').renderToString;
const UserCase = require('../view/UserCase');

module.exports = function setup(app) {
  app.get('/', (req, res) => {
    res.send(renderToString(UserCase, {}));
  });
};

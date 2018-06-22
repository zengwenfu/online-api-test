const React = require('react');
const ReactDOMServer = require('react-dom/server');
const serialize = require('serialize-javascript');

function injectInitState(html, locals) {
  if (!/window.__INITIAL_STATE__/.test(html) && locals) {
    // 从 store 中获得初始 state
    const initState = `<script> window.__INITIAL_STATE__= ${serialize(locals, {isJSON: true})};</script>`;
    const injectRegex = /(<body>)/i;
    html = html.replace(injectRegex, (match) => {
      return match + initState;
    });
  }
  return html;
}

function renderToString(reactClass, locals) {
  reactClass = reactClass && reactClass.default ? reactClass.default : reactClass;
  const html = ReactDOMServer.renderToString(React.createElement(reactClass, locals));
  return injectInitState(html, locals);
}

module.exports = {
  renderToString
};

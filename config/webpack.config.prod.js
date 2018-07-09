const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
  mode: 'production',
  resolve: {
    alias: {
      // react: 'react-lite',
      // 'react-dom': 'react-lite'
    }
  },
  plugins: [
    new UglifyJsPlugin({
      parallel: true,
      extractComments: true
    })
  ]
});

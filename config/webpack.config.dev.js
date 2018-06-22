const {resolve} = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.config.common');
for (const key in commonConfig.entry) {
  if (commonConfig.entry[key] instanceof Array) {
    commonConfig.entry[key].push(`webpack-hot-middleware/client?http://localhost:${process.env.HTTP_PORT}&reload=true`);
  } else {
    commonConfig.entry[key] = [
      commonConfig.entry[key],
      `webpack-hot-middleware/client?http://localhost:${process.env.HTTP_PORT}&reload=true`
    ];
  }
}

module.exports = merge(commonConfig, {
  mode: 'development',
  output: {
    hotUpdateMainFilename: 'hot-update.[hash:6].json',
    hotUpdateChunkFilename: 'hot-update.[hash:6].js'
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()]
});

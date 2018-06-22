const {resolve, join, extname, basename} = require('path');
const timeStamp = new Date().getTime();
const webpack = require('webpack');
const IS_DEV = process.env.NODE_ENV !== 'production';
const {version} = require('../package.json');
const fs = require('fs');

// 多入口
function walk() {
  const entries = {};
  const dir = join(__dirname, '..', 'src/client/pages');
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = join(dir, file);
    const stat = fs.statSync(fullPath);
    const en = extname(fullPath);
    const bn = basename(file);
    if (stat.isFile() && en === '.js') {
      entries[bn.replace('.js', '')] = fullPath;
    }
  });
  return entries;
}

const entries = walk();

module.exports = {
  target: 'node',
  entry: entries,
  output: {
    path: resolve(__dirname, '..', 'src', 'server', 'view'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              camelCase: 'only',
              localIdentName: '[local]-[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            options: {sourceMap: false}
          },
          {
            loader: 'postcss-loader',
            options: {sourceMap: false}
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      RANDOM: JSON.stringify(timeStamp),
      IS_DEV: JSON.stringify(IS_DEV),
      VERSION: JSON.stringify(version)
    })
  ],
  resolve: {
    modules: ['node_modules', join('src', 'client')]
  },
  stats: {
    assetsSort: '!size',
    children: false,
    chunks: false,
    colors: true,
    entrypoints: false,
    modules: false
  }
};

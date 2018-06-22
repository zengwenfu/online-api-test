const {resolve, join, extname, basename} = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {version} = require('../package.json');

const IS_DEV = process.env.NODE_ENV !== 'production';

// 多入口
function walk() {
  const entries = {};
  const dir = join(__dirname, '..', 'src/client');
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
  target: 'web',
  entry: entries,
  output: {
    publicPath: '/',
    path: resolve(__dirname, '..', 'build', 'client'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {sourceMap: IS_DEV}
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName: IS_DEV ? '[path]-[name]_[local]' : '[name]_[local]_[hash:5]', // [hash:base64]
                modules: true,
                sourceMap: IS_DEV,
                camelCase: 'only'
              }
            },
            {
              loader: 'sass-loader',
              options: {sourceMap: IS_DEV}
            },
            {
              loader: 'postcss-loader',
              options: {sourceMap: IS_DEV}
            }
          ]
        })
      },
      {
        test: /\.(gif|jpg|png|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: IS_DEV
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
  resolve: {
    modules: ['node_modules', join('src', 'client')],
    alias: {
      comps: resolve('src/client/components'),
      containers: resolve('src/client/containers'),
      pages: resolve('src/client/pages'),
      store: resolve('src/client/store'),
      assets: resolve('src/client/assets'),
      utils: resolve('src/client/utils')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: `vendor_${version}`,
          chunks: 'all'
        }
      }
    }
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

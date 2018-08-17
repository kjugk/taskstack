const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base').config;

const config = merge(baseConfig, {
  watch: true,
  devtool: 'source-map',
  watchOptions: {
    poll: false
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        loader: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      }
    ]
  }
});

module.exports = config;

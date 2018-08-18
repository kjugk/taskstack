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
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
});

module.exports = config;

const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base').config;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const config = merge(baseConfig, {
  watch: false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../stylesheets/[name].css',
      chunkFilename: '[id].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  }
});

module.exports = config;

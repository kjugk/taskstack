const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base').config;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = merge(baseConfig, {
  watch: false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              outputPath: './images',
              publicPath: (path) => '/dist/images/' + path,
              name: '[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
});

module.exports = config;

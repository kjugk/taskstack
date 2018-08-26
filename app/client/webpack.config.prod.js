const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base').config;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const config = merge(baseConfig, {
  watch: false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CompressionPlugin({
      test: /\.(css)|(js)$/
    })
  ],
  module: {
    rules: [
      {
        test: /\.(less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { minimize: true } },
          'less-loader'
        ]
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

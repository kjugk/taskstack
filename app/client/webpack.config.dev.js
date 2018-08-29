const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base').config;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = merge(baseConfig, {
  watch: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 8888
    })
  ]
});

module.exports = config;

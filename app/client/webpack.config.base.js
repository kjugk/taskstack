const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const distPath = path.resolve(__dirname, '../../public/dist');
const pathToClean = [distPath];

let config = {
  entry: path.resolve(__dirname, './index.tsx'),
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/dist',
    path: distPath
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '../../theme.config$': path.join(__dirname, 'my-semantic-theme/theme.config')
    }
  },

  performance: { hints: false },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: 'file-loader',
        options: {
          outputPath: './fonts',
          publicPath: (path) => '/dist/fonts/' + path,
          name: '[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathToClean, {
      allowExternal: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './template/index.html'),
      minify: true
    })
  ]
};

module.exports = {
  config
};

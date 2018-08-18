const path = require('path');

let config = {
  entry: path.resolve(__dirname, './index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../assets/javascripts/')
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  performance: { hints: false },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: 'file-loader',
        options: {
          outputPath: '../../../public/fonts', // font ファイルの配置バス
          publicPath: (path) => '/fonts/' + path, // css が参照するパス
          name: '[name].[hash:8].[ext]'
        }
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              outputPath: '../../../public',
              publicPath: (path) => '/' + path,
              name: '[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
};

module.exports = {
  config
};

const path = require('path');

let config = {
  entry: path.resolve(__dirname , "./index.tsx"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../assets/javascripts/")
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  performance: { hints: false },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  }
}

module.exports = {
  config
};
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = {
  entry: './src/bootstrap.ts',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build',
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    plugins: [
      new TsConfigPathsPlugin(),
    ],
  },

  module: {
    rules: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['build','dist']),
    new CopyWebpackPlugin([
      { from: 'res/**/*', transformPath: (target) => target.substring(4) },
    ]),
  ],
};

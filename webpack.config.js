const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const argv = require('yargs').argv

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
]

if (argv.webpack_env === 'prod') {
  plugins.push(new webpack.optimize.DedupePlugin())
  // plugins.push(new webpack.optimize.UglifyJsPlugin())
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }))
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'dist',
    filename: './index.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
    ],
  },
  plugins,
}

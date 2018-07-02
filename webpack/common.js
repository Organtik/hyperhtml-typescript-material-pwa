const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: ['.js', '.ts', '.html']
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Organtik - PWA Hyperhtml Starter - Step by Step',
      template: './dist/index.html'
    })
  ],
  module: {
    rules: [
    ]
  }
}
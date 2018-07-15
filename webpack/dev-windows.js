const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        https: true,
        hot: true,
        contentBase: path.resolve('static'),
        historyApiFallback: true
    },
    devtool: 'eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
        ]
    }
});

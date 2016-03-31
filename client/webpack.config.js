/* global __dirname */

var path = require('path');

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var dir_js = path.resolve(__dirname, 'app');
var dir_build = path.resolve(__dirname, '../public');

module.exports = {
    entry: {
      app : path.resolve(dir_js, 'index.js')
    },
    devtool: 'source-map',
    output: {
        path: dir_build,
        filename: 'bundle.js'
    },
    resolve: {
       modulesDirectories: ['node_modules', dir_js],
    },
    devServer: {
        contentBase: dir_build,
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
                presets : ['es2015', 'react']
            },
            {
              test: /\.less$/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
              //loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize!less-loader")
            },
            {
              //  exclude: /node_modules/,
                test: /\.png($|\?)|\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'file?name=assets/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
          'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new ExtractTextPlugin("[name].css"),
        //new webpack.optimize.UglifyJsPlugin({minimize: true}),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin(),
    ],
    stats: {
        // Nice colored output
        colors: true
    }
}

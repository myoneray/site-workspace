'use strict';
let path = require('path');
let webpack = require('webpack');

let CommonChunkPlugin = webpack.optimize.CommonsChunkPlugin;

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');


let config = {
    entry: {
        app: path.resolve('./src/bootstrap.js'),
        vendor: [path.resolve('./src/vendor.js')]
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
        path: path.resolve('./dist')
    },
    module: {
        preLoaders: [
            { test: /\.js$/, loader: 'eslint-loader', include: path.resolve('./src') }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'ng-annotate-loader!babel-loader',
                include: path.resolve('./src')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            { test: /\.woff2$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.woff$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.ttf$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.eot$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.svg$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.png$/, loader: 'file-loader' },
            {
                test: /\.html$/,
                loader: 'html-loader?interpolate'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./src/index.html')
        }),
        new CommonChunkPlugin('vendor', '[name].bundle.js'),
        new ExtractTextPlugin('[name].css'),
        new webpack.ProvidePlugin({
            moment: 'moment'
        })
    ],
    resolve: {
        root: [path.resolve('./src'), path.resolve('./node_modules')],
        extensions: ['', '.js']
    },
    eslint: {
        configFile: './.eslintrc.json'
    }
};


module.exports = config;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

//引入基础配置
var config = require('./webpack.config.base');

config.output.path = path.resolve(__dirname, 'dist');

config.module.loaders.concat([

]);

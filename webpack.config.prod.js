var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: {
        app: './app/js/app.js',
        vendors: [
            'react',
            'react-dom'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    externals: undefined,
    resolve: {
        extensions: ['', '.js', '.jsx', '.less']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
                exclude: /node_modules/,
                loader: 'babel', // 加载模块 "babel" 是 "babel-loader" 的缩写
                query: {
                    presets: ['es2015','react']
                }
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }, {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.ico$/,
                loader: 'url',
                query: {
                    limit: 25000,
                    name: '[name].[ext]?[hash:7]'
                }
            }, {
                test: /\.eot|\.ttf|\.woff2?/,
                loader: 'file',
                query: {
                    name: '[name].[ext]?[hash:7]'
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': "'production'",
                'PORT': 3001,
                'CDN_URL': "",
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: '[name].js',
        }),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: path.resolve(__dirname, 'app/index.html'),
            inject: true
        })
    ]
};

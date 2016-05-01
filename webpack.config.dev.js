var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: ['./client.dev','./app/js/app.js'],
    },
    output: {
        path: path.resolve(__dirname, 'output'),
        publicPath: '',
        filename: 'bundle.js',
        chunkFilename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.less', '.png'] //遇到.jsx结尾模块（文件）时也要加载
    },
    devtool: 'source-map',
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
                loader: 'style!css!less'
            }, {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.ico$/,
                loader: 'url',
                query: {
                    limit: 25000,
                    name: './[name].[ext]?[hash:7]'
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
                'NODE_ENV': "'development'",
                'PORT': 3001
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'app/index.html'),
            inject: true
        })
    ]

    // the configuration above does not apply to the webpack-dev-server...
    // webpack-dev-server is configured below
    // devServer: {
    //     contentBase: "./dist",
    //     hot: true,
    //     noInfo: true,
    //     headers: { 'Access-Control-Allow-Origin': '*' },
    //     port: 8081
    // }
};

//webpack config 官方文档
//https://github.com/webpack/docs/wiki/configuration
// nodejs 中的path模块
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: {
       main: path.resolve(__dirname, 'app/main.js')
    },
    // 输出配置
    output: {
        // 输出路径是 myProject/output
        path: path.resolve(__dirname, 'output'),
        publicPath: '/',   //暂时发现没有什么用
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
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
                test: /\.less/,             //css-loader会遍历 CSS 文件，然后找到 url() 表达式然后处理他们,style-loader 会把原来的 CSS 代码插入页面中的一个 style 标签中
                // loader: 'style!css'
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'    //url-loader 图片如果不大于 25KB 的话要自动在它从属的 css 文件中转成 BASE64 字符串
            }, {
                test: /\.woff$/,        //选择一种格式,取决与你的项目，你可能可以选择出一种字体格式，如果你不考略 Opera Mini，所有的浏览器都支持 .woff 和 .svg 格式。问题是不同格式下在各种浏览器下字体看起来会有一点点不同。所以测试 .woff 和 .svg，然后找出能够在所有浏览器中看起来最好的那个。
                loader: 'url?limit=100000'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',  //相对path
            template: path.resolve( __dirname, 'app/index.html'),
            inject: true
        }),
        new ExtractTextPlugin("[name].[contenthash].css")
    ]
};

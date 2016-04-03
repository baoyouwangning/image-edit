// 引入必要的模块
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

// 创建一个express实例
var app = express();

// 调用webpack并把配置传递过去
var compiler = webpack(config);

// 使用 webpack-dev-middleware 中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});

// 使用 webpack-hot-middleware 中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler);

// 注册中间件
app.use(devMiddleware);
app.use(hotMiddleware);

// webpack插件，监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
});

//开启服务器
var port = process.env.PORT || 3001;
app.listen(port, function (err) {
    if (err) {
        return;
    }
    console.log('Listening at http://localhost:' + port);
});







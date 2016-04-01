var hotClient = require('webpack-hot-middleware/client');

// 订阅事件，当 event.action === 'reload' 时执行页面刷新
hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        console.log(1);
        window.location.reload();
    }
});
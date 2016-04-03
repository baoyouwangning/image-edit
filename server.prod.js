var express = require('express');
var compression = require('compression');
var path = require('path');
var fs = require('fs');

var app = express();

var config = {
    port: process.env.PORT || 3001,
    firebase: {
        url: process.env.FIREBASE_URL
    }
};

Object.assign(config, {
    cdn: process.env.CDN_URL
});

app.disable('x-powered-by');
app.use(compression());
app.use(express.static(path.join(__dirname, 'dist'), {
    maxAge: '240000'
}));

app.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

app.listen(config.port, function(err) {
    if (err) {
        throw err;
    }
    console.log('server running on port ' + config.port);
});
var inheritPrototype = require('./inheritPrototype');
var AsynObject = require('./AsynObject');

//跨源请求包装器构造函数
var CORSRequest = function (url,callback) {
    AsynObject.call(this,XMLHttpRequest,callback);
    this.initialize(url);
};

//使CORSRequest继承AsynObject
inheritPrototype(CORSRequest,AsynObject);

//跨源请求包装器初始化
CORSRequest.prototype.initialize = function (url) {
    this.obj.open("get",url,true);
    this.obj.responseType = "blob";
    this.obj.send(null);
};

module.exports = CORSRequest;
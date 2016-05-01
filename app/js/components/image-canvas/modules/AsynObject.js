
//一个抽象的异步类型，object为类型
var AsynObject = function (object,callback) {
    this.obj = null;
    this.superInitialize(object,callback);
};
//超类的初始化
AsynObject.prototype.superInitialize = function (object,callback) {
    var _this = this;
    this.obj = new object;
    this.obj.onload = function(event) {
        return _this.onload(event,callback);
    }
    this.obj.onerror = function (event) {
        return _this.onerror(event,callback);
    }
};
//成功的回调
AsynObject.prototype.onload = function (event,callback) {
    callback.call(this,1);
};
//错误的回调
AsynObject.prototype.onerror = function (event,callback) {
    callback.call(this,0);
};

module.exports = AsynObject;


var inheritPrototype = require('./inheritPrototype');
var AsynObject = require('./AsynObject');

//读取本地图片文件包装器构造函数
var SubFileReader = function (file,callback) {
    AsynObject.call(this,FileReader,callback);
    this.file = null;
    this.initialize(file);
};
//使SubFileReader继承AsynObject
inheritPrototype(SubFileReader,AsynObject);
//读取本地图片文件初始化
SubFileReader.prototype.initialize = function (file) {
    this.file = file;
};
SubFileReader.prototype.readAsDataURL = function () {   //这里只用到了以数据URI的形式读取
    this.obj.readAsDataURL(this.file);
};

module.exports = SubFileReader;
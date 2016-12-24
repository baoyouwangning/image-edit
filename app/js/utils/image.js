var SubImage = require('./SubImage');

var image = {
    //获得图片数据URI
    getBase64 : function (target,callback) {
        return new SubImage(target,function (status) {
            if( status == 0 ) {					//加载失败
                return callback.call(this,null);
            }
            return this.toDataURL(callback);
        });
    },

    //图片压缩
    resize : function (target,config,callback) {
        return new SubImage(target,function (status) {
            if( status == 0 ) {
                return callback.call(this,null);
            }
            return this.resize(config,callback);
        });
    },

    //图片裁剪
    clip : function (target,config,callback) {
        return new SubImage(target,function (status) {
            if( status == 0 ) {
                return callback.call(this,null);
            }
            return this.clip(config,callback);
        });
    },

    //图片旋转
    rotate : function (target,config,callback) {
        return new SubImage(target,function (status) {
            if( status == 0 ) {
                return callback.call(this,null);
            }
            return this.rotate(config,callback);
        });
    },

    //图片格式转化
    transfor : function (target,config,callback) {
        return new SubImage(target,function (status) {
            if( status == 0 ) {
                return callback.call(this,null);
            }
            return this.transfor(config,callback);
        });
    },

    //图片加水印
    watermark : function (target,config,callback) {
        return new SubImage(target,function (status) {
            if( status == 0 ) {
                return callback.call(this,null);
            }
            return this.watermark(config,callback);
        });
    },

    //线索图
    cueGraph: function (target,config,callback) {
        return new SubImage(target,function (status) {
            if( status == 0 ) {
                return callback.call(this,null);
            }
            return this.cueGraph(config,callback);
        });
    }
};

module.exports = image;

//提供一些通用工具
var Utils = {
    //使参数友好混合，找到src中合法的属性并将其值（必须为非isNaN)赋值给dest中对应的属性。
    mix : function (dest,src) {
        for( var key in src ) {
            if( dest.hasOwnProperty(key) && !isNaN(src[key]) && src[key] != "" ) {
                dest[key] = Number(src[key]);
            }
        }
        return dest;
    },
    //创建对象URL
    createObjectURL : function (blob) {
        if( window.URL ) {
            return window.URL.createObjectURL(blob);
        } else if(window.webkitURL) {
            return window.webkitURL.createObjectURL(blob);
        } else {
            return null;
        }
    },
    //释放对象URL
    revokeObjectURL : function (url) {
        if( window.URL ) {
            window.URL.revokeObjectURL(url);
        } else if( window.webkitURL ) {
            window.webkitURL.revokeObjectURL(url);
        }
    }
};

module.exports = Utils;

//兼容的对象URL
var ObjectURL = {
    create : function (blob) {
        if( window.URL ) {
            return window.URL.createObjectURL(blob);
        } else if(window.webkitURL) {
            return window.webkitURL.createObjectURL(blob);
        } else {
            return null;
        }
    },
    revoke : function (url) {
        if( window.URL ) {
            window.URL.revokeObjectURL(url);
        } else if( window.webkitURL ) {
            window.webkitURL.revokeObjectURL(url);
        }
    }
};

module.exports = ObjectURL;
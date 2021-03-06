var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SubImage = require('../utils/SubImage');
var image = require('../utils/image');

var _extend = function _extend(target, obj) {
    for (var i in obj) {
        if( obj[i] ) {
            target[i] = obj[i];
        }
    }
    return target;
};

var AppStore = assign({},EventEmitter.prototype, {
    data: {
        'current': '',
        'lastImageData': '',
        'currentImageData': '',
        'canvas': null,
        'option': {
            'clip': {},
            'resize':{},
            'rotate':{},
            'transfor':{},
            'watermark':{
                'position' : {
                    'top': undefined,
                    'top' : undefined,
                    'left' : undefined,
                    'right' : undefined,
                    'bottom' : undefined
                },
                'mark' : null
            },
            'cueGraph': {
                edge:{
                    R: [10,30],
                    G: [13,30],
                    B: [25,50]
                },
                line: {
                    R: [53,73],
                    G: [52,58],
                    B: [61,70]
                }
            }
        }
    },
    getCanvas: function () {
        return this.data.canvas;
    },

    toDataURL: function (target) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
             image.getBase64(target,function (imageData) {
                 _this.data.lastImageData = imageData;
                 _this.data.currentImageData = imageData;
                 _this.data.canvas = this.canvas;
                 _this.data.current = 'toDataURL';
                 resolve();
            });
        });
        return promise;
    },

    resize: function (options) {
        var _this = this;
        if( _this.data.current != 'resize' ) {
            _this.data.lastImageData = _this.data.currentImageData;
            _this.data.current = 'resize';
        }
        options = _extend(_this.data.option['resize'], options);
        image.resize(_this.data.lastImageData,options,function (imageData) {
            _this.data.currentImageData = imageData;
            _this.data.canvas = this.canvas;
            _this.emitChange();
        });
    },

    clip: function (options) {
        var _this = this;
        if( _this.data.current != 'clip' ) {
            _this.data.lastImageData = _this.data.currentImageData;
            _this.data.current = 'clip';
        }
        options = _extend(_this.data.option['clip'],options);
        image.clip(_this.data.lastImageData,options,function (imageData) {
            _this.data.currentImageData = imageData;
            _this.data.canvas = this.canvas;
            _this.emitChange();
        });
    },

    rotate: function (options) {
        var _this = this;
        if( _this.data.current != 'rotate' ) {
            _this.data.lastImageData = _this.data.currentImageData;
            _this.data.current = 'rotate';
        }
        options = _extend(_this.data.option['rotate'],options.alipay);
        image.rotate(_this.data.lastImageData,options,function (imageData) {
            _this.data.currentImageData = imageData;
            _this.data.canvas = this.canvas;
            _this.emitChange();
        });
    },

    transfor: function (options) {
        var _this = this;
        if( _this.data.current != 'transfor' ) {
            _this.data.lastImageData = _this.data.currentImageData;
            _this.data.current = 'transfor';
        }
        options = _extend(_this.data.option['transfor'],options);
        image.transfor(_this.data.lastImageData,options,function (imageData) {
            _this.data.currentImageData = imageData;
            var this_ = this;
            var img = new Image();  //canvas只有导出时才能看到质量
            img.onload = function () {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext("2d");
                canvas.width = this_.canvas.width;
                canvas.height = this_.canvas.height;
                context.drawImage(img,0,0);
                _this.data.canvas = canvas;
                _this.emitChange();
            }
            img.src = imageData;
        });
    },

    watermark: function (options) {
        var _this = this;
        if( _this.data.current != 'watermark' ) {
            _this.data.lastImageData = _this.data.currentImageData;
            _this.data.current = 'watermark';
        }
        var position = _extend(_this.data.option['watermark']['position'],options);
        var _options = {};
        _options.position = position;
        _options.mark = position.mark || options;
        image.watermark(_this.data.lastImageData,_options,function (imageData) {
            _this.data.currentImageData = imageData;
            _this.data.canvas = this.canvas;
            _this.emitChange();
        });
    },

    cueGraph: function (options) {
        console.log(options);
        var _this = this;
        if( _this.data.current != 'cueGraph' ) {
            _this.data.lastImageData = _this.data.currentImageData;
            _this.data.current = 'cueGraph';
        }
        options = _extend(_this.data.option['cueGraph'],options.alipay);
        image.cueGraph(_this.data.lastImageData,options,function (imageData) {
            _this.data.currentImageData = imageData;
            _this.data.canvas = this.canvas;
            _this.emitChange();
        });
    },

    emitChange: function () {
        this.emit('change');
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }
});

module.exports = AppStore;
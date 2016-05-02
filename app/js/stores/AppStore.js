var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SubImage = require('../utils/SubImage');
var image = require('../utils/image');

var AppStore = assign({},EventEmitter.prototype, {
    data: {
        'current': '',
        'lastImageData': '',
        'currentImageData': '',
        'canvas': null
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
        }
        image.resize(_this.data.lastImageData,options,function (imageData) {
            _this.data.currentImageData = imageData;
            _this.data.canvas = this.canvas;
            _this.data.current = 'resize';
        });
    },

    rotate: function (options) {
        var _this = this;
        if( _this.data.current != 'rotate' ) {
            _this.data.lastImageData = _this.data.currentImageData;
        }
        image.rotate(_this.data.lastImageData,options,function (imageData) {
            _this.data.currentImageData = imageData;
            _this.data.canvas = this.canvas;
            _this.data.current = 'rotate';
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
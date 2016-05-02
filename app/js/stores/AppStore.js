var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var image = require('../utils/image');

var AppStore = assign({},EventEmitter.prototype, {
    data: {
        'subImage': null,
        'canvas': null
    },
    getCanvas: function () {
        return this.data.canvas;
    },

    toDataURL: function (target) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
             image.getBase64(target,function (imageData) {
                // _this.canvas.target = imageData;
                // _this.canvas.width = this.image.width;
                // _this.canvas.height = this.image.height;
                // debugger;
                 _this.data.subImage = this;
                _this.data.canvas = this.canvas;
                resolve();
            });
        });
        return promise;
    },

    resize: function (options) {
        var _this = this;
        var target = this.canvas.target;
        image.resize(target,options,function (imageData) {
            _this.canvas.target = imageData;
            _this.canvas.width = this.image.width;
            _this.canvas.height = this.image.height;
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
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var image = require('../utils/image');

var AppStore = assign({},EventEmitter.prototype, {
    canvas: {
        image: null,
        width: "0px",
        height: "0px"
    },
    getCanvas: function () {
        return this.canvas;
    },

    toDataURL: function (target) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            image.getBase64(target,function (imageData) {
                _this.canvas.image = imageData;
                _this.canvas.width = this.image.width;
                _this.canvas.height = this.image.height;
                resolve();
            });
        });
        return promise;
    },

    addNewItemHandler: function (text) {
        this.canvas.imageData = text;
    },

    emitChange: function () {
        var image = new Image();
        image.width = this.canvas.width;
        image.height = this.canvas.height;
        image.src = this.canvas.image;
        this.canvas.image = image;
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
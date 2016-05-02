var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var image = require('../utils/image');

var AppStore = assign({},EventEmitter.prototype, {
    canvas: {
        imageData: null,
        width: "0px",
        height: "0px"
    },
    getCanvas: function () {
        return this.canvas;
    },
    addNewItemHandler: function (text) {
        this.canvas.imageData = text;
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
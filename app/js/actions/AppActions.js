var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
    toDataURL: function(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.TO_DATA_URL,
            options: options
        });
    },
    resize: function(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RESIZE,
            options: options
        });
    },
    clip: function(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.CLIP,
            options: options
        });
    },
    rotate: function(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.ROTATE,
            options: options
        });
    },
    transfor: function(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.TRANSFOR,
            options: options
        });
    },
    watermark: function(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.WATERMARK,
            options: options
        });
    },
    cueGraph: function (options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.CUEGRAPH,
            options: options
        });
    }
};

module.exports = AppActions;
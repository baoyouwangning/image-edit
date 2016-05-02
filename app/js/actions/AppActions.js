var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
    toDataURL: function(options) {
        AppActions.dispatcher({
            actionType: AppConstants.TO_DATA_URL,
            options: options
        });
    },
    resize: function(options) {
        AppActions.dispatcher({
            actionType: AppConstants.RESIZE,
            options: options
        });
    },
    clip: function(options) {
        AppActions.dispatcher({
            actionType: AppConstants.CLIP,
            options: options
        });
    },
    rotate: function(options) {
        AppActions.dispatcher({
            actionType: AppConstants.ROTATE,
            options: options
        });
    },
    transfor: function(options) {
        AppActions.dispatcher({
            actionType: AppConstants.TRANSFOR,
            options: options
        });
    },
    watermark: function(options) {
        AppActions.dispatcher({
            actionType: AppConstants.WATERMARK,
            options: options
        });
    }
};

module.exports = AppActions;
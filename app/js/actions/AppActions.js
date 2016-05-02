var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {

    toDataURL: function(options) {
        AppActions.dispatcher({
            actionType: 'TO_DATA_URL',
            options: options
        });
    },
    resize: function(options) {
        AppActions.dispatcher({
            actionType: 'RESIZE',
            options: options
        });
    },
    resize: function(options) {
        AppActions.dispatcher({
            actionType: 'RESIZE',
            options: options
        });
    }
};

module.exports = AppActions;
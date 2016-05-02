var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {
    addNewItem: function (text) {
        AppDispatcher.dispatch({
            actionType: 'ADD_NEW_ITEM',
            text: text
        });
    }
};

module.exports = AppActions;
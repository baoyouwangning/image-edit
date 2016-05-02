var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
var AppStore = require('../stores/AppStore');

AppDispatcher.register(function (action) {
   switch (action.actionType) {
       case 'ADD_NEW_ITEM':
           AppStore.addNewItemHandler(action.text);
           AppStore.emitChange();
           break;
       default:

   }
});

module.exports = AppDispatcher;
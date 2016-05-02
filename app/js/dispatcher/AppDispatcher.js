var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();
var AppStore = require('../stores/AppStore');
var AppConstants = require('../constants/AppConstants');

AppDispatcher.register(function (action) {
   switch (action.actionType) {
       case AppConstants.TO_DATA_URL:
           AppStore.toDataURL(action.options.target).then(function () { //本地图像和外链都是异步
               AppStore.emitChange();
           });
           break;
       case AppConstants.RESIZE:
           AppStore.addNewItemHandler(action.options);
           AppStore.emitChange();
           break;
       case AppConstants.CLIP:
           AppStore.addNewItemHandler(action.options);
           AppStore.emitChange();
           break;
       case AppConstants.ROTATE:
           AppStore.addNewItemHandler(action.options);
           AppStore.emitChange();
           break;
       case AppConstants.TRANSFOR:
           AppStore.addNewItemHandler(action.options);
           AppStore.emitChange();
           break;
       case AppConstants.WATERMARK:
           AppStore.addNewItemHandler(action.text);
           AppStore.emitChange();
           break;
       default:
   }
});

module.exports = AppDispatcher;
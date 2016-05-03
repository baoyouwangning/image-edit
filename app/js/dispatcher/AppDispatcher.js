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
           AppStore.resize(action.options);
           break;
       case AppConstants.CLIP:
           AppStore.clip(action.options);
           break;
       case AppConstants.ROTATE:
           AppStore.rotate(action.options);
           break;
       case AppConstants.TRANSFOR:
           AppStore.transfor(action.options);
           break;
       case AppConstants.WATERMARK:
           AppStore.watermark(action.options);
           break;
       default:
   }
});

module.exports = AppDispatcher;
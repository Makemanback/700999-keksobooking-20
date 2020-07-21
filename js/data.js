'use strict';

(function () {
  var AD_WIDTH = 50;
  var AD_HEIGHT = 70;
  var MAP_PIN_WIDTH = 65;
  var MAP_PIN_HEIHGT = 65;
  var MAP_PIN_TAIL = 22;
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var SEND_URL = 'https://javascript.pages.academy/keksobooking';

  var StatusCode = {
    OK: 200,
    notSuppot: 501,
    internalError: 500
  };

  window.data = {
    AD_WIDTH: AD_WIDTH,
    AD_HEIGHT: AD_HEIGHT,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAP_PIN_HEIHGT: MAP_PIN_HEIHGT,
    MAP_PIN_TAIL: MAP_PIN_TAIL,
    StatusCode: StatusCode,
    URL: URL,
    SEND_URL: SEND_URL
  };
})();
